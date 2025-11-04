# Issue a Fungible Token
URL: https://xrpl.org/docs/tutorials/how-tos/use-tokens/issue-a-fungible-token
Section: E27

## Overview


## Extracted Content
# Issue a Fungible Token

Anyone can issue various types of tokens in the XRP Ledger, ranging from informal "IOUs" to fiat-backed stablecoins, purely digital fungible and semi-fungible tokens, and more. This tutorial shows the technical steps of creating a token in the ledger. For more information on how XRP Ledger tokens work, see Issued Currencies; for more on the business decisions involved in issuing a stablecoin, see Stablecoin Issuer.


## Prerequisites

- You need two funded XRP Ledger accounts, each with an address, secret key, and some XRP. For this tutorial, you can generate new test credentials as needed.Each address needs enough XRP to satisfy the reserve requirement including the additional reserve for a trust line.
- Each address needs enough XRP to satisfy the reserve requirement including the additional reserve for a trust line.
- You need a connection to the XRP Ledger network. As shown in this tutorial, you can use public servers for testing.
- You should be familiar with the Getting Started instructions for your preferred client library. This page provides examples for the following:JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.Python with the xrpl-py library. See Get Started using Python for setup steps.Java with the xrpl4j library. See Get Started Using Java for setup steps.You can also read along and use the interactive steps in your browser without any setup.
- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- Python with the xrpl-py library. See Get Started using Python for setup steps.
- Java with the xrpl4j library. See Get Started Using Java for setup steps.
- You can also read along and use the interactive steps in your browser without any setup.

- Each address needs enough XRP to satisfy the reserve requirement including the additional reserve for a trust line.

- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- Python with the xrpl-py library. See Get Started using Python for setup steps.
- Java with the xrpl4j library. See Get Started Using Java for setup steps.
- You can also read along and use the interactive steps in your browser without any setup.

`xrpl-py`


## Example Code

Complete sample code for all of the steps of these tutorials is available under the MIT license.

- See Code Samples: Issue a Fungible Token in the source repository for this website.


## Steps


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. You also need one or more recipients who are willing to hold the tokens you issue: unlike in some other blockchains, in the XRP Ledger you cannot force someone to hold a token they do not want.

The best practice is to use "cold" and "hot" addresses. The cold address is the issuer of the token. The hot address is like a regular user's address that you control. It receives tokens from the cold address, which you can then transfer to other users. A hot address is not strictly necessary, since you could send tokens directly to users from the cold address, but it is good practice for security reasons. In production, you should take extra care of the cold address's cryptographic keys (for example, keeping them offline) because it is much harder to replace a cold address than a hot address.

In this tutorial, the hot address receives the tokens you issue from the cold address. You can get the keys for two addresses using the following interface.

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration.


### 2. Connect to the Network

You must be connected to the network to submit transactions to it. The following code shows how to connect to a public XRP Ledger Testnet server with a supported client library:

- JavaScript
- Python
- Java

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

NoteThe JavaScript code samples in this tutorial use the async/await pattern. Since await needs to be used from within an async function, the remaining code samples are written to continue inside the main() function started here. You can also use Promise methods .then() and .catch() instead of async/await if you prefer.

`async`

`await`

`await`

`async`

`main()`

`.then()`

`.catch()`

`async`

`await`

For this tutorial, click the following button to connect:

Connect to Testnet


### 3. Configure Issuer Settings

First, configure the settings for your cold address (which will become the issuer of your token). Most settings can be reconfigured later, with the following exceptions:

- Default Ripple: This setting is required so that users can send your token to each other. It's best to enable it before setting up any trust lines or issuing any tokens.
- Authorized Trust Lines: (Optional) This setting (also called "Require Auth") limits your tokens to being held only by accounts you've explicitly approved. You cannot enable this setting if you already have any trust lines or offers for any token. NoteTo use authorized trust lines, you must perform additional steps that are not shown in this tutorial.

Other settings you may want to, optionally, configure for your cold address (issuer):

