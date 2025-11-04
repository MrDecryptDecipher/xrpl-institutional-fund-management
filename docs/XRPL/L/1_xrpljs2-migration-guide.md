# Migration Guide for ripple-lib 1.x to xrpl.js 2.x
URL: https://xrpl.org/docs/references/xrpljs2-migration-guide
Section: L1

## Overview


## Extracted Content
# Migration Guide for ripple-lib 1.x to xrpl.js 2.x

Follow these instructions to migrate JavaScript / TypeScript code using the ripple-lib (1.x) library to use the xrpl.js (2.x) library for the XRP Ledger instead.

TipYou can still access documentation for the legacy 1.x "RippleAPI" if necessary.


## High-Level Differences

Many fields and functions have "new" names in xrpl.js v2.0; or more accurately, xrpl.js now uses the same names as the HTTP / WebSocket APIs. Structures that were unique to ripple-lib such as an orderCancellation object are gone; in their place the library uses the XRP Ledger's native transaction types like "OfferCancel". Many API methods that return these structures in ripple-lib 1.x are gone; with 2.0, you make requests and get responses in the same format as in the WebSocket API.

`orderCancellation`

The catch-all RippleAPI class from ripple-lib 1.x is also gone. With xrpl.js 2.x, there's a Client class to handle network operations, and all other operations are strictly offline. There's a new Wallet class for addresses & keys, and other classes and properties under the top-level xrpl object.

`RippleAPI`

`Client`

`Wallet`

`xrpl`


## Boilerplate Comparison

ripple-lib 1.10.0:

```
const ripple = require('ripple-lib');

(async function() {
  const api = new ripple.RippleAPI({
    server: 'wss://xrplcluster.com'
  });

  await api.connect();

  // Your code here

  api.disconnect();
})();
```

xrpl.js 2.0.0:

```
const xrpl = require("xrpl");

(async function() {
  const client = new xrpl.Client('wss://xrplcluster.com');

  await client.connect();

  // Your code here

  client.disconnect();
})();
```


## Validated Results

By default, most methods in ripple-lib 1.x only returned results that were validated by the consensus process and therefore final.  The xrpl.js equivalents of many methods use the Client.request() method to call the WebSocket API, where the XRP Ledger server's default settings often use the current (pending) ledger to serve data which is not final.

`Client.request()`

Sometimes you want to use the current open ledger because it has the pending results of many transactions that are likely to succeed, such as when looking up the state of the decentralized exchange. In other cases, you want to use a validated ledger, which only incorporates the results of transactions that are finalized.

When making API requests with xrpl.js 2.0 using Client.request(), you should explicitly specify what ledger to use. For example, to look up trust lines using the latest validated ledger:

`Client.request()`

ripple-lib 1.x:

```
const trustlines = await api.getTrustlines("rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn")
console.log(trustlines)
```

xrpl.js 2.0:

```
const trustlines = await client.request({
  "command": "account_lines",
  "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "ledger_index": "validated"
})
console.log(trustlines.result)
```


## Transaction Submission

In xrpl.js, there are specific helper functions for signing and submitting transactions and waiting for the XRP Ledger blockchain to confirm those transactions' final outcomes:

- Use submitAndWait() to submit a transaction and wait for its final outcome. If the transaction becomes validated, this resolves to a tx method response; otherwise, it raises an exception. An exception does not guarantee that the transaction was not validated. For example, if the server has a ledger gap, then the transaction could have been validated in that gap.
- Use submit() to submit and return immediately. This resolves to a submit method response, which shows the preliminary (non-final) result. This method only raises an exception if there was a problem sending the transaction to the XRP Ledger server.

`submitAndWait()`

`submit()`

For both methods, you can pass a signed transaction to the method directly, or you can sign the transaction right before submitting, by passing prepared transaction instructions and a Wallet instance.

`Wallet`

