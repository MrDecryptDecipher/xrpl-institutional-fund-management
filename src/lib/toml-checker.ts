import axios from 'axios';
import toml from 'toml';
import { validateXRPLTomlStructure } from './xrpl-toml';

/**
 * xrp-ledger.toml Checker Implementation
 * 
 * This module provides functionality for verifying that xrp-ledger.toml files
 * are syntactically correct and deployed properly as specified in the XRPL documentation.
 */

export interface TomlCheckResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  data?: any;
}

export interface DomainVerificationResult {
  domain: string;
  account: string;
  verified: boolean;
  errors: string[];
}

/**
 * xrp-ledger.toml Checker
 * 
 * This class provides methods for checking xrp-ledger.toml files.
 */
export class TomlChecker {
  /**
   * Check if an xrp-ledger.toml file is syntactically correct
   * 
   * @param domain - The domain to check
   * @returns Promise that resolves with check results
   */
  async checkTomlFile(domain: string): Promise<TomlCheckResult> {
    const result: TomlCheckResult = {
      valid: false,
      errors: [],
      warnings: []
    };
    
    try {
      // Construct the URL for the xrp-ledger.toml file
      const url = `https://${domain}/.well-known/xrp-ledger.toml`;
      
      // Fetch the file
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/toml, text/plain, */*'
        },
        timeout: 10000 // 10 second timeout
      });
      
      // Check Content-Type header
      const contentType = response.headers['content-type'];
      if (contentType && !contentType.includes('application/toml') && !contentType.includes('text/plain')) {
        result.warnings.push(`Unexpected Content-Type: ${contentType}`);
      }
      
      // Parse the TOML content
      const parsedData = toml.parse(response.data);
      result.data = parsedData;
      
      // Validate the structure
      const isValidStructure = validateXRPLTomlStructure(parsedData);
      if (!isValidStructure) {
        result.errors.push('Invalid TOML structure');
        return result;
      }
      
      // Additional validation checks
      this.validateTomlContent(parsedData, result);
      
      result.valid = result.errors.length === 0;
      return result;
    } catch (error) {
      result.errors.push(`Failed to fetch or parse xrp-ledger.toml from ${domain}: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }
  
  /**
   * Validate TOML content for common issues
   * 
   * @param data - The parsed TOML data
   * @param result - The check result to update
   */
  private validateTomlContent(data: any, result: TomlCheckResult): void {
    // Check METADATA section
    if (data.METADATA) {
      if (data.METADATA.modified) {
        // Check if modified date is a valid ISO date
        const modifiedDate = new Date(data.METADATA.modified);
        if (isNaN(modifiedDate.getTime())) {
          result.errors.push('METADATA.modified is not a valid ISO date');
        }
      }
      
      if (data.METADATA.expires) {
        // Check if expires date is a valid ISO date
        const expiresDate = new Date(data.METADATA.expires);
        if (isNaN(expiresDate.getTime())) {
          result.errors.push('METADATA.expires is not a valid ISO date');
        }
        
        // Check if expires date is after modified date
        if (data.METADATA.modified) {
          const modifiedDate = new Date(data.METADATA.modified);
          if (expiresDate <= modifiedDate) {
            result.warnings.push('METADATA.expires should be after METADATA.modified');
          }
        }
      }
    }
    
    // Check VALIDATORS section
    if (data.VALIDATORS) {
      if (!Array.isArray(data.VALIDATORS)) {
        result.errors.push('VALIDATORS should be an array');
      } else {
        data.VALIDATORS.forEach((validator: any, index: number) => {
          if (!validator.public_key) {
            result.errors.push(`VALIDATORS[${index}] missing public_key`);
          }
          
          // Basic validation of public key format (this is a simple check)
          if (validator.public_key && typeof validator.public_key === 'string') {
            if (!validator.public_key.startsWith('n')) {
              result.warnings.push(`VALIDATORS[${index}] public_key may have invalid format`);
            }
          }
        });
      }
    }
    
    // Check ACCOUNTS section
    if (data.ACCOUNTS) {
      if (!Array.isArray(data.ACCOUNTS)) {
        result.errors.push('ACCOUNTS should be an array');
      } else {
        data.ACCOUNTS.forEach((account: any, index: number) => {
          if (!account.address) {
            result.errors.push(`ACCOUNTS[${index}] missing address`);
          }
          
          // Basic validation of address format (this is a simple check)
          if (account.address && typeof account.address === 'string') {
            if (!account.address.startsWith('r')) {
              result.warnings.push(`ACCOUNTS[${index}] address may have invalid format`);
            }
          }
        });
      }
    }
  }
  
  /**
   * Verify that an account is claimed by a domain
   * 
   * @param domain - The domain to check
   * @param accountAddress - The account address to verify
   * @returns Promise that resolves with verification results
   */
  async verifyAccountDomain(domain: string, accountAddress: string): Promise<DomainVerificationResult> {
    const result: DomainVerificationResult = {
      domain,
      account: accountAddress,
      verified: false,
      errors: []
    };
    
    try {
      // Check the xrp-ledger.toml file
      const tomlResult = await this.checkTomlFile(domain);
      
      if (!tomlResult.valid) {
        result.errors = tomlResult.errors;
        return result;
      }
      
      // Check if the account is listed in the TOML file
      if (tomlResult.data && tomlResult.data.ACCOUNTS) {
        const accountFound = tomlResult.data.ACCOUNTS.some((account: any) => 
          account.address === accountAddress
        );
        
        if (accountFound) {
          result.verified = true;
        } else {
          result.errors.push(`Account ${accountAddress} not found in ${domain}'s xrp-ledger.toml`);
        }
      } else {
        result.errors.push(`No ACCOUNTS section found in ${domain}'s xrp-ledger.toml`);
      }
      
      return result;
    } catch (error) {
      result.errors.push(`Failed to verify account domain: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }
  
  /**
   * Check CORS headers for xrp-ledger.toml file
   * 
   * @param domain - The domain to check
   * @returns Promise that resolves with CORS check results
   */
  async checkCorsHeaders(domain: string): Promise<{ valid: boolean; errors: string[]; headers?: any }> {
    const result = {
      valid: false,
      errors: [] as string[]
    };
    
    try {
      const url = `https://${domain}/.well-known/xrp-ledger.toml`;
      
      // Make a preflight request to check CORS headers
      const response = await axios.options(url, {
        headers: {
          'Origin': 'https://example.com',
          'Access-Control-Request-Method': 'GET'
        }
      });
      
      result.headers = response.headers;
      
      // Check for required CORS headers
      if (response.headers['access-control-allow-origin']) {
        const allowedOrigin = response.headers['access-control-allow-origin'];
        if (allowedOrigin === '*' || allowedOrigin === 'https://example.com') {
          result.valid = true;
        } else {
          result.errors.push(`Unexpected Access-Control-Allow-Origin: ${allowedOrigin}`);
        }
      } else {
        result.errors.push('Missing Access-Control-Allow-Origin header');
      }
      
      return result;
    } catch (error) {
      result.errors.push(`Failed to check CORS headers: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }
  
  /**
   * Perform comprehensive check of xrp-ledger.toml file
   * 
   * @param domain - The domain to check
   * @returns Promise that resolves with comprehensive check results
   */
  async comprehensiveCheck(domain: string): Promise<any> {
    const results: any = {
      domain,
      tomlCheck: null as any,
      corsCheck: null as any,
      accountVerifications: [] as DomainVerificationResult[]
    };
    
    try {
      // Check TOML file syntax and structure
      console.log(`Checking xrp-ledger.toml file for ${domain}...`);
      results.tomlCheck = await this.checkTomlFile(domain);
      
      // Check CORS headers
      console.log(`Checking CORS headers for ${domain}...`);
      results.corsCheck = await this.checkCorsHeaders(domain);
      
      // If TOML file is valid, check accounts
      if (results.tomlCheck.valid && results.tomlCheck.data?.ACCOUNTS) {
        console.log(`Verifying accounts for ${domain}...`);
        for (const account of results.tomlCheck.data.ACCOUNTS) {
          if (account.address) {
            const verification = await this.verifyAccountDomain(domain, account.address);
            results.accountVerifications.push(verification);
          }
        }
      }
      
      return results;
    } catch (error) {
      throw new Error(`Comprehensive check failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create a new TOML Checker instance
 * 
 * @returns A new TOML Checker instance
 */
export function createTomlChecker(): TomlChecker {
  return new TomlChecker();
}import axios from 'axios';
import toml from 'toml';
import { validateXRPLTomlStructure } from './xrpl-toml';

/**
 * xrp-ledger.toml Checker Implementation
 * 
 * This module provides functionality for verifying that xrp-ledger.toml files
 * are syntactically correct and deployed properly as specified in the XRPL documentation.
 */

export interface TomlCheckResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  data?: any;
}

export interface DomainVerificationResult {
  domain: string;
  account: string;
  verified: boolean;
  errors: string[];
}

/**
 * xrp-ledger.toml Checker
 * 
 * This class provides methods for checking xrp-ledger.toml files.
 */
export class TomlChecker {
  /**
   * Check if an xrp-ledger.toml file is syntactically correct
   * 
   * @param domain - The domain to check
   * @returns Promise that resolves with check results
   */
  async checkTomlFile(domain: string): Promise<TomlCheckResult> {
    const result: TomlCheckResult = {
      valid: false,
      errors: [],
      warnings: []
    };
    
    try {
      // Construct the URL for the xrp-ledger.toml file
      const url = `https://${domain}/.well-known/xrp-ledger.toml`;
      
      // Fetch the file
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/toml, text/plain, */*'
        },
        timeout: 10000 // 10 second timeout
      });
      
      // Check Content-Type header
      const contentType = response.headers['content-type'];
      if (contentType && !contentType.includes('application/toml') && !contentType.includes('text/plain')) {
        result.warnings.push(`Unexpected Content-Type: ${contentType}`);
      }
      
      // Parse the TOML content
      const parsedData = toml.parse(response.data);
      result.data = parsedData;
      
      // Validate the structure
      const isValidStructure = validateXRPLTomlStructure(parsedData);
      if (!isValidStructure) {
        result.errors.push('Invalid TOML structure');
        return result;
      }
      
      // Additional validation checks
      this.validateTomlContent(parsedData, result);
      
      result.valid = result.errors.length === 0;
      return result;
    } catch (error) {
      result.errors.push(`Failed to fetch or parse xrp-ledger.toml from ${domain}: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }
  
  /**
   * Validate TOML content for common issues
   * 
   * @param data - The parsed TOML data
   * @param result - The check result to update
   */
  private validateTomlContent(data: any, result: TomlCheckResult): void {
    // Check METADATA section
    if (data.METADATA) {
      if (data.METADATA.modified) {
        // Check if modified date is a valid ISO date
        const modifiedDate = new Date(data.METADATA.modified);
        if (isNaN(modifiedDate.getTime())) {
          result.errors.push('METADATA.modified is not a valid ISO date');
        }
      }
      
      if (data.METADATA.expires) {
        // Check if expires date is a valid ISO date
        const expiresDate = new Date(data.METADATA.expires);
        if (isNaN(expiresDate.getTime())) {
          result.errors.push('METADATA.expires is not a valid ISO date');
        }
        
        // Check if expires date is after modified date
        if (data.METADATA.modified) {
          const modifiedDate = new Date(data.METADATA.modified);
          if (expiresDate <= modifiedDate) {
            result.warnings.push('METADATA.expires should be after METADATA.modified');
          }
        }
      }
    }
    
    // Check VALIDATORS section
    if (data.VALIDATORS) {
      if (!Array.isArray(data.VALIDATORS)) {
        result.errors.push('VALIDATORS should be an array');
      } else {
        data.VALIDATORS.forEach((validator: any, index: number) => {
          if (!validator.public_key) {
            result.errors.push(`VALIDATORS[${index}] missing public_key`);
          }
          
          // Basic validation of public key format (this is a simple check)
          if (validator.public_key && typeof validator.public_key === 'string') {
            if (!validator.public_key.startsWith('n')) {
              result.warnings.push(`VALIDATORS[${index}] public_key may have invalid format`);
            }
          }
        });
      }
    }
    
    // Check ACCOUNTS section
    if (data.ACCOUNTS) {
      if (!Array.isArray(data.ACCOUNTS)) {
        result.errors.push('ACCOUNTS should be an array');
      } else {
        data.ACCOUNTS.forEach((account: any, index: number) => {
          if (!account.address) {
            result.errors.push(`ACCOUNTS[${index}] missing address`);
          }
          
          // Basic validation of address format (this is a simple check)
          if (account.address && typeof account.address === 'string') {
            if (!account.address.startsWith('r')) {
              result.warnings.push(`ACCOUNTS[${index}] address may have invalid format`);
            }
          }
        });
      }
    }
  }
  
  /**
   * Verify that an account is claimed by a domain
   * 
   * @param domain - The domain to check
   * @param accountAddress - The account address to verify
   * @returns Promise that resolves with verification results
   */
  async verifyAccountDomain(domain: string, accountAddress: string): Promise<DomainVerificationResult> {
    const result: DomainVerificationResult = {
      domain,
      account: accountAddress,
      verified: false,
      errors: []
    };
    
    try {
      // Check the xrp-ledger.toml file
      const tomlResult = await this.checkTomlFile(domain);
      
      if (!tomlResult.valid) {
        result.errors = tomlResult.errors;
        return result;
      }
      
      // Check if the account is listed in the TOML file
      if (tomlResult.data && tomlResult.data.ACCOUNTS) {
        const accountFound = tomlResult.data.ACCOUNTS.some((account: any) => 
          account.address === accountAddress
        );
        
        if (accountFound) {
          result.verified = true;
        } else {
          result.errors.push(`Account ${accountAddress} not found in ${domain}'s xrp-ledger.toml`);
        }
      } else {
        result.errors.push(`No ACCOUNTS section found in ${domain}'s xrp-ledger.toml`);
      }
      
      return result;
    } catch (error) {
      result.errors.push(`Failed to verify account domain: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }
  
  /**
   * Check CORS headers for xrp-ledger.toml file
   * 
   * @param domain - The domain to check
   * @returns Promise that resolves with CORS check results
   */
  async checkCorsHeaders(domain: string): Promise<{ valid: boolean; errors: string[]; headers?: any }> {
    const result = {
      valid: false,
      errors: [] as string[]
    };
    
    try {
      const url = `https://${domain}/.well-known/xrp-ledger.toml`;
      
      // Make a preflight request to check CORS headers
      const response = await axios.options(url, {
        headers: {
          'Origin': 'https://example.com',
          'Access-Control-Request-Method': 'GET'
        }
      });
      
      result.headers = response.headers;
      
      // Check for required CORS headers
      if (response.headers['access-control-allow-origin']) {
        const allowedOrigin = response.headers['access-control-allow-origin'];
        if (allowedOrigin === '*' || allowedOrigin === 'https://example.com') {
          result.valid = true;
        } else {
          result.errors.push(`Unexpected Access-Control-Allow-Origin: ${allowedOrigin}`);
        }
      } else {
        result.errors.push('Missing Access-Control-Allow-Origin header');
      }
      
      return result;
    } catch (error) {
      result.errors.push(`Failed to check CORS headers: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }
  
  /**
   * Perform comprehensive check of xrp-ledger.toml file
   * 
   * @param domain - The domain to check
   * @returns Promise that resolves with comprehensive check results
   */
  async comprehensiveCheck(domain: string): Promise<any> {
    const results: any = {
      domain,
      tomlCheck: null as any,
      corsCheck: null as any,
      accountVerifications: [] as DomainVerificationResult[]
    };
    
    try {
      // Check TOML file syntax and structure
      console.log(`Checking xrp-ledger.toml file for ${domain}...`);
      results.tomlCheck = await this.checkTomlFile(domain);
      
      // Check CORS headers
      console.log(`Checking CORS headers for ${domain}...`);
      results.corsCheck = await this.checkCorsHeaders(domain);
      
      // If TOML file is valid, check accounts
      if (results.tomlCheck.valid && results.tomlCheck.data?.ACCOUNTS) {
        console.log(`Verifying accounts for ${domain}...`);
        for (const account of results.tomlCheck.data.ACCOUNTS) {
          if (account.address) {
            const verification = await this.verifyAccountDomain(domain, account.address);
            results.accountVerifications.push(verification);
          }
        }
      }
      
      return results;
    } catch (error) {
      throw new Error(`Comprehensive check failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create a new TOML Checker instance
 * 
 * @returns A new TOML Checker instance
 */
export function createTomlChecker(): TomlChecker {
  return new TomlChecker();
}