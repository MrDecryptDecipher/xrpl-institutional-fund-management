import { TransactionResult } from './transaction-manager';

/**
 * XRPL Transaction Error Handler
 * 
 * This module provides comprehensive error handling for all XRPL transaction types
 * based on the transaction result codes documented in XRPL folder J.
 */

// ==================== TRANSACTION RESULT CODES ====================

// tec codes (100-199) - Transaction failed but applied to ledger
export const TEC_CODES = {
  tecAMM_ACCOUNT: 168,
  tecAMM_UNFUNDED: 162,
  tecAMM_BALANCE: 163,
  tecAMM_EMPTY: 166,
  tecAMM_FAILED: 164,
  tecAMM_INVALID_TOKENS: 165,
  tecAMM_NOT_EMPTY: 167,
  tecCANT_ACCEPT_OWN_NFTOKEN_OFFER: 157,
  tecCLAIM: 100,
  tecCRYPTOCONDITION_ERROR: 146,
  tecDIR_FULL: 121,
  tecDUPLICATE: 149,
  tecDST_TAG_NEEDED: 143,
  tecEMPTY_DID: 187,
  tecEXPIRED: 148,
  tecFAILED_PROCESSING: 105,
  tecFROZEN: 137,
  tecHAS_OBLIGATIONS: 151,
  tecINSUF_RESERVE_LINE: 122,
  tecINSUF_RESERVE_OFFER: 123,
  tecINSUFF_FEE: 136,
  tecINSUFFICIENT_FUNDS: 158,
  tecINSUFFICIENT_PAYMENT: 161,
  tecINSUFFICIENT_RESERVE: 141,
  tecINTERNAL: 144,
  tecINVALID_UPDATE_TIME: 188,
  tecINVARIANT_FAILED: 147,
  tecKILLED: 150,
  tecMAX_SEQUENCE_REACHED: 153,
  tecNEED_MASTER_KEY: 142,
  tecNFTOKEN_BUY_SELL_MISMATCH: 155,
  tecNFTOKEN_OFFER_TYPE_MISMATCH: 156,
  tecNO_ALTERNATIVE_KEY: 130,
  tecNO_AUTH: 134,
  tecNO_DST: 124,
  tecNO_DST_INSUF_XRP: 125,
  tecNO_ENTRY: 140,
  tecNO_ISSUER: 133,
  tecNO_LINE: 135,
  tecNO_LINE_INSUF_RESERVE: 126,
  tecNO_LINE_REDUNDANT: 127,
  tecNO_PERMISSION: 139,
  tecNO_REGULAR_KEY: 131,
  tecNO_SUITABLE_NFTOKEN_PAGE: 154,
  tecNO_TARGET: 138,
  tecOBJECT_NOT_FOUND: 160,
  tecOVERSIZE: 145,
  tecOWNERS: 132,
  tecPATH_DRY: 128,
  tecPATH_PARTIAL: 101,
  tecTOO_SOON: 152,
  tecUNFUNDED: 129,
  tecUNFUNDED_ADD: 102,
  tecUNFUNDED_PAYMENT: 104,
  tecUNFUNDED_OFFER: 103
} as const;

// tef codes (-199 to -100) - Transaction failed, not applied to ledger
export const TEF_CODES = {
  tefALREADY: -100,
  tefBAD_ADD_AUTH: -101,
  tefBAD_AUTH: -102,
  tefBAD_AUTH_MASTER: -103,
  tefBAD_LEDGER: -104,
  tefBAD_QUORUM: -105,
  tefBAD_SIGNATURE: -106,
  tefCREATED: -107,
  tefEXCEPTION: -108,
  tefFAILURE: -109,
  tefINTERNAL: -110,
  tefINVARIANT_FAILED: -111,
  tefMASTER_DISABLED: -112,
  tefMAX_LEDGER: -113,
  tefNFTOKEN_IS_NOT_TRANSFERABLE: -114,
  tefNO_AUTH_REQUIRED: -115,
  tefNO_TICKET: -116,
  tefNOT_MULTI_SIGNING: -117,
  tefPAST_SEQ: -118,
  tefTOO_BIG: -119,
  tefWRONG_PRIOR: -120
} as const;

// tel codes (-399 to -300) - Local error, may succeed on other servers
export const TEL_CODES = {
  telBAD_DOMAIN: -300,
  telBAD_PATH_COUNT: -301,
  telBAD_PUBLIC_KEY: -302,
  telCAN_NOT_QUEUE: -303,
  telCAN_NOT_QUEUE_BALANCE: -304,
  telCAN_NOT_QUEUE_BLOCKS: -305,
  telCAN_NOT_QUEUE_BLOCKED: -306,
  telCAN_NOT_QUEUE_FEE: -307,
  telCAN_NOT_QUEUE_FULL: -308,
  telFAILED_PROCESSING: -309,
  telINSUF_FEE_P: -310,
  telLOCAL_ERROR: -311,
  telNETWORK_ID_MAKES_TX_NON_CANONICAL: -312,
  telNO_DST_PARTIAL: -313,
  telREQUIRES_NETWORK_ID: -314,
  telWRONG_NETWORK: -315
} as const;