```
const tx_json = await client.autofill({
  "TransactionType": "AccountSet",
  "Account": wallet.address, // "wallet" is an instance of the Wallet class
  "SetFlag": xrpl.AccountSetAsfFlags.asfRequireDest
})
try {
  const submit_result = await client.submitAndWait(tx_json, wallet)
  // submitAndWait() doesn't return until the transaction has a final result.
  // Raises XrplError if the transaction doesn't get confirmed by the network.
  // Does not handle disaster recovery.
  console.log("Transaction result:", submit_result)
} catch(err) {
  console.log("Error submitting transaction:", err)
}
```

Alternatively, you can use the sign method of a wallet to sign a transaction and then use submitAndWait(tx_blob) to submit it. This can be useful for building reliable transaction submission that can recover from power outages and other disasters. (The library does not handle disaster recovery on its own.)

`sign`

`submitAndWait(tx_blob)`


### Controlling LastLedgerSequence

In ripple-lib 1.x, you could specify a instructions.maxLedgerVersionOffset when preparing a transaction to define the LastLedgerSequence parameter of the prepared transaction as being some number of ledgers after the latest validated one at the time. In 2.0, you can do this by looking up the latest validated ledger index, then specifying the LastLedgerSequence explicitly before auto-filling the transaction.

`instructions.maxLedgerVersionOffset`

`LastLedgerSequence`

`LastLedgerSequence`

xrpl.js 2.0:

```
const vli = await client.getLedgerIndex()

const prepared = await client.autofill({
  "TransactionType": "Payment",
  "Account": sender,
  "Amount": xrpl.xrpToDrops("50.2"),
  "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  "LastLedgerSequence": vli+75 // gives ~5min, rather than the default ~1min
})
```

Like the old prepare methods, Client.autofill() provides a reasonable LastLedgerSequence value by default. To prepare a transaction without a LastLedgerSequence field, provide a LastLedgerSequence with the value null:

`Client.autofill()`

`LastLedgerSequence`

`LastLedgerSequence`

`LastLedgerSequence`

`null`

```
const prepared = await client.autofill({
  "TransactionType": "Payment",
  "Account": sender,
  "Amount": xrpl.xrpToDrops("50.2"),
  "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  "LastLedgerSequence": null // Transaction never expires
})
```


## Keys and Wallets

xrpl.js 2.0 introduces a new Wallet class for managing cryptographic keys and signing transactions. This replaces functions that took seed or secret values in ripple-lib 1.x, and handles various address encoding and generation tasks as well.

`Wallet`


### Generating Keys

ripple-lib 1.x:

```
const api = new RippleAPI()
const {address, secret} = api.generateAddress({algorithm: "ed25519"})
console.log(address, secret)
// rJvMQ3cwtyrNpVJDTW4pZzLnGeovHcdE6E s████████████████████████████
```

xrpl.js 2.0:

```
const wallet = xrpl.Wallet.generate("ed25519")
console.log(wallet)
// Wallet {
//   publicKey: 'ED872A4099B61B0C187C6A27258F49B421AC384FBAD23F31330E666A5F50E0ED7E',
//   privateKey: 'ED224D2BDCF6382030C7612654D2118C5CEE16344C81CB36EC7A01EC7D95C5F737',
//   classicAddress: 'rMV3CPSXAdRpW96bvvnSu4zHTZ6ETBkQkd',
//   seed: 's████████████████████████████'
// }
```


### Deriving from Seed and Signing

ripple-lib 1.x:

```
const api = new RippleAPI()
const seed = 's████████████████████████████';
const keypair = api.deriveKeypair(seed)
const address = api.deriveAddress(keypair.publicKey)
const tx_json = {
  "Account": address,
  "TransactionType":"Payment",
  "Destination":"rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  "Amount":"13000000",
  "Flags":2147483648,
  "LastLedgerSequence":7835923,
  "Fee":"13",
  "Sequence":2
}
const signed = api.sign(JSON.stringify(tx_json), seed)
```

xrpl.js 2.0:

```
const wallet = xrpl.Wallet.fromSeed('s████████████████████████████')
const tx_json = {
  "Account": wallet.address,
  "TransactionType":"Payment",
  "Destination":"rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  "Amount":"13000000",
  "Flags":2147483648,
  "LastLedgerSequence":7835923,
  "Fee":"13",
  "Sequence":2
}
const signed = wallet.sign(tx_json)
```


