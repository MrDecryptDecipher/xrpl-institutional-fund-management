# Start Building with Example Code
URL: https://xrpl.org/resources/code-samples
Section: AG1

## Overview


## Extracted Content
# Start Building with Example Code


###### Code Samples


### Browse sample code for building common use cases on the XRP Ledger


#### Introductory Code Samples

Connect to the XRP Ledger and query it for data.


#### Quickstart Samples

Create a test harness for XRPL features using JavaScript or Python.


#### Account Configurator

Create accounts on Testnet or Devnet and try different configuration settings. You can also get account configuration settings for live accounts on Mainnet.


#### Address Encoding

Encode XRP Ledger addresses in base58. (This reference implementation is equivalent to the ones included in most client libraries.)


#### AMM CLOB Demo

Simulate how offers interact with each other and AMMs on the XRPL DEX.


#### Batch

Code samples showing how to create and submit a Batch transaction .  Both for simple and multi account batch transactions.


#### Build a Browser Wallet

Implement a non-custodial wallet application that runs in a web browser and can check an account's balances, send XRP, and notify when the account receives incoming transactions.


#### Build a Wallet

Implement a non-custodial wallet application that runs on a desktop and can check an account's balances, send XRP, and notify when the account receives incoming transactions.


#### Clawback

Create, configure, and execute a Clawback transaction to reclaim issued tokens from a trust line on the XRPL.


#### Create AMM

Code samples for the Create an Automated Market Maker tutorial , showing how to make set up a new AMM.


#### Create and Claim a Payment Channel

Create, claim and verify a Payment Channel.


#### Create, Update, and Delete Decentralized Identifiers (DIDs)

Create, update, and delete decentralized identifiers (DIDs). A Decentralized Identifier (DID) is a new type of identifier defined by the World Wide Web Consortium (W3C) that enables verifiable, digital identities.


#### Create, Update, and Delete Price Oracles

Create, update, and delete Price Oracles. A price oracle is a mechanism that feeds external data, such as asset prices, and exchange rates, onto the XRPLedger.


#### Credential

Create, accept, and delete a credential on the XRPL using dedicated transactions between issuer and subject wallets.


#### Credential Issuing Service

This sample code shows how to issue credentials to XRPL users using a basic API service.


#### Cryptographic Key Derivation

Derive secp256k1 or Ed25519 key pairs from seeds in any of the XRP Ledger's encodings and formats. (This implementation is equivalent to the ones included in most client libraries.)


#### Delegate

Example delegating payment permission to an account and executing on behalf the delegator.


#### Delegate Permissions

Delegate permissions to another account, so that the account can send transactions on your behalf.


#### DepositPreauth

Example of DepositPreauth transaction demonstrating how deposit permissions can be managed.


#### Escrows

Create, finish, and cancel Escrows using conditional or time-based release.


#### Freezes

Freeze and unfreeze issued tokens, check freeze status, or give up the ability to freeze tokens.


#### Get a Transaction on the Ledger

Retrieve and display a transaction on the ledger.


#### Implement Reliable Transaction Submission

Send a transaction and see its validation response. For the implementation in this example, we have made the following decisions:


#### Issue a Fungible Token

Configure issuer settings and issue fungible tokens to another account.


#### Issue an MPT with Metadata

Shows how to issue a Multi-Purpose Token (MPT) with metadata encoded according to the XLS-89 schema.


#### Markers and Pagination

Iterate over a ledger_data method request that requires multiple calls.


#### Monitor Incoming Payments with WebSocket

Use the WebSocket protocol to watch for incoming payments to an XRP Ledger address, without using a client library.


#### Multisign a transaction.

Create and submit a SignerListSet and multisign a transaction.


#### NFT Examples

Various NFT-related actions. Also see the Quickstart Samples for more code related to NFT tutorials.


#### Normalize Currency Codes