// tem codes (-299 to -200) - Transaction malformed
export const TEM_CODES = {
  temBAD_AMM_TOKENS: -200,
  temBAD_AMOUNT: -201,
  temBAD_AUTH_MASTER: -202,
  temBAD_CURRENCY: -203,
  temBAD_EXPIRATION: -204,
  temBAD_FEE: -205,
  temBAD_ISSUER: -206,
  temBAD_LIMIT: -207,
  temBAD_NFTOKEN_TRANSFER_FEE: -208,
  temBAD_OFFER: -209,
  temBAD_PATH: -210,
  temBAD_PATH_LOOP: -211,
  temBAD_SEND_XRP_LIMIT: -212,
  temBAD_SEND_XRP_MAX: -213,
  temBAD_SEND_XRP_NO_DIRECT: -214,
  temBAD_SEND_XRP_PARTIAL: -215,
  temBAD_SEND_XRP_PATHS: -216,
  temBAD_SEQUENCE: -217,
  temBAD_SIGNATURE: -218,
  temBAD_SRC_ACCOUNT: -219,
  temBAD_TRANSFER_RATE: -220,
  temCANNOT_PREAUTH_SELF: -221,
  temDST_IS_SRC: -222,
  temDST_NEEDED: -223,
  temINVALID: -224,
  temINVALID_COUNT: -225,
  temINVALID_FLAG: -226,
  temMALFORMED: -227,
  temREDUNDANT: -228,
  temREDUNDANT_SEND_MAX: -229,
  temRIPPLE_EMPTY: -230,
  temSEQ_AND_TICKET: -231,
  temBAD_WEIGHT: -232,
  temBAD_SIGNER: -233,
  temBAD_QUORUM: -234,
  temUNCERTAIN: -235,
  temUNKNOWN: -236,
  temDISABLED: -237
} as const;

// ter codes (-99 to -1) - Transaction retryable
export const TER_CODES = {
  terFUNDS_SPENT: -1,
  terINSUF_FEE_B: -2,
  terLAST: -3,
  terNO_ACCOUNT: -4,
  terNO_AMM: -5,
  terNO_AUTH: -6,
  terNO_LINE: -7,
  terNO_RIPPLE: -8,
  terOWNERS: -9,
  terPRE_SEQ: -10,
  terPRE_TICKET: -11,
  terQUEUED: -12,
  terRETRY: -13,
  terSUBMITTED: -14
} as const;

// tes code (0) - Transaction success
export const TES_CODES = {
  tesSUCCESS: 0
} as const;

// ==================== ERROR CATEGORIES ====================

export enum TransactionErrorCategory {
  SUCCESS = 'success',
  FAILURE_APPLIED = 'failure_applied',      // tec - Transaction failed but applied to ledger
  FAILURE_NOT_APPLIED = 'failure_not_applied', // tef - Transaction failed, not applied to ledger
  LOCAL_ERROR = 'local_error',              // tel - Local error, may succeed on other servers
  MALFORMED = 'malformed',                  // tem - Transaction malformed
  RETRYABLE = 'retryable',                  // ter - Transaction retryable
  UNKNOWN = 'unknown'
}

// ==================== ERROR HANDLING INTERFACES ====================

export interface TransactionErrorDetails {
  code: string;
  numericCode: number;
  category: TransactionErrorCategory;
  description: string;
  isFinal: boolean;
  canRetry: boolean;
  shouldReconnect: boolean;
  userMessage: string;
  developerMessage: string;
}

export interface EnhancedTransactionResult extends TransactionResult {
  errorDetails?: TransactionErrorDetails;
}

// ==================== ERROR HANDLING CLASS ====================

/**
 * Transaction Error Handler
 * 
 * This class provides comprehensive error handling for XRPL transactions
 * based on the transaction result codes.
 */
export class TransactionErrorHandler {
  /**
   * Get detailed error information for a transaction result
   * 
   * @param result - The transaction result
   * @returns Enhanced transaction result with error details
   */
  static enhanceTransactionResult(result: TransactionResult): EnhancedTransactionResult {
    const enhancedResult: EnhancedTransactionResult = { ...result };
    
    if (!result.success && result.error) {
      // Extract transaction result code from error message
      const resultCodeMatch = result.error.match(/(tec\w+|tef\w+|tel\w+|tem\w+|ter\w+|tes\w+)/);
      if (resultCodeMatch) {
        const resultCode = resultCodeMatch[1];
        enhancedResult.errorDetails = this.getTransactionErrorDetails(resultCode);
      }
    } else if (result.success && result.result) {
      // Check for tesSUCCESS in successful result
      const meta = result.result.meta as any;
      if (meta && meta.TransactionResult === 'tesSUCCESS') {
        enhancedResult.errorDetails = this.getTransactionErrorDetails('tesSUCCESS');
      }
    }
    
    return enhancedResult;
  }
  
