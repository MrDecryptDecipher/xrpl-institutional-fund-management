# Build a Credential Issuing Service
URL: https://xrpl.org/docs/tutorials/javascript/build-apps/credential-issuing-service
Section: C24

## Overview


## Extracted Content
# Build a Credential Issuing Service

(Requires the Credentials amendment. )

This tutorial demonstrates how to build and use a microservice that issues Credentials on the XRP Ledger, in the form of a RESTlike API, using the Express framework for Node.js.


## Prerequisites

To complete this tutorial, you should meet the following guidelines:

- You have Node.js v18 or higher installed.
- You are somewhat familiar with modern JavaScript programming and have completed the Get Started Using JavaScript tutorial.
- You have some understanding of the XRP Ledger, its capabilities, and of cryptocurrency in general. Ideally you have completed the Basic XRPL guide.


## Setup

First, download the complete sample code for this tutorial from GitHub:

- Credential Issuing Service sample code

Then, in the appropriate directory, install the dependencies:

```
npm install
```

This should install appropriate versions of Express, xrpl.js and a few other dependencies. You can view all dependencies in the package.json file.

`package.json`

To use the API that this microservice provides, you also need an HTTP client such as Postman, RESTED, or cURL.


## Overview

The Credential Issuer microservice, mostly implemented in issuer_service.js, provides a RESTlike API with the following methods:

`issuer_service.js`

| Method | Description |
| --- | --- |
| POST /credential | Request that the issuer issue a specific credential to a specific account. |
| GET /admin/credential | List all credentials issued by the issuer's address, optionally filtering only for credentials that have or have not been accepted by their subject. |
| DELETE /admin/credential | Delete a specific credential from the XRP Ledger, which revokes it. |


`POST /credential`

`GET /admin/credential`

`DELETE /admin/credential`

NoteSome of the methods have /admin in the path because they are intended to be used by the microservice's administrator. However, the sample code does not implement any authentication.

`/admin`

The sample code also contains a simple commmandline interface for a user account to accept a credential issued to it, as accept_credential.js.

`accept_credential.js`

The other files contain helper code that is used by one or both tools.


## Usage


### 1. Get Accounts

To use the credential issuing service, you need two accounts on the Devnet, where the Credentials amendment is already enabled. Go to the XRP Faucets page and select Devnet. Then, click the button to Generate credentials, saving the key pair (address and secret), twice. You will use one of these accounts as a credential issuer and the other account as the credential subject (holder), so make a note of which is which.


### 2. Start Issuer Service

To start the issuer microservice, run the following command from the directory with the sample code:

```
node issuer_service.js
```

It should prompt you for your issuer account seed. Input the secret key you saved previously and press Enter.

The output should look like the following:

```
✔ Issuer account seed:
✅ Starting credential issuer with XRPL address rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
🔐 Credential issuer service running on port: 3005
```

Double-check that the XRPL address displayed matches the address of the credential issuer keys you saved earlier.


### 3. Request Credential

To request a credential, make a request such as the following:

- Summary
- cURL

- HTTP method: POST
- URL: http://localhost:3005/credential
- Headers:Content-Type: application/json
- Content-Type: application/json
- Request Body:{
    "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
    "credential": "TestCredential",
    "documents": {
        "reason": "please"
    }
}

`POST`

`http://localhost:3005/credential`

- Content-Type: application/json

`Content-Type: application/json`

```
{
    "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
    "credential": "TestCredential",
    "documents": {
        "reason": "please"
    }
}
```

The parameters of the JSON request body should be as follows:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| subject | String - Address | Yes | The XRPL classic address of the subject of the credential. Set this to the address that you generated at the start of this tutorial for the credential holder account. |
| credential | String | Yes | The type of credential to issue. The example microservice accepts any string consisting of alphanumeric characters as well as the special characters underscore (_), dash (-), and period (.), with a minimum length of 1 and a maximum length of 64 characters. |
| documents | Object | Yes | As a credential issuer, you typically need to verify some confidential information about someone before you issue them a credential. As a placeholder, the sample code checks for a nested field named reason that contains the string please. |
| expiration | String - ISO8601 Datetime | No | The time after which the credential expires, such as 2025-12-31T00:00:00Z. |
| uri | String | No | Optional URI data to store with the credential. This data will become public on the XRP Ledger. If provided, this must be a string with minimum length 1 and max length 256, consisting of only characters that are valid in URIs, which are numbers, letters, and the following special characters: -._~:/?#[]@!$&'()*+,;=%. Conventionally, it should link to a Verifiable Credential document as defined by the W3C. |


