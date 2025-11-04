# Create an Automated Market Maker
URL: https://xrpl.org/docs/tutorials/how-tos/use-tokens/create-an-automated-market-maker
Section: E32

## Overview


## Extracted Content
# Create an Automated Market Maker

(Added by the AMM amendment)

An Automated Market Maker (AMM) can be an efficient way to facilitate exchanges between two assets while earning its liquidity providers passive income. This tutorial shows how to create an AMM for a given asset pair.


## Prerequisites

- You must have an XRP Ledger address and some XRP. For development and testing purposes, you can get these from a Faucet.
- You should be familiar with the Getting Started instructions for your preferred client library. This page provides examples for the following:JavaScript with the xrpl.js library version 2.11.0 or later. See Get Started Using JavaScript for setup steps.You can also read along and use the interactive steps in your browser without any setup.
- JavaScript with the xrpl.js library version 2.11.0 or later. See Get Started Using JavaScript for setup steps.
- You can also read along and use the interactive steps in your browser without any setup.
- You should have a basic understanding of how tokens work in the XRP Ledger.
- You may want to read about Automated Market Makers in the XRP Ledger first.

- JavaScript with the xrpl.js library version 2.11.0 or later. See Get Started Using JavaScript for setup steps.
- You can also read along and use the interactive steps in your browser without any setup.


## Example Code

Complete sample code for all of the steps of these tutorials is available under the MIT license.

- See Code Samples: Create an AMM in the source repository for this website.


## Steps


### 1. Connect to the network

You must be connected to the network to query it and submit transactions. The following code shows how to connect to a public {{use_network}} server using a supported client library:

- JavaScript

```
// In browsers, use a <script> tag. In Node.js, uncomment the following line:
// const xrpl = require('xrpl')

const WS_URL = 'wss://s.devnet.rippletest.net:51233/'
const EXPLORER = 'devnet.xrpl.org' // Optional, for linking

async function main() {
  // Define the network client
  const client = new xrpl.Client(WS_URL)
  await client.connect()

  // ... custom code goes here

  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect()
}

main()
```

For this tutorial, click the following button to connect:

Connect to Testnet


### 2. Get credentials

To transact on the XRP Ledger, you need an address, a secret key, and some XRP. For development and testing purposes, you can get these on the {{use_network}} using the following interface:

Get Testnet credentials

CautionRipple provides the Testnet and Devnet for testing purposes only, and sometimes resets the state of these test networks along with all balances. As a precaution, do not use the same addresses on Testnet/Devnet and Mainnet.

When you're building production-ready software, you should use an existing account, and manage your keys using a secure signing configuration. The following code shows how to get a Wallet instance using either the faucet or a seed provided by environment variable:

`Wallet`

- JavaScript

```
// Get credentials from the Faucet -------------------------------------------
  console.log("Requesting address from the faucet...")
  const wallet = (await client.fundWallet()).wallet
  const issuer = (await client.fundWallet()).wallet

  // To use an existing account, use code such as the following:
  // const wallet = xrpl.Wallet.fromSeed(process.env['USE_SEED'])
```


### 3. Select and acquire assets

As the creator of an AMM, you are also the first liquidity provider and you have to supply it with a starting pool of assets. Other users of the XRP Ledger can also become liquidity providers by supplying assets after the AMM exists. It's crucial to choose assets carefully because, as a liquidity provider for an AMM, you are supplying some amounts of both for users to swap between. If one of the AMM's assets becomes worthless, other users can use the AMM to trade for the other asset, leaving the AMM (and thus, its liquidity providers including you) holding only the worthless one. Technically, the AMM always holds some positive amount of both assets, but the amounts can be very small.

You can choose any pair of fungible assets in the XRP Ledger, including XRP or tokens, as long as they meet the restrictions on AMM assets.

For each of the two assets, you need to know its currency code and issuer; as an exception, XRP has no issuer. For each of the assets, you must hold a balance of the asset (or be the issuer). The following sample code acquires two assets, "TST" (which it buys using XRP) and "FOO" (which it receives from the issuer).

- JavaScript

```
// Acquire tokens ------------------------------------------------------------
  const offer_result = await client.submitAndWait({
    "TransactionType": "OfferCreate",
    "Account": wallet.address,
    "TakerPays": {
      currency: "TST",
      issuer: issuer.address,
      value: "25"
    },
    "TakerGets": xrpl.xrpToDrops(25*10*1.16)
  }, {autofill: true, wallet: wallet})
  if (offer_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`TST offer placed: ${EXPLORER}/transactions/${offer_result.result.hash}`)
    const balance_changes = xrpl.getBalanceChanges(offer_result.result.meta)
    for (const bc of balance_changes) {
      if (bc.account != wallet.address) {continue}
      for (const bal of bc.balances) {
        if (bal.currency == "TST") {
          console.log(`Got ${bal.value} ${bal.currency}.${bal.issuer}.`)
          break
        }
      }
      break
    }

  } else {
    throw `Error sending transaction: ${offer_result}`
  }
  // Successfully placing the offer doesn't necessarily mean that you have TST,
  // but for now, let's assume it matched existing Offers on ledger so you do.

  // Call helper function to set up a new "FOO" issuer, create a trust line
  // to them, and receive 1000 FOO from them.
  const foo_amount = await get_new_token(client, wallet, "FOO", "1000")
```

