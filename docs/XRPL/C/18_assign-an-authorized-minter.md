# Assign an Authorized Minter Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/nfts/assign-an-authorized-minter
Section: C18

## Overview


## Extracted Content
# Assign an Authorized Minter Using JavaScript

You can assign another account permission to mint NFTs for you.

This example shows how to:

1. Authorize an account to create NFTs for your account.
1. Mint an NFT for another account, when authorized.


# Usage

You can download the NFT Modular Sam;ples archive to try the sample in your own browser.


## Get Accounts

1. Open authorized-minter.html in a browser.
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

`authorized-minter.html`

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


## Authorize an Account to Create NFTs

To authorize another account to create NFTs for your account:

1. Click the Account 1 or Account 2 radio button. The account information populates the uneditable fields of the form.
1. Enter the account you want to authorize in the Authorized Minter field.
1. Click Authorize Minter.


## Mint an NFT for Another Account

To mint a non-fungible token for another account:

1. Click the Account 1 or Account 2 radio button. The account information populates the uneditable fields of the form.
1. Set the Flags field. For testing purposes, we recommend setting the value to 8.
1. Enter the NFT URL. This is a URI that points to the data or metadata associated with the NFT object. You can use the sample URI provided if you do not have one of your own.
1. Enter the Transfer Fee, a percentage of the proceeds that the original creator receives from future sales of the NFT. This is a value of 0-50000 inclusive, allowing transfer rates between 0.000% and 50.000% in increments of 0.001%. If you do not set the Flags field to allow the NFT to be transferrable, set this field to 0.
1. Enter the account number on whose behalf you are minting the NFT in the NFT Issuer field.
1. Optionally, you can set an expected prices for the NFT. To set a price in XRP, enter the amount in drops in the Amount field. To use an issued currency, enter the Currency, Issuer, and Amount.
1. Optionally, you can enter a Destination address that will be the only account authorized to purchase the NFT.
1. Optionally, you can enter an Expiration value in days, after which the offer will no longer be available.
1. Click Mint Other.

Once the item is minted, the authorized minter can sell the NFT normally. The proceeds go to the authorized minter, less the transfer fee. The minter and the issuer can settle up on a division of the price separately.


# Code Walkthrough

You can download the NFT Modular Tutorials archive to try each of the samples in your own browser.


## Authorize Minter

This function sets the authorized minter for an account. Each account can have 0 or 1 authorized minter that can mint NFTs in its stead.

```
// *******************************************************
// ****************  Authorize Minter  *******************
// *******************************************************

async function authorizeMinter() {
```

Get the account wallet and connect to the XRP Ledger.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  const net = getNet();
  const client = new xrpl.Client(net);
  let results = `\n=== Connected. Authorizing Minter. ===`;
  resultField.value = results;

  try {
    await client.connect();
```

Create the transaction JSON.

```
tx_json = {
      "TransactionType": "AccountSet",
      "Account": wallet.address,
      "NFTokenMinter": authorizedMinterField.value,
      "SetFlag": xrpl.AccountSetAsfFlags.asfAuthorizedNFTokenMinter
    }
```

Sign and send the prepared transaction, then wait for the results.

```
const prepared = await client.autofill(tx_json)
    const signed = wallet.sign(prepared)
    const result = await client.submitAndWait(signed.tx_blob)
```

Report the results.

```
results += '\nAccount setting succeeded.\n'
    results += JSON.stringify(result, null, 2)
    resultField.value = results
```

Catch and report any errors.

```
} catch (error) {
    console.error("Error setting minter:", error);
    results = `\n\n=== Error setting minter: ${error.message}`;
    resultField.value += results;
```

Disconnect from the XRP Ledger.

```
} finally {
    if (client && client.isConnected()) {
      await client.disconnect();
    }
  }
```


## Mint Other

This revised mint function allows one account to mint for another issuer.

```
// *******************************************************
// ****************  Mint Other  *************************
// *******************************************************