`subject`

`credential`

`_`

`-`

`.`

`documents`

`reason`

`please`

`expiration`

`2025-12-31T00:00:00Z`

`uri`

`-._~:/?#[]@!$&'()*+,;=%`

This microservice immediately issues any credential that the user requests. A successful response from the API uses the HTTP status code 201 Created and has a response body with the result of submitting the transaction to the XRP Ledger. You can use the hash value from the response to look up the transaction using an explorer such as https://devnet.xrpl.org/.

`201 Created`

`hash`

Differences from ProductionFor a real credential issuer, you would probably check the credential type and only issue specific types of credentials, or maybe even just one type.  If checking the user's documents requires human intervention or takes longer than the amount of time an API request should wait to respond, you would need to store credential requests to some kind of storage, like a SQL database. You might also want to add a separate method for admins (or automated processes) to reject or issue the credential after checking the documents.


### 4. List Credentials

To show a list of credentials issued by the issuing account, make the following request:

- Summary
- cURL

- HTTP method: GET
- URL: http://localhost:3005/admin/credential
- Query parameters (optional): Use ?accepted=yes to filter results to only credentials that the subject has accepted, or ?accepted=no for credentials the user has not accepted.

`GET`

`http://localhost:3005/admin/credential`

`?accepted=yes`

`?accepted=no`

A response could look like the following:

```
{
 "credentials": [
    {
      "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
      "credential": "TstCredential",
      "accepted": true
    }
  ]
}
```

In the response, each entry in the credentials array represents a Credential issued by the issuer account and stored in the blockchain. The details should match the request from the previous step, except that the documents are omitted because they are not saved on the blockchain.

`credentials`

`documents`


### 5. Accept Credential

For a credential to be valid, the subject of the credential has to accept it. You can use accept_credential.js to do this:

`accept_credential.js`

```
node accept_credential.js
```

It should prompt you for your subject account seed. Input the secret key you saved previously and press Enter.

The script displays a list of Credentials that have been issued to your account and have not been accepted yet. Use the arrrow keys to scroll through the choices in the prompt and select the credential you want to accept, then press Enter. For example:

```
✔ Subject account seed:
? Accept a credential?
  0) No, quit.
  1) 'TstzzzCredential' issued by rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
  2) 'Tst9Credential' issued by rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
❯ 3) 'TCredential1' issued by rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
  4) 'Tst1Credential' issued by rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
  5) 'Tst0Credential' issued by rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
  6) 'Tst6Credential' issued by rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3
```


### 6. Revoke Credential

To revoke an issued credential, make a request such as the following:

- Summary
- cURL

- HTTP method: DELETE
- URL: http://localhost:3005/admin/credential
- Headers:Content-Type: application/json
- Content-Type: application/json
- Request Body:{
    "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
    "credential": "TestCredential"
}

`DELETE`

`http://localhost:3005/admin/credential`

- Content-Type: application/json

`Content-Type: application/json`

```
{
    "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
    "credential": "TestCredential"
}
```

The parameters of the JSON request body should be as follows:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| subject | String - Address | Yes | The XRPL classic address of the subject of the credential to revoke. |
| credential | String | Yes | The type of credential to revoke. This must match a credential type previously issued. |


`subject`

`credential`

A successful response from the API uses the HTTP status code 200 OK and has a response body with the result of submitting the transaction to the XRP Ledger. You can use the hash value from the response to look up the transaction using an explorer.

`200 OK`

`hash`


## Code Walkthrough

The code for this tutorial is divided among the following files:

| File | Purpose |
| --- | --- |
| accept_credential.js | Commandline interface for a credential subject to look up and accept Credentials. |
| credential.js | Provides functions that validate credential input, verify supporting documents, and convert between the microservice’s simplified Credential format and the full XRPL representation of Credentials. |
| errors.js | Custom error classes that standardize how the server reports validation errors and XRPL transaction failures. |
| issuer_service.js | Defines the microservice as an Express app, including API methods and error handling. |
| look_up_credentials.js | A helper function for looking up Credentials tied to an account, including pagination and filtering, used by both the credential issuer and holder. |


