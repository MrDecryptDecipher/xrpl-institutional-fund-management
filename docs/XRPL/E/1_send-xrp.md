# Send XRP
URL: https://xrpl.org/docs/tutorials/how-tos/send-xrp
Section: E1

## Overview


## Extracted Content
# Send XRP

This tutorial explains how to send a direct XRP Payment using xrpl.js for JavaScript, xrpl-py for Python, xrpl4j for Java or XRPL_PHP for PHP. First, we step through the process with the XRP Ledger Testnet. Then, we compare that to the additional requirements for doing the equivalent in production.

`xrpl.js`

`xrpl-py`

`xrpl4j`

`XRPL_PHP`

TipCheck out the Code Samples for a complete version of the code used in this tutorial.


## Prerequisites

To interact with the XRP Ledger, you need to set up a dev environment with the necessary tools. This tutorial provides examples using the following options:

- JavaScript with the xrpl.js library. See Get Started Using JavaScript for setup steps.
- Python with the xrpl-py library. See Get Started using Python for setup steps.
- Java with the xrpl4j library. See Get Started Using Java for setup steps.
- PHP with the XRPL_PHP library. See Get Started Using PHP for setup steps.
- Go with the xrpl-go library. See Get Started Using Go for setup steps.

`xrpl-py`


## Send a Payment on the Test Net


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. The address and secret key look like this:

- JavaScript
- Python
- Java
- PHP
- Go

```
// Example credentials
const wallet = xrpl.Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9")
console.log(wallet.address) // rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH
```

The secret key shown here is for example only. For development purposes, you can get your own credentials, pre-funded with XRP, on the Testnet using the following interface:

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration.


### 2. Connect to a Testnet Server

First, you must connect to an XRP Ledger server so you can get the current status of your account and the shared ledger. You can use this information to automatically fill in some required fields of a transaction. You also must be connected to the network to submit transactions to it.

The following code connects to a public Testnet servers:

- JavaScript
- Python
- Java
- PHP
- Go

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


### 3. Prepare Transaction

Typically, we create XRP Ledger transactions as objects in the JSON transaction format. The following example shows a minimal Payment specification:

```
{
  "TransactionType": "Payment",
  "Account": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  "DeliverMax": "2000000",
  "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
}
```

The bare minimum set of instructions you must provide for an XRP Payment is:

- An indicator that this is a payment. ("TransactionType": "Payment")
- The sending address. ("Account")
- The address that should receive the XRP ("Destination"). This can't be the same as the sending address.
- The amount of XRP to send ("DeliverMax"). Typically, this is specified as an integer in "drops" of XRP, where 1,000,000 drops equals 1 XRP.

`"TransactionType": "Payment"`

`"Account"`

`"Destination"`

`"DeliverMax"`

Technically, a transaction must contain some additional fields, and certain optional fields such as LastLedgerSequence are strongly recommended. Some other language-specific notes:

`LastLedgerSequence`

- If you're using xrpl.js for JavaScript, you can use the Client.autofill() method to automatically fill in good defaults for the remaining fields of a transaction. In TypeScript, you can also use the transaction models like xrpl.Payment to enforce the correct fields.
- With xrpl-py for Python, you can use the models in xrpl.models.transactions to construct transactions as native Python objects.
- With xrpl4j for Java, you can use the model objects in the xrpl4j-model module to construct transactions as Java objects.Unlike the other libraries, you must provide the account sequence and the signingPublicKey of the source account of a Transaction at the time of construction, as well as a fee.
- Unlike the other libraries, you must provide the account sequence and the signingPublicKey of the source account of a Transaction at the time of construction, as well as a fee.

`xrpl.js`

`Client.autofill()`

`xrpl.Payment`

`xrpl-py`

`xrpl.models.transactions`

`xrpl4j-model`

- Unlike the other libraries, you must provide the account sequence and the signingPublicKey of the source account of a Transaction at the time of construction, as well as a fee.

`sequence`

`signingPublicKey`

`Transaction`

`fee`

Here's an example of preparing the above payment:

- JavaScript
- Python
- Java
- PHP
- Go

```
// Prepare transaction -------------------------------------------------------
  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": wallet.address,
    "DeliverMax": xrpl.xrpToDrops("22"),
    "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
  })
  const max_ledger = prepared.LastLedgerSequence
  console.log("Prepared transaction instructions:", prepared)
  console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
  console.log("Transaction expires after ledger:", max_ledger)
```


