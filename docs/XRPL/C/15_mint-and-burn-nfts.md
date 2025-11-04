# Mint and Burn NFTs Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/nfts/mint-and-burn-nfts
Section: C15

## Overview


## Extracted Content
# Mint and Burn NFTs Using JavaScript

This example shows how to:

1. Mint new Non-fungible Tokens (NFTs).
1. Get a list of existing NFTs.
1. Delete (Burn) an NFT.


# Usage

You can download the NFT Modular Tutorials archive to try the sample in your own browser.


## Get Accounts

1. Open mint-nfts.html in a browser.
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

`mint-nfts.html`

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


## Mint an NFT

To mint a non-fungible token object:

1. Click the Account 1 or Account 2 radio button. The account information populates the uneditable fields of the form.
1. Set the Flags field. For testing purposes, we recommend setting the value to 8. This sets the tsTransferable flag, meaning that the NFT object can be transferred to another account. Otherwise, the NFT object can only be transferred back to the issuing account.
1. Enter the NFT URL. This is a URI that points to the data or metadata associated with the NFT object. You can use the sample URI provided if you do not have one of your own.
1. Enter the Transfer Fee, a percentage of the proceeds from future sales of the NFT that will be returned to the original creator. This is a value of 0-50000 inclusive, allowing transfer rates between 0.000% and 50.000% in increments of 0.001%. If you do not set the Flags field to allow the NFT to be transferrable, set this field to 0. If you impose a transfer fee, your NFT can only be traded for tokens for which your account has a trust line. See Trust Lines.
1. Enter an NFT Taxon. This is a required value, but if you are not using the field to create an integer-based taxon entry, you can set the value to 0.
1. (Optional) You can set an expected price for the NFT. To set a price in XRP, enter the amount in drops in the Amount field. To use an issued currency, enter the Currency, Issuer, and Amount.
1. Optionally, you can enter a Destination address that will be the only account authorized to purchase the NFT.
1. Optionally, you can enter an Expiration value in days, after which the offer will no longer be available.
1. Click Mint NFT.


## Get Tokens

Click Get NFTs to get a list of NFTs owned by the currently selected account.


## Burn a Token

The current owner of an NFT can always destroy (or burn) an NFT object.

To permanently destroy an NFT:

1. Enter or select the account that owns the NFT.
1. Enter the NFT ID.
1. Click Burn NFT.


# Code Walkthrough

You can download the NFT Modular Tutorials archive to examine the code samples.


## mint-nfts.js


### Mint NFT

Get the account wallet and connect to the XRP Ledger.

```
async function mintNFT() {
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  const net = getNet();
  const client = new xrpl.Client(net);
  let results = `\n=== Connected. Minting NFT ===`;
  resultField.value = results;

  try {
    await client.connect();
```

Prepare the  transaction parameters.

```
const transactionParams = {
      TransactionType: "NFTokenMint",
      Account: wallet.classicAddress,
      URI: xrpl.convertStringToHex(nftURLfield.value),
      Flags: parseInt(flagsField.value, 10), // Parse to integer
      TransferFee: parseInt(transferFeeField.value, 10), // Parse to integer
      NFTokenTaxon: parseInt(nftTaxonField.value, 10), // Parse to integer
    };
```

Add optional fields.

```
// Add optional fields
    if (amountField.value) {
         transactionParams.Amount = configureAmount(amountField.value);
    }

    if (expirationField.value) {
       transactionParams.Expiration = configureExpiration(expirationField.value);
    }

    if (destinationField.value) {
      transactionParams.Destination = destinationField.value;
    }
```

Log the transaction parameters before submission.

```
console.log("Mint NFT Transaction Parameters:", transactionParams);
```

Submit the transaction.

```
const tx = await client.submitAndWait(transactionParams, { wallet });
```

Get the current list of NFTs owned by the account.

```
const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
    });
```

Report the results of the transaction.

```
results = `\n\n=== Transaction result: ${tx.result.meta.TransactionResult} ===`;
    results += `\n\n=== NFTs: ${JSON.stringify(nfts, null, 2)} ===`;
    results += `\n\n=== XRP Balance: ${await client.getXrpBalance(wallet.address)} ===`; // Await here
    resultField.value = results;
```

Catch and report any errors.

```
} catch (error) {
    console.error("Error minting NFT:", error);
    results += `\n\n=== Error minting NFT: ${error.message} ===`; // Use error.message
    resultField.value = results;
```

Disconnect from the XRP Ledger.

```
} finally {
    if (client && client.isConnected()) { // Check if connected before disconnecting
      await client.disconnect();
    }
  }
} // End of mintToken()
```


### Get NFTs

Get the wallet and connect to the XRP Ledger.

```
async function getNFTs() {
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  const net = getNet();
  const client = new xrpl.Client(net);
  let results = '\n=== Connected. Getting NFTs. ===';
  resultField.value = results;
  try {
    await client.connect();
```

Prepare and send the account_nfts request.

`account_nfts`

```
const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
    });
```

Report the results.

```
results = '\n=== NFTs:\n ' + JSON.stringify(nfts, null, 2) + ' ===';
    resultField.value = results;
```

