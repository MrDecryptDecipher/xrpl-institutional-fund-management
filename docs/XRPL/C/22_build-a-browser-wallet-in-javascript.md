# Build a Browser Wallet in JavaScript
URL: https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript
Section: C22

## Overview


## Extracted Content
# Build a Browser Wallet in JavaScript

This tutorial demonstrates how to build a browser wallet for the XRP Ledger using the Javascript programming language and various libraries. This application can be used as a starting point for building a more complete and powerful application, as a reference point for building comparable apps, or as a learning experience to better understand how to integrate XRP Ledger functionality into a larger project.


## Prerequisites

To complete this tutorial, you should meet the following guidelines:

1. You have Node.js v14 or higher installed.
1. You have Yarn (v1.17.3 or higher) installed.
1. You are somewhat familiar with coding with JavaScript and have completed the Get Started Using JavaScript tutorial.


## Source Code

You can find the complete source code for all of this tutorial's examples in the code samples section of this website's repository.


## Goals

At the end of this tutorial, you should be able to build a simple XRP wallet displayed below.

This application can:

- Show updates to the XRP Ledger in real-time.
- View any XRP Ledger account's activity, including showing how much XRP was delivered by each transaction.
- Show how much XRP is set aside for the account's reserve requirement.
- Send direct XRP payments, and provide feedback about the intended destination address, including:Displaying your account's available balanceVerifying that the destination address is validValidating the account has enough XRP to sendAllowing you to specify a destination tag
- Displaying your account's available balance
- Verifying that the destination address is valid
- Validating the account has enough XRP to send
- Allowing you to specify a destination tag

- Displaying your account's available balance
- Verifying that the destination address is valid
- Validating the account has enough XRP to send
- Allowing you to specify a destination tag


## Steps

Before you begin, make sure you have the prerequisites installed. Check your node version by running node -v. If necessary, download Node.js.

`node -v`

TipIf you get stuck while doing this tutorial, or working on another project, feel free to ask for help in the XRPL's Developer Discord.


### 1. Set up the project

1. Navigate to the directory that you want to create the project in.
1. Create a new Vite project:

```
yarn create vite simple-xrpl-wallet --template vanilla
```

1. Create or modify the file package.json to have the following contents:

`package.json`

```
{
    "name": "simple-xrpl-wallet",
    "type": "module",
    "scripts": {
        "dev": "vite"
    },
    "devDependencies": {
        "crypto-browserify": "^3.12.0",
        "events": "^3.3.0",
        "https-browserify": "^1.0.0",
        "stream-browserify": "^3.0.0",
        "stream-http": "^3.2.0",
        "vite": "^4.5.14"
    },
    "dependencies": {
        "dotenv": "^16.0.3",
        "xrpl": "^4.0.0"
    }
}
```

- Alternatively you can also do yarn add <package-name> for each individual package to add them to your package.json file.

`yarn add <package-name>`

`package.json`

1. Install dependencies:

```
yarn
```

1. Create a new file .env in the root directory of the project and add the following variables:

`.env`

```
CLIENT="wss://s.altnet.rippletest.net:51233/"
EXPLORER_NETWORK="testnet"
SEED="s████████████████████████████"
```

1. Change the seed to your own seed. You can get credentials from the Testnet faucet.
1. Set up a Vite bundler. Create a file named vite.config.js in the root directory of the project and fill it with the following code:

Change the seed to your own seed. You can get credentials from the Testnet faucet.

Set up a Vite bundler. Create a file named vite.config.js in the root directory of the project and fill it with the following code:

`vite.config.js`

```
import { defineConfig, loadEnv } from 'vite';

const viteConfig = ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, '', '') };
    return defineConfig({
        define: {
            'process.env': process.env,
        },
        resolve: {
            alias: {
                ws: 'xrpl/dist/npm/client/WSWrapper',
            },
        },
    });
};

export default viteConfig;
```

1. Add script to package.json

`package.json`

In your package.json file, add the following section if it's not there already:

`package.json`

```
"scripts": {
    "dev": "vite"
}
```