| Setting | Recommended Value | Summary |
| --- | --- | --- |
| Require Destination Tags | Enabled or Disabled | Enable if you process withdrawals of your token to outside systems. (For example, your token is a stablecoin.) |
| Disallow XRP | Enabled or Disabled | Enable if this address isn't meant to process XRP payments. |
| Transfer Fee | 0–1% | Charge a percentage fee when users send your token to each other. |
| Tick Size | 5 | Limit the number of decimal places in exchange rates for your token in the decentralized exchange. A tick size of 5-6 reduces churn of almost-equivalent offers and speeds up price discovery compared to the default of 15. |
| Domain | (Your domain name) | Set to a domain you own so can verify ownership of the accounts. This can help reduce confusion or impersonation attempts. |


You can change these settings later as well.

NoteMany issuing settings apply equally to all tokens issued by an address, regardless of the currency code. If you want to issue multiple types of tokens in the XRP Ledger with different settings, you should use a different address to issue each different token.

The following code sample shows how to send an AccountSet transaction to enable the recommended cold address settings:

- JavaScript
- Python
- Java

```
// Configure issuer (cold address) settings ----------------------------------
  const cold_settings_tx = {
    "TransactionType": "AccountSet",
    "Account": cold_wallet.address,
    "TransferRate": 0,
    "TickSize": 5,
    "Domain": "6578616D706C652E636F6D", // "example.com"
    "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple,
    // Using tf flags, we can enable more flags in one transaction
    "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
             xrpl.AccountSetTfFlags.tfRequireDestTag)
  }

  const cst_prepared = await client.autofill(cold_settings_tx)
  const cst_signed = cold_wallet.sign(cst_prepared)
  console.log("Sending cold address AccountSet transaction...")
  const cst_result = await client.submitAndWait(cst_signed.tx_blob)
  if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`)
  } else {
    throw `Error sending transaction: ${cst_result}`
  }
```


### 4. Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. You should wait for your earlier transactions to be fully validated before proceeding to the later steps, to avoid unexpected failures from things executing out of order. For more information, see Reliable Transaction Submission.

The code samples in this tutorial use helper functions to wait for validation when submitting a transaction:

- JavaScript: The submit_and_verify() function, as defined in the submit-and-verify code sample.
- Python: The submit_and_wait() method of the xrpl-py library.
- Java: The submitAndWaitForValidation() method in the sample Java class.

`submit_and_verify()`

`submit_and_wait()`

`submitAndWaitForValidation()`

TipTechnically, you can configure the hot address in parallel with configuring the issuer address. For simplicity, this tutorial waits for each transaction one at a time.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 5. Configure Hot Address Settings

The hot address does not strictly require any settings changes from the default, but the following are recommended as best practices:

| Setting | Recommended Value | Summary |
| --- | --- | --- |
| Default Ripple | Disabled | Leave this setting disabled. (This is the default.) |
| Authorized Trust Lines | Enabled | Enable this setting on the hot address—and never approve any trust lines to the hot address—to prevent accidentally issuing tokens from the wrong address. (Optional, but recommended.) |
| Require Destination Tags | Enabled or Disabled | Enable if you process withdrawals of your token to outside systems. (For example, your token is a stablecoin.) |
| Disallow XRP | Enabled or Disabled | Enable if this address isn't meant to process XRP payments. |
| Domain | (Your domain name) | Set to a domain you own so can verify ownership of the accounts. This can help reduce confusion or impersonation attempts. |


The following code sample shows how to send an AccountSet transaction to enable the recommended hot address settings:

- JavaScript
- Python
- Java

```
// Configure hot address settings --------------------------------------------

  const hot_settings_tx = {
    "TransactionType": "AccountSet",
    "Account": hot_wallet.address,
    "Domain": "6578616D706C652E636F6D", // "example.com"
    // enable Require Auth so we can't use trust lines that users
    // make to the hot address, even by accident:
    "SetFlag": xrpl.AccountSetAsfFlags.asfRequireAuth,
    "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
              xrpl.AccountSetTfFlags.tfRequireDestTag)
  }

  const hst_prepared = await client.autofill(hot_settings_tx)
  const hst_signed = hot_wallet.sign(hst_prepared)
  console.log("Sending hot address AccountSet transaction...")
  const hst_result = await client.submitAndWait(hst_signed.tx_blob)
  if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`)
  } else {
    throw `Error sending transaction: ${hst_result.result.meta.TransactionResult}`
  }
```