Catch and report any errors.

```
} catch (error) {
    console.error("Error getting NFTs:", error);
    results += `\n\n=== Error getting NFTs: ${error.message} ===`;
    resultField.value = results;
```

Disconnect from the XRP Ledger.

```
} finally {
    if (client && client.isConnected()) {
      await client.disconnect();
    }
  }
} // End of getNFTs()
```


### Burn NFT

Get the account wallet and connect to the XRP Ledger.

```
async function burnNFT() {
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  const net = getNet();
  const client = new xrpl.Client(net);
  let results = '\n=== Connected. Burning NFT. ===';
  resultField.value = results;
  try {
    await client.connect();
```

Prepare the NFTokenBurn transaction.

`NFTokenBurn`

```
const transactionBlob = {
      TransactionType: "NFTokenBurn",
      Account: wallet.classicAddress,
      NFTokenID: nftIdField.value,
    };

    console.log("Burn NFT Transaction Parameters:", transactionBlob); // Log before submit
```

Submit the transaction and wait for the results.

```
const tx = await client.submitAndWait(transactionBlob, { wallet });
    const nfts = await client.request({ // Get nfts after burning.
      method: "account_nfts",
      account: wallet.classicAddress,
    });
```

Report the results.

```
results = `\n=== Transaction result: ${tx.result.meta.TransactionResult} ===`; 
    results += '\n\n=== Balance changes: ' +
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2) + ' ===';
    results += '\n\n=== NFTs: \n' + JSON.stringify(nfts, null, 2) + ' ==='; 
    resultField.value = results;
    xrpBalanceField.value = (await client.getXrpBalance(wallet.address)); // Await
```

Catch and report any errors.

```
} catch (error) {
    console.error("Error burning NFT:", error);
    results = `\n\n=== Error burning NFT: ${error.message} ===`; // User friendly
    resultField.value = results;
```

Disconnect from the XRP Ledger.

```
} finally {
    if (client && client.isConnected()) {
      await client.disconnect();
    }
  }
}
```


## mint-nfts.html

```
<html>
<head>
    <title>Mint NFTs</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src='transaction-support.js'></script>
    <script src='mint-nfts.js'></script>
</head>
<body>
    <h1>Mint NFTs</h1>
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
                    <span class="tooltip" tooltip-data="Amount of currency to send. If XRP, you can enter 1 per XRP: the amount is converted to drops for you.">
                        <label for="amountField">Amount</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="amountField" size="40"></input>
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

![Mint NFTs Tester](https://xrpl.org/assets/mt-mint-token-1-empty-form.9ceb9e85f45fe6a431a3b3b5bf56462b4b4e39f1de6e6a343bc9a270f1d8b5ef.ac57e6ef.png)

![Get accounts](https://xrpl.org/assets/mt-mint-token-2-accounts.be3263e5b9afd633a55063af9b15cf7040bcd6769331643a6857a335edf8c5c9.ac57e6ef.png)

![Mint NFT fields](https://xrpl.org/assets/mt-mint-token-3-mint-token.2b95d6af2179fb5cb955dc541cea5969325f60bd0292cc7528ceee21fcf27ec0.ac57e6ef.png)

![Get NFTs](https://xrpl.org/assets/mt-mint-token-4-get-tokens.850c69cb07290d2d0dfb56d6e2d9353fba21876fcebc530b7b1efb1d538ba91e.ac57e6ef.png)

![Burn NFTs](https://xrpl.org/assets/mt-mint-token-5-burn-token.890a23ebdf1b05b385952fe7213e732d0d07a0407d238b1bffb2b567f61795b3.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61d07bc1-bc92-4b96-9c38-f61a3ae9e777&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61d07bc1-bc92-4b96-9c38-f61a3ae9e777&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dbc2b759-1144-4f8b-af71-6961e5e5dc28&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dbc2b759-1144-4f8b-af71-6961e5e5dc28&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c62222fa-12ee-492e-9742-47c50ff970a4&bo=1&sid=41eabca09d9c11f0b2c8050894dbacad&vid=41eb2aa09d9c11f0ab7945c84f8dbebc&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&r=&lt=3492&evt=pageLoad&sv=2&cdb=AQAS&rn=712359)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6464f368-5d4e-4ea3-a87c-ac23c8143f61&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6464f368-5d4e-4ea3-a87c-ac23c8143f61&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd4d9b40-cb0e-4163-b652-8a8f14f704be&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd4d9b40-cb0e-4163-b652-8a8f14f704be&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4e5e02bb-5d94-4307-b147-12a087b2c191&pt=Mint%20and%20Burn%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Fmint-and-burn-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/nfts/mint-and-burn-nfts#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/nfts/mint-and-burn-nfts#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/nfts/mint-and-burn-nfts#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/nfts/mint-and-burn-nfts#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a1e6ce814060c1fbceac98d103161293.1759195491402.1759195491402.1759195491402.1&__hssc=78174987.1.1759195491402&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/nfts/mint-and-burn-nfts.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a1e6ce814060c1fbceac98d103161293.1759195491402.1759195491402.1759195491402.1&__hssc=78174987.1.1759195491402&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:25:12.107Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