### 4. Sign the Transaction Instructions

Signing a transaction uses your credentials to authorize the transaction on your behalf. The input to this step is a completed set of transaction instructions (usually JSON), and the output is a binary blob containing the instructions and a signature from the sender.

- JavaScript: Use the sign() method of a Wallet instance to sign the transaction with xrpl.js.
- Python: Use the xrpl.transaction.safe_sign_transaction() method with a model and Wallet object.
- Java: Use a SignatureService instance to sign the transaction. For this tutorial, use the SingleKeySignatureService.
- PHP: Use a sign() method of a Wallet instance instance to sign the transaction. The input to this step is a completed array of transaction instructions.
- Go: Use the Sign() method of the Wallet package to sign the transaction.

`sign()`

`Wallet`

`xrpl.js`

`xrpl.transaction.safe_sign_transaction()`

`Wallet`

`SignatureService`

`SingleKeySignatureService`

`sign()`

`Wallet`

`Sign()`

`Wallet`

- JavaScript
- Python
- Java
- PHP
- Go

```
// Sign prepared instructions ------------------------------------------------
  const signed = wallet.sign(prepared)
  console.log("Identifying hash:", signed.hash)
  console.log("Signed blob:", signed.tx_blob)
```

The result of the signing operation is a transaction object containing a signature. Typically, XRP Ledger APIs expect a signed transaction to be the hexadecimal representation of the transaction's canonical binary format, called a "blob".

- In xrpl.js, the signing API also returns the transaction's ID, or identifying hash, which you can use to look up the transaction later. This is a 64-character hexadecimal string that is unique to this transaction.
- In xrpl-py, you can get the transaction's hash in the response to submitting it in the next step.
- In xrpl4j, SignatureService.sign returns a SignedTransaction, which contains the transaction's hash, which you can use to look up the transaction later.
- In XRPL_PHP, the signing API also returns the transaction's ID, or identifying hash, which you can use to look up the transaction later. This is a 64-character hexadecimal string that is unique to this transaction.
- In xrpl-go, the signing API also returns the transaction's ID, or identifying hash, which you can use to look up the transaction later. This is a 64-character hexadecimal string that is unique to this transaction.

`xrpl.js`

`xrpl-py`

`SignatureService.sign`

`SignedTransaction`

`XRPL_PHP`

`xrpl-go`

Sign example transaction


### 5. Submit the Signed Blob

Now that you have a signed transaction, you can submit it to an XRP Ledger server, which relays it through the network. It's also a good idea to take note of the latest validated ledger index before you submit. The earliest ledger version that your transaction could get into as a result of this submission is one higher than the latest validated ledger when you submit it. Of course, if the same transaction was previously submitted, it could already be in a previous ledger. (It can't succeed a second time, but you may not realize it succeeded if you aren't looking in the right ledger versions.)

- JavaScript: Use the submitAndWait() method of the Client to submit a signed transaction to the network and wait for the response, or use submitSigned() to submit a transaction and get only the preliminary response.
- Python: Use the xrpl.transaction.submit_and_wait() method to submit a transaction to the network and wait for a response.
- Java: Use the XrplClient.submit(SignedTransaction) method to submit a transaction to the network. Use the XrplClient.ledger() method to get the latest validated ledger index.
- PHP: Use the submitAndWait() method of the Client to submit a transaction to the network and wait for the response.
- Go: Use SubmitTxAndWait() or SubmitTxBlobAndWait() methods os the Client to submit a transaction to the network and wait for the response.

`submitAndWait()`

`submitSigned()`

`xrpl.transaction.submit_and_wait()`

`XrplClient.submit(SignedTransaction)`

`XrplClient.ledger()`

`submitAndWait()`

`SubmitTxAndWait()`

`SubmitTxBlobAndWait()`

- JavaScript
- Python
- Java
- PHP
- Go

```
// Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(signed.tx_blob)
```

This method returns the tentative result of trying to apply the transaction to the open ledger. This result can change when the transaction is included in a validated ledger: transactions that succeed initially might ultimately fail, and transactions that fail initially might ultimately succeed. Still, the tentative result often matches the final result, so it's OK to get excited if you see tesSUCCESS here. 😁

`tesSUCCESS`

If you see any other result, you should check the following:

- Are you using the correct addresses for the sender and destination?
- Did you forget any other fields of the transaction, skip any steps, or make any other typos?
- Do you have enough Test XRP to send the transaction? The amount of XRP you can send is limited by the reserve requirement, which is currently 1 XRP with an additional 0.2 XRP for each "object" you own in the ledger. (If you generated a new address with the Testnet Faucet, you don't own any objects.)
- Are you connected to a server on the test network?

See the full list of transaction results for more possibilities.

Submit example transaction


### 6. Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. If the XRP Ledger is busy or poor network connectivity delays a transaction from being relayed throughout the network, a transaction may take longer to be confirmed. (For more information on expiration of unconfirmed transactions, see Reliable Transaction Submission.)

- JavaScript:  If you used the .submitAndWait() method, you can wait until the returned Promise resolves. Other, more asynchronous approaches are also possible.
- Python: If you used the xrpl.transaction.submit_and_wait() method, you can wait for the function to return. Other approaches, including asynchronous ones using the WebSocket client, are also possible.
- Java Poll the XrplClient.transaction() method to see if your transaction has a final result. Periodically check that the latest validated ledger index has not passed the LastLedgerIndex of the transaction using the XrplClient.ledger() method.
- PHP:  If you used the .submitAndWait() method, you can wait until the returned Promise resolves. Other, more asynchronous approaches are also possible.
- Go: If you used the SubmitTxAndWait() or SubmitTxBlobAndWait() methods, the client will handle submission and wait until the transaction is confirmed in a ledger. Internally, these methods use a polling mechanism, querying the transaction status with the client's Request() method and a TxRequest.

JavaScript:  If you used the .submitAndWait() method, you can wait until the returned Promise resolves. Other, more asynchronous approaches are also possible.

`.submitAndWait()`

Python: If you used the xrpl.transaction.submit_and_wait() method, you can wait for the function to return. Other approaches, including asynchronous ones using the WebSocket client, are also possible.

`xrpl.transaction.submit_and_wait()`

Java Poll the XrplClient.transaction() method to see if your transaction has a final result. Periodically check that the latest validated ledger index has not passed the LastLedgerIndex of the transaction using the XrplClient.ledger() method.

`XrplClient.transaction()`

`LastLedgerIndex`

`XrplClient.ledger()`

PHP:  If you used the .submitAndWait() method, you can wait until the returned Promise resolves. Other, more asynchronous approaches are also possible.

`.submitAndWait()`

Go: If you used the SubmitTxAndWait() or SubmitTxBlobAndWait() methods, the client will handle submission and wait until the transaction is confirmed in a ledger. Internally, these methods use a polling mechanism, querying the transaction status with the client's Request() method and a TxRequest.

`SubmitTxAndWait()`

`SubmitTxBlobAndWait()`

`Request()`

`TxRequest`

- JavaScript
- Python
- Java
- PHP
- Go

```
// Wait for validation -------------------------------------------------------
  // submitAndWait() handles this automatically, but it can take 4-7s.
```

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 7. Check Transaction Status

To know for sure what a transaction did, you must look up the outcome of the transaction when it appears in a validated ledger version.

- JavaScript: Use the response from submitAndWait() or call the tx method using Client.request().TipIn TypeScript you can pass a TxRequest to the Client.request() method.
- Python: Use the response from submit_and_wait() or call the xrpl.transaction.get_transaction_from_hash() method. (See the tx method response format for a detailed reference of the fields this can contain.)
- Java: Use the XrplClient.transaction() method to check the status of a transaction.
- PHP: Use the response from submitAndWait() or call the tx method using $client->syncRequest().
- Go: Use the response from SubmitTxAndWait() or SubmitTxBlobAndWait(), or manually query the transaction status using a TxRequest with the client's Request() method.

JavaScript: Use the response from submitAndWait() or call the tx method using Client.request().

`submitAndWait()`

`Client.request()`

TipIn TypeScript you can pass a TxRequest to the Client.request() method.

`TxRequest`

`Client.request()`

Python: Use the response from submit_and_wait() or call the xrpl.transaction.get_transaction_from_hash() method. (See the tx method response format for a detailed reference of the fields this can contain.)

`submit_and_wait()`

`xrpl.transaction.get_transaction_from_hash()`

Java: Use the XrplClient.transaction() method to check the status of a transaction.

`XrplClient.transaction()`

PHP: Use the response from submitAndWait() or call the tx method using $client->syncRequest().

`submitAndWait()`

`tx method`

`$client->syncRequest()`

Go: Use the response from SubmitTxAndWait() or SubmitTxBlobAndWait(), or manually query the transaction status using a TxRequest with the client's Request() method.

`SubmitTxAndWait()`

`SubmitTxBlobAndWait()`

`TxRequest`

`Request()`

- JavaScript
- Python
- Java
- PHP
- Go

```
// Check transaction results -------------------------------------------------
  console.log("Transaction result:", tx.result.meta.TransactionResult)
  console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
```

CautionXRP Ledger APIs may return tentative results from ledger versions that have not yet been validated. For example, in tx method response, be sure to look for "validated": true to confirm that the data comes from a validated ledger version. Transaction results that are not from a validated ledger version are subject to change. For more information, see Finality of Results.

`"validated": true`

Check transaction status


## Differences for Production

To send an XRP payment on the production XRP Ledger, the steps you take are largely the same. However, there are some key differences in the necessary setup:

- Getting real XRP isn't free.
- You must connect to a server that's synced with the production XRP Ledger network.


### Getting a Real XRP Account

This tutorial uses a button to get an address that's already funded with Test Net XRP, which only works because Test Net XRP is not worth anything. For actual XRP, you need to get XRP from someone who already has some. (For example, you might buy it on an exchange.) You can generate an address and secret that'll work on either production or the Testnet as follows:

- JavaScript
- Python
- Java
- PHP
- Go

```
const wallet = new xrpl.Wallet()
console.log(wallet.address) // Example: rGCkuB7PBr5tNy68tPEABEtcdno4hE6Y7f
console.log(wallet.seed) // Example: sp6JS7f14BuwFY8Mw6bTtLKWauoUs
```

WarningYou should only use an address and secret that you generated securely, on your local machine. If another computer generated the address and secret and sent it to you over a network, it's possible that someone else on the network may see that information. If they do, they'll have as much control over your XRP as you do. It's also recommended not to use the same address for the Testnet and Mainnet, because transactions that you created for use on one network could also be valid to execute on the other network, depending on the parameters you provided.

Generating an address and secret doesn't get you XRP directly; you're only choosing a random number. You must also receive XRP at that address to fund the account. A common way to acquire XRP is to buy it from an exchange, then withdraw it to your own address.


### Connecting to the Production XRP Ledger

When you instantiate your client's connect to the XRP Ledger, you must specify a server that's synced with the appropriate network. For many cases, you can use public servers, such as in the following example:

- JavaScript
- Python
- Java
- PHP
- Go

```
const xrpl = require('xrpl')
const api = new xrpl.Client('wss://xrplcluster.com')
api.connect()
```

If you install rippled yourself, it connects to the production network by default. (You can also configure it to connect to the test net instead.) After the server has synced (typically within about 15 minutes of starting it up), you can connect to it locally, which has various benefits. The following example shows how to connect to a server running the default configuration:

`rippled`

- JavaScript
- Python
- Java
- PHP
- Go

```
const xrpl = require('xrpl')
const api = new xrpl.Client('ws://localhost:6006')
api.connect()
```

TipThe local connection uses an unencrypted protocol (ws or http) rather than the TLS-encrypted version (wss or https). This is secure only because the communications never leave the same machine, and is easier to set up because it does not require a TLS certificate. For connections on an outside network, always use wss or https.

`ws`

`http`

`wss`

`https`

`wss`

`https`


## Next Steps

After completing this tutorial, you may want to try the following:

- Issue a token on the XRP Ledger Testnet.
- Trade in the Decentralized Exchange.
- Build Reliable transaction submission for production systems.
- Check your client library's API reference for the full range of XRP Ledger functionality.
- Customize your Account Settings.
- Learn how Transaction Metadata describes the outcome of a transaction in detail.
- Explore more Payment Types such as Escrows and Payment Channels.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=177eb109-6492-4d64-82a6-24de9bb95d1c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=177eb109-6492-4d64-82a6-24de9bb95d1c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=26aa43ca-d82a-4094-b9df-022a51113dcc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=26aa43ca-d82a-4094-b9df-022a51113dcc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a2be2ac1-8555-493c-8c29-b1fe3afe6e42&bo=1&sid=65bd6ed09d9d11f08f5abf0382f16887&vid=65bda8e09d9d11f0bee0ff94f04a4093&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Send%20XRP&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&r=&lt=3054&evt=pageLoad&sv=2&cdb=AQAS&rn=559082)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=066e5534-8530-4d37-b00c-d2d41d0e56fa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=066e5534-8530-4d37-b00c-d2d41d0e56fa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb38bc1e-cf33-472f-8202-9e3ff29bf20d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb38bc1e-cf33-472f-8202-9e3ff29bf20d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7decf6d1-f70d-477e-ba12-becc7b2c26cb&pt=Send%20XRP&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fsend-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/send-xrp#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/send-xrp#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/send-xrp#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/send-xrp#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.fdb66bf3dbfbf54e8c2d4dad00ced3db.1759195978726.1759195978726.1759195978726.1&__hssc=78174987.1.1759195978726&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/send-xrp.md)
- [Code Samples](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [xrpl-py library](https://xrpl-py.readthedocs.io/)
- [xrpl4j library](https://github.com/XRPLF/xrpl4j)
- [XRPL_PHP library](https://github.com/AlexanderBuzz/xrpl-php)
- [xrpl-go library](https://github.com/Peersyst/xrpl-go)
- [xrpl.transaction.safe_sign_transaction() method](https://xrpl-py.readthedocs.io/en/latest/source/xrpl.transaction.html#xrpl.transaction.safe_sign_transaction)
- [SignatureService](https://javadoc.io/doc/org.xrpl/xrpl4j-crypto-core/latest/org/xrpl/xrpl4j/crypto/signing/SignatureService.html)
- [SingleKeySignatureService](https://javadoc.io/doc/org.xrpl/xrpl4j-crypto-bouncycastle/latest/org/xrpl/xrpl4j/crypto/signing/SingleKeySignatureService.html)
- [sign() method of a Wallet instance](https://alexanderbuzz.github.io/xrpl-php-docs/wallet.html#signing-a-transaction)
- [Sign() method of the Wallet package](https://pkg.go.dev/github.com/Peersyst/xrpl-go@v0.1.12/xrpl/wallet)
- [xrpl.transaction.submit_and_wait() method](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.transaction.html#xrpl.transaction.submit_and_wait)
- [XrplClient.submit(SignedTransaction) method](https://javadoc.io/doc/org.xrpl/xrpl4j-client/latest/org/xrpl/xrpl4j/client/XrplClient.html#submit(org.xrpl.xrpl4j.crypto.signing.SignedTransaction))
- [XrplClient.ledger()](https://javadoc.io/doc/org.xrpl/xrpl4j-client/latest/org/xrpl/xrpl4j/client/XrplClient.html#ledger(org.xrpl.xrpl4j.model.client.ledger.LedgerRequestParams))
- [submitAndWait() method of the Client](https://alexanderbuzz.github.io/xrpl-php-docs/client.html)
- [SubmitTxAndWait() or SubmitTxBlobAndWait() methods os the Client](https://pkg.go.dev/github.com/Peersyst/xrpl-go@v0.1.12/xrpl/websocket#Client.SubmitTxAndWait)
- [xrpl.transaction.submit_and_wait() method](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.transaction.html#xrpl.transaction.submit_and_wait)
- [XrplClient.transaction() method](https://javadoc.io/doc/org.xrpl/xrpl4j-client/latest/org/xrpl/xrpl4j/client/XrplClient.html#transaction(org.xrpl.xrpl4j.model.client.transactions.TransactionRequestParams,java.lang.Class))
- [XrplClient.ledger()](https://javadoc.io/doc/org.xrpl/xrpl4j-client/latest/org/xrpl/xrpl4j/client/XrplClient.html#ledger(org.xrpl.xrpl4j.model.client.ledger.LedgerRequestParams))
- [.submitAndWait() method](https://alexanderbuzz.github.io/xrpl-php-docs/client.html)
- [submit_and_wait()](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.transaction.html#xrpl.transaction.submit_and_wait)
- [xrpl.transaction.get_transaction_from_hash() method](https://xrpl-py.readthedocs.io/en/latest/source/xrpl.transaction.html#xrpl.transaction.get_transaction_from_hash)
- [XrplClient.transaction()](https://javadoc.io/doc/org.xrpl/xrpl4j-client/latest/org/xrpl/xrpl4j/client/XrplClient.html#transaction(org.xrpl.xrpl4j.model.client.transactions.TransactionRequestParams,java.lang.Class))
- [$client->syncRequest()](https://alexanderbuzz.github.io/xrpl-php-docs/client.html)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.fdb66bf3dbfbf54e8c2d4dad00ced3db.1759195978726.1759195978726.1759195978726.1&__hssc=78174987.1.1759195978726&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:33:20.662Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
