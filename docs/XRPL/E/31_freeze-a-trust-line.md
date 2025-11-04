# Freeze a Trust Line
URL: https://xrpl.org/docs/tutorials/how-tos/use-tokens/freeze-a-trust-line
Section: E31

## Overview


## Extracted Content
# Freeze a Trust Line

This tutorial shows the steps to freeze an individual trust line. The issuer of a token in the XRP Ledger may freeze the trust line to a particular counterparty if that account is engaged in suspicious activity.

TipAs a reminder, freezes only apply to issued tokens, not XRP.


## Prerequisites

- You need a connection to the XRP Ledger network. As shown in this tutorial, you can use public servers for testing.
- You should be familiar with the Getting Started instructions for your preferred client library. This page provides examples for the following:JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- This tutorial assumes you have already issued a token in the XRP Ledger.
- You cannot have enabled the No Freeze setting, which gives up your ability to freeze individual trust lines.

- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.


## Example Code

Complete sample code for all of the steps of this tutorial is available under the MIT license.

- See Code Samples: Freeze in the source repository for this website.


## Steps


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. If you use the best practice of having separate "cold" and "hot" addresses, you need the keys to the cold address, which is the issuer of the token.

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.


### 2. Connect to the Network

You must be connected to the network to submit transactions to it. The following code shows how to connect to a public XRP Ledger Testnet server a supported client library:

- JavaScript
- WebSocket

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

For purposes of this tutorial, use the following interface to connect and perform setup:

Connect to Testnet


### 3. Choose Trust Line

You can only freeze one trust line per transaction, so you need to know which trust line you want. Each of your trust lines is uniquely identified by these 3 things:

- Your own address.
- The address of the account linked to yours via the trust line.
- The currency code of the trust line.

There can be multiple trust lines between two accounts, each for a different currency. If you suspect a particular account is behaving maliciously, you may want to freeze all the trust lines between your accounts, one at a time. Use the account_lines method with a pair of accounts to find all trust lines between those accounts, then choose a trust line to freeze from among the results. For example:

- JavaScript
- WebSocket

```
// Look up current trust lines -----------------------------------------------
  const issuing_address = wallet.address
  const address_to_freeze = 'rhPuJPcd9kcSRCGHWudV3tjUuTvvysi6sv'
  const currency_to_freeze = 'FOO'

  console.log('Looking up', currency_to_freeze, 'trust line from',
              issuing_address, 'to', address_to_freeze)
  const account_lines = await client.request({
    "command": "account_lines",
    "account": issuing_address,
    "peer": address_to_freeze,
    "ledger_index": "validated"
  })
  const trustlines = account_lines.result.lines
  console.log("Found lines:", trustlines)

  // Find the trust line for our currency_to_freeze ----------------------------
  let trustline = null
  for (let i = 0; i < trustlines.length; i++) {
    if(trustlines[i].currency === currency_to_freeze) {
      trustline = trustlines[i]
      break
    }
  }

  if (trustline === null) {
    console.error(`Couldn't find a ${currency_to_freeze} trustline between
                  ${issuing_address} and ${address_to_freeze}`)
    return
  }
```

For purposes of this tutorial, a second test address has created a trust line to the test address for the currency "FOO", which you can see in the following example:


### 4. Send TrustSet Transaction to Freeze the Trust Line

To enable or disable an Individual Freeze on a specific trust line, send a TrustSet transaction with the tfSetFreeze flag enabled. The fields of the transaction should be as follows:

`tfSetFreeze`

| Field | Value | Description |
| --- | --- | --- |
| Account | String | Your issuing account's address. |
| TransactionType | String | TrustSet |
| LimitAmount | Object | Object defining the trust line to freeze. |
| LimitAmount.currency | String | Currency of the trust line (cannot be XRP) |
| LimitAmount.issuer | String | The XRP Ledger address of the counterparty to freeze |
| LimitAmount.value | String | The amount of currency you trust this counterparty to issue to you, as a quoted number. As an issuer, this is typically "0". |
| Flags | Number | To enable a freeze, turn on the tfSetFreeze bit (0x00100000). |


`Account`

`TransactionType`

`TrustSet`

`LimitAmount`

`LimitAmount`

