# Add Assets to an AMM
URL: https://xrpl.org/docs/tutorials/javascript/amm/add-assets-to-amm
Section: C4

## Overview


## Extracted Content
# Add Assets to an AMM

Follow the steps from the Create an AMM tutorial before proceeding.

This example shows how to:

1. Deposit assets to an existing AMM and receive LP tokens.
1. Vote on AMM trading fees.
1. Check the value of your LP tokens.
1. Redeem LP tokens for assets in the AMM pair.

You can download the Quickstart Samples archive to try each of the samples in your own browser.

Without the Quickstart Samples, you will not be able to try the examples that follow.


## Usage


### Get Accounts

1. Open 12.add-to-amm.html in a browser.
1. Select Testnet or Devnet
1. Get test accounts.If you have existing account seeds:Paste account seeds in the Seeds field.Click Get Accounts from Seeds.If you don't have account seeds:Click Get New Standby Account.Click Get New Operational Account.
1. If you have existing account seeds:Paste account seeds in the Seeds field.Click Get Accounts from Seeds.
1. Paste account seeds in the Seeds field.
1. Click Get Accounts from Seeds.
1. If you don't have account seeds:Click Get New Standby Account.Click Get New Operational Account.
1. Click Get New Standby Account.
1. Click Get New Operational Account.

`12.add-to-amm.html`

- If you have existing account seeds:Paste account seeds in the Seeds field.Click Get Accounts from Seeds.
- Paste account seeds in the Seeds field.
- Click Get Accounts from Seeds.
- If you don't have account seeds:Click Get New Standby Account.Click Get New Operational Account.
- Click Get New Standby Account.
- Click Get New Operational Account.

1. Paste account seeds in the Seeds field.
1. Click Get Accounts from Seeds.

1. Click Get New Standby Account.
1. Click Get New Operational Account.


### Get the AMM

Use the information from either the XRP/Token or Token/Token AMM you created in Create an AMM.

1. Enter a currency code in the Asset 1 Currency field. For example, XRP.
1. Enter a second currency code in the Asset 2 Currency field. For example, TST.
1. Enter the operational account address in the Asset 2 Issuer field.
1. Click Check AMM.

`XRP`

`TST`


### Deposit a Single Asset to the AMM

You can deposit either asset, but depositing only one asset reduces the amount of LP tokens you receive.

1. Click Get Balances to verify how many tokens you have.
1. Enter a value in the Asset 1 Amount field.
1. Click Add to AMM.


### Deposit Both Assets to the AMM

1. Click Get Balances to verify how many tokens you have.
1. Enter a value in the Asset 1 Amount field.
1. Enter a value in the Asset 2 Amount field.
1. Click Add to AMM.


### Vote on trading fees

1. Enter a value in the Trading Fee field. The proposed fee is in units of 1/100,000; a value of 1 is equivalent to 0.001%. The maximum value is 1000, indicating a 1% fee.
1. Click Vote on Fee.


### Redeem Your LP Tokens

1. Click Get LP Value.
1. Enter a value in the LP Tokens field.
1. Click Redeem LP.


## Code Walkthrough

You can open ripplex12-add-to-amm.js from the Quickstart Samples to view the source code.

`ripplex12-add-to-amm.js`


### Add Assets to an Existing AMM

This code checks if you're trying to add one or both assets, and then modifies the AMMDeposit transaction to be either a single or double-asset deposit.

`AMMDeposit`

```
async function addAssets() {
```

Connect to the XRP Ledger.

```
let net = getNet()

  const client = new xrpl.Client(net)
  results = `\n\nConnecting to ${getNet()} ...`
  standbyResultField.value = results

  await client.connect()
  results += '\n\nConnected.'
  standbyResultField.value = results
```

Get the AMM information fields.

```
const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)

  const asset1_currency = asset1CurrencyField.value
  const asset1_issuer = asset1IssuerField.value
  const asset1_amount = asset1AmountField.value

  const asset2_currency = asset2CurrencyField.value
  const asset2_issuer = asset2IssuerField.value
  const asset2_amount = asset2AmountField.value
```

