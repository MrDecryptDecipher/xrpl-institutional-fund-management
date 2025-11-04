# Create Offers
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/create-offers
Section: C9

## Overview


## Extracted Content
# Create Offers

This example shows how to:

1. Create currency offers.
1. Retrieve active offers.
1. Match a currency offer to exchange tokens.
1. Cancel an unsettled offer.

Download and expand the Modular Tutorials archive.

Note: Without the Modular Tutorial Samples, you will not be able to try the examples that follow.


## Usage

To get test accounts:

1. Open create-offers.html in a browser.
1. Choose your preferred test network (Devnet or Testnet).
1. Get test accounts.If you copied the gathered information from another tutorial:Paste the gathered information to the Result field.Click Distribute Account Info.If you have an existing account seed:Paste the account seed to the Account 1 Seed or Account 2 Seed field.Click Get Account 1 from Seed or Get Account 2 from Seed.If you do not have existing accounts:Click Get New Account 1.Click Get New Account 2.
1. If you copied the gathered information from another tutorial:Paste the gathered information to the Result field.Click Distribute Account Info.
1. Paste the gathered information to the Result field.
1. Click Distribute Account Info.
1. If you have an existing account seed:Paste the account seed to the Account 1 Seed or Account 2 Seed field.Click Get Account 1 from Seed or Get Account 2 from Seed.
1. Paste the account seed to the Account 1 Seed or Account 2 Seed field.
1. Click Get Account 1 from Seed or Get Account 2 from Seed.
1. If you do not have existing accounts:Click Get New Account 1.Click Get New Account 2.
1. Click Get New Account 1.
1. Click Get New Account 2.

`create-offers.html`

1. If you copied the gathered information from another tutorial:Paste the gathered information to the Result field.Click Distribute Account Info.
1. Paste the gathered information to the Result field.
1. Click Distribute Account Info.
1. If you have an existing account seed:Paste the account seed to the Account 1 Seed or Account 2 Seed field.Click Get Account 1 from Seed or Get Account 2 from Seed.
1. Paste the account seed to the Account 1 Seed or Account 2 Seed field.
1. Click Get Account 1 from Seed or Get Account 2 from Seed.
1. If you do not have existing accounts:Click Get New Account 1.Click Get New Account 2.
1. Click Get New Account 1.
1. Click Get New Account 2.

1. Paste the gathered information to the Result field.
1. Click Distribute Account Info.

1. Paste the account seed to the Account 1 Seed or Account 2 Seed field.
1. Click Get Account 1 from Seed or Get Account 2 from Seed.

1. Click Get New Account 1.
1. Click Get New Account 2.

You can create and match offers from either account.


## Create Offer

To create an offer to exchange XRP for an issued currency:

1. Click Account 1 or Account 2.
1. Enter XRP as the Taker Pays Currency Code.
1. Enter the Taker Pays Amount in drops. For example, 50000000.
1. Enter the Taker Gets Currency. For example, USD.
1. Copy the current Account Address and paste it in the Taker Gets Issuer field.
1. Enter the Taker Gets Amount. For example, 50.
1. Click Create Offer.


## Get Offers

Click Get Offers to get a list of offers issued by the corresponding account.


## Create a Matching Offer

1. Choose an account other than the Issuer. For example, Account 2.
1. Enter XRP as the Taker Gets Currency Code.
1. Enter the Taker Gets Amount. For example, 50000000.
1. Enter the Taker Pays Currency Code, for example USD.
1. Enter the Taker Pays Issuer. For example, the Account 1 Address.
1. Enter the Taker Pays Amount For example, 50.
1. Click Create Offer.


## Cancel Offer

To cancel an existing offer:

1. Enter the sequence number of the offer in the Offer Sequence field. To find the sequence number, you can click Get Offers, then look for the Seq value for the offer you want to cancel.

1. Click Cancel Offer, then click Get Offers to show that the offer has been removed from the list of outstanding offers.


# Code Walkthrough

You can download the Payment Modular Tutorials from the source repository for this website.


## create-offer.js

The functions in create-offer.html leverage functions from the base module. The functions that follow are solely focused on creating and handling offers.


### Create Offer

Connect to the XRP Ledger and get the account wallet.