## Events and Subscriptions

In 1.x, you could subscribe to ledger events and API errors using the .on() method of the RippleAPI class; or you could subscribe to specific WebSocket message types using .connection.on(). These have been merged into the Client.on() method. Additionally, the client library no longer automatically subscribes to ledger close events when connecting to an XRP Ledger server. To get ledger close events, you still add a handler, but you must also explicitly subscribe to the ledger stream.

`.on()`

`RippleAPI`

`.connection.on()`

`Client.on()`

To subscribe to ledger close events, use Client.request(method) to call the subscribe method with "streams": ["ledger"]. To attach event handlers, use Client.on(event_type, callback). You can make these calls in either order.

`Client.request(method)`

`"streams": ["ledger"]`

`Client.on(event_type, callback)`

The RippleAPI-specific ledger event type from 1.x has been removed; instead, use ledgerClosed events. These event messages contain the same data, but the format matches the Ledger Stream messages in the WebSocket API.

`ledger`

`ledgerClosed`

Example:

ripple-lib 1.x:

```
api.on("ledger", (ledger) => {
  console.log(`Ledger #${ledger.ledgerVersion} closed!
    It contains ${ledger.transactionCount} transaction(s) and has
    the ledger_hash ${ledger.ledgerHash}.`
  )
})
// "ledger" events happen automatically while API is connected.
```

xrpl.js 2.0:

```
client.on("ledgerClosed", (ledger) => {
  console.log(`Ledger #${ledger.ledger_index} closed!
    It contains ${ledger.txn_count} transaction(s) and has
    the ledger_hash ${ledger.ledger_hash}.`
  )
})
// Must explicitly subscribe to the "ledger" stream to get "ledgerClosed" events
client.request({
  "command": "subscribe",
  "streams": ["ledger"]
})
```


## Reference of Equivalents

In ripple-lib 1.x all methods and properties were on instances of the RippleAPI class. In xrpl.js 2.x, some methods are static methods of the library and some methods belong to specific classes. In the following table, the notation Client.method() means that method() belongs to instances of the Client class.

`RippleAPI`

`Client.method()`

`method()`

`Client`

Note: The following table has 3 columns. You may need to scroll horizontally to see all the information.