  /**
   * Get detailed error information for a transaction result code
   * 
   * @param resultCode - The transaction result code (e.g., 'tecUNFUNDED', 'tefBAD_AUTH')
   * @returns Detailed error information
   */
  static getTransactionErrorDetails(resultCode: string): TransactionErrorDetails {
    // Handle tec codes (Transaction failed but applied to ledger)
    if (resultCode.startsWith('tec')) {
      const numericCode = TEC_CODES[resultCode as keyof typeof TEC_CODES];
      if (numericCode !== undefined) {
        return {
          code: resultCode,
          numericCode,
          category: TransactionErrorCategory.FAILURE_APPLIED,
          description: this.getTECDescription(resultCode),
          isFinal: true, // tec codes are final when in validated ledger
          canRetry: false,
          shouldReconnect: false,
          userMessage: this.getTECUserMessage(resultCode),
          developerMessage: `Transaction failed with tec code: ${resultCode} (${numericCode}). Applied to ledger but failed.`
        };
      }
    }
    
    // Handle tef codes (Transaction failed, not applied to ledger)
    if (resultCode.startsWith('tef')) {
      const numericCode = TEF_CODES[resultCode as keyof typeof TEF_CODES];
      if (numericCode !== undefined) {
        return {
          code: resultCode,
          numericCode,
          category: TransactionErrorCategory.FAILURE_NOT_APPLIED,
          description: this.getTEFDescription(resultCode),
          isFinal: true,
          canRetry: false,
          shouldReconnect: false,
          userMessage: this.getTEFUserMessage(resultCode),
          developerMessage: `Transaction failed with tef code: ${resultCode} (${numericCode}). Not applied to ledger.`
        };
      }
    }
    
    // Handle tel codes (Local error, may succeed on other servers)
    if (resultCode.startsWith('tel')) {
      const numericCode = TEL_CODES[resultCode as keyof typeof TEL_CODES];
      if (numericCode !== undefined) {
        return {
          code: resultCode,
          numericCode,
          category: TransactionErrorCategory.LOCAL_ERROR,
          description: this.getTELDescription(resultCode),
          isFinal: false,
          canRetry: true,
          shouldReconnect: false,
          userMessage: this.getTELUserMessage(resultCode),
          developerMessage: `Transaction failed with tel code: ${resultCode} (${numericCode}). Local error, may succeed on other servers.`
        };
      }
    }
    
    // Handle tem codes (Transaction malformed)
    if (resultCode.startsWith('tem')) {
      const numericCode = TEM_CODES[resultCode as keyof typeof TEM_CODES];
      if (numericCode !== undefined) {
        return {
          code: resultCode,
          numericCode,
          category: TransactionErrorCategory.MALFORMED,
          description: this.getTEMDescription(resultCode),
          isFinal: true,
          canRetry: false,
          shouldReconnect: false,
          userMessage: this.getTEMUserMessage(resultCode),
          developerMessage: `Transaction failed with tem code: ${resultCode} (${numericCode}). Transaction is malformed.`
        };
      }
    }
    
    // Handle ter codes (Transaction retryable)
    if (resultCode.startsWith('ter')) {
      const numericCode = TER_CODES[resultCode as keyof typeof TER_CODES];
      if (numericCode !== undefined) {
        return {
          code: resultCode,
          numericCode,
          category: TransactionErrorCategory.RETRYABLE,
          description: this.getTERDescription(resultCode),
          isFinal: false,
          canRetry: true,
          shouldReconnect: false,
          userMessage: this.getTERUserMessage(resultCode),
          developerMessage: `Transaction failed with ter code: ${resultCode} (${numericCode}). Transaction is retryable.`
        };
      }
    }
    
    // Handle tes codes (Transaction success)
    if (resultCode.startsWith('tes')) {
      const numericCode = TES_CODES[resultCode as keyof typeof TES_CODES];
      if (numericCode !== undefined) {
        return {
          code: resultCode,
          numericCode,
          category: TransactionErrorCategory.SUCCESS,
          description: 'Transaction was applied and forwarded to other servers successfully.',
          isFinal: true,
          canRetry: false,
          shouldReconnect: false,
          userMessage: 'Transaction completed successfully.',
          developerMessage: `Transaction succeeded with tes code: ${resultCode} (${numericCode}).`
        };
      }
    }
    
    // Unknown error code
    return {
      code: resultCode,
      numericCode: 0,
      category: TransactionErrorCategory.UNKNOWN,
      description: 'Unknown transaction result code.',
      isFinal: false,
      canRetry: false,
      shouldReconnect: true,
      userMessage: 'An unknown error occurred with the transaction.',
      developerMessage: `Unknown transaction result code: ${resultCode}`
    };
  }
  
  // ==================== DESCRIPTION METHODS ====================
  
