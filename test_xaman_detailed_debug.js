// Detailed debug test for Xaman SDK
console.log("=== Xaman SDK Detailed Debug Test ===");

// Import Xumm SDK
import("xumm")
  .then((module) => {
    console.log("Xumm module loaded successfully");
    const { Xumm } = module;
    
    // Try to initialize with API key
    try {
      const apiKey = "b53edeaf-0046-49a6-a100-4bb284be3682";
      console.log("Initializing Xumm with API key:", apiKey.substring(0, 8) + "...");
      
      // Initialize Xumm
      const xumm = new Xumm(apiKey);
      console.log("Xumm initialized successfully!");
      console.log("Xumm instance type:", typeof xumm);
      console.log("Xumm payload object:", xumm.payload);
      
      // Add event listeners for debugging
      xumm.on("ready", () => {
        console.log("Xumm SDK ready event fired");
      });
      
      xumm.on("error", (error) => {
        console.error("Xumm SDK error event:", error);
      });
      
      xumm.on("success", () => {
        console.log("Xumm SDK success event fired");
      });
      
      // Test ping
      console.log("Testing ping...");
      xumm.ping()
        .then((pong) => {
          console.log("Ping successful:", pong);
        })
        .catch((pingError) => {
          console.error("Ping failed:", pingError);
        });
      
      // Test user account (with timeout)
      console.log("Testing user account...");
      const accountPromise = xumm.user.account;
      const accountTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Account check timeout')), 5000)
      );
      
      Promise.race([accountPromise, accountTimeout])
        .then((account) => {
          console.log("User account:", account);
        })
        .catch((accountError) => {
          console.error("User account check failed:", accountError);
        });
      
      // Test payload creation (with timeout)
      console.log("Testing payload creation...");
      const payloadPromise = xumm.payload.create({
        TransactionType: "SignIn"
      });
      
      const payloadTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Payload creation timeout')), 10000)
      );
      
      Promise.race([payloadPromise, payloadTimeout])
        .then((payload) => {
          console.log("Payload created successfully:", payload);
          
          // Cancel the payload since we're just testing
          if (payload && payload.uuid) {
            xumm.payload.cancel(payload.uuid)
              .then(() => console.log("Payload cancelled"))
              .catch((cancelError) => console.error("Error cancelling payload:", cancelError));
          }
        })
        .catch((payloadError) => {
          console.error("Payload creation failed:", payloadError);
        });
        
    } catch (initError) {
      console.error("Error initializing Xumm:", initError);
      console.error("Error details:", {
        message: initError.message,
        stack: initError.stack,
        name: initError.name
      });
    }
  })
  .catch((importError) => {
    console.error("Error importing Xumm module:", importError);
    console.error("Error details:", {
      message: importError.message,
      stack: importError.stack,
      name: importError.name
    });
  });