# Sending MPTs
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/sending-mpts
Section: C13

## Overview


## Extracted Content
# Sending MPTs

(Requires the [MPToken amendment][] )

To send an MPT to another account, the receiving account must first authorize the receipt of the MPT, based on its MPToken Issuance ID. This is to prevent malicious users from spamming accounts with unwanted tokens that could negatively impact storage and XRP reserves.

Once an account receives an MPT, it can send the MPT to another account, provided the MPT was created with the Can Transfer flag set, and the receiving account authorizes the MPT.


## Send MPT Utility

The Send MPT utility lets you create an account, authorize it to receive a specific MPT issuance, then send it the authorized MPT from an issuer or holder account. (You can issue an MPT using the MPT Generator utility.)

You can download a standalone version of the MPT Sender as sample code.


## Get Accounts

To send an MPT, you need the Seed value for the MPT issuer to retrieve its account, then you need either a new account or an account seed for the target account. You can use the MPT Generator to create a new MPT for transfer.

To get the accounts:

1. Open send-mpt.html in a browser.
1. Choose your ledger instance (Devnet or Testnet).
1. If you used the MPT Generator:Paste the gathered info in the Result field. Cut and paste the MPT Issuance ID to the MPT Issuance ID field.Click Distribute Account Info to populate the Account 1 fields. If you did not use the MPT Generator, enter the Account 1 Name, Account 1 Address, Account 1 Seed, and MPT Issuance ID in the corresponding fields.)
1. Paste the gathered info in the Result field.
1. Cut and paste the MPT Issuance ID to the MPT Issuance ID field.
1. Click Distribute Account Info to populate the Account 1 fields. If you did not use the MPT Generator, enter the Account 1 Name, Account 1 Address, Account 1 Seed, and MPT Issuance ID in the corresponding fields.)
1. Click Get New Account 2, or use a seed to Get Account 2 from Seed.
1. Optionally, add the Account 2 Name, an arbitrary human-readable name that helps to differentiate the accounts.

1. Paste the gathered info in the Result field.
1. Cut and paste the MPT Issuance ID to the MPT Issuance ID field.
1. Click Distribute Account Info to populate the Account 1 fields. If you did not use the MPT Generator, enter the Account 1 Name, Account 1 Address, Account 1 Seed, and MPT Issuance ID in the corresponding fields.)


## Authorize MPT

To receive MPTs, an account needs to authorize the MPT.

To authorize Account 2 to accept MPTs:

1. Click the Account 2 radio button.
1. Enter an Amount, the maximum number of MPTs the account will accept.
1. Click Authorize MPTs.


## Send MPT

To send an MPT:

1. Click the Account 1 radio button.
1. Enter the MPT Issuance ID.
1. Enter an Amount of MPTs to send.
1. Enter the Destination (likely the value in the Account 2 Address field, but it can be any account on the same ledger instance).
1. Click Send MPT.


## Get MPTs

To verify receipt of the MPTs:

1. Click the Account 2 radio button.
1. Click Get MPTs.


# Code Walkthrough

You can download a standalone version of the MPT Sender as sample code.


## send-mpt.js

The code that supports the MPT features is in the send-mpt.js file. Standard support for connecting to the XRP Ledger is included in the account-support.js file.

`send-mpt.js`

`account-support.js`


### sendMPT()

Connect to the XRP Ledger.

```
async function sendMPT() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ${net}.===\n===Sending MPT.===\n`
  resultField.value = results
```

Instantiate the parameter variables.

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const mpt_issuance_id = mptIdField.value
    const mpt_quantity = amountField.value
```

Create a Payment transaction using the MPT for the Amount.

```
const send_mpt_tx = {
      "TransactionType": "Payment",
      "Account": wallet.address,
      "Amount": {
        "mpt_issuance_id": mpt_issuance_id,
        "value": mpt_quantity,
      },
      "Destination": destinationField.value,
    }
```

Prepare and sign the transaction.

```
const pay_prepared = await client.autofill(send_mpt_tx)
    const pay_signed = wallet.sign(pay_prepared)
```

Send the prepared transaction and report the results.

```
results += `\n===Sending ${mpt_quantity} ${mpt_issuance_id} to ${destinationField.value} ...`
    resultField.value = results
    const pay_result = await client.submitAndWait(pay_signed.tx_blob)
    results += '\n\n===Transaction succeeded.\n'
    results += JSON.stringify(pay_result.result, null, 2)
    resultField.value += results
  }
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results = `Error sending MPT: ${error}`
    resultField.value += results
  }
  finally {
    client.disconnect()
  }
} // end of sendMPT()
```


## getMPTs

Get all of the MPTs for the selected account by filtering for MPT objects and looping through the array to display them one at a time.

Connect to the XRPL ledger.

```
async function getMPTs() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  let results = ''
  resultField.value = `===Connected to ${net}. Getting MPTs.===`
```

Send an account_objects request, specifying the type mptoken. Wait for the results.

`account_objects`

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const mpts = await client.request({
        command: "account_objects",
        account: wallet.address,
        ledger_index: "validated",
        type: "mptoken"
      })
```

Stringify and parse the JSON result string.

```
let JSONString = JSON.stringify(mpts.result, null, 2)
    let JSONParse = JSON.parse(JSONString)
    let numberOfMPTs = JSONParse.account_objects.length
```

Loop through the filtered array of account_objects to list all of the MPTs held by the account.

```
let x = 0
    while (x < numberOfMPTs){
      results += "\n\n===MPT Issuance ID: " + JSONParse.account_objects[x].MPTokenIssuanceID
              + "\n===MPT Amount: " + JSONParse.account_objects[x].MPTAmount
      x++
    }
