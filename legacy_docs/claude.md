# XRPL Institutional Fund Management Protocol - Team Standards
# Following CodeRabbit guide recommendations for custom team standards detection

## Coding Standards
- Use TypeScript strict mode for all files
- Follow XRPL.org September 2025 JavaScript standards
- Implement proper error handling with typed exceptions
- Use async/await patterns for all XRPL operations
- Always disconnect XRPL clients after operations

## XRPL-Specific Patterns
- Use `autofill()` + `submitAndWait()` for transaction submission
- Validate all transactions with `result.validated` checks
- Implement proper wallet seed management (never log private keys)
- Follow XLS standards: XLS-33 (MPT), XLS-40 (DID), XLS-80 (Domains)

## Security Requirements
- Never expose private keys in console.log
- Implement multi-signature for institutional operations
- Add audit logging for all compliance-critical operations
- Use typed error handling for all blockchain interactions

## Institutional Compliance
- Support multi-jurisdictional regulations (MAS, FINMA, ESMA, VARA, SFC, SEC)
- Implement KYC/AML validation for all investor operations
- Maintain complete audit trails for regulatory reporting
- Use enterprise-grade key management practices

## Architecture Patterns
- Use Convex serverless functions for backend
- Implement real XRPL transactions (no mocks in production)
- Follow separation of concerns for compliance modules
- Use dependency injection for testability