`accept_credential.js`

`credential.js`

`errors.js`

`issuer_service.js`

`look_up_credentials.js`


### accept_credential.js

This file is meant to be run as a commandline tool so it starts with a shebang, followed by dependencies grouped by type: external packages (Node.js modules) first, and local modules last.

```
#!/usr/bin/env node

import dotenv from "dotenv";
import inquirer from "inquirer";
import { Client, Wallet } from "xrpl";
import { lookUpCredentials } from "./look_up_credentials.js";
import { hexToString } from "@xrplf/isomorphic/dist/utils/index.js";
```

It returns a Wallet instance in the initWallet() function, with the subject account's key pair, using a seed either passed as an environment variable, or input as a password:

`Wallet`

`initWallet()`

```
const XRPL_SERVER = "wss://s.devnet.rippletest.net:51233"

dotenv.config();

async function initWallet() {
  let seed = process.env.SUBJECT_ACCOUNT_SEED;
  if (!seed) {
    const { seedInput } = await inquirer.prompt([
      {
        type: "password",
        name: "seedInput",
        message: "Subject account seed:",
        validate: (input) => (input ? true : "Please specify the subject's master seed"),
      },
    ]);
    seed = seedInput;
  }

  return Wallet.fromSeed(seed);
}
```

The main() function contains the core logic for the script. At the begining of the function it sets up the XRPL client, and calls initWallet() to instantiate a Wallet object:

`main()`

`initWallet()`

`Wallet`

```
async function main() {
  const client = new Client(XRPL_SERVER);
  await client.connect();    

  const wallet = await initWallet();
```

It then looks up pending credentials using the lookUpCredentials(...) function imported from look_up_credentials.js:

`lookUpCredentials(...)`

`look_up_credentials.js`

```
const pendingCredentials = await lookUpCredentials(
    client,
    "",
    wallet.address,
    "no"
  );
```

Next is a text menu that displays each of the unaccepted credentials returned by the lookup, as well as the option to quit:

```
const choices = pendingCredentials.map((cred, i) => ({
    name: `${i+1}) '${hexToString(cred.CredentialType)}' issued by ${cred.Issuer}`,
    value: i,
  }));
  choices.unshift({ name: "0) No, quit.", value: -1 });

  const { selectedIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedIndex",
      message: "Accept a credential?",
      choices,
    },
  ]);

  if (selectedIndex === -1) {
    process.exit(0);
  }
```

If the user picked a credential, the code constructs a CredentialAccept transaction, signs and submits it, and waits for it to be validated by consensus before displaying the result.

```
const chosenCred = pendingCredentials[selectedIndex];
  const tx = {
    TransactionType: "CredentialAccept",
    Account: wallet.address,
    CredentialType: chosenCred.CredentialType,
    Issuer: chosenCred.Issuer,
  };

  console.log("Submitting transaction:", tx);
  const response = await client.submit(tx, { autofill: true, wallet });
  console.log("Response:", response);

  await client.disconnect();
}
```

Finally, the code runs the main() function:

`main()`

```
main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
})
```


### issuer_service.js

This file defines the Express app of the issuer microservice. It opens by importing dependencies, grouped into external packages and local files:

```
import express from "express";
import morgan from 'morgan';
import inquirer from "inquirer";
import dotenv from "dotenv";
import { Wallet, Client } from "xrpl";

import {
  validateCredentialRequest,
  verifyDocuments,
  credentialToXrpl,
  credentialFromXrpl,
} from "./credential.js";
import { XRPLTxError } from "./errors.js";
import { lookUpCredentials } from "./look_up_credentials.js";
```

It returns a Wallet instance in the initWallet() function, with the subject account's key pair, using a seed either passed as an environment variable, or input as a password:

`Wallet`

`initWallet()`

```
dotenv.config();

async function initWallet() {
  let seed = process.env.ISSUER_ACCOUNT_SEED;

  if (!seed || seed.startsWith("<")) {
    const { seedInput } = await inquirer.prompt([
      {
        type: "password",
        name: "seedInput",
        message: "Issuer account seed:",
        validate: (input) => (input ? true : "Please specify the issuer's master seed"),
      },
    ]);
    seed = seedInput;
  }

  return Wallet.fromSeed(seed);
}
```

