# Send and Cash Checks
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/send-and-cash-checks
Section: C12

## Overview


## Extracted Content
# Send and Cash Checks

This example shows how to:

1. Send a check to transfer XRP or issued currency to another account.
1. Get a list of checks you have sent or received.
1. Cash a check received from another account.
1. Cancel a check you have sent.

Checks offer another option for transferring funds between accounts. Checks have two particular advantages.

1. You can use a check to send tokens to someone who has not already created a trust line. The trust line is created automatically when the receiver chooses to accept the funds.
1. The receiver can choose to accept less than the full amount of the check. This allows you to authorize a maximum amount when the actual cost is not finalized.


## Prerequisites

Download and expand the Modular Tutorials archive.

Without the Modular Tutorial Samples, you will not be able to try the examples that follow.


## Usage

To get test accounts:

1. Open send-checks.html in a browser.
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

`send-checks.html`

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


### Send a Check for XRP

To send a check for XRP:

1. Select Account 1 or Account 2.
1. Enter the Amount of XRP to send, in drops.
1. Enter the receiving account address in the Destination field.
1. Set the Currency Code to XRP.
1. Click Send Check.


### Send a Check for an Issued Currency

To send a check for an issued currency token:

1. Choose Account 1 or Account 2.
1. Enter the Amount of currency to send.
1. Enter the receiving account address in the Destination field.
1. Enter the issuing account in the Issuer field (for example, the account sending the check).
1. Enter the Currency code for your issued currency token.
1. Click Send Check.


### Get Checks

Click Get Checks to get a list of the current checks you have sent or received. To uniquely identify a check (for example, when cashing a check), use the check's ledger entry ID, in the index field.

`index`


### Cash Check

To cash a check you have received:

1. Enter the Check ID (index value).
1. Enter the Amount you want to collect, up to the full amount of the check.
1. Enter the currency code. a. If you are cashing a check for XRP, enter XRP in the Currency Code field. b. If you are cashing a check for an issued currency token:Enter the Issuer of the token.Enter the Currency Code code for the token.
1. Enter the Issuer of the token.
1. Enter the Currency Code code for the token.
1. Click Cash Check.

1. Enter the Issuer of the token.
1. Enter the Currency Code code for the token.


### Get Token Balance

Click Get Token Balance to get a list of obligations and assets for the account.


### Cancel Check

To cancel a check you have previously sent to another account.

1. Enter the Check ID (index value).
1. Click Cancel Check.

`index`


# Code Walkthrough

Download and expand the Modular Tutorials archive.


## send-checks.js


### sendCheck()

Connect to the XRP ledger.

```
async function sendCheck() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  results = `\n===Connected to ${net}.===\n===Sending check.===\n`
  resultField.value = results
```

Prepare the transaction. Set the check_amount variable to the value in the Amount field.

```
try {     
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    let check_amount = amountField.value
```

If the currency field is not XRP, create an amount object with the currency, value, and issuer. Otherwise, use the check_amount value as is.

`amount`

```
if (currencyField.value !=  "XRP") {
     check_amount = {
       "currency": currencyField.value,
       "value": amountField.value,
       "issuer": wallet.address  	
     }
   }
```

Create the transaction object.

```
const send_check_tx = {
  "TransactionType": "CheckCreate",
  "Account": wallet.address,
  "SendMax": check_amount,
  "Destination": destinationField.value
}
```

Autofill the remaining values and sign the prepared transaction.

```
const check_prepared = await client.autofill(send_check_tx)
    const check_signed = wallet.sign(check_prepared)
```

Send the transaction and wait for the results.

```
results += '\n===Sending ' + amountField.value + ' ' + currencyField.
     value + ' to ' +  destinationField.value + '.===\n'
    resultField.value = results
    const check_result = await client.submitAndWait(check_signed.tx_blob)
```

Report the results.

```
if (check_result.result.meta.TransactionResult == "tesSUCCESS") {
      results = '===Transaction succeeded===\n\n'
      resultField.value += results + JSON.stringify(check_result.result, null, 2)
    }
```

Update the XRP Balance field.

```
xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
```

Report any errors, then disconnect from the XRP ledger.

