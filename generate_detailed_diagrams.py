import base64
import json
import os
import requests

# Premium Institutional Theme
# Enterprise Light Theme (High Contrast)
THEME_CONFIG = {
    "theme": "default",
    "themeVariables": {
        "primaryColor": "#1E88E5",
        "primaryTextColor": "#000000",
        "primaryBorderColor": "#000000",
        "lineColor": "#000000",
        "secondaryColor": "#E3F2FD",
        "tertiaryColor": "#FFFFFF",
        "fontFamily": "Arial",
        "fontSize": "16px",
        "mainBkg": "#FFFFFF",
        "background": "#FFFFFF",
        "nodeBorder": "#000000",
        "clusterBkg": "#F5F5F5",
        "clusterBorder": "#000000"
    }
}

# Detailed Diagram Definitions
DIAGRAMS = {
    "diagram-1.svg": """graph TD
    %% Theme: Institutional Technical
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef secondary fill:#E3F2FD,stroke:#1E88E5,stroke-width:1px,color:#000;
    classDef ledger fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;
    classDef external fill:#7B1FA2,stroke:#000,stroke-width:2px,color:#fff;
    classDef component fill:#fff,stroke:#000,stroke-width:1px,stroke-dasharray: 5 5,color:#000;

    subgraph "Frontend Layer (Client)"
        UI[React UI / Vite Application]:::primary
        Store[Zustand State Store]:::component
        Query[TanStack Query]:::component
        Xaman[Xaman Wallet SDK]:::secondary
    end

    subgraph "Backend Layer (Convex Serverless)"
        API[Public API Gateway]:::primary
        
        subgraph "Business Logic"
            AuthFunc[Auth Actions]:::secondary
            FundFunc[Fund Mgmt Mutations]:::secondary
            TxFunc[Transaction Builder]:::secondary
        end
        
        subgraph "Data Persistence"
            UsersTable[(Users Table)]:::primary
            FundsTable[(Funds Table)]:::primary
            TxTable[(Transactions Table)]:::primary
        end
        
        Cron[Scheduled Cron Jobs]:::secondary
    end

    subgraph "Blockchain Layer (XRPL Mainnet/Testnet)"
        Node[Clio / RIPPLED Node]:::ledger
        Ledger[XRP Ledger State]:::ledger
        
        subgraph "Protocol Amendments"
            XLS30[XLS-30 AMM]:::component
            XLS40[XLS-40 DID]:::component
            XLS80[XLS-80 Permissioned]:::component
        end
    end

    subgraph "External Integrations"
        KYC[Sumsub / Onfido KYC]:::external
        IPFS[IPFS Storage]:::external
    end

    %% Data Flows
    UI <-->|WebSocket / JSON-RPC| API
    UI -->|State Updates| Store
    Store -->|Selectors| UI
    
    UI <-->|Sign & Submit| Xaman
    Xaman -->|Signed Blob| API
    
    API -->|Query| AuthFunc
    API -->|Mutation| FundFunc
    
    FundFunc <-->|Read/Write| FundsTable
    FundFunc <-->|Read/Write| TxTable
    
    FundFunc -->|xrpl.js / Websocket| Node
    Node <-->|Consensus| Ledger
    
    FundFunc -->|Verify Identity| KYC
    FundFunc -->|Store Metadata| IPFS
""",
    "diagram-2.svg": """erDiagram
    %% Detailed Schema
    USERS {
        string _id PK
        string wallet_address UK "XRPL r-address"
        string did_document "XLS-40 DID"
        string kyc_status "verified/pending"
        datetime last_login
        string role "manager/investor"
    }

    FUNDS {
        string _id PK
        string manager_id FK
        string name
        string ticker
        string currency "XRP/USD"
        float aum_value
        string issuance_id "XRPL Token ID"
        string domain_id "XLS-80 Domain"
        string status "active/paused"
    }

    ASSETS {
        string _id PK
        string fund_id FK
        string asset_type "token/nft/lp"
        string issuer_address
        string currency_code
        float quantity
        float current_price
    }

    TRANSACTIONS {
        string _id PK
        string fund_id FK
        string user_id FK
        string type "sub/red/rebal"
        string xrpl_tx_hash UK
        string status "pending/validated"
        float amount
        json metadata
        datetime created_at
    }

    COMPLIANCE_LOGS {
        string _id PK
        string user_id FK
        string check_type "aml/kyc"
        string provider_response
        boolean passed
        datetime timestamp
    }

    USERS ||--o{ FUNDS : "manages"
    USERS ||--o{ TRANSACTIONS : "initiates"
    USERS ||--o{ COMPLIANCE_LOGS : "has"
    FUNDS ||--o{ ASSETS : "holds_portfolio"
    FUNDS ||--o{ TRANSACTIONS : "records"
""",
    "diagram-3.svg": """sequenceDiagram
    autonumber
    participant User
    participant UI as React Frontend
    participant Xaman as Xaman App
    participant API as Convex Backend
    participant XRPL as XRPL Node

    Note over User, XRPL: Phase 1: Challenge Generation
    User->>UI: Click "Connect Wallet"
    UI->>API: mutation createChallenge(address)
    API->>API: Generate Random Nonce
    API-->>UI: Return (nonce, token)

    Note over User, XRPL: Phase 2: Cryptographic Signing
    UI->>Xaman: Payload: SignIn(nonce)
    Xaman->>User: Prompt "Sign to Login"
    User->>Xaman: Biometric Confirm
    Xaman->>Xaman: Sign with Private Key
    Xaman-->>UI: Return (hexBlob, signature)

    Note over User, XRPL: Phase 3: Verification
    UI->>API: mutation verifySignature(blob, sig)
    API->>XRPL: verify(signature, pubKey)
    XRPL-->>API: valid: true
    API->>API: Generate Session JWT
    API-->>UI: Return (authToken)
    UI->>UI: Store Token in LocalStorage
""",
    "diagram-4.svg": """stateDiagram-v2
    classDef primary fill:#1E88E5,color:#fff,stroke:#000,stroke-width:2px;
    classDef success fill:#2E7D32,color:#fff,stroke:#000,stroke-width:2px;
    classDef error fill:#C62828,color:#fff,stroke:#000,stroke-width:2px;

    [*] --> Draft: Manager Initiates
    
    state "Compliance Review" as Compliance {
        Draft --> KYC_Check: Submit
        KYC_Check --> AML_Screening: Pass
        AML_Screening --> Jurisdiction_Verify: Pass
        Jurisdiction_Verify --> Approved: Pass
        
        KYC_Check --> Rejected: Fail
        AML_Screening --> Rejected: Fail
    }

    state "On-Chain Deployment (Atomic)" as Deploy {
        Approved --> AccountSet: 1. Configure Domain
        AccountSet --> TrustSet: 2. Auth TrustLines
        TrustSet --> URITokenMint: 3. Mint Fund Token
        URITokenMint --> DIDSet: 4. Link Identity
    }

    Deploy --> Active: Deployment Success
    Deploy --> Failed: Tx Failure

    state Active {
        [*] --> Trading
        Trading --> Rebalancing: Drift Detected
        Rebalancing --> Trading: Swaps Complete
        Trading --> Halted: Emergency Stop
        Halted --> Trading: Resume
    }

    Active --> Liquidating: Manager Close
    Liquidating --> Closed: Assets Returned
    Closed --> [*]
""",
    "diagram-5.svg": """sequenceDiagram
    autonumber
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant Ledger as XRPL

    Note right of Inv: Subscription Request
    Inv->>UI: Input Amount (100k XRP)
    UI->>API: validateEligibility(user, fund)
    API->>Ledger: checkTrustLine(user, fundToken)
    Ledger-->>API: status: active
    API-->>UI: allow: true

    Note right of Inv: Execution
    UI->>Inv: Xaman: Sign Payment
    Inv->>Ledger: Tx: Payment (XRP) -> FundWallet
    Ledger-->>API: Stream: TxValidated
    
    Note right of Inv: Token Issuance
    API->>Ledger: Tx: Payment (FundToken) -> Investor
    Ledger-->>Inv: Balance Updated
    API->>API: Record Transaction
""",
    "diagram-6.svg": """sequenceDiagram
    autonumber
    participant Inv as Investor
    participant UI as Frontend
    participant API as Backend
    participant Ledger as XRPL

    Note right of Inv: Redemption Request
    Inv->>UI: Request Redeem (50 FundTokens)
    UI->>API: checkLiquidity(fund)
    API->>Ledger: getAccountLines(fundWallet)
    Ledger-->>API: XRP Balance: 5M
    API-->>UI: approved: true

    Note right of Inv: Settlement
    UI->>Inv: Xaman: Sign Token Return
    Inv->>Ledger: Tx: Payment (FundToken) -> FundWallet
    Ledger-->>API: Stream: Tokens Returned
    
    Note right of Inv: Payout
    API->>Ledger: Tx: Payment (XRP) -> Investor
    Ledger-->>Inv: XRP Received
    API->>API: Burn Tokens / Update Supply
""",
    "diagram-7.svg": """graph TD
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef decision fill:#fff,stroke:#1E88E5,stroke-width:2px,color:#000;
    classDef action fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;
    classDef error fill:#C62828,stroke:#000,stroke-width:2px,color:#fff;

    Start([Lending Protocol Init]) --> PoolConfig["Configure Loan Pool (XLS-65)"]:::primary
    PoolConfig --> SetRates["Set Interest Model"]:::primary
    SetRates --> Publish["Publish to Ledger"]:::action

    subgraph "Borrowing Lifecycle"
        Request["Borrow Request"]:::primary --> Collateral{"Collateral > 150%?"}:::decision
        Collateral -- Yes --> Approve["Approve Loan"]:::action
        Collateral -- No --> Reject["Reject Request"]:::error
        
        Approve --> Escrow["Lock Collateral"]:::primary
        Escrow --> Transfer["Transfer Principal"]:::action
        
        Transfer --> Monitor["Health Monitor"]:::primary
        Monitor --> Health{"LTV < 80%?"}:::decision
        
        Health -- Yes --> Wait["Continue"]:::primary
        Health -- No --> Liquidate["Trigger Liquidation"]:::error
        
        Wait --> Repay{"Repayment Rx?"}:::decision
        Repay -- Yes --> Unlock["Unlock Collateral"]:::action
        Repay -- No --> Monitor
    end
""",
    "diagram-8.svg": """graph LR
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef secondary fill:#fff,stroke:#1E88E5,stroke-width:1px,color:#000;
    classDef action fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;
    classDef block fill:#C62828,stroke:#000,stroke-width:2px,color:#fff;

    subgraph "XLS-80 Permissioned Domain"
        Manager[Fund Manager Account]:::primary
        AccessList[On-Chain Access List]:::secondary
    end

    subgraph "Investor Wallets"
        Inv1((Verified DID)):::primary
        Inv2((Unverified)):::secondary
        Inv3((Blacklisted)):::block
    end

    Inv1 -->|TrustSet| Manager
    Manager -->|Check DID| AccessList
    AccessList -->|Found| Auth[Authorize TrustLine]:::action
    
    Inv2 -->|TrustSet| Manager
    Manager -->|Check DID| AccessList
    AccessList -->|Not Found| Deny[Reject TrustLine]:::block
    
    Inv3 -->|TrustSet| Manager
    Manager -->|Check Flag| AccessList
    AccessList -->|Frozen| Freeze[Freeze Account]:::block
""",
    "diagram-9.svg": """sequenceDiagram
    autonumber
    participant User
    participant Issuer as KYC Provider (Sumsub)
    participant XRPL as XRPL Ledger
    participant Fund as Fund Contract

    Note right of User: Identity Issuance (Off-Chain)
    User->>Issuer: Upload Passport / Selfie
    Issuer->>Issuer: Biometric Verification
    Issuer->>Issuer: Generate DID Document
    Issuer->>XRPL: Tx: DIDSet (Register Identity)
    XRPL-->>User: DID Created

    Note right of User: Credential Presentation (On-Chain)
    User->>Fund: Request Access (Sub)
    Fund->>XRPL: LedgerEntry: DID (User)
    XRPL-->>Fund: Return DID Document
    Fund->>Fund: Verify Issuer Signature
    Fund-->>User: Access Granted (TrustLine Auth)
""",
    "diagram-10.svg": """graph TD
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef decision fill:#fff,stroke:#1E88E5,stroke-width:2px,color:#000;
    classDef stop fill:#C62828,stroke:#000,stroke-width:2px,color:#fff;
    classDef pass fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Tx[Incoming Transaction]:::primary --> Decode[Decode Payload]:::primary
    Decode --> KYC{KYC Verified?}:::decision
    
    KYC -- No --> Block1[Block: Error 401]:::stop
    KYC -- Yes --> AML{AML Screen Clear?}:::decision
    
    AML -- No --> Block2[Block: Error 403]:::stop
    AML -- Yes --> Geo{Geo Restriction?}:::decision
    
    Geo -- Restricted --> Block3[Block: Error 451]:::stop
    Geo -- Allowed --> Limit{Daily Limit OK?}:::decision
    
    Limit -- Exceeded --> Block4[Block: Error 429]:::stop
    Limit -- OK --> Execute[Execute on Ledger]:::pass
""",
    "diagram-11.svg": """graph TD
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef decision fill:#fff,stroke:#1E88E5,stroke-width:2px,color:#000;
    classDef action fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Start[Portfolio Monitor]:::primary --> Prices[Fetch Oracle Prices]:::primary
    Prices --> Calc[Calculate Current Weights]:::primary
    Calc --> Target[Compare vs Target Allocation]:::primary
    
    Target --> Drift{Drift > Threshold?}:::decision
    
    Drift -- No --> Log[Log Status OK]:::primary
    Drift -- Yes --> Gen[Generate Rebalance Orders]:::primary
    
    Gen --> Path[Find Liquidity Paths]:::primary
    Path --> Execute[Execute Atomic Swaps]:::action
    
    Execute --> Verify[Verify New Weights]:::primary
    Verify --> Report[Generate Rebalance Report]:::primary
""",
    "diagram-12.svg": """sequenceDiagram
    autonumber
    participant OMS as Order Mgmt System
    participant Treasury as Fund Treasury
    participant XRPL as XRPL Ledger
    participant Bank as Custodian Bank

    Note over OMS, Bank: Phase 1: Settlement Initiation
    OMS->>Treasury: Request Settlement (Trade ID: 12345)
    Treasury->>XRPL: Tx: EscrowCreate (Amount: 1M XRP, Condition: Preimage)
    XRPL-->>Treasury: Escrow Created (Index: E123...)
    
    Note over OMS, Bank: Phase 2: Fulfillment
    Treasury->>OMS: Notify Ready (Send Preimage)
    OMS->>XRPL: Tx: EscrowFinish (Preimage, Fee: 12 drops)
    XRPL-->>OMS: Escrow Executed (Funds Released)
    
    Note over OMS, Bank: Phase 3: Reconciliation
    XRPL->>Bank: Balance Update (via Stream)
    Bank->>OMS: Webhook: Settlement Confirmed
""",
    "diagram-13.svg": """classDiagram
    class XRPLService {
        +Client client
        +Wallet wallet
        +connect()
        +disconnect()
        +submitTransaction(tx_blob)
        +subscribe(streams)
    }
    class TransactionBuilder {
        +buildPayment(amount, dest)
        +buildTrustSet(limit, currency)
        +buildAccountSet(domain)
        +buildEscrowCreate(amount, condition)
    }
    class WalletManager {
        +deriveWallet(seed)
        +sign(tx_json)
        +verifySignature(blob)
    }
    class LedgerListener {
        +onLedgerClosed(ledger_index)
        +onTransaction(tx)
        +filterByAccount(account)
    }

    XRPLService *-- TransactionBuilder : uses
    XRPLService *-- WalletManager : uses
    XRPLService *-- LedgerListener : manages
    
    style XRPLService fill:#1E88E5,color:#fff
    style TransactionBuilder fill:#fff,stroke:#1E88E5
    style WalletManager fill:#fff,stroke:#1E88E5
    style LedgerListener fill:#fff,stroke:#1E88E5
""",
    "diagram-14.svg": """graph TD
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef secondary fill:#fff,stroke:#1E88E5,stroke-width:1px,color:#000;
    classDef component fill:#E3F2FD,stroke:#1E88E5,stroke-width:1px,color:#000;

    App[App Root]:::primary --> AuthProvider[AuthProvider Context]:::secondary
    AuthProvider --> Router[React Router]:::secondary
    
    Router --> Dashboard[Dashboard Layout]:::primary
    
    Dashboard --> Header[Header / Nav]:::component
    Dashboard --> Sidebar[Sidebar Menu]:::component
    
    Dashboard --> FundView[Fund Management View]:::secondary
    FundView --> FundList[Fund List Table]:::component
    FundView --> FundDetail[Fund Detail Card]:::component
    FundDetail --> Chart[Performance Chart]:::component
    
    Dashboard --> InvestorView[Investor Management View]:::secondary
    InvestorView --> KYCQueue[KYC Verification Queue]:::component
    InvestorView --> InvestorTable[Investor Directory]:::component
    
    Dashboard --> AnalyticsView[Analytics View]:::secondary
    AnalyticsView --> RiskPanel[Risk Metrics Panel]:::component
    AnalyticsView --> AuditLog[Audit Log Table]:::component
""",
    "diagram-15.svg": """graph LR
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef process fill:#fff,stroke:#1E88E5,stroke-width:1px,color:#000;
    classDef output fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    Event[Ledger Event / User Action]:::primary --> Ingest[Event Ingestion Engine]:::process
    Ingest --> Queue[Message Queue (Redis)]:::process
    
    Queue --> Worker[Notification Worker]:::primary
    
    Worker --> Filter{User Preferences?}:::process
    
    Filter -- Email --> SendGrid[SendGrid API]:::output
    Filter -- Push --> FCM[Firebase Cloud Messaging]:::output
    Filter -- Webhook --> Hook[External Webhook]:::output
    
    SendGrid --> UserEmail[User Email]:::primary
    FCM --> UserDevice[Mobile App]:::primary
    Hook --> UserSystem[External System]:::primary
""",
    "diagram-16.svg": """graph TD
    classDef primary fill:#1E88E5,stroke:#000,stroke-width:2px,color:#fff;
    classDef calc fill:#fff,stroke:#1E88E5,stroke-width:1px,color:#000;
    classDef report fill:#2E7D32,stroke:#000,stroke-width:2px,color:#fff;

    MarketData[Market Data Feed]:::primary --> Volatility[Volatility Engine]:::calc
    MarketData --> Correlation[Correlation Matrix]:::calc
    
    Portfolio[Portfolio Holdings]:::primary --> VaR[Value at Risk (VaR) Model]:::calc
    Portfolio --> Stress[Stress Testing Engine]:::calc
    
    Volatility --> VaR
    Correlation --> VaR
    
    VaR --> RiskScore[Composite Risk Score]:::primary
    Stress --> Scenarios[Scenario Analysis]:::primary
    
    RiskScore --> Dashboard[Risk Dashboard]:::report
    Scenarios --> Report[PDF Risk Report]:::report
""",
    "diagram-17.svg": """sequenceDiagram
    autonumber
    participant User
    participant API as System API
    participant DB as Audit Database
    participant XRPL as XRPL Memo

    Note right of User: Action: Approve KYC
    User->>API: POST /approve-kyc (User ID)
    API->>DB: Insert Audit Log (Action, Timestamp, IP)
    DB-->>API: Log ID: 998877
    
    Note right of User: Immutable Anchoring
    API->>API: Calculate Hash (SHA-256 of Log)
    API->>XRPL: Tx: AccountSet (Memo: Hash)
    XRPL-->>API: Tx Hash: ABC123...
    
    Note right of User: Verification
    API->>DB: Update Log with Tx Hash
    API-->>User: Success (Proof: ABC123...)
"""
}

def generate_mermaid_url(mermaid_code):
    state = {
        "code": mermaid_code,
        "mermaid": THEME_CONFIG
    }
    json_str = json.dumps(state)
    base64_str = base64.urlsafe_b64encode(json_str.encode('utf-8')).decode('utf-8')
    return f"https://mermaid.ink/svg/{base64_str}"

def process_diagrams():
    os.makedirs("docs/diagrams", exist_ok=True)
    
    for filename, code in DIAGRAMS.items():
        print(f"Generating {filename}...")
        try:
            svg_url = generate_mermaid_url(code)
            response = requests.get(svg_url)
            
            if response.status_code == 200:
                filepath = f"docs/diagrams/{filename}"
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                print(f"Saved {filename}")
            else:
                print(f"Failed to download {filename}: {response.status_code}")
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    process_diagrams()
