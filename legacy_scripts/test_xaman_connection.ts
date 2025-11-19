import { Xumm } from 'xumm';

async function testXamanConnection() {
  try {
    console.log("Testing Xaman connection...");
    
    // Initialize Xumm with your API key only (as per the working implementation)
    const xumm = new Xumm('b53edeaf-0046-49a6-a100-4bb284be3682');
    
    console.log("Xumm initialized successfully");
    
    // Test creating a simple payload
    const payload = await xumm.payload?.create({
      TransactionType: "SignIn",
      SignIn: true
    });
    
    if (payload) {
      console.log("Payload created successfully");
      console.log("Payload UUID:", payload.uuid);
      console.log("QR Code URL:", payload.next?.always);
      
      // Cancel the payload since we're just testing
      await xumm.payload?.cancel(payload.uuid);
      console.log("Payload cancelled");
    } else {
      console.log("Failed to create payload");
    }
  } catch (error) {
    console.error("Error testing Xaman connection:", error);
  }
}

testXamanConnection();