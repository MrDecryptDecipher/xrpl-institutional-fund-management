# Create Conditional Escrows Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/create-conditional-escrows
Section: C11

## Overview


## Extracted Content
# Create Conditional Escrows Using JavaScript

This example shows how to:

1. Create escrow payments that become available when any account enters a fulfillment code.
1. Complete a conditional escrow transaction.
1. Cancel a conditional escrow transaction.

Create escrow payments that become available when any account enters a fulfillment code.

Complete a conditional escrow transaction.

Cancel a conditional escrow transaction.


## Prerequisites

Download and expand the Modular Tutorials archive.


## Usage


### Create Escrow

You  create a condition-based escrow using a fulfillment code associated with a condition code. Create the condition/fulfillment pair using the five-bells-condition application.

`five-bells-condition`

Install five-bells-condition:

`five-bells-condition`

1. In a terminal window, navigate to your chosen local directory.
1. Enter the command npm install five-bells-condition.

`npm install five-bells-condition`

To create a condition/fulfillment pair:

1. In a terminal window, navigate to your chosen local directory.
1. Enter the command node getConditionAndFulfillment.js.
1. Copy and save the generated Condition and Fulfillment pair.

`node getConditionAndFulfillment.js`

To get test accounts:

1. Open create-conditional-escrow.html in a browser
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

`create-conditional-escrow.html`

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


### Create Conditional Escrow

When you create a conditional escrow, you need to specify the amount you want to reserve and the Condition value you generated above. You can also set a cancel date and time, after which the escrow is no longer available. For testing, the Cancel time is in seconds: in practice, you might set a Cancel time in days, weeks, months, or years.

`Condition`

To create a conditional escrow:

1. Enter an Amount to transfer.
1. Enter the Destination field (for example, use Account 2 Address).
1. Enter the Escrow Condition value.
1. Enter the Escrow Cancel (seconds) value.
1. Click Create Escrow.
1. Copy and save the Sequence Number of the escrow called out in the Results field.

The escrow is created on the XRP Ledger instance, reserving your requested XRP amount plus the transaction cost.

When you create an escrow, capture and save the Sequence Number so that you can use it to finish the escrow transaction.


## Finish Conditional Escrow

Any account can finish the conditional escrow any time before the Escrow Cancel time. Following on the example above, you can use the Sequence Number to finish the transaction once the Escrow Cancel time has passed.

To finish a conditional escrow:

1. Enter the Escrow Condition code for the escrow.
1. Enter the corresponding Escrow Fulfillment code.
1. Enter the Escrow Owner (the account address of the account that created the escrow).
1. Enter the sequence number in the Escrow Sequence Number field.
1. Click Finish Escrow.

The transaction is completed and balances adjusted for both accounts.


## Get Escrows

Click Get Escrows to see the current list of escrows generated by or destined for the current account.


## Cancel Escrow

When the Escrow Cancel time passes, the escrow is no longer available to the recipient. The initiator of the escrow can reclaim the XRP, less the transaction fees. Any account can cancel an escrow once the cancel time has elapsed. Accounts that try to cancel the transaction prior to the Escrow Cancel time are charged the nominal transaction cost (typically 12 drops), but the actual escrow cannot be cancelled until after the Escrow Cancel time.

To cancel an expired escrow:

1. Enter the sequence number in the Escrow Sequence Number field.
1. Click Cancel Escrow.


## Oh No! I Forgot to Save the Sequence Number!

If you forget to save the sequence number, you can find it in the escrow transaction record.

1. If needed, create a new escrow as described in Create Escrow, above.
1. Click Get Escrows to get the escrow information.
1. Copy the PreviousTxnID value from the results.
1. Paste the PreviousTxnID in the Transaction field.
1. Click Get Transaction.
1. Locate the ModifiedNode.PreviousFields.Sequence value in the results.


# Code Walkthrough

Download the Modular Tutorials archive.


## five-bells.cjs

To generate a condition/fulfillment pair, use Node.js to run the five-bells.js script.