### 2. Create the Home Page (Displaying Account & Ledger Details)

In this step, we create a home page that displays account and ledger details.

1. If not already present, create new files in the root folder named index.html, index.js and index.css.
1. Make a new folder named src in the root directory of the project.
1. Copy the contents of index.html in your code.
1. Add styling to your index.css file by following the link.

If not already present, create new files in the root folder named index.html, index.js and index.css.

`index.html`

`index.js`

`index.css`

Make a new folder named src in the root directory of the project.

`src`

Copy the contents of index.html in your code.

Add styling to your index.css file by following the link.

This basic setup creates a homepage and applies some visual styles. The goal is for the homepage to:

- Display our account info
- Show what's happening on the ledger
- And add a little logo for fun

To make that happen, we need to connect to the XRP Ledger and look up the account and the latest validated ledger.

1. In the src/ directory, make a new folder named helpers. Create a new file there named get-wallet-details.js and define a function named getWalletDetails there. This function uses the account_info method to fetch account details and the server_info method to calculate the current reserves. The code to do all this is as follows:

`src/`

`helpers`

`get-wallet-details.js`

`getWalletDetails`

```
import { Wallet, classicAddressToXAddress } from 'xrpl';

export default async function getWalletDetails({ client }) {
    const wallet = Wallet.fromSeed(process.env.SEED);

    // Get the wallet details
    const {
        result: { account_data },
    } = await client.request({
        command: 'account_info',
        account: wallet.address,
        ledger_index: 'validated',
    });

    const ownerCount = account_data.OwnerCount || 0;

    // Get the reserve base and increment
    const {
        result: {
            info: {
                validated_ledger: { reserve_base_xrp, reserve_inc_xrp },
            },
        },
    } = await client.request({
        command: 'server_info',
    });

    // Calculate the total reserve amount
    const accountReserve = ownerCount * reserve_inc_xrp + reserve_base_xrp;

    console.log('Got wallet details!');

    return { 
        account_data, 
        accountReserve, 
        xAddress: classicAddressToXAddress(wallet.address, false, false),
        address: wallet.address 
    };
}
```

1. Now, let's add the code to index.js file to fetch the account and ledger details and display them on the home page. Copy the code written below to the index.js file. Here we render the wallet details using the function we defined in get-wallet-details.js. In order to make sure we have up to date ledger data, we are using the ledger stream to listen for ledger close events.

`index.js`

`index.js`

`get-wallet-details.js`