`currency`

`LimitAmount`

`issuer`

`LimitAmount`

`value`

`"0"`

`Flags`

`tfSetFreeze`

`0x00100000`

As always, to send a transaction, you prepare it by filling in all the necessary fields, sign it with your cryptographic keys, and submit it to the network. For example:

- JavaScript
- WebSocket

```
// Send a TrustSet transaction to set an individual freeze -------------------
  // Construct a TrustSet, preserving our existing limit value
  const trust_set = {
    "TransactionType": 'TrustSet',
    "Account": issuing_address,
    "LimitAmount": {
      "value": trustline.limit,
      "currency": trustline.currency,
      "issuer": trustline.account
    },
    "Flags": xrpl.TrustSetFlags.tfSetFreeze
  }

  // Best practice for JavaScript users: use validate(tx_json) to confirm
  // that a transaction is well-formed or throw ValidationError if it isn't.
  xrpl.validate(trust_set)

  console.log('Submitting TrustSet tx:', trust_set)
  const result = await client.submitAndWait(trust_set, { wallet: wallet })
  console.log("Transaction result:", result)

  // Confirm trust line status -------------------------------------------------
  const account_lines_2 = await client.request({
    "command": "account_lines",
    "account": issuing_address,
    "peer": address_to_freeze,
    "ledger_index": "validated"
  })
  const trustlines_2 = account_lines_2.result.lines

  let line = null
  for (let i = 0; i < trustlines_2.length; i++) {
    if(trustlines_2[i].currency === currency_to_freeze) {
      line = trustlines_2[i]
      console.log(`Status of ${currency_to_freeze} line between
          ${issuing_address} and ${address_to_freeze}:
          ${JSON.stringify(line, null, 2)}`)
      if (line.freeze === true) {
        console.log(`✅ Line is frozen.`)
      } else {
        console.error(`❌ Line is NOT FROZEN.`)
      }
    }
  }
  if (line === null) {
    console.error(`Couldn't find a ${CURRENCY_TO_FREEZE} line between
        ${issuing_address} and ${address_to_freeze}.`)
  }
```

Send TrustSet (Freeze)

NoteIf you want to freeze multiple trust lines in different currencies with the same counterparty, repeat this step for each trust line. It is possible to send several transactions in a single ledger if you use a different sequence number for each transaction.


### 5. Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. If the XRP Ledger is busy or poor network connectivity delays a transaction from being relayed throughout the network, a transaction may take longer to be confirmed. (For information on how to set an expiration for transactions, see Reliable Transaction Submission.)

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 6. Check Trust Line Freeze Status

At this point, the trust line from the counterparty should be frozen. You can check the freeze status of any trust line using the account_lines method with the following fields:

| Field | Value | Description |
| --- | --- | --- |
| account | String | Your address. (In this case, the issuing address.) |
| peer | String | The address of the counterparty. |


`account`

`peer`

CautionThe response includes all trust lines between the two accounts. (Each different currency code uses a different trust line.) Be sure to check the one for the right token.

In the response, the field "freeze": true indicates that the account from the request has enabled an Individual Freeze on that trust line. The field "freeze_peer": true indicates that the counterparty (peer) from the request has frozen the trust line. For example:

`"freeze": true`

`"freeze_peer": true`

`peer`

- JavaScript
- WebSocket

```
// Confirm trust line status -------------------------------------------------
  const account_lines_2 = await client.request({
    "command": "account_lines",
    "account": issuing_address,
    "peer": address_to_freeze,
    "ledger_index": "validated"
  })
  const trustlines_2 = account_lines_2.result.lines

  let line = null
  for (let i = 0; i < trustlines_2.length; i++) {
    if(trustlines_2[i].currency === currency_to_freeze) {
      line = trustlines_2[i]
      console.log(`Status of ${currency_to_freeze} line between
          ${issuing_address} and ${address_to_freeze}:
          ${JSON.stringify(line, null, 2)}`)
      if (line.freeze === true) {
        console.log(`✅ Line is frozen.`)
      } else {
        console.error(`❌ Line is NOT FROZEN.`)
      }
    }
  }
  if (line === null) {
    console.error(`Couldn't find a ${CURRENCY_TO_FREEZE} line between
        ${issuing_address} and ${address_to_freeze}.`)
  }
```

