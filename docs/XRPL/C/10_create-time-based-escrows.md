# Create Time-based Escrows Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/create-time-based-escrows
Section: C10

## Overview


## Extracted Content
# Create Time-based Escrows Using JavaScript

This example shows how to:

1. Create escrow payments that become available at a specified time and expire at a specified time.
1. Finish an escrow payment.
1. Retrieve information on escrows attached to an account.
1. Cancel an escrow payment and return the XRP to the sending account.


## Prerequisites

Download and expand the Modular Tutorials archive.


## Usage

To get test accounts:

1. Open create-time-based-escrows.html in a browser
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

`create-time-based-escrows.html`

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


## Create Escrow

You can create a time-based escrow with a minimum time to finish the escrow and a cancel time after which the funds in escrow are no longer available to the recipient. This is a test harness: while a practical scenario might express time in days or weeks, this form lets you set the finish and cancel times in seconds so that you can quickly run through a variety of scenarios. (There are 86,400 seconds in a day, if you want to play with longer term escrows.)

To create a time-based escrow:

1. Enter an Amount to transfer. For example, 10.
1. Enter the Destination. (For example, the Account 2 address.)
1. Set the Escrow Finish Time value, in seconds. For example, enter 10.
1. Set the Escrow Cancel Time value, in seconds. For example, enter 120.
1. Click Create Time-based Escrow.
1. Copy the Sequence Number of the escrow called out in the Standby Result field.

The escrow is created on the XRP Ledger instance, reserving 10 XRP plus the transaction cost. When you create an escrow, capture and save the Sequence Number so that you can use it to finish the escrow transaction.

The escrow finish and cancel times are expressed in seconds here to let you experiment with scenarios where the escrows are outside the time constraints. In practice, escrow times might be expressed in days, weeks, months, or years.


## Finish Escrow

The recipient of the XRP held in escrow can finish the transaction any time within the time window after the Escrow Finish date and time but before the Escrow Cancel date and time. Following on the example above, you can use the Sequence Number to finish the transaction once 10 seconds have passed.

To finish a time-based escrow:

1. Paste the sequence number in the Operational account Escrow Sequence Number field.
1. Copy and paste the address that created the escrow in the Escrow Owner field.
1. Click Finish Time-based Escrow.

The transaction completes and balances are updated for both the Standby and Operational accounts.


## Get Escrows

Click Get Escrows for either the Standby account or the Operational account to see their current list of escrows. If you click the buttons now, there are no escrows at the moment.

For the purposes of this tutorial, follow the steps in Create Escrow, above, to create a new escrow transaction, perhaps setting Escrow Cancel (seconds) field to 600 seconds to give you extra time to explore. Remember to capture the Sequence Number from the transaction results.

Click Get Escrows.


## Cancel Escrow

When the Escrow Cancel time passes, the escrow is no longer available to the recipient. The initiator of the escrow can reclaim the XRP, less the transaction fees. If you try to cancel the transaction prior to the Escrow Cancel time, you are charged for the transaction, but the actual escrow cannot be cancelled until the time limit is reached.

You can wait the allotted time for the escrow you created in the previous step, then use it to try out the Cancel Escrow button

To cancel an expired escrow:

1. Enter the sequence number in the Escrow Sequence Number field.
1. Enter the address of the account that created the escrow in the Escrow Owner field.
1. Click Cancel Escrow.

The funds are returned to the owner account, less the initial transaction fee.


## Oh No! I Forgot to Save the Sequence Number!

If you forget to save the sequence number, you can find it in the escrow transaction record.

1. If needed, create a new escrow as described in Create Escrow, above.
1. Click Get Escrows to get the escrow information.
1. Copy the PreviousTxnID value from the results.
1. Paste the PreviousTxnID in the Transaction field.
1. Click Get Transaction.
1. Locate the ModifiedNode.PreviousFields.Sequence value in the results.


# Code Walkthrough

Download and expand the Modular Tutorials archive.


## ripple8-escrow.js

This example can be used with any XRP Ledger network, Testnet, or Devnet. You can update the code to choose different or additional XRP Ledger networks.


### Add Seconds to Date

This function accomplishes two things. It creates a new date object and adds the number of seconds taken from a form field. Then, it adjusts the date from the JavaScript format to the XRP Ledger format.

You provide the numOfSeconds argument, the second parameter is a new Date object.

```
function addSeconds(numOfSeconds, date = new Date()) {
```

Set the seconds value to the date seconds plus the number of seconds you provide.

```
date.setSeconds(date.getSeconds() + numOfSeconds);
```

JavaScript dates are in milliseconds. Divide the date by 1000 to base it on seconds.

```
date = Math.floor(date / 1000)
```

Subtract the number of seconds in the Ripple epoch to convert the value to an XRP Ledger compatible date value.

```
date = date - 946684800
```

Return the result.

```
return date;
}
```


### Create Time-based Escrow

```
async function createTimeBasedEscrow() {
```

Instantiate two new date objects, then set the dates to the current date plus the set number of seconds for the finish and cancel dates.

