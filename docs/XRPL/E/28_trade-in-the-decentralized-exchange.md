# Trade in the Decentralized Exchange
URL: https://xrpl.org/docs/tutorials/how-tos/use-tokens/trade-in-the-decentralized-exchange
Section: E28

## Overview


## Extracted Content
# Trade in the Decentralized Exchange

This tutorial demonstrates how you can buy and sell tokens in the decentralized exchange (DEX).


## Prerequisites

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

Complete sample code for all of the steps of this tutorial is available under the MIT license.

- See Code Samples: Trade in the Decentralized Exchange in the source repository for this website.


## Steps

This tutorial demonstrates how to buy a fungible token in the decentralized exchange by selling XRP. (Other types of trades are possible, but selling a token, for example, requires you to have it first.) The example token used in this tutorial is as follows:

| Currency Code | Issuer | Notes |
| --- | --- | --- |
| TST | rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd | A test token pegged to XRP at a rate of approximately 10 XRP per 1 TST. The issuer has existing Offers on the XRP Ledger Testnet to buy and sell these tokens. |


`rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd`


### 1. Connect to Network

You must be connected to the network to submit transactions to it. Additionally, some languages (including JavaScript) require a high-precision number library for performing calculations on currency amounts you may find in the ledger. The following code shows how to connect to a public XRP Ledger Testnet server a supported client library with the appropriate dependencies.

- JavaScript
- Python

```
// In browsers, add the following <script> tags to the HTML to load dependencies
// instead of using require():
// <script src="https://unpkg.com/xrpl@2.11.0/build/xrpl-latest-min.js"></script>
// <script src='https://cdn.jsdelivr.net/npm/bignumber.js@9.0.2/bignumber.min.js'></script>
const xrpl = require('xrpl')
const BigNumber = require('bignumber.js')

// Wrap code in an async function so we can use await
async function main() {

  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  // ... custom code goes here

  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect()
}

main()
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


### 2. Get Credentials

To transact on the XRP Ledger, you need an address, a secret key, and some XRP. For development purposes, you can get these on the Testnet using the following interface:

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration. The following code shows how to create a Wallet instance to use your keys:

`Wallet`

- JavaScript
- Python

```
// Get credentials from the Testnet Faucet -----------------------------------
  console.log("Requesting address from the Testnet faucet...")
  const wallet = (await client.fundWallet()).wallet
  console.log(`Got address ${wallet.address}.`)
  // To use existing credentials, you can load them from a seed value, for
  // example using an environment variable as follows:
  // const wallet = xrpl.Wallet.fromSeed(process.env['MY_SEED'])