| RippleAPI instance method / property | xrpl.js method / property | Notes |
| --- | --- | --- |
| new ripple.RippleAPI({server: url}) | new xrpl.Client(url) | Use xrpl.BroadcastClient([url1, url2, ..]) to connect to multiple servers. |
| request(command, options) | Client.request(options) | The command field moved into the options object for consistency with the WebSocket API. In 1.x the return value of this method (when the Promise resolves) was only the result object. Now it returns the whole WebSocket response format; to get the equivalent value, read the result field of the return value. |
| hasNextPage() | xrpl.hasNextPage(response) | See also: Client.requestNextPage() and Client.requestAll() |
| requestNextPage() | Client.requestNextPage() |  |
| computeBinaryTransactionHash() | xrpl.hashes.hashTx() |  |
| classicAddressToXAddress() | xrpl.classicAddressToXAddress() | Now a static method on the module. |
| xAddressToClassicAddress() | xrpl.xAddressToClassicAddress() | Now a static method on the module. |
| renameCounterpartyToIssuer(object) | (Removed - see Notes column) | No longer needed because xrpl.js always uses issuer already. |
| formatBidsAndAsks() | (Removed - see Notes column) | No longer needed after changes to getOrderbook(). |
| connect() | Client.connect() |  |
| disconnect() | Client.disconnect() |  |
| isConnected() | Client.isConnected() |  |
| getServerInfo() | (Removed - see Notes column) | Use Client.request() to call the server_info method instead. |
| getFee() | (Removed - see Notes column) | Use Client.autofill() to provide a sensible transaction cost automatically, or use Client.request({"command": "fee"}) to look up information about the current transaction cost (in drops of XRP). |
| getLedgerVersion() | Client.getLedgerIndex() |  |
| getTransaction() | Client.request() | Use Client.request() to call the tx method instead. Warning: Unlike getTransaction(), the tx method can return results that are not validated and final. Be sure to look for "validated": true in the response object before taking action in response to a transaction. |
| getTransactions() | (Removed - see Notes column) | Use Client.request() to call the account_tx method instead. |
| getTrustlines() | (Removed - see Notes column) | Use Client.request() to call account_lines method instead. Warning: Unlike getTrustlines(), account_lines can return results that are not validated and final. |
| getBalances() | Client.getBalances() |  |
| getBalanceSheet() | (Removed - see Notes column) | Use Client.getBalances() instead, or use Client.request() to call the gateway_balances method. |
| getPaths() | (Removed - see Notes column) | Use Client.request() to call ripple_path_find method instead. |
| getOrders() | (Removed - see Notes column) | Use Client.request() to call the account_offers method instead. |
| getOrderbook() | Client.getOrderbook() |  |
| getSettings() | (Removed - see Notes column) | Use Client.request() to call the account_info method instead. Use xrpl.parseAccountRootFlags() on the Flags field to get the boolean values of individual flag settings. Warning: Unlike getSettings(), account_info can return results that are not validated and final. |
| getAccountInfo(address, options) | (Removed - see Notes column) | Use Client.request() to call the account_info method instead. Warning: Unlike getAccountInfo(), account_info can return results that are not validated and final. |
| getAccountObjects(address, options) | (Removed - see Notes column) | Use Client.request() to call the account_objects method instead. Warning: Unlike getAccountObjects(), account_objects can return results that are not validated and final. |
| getPaymentChannel() | (Removed - see Notes column) | Use Client.request() to call the ledger_entry method instead. Warning: Unlike getPaymentChannel(), ledger_entry can return results that are not validated and final. |
| getLedger() | (Removed - see Notes column) | Use Client.request() to call the ledger method exactly. Warning: Unlike getLedger(), ledger can return ledgers that are not validated and final. |
| parseAccountFlags() | xrpl.parseAccountRootFlags() | Now a static method on the module. |
| prepareTransaction() | Client.autofill() | See Transaction Submission for details. |
| preparePayment() | (Removed - see Notes column) | Construct a Payment transaction and use Client.autofill() instead. |
| prepareTrustline() | (Removed - see Notes column) | Construct a TrustSet transaction and use Client.autofill() instead. |
| prepareOrder() | (Removed - see Notes column) | Construct an OfferCreate transaction and use Client.autofill() instead. |
| prepareOrderCancellation() | (Removed - see Notes column) | Construct an OfferCancel transaction and use Client.autofill() and use Client.autofill() instead. |
| prepareSettings() | (Removed - see Notes column) | For most settings, construct an AccountSet transaction instead. To rotate change a regular key, construct a SetRegularKey transaction. To add or update multi-signing settings, construct a SignerListSet transaction instead. In all three cases, use Client.autofill() to prepare the transaction. |
| prepareEscrowCreation() | (Removed - see Notes column) | Construct an EscrowCreate transaction and use Client.autofill() instead. |
| prepareEscrowCancellation() | (Removed - see Notes column) | Construct an EscrowCancel transaction and use Client.autofill() instead. |
| prepareEscrowExecution() | (Removed - see Notes column) | Construct an EscrowFinish transaction and use Client.autofill() instead. |
| preparePaymentChannelCreate() | (Removed - see Notes column) | Construct a PaymentChannelCreate transaction and use Client.autofill() instead. |
| preparePaymentChannelClaim() | (Removed - see Notes column) | Construct a PaymentChannelClaim transaction and use Client.autofill() instead. |
| preparePaymentChannelFund() | (Removed - see Notes column) | Construct a PaymentChannelFund transaction and use Client.autofill() instead. |
| prepareCheckCreate() | (Removed - see Notes column) | Construct a CheckCreate transaction and use Client.autofill() instead. |
| prepareCheckCancel() | (Removed - see Notes column) | Construct a CheckCancel transaction and use Client.autofill() instead. |
| prepareCheckCash() | (Removed - see Notes column) | Construct a CheckCash transaction and use Client.autofill() instead. |
| prepareTicketCreate() | (Removed - see Notes column) | Construct a TicketCreate transaction and use Client.autofill() instead. |
| sign() | Wallet.sign() | See Keys and Wallets for details. |
| combine() | xrpl.multisign() |  |
| submit() | Client.submit() | Reliable transaction submission is now also available; for details, see Transaction Submission. |
| generateXAddress() | xrpl.Wallet.generate() | Create a Wallet instance with xrpl.Wallet.generate() then call .getXAddress() on the wallet instance to get an X-address. See Keys and Wallets for details. |
| generateAddress() | xrpl.Wallet.generate() | Creates a Wallet instance. See Keys and Wallets for details. |
| isValidAddress() | xrpl.isValidAddress() | Now a static method on the module. |
| isValidSecret() | xrpl.isValidSecret() | Now a static method on the module. |
| deriveKeypair() | xrpl.deriveKeypair() | Now a static method on the module. |
| deriveAddress() | (Removed - see Notes column) | Use xrpl.decodeXAddress() to get an X-address from a public key, then use xAddressToClassicAddress() to get the classic address if necessary. |
| generateFaucetWallet() | Client.fundWallet() | The on_testnet boolean has been removed; the library automatically picks the Devnet or Testnet faucet as appropriate for the network you're connected to. You can optionally provide a Wallet instance to have the faucet fund/refill the associated address; otherwise, the method creates a new Wallet instance. The return value now resolves to an object in the form {wallet: <object: Wallet instance>, balance: <str: drops of XRP>} |
| signPaymentChannelClaim() | xrpl.signPaymentChannelClaim() | Now a static method on the module. |
| verifyPaymentChannelClaim() | xrpl.verifyPaymentChannelClaim() | Now a static method on the module. |
| computeLedgerHash() | xrpl.hashes.hashLedger() |  |
| xrpToDrops() | xrpl.xrpToDrops() | Now a static method on the module. |
| dropsToXrp() | xrpl.dropsToXrp() | Now a static method on the module. |
| iso8601ToRippleTime() | xrpl.isoTimeToRippleTime() | Now a static method on the module. |
| rippleTimeToISO8601() | xrpl.rippleTimeToISOTime() | Now a static method on the module. You can also use the new method rippleTimeToUnixTime() to get a UNIX-style timestamp in milliseconds since the UNIX epoch of 1970-01-01 00:00:00 UTC. |
| txFlags.Universal.FullyCanonicalSig | (Removed - see Notes column) | No longer needed following the RequireFullyCanonicalSig amendment. |
| txFlags.Payment.NoRippleDirect | xrpl.PaymentFlags.tfNoDirectRipple |  |
| txFlags.Payment.PartialPayment | xrpl.PaymentFlags.tfPartialPayment |  |
| txFlags.Payment.LimitQuality | xrpl.PaymentFlags.tfLimitQuality |  |
| txFlags.OfferCreate.Passive | xrpl.OfferCreateFlags.tfPassive |  |
| txFlags.OfferCreate.ImmediateOrCancel | xrpl.OfferCreateFlags.tfImmediateOrCancel |  |
| txFlags.OfferCreate.FillOrKill | xrpl.OfferCreateFlags.tfFillOrKill |  |
| txFlags.OfferCreate.Sell | xrpl.OfferCreateFlags.tfSell |  |
| accountSetFlags | xrpl.AccountSetAsfFlags | Now an Enum at the module level. |
| schemaValidator | (Removed - see Notes column) | Use TypeScript to validate most types. |
| schemaValidate() | (Removed - see Notes column) | Use TypeScript to validate most types. You can also call xrpl.validate(transaction) to validate transaction objects. |
| .on("ledger", callback) | Client.on("ledgerClosed", callback) | Caution: Must also subscribe to the ledger stream. For examples and details, see Events and Subscriptions. |
| .on("error", callback) | Client.on("error", callback) |  |
| .on("connected", callback) | Client.on("connected", callback) |  |
| .on("disconnected", callback) | Client.on("connected", callback) |  |