```

Return the parsed results, followed by the raw results.

```
results += "\n\n" + JSONString
    resultField.value += results
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
} catch (error) {
    results = `===Error getting MPTs: ${error}`
    resultField.value += results
  }
  finally {
    client.disconnect()
  }
} // End of getMPTs()
```


## authorizeMPT

Before you can send an MPT to another account, the target account must authorize the MPT.

Connect to the XRPL and instantiate the account wallet.

```
async function authorizeMPT() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `Connected to ${net}....`
  resultField.value = results
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
```

Capture the MPT issuance ID in a variable.

```
const mpt_issuance_id = mptIdField.value
```

Create the MPTokenAuthorize transaction, passing the target account's address and the MPT Issuance ID.

```
const auth_mpt_tx = {
    "TransactionType": "MPTokenAuthorize",
    "Account": wallet.address,
    "MPTokenIssuanceID": mpt_issuance_id,
  }
```

Prepare, sign, and send the transaction.

```
const auth_prepared = await client.autofill(auth_mpt_tx)
  const auth_signed = wallet.sign(auth_prepared)
  results += `\n\nSending authorization...`
  resultField.value = results
  const auth_result = await client.submitAndWait(auth_signed.tx_blob)
```

Report the results.

```
if (auth_result.result.meta.TransactionResult == "tesSUCCESS") {
    results += `\nTransaction succeeded`
    resultField.value = results
  } else {
    results += `\nTransaction failed: ${auth_result.result.meta.TransactionResult}`
    resultField.value = results
  }
  client.disconnect()
} // end of MPTAuthorize()
```


## send-mpt.html

```
<html>
<head>
    <title>Send MPT</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='send-mpt.js'></script>
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
    <h1>Send MPT</h1>
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
                    <span class="tooltip" tooltip-data="Issuance ID of the MPT you want to trade.">
                    <lable for="mptIdField">MPT Issuance ID</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="mptIdField" size="40"></input>
                    <br>
                </td> 
                <td>
                    <button type="button" onClick="authorizeMPT()">Authorize MPT</button>
                </td>               
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Number of MPTs to send.">
                        <label for="amountField">Amount</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="amountField" size="40"></input>
                    <br>
                </td>
                <td>
                    <button type="button" onClick="sendMPT()">Send MPT</button>
                </td>  

            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Destination account address for MPT transfer.">
                    <lable for="destinationField">Destination</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="destinationField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="getMPTs()">Get MPTs</button>
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
    let radioButtons = document.querySelectorAll('input[type="radio"]');
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

![MPT Sender Utility](https://xrpl.org/assets/mt-send-mpt-0-empty-form.ef9af545ed6f386d14e0900c71035e7cf7aae21245152a9722ae8b8ccdd21fdb.ac57e6ef.png)

![Gathered information in Result field](https://xrpl.org/assets/mt-send-mpt-1-gathered-info.6c13ec70fa58633b5d36734f9e1b2099beb54f5901f16cd5f7d7d71c035bbbf8.ac57e6ef.png)

![Get New Account 2](https://xrpl.org/assets/mt-send-mpt-2-account-2.32481c56f7e9fac0152d7e24d33bae467f7ad71e8c73c768ec117dc043388292.ac57e6ef.png)

![Authorize MPTs](https://xrpl.org/assets/mt-send-mpt-2-authorize-mpt.1c72523b80bc46b96780f1d4b023564325eb1724bb51672e3f34bbc1c7795e3c.ac57e6ef.png)

![Send MPTs](https://xrpl.org/assets/mt-send-mpt-3-send-mpt.29032f944fa0a550901885800d6d5cb1b31254d2024e437cb4d2bf710c108d41.ac57e6ef.png)

![Get MPTs](https://xrpl.org/assets/mt-send-mpt-4-get-mpts.21668ba8f22dbd6f8578b9dc7fc84d3a6d95564b8477bca59586f6d1948906bb.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=08571252-f581-4abe-8755-67fc90795f5e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=08571252-f581-4abe-8755-67fc90795f5e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=773649a2-0e57-4e41-828e-d6cf5ae8cf60&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=773649a2-0e57-4e41-828e-d6cf5ae8cf60&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=f8e131ad-2d4a-4dbd-b6a2-9fead87a0151&bo=1&sid=294d6e709d9c11f0ba73216d95d6fdda&vid=294df8a09d9c11f098c90d0d51483e14&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Sending%20MPTs&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&r=&lt=2805&evt=pageLoad&sv=2&cdb=AQAS&rn=820809)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6a8db05b-5117-4dd6-8585-f746a7e06905&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6a8db05b-5117-4dd6-8585-f746a7e06905&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4a590243-d9be-4e01-999b-1e478b965757&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4a590243-d9be-4e01-999b-1e478b965757&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=524d3aee-3d56-43f2-aa40-5bcd1b15fe93&pt=Sending%20MPTs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fsending-mpts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/sending-mpts#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/sending-mpts#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/sending-mpts#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/sending-mpts#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.13f2acf147df3383315b9a0f03a948dd.1759195450109.1759195450109.1759195450109.1&__hssc=78174987.1.1759195450109&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/sending-mpts.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.13f2acf147df3383315b9a0f03a948dd.1759195450109.1759195450109.1759195450109.1&__hssc=78174987.1.1759195450109&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:24:27.219Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