Check Trust Line


### 7. (Optional) Send TrustSet Transaction to End the Freeze

If you decide that the trust line no longer needs to be frozen (for example, you investigated and decided that the suspicious activity was benign), you can end the individual freeze in almost the same way that you froze the trust line in the first place. To end an individual freeze, send a TrustSet transaction with the tfClearFreeze flag enabled. The other fields of the transaction should be the same as when you froze the trust line:

`tfClearFreeze`

| Field | Value | Description |
| --- | --- | --- |
| Account | String | Your issuing account's address. |
| TransactionType | String | TrustSet |
| LimitAmount | Object | Object defining the trust line to unfreeze. |
| LimitAmount.currency | String | Currency of the trust line (cannot be XRP) |
| LimitAmount.issuer | String | The XRP Ledger address of the counterparty to unfreeze |
| LimitAmount.value | String | The amount of currency you trust this counterparty to issue to you, as a quoted number. As an issuer, this is typically "0". |
| Flags | Number | To end an individual freeze, turn on the tfClearFreeze bit (0x00200000) |


`Account`

`TransactionType`

`TrustSet`

`LimitAmount`

`LimitAmount`

`currency`

`LimitAmount`

`issuer`

`LimitAmount`

`value`

`"0"`

`Flags`

`tfClearFreeze`

`0x00200000`

As always, to send a transaction, you prepare it by filling in all the necessary fields, sign it with your cryptographic keys, and submit it to the network. For example:

- JavaScript
- WebSocket

```
// Clear the individual freeze -----------------------------------------------
  // We're reusing our TrustSet transaction from earlier with a different flag.
  trust_set.Flags = xrpl.TrustSetFlags.tfClearFreeze

  // Submit a TrustSet transaction to clear an individual freeze ---------------
  console.log('Submitting TrustSet tx:', trust_set)
  const result2 = await client.submitAndWait(trust_set, { wallet: wallet })
  console.log("Transaction result:", result2)

  console.log("Finished submitting. Now disconnecting.")
  await client.disconnect()
```

Send TrustSet (End Freeze)


### 8. Wait for Validation

As before, wait for the transaction to be validated by consensus.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


## See Also

- Concepts:Freezing Issued CurrenciesTrust Lines
- Freezing Issued Currencies
- Trust Lines
- Tutorials:Enable No FreezeEnact Global FreezeChange or Remove a Regular Key Pair
- Enable No Freeze
- Enact Global Freeze
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
- Enact Global Freeze
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

![Image](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7e00989b-ded8-4970-af03-5a4c185e95a8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7e00989b-ded8-4970-af03-5a4c185e95a8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b37e6681-390e-48cb-99b7-07d0ffdbc807&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b37e6681-390e-48cb-99b7-07d0ffdbc807&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=46620698-8012-4b4e-aa19-9632c8dd5d3b&bo=1&sid=08f509a09d9f11f09b9e1dfc22a4a532&vid=08f550709d9f11f0837ec3a1d40cf55b&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Freeze%20a%20Trust%20Line&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&r=&lt=4174&evt=pageLoad&sv=2&cdb=AQAS&rn=316818)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c201923f-2492-436e-878e-587f0211f47a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c201923f-2492-436e-878e-587f0211f47a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=821418c0-17e7-4642-8fb5-bf4d408ed971&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=821418c0-17e7-4642-8fb5-bf4d408ed971&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aff02648-9492-4b99-9a3a-92a13a57aa59&pt=Freeze%20a%20Trust%20Line&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ffreeze-a-trust-line&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-tokens/freeze-a-trust-line#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-tokens/freeze-a-trust-line#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-tokens/freeze-a-trust-line#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-tokens/freeze-a-trust-line#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2746f7acf65ecbd48e29ad0f12e3ba05.1759196684132.1759196684132.1759196684132.1&__hssc=78174987.1.1759196684132&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-tokens/freeze-a-trust-line.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Freeze](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/freeze/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2746f7acf65ecbd48e29ad0f12e3ba05.1759196684132.1759196684132.1759196684132.1&__hssc=78174987.1.1759196684132&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:45:00.958Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