  private static getTECDescription(code: string): string {
    const descriptions: Record<string, string> = {
      tecAMM_ACCOUNT: 'The transaction failed because the operation is not allowed on Automated Market Maker (AMM) accounts.',
      tecAMM_UNFUNDED: 'The AMMCreate transaction failed because the sender does not have enough of the specified assets to fund it.',
      tecAMM_BALANCE: 'The AMMDeposit or AMMWithdraw transaction failed because either the AMM or the user does not hold enough of one of the specified assets.',
      tecAMM_EMPTY: 'The AMM-related transaction failed because the AMM has no assets in its pool.',
      tecAMM_FAILED: 'The AMM-related transaction failed for various reasons including insufficient assets or problems with pricing.',
      tecAMM_INVALID_TOKENS: 'The AMM-related transaction failed due to insufficient LP Tokens or problems with rounding.',
      tecAMM_NOT_EMPTY: 'The transaction was meant to operate on an AMM with empty asset pools, but the specified AMM currently holds assets.',
      tecCANT_ACCEPT_OWN_NFTOKEN_OFFER: 'The transaction tried to accept an offer that was placed by the same account to buy or sell a non-fungible token.',
      tecCLAIM: 'Unspecified failure, with transaction cost destroyed.',
      tecCRYPTOCONDITION_ERROR: 'This EscrowCreate or EscrowFinish transaction contained a malformed or mismatched crypto-condition.',
      tecDIR_FULL: 'The transaction tried to add an object to an account\'s owner directory, but that account cannot own any more objects in the ledger.',
      tecDUPLICATE: 'The transaction tried to create an object that already exists.',
      tecDST_TAG_NEEDED: 'The Payment transaction omitted a destination tag, but the destination account has the lsfRequireDestTag flag enabled.',
      tecEMPTY_DID: 'The transaction tried to create a DID entry with no contents. A DID must not be empty.',
      tecEXPIRED: 'The transaction tried to create an object whose provided Expiration time has already passed.',
      tecFAILED_PROCESSING: 'An unspecified error occurred when processing the transaction.',
      tecFROZEN: 'The OfferCreate transaction failed because one or both of the assets involved are subject to a global freeze.',
      tecHAS_OBLIGATIONS: 'The AccountDelete transaction failed because the account to be deleted owns objects that cannot be deleted.',
      tecINSUF_RESERVE_LINE: 'The transaction failed because the sending account does not have enough XRP to create a new trust line.',
      tecINSUF_RESERVE_OFFER: 'The transaction failed because the sending account does not have enough XRP to create a new Offer.',
      tecINSUFF_FEE: 'The transaction failed because the sending account does not have enough XRP to pay the transaction cost.',
      tecINSUFFICIENT_FUNDS: 'One of the accounts involved does not hold enough of a necessary asset.',
      tecINSUFFICIENT_PAYMENT: 'The amount specified is not enough to pay all fees involved in the transaction.',
      tecINSUFFICIENT_RESERVE: 'The transaction would increase the reserve requirement higher than the sending account\'s balance.',
      tecINTERNAL: 'Unspecified internal error, with transaction cost applied.',
      tecINVALID_UPDATE_TIME: 'The OracleSet transaction failed because the LastUpdateTime is invalid.',
      tecINVARIANT_FAILED: 'An invariant check failed when trying to execute this transaction.',
      tecKILLED: 'The OfferCreate transaction specified the tfFillOrKill flag and could not be filled, so it was killed.',
      tecMAX_SEQUENCE_REACHED: 'A sequence number field is already at its maximum.',
      tecNEED_MASTER_KEY: 'This transaction tried to cause changes that require the master key.',
      tecNFTOKEN_BUY_SELL_MISMATCH: 'The NFTokenAcceptOffer transaction attempted to match incompatible offers to buy and sell a non-fungible token.',
      tecNFTOKEN_OFFER_TYPE_MISMATCH: 'One or more of the offers specified in the transaction was not the right type of offer.',
      tecNO_ALTERNATIVE_KEY: 'The transaction tried to remove the only available method of authorizing transactions.',
      tecNO_AUTH: 'The transaction failed because it needs to add a balance on a trust line to an account with the lsfRequireAuth flag enabled.',
      tecNO_DST: 'The account on the receiving end of the transaction does not exist.',
      tecNO_DST_INSUF_XRP: 'The account on the receiving end of the transaction does not exist, and the transaction is not sending enough XRP to create it.',
      tecNO_ENTRY: 'The transaction tried to modify a ledger object, but the specified object does not exist.',
      tecNO_ISSUER: 'The account specified in the issuer field of a currency amount does not exist.',
      tecNO_LINE: 'The TakerPays field of the OfferCreate transaction specifies an asset whose issuer has lsfRequireAuth enabled.',
      tecNO_LINE_INSUF_RESERVE: 'The transaction failed because the sending account does not have enough XRP to create a new trust line.',
      tecNO_LINE_REDUNDANT: 'The transaction failed because it tried to set a trust line to its default state, but the trust line did not exist.',
      tecNO_PERMISSION: 'The sender does not have permission to do this operation.',
      tecNO_REGULAR_KEY: 'The AccountSet transaction tried to disable the master key, but the account does not have another way to authorize transactions.',
      tecNO_SUITABLE_NFTOKEN_PAGE: 'The transaction tried to mint or acquire a non-fungible token but the account receiving the NFToken does not have a directory page that can hold it.',
      tecNO_TARGET: 'The transaction referenced an Escrow or PayChannel ledger object that doesn\'t exist.',
      tecOBJECT_NOT_FOUND: 'One of the objects specified by this transaction did not exist in the ledger.',
      tecOVERSIZE: 'This transaction could not be processed, because the server created an excessively large amount of metadata.',
      tecOWNERS: 'The transaction cannot succeed because the sender already owns objects in the ledger.',
      tecPATH_DRY: 'The transaction failed because the provided paths did not have enough liquidity to send anything at all.',
      tecPATH_PARTIAL: 'The transaction failed because the provided paths did not have enough liquidity to send the full amount.',
      tecTOO_SOON: 'The AccountDelete transaction failed because the account to be deleted had a Sequence number that is too high.',
      tecUNFUNDED: 'The transaction failed because the account does not hold enough XRP to pay the amount in the transaction and satisfy the additional reserve.',
      tecUNFUNDED_ADD: 'DEPRECATED.',
      tecUNFUNDED_PAYMENT: 'The transaction failed because the sending account is trying to send more XRP than it holds.',
      tecUNFUNDED_OFFER: 'The OfferCreate transaction failed because the account creating the offer does not have any of the TakerGets currency.'
    };
    
    return descriptions[code] || 'Transaction failed but was applied to the ledger.';
  }
  
  private static getTEFDescription(code: string): string {
    const descriptions: Record<string, string> = {
      tefALREADY: 'The same exact transaction has already been applied.',
      tefBAD_ADD_AUTH: 'DEPRECATED.',
      tefBAD_AUTH: 'The key used to sign this account is not authorized to modify this account.',
      tefBAD_AUTH_MASTER: 'The single signature provided to authorize this transaction does not match the master key.',
      tefBAD_LEDGER: 'While processing the transaction, the ledger was discovered in an unexpected state.',
      tefBAD_QUORUM: 'The transaction was multi-signed, but the total weights of all included signatures did not meet the quorum.',
      tefBAD_SIGNATURE: 'The transaction was multi-signed, but contained a signature for an address not part of a SignerList.',
      tefCREATED: 'DEPRECATED.',
      tefEXCEPTION: 'While processing the transaction, the server entered an unexpected state.',
      tefFAILURE: 'Unspecified failure in applying the transaction.',
      tefINTERNAL: 'When trying to apply the transaction, the server entered an unexpected state.',
      tefINVARIANT_FAILED: 'An invariant check failed when trying to claim the transaction cost.',
      tefMASTER_DISABLED: 'The transaction was signed with the account\'s master key, but the account has the lsfDisableMaster field set.',
      tefMAX_LEDGER: 'The transaction included a LastLedgerSequence parameter, but the current ledger\'s sequence number is already higher.',
      tefNFTOKEN_IS_NOT_TRANSFERABLE: 'The transaction attempted to send a non-fungible token to another account, but the NFToken has the lsfTransferable flag disabled.',
      tefNO_AUTH_REQUIRED: 'The TrustSet transaction tried to mark a trust line as authorized, but authorization is not necessary.',
      tefNO_TICKET: 'The transaction attempted to use a Ticket, but the specified TicketSequence number does not exist.',
      tefNOT_MULTI_SIGNING: 'The transaction was multi-signed, but the sending account has no SignerList defined.',
      tefPAST_SEQ: 'The sequence number of the transaction is lower than the current sequence number of the account sending the transaction.',
      tefTOO_BIG: 'The transaction would affect too many objects in the ledger.',
      tefWRONG_PRIOR: 'The transaction contained an AccountTxnID field, but the transaction specified there does not match the account\'s previous transaction.'
    };
    
    return descriptions[code] || 'Transaction failed and was not applied to the ledger.';
  }
  
