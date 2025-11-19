// Test script to verify Xaman SDK initialization with the actual API key
console.log("Testing Xaman SDK initialization with actual API key...");

// Simulate browser environment
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.process = window.process || {};
  // @ts-ignore
  window.process.browser = true;
}

const API_KEY = "b53edeaf-0046-49a6-a100-4bb284be3682";

// Test importing the Xumm module and initializing with actual API key
import("xumm")
  .then((xummModule) => {
    console.log("Xumm module imported successfully");
    console.log("Available exports:", Object.keys(xummModule));
    
    const XummClass = xummModule.Xumm || xummModule.default;
    if (XummClass) {
      console.log("Xumm class found:", typeof XummClass);
      
      // Try to initialize with the actual API key
      try {
        console.log("Attempting to create Xumm instance with API key...");
        const xumm = new XummClass(API_KEY);
        console.log("Xumm instance created successfully");
        console.log("Xumm instance keys:", Object.keys(xumm));
        
        // Try to access some properties
        console.log("Testing xumm.user.account...");
        xumm.user.account.then((account: any) => {
          console.log("Account retrieval successful:", account);
        }).catch((error: any) => {
          console.log("Account retrieval failed (expected if not connected):", error.message);
        });
        
      } catch (error) {
        console.log("Error creating Xumm instance:", error);
      }
    } else {
      console.log("Xumm class not found in module");
    }
  })
  .catch((error) => {
    console.error("Failed to import Xumm SDK:", error);
  });