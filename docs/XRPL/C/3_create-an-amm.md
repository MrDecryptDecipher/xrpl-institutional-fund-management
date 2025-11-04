# Create an AMM
URL: https://xrpl.org/docs/tutorials/javascript/amm/create-an-amm
Section: C3

## Overview


## Extracted Content
# Create an AMM

This example shows how to:

1. Check if an AMM pair exists.
1. Issue a token.
1. Create an AMM pair with the issued tokens and XRP.
1. Create another AMM pair with two issued tokens.

You can download the Quickstart Samples archive to try each of the samples in your own browser.

Without the Quickstart Samples, you will not be able to try the examples that follow.


## Usage


### Get Accounts

1. Open 11.create-amm.html in a browser.
1. Select Testnet or Devnet
1. Get test accounts.If you have existing account seeds:Paste account seeds in the Seeds field.Click Get Accounts from Seeds.If you don't have account seeds:Click Get New Standby Account.Click Get New Operational Account.
1. If you have existing account seeds:Paste account seeds in the Seeds field.Click Get Accounts from Seeds.
1. Paste account seeds in the Seeds field.
1. Click Get Accounts from Seeds.
1. If you don't have account seeds:Click Get New Standby Account.Click Get New Operational Account.
1. Click Get New Standby Account.
1. Click Get New Operational Account.

`11.create-amm.html`

- If you have existing account seeds:Paste account seeds in the Seeds field.Click Get Accounts from Seeds.
- Paste account seeds in the Seeds field.
- Click Get Accounts from Seeds.
- If you don't have account seeds:Click Get New Standby Account.Click Get New Operational Account.
- Click Get New Standby Account.
- Click Get New Operational Account.

1. Paste account seeds in the Seeds field.
1. Click Get Accounts from Seeds.

1. Click Get New Standby Account.
1. Click Get New Operational Account.


### Check AMM

Check if an AMM pair already exists. An AMM holds two different assets: at most one of these can be XRP, and one or both of them can be tokens.

1. Enter a currency code in the Asset 1 Currency field. For example, XRP.
1. Enter a second currency code in the Asset 2 Currency field. For example, TST.
1. Enter the operational account address in the Asset 2 Issuer field.
1. Click Check AMM.

`XRP`

`TST`


### Create Trustline

Create a trustline from the operational account to the standby account. In the standby account fields:

1. Enter a maximum transfer limit in the Amount field, such as 10,000.
1. Enter the operational account address in the Destination field.
1. Enter a currency code in the Currency field. For example, TST.
1. Click Create Trustline.

`TST`


### Issue Tokens

Send issued tokens from the operational account to the standby account. In the operational account fields:

1. Select Allow Rippling and click Configure Account.NoteThis enables the defaultRipple flag on the issuing account, which is set to false by default. You need to enable this in order to trade tokens issued by the account. See Configure Issuer Settings to learn more.
1. Enter a value in the Amount field, up to the maximum transfer amount you set in the trustline.
1. Enter the standby account address in the Destination field.
1. Enter the currency code from the trustline in the Currency field.
1. Click Send Currency.

This enables the defaultRipple flag on the issuing account, which is set to false by default. You need to enable this in order to trade tokens issued by the account. See Configure Issuer Settings to learn more.

`defaultRipple`

`false`


### Create an XRP/Token AMM

Create a new AMM pool with XRP and the issued tokens.

1. Enter XRP in the Asset 1 Currency field.
1. Enter an amount of XRP in the Asset 1 Amount field. Save some XRP for later use in the tutorial.
1. Enter the currency code of your issued tokens in the Asset 2 Currency field.
1. Enter the operational account address in the Asset 2 Issuer field.
1. Enter an amount in the Asset 2 Amount field.
1. Click Create AMM.

`XRP`

`XRP`

Save the seed values of the standby and operational accounts for subsequent AMM tutorials.


### Create a Token/Token AMM

Create a second AMM pool with two issued tokens.

1. Repeat the steps from Create Trustline, using a different currency code. For example, FOO.
1. Repeat the steps from Issue Tokens, using the second currency.
1. Enter the first currency code in the Asset 1 Currency field.
1. Enter the operational account address in the Asset 1 Issuer field.
1. Enter an amount in the Asset 1 Amount field.
1. Enter the second currency code in the Asset 2 Currency field.
1. Enter the operaional account address in the Asset 2 Issuer field.
1. Enter an amount in the Asset 2 Amount field.
1. Click Create AMM.