  private static getTELDescription(code: string): string {
    const descriptions: Record<string, string> = {
      telBAD_DOMAIN: 'The transaction specified a domain value that cannot be used, probably because it is too long to store in the ledger.',
      telBAD_PATH_COUNT: 'The transaction contains too many paths for the local server to process.',
      telBAD_PUBLIC_KEY: 'The transaction specified a public key value that cannot be used, probably because it is not the right length.',
      telCAN_NOT_QUEUE: 'The transaction did not meet the open ledger cost, but this server did not queue this transaction because it did not meet the queuing restrictions.',
      telCAN_NOT_QUEUE_BALANCE: 'The transaction did not meet the open ledger cost and also was not added to the transaction queue because the sum of potential XRP costs of already-queued transactions is greater than the expected balance of the account.',
      telCAN_NOT_QUEUE_BLOCKS: 'The transaction did not meet the open ledger cost and also was not added to the transaction queue because it would block already-queued transactions from the same sender.',
      telCAN_NOT_QUEUE_BLOCKED: 'The transaction did not meet the open ledger cost and also was not added to the transaction queue because a transaction queued ahead of it from the same sender blocks it.',
      telCAN_NOT_QUEUE_FEE: 'The transaction did not meet the open ledger cost and also was not added to the transaction queue because a transaction with the same sender and sequence number already exists in the queue.',
      telCAN_NOT_QUEUE_FULL: 'The transaction did not meet the open ledger cost and the server did not queue this transaction because this server\'s transaction queue is full.',
      telFAILED_PROCESSING: 'An unspecified error occurred when processing the transaction.',
      telINSUF_FEE_P: 'The Fee from the transaction is not high enough to meet the server\'s current transaction cost requirement.',
      telLOCAL_ERROR: 'Unspecified local error. The transaction may be able to succeed if you submit it to a different server.',
      telNETWORK_ID_MAKES_TX_NON_CANONICAL: 'The transaction specifies the NetworkID field, but the current network rules require that the NetworkID field be omitted.',
      telNO_DST_PARTIAL: 'The transaction is an XRP payment that would fund a new account, but the tfPartialPayment flag was enabled.',
      telREQUIRES_NETWORK_ID: 'The transaction does not specify a NetworkID field, but the current network requires one.',
      telWRONG_NETWORK: 'The transaction specifies the wrong NetworkID value for the current network.'
    };
    
    return descriptions[code] || 'Local error in processing transaction, may succeed on other servers.';
  }
  
  private static getTEMDescription(code: string): string {
    const descriptions: Record<string, string> = {
      temBAD_AMM_TOKENS: 'The transaction incorrectly specified one or more assets.',
      temBAD_AMOUNT: 'An amount specified by the transaction was invalid, possibly because it was a negative number.',
      temBAD_AUTH_MASTER: 'The key used to sign this transaction does not match the master key for the account sending it.',
      temBAD_CURRENCY: 'The transaction improperly specified a currency field.',
      temBAD_EXPIRATION: 'The transaction improperly specified an expiration value.',
      temBAD_FEE: 'The transaction improperly specified its Fee value.',
      temBAD_ISSUER: 'The transaction improperly specified the issuer field of some currency included in the request.',
      temBAD_LIMIT: 'The TrustSet transaction improperly specified the LimitAmount value of a trust line.',
      temBAD_NFTOKEN_TRANSFER_FEE: 'The NFTokenMint transaction improperly specified the TransferFee field of the transaction.',
      temBAD_OFFER: 'The OfferCreate transaction specifies an invalid offer.',
      temBAD_PATH: 'The Payment transaction specifies one or more Paths improperly.',
      temBAD_PATH_LOOP: 'One of the Paths in the Payment transaction was flagged as a loop.',
      temBAD_SEND_XRP_LIMIT: 'The Payment transaction used the tfLimitQuality flag in a direct XRP-to-XRP payment.',
      temBAD_SEND_XRP_MAX: 'The Payment transaction included a SendMax field in a direct XRP-to-XRP payment.',
      temBAD_SEND_XRP_NO_DIRECT: 'The Payment transaction used the tfNoDirectRipple flag for a direct XRP-to-XRP payment.',
      temBAD_SEND_XRP_PARTIAL: 'The Payment transaction used the tfPartialPayment flag for a direct XRP-to-XRP payment.',
      temBAD_SEND_XRP_PATHS: 'The Payment transaction included Paths while sending XRP.',
      temBAD_SEQUENCE: 'The transaction references a sequence number that is higher than its own Sequence number.',
      temBAD_SIGNATURE: 'The signature to authorize this transaction is either missing, or formed in a way that is not a properly-formed signature.',
      temBAD_SRC_ACCOUNT: 'The Account on whose behalf this transaction is being sent is not a properly-formed account address.',
      temBAD_TRANSFER_RATE: 'The TransferRate field of an AccountSet transaction is not properly formatted or out of the acceptable range.',
      temCANNOT_PREAUTH_SELF: 'The sender of the DepositPreauth transaction was also specified as the account to preauthorize.',
      temDST_IS_SRC: 'The transaction improperly specified a destination address as the Account sending the transaction.',
      temDST_NEEDED: 'The transaction improperly omitted a destination.',
      temINVALID: 'The transaction is otherwise invalid.',
      temINVALID_COUNT: 'The transaction includes a TicketCount field, but the number of Tickets specified is invalid.',
      temINVALID_FLAG: 'The transaction includes a Flag that does not exist, or includes a contradictory combination of flags.',
      temMALFORMED: 'Unspecified problem with the format of the transaction.',
      temREDUNDANT: 'The transaction would do nothing.',
      temREDUNDANT_SEND_MAX: 'Redundant SendMax field.',
      temRIPPLE_EMPTY: 'The Payment transaction includes an empty Paths field, but paths are necessary to complete this payment.',
      temSEQ_AND_TICKET: 'The transaction contains both a TicketSequence field and a non-zero Sequence value.',
      temBAD_WEIGHT: 'The SignerListSet transaction includes a SignerWeight that is invalid.',
      temBAD_SIGNER: 'The SignerListSet transaction includes a signer who is invalid.',
      temBAD_QUORUM: 'The SignerListSet transaction has an invalid SignerQuorum value.',
      temUNCERTAIN: 'Used internally only. This code should never be returned.',
      temUNKNOWN: 'Used internally only. This code should never be returned.',
      temDISABLED: 'The transaction requires logic that is disabled.'
    };
    
    return descriptions[code] || 'Transaction is malformed and cannot succeed according to the XRP Ledger protocol.';
  }
  
