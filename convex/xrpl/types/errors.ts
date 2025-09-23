/**
 * XRPL-specific error types for institutional fund management protocol
 * Following PRD specifications for robust error handling
 */

export class XRPLNetworkError extends Error {
  constructor(message: string, public network: string, public endpoint: string) {
    super(message);
    this.name = 'XRPLNetworkError';
  }
}

export class XRPLAccountError extends Error {
  constructor(message: string, public address?: string) {
    super(message);
    this.name = 'XRPLAccountError';
  }
}

export class XRPLTransactionError extends Error {
  constructor(message: string, public txHash?: string, public code?: string) {
    super(message);
    this.name = 'XRPLTransactionError';
  }
}

export class XRPLComplianceError extends Error {
  constructor(message: string, public violationType: string, public account?: string) {
    super(message);
    this.name = 'XRPLComplianceError';
  }
}

export class XRPLMPTError extends Error {
  constructor(message: string, public mptId?: string, public operation?: string) {
    super(message);
    this.name = 'XRPLMPTError';
  }
}

export class XRPLDIDError extends Error {
  constructor(message: string, public didId?: string) {
    super(message);
    this.name = 'XRPLDIDError';
  }
}

export class XRPLDomainError extends Error {
  constructor(message: string, public domainId?: string) {
    super(message);
    this.name = 'XRPLDomainError';
  }
}