/**
 * XRPL Error Handling System
 * Comprehensive error code mapping and user-friendly messages
 * Based on XRPL documentation: docs/XRPL/J/ (tec, tef, tel, tem, ter codes)
 */

export interface XRPLError {
  code: string;
  category: 'tec' | 'tef' | 'tel' | 'tem' | 'ter' | 'tes';
  message: string;
  userMessage: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  retryable: boolean;
  suggestion?: string;
}

/**
 * TEC Codes - Claimed Fee Only
 * Transaction failed but fee was consumed
 */
const TEC_CODES: Record<string, Omit<XRPLError, 'code' | 'category'>> = {
  tecCLAIM: {
    message: 'Fee claimed. Sequence used. No action.',
    userMessage: 'Transaction failed but fee was charged',
    severity: 'error',
    retryable: false,
    suggestion: 'Review transaction parameters and try again'
  },
  tecDIR_FULL: {
    message: 'Cannot add entry to full directory',
    userMessage: 'Account directory is full',
    severity: 'error',
    retryable: false,
    suggestion: 'Remove some objects from your account before retrying'
  },
  tecINSUFFICIENT_RESERVE: {
    message: 'Insufficient reserve to complete transaction',
    userMessage: 'Insufficient XRP reserve',
    severity: 'error',
    retryable: true,
    suggestion: 'Add more XRP to meet the reserve requirement'
  },
  tecNO_DST: {
    message: 'Destination account does not exist',
    userMessage: 'Destination account not found',
    severity: 'error',
    retryable: false,
    suggestion: 'Verify the destination address is correct'
  },
  tecNO_DST_INSUF_XRP: {
    message: 'Destination does not exist and SendMax not high enough',
    userMessage: 'Cannot create destination account - insufficient amount',
    severity: 'error',
    retryable: true,
    suggestion: 'Increase the amount to meet minimum account reserve'
  },
  tecNO_PERMISSION: {
    message: 'No permission to perform requested operation',
    userMessage: 'Permission denied',
    severity: 'error',
    retryable: false,
    suggestion: 'Check account settings and permissions'
  },
  tecUNFUNDED_PAYMENT: {
    message: 'Insufficient XRP balance to send',
    userMessage: 'Insufficient funds',
    severity: 'error',
    retryable: true,
    suggestion: 'Add more XRP to your account'
  },
  tecFROZEN: {
    message: 'Asset is frozen',
    userMessage: 'Cannot transfer frozen asset',
    severity: 'error',
    retryable: false,
    suggestion: 'Contact the asset issuer'
  },
  tecEXPIRED: {
    message: 'Transaction has expired',
    userMessage: 'Transaction expired',
    severity: 'error',
    retryable: true,
    suggestion: 'Create a new transaction with updated expiration'
  }
};

/**
 * TEF Codes - Failure (Final)
 * Transaction failed and cannot succeed in any ledger
 */
const TEF_CODES: Record<string, Omit<XRPLError, 'code' | 'category'>> = {
  tefFAILURE: {
    message: 'Failed to apply transaction',
    userMessage: 'Transaction failed',
    severity: 'error',
    retryable: false,
    suggestion: 'Review transaction details and try again'
  },
  tefALREADY: {
    message: 'Exact transaction already in ledger',
    userMessage: 'Transaction already processed',
    severity: 'warning',
    retryable: false,
    suggestion: 'Check transaction history'
  },
  tefBAD_AUTH: {
    message: 'Transaction signature is invalid',
    userMessage: 'Invalid signature',
    severity: 'error',
    retryable: false,
    suggestion: 'Check your wallet credentials'
  },
  tefMAX_LEDGER: {
    message: 'Ledger sequence too high',
    userMessage: 'Transaction expired (ledger sequence)',
    severity: 'error',
    retryable: true,
    suggestion: 'Submit a new transaction'
  }
};

/**
 * TEL Codes - Local Error
 * Transaction failed local checks
 */
const TEL_CODES: Record<string, Omit<XRPLError, 'code' | 'category'>> = {
  telLOCAL_ERROR: {
    message: 'Local failure',
    userMessage: 'Local validation failed',
    severity: 'error',
    retryable: true,
    suggestion: 'Check your connection and try again'
  },
  telBAD_DOMAIN: {
    message: 'Domain field malformed',
    userMessage: 'Invalid domain format',
    severity: 'error',
    retryable: false,
    suggestion: 'Correct the domain field'
  },
  telBAD_PATH_COUNT: {
    message: 'Too many paths',
    userMessage: 'Too many payment paths',
    severity: 'error',
    retryable: false,
    suggestion: 'Reduce the number of payment paths'
  },
  telBAD_PUBLIC_KEY: {
    message: 'Public key is malformed',
    userMessage: 'Invalid public key',
    severity: 'error',
    retryable: false,
    suggestion: 'Verify your account credentials'
  }
};

