// Detailed test script to debug Xaman payload creation
console.log("=== Detailed Xaman Payload Creation Test ===");

// Check environment
console.log("Environment check:");
console.log("- window:", typeof window !== 'undefined' ? 'available' : 'not available');
console.log("- location:", typeof window !== 'undefined' ? window.location.href : 'not available');

// Check environment variables
console.log("\nEnvironment variables:");
console.log("- VITE_XUMM_API_KEY:", import.meta.env.VITE_XUMM_API_KEY ? `${import.meta.env.VITE_XUMM_API_KEY.substring(0, 8)}...` : 'NOT FOUND');

// Test Xumm SDK import and initialization
console.log("\nTesting Xumm SDK import and initialization:");

import("xumm")
  .then(async (xummModule) => {
    console.log("✓ Xumm module imported successfully");
    console.log("Module keys:", Object.keys(xummModule));
    
    const XummClass = xummModule.Xumm || xummModule.default;
    console.log("XummClass:", typeof XummClass);
    
    if (XummClass) {
      try {
        const apiKey = import.meta.env.VITE_XUMM_API_KEY;
        if (!apiKey) {
          throw new Error("API key not found");
        }
        
        console.log("Creating Xumm instance with API key...");
        const xumm = new XummClass(apiKey);
        console.log("✓ Xumm instance created successfully");
        
        // Test event listeners
        xumm.on("ready", () => {
          console.log("✓ Xumm SDK is ready");
        });
        
        xumm.on("error", (error) => {
          console.error("✗ Xumm SDK error:", error);
        });
        
        xumm.on("success", () => {
          console.log("✓ Xumm authorization successful");
        });
        
        xumm.on("retrieving", () => {
          console.log("✓ Xumm retrieving");
        });
        
        xumm.on("retrieved", () => {
          console.log("✓ Xumm retrieved");
        });
        
        // Wait for SDK to be ready
        console.log("Waiting for SDK to be ready...");
        await new Promise(resolve => {
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
        
        // Test payload creation with detailed logging
        console.log("Testing payload creation...");
        try {
          console.log("Creating SignIn payload...");
          
          // Add timeout to payload creation
          const payloadPromise = xumm.payload.create({
            TransactionType: 'SignIn',
          });
          
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Payload creation timeout')), 10000)
          );
          
          const payload = await Promise.race([payloadPromise, timeoutPromise]);
          
          console.log("✓ Payload created successfully");
          console.log("Payload:", payload);
          
          // Check if payload has the expected properties
          if (payload && payload.uuid && payload.refs && payload.refs.qr_png) {
            console.log("✓ Payload has expected properties");
            console.log("- UUID:", payload.uuid);
            console.log("- QR PNG URL:", payload.refs.qr_png);
            console.log("- Next URL:", payload.next?.always);
            console.log("- Pushed:", payload.pushed);
          } else {
            console.error("✗ Payload missing expected properties");
            console.error("Payload structure:", JSON.stringify(payload, null, 2));
          }
        } catch (error) {
          console.error("✗ Error creating payload:", error);
          console.error("Error stack:", error.stack);
        }
        
      } catch (error) {
        console.error("✗ Error creating Xumm instance:", error);
        console.error("Error stack:", error.stack);
      }
    } else {
      console.error("✗ Xumm class not found in module");
    }
  })
  .catch((error) => {
    console.error("✗ Failed to import Xumm module:", error);
    console.error("Error stack:", error.stack);
  });