`five-bells.js`

```
const cc = require('five-bells-condition')
const crypto = require('crypto')

// 1. Generate a random 32-byte seed
const preimageData = crypto.randomBytes(32)

// 2. Create a PreimageSha256 fulfillment object
const fulfillment = new cc.PreimageSha256()

// 3. Set the preimage
fulfillment.setPreimage(preimageData)

// 4. Generate the condition (binary)
const conditionBinary = fulfillment.getConditionBinary()

// 5. Generate the fulfillment (binary)
const fulfillmentBinary = fulfillment.serializeBinary()

// Convert to hex for easier use
const conditionHex = conditionBinary.toString('hex').toUpperCase()
const fulfillmentHex = fulfillmentBinary.toString('hex').toUpperCase()

console.log('Condition (hex):', conditionHex)
console.log('Fulfillment (hex):', fulfillmentHex)
```


## create-conditional-escrow.js


### createConditionalEscrow()

Connect to the ledger and get the account wallet.

```
async function createConditionalEscrow() {
 let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  const sendAmount = amountField.value
  let results = `===Connected to ${net}===\n===Creating conditional escrow.===\n\n`
  resultField.value = results
```

Prepare the cancel date by adding the number of seconds in the Escrow Cancel Date field to the current date and time. In practice, the cancel date might be in days, weeks, months, or years. Using seconds allows you to test scenarios with expired escrows.

```
let escrow_cancel_date = new Date()
  escrow_cancel_date = addSeconds(parseInt(escrowCancelDateField.value))
```

Prepare the transaction object.

```
const escrowTx = await client.autofill({
    "TransactionType": "EscrowCreate",
    "Account": wallet.address,
    "Amount": xrpl.xrpToDrops(sendAmount),
    "Destination": destinationField.value,
    "CancelAfter": escrow_cancel_date,
    "Condition": escrowConditionField.value
  })
```

Sign the prepared transaction object.

```
const signed = wallet.sign(escrowTx)
```

Submit the signed object and wait for the results.

```
const tx = await client.submitAndWait(signed.tx_blob)
```

Report the results, parsing the Sequence Number for later use.

```
results = "\n=== *** Sequence Number (Save!): " + tx.result.tx_json.Sequence 
    results += "\n\n===Balance changes===\n" + 
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
    resultField.value += results
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results += "\n===Error: " + error.message
    resultField.value = results
  }
  finally {
    // -------------------------------------------------------- Disconnect
    client.disconnect()
  }// End of createTimeEscrow()
```


### finishConditionalEscrow()

Connect to the ledger and get the account wallet from the account seed.

```
async function finishConditionalEscrow() {
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `===Connected to ${net}===\n===Fulfilling conditional escrow.===\n`
  resultField.value = results
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
```

Prepare the transaction object.

```
const prepared = await client.autofill({
    "TransactionType": "EscrowFinish",
    "Account": accountAddressField.value,
    "Owner": escrowOwnerField.value,
    "OfferSequence": parseInt(escrowSequenceNumberField.value),
    "Condition": escrowConditionField.value,
    "Fulfillment": escrowFulfillmentField.value
  })
```

Sign the prepared transaction object.

```
const signed = wallet.sign(prepared)
```

Submit the signed transaction and wait for the results.

```
const tx = await client.submitAndWait(signed.tx_blob)
```

Report the results

```
results = "\n===Balance changes===" + 
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  resultField.value += results
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    results += "\n===Error: " + error.message + ".===\n"
    resultField.value = results
  }
  finally {
    // -------------------------------------------------------- Disconnect
    client.disconnect()
  }
```


## create-conditional-escrow.html

