# Verify Credentials in Javascript
URL: https://xrpl.org/docs/tutorials/javascript/compliance/verify-credential
Section: C27

## Overview


## Extracted Content
# Verify Credentials in Javascript

This tutorial describes how to verify that an account holds a valid credential on the XRP Ledger, which has different use cases depending on the type of credential and the meaning behind it. A few possible reasons to verify a credential include:

- Confirming that a recipient has passed a background check before sending a payment.
- Checking a person's professional certifications, after verifying their identity with a DID.
- Displaying a player's achievements in a blockchain-connected game.

This tutorial uses sample code in Javascript using the xrpl-js library.


## Prerequisites

- You must have Node.js installed and know how to run Javascript code from the command line. Node.js v18 is required for xrpl.js.
- You should have a basic understanding of the XRP Ledger.
- The credential you want to verify should exist in the ledger already, and you should know the addresses of both the issuer and the holder, as well as the official credential type you want to check.For sample code showing how to create credentials, see Build a Credential Issuing Service.
- For sample code showing how to create credentials, see Build a Credential Issuing Service.

- For sample code showing how to create credentials, see Build a Credential Issuing Service.


## Setup

First, download the complete sample code for this tutorial from GitHub:

- Verify Credential sample code

Then, in the appropriate directory, install dependencies:

```
npm install
```

This installs the appropriate version of the xrpl.js library and a few other dependencies. You can view all dependencies in the package.json file.

`xrpl.js`

`package.json`


## Overview

The Verify Credential sample code consists of one file, verify_credential.js, and contains two main parts:

`verify_credential.js`

1. A function, verifyCredential(...) which can be called with appropriate arguments to verify that a credential exists and is valid. This function can be imported into other code to be used as part of a larger application.
1. A commandline utility that can be used to verify any credential.

`verifyCredential(...)`


## Usage

To test that you have the code installed and working properly, you can run the commandline utility with no arguments to check the existence of a default credential on Devnet, such as:

```
node verify_credential.js
```

If all goes well, you should see output such as the following:

```
info: Encoded credential_type as hex: 5465737443726564656E7469616C
info: Looking up credential...
info: {
  "command": "ledger_entry",
  "credential": {
    "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
    "issuer": "rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3",
    "credential_type": "5465737443726564656E7469616C"
  },
  "ledger_index": "validated"
}
info: Found credential:
info: {
  "CredentialType": "5465737443726564656E7469616C",
  "Flags": 65536,
  "Issuer": "rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3",
  "IssuerNode": "0",
  "LedgerEntryType": "Credential",
  "PreviousTxnID": "B078C70D17820069BDF913146F9908A209B4E10794857A3E474F4C9C5A35CA6A",
  "PreviousTxnLgrSeq": 1768183,
  "Subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
  "SubjectNode": "0",
  "index": "F2ACB7292C4F4ACB18010251F1653934DC17F06AA5BDE7F484F65B5A648D70CB"
}
info: Credential is valid.
```

If the code reports that the credential was not found when called with no arguments, it's possible that the example credential has been deleted or the Devnet has been reset. If you have another credential you can verify, you can provide the details as commandline arguments. For example:

```
node verify_credential.js rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3 rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG TestCredential
```

A full usage statement is available with the -h flag.

`-h`


### Other Examples

The following examples show other possible scenarios. The data for these examples may or may not still be present in Devnet. For example, anyone can delete an expired credential.

- Valid with Expiration
- Expired
- Unaccepted
- MoreHexadecimal Credential Type
- Hexadecimal Credential Type

- Hexadecimal Credential Type

```
$ ./verify_credential.js rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3 rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG TCredential777

info: Encoded credential_type as hex: 5443726564656E7469616C373737
info: Looking up credential...
info: {
  "command": "ledger_entry",
  "credential": {
    "subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
    "issuer": "rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3",
    "credential_type": "5443726564656E7469616C373737"
  },
  "ledger_index": "validated"
}
info: Found credential:
info: {
  "CredentialType": "5443726564656E7469616C373737",
  "Expiration": 798647105,
  "Flags": 65536,
  "Issuer": "rPLY4DWhB4VA7PPZ8nvZLhShXeVZqeKif3",
  "IssuerNode": "0",
  "LedgerEntryType": "Credential",
  "PreviousTxnID": "D32F66D1446C810BF4E6310E21111C0CE027140292347F0C7A73322F08C07D7E",
  "PreviousTxnLgrSeq": 2163057,
  "Subject": "rBqPPjAW6ubfFdmwERgajvgP5LtM4iQSQG",
  "SubjectNode": "0",
  "URI": "746573745F757269",
  "index": "6E2AF1756C22BF7DC3AA47AD303C985026585B54425E7FACFAD6CD1867DD39C2"
}
info: Credential has expiration: 2025-04-22T14:25:05.000Z
info: Looking up validated ledger to check for expiration.
info: Most recent validated ledger is: 2025-04-22T13:47:30.000Z
info: Credential is valid.
```


## Code Walkthrough


### 1. Initial setup

