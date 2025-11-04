import "./xumm-env-setup";
// Debug Xumm initialization
console.log("=== Xumm Debug Script ===");

// Check if we're in browser environment
console.log("Window object available:", typeof window !== "undefined");
console.log("Location:", window?.location?.href);

// Get API key from environment variables
const apiKey = import.meta.env.VITE_XUMM_API_KEY;
console.log("API key from env:", apiKey);
console.log("API key type:", typeof apiKey);
console.log("API key length:", apiKey ? apiKey.length : 0);

// Check if API key matches UUID format
const uuidv4re = new RegExp("^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$");
console.log("API key matches UUID format:", apiKey ? uuidv4re.test(apiKey) : false);

// Try a simpler approach - import and test step by step
console.log("Attempting to import Xumm module step by step...");

import("xumm")
  .then(async (module) => {
    console.log("=== Xumm module imported successfully ===");
    console.log("Module keys:", Object.keys(module));
    console.log("Module type:", typeof module);
    
    // Try different ways to access the Xumm class
    const XummClass = module.Xumm || module.default || module;
    console.log("Xumm class:", XummClass);
    console.log("Xumm class type:", typeof XummClass);
    console.log("Xumm class is function:", typeof XummClass === 'function');
    
    if (typeof XummClass === 'function') {
      try {
        console.log("Attempting to create Xumm instance...");
        console.log("API key:", apiKey);
        
        if (!apiKey) {
          throw new Error("API key is missing");
        }
        
        // Try creating instance
        const xumm = new XummClass(apiKey);
        console.log("Xumm instance created successfully:", xumm);
        
        // Check instance properties
        console.log("Instance keys:", Object.keys(xumm));
        console.log("Instance type:", typeof xumm);
        
        // Try to access some properties
        console.log("Environment:", xumm.environment);
        console.log("User:", xumm.user);
        console.log("Payload:", xumm.payload);
        
        // Set up minimal event listeners
        xumm.on("ready", () => {
          console.log("=== XUMM READY EVENT FIRED ===");
        });
        
        xumm.on("error", (error: any) => {
          console.log("=== XUMM ERROR EVENT FIRED ===", error);
        });
        
        xumm.on("retrieving", () => {
          console.log("=== XUMM RETRIEVING EVENT FIRED ===");
        });
        
        // Wait a bit and then try to authorize
        setTimeout(async () => {
          try {
            console.log("Attempting to call authorize method...");
            const result = await xumm.authorize();
            console.log("Authorize result:", result);
          } catch (error) {
            console.log("Authorize error:", error);
          }
        }, 3000);
        
      } catch (error) {
        console.log("Error creating Xumm instance:", error);
        console.log("Error stack:", (error as Error).stack);
      }
    } else {
      console.log("Xumm class is not a function, cannot instantiate");
    }
  })
  .catch((error) => {
    console.log("=== FAILED TO IMPORT XUMM MODULE ===");
    console.log("Import error:", error);
    console.log("Import error stack:", error.stack);
  });