`new ripple.RippleAPI({server: url})`

`new xrpl.Client(url)`

`xrpl.BroadcastClient([url1, url2, ..])`

`request(command, options)`

`Client.request(options)`

`command`

`options`

`result`

`result`

`hasNextPage()`

`xrpl.hasNextPage(response)`

`Client.requestNextPage()`

`Client.requestAll()`

`requestNextPage()`

`Client.requestNextPage()`

`computeBinaryTransactionHash()`

`xrpl.hashes.hashTx()`

`classicAddressToXAddress()`

`xrpl.classicAddressToXAddress()`

`xAddressToClassicAddress()`

`xrpl.xAddressToClassicAddress()`

`renameCounterpartyToIssuer(object)`

`issuer`

`formatBidsAndAsks()`

`getOrderbook()`

`connect()`

`Client.connect()`

`disconnect()`

`Client.disconnect()`

`isConnected()`

`Client.isConnected()`

`getServerInfo()`

`Client.request()`

`getFee()`

`Client.autofill()`

`Client.request({"command": "fee"})`

`getLedgerVersion()`

`Client.getLedgerIndex()`

`getTransaction()`

`Client.request()`

`Client.request()`

`getTransaction()`

`tx`

`"validated": true`

`getTransactions()`

`Client.request()`