```
async function createOffer() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ${net}, getting wallet....===\n`
  resultField.value = results
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
```

Gather the information for what the taker pays, and what the taker gets in return. If the Currency Code is XRP, the amount is equal to the value in the Amount field. Otherwise, the takerGets parameter is constructed as an array containing the currency code, issuer address, and the value in the amount field.

`takerGets`

```
try {
    if (getCurrencyField.value == 'XRP') {
        takerGets = getAmountField.value
    } else {
        takerGetsString = '{"currency": "' + getCurrencyField.value +'",\n' +
            '"issuer": "' + getIssuerField.value + '",\n' +
            '"value": "' + getAmountField.value + '"}'
        takerGets = JSON.parse(takerGetsString)
    }
```

The same logic is used to create the value for the takerPays parameter.

`takerPays`

```
if (payCurrencyField.value == 'XRP') {
      takerPays = xrpl.xrpToDrops(payAmountField.value)
    } else {
      takerPaysString = '{"currency": "' + payCurrencyField.value + '",\n' +
        '"issuer": "' + payIssuerField.value + '",\n' +
        '"value": "' + payAmountField.value + '"}'
      takerPays = JSON.parse(takerPaysString)
    }
```

Define the OfferCreate transaction, using the takerPays and takerGets parameters defined above.

`OfferCreate`

`takerPays`

`takerGets`

```
const prepared = await client.autofill({
   "TransactionType": "OfferCreate",
   "Account": wallet.address,
   "TakerGets": takerGets,
   "TakerPays": takerPays
 })
```

Sign and send the prepared transaction, and wait for the results.

```
const signed = wallet.sign(prepared)
    const tx = await client.submitAndWait(signed.tx_blob)
```

Request the token balance changes after the transaction.

```
results = '\n\n===Offer created===\n\n' +
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    resultField.value += results
```

Get the new XRP balance, reflecting the payments and transaction fees.

```
xrpBalanceField.value =  (await client.getXrpBalance(wallet.address))
```

```
getOffers()
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
} catch (err) {
    console.error('Error creating offer:', err);
    results = `\nError: ${err.message}\n`
    resultField.value += results
    throw err; // Re-throw the error to be handled by the caller
  }
  finally {
    // Disconnect from the client          
    client.disconnect()
  })
```


### getOffers

This function requests a list of all offers posted by an account.

Connect to the XRP Ledger and get the Account wallet.

```
async function getOffers() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ' + ${net}, getting offers....===\n`
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  resultField.value = results
```

Send a request for all account_offers for the specified account address and report the results.

`account_offers`

```
results += '\n\n*** Offers ***\n'
  let offers
    try {
    offers = await client.request({
      method: "account_offers",
      account: wallet.address,
      ledger_index: "validated"
    })
    results = JSON.stringify(offers, null, 2)
    resultField.value += results
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
} catch (err) {
    console.error('Error getting offers:', err);
    results = `\nError: ${err.message}\n`
    resultField.value += results
    throw err; // Re-throw the error to be handled by the caller
  }
  finally {
    client.disconnect()
  }
```


### cancelOffer()

You can cancel an offer before it is matched with another offer.

Connect to the XRP Ledger and get the account wallet.

```
async function cancelOffer() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ${net}, canceling offer.===\n`
  resultField.value = results
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
```

Prepare the OfferCancel transaction, passing the account address of the account that created the offer and the Sequence of the offer.

`OfferCancel`

`Sequence`

```
try {
    const prepared = await client.autofill({
      "TransactionType": "OfferCancel",
      "Account": wallet.address,
      "OfferSequence": parseInt(offerSequenceField.value)
    })
```

Sign and submit the transaction, then wait for the result.

```
const signed = wallet.sign(prepared)
  const tx = await client.submitAndWait(signed.tx_blob)
```

Report the results.

```
results += "\nOffer canceled. Balance changes: \n" +
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    resultField.value = results
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
}
  catch (err) {
    console.error('Error canceling offer:', err);
    results = `\nError: ${err.message}\n`
    resultField.value += results
    throw err; // Re-throw the error to be handled by the caller
  }
  finally {
    client.disconnect()
  }
}// End of cancelOffer()
```


## create-offer.html