`FOO`


## Code Walkthrough

You can open ripplex11-create-amm.js from the Quickstart Samples to view the source code.

`ripplex11-create-amm.js`


### Create AMM

This sends the AMMCreate transaction and creates a new AMM, using the initial assets provided. The code checks the token currency fields and formats the AMMCreate transaction based on the combination of XRP and custom tokens.

`AMMCreate`

`AMMCreate`

`XRP`

```
async function createAMM() {
```

Connect to the XRP Ledger.

```
let net = getNet()

  const client = new xrpl.Client(net)
  results = `\n\nConnecting to ${getNet()} ...`
  standbyResultField.value = results

  await client.connect()
  results += '\n\nConnected.'
  standbyResultField.value = results
```

Get the AMM information fields.

```
const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)

  const asset1_currency = asset1CurrencyField.value
  const asset1_issuer = asset1IssuerField.value
  const asset1_amount = asset1AmountField.value

  const asset2_currency = asset2CurrencyField.value
  const asset2_issuer = asset2IssuerField.value
  const asset2_amount = asset2AmountField.value
```

Format the AMMCreate transaction based on the combination of XRP and tokens.

`AMMCreate`

`XRP`

```
let ammCreate = null
  
  results += '\n\nCreating AMM ...'
  standbyResultField.value = results
  
  // AMMCreate requires burning one owner reserve. We can look up that amount
  // (in drops) on the current network using server_state:
  const ss = await client.request({"command": "server_state"})
  const amm_fee_drops = ss.result.state.validated_ledger.reserve_inc.toString()

  if (asset1_currency == 'XRP') {

    ammCreate = {
      "TransactionType": "AMMCreate",
      "Account": standby_wallet.address,
      "Amount": JSON.stringify(asset1_amount * 1000000), // convert XRP to drops
      "Amount2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer,
        "value": asset2_amount
      },
      "TradingFee": 500, // 500 = 0.5%
      "Fee": amm_fee_drops
    }

  } else if (asset2_currency =='XRP') {

    ammCreate = {
      "TransactionType": "AMMCreate",
      "Account": standby_wallet.address,
      "Amount": {
        "currency": asset1_currency,
        "issuer": asset1_issuer,
        "value": asset1_amount
      },
      "Amount2": JSON.stringify(asset2_amount * 1000000), // convert XRP to drops
      "TradingFee": 500, // 500 = 0.5%
      "Fee": amm_fee_drops
    }

  } else {

    ammCreate = {
      "TransactionType": "AMMCreate",
      "Account": standby_wallet.address,
      "Amount": {
        "currency": asset1_currency,
        "issuer": asset1_issuer,
        "value": asset1_amount
      },
      "Amount2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer,
        "value": asset2_amount
      },
      "TradingFee": 500, // 500 = 0.5%
      "Fee": amm_fee_drops
    }
    
  }
```

Prepare the transaction for submission. Wrap the submission in a try-catch block to handle any errors.

`try-catch`

```
try {
 
    const prepared_create = await client.autofill(ammCreate)
    results += `\n\nPrepared transaction:\n${JSON.stringify(prepared_create, null, 2)}`
    standbyResultField.value = results
    standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Sign the prepared transaction using the standy account wallet.

```
const signed_create = standby_wallet.sign(prepared_create)
    results += `\n\nSending AMMCreate transaction ...`
    standbyResultField.value = results
    standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Submit the signed transaction to the XRPL.

```
const amm_create = await client.submitAndWait(signed_create.tx_blob)
    
    if (amm_create.result.meta.TransactionResult == "tesSUCCESS") {
      results += `\n\nTransaction succeeded.`
    } else {
      results += `\n\nError sending transaction: ${JSON.stringify(amm_create.result.meta.TransactionResult, null, 2)}`
    }
  
  } catch (error) {
    results += `\n\n${error.message}`
  }
```

Report the transaction results in the standby account log. Run the checkAMM() function to update the AMM's information in the AMM log.

`checkAMM()`

```
standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight

  checkAMM()
      
  client.disconnect()
  
}
```


### Check AMM

This checks if an AMM already exists. While multiple tokens can share the same currency code, each issuer makes them unique. If the AMM pair exists, this responds with the AMM information, such as token pair, trading fees, etc.

```
async function checkAMM() {
```