async function mintOther() {
```

Get the account wallet and connect to the XRP Ledger.

```
async function mintOther() {
  let results = 'Connecting to ' + getNet() + '....'
  resultField.value = results
  const net = getNet()
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  const client = new xrpl.Client(net)

  try {
    await client.connect()
    results += '\nConnected. Minting NFT.'
    resultField.value = results
```

Create the JSON transaction object.

```
// ------------------------------------------------------------------------
    const tx_json = {
      "TransactionType": "NFTokenMint",
      "Account": wallet.classicAddress,
      "URI": xrpl.convertStringToHex(nftURLfield.value),
      "Flags": parseInt(flagsField.value),
      "TransferFee": parseInt(transferFeeField.value),
      "Issuer": nftIssuerField.value,
      "NFTokenTaxon": nftTaxonField.value //Required, but if you have no use for it, set to zero.
    }
```

If the Amount field is populated, configure and add the expected amount the NFT will sell for.

```
if (amountField.value) {
         tx_json.Amount = configureAmount(amountField.value);
    }
```

If the Expiration (days) field is populated, configure and add the expiration date.

```
if (expirationField.value) {
       tx_json.Expiration = configureExpiration(expirationField.value);
    }
```

If the Destination field is populated, add it to the transaction JSON object.

```
if (destinationField.value) {
      tx_json.Destination = destinationField.value;
    }
```

Submit the transaction and wait for the result.

```
const tx = await client.submitAndWait(tx_json, { wallet: wallet })
```

Request the list of NFTs for the current account.

```
const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress
    })
```

Report the results.

```
results += '\n\n=== Transaction result: ' + tx.result.meta.TransactionResult
    results += '\n\n=== NFTs: ' + JSON.stringify(nfts, null, 2)
    resultField.value = results + (await client.getXrpBalance(wallet.address))
```

Catch and report any errors.

```
} catch (error) {
    results += '\n\nAn error occurred: ' + error.message
    console.error(error) // Log the error for debugging
    resultField.value = results
```

Disconnect from the XRP Ledger.

```
} finally {
    if (client.isConnected()) { // Check if the client is connected before attempting to disconnect
      client.disconnect()
      results += '\nDisconnected from XRPL.'
      resultField.value = results
    }
  }
} //End of mintOther()
```


## authorized-minter.html

```
<html>
<head>
    <title>Authorize Minter of NFTs</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='transaction-support.js'></script>
    <script src='mint-nfts.js'></script>
    <script src='authorized-minter.js'></script>
</head>
<body>
    <h1>Authorize Minter of NFTs</h1>
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
                    <span class="tooltip" tooltip-data="Arbitrary human-readable name for the account."><label
                            for="account1name">Account 1 Name</label>
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
                <td rowspan="4" align="center">
                    <p>
                        <img id="nftImage"
                            src="https://ipfs.io/ipfs/bafybeigjro2d2tc43bgv7e4sxqg7f5jga7kjizbk7nnmmyhmq35dtz6deq"
                            width="150" height="150">
                </td>
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
                    <span class="tooltip" tooltip-data="NFT configuration flags.">
                        <label for="flagsField">Flags</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="flagsField" size="40"></input>
                </td>
                <td align="right">
                    <span class="tooltip" tooltip-data="URL to the stored NFT.">
                        <label for="nftURLfield">NFT URL</label>
                    </span>&nbsp;&nbsp;
                    <input type="text" id="nftURLfield" size="30"
                        value="https://ipfs.io/ipfs/bafybeigjro2d2tc43bgv7e4sxqg7f5jga7kjizbk7nnmmyhmq35dtz6deq"></input>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Percentage of sale price collected by the issuer when the NFT is sold. Enter a value from 0 to 50000, where 1000=1%.">
                        <label for="transferFeeField">Transfer Fee</label>
                    </span>
                    <p id="error-message"></p>
                </td>
                <td>
                    <input type="text" id="transferFeeField" size="40"></input>
                </td>
                <td>
                    <button type="button" onClick="mintNFT()">Mint NFT</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="NFT Taxon. Integer value used to identify NFTs minted in a series or collection. This value is required. Set it to 0 if you have no use for it.">
                        <label for="nftTaxonField">NFT Taxon</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="nftTaxonField" size="40" value="0"></input>
                </td>
                <td>
                    <button type="button" onClick="getNFTs()">Get NFTs</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Currency for the offer.">
                        <label for="currencyField">Currency</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="currencyField" size="40"></input>
                    <br>
                </td>
                <td>
                    <button type="button" onClick="burnNFT()">Burn NFT</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Issuer of the currency used.">
                        <label for="issuerField">Issuer</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="issuerField" size="40"></input>
                    <br>
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
                <td>
                    <button type="button" onClick="authorizeMinter()">Authorize Minter</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Destination account address where XRP is sent.">
                        <label for="destinationField">Destination</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="destinationField" size="40"></input>
                    <br>
                </td>
                <td>
                    <button type="button" onClick="mintOther()">Mint Other</button>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Number of days the offer is valid.">
                        <label for="expirationField">Expiration (days)</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="expirationField" size="40"></input>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="NFT ID, used to transfer or burn the NFT after it is created.">
                        <label for="nftIdField">NFT ID</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="nftIdField" size="40"></input>
                </td>
            </tr>
             <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Account address that is authorized to mint NFTs for this account.">
                        <label for="authorizedMinterField">Authorized Minter</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="authorizedMinterField" size="40"></input>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Account that is the original issuer of the NFT.">
                        <label for="nftIssuerField">NFT Issuer</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="nftIssuerField" size="40"></input>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <p align="left">
                        <textarea id="resultField" cols="75" rows="20"></textarea>
                    </p>
                </td>
                <td align="left" valign="top">
                    <button type="button" onClick="gatherAccountInfo()">Gather Account Info</button><br />
                    <button type="button" onClick="distributeAccountInfo()">Distribute Account Info</button>
                </td>
            </tr>
        </table>
    </form>
