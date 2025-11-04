# Enable No Freeze
URL: https://xrpl.org/docs/tutorials/how-tos/use-tokens/enable-no-freeze
Section: E29

## Overview


## Extracted Content
# Enable No Freeze

If you issue tokens in the XRP Ledger, can enable the No Freeze setting to permanently limit your own ability to use the token freezing features of the XRP Ledger. (As a reminder, this only applies to issued tokens, not XRP.) This tutorial shows how to enable the No Freeze setting on your issuing account.


## Prerequisites

- You need a connection to the XRP Ledger network. As shown in this tutorial, you can use public servers for testing.
- You should be familiar with the Getting Started instructions for your preferred client library. This page provides examples for the following:JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- You don't need to have issued a token in the XRP Ledger to enable No Freeze, but the main reason you would do so is if you intend to or have already issued such a token.

- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.


## Example Code

Complete sample code for all of the steps of this tutorial is available under the MIT license.

- See Code Samples: Freeze in the source repository for this website.


## Steps


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. If you use the best practice of having separate "cold" and "hot" addresses, you need the master keys to the cold address, which is the issuer of the token. Only the issuer's No Freeze setting has any effect on a token.

CautionYou cannot use a regular key pair or multi-signing to enable the No Freeze setting.

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


### 3. Send AccountSet Transaction

To enable the No Freeze setting, send an AccountSet transaction with a SetFlag field containing the asfNoFreeze value (6). To send the transaction, you first prepare it to fill out all the necessary fields, then sign it with your account's secret key, and finally submit it to the network.

`SetFlag`

`asfNoFreeze`

`6`

For example:

- JavaScript
- WebSocket

```
// Submit an AccountSet transaction to enable No Freeze ----------------------
  const accountSetTx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // Set the NoFreeze flag for this account
    SetFlag: xrpl.AccountSetAsfFlags.asfNoFreeze
  }

  // Best practice for JS users - validate checks if a transaction is well-formed
  xrpl.validate(accountSetTx)

  console.log('Sign and submit the transaction:', accountSetTx)
  await client.submitAndWait(accountSetTx, { wallet: wallet })
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

After the transaction is validated, you can check your account's settings to confirm that the No Freeze flag is enabled. You can do this by calling the account_info method and checking the value of the account's Flags field to see if the lsfNoFreeze bit (0x00200000) is enabled.

`Flags`

`lsfNoFreeze`

`0x00200000`

- JavaScript
- WebSocket

```
// Request account info for my_address to check account settings ------------
  const response = await client.request(
    {command: 'account_info', account: my_address })
  const settings = response.result
  const lsfNoFreeze = xrpl.LedgerEntry.AccountRootFlags.lsfNoFreeze

  console.log('Got settings for address', my_address);
  console.log('No Freeze enabled?',
    (settings.account_data.Flags & lsfNoFreeze) 
    === lsfNoFreeze)
```

Confirm Settings


## See Also

- Concepts:Freezing Issued CurrenciesTrust Lines
- Freezing Issued Currencies
- Trust Lines
- Tutorials:Enact Global FreezeFreeze a Trust Line
- Enact Global Freeze
- Freeze a Trust Line
- References:account_lines methodaccount_info methodAccountSet transactionTrustSet transactionAccountRoot FlagsRippleState (trust line) Flags
- account_lines method
- account_info method
- AccountSet transaction
- TrustSet transaction
- AccountRoot Flags
- RippleState (trust line) Flags

- Freezing Issued Currencies
- Trust Lines

- Enact Global Freeze
- Freeze a Trust Line

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8571afc3-911a-49af-87b7-07b3a47f4fd4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8571afc3-911a-49af-87b7-07b3a47f4fd4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=48baf6f9-60b1-4285-a35f-398e68d19423&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=48baf6f9-60b1-4285-a35f-398e68d19423&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=9649e374-40fd-4a04-b626-a01b36178bd3&bo=1&sid=e9ba02909d9e11f0ace615abd936c569&vid=e9ba4f909d9e11f0a11c09e4813269fa&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Enable%20No%20Freeze&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&r=&lt=2193&evt=pageLoad&sv=2&cdb=AQAS&rn=406191)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e43f8f4-eb80-48d1-9c3a-713e7542b3e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e43f8f4-eb80-48d1-9c3a-713e7542b3e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=45af0f1c-7ef5-441b-b5a1-83fb6d86b571&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=45af0f1c-7ef5-441b-b5a1-83fb6d86b571&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d74e7f50-b83f-4fcf-9774-0baec174beeb&pt=Enable%20No%20Freeze&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fenable-no-freeze&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enable-no-freeze#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enable-no-freeze#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enable-no-freeze#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-tokens/enable-no-freeze#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.aa2161bfd63deb5447e537c537b1013a.1759196632022.1759196632022.1759196632022.1&__hssc=78174987.1.1759196632022&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-tokens/enable-no-freeze.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Freeze](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/freeze/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.aa2161bfd63deb5447e537c537b1013a.1759196632022.1759196632022.1759196632022.1&__hssc=78174987.1.1759196632022&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:44:03.275Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