A function called handleAppError(...) is defined to handle errors thrown by the microservice.

`handleAppError(...)`

```
// Error handling --------------------------------------------------------------
function handleAppError(res, err) {
  if (err.name === "ValueError") {
    return res.status(err.status).json({
      error: err.type,
      error_message: err.message,
    });
  }
  
  if (err.name === "XRPLTxError") {
    return res.status(err.status).json(err.body);
  }

  // Default fallback
  return res.status(400).json({ error_message: err.message });
}
```

The main() function contains the core logic for the script. At the begining of the function it sets up the XRPL client, and calls initWallet() to instantiate a Wallet object:

`main()`

`initWallet()`

`Wallet`

```
async function main() {
  // Set up XRPL connection ------------------------------------------------------
  const client = new Client("wss://s.devnet.rippletest.net:51233");
  await client.connect();

  const wallet = await initWallet();
  console.log("✅ Starting credential issuer with XRPL address", wallet.address);
```

Next, it creates the Express app:

```
// Define Express app ------------------------------------------------------
  const app = express();
  app.use(morgan('common')); // Logger
  app.use(express.json()); // Middleware to parse JSON requests
```

After that come the definitions for the three API methods, starting with POST /credential. Users call this method to request a credential from the service. This method parses the request body as JSON and validates it. If this succeeds, it uses the data to fill out a CredentialCreate transaction. Finally, it checks the transaction's result to decide which HTTP response code to use:

`POST /credential`

`CredentialCreate`

```
// POST /credential - Method for users to request a credential from the service -------------------
  app.post("/credential", async (req, res) => {
    try {
      // validateCredentialRequest() throws if the request is not validly formatted
      const credRequest = validateCredentialRequest(req.body);

      /**
       * As a credential issuer, you typically need to verify some information
       * about someone before you issue them a credential. For this example,
       * the user passes relevant information in a documents field of the API request.
       * The documents are kept confidential, off-chain.
       * 
       * verifyDocuments() throws if the provided documents don't pass inspection
       */
      verifyDocuments(req.body);

      const credXrpl = credentialToXrpl(credRequest);

      const tx = {
        TransactionType: "CredentialCreate",
        Account: wallet.address,
        Subject: credXrpl.subject,
        CredentialType: credXrpl.credential,
        URI: credXrpl.uri,
        Expiration: credXrpl.expiration,
      };
      const ccResponse = await client.submitAndWait(tx, { autofill: true, wallet });

      if (ccResponse.result.meta.TransactionResult === "tecDUPLICATE") {
        throw new XRPLTxError(ccResponse, 409);
      } else if (ccResponse.result.meta.TransactionResult !== "tesSUCCESS") {
        throw new XRPLTxError(ccResponse);
      }

      return res.status(201).json(ccResponse.result);
    } catch (err) {
      return handleAppError(res, err);
    }
  });
```

The next API method is GET /admin/credential, which looks up credentials issued by the service. It uses the lookUpCredentials(...) method defined in look_up_credentials.js to get a list of credentials. Then it calls the serializeCredential(...) and parseCredentialFromXrpl(...) functions, imported from credential.js, to transform each ledger entry from the XRP Ledger format to the simplified representation the microservice uses.

`GET /admin/credential`

`lookUpCredentials(...)`

`look_up_credentials.js`

`serializeCredential(...)`

`parseCredentialFromXrpl(...)`

`credential.js`

```
// GET /admin/credential - Method for admins to look up all credentials issued -------------------
  app.get("/admin/credential", async (req, res) => {
    try {
      // ?accepted=yes|no|both query parameter - the default is "both"
      const query = Object.fromEntries(
        Object.entries(req.query).map(([k, v]) => [k.toLowerCase(), v])
      );
      const filterAccepted = (query.accepted || "both").toLowerCase();

      const credentials = await lookUpCredentials(client, wallet.address, "", filterAccepted);
      const result = credentials.map((entry) => credentialFromXrpl(entry));

      return res.status(200).json({ credentials: result });
    } catch (err) {
      return handleAppError(res, err);
    }
  });
```

