# Transfer NFTs Using JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/nfts/transfer-nfts
Section: C16

## Overview


## Extracted Content
# Transfer NFTs Using JavaScript

This example shows how to:

1. Create NFT Sell Offers.
1. Create NFT Buy Offers.
1. Accept NFT Sell Offers.
1. Accept NFT Buy Offers.
1. Get a list of offers for a particular NFT.
1. Cancel an offer.

You can download the NFT Modular Tutorials archive to try each of the samples in your own browser.


# Usage


## Get Accounts

1. Open transfer-nfts.html in a browser.
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

`transfer-nfts.html`

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


## Create a Sell Offer

To create an NFT sell offer:

1. Click the Account 1 or Account 2 radio button. The account information populates the uneditable fields of the form.
1. Enter the Amount of the sell offer.If using XRP, enter the Amount in drops (millionths of an XRP; for example, 20000000).If using issued currency, enter the Currency code, Issuer account address, and the Amount.
1. If using XRP, enter the Amount in drops (millionths of an XRP; for example, 20000000).
1. If using issued currency, enter the Currency code, Issuer account address, and the Amount.
1. Optionally, include a Destination account address. If present, only that account will have permission to accept the sell offer.
1. Optionally, enter a number of days until Expiration of the offer.
1. Enter the NFT ID of the NFT you want to sell.
1. Click Create Sell Offer.

1. If using XRP, enter the Amount in drops (millionths of an XRP; for example, 20000000).
1. If using issued currency, enter the Currency code, Issuer account address, and the Amount.


## Get Offers

To list the buy and sell offers associated with an NFT:

1. Enter the NFT ID.
1. Click Get Offers.

The key piece of information is the NFT Offer ID (labeled as nft_offer_index), which you use to accept a sell or buy offer.

`nft_offer_index`


## Accept Sell Offer

Once a sell offer is available, another account can opt to accept the offer and buy the NFT.

To accept an available sell offer:

1. Click the Account 1 or Account 2 radio button. The account information populates the uneditable fields of the form.
1. Enter the NFT Offer Index (labeled as nft_offer_index in the token offer results. This is different from the NFTokenID.)
1. Click Accept Sell Offer.

`nft_offer_index`

`NFTokenID`


## Create a Buy Offer

You can offer to buy an NFT from another account.

To create an offer to buy an NFT:

1. Click the Account 1 or Account 2 radio button to change to an account other than the NFT owner.
1. Enter the Amount of your offer.If paying XRP, enter the Amount of XRP in drops (1000000 equals 1 XRP).If paying an issued currency, enter the Currency, Issuer, and Amount.
1. If paying XRP, enter the Amount of XRP in drops (1000000 equals 1 XRP).
1. If paying an issued currency, enter the Currency, Issuer, and Amount.
1. Optionally, enter the number of days until Expiration.
1. Enter the NFT ID.
1. Enter the owner’s account address in the NFT Owner Address field.
1. Click Create Buy Offer.

1. If paying XRP, enter the Amount of XRP in drops (1000000 equals 1 XRP).
1. If paying an issued currency, enter the Currency, Issuer, and Amount.


## Accept a Buy Offer

To accept an offer to buy an NFT:

1. Click the Account 1 or Account 2 radio button to change to the NFT owner account.
1. Use Get Offers, above, if needed, to find the nft_offer_index.
1. Enter the nft_offer_index in the NFT Offer ID field.
1. Click Accept Buy Offer.

`nft_offer_index`

`nft_offer_index`


## Cancel Offer

To cancel a buy or sell offer that you have created:

1. Click the Account 1 or Account 2 radio button. The account information populates the uneditable fields of the form.
1. Enter the NFT Offer Index.
1. Click Cancel Offer.


# Code Walkthrough

You can download the NFT Modular Examples archive to try each of the samples in your own browser.


## Create Sell Offer

```
// *******************************************************
// ****************** Create Sell Offer ******************
// *******************************************************
      
async function createSellOffer() {
```