The verify_credential.js file implements the code for this tutorial. This file can be run as a commandline tool, so it starts with a shebang. Then it imports the relevant dependencies, including the specific parts of the xrpl.js library:

`verify_credential.js`

`xrpl.js`

```
#!/usr/bin/env node

import { Command } from "commander";
import { Client, rippleTimeToISOTime, convertStringToHex } from "xrpl";
import winston from "winston";
```

The next section of the code sets the default log level for messages that might be written to the console through the utility:

```
// Set up logging --------------------------------------------------------------
// Use WARNING by default in case verify_credential is called from elsewhere.
const logger = winston.createLogger({
  level: "warn",
  transports: [new winston.transports.Console()],
  format: winston.format.simple(),
});
```

Then it defines a type of exception to throw if something goes wrong when connecting to the XRP Ledger:

```
// Define an error to throw when XRPL lookup fails unexpectedly
class XRPLLookupError extends Error {
  constructor(error) {
    super("XRPL look up error");
    this.name = "XRPLLookupError";
    this.body = error;
  }
}
```

Finally, a regular expression to validate the credential format and the lsfAccepted flag are defined as constants for use further on in the code.

```
const CREDENTIAL_REGEX = /^[0-9A-F]{2,128}$/;
// See https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/credential#credential-flags
// to learn more about the lsfAccepted flag.
const LSF_ACCEPTED = 0x00010000;
```


### 2. verifyCredential function

The verifyCredential(...) function performs the main work for this tutorial. The function definition and comments define the parameters:

`verifyCredential(...)`

```
async function verifyCredential(client, issuer, subject, credentialType, binary=false) {
  /**
   * Check whether an XRPL account holds a specified credential,
   * as of the most recently validated ledger.
   * Parameters:
   *  client - Client for interacting with rippled servers.
   *  issuer - Address of the credential issuer, in base58.
   *  subject - Address of the credential holder/subject, in base58.
   *  credentialType - Credential type to check for as a string,
   *                   which will be encoded as UTF-8 (1-128 characters long).
   *  binary - Specifies that the credential type is provided in hexadecimal format.
   * You must provide the credential_type as input.
   * Returns True if the account holds the specified, valid credential.
   * Returns False if the credential is missing, expired, or not accepted.
   */
```

The XRP Ledger APIs require the credential type to be hexadecimal, so it converts the user input if necessary:

```
// Encode credentialType as uppercase hex, if needed
  let credentialTypeHex = "";
  if (binary) {
    credentialTypeHex = credentialType.toUpperCase();
  } else {
    credentialTypeHex = convertStringToHex(credentialType).toUpperCase();
    logger.info(`Encoded credential_type as hex: ${credentialTypeHex}`);
  }

  if (credentialTypeHex.length % 2 !== 0 || !CREDENTIAL_REGEX.test(credentialTypeHex)) {
    // Hexadecimal is always 2 chars per byte, so an odd length is invalid.
    throw new Error("Credential type must be 128 characters as hexadecimal.");
  }
```

Next, it calls the ledger_entry method to look up the requested Credential ledger entry:

```
// Perform XRPL lookup of Credential ledger entry --------------------------
  const ledgerEntryRequest = {
    command: "ledger_entry",
    credential: {
      subject: subject,
      issuer: issuer,
      credential_type: credentialTypeHex,
    },
    ledger_index: "validated",
  };
  logger.info("Looking up credential...");
  logger.info(JSON.stringify(ledgerEntryRequest, null, 2));

  let xrplResponse;
  try {
    xrplResponse = await client.request(ledgerEntryRequest);
  } catch (err) {
    if (err.data?.error === "entryNotFound") {
      logger.info("Credential was not found");
      return false;
    } else {
      // Other errors, for example invalidly specified addresses.
      throw new XRPLLookupError(err?.data || err);
    }
  }

  const credential = xrplResponse.result.node;
  logger.info("Found credential:");
  logger.info(JSON.stringify(credential, null, 2));
```

If it succeeds in finding the credential, the function continues by checking that the credential has been accepted by its holder. Since anyone can issue a credential to anyone else, a credential is only considered valid if its subject has accepted it.

```
// Check if the credential has been accepted ---------------------------
  if (!(credential.Flags & LSF_ACCEPTED)) {
    logger.info("Credential is not accepted.");
    return false
  }
```

Then, if the credential has an expiration time, the function checks that the credential is not expired. If the credential has no expiration, this step can be skipped. A credential is officially considered expired if its expiration time is before the official close time of the most recently validated ledger. This is more universal than comparing the expiration to your own local clock. Thus, the code uses the ledger method to look up the most recently validated ledger:

```
// Confirm that the credential is not expired ------------------------------
  if (credential.Expiration) {
    const expirationTime = rippleTimeToISOTime(credential.Expiration);
    logger.info(`Credential has expiration: ${expirationTime}`);
    logger.info("Looking up validated ledger to check for expiration.");

    let ledgerResponse;
    try {
      ledgerResponse = await client.request({
        command: "ledger",
        ledger_index: "validated",
      });
    } catch (err) {
      throw new XRPLLookupError(err?.data || err);
    }

    const closeTime = rippleTimeToISOTime(ledgerResponse.result.ledger.close_time);
    logger.info(`Most recent validated ledger is: ${closeTime}`);

    if (new Date(closeTime) > new Date(expirationTime)) {
      logger.info("Credential is expired.");
      return false;
    }
  }
```

