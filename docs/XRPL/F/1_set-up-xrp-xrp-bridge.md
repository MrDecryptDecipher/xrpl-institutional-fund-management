# Set Up an XRP-XRP Bridge
URL: https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-xrp-xrp-bridge
Section: F1

## Overview


## Extracted Content
# Set Up an XRP-XRP Bridge

(Requires the XChainBridge amendment )

Setting up an XRP-XRP bridge enables you to move XRP between chains. The set up requires using the genesis account on the issuing chain as a door account to submit attestations and create transaction submission accounts for witnesses.

Note: The code samples on this page illustrate how a bridge was set up between Devnet and Sidechain-Devnet, using a supported client library to query and submit transactions. This bridge is already created, so the process can't be reproduced on these networks.


## Prerequisites

- The issuing chain is set up and active. Validators must be running and successfully closing ledgers.
- The witnesses' accounts on the locking chain are funded, so they can submit transactions.
- A door account for the bridge exists on the locking chain.


## Steps


### 1. Connect to the locking chain (Devnet) and issuing chain (Sidechain-Devnet).

```
const xrpl = require('xrpl')

const WS_URL_lockingchain = 'wss://s.devnet.rippletest.net:51233/' // Locking chain
const WS_URL_issuingchain = 'wss://sidechain-net2.devnet.rippletest.net:51233/' // Issuing chain

// Define the XChainBridge
const xchainbridge = {
  "LockingChainDoor": "rnQAXXWoFNN6PEqwqsdTngCtFPCrmfuqFJ", // Locking chain door account
  "LockingChainIssue": {
    "currency": "XRP"
  },
  "IssuingChainDoor": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // Use the genesis address hardcoded in rippled
  "IssuingChainIssue": {
    "currency": "XRP"
  }
}

async function main() {
  // Define the network clients.
  const client_lockingchain = new xrpl.Client(WS_URL_lockingchain)
  await client_lockingchain.connect()

  const client_issuingchain = new xrpl.Client(WS_URL_issuingchain)
  await client_issuingchain.connect()

  // ... custom code goes here

  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client_lockingchain.disconnect()
  await client_issuingchain.disconnect()
}

main()
```


### 2. Submit an XChainCreateBridge transaction from the door account on the locking chain.

`XChainCreateBridge`

```
const wallet_lockingchain = xrpl.Wallet.fromSeed('s████████████████████████████') // Locking chain door account
  const xchaincreatebridge_lockingchain = await client_lockingchain.submitAndWait({
    "TransactionType": "XChainCreateBridge",
    "Account": wallet_lockingchain.address,
    "XChainBridge": xchainbridge,
  "SignatureReward": 200,
  "MinAccountCreateAmount": 1000000 // This value should at least be equal to the account reserve on the issuing chain.
  }, {autofill: true, wallet: wallet_lockingchain})
```


### 3. Submit a SignerListSet transaction from the door account on the locking chain.

`SignerListSet`

```
const signerlistset_lockingchain = await client_lockingchain.submitAndWait({
    "TransactionType": "SignerListSet",
    "Account": wallet_lockingchain.address,
    "Fee": "12",
    "SignerQuorum": 2,    
    // Use the witness servers' submitting accounts on the locking chain.
    "SignerEntries": [
        {
            "SignerEntry": {
                "Account": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
                "SignerWeight": 1
            }
        },
        {
            "SignerEntry": {
                "Account": "rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v",
                "SignerWeight": 1
            }
        }
    ]
  }, {autofill: true, wallet: wallet_lockingchain})
```


### 4. Disable the master key on the locking chain's door account with an AccountSet transaction.

`AccountSet`

```
const disablekey_lockingchain = await client_lockingchain.submitAndWait({
    "TransactionType": "AccountSet",
    "Account": wallet_lockingchain.address,
    "SetFlag": 4
  }, {autofill: true, wallet: wallet_lockingchain})
```


### 5. Submit an XChainCreateBridge transaction from the genesis account on the issuing chain.

`XChainCreateBridge`

```
const wallet_issuingchain = xrpl.Wallet.fromSeed('snoPBrXtMeMyMHUVTgbuqAfg1SUTb') // Use the genesis secret hardcoded in rippled.
  const xchaincreatebridge_issuingchain = await client_issuingchain.submitAndWait({
    "TransactionType": "XChainCreateBridge",
    "Account": wallet_issuingchain.address,
    "XChainBridge": xchainbridge,
  "SignatureReward": 200,
  "MinAccountCreateAmount": 1000000
  }, {autofill: true, wallet: wallet_issuingchain})
```


