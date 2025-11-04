import { useState, useEffect } from "react";
import { Xumm } from "xumm";

let xummInstance: any = null;

const initializeXummSDK = async () => {
  if (xummInstance) {
    return xummInstance;
  }

  try {
    const apiKey = import.meta.env.VITE_XUMM_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_XUMM_API_KEY not found in environment variables");
    }

    xummInstance = new Xumm(apiKey);
    
    // Set up event listeners
    xummInstance.on("error", (error: any) => {
      console.error("Xumm SDK error:", error);
    });
    
    xummInstance.on("success", () => {
      console.log("Xumm authorization successful");
    });
    
    xummInstance.on("ready", () => {
      console.log("Xumm SDK ready");
    });
    
    // Wait for SDK to be ready
    await new Promise((resolve) => {
      let ready = false;
      
      const readyHandler = () => {
        console.log("Xumm SDK ready event received");
        ready = true;
        resolve(true);
      };
      
      xummInstance.on("ready", readyHandler);
      
      // Check if already ready or timeout
      setTimeout(() => {
        if (!ready) {
          console.log("Xumm SDK ready check timeout, continuing anyway");
          xummInstance.off("ready", readyHandler);
          resolve(true);
        }
      }, 5000);
    });
    
    return xummInstance;
  } catch (error) {
    console.error("Xumm initialization error:", error);
    throw error;
  }
};

export function PayloadTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const testPayloadCreation = async () => {
    setIsTesting(true);
    setTestResult("Testing payload creation...");
    
    try {
      console.log("Initializing Xumm SDK...");
      const instance = await initializeXummSDK();
      console.log("Xumm SDK initialized:", instance);
      
      console.log("Creating sign-in payload...");
      setTestResult("Creating sign-in payload...");
      
      // Create payload with timeout and proper error handling
      const payloadPromise = instance.payload?.create({
        TransactionType: 'SignIn',
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload creation timeout after 10 seconds')), 10000)
      );
      
      const payload = await Promise.race([payloadPromise, timeoutPromise]);
      console.log("Payload created successfully:", payload);
      
      setTestResult(`Payload created successfully!\n${JSON.stringify(payload, null, 2)}`);
    } catch (error: any) {
      console.error("Error creating payload:", error);
      setTestResult(`Error: ${error.message}\n${error.stack}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Xaman Payload Creation Test</h2>
      <button 
        onClick={testPayloadCreation} 
        disabled={isTesting}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {isTesting ? "Testing..." : "Test Payload Creation"}
      </button>
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
        <pre>{testResult}</pre>
      </div>
    </div>
  );
}

export default PayloadTest;