### 6. Wait for Validation

As before, wait for the previous transaction to be validated by consensus before continuing.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 7. Create Trust Line from Hot to Cold Address

Before you can receive tokens, you need to create a trust line to the token issuer. This trust line is specific to the currency code of the token you want to issue, such as USD or FOO. You can choose any currency code you want; each issuer's tokens are treated as separate in the XRP Ledger protocol. However, users' balances of tokens with the same currency code can ripple between different issuers if the users enable rippling settings.

The hot address needs a trust line like this before it can receive tokens from the issuer. Similarly, each user who wants to hold your token must also create a trust line¹. Each trust line increases the reserve requirement of the hot address, so you must hold enough spare XRP to pay for the increased requirement. Your reserve requirement goes back down if you remove the trust line.

TipA trust line has a "limit" on how much the recipient is willing to hold; others cannot send you more tokens than your specified limit. For community credit systems, you may want to configure limits per individual based on how much you trust that person. For other types and uses of tokens, it is normally OK to set the limit to a very large number.

To create a trust line, send a TrustSet transaction from the hot address with the following fields:

| Field | Value |
| --- | --- |
| TransactionType | "TrustSet" |
| Account | The hot address. (More generally, this is the account that wants to receive the token.) |
| LimitAmount | An object specifying how much, of which token, from which issuer, you are willing to hold. |
| LimitAmount.currency | The currency code of the token. |
| LimitAmount.issuer | The cold address. |
| LimitAmount.value | The maximum amount of the token you are willing to hold. |


`TransactionType`

`"TrustSet"`

`Account`

`LimitAmount`

`LimitAmount.currency`

`LimitAmount.issuer`

`LimitAmount.value`

The following code sample shows how to send a TrustSet transaction from the hot address, trusting the issuing address for a limit of 1 billion FOO:

- JavaScript
- Python
- Java

```
// Create trust line from hot to cold address --------------------------------
  const currency_code = "FOO"
  const trust_set_tx = {
    "TransactionType": "TrustSet",
    "Account": hot_wallet.address,
    "LimitAmount": {
      "currency": currency_code,
      "issuer": cold_wallet.address,
      "value": "10000000000" // Large limit, arbitrarily chosen
    }
  }

  const ts_prepared = await client.autofill(trust_set_tx)
  const ts_signed = hot_wallet.sign(ts_prepared)
  console.log("Creating trust line from hot address to issuer...")
  const ts_result = await client.submitAndWait(ts_signed.tx_blob)
  if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`)
  } else {
    throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
  }

    // Create trust line from customer_one to cold address --------------------------------
  const trust_set_tx2 = {
    "TransactionType": "TrustSet",
    "Account": customer_one_wallet.address,
    "LimitAmount": {
      "currency": currency_code,
      "issuer": cold_wallet.address,
      "value": "10000000000" // Large limit, arbitrarily chosen
    }
  }

  const ts_prepared2 = await client.autofill(trust_set_tx2)
  const ts_signed2 = customer_one_wallet.sign(ts_prepared2)
  console.log("Creating trust line from customer_one address to issuer...")
  const ts_result2 = await client.submitAndWait(ts_signed2.tx_blob)
  if (ts_result2.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed2.hash}`)
  } else {
    throw `Error sending transaction: ${ts_result2.result.meta.TransactionResult}`
  }


  const trust_set_tx3 = {
    "TransactionType": "TrustSet",
    "Account": customer_two_wallet.address,
    "LimitAmount": {
      "currency": currency_code,
      "issuer": cold_wallet.address,
      "value": "10000000000" // Large limit, arbitrarily chosen
    }
  }

  const ts_prepared3 = await client.autofill(trust_set_tx3)
  const ts_signed3 = customer_two_wallet.sign(ts_prepared3)
  console.log("Creating trust line from customer_two address to issuer...")
  const ts_result3 = await client.submitAndWait(ts_signed3.tx_blob)
  if (ts_result3.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed3.hash}`)
  } else {
    throw `Error sending transaction: ${ts_result3.result.meta.TransactionResult}`
  }