The final API method, DELETE /admin/credential, deletes a Credential from the ledger, revoking it. This again uses functions from credential.js to validate user inputs and translate them into XRPL format where necessary. After that, it attempts to look up the Credential in the ledger and returns an error if it doesn't exist. This way, the issuer doesn't have to pay the cost of sending a transaction that would fail. Finally, the method checks the transaction result and sets the HTTP response code accordingly.

`DELETE /admin/credential`

`credential.js`

```
// DELETE /admin/credential - Method for admins to revoke an issued credential ----------------------------
  app.delete("/admin/credential", async (req, res) => {
    let delRequest;
    try {
      delRequest = validateCredentialRequest(req.body);
      const { credential } = credentialToXrpl(delRequest);

      // To save on transaction fees, check if the credential exists on ledger before attempting to delete it.
      // If the credential is not found, a RippledError (`entryNotFound`) is thrown.
      await client.request({
        command: "ledger_entry",
        credential: {
          subject: delRequest.subject,
          issuer: wallet.address,
          credential_type: credential,
        },
        ledger_index: "validated",
      });

      const tx = {
        TransactionType: "CredentialDelete",
        Account: wallet.address,
        Subject: delRequest.subject,
        CredentialType: credential,
      };

      const cdResponse = await client.submitAndWait(tx, { autofill: true, wallet });
      if (cdResponse.result.meta.TransactionResult === "tecNO_ENTRY") {
        // Usually this won't happen since we just checked for the credential,
        // but it's possible it got deleted since then.
        throw new XRPLTxError(cdResponse, 404);
      } else if (cdResponse.result.meta.TransactionResult !== "tesSUCCESS") {
        throw new XRPLTxError(cdResponse);
      }

      return res.status(200).json(cdResponse.result);
    } catch (err) {
      if (err.data?.error === "entryNotFound") {
        return res.status(404).json({
          error: err.data.error,
          error_message: `Credential doesn't exist for subject '${delRequest.subject}' and credential type '${delRequest.credential}'`,
        });
      } else {
        return handleAppError(res, err);
      }
    }
  });
```

The port for the microservice is set to either an environment variable called PORT or to 3000, and the application listens for connections at the assigned port:

`PORT`

`3000`

```
const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🔐 Credential issuer service running on port: ${PORT}`);
  });
}
```

Finally, the code runs the main() function:

`main()`

```
// Start the server --------------------------------------------------------------
main().catch((err) => {
  console.error("❌ Fatal startup error:", err);
  process.exit(1);
});
```


### look_up_credentials.js

This file implements lookup of Credentials. Both the issuer code and the subject code use this function to look up their own credentials.

This code performs pagination using markers to get all the results from the ledger. It also filters results based on the issuer/subject account, so that lookup by issuer, for example, doesn't include credentials that someone else issued to the issuer account. Finally, it can optionally check the accepted status of the Credentials and only include ones that are or aren't accepted.

```
import { ValueError } from "./errors.js";

const lsfAccepted = 0x00010000;

/**
 * Looks up Credentials issued by/to a specified XRPL account, optionally
 * filtering by accepted status. Handles pagination.
 */
export async function lookUpCredentials(client, issuer, subject, accepted = "both") {
  const account = issuer || subject; // Use whichever is specified, issuer if both
  if (!account) {
    throw new ValueError("Must specify issuer or subject");
  }

  accepted = accepted.toLowerCase();
  if (!["yes", "no", "both"].includes(accepted)) {
    throw new ValueError("accepted must be 'yes', 'no', or 'both'");
  }

  const credentials = [];
  let request = {
    command: "account_objects",
    account,
    type: "credential",
    ledger_index: "validated",
  };

  // Fetch first page
  let response = await client.request(request);

  while (true) {
    for (const obj of response.result.account_objects) {
      if (issuer && obj.Issuer !== issuer) continue;
      if (subject && obj.Subject !== subject) continue;

      const credAccepted = Boolean(obj.Flags & lsfAccepted);
      if (accepted === "yes" && !credAccepted) continue;
      if (accepted === "no" && credAccepted) continue;

      credentials.push(obj);
    }

    if (!response.result.marker) break;

    /** 
     * If there is a marker, request the next page using the convenience function "requestNextPage()".
     * See https://js.xrpl.org/classes/Client.html#requestnextpage to learn more.
     **/ 
    response = await client.requestNextPage(request, response.result);
  }

  return credentials;
}
```


### credential.js