Format the AMMDeposit transaction based on the combination of XRP and tokens.

`AMMDeposit`

`XRP`

```
// Check for all combinations of asset deposits.
  let ammdeposit = null

  if (asset1_currency == "XRP" && asset2_currency && asset1_amount && asset2_amount ) {
    
    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: "XRP"
      },
      "Asset2": {
        currency: asset2_currency,
        issuer: asset2_issuer
      },
      "Account": standby_wallet.address,
      "Amount": xrpl.xrpToDrops(asset1_amount),
      "Amount2": {
        currency: asset2_currency,
        issuer: asset2_issuer,
        value: asset2_amount
      },
      "Flags": 0x00100000
    }

  } else if ( asset1_currency && asset2_currency == "XRP" && asset1_amount && asset2_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: asset1_currency,
        issuer: asset1_issuer
      },
      "Asset2": {
        currency: "XRP"
      },
      "Account": standby_wallet.address,
      "Amount": {
        currency: asset1_currency,
        issuer: asset1_issuer,
        value: asset1_amount
      },
      "Amount2": xrpl.xrpToDrops(asset2_amount),
      "Flags": 0x00100000
    }

  } else if ( asset1_currency && asset2_currency && asset1_amount && asset2_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: asset1_currency,
        issuer: asset1_issuer
      },
      "Asset2": {
        currency: asset2_currency,
        issuer: asset2_issuer
      },
      "Account": standby_wallet.address,
      "Amount": {
        currency: asset1_currency,
        issuer: asset1_issuer,
        value: asset1_amount
      },
      "Amount2": {
        currency: asset2_currency,
        issuer: asset2_issuer,
        value: asset2_amount
      },
      "Flags": 0x00100000
    }

  } else if ( asset1_currency == "XRP" && asset2_currency && asset1_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: "XRP"
      },
      "Asset2": {
        currency: asset2_currency,
        issuer: asset2_issuer
      },
      "Account": standby_wallet.address,
      "Amount": xrpl.xrpToDrops(asset1_amount),
      "Flags": 0x00080000
    }

  } else if ( asset1_currency && asset2_currency == "XRP" && asset1_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: asset1_currency,
        issuer: asset1_issuer
      },
      "Asset2": {
        currency: "XRP"
      },
      "Account": standby_wallet.address,
      "Amount": {
        currency: asset1_currency,
        issuer: asset1_issuer,
        value: asset1_amount
      },
      "Flags": 0x00080000
    }

  } else if ( asset1_currency == "XRP" && asset2_currency && asset2_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: "XRP"
      },
      "Asset2": {
        currency: asset2_currency,
        issuer: asset2_issuer
      },
      "Account": standby_wallet.address,
      "Amount": {
        currency: asset2_currency,
        issuer: asset2_issuer,
        value: asset2_amount
      },
      "Flags": 0x00080000
    }

  } else if ( asset1_currency && asset2_currency && asset1_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: asset1_currency,
        issuer: asset1_issuer
      },
      "Asset2": {
        currency: asset2_currency,
        issuer: asset2_issuer
      },
      "Account": standby_wallet.address,
      "Amount": {
        currency: asset1_currency,
        issuer: asset1_issuer,
        value: asset1_amount
      },
      "Flags": 0x00080000
    }

  } else if ( asset1_currency && asset2_currency && asset2_amount ) {

    ammdeposit = {
      "TransactionType": "AMMDeposit",
      "Asset": {
        currency: asset1_currency,
        issuer: asset1_issuer
      },
      "Asset2": {
        currency: asset2_currency,
        issuer: asset2_issuer
      },
      "Account": standby_wallet.address,
      "Amount": {
        currency: asset2_currency,
        issuer: asset2_issuer,
        value: asset2_amount
      },
      "Flags": 0x00080000
    }

  } else {

    results += `\n\nNo assets selected to add ...`
    standbyResultField.value = results
    standbyResultField.scrollTop = standbyResultField.scrollHeight
    return

  }
```

