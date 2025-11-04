# Create Trust Line and Send Currency Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/create-trust-line-send-currency
Section: C8

## Overview


## Extracted Content
# Create Trust Line and Send Currency Using JavaScript

This example shows how to:

1. Create a trust line between two accounts.
1. Send issued currency between accounts.
1. Display account balances for all currencies.

You can download the Payment Modular Tutorials from the source repository for this website.

NoteWithout the Payment modular tutorials, you will not be able to try the examples that follow.


## Usage

Open the Send Currency test harness and get accounts:

1. Open send-currency.html in a browser.
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

`send-currency.html`

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

If you want an account to be able to transfer issued currency to accounts other than the issuer, the issuer account must be configured to allow rippling. See Issuer in the Configuring Accounts topic.

Accounts can always transfer currency tokens back to the original issuer.


## Create Trust Line

In order to trade standard tokens, you must first establish a trust line from the receiving account to the issuing account.

To create a trust line between accounts:

1. Click Account 2 to populate the uneditable fields in the form.
1. Enter a currency code in the Currency Code field.
1. Enter the maximum transfer limit in the Amount field.
1. Copy and paste the Account 1 Address value to the Issuer field.
1. Click Create Trust Line.


## Send an Issued Currency Token

To transfer an issued currency token, once you have created a trust line:

1. Click Account 1.
1. Enter the Currency Code.
1. Copy and paste the Account 1 Address to the Issuer field.
1. Enter the Amount of issued currency to send.
1. Copy and paste the Account 2 Address to the Destination field.
1. Click Send Currency.


## Get the Current Token Balance

To see the balances for all issued tokens for an account.

1. Click Account 1 or Account 2.
1. Click Get Token Balance.

The balance for an issuing account is shown as an obligation.

The balance for a holder account is shown as an asset.


# Code Walkthrough

You can download the Payment Modular Tutorials from the source repository for this website.


## send-currency.js

There are two asynchronous functions in the send-currency.js file that build on the base module to add new behavior for sending issued currency between accounts.


### Create Trust Line

A trust line enables two accounts to trade a defined currency up to a set limit. This gives the participants assurance that any exchanges are between known entities at agreed upon maximum amounts.

Connect to the XRPL server.

```
async function createTrustLine() {
  const net = getNet() 
  const client = new xrpl.Client(net)
  await client.connect()
  let results = "\nConnected. Creating trust line.\n"
  resultField.value = results
```

Create a TrustSet transaction, passing the currency code, issuer account, and the total value the holder is willing to accept.

`TrustSet`

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const trustSet_tx = {
      "TransactionType": "TrustSet",
      "Account": accountAddressField.value,
      "LimitAmount": {
        "currency": currencyField.value,
        "issuer": issuerField.value,
        "value": amountField.value
      }
    }
```

Autofill the remaining default transaction parameters.

```
const ts_prepared = await client.autofill(trustSet_tx)
```

Sign and send the transaction to the XRPL server, then wait for the results.

```
const ts_signed = wallet.sign(ts_prepared)
  resultField.value = results
  const ts_result = await client.submitAndWait(ts_signed.tx_blob)
