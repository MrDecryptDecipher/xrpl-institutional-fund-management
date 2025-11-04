# Create Accounts and Send XRP Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/send-payments/create-accounts-send-xrp
Section: C7

## Overview


## Extracted Content
# Create Accounts and Send XRP Using JavaScript

This example shows how to:

1. Create accounts on the Testnet, funded with 1000 test XRP with no actual value.
1. Retrieve the accounts from seed values.
1. Transfer XRP between accounts.

When you create an account, you receive a public/private key pair offline. Your account does not appear on the ledger until it is funded with XRP. This example shows how to create accounts for Testnet, but not how to create an account that you can use on Mainnet.


## Prerequisites

To get started, create a new folder on your local disk and install the JavaScript library using npm.

`npm`

```
npm install xrpl
```

Download and expand the Payment Modular Tutorial Samples archive.

NoteWithout the Payment Modular Tutorials Samples, you will not be able to try the examples that follow.


## Usage

To get test accounts:

1. Open 1.get-accounts-send-xrp.html in a browser
1. Choose Testnet or Devnet.
1. Click Get New Account 1.
1. Click Get New Account 2.
1. Optionally fill in Account 1 Name and Account 2 Name.

`1.get-accounts-send-xrp.html`

The name fields are there for you to create an arbitrary label to make the account easier to recognize when switching back and forth than the 34 character account address. For example, I might name the accounts after my friends Alfredo and Binti. The name is a local value that is never sent to the XRPL server.

To transfer XRP from Account 1 to Account 2:

1. Click the Account 1 radio button. The information about Account 1 populates the uneditable fields of the form.
1. Enter the Amount of XRP to send.
1. Copy and paste the Account 2 Address value to the Destination field.
1. Click Send XRP to transfer XRP from Account 1 to Account 2.

The Results field shows the change in balance in each of the accounts. Note that sending the XRP cost an additional .000001 XRP as the transfer fee. The transfer fee is small enough to be no burden for legitimate users, but is there to stop spammers from making DDS attacks against the XRP Ledger (sending millions of false transactions will quickly add up to real money).

Click Account 2 to see its XRP balance.

To transfer XRP from Account 2 back to Account 1:

1. Click the Account 2 radio button.
1. Enter the Amount of XRP to send.
1. Copy and paste the Account 1 Address value to the Destination field.
1. Click Send XRP to transfer XRP from Account 1 to Account 2.
1. Click the Account 1 radio button to see its new XRP balance.


## Gather and Distribute Account Information

For most exercises, it's fine if you want to create a new account. If want to use the same account in another exercise, you can gather the information from both accounts to the Result field to paste into the next form.

1. Click Gather Account Info.
1. Copy the name, address, and seed values from the Result field.

1. Go to the next modular tutorial form.
1. Paste the values in the Result field.
1. Click Distribute Account Info to populate all of the Account 1 and Account 2 fields.


## Getting the XRP Balance

The XRP Balance field is automatically updated when you choose Account 1 or Account 2. If you send XRP to an account from another application and you want to see the result, you can click Get XRP Balance at any time to see the currently available XRP.


## Getting the Token Balance

You can see the balance of all issued currencies, MPTs, and other tokens by clicking Get Token Balance. You can issue and send tokens in many of the modular tutorials that build off the XRPL Base Module.


# Code Walkthrough

You can download the Payment Modular Tutorials from the source repository for this website.


## account-support.js

This file contains the functions all of the modular examples use to create, use, and reuse accounts.


### getNet()

This function can be used with Testnet, or Devnet. It allows you to select between them with a radio button to set the net variable with the server URL.

```
function getNet() {
  let net
  if (document.getElementById("tn").checked) net = "wss://s.altnet.rippletest.net:51233/"
  if (document.getElementById("dn").checked) net = "wss://s.devnet.rippletest.net:51233/"
  return net
} // End of getNet()
```


### getAccount()

The getAccount() function uses the faucet host to fund a new account wallet

`getAccount()`

```
async function getAccount() {
```

Get the selected network, create a new client, and connect to the XRPL serever.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  resultField.value = `===Getting Account===\n\nConnected to ${net}.`
```

Request a new wallet funded with play-money XRP for experimentation.

```
try {
    let faucetHost = null
    const my_wallet = (await client.fundWallet(null, { faucetHost})).wallet
    const newAccount = [my_wallet.address, my_wallet.seed]
    return (newAccount)
  }