```
import { Client, dropsToXrp, rippleTimeToISOTime } from 'xrpl';

import addXrplLogo from './src/helpers/render-xrpl-logo';
import getWalletDetails from './src/helpers/get-wallet-details.js';

// Optional: Render the XRPL logo
addXrplLogo();

const client = new Client(process.env.CLIENT); // Get the client from the environment variables

// Get the elements from the DOM
const sendXrpButton = document.querySelector('#send_xrp_button');
const txHistoryButton = document.querySelector('#transaction_history_button');
const walletElement = document.querySelector('#wallet');
const walletLoadingDiv = document.querySelector('#loading_wallet_details');
const ledgerLoadingDiv = document.querySelector('#loading_ledger_details');

// Add event listeners to the buttons
sendXrpButton.addEventListener('click', () => {
    window.location.pathname = '/src/send-xrp/send-xrp.html';
});

txHistoryButton.addEventListener('click', () => {
    window.location.pathname = '/src/transaction-history/transaction-history.html';
});

// Self-invoking function to connect to the client
(async () => {
    try {
        await client.connect(); // Connect to the client

        // Subscribe to the ledger stream
        await client.request({
            command: 'subscribe',
            streams: ['ledger'],
        });

        // Fetch the wallet details
        let wallet_details
        try {
            wallet_details = await getWalletDetails({ client })
        } catch(error) {
            alert(`Error loading wallet: ${error}.\n\nMake sure you set the SEED in your .env file.`)
            return
        }
        const { account_data, accountReserve, xAddress, address } = wallet_details;
        walletElement.querySelector('.wallet_address').textContent = `Wallet Address: ${account_data.Account}`;
        walletElement.querySelector('.wallet_balance').textContent = `Wallet Balance: ${dropsToXrp(account_data.Balance)} XRP`;
        walletElement.querySelector('.wallet_reserve').textContent = `Wallet Reserve: ${accountReserve} XRP`;
        walletElement.querySelector('.wallet_xaddress').textContent = `X-Address: ${xAddress}`;

        // Redirect on View More link click
        walletElement.querySelector('#view_more_button').addEventListener('click', () => {
            window.open(`https://${process.env.EXPLORER_NETWORK}.xrpl.org/accounts/${address}`, '_blank');
        });
        
        walletLoadingDiv.style.display = 'none';


        // Fetch the latest ledger details
        client.on('ledgerClosed', (ledger) => {
            ledgerLoadingDiv.style.display = 'none';
            const ledgerIndex = document.querySelector('#ledger_index');
            const ledgerHash = document.querySelector('#ledger_hash');
            const closeTime = document.querySelector('#close_time');
            ledgerIndex.textContent = `Ledger Index: ${ledger.ledger_index}`;
            ledgerHash.textContent = `Ledger Hash: ${ledger.ledger_hash}`;
            closeTime.textContent = `Close Time: ${rippleTimeToISOTime(ledger.ledger_time)}`;
        });
        
    } catch (error) {
        await client.disconnect();
        console.log(error);
    }
})();
```

1. In the helpers folder, add render-xrpl-logo.js to handle displaying a logo.
1. Finally create a new folder named assets in the src/ directory and add the file xrpl.svg there.

In the helpers folder, add render-xrpl-logo.js to handle displaying a logo.

`helpers`

Finally create a new folder named assets in the src/ directory and add the file xrpl.svg there.

`assets`

`src/`

`xrpl.svg`

These files are used to render the XRPL logo for aesthetic purposes.

The one other thing we do here is add events to two buttons - one to send XRP and one to view transaction history. They won't work just yet — we'll implement them in the next steps.

Now the application is ready to run. You can start it in dev mode using the following command:

```
yarn dev
```

Your terminal should output a URL which you can use to open your app in a browser. This dev site automatically updates to reflect any changes you make to the code.


### 3. Create the Send XRP Page

Now that we've created the home page, we can move on to the "Send XRP" page. This is what allows this wallet to manage your account's funds.

1. Create a folder named send-xrp in the src directory.
1. Inside the send-xrp folder, create two files named send-xrp.js and send-xrp.html.
1. Copy the contents of the send-xrp.html file to your send-xrp.html file. The provided HTML code includes three input fields for the destination address, amount, and destination tag, each with their corresponding labels.
1. Now that we have the HTML code, let's add the JavaScript code. In the helpers folder, create a new file named submit-transaction.js and copy the code written below to the file. In this file, we are using the submit method to submit the transaction to the XRPL. Before submitting every transaction needs to be signed by a wallet, learn more about signing a transaction.

Create a folder named send-xrp in the src directory.

`send-xrp`

`src`

Inside the send-xrp folder, create two files named send-xrp.js and send-xrp.html.

`send-xrp`

`send-xrp.js`

`send-xrp.html`

Copy the contents of the send-xrp.html file to your send-xrp.html file. The provided HTML code includes three input fields for the destination address, amount, and destination tag, each with their corresponding labels.

`send-xrp.html`

Now that we have the HTML code, let's add the JavaScript code. In the helpers folder, create a new file named submit-transaction.js and copy the code written below to the file. In this file, we are using the submit method to submit the transaction to the XRPL. Before submitting every transaction needs to be signed by a wallet, learn more about signing a transaction.

`helpers`

`submit-transaction.js`

```
import { Wallet } from 'xrpl';