  private static getTERDescription(code: string): string {
    const descriptions: Record<string, string> = {
      terFUNDS_SPENT: 'DEPRECATED.',
      terINSUF_FEE_B: 'The account sending the transaction does not have enough XRP to pay the Fee specified in the transaction.',
      terLAST: 'Used internally only. This code should never be returned.',
      terNO_ACCOUNT: 'The address sending the transaction is not funded in the ledger (yet).',
      terNO_AMM: 'The AMM-related transaction specifies an asset pair that does not currently have an AMM instance.',
      terNO_AUTH: 'The transaction would involve adding currency issued by an account with lsfRequireAuth enabled to a trust line that is not authorized.',
      terNO_LINE: 'Used internally only. This code should never be returned.',
      terNO_RIPPLE: 'The transaction can\'t succeed because of rippling settings.',
      terOWNERS: 'The transaction requires that account sending it has a nonzero "owners count", so the transaction cannot succeed.',
      terPRE_SEQ: 'The Sequence number of the current transaction is higher than the current sequence number of the account sending the transaction.',
      terPRE_TICKET: 'The transaction attempted to use a Ticket, but the specified TicketSequence number does not exist in the ledger.',
      terQUEUED: 'The transaction met the load-scaled transaction cost but did not meet the open ledger requirement, so the transaction has been queued for a future ledger.',
      terRETRY: 'Unspecified retriable error.',
      terSUBMITTED: 'Transaction has been submitted, but not yet applied.'
    };
    
    return descriptions[code] || 'Transaction has not been applied yet and will be automatically retried.';
  }
  
  // ==================== USER MESSAGE METHODS ====================
  
  private static getTECUserMessage(code: string): string {
    const messages: Record<string, string> = {
      tecAMM_ACCOUNT: 'Operation not allowed on AMM accounts.',
      tecAMM_UNFUNDED: 'Insufficient funds to create AMM.',
      tecAMM_BALANCE: 'Insufficient AMM or user assets for deposit/withdraw.',
      tecAMM_EMPTY: 'AMM has no assets in its pool.',
      tecAMM_FAILED: 'AMM transaction failed due to insufficient assets or pricing issues.',
      tecAMM_INVALID_TOKENS: 'Insufficient LP Tokens or rounding issues.',
      tecAMM_NOT_EMPTY: 'AMM must be empty for this operation.',
      tecCANT_ACCEPT_OWN_NFTOKEN_OFFER: 'Cannot accept your own NFT offer.',
      tecCLAIM: 'Transaction failed, fees applied.',
      tecCRYPTOCONDITION_ERROR: 'Invalid crypto-condition in escrow.',
      tecDIR_FULL: 'Account cannot own more objects.',
      tecDUPLICATE: 'Object already exists.',
      tecDST_TAG_NEEDED: 'Destination requires destination tag.',
      tecEMPTY_DID: 'DID entry cannot be empty.',
      tecEXPIRED: 'Transaction has expired.',
      tecFAILED_PROCESSING: 'Processing error occurred.',
      tecFROZEN: 'Asset is frozen.',
      tecHAS_OBLIGATIONS: 'Account has obligations preventing deletion.',
      tecINSUF_RESERVE_LINE: 'Insufficient XRP reserve for trust line.',
      tecINSUF_RESERVE_OFFER: 'Insufficient XRP reserve for offer.',
      tecINSUFF_FEE: 'Insufficient XRP for transaction fee.',
      tecINSUFFICIENT_FUNDS: 'Insufficient funds.',
      tecINSUFFICIENT_PAYMENT: 'Insufficient amount for payment and fees.',
      tecINSUFFICIENT_RESERVE: 'Insufficient reserve requirement.',
      tecINTERNAL: 'Internal server error.',
      tecINVALID_UPDATE_TIME: 'Invalid oracle update time.',
      tecINVARIANT_FAILED: 'Invariant check failed.',
      tecKILLED: 'Offer was killed due to tfFillOrKill flag.',
      tecMAX_SEQUENCE_REACHED: 'Maximum sequence number reached.',
      tecNEED_MASTER_KEY: 'Operation requires master key.',
      tecNFTOKEN_BUY_SELL_MISMATCH: 'Incompatible NFT buy/sell offers.',
      tecNFTOKEN_OFFER_TYPE_MISMATCH: 'Incorrect NFT offer type.',
      tecNO_ALTERNATIVE_KEY: 'No alternative authorization method available.',
      tecNO_AUTH: 'Trust line not authorized.',
      tecNO_DST: 'Destination account does not exist.',
      tecNO_DST_INSUF_XRP: 'Insufficient XRP to create destination account.',
      tecNO_ENTRY: 'Specified ledger object does not exist.',
      tecNO_ISSUER: 'Issuer account does not exist.',
      tecNO_LINE: 'No trust line to issuer.',
      tecNO_LINE_INSUF_RESERVE: 'Insufficient XRP reserve for trust line.',
      tecNO_LINE_REDUNDANT: 'Trust line does not exist.',
      tecNO_PERMISSION: 'No permission for this operation.',
      tecNO_REGULAR_KEY: 'No regular key set.',
      tecNO_SUITABLE_NFTOKEN_PAGE: 'No suitable NFT page available.',
      tecNO_TARGET: 'Target escrow or channel does not exist.',
      tecOBJECT_NOT_FOUND: 'Specified object not found.',
      tecOVERSIZE: 'Transaction too large.',
      tecOWNERS: 'Account owns objects preventing this operation.',
      tecPATH_DRY: 'No liquidity available.',
      tecPATH_PARTIAL: 'Insufficient liquidity.',
      tecTOO_SOON: 'Account sequence too high for deletion.',
      tecUNFUNDED: 'Insufficient XRP balance.',
      tecUNFUNDED_ADD: 'Deprecated.',
      tecUNFUNDED_PAYMENT: 'Insufficient XRP for payment.',
      tecUNFUNDED_OFFER: 'Insufficient assets for offer.'
    };
    
    return messages[code] || 'Transaction failed but was applied to the ledger.';
  }
  