Prepare the transaction for submission. Wrap the submission in a try-catch block to handle any errors.

`try-catch`

```
try {
 
  const prepared_deposit = await client.autofill(ammdeposit)
  results += `\n\nPrepared transaction:\n${JSON.stringify(prepared_deposit, null, 2)}`
  standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Sign the transaction using the standby account wallet.

```
const signed_deposit = standby_wallet.sign(prepared_deposit)
  results += `\n\nSending AMMDeposit transaction ...`
  standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Submit the signed transaction to the XRPL. Run the checkAMM() function to update the AMM's information in the AMM log on a successful transaction.

`checkAMM()`

```
const lp_deposit = await client.submitAndWait(signed_deposit.tx_blob)
  
  if (lp_deposit.result.meta.TransactionResult == "tesSUCCESS") {
    results += `\n\nTransaction succeeded.`
    checkAMM()
  } else {
    results += `\n\nError sending transaction: ${JSON.stringify(lp_deposit.result.meta.TransactionResult, null, 2)}`
  }

  } catch (error) {
    results += `\n\n${error.message}`
  }
```

Report the transaction results in the standby account log.

```
standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight

  client.disconnect()

}
```


### Vote on Trading Fees

Trading fees are applied to any transaction that interacts with the AMM. As with the addAssets() function, this one checks the combination of assets provided to modifty the ammVote transaction.

`addAssets()`

`ammVote`

```
async function voteFees() {
```

Connect to the XRP Ledger.

```
let net = getNet()

  const client = new xrpl.Client(net)
  results = `\n\nConnecting to ${getNet()} ...`
  standbyResultField.value = results

  await client.connect()
  results += '\n\nConnected.'
  standbyResultField.value = results
```

Get the AMM information and vote fee fields.

```
const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)
  const voteFee = standbyFeeField.value

  const asset1_currency = asset1CurrencyField.value
  const asset1_issuer = asset1IssuerField.value

  const asset2_currency = asset2CurrencyField.value
  const asset2_issuer = asset2IssuerField.value
```

Format the AMMVote transaction based on the combination of XRP and tokens.

`AMMVote`

`XRP`

```
let ammvote = null

  if ( asset1_currency == "XRP" ) {

    ammvote = {
      "TransactionType": "AMMVote",
      "Asset": {
        "currency": "XRP"
      },
      "Asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      },
      "Account": standby_wallet.address,
      "TradingFee": Number(voteFee)
    }

  } else if ( asset2_currency == "XRP" ) {

    ammvote = {
      "TransactionType": "AMMVote",
      "Asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "Asset2": {
        "currency": "XRP"
      },
      "Account": standby_wallet.address,
      "TradingFee": Number(voteFee)
    }
  } else {

    ammvote = {
      "TransactionType": "AMMVote",
      "Asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "Asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      },
      "Account": standby_wallet.address,
      "TradingFee": Number(voteFee)
    }

  }
```

Prepare the transaction for submission. Wrap the submission in a try-catch block to handle any errors.

`try-catch`

```
try {
  
  const prepared_vote = await client.autofill(ammvote)
  results += `\n\nPrepared transaction:\n${JSON.stringify(prepared_vote, null, 2)}`
  standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Sign the prepared transaction using the standby account wallet.

```
const signed_vote = standby_wallet.sign(prepared_vote)
  results += `\n\nSending AMMVote transaction ...`
  standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Submit the signed transaction to the XRPL. Run the checkAMM() function to update the AMM's information in the AMM log on a successful transaction.

`checkAMM()`

```
const response_vote = await client.submitAndWait(signed_vote.tx_blob)
  if (response_vote.result.meta.TransactionResult == "tesSUCCESS") {
    results += `\n\nTransaction succeeded.`
    checkAMM()
  } else {
    results += `\n\nError sending transaction: ${JSON.stringify(response_vote.result.meta.TransactionResult, null, 2)}`
  }

} catch (error) {
  results += `\n\n${error.message}`
}
```

Report the transaction results in the standby account log.

```
standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight  

  client.disconnect()

}
```