export default async function submitTransaction({ client, tx }) {
    try {
        // Create a wallet using the seed
        const wallet = Wallet.fromSeed(process.env.SEED);
        tx.Account = wallet.address;

        // Sign and submit the transaction
        const response = await client.submit(tx, { wallet });
        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}
```

1. Now back to the send-xrp.js file, copy the code written below to the file. In this piece of code we are first getting all the DOM elements from HTML and adding event listners to update & validate the fields based on the user input. Using renderAvailableBalance method we display the current available balance of the wallet. validateAddress function validates the user address, and the amount is validated using a regular expression. When all the fields are filled with correct inputs, we call the submitTransaction function to submit the transaction to the ledger.

`send-xrp.js`

`renderAvailableBalance`

`validateAddress`

`submitTransaction`

```
import { Client, Wallet, dropsToXrp, isValidClassicAddress, xrpToDrops } from 'xrpl';

import getWalletDetails from '../helpers/get-wallet-details';
import renderXrplLogo from '../helpers/render-xrpl-logo';
import submitTransaction from '../helpers/submit-transaction';

// Optional: Render the XRPL logo
renderXrplLogo();

 // Get the client from the environment variables
const client = new Client(process.env.CLIENT);

// Self-invoking function to connect to the client
(async () => {
    try {
        await client.connect();
        
        const wallet = Wallet.fromSeed(process.env.SEED);

        // Subscribe to account transaction stream
        await client.request({
            command: 'subscribe',
            accounts: [wallet.address],
        });

        // Fetch the wallet details and show the available balance
        await getWalletDetails({ client }).then((
            { accountReserve, account_data }) => {
                const bal = dropsToXrp(account_data.Balance) - accountReserve;
                availableBalanceElement.textContent = `Available Balance: ${bal} XRP`;
        });

    } catch (error) {
        await client.disconnect();
        console.log(error);
    }
})();

// Get the elements from the DOM
const homeButton = document.querySelector('#home_button');
const txHistoryButton = document.querySelector('#transaction_history_button');
const destinationAddress = document.querySelector('#destination_address');
const amount = document.querySelector('#amount');
const destinationTag = document.querySelector('#destination_tag');
const submitTxBtn = document.querySelector('#submit_tx_button');
const availableBalanceElement = document.querySelector('#available_balance');

// Disable the submit button by default
submitTxBtn.disabled = true;
let isValidDestinationAddress = false;
const allInputs = document.querySelectorAll('#destination_address, #amount');

// Add event listener to the redirect buttons
homeButton.addEventListener('click', () => {
    window.location.pathname = '/index.html';
});

txHistoryButton.addEventListener('click', () => {
    window.location.pathname = '/src/transaction-history/transaction-history.html';
});

// Update the account balance on successful transaction
client.on('transaction', (response) => {
    if (response.validated && response.tx_json.TransactionType === 'Payment') {
        getWalletDetails({ client }).then(({ accountReserve, account_data }) => {
            const bal = dropsToXrp(account_data.Balance) - accountReserve;
            availableBalanceElement.textContent = `Available Balance: ${bal} XRP`;
        });
    }
});

const validateAddress = () => {
    destinationAddress.value = destinationAddress.value.trim();
    // Check if the address is valid
    if (isValidClassicAddress(destinationAddress.value)) {
        // Remove the invalid class if the address is valid
        destinationAddress.classList.remove('invalid');
        isValidDestinationAddress = true;
    } else {
        // Add the invalid class if the address is invalid
        isValidDestinationAddress = false;
        destinationAddress.classList.add('invalid');
    }
};

// Add event listener to the destination address
destinationAddress.addEventListener('input', validateAddress);

// Add event listener to the amount input
amount.addEventListener('keydown', (event) => {
    const codes = [8, 190];
    const regex = /^[0-9\b.]+$/;

    // Allow: backspace, delete, tab, escape, enter and .
    if (!(regex.test(event.key) || codes.includes(event.keyCode))) {
        event.preventDefault();
        return false;
    }

    return true;
});

// NOTE: Keep this code at the bottom of the other input event listeners
// All the inputs should have a value to enable the submit button
for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('input', () => {
        let values = [];
        allInputs.forEach((v) => values.push(v.value));
        submitTxBtn.disabled = !isValidDestinationAddress || values.includes('');
    });
}