```
} catch (error) {
    results = `Error sending transaction: ${error}`
    resultField.value += results
  }
  finally {
    client.disconnect()
  }
}//end of sendCheck()
```


## getChecks()

Connect to the XRP Ledger.

```
async function getChecks() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()   
  let results = `\n===Connected to ${net}.===\n===Getting account checks.===\n\n`
  resultField.value = results
```

Define an account_objects query, filtering for the check object type.

`account_objects`

```
try {
    const check_objects = await client.request({
      "id": 5,
      "command": "account_objects",
      "account": accountAddressField.value,
      "ledger_index": "validated",
      "type": "check"
    })
```

Display the retrieved Check objects in the result field.

`Check`

```
resultField.value += JSON.stringify(check_objects.result, null, 2)
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
}  catch (error) {
    results = `Error getting checks: ${error}`
    resultField.value += results
  }
  finally {
    client.disconnect()
  }
} // End of getChecks()
```


## cashCheck()

Connect to the XRP Ledger and get the account wallet

```
async function cashCheck() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  results = `\n===Connected to ${net}.===\n===Cashing check.===\n`
  resultField.value = results
```

Set the check amount.

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    let check_amount = amountField.value
```

If the currency is not XRP, create an amount object with value, currency, and issuer.

`amount`

```
if (currencyField.value !=  "XRP") {
      check_amount = {
        "value": amountField.value,
        "currency": currencyField.value,
        "issuer": issuerField.value  	
      }
    }
```

Create the CheckCash transaction object.

`CheckCash`

```
const cash_check_tx = {
      "TransactionType": "CheckCash",
      "Account": wallet.address,
      "Amount": check_amount,
      "CheckID": checkIdField.value
    }
```

Autofill the transaction details.

```
const cash_prepared = await client.autofill(cash_check_tx)
```

Sign the prepared transaction.

```
const cash_signed = wallet.sign(cash_prepared)
    results = ' Receiving ' + amountField.value + ' ' + currencyField.value + '.\n'
    resultField.value += results
```

Submit the transaction and wait for the result.

```
const check_result = await client.submitAndWait(cash_signed.tx_blob)
```

Report the transaction results.

```
if (check_result.result.meta.TransactionResult == "tesSUCCESS") {
      results = '===Transaction succeeded===\n' + JSON.stringify(check_result.result, null, 2)
      resultField.value += results
    }
```

Update the XRP Balance field.

```
xrpBalanceField.value = (await client.getXrpBalance(wallet.address));
```

Catch and report any errors, then disconnect from the XRP ledger.

```
} catch (error) {
    results = `Error sending transaction: ${error}`
    resultField.value += results
  }
  finally {
    client.disconnect()
} // end of cashCheck()
```


## cancelCheck()

Connect to the XRP Ledger.

```
async function cancelCheck() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  results = `\n===Connected to ${net}.===\n===Cancelling check.===\n`
  resultField.value = results
```

Create the CheckCancel transaction object, passing the wallet address and the Check ID value (the Index).

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const cancel_check_tx = {
      "TransactionType": "CheckCancel",
      "Account": wallet.address,
      "CheckID": checkIdField.value
    }
```

Autofill the transaction details.

```
const cancel_prepared = await client.autofill(cancel_check_tx)
```

Sign the prepared transaction.

```
const cancel_signed = wallet.sign(cancel_prepared)
```

Submit the transaction and wait for the results.

```
const check_result = await client.submitAndWait(cancel_signed.tx_blob)
```

Report the transaction results.

```
if (check_result.result.meta.TransactionResult == "tesSUCCESS") {
      results += `===Transaction succeeded===\n${check_result.result.meta.TransactionResult}`
      resultField.value = results
    }
```

Update the XRP Balance field.

```
xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
```

Catch and report any errors, then disconnect from the XRP ledger.

```
} catch (error) {
    results = `Error sending transaction: ${error}`
    resultField.value += results
  }
  finally {
    client.disconnect()
  }
} // end of cancelCheck()
```


## 10.send-checks.html