### Calculate the Value of Your LP Tokens

This function gets your LP token balance and calculates what you can withdraw from the AMM.

```
async function calculateLP() {
```

Connect to the XRP Ledger.

```
let net = getNet()

  const client = new xrpl.Client(net)
  results = `\n\nConnecting to ${getNet()} ...`
  standbyResultField.value = results

  await client.connect()
  results += '\n\nConnected.'
  standbyResultField.value = results
```

Get the AMM information fields.

```
const standby_wallet = standbyAccountField.value

  const asset1_currency = asset1CurrencyField.value
  const asset1_issuer = asset1IssuerField.value

  const asset2_currency = asset2CurrencyField.value
  const asset2_issuer = asset2IssuerField.value
```

Format the amm_info command based on the combination of XRP and tokens.

`amm_info`

`XRP`

```
let amm_info = null

  if ( asset1_currency == "XRP" ) {
  
    amm_info = {
      "command": "amm_info", 
      "asset": {
        "currency": "XRP"
      },
      "asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      }
    }
  
  } else if ( asset2_currency == "XRP" ) {

    amm_info = {
      "command": "amm_info", 
      "asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "asset2": {
        "currency": "XRP"
      }
    }

  } else {

    amm_info = {
      "command": "amm_info", 
      "asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      }
    }

  }
```

Get the standby account wallet balances and AMM details. Wrap the code in a try-catch block to handle any errors.

`try-catch`

```
try {
  
  // Get LP token balance.
  standbyWalletBalances = await client.getBalances(standby_wallet)

  const amm_info_result = await client.request(amm_info)
```

Get the AMM account address. Any LP tokens received from depositing to the AMM is considered an issued token by that AMM account. Use the AMM account to find the LP token in the wallet balances and get the LP token balance.

```
// Get the AMM account address that issues LP tokens to depositors
  ammAccount = amm_info_result.result.amm.account

  const lpCurrency = standbyWalletBalances.find(item => item.issuer === ammAccount);

  const lpBalance = lpCurrency ? lpCurrency.value : 'Currency not found';
```

Check the AMM value fields to format the response. XRP is only reported as drops and doesn't have a value field. Although there isn't a dedicated method to calculate what you can redeem your LP tokens for, the math to do so is simple. The code checks the percentage of LP tokens in circulation that you own, and then applies that same percentage to the total assets in the AMM to give you their redemption value.

`value`

`XRP`

`value`

```
const my_share = lpBalance / amm_info_result.result.amm.lp_token.value

  let my_asset1 = null
  let my_asset2 = null

  if ( amm_info_result.result.amm.amount.value && amm_info_result.result.amm.amount2.value ) {

    my_asset1 = amm_info_result.result.amm.amount.value * my_share
    my_asset2 = amm_info_result.result.amm.amount2.value * my_share

    results += `\n\nI have a total of ${lpBalance} LP tokens that are worth:\n
    ${amm_info_result.result.amm.amount.currency}: ${my_asset1}
    ${amm_info_result.result.amm.amount2.currency}: ${my_asset2}`

  } else if ( amm_info_result.result.amm.amount.value == undefined ) {

    my_asset1 = (amm_info_result.result.amm.amount * my_share) / 1000000
    my_asset2 = amm_info_result.result.amm.amount2.value * my_share

    results += `\n\nI have a total of ${lpBalance} LP tokens that are worth:\n
    XRP: ${my_asset1}
    ${amm_info_result.result.amm.amount2.currency}: ${my_asset2}`

  } else {

    my_asset1 = amm_info_result.result.amm.amount.value * my_share
    my_asset2 = (amm_info_result.result.amm.amount2 * my_share) / 1000000

    results += `\n\nI have a total of ${lpBalance} LP tokens that are worth:\n
    ${amm_info_result.result.amm.amount.currency}: ${my_asset1}
    XRP: ${my_asset2}`

  }

  } catch (error) {
    results += `\n\n${error.message}`
  }
```

Report the transaction results in the standby account log.