```
<html>
<head>
    <title>Create a Conditional Escrow</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src="create-time-escrow.js"></script>
    <script src='create-conditional-escrow.js'></script>
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
    <h1>Create a Conditional Escrow</h1>
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
                    <button type="button" onClick="createConditionalEscrow()">Create Escrow</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Condition code used to begin the escrow transaction.">
                    <lable for="escrowConditionField">Escrow Condition</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowConditionField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="getEscrows()">Get Escrows</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Fullfillment code to complete the escrow transaction.">
                    <lable for="escrowFulfillmentField">Escrow Fulfillment</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowFulfillmentField" size="40"></input>
                    <br>
                </td>
                <td>
                    <button type="button" onClick="finishConditionalEscrow()">Finish Escrow</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Escrow cancel time, in seconds.">
                    <lable for="escrowCancelDateField">Escrow Cancel Time</lable>
                    </span>
                </td>
                <td>
                    <input type="text" id="escrowCancelDateField" size="40"></input>
                    <br>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="cancelEscrow()">Cancel Escrow</button>
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
                    <button type="button" onClick="getTransaction()">Get Transaction</button>
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

![Conditional Escrow Tester Form](https://xrpl.org/assets/mt-conditional-escrow-1-empty-form.d5b26c4d2f5e1ab7b6672e1d12f0af0f1d1ff43ef252554518d8f3824710a32a.ac57e6ef.png)

![Condition and Fulfillment](https://xrpl.org/assets/mt-conditional-escrow-2-getconditionandfulfillment.cce6120b882a651d04be05b45f9c7d3e14902100f6cd735ae060179730218ae9.ac57e6ef.png)

![Form with Accounts](https://xrpl.org/assets/mt-conditional-escrow-3-form-with-accounts.ad9dcf519815cb426a55dbc69dc47b522b77241cfb254d2145c5498117ace9f2.ac57e6ef.png)

![Created Escrow Transaction](https://xrpl.org/assets/mt-conditional-escrow-4-escrow-create.fd4c8606dc5bda9ddb176d451e77f44ce991ba0842fca424b8e7c6b88e950548.ac57e6ef.png)

![Finished Escrow Transaction](https://xrpl.org/assets/mt-conditional-escrow-5-escrow-fulfill.be11ceb47fab17bfb1ca760ffa47f369015c43bee0d6709a4b457aa2e4a6765f.ac57e6ef.png)

![Previous Transaction ID in Get Escrows results](https://xrpl.org/assets/mt-conditional-escrow-6-get-escrows.283f68d80dac082ab69c6432a675ccaf153508853afaaa5ea219903655e3a086.ac57e6ef.png)

![Sequence number in results](https://xrpl.org/assets/mt-conditional-escrow-7-sequence-value.e3ca1e1f9888c9bfd75f50a149fc02f76e4ac630eaa9c3af17275339db198d68.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f9a73789-5568-4710-abef-331f5a565dfb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f9a73789-5568-4710-abef-331f5a565dfb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aa929cb5-0848-417e-859d-30c0d46deeaf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aa929cb5-0848-417e-859d-30c0d46deeaf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c217b1ff-3e12-4782-a45e-c9ab8ad7685e&bo=1&sid=003dd5209d9c11f09227f9485106504b&vid=003e76009d9c11f0805ccba3a2b90a6f&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20Conditional%20Escrows%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&r=&lt=2909&evt=pageLoad&sv=2&cdb=AQAS&rn=989057)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=93d71cef-2c96-4859-bc14-08a9ca4455b1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=93d71cef-2c96-4859-bc14-08a9ca4455b1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9c9ee2d0-6834-4980-a019-e0cadfd8d0ce&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9c9ee2d0-6834-4980-a019-e0cadfd8d0ce&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2fa738ac-0087-4a76-a801-7cca8d0876b3&pt=Create%20Conditional%20Escrows%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-conditional-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/create-conditional-escrows#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/create-conditional-escrows#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/create-conditional-escrows#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/create-conditional-escrows#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6e2fe0a3423a885a0c9abfab0025bf40.1759195381313.1759195381313.1759195381313.1&__hssc=78174987.1.1759195381313&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/create-conditional-escrows.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6e2fe0a3423a885a0c9abfab0025bf40.1759195381313.1759195381313.1759195381313.1&__hssc=78174987.1.1759195381313&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:23:22.294Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