Get the account wallet and connect to the XRP Ledger.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  let results = '\nCreating sell offer...';
  resultField.value = results;

  try {
    const client = new xrpl.Client(getNet());
    await client.connect();
    try {
```

If the destination field is populated, capture the value.

```
const destination = destinationField.value || undefined;
```

If the Expiration field is populated, configure the expiration date for the sell offer.

```
const expiration = expirationField.value ? configureExpiration() : undefined;
```

Begin constructing the transaction JSON object.

```
const transactionJson = {
        TransactionType: "NFTokenCreateOffer",
        Account: wallet.classicAddress,
        NFTokenID: nftIdField.value,
        Flags: 1,
      };
```

Configure the amount. To give the NFT away, set the Amount to 0. configureAmount() determines whether the currency is XRP or an issued currency, and returns the properly formattted object to add to the JSON transaction object.

`configureAmount()`

```
const amount = configureAmount();
      if (amount) { // Only add Amount if it's defined
        transactionJson.Amount = amount;
      } else {
        console.warn("Amount is undefined. Sell offer might be invalid.");
        resultField.value = results;
      }
```

If you have an expiration date or specified destination, add them to the JSON transaction object.

```
if (expiration) {
        transactionJson.Expiration = expiration;
      }
      if (destination) {
        transactionJson.Destination = destination;
      }
```

Submit the transaction, wait for and report the results.

```
const tx = await client.submitAndWait(transactionJson, { wallet });
      results += `\nSell offer created successfully!\nTransaction Hash: ${tx.result.hash}\nEngine Result: ${tx.result.engine_result}`;
      resultField.value = results;
```

Disconnect from the XRP Ledger.

```
} finally {
      client.disconnect();
    }
```

Catch and report any errors.

```
} catch (error) {
    console.error("Error creating sell offer:", error);
    results = `\nError: ${error.message || error}`;
    resultField.value = results;
  }
}// End of createSellOffer()
```


## Create Buy Offer

```
// *******************************************************
// ***************** Create Buy Offer ********************
// *******************************************************

async function createBuyOffer() {
```

Get the account wallet and connect to the ledger.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  let net = getNet();
  const client = new xrpl.Client(net);
  await client.connect();
  let results = '\n=== Connected. Creating buy offer. ===';
  resultField.value = results;
```

Configure the amount and expiration date, if present.

```
try {
    // Use the external configureAmount() function
    let amount = configureAmount();
    // Use the external configureExpiration() function
    let expiration = configureExpiration(); // This will return a number or an empty string from the original logic
```

Start constructing the transactionJson object.

```
let transactionJson = {
      "TransactionType": "NFTokenCreateOffer",
      "Account": wallet.classicAddress,
      "Owner": nftOwnerField.value,
      "NFTokenID": nftIdField.value,
      "Flags": 0, // Ensure no tfSellNFToken flag for a buy offer
    };
```

Add the configured amount to the transaction.

```
if (amount !== undefined && amount !== '') {
        transactionJson.Amount = amount;
    } else {
        results += "\nError: Amount field is required for a buy offer.";
        resultField.value = results;
        client.disconnect();
        return;
    }
```

Add the Destination value, if it is set.

```
if (destinationField.value !== '') {
      transactionJson.Destination = destinationField.value;
    }
```

Add the Expiration date if it's not an empty string.

```
if (expiration > 0) {
      transactionJson.Expiration = expiration;
    }
```

Submit the transaction and wait for the results. List the sell offers and buy offers currently available.

```
const tx = await client.submitAndWait(transactionJson, { wallet: wallet });

    results += "\n\n=== Sell Offers ===\n";
    let nftSellOffers;
    try {
      nftSellOffers = await client.request({
        method: "nft_sell_offers",
        nft_id: nftIdField.value
      });
    } catch (err) {
      nftSellOffers = "=== No sell offers. ===";
    }
    results += JSON.stringify(nftSellOffers, null, 2);
    results += "\n\n=== Buy Offers ===\n";
    let nftBuyOffers;
    try {
      nftBuyOffers = await client.request({
        method: "nft_buy_offers",
        nft_id: nftIdField.value
      });
      results += JSON.stringify(nftBuyOffers, null, 2);
    } catch (err) {
      results += "=== No buy offers. ===";
    }
```

Report the results of the transaction.

```
// Check transaction results -------------------------------------------------
    results += "\n\n=== Transaction result:\n" +
      JSON.stringify(tx.result.meta.TransactionResult, null, 2);
    results += "\n\n=== Balance changes:\n" +
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
    resultField.value = results;
```

Catch and report any errors.

```
} catch (error) {
    console.error('Error creating buy offer:', error);
    results += "\n\n=== Error: " + error;
    resultField.value = results;
```

Disconnect from the XRP Ledger.

```
} finally {
    client.disconnect();
  }
}// End of createBuyOffer()
```


## Cancel Offer

```
// *******************************************************
// ******************** Cancel Offer *********************
// *******************************************************

async function cancelOffer() {
```

Get the account wallet and connect to the ledger.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
  let results = "\n=== Connected. Cancelling offer. ==="
  resultField.value = results
```

Store the token offer ID in the NFTokenOffers array parameter.

`NFTokenOffers`

```
const tokenOfferIDs = [nftOfferIdField.value]
```

Construct the NFTokenCancelOffer JSON transaction.

```
const transactionJson = {
    "TransactionType": "NFTokenCancelOffer",
    "Account": wallet.classicAddress,
    "NFTokenOffers": tokenOfferIDs
  }
```

Submit the transaction and wait for the results.

```
const tx = await client.submitAndWait(transactionJson, { wallet })
```

List the remaining sell offers and buy offers.

```
results = "\n\n=== Sell Offers===\n"
  let nftSellOffers
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: nftIdField.value
    })
  } catch (err) {
    nftSellOffers = '=== No sell offers. ===\n'
  }
  results += JSON.stringify(nftSellOffers, null, 2)
  results += "\n\n=== Buy Offers ===\n"
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: nftIdField.value
    })
  } catch (err) {
    nftBuyOffers = '=== No buy offers. ==='
  } 
  results += JSON.stringify(nftBuyOffers, null, 2)
  resultField.value += results
