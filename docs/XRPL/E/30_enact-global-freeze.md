# Enact Global Freeze
URL: https://xrpl.org/docs/tutorials/how-tos/use-tokens/enact-global-freeze
Section: E30

## Overview


## Extracted Content
# Enact Global Freeze

If you issue tokens in the XRP Ledger, can enact a Global Freeze to prevent users from sending your tokens to each other and trading your token in the decentralized exchange. This tutorial shows how to enact and end a Global Freeze. You might want to do this, for example, if you see signs of suspicious activity related to your issuing address in the ledger, or to off-ledger systems you use to manage your token. (For example, if your token is a stablecoin and you process withdrawals and deposits from the ledger, you may want to freeze your token while you investigate if you suspect your systems have been hacked.) You can later disable the Global Freeze setting unless you have also enabled the No Freeze setting.

TipAs a reminder, freezes only apply to issued tokens, not XRP, and do not prevent users from sending the tokens directly back to the issuer.


## Prerequisites

- You need a connection to the XRP Ledger network. As shown in this tutorial, you can use public servers for testing.
- You should be familiar with the Getting Started instructions for your preferred client library. This page provides examples for the following:JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- You don't need to have issued a token in the XRP Ledger to enact a Global Freeze, but the main reason you would do so is if you have already issued such a token.

- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.


## Example Code

Complete sample code for all of the steps of this tutorial is available under the MIT license.

- See Code Samples: Freeze in the source repository for this website.


## Steps


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. If you use the best practice of having separate "cold" and "hot" addresses, you need the keys to the cold address, which is the issuer of the token. Only the issuer's Global Freeze setting has any effect on a token.

TipUnlike the No Freeze setting, you can enable and disable a Global Freeze using a regular key pair or multi-signing.

For this tutorial, you can get credentials from the following interface:

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration.


### 2. Connect to the Network

You must be connected to the network to submit transactions to it. The following code shows how to connect to a public XRP Ledger Testnet server a supported client library:

- JavaScript

```
// You can also use a <script> tag in browsers or require('xrpl') in Node.js
import xrpl from 'xrpl'

// Define the network client
const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
await client.connect()

// ... custom code goes here

// Disconnect when done (If you omit this, Node.js won't end the process)
client.disconnect()
```

For this tutorial, click the following button to connect:

Connect to Testnet


### 3. Send AccountSet Transaction to Start the Freeze

To enable the Global Freeze setting, send an AccountSet transaction with a SetFlag field containing the asfGlobalFreeze value (7). To send the transaction, you first prepare it to fill out all the necessary fields, then sign it with your account's secret key, and finally submit it to the network.

`SetFlag`

`asfGlobalFreeze`

`7`

CautionEnacting a global freeze affects all tokens issued by the address. Furthermore, if you use the No Freeze setting, you cannot undo this action.

For example:

- JavaScript
- WebSocket

```
// Prepare an AccountSet transaction to enable global freeze -----------------
  const accountSetTx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // Set a flag to turn on a global freeze on this account
    SetFlag: xrpl.AccountSetAsfFlags.asfGlobalFreeze
  }

  // Best practice for JS users - validate checks if a transaction is well-formed
  xrpl.validate(accountSetTx)

  // Sign and submit the AccountSet transaction to enable a global freeze ------
  console.log('Signing and submitting the transaction:', accountSetTx)
  await client.submitAndWait(accountSetTx, { wallet })
  console.log(`Finished submitting! ${wallet.address} should be frozen now.`)
```

Send AccountSet


### 4. Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. If the XRP Ledger is busy or poor network connectivity delays a transaction from being relayed throughout the network, a transaction may take longer to be confirmed. (For information on how to set an expiration for transactions, see Reliable Transaction Submission.)

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 5. Confirm Account Settings

After the transaction is validated, you can check your issuing account's settings to confirm that the Global Freeze flag is enabled. You can do this by calling the account_info method and checking the value of the account's Flags field to see if the lsfGlobalFreeze bit (0x00400000) is on.

`Flags`

`lsfGlobalFreeze`

`0x00400000`

- JavaScript
- WebSocket

```
// Request account info for my_address to check account settings ------------
  const response = await client.request(
    {command: 'account_info', account: my_address })
  const settings = response.result
  const lsfGlobalFreeze = xrpl.LedgerEntry.AccountRootFlags.lsfGlobalFreeze

  console.log('Got settings for address', my_address);
  console.log('Global Freeze enabled?',
              ((settings.account_data.Flags & lsfGlobalFreeze) 
              === lsfGlobalFreeze))
```

