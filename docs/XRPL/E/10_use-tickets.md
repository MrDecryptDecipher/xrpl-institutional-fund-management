# Use Tickets
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/use-tickets
Section: E10

## Overview


## Extracted Content
# Use Tickets

Tickets provide a way to send transactions out of the normal order. This tutorial walks through the steps of creating a Ticket, then using it to send another transaction.


## Prerequisites

This page provides JavaScript examples that use the xrpl.js library. See Get Started Using JavaScript for setup instructions.

Since JavaScript works in the web browser, you can read along and use the interactive steps without any setup.


## Steps

This tutorial is divided into a few phases:

- (Steps 1-2) Setup: You need an XRP Ledger address and secret. For production, you can use the same address and secret consistently. For this tutorial, you can generate new test credentials as needed. You also need to be connected to the network.
- (Steps 3-6) Create Tickets: Send a transaction to set aside some Tickets.
- (Optional) Intermission: After creating Tickets, you can send various other transactions at any time before, during, and after the following steps.
- (Steps 7-10) Use Ticket: Use one of your set-aside Tickets to send a transaction. You can repeat these steps while skipping the previous parts as long as you have at least one Ticket remaining to use.


### 1. Get Credentials

To transact on the XRP Ledger, you need an address and secret key, and some XRP. For development purposes, you can get these on the Testnet using the following interface:

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration.


### 2. Connect to Network

You must be connected to the network to submit transactions to it. Since Tickets are only available on Devnet so far, you should connect to a Devnet server. For example:

- JavaScript

```
// Connect to Devnet (since that's where tickets are available)
async function main() {
  const client = new xrpl.Client("wss://s.devnet.rippletest.net:51233")
  await client.connect()
```

NoteThe code samples in this tutorial use JavaScript's async/await pattern. Since await needs to be used from within an async function, the remaining code samples are written to continue inside the main() function started here. You can also use Promise methods .then() and .catch() instead of async/await if you prefer.

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


### 3. Check Sequence Number

Before you create any Tickets, you should check what Sequence Number your account is at. You want the current Sequence number for the next step, and the Ticket Sequence numbers it sets aside start from this number.

- JavaScript

```
// Check Sequence Number -----------------------------------------------------
  const account_info = await client.request({
    "command": "account_info",
    "account": wallet.address
  })
  let current_sequence = account_info.result.account_data.Sequence
```

Check Sequence Number


### 4. Prepare and Sign TicketCreate

Construct a TicketCreate transaction using the sequence number you determined in the previous step. Use the TicketCount field to specify how many Tickets to create. For example, to prepare a transaction that would make 10 Tickets:

`TicketCount`

- JavaScript

```
// Prepare and Sign TicketCreate ---------------------------------------------
  const prepared = await client.autofill({
    "TransactionType": "TicketCreate",
    "Account": wallet.address,
    "TicketCount": 10,
    "Sequence": current_sequence
  })
  const signed = wallet.sign(prepared)
  console.log(`Prepared TicketCreate transaction ${signed.hash}`)
```

Record the transaction's hash and LastLedgerSequence value so you can be sure whether or not it got validated later.

`LastLedgerSequence`

Prepare & Sign


### 5. Submit TicketCreate

Submit the signed transaction blob that you created in the previous step. For example:

- JavaScript

```
// Submit TicketCreate -------------------------------------------------------
  const tx = await client.submitAndWait(signed.tx_blob)
  console.log(tx)
```

Submit


### 6. Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. If the XRP Ledger is busy or poor network connectivity delays a transaction from being relayed throughout the network, a transaction may take longer to be confirmed. (For information on how to set an expiration for transactions, see Reliable Transaction Submission.)

- JavaScript

```
// Wait for Validation -------------------------------------------------------
  // submitAndWait() handles this automatically, but it can take 4-7s.
```

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### (Optional) Intermission

The power of Tickets is that you can carry on with your account's business as usual while you are getting Ticketed transactions ready. When you want to send a transaction using a Ticket, you can do that in parallel with other sending transactions, including ones using different Tickets, and submit a Ticketed transaction at any time. The only constraint is that each Ticket can only be used once.

TipYou can come back here to send Sequenced transactions between or during any of the following steps, without interfering with the success of your Ticketed transaction.

Payment EscrowCreate AccountSet


### 7. Check Available Tickets

When you want to send a Ticketed transaction, you need to know what Ticket Sequence number to use for it. If you've been keeping careful track of your account, you already know which Tickets you have, but if you're not sure, you can use the account_objects method to look up your available tickets. For example:

- JavaScript

```
// Check Available Tickets ---------------------------------------------------
  let response = await client.request({
    "command": "account_objects",
    "account": wallet.address,
    "type": "ticket"
  })
  console.log("Available Tickets:", response.result.account_objects)

  // Choose an arbitrary Ticket to use
  use_ticket = response.result.account_objects[0].TicketSequence
```