```
<html>
<head>
    <title>Create Offers</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='send-xrp.js'></script>
    <script src='create-offer.js'></script>
    <script>
        if (typeof module !== "undefined") {
            const xrpl = require('xrpl')
        }
    </script>
</head>

<!-- ************************************************************** -->
<!-- ********************** The Form ****************************** -->
<!-- ************************************************************** -->

<body>
    <h1>Create Offers</h1>
    <form id="theForm">
        <span class="tooltip" tooltip-data="Choose the XRPL host server for your account.">
            Choose your ledger instance:
        </span>
        &nbsp;&nbsp;
        <input type="radio" id="dn" name="server" value="wss://s.devnet.rippletest.net:51233" checked>
        <label for="dn">Devnet</label>
        &nbsp;&nbsp;
        <input type="radio" id="tn" name="server" value="wss://s.altnet.rippletest.net:51233">
        <label for="tn">Testnet</label>
        <br /><br />
        <table>
            <tr>
                <td>
                    <button type="button" onClick="getNewAccount1()">Get New Account 1</button>
                </td>
                <td>
                    <button type="button" onClick="getAccountFromSeed1()">Get Account 1 From Seed</button>
                </td>
                <td>
                    <button type="button" onClick="getNewAccount2()">Get New Account 2</button>
                </td>
                <td>
                    <button type="button" onClick="getAccountFromSeed2()">Get Account 2 From Seed</button>
                </td>
            </tr>
            <tr>
                <td>
                        <span class="tooltip" tooltip-data="Arbitrary human-readable name for the account."><label for="account1name">Account 1 Name</label>
                        </span>
                </td>
                <td>
                    <input type="text" id="account1name" size="40"></input>
                </td>
                <td>
                    <span class="tooltip" tooltip-data="Arbitrary human-readable name for the account.">
                        <label for="account2name">Account 2 Name</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="account2name" size="40"></input>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="tooltip" tooltip-data="Identifying address for the account.">
                        <label for="account1address">Account 1 Address</label>
                    </span>
                </td>
                <td> 
                    <input type="text" id="account1address" size="40"></input>
                </td>
                <td>
                    <span class="tooltip" tooltip-data="Identifying address for the account.">
                        <label for="account2address">Account 2 Address</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="account2address" size="40"></input>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="tooltip" tooltip-data="Seed for deriving public and private keys for the account.">
                        <label for="account1seed">Account 1 Seed</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="account1seed" size="40"></input>
                </td>
                <td>
                    <span class="tooltip" tooltip-data="Seed for deriving public and private keys for the account.">
                        <label for="account2seed">Account 2 Seed</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="account2seed" size="40"></input>
                </td>
            </tr>
        </table>
        <hr />
        <table>
            <tr valign="top">
                <td align="right">
                    <span class="tooltip" tooltip-data="Name of the currently selected account.">
                        <label for="accountNameField">Account Name</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="accountNameField" size="40" readonly></input>
                    <input type="radio" id="account1" name="accounts" value="account1">
                    <label for="account1">Account 1</label>
                </td>
            </tr>
            <tr valign="top">
                <td align="right">
                    <span class="tooltip" tooltip-data="Address of the currently selected account.">
                        <label for="accountAddressField">Account Address</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="accountAddressField" size="40" readonly></input>
                    <input type="radio" id="account2" name="accounts" value="account2">
                    <label for="account2">Account 2</label>
                </td>
            </tr>
            <tr valign="top">
                <td align="right">
                    <span class="tooltip" tooltip-data="Seed of the currently selected account.">
                        <label for="accountSeedField">Account Seed</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="accountSeedField" size="40" readonly></input>
                    <br>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="XRP balance for the currently selected account.">
                        <label for="xrpBalanceField">XRP Balance</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="xrpBalanceField" size="40" readonly></input>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td></td>
                <td>
                    <h4 align="center">Taker Pays</h4>
                </td>
                <td>
                    <h4 align="center">Taker Gets</h4>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Currency codes for the Pay and Get offers.">
                    <lable for="payCurrencyField">Currency Code</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="payCurrencyField" size="40"></input>
                </td>
                <td>
                    <input type="text" id="getCurrencyField" size="40"></input>
                </td> 
                <td>          
                    <button type="button" onClick="createOffer()">Create Offer</button>
                </td>   
            </tr> 
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Issuers of the offered currencies.">
                        <lable for="payIssuerField">Issuer</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="payIssuerField" size="40"></input>&nbsp;&nbsp;
                </td>  
                <td>
                    <input type="text" id="getIssuerField" size="40"></input>&nbsp;&nbsp;
                </td>
                <td>
                    <button type="button" onClick="getOffers()">Get Offers</button>
                </td>
            </tr>    
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Amounts of offered currencies.">
                        <lable for="amountField">Amount</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="payAmountField" size="40"></input>
                </td> 
                <td>
                    <input type="text" id="getAmountField" size="40"></input>
                </td>
                <td>
                    <button type="button" onClick="cancelOffer()">Cancel Offer</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Sequence number of the offer.">
                        <lable for="offerSequenceField">Offer Sequence</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="offerSequenceField" size="40"></input>
                </td> 
                <td></td>
                <td>
                    <button type="button" onClick="getTokenBalance()">Get Token Balance</button>
                </td>
            </tr>  
            <tr>
                <td colspan="3">
                    <p align="right">
                        <textarea id="resultField" cols="80" rows="20"></textarea>
                    </p>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="gatherAccountInfo()">Gather Account Info</button><br/>
                    <button type="button" onClick="distributeAccountInfo()">Distribute Account Info</button>
                </td>
            </tr>
        </table>
    </form>
</body>
<script>
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'account1') {
                populate1()
            } else if (this.value === 'account2') {
                populate2()
            }
        });
    });
</script>
</html>
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Offer Create Token Test Harness](https://xrpl.org/assets/mt-create-offers-1-empty-form-info.399f4fc313e687c08824419ab0bcdef6c64aaf1816b647258497f15d28a033f2.ac57e6ef.png)

![Created Accounts](https://xrpl.org/assets/mt-create-offers-2-form-with-account-info.68124deefdb6b9ce5788d4ef59f57727f9477779c24997b9ef1d7ba9b83151df.ac57e6ef.png)

![Created an offer for XRP and USD](https://xrpl.org/assets/mt-create-offers-3-xrp-for-usd-offer.d0eeb832fda55c41a80f9574b790496f93d66dee4d8b030956d534042ca61590.ac57e6ef.png)

![Created an offer for XRP and USD](https://xrpl.org/assets/mt-create-offers-3-xrp-for-usd-offer.d0eeb832fda55c41a80f9574b790496f93d66dee4d8b030956d534042ca61590.ac57e6ef.png)

![Results of matching offers for XRP and USD](https://xrpl.org/assets/mt-create-offers-4-matching-offer.d8ae3f9036a7055b34fe4076f79d2f78fc9dc0c1ad1befe0194c71849e5a68e6.ac57e6ef.png)

![Where to find the "seq" value in an offer record](https://xrpl.org/assets/mt-create-offers-5-sequence-number.a13cd752a0743d435fd509c9dc958bf4f8256ab8b061cdb577869d0fd415c113.ac57e6ef.png)

![Get Offers result showing no offers](https://xrpl.org/assets/mt-create-offers-6-no-offers.3ab0560f51d4a135e7b3c261c3b19afbc6336130d60d69da60acde0cfaaec8ab.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=50ef0b56-ff4a-474d-ab86-870b0a2e13e4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=50ef0b56-ff4a-474d-ab86-870b0a2e13e4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f6f2819-ac68-4fb6-90b2-2326e4b7181c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f6f2819-ac68-4fb6-90b2-2326e4b7181c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=134cb522-8cc3-477d-a02d-ac4ea829681e&bo=1&sid=d89690209d9b11f0a811931a5110ee38&vid=d89708209d9b11f0a8f32d9e59727d1e&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20Offers&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&r=&lt=3336&evt=pageLoad&sv=2&cdb=AQAS&rn=13485)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=194ad2f2-73f8-422b-a0d4-585edbd70577&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=194ad2f2-73f8-422b-a0d4-585edbd70577&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9ef3a797-3dc5-4711-96f8-a087b3f0adbe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9ef3a797-3dc5-4711-96f8-a087b3f0adbe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1af6423e-e183-49d6-8754-59544be690b2&pt=Create%20Offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/create-offers#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/create-offers#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/create-offers#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/create-offers#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e0cdb3cf125a6a91508fa4bcab9caa5c.1759195314527.1759195314527.1759195314527.1&__hssc=78174987.1.1759195314528&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/create-offers.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e0cdb3cf125a6a91508fa4bcab9caa5c.1759195314527.1759195314527.1759195314527.1&__hssc=78174987.1.1759195314528&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:22:14.982Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
