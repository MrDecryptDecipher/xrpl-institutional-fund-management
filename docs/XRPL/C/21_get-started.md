# Get Started Using JavaScript Library
URL: https://xrpl.org/docs/tutorials/javascript/build-apps/get-started?environment=Node
Section: C21

## Overview


## Extracted Content
# Get Started Using JavaScript Library

This tutorial guides you through the basics of building an XRP Ledger-connected application in JavaScript using the xrpl.js client library in either Node.js or web browsers.

`xrpl.js`


## Goals

In this tutorial, you'll learn:

- The basic building blocks of XRP Ledger-based applications.
- How to connect to the XRP Ledger using xrpl.js.
- How to get an account on the Testnet using xrpl.js.
- How to use the xrpl.js library to look up information about an account on the XRP Ledger.
- How to put these steps together to create a JavaScript app or web-app.

`xrpl.js`

`xrpl.js`

`xrpl.js`


## Prerequisites

To complete this tutorial, you should meet the following guidelines:

- Have some familiarity with writing code in JavaScript.
- Have installed Node.js version 20 or later in your development environment.
- If you want to build a web application, any modern web browser with JavaScript support should work fine.


## Source Code

Click Download on the top right of the code preview panel to download the source code.


## Steps

Follow the steps to create a simple application with xrpl.js.

`xrpl.js`


### 1. Install Dependencies

Start a new project by creating an empty folder, then move into that folder and use NPM to install the latest version of xrpl.js:

```
npm install xrpl
```

This updates your package.json file, or creates a new one if it didn't already exist.

`package.json`

Your package.json file should look something like this:

`package.json`

```
{
  "dependencies": {
    "xrpl": "^4.4.0"
  },
  "type": "module"
}
```


### 2. Connect to the XRP Ledger


#### Connect to the XRP Ledger Testnet

To make queries and submit transactions, you need to connect to the XRP Ledger. To do this with xrpl.js, you create an instance of the Client class and use the connect() method.

`xrpl.js`

`Client`

`connect()`

TipMany network functions in xrpl.js use Promises to return values asynchronously. The code samples here use the async/await pattern to wait for the actual result of the Promises.

`xrpl.js`

`async/await`

The sample code shows you how to connect to the Testnet, which is one of the available parallel networks.


#### Connect to the XRP Ledger Mainnet

When you're ready to move to production, you'll need to connect to the XRP Ledger Mainnet. You can do that in two ways:

- By installing the core server (rippled) and running a node yourself. The core server connects to the Mainnet by default, but you can change the configuration to use Testnet or Devnet. There are good reasons to run your own core server. If you run your own server, you can connect to it like so:const MY_SERVER = "ws://localhost:6006/"
const client = new xrpl.Client(MY_SERVER)
await client.connect()See the example core server config file for more information about default values.
- By using one of the available public servers:const PUBLIC_SERVER = "wss://xrplcluster.com/"
const client = new xrpl.Client(PUBLIC_SERVER)
await client.connect()

By installing the core server (rippled) and running a node yourself. The core server connects to the Mainnet by default, but you can change the configuration to use Testnet or Devnet. There are good reasons to run your own core server. If you run your own server, you can connect to it like so:

`rippled`

```
const MY_SERVER = "ws://localhost:6006/"
const client = new xrpl.Client(MY_SERVER)
await client.connect()
```

See the example core server config file for more information about default values.

By using one of the available public servers:

```
const PUBLIC_SERVER = "wss://xrplcluster.com/"
const client = new xrpl.Client(PUBLIC_SERVER)
await client.connect()
```


### 3. Get Account


#### Create and Fund a Wallet

The xrpl.js library has a Wallet class for handling the keys and address of an XRP Ledger account. On Testnet, you can fund a new account as shown in the example.

`xrpl.js`

`Wallet`


#### (Optional) Generate a Wallet Only

If you want to generate a wallet without funding it, you can create a new Wallet instance. Keep in mind that you need to send XRP to the wallet for it to be a valid account on the ledger.