This tutorial includes some example code to issue FOO tokens from a second test address. This is not realistic for a production scenario, because tokens do not inherently have value, but it makes it possible to demonstrate creating a new AMM for a unique currency pair. In production, you would acquire a second token in some other way, such as making an off-ledger deposit with the stablecoin issuer, or buying it in the decentralized exchange.

The helper function for issuing follows an abbreviated version of the steps in the Issue a Fungible Token tutorial:

- JavaScript

```
/* Issue tokens ---------------------------------------------------------------
 * Fund a new issuer using the faucet, and issue some fungible tokens
 * to the specified address. In production, you would not do this; instead,
 * you would acquire tokens from an existing issuer (for example, you might
 * buy them in the DEX, or make an off-ledger deposit at a stablecoin issuer).
 * For a more thorough explanation of this process, see
 * "Issue a Fungible Token": https://xrpl.org/issue-a-fungible-token.html
 * Params:
 * client: an xrpl.Client instance that is already connected to the network
 * wallet: an xrpl.Wallet instance that should hold the new tokens
 * currency_code: string currency code (3-char ISO-like or hex code)
 * issue_quantity: string number of tokens to issue. Arbitrarily capped
 *                 at "10000000000"
 * Resolves to: an "Amount"-type JSON object, such as:
 * {
 *   "currency": "TST",
 *   "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
 *   "value": "123.456"
 * }
 */
async function get_new_token(client, wallet, currency_code, issue_quantity) {
  // Get credentials from the Testnet Faucet -----------------------------------
  console.log("Funding an issuer address with the faucet...")
  const issuer = (await client.fundWallet()).wallet
  console.log(`Got issuer address ${issuer.address}.`)

  // Enable issuer DefaultRipple ----------------------------------------------
  const issuer_setup_result = await client.submitAndWait({
    "TransactionType": "AccountSet",
    "Account": issuer.address,
    "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple
  }, {autofill: true, wallet: issuer} )
  if (issuer_setup_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Issuer DefaultRipple enabled: ${EXPLORER}/transactions/${issuer_setup_result.result.hash}`)
  } else {
    throw `Error sending transaction: ${issuer_setup_result}`
  }

  // Create trust line to issuer ----------------------------------------------
  const trust_result = await client.submitAndWait({
    "TransactionType": "TrustSet",
    "Account": wallet.address,
    "LimitAmount": {
      "currency": currency_code,
      "issuer": issuer.address,
      "value": "10000000000" // Large limit, arbitrarily chosen
    }
  }, {autofill: true, wallet: wallet})
  if (trust_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Trust line created: ${EXPLORER}/transactions/${trust_result.result.hash}`)
  } else {
    throw `Error sending transaction: ${trust_result}`
  }

  // Issue tokens -------------------------------------------------------------
  const issue_result = await client.submitAndWait({
    "TransactionType": "Payment",
    "Account": issuer.address,
    "Amount": {
      "currency": currency_code,
      "value": issue_quantity,
      "issuer": issuer.address
    },
    "Destination": wallet.address
  }, {autofill: true, wallet: issuer})
  if (issue_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Tokens issued: ${EXPLORER}/transactions/${issue_result.result.hash}`)
  } else {
    throw `Error sending transaction: ${issue_result}`
  }

  return {
    "currency": currency_code,
    "value": issue_quantity,
    "issuer": issuer.address
  }
}
```

Buy TST Get FOO


### 4. Check if the AMM exists

Since there can only be one AMM for a specific pair of assets, it's best to check first before trying to create one. Use the amm_info method to check whether the AMM already exists. For the request, you specify the two assets. The response should be an actNotFound error if the AMM does not exist.

`actNotFound`

- JavaScript

```
// Check if AMM already exists ----------------------------------------------
  const amm_info_request = {
    "command": "amm_info",
    "asset": {
      "currency": "TST",
      "issuer": issuer.address,
    },
    "asset2": {
      "currency": foo_amount.currency,
      "issuer": foo_amount.issuer
    },
    "ledger_index": "validated"
  }
  try {
    const amm_info_result = await client.request(amm_info_request)
    console.log(amm_info_result)
  } catch(err) {
    if (err.data.error === 'actNotFound') {
      console.log(`No AMM exists yet for the pair
                   ${foo_amount.currency}.${foo_amount.issuer} /
                   TST.rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd.
                   (This is probably as expected.)`)
    } else {
      throw(err)
    }
  }
