# Require Destination Tags
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/require-destination-tags
Section: E8

## Overview


## Extracted Content
# Require Destination Tags

The Require Destination Tag setting is designed for addresses that host balances for multiple people or purposes, to prevent people from sending money and forgetting to use a destination tag to identify whom to credit. When this setting is enabled on your address, the XRP Ledger rejects any payment to your address if it does not specify a destination tag.

This tutorial demonstrates how to enable the Require Destination Tag flag on your account.

NoteThe meanings of specific destination tags are entirely up to the logic built on top of the XRP Ledger. The ledger has no way of knowing whether any specific tag is valid in your system, so you must still be ready to receive transactions with the wrong destination tag. Typically, this involves providing a customer support experience that can track down payments made incorrectly and credit customers accordingly, and possibly also bouncing unwanted payments.


## Prerequisites

- You need a funded XRP Ledger account, with an address, secret key, and some XRP. For production, you can use the same address and secret consistently. For this tutorial, you can generate new test credentials as needed.
- You need a connection to the XRP Ledger network. As shown in this tutorial, you can use public servers for testing.
- You should be familiar with the Getting Started instructions for your preferred client library. This page provides examples for the following:JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.Python with the xrpl-py library. See Get Started using Python for setup steps.You can also read along and use the interactive steps in your browser without any setup.
- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- Python with the xrpl-py library. See Get Started using Python for setup steps.
- You can also read along and use the interactive steps in your browser without any setup.

- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- Python with the xrpl-py library. See Get Started using Python for setup steps.
- You can also read along and use the interactive steps in your browser without any setup.

`xrpl-py`


## Example Code

Complete sample code for all the steps of these tutorials is available under the MIT license.

- See Code Samples: Require Destination Tags in the source repository for this website.


## Steps


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. For development purposes, you can get these using the following interface:

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration.


### 2. Connect to the Network

You must be connected to the network to submit transactions to it. The following code shows how to connect to a public XRP Ledger Testnet server a supported client library:

- JavaScript
- Python

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

To enable the RequireDest flag, set the asfRequireDest value (1) in the SetFlag field of an AccountSet transaction. To send the transaction, you first prepare it to fill out all the necessary fields, then sign it with your account's secret key, and finally submit it to the network.

`RequireDest`

`asfRequireDest`

`1`

`SetFlag`

For example:

- JavaScript
- Python

```
// Send AccountSet transaction -----------------------------------------------
  const prepared = await client.autofill({
    "TransactionType": "AccountSet",
    "Account": wallet.address,
    "SetFlag": xrpl.AccountSetAsfFlags.asfRequireDest
  })
  console.log("Prepared transaction:", prepared)

  const signed = wallet.sign(prepared)
  console.log("Transaction hash:", signed.hash)

  const submit_result = await client.submitAndWait(signed.tx_blob)
  console.log("Submit result:", submit_result)
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

After the transaction is validated, you can check your account's settings to confirm that the Require Destination Tag flag is enabled.

- JavaScript
- Python

```
// Confirm Account Settings --------------------------------------------------
  let account_info = await client.request({
    "command": "account_info",
    "account": address,
    "ledger_index": "validated"
  })
  const flags = xrpl.parseAccountFlags(account_info.result.account_data.Flags)
  console.log(JSON.stringify(flags, null, 2))
  if (flags.lsfRequireDestTag) {
    console.log("Require Destination Tag is enabled.")
  } else {
    console.log("Require Destination Tag is DISABLED.")
  }
```

Confirm Settings

For further confirmation, you can send test transactions (from a different address) to confirm that the setting is working as you expect it to. If you a payment with a destination tag, it should succeed, and if you send one without a destination tag, it should fail with the error code tecDST_TAG_NEEDED.

`tecDST_TAG_NEEDED`

Send XRP (with Destination Tag) Send XRP (without Destination Tag)


## See Also

- Concepts:AccountsSource and Destination TagsTransaction CostPayment Types
- Accounts
- Source and Destination Tags
- Transaction Cost
- Payment Types
- References:account_info methodAccountSet transactionAccountRoot Flags
- account_info method
- AccountSet transaction
- AccountRoot Flags

- Accounts
- Source and Destination Tags
- Transaction Cost
- Payment Types

- account_info method
- AccountSet transaction
- AccountRoot Flags

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8d544a53-2f69-4ad7-9c61-a7ec42e105ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8d544a53-2f69-4ad7-9c61-a7ec42e105ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a13b5d6a-40be-45f5-9c00-225f4d9379e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a13b5d6a-40be-45f5-9c00-225f4d9379e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=e562ce39-94e6-4ed0-9ca0-59bd5f32c6f2&bo=1&sid=c7fed6209d9d11f0a43bf5688cb983d0&vid=c7ff8ba09d9d11f0915885d3c0a259bc&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Require%20Destination%20Tags&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&r=&lt=3426&evt=pageLoad&sv=2&cdb=AQAS&rn=823265)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a813c513-741a-4e46-a3d7-b869003efdaa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a813c513-741a-4e46-a3d7-b869003efdaa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=24f15463-d37d-4388-bbfb-042983d9a35b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=24f15463-d37d-4388-bbfb-042983d9a35b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e36a57d0-a21d-4e9a-ab5d-6b6c36bfe0d4&pt=Require%20Destination%20Tags&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Frequire-destination-tags&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/require-destination-tags#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/require-destination-tags#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/require-destination-tags#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/require-destination-tags#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/require-destination-tags.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [xrpl-py library](https://xrpl-py.readthedocs.io/)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Require Destination Tags](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/require-destination-tags/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:35:57.187Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