Check Tickets

TipYou can repeat the steps from here through the end as long as you have Tickets left to be used!


### 8. Prepare Ticketed Transaction

Now that you have a Ticket available, you can prepare a transaction that uses it.

This can be any type of transaction you like. The following example uses a no-op AccountSet transaction since that doesn't require any other setup in the ledger. Set the Sequence field to 0 and include a TicketSequence field with the Ticket Sequence number of one of your available Tickets.

`Sequence`

`0`

`TicketSequence`

- JavaScript

```
// Prepare and Sign Ticketed Transaction -------------------------------------
  const prepared_t = await client.autofill({
    "TransactionType": "AccountSet",
    "Account": wallet.address,
    "TicketSequence": use_ticket,
    "LastLedgerSequence": null, // Never expire this transaction.
    "Sequence": 0
  })
  const signed_t = wallet.sign(prepared_t)
  console.log(`Prepared ticketed transaction ${signed_t.hash}`)
```

If you don't plan to submit the TicketCreate transaction right away, you should be sure not to set the LastLedgerSequence so that the transaction does not expire. The way you do this varies by library:

`LastLedgerSequence`

- xrpl.js: Specify "LastLedgerSequence": null when auto-filling the transaction.
- rippled: Omit LastLedgerSequence from the prepared instructions. The server does not provide a value by default.

`"LastLedgerSequence": null`

`rippled`

`LastLedgerSequence`


#### Select a Ticket:


### 9. Submit Ticketed Transaction

Submit the signed transaction blob that you created in the previous step. For example:

- JavaScript

```
// Submit Ticketed Transaction -----------------------------------------------
  const tx_t = await client.submitAndWait(signed_t.tx_blob)
  console.log(tx_t)
```

Submit


### 10. Wait for Validation

Ticketed transactions go through the consensus process the same way that Sequenced transactions do.

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


## With Multi-Signing

One of the main use cases for Tickets is to be able to collect signatures for several multi-signed transactions in parallel. By using a Ticket, you can send a multi-signed transaction as soon as it is fully signed and ready to go, without worrying about which one will be ready first.

In this scenario, step 8, "Prepare Ticketed Transaction" is slightly different. Instead of preparing and signing all at once, you would follow the steps for sending any multi-signed transaction: first prepare the transaction, then circulate it among trusted signers to collect their signatures, and finally combine the signatures into the final multi-signed transaction.

You could do this in parallel for several different potential transactions as long as each one uses a different Ticket.


## See Also

- Concepts:TicketsMulti-Signing
- Tickets
- Multi-Signing
- Tutorials:Set Up Multi-SigningReliable Transaction Submission
- Set Up Multi-Signing
- Reliable Transaction Submission
- References:account_objects methodsign_for methodsubmit_multisigned methodTicketCreate transactionTransaction Common Fields
- account_objects method
- sign_for method
- submit_multisigned method
- TicketCreate transaction
- Transaction Common Fields

- Tickets
- Multi-Signing

- Set Up Multi-Signing
- Reliable Transaction Submission

- account_objects method
- sign_for method
- submit_multisigned method
- TicketCreate transaction
- Transaction Common Fields

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b06cbc2b-0386-4d5c-b3e3-f546664d2e29&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b06cbc2b-0386-4d5c-b3e3-f546664d2e29&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ffc4e22d-045d-4177-b726-2b753322fe28&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ffc4e22d-045d-4177-b726-2b753322fe28&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=2d01d997-4a4d-4dad-a193-66f9f754eb38&bo=1&sid=e43787709d9d11f0baa8a3b44b7ef87b&vid=e43807809d9d11f0891575a2a056d4b1&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Use%20Tickets&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&r=&lt=2875&evt=pageLoad&sv=2&cdb=AQAS&rn=778040)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=05f573dc-1561-47ea-8330-8635ca198791&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=05f573dc-1561-47ea-8330-8635ca198791&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f03098d9-fe61-4eb7-938f-37d5df9ff5d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f03098d9-fe61-4eb7-938f-37d5df9ff5d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c33ff56f-2e56-432e-bba6-ce5b19a8d2a7&pt=Use%20Tickets&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fuse-tickets&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/use-tickets#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/use-tickets#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/use-tickets#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/use-tickets#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.0db3494c009085b2aec41278fae1a010.1759196194599.1759196194599.1759196194599.1&__hssc=78174987.1.1759196194599&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/use-tickets.md)
- [async/await pattern](https://javascript.info/async-await)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.0db3494c009085b2aec41278fae1a010.1759196194599.1759196194599.1759196194599.1&__hssc=78174987.1.1759196194599&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:36:52.460Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
