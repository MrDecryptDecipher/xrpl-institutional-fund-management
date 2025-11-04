// Test Xaman SDK initialization
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
    } catch (initError) {
      console.error("Error initializing Xumm:", initError);
    }
  })
  .catch((importError) => {
    console.error("Error importing Xumm module:", importError);
  });