Confirm Settings


### Intermission: While Frozen

At this point all token issued by your address are frozen. During this time, you may want to investigate the potential security breach or take a snapshot of the balances of your token, depending on your reasons for enacting the global freeze.

Keep in mind that while a token is frozen, it is still possible for the frozen token to be sent directly to or directly from the issuer, so you may still want to disable any systems you have that are configured to send such transactions, and you may want to track incoming transactions without processing them so that you can eventually process the legitimate ones.

If you use a hot wallet or operational address, it has no special status compared to other users, so it also cannot send and receive the frozen tokens except when dealing directly with the issuer.

If you use the No Freeze setting then the Global Freeze continues forever. If you want to resume issuing tokens, you must create a new account and start over from there.

Otherwise, you can continue to the next step whenever you're ready.


### 6. Send AccountSet Transaction to End the Freeze

To end the Global Freeze, send an AccountSet transaction with a ClearFlag field containing the asfGlobalFreeze value (7). As always, you first prepare the transaction, sign it, and finally submit it to the network.

`ClearFlag`

`asfGlobalFreeze`

`7`

For example:

- JavaScript
- WebSocket

```
// Now we disable the global freeze ------------------------------------------
  const accountSetTx2 = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // ClearFlag let's us turn off a global freeze on this account
    ClearFlag: xrpl.AccountSetAsfFlags.asfGlobalFreeze
  }

  // Best practice for JS users - validate checks if a transaction is well-formed
  xrpl.validate(accountSetTx2)

  // Sign and submit the AccountSet transaction to end a global freeze ---------
  console.log('Signing and submitting the transaction:', accountSetTx2)
  const result = await client.submitAndWait(accountSetTx2, { wallet: wallet })
  console.log("Finished submitting!")
```

Send AccountSet (end the freeze)


### 7. Wait for Validation

As before, wait for the previous transaction to be validated by consensus before continuing.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 8. Confirm Account Settings

After the transaction is validated, you can confirm the status of the Global Freeze flag in the same way as before: by calling the account_info method and checking the value of the account's Flags field to see if the lsfGlobalFreeze bit (0x00400000) is off.

`Flags`

`lsfGlobalFreeze`

`0x00400000`

Confirm Settings (After Freeze)


## See Also

- Concepts:Freezing Issued CurrenciesTrust Lines
- Freezing Issued Currencies
- Trust Lines
- Tutorials:Enable No FreezeFreeze a Trust LineChange or Remove a Regular Key Pair
- Enable No Freeze
- Freeze a Trust Line
- Change or Remove a Regular Key Pair
- References:account_lines methodaccount_info methodAccountSet transactionTrustSet transactionAccountRoot FlagsRippleState (trust line) Flags
- account_lines method
- account_info method
- AccountSet transaction
- TrustSet transaction
- AccountRoot Flags
- RippleState (trust line) Flags

- Freezing Issued Currencies
- Trust Lines

- Enable No Freeze
- Freeze a Trust Line
- Change or Remove a Regular Key Pair

- account_lines method
- account_info method
- AccountSet transaction
- TrustSet transaction
- AccountRoot Flags
- RippleState (trust line) Flags

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c107f554-9df9-4dd4-b80b-71d9f6e32a80&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c107f554-9df9-4dd4-b80b-71d9f6e32a80&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=36d05dd8-67bc-4fed-8cdd-0cbf702adb26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=36d05dd8-67bc-4fed-8cdd-0cbf702adb26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=cb735daa-95cd-45bb-be9e-c5b556fda104&bo=1&sid=f7a3f6809d9e11f0a70f4f6262399ed2&vid=f7a494709d9e11f0aac2f92327431fc1&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Enact%20Global%20Freeze&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&r=&lt=4771&evt=pageLoad&sv=2&cdb=AQAS&rn=225844)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a7eb06fa-d173-4672-9a67-5f7dfc4079f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a7eb06fa-d173-4672-9a67-5f7dfc4079f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b7b61bde-e2ac-42c8-8027-1564830a2a77&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b7b61bde-e2ac-42c8-8027-1564830a2a77&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=47d62f64-7bb2-447c-8e11-844d88e2e3fc&pt=Enact%20Global%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenact-global-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enact-global-freeze#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enact-global-freeze#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enact-global-freeze#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enact-global-freeze#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-tokens/enact-global-freeze.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Freeze](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/freeze/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:44:30.893Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