</body>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const imageURLInput = document.getElementById('nftURLfield'); // Correct ID to nftURLfield
        const displayImage = document.getElementById('nftImage');
        const errorMessage = document.getElementById('error-message');

        if (imageURLInput) {
            imageURLInput.addEventListener('change', () => {
                const newURL = imageURLInput.value;
                displayImage.src = ''; // Clear previous image
                errorMessage.style.display = 'none';
                try {
                    new URL(newURL);
                } catch (_) {
                    errorMessage.textContent = 'Invalid URL. Please enter a valid URL, including "https://" or "http://".';
                    errorMessage.style.display = 'block';
                    return;
                }
                displayImage.onload = () => {
                    // Image loaded.  You might add a console log here, or update UI.
                    console.log(`Image loaded from: ${newURL}`);
                };
                displayImage.onerror = () => {
                    errorMessage.textContent = 'Error loading image from the provided URL.';
                    errorMessage.style.display = 'block';
                    displayImage.src = ''; // Clear the image on error
                };
                displayImage.src = newURL; // Load the image
            });
        }
    });

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
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

![Token Test Harness](https://xrpl.org/assets/mt-auth-minter-1-empty-form.5fbe1b165933b229e098ff8cae4ca99a622fce4028edfc91e802d24d12dd9e68.ac57e6ef.png)

![Authorized Minter](https://xrpl.org/assets/mt-auth-minter-2-authorize-minter.a6f7b724dd38bf57b95401eb1ef3af7aa2eb8697a944f7fb4d70667ac44ef6bf.ac57e6ef.png)

![Minted NFT for Another Account](https://xrpl.org/assets/mt-auth-minter-3-mint-other.cc361229dd8b32b2e998a6af15bccc4f7c67471a6a1a052fb15f8acb6c2c1b5f.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2205fa29-0bde-47cb-a8df-956434ecb99d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2205fa29-0bde-47cb-a8df-956434ecb99d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39b1ffa6-97dd-40cb-aff9-52f061420457&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39b1ffa6-97dd-40cb-aff9-52f061420457&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=d3b1d4f9-edbd-44b4-a66d-aab6e3ed876f&bo=1&sid=7d3330109d9c11f09d24a5e243a2eedf&vid=7d33d1209d9c11f089691d32f8316eec&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&r=&lt=3494&evt=pageLoad&sv=2&cdb=AQAS&rn=231463)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=050e1d7d-4a3b-404a-ad1e-ceb08587ff18&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=050e1d7d-4a3b-404a-ad1e-ceb08587ff18&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=156cb53d-76f5-48a2-a2a5-5324da86da80&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=156cb53d-76f5-48a2-a2a5-5324da86da80&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a664a583-287a-44a4-adb7-bd8a13e1a070&pt=Assign%20an%20Authorized%20Minter%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fassign-an-authorized-minter&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/nfts/assign-an-authorized-minter#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/nfts/assign-an-authorized-minter#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/nfts/assign-an-authorized-minter#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/nfts/assign-an-authorized-minter#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b4078082c40160a4e186f526bd845826.1759195590841.1759195590841.1759195590841.1&__hssc=78174987.1.1759195590841&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/nfts/assign-an-authorized-minter.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b4078082c40160a4e186f526bd845826.1759195590841.1759195590841.1759195590841.1&__hssc=78174987.1.1759195590841&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:26:48.453Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