`Wallet`


#### (Optional) Use Your Own Wallet Seed

To use an existing wallet seed encoded in base58, you can create a Wallet instance from it.

`Wallet`


### 4. Query the XRP Ledger

Use the Client's request() method to access the XRP Ledger's WebSocket API.

`request()`


### 5. Listen for Events

You can set up handlers for various types of events in xrpl.js, such as whenever the XRP Ledger's consensus process produces a new ledger version. To do that, first call the subscribe method to get the type of events you want, then attach an event handler using the on(eventType, callback) method of the client.

`xrpl.js`

`on(eventType, callback)`


### 6. Disconnect

Disconnect when done so Node.js can end the process. The example code waits 10 seconds before disconnecting to allow time for the ledger event listener to receive and display events.


### 7. Run the Application

Finally, in your terminal, run the application like so:

```
node get-acct-info.js
```

You should see output similar to the following:

```
Connected to Testnet

Creating a new wallet and funding it with Testnet XRP...
Wallet: rMnXR9p2sZT9iZ6ew3iEqvBMyPts1ADc4i
Balance: 10

Account Testnet Explorer URL: 
https://testnet.xrpl.org/accounts/rMnXR9p2sZT9iZ6ew3iEqvBMyPts1ADc4i

Getting account info...
{
  "api_version": 2,
  "id": 4,
  "result": {
    "account_data": {
      "Account": "rMnXR9p2sZT9iZ6ew3iEqvBMyPts1ADc4i",
      "Balance": "10000000",
      "Flags": 0,
      "LedgerEntryType": "AccountRoot",
      "OwnerCount": 0,
      "PreviousTxnID": "0FF9DB2FE141DD0DF82566A171B6AF70BB2C6EB6A53D496E65D42FC062C91A78",
      "PreviousTxnLgrSeq": 9949268,
      "Sequence": 9949268,
      "index": "4A9C9220AE778DC38C004B2B17A08E218416D90E01456AFCF844C18838B36D01"
    },
    "account_flags": {
      "allowTrustLineClawback": false,
      "defaultRipple": false,
      "depositAuth": false,
      "disableMasterKey": false,
      "disallowIncomingCheck": false,
      "disallowIncomingNFTokenOffer": false,
      "disallowIncomingPayChan": false,
      "disallowIncomingTrustline": false,
      "disallowIncomingXRP": false,
      "globalFreeze": false,
      "noFreeze": false,
      "passwordSpent": false,
      "requireAuthorization": false,
      "requireDestinationTag": false
    },
    "ledger_hash": "304C7CC2A33B712BE43EB398B399E290C191A71FCB71784F584544DFB7C441B0",
    "ledger_index": 9949268,
    "validated": true
  },
  "type": "response"
}

Listening for ledger close events...
Ledger #9949269 validated with 0 transactions!
Ledger #9949270 validated with 0 transactions!
Ledger #9949271 validated with 0 transactions!

Disconnected
```


## See Also

- Concepts:XRP Ledger OverviewClient Libraries
- XRP Ledger Overview
- Client Libraries
- Tutorials:Send XRPIssue a Fungible TokenSet up Secure Signing
- Send XRP
- Issue a Fungible Token
- Set up Secure Signing
- References:xrpl.js ReferencePublic API MethodsAPI Conventionsbase58 EncodingsTransaction Formats
- xrpl.js Reference
- Public API Methods
- API Conventionsbase58 Encodings
- base58 Encodings
- Transaction Formats

- XRP Ledger Overview
- Client Libraries

- Send XRP
- Issue a Fungible Token
- Set up Secure Signing

- xrpl.js Reference
- Public API Methods
- API Conventionsbase58 Encodings
- base58 Encodings
- Transaction Formats

`xrpl.js`

- base58 Encodings