```
<html>
<head>
    <title>Send Checks</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='send-xrp.js'></script>
    <script src='send-currency.js'></script>
    <script src='send-checks.js'></script>
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
    <h1>Send Checks</h1>
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
                    <span class="tooltip" tooltip-data="Currency code for the check.">
                    <lable for="currencyField">Currency Code</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="currencyField" size="40"></input>
                    <br>
                </td> 
                <td>
                    <button type="button" onClick="sendCheck()">Send Check</button>
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
                    <button type="button" onClick="cashCheck()">Cash Check</button>
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
                    <button type="button" onClick="getChecks()">Get Checks</button>
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
                <td align="left" valign="top">
                    <button type="button" onClick="cancelCheck()">Cancel Check</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Check ID.">
                    <lable for="checkIdField">Check ID</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="checkIdField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="getTokenBalance()">Get Token Balance</button>
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

![Empty Check Form](https://xrpl.org/assets/mt-send-checks-1-empty-form.4b3ad2f773e44b48acf2002bf9481bbdd5e293add50e4717d628c8799a1395ff.ac57e6ef.png)

![Form with Accounts](https://xrpl.org/assets/mt-send-checks-2-form-with-accounts.3e9a12ef433ae5e8c3bd5036868b6240ed55f5f9cc82c8a69e4712f4bf888624.ac57e6ef.png)

![Send Check Settings](https://xrpl.org/assets/mt-send-checks-3-send-xrp.b22f2a6114b22816a5262f913de7dfdfbcbff3a63160c10578badb3286711609.ac57e6ef.png)

![Send Token Check Settings](https://xrpl.org/assets/mt-send-checks-4-send-currency.fb81851e7db5e505cb078d4aa9b4d642542c6bd86620106b12664cc3db5a9441.ac57e6ef.png)

![Get Checks with index highlighted](https://xrpl.org/assets/mt-send-checks-5-get-checks.82a1473eed9381ee1bc9fb834b18904dbfda8781a46c64545689d147f5c9613b.ac57e6ef.png)

![Cashed check results](https://xrpl.org/assets/mt-send-checks-6-cash-check.208d86fc1b85e6ed28f4f7ee593dd538d70ab2cd942c29c9988bb0e5928baf40.ac57e6ef.png)

![Account Balance](https://xrpl.org/assets/mt-send-checks-7-get-balance.f5dc2f477fd81de90297f44eb095de39af0db473aa0b09f4d5650cf121075723.ac57e6ef.png)

![Canceled check results](https://xrpl.org/assets/mt-send-checks-8-cancel-check.9e25e065f94c7436b3339ba32de5f62308f4ea9c7e1e14b26849d9cdbeee68e2.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6d31705f-cd1c-47b3-a70e-21f021e264f7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6d31705f-cd1c-47b3-a70e-21f021e264f7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=320b7f41-6054-4317-b97d-135a03e4bcca&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=320b7f41-6054-4317-b97d-135a03e4bcca&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=f0630430-89e2-43a9-b09c-0dbddb4eede1&bo=1&sid=13860fb09d9c11f09ce6e3b85918c8ff&vid=13864e709d9c11f096d6c9c98bf5f017&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Send%20and%20Cash%20Checks&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&r=&lt=3021&evt=pageLoad&sv=2&cdb=AQAS&rn=269471)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c9338200-5814-44aa-bd22-b3cbdfead8dc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c9338200-5814-44aa-bd22-b3cbdfead8dc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f7a03f85-1059-45ff-9e56-e9e9cb72ec4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f7a03f85-1059-45ff-9e56-e9e9cb72ec4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a0f2bb6b-6c83-4526-8813-6e765c5aa5b0&pt=Send%20and%20Cash%20Checks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsend-and-cash-checks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/send-and-cash-checks#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/send-and-cash-checks#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/send-and-cash-checks#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/send-and-cash-checks#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1330a3388b1e003009c7959190bce089.1759195413447.1759195413447.1759195413447.1&__hssc=78174987.1.1759195413448&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/send-and-cash-checks.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1330a3388b1e003009c7959190bce089.1759195413447.1759195413447.1759195413447.1&__hssc=78174987.1.1759195413448&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:23:56.350Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
