const fs = require('fs');

// Diagram 1: Data Flow Architecture - Better horizontal layout
const diagram1 = `graph LR
    subgraph Sources["📊 Data Sources"]
        A[User Input]
        B[XRPL Ledger]
        C[Price Oracles]
        D[External APIs]
    end

    subgraph Ingestion["🔌 Ingestion Layer"]
        E[API Gateway]
        F[WebSocket Server]
        G[Event Listeners]
    end

    subgraph Processing["⚙️ Processing Layer"]
        H[Convex Functions]
        I[Validation Engine]
        J[Compliance Engine]
        K[Risk Engine]
    end

    subgraph Storage["💾 Storage Layer"]
        L[Convex Database]
        M[XRPL Ledger]
        N[Cache Layer]
    end

    subgraph Presentation["🖥️ Presentation Layer"]
        O[React Components]
        P[Real-Time Updates]
        Q[Reports & Analytics]
    end

    A --> E
    B --> F
    C --> G
    D --> G
    E --> H
    F --> H
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    K --> M
    K --> N
    L --> O
    M --> O
    N --> P
    O --> Q
    P --> Q

    style Sources fill:#e1f5ff
    style Ingestion fill:#fff4e1
    style Processing fill:#ffe1f5
    style Storage fill:#e1ffe1
    style Presentation fill:#f5e1ff
`;

// Diagram 3: Tokenization Process - Better horizontal flow
const diagram3 = `graph LR
    subgraph Origination["🏢 Asset Origination"]
        A[Asset ID]
        B[Due Diligence]
        C[Valuation]
        D[Legal Structure]
    end

    subgraph Token["🪙 Tokenization"]
        E[Smart Contract]
        F[Token Issuance]
        G[Compliance Setup]
        H[Investor Onboarding]
    end

    subgraph Dist["📤 Distribution"]
        I[Primary Offering]
        J[Investor Allocation]
        K[Token Distribution]
        L[Settlement]
    end

    subgraph Mgmt["📊 Ongoing Management"]
        M[NAV Calculation]
        N[Distributions]
        O[Reporting]
        P[Compliance Monitor]
    end

    subgraph Market["💹 Secondary Market"]
        Q[Trading Platform]
        R[Liquidity Provision]
        S[Price Discovery]
        T[Settlement]
    end

    A --> B --> C --> D
    D --> E --> F --> G --> H
    H --> I --> J --> K --> L
    L --> M --> N --> O --> P
    P --> Q --> R --> S --> T

    style Origination fill:#e1f5ff
    style Token fill:#fff4e1
    style Dist fill:#ffe1f5
    style Mgmt fill:#e1ffe1
    style Market fill:#f5e1ff
`;

// Diagram 4: Subscription Flow - Cleaner sequence
const diagram4 = `sequenceDiagram
    participant I as 👤 Investor
    participant P as 🌐 Platform
    participant C as ✅ Compliance
    participant X as 🔗 XRPL
    participant W as 💰 Wallet

    I->>P: Submit Subscription Request
    P->>C: Verify KYC/AML
    C->>P: Compliance Approved
    P->>X: Create Token Transaction
    X->>X: Validate & Process
    X->>W: Mint Tokens to Wallet
    W->>I: Tokens Received
    P->>I: Confirmation & Receipt
`;

// Diagram 5: Redemption Flow - Cleaner sequence
const diagram5 = `sequenceDiagram
    participant I as 👤 Investor
    participant P as 🌐 Platform
    participant V as 📊 Valuation
    participant X as 🔗 XRPL
    participant B as 🏦 Bank

    I->>P: Submit Redemption Request
    P->>V: Calculate NAV
    V->>P: Current Value
    P->>X: Burn Token Transaction
    X->>X: Validate & Burn
    X->>P: Burn Confirmed
    P->>B: Initiate Payment
    B->>I: Funds Transferred
    P->>I: Redemption Complete
`;

// Write all diagrams
fs.writeFileSync('diagram_1.mmd', diagram1);
fs.writeFileSync('diagram_3.mmd', diagram3);
fs.writeFileSync('diagram_4.mmd', diagram4);
fs.writeFileSync('diagram_5.mmd', diagram5);

console.log('✅ Recreated diagrams with better formatting:');
console.log('  - diagram_1.mmd (Data Flow - Horizontal Layout)');
console.log('  - diagram_3.mmd (Tokenization - Horizontal Flow)');
console.log('  - diagram_4.mmd (Subscription - Clean Sequence)');
console.log('  - diagram_5.mmd (Redemption - Clean Sequence)');