If none of the checks up to this point have returned a false value, then the credential must be valid. This concludes the verifyCredential(...) function:

`false`

`verifyCredential(...)`

```
// Credential has passed all checks ---------------------------------------
  logger.info("Credential is valid.");
  return true;
}
```


### 3. Commandline interface

This file also implements a commandline utility which runs when the file is executed directly as a Node.js script. Some variables, such as the set of available networks, are only needed for this mode:

```
// Commandline usage -----------------------------------------------------------
async function main() {
  // Websocket URLs of public servers
  const NETWORKS = {
    devnet: "wss://s.devnet.rippletest.net:51233",
    testnet: "wss://s.altnet.rippletest.net:51233",
    mainnet: "wss://xrplcluster.com/",
  };
```

Then it uses the commander package to define and parse the arguments that the user can pass from the commandline:

```
// Parse arguments ---------------------------------------------------------
  let result = false
  const program = new Command();
  program
    .name("verify-credential")
    .description("Verify an XRPL credential")
    .argument("[issuer]", "Credential issuer address as base58", "rEzikzbnH6FQJ2cCr4Bqmf6c3jyWLzkonS")
    .argument("[subject]", "Credential subject (holder) address as base58", "rsYhHbanGpnYe3M6bsaMeJT5jnLTfDEzoA")
    .argument("[credential_type]", "Credential type as string.", "my_credential")
    .option("-b, --binary", "Use binary (hexadecimal) for credential_type")
    .option(
      `-n, --network <network> {${Object.keys(NETWORKS)}}`,
      "Use the specified network for lookup",
      (value) => {
        if (!Object.keys(NETWORKS).includes(value)) {
          throw new Error(`Must be one of: ${Object.keys(NETWORKS)}`);
        }
        return value;
      },
      "devnet"
    )
    .option("-q, --quiet", "Don't print log messages")
```

After parsing the commandline args, it sets the appropriate values and passes them to verifyCredential(...) to perform the credential verification:

`verifyCredential(...)`

```
// Call verify_credential with appropriate args ----------------------------
    .action(async (issuer, subject, credentialType, options) => {
      const client = new Client(NETWORKS[options.network]);
      await client.connect();

      // Use INFO level by default when called from the commandline.
      if (!options.quiet) { logger.level = "info" }

      // Commander.js automatically sets options.binary to a boolean:
      //   - If you provide -b or --binary on the command line then options.binary = true
      //   - If you do not provide it then options.binary = false
      result = await verifyCredential(client, issuer, subject, credentialType, options.binary);

      await client.disconnect();
    });
  await program.parseAsync(process.argv);
```

It returns a nonzero exit code if this credential was not verified. This can be useful for shell scripts:

```
// Return a nonzero exit code if credential verification failed -----------
  if (!result) {
    process.exit(1);
  }
}
```

Finally, the code runs the main() function:

`main()`

```
main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
```


## Next Steps

Now that you know how to use xrpl.js to verify credentials, you can try building this or related steps together into a bigger project. For example:

`xrpl.js`

- Incorporate credential verification into a wallet application.
- Issue your own credentials with a credential issuing service.


## See Also

- Verify Credentials in Python

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0860325b-0afc-455e-aa79-cc42cc7891df&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0860325b-0afc-455e-aa79-cc42cc7891df&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=49cf8e1d-cdad-47ef-875d-cc4c18f3b178&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=49cf8e1d-cdad-47ef-875d-cc4c18f3b178&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c77b8bed-56ce-434c-918a-f3bcb1b86bbc&bo=1&sid=2d8b45909d9d11f0b98d713926b61c17&vid=2d8bda809d9d11f0885b61a14573e149&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Verify%20Credentials%20in%20Javascript&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&r=&lt=5755&evt=pageLoad&sv=2&cdb=AQAS&rn=687729)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1724274c-a47e-48b1-bb39-a6321ad1645e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1724274c-a47e-48b1-bb39-a6321ad1645e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd835f58-cd68-4e58-97d5-36567bbcf85b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd835f58-cd68-4e58-97d5-36567bbcf85b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=abede925-e595-4288-a11c-a1a9c9bd94b4&pt=Verify%20Credentials%20in%20Javascript&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fverify-credential&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/compliance/verify-credential#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/compliance/verify-credential#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/compliance/verify-credential#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/compliance/verify-credential#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.330d127ef4f1f3f2f7a911bc84f4e76d.1759195884491.1759195884491.1759195884491.1&__hssc=78174987.1.1759195884492&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/compliance/verify-credential.md)
- [Verify Credential sample code](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/verify-credential/js/)
- [package.json](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/verify-credentials/js/package.json)
- [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))
- [commander package](https://www.npmjs.com/package/commander)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.330d127ef4f1f3f2f7a911bc84f4e76d.1759195884491.1759195884491.1759195884491.1&__hssc=78174987.1.1759195884492&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:31:42.021Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