```

Catch and report any errors.

```
catch (error) {
    console.error('Error getting account:', error);
    results = `\n===Error: ${error.message}===\n`
    resultField.value += results
    throw error; // Re-throw the error to be handled by the caller
  }
```

Disconnect from the XRPL server and return the address and seed information.

```
client.disconnect()
  return (newAccount)
} // End of getAccount()
```


### getNewAccount1() and getNewAccount2()

These are wrapper functions that call the getAccount() function, then populate the account address and account seed fields for Account1 or Account2, respectively.

```
async function getNewAccount1() {
  account1address.value = "=== Getting new account. ===\n\n"
  account1seed.value = ""
  const accountInfo= await getAccount()
  account1address.value = accountInfo[0]
  account1seed.value = accountInfo[1]
}


async function getNewAccount2() {
  account2address.value = "=== Getting new account. ===\n\n"
  account2seed.value = ""
  const accountInfo= await getAccount()
  account2address.value = accountInfo[0]
  account2seed.value = accountInfo[1]
}
```


### getAccountFromSeed()

This function uses an existing seed value to access the client information from the XRP Ledger, then return the account address.

```
async function getAccountFromSeed(my_seed) {
  const net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = '===Finding wallet.===\n\n'
  resultField.value = results
  try {
    const wallet = xrpl.Wallet.fromSeed(my_seed)
    const address = wallet.address
    results += "===Wallet found.===\n\n"
    results += "Account address: " + address + "\n\n"
    resultField.value = results
    return (address)
  }
```

Catch and report any errors.

```
catch (error) {
    console.error('===Error getting account from seed:', error);
    results += `\nError: ${error.message}\n`
    resultField.value = results
    throw error; // Re-throw the error to be handled by the caller
  }
```

Disconnect from the XRP Ledger and return the .

```
finally {
  await client.disconnect();
}
} // End of getAccountFromSeed()
```


### getAccountFromSeed1 and getAccountFromSeed2

These wrapper functions populate the Account1 Address or Account2 address from a seed value, respectively.

```
async function getAccountFromSeed1() {
  account1address.value = await getAccountFromSeed(account1seed.value)
}

async function getAccountFromSeed2() {
  account2address.value = await getAccountFromSeed(account2seed.value)
}
```


### gatherAccountInfo()

This local function copies the name, account, and seed values for Account1 and Account2 and displays the information in the Result field. You can then copy the information to reuse in another modular tutorial.

```
function gatherAccountInfo() {
  let accountData = account1name.value + "\n" + account1address.value + "\n" + account1seed.value + "\n"
  accountData += account2name.value + "\n" + account2address.value + "\n" + account2seed.value
  resultField.value = accountData
}
```


### distributeAccountInfo()

This local function parses structured account information from the Result field and distributes it to the corresponding account fields. It is the counterpart to the gatherAccountInfo() utility. The purpose is to let you continue to use the same accounts in all of the modular examples. If you have information that doesn't perfectly conform, you can still use this utility to populate the fields with the information that does fit the format.

```
function distributeAccountInfo() {
  let accountInfo = resultField.value.split("\n")
  account1name.value = accountInfo[0]
  account1address.value = accountInfo[1]
  account1seed.value = accountInfo[2]
  account2name.value = accountInfo[3]
  account2address.value = accountInfo[4]
  account2seed.value = accountInfo[5]
}
```


### populate1() and populate2

These local functions populate the active form fields with values for their correesponding accounts.

```
function populate1() {
  accountNameField.value = account1name.value
  accountAddressField.value = account1address.value
  accountSeedField.value = account1seed.value
  getXrpBalance()
}

function populate2() {
  accountNameField.value = account2name.value
  accountAddressField.value = account2address.value
  accountSeedField.value = account2seed.value
  getXrpBalance()
}
```


### getXrpBalance()

Connect to the XRP Ledger, send a getXrpBalance() request for the current acitve account, then display it in the XRP Balance Field.

`getXrpBalance()`

```
async function getXrpBalance() {
  const net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = `\n===Getting XRP balance...===\n\n`
  resultField.value = results
  try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const balance = await client.getXrpBalance(wallet.address)
    results += accountNameField.value + " current XRP balance: " + balance + "\n\n"
    xrpBalanceField.value = await client.getXrpBalance(accountAddressField.value)
    resultField.value = results
  }