// Add event listener to the submit button
submitTxBtn.addEventListener('click', async () => {
    try {
        console.log('Submitting transaction');
        submitTxBtn.disabled = true;
        submitTxBtn.textContent = 'Submitting...';

        // Create the transaction object
        const txJson = {
            TransactionType: 'Payment',
            Amount: xrpToDrops(amount.value),
            Destination: destinationAddress.value,
        };

        // Get the destination tag if it exists
        if (destinationTag?.value !== '') {
            txJson.DestinationTag = parseInt(destinationTag.value);
        }
        console.log("Sending...", txJson);

        // Submit the transaction to the ledger
        const { result } = await submitTransaction({ client, tx: txJson });
        const txResult = result?.meta?.TransactionResult || result?.engine_result || '';

        // Check if the transaction was successful or not 
        // and show the appropriate message to the user
        if (txResult === 'tesSUCCESS') {
            alert('Transaction submitted successfully!');
        } else {
            throw new Error(txResult);
        }
    } catch (error) {
        alert('Error submitting transaction, Please try again.');
        console.error(error);
        submitTxBtn.disabled = false;
    } finally {
        // Re-enable the submit button after the transaction is submitted 
        // so the user can submit another transaction
        submitTxBtn.disabled = false;
        submitTxBtn.textContent = 'Submit Transaction';
    }
});
```

You can now click 'Send XRP' to try creating your own transaction! You can use this example to send XRP to the testnet faucet to try it out.

Testnet faucet account: rHbZCHJSGLWVMt8D6AsidnbuULHffBFvEN

`rHbZCHJSGLWVMt8D6AsidnbuULHffBFvEN`

Amount: 9

Destination Tag: (Not usually necessary unless you're paying an account tied to an exchange)


### 4. Create the Transactions Page

Now that we have created the home page and the send XRP page, let's create the transactions page that will display the transaction history of the account. In order to see what's happening on the ledger, we're going to display the following fields:

- Account: The account that sent the transaction.
- Destination: The account that received the transaction.
- Transaction Type: The type of transaction.
- Result: The result of the transaction.
- Delivered amount: The amount of XRP or tokens delivered by the transaction, if applicable.
- Link: A link to the transaction on the XRP Ledger Explorer.

CautionWhen displaying how much money a transaction delivered, always use the delivered_amount field from the metadata, not the Amount field from the transaction instructions. Partial Payments can deliver much less than the stated Amount and still be successful.

`delivered_amount`

`Amount`

`Amount`

1. Create a folder named transaction-history in the src directory.
1. Create a file named transaction-history.js and copy the code written below.

`transaction-history`

`transaction-history.js`

```
import { Client, Wallet, convertHexToString, dropsToXrp } from 'xrpl';

import renderXrplLogo from '../helpers/render-xrpl-logo';

// Optional: Render the XRPL logo
renderXrplLogo();

// Declare the variables
let marker = null;

// Get the elements from the DOM
const txHistoryElement = document.querySelector('#tx_history_data');
const sendXrpButton = document.querySelector('#send_xrp_button');
const homeButton = document.querySelector('#home_button');
const loadMore = document.querySelector('#load_more_button');

// Add event listeners to the buttons
sendXrpButton.addEventListener('click', () => {
    window.location.pathname = '/src/send-xrp/send-xrp.html';
});

homeButton.addEventListener('click', () => {
    window.location.pathname = '/index.html';
});

// Add the header to the table
const header = document.createElement('tr');
header.innerHTML = `
    <th>Account</th>
    <th>Destination</th>
    <th>Fee (XRP)</th>
    <th>Amount Delivered</th>
    <th>Transaction Type</th>
    <th>Result</th>
    <th>Link</th>
`;
txHistoryElement.appendChild(header);