```
// Import the library
import xrpl from "xrpl"

// Define the network client
const SERVER_URL = "wss://s.altnet.rippletest.net:51233/"
const client = new xrpl.Client(SERVER_URL)
await client.connect()
console.log("Connected to Testnet")

// Create a wallet and fund it with the Testnet faucet:
console.log("\nCreating a new wallet and funding it with Testnet XRP...")
const fund_result = await client.fundWallet()
const test_wallet = fund_result.wallet
console.log(`Wallet: ${test_wallet.address}`)
console.log(`Balance: ${fund_result.balance}`)
console.log('Account Testnet Explorer URL:')
console.log(`  https://testnet.xrpl.org/accounts/${test_wallet.address}`)

// To generate a wallet without funding it, uncomment the code below
// const test_wallet = xrpl.Wallet.generate()

// To provide your own seed, replace the test_wallet value with the below
// const test_wallet = xrpl.Wallet.fromSeed("your-seed-key")

// Get info from the ledger about the address we just funded
console.log("\nGetting account info...")
const response = await client.request({
  "command": "account_info",
  "account": test_wallet.address,
  "ledger_index": "validated"
})
console.log(JSON.stringify(response, null, 2))

// Listen to ledger close events
console.log("\nListening for ledger close events...")
client.request({
  "command": "subscribe",
  "streams": ["ledger"]
})
client.on("ledgerClosed", async (ledger) => {
  console.log(`Ledger #${ledger.ledger_index} validated ` +
              `with ${ledger.txn_count} transactions!`)
})