```

Report the transaction results and XRP balance changes.

```
results = "\n=== Transaction result:\n" +
    JSON.stringify(tx.result.meta.TransactionResult, null, 2)
  results += "\n\n=== Balance changes:\n" +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  resultField.value += results
```

Disconnect from the XRP Ledger.

```
client.disconnect() // End of cancelOffer()
}
```


## Get Offers

```
// *******************************************************
// ******************** Get Offers ***********************
// *******************************************************


async function getOffers() {
```

Get the account wallet and connect to the ledger.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  let net = getNet()
  const client = new xrpl.Client(net)
  await client.connect()
 
  let results = '\nConnected. Getting offers...'
  resultField.value = results 

  // --- Sell Offers ---
  results += '\n\n=== Sell Offers ===\n'
```

Prepare and an nft_sell_offers request for the selected NFT ID. Catch any errors and report the results.

`nft_sell_offers`

```
let nftSellOffers
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: nftIdField.value
    })
  } catch (err) {
    nftSellOffers = 'No sell offers found for this NFT ID.'
  }
  results += JSON.stringify(nftSellOffers, null, 2)
  resultField.value = results
```

Prepare and an nft_buy_offers request for the selected NFT ID. Catch any errors and report the results.

`nft_buy_offers`

```
// --- Buy Offers ---
  results = '\n\n=== Buy Offers ===\n'
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: nftIdField.value
    })
  } catch (err) {
    // Log the actual error for debugging
    nftBuyOffers = 'No buy offers found for this NFT ID.' // More descriptive
  }
  results += JSON.stringify(nftBuyOffers, null, 2) // Append the JSON string
  resultField.value += results // Update the display with buy offers
```

Disconnect from the XRP Ledger.

```
client.disconnect()
}// End of getOffers()
```


## Accept Sell Offer

```
// *******************************************************
// ****************** Accept Sell Offer ******************
// *******************************************************


async function acceptSellOffer() {
```

Get the account wallet and connect to the ledger.

```
const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  let net = getNet()
  const client = new xrpl.Client(net)
  try {
    await client.connect()
    let results = '\n=== Connected. Accepting sell offer. ===\n\n'
    resultField.value = results
```

Prepare the transaction JSON object.

```
const transactionJson = {
      "TransactionType": "NFTokenAcceptOffer",
      "Account": wallet.classicAddress,
      "NFTokenSellOffer": nftOfferIdField.value,
  }
```

Submit the transaction and wait for the results.

```
const tx = await client.submitAndWait(transactionJson, { wallet: wallet })
```

Get the current NFTs held by the account after the transaction.

```
const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress
    })
```

Get the new XRP balance after the transaction.

```
xrpBalanceField.value = (await client.getXrpBalance(wallet.address))
```

Report the results.

```
results += '=== Transaction result:\n'
    results += JSON.stringify(tx.result.meta.TransactionResult, null, 2)
    results += '\n=== Balance changes:'
    results += JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    results += JSON.stringify(nfts, null, 2)
    resultField.value += results
```

Catch and report any errors.

```
} catch (error) {
    console.error('Error accepting sell offer:', error)
    resultField.value = `Error: ${error.message || error}`
```

Disconnect from the XRP Ledger.

```
} finally {
    client.disconnect()
  }
}// End of acceptSellOffer()

### Accept Buy Offer

```javascript
// *******************************************************
// ******************* Accept Buy Offer ******************
// *******************************************************

async function acceptBuyOffer() {
```

Get the account wallet and connect to the XRP Ledger.

```
async function acceptBuyOffer() {
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value);
  let net = getNet();
  const client = new xrpl.Client(net);
  let results = '\n=== Connected. Accepting buy offer. ==='; // Declare results locally

  try {
    await client.connect();
    resultField.value = results;
```

Create the transactionJson object, passing the account address and the buy offer ID.

```
const transactionJson = {
      "TransactionType": "NFTokenAcceptOffer",
      "Account": wallet.classicAddress,
      "NFTokenBuyOffer": nftOfferIdField.value
    };
```

Submit the transaction and wait for the results.

```
const tx = await client.submitAndWait(transactionJson, { wallet: wallet });
```

Report the current list of account NFTs after the transaction.

```
const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress
    });

    results += JSON.stringify(nfts, null, 2);
    resultField.value = results;
```

Report the result of the transaction and update the XRP Balance field.

```
results += "\n\nTransaction result:\n" +
      JSON.stringify(tx.result.meta.TransactionResult, null, 2);
    results += "\nBalance changes:\n" +
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
    xrpBalanceField.value = (await client.getXrpBalance(wallet.address));
    resultField.value = results;
```

Catch and report any errors.

```
} catch (error) {
    console.error('Error in acceptBuyOffer:', error); // Log the full error
    results = `\n=== Error accepting buy offer: ${error.message || 'Unknown error'} ===`; 
    resultField.value = results;
```

Disconnect from the XRP Ledger.

```
} finally {
    if (client && client.isConnected()) {
      client.disconnect();
    }
  }
} // End of acceptBuyOffer()
```


## 4.transfer-nfts.html

```
<html>
<head>
    <title>Transfer NFTs</title>
    <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
    <link href="modular-tutorials.css" rel="stylesheet">
    <script src='https://unpkg.com/xrpl@4.1.0/build/xrpl-latest.js'></script>
    <script src="account-support.js"></script>
    <script src="transaction-support.js"></script>
    <!-- <script src='send-xrp.js'></script> -->
    <script src="transfer-nfts.js"></script>
    <script src="mint-nfts.js"></script>
