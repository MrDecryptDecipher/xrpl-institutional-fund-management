// Test Xaman SDK initialization with API Key only (correct for browser environments)
console.log("=== Xaman SDK Authentication Fix Test ===");

// Import Xumm SDK
import("xumm")
  .then((module) => {
    console.log("Xumm module loaded successfully");
    const { Xumm } = module;
    
    // Initialize with API Key only (correct for browser environments)
    try {
      const apiKey = "b53edeaf-0046-49a6-a100-4bb284be3682";
      
      console.log("Initializing Xumm with API Key only (correct for browser environments)...");
      console.log("API Key:", apiKey.substring(0, 8) + "...");
      
      const xumm = new Xumm(apiKey);
      console.log("✅ Xumm initialized successfully with API Key only!");
      
      // Test ping to verify authentication
      console.log("Testing authentication with ping...");
      xumm.ping()
        .then((pong) => {
          console.log("✅ Ping successful - Authentication verified!");
          console.log("Pong response:", pong);
          
          // Test payload creation
          console.log("Testing payload creation...");
          return xumm.payload.create({
            TransactionType: "SignIn"
          });
        })
        .then((payload) => {
          console.log("✅ Payload creation successful!");
          console.log("Payload:", payload);
          
          // Cancel the payload since we're just testing
          if (payload && payload.uuid) {
            return xumm.payload.cancel(payload.uuid);
          }
        })
        .then(() => {
          console.log("✅ Payload cancelled successfully!");
          console.log("🎉 All tests passed - SDK authentication is working correctly with API Key only!");
        })
        .catch((error) => {
          console.error("❌ Test failed:", error.message);
          console.error("Error details:", error);
        });
        
    } catch (initError) {
      console.error("❌ Error initializing Xumm:", initError);
      console.error("Error details:", {
        message: initError.message,
        stack: initError.stack,
        name: initError.name
      });
    }
  })
  .catch((importError) => {
    console.error("❌ Error importing Xumm module:", importError);
    console.error("Error details:", {
      message: importError.message,
      stack: importError.stack,
      name: importError.name
    });
  });