```

Currency code:

NoteIf you use Authorized Trust Lines, there is an extra step after this one: the cold address must approve the trust line from the hot address. For details of how to do this, see Authorizing Trust Lines.


### 8. Wait for Validation

As before, wait for the previous transaction to be validated by consensus before continuing.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 9. Send Token

Now you can create tokens by sending a Payment transaction from the cold address to the hot address. This transaction should have the following attributes (dot notation indicates nested fields):

| Field | Value |
| --- | --- |
| TransactionType | "Payment" |
| Account | The cold address issuing the token. |
| Amount | An token amount specifying how much of which token to create. |
| Amount.currency | The currency code of the token. |
| Amount.value | Decimal amount of the token to issue, as a string. |
| Amount.issuer | The cold address issuing the token. |
| Destination | The hot address (or other account receiving the token) |
| Paths | Omit this field when issuing tokens. |
| SendMax | Omit this field when issuing tokens. |
| DestinationTag | Any whole number from 0 to 232-1. You must specify something here if you enabled Require Destination Tags on the hot address. |


`TransactionType`

`"Payment"`

`Account`

`Amount`

`Amount.currency`

`Amount.value`

`Amount.issuer`

`Destination`

`Paths`

`SendMax`

`DestinationTag`

You can use auto-filled values for all other required fields.

The following code sample shows how to send a Payment transaction to issue 88 FOO from the cold address to the hot address:

- JavaScript
- Python
- Java

```
// Send token ----------------------------------------------------------------
  let issue_quantity = "3800"

  const send_token_tx = {
    "TransactionType": "Payment",
    "Account": cold_wallet.address,
    "DeliverMax": {
      "currency": currency_code,
      "value": issue_quantity,
      "issuer": cold_wallet.address
    },
    "Destination": hot_wallet.address,
    "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                        // on the hot account earlier.
  }

  const pay_prepared = await client.autofill(send_token_tx)
  const pay_signed = cold_wallet.sign(pay_prepared)
  console.log(`Cold to hot - Sending ${issue_quantity} ${currency_code} to ${hot_wallet.address}...`)
  const pay_result = await client.submitAndWait(pay_signed.tx_blob)
  if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`)
  } else {
    console.log(pay_result)
    throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
  }


  issue_quantity = "100"
  const send_token_tx2 = {
    "TransactionType": "Payment",
    "Account": hot_wallet.address,
    "DeliverMax": {
      "currency": currency_code,
      "value": issue_quantity,
      "issuer": cold_wallet.address
    },
    "Destination": customer_one_wallet.address,
    "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                        // on the hot account earlier.
  }

  const pay_prepared2 = await client.autofill(send_token_tx2)
  const pay_signed2 = hot_wallet.sign(pay_prepared2)
  console.log(`Hot to customer_one - Sending ${issue_quantity} ${currency_code} to ${customer_one_wallet.address}...`)
  const pay_result2 = await client.submitAndWait(pay_signed2.tx_blob)
  if (pay_result2.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed2.hash}`)
  } else {
    console.log(pay_result2)
    throw `Error sending transaction: ${pay_result2.result.meta.TransactionResult}`
  }


  issue_quantity = "12"
  const send_token_tx3 = {
    "TransactionType": "Payment",
    "Account": customer_one_wallet.address,
    "DeliverMax": {
      "currency": currency_code,
      "value": issue_quantity,
      "issuer": cold_wallet.address
    },
    "Destination": customer_two_wallet.address,
    "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                        // on the hot account earlier.
  }

  const pay_prepared3 = await client.autofill(send_token_tx3)
  const pay_signed3 = customer_one_wallet.sign(pay_prepared3)
  console.log(`Customer_one to customer_two - Sending ${issue_quantity} ${currency_code} to ${customer_two_wallet.address}...`)
  const pay_result3 = await client.submitAndWait(pay_signed3.tx_blob)
  if (pay_result3.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed3.hash}`)
  } else {
    console.log(pay_result3)
    throw `Error sending transaction: ${pay_result3.result.meta.TransactionResult}`
  }
```