```
standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight

  client.disconnect()

}
```


### Redeem Your LP Tokens

The code to redeem the LP tokens checks how many tokens you want to redeem, as well as the combination of assets to format amm_info and AMMWithdraw.

`amm_info`

`AMMWithdraw`

```
async function redeemLP() {
```

Connect to the XRP Ledger.

```
let net = getNet()

  const client = new xrpl.Client(net)
  results = `\n\nConnecting to ${getNet()} ...`
  standbyResultField.value = results

  await client.connect()
  results += '\n\nConnected.'
  standbyResultField.value = results
```

Get the AMM information fields.

```
const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)

  const asset1_currency = asset1CurrencyField.value
  const asset1_issuer = asset1IssuerField.value

  const asset2_currency = asset2CurrencyField.value
  const asset2_issuer = asset2IssuerField.value
```

Format the amm_info command based on the combination of XRP and tokens.

`amm_info`

`XRP`

```
// Structure "amm_info" command based on asset combo.
  let amm_info = null

  if ( asset1_currency == "XRP" ) {
  
    amm_info = {
      "command": "amm_info", 
      "asset": {
        "currency": "XRP"
      },
      "asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      }
    }
  
  } else if ( asset2_currency == "XRP" ) {

    amm_info = {
      "command": "amm_info", 
      "asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "asset2": {
        "currency": "XRP"
      }
    }

  } else {

    amm_info = {
      "command": "amm_info", 
      "asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      }
    }

  }
```

Get the LP token information from the AMM.

```
// Get LP token info.

  let ammIssuer = null
  let ammCurrency = null
  const LPTokens = standbyLPField.value

  try {
  const amm_info_result = await client.request(amm_info)
  ammIssuer = amm_info_result.result.amm.lp_token.issuer
  ammCurrency = amm_info_result.result.amm.lp_token.currency
  } catch (error) {
    results += `\n\n${error.message}`
    standbyResultField.value = results
    standbyResultField.scrollTop = standbyResultField.scrollHeight
    return
  }
```

Format the AMMWithdraw transaction based on the combination of XRP and tokens. Add the LP token info into the transaction from the amm_info query.

`AMMWithdraw`

`XRP`

`amm_info`

```
// Structure ammwithdraw transaction based on asset combo.
  let ammwithdraw = null

  if ( asset1_currency == "XRP" ) {

    ammwithdraw = {
      "TransactionType": "AMMWithdraw",
      "Asset": {
        "currency": "XRP"
      },
      "Asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      },
      "Account": standby_wallet.address,
      "LPTokenIn": {
        currency: ammCurrency,
        issuer: ammIssuer,
        value: LPTokens
      },
      "Flags": 0x00010000
    }

  } else if ( asset2_currency == "XRP" ) {

    ammwithdraw = {
      "TransactionType": "AMMWithdraw",
      "Asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "Asset2": {
        "currency": "XRP"
      },
      "Account": standby_wallet.address,
      "LPTokenIn": {
        currency: ammCurrency,
        issuer: ammIssuer,
        value: LPTokens
      },
      "Flags": 0x00010000
    }

  } else {

    ammwithdraw = {
      "TransactionType": "AMMWithdraw",
      "Asset": {
        "currency": asset1_currency,
        "issuer": asset1_issuer
      },
      "Asset2": {
        "currency": asset2_currency,
        "issuer": asset2_issuer
      },
      "Account": standby_wallet.address,
      "LPTokenIn": {
        currency: ammCurrency,
        issuer: ammIssuer,
        value: LPTokens
      },
      "Flags": 0x00010000
    }

  }
```

Prepare the transaction for submission. Wrap the submission in a try-catch block to handle any errors.

`try-catch`

```
try {

  const prepared_withdraw = await client.autofill(ammwithdraw)
  results += `\n\nPrepared transaction:\n${JSON.stringify(prepared_withdraw, null, 2)}`
  standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Sign the prepared transaction with the standby account wallet.

```
const signed_withdraw = standby_wallet.sign(prepared_withdraw)
  results += `\n\nSending AMMWithdraw transaction ...`
  standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight
```

Submit the signed transaction to the XRPL. Update the AMM info log and get wallet balances on a successful transaction.

```
const response_withdraw = await client.submitAndWait(signed_withdraw.tx_blob)
  
  if (response_withdraw.result.meta.TransactionResult == "tesSUCCESS") {
    results += `\n\nTransaction succeeded.`
    checkAMM()
    getBalances()
  } else {
    results += `\n\nError sending transaction: ${JSON.stringify(response_withdraw.result.meta.TransactionResult, null, 2)}`
  }

  } catch (error) {
    results += `\n\n${error.message}`
  }
```

Report the transaction results to the standby account log.

```
standbyResultField.value = results
  standbyResultField.scrollTop = standbyResultField.scrollHeight

  client.disconnect()

}
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Add assets to AMM test harness](https://xrpl.org/assets/quickstart-add-to-amm1.09bf8e1883e59f0b7b63ff47a8c345273b62c0d245f372721e3438ce08c7be3a.ac57e6ef.png)

![Get account results](https://xrpl.org/assets/quickstart-add-to-amm2.76fbfdbefb9ad4619ebc348bd47ac91d16ad36f74c3269d2e6fa8442e6e84151.ac57e6ef.png)

![Get AMM results](https://xrpl.org/assets/quickstart-add-to-amm3.76dd88235ebf1c402f73dd315aee10ad917ef6a168af0514ff41545f8a4ab36a.ac57e6ef.png)

![Add assets to AMM results](https://xrpl.org/assets/quickstart-add-to-amm4.aebb81786d5c76c6d8991d110b4fe8788133951194527e2d292bfdcbe1d11373.ac57e6ef.png)

![Add assets to AMM results](https://xrpl.org/assets/quickstart-add-to-amm5.7aa9c448e3c59d399b08828eeca063b444ce426fe8f8cfc3d0a3523f6be370de.ac57e6ef.png)

![Vote on trading fees results](https://xrpl.org/assets/quickstart-add-to-amm6.42e63ebd23e740889abaa3fabd3d3c6cc2d4b003f72388e53a5c201059606f3a.ac57e6ef.png)

![Get LP token value results](https://xrpl.org/assets/quickstart-add-to-amm7.f91099f0205c96e482782f12fae37e238aa38f226482e3511eb6d3f04503411b.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6200b9e-8aaa-415f-ab85-7755340d55bb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6200b9e-8aaa-415f-ab85-7755340d55bb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=13e41044-021b-476c-ae1a-04811cf22826&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=13e41044-021b-476c-ae1a-04811cf22826&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=99536bc5-7dfe-4a71-b4bc-257f2875ece0&bo=1&sid=79d4c6009d9b11f088ae0b5eb57b82a8&vid=79d53ef09d9b11f0939ea9fe911e2bd4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Add%20Assets%20to%20an%20AMM&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&r=&lt=3433&evt=pageLoad&sv=2&cdb=AQAS&rn=314173)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=51705d4f-421d-4e69-99f1-b7f7384339eb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=51705d4f-421d-4e69-99f1-b7f7384339eb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5fccd0f-2772-44f1-9813-6d0eee679e31&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5fccd0f-2772-44f1-9813-6d0eee679e31&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e882697-910b-43e4-9b6d-c707aa08e87e&pt=Add%20Assets%20to%20an%20AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Famm%2Fadd-assets-to-amm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/amm/add-assets-to-amm#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/amm/add-assets-to-amm#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/amm/add-assets-to-amm#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/amm/add-assets-to-amm#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a09ece3914672e8c604b44c359c909aa.1759195155749.1759195155749.1759195155749.1&__hssc=78174987.1.1759195155749&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/amm/add-assets-to-amm.md)
- [Quickstart Samples](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/quickstart/js/)
- [Quickstart Samples](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/quickstart/js/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a09ece3914672e8c604b44c359c909aa.1759195155749.1759195155749.1759195155749.1&__hssc=78174987.1.1759195155749&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:19:42.032Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