```

Report the results of the transaction.

```
if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
        results += '\n===Trust line established between account \n' +
        accountAddressField.value + ' \n and account\n' + issuerField.value + '.'
        resultField.value = results
    } else {
        results += `\n===Transaction failed: ${ts_result.result.meta.TransactionResult}`
        resultField.value = results     
    }
  }
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    console.error('===Error creating trust line:', error);
    results += `\n===Error: ${error.message}\n`
    resultField.value = results
    throw error; // Re-throw the error to be handled by the caller
  }
  finally {
    // Disconnect from the client
    await client.disconnect();
  }
}
//End of createTrustline()
```


### sendCurrency()

This transaction actually sends a transaction that changes balances on both sides of the trust line.

Connect to the XRP Ledger and get the account wallet.

```
async function sendCurrency() {
  let net = getNet()
  const client = new xrpl.Client(net)
  results = 'Connecting to ' + getNet() + '....'
  resultField.value = results
  await client.connect()
  results += '\nConnected.'
  resultField.value = results
```

Create a payment transaction to the destination account, specifying the amount using the currency, value, and issuer.

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const send_currency_tx = {
      "TransactionType": "Payment",
      "Account": wallet.address,
      "Amount": {
        "currency": currencyField.value,
        "value": amountField.value,
        "issuer": issuerField.value
      },
      "Destination": destinationField.value
    }
```

Autofill the remaining default transaction parameters.

```
const pay_prepared = await client.autofill(send_currency_tx)
```

Sign and send the prepared payment transaction to the XRP Ledger, then await and report the results.

```
const pay_signed = wallet.sign(pay_prepared)
    results += `\n\n===Sending ${amountField.value} ${currencyField.value} to ${destinationField.value} ...`
    resultField.value = results
    const pay_result = await client.submitAndWait(pay_signed.tx_blob)
    if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
        results += '\n===Transaction succeeded.'
        resultField.value = results
    } else {
        results += `\n===Transaction failed: ${pay_result.result.meta.TransactionResult}`
        resultField.value = results
        xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
    }
  }
```

Update the XRP value field to reflect the transaction fee.

```
catch (error) {
    console.error('Error sending transaction:', error);
    results += `\nError: ${error.message}\n`
    resultField.value = results
    throw error; // Re-throw the error to be handled by the caller
  }
  finally {
    // Disconnect from the client
    await client.disconnect();
  }
} // end of sendCurrency()
```


## send-currency.html

Update the form to support the new functions.

```
<html>
<head>
    <title>Send Currency</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='send-xrp.js'></script>
    <script src='send-currency.js'></script>
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
    <h1>Send Currency</h1>
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
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Currency code for the trust line.">
                    <lable for="currencyField">Currency Code</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="currencyField" size="40"></input>
                    <br>
                </td> 
                <td>
                    <button type="button" onClick="createTrustLine()">Create Trust Line</button>
                </td>               
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Issuing account for the currency.">
                    <lable for="issuerField">Issuer</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="issuerField" size="40"></input>
                    <br>
                </td> 
                <td>
                    <button type="button" onClick="sendCurrency()">Send Currency</button>
                </td>              
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Amount of XRP to send.">
                        <label for="amountField">Amount</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="amountField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="getTokenBalance()">Get Token Balance</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Destination account address where XRP is sent.">
                    <lable for="destinationField">Destination</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="destinationField" size="40"></input>
                    <br>
                </td>
            </tr>
            <tr>
                <td colspan="2">
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

![Send Currency test harness](https://xrpl.org/assets/mt-send-currency-1-empty-form-info.6d95e080d536a53431e15e88bcb4f313a304f1131a806d91c0dc8de6475443fa.ac57e6ef.png)

![Distribute Account Information](https://xrpl.org/assets/mt-send-currency-2-distribute-accounts.5e4fb4d4e92d15d91c663edad9d82dfafe4ca3b79c54b9515124e1f605211a8f.ac57e6ef.png)

![Trust line results](https://xrpl.org/assets/mt-send-currency-3-create-trustline.931b5e38838dc275a5a6b01628261a7c482283854d0cd036cf4648befdf12162.ac57e6ef.png)

![Currency transfer](https://xrpl.org/assets/mt-send-currency-4-send-currency.431a222190611d74b0f03d23cc0556270e965c1c24481be2b84b5f6b7f32de57.ac57e6ef.png)

![Currency transfer](https://xrpl.org/assets/mt-send-currency-5-issuer-token-balance.ea98b5a240a79ff061417ca6f959f71807a95510e55afa3753d0c1a3f54c95d6.ac57e6ef.png)

![Currency transfer](https://xrpl.org/assets/mt-send-currency-6-holder-token-balance.7e88a664ce970edbe8615f0561422d1cc2ea6b385048668f2e114cbcb4d608a6.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c807611f-9b19-4359-b63e-71b9bf303174&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c807611f-9b19-4359-b63e-71b9bf303174&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a47b9d13-40c6-4fb8-b733-a2931bb72dad&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a47b9d13-40c6-4fb8-b733-a2931bb72dad&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c697a68f-da94-42b1-91ee-59000c423338&bo=1&sid=c5230c009d9b11f08c6f1fc517f04321&vid=c523fa909d9b11f0bfd87d672c6544de&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&r=&lt=3438&evt=pageLoad&sv=2&cdb=AQAS&rn=817984)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=80517d7b-3f7e-41d5-ac96-fd9051f872b5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=80517d7b-3f7e-41d5-ac96-fd9051f872b5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bc98bd01-e495-4160-8d3b-5d174d39595c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bc98bd01-e495-4160-8d3b-5d174d39595c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9f7fdc7c-b78a-498c-9bc2-d893a1816423&pt=Create%20Trust%20Line%20and%20Send%20Currency%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-trust-line-send-currency&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/create-trust-line-send-currency#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/create-trust-line-send-currency#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/create-trust-line-send-currency#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/create-trust-line-send-currency#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/create-trust-line-send-currency.md)
- [currency code](https://www.iban.com/currency-codes)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:21:42.356Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