### 10. Wait for Validation

As before, wait for the previous transaction to be validated by consensus before continuing.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 11. Confirm Token Balances

You can check the balances of your token from the perspective of either the token issuer or the hot address. Tokens issued in the XRP Ledger always have balances that sum to 0: negative from the perspective of the issuer and positive from the perspective of the holder.

Use the account_lines method to look up the balances from the perspective of the holder. This lists each trust line along with its limit, balance, and settings.

Use the gateway_balances method to look up balances from the perspective of a token issuer. This provides a sum of all tokens issued by a given address.

TipSince the XRP Ledger is fully public, you can check the balances of any account at any time without needing any cryptographic keys.

The following code sample shows how to use both methods:

- JavaScript
- Python
- Java

```
// Check balances ------------------------------------------------------------
  console.log("Getting hot address balances...")
  const hot_balances = await client.request({
    command: "account_lines",
    account: hot_wallet.address,
    ledger_index: "validated"
  })
  console.log(hot_balances.result)

  console.log("Getting cold address balances...")
  const cold_balances = await client.request({
    command: "gateway_balances",
    account: cold_wallet.address,
    ledger_index: "validated",
    hotwallet: [hot_wallet.address]
  })
  console.log(JSON.stringify(cold_balances.result, null, 2))

  client.disconnect()
}
```

Confirm Balances


### Next Steps

Now that you've created the token, you can explore how it fits into features of the XRP Ledger:

- Send tokens from the hot address to other users.
- Trade it in the decentralized exchange.
- Monitor for incoming payments of your token.
- Create an xrp-ledger.toml file and set up domain verification for your token's issuer.
- Learn about other features of XRP Ledger tokens.


## Footnotes

¹ Users can hold your token without explicitly creating a trust line if they buy your token in the decentralized exchange. Buying a token in the exchange automatically creates the necessary trust lines. This is only possible if someone is selling your token in the decentralized exchange.

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

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c348c7ed-6339-4767-9872-8c3e6264f2da&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c348c7ed-6339-4767-9872-8c3e6264f2da&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e90b0dde-bb8a-4a95-be64-372d41290028&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e90b0dde-bb8a-4a95-be64-372d41290028&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=f2ce2fb3-a501-4c5e-9633-28c195c3bf89&bo=1&sid=c55062e09d9e11f09d7e51beaaafefc6&vid=c550c0109d9e11f0b392f72ac5ecf7c2&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Issue%20a%20Fungible%20Token&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&r=&lt=3124&evt=pageLoad&sv=2&cdb=AQAS&rn=200704)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4b16258a-aa29-4fca-b2a3-dda0b97926a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4b16258a-aa29-4fca-b2a3-dda0b97926a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f93ba6a-8d58-47a2-b556-080d94e00ed7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f93ba6a-8d58-47a2-b556-080d94e00ed7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f3eed74a-6e0b-40f1-877c-c89641363f0b&pt=Issue%20a%20Fungible%20Token&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fissue-a-fungible-token&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-tokens/issue-a-fungible-token#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-tokens/issue-a-fungible-token#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-tokens/issue-a-fungible-token#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-tokens/issue-a-fungible-token#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-tokens/issue-a-fungible-token.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [xrpl-py library](https://xrpl-py.readthedocs.io/)
- [xrpl4j library](https://github.com/XRPLF/xrpl4j)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Issue a Fungible Token](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/issue-a-token/)
- [async/await pattern](https://javascript.info/async-await)
- [submit-and-verify code sample](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/submit-and-verify)
- [method of the xrpl-py library](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.transaction.html#xrpl.transaction.submit_and_wait)
- [sample Java class](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/issue-a-token/java/IssueToken.java)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:43:16.786Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