  private static getTEFUserMessage(code: string): string {
    const messages: Record<string, string> = {
      tefALREADY: 'Transaction already applied.',
      tefBAD_ADD_AUTH: 'Deprecated.',
      tefBAD_AUTH: 'Unauthorized key.',
      tefBAD_AUTH_MASTER: 'Master key mismatch.',
      tefBAD_LEDGER: 'Ledger in unexpected state.',
      tefBAD_QUORUM: 'Insufficient signature quorum.',
      tefBAD_SIGNATURE: 'Invalid signature.',
      tefCREATED: 'Deprecated.',
      tefEXCEPTION: 'Processing exception.',
      tefFAILURE: 'Transaction failed.',
      tefINTERNAL: 'Internal error.',
      tefINVARIANT_FAILED: 'Invariant check failed.',
      tefMASTER_DISABLED: 'Master key disabled.',
      tefMAX_LEDGER: 'Ledger sequence too high.',
      tefNFTOKEN_IS_NOT_TRANSFERABLE: 'NFT is not transferable.',
      tefNO_AUTH_REQUIRED: 'Authorization not required.',
      tefNO_TICKET: 'Ticket does not exist.',
      tefNOT_MULTI_SIGNING: 'No signer list defined.',
      tefPAST_SEQ: 'Sequence number too low.',
      tefTOO_BIG: 'Transaction affects too many objects.',
      tefWRONG_PRIOR: 'Previous transaction ID mismatch.'
    };
    
    return messages[code] || 'Transaction failed and was not applied to the ledger.';
  }
  
  private static getTELUserMessage(code: string): string {
    const messages: Record<string, string> = {
      telBAD_DOMAIN: 'Invalid domain value.',
      telBAD_PATH_COUNT: 'Too many paths.',
      telBAD_PUBLIC_KEY: 'Invalid public key.',
      telCAN_NOT_QUEUE: 'Cannot queue transaction.',
      telCAN_NOT_QUEUE_BALANCE: 'Insufficient balance for queuing.',
      telCAN_NOT_QUEUE_BLOCKS: 'Transaction would block queue.',
      telCAN_NOT_QUEUE_BLOCKED: 'Blocked by queued transaction.',
      telCAN_NOT_QUEUE_FEE: 'Insufficient fee for queuing.',
      telCAN_NOT_QUEUE_FULL: 'Transaction queue full.',
      telFAILED_PROCESSING: 'Processing failed.',
      telINSUF_FEE_P: 'Insufficient fee.',
      telLOCAL_ERROR: 'Local server error.',
      telNETWORK_ID_MAKES_TX_NON_CANONICAL: 'Invalid NetworkID.',
      telNO_DST_PARTIAL: 'Partial payment to new account not allowed.',
      telREQUIRES_NETWORK_ID: 'NetworkID required.',
      telWRONG_NETWORK: 'Wrong network.'
    };
    
    return messages[code] || 'Local error, may succeed on other servers.';
  }
  