```

If the AMM does already exist, you should double-check that you specified the right pair of assets. If someone else has already created this AMM, you can deposit to it instead.

Check AMM


### 5. Look up the AMMCreate transaction cost

Creating an AMM has a special transaction cost to prevent spam: since it creates objects in the ledger that no one owns, you must burn at least one owner reserve increment of XRP to send the AMMCreate transaction. The exact value can change due to fee voting, so you should look up the current incremental reserve value using the server_state method.

It is also a good practice to display this value and give a human operator a chance to stop before you send the transaction. Burning an owner reserve is typically a much higher cost than sending a normal transaction, so you don't want it to be a surprise. (Currently, on both Mainnet and Devnet, the cost of sending a typical transaction is 0.000010 XRP but the cost of AMMCreate is 0.2 XRP.)

- JavaScript

```
// Look up AMM transaction cost ---------------------------------------------
  // AMMCreate requires burning one owner reserve. We can look up that amount
  // (in drops) on the current network using server_state:
  const ss = await client.request({"command": "server_state"})
  const amm_fee_drops = ss.result.state.validated_ledger.reserve_inc.toString()
  console.log(`Current AMMCreate transaction cost:
               ${xrpl.dropsToXrp(amm_fee_drops)} XRP`)
```

Check cost


### 6. Send AMMCreate transaction

Send an AMMCreate transaction to create the AMM. Important aspects of this transaction include:

| Field | Value | Description |
| --- | --- | --- |
| Asset | Currency Amount | Starting amount of one asset to deposit in the AMM. |
| Asset2 | Currency Amount | Starting amount of the other asset to deposit in the AMM. |
| TradingFee | Number | The fee to charge when trading against this AMM instance. The maximum value is 1000, meaning a 1% fee; the minimum value is 0. If you set this too high, it may be too expensive for users to trade against the AMM; but the lower you set it, the more you expose yourself to currency risk from the AMM's assets changing in value relative to one another. |
| Fee | String - XRP Amount | The transaction cost you looked up in a previous step. Client libraries may require that you add a special exception or reconfigure a setting to specify a Fee value this high. |


`Asset`

`Asset2`

`TradingFee`

`1000`

`0`

`Fee`

`Fee`

For the two starting assets, it does not matter which is Asset and which is Asset2, but you should specify amounts that are about equal in total value, because otherwise other users can profit at your expense by trading against the AMM.

`Asset`

`Asset2`

TipUse fail_hard when submitting this transaction, so you don't have to pay the high transaction cost if the transaction initially fails. (It's still possible that the transaction could tentatively succeed, and then fail and still burn the transaction cost, but this protects you from burning XRP on many of types of failures.)

`fail_hard`

- JavaScript

```
// Create AMM ---------------------------------------------------------------
  // This example assumes that 15 TST ≈ 100 FOO in value.
  const ammcreate_result = await client.submitAndWait({
    "TransactionType": "AMMCreate",
    "Account": wallet.address,
    "Amount": {
      currency: "TST",
      issuer: issuer.address,
      value: "15"
    },
    "Amount2": {
      "currency": foo_amount.currency,
      "issuer": foo_amount.issuer,
      "value": "100"
    },
    "TradingFee": 500, // 0.5%
    "Fee": amm_fee_drops
  }, {autofill: true, wallet: wallet, fail_hard: true})
  // Use fail_hard so you don't waste the tx cost if you mess up
  if (ammcreate_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`AMM created: ${EXPLORER}/transactions/${ammcreate_result.result.hash}`)
  } else {
    throw `Error sending transaction: ${ammcreate_result}`
  }
```


### 7. Check AMM info

If the AMMCreate transaction succeeded, it creates the AMM and related objects in the ledger. You could check the metadata of the AMMCreate transaction, but it is often easier to call the amm_info method again to get the status of the newly-created AMM.

- JavaScript

```
// Confirm that AMM exists --------------------------------------------------
  // Make the same amm_info request as earlier, but this time it should succeed
  const amm_info_result2 = await client.request(amm_info_request)
  console.log(amm_info_result2)
  const lp_token = amm_info_result2.result.amm.lp_token
  const amount = amm_info_result2.result.amm.amount
  const amount2 = amm_info_result2.result.amm.amount2
  console.log(`The AMM account ${lp_token.issuer} has ${lp_token.value} total
               LP tokens outstanding, and uses the currency code ${lp_token.currency}.`)
  console.log(`In its pool, the AMM holds ${amount.value} ${amount.currency}.${amount.issuer}
               and ${amount2.value} ${amount2.currency}.${amount2.issuer}`)
