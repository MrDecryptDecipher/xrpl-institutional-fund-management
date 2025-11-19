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
    %% Styles
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000;
    classDef backend fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000;
    classDef ledger fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000;
    classDef external fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000;

    subgraph "Frontend Layer"
        UI[React UI / Vite]:::frontend
        Auth[Xaman Wallet Auth]:::frontend
        Hooks[Custom React Hooks]:::frontend
        State[Global State / Context]:::frontend
    end

    subgraph "Backend Layer (Convex)"
        API[Public API Gateway]:::backend
        Functions[Query & Mutation Functions]:::backend
        Scheduler[Cron Jobs & Schedulers]:::backend
        DB[(Convex Database)]:::backend
        AuthService[Auth Service]:::backend
    end

    subgraph "Blockchain Layer (XRPL)"
        Node[XRPL Public Node]:::ledger
        Ledger[XRP Ledger Mainnet/Testnet]:::ledger
        DEX[Decentralized Exchange]:::ledger
        AMEND[Amendments: XLS-33, 40, 65, 80]:::ledger
    end

    subgraph "External Services"
        KYC[KYC/AML Provider]:::external
        Oracle[Price Oracles]:::external
    end

    UI <-->|WebSocket/HTTP| API
    Auth <-->|Sign/Verify| UI
    UI --> Hooks
    Hooks --> API
    
    API <--> Functions
    Functions <--> DB
    Functions <--> AuthService
    Functions <-->|xrpl.js| Node
    
    Node <--> Ledger
    Ledger --- AMEND
    Ledger <--> DEX
    
    Scheduler -->|Polls| Node
    Functions -->|Verify| KYC
    Functions -->|Fetch| Oracle