// Converts the hex value to a string
function getTokenName(currencyCode) {
    if (!currencyCode) return "";
    if (currencyCode.length === 3 && currencyCode.trim().toLowerCase() !== 'xrp') {
        // "Standard" currency code
        return currencyCode.trim();
    }
    if (currencyCode.match(/^[a-fA-F0-9]{40}$/)) {
        // Hexadecimal currency code
        const text_code = convertHexToString(value).replaceAll('\u0000', '')
        if (text_code.match(/[a-zA-Z0-9]{3,}/) && text_code.trim().toLowerCase() !== 'xrp') {
            // ASCII or UTF-8 encoded alphanumeric code, 3+ characters long
            return text_code;
        }
        // Other hex format, return as-is.
        // For parsing other rare formats, see https://github.com/XRPLF/xrpl-dev-portal/blob/master/content/_code-samples/normalize-currency-codes/js/normalize-currency-code.js
        return currencyCode;
    }
    return "";
}

function renderAmount(delivered) {
    if (delivered === 'unavailable') {
        // special case for pre-2014 partial payments
        return 'unavailable';
    } else if (typeof delivered === 'string') {
        // It's an XRP amount in drops. Convert to decimal.
        return `${dropsToXrp(delivered)} XRP`;
    } else if (typeof delivered === 'object') {
        // It's a token amount.
        return `${delivered.value} ${getTokenName(delivered.currency)}.${delivered.issuer}`;
    } else {
        // Could be undefined -- not all transactions deliver value
        return "-"
    }
}