```


### 3. Look Up Offers

Before you buy or sell a token, you usually want to look up what others are buying and selling for, to get a sense of how others value it. In the XRP Ledger, you can look up existing offers for any currency pair using the book_offers method.

TipTechnically, this step is not a requirement for placing an Offer, but it is a good practice to confirm the current situation before trading anything with real value.

The following code shows how to look up existing Offers and compare them to a proposed Offer to estimate how it would execute:

- JavaScript
- Python

```
// Define the proposed trade. ------------------------------------------------
  // Technically you don't need to specify the amounts (in the "value" field)
  // to look up order books using book_offers, but for this tutorial we reuse
  // these variables to construct the actual Offer later.
  const we_want = {
    currency: "TST",
    issuer: "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
    value: "25"
  }
  const we_spend = {
    currency: "XRP",
           // 25 TST * 10 XRP per TST * 15% financial exchange (FX) cost
    value: xrpl.xrpToDrops(25*10*1.15)
  }
  // "Quality" is defined as TakerPays / TakerGets. The lower the "quality"
  // number, the better the proposed exchange rate is for the taker.
  // The quality is rounded to a number of significant digits based on the
  // issuer's TickSize value (or the lesser of the two for token-token trades.)
  const proposed_quality = BigNumber(we_spend.value) / BigNumber(we_want.value)

  // Look up Offers. -----------------------------------------------------------
  // To buy TST, look up Offers where "TakerGets" is TST:
  const orderbook_resp = await client.request({
    "command": "book_offers",
    "taker": wallet.address,
    "ledger_index": "current",
    "taker_gets": we_want,
    "taker_pays": we_spend
  })
  console.log(JSON.stringify(orderbook_resp.result, null, 2))

  // Estimate whether a proposed Offer would execute immediately, and...
  // If so, how much of it? (Partial execution is possible)
  // If not, how much liquidity is above it? (How deep in the order book would
  //    other Offers have to go before ours would get taken?)
  // Note: These estimates can be thrown off by rounding if the token issuer
  // uses a TickSize setting other than the default (15). In that case, you
  // can increase the TakerGets amount of your final Offer to compensate.

  const offers = orderbook_resp.result.offers
  const want_amt = BigNumber(we_want.value)
  let running_total = BigNumber(0)
  if (!offers) {
    console.log(`No Offers in the matching book.
                 Offer probably won't execute immediately.`)
  } else {
    for (const o of offers) {
      if (o.quality <= proposed_quality) {
        console.log(`Matching Offer found, funded with ${o.owner_funds}
            ${we_want.currency}`)
        running_total = running_total.plus(BigNumber(o.owner_funds))
        if (running_total >= want_amt) {
          console.log("Full Offer will probably fill")
          break
        }
      } else {
        // Offers are in ascending quality order, so no others after this
        // will match, either
        console.log(`Remaining orders too expensive.`)
        break
      }
    }
    console.log(`Total matched:
          ${Math.min(running_total, want_amt)} ${we_want.currency}`)
    if (running_total > 0 && running_total < want_amt) {
      console.log(`Remaining ${want_amt - running_total} ${we_want.currency}
            would probably be placed on top of the order book.`)
    }
  }

  if (running_total == 0) {
    // If part of the Offer was expected to cross, then the rest would be placed
    // at the top of the order book. If none did, then there might be other
    // Offers going the same direction as ours already on the books with an
    // equal or better rate. This code counts how much liquidity is likely to be
    // above ours.

    // Unlike above, this time we check for Offers going the same direction as
    // ours, so TakerGets and TakerPays are reversed from the previous
    // book_offers request.
    const orderbook2_resp = await client.request({
      "command": "book_offers",
      "taker": wallet.address,
      "ledger_index": "current",
      "taker_gets": we_spend,
      "taker_pays": we_want
    })
    console.log(JSON.stringify(orderbook2_resp.result, null, 2))

    // Since TakerGets/TakerPays are reversed, the quality is the inverse.
    // You could also calculate this as 1/proposed_quality.
    const offered_quality = BigNumber(we_want.value) / BigNumber(we_spend.value)

    const offers2 = orderbook2_resp.result.offers
    let tally_currency = we_spend.currency
    if (tally_currency == "XRP") { tally_currency = "drops of XRP" }
    let running_total2 = 0
    if (!offers2) {
      console.log(`No similar Offers in the book. Ours would be the first.`)
    } else {
      for (const o of offers2) {
        if (o.quality <= offered_quality) {
          console.log(`Existing offer found, funded with
                ${o.owner_funds} ${tally_currency}`)
          running_total2 = running_total2.plus(BigNumber(o.owner_funds))
        } else {
          console.log(`Remaining orders are below where ours would be placed.`)
          break
        }
      }
      console.log(`Our Offer would be placed below at least
            ${running_total2} ${tally_currency}`)
      if (running_total > 0 && running_total < want_amt) {
        console.log(`Remaining ${want_amt - running_total} ${tally_currency}
              will probably be placed on top of the order book.`)
      }
    }
  }
```

NoteOther users of the XRP Ledger can also make trades at any time, so this is only an estimate of what would happen if nothing else changes. The outcome of a transaction is not guaranteed until it is final.

The following block demonstrates these calculations in action:


##### TakerPays


##### TakerGets


##### Exchange Rate


### 4. Send OfferCreate Transaction

To actually make a trade, send an OfferCreate transaction. In this case, you want to buy TST using XRP, so you should set the parameters as follows:

| Field | Type | Description |
| --- | --- | --- |
| TakerPays | Token Amount object | How much of what currency you want to buy, in total. For this tutorial, buy some amount of TST issued by rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd. |
| TakerGets | XRP, in drops | How much of what currency you are offering to pay in total. For this tutorial, you should specify about 11.5 XRP per TST or slightly more. |


`TakerPays`

`rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd`

`TakerGets`

The following code shows how to prepare, sign, and submit the transaction:

- JavaScript
- Python

```
// Send OfferCreate transaction ----------------------------------------------

  // For this tutorial, we already know that TST is pegged to
  // XRP at a rate of approximately 10:1 plus spread, so we use
  // hard-coded TakerGets and TakerPays amounts.

  const offer_1 = {
    "TransactionType": "OfferCreate",
    "Account": wallet.address,
    "TakerPays": we_want,
    "TakerGets": we_spend.value // since it's XRP
  }

  const prepared = await client.autofill(offer_1)
  console.log("Prepared transaction:", JSON.stringify(prepared, null, 2))
  const signed = wallet.sign(prepared)
  console.log("Sending OfferCreate transaction...")
  const result = await client.submitAndWait(signed.tx_blob)
  if (result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded:
          https://testnet.xrpl.org/transactions/${signed.hash}`)
  } else {
    throw `Error sending transaction: ${result}`
  }