This file defines a set of helper functions that validate credential related input, verify request data, and convert between the issuer microservice's simplified Credential format and the XRP Ledger object representation. It throws typed errors on invalid input.

The file starts with importing dependencies, grouped into external packages and local files:

```
import {
  isoTimeToRippleTime,
  rippleTimeToISOTime,
  isValidClassicAddress,
} from "xrpl";
import { stringToHex, hexToString } from "@xrplf/isomorphic/dist/utils/index.js";

import { ValueError } from "./errors.js";
```

It then defines regular expression constants that are used further on in the code to validate  the credential and uri:

```
// Regex constants
const CREDENTIAL_REGEX = /^[A-Za-z0-9_.-]{1,128}$/;
const URI_REGEX = /^[A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=%]{1,256}$/;
```

The function validateCredentialRequest(...) checks that the user input meets various requirements. It also parses the user-provided timestamp from a string to a native Javascript Date object if necessary.

`validateCredentialRequest(...)`

```
/**
 * Validate credential request.
 * This function performs parameter validation. Validated fields:
 *   - subject (required): the subject of the credential, as a classic address
 *   - credential (required): the credential type, in human-readable (ASCII) chars
 *   - uri (optional): URI of the credential in human-readable (ASCII) chars
 *   - expiration (optional): time when the credential expires (displayed as an ISO 8601 format string in JSON)
 */
export function validateCredentialRequest({ subject, credential, uri, expiration }) {
  // Validate subject
  if (typeof subject !== "string") {
    throw new ValueError("Must provide a string 'subject' field");
  }
  if (!isValidClassicAddress(subject)) {
    throw new ValueError(`subject not valid address: '${subject}'`);
  }

  // Validate credential
  if (typeof credential !== "string") {
    throw new ValueError("Must provide a string 'credential' field");
  }
  if (!CREDENTIAL_REGEX.test(credential)) {
    /**
     * Checks if the specified credential type is one that this service issues.
     * XRPL credential types can be any binary data; this service issues
     * any credential that can be encoded from the following ASCII chars:
     * alphanumeric characters, underscore, period, and dash. (min length 1, max 128)
     *
     * You might want to further limit the credential types, depending on your
     * use case; for example, you might only issue one specific credential type.
     */
    throw new ValueError(`credential not allowed: '${credential}'.`);
  }

  /*
  (Optional) Checks if the specified URI is acceptable for this service.
  
  XRPL Credentials' URI values can be any binary data; this service
  adds any user-requested URI to a Credential as long as the URI
  can be encoded from the characters usually allowed in URIs, namely
  the following ASCII chars:

    alphanumeric characters (upper and lower case)
    the following symbols: -._~:/?#[]@!$&'()*+,;=%
    (minimum length 1 and max length 256 chars)

  You might want to instead define your own URI and attach it to the
  Credential regardless of user input, or you might want to verify that the
  URI points to a valid Verifiable Credential document that matches the user.
  */
  if (uri !== undefined) {
    if (typeof uri !== "string" || !URI_REGEX.test(uri)) {
      throw new ValueError(`URI isn't valid: ${uri}`);
    }
  }

  // Validate and parse expiration
  let parsedExpiration;
  if (expiration !== undefined) {
    if (typeof expiration !== "string") {
      throw new ValueError(`Unsupported expiration format: ${typeof expiration}`);
    }
    parsedExpiration = new Date(expiration);
    if (isNaN(parsedExpiration.getTime())) {
      throw new ValueError(`Invalid expiration date: ${expiration}`);
    }
  }

  return {
    subject,
    credential,
    uri,
    expiration: parsedExpiration,
  };
}
```

The credentialFromXrpl(...) function converts an XRPL ledger entry into a usable credential object (for example, converting the credential field from hexadecimal to a native string). The API methods that read data from the XRP Ledger use this function so that their output is formatted the same way as user input in the other API methods.

`credentialFromXrpl(...)`

```
// Convert an XRPL ledger entry into a usable credential object
export function credentialFromXrpl(entry) {
  const { Subject, CredentialType, URI, Expiration, Flags } = entry;
  return {
    subject: Subject,
    credential: hexToString(CredentialType),
    uri: URI ? hexToString(URI) : undefined,
    expiration: Expiration ? rippleTimeToISOTime(Expiration) : undefined,
    accepted: Boolean(Flags & 0x00010000), // lsfAccepted
  };
}
```

The credentialToXrpl(...) function returns an object which is formatted for submitting to the XRP Ledger:

`credentialToXrpl(...)`

```
// Convert to an object in a format closer to the XRP Ledger representation
export function credentialToXrpl(cred) {
   // Credential type and URI are hexadecimal;
   // Expiration, if present, is in seconds since the Ripple Epoch.
  return {
    subject: cred.subject,
    credential: stringToHex(cred.credential),
    uri: cred.uri ? stringToHex(cred.uri) : undefined,
    expiration: cred.expiration
      ? isoTimeToRippleTime(cred.expiration)
      : undefined,
  };
}
```

Finally, the verifyDocuments(...) function checks for an additional field, documents. For a realistic credential issuer, you might require the user to provide specific documents in the request body, like a photo of their government-issued ID or a cryptographically signed message from another business, which your code would check. For this tutorial, the check is only a placeholder:

`verifyDocuments(...)`

`documents`

```
export function verifyDocuments({ documents }) {
 /**
  * This is where you would check the user's documents to see if you
  * should issue the requested Credential to them.
  * Depending on the type of credentials your service needs, you might
  * need to implement different types of checks here.
  */
  if (typeof documents !== "object" || Object.keys(documents).length === 0) {
    throw new ValueError("you must provide a non-empty 'documents' field");
  }

  // As a placeholder, this example checks that the documents field
  // contains a string field named "reason" containing the word "please".
  const reason = documents.reason;
  if (typeof reason !== "string") {
    throw new ValueError("documents must contain a 'reason' string");
  }

  if (!reason.toLowerCase().includes("please")) {
    throw new ValueError("reason must include 'please'");
  }
}
```


### errors.js

This file defines custom error classes used by the credential issuer service to provide consistent error handling and help distinguish between different kinds of failures:

```
export class ValueError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValueError";
    this.status = 400;
    this.type = "badRequest";
  }
}

