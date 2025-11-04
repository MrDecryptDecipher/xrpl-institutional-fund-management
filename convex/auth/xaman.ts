import { api } from "../../convex/_generated/api";
import { Xumm } from "xumm";

// Xaman authentication provider
export async function getXamanAccount(payloadUuid: string) {
  // Get API credentials from environment variables
  const apiKey = process.env.VITE_XUMM_API_KEY;
  const apiSecret = process.env.XUMM_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    throw new Error("Xaman API credentials not configured");
  }
  
  // Initialize Xumm SDK with both credentials (only safe in backend)
  const xumm = new Xumm(apiKey, apiSecret);
  
  try {
    // Get the payload result
    const payload = await xumm.payload?.get(payloadUuid);
    
    if (!payload) {
      throw new Error("Failed to get Xaman payload");
    }
    
    // Check if the payload was signed
    if (!payload.response || !payload.response.account) {
      throw new Error("Xaman payload not signed or account not found");
    }
    
    return payload.response.account;
  } catch (error) {
    console.error("Error getting Xaman account:", error);
    throw new Error("Failed to verify Xaman authentication");
  }
}

// Create or get user by XRPL account
export async function createOrGetUserByXRPLAccount(
  xrplAccount: string
) {
  // For now, we'll just return the account as the user ID
  // In a real implementation, this would create or get a user from the database
  return xrplAccount;
}