```
let escrow_finish_date = new Date()
  let escrow_cancel_date = new Date()
  escrow_finish_date = addSeconds(parseInt(escrowFinishTimeField.value))
  escrow_cancel_date = addSeconds(parseInt(escrowCancelTimeField.value))
```

Connect to the ledger and get the account wallet.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ${net}.===\n\n===Creating time-based escrow.===\n`
  resultField.value = results
```

Define the transaction object.

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const sendAmount = amountField.value
    const escrowTx = await client.autofill({
      "TransactionType": "EscrowCreate",
      "Account": wallet.address,
      "Amount": xrpl.xrpToDrops(sendAmount),
      "Destination": destinationField.value,
      "FinishAfter": escrow_finish_date,
      "CancelAfter": escrow_cancel_date
    })
```

Sign the prepared transaction object.

```
const signed = wallet.sign(escrowTx)
  }
```

Submit the signed transaction object and wait for the results.

```
const tx = await client.submitAndWait(signed.tx_blob)
```

Report the results.

```
results += "\n===Success! === *** Save this sequence number: " + tx.result.tx_json.Sequence
    xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
    resultField.value = results
  }
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results += "\n===Error: " + error.message
    resultField.value = results
  }
  finally {
    client.disconnect()
  }
```


### Finish Time-based Escrow

```
async function finishEscrow() {
```

Connect to the XRP Ledger.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ${net}. Finishing escrow.===\n`
  resultField.value = results
```

Define the transaction. The Owner is the account that created the escrow. The OfferSequence is the sequence number of the escrow transaction. Automatically fill in the common fields for the transaction.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  const prepared = await client.autofill({
    "TransactionType": "EscrowFinish",
    "Account": accountAddressField.value,
    "Owner": escrowOwnerField.value,
    "OfferSequence": parseInt(escrowSequenceNumberField.value)
  })
```

Sign the transaction definition.

```
const signed = wallet.sign(prepared)
```

Submit the signed transaction to the XRP ledger.

```
const tx = await client.submitAndWait(signed.tx_blob)
```

Report the results.

```
results  += "\n===Balance changes===" + 
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  resultField.value = results
```

Update the XRP Balance field.

```
xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results += "\n===Error: " + error.message + "==="
    resultField.value = results
  }
  finally {
    client.disconnect()
  }
```


### Get  Escrows

Get the escrows created by or destined to the current account.

```
async function getEscrows() {
```

Connect to the network. The information you are looking for is public information, so there is no need to instantiate your wallet.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `\n===Connected to ${net}.\nGetting account escrows.===\n`
  resultField.value = results
```

Create the account_objects request. Specify that you want objects of the type escrow.

`account_objects`

```
try {
    const escrow_objects = await client.request({
      "id": 5,
      "command": "account_objects",
      "account": accountAddressField.value,
      "ledger_index": "validated",
      "type": "escrow"
    })
```

Report the results.

```
results += JSON.stringify(escrow_objects.result, null, 2)
    resultField.value = results
  }
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results += "\nError: " + error.message
    resultField.value = results
  }
  finally {
    client.disconnect()
  }
}
```


### Get Transaction Info

```
async function getTransaction() {
```

Connect to the XRP Ledger.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `\n===Connected to ${net}.===\n===Getting transaction information.===\n`
  resultField.value = results
```

Prepare and send the transaction information request. The only required parameter is the transaction ID.

```
try {
    const tx_info = await client.request({
      "id": 1,
      "command": "tx",
      "transaction": transactionField.value,
    })
```

Report the results.

```
results += JSON.stringify(tx_info.result, null, 2)
    resultField.value = results
  }
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results += "\nError: " + error.message
    resultField.value = results
  }
  finally {
    client.disconnect()
  }
} // End of getTransaction()
```


### Cancel Escrow

Cancel an escrow after it passes the expiration date and time.

```
async function cancelEscrow() {
```

Connect to the XRP Ledger instance and get the account wallet.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `\n===Connected to ${net}. Cancelling escrow.===`
  resultField.value = results
```

Prepare the EscrowCancel transaction, passing the escrow owner and offer sequence values.

```
try {
    const prepared = await client.autofill({
      "TransactionType": "EscrowCancel",
      "Account": accountAddressField.value,
      "Owner": escrowOwnerField.value,
      "OfferSequence": parseInt(escrowSequenceNumberField.value)
    })
```

Sign the transaction.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const signed = wallet.sign(prepared)
```

Submit the transaction and wait for the response.

```
const tx = await client.submitAndWait(signed.tx_blob)
```

Report the results.

```
results += "\n===Balance changes: " +
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    resultField.value = results
)
```

Catch and report any errors, then disconnect from the XRP Ledger instance.

```
}
  catch (error) {
    results += "\n===Error: " + error.message
    resultField.value = results
  }
  finally {
    client.disconnect()
  }
}
```


## create-time-escrow.html

```
<html>
<head>
    <title>Create a Time-based Escrow</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='create-time-escrow.js'></script>
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
    <h1>Create a Time-based Escrow</h1>
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
                    <span class="tooltip" tooltip-data="Amount of XRP to send.">
                        <label for="amountField">Amount</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="amountField" size="40"></input>
                </td>
            </tr>
           <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Destination account address where the escrow is sent.">
                    <lable for="destinationField">Destination</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="destinationField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="createTimeBasedEscrow()">Create Time-based Escrow</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Escrow finish time, in seconds.">
                    <lable for="escrowFinishTimeField">Escrow Finish Time</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowFinishTimeField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="getEscrows()">Get Escrows</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Escrow cancel time, in seconds.">
                    <lable for="escrowCancelTimeField">Escrow Cancel Time</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowCancelTimeField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="finishTimeBasedEscrow()">Finish Time-based Escrow</button>

                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Escrow sequence number, used when finishing the escrow.">
                    <lable for="escrowSequenceNumberField">Escrow Sequence Number</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowSequenceNumberField" size="40"></input>
                    <br>
                </td> 
                <td>
                    <button type="button" onClick="cancelEscrow()">Cancel Escrow</button>
                </td>              
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Escrow owner, the account that created the escrow.">
                    <lable for="escrowOwnerField">Escrow Owner</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowOwnerField" size="40"></input>
                    <br>
                </td> 
                <td>
                    <button type="button" onClick="getTransaction()">Get Transaction</button>
                </td>              
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Transaction number, used with the Get Transaction button.">
                    <lable for="transactionField">Transaction</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="transactionField" size="40"></input>
                    <br>
                </td> 
                <td>
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

![Time-based Escrow Form](https://xrpl.org/assets/mt-time-escrow-1-empty-form.0d38116397b0d6d55bf606eb6dc0f0571e253b4ba54a7aff5df9b9dfb065fae6.ac57e6ef.png)

![Escrow Tester with Account Information](https://xrpl.org/assets/mt-time-escrow-2-form-with-accounts.d40af485b960da0edafd44b02d355f4f1a8448f9ff973f68f1742682e7973487.ac57e6ef.png)

![Completed Escrow Transaction](https://xrpl.org/assets/mt-time-escrow-3-create-escrow.45e0081bcb1a8f4a1a69c235ba90dd0b747dd611f5edf33392fca1fd2e58b5f7.ac57e6ef.png)

![Completed Escrow Transaction](https://xrpl.org/assets/mt-time-escrow-4-fulfill-escrow.02a9562f73e25fb4739a11e03d13051328d672376ea344dbe2752509a1b610a2.ac57e6ef.png)

![Get Escrows results](https://xrpl.org/assets/mt-time-escrow-5-get-escrows.696ab3e9588c71bbf3cbeeae99a572ae3dda67e57a9e186a1ae9602da05bb3b8.ac57e6ef.png)

![Cancel Escrow results](https://xrpl.org/assets/mt-time-escrow-6-cancel-escrow.e71ae0a3acc55b31456b933dbb4b6117745fb51519960d5b69262fbb6bc3a10f.ac57e6ef.png)

![Previous Transaction ID in Get Escrows results](https://xrpl.org/assets/mt-conditional-escrow-6-get-escrows.283f68d80dac082ab69c6432a675ccaf153508853afaaa5ea219903655e3a086.ac57e6ef.png)

![Sequence number in results](https://xrpl.org/assets/mt-conditional-escrow-7-sequence-value.e3ca1e1f9888c9bfd75f50a149fc02f76e4ac630eaa9c3af17275339db198d68.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3b8644c5-34c8-4a04-8d4f-c3078a67ea0a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3b8644c5-34c8-4a04-8d4f-c3078a67ea0a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=661c77b6-1fba-48a8-b4c2-46b9645bd468&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=661c77b6-1fba-48a8-b4c2-46b9645bd468&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=23cb833e-640c-4fb0-a5f3-5b68182eb40d&bo=1&sid=eb010e409d9b11f08a0c29823a02bd39&vid=eb01e9709d9b11f09c8e2fc934733cbf&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20Time-based%20Escrows%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&r=&lt=4591&evt=pageLoad&sv=2&cdb=AQAS&rn=899389)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=17c1aa74-b266-442e-a81c-543190565200&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=17c1aa74-b266-442e-a81c-543190565200&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=104ddb45-3b93-4cbd-b4f0-e2be3fdb4231&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=104ddb45-3b93-4cbd-b4f0-e2be3fdb4231&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=12738ecc-75e6-47fe-a154-5efd7b3ae2c7&pt=Create%20Time-based%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-time-based-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/create-time-based-escrows#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/create-time-based-escrows#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/create-time-based-escrows#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/create-time-based-escrows#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d3b36242be788dc8093484442c0d3284.1759195347024.1759195347024.1759195347024.1&__hssc=78174987.1.1759195347024&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/create-time-based-escrows.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d3b36242be788dc8093484442c0d3284.1759195347024.1759195347024.1759195347024.1&__hssc=78174987.1.1759195347024&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:22:51.030Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