```

You can use this interface to send the transaction specified by the amounts in the previous step:

Send OfferCreate


### 5. Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. If the XRP Ledger is busy or poor network connectivity delays a transaction from being relayed throughout the network, a transaction may take longer to be confirmed. (For information on how to set an expiration for transactions, see Reliable Transaction Submission.)

| Transaction ID: | (None) |
| --- | --- |
| (Not connected) |
| (Not submitted) |
| (Not prepared) |


`LastLedgerSequence`


### 6. Check Metadata

You can use the validated transaction's metadata to determine exactly what it did. (Don't use metadata from tentative transaction results, because it may be different from the final result, especially when using the decentralized exchange.) In case of an OfferCreate transaction, likely results include:

- Some or all of the Offer may have been filled by matching with existing Offers in the ledger.
- The unmatched remainder, if any, has been placed into the ledger to await new matching Offers.
- Other bookkeeping may have occurred, such as removing expired or unfunded Offers that would have matched.

The following code demonstrates how to check the metadata of the transaction:

- JavaScript
- Python

```
// Check metadata ------------------------------------------------------------
  // In JavaScript, you can use getBalanceChanges() to help summarize all the
  // balance changes caused by a transaction.
  const balance_changes = xrpl.getBalanceChanges(result.result.meta)
  console.log("Total balance changes:", JSON.stringify(balance_changes, null,2))

  // Helper to convert an XRPL amount to a string for display
  function amt_str(amt) {
    if (typeof amt == "string") {
      return `${xrpl.dropsToXrp(amt)} XRP`
    } else {
      return `${amt.value} ${amt.currency}.${amt.issuer}`
    }
  }

  let offers_affected = 0
  for (const affnode of result.result.meta.AffectedNodes) {
    if (affnode.hasOwnProperty("ModifiedNode")) {
      if (affnode.ModifiedNode.LedgerEntryType == "Offer") {
        // Usually a ModifiedNode of type Offer indicates a previous Offer that
        // was partially consumed by this one.
        offers_affected += 1
      }
    } else if (affnode.hasOwnProperty("DeletedNode")) {
      if (affnode.DeletedNode.LedgerEntryType == "Offer") {
        // The removed Offer may have been fully consumed, or it may have been
        // found to be expired or unfunded.
        offers_affected += 1
      }
    } else if (affnode.hasOwnProperty("CreatedNode")) {
      if (affnode.CreatedNode.LedgerEntryType == "RippleState") {
        console.log("Created a trust line.")
      } else if (affnode.CreatedNode.LedgerEntryType == "Offer") {
        const offer = affnode.CreatedNode.NewFields
        console.log(`Created an Offer owned by ${offer.Account} with
          TakerGets=${amt_str(offer.TakerGets)} and
          TakerPays=${amt_str(offer.TakerPays)}.`)
      }
    }
  }
  console.log(`Modified or removed ${offers_affected} matching Offer(s)`)
```

You can use this interface to test it out:

Check Metadata


### 7. Check Balances and Offers

This is also a good time to look up the balances and outstanding Offers owned by your account as of the latest validated ledger. This shows any changes caused by your transaction as well as any others that executed in the same ledger version.

The following code demonstrates how to look up balances using the account_lines method and look up Offers using the account_offers method.

- JavaScript
- Python

```
// Check balances ------------------------------------------------------------
  console.log("Getting address balances as of validated ledger...")
  const balances = await client.request({
    command: "account_lines",
    account: wallet.address,
    ledger_index: "validated"
    // You could also use ledger_index: "current" to get pending data
  })
  console.log(JSON.stringify(balances.result, null, 2))

  // Check Offers --------------------------------------------------------------
  console.log(`Getting outstanding Offers from ${wallet.address} as of validated ledger...`)
  const acct_offers = await client.request({
    command: "account_offers",
    account: wallet.address,
    ledger_index: "validated"
  })
  console.log(JSON.stringify(acct_offers.result, null, 2))
```

You can use this interface to test it out:

Check Balances and Offers

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f089c1c1-ec34-4fc1-89e1-1b43449a3ce3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f089c1c1-ec34-4fc1-89e1-1b43449a3ce3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=40336e7b-a108-41c5-8f6c-8e709396a44d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=40336e7b-a108-41c5-8f6c-8e709396a44d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=e7055775-28e6-4855-95e7-c0b457ab92c8&bo=1&sid=da976e409d9e11f0850d9b22c067d0b4&vid=da97d2409d9e11f0b14327030183319d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Trade%20in%20the%20Decentralized%20Exchange&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&r=&lt=2671&evt=pageLoad&sv=2&cdb=AQAS&rn=548821)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6763eea8-d114-4465-8516-494b2124f526&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6763eea8-d114-4465-8516-494b2124f526&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b2e3df78-9a27-4c57-8927-db8efac9ecff&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b2e3df78-9a27-4c57-8927-db8efac9ecff&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0e42f8c3-b704-4812-aa66-439b550dbb8a&pt=Trade%20in%20the%20Decentralized%20Exchange&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Ftrade-in-the-decentralized-exchange&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-tokens/trade-in-the-decentralized-exchange#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-tokens/trade-in-the-decentralized-exchange#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-tokens/trade-in-the-decentralized-exchange#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-tokens/trade-in-the-decentralized-exchange#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.82c85672fd5428a2767ef94420ea8594.1759196607138.1759196607138.1759196607138.1&__hssc=78174987.1.1759196607138&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-tokens/trade-in-the-decentralized-exchange.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [xrpl-py library](https://xrpl-py.readthedocs.io/)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Trade in the Decentralized Exchange](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/trade-in-the-decentralized-exchange/)
- [async/await pattern](https://javascript.info/async-await)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.82c85672fd5428a2767ef94420ea8594.1759196607138.1759196607138.1759196607138.1&__hssc=78174987.1.1759196607138&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:43:42.601Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
