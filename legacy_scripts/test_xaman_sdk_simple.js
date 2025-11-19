// Simple test to verify Xaman SDK initialization
console.log("Testing Xaman SDK initialization...");

// Try to import and initialize Xumm
import("xumm")
  .then((module) => {
    console.log("Xumm module loaded successfully");
    const { Xumm } = module;
    
    // Try to initialize with API key
    try {
      const apiKey = "b53edeaf-0046-49a6-a100-4bb284be3682";
      console.log("Initializing Xumm with API key:", apiKey.substring(0, 8) + "...");
      const xumm = new Xumm(apiKey);
      console.log("Xumm initialized successfully!");
      console.log("Xumm instance:", typeof xumm);
      
      // Test if we can ping the API
      xumm.ping()
        .then((pong) => {
          console.log("Xumm ping successful:", pong);
        })
        .catch((pingError) => {
          console.error("Xumm ping failed:", pingError);
        });
      
      // Test if we can create a simple payload
      xumm.payload.create({
        TransactionType: "SignIn"
      })
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
    }
  })
  .catch((importError) => {
    console.error("Error importing Xumm module:", importError);
  });