`getTrustlines()`

`Client.request()`

`getTrustlines()`

`account_lines`

`getBalances()`

`Client.getBalances()`

`getBalanceSheet()`

`Client.getBalances()`

`Client.request()`

`getPaths()`

`Client.request()`

`getOrders()`

`Client.request()`

`getOrderbook()`

`Client.getOrderbook()`

`getSettings()`

`Client.request()`

`xrpl.parseAccountRootFlags()`

`Flags`

`getSettings()`

`account_info`

`getAccountInfo(address, options)`

`Client.request()`

`getAccountInfo()`

`account_info`

`getAccountObjects(address, options)`

`Client.request()`

`getAccountObjects()`

`account_objects`

`getPaymentChannel()`

`Client.request()`

`getPaymentChannel()`

`ledger_entry`

`getLedger()`

`Client.request()`

`getLedger()`

`ledger`

`parseAccountFlags()`

`xrpl.parseAccountRootFlags()`

`prepareTransaction()`

`Client.autofill()`

`preparePayment()`

`Client.autofill()`

`prepareTrustline()`

`Client.autofill()`

`prepareOrder()`

`Client.autofill()`

`prepareOrderCancellation()`

`Client.autofill()`

`Client.autofill()`

`prepareSettings()`

`Client.autofill()`

`prepareEscrowCreation()`

`Client.autofill()`

`prepareEscrowCancellation()`

`Client.autofill()`

`prepareEscrowExecution()`

`Client.autofill()`

`preparePaymentChannelCreate()`

`Client.autofill()`

`preparePaymentChannelClaim()`

`Client.autofill()`

`preparePaymentChannelFund()`

`Client.autofill()`

`prepareCheckCreate()`

`Client.autofill()`

`prepareCheckCancel()`

`Client.autofill()`

`prepareCheckCash()`

`Client.autofill()`

`prepareTicketCreate()`

`Client.autofill()`

`sign()`

`Wallet.sign()`

`combine()`

`xrpl.multisign()`

`submit()`

`Client.submit()`

`generateXAddress()`

`xrpl.Wallet.generate()`

`Wallet`

`xrpl.Wallet.generate()`

`.getXAddress()`

`generateAddress()`

`xrpl.Wallet.generate()`

`Wallet`

`isValidAddress()`

`xrpl.isValidAddress()`

`isValidSecret()`

`xrpl.isValidSecret()`

`deriveKeypair()`

`xrpl.deriveKeypair()`

`deriveAddress()`

`xrpl.decodeXAddress()`