```

In the result, the amm object's lp_token field is particularly useful because it includes the issuer and currency code of the AMM's LP Tokens, which you need to know for many other AMM-related transactions. LP Tokens always have a hex currency code starting with 03, and the rest of the code is derived from the issuers and currency codes of the tokens in the AMM's pool. The issuer of the LP Tokens is the AMM address, which is randomly chosen when you create an AMM.

`amm`

`lp_token`

`03`

Initially, the AMM's total outstanding LP Tokens, reported in the lp_token field of the amm_info response, match the tokens you hold as its first liquidity provider. However, after other accounts deposit liquidity to the same AMM, the amount shown in amm_info updates to reflect the total issued to all liquidity providers. Since others can deposit at any time, even potentially in the same ledger version where the AMM was created, you shouldn't assume that this amount represents your personal LP Tokens balance.

`lp_token`

`amm_info`

`amm_info`

Check AMM


### 8. Check trust lines

You can also use the account_lines method to get an updated view of your token balances. Your balances should be decreased by the amounts you deposited, but you now have a balance of LP Tokens that you received from the AMM.

- JavaScript

```
// Check token balances
  const account_lines_result = await client.request({
    "command": "account_lines",
    "account": wallet.address,
    // Tip: To look up only the new AMM's LP Tokens, uncomment:
    // "peer": lp_token.issuer,
    "ledger_index": "validated"
  })
  console.log(account_lines_result)
```

The account_lines response shows only the tokens held by the account you looked up (probably yours). If you have a lot of tokens, you may want to specify the AMM address as the peer in the request so you don't have to paginate over multiple requests to find the AMM's LP Tokens. In this tutorial, your account probably only holds the three different tokens, so you can see all three in the same response.

`account_lines`

`peer`

TipIf one of the assets in the AMM's pool is XRP, you need to call the account_info method on your account to see the difference in your balance (the Balance field of the account object).

`Balance`

Check trust lines


## Next Steps

At this point the AMM is up and running, and trades in the DEX automatically use this AMM in combination with Offers to achieve the best exchange rate possible between the two assets in the AMM's pool. If the flow of funds between the two assets is relatively balanced and there are no major shifts in the value of one asset compared to the other, this can become a source of passive income for you and anyone else who deposits liquidity into the AMM's pool.

When you want to withdraw liquidity from the AMM, you can use AMMDeposit to cash in your LP Tokens to receive a share of the AMM's assets. You can also use LP Tokens like any other tokens in the XRP Ledger, which means you can trade them, use them in payments, or even deposit them in another AMM.

However, you should keep an eye on market conditions, and use tools like AMMBid and AMMVote to insulate yourself from losses due to changes in the relative value of the two assets in the pool.

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

![(loading)](https://xrpl.org/img/xrp-loader-96.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=430f5cf9-2a5b-4076-8fc4-f441f35584c2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=430f5cf9-2a5b-4076-8fc4-f441f35584c2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0686828d-d638-44de-acb9-f14682d04bb7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0686828d-d638-44de-acb9-f14682d04bb7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=3580601c-6eab-4d61-b174-b6ac05df4ff8&bo=1&sid=19d3fe409d9f11f0b1f39debd02bfa84&vid=19d46c209d9f11f0a629b572049178a3&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20an%20Automated%20Market%20Maker&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&r=&lt=3146&evt=pageLoad&sv=2&cdb=AQAS&rn=914218)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3a8dc7d6-0569-42ee-9e29-ff6fcae5b260&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3a8dc7d6-0569-42ee-9e29-ff6fcae5b260&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e7c42e8c-8ea6-4850-8e0b-2023de003bdf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e7c42e8c-8ea6-4850-8e0b-2023de003bdf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=23f418d9-dfd0-4604-ae87-c3399053c2ff&pt=Create%20an%20Automated%20Market%20Maker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-tokens%2Fcreate-an-automated-market-maker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-tokens/create-an-automated-market-maker#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-tokens/create-an-automated-market-maker#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-tokens/create-an-automated-market-maker#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-tokens/create-an-automated-market-maker#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.ae68a46302d5166fc6854e877810b09e.1759196713344.1759196713344.1759196713344.1&__hssc=78174987.1.1759196713344&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-tokens/create-an-automated-market-maker.md)
- [xrpl.js library](https://github.com/XRPLF/xrpl.js/)
- [MIT license](https://github.com/XRPLF/xrpl-dev-portal/blob/master/LICENSE)
- [Code Samples: Create an AMM](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/create-amm/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.ae68a46302d5166fc6854e877810b09e.1759196713344.1759196713344.1759196713344.1&__hssc=78174987.1.1759196713344&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:45:29.903Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