</head>
<body>
    <h1>Transfer NFTs</h1>
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
                 <td>
                </td>
                <td>
                </td>
                <td>
                    <span class="tooltip" tooltip-data="URL to the stored NFT.">
                        <label for="nftURLfield">NFT URL</label>
                    </span>
                    <input type="text" id="nftURLfield" size="30"
                        placeholder="https://ipfs.io/ipfs/bafybeigjro2d2tc43bgv7e4sxqg7f5jga7kjizbk7nnmmyhmq35dtz6deq"></input>
                    <br />
                    <p id="error-message"></p>
                </td>
            </tr>
            <tr>
                <td align="right" >
                    <span class="tooltip" tooltip-data="Currency for the offer.">
                        <label for="currencyField">Currency</label>
                    </span>
                </td>
                 <td>
                    <input type="text" id="currencyField" size="40"></input>
                    <br>
                </td>
                <td align="center" valign="top">
                    <button type="button" onClick="getNFTs()">Get NFTs</button>
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
                <td>
                    <button type="button" onClick="createSellOffer()">Create Sell Offer</button>&nbsp;&nbsp;

                    <button type="button" onClick="createBuyOffer()">Create Buy Offer</button>
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
                    <button type="button" onClick="acceptSellOffer()">Accept Sell Offer</button>&nbsp;&nbsp;

                    <button type="button" onClick="acceptBuyOffer()">Accept Buy Offer</button>
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
                <td align="left" valign="top">
                    <button type="button" onClick="getOffers()" width="40">Get Offers</button>&nbsp;&nbsp;
                    <button type="button" onClick="cancelOffer()">Cancel Offer</button>
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
                    <span class="tooltip" tooltip-data="NFT ID code, used to identify the token after it's minted.">
                        <label for="nftIdField">NFT ID</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="nftIdField" size="40"></input>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="NFT Offer ID code, used to identify an offer to sell or buy an NFT.">
                        <label for="nftOfferIdField">NFT Offer ID</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="nftOfferIdField" size="40"></input>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span class="tooltip" tooltip-data="Account address of the Owner of an NFT offered to sell or buy.">
                        <label for="nftOwnerField">NFT Owner Address</label>
                    </span>
                </td>
                <td>
                    <input type="text" id="nftOwnerField" size="40"></input>
                </td>
            </tr>
            <tr valign="top">
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
        const loadButton = document.getElementById('showNFTbutton');
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