// Disconnect when done so Node.js can end the process.
// Delay this by 10 seconds to give the ledger event listener time to receive
// and display some ledger events.
setTimeout(async () => {
  await client.disconnect();
  console.log('\nDisconnected');
}, 10000);
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e10ae84e-6de7-43b4-b089-fd1ce0c7e664&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e10ae84e-6de7-43b4-b089-fd1ce0c7e664&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fec87ed5-c53e-4678-a925-22f5a88591f0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fec87ed5-c53e-4678-a925-22f5a88591f0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1bb125cc-796e-492f-aa96-a08f834bbd51&bo=1&sid=ad1e0e709d9c11f0a22203b680512839&vid=ad1ebfd09d9c11f0a38ca9c5fa34a3e8&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20JavaScript%20Library&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=805956)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=25a59a13-ab84-48cb-a7ad-b093a4f793b4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=25a59a13-ab84-48cb-a7ad-b093a4f793b4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=95ab3eca-eb90-4f5d-9daa-0bb2f25ed7a0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=95ab3eca-eb90-4f5d-9daa-0bb2f25ed7a0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a86a70a9-67f0-44af-aa1f-fe2a67c510dc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a86a70a9-67f0-44af-aa1f-fe2a67c510dc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=12cb3a8b-92d2-429c-926a-a106f3814bcb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=12cb3a8b-92d2-429c-926a-a106f3814bcb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=5623f6b6-6c08-406d-8c72-a7cc46dae933&bo=1&sid=ad1e0e709d9c11f0a22203b680512839&vid=ad1ebfd09d9c11f0a38ca9c5fa34a3e8&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20JavaScript%20Library&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-tag&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=241112)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=76e8c7e2-e0b1-4060-a262-c74f55648467&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-mainnet-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=76e8c7e2-e0b1-4060-a262-c74f55648467&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-mainnet-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=eb1fe864-1f65-4cab-9d4a-a6eb33107bc5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-mainnet-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=eb1fe864-1f65-4cab-9d4a-a6eb33107bc5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dconnect-mainnet-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=663e686d-fd79-4781-b38e-2be51a9f04d1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-b-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=663e686d-fd79-4781-b38e-2be51a9f04d1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-b-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=56186418-adc9-4cdd-bdc3-166702f7723d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-b-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=56186418-adc9-4cdd-bdc3-166702f7723d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-b-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=9f69f666-6e0b-480f-a64b-f2c3106f53db&bo=1&sid=ad1e0e709d9c11f0a22203b680512839&vid=ad1ebfd09d9c11f0a38ca9c5fa34a3e8&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20JavaScript%20Library&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-b-tag&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=948237)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5786e9e4-af91-45d0-a379-e702aaf9ccbe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-c-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5786e9e4-af91-45d0-a379-e702aaf9ccbe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-c-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61db1101-f9ee-47bd-b26b-f05b618c779c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-c-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61db1101-f9ee-47bd-b26b-f05b618c779c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dget-account-create-wallet-c-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=50d0a4e7-3699-4d0c-8855-284fd9070bf3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dquery-xrpl-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=50d0a4e7-3699-4d0c-8855-284fd9070bf3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dquery-xrpl-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9fd57bae-7951-47bd-a88c-dd723101ebdb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dquery-xrpl-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9fd57bae-7951-47bd-a88c-dd723101ebdb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dquery-xrpl-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=677bfd37-6cca-469b-a4ce-f9d8b43c2203&bo=1&sid=ad1e0e709d9c11f0a22203b680512839&vid=ad1ebfd09d9c11f0a38ca9c5fa34a3e8&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20JavaScript%20Library&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dquery-xrpl-tag&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=702702)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8b22c1d1-87f2-46c4-a96d-fc6fe66d22c9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dlisten-for-events-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8b22c1d1-87f2-46c4-a96d-fc6fe66d22c9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dlisten-for-events-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=24c1c836-514f-4dec-a9ac-95e02d403fe8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dlisten-for-events-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=24c1c836-514f-4dec-a9ac-95e02d403fe8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Dlisten-for-events-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=263b49e6-454e-49e5-aa85-854a2fb93d30&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Ddisconnect-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=263b49e6-454e-49e5-aa85-854a2fb93d30&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Ddisconnect-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b48fa0ff-02f5-4c21-8a82-20edb5c019e7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Ddisconnect-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b48fa0ff-02f5-4c21-8a82-20edb5c019e7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Ddisconnect-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=81797df2-b5c9-4302-a2e9-2a3aa7dd8b13&bo=1&sid=ad1e0e709d9c11f0a22203b680512839&vid=ad1ebfd09d9c11f0a38ca9c5fa34a3e8&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20JavaScript%20Library&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Ddisconnect-node-tag&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=983577)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=32b78627-04ef-442f-bfc6-29a4f019b1ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Drun-app-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=32b78627-04ef-442f-bfc6-29a4f019b1ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Drun-app-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=310c39d9-5c0b-47f6-8b66-e8b0e86689b1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Drun-app-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=310c39d9-5c0b-47f6-8b66-e8b0e86689b1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode%26__step%3Drun-app-node-tag&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e7cf880-633e-4b4e-ad54-abdb53de7dae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e7cf880-633e-4b4e-ad54-abdb53de7dae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3a2b4ebf-91f7-4258-abb5-a12c7b6bb247&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3a2b4ebf-91f7-4258-abb5-a12c7b6bb247&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=00e3b3b0-0416-498a-aaa7-4418afafbac0&pt=Get%20Started%20Using%20JavaScript%20Library&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=b2efcf65-c57b-4f97-8091-1c24e015f05e&bo=1&sid=ad1e0e709d9c11f0a22203b680512839&vid=ad1ebfd09d9c11f0a38ca9c5fa34a3e8&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20JavaScript%20Library&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fget-started%3Fenvironment%3DNode&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=810762)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/build-apps/get-started?environment=Node#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/build-apps/get-started?environment=Node#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/build-apps/get-started?environment=Node#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/build-apps/get-started?environment=Node#)
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
- [xrpl.js](https://github.com/XRPLF/xrpl.js/)
- [NPM](https://www.npmjs.com/)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await pattern](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [core server config file](https://github.com/XRPLF/rippled/blob/c0a0b79d2d483b318ce1d82e526bd53df83a4a2c/cfg/rippled-example.cfg#L1562)

---
Crawled on: 2025-09-30T01:28:03.544Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