```

---

## 💾 Database Schema (ERD)

The data model is designed to handle complex relationships between funds, investors, and assets while maintaining strict compliance records.

```mermaid
erDiagram
    %% Entities
    USERS {
        string fullName
        string email
        string xrplAccount
        string networkPreference
        string xamanUserToken
    }

    FUNDS {
        string name
        string symbol
        string fundType
        string status
        float aum
        string xrplAccount
        string mptTokenId
        string domainId
        object complianceRules
    }

    INVESTORS {
        string investorType
        string kycStatus
        string amlStatus
        string jurisdiction
        boolean accreditedStatus
        string didDocument
    }

    HOLDINGS {
        float shareTokens
        float costBasis
        float currentValue
        float unrealizedGainLoss
        string status
    }

    ASSETS {
        string symbol
        string assetType
        float quantity
        float currentValue
        string isin
        string mptTokenId
    }

    TRANSACTIONS {
        string type
        float amount
        float shareTokens
        string status
        string xrplTxHash
        object complianceChecks
    }

    COMPLIANCE_REPORTS {
        string reportType
        string jurisdiction
        string status
        string reportHash
    }

    %% Relationships
    USERS ||--o{ FUNDS : "manages"
    USERS ||--o{ INVESTORS : "is associated with"
    FUNDS ||--o{ HOLDINGS : "has"
    INVESTORS ||--o{ HOLDINGS : "owns"
    FUNDS ||--o{ ASSETS : "contains"
    FUNDS ||--o{ TRANSACTIONS : "records"
    INVESTORS ||--o{ TRANSACTIONS : "initiates"
    FUNDS ||--o{ COMPLIANCE_REPORTS : "generates"
    ASSETS }|--|| FUNDS : "belongs to"
```

---

## 🔐 Authentication Flow

Secure authentication using Xaman (formerly Xumm) Wallet ensures that all actions are cryptographically signed by the user's XRPL account.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant UI as Frontend (React)
    participant Xaman as Xaman Wallet
    participant API as Convex Backend
    participant DB as Database

    rect rgb(230, 240, 255)
    Note over User, UI: Initiation
    User->>UI: Click "Connect Wallet"
    UI->>API: Request Auth Challenge
    API->>DB: Create Nonce
    API-->>UI: Return Challenge (Nonce)
    end

    rect rgb(255, 240, 230)
    Note over UI, Xaman: Signing
    UI->>Xaman: Request Sign (Nonce)
    Xaman->>User: Prompt to Sign
    User->>Xaman: Approve Signature
    Xaman-->>UI: Return Signed Payload
    end

    rect rgb(230, 255, 230)
    Note over UI, DB: Verification
    UI->>API: Verify Signature
    API->>API: Validate Signature & Nonce
    API->>DB: Fetch/Create User
    API-->>UI: Return Session Token
    UI->>User: Login Successful
    end
```

---

## 🔄 Fund Creation Lifecycle

The lifecycle of a fund from inception to active management, involving multiple compliance checks and on-chain instantiation.

```mermaid
stateDiagram-v2
    classDef state fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef active fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px;

    [*] --> Draft:::state
    Draft --> PendingApproval:::state: Submit for Review
    
    state ComplianceCheck {
        [*] --> KYC
        KYC --> AML
        AML --> Jurisdiction
        Jurisdiction --> [*]
    }
    
    PendingApproval --> ComplianceCheck
    
    ComplianceCheck --> Approved:::active: Checks Pass
    ComplianceCheck --> Rejected:::error: Checks Fail
    
    Approved --> OnChainSetup:::state: Initiate XRPL Setup
    
    state OnChainSetup {
        [*] --> MPTCreation
        MPTCreation --> DomainSetup
        DomainSetup --> DIDRegistration
        DIDRegistration --> [*]
    }
    
    OnChainSetup --> Active:::active: Fund Live
    
    Active --> Suspended:::error: Compliance Trigger
    Suspended --> Active: Resolved
    
    Active --> Liquidating:::state: End of Life
    Liquidating --> Closed:::state: Final Settlement
    Closed --> [*]
```

---

## 💰 Investment Subscription Flow

The process for an investor to subscribe to a fund, including KYC validation and token issuance.

```mermaid
sequenceDiagram
    autonumber
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant Compliance as Compliance Engine
    participant XRPL as XRP Ledger

    rect rgb(240, 240, 240)
    Note right of Inv: Request Phase
    Inv->>UI: Request Subscription (Amount)
    UI->>API: Submit Subscription Request
    end

    rect rgb(255, 250, 230)
    Note right of API: Compliance Phase
    API->>Compliance: Validate Eligibility (KYC/AML)
    Compliance->>Compliance: Check Accreditation
    Compliance->>Compliance: Check Limits
    end

    alt Not Eligible
        Compliance-->>API: Reject
        API-->>UI: Reject (Compliance Error)
    else Eligible
        Compliance-->>API: Approve
        API-->>UI: Approve Request
        
        rect rgb(230, 255, 230)
        Note right of Inv: Settlement Phase
        UI->>Inv: Prompt Payment (XRP/Token)
        Inv->>XRPL: Send Payment Tx
        XRPL-->>API: Tx Confirmed (Webhook/Poll)
        API->>API: Calculate Share Amount
        API->>XRPL: Issue MPT Tokens (Payment)
        XRPL-->>Inv: Receive Fund Shares
        API->>API: Update Fund NAV & Holdings
        end
    end
```

---

## 💸 Redemption Flow

The process for an investor to redeem their shares for the underlying asset or base currency.

```mermaid
sequenceDiagram
    autonumber
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant XRPL as XRP Ledger

    rect rgb(240, 240, 240)
    Note right of Inv: Request
    Inv->>UI: Request Redemption (Shares)
    UI->>API: Check Liquidity & Lockup
    end

    alt Locked / No Liquidity
        API-->>UI: Reject Request
    else Approved
        rect rgb(230, 255, 230)
        Note right of Inv: Execution
        UI->>Inv: Prompt Share Return
        Inv->>XRPL: Send MPT Tokens (Return)
        XRPL-->>API: Tx Confirmed
        API->>API: Calculate Redemption Value
        API->>XRPL: Send Settlement (XRP/Stablecoin)
        XRPL-->>Inv: Receive Funds
        API->>API: Burn Shares & Update NAV
        end
    end
```

---

## 🏦 Lending Protocol (XLS-65)

Integration with the native XRPL Lending Protocol for yield generation and leverage.

```mermaid
flowchart TD
    %% Styles
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px;
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;

    Start[Start] --> CreatePool[Create Loan Broker / Pool]:::process
    CreatePool --> SetTerms[Set Interest & Collateral Terms]:::process
    SetTerms --> ActivePool{Pool Active?}:::decision
    
    ActivePool -- Yes --> Borrower[Borrower Request]:::process
    ActivePool -- No --> Error[Error: Pool Inactive]:::error

    Borrower --> CheckCollateral{Sufficient Collateral?}:::decision
    CheckCollateral -- Yes --> CreateLoan[Create Loan Object]:::process
    CheckCollateral -- No --> Reject[Reject Request]:::error

    CreateLoan --> FundLoan[Lender Funds Loan]:::process
    FundLoan --> ActiveLoan[Loan Active]:::success
    
    ActiveLoan --> Repay{Repayment?}:::decision
    Repay -- Full --> CloseLoan[Close Loan & Return Collateral]:::success
    Repay -- Partial --> UpdateLoan[Update Balance]:::process
    
    ActiveLoan --> Default{Default Condition?}:::decision
    Default -- Yes --> Liquidate[Liquidate Collateral]:::error
    Liquidate --> CloseLoan
```

---

## 🛡️ Permissioned Domains (XLS-80)

Using XLS-80 to enforce strict access control for institutional funds.

```mermaid
graph LR
    %% Styles
    classDef domain fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    classDef actor fill:#e1f5fe,stroke:#0277bd,stroke-width:2px;
    classDef action fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;

    subgraph "Permissioned Domain (XLS-80)"
        Owner[Domain Owner]:::domain
        Rules[Access Rules]:::domain
        Members[Member List]:::domain
    end

    Investor((Investor)):::actor -->|Request Access| Owner
    Owner -->|Verify Credential| Issuer[Credential Issuer]:::actor
    Issuer -->|Valid Credential| Owner
    Owner -->|Add Member| Members
    
    Members -->|Allowed| Trade[Trade/Hold Asset]:::action
    Investor -->|Not Member| Block[Blocked Transaction]:::action
```

---

## 🆔 DID Identity Verification (XLS-40)

Decentralized Identity implementation for self-sovereign compliance.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant Issuer as KYC Provider
    participant Ledger as XRPL
    participant Fund as Fund Manager

    rect rgb(240, 255, 240)
    Note right of User: Identity Creation
    User->>Issuer: Submit ID Documents
    Issuer->>Issuer: Verify Identity
    Issuer->>Ledger: Issue DID Credential (DIDSet)
    User->>Ledger: Claim DID
    end
    
    rect rgb(240, 240, 255)
    Note right of User: Verification
    User->>Fund: Request Fund Access
    Fund->>Ledger: Resolve DID Document
    Ledger-->>Fund: Return DID Document
    Fund->>Fund: Verify Verifiable Credential (VC)
    Fund-->>User: Grant Access
    end
```

---

## ✅ Compliance Workflow

Automated compliance engine ensuring all transactions meet regulatory standards.

```mermaid
flowchart TD
    %% Styles
    classDef check fill:#e0f7fa,stroke:#006064,stroke-width:2px;
    classDef pass fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef fail fill:#ffebee,stroke:#b71c1c,stroke-width:2px;

    Tx[New Transaction] --> KYC{KYC Verified?}:::check
    KYC -- No --> Block[Block Transaction]:::fail
    KYC -- Yes --> AML{AML Check Passed?}:::check
    
    AML -- No --> Flag[Flag for Review]:::fail
    AML -- Yes --> Geo{Geo Restriction?}:::check
    
    Geo -- Restricted --> Block
    Geo -- Allowed --> InvestorType{Investor Type?}:::check
    
    InvestorType -- Retail --> Limit{Within Limits?}:::check
    InvestorType -- Institutional --> Approve[Approve]:::pass
    
    Limit -- Exceeded --> Block
    Limit -- OK --> Approve
```

---

## ⚖️ Portfolio Rebalancing

Logic for maintaining target asset allocations.

```mermaid
graph TD
    %% Styles
    classDef step fill:#fff8e1,stroke:#ff6f00,stroke-width:2px;
    classDef calc fill:#e0f2f1,stroke:#004d40,stroke-width:2px;
    classDef action fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;

    Start[Trigger Rebalance]:::step --> FetchPrices[Fetch Current Asset Prices]:::step
    FetchPrices --> CalcNAV[Calculate Total NAV]:::calc
    CalcNAV --> Compare[Compare vs Target Allocation]:::calc
    
    Compare --> Drift{Drift > Threshold?}:::calc
    Drift -- No --> End[No Action]:::step
    Drift -- Yes --> GenOrders[Generate Buy/Sell Orders]:::action
    
    GenOrders --> Optimize[Optimize Execution]:::calc
    Optimize --> Execute[Execute on DEX]:::action
    Execute --> Update[Update Portfolio State]:::step
```

---

## 🤝 Settlement Process

End-to-end settlement flow for fund subscriptions and redemptions.

```mermaid
sequenceDiagram
    autonumber
    participant Order as Order Management
    participant Compliance as Compliance Engine
    participant Treasury as Treasury System
    participant Ledger as XRPL

    rect rgb(255, 250, 240)
    Note right of Order: Pre-Settlement
    Order->>Compliance: Validate Order
    Compliance-->>Order: Validated
    Order->>Treasury: Reserve Funds/Assets
    end

    rect rgb(240, 255, 255)
    Note right of Treasury: On-Chain Execution
    Treasury->>Ledger: Create Escrow (Optional)
    Ledger-->>Treasury: Escrow Created
    Treasury->>Order: Settlement Ready
    Order->>Ledger: Execute Payment/Transfer
    Ledger-->>Order: Settlement Finalized
    end

    rect rgb(240, 240, 240)
    Note right of Order: Post-Settlement
    Order->>Order: Update Records
    end
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
        +buildDIDSet()
    }
    
    class WalletManager {
        +sign()
        +verify()
        +deriveAddress()
        +manageKeys()
    }
    
    class EventListener {
        +onTransaction()
        +onLedgerClosed()
        +onValidationReceived()
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
    %% Styles
    classDef page fill:#e1bee7,stroke:#4a148c,stroke-width:2px;
    classDef comp fill:#b3e5fc,stroke:#01579b,stroke-width:2px;
    classDef atom fill:#c8e6c9,stroke:#1b5e20,stroke-width:2px;

    App:::page --> AuthProvider:::comp
    App --> Router:::comp
    
    AuthProvider --> Login:::page
    AuthProvider --> Dashboard:::page
    
    Dashboard --> Sidebar:::comp
    Dashboard --> Header:::comp
    Dashboard --> MainContent:::comp
    
    MainContent --> FundList:::comp
    MainContent --> InvestorList:::comp
    MainContent --> AssetAllocation:::comp
    MainContent --> TransactionHistory:::comp
    
    FundList --> FundCard:::atom
    FundCard --> FundMetrics:::atom
    
    AssetAllocation --> Charts:::atom
    Charts --> PieChart:::atom
    Charts --> LineChart:::atom
```

---

## 🔔 Notification System

Event-driven notification architecture.

```mermaid
graph LR
    %% Styles
    classDef event fill:#ffccbc,stroke:#bf360c,stroke-width:2px;
    classDef engine fill:#cfd8dc,stroke:#455a64,stroke-width:2px;
    classDef output fill:#dcedc8,stroke:#33691e,stroke-width:2px;

    Event[System Event]:::event -->|Trigger| Engine[Notification Engine]:::engine
    Engine -->|Filter| Prefs[User Preferences]:::engine
    
    Prefs -->|Push| Push[Push Notification]:::output
    Prefs -->|Email| Email[Email Service]:::output
    Prefs -->|In-App| DB[Database Store]:::output
    
    Push --> User((User))
    Email --> User
    DB --> UI[Frontend Alert]
```

---

## 📉 Risk Management

Calculation of risk metrics for funds.

```mermaid
graph TD
    %% Styles
    classDef input fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef calc fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef output fill:#f8bbd0,stroke:#880e4f,stroke-width:2px;

    Data[Historical Data]:::input --> Returns[Calculate Returns]:::calc
    Returns --> Volatility[Calculate Volatility]:::calc
    Returns --> VaR[Calculate VaR 95% & 99%]:::calc
    Returns --> Drawdown[Calculate Max Drawdown]:::calc
    
    Benchmark[Benchmark Data]:::input --> Beta[Calculate Beta]:::calc
    Benchmark --> Alpha[Calculate Alpha]:::calc
    
    Volatility --> Sharpe[Sharpe Ratio]:::output
    Volatility --> Sortino[Sortino Ratio]:::output
    
    VaR --> Report[Risk Report]:::output
    Drawdown --> Report
    Sharpe --> Report
```

---

## 📝 Audit Trail

Immutable logging of all system actions.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant System
    participant Logger
    participant DB
    participant Ledger as XRPL

    rect rgb(255, 240, 240)
    Note right of User: Action
    User->>System: Perform Action
    System->>System: Execute Logic
    end

    rect rgb(240, 240, 255)
    Note right of System: Logging
    System->>Logger: Log Event (Actor, Action, Data)
    Logger->>Logger: Hash Entry
    Logger->>DB: Store Log Entry
    end
    
    rect rgb(240, 255, 240)
    Note right of Logger: Anchoring
    opt Periodic Anchor
        Logger->>Ledger: Submit Hash to Ledger
        Ledger-->>Logger: Tx Hash (Proof)
        Logger->>DB: Update Log with Proof
    end
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