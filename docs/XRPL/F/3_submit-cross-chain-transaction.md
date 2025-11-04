# Submit Cross-chain Transactions
URL: https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/submit-cross-chain-transaction
Section: F3

## Overview


## Extracted Content
# Submit Cross-chain Transactions

(Requires the XChainBridge amendment )

This tutorial explains how to create a test account on a locking chain (Devent), and transfer XRP to an issuing chain (Sidechain-Devnet), using a supported client library to query and submit transactions. Witness servers are already set up to monitor the XRP-XRP bridge and submit attestations.


## Prerequisites

- The locking and issuing chains are both up and running.
- The witness servers are up and running.
- Set up the XRP-XRP bridge.


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


### 2. Fund a wallet on Devnet and generate a wallet address for Sidechain-Devnet.

```
// Create a wallet and fund it using the XRP faucet on Devnet.
  const wallet_lockingchain = (await client_lockingchain.fundWallet()).wallet
  console.log(wallet_lockingchain.address)

  // Generate a wallet to create and fund on the issuing chain.
  const wallet_issuingchain = await xrpl.Wallet.generate()
  console.log(wallet_issuingchain.address)
```


### 3. Submit an XChainAccountCreateCommit transaction from the Devnet wallet.

`XChainAccountCreateCommit`

```
const createwallet_issuingchain = await client_lockingchain.submitAndWait({
    "TransactionType": "XChainAccountCreateCommit",
    "Account": wallet_lockingchain.address,
    "Destination": wallet_issuingchain.address,
    "XChainBridge": xchainbridge,
    "SignatureReward": "100",
    "Amount": "5000000000"
  }, {autofill: true, wallet: wallet_lockingchain})
```


### 4. Create a claim ID with XChainCreateClaimID, using your account on the issuing chain.

`XChainCreateClaimID`

```
const createclaim = await client_issuingchain.submitAndWait({
    "TransactionType": "XChainCreateClaimID",
    "Account": wallet_issuingchain.address,
    "OtherChainSource": wallet_lockingchain.address,
    "SignatureReward": "100",
    "XChainBridge": xchainbridge
  }, {autofill: true, wallet: wallet_issuingchain})
```


### 5. Retrieve the claim ID from the transaction metadata.

```
let metadata = createclaim.result.meta.AffectedNodes

  let claimnode = null;

  for (const item of metadata) {
    if (item.CreatedNode && item.CreatedNode.LedgerEntryType === 'XChainOwnedClaimID') {
      claimnode = item.CreatedNode
      break
    }
  }

  const claimID = claimnode.NewFields.XChainClaimID
```


### 6. Submit an XChainCommit transaction with the claim ID, using your account on the locking chain.

`XChainCommit`

If you don't specify an "OtherChainDestination", the account that submitted the XChainCreateClaimID transaction needs to submit an XChainClaim transaction to claim the funds.

`XChainCreateClaimID`

`XChainClaim`

```
const xchaincommit = await client_lockingchain.submitAndWait({
    "TransactionType": "XChainCommit",
    "Account": wallet_lockingchain.address,
    "OtherChainDestination": wallet_issuingchain.address,
    "Amount": "10000",
    "XChainBridge": xchainbridge,
    "XChainClaimID": claimID
  }, {autofill: true, wallet: wallet_lockingchain})
```

NoteWhen enough XChainAddClaimAttestation signatures are submitted by the witness servers to reach quorum, the funds are released on the issuing chain to the OtherChainDestination.

`XChainAddClaimAttestation`

`OtherChainDestination`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9b8325c8-3e63-4690-9624-335be2779eb1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9b8325c8-3e63-4690-9624-335be2779eb1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a639561b-f350-4996-a9ed-a4d1c4e4cd79&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a639561b-f350-4996-a9ed-a4d1c4e4cd79&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4dbabec7-96e3-4b76-9231-9349f0d5d8d7&bo=1&sid=46d2d1409d9f11f097ff0bedd140b048&vid=46d398d09d9f11f085305f1ca26e1060&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Submit%20Cross-chain%20Transactions&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&r=&lt=2397&evt=pageLoad&sv=2&cdb=AQAS&rn=472140)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=423f1ac4-6abe-4d97-841c-f7e27a811662&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=423f1ac4-6abe-4d97-841c-f7e27a811662&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4d559300-9668-4348-8894-78e845567c7b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4d559300-9668-4348-8894-78e845567c7b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d4d7b45d-d964-4125-b7c9-c897f7e31fc0&pt=Submit%20Cross-chain%20Transactions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-xrpl-sidechains%2Fsubmit-cross-chain-transaction&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/submit-cross-chain-transaction#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/submit-cross-chain-transaction#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/submit-cross-chain-transaction#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-xrpl-sidechains/submit-cross-chain-transaction#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-xrpl-sidechains/submit-cross-chain-transaction.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:46:39.369Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
