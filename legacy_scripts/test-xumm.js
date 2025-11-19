// Simple test file to check Xumm SDK initialization
console.log("Testing Xumm SDK initialization...");

// Dynamically import Xumm
import("xumm")
  .then(async (module) => {
    console.log("Xumm module imported successfully");
    console.log("Module keys:", Object.keys(module));
    
    const XummClass = module.Xumm || module.default;
    console.log("Xumm class:", XummClass);
    
    if (XummClass) {
      try {
        console.log("Attempting to create Xumm instance (browser mode)...");
        // For browser usage, we pass an empty string as the first parameter
        // The SDK will handle OAuth2 flow automatically
        const xumm = new XummClass("");
        console.log("Xumm instance created successfully:", xumm);
        
        // Listen for ready event
        xumm.on("ready", () => {
          console.log("Xumm SDK is ready!");
        });
        
        // Listen for error event
        xumm.on("error", (error) => {
          console.error("Xumm SDK error:", error);
        });
      } catch (error) {
        console.error("Error creating Xumm instance:", error);
      }
    }
  })
  .catch((error) => {
    console.error("Failed to import Xumm module:", error);
  });