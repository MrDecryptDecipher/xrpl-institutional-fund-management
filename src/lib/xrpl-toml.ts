import axios from 'axios';
import toml from 'toml';

/**
 * XRPL TOML Domain Verification Implementation
 * 
 * This module implements functionality for parsing and verifying xrp-ledger.toml files
 * as specified in the XRPL documentation.
 * 
 * The xrp-ledger.toml file is used for domain verification in the XRP Ledger ecosystem.
 * It allows validators and account owners to prove they control both a domain and 
 * a validator/account on the XRP Ledger.
 */

export interface XRPLTomlMetadata {
  modified?: string;
  expires?: string;
}

export interface XRPLTomlValidator {
  public_key: string;
  attestation?: string;
  network?: string;
  owner_country?: string;
  server_country?: string;
  unl?: string;
}

export interface XRPLTomlAccount {
  address: string;
  network?: string;
  desc?: string;
}

export interface XRPLTomlPrincipal {
  name?: string;
  email?: string;
  social_1?: string;
}

export interface XRPLTomlServer {
  json_rpc?: string;
  ws?: string;
  peer?: string;
  network?: string;
}

export interface XRPLTomlCurrency {
  code: string;
  display_decimals?: number;
  issuer?: string;
  network?: string;
  symbol?: string;
}

export interface XRPLTomlData {
  METADATA?: XRPLTomlMetadata;
  VALIDATORS?: XRPLTomlValidator[];
  ACCOUNTS?: XRPLTomlAccount[];
  PRINCIPALS?: XRPLTomlPrincipal[];
  SERVERS?: XRPLTomlServer[];
  CURRENCIES?: XRPLTomlCurrency[];
}

/**
 * Fetch and parse an xrp-ledger.toml file from a domain
 * 
 * @param domain - The domain to fetch the xrp-ledger.toml file from
 * @returns Parsed xrp-ledger.toml data
 */