### 6. Submit XChainAccountCreateCommit transactions from the witnesses' locking chain accounts to create corresponding accounts on the issuing chain.

`XChainAccountCreateCommit`

```
const wallet_witness_1 = xrpl.Wallet.fromSeed('s████████████████████████████') // Witness server 1 from `SignerListSet`: rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW
  const wallet_witness_2 = xrpl.Wallet.fromSeed('s████████████████████████████') // Witness server 2 from `SignerListSet`: rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v

  const xchainaccountcreatecommit_witness_1 = await client_lockingchain.submitAndWait({
    "TransactionType": "XChainAccountCreateCommit",
    "Account": wallet_witness_1.address,
    "Destination": "rD323VyRjgzzhY4bFpo44rmyh2neB5d8Mo", // The account to create and fund for witness 1 on the issuing chain.
    "TransactionType": "XChainAccountCreateCommit",
    "Amount": "20000000",
    "SignatureReward": "100",
    "XChainBridge": xchainbridge
  }, {autofill: true, wallet: wallet_witness_1})

    const xchainaccountcreatecommit_witness_2 = await client_lockingchain.submitAndWait({
    "TransactionType": "XChainAccountCreateCommit",
    "Account": wallet_witness_2.address,
    "Destination": "rJMfWNVbyjcCtds8kpoEjEbYQ41J5B6MUd", // The account to create and fund for witness 2 on the issuing chain.
    "TransactionType": "XChainAccountCreateCommit",
    "Amount": "20000000",
    "SignatureReward": "100",
    "XChainBridge": xchainbridged
  }, {autofill: true, wallet: wallet_witness_1})
```


### 7. Submit attestations for each XChainAccountCreateCommit transaction.

`XChainAccountCreateCommit`

Use the XChainAddAccountCreateAttestation transaction to submit each attestation on the issuing chain. Sign these transactions with the genesis account on the issuing chain.

`XChainAddAccountCreateAttestation`

```
// Witness 1 attestation
  const xchainaddaccountcreateattestation_witness_1 = await client_issuingchain.submitAndWait({
    "TransactionType": "XChainAddAccountCreateAttestation",
    "Account": wallet_issuingchain.address,
    "OtherChainSource": wallet_witness_1.address,
    "Destination": "rD323VyRjgzzhY4bFpo44rmyh2neB5d8Mo",
    "Amount": "2000000000",
    "PublicKey": wallet_witness_1.publicKey,
    "Signature": xchainaccountcreatecommit_witness_1.result.TxnSignature,
    "WasLockingChainSend": 1,
    "AttestationRewardAccount": "rD323VyRjgzzhY4bFpo44rmyh2neB5d8Mo",
    "AttestationSignerAccount": wallet_witness_1.address,
    "XChainAccountCreateCount": "1",
    "SignatureReward": "204",
    "XChainBridge": xchainbridge,
    "Fee": "20"
  }, {autofill: true, wallet: wallet_issuingchain})

  // Witness 2 attestation
    const xchainaddaccountcreateattestation_witness_2 = await client_issuingchain.submitAndWait({
    "TransactionType": "XChainAddAccountCreateAttestation",
    "Account": wallet_issuingchain.address,
    "OtherChainSource": wallet_witness_2.address,
    "Destination": "rJMfWNVbyjcCtds8kpoEjEbYQ41J5B6MUd",
    "Amount": "2000000000",
    "PublicKey": wallet_witness_2.publicKey,
    "Signature": xchainaccountcreatecommit_witness_2.result.TxnSignature,
    "WasLockingChainSend": 1,
    "AttestationRewardAccount": "rJMfWNVbyjcCtds8kpoEjEbYQ41J5B6MUd",
    "AttestationSignerAccount": wallet_witness_2.address,
    "XChainAccountCreateCount": "1",
    "SignatureReward": "204",
    "XChainBridge": xchainbridge,
    "Fee": "20"
  }, {autofill: true, wallet: wallet_issuingchain})
```


### 8. Submit a SignerListSet transaction from the genesis account on the issuing chain.

`SignerListSet`

