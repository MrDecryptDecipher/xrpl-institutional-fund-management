import { Xumm } from "xumm";

console.log("=== Comprehensive Xumm SDK Test ===");

// Check environment
console.log("Environment check:");
console.log("- window:", typeof window !== 'undefined' ? 'available' : 'not available');
console.log("- location:", typeof window !== 'undefined' ? window.location.href : 'not available');

// Check environment variables
console.log("\nEnvironment variables:");
// @ts-ignore
const apiKey = import.meta.env?.VITE_XUMM_API_KEY;
console.log("- VITE_XUMM_API_KEY:", apiKey ? `${apiKey.substring(0, 8)}...` : 'NOT FOUND');

async function testXummSDK() {
  try {
    console.log("\n=== Testing Xumm SDK ===");
    
    // Initialize SDK
    console.log("Initializing Xumm SDK...");
    const xumm = new Xumm(apiKey);
    console.log("✓ Xumm instance created");
    
    // Add event listeners
    xumm.on("ready", () => {
      console.log("✓ Xumm SDK ready event fired");
    });
    
    xumm.on("error", (error) => {
      console.error("✗ Xumm SDK error event fired:", error);
    });
    
    xumm.on("success", () => {
      console.log("✓ Xumm SDK success event fired");
    });
    
    xumm.on("retrieving", () => {
      console.log("✓ Xumm SDK retrieving event fired");
    });
    
    xumm.on("retrieved", () => {
      console.log("✓ Xumm SDK retrieved event fired");
    });
    
    // Wait for SDK to be ready
    console.log("Waiting for SDK to be ready...");
    await new Promise((resolve) => {
      let ready = false;
      
      const readyHandler = () => {
        console.log("Xumm SDK ready event received");
        ready = true;
        resolve(true);
      };
      
      xumm.on("ready", readyHandler);
      
      // Check if already ready or timeout
      setTimeout(() => {
        if (!ready) {
          console.log("Xumm SDK ready check timeout, continuing anyway");
          xumm.off("ready", readyHandler);
          resolve(true);
        }
      }, 5000);
    });
    
    console.log("✓ SDK is ready");
    
    // Test ping
    console.log("\nTesting ping...");
    try {
      const pong = await xumm.ping();
      console.log("✓ Ping successful:", pong);
    } catch (error) {
      console.error("✗ Ping failed:", error);
    }
    
    // Test user account access
    console.log("\nTesting user account access...");
    try {
      const accountPromise = xumm.user.account;
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Account access timeout')), 5000)
      );
      
      const account = await Promise.race([accountPromise, timeoutPromise]);
      console.log("✓ User account access successful:", account);
    } catch (error) {
      console.error("✗ User account access failed:", error);
    }
    
    // Test payload creation with different approaches
    console.log("\nTesting payload creation...");
    
    // Approach 1: Direct create
    try {
      console.log("Approach 1: Direct payload.create()");
      // @ts-ignore
      const payloadPromise = xumm.payload.create({
        TransactionType: 'SignIn'
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload creation timeout')), 10000)
      );
      
      const payload = await Promise.race([payloadPromise, timeoutPromise]);
      console.log("✓ Payload created successfully (Approach 1):", payload);
    } catch (error) {
      console.error("✗ Payload creation failed (Approach 1):", error);
    }
    
    // Approach 2: With optional chaining
    try {
      console.log("Approach 2: payload?.create()");
      const payloadPromise = xumm.payload?.create({
        TransactionType: 'SignIn'
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload creation timeout')), 10000)
      );
      
      const payload = await Promise.race([payloadPromise, timeoutPromise]);
      console.log("✓ Payload created successfully (Approach 2):", payload);
    } catch (error) {
      console.error("✗ Payload creation failed (Approach 2):", error);
    }
    
    // Approach 3: Await payload first
    try {
      console.log("Approach 3: Await payload then create");
      // @ts-ignore
      const payloadModule = await xumm.payload;
      // @ts-ignore
      const payload = await payloadModule.create({
        TransactionType: 'SignIn'
      });
      console.log("✓ Payload created successfully (Approach 3):", payload);
    } catch (error) {
      console.error("✗ Payload creation failed (Approach 3):", error);
    }
    
    console.log("\n=== Test Complete ===");
    
  } catch (error) {
    console.error("✗ Test failed:", error);
  }
}

// Run test if in browser environment
if (typeof window !== 'undefined') {
  testXummSDK();
} else {
  console.log("This test must be run in a browser environment");
}