export async function fetchXRPLToml(domain: string): Promise<XRPLTomlData> {
  try {
    // Construct the URL for the xrp-ledger.toml file
    const url = `https://${domain}/.well-known/xrp-ledger.toml`;
    
    // Fetch the file
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/toml, text/plain, */*'
      }
    });
    
    // Parse the TOML content
    const parsedData = toml.parse(response.data) as XRPLTomlData;
    
    return parsedData;
  } catch (error) {
    throw new Error(`Failed to fetch or parse xrp-ledger.toml from ${domain}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Verify that a validator is claimed by a domain
 * 
 * @param domain - The domain to check
 * @param validatorPublicKey - The validator public key to look for
 * @returns True if the validator is claimed by the domain, false otherwise
 */
export async function verifyValidatorDomain(domain: string, validatorPublicKey: string): Promise<boolean> {
  try {
    const tomlData = await fetchXRPLToml(domain);
    
    // Check if the VALIDATORS section exists
    if (!tomlData.VALIDATORS || tomlData.VALIDATORS.length === 0) {
      return false;
    }
    
    // Look for the validator public key in the VALIDATORS section
    return tomlData.VALIDATORS.some(validator => validator.public_key === validatorPublicKey);
  } catch (error) {
    console.error(`Error verifying validator domain: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Verify that an account is claimed by a domain
 * 
 * @param domain - The domain to check
 * @param accountAddress - The account address to look for
 * @returns True if the account is claimed by the domain, false otherwise
 */
export async function verifyAccountDomain(domain: string, accountAddress: string): Promise<boolean> {
  try {
    const tomlData = await fetchXRPLToml(domain);
    
    // Check if the ACCOUNTS section exists
    if (!tomlData.ACCOUNTS || tomlData.ACCOUNTS.length === 0) {
      return false;
    }
    
    // Look for the account address in the ACCOUNTS section
    return tomlData.ACCOUNTS.some(account => account.address === accountAddress);
  } catch (error) {
    console.error(`Error verifying account domain: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Validate the structure of an xrp-ledger.toml file
 * 
 * @param tomlData - The parsed TOML data to validate
 * @returns True if the structure is valid, false otherwise
 */
export function validateXRPLTomlStructure(tomlData: XRPLTomlData): boolean {
  // Check METADATA section if it exists
  if (tomlData.METADATA) {
    if (tomlData.METADATA.modified && typeof tomlData.METADATA.modified !== 'string') {
      return false;
    }
    if (tomlData.METADATA.expires && typeof tomlData.METADATA.expires !== 'string') {
      return false;
    }
  }
  
  // Check VALIDATORS section if it exists
  if (tomlData.VALIDATORS) {
    if (!Array.isArray(tomlData.VALIDATORS)) {
      return false;
    }
    
    for (const validator of tomlData.VALIDATORS) {
      if (!validator.public_key || typeof validator.public_key !== 'string') {
        return false;
      }
      
      if (validator.attestation && typeof validator.attestation !== 'string') {
        return false;
      }
      
      if (validator.network && typeof validator.network !== 'string') {
        return false;
      }
      
      if (validator.owner_country && typeof validator.owner_country !== 'string') {
        return false;
      }
      
      if (validator.server_country && typeof validator.server_country !== 'string') {
        return false;
      }
      
      if (validator.unl && typeof validator.unl !== 'string') {
        return false;
      }
    }
  }
  
  // Check ACCOUNTS section if it exists
  if (tomlData.ACCOUNTS) {
    if (!Array.isArray(tomlData.ACCOUNTS)) {
      return false;
    }
    
    for (const account of tomlData.ACCOUNTS) {
      if (!account.address || typeof account.address !== 'string') {
        return false;
      }
      
      if (account.network && typeof account.network !== 'string') {
        return false;
      }
      
      if (account.desc && typeof account.desc !== 'string') {
        return false;
      }
    }
  }
  
  // Check PRINCIPALS section if it exists
  if (tomlData.PRINCIPALS) {
    if (!Array.isArray(tomlData.PRINCIPALS)) {
      return false;
    }
    
    for (const principal of tomlData.PRINCIPALS) {
      if (principal.name && typeof principal.name !== 'string') {
        return false;
      }
      
      if (principal.email && typeof principal.email !== 'string') {
        return false;
      }
      
      if (principal.social_1 && typeof principal.social_1 !== 'string') {
        return false;
      }
    }
  }
  
  // Check SERVERS section if it exists
  if (tomlData.SERVERS) {
    if (!Array.isArray(tomlData.SERVERS)) {
      return false;
    }
    
    for (const server of tomlData.SERVERS) {
      if (server.json_rpc && typeof server.json_rpc !== 'string') {
        return false;
      }
      
      if (server.ws && typeof server.ws !== 'string') {
        return false;
      }
      
      if (server.peer && typeof server.peer !== 'string') {
        return false;
      }
      
      if (server.network && typeof server.network !== 'string') {
        return false;
      }
    }
  }
  
  // Check CURRENCIES section if it exists
  if (tomlData.CURRENCIES) {
    if (!Array.isArray(tomlData.CURRENCIES)) {
      return false;
    }
    
    for (const currency of tomlData.CURRENCIES) {
      if (!currency.code || typeof currency.code !== 'string') {
        return false;
      }
      
      if (currency.display_decimals !== undefined && typeof currency.display_decimals !== 'number') {
        return false;
      }
      
      if (currency.issuer && typeof currency.issuer !== 'string') {
        return false;
      }
      
      if (currency.network && typeof currency.network !== 'string') {
        return false;
      }
      
      if (currency.symbol && typeof currency.symbol !== 'string') {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Generate a sample xrp-ledger.toml content
 * 
 * @returns Sample xrp-ledger.toml content as a string
 */
export function generateSampleXRPLToml(): string {
  return `# Example xrp-ledger.toml file
# Note: all fields and all sections are optional.

[METADATA]
modified = "2025-01-01T00:00:00.000Z"
expires = "2025-12-31T00:00:00.000Z"

[[VALIDATORS]]
public_key = "nHBtDzdRDykxiuv7uSMPTcGexNm879RUUz5GW4h1qgjbtyvWZ1LE"
attestation = "A59AB577E14A7BEC053752ABFE78C3DED6DCEC81A7C41DF1931BC61742BB4FAEAA0D4F1C1EAE5BC74F6D68A3B26C8A223EA2492A5BD18D51F8AC7F4A97DFBE0C"
network = "main"
owner_country = "us"
server_country = "us"
unl = "https://vl.ripple.com"

[[ACCOUNTS]]
address = "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV"
desc = "Example account"

[[SERVERS]]
json_rpc = "https://s1.ripple.com:51234/"
ws = "wss://s1.ripple.com/"
peer = "https://s1.ripple.com:51235/"
desc = "General purpose server cluster"

[[PRINCIPALS]]
name = "John Doe"
email = "john.doe@example.com"
social_1 = "twitter=@johndoe"

[[CURRENCIES]]
code = "USD"
issuer = "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV"
display_decimals = 2
symbol = "$"
`;
}