/**
 * TEM Codes - Malformed
 * Transaction is malformed
 */
const TEM_CODES: Record<string, Omit<XRPLError, 'code' | 'category'>> = {
  temMALFORMED: {
    message: 'Malformed transaction',
    userMessage: 'Transaction format is invalid',
    severity: 'error',
    retryable: false,
    suggestion: 'Check transaction structure'
  },
  temBAD_AMOUNT: {
    message: 'Bad amount',
    userMessage: 'Invalid amount specified',
    severity: 'error',
    retryable: false,
    suggestion: 'Enter a valid amount'
  },
  temBAD_FEE: {
    message: 'Invalid fee',
    userMessage: 'Transaction fee is invalid',
    severity: 'error',
    retryable: false,
    suggestion: 'Use recommended fee'
  },
  temBAD_SEQUENCE: {
    message: 'Malformed sequence number',
    userMessage: 'Invalid sequence number',
    severity: 'error',
    retryable: false,
    suggestion: 'Use the correct account sequence'
  },
  temDST_NEEDED: {
    message: 'Destination not specified',
    userMessage: 'Destination address required',
    severity: 'error',
    retryable: false,
    suggestion: 'Specify a destination address'
  },
  temINVALID: {
    message: 'Transaction is invalid',
    userMessage: 'Invalid transaction',
    severity: 'error',
    retryable: false,
    suggestion: 'Review all transaction fields'
  }
};

/**
 * TER Codes - Retry
 * Transaction failed but might succeed later
 */
const TER_CODES: Record<string, Omit<XRPLError, 'code' | 'category'>> = {
  terRETRY: {
    message: 'Retry transaction',
    userMessage: 'Transaction can be retried',
    severity: 'warning',
    retryable: true,
    suggestion: 'Wait a moment and try again'
  },
  terFUNDS_SPENT: {
    message: 'Insufficient balance',
    userMessage: 'Funds already spent',
    severity: 'error',
    retryable: true,
    suggestion: 'Wait for pending transactions to clear'
  },
  terQUEUED: {
    message: 'Transaction queued',
    userMessage: 'Transaction is queued',
    severity: 'info',
    retryable: false,
    suggestion: 'Transaction will be processed when possible'
  }
};

/**
 * TES Codes - Success
 */
const TES_CODES: Record<string, Omit<XRPLError, 'code' | 'category'>> = {
  tesSUCCESS: {
    message: 'Transaction succeeded',
    userMessage: 'Transaction successful',
    severity: 'success',
    retryable: false
  }
};

/**
 * Get error details for a given error code
 */
export function getXRPLError(code: string): XRPLError {
  const category = code.substring(0, 3).toLowerCase() as XRPLError['category'];
  
  let errorDetails: Omit<XRPLError, 'code' | 'category'> | undefined;
  
  switch (category) {
    case 'tec':
      errorDetails = TEC_CODES[code];
      break;
    case 'tef':
      errorDetails = TEF_CODES[code];
      break;
    case 'tel':
      errorDetails = TEL_CODES[code];
      break;
    case 'tem':
      errorDetails = TEM_CODES[code];
      break;
    case 'ter':
      errorDetails = TER_CODES[code];
      break;
    case 'tes':
      errorDetails = TES_CODES[code];
      break;
  }
  
  if (!errorDetails) {
    // Unknown error code
    return {
      code,
      category,
      message: `Unknown error: ${code}`,
      userMessage: 'An unknown error occurred',
      severity: 'error',
      retryable: false,
      suggestion: 'Contact support if this persists'
    };
  }
  
  return {
    code,
    category,
    ...errorDetails
  };
}

/**
 * Format error for display
 */
export function formatXRPLError(code: string): string {
  const error = getXRPLError(code);
  let message = `${error.userMessage}`;
  if (error.suggestion) {
    message += `\n\nSuggestion: ${error.suggestion}`;
  }
  return message;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(code: string): boolean {
  return getXRPLError(code).retryable;
}

/**
 * Get error severity
 */
export function getErrorSeverity(code: string): XRPLError['severity'] {
  return getXRPLError(code).severity;
}