// Fetches the transaction history from the ledger
async function fetchTxHistory() {
    try {
        loadMore.textContent = 'Loading...';
        loadMore.disabled = true;
        const wallet = Wallet.fromSeed(process.env.SEED);
        const client = new Client(process.env.CLIENT);

        // Wait for the client to connect
        await client.connect();

        // Get the transaction history
        const payload = {
            command: 'account_tx',
            account: wallet.address,
            limit: 10,
        };

        if (marker) {
            payload.marker = marker;
        }

        // Wait for the response: use the client.request() method to send the payload
        const { result } = await client.request(payload);

        const { transactions, marker: nextMarker } = result;

        // Add the transactions to the table
        const values = transactions.map((transaction) => {
            const { hash, meta, tx_json } = transaction;
            return {
                Account: tx_json.Account,
                Destination: tx_json.Destination,
                Fee: tx_json.Fee,
                Hash: hash,
                TransactionType: tx_json.TransactionType,
                result: meta?.TransactionResult,
                delivered: meta?.delivered_amount
            };
        });

        // If there are no more transactions, hide the load more button
        loadMore.style.display = nextMarker ? 'block' : 'none';

        // If there are no transactions, show a message
        // Create a new row: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        // Add the row to the table: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

        if (values.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6">No transactions found</td>`;
            txHistoryElement.appendChild(row);
        } else {
            // Otherwise, show the transactions by iterating over each transaction and adding it to the table
            values.forEach((value) => {
                const row = document.createElement('tr');
                // Add the transaction details to the row
                row.innerHTML = `
                ${value.Account ? `<td>${value.Account}</td>` : '-'}
                ${value.Destination ? `<td>${value.Destination}</td>` : '-'}
                ${value.Fee ? `<td>${dropsToXrp(value.Fee)}</td>` : '-'}
                ${renderAmount(value.delivered)}
                ${value.TransactionType ? `<td>${value.TransactionType}</td>` : '-'}
                ${value.result ? `<td>${value.result}</td>` : '-'}
                ${value.Hash ? `<td><a href="https://${process.env.EXPLORER_NETWORK}.xrpl.org/transactions/${value.Hash}" target="_blank">View</a></td>` : '-'}`;
                // Add the row to the table
                txHistoryElement.appendChild(row);
            });
        }

        // Disconnect
        await client.disconnect();

        // Enable the load more button only if there are more transactions
        loadMore.textContent = 'Load More';
        loadMore.disabled = false;

        // Return the marker
        return nextMarker ?? null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Render the transaction history
async function renderTxHistory() {
    // Fetch the transaction history
    marker = await fetchTxHistory();
    loadMore.addEventListener('click', async () => {
        const nextMarker = await fetchTxHistory();
        marker = nextMarker;
    });
}

// Call the renderTxHistory() function
renderTxHistory();
```

This code uses account_tx to fetch transactions we've sent to and from this account. In order to get all the results, we're using the marker parameter to paginate through the incomplete list of transactions until we reach the end.

`marker`

1. Create a file named transaction-history.html and copy the code from transaction-history.html into it.

`transaction-history.html`

transaction-history.html defines a table which displays the fields mentioned above.

`transaction-history.html`

You can use this code as a starting point for displaying your account's transaction history. If you want an additional challenge, try expanding it to support different transaction types (e.g. TrustSet). If you want inspiration for how to handle this, you can check out the XRP Ledger Explorer to see how the transaction details are displayed.


## Next Steps

Now that you have a functional wallet, you can take it in several new directions. The following are a few ideas:

- You could support more of the XRP Ledger's transaction types including tokens and cross-currency payments
- You could add support for displaying multiple tokens, beyond just XRP
- You could support creating offers in the decentralized exchange
- You could add new ways to request payments, such as with QR codes or URIs that open in your wallet.
- You could support better account security including allowing users to set regular key pairs or handle multi-signing.
- Or you could take your code to production by following the Building for Production with Vite guide.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Home Page Screenshot](https://xrpl.org/assets/js-wallet-home.847b2c3903bdd8773ede7181bc94d38849ac1d66933cb7977ce9f640a74d4a45.ac57e6ef.png)

![Home Page Screenshot](https://xrpl.org/assets/js-wallet-home.847b2c3903bdd8773ede7181bc94d38849ac1d66933cb7977ce9f640a74d4a45.ac57e6ef.png)

![Send XRP Page Screenshot](https://xrpl.org/assets/js-wallet-send-xrp.fc80859f85592df7c7e2e1bd33e3f4183c19609d54c34976ce9cffe6cc84c1b8.ac57e6ef.png)

![Send XRP Transaction Screenshot](https://xrpl.org/assets/js-wallet-send-xrp-transaction-details.204bb35505c4998252e04f514c085a1983cde2fd7fd81f6976d1c3180f277528.ac57e6ef.png)

![Transactions Page Screenshot](https://xrpl.org/assets/js-wallet-transaction.d861c3de9806e4c83943ff7bc97888b1399488681c0ec00c28b31f0f9a619554.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f5acd62c-b38e-42f7-9cb8-a633db9789f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f5acd62c-b38e-42f7-9cb8-a633db9789f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cc75d9c4-6d1d-45ce-b171-7eb1be10384f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cc75d9c4-6d1d-45ce-b171-7eb1be10384f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=8a754145-bcf6-4f62-99a3-62fd2c9a7192&bo=1&sid=bc69f1e09d9c11f09bb57d181fa580fe&vid=bc6a74509d9c11f0a302d79993110b67&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Build%20a%20Browser%20Wallet%20in%20JavaScript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&r=&lt=3832&evt=pageLoad&sv=2&cdb=AQAS&rn=531098)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=953b013f-837a-4ec6-99f8-8cba5d0a0702&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=953b013f-837a-4ec6-99f8-8cba5d0a0702&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8b9dda7b-e59e-4a4b-89e0-bbc12f72dceb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8b9dda7b-e59e-4a4b-89e0-bbc12f72dceb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d7e81b00-ce60-4349-bc40-5c4d1a35d186&pt=Build%20a%20Browser%20Wallet%20in%20JavaScript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fbuild-a-browser-wallet-in-javascript&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript.md)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [code samples section of this website's repository](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/build-a-browser-wallet/js/)
- [download Node.js](https://nodejs.org/en/download/)
- [Developer Discord](https://discord.com/invite/KTNmhJDXqa)
- [index.html](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/build-a-browser-wallet/js/index.html)
- [index.css](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/build-a-browser-wallet/js/index.css)
- [render-xrpl-logo.js](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/build-a-browser-wallet/js/src/helpers/render-xrpl-logo.js)
- [xrpl.svg](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/build-a-browser-wallet/js/src/assets/xrpl.svg)
- [send-xrp.html](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/build-a-browser-wallet/js/src/send-xrp/send-xrp.html)
- [transaction-history.html](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/build-a-browser-wallet/js/src/transaction-history/transaction-history.html)
- [Building for Production with Vite](https://vitejs.dev/guide/build.html#public-base-path)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:28:39.111Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
