# Set Up an IOU-IOU Bridge
URL: https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-iou-iou-bridge
Section: F2

## Overview


## Extracted Content
# Set Up an IOU-IOU Bridge

(Requires the XChainBridge amendment )

Setting up an IOU-IOU bridge enables you to move tokens between chains.

Note: The code samples on this page illustrate how to bridge a hypotethical "TST" token from Devnet to Sidechain-Devnet, using a supported client library to query and submit transactions.


## Prerequisites

- An XRP-XRP bridge must be set up between the locking and issuing chain.
- Ensure the witnesses' transaction submission accounts are funded on the locking and issuing chains.
- Set up an issuer on the issuing chain to mint and burn a wrapped version of the token you want to bridge. See: Issue a Fungible Token


## Steps


### 1. Connect to the locking chain (Devnet) and issuing chain (Sidechain-Devnet).

```
const xrpl = require('xrpl')

const WS_URL_lockingchain = 'wss://s.devnet.rippletest.net:51233/' // Locking chain
const WS_URL_issuingchain = 'wss://sidechain-net2.devnet.rippletest.net:51233/' // Issuing chain

// Define the XChainBridge, using the "TST" token.
const xchainbridge = {
  "LockingChainDoor": "rn895gh1MHnnAgL4hR9q464PJSFiYwQYcV",
  "LockingChainIssue": {
    "currency": "TST",
    "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
  },
  "IssuingChainDoor": "ra1MsW5s6Qg4NXUAJVKw8f21ZghSYG1DQw", // Use the account issuing the wrapped token
  "IssuingChainIssue": {
    "currency": "TST",
    "issuer": "ra1MsW5s6Qg4NXUAJVKw8f21ZghSYG1DQw"
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

Don't include a MinAccountCreateAmount value.

`MinAccountCreateAmount`

```
const wallet_lockingchain = xrpl.Wallet.fromSeed('s████████████████████████████') // Locking chain door account
  const xchaincreatebridge_lockingchain = await client_lockingchain.submitAndWait({
    "TransactionType": "XChainCreateBridge",
    "Account": wallet_lockingchain.address,
    "XChainBridge": xchainbridge,
  "SignatureReward": 200
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


### 5. Submit an XChainCreateBridge transaction from the door account on the issuing chain.

`XChainCreateBridge`

Don't include a MinAccountCreateAmount value.

`MinAccountCreateAmount`

```
const wallet_issuingchain = xrpl.Wallet.fromSeed('s████████████████████████████') // The account issuing the wrapped token
  const xchaincreatebridge_issuingchain = await client_issuingchain.submitAndWait({
    "TransactionType": "XChainCreateBridge",
    "Account": wallet_issuingchain.address,
    "XChainBridge": xchainbridge,
  "SignatureReward": 200
  }, {autofill: true, wallet: wallet_issuingchain})
```


### 6. Submit a SignerListSet transaction from the door account on the issuing chain.

`SignerListSet`

```
const signerlistset_issuingchain = await client_issuingchain.submitAndWait({
    "TransactionType": "SignerListSet",
    "Account": wallet_issuingchain.address,
    "Fee": "12",
    "SignerQuorum": 2,    
    // Use the witness servers' submitting accounts on the issuing chain.
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


### 7. Disable the master key on the issuing chain's door account with an AccountSet transaction.

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9776040e-cc43-4def-bb40-fdfa443ce666&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9776040e-cc43-4def-bb40-fdfa443ce666&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=026ae25d-49b5-49a8-b4a6-f02783ebc501&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=026ae25d-49b5-49a8-b4a6-f02783ebc501&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a3300138-5af1-447f-95bf-9e61e40a53fd&bo=1&sid=3a8dec509d9f11f0885b8bc443f76595&vid=3a8e65109d9f11f08a1fed50fa78e951&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Set%20Up%20an%20IOU-IOU%20Bridge&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&r=&lt=2721&evt=pageLoad&sv=2&cdb=AQAC&rn=121645)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ad4b066b-4ab0-4ace-a2ed-a037abb940a9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ad4b066b-4ab0-4ace-a2ed-a037abb940a9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0ca2afbf-05d5-4c69-96b6-6b4234e549cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0ca2afbf-05d5-4c69-96b6-6b4234e549cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=69117ed4-0fa6-45b5-b86d-69f756c11f81&pt=Set%20Up%20an%20IOU-IOU%20Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fset-up-iou-iou-bridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-iou-iou-bridge#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-iou-iou-bridge#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-iou-iou-bridge#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-iou-iou-bridge#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.44b14de054f433d8c1661c74aba891ad.1759196767598.1759196767598.1759196767598.1&__hssc=78174987.1.1759196767599&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-xrpl-sidechains/set-up-iou-iou-bridge.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.44b14de054f433d8c1661c74aba891ad.1759196767598.1759196767598.1759196767598.1&__hssc=78174987.1.1759196767599&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:46:17.878Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
