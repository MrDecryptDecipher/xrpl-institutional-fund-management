// Test file to verify Xumm SDK import
import("xumm")
  .then((xummModule) => {
    console.log("Xumm SDK imported successfully");
    console.log("Available exports:", Object.keys(xummModule));
    
    const XummClass = xummModule.Xumm || xummModule.default;
    if (XummClass) {
      console.log("Xumm class found:", typeof XummClass);
    } else {
      console.log("Xumm class not found in module");
    }
  })
  .catch((error) => {
    console.error("Failed to import Xumm SDK:", error);
  });