```

Catch any errors and disconnect from the XRP Ledger.

```
catch (error) {
  console.error('Error getting XRP balance:', error);
  results += `\nError: ${error.message}\n`
  resultField.value = results
  throw error; // Re-throw the error to be handled by the caller
}
finally {
  // Disconnect from the client
  await client.disconnect();
}
```


### getTokenBalance()

Get the balance of all tokens for the current active account. This is a function that is used frequently in other modular tutorials that deal with currencies other than XRP.

```
async function getTokenBalance() {
```

Connect with the network.

```
let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()   
  let results = `===Connected to ${net}.===\n===Getting account token balance...===\n\n`
  resultField.value += results
```

Send a request to get the account balance, then wait for the results.

```
try {
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    const balance = await client.request({
      command: "gateway_balances",
      account: wallet.address,
      ledger_index: "validated",
    })
    results = accountNameField.value + "\'s token balance(s): " + JSON.stringify(balance.result, null, 2) + "\n"
    resultField.value += results
    xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
  }
```

Catch and report any errors, then disconnect from the XRP Ledger.

```
catch (error) {
    console.error('Error getting token balance:', error);
    results = `\nError: ${error.message}\n`
    resultField.value += results
    throw error; // Re-throw the error to be handled by the caller
  }
  finally {
    // Disconnect from the client
    await client.disconnect();
  }
}
```


## base-module.html

Create a standard HTML form to send transactions and requests, then display the results.

```
<html>
<head>
    <title>XRPL Base Module</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='send-xrp.js'></script>
</head>

<!-- ************************************************************** -->
<!-- ********************** The Form ****************************** -->
<!-- ************************************************************** -->

<body>
    <h1>XRPL Base Module</h1>
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
                <td>
                    <button type="button" onClick="sendXRP()">Send XRP</button>
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
                    <button type="button" onClick="getXrpBalance()">Get XRP Balance</button>
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

![XRPL Base Module](https://xrpl.org/assets/mt-send-xrp-1-xrpl-base-module.026b6630bb031a3135158c15d62cbeb36fd755a424474b9c1151c20282f71c19.ac57e6ef.png)

![Accounts 1 and 2](https://xrpl.org/assets/mt-send-xrp-2-named-accounts.62ef8f5c508eb6c2df0b00bcda22818ee8aa2f6a3bb9729ba2dde9a720b262c0.ac57e6ef.png)

![Transferred XRP](https://xrpl.org/assets/mt-send-xrp-3-transferred-xrp.dd2a338649df4cb0c1da4a6d5902325fa461de6dc2d9e18fe7a4968b5ee41ac3.ac57e6ef.png)

![Transferred XRP from Account 2 to Account 1](https://xrpl.org/assets/mt-send-xrp-4-account2-send-xrp.1c6d388312cf8c143c7214ed2b3db5e068de1c0808939371f0eb5cf3beb58011.ac57e6ef.png)

![Copy gathered info from the Result field.](https://xrpl.org/assets/mt-send-xrp-5-gather-account-info.aafc4638058f5b42d25531c2a8ac182f070c430d2e0b514d459f8689556cf948.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d524fc66-a182-431a-af12-4dadef195e7c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d524fc66-a182-431a-af12-4dadef195e7c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e95e1aa-b3a7-4288-97e9-dee0bb02f5e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e95e1aa-b3a7-4288-97e9-dee0bb02f5e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4b0d8aa4-8ea8-4acd-a3d4-05ccdaa59dfb&bo=1&sid=b09354309d9b11f09376c525b5d0d861&vid=b093c4409d9b11f08bb00325d7b33009&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&r=&lt=3511&evt=pageLoad&sv=2&cdb=AQAS&rn=474103)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=48e2287d-e3cc-4762-99cf-7c8898753a08&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=48e2287d-e3cc-4762-99cf-7c8898753a08&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4bc7473d-4b82-412c-8f03-dd9631098623&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4bc7473d-4b82-412c-8f03-dd9631098623&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9984432b-c381-4264-b234-16f984f2982f&pt=Create%20Accounts%20and%20Send%20XRP%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fsend-payments%2Fcreate-accounts-send-xrp&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/send-payments/create-accounts-send-xrp#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/send-payments/create-accounts-send-xrp#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/send-payments/create-accounts-send-xrp#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/send-payments/create-accounts-send-xrp#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/send-payments/create-accounts-send-xrp.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:21:07.965Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