Convert from a string from either the XRP Ledger's "standard" 3-character or "non-standard" 40-character hexadecimal format into a string for humans to read.


#### Require Destination Tags

Require incoming payments to specify a Destination Tag so you know whom to credit.


#### Secure Signing

Sign transactions from the security of your own machine.


#### Send Partial Payments

Send partial payments with money amount less than the amount specified on 2 conditions:


#### Send XRP

Send a direct XRP payment to another account in the XRP Ledger.


#### Submit and Verify

Submit a signed transaction blob and wait until it has a final result.


#### Tickets

Create a Ticket and use it to send a transaction out of the usual Sequence order.


#### Trade in the Decentralized Exchange

Look up Offers in the Decentralized Exchange and buy a fungible token by spending XRP.


#### Transaction Serialization

Convert transactions and other XRPL data from JSON to their canonical binary format for signing or cryptographic verification. (This reference implementation is equivalent to the ones included in most client libraries.)


#### Use Checks

Create, cash, and cancel Checks for exact or flexible amounts.


#### Use Paths

Extract paths from RipplePathFind and send a payment using paths.


#### Use SetRegularKey

Use SetRegularKey to assign a key pair to a wallet and make a payment signed using the regular key wallet.


#### Verify Credential

Check whether a specific account holds a specific credential, and the credential is currently valid.


### Contribute Code Samples


###### Help the XRPL community by submitting your own code samples


##### Fork and clone

Fork the xrpl-dev-portal repo. Using git, clone the fork to your computer.


##### Add to folder

Add your sample code to the content/_code-samples/ folder. Be sure to include a README.mdthat summarizes what it does and anything else people should know about it.

`content/_code-samples/`

`README.md`


##### Commit and push

Commit your changes and push them to your fork on GitHub.


##### Open a pull request