```
const signerlistset_issuingchain = await client_issuingchain.submitAndWait({
    "TransactionType": "SignerListSet",
    "Account": wallet_issuingchain.address,
    "Fee": "12",
    "SignerQuorum": 2,    
    // Use the witness servers' submitting accounts on the issuing chain created in step 7
    "SignerEntries": [
        {
            "SignerEntry": {
                "Account": "rD323VyRjgzzhY4bFpo44rmyh2neB5d8Mo",
                "SignerWeight": 1
            }
        },
        {
            "SignerEntry": {
                "Account": "rJMfWNVbyjcCtds8kpoEjEbYQ41J5B6MUd",
                "SignerWeight": 1
            }
        }
    ]
  }, {autofill: true, wallet: wallet_issuingchain})
```


### 9. Disable the master key on the issuing chain's genesis account with an AccountSet transaction.

`AccountSet`

```
const disablekey_issuingchain = await client_issuingchain.submitAndWait({
    "TransactionType": "AccountSet",
    "Account": wallet_issuingchain.address,
    "SetFlag": 4
  }, {autofill: true, wallet: wallet_issuingchain})
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4aee8c80-7d82-4d54-97b9-c059d501c2f6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4aee8c80-7d82-4d54-97b9-c059d501c2f6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9e53325a-ad47-4d26-9d41-cfabf029d333&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9e53325a-ad47-4d26-9d41-cfabf029d333&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=01a96788-7540-4711-8c0f-e942698582ed&bo=1&sid=2b9382509d9f11f094a8dfb0c518e533&vid=2b9419a09d9f11f09a24a530e8efbf71&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Set%20Up%20an%20XRP-XRP%20Bridge&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&r=&lt=3027&evt=pageLoad&sv=2&cdb=AQAS&rn=587365)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44c9153f-47cf-48f9-9579-c0ab42f8781e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44c9153f-47cf-48f9-9579-c0ab42f8781e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ca940c4f-7f8e-4630-b115-eeba88f5fd05&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ca940c4f-7f8e-4630-b115-eeba88f5fd05&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=73232d73-61af-419c-a1d6-089ff1568e80&pt=Set%20Up%20an%20XRP-XRP%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-xrp-xrp-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-xrp-xrp-bridge#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-xrp-xrp-bridge#)
- [DocumentationDive into XRP Ledger technology and start integrating.](https://xrpl.org/docs)
- [Concepts](https://xrpl.org/docs/concepts)
- [Tutorials](https://xrpl.org/docs/tutorials)
- [References](https://xrpl.org/docs/references)
- [Infrastructure](https://xrpl.org/docs/infrastructure)
- [Payments](https://xrpl.org/docs/use-cases/payments)
- [Tokenization](https://xrpl.org/docs/use-cases/tokenization)
- [Decentralized Finance](https://xrpl.org/docs/use-cases/defi)
- [JavaScript](https://xrpl.org/docs/tutorials/javascript)
- [Python](https://xrpl.org/docs/tutorials/python)
- [Java](https://xrpl.org/docs/tutorials/java)
- [PHP](https://xrpl.org/docs/tutorials/php)
- [Go](https://xrpl.org/docs/tutorials/go)
- [HTTP / Websocket APIs](https://xrpl.org/docs/tutorials/http-websocket-apis)
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-xrp-xrp-bridge#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-xrp-xrp-bridge#)
- [Contribute to the XRPL CommunityJoin the conversation](https://xrpl.org/community)
- [Events](https://xrpl.org/community/events)
- [Ambassadors](https://xrpl.org/community/ambassadors)
- [Developer Funding](https://xrpl.org/community/developer-funding)
- [XRPL Jobs](https://jobs.xrpl.org/)
- [Dev Blog](https://xrpl.org/blog)
- [Report a Scam](https://xrpl.org/community/report-a-scam)
- [Documentation](https://xrpl.org/docs)
- [Introduction](https://xrpl.org/docs/introduction)
- [Use Cases](https://xrpl.org/docs/use-cases)
- [Concepts](https://xrpl.org/docs/concepts)
- [Tutorials](https://xrpl.org/docs/tutorials)
- [Public Servers](https://xrpl.org/docs/tutorials/public-servers)
- [JavaScript](https://xrpl.org/docs/tutorials/javascript)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.8fe8652477601d68dcb7f4b113dbef63.1759196743284.1759196743284.1759196743284.1&__hssc=78174987.1.1759196743285&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-xrp-xrp-bridge.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.8fe8652477601d68dcb7f4b113dbef63.1759196743284.1759196743284.1759196743284.1&__hssc=78174987.1.1759196743285&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:45:54.347Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