export class XRPLTxError extends Error {
  constructor(xrplResponse, status = 400) {
    super("XRPL transaction failed");
    this.name = "XRPLTxError";
    this.status = status;
    this.body = xrplResponse.result;
  }
}
```


## Next Steps

Using this service as a base, you can extend the service with more features, such as:

- Security/authentication to protect API methods from unauthorized use.
- Actually checking user documents to decide if you should issue a credential.

Alternatively, you can use credentials to for various purposes, such as:

- Define a Permissioned Domain that uses your credentials to grant access to features on the XRP Ledger.
- Verify credentials manually to grant access to services that exist off-ledger.


## See Also

- Python: Build a Credential Issuing Service

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=71703afa-fbea-427c-a7fd-d8409276a34f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=71703afa-fbea-427c-a7fd-d8409276a34f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3e25b893-ac43-407f-b52c-1b77ddc19bf0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3e25b893-ac43-407f-b52c-1b77ddc19bf0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=56227095-e20d-43b8-b548-3ac55da26aa0&bo=1&sid=f86d43609d9c11f0a1757da7f0196fb0&vid=f86dc9509d9c11f0ac8b67636093f13e&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Build%20a%20Credential%20Issuing%20Service&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&r=&lt=3147&evt=pageLoad&sv=2&cdb=AQAS&rn=624324)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5cf6d389-6819-4d72-bab2-d61850408ec6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5cf6d389-6819-4d72-bab2-d61850408ec6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=487e4c7a-061c-498a-ab6d-446da19010a3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=487e4c7a-061c-498a-ab6d-446da19010a3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446e5648-3703-4236-9667-9d137a81707b&pt=Build%20a%20Credential%20Issuing%20Service&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fbuild-apps%2Fcredential-issuing-service&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/build-apps/credential-issuing-service#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/build-apps/credential-issuing-service#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/build-apps/credential-issuing-service#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/build-apps/credential-issuing-service#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/build-apps/credential-issuing-service.md)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/download/)
- [Credential Issuing Service sample code](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/issue-credentials/js/)
- [package.json](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/issue-credentials/js/package.json)
- [Postman](https://www.postman.com/downloads/)
- [RESTED](https://github.com/RESTEDClient/RESTED)
- [cURL](https://curl.se/)
- [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:30:28.016Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