`xAddressToClassicAddress()`

`generateFaucetWallet()`

`Client.fundWallet()`

`on_testnet`

`Wallet`

`{wallet: <object: Wallet instance>, balance: <str: drops of XRP>}`

`signPaymentChannelClaim()`

`xrpl.signPaymentChannelClaim()`

`verifyPaymentChannelClaim()`

`xrpl.verifyPaymentChannelClaim()`

`computeLedgerHash()`

`xrpl.hashes.hashLedger()`

`xrpToDrops()`

`xrpl.xrpToDrops()`

`dropsToXrp()`

`xrpl.dropsToXrp()`

`iso8601ToRippleTime()`

`xrpl.isoTimeToRippleTime()`

`rippleTimeToISO8601()`

`xrpl.rippleTimeToISOTime()`

`rippleTimeToUnixTime()`

`txFlags.Universal.FullyCanonicalSig`

`txFlags.Payment.NoRippleDirect`

`xrpl.PaymentFlags.tfNoDirectRipple`

`txFlags.Payment.PartialPayment`

`xrpl.PaymentFlags.tfPartialPayment`

`txFlags.Payment.LimitQuality`

`xrpl.PaymentFlags.tfLimitQuality`

`txFlags.OfferCreate.Passive`

`xrpl.OfferCreateFlags.tfPassive`

`txFlags.OfferCreate.ImmediateOrCancel`

`xrpl.OfferCreateFlags.tfImmediateOrCancel`

`txFlags.OfferCreate.FillOrKill`

`xrpl.OfferCreateFlags.tfFillOrKill`

`txFlags.OfferCreate.Sell`

`xrpl.OfferCreateFlags.tfSell`

`accountSetFlags`

`xrpl.AccountSetAsfFlags`

`schemaValidator`

`schemaValidate()`

`xrpl.validate(transaction)`

`.on("ledger", callback)`

`Client.on("ledgerClosed", callback)`

`.on("error", callback)`

`Client.on("error", callback)`

`.on("connected", callback)`

`Client.on("connected", callback)`

`.on("disconnected", callback)`

`Client.on("connected", callback)`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2ed077f1-9d9a-4697-b20b-878af3bb5aed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2ed077f1-9d9a-4697-b20b-878af3bb5aed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a7e20d36-194b-4558-beed-a313769c3cab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a7e20d36-194b-4558-beed-a313769c3cab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=3b1014e4-9618-489a-a327-05e330b09913&bo=1&sid=af0602609da411f0a220039a95b89846&vid=af0671009da411f0b4aea7394aa24865&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&r=&lt=3786&evt=pageLoad&sv=2&cdb=AQAS&rn=943458)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=150b0891-eb84-4332-bf3a-b0735fac973e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=150b0891-eb84-4332-bf3a-b0735fac973e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=580e8394-7483-4c8d-adac-1b3db3b2ba9a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=580e8394-7483-4c8d-adac-1b3db3b2ba9a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89bc65f4-8fbd-447a-9e7d-9ab397bb1434&pt=Migration%20Guide%20for%20ripple-lib%201.x%20to%20xrpl.js%202.x&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrpljs2-migration-guide&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/xrpljs2-migration-guide#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/xrpljs2-migration-guide#)
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
- [Resources](https://xrpl.org/docs/references/xrpljs2-migration-guide#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/xrpljs2-migration-guide#)
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
- [References](https://xrpl.org/docs/references)
- [XRP Ledger Protocol Reference](https://xrpl.org/docs/references/protocol)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Python Client Library](https://xrpl-py.readthedocs.io/)
- [Java Client Library](https://javadoc.io/doc/org.xrpl/)
- [Ruby Client Library](https://www.rubydoc.info/gems/xrbp)
- [Go Client Library](https://pkg.go.dev/github.com/Peersyst/xrpl-go)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/xrpljs2-migration-guide.md)
- [documentation for the legacy 1.x "RippleAPI"](https://github.com/XRPLF/xrpl.js/blob/1.x/docs/index.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:25:30.262Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