![Transfer NFTs Test Harness](https://xrpl.org/assets/mt-transfer-nft-1-empty-form.46c5d8fa98b6e49f247914531f1a9ce91d75939662f9ffeee732a38439048ee7.ac57e6ef.png)

![Form with account information](https://xrpl.org/assets/mt-transfer-nft-2-accounts-loaded.b93c2cab683a314e08ea97bea144a90503f871d942ed4864ab4f986e992de354.ac57e6ef.png)

![NFT Sell Offer](https://xrpl.org/assets/mt-transfer-nfts-3-create-sell-offer.e0c511dec927cbc5245d56197f0cb332f490d50360b59b213e0883662b9785fa.ac57e6ef.png)

![Get offers](https://xrpl.org/assets/mt-transfer-nfts-4-get-offers.999a100bee4d565556696da37484cb13d6cbadde9a7b34d9fdeb58835d82f87e.ac57e6ef.png)

![Accept Sell Offer](https://xrpl.org/assets/mt-transfer-nfts-5-accept-sell-offer.51deca64776c6656de95d8584ddc49ac212bf73fce8e4658899aadec1a74fc75.ac57e6ef.png)

![NFT Buy Offer](https://xrpl.org/assets/mt-transfer-nfts-6-create-buy-offer.b9ae0e3101d0721b978565a2b8096c82cfdc652ac52b3270388a3bf20087ab67.ac57e6ef.png)

![Accept Buy Offer](https://xrpl.org/assets/mt-transfer-nfts-7-accept-buy-offer.d142ce234adbbcebb380a93cea339bcb4a2e1e34c4323eff96671aef77a045a4.ac57e6ef.png)

![Cancel offer](https://xrpl.org/assets/mt-transfer-nfts-8-cancel-offer.dd8ea562aba892640e909e1c070ee6eff91b324cc06987cda9d30c583f6f4086.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=52fb1942-c48b-4690-a03b-cf1b70fb8400&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=52fb1942-c48b-4690-a03b-cf1b70fb8400&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=356d660e-8007-4789-aa4f-2d406d95a23b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=356d660e-8007-4789-aa4f-2d406d95a23b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=186b4e9c-e418-49e1-942f-0f18d3efb55f&bo=1&sid=55f24b309d9c11f092a2a7c07b110022&vid=55f2b1409d9c11f086f51b22b36f02dd&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Transfer%20NFTs%20Using%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&r=&lt=3913&evt=pageLoad&sv=2&cdb=AQAS&rn=529221)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29396eef-b287-4856-ae42-5ab09e8d6a0f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29396eef-b287-4856-ae42-5ab09e8d6a0f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=99c55597-b7c3-4bd5-a6d0-653d06df30f2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=99c55597-b7c3-4bd5-a6d0-653d06df30f2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ded746d-cfc4-447f-8aa5-3e43a0919e63&pt=Transfer%20NFTs%20Using%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fnfts%2Ftransfer-nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/nfts/transfer-nfts#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/nfts/transfer-nfts#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/nfts/transfer-nfts#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/nfts/transfer-nfts#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.35bb48c21fb327827ec135270d6ad7d3.1759195525309.1759195525309.1759195525309.1&__hssc=78174987.1.1759195525309&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/nfts/transfer-nfts.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.35bb48c21fb327827ec135270d6ad7d3.1759195525309.1759195525309.1759195525309.1&__hssc=78174987.1.1759195525309&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:25:54.755Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