  private static getTEMUserMessage(code: string): string {
    const messages: Record<string, string> = {
      temBAD_AMM_TOKENS: 'Invalid AMM tokens.',
      temBAD_AMOUNT: 'Invalid amount.',
      temBAD_AUTH_MASTER: 'Invalid master authorization.',
      temBAD_CURRENCY: 'Invalid currency.',
      temBAD_EXPIRATION: 'Invalid expiration.',
      temBAD_FEE: 'Invalid fee.',
      temBAD_ISSUER: 'Invalid issuer.',
      temBAD_LIMIT: 'Invalid limit.',
      temBAD_NFTOKEN_TRANSFER_FEE: 'Invalid NFT transfer fee.',
      temBAD_OFFER: 'Invalid offer.',
      temBAD_PATH: 'Invalid path.',
      temBAD_PATH_LOOP: 'Path loop detected.',
      temBAD_SEND_XRP_LIMIT: 'Invalid limit quality for XRP payment.',
      temBAD_SEND_XRP_MAX: 'Invalid SendMax for XRP payment.',
      temBAD_SEND_XRP_NO_DIRECT: 'Invalid tfNoDirectRipple for XRP payment.',
      temBAD_SEND_XRP_PARTIAL: 'Invalid tfPartialPayment for XRP payment.',
      temBAD_SEND_XRP_PATHS: 'Paths not allowed for XRP payment.',
      temBAD_SEQUENCE: 'Invalid sequence.',
      temBAD_SIGNATURE: 'Invalid signature.',
      temBAD_SRC_ACCOUNT: 'Invalid source account.',
      temBAD_TRANSFER_RATE: 'Invalid transfer rate.',
      temCANNOT_PREAUTH_SELF: 'Cannot preauthorize self.',
      temDST_IS_SRC: 'Destination is source.',
      temDST_NEEDED: 'Destination required.',
      temINVALID: 'Invalid transaction.',
      temINVALID_COUNT: 'Invalid ticket count.',
      temINVALID_FLAG: 'Invalid flag.',
      temMALFORMED: 'Malformed transaction.',
      temREDUNDANT: 'Redundant transaction.',
      temREDUNDANT_SEND_MAX: 'Redundant SendMax.',
      temRIPPLE_EMPTY: 'Empty paths.',
      temSEQ_AND_TICKET: 'Both sequence and ticket specified.',
      temBAD_WEIGHT: 'Invalid signer weight.',
      temBAD_SIGNER: 'Invalid signer.',
      temBAD_QUORUM: 'Invalid quorum.',
      temUNCERTAIN: 'Internal error.',
      temUNKNOWN: 'Internal error.',
      temDISABLED: 'Feature disabled.'
    };
    
    return messages[code] || 'Transaction is malformed.';
  }
  
  private static getTERUserMessage(code: string): string {
    const messages: Record<string, string> = {
      terFUNDS_SPENT: 'Deprecated.',
      terINSUF_FEE_B: 'Insufficient fee.',
      terLAST: 'Internal error.',
      terNO_ACCOUNT: 'Account not funded.',
      terNO_AMM: 'No AMM instance.',
      terNO_AUTH: 'Not authorized.',
      terNO_LINE: 'Internal error.',
      terNO_RIPPLE: 'Rippling settings prevent success.',
      terOWNERS: 'Account has owners.',
      terPRE_SEQ: 'Sequence too high.',
      terPRE_TICKET: 'Ticket does not exist.',
      terQUEUED: 'Transaction queued.',
      terRETRY: 'Retry transaction.',
      terSUBMITTED: 'Transaction submitted.'
    };
    
    return messages[code] || 'Transaction will be retried.';
  }
  
  // ==================== HELPER METHODS ====================
  
  /**
   * Categorize a transaction result code
   * 
   * @param resultCode - The transaction result code
   * @returns The category of the error
   */
  static categorizeResultCode(resultCode: string): TransactionErrorCategory {
    if (resultCode.startsWith('tec')) {
      return TransactionErrorCategory.FAILURE_APPLIED;
    } else if (resultCode.startsWith('tef')) {
      return TransactionErrorCategory.FAILURE_NOT_APPLIED;
    } else if (resultCode.startsWith('tel')) {
      return TransactionErrorCategory.LOCAL_ERROR;
    } else if (resultCode.startsWith('tem')) {
      return TransactionErrorCategory.MALFORMED;
    } else if (resultCode.startsWith('ter')) {
      return TransactionErrorCategory.RETRYABLE;
    } else if (resultCode.startsWith('tes')) {
      return TransactionErrorCategory.SUCCESS;
    } else {
      return TransactionErrorCategory.UNKNOWN;
    }
  }
  
  /**
   * Determine if a transaction result is final
   * 
   * @param resultCode - The transaction result code
   * @returns True if the result is final, false otherwise
   */
  static isResultFinal(resultCode: string): boolean {
    // tec, tef, tem, tes codes are final
    // tel and ter codes are not final
    return !(resultCode.startsWith('tel') || resultCode.startsWith('ter'));
  }
  
  /**
   * Determine if a transaction can be retried
   * 
   * @param resultCode - The transaction result code
   * @returns True if the transaction can be retried, false otherwise
   */
  static canRetryTransaction(resultCode: string): boolean {
    // tel and ter codes can be retried
    // tec, tef, tem codes cannot be retried
    return resultCode.startsWith('tel') || resultCode.startsWith('ter');
  }
  
  /**
   * Get a simplified error message for display to users
   * 
   * @param resultCode - The transaction result code
   * @returns A simplified error message
   */
  static getSimplifiedErrorMessage(resultCode: string): string {
    switch (this.categorizeResultCode(resultCode)) {
      case TransactionErrorCategory.FAILURE_APPLIED:
        return 'Transaction failed but was applied to the ledger. Fees were consumed.';
      case TransactionErrorCategory.FAILURE_NOT_APPLIED:
        return 'Transaction failed and was not applied to the ledger.';
      case TransactionErrorCategory.LOCAL_ERROR:
        return 'Local server error. Try submitting to a different server.';
      case TransactionErrorCategory.MALFORMED:
        return 'Transaction is malformed and cannot succeed.';
      case TransactionErrorCategory.RETRYABLE:
        return 'Transaction will be retried automatically.';
      case TransactionErrorCategory.SUCCESS:
        return 'Transaction completed successfully.';
      default:
        return 'An unknown error occurred.';
    }
  }
}