Open a pull request to the original repo. Maintainers will review your submission and suggest changes if necessary. If the code sample is helpful, it'll be merged and added to XRPL.org!

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![orange waves](https://xrpl.org/assets/xrpl-overview-orange.96a0503e6654c5a65acfb38a1538a1edd70a162d3e2439493f8aa4181d5b2a42.2dee4622.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![java](https://xrpl.org/assets/java.e48f18d953841868e03649c99118a66055225f2989cacbaadab9070c8ee1ad1e.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![php](https://xrpl.org/assets/php.2132ce6951ad588f001d6e17d7b8d6389de2f64d659c5eeb2615551ade79a9aa.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![ts](https://xrpl.org/assets/typescript.25e995fa85ae9ff6b5749f4ffeb21b2fe71d74e9b8d8db8eac4b9732cd9ef287.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![java](https://xrpl.org/assets/java.e48f18d953841868e03649c99118a66055225f2989cacbaadab9070c8ee1ad1e.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![java](https://xrpl.org/assets/java.e48f18d953841868e03649c99118a66055225f2989cacbaadab9070c8ee1ad1e.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![java](https://xrpl.org/assets/java.e48f18d953841868e03649c99118a66055225f2989cacbaadab9070c8ee1ad1e.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![php](https://xrpl.org/assets/php.2132ce6951ad588f001d6e17d7b8d6389de2f64d659c5eeb2615551ade79a9aa.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![go](https://xrpl.org/assets/golang.70388e1c0dc760da62a82ddc02c0327f018a8b1ffce77f28b618a1977e1c56d0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![js](https://xrpl.org/assets/javascript.a0dd4a182d6c1a0048a86d6be7c1669ed96aea647e0fbcd997efe50daaaeb197.bd78a268.svg)

![py](https://xrpl.org/assets/python.fbc3b698dc119b255d16fa5c26c5cb94e3dc9f9d126effea1477add4817d4fa0.bd78a268.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea32b20a-d3f5-42e0-9d40-5594f12c6950&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea32b20a-d3f5-42e0-9d40-5594f12c6950&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fdbecf31-7e52-44d8-8839-47a44b8dfd9f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fdbecf31-7e52-44d8-8839-47a44b8dfd9f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=535b2125-d9de-4313-995d-f684b8008c28&bo=1&sid=e9cb4a609dab11f0ba3bbd93b324683a&vid=e9cbbe609dab11f0a768e123ad2d9bcb&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Code%20Samples&p=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&r=&lt=2783&evt=pageLoad&sv=2&cdb=AQAS&rn=979121)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7068902b-4465-4b64-ae6b-7180f0ca6459&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7068902b-4465-4b64-ae6b-7180f0ca6459&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=83d3a3a9-2086-419b-802f-2bf82009a72a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=83d3a3a9-2086-419b-802f-2bf82009a72a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=568a4ee3-25b3-4185-be13-a5610f8549f0&pt=Code%20Samples&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcode-samples&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/resources/code-samples#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/resources/code-samples#)
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
- [Resources](https://xrpl.org/resources/code-samples#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/resources/code-samples#)
- [Contribute to the XRPL CommunityJoin the conversation](https://xrpl.org/community)
- [Events](https://xrpl.org/community/events)
- [Ambassadors](https://xrpl.org/community/ambassadors)
- [Developer Funding](https://xrpl.org/community/developer-funding)
- [XRPL Jobs](https://jobs.xrpl.org/)
- [Dev Blog](https://xrpl.org/blog)
- [Report a Scam](https://xrpl.org/community/report-a-scam)
- [Documentation](https://xrpl.org/docs)
- [Resources](https://xrpl.org/resources)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.dec8decf3197b60be3f95cfcd15474cd.1759202213604.1759202213604.1759202213604.1&__hssc=78174987.1.1759202213604&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Introductory Code SamplesConnect to the XRP Ledger and query it for data.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/get-started)
- [Quickstart SamplesCreate a test harness for XRPL features using JavaScript or Python.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/quickstart)
- [Account ConfiguratorCreate accounts on Testnet or Devnet and try different configuration settings. You can also get account configuration settings for live accounts on Mainnet.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/account-configurator)
- [Address EncodingEncode XRP Ledger addresses in base58. (This reference implementation is equivalent to the ones included in most client libraries.)](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/address_encoding)
- [AMM CLOB DemoSimulate how offers interact with each other and AMMs on the XRPL DEX.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/amm-clob)
- [BatchCode samples showing how to create and submit a Batch transaction .  Both for simple and multi account batch transactions.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/batch)
- [Build a Browser WalletImplement a non-custodial wallet application that runs in a web browser and can check an account's balances, send XRP, and notify when the account receives incoming transactions.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/build-a-browser-wallet)
- [Build a WalletImplement a non-custodial wallet application that runs on a desktop and can check an account's balances, send XRP, and notify when the account receives incoming transactions.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/build-a-desktop-wallet)
- [ClawbackCreate, configure, and execute a Clawback transaction to reclaim issued tokens from a trust line on the XRPL.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/clawback)
- [Create AMMCode samples for the Create an Automated Market Maker tutorial , showing how to make set up a new AMM.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/create-amm)
- [Create and Claim a Payment ChannelCreate, claim and verify a Payment Channel.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/claim-payment-channel)
- [Create, Update, and Delete Decentralized Identifiers (DIDs)Create, update, and delete decentralized identifiers (DIDs). A Decentralized Identifier (DID) is a new type of identifier defined by the World Wide Web Consortium (W3C) that enables verifiable, digital identities.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/did)
- [Create, Update, and Delete Price OraclesCreate, update, and delete Price Oracles. A price oracle is a mechanism that feeds external data, such as asset prices, and exchange rates, onto the XRPLedger.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/price_oracles)
- [CredentialCreate, accept, and delete a credential on the XRPL using dedicated transactions between issuer and subject wallets.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/credential)
- [Credential Issuing ServiceThis sample code shows how to issue credentials to XRPL users using a basic API service.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/issue-credentials)
- [Cryptographic Key DerivationDerive secp256k1 or Ed25519 key pairs from seeds in any of the XRP Ledger's encodings and formats. (This implementation is equivalent to the ones included in most client libraries.)](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/key-derivation)
- [DelegateExample delegating payment permission to an account and executing on behalf the delegator.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/delegate-set)
- [Delegate PermissionsDelegate permissions to another account, so that the account can send transactions on your behalf.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/delegate-permissions)
- [DepositPreauthExample of DepositPreauth transaction demonstrating how deposit permissions can be managed.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/deposit-preauth)
- [EscrowsCreate, finish, and cancel Escrows using conditional or time-based release.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/escrow)
- [FreezesFreeze and unfreeze issued tokens, check freeze status, or give up the ability to freeze tokens.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/freeze)
- [Get a Transaction on the LedgerRetrieve and display a transaction on the ledger.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/get-tx)
- [Implement Reliable Transaction SubmissionSend a transaction and see its validation response. For the implementation in this example, we have made the following decisions:](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/reliable-tx-submission)
- [Issue a Fungible TokenConfigure issuer settings and issue fungible tokens to another account.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/issue-a-token)
- [Issue an MPT with MetadataShows how to issue a Multi-Purpose Token (MPT) with metadata encoded according to the XLS-89 schema.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/issue-mpt-with-metadata)
- [Markers and PaginationIterate over a ledger_data method request that requires multiple calls.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/markers-and-pagination)
- [Monitor Incoming Payments with WebSocketUse the WebSocket protocol to watch for incoming payments to an XRP Ledger address, without using a client library.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/monitor-payments-websocket)
- [Multisign a transaction.Create and submit a SignerListSet and multisign a transaction.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/multisigning)
- [NFT ExamplesVarious NFT-related actions. Also see the Quickstart Samples for more code related to NFT tutorials.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/non-fungible-token)
- [Normalize Currency CodesConvert from a string from either the XRP Ledger's "standard" 3-character or "non-standard" 40-character hexadecimal format into a string for humans to read.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/normalize-currency-codes)
- [Require Destination TagsRequire incoming payments to specify a Destination Tag so you know whom to credit.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/require-destination-tags)
- [Secure SigningSign transactions from the security of your own machine.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/secure-signing)
- [Send Partial PaymentsSend partial payments with money amount less than the amount specified on 2 conditions:](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/partial-payment)
- [Send XRPSend a direct XRP payment to another account in the XRP Ledger.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/send-xrp)
- [Submit and VerifySubmit a signed transaction blob and wait until it has a final result.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/submit-and-verify)
- [TicketsCreate a Ticket and use it to send a transaction out of the usual Sequence order.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/use-tickets)
- [Trade in the Decentralized ExchangeLook up Offers in the Decentralized Exchange and buy a fungible token by spending XRP.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/trade-in-the-decentralized-exchange)
- [Transaction SerializationConvert transactions and other XRPL data from JSON to their canonical binary format for signing or cryptographic verification. (This reference implementation is equivalent to the ones included in most client libraries.)](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/tx-serialization)
- [Use ChecksCreate, cash, and cancel Checks for exact or flexible amounts.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/checks)
- [Use PathsExtract paths from RipplePathFind and send a payment using paths.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/paths)
- [Use SetRegularKeyUse SetRegularKey to assign a key pair to a wallet and make a payment signed using the regular key wallet.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/set-regular-key)
- [Verify CredentialCheck whether a specific account holds a specific credential, and the credential is currently valid.](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/verify-credential)
- [xrpl-dev-portal repo](https://github.com/XRPLF/xrpl-dev-portal)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.dec8decf3197b60be3f95cfcd15474cd.1759202213604.1759202213604.1759202213604.1&__hssc=78174987.1.1759202213604&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:17:13.661Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
