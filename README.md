# XRPL Institutional Fund Management Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![XRPL](https://img.shields.io/badge/XRPL-Ledger-blue)](https://xrpl.org)
[![Convex](https://img.shields.io/badge/Backend-Convex-orange)](https://convex.dev)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org)

## 🚀 Overview

The **XRPL Institutional Fund Management Protocol** is a comprehensive, institutional-grade platform designed to bridge traditional finance (TradFi) with decentralized finance (DeFi) on the XRP Ledger. It enables asset managers to create, manage, and distribute tokenized funds with built-in compliance, automated reporting, and seamless settlement.

This platform leverages the latest XRPL amendments including **XLS-33 (Multi-Purpose Tokens)**, **XLS-40 (DID)**, **XLS-65 (Lending Protocol)**, and **XLS-80 (Permissioned Domains)** to provide a secure and regulatory-compliant environment for institutional capital.

---

## 🏗️ System Architecture

The system is built on a modern stack utilizing React for the frontend, Convex for the reactive backend, and the XRP Ledger for settlement and asset management.

```mermaid
graph TD
    subgraph "Frontend Layer"
        UI[React UI / Vite]
        Auth[Xaman Wallet Auth]
        Hooks[Custom React Hooks]
    end

    subgraph "Backend Layer (Convex)"
        API[Public API]
        Functions[Query & Mutation Functions]
        Scheduler[Cron Jobs & Schedulers]
        DB[(Convex Database)]
    end

    subgraph "Blockchain Layer (XRPL)"
        Node[XRPL Node]
        Ledger[XRP Ledger]
        DEX[Decentralized Exchange]
    end

    UI <-->|WebSocket/HTTP| API
    Auth <-->|Sign/Verify| UI
    API <--> Functions
    Functions <--> DB
    Functions <-->|xrpl.js| Node
    Node <--> Ledger
    Scheduler -->|Polls| Node
```

---

## 💾 Database Schema (ERD)

The data model is designed to handle complex relationships between funds, investors, and assets while maintaining strict compliance records.

```mermaid
erDiagram
    USERS ||--o{ FUNDS : manages
    USERS ||--o{ INVESTORS : "is associated with"
    FUNDS ||--o{ HOLDINGS : "has"
    INVESTORS ||--o{ HOLDINGS : "owns"
    FUNDS ||--o{ ASSETS : "contains"
    FUNDS ||--o{ TRANSACTIONS : "records"
    INVESTORS ||--o{ TRANSACTIONS : "initiates"
    FUNDS ||--o{ COMPLIANCE_REPORTS : "generates"

    USERS {
        string fullName
        string email
        string xrplAccount
        string networkPreference
    }

    FUNDS {
        string name
        string symbol
        string fundType
        string status
        float aum
        string xrplAccount
        string mptTokenId
        object complianceRules
    }

    INVESTORS {
        string investorType
        string kycStatus
        string amlStatus
        string jurisdiction
        boolean accreditedStatus
    }

    ASSETS {
        string symbol
        string assetType
        float quantity
        float currentValue
        string isin
    }
```

---

## 🔐 Authentication Flow

Secure authentication using Xaman (formerly Xumm) Wallet ensures that all actions are cryptographically signed by the user's XRPL account.

```mermaid
sequenceDiagram
    participant User
    participant UI as Frontend
    participant Xaman as Xaman Wallet
    participant API as Convex Backend

    User->>UI: Click "Connect Wallet"
    UI->>API: Request Auth Challenge
    API-->>UI: Return Challenge (Nonce)
    UI->>Xaman: Request Sign (Nonce)
    Xaman->>User: Prompt to Sign
    User->>Xaman: Approve Signature
    Xaman-->>UI: Return Signed Payload
    UI->>API: Verify Signature
    API->>API: Validate Signature & Nonce
    API-->>UI: Return Session Token
    UI->>User: Login Successful
```

---

## 🔄 Fund Creation Lifecycle

The lifecycle of a fund from inception to active management, involving multiple compliance checks and on-chain instantiation.

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> PendingApproval: Submit for Review
    PendingApproval --> ComplianceCheck: Automated Checks
    ComplianceCheck --> Approved: Checks Pass
    ComplianceCheck --> Rejected: Checks Fail
    Approved --> OnChainSetup: Initiate XRPL Setup
    OnChainSetup --> MPTCreation: Create MPT (XLS-33)
    MPTCreation --> DomainSetup: Setup Domain (XLS-80)
    DomainSetup --> Active: Fund Live
    Active --> Suspended: Compliance Trigger
    Suspended --> Active: Resolved
    Active --> Liquidating: End of Life
    Liquidating --> Closed: Final Settlement
    Closed --> [*]
```

---

## 💰 Investment Subscription Flow

The process for an investor to subscribe to a fund, including KYC validation and token issuance.

```mermaid
sequenceDiagram
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant XRPL as XRP Ledger

    Inv->>UI: Request Subscription (Amount)
    UI->>API: Validate Eligibility (KYC/AML)
    alt Not Eligible
        API-->>UI: Reject (Compliance Error)
    else Eligible
        API-->>UI: Approve Request
        UI->>Inv: Prompt Payment (XRP/Token)
        Inv->>XRPL: Send Payment Tx
        XRPL-->>API: Tx Confirmed (Webhook/Poll)
        API->>API: Calculate Share Amount
        API->>XRPL: Issue MPT Tokens (Payment)
        XRPL-->>Inv: Receive Fund Shares
        API->>API: Update Fund NAV & Holdings
    end
```

---

## 💸 Redemption Flow

The process for an investor to redeem their shares for the underlying asset or base currency.

```mermaid
sequenceDiagram
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant XRPL as XRP Ledger

    Inv->>UI: Request Redemption (Shares)
    UI->>API: Check Liquidity & Lockup
    alt Locked / No Liquidity
        API-->>UI: Reject Request
    else Approved
        UI->>Inv: Prompt Share Return
        Inv->>XRPL: Send MPT Tokens (Return)
        XRPL-->>API: Tx Confirmed
        API->>API: Calculate Redemption Value
        API->>XRPL: Send Settlement (XRP/Stablecoin)
        XRPL-->>Inv: Receive Funds
        API->>API: Burn Shares & Update NAV
    end
```

---

## 🏦 Lending Protocol (XLS-65)

Integration with the native XRPL Lending Protocol for yield generation and leverage.

```mermaid
flowchart TD
    Start[Start] --> CreatePool[Create Loan Broker (Pool)]
    CreatePool --> SetTerms[Set Interest & Collateral Terms]
    SetTerms --> ActivePool{Pool Active?}
    
    ActivePool -- Yes --> Borrower[Borrower Request]
    ActivePool -- No --> Error[Error]

    Borrower --> CheckCollateral{Sufficient Collateral?}
    CheckCollateral -- Yes --> CreateLoan[Create Loan Object]
    CheckCollateral -- No --> Reject[Reject Request]

    CreateLoan --> FundLoan[Lender Funds Loan]
    FundLoan --> ActiveLoan[Loan Active]
    
    ActiveLoan --> Repay{Repayment?}
    Repay -- Full --> CloseLoan[Close Loan & Return Collateral]
    Repay -- Partial --> UpdateLoan[Update Balance]
    
    ActiveLoan --> Default{Default Condition?}
    Default -- Yes --> Liquidate[Liquidate Collateral]
    Liquidate --> CloseLoan
```

---

## 🛡️ Permissioned Domains (XLS-80)

Using XLS-80 to enforce strict access control for institutional funds.

```mermaid
graph LR
    subgraph "Permissioned Domain"
        Owner[Domain Owner]
        Rules[Access Rules]
        Members[Member List]
    end

    Investor((Investor)) -->|Request Access| Owner
    Owner -->|Verify Credential| Issuer[Credential Issuer]
    Issuer -->|Valid Credential| Owner
    Owner -->|Add Member| Members
    
    Members -->|Allowed| Trade[Trade/Hold Asset]
    Investor -->|Not Member| Block[Blocked Transaction]
```

---

## 🆔 DID Identity Verification (XLS-40)

Decentralized Identity implementation for self-sovereign compliance.

```mermaid
sequenceDiagram
    participant User
    participant Issuer as KYC Provider
    participant Ledger as XRPL
    participant Fund as Fund Manager

    User->>Issuer: Submit ID Documents
    Issuer->>Issuer: Verify Identity
    Issuer->>Ledger: Issue DID Credential (DIDSet)
    User->>Ledger: Claim DID
    
    User->>Fund: Request Fund Access
    Fund->>Ledger: Resolve DID Document
    Ledger-->>Fund: Return DID Document
    Fund->>Fund: Verify Verifiable Credential (VC)
    Fund-->>User: Grant Access
```

---

## ✅ Compliance Workflow

Automated compliance engine ensuring all transactions meet regulatory standards.

```mermaid
flowchart TD
    Tx[New Transaction] --> KYC{KYC Verified?}
    KYC -- No --> Block[Block Transaction]
    KYC -- Yes --> AML{AML Check Passed?}
    
    AML -- No --> Flag[Flag for Review]
    AML -- Yes --> Geo{Geo Restriction?}
    
    Geo -- Restricted --> Block
    Geo -- Allowed --> InvestorType{Investor Type?}
    
    InvestorType -- Retail --> Limit{Within Limits?}
    InvestorType -- Institutional --> Approve[Approve]
    
    Limit -- Exceeded --> Block
    Limit -- OK --> Approve
```

---

## ⚖️ Portfolio Rebalancing

Logic for maintaining target asset allocations.

```mermaid
graph TD
    Start[Trigger Rebalance] --> FetchPrices[Fetch Current Asset Prices]
    FetchPrices --> CalcNAV[Calculate Total NAV]
    CalcNAV --> Compare[Compare vs Target Allocation]
    
    Compare --> Drift{Drift > Threshold?}
    Drift -- No --> End[No Action]
    Drift -- Yes --> GenOrders[Generate Buy/Sell Orders]
    
    GenOrders --> Optimize[Optimize Execution]
    Optimize --> Execute[Execute on DEX]
    Execute --> Update[Update Portfolio State]
```

---

## 🤝 Settlement Process

End-to-end settlement flow for fund subscriptions and redemptions.

```mermaid
sequenceDiagram
    participant Order as Order Management
    participant Compliance as Compliance Engine
    participant Treasury as Treasury System
    participant Ledger as XRPL

    Order->>Compliance: Validate Order
    Compliance-->>Order: Validated
    Order->>Treasury: Reserve Funds/Assets
    Treasury->>Ledger: Create Escrow (Optional)
    Ledger-->>Treasury: Escrow Created
    Treasury->>Order: Settlement Ready
    Order->>Ledger: Execute Payment/Transfer
    Ledger-->>Order: Settlement Finalized
    Order->>Order: Update Records
```

---

## 🔌 XRPL Interaction Layer

How the application interfaces with the XRP Ledger.

```mermaid
classDiagram
    class XRPLService {
        +connect()
        +disconnect()
        +submitTransaction()
        +subscribeToStream()
    }
    
    class TransactionBuilder {
        +buildPayment()
        +buildTrustSet()
        +buildMPTCreate()
        +buildLoanSet()
    }
    
    class WalletManager {
        +sign()
        +verify()
        +deriveAddress()
    }
    
    class EventListener {
        +onTransaction()
        +onLedgerClosed()
    }

    XRPLService --> TransactionBuilder : uses
    XRPLService --> WalletManager : uses
    XRPLService --> EventListener : manages
```

---

## ⚛️ Frontend Component Hierarchy

Structure of the React application.

```mermaid
graph TD
    App --> AuthProvider
    App --> Router
    
    AuthProvider --> Login
    AuthProvider --> Dashboard
    
    Dashboard --> Sidebar
    Dashboard --> Header
    Dashboard --> MainContent
    
    MainContent --> FundList
    MainContent --> InvestorList
    MainContent --> AssetAllocation
    MainContent --> TransactionHistory
    
    FundList --> FundCard
    FundCard --> FundMetrics
    
    AssetAllocation --> Charts
    Charts --> PieChart
    Charts --> LineChart
```

---

## 🔔 Notification System

Event-driven notification architecture.

```mermaid
graph LR
    Event[System Event] -->|Trigger| Engine[Notification Engine]
    Engine -->|Filter| Prefs[User Preferences]
    
    Prefs -->|Push| Push[Push Notification]
    Prefs -->|Email| Email[Email Service]
    Prefs -->|In-App| DB[Database Store]
    
    Push --> User
    Email --> User
    DB --> UI[Frontend Alert]
```

---

## 📉 Risk Management

Calculation of risk metrics for funds.

```mermaid
graph TD
    Data[Historical Data] --> Returns[Calculate Returns]
    Returns --> Volatility[Calculate Volatility]
    Returns --> VaR[Calculate VaR (95% & 99%)]
    Returns --> Drawdown[Calculate Max Drawdown]
    
    Benchmark[Benchmark Data] --> Beta[Calculate Beta]
    Benchmark --> Alpha[Calculate Alpha]
    
    Volatility --> Sharpe[Sharpe Ratio]
    Volatility --> Sortino[Sortino Ratio]
    
    VaR --> Report[Risk Report]
    Drawdown --> Report
    Sharpe --> Report
```

---

## 📝 Audit Trail

Immutable logging of all system actions.

```mermaid
sequenceDiagram
    participant User
    participant System
    participant Logger
    participant DB

    User->>System: Perform Action
    System->>System: Execute Logic
    System->>Logger: Log Event (Actor, Action, Data)
    Logger->>Logger: Hash Entry
    Logger->>DB: Store Log Entry
    
    opt Periodic Anchor
        Logger->>XRPL: Submit Hash to Ledger
    end
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MrDecryptDecipher/xrpl-institutional-fund-management.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run specific integration tests
npm run test:integration
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.