Connect to the XRP Ledger.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
```

Get the AMM info fields. When checking an AMM, you only need the currency code and issuer.

```
// Gets the issuer and currency code
  const asset1_currency = asset1CurrencyField.value
  const asset1_issuer = asset1IssuerField.value

  const asset2_currency = asset2CurrencyField.value
  const asset2_issuer = asset2IssuerField.value
```

Format the amm_info command based on the combination of XRP and tokens.

`amm_info`

`XRP`

```
let amm_info_request = null

  // Get AMM info transaction

  if (asset1_currency == 'XRP') {

    amm_info_request = {
      "command": "amm_info",
      "asset": {
        "currency": "XRP"
      },
      "asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      },
      "ledger_index": "validated"
    }

  } else if (asset2_currency =='XRP') {

    amm_info_request = {
      "command": "amm_info",
      "asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "asset2": {
        "currency": "XRP"
      },
      "ledger_index": "validated"
    }

  } else {

    amm_info_request = {
      "command": "amm_info",
      "asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      },
      "ledger_index": "validated"
    }
    
  }
```

Submit the request in a try-catch block and update the AMM log.

`try-catch`

```
try {
    const amm_info_result = await client.request(amm_info_request)
    ammInfo = `AMM Info:\n\n${JSON.stringify(amm_info_result.result.amm, null, 2)}`
  } catch(error) {
    ammInfo = `AMM Info:\n\n${error}`
  }
  
  ammInfoField.value = ammInfo
      
  client.disconnect()
  
}
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Create AMM test harness](https://xrpl.org/assets/quickstart-create-amm1.22416cf40c597728d187bc06b8ec583aa4c18889772cffef26a9c7dcaf8d9e1b.ac57e6ef.png)

![Get account results](https://xrpl.org/assets/quickstart-create-amm2.c132ecafa802100a4a45c68788827d1d5d89786577d3da86fa96cdd0f908cd9a.ac57e6ef.png)

![Check AMM results](https://xrpl.org/assets/quickstart-create-amm3.49a873399ff29d8d907887d0d8b76fe06aede1bcf2592cade0cbcd396dca93e0.ac57e6ef.png)

![Create trustline results](https://xrpl.org/assets/quickstart-create-amm4.07560b41c921b07245eea321e56a112303fb4e8cab02edb27a8b9ff96fde9d30.ac57e6ef.png)

![Issue token results](https://xrpl.org/assets/quickstart-create-amm5.1ebfe89d019851b2c72de361c94197e758a0a90da163445c22ba746c37113cf1.ac57e6ef.png)

![Create AMM results](https://xrpl.org/assets/quickstart-create-amm6.dfa594b0a159ab2718497fd1fe27f954d1728d69b89672acb546e84b764f68e6.ac57e6ef.png)

![Create AMM results](https://xrpl.org/assets/quickstart-create-amm7.2a95c7098c203e18bf0630222cd0a00a864e22af7e55ca98a06273232832c53b.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ba1d17b8-8773-4f00-a9f6-d2eeab692c52&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ba1d17b8-8773-4f00-a9f6-d2eeab692c52&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f0728a70-9703-4dde-b655-c70143e15fe9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f0728a70-9703-4dde-b655-c70143e15fe9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=df5810eb-fcdf-4632-b4c0-83aef764aa9d&bo=1&sid=535cfb909d9b11f0bffdf334201c4c19&vid=535d50309d9b11f0a00ed57f06e81cbc&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20an%20AMM&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&r=&lt=2723&evt=pageLoad&sv=2&cdb=AQAS&rn=232598)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5d884a75-73c4-497d-80e4-cb652974dc0d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5d884a75-73c4-497d-80e4-cb652974dc0d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b7bdac03-9c07-4e74-8a95-7024d560e371&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b7bdac03-9c07-4e74-8a95-7024d560e371&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c5a2a5ed-cd34-4de9-967c-1c99aa5f0b7b&pt=Create%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fcreate-an-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/amm/create-an-amm#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/amm/create-an-amm#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/amm/create-an-amm#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/amm/create-an-amm#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f3d94966e89e331635b7e9526c988ed4.1759195091044.1759195091044.1759195091044.1&__hssc=78174987.2.1759195091044&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/amm/create-an-amm.md)
- [Quickstart Samples](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/quickstart/js/)
- [Quickstart Samples](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/quickstart/js/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f3d94966e89e331635b7e9526c988ed4.1759195091044.1759195091044.1759195091044.1&__hssc=78174987.2.1759195091044&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:19:03.727Z
Agent: Qoder + Playwright MCP
Retries: 1
Status: SUCCESS
