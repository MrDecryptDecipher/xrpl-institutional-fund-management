# XRPL Institutional Fund Management Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![XRPL](https://img.shields.io/badge/XRPL-Ledger-blue)](https://xrpl.org)
[![Convex](https://img.shields.io/badge/Backend-Convex-orange)](https://convex.dev)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org)

## 🚀 Overview

The **XRPL Institutional Fund Management Protocol** is a state-of-the-art financial infrastructure designed to bridge the gap between Traditional Finance (TradFi) and Decentralized Finance (DeFi). Built on the **XRP Ledger (XRPL)**, it empowers asset managers to launch, manage, and settle tokenized funds with institutional-grade compliance, security, and efficiency.

Unlike standard DeFi protocols, this system is built from the ground up for **regulated markets**, leveraging specific XRPL amendments to ensure every transaction is compliant, every identity is verified, and every asset is secure.

### 🌟 Key Value Propositions

*   **Regulatory Compliance First**: Built-in automated KYC/AML checks using **XLS-80 (Permissioned Domains)** and **XLS-40 (DID)** ensure that only verified counterparties can hold or trade fund tokens.
*   **Institutional Lending**: Integrated **XLS-65 (Native Lending Protocol)** allows funds to securely lend assets or borrow against collateral without intermediaries.
*   **Real-Time Settlement**: Leveraging XRPL's 3-second ledger close time for near-instant subscription and redemption settlement.
*   **Reactive Architecture**: Powered by **Convex**, the backend provides real-time state synchronization between the blockchain and the user interface, eliminating stale data.

---

## 🏗️ System Architecture

The architecture follows a reactive, event-driven pattern. The **Convex** backend acts as the synchronization layer between the deterministic **XRP Ledger** and the dynamic **React** frontend.

```mermaid
graph TD
    %% Theme: Institutional Navy & White
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef secondary fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;
    classDef ledger fill:#1B5E20,stroke:#000,stroke-width:2px,color:#fff;
    classDef external fill:#4A148C,stroke:#000,stroke-width:2px,color:#fff;

    subgraph "Frontend Layer"
        UI[React UI / Vite]:::primary
        Auth[Xaman Wallet Auth]:::secondary
        Hooks[Custom React Hooks]:::secondary
    end

    subgraph "Backend Layer (Convex)"
        API[Public API Gateway]:::primary
        Functions[Query & Mutation Functions]:::secondary
        Scheduler[Cron Jobs]:::secondary
        DB[(Convex Database)]:::primary
    end

    subgraph "Blockchain Layer (XRPL)"
        Node[XRPL Public Node]:::ledger
        Ledger[XRP Ledger]:::ledger
        AMEND[Amendments: XLS-33, 40, 65, 80]:::ledger
    end

    subgraph "External Services"
        KYC[KYC/AML Provider]:::external
        Oracle[Price Oracles]:::external
    end

    UI <-->|WebSocket| API
    Auth <-->|Sign| UI
    UI --> Hooks
    Hooks --> API
    
    API <--> Functions
    Functions <--> DB
    Functions <-->|xrpl.js| Node
    
    Node <--> Ledger
    Ledger --- AMEND
    
    Scheduler -->|Polls| Node
    Functions -->|Verify| KYC
    Functions -->|Fetch| Oracle
```

---

## 💾 Database Schema (ERD)

Our data model bridges off-chain metadata with on-chain state. While the XRPL is the source of truth for balances, Convex stores rich metadata, compliance records, and historical performance data.

```mermaid
erDiagram
    %% Entities
    USERS {
        string fullName
        string email
        string xrplAccount
        string kycLevel
    }

    FUNDS {
        string name
        string symbol
        string status
        float aum
        string mptTokenId
        string domainId
    }

    INVESTORS {
        string investorType
        string jurisdiction
        boolean accredited
        string didDocument
    }

    ASSETS {
        string symbol
        string type
        float quantity
        float value
        string isin
    }

    TRANSACTIONS {
        string type
        float amount
        string status
        string txHash
    }

    %% Relationships
    USERS ||--o{ FUNDS : "manages"
    USERS ||--o{ INVESTORS : "identity"
    FUNDS ||--o{ ASSETS : "holds"
    FUNDS ||--o{ TRANSACTIONS : "executes"
    INVESTORS ||--o{ TRANSACTIONS : "initiates"
```

---

## 🔐 Authentication Flow

We utilize **Xaman (formerly Xumm)** for non-custodial authentication. This ensures that the platform never holds user keys. Authentication is a cryptographic handshake proving ownership of an XRPL account.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant UI as Frontend
    participant Xaman as Xaman Wallet
    participant API as Backend

    rect rgb(240, 248, 255)
    Note over User, API: 1. Challenge Request
    User->>UI: Connect Wallet
    UI->>API: Request Nonce
    API-->>UI: Return Nonce
    end

    rect rgb(255, 250, 240)
    Note over User, API: 2. Signing
    UI->>Xaman: Request Sign (Nonce)
    Xaman->>User: Approve Sign
    User->>Xaman: Signed
    Xaman-->>UI: Return Signature
    end

    rect rgb(240, 255, 240)
    Note over User, API: 3. Verification
    UI->>API: Verify Signature
    API->>API: Validate & Create Session
    API-->>UI: JWT Token
    end
```

---

## 🔄 Fund Creation Lifecycle

The fund creation process is a rigorous workflow ensuring all regulatory requirements are met before the fund is deployed on-chain.

```mermaid
stateDiagram-v2
    classDef primary fill:#0D47A1,color:#fff,stroke:#000,stroke-width:2px;
    classDef success fill:#2E7D32,color:#fff,stroke:#000,stroke-width:2px;
    classDef error fill:#C62828,color:#fff,stroke:#000,stroke-width:2px;

    [*] --> Draft
    Draft --> PendingApproval: Submit
    
    state ComplianceCheck {
        [*] --> KYC
        KYC --> AML
        AML --> Jurisdiction
        Jurisdiction --> [*]
    }
    
    PendingApproval --> ComplianceCheck
    
    ComplianceCheck --> Approved: Pass
    ComplianceCheck --> Rejected: Fail
    
    Approved --> OnChainSetup: Deploy
    
    state OnChainSetup {
        [*] --> CreateMPT
        CreateMPT --> SetupDomain
        SetupDomain --> RegisterDID
        RegisterDID --> [*]
    }
    
    OnChainSetup --> Active
    Active --> Suspended: Violation
    Suspended --> Active: Resolved
    Active --> Liquidating: Close
    Liquidating --> Closed
    Closed --> [*]

    class Active success
    class Closed primary
    class Rejected error
    class Suspended error
```

---

## 💰 Investment Subscription Flow

Investors subscribe to funds using a seamless flow that handles KYC verification and token issuance in a single atomic process.

```mermaid
sequenceDiagram
    autonumber
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant XRPL as XRP Ledger

    rect rgb(240, 248, 255)
    Note right of Inv: Request
    Inv->>UI: Subscribe (100k XRP)
    UI->>API: Validate Compliance
    API-->>UI: Approved
    end

    rect rgb(240, 255, 240)
    Note right of Inv: Settlement
    UI->>Inv: Sign Payment
    Inv->>XRPL: Send XRP
    XRPL-->>API: Payment Confirmed
    API->>XRPL: Issue Fund Tokens
    XRPL-->>Inv: Tokens Received
    end
```

---

## 💸 Redemption Flow

Redemptions are automated but subject to liquidity and lock-up period checks.

```mermaid
sequenceDiagram
    autonumber
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant XRPL as XRP Ledger

    rect rgb(240, 248, 255)
    Note right of Inv: Request
    Inv->>UI: Redeem (50 Tokens)
    UI->>API: Check Lock-up & Liquidity
    API-->>UI: Approved
    end

    rect rgb(240, 255, 240)
    Note right of Inv: Settlement
    UI->>Inv: Sign Token Return
    Inv->>XRPL: Send Tokens
    XRPL-->>API: Tokens Burned
    API->>XRPL: Send Settlement (XRP)
    XRPL-->>Inv: XRP Received
    end
```

---

## 🏦 Lending Protocol (XLS-65)

We integrate the native **XLS-65 Lending Protocol** to allow funds to earn yield on idle assets.

```mermaid
graph TD
    %% Theme: Institutional
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef decision fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;
    classDef success fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;
    classDef error fill:#C62828,stroke:#000,stroke-width:2px,color:#fff;

    Start([Start]) --> CreatePool[Create Loan Pool]:::primary
    CreatePool --> Terms[Set Terms]:::primary
    Terms --> Active{Is Active?}:::decision
    
    Active -- Yes --> Request[Borrow Request]:::primary
    Active -- No --> Stop([Stop]):::error

    Request --> Collateral{Collateral OK?}:::decision
    Collateral -- Yes --> Fund[Fund Loan]:::success
    Collateral -- No --> Reject[Reject]:::error

    Fund --> Monitor[Monitor Health]:::primary
    Monitor --> Repay{Repaid?}:::decision
    
    Repay -- Yes --> Close[Close Loan]:::success
    Repay -- No --> Default{Default?}:::decision
    
    Default -- Yes --> Liquidate[Liquidate]:::error
    Default -- No --> Monitor
```

---

## 🛡️ Permissioned Domains (XLS-80)

**XLS-80** is the backbone of our compliance layer, ensuring that tokens can only be held by authorized wallets.

```mermaid
graph LR
    %% Theme: Institutional
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef secondary fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;
    classDef action fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;
    classDef block fill:#C62828,stroke:#000,stroke-width:2px,color:#fff;

    subgraph "Permissioned Environment"
        Manager[Fund Manager]:::primary
        Whitelist[Access List]:::secondary
    end

    Inv1((Verified Inv)):::primary -->|Request| Manager
    Inv2((Unverified)):::secondary -->|Request| Manager

    Manager -->|Check Creds| Whitelist
    
    Whitelist -->|Approved| Trade[Allow Trade]:::action
    Whitelist -->|Rejected| Block[Block Trade]:::block
```

---

## 🆔 DID Identity Verification (XLS-40)

We use **Decentralized Identifiers (DIDs)** to link on-chain accounts to off-chain identity documents without exposing sensitive data.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant Issuer as KYC Provider
    participant XRPL
    participant Fund

    rect rgb(240, 248, 255)
    Note right of User: Identity Issuance
    User->>Issuer: Submit Passport
    Issuer->>Issuer: Verify
    Issuer->>XRPL: Issue DID Credential
    end

    rect rgb(240, 255, 240)
    Note right of User: Access Control
    User->>Fund: Request Access
    Fund->>XRPL: Check DID
    XRPL-->>Fund: Valid Credential
    Fund-->>User: Access Granted
    end
```

---

## ✅ Compliance Workflow

Every transaction passes through a multi-stage compliance engine.

```mermaid
graph TD
    %% Theme: Institutional
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef decision fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;
    classDef stop fill:#C62828,stroke:#000,stroke-width:2px,color:#fff;
    classDef pass fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Tx[Transaction]:::primary --> KYC{KYC?}:::decision
    KYC -- No --> Block1[Block]:::stop
    KYC -- Yes --> AML{AML?}:::decision
    
    AML -- No --> Block2[Block]:::stop
    AML -- Yes --> Geo{Geo?}:::decision
    
    Geo -- Fail --> Block3[Block]:::stop
    Geo -- Pass --> Limit{Limits?}:::decision
    
    Limit -- Fail --> Block4[Block]:::stop
    Limit -- Pass --> Execute[Execute]:::pass
```

---

## ⚖️ Portfolio Rebalancing

Automated rebalancing ensures the fund maintains its target asset allocation.

```mermaid
graph TD
    %% Theme: Institutional
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef decision fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;
    classDef action fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Start[Check Portfolio]:::primary --> Prices[Fetch Prices]:::primary
    Prices --> Calc[Calc Weights]:::primary
    Calc --> Drift{Drift > 5%?}:::decision
    
    Drift -- No --> Sleep[Wait]:::primary
    Drift -- Yes --> Plan[Gen Orders]:::primary
    
    Plan --> Execute[Execute Swaps]:::action
    Execute --> Verify[Verify State]:::primary
```

---

## 🤝 Settlement Process

```mermaid
sequenceDiagram
    autonumber
    participant OMS as Order Mgmt
    participant Treasury
    participant XRPL

    rect rgb(240, 248, 255)
    OMS->>Treasury: Initiate Settlement
    Treasury->>XRPL: Create Escrow
    XRPL-->>Treasury: Escrow ID
    end

    rect rgb(240, 255, 240)
    Treasury->>OMS: Ready
    OMS->>XRPL: Fulfill Escrow
    XRPL-->>OMS: Settled
    end
```

---

## 🔌 XRPL Interaction Layer

```mermaid
classDiagram
    class XRPLService {
        +connect()
        +submitTx()
        +listen()
    }
    class TxBuilder {
        +payment()
        +trustSet()
        +mptCreate()
    }
    class Wallet {
        +sign()
        +verify()
    }

    XRPLService --> TxBuilder
    XRPLService --> Wallet
    
    style XRPLService fill:#0D47A1,color:#fff
    style TxBuilder fill:#fff,stroke:#0D47A1
    style Wallet fill:#fff,stroke:#0D47A1
```

---

## ⚛️ Frontend Component Hierarchy

```mermaid
graph TD
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef secondary fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;

    App:::primary --> Auth:::secondary
    App --> Dashboard:::secondary
    
    Dashboard --> Funds:::secondary
    Dashboard --> Investors:::secondary
    Dashboard --> Analytics:::secondary
    
    Funds --> FundCard:::primary
    Investors --> InvestorRow:::primary
```

---

## 🔔 Notification System

```mermaid
graph LR
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef output fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Event[Event]:::primary --> Engine[Engine]:::primary
    Engine --> Filter[Filter]:::primary
    
    Filter --> Push[Push]:::output
    Filter --> Email[Email]:::output
```

---

## 📉 Risk Management

```mermaid
graph TD
    classDef primary fill:#0D47A1,stroke:#000,stroke-width:2px,color:#fff;
    classDef calc fill:#fff,stroke:#0D47A1,stroke-width:2px,color:#000;
    classDef out fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Data[Market Data]:::primary --> VaR[Calc VaR]:::calc
    Data --> Vol[Calc Volatility]:::calc
    
    VaR --> Report[Risk Report]:::out
    Vol --> Report
```

---

## 📝 Audit Trail

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant System
    participant Log
    participant XRPL

    User->>System: Action
    System->>Log: Create Entry
    Log->>Log: Hash Data
    Log->>XRPL: Anchor Hash
    XRPL-->>Log: Proof
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js v18+**
- **npm** or **yarn**

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