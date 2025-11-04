# Create Permissioned Domains
URL: https://xrpl.org/docs/tutorials/javascript/compliance/create-permissioned-domains
Section: C26

## Overview


## Extracted Content
# Create Permissioned Domains

Permissioned domains are controlled environments within the broader ecosystem of the XRP Ledger blockchain. Domains restrict access to other features such as Permissioned DEXes and Lending Protocols, only allowing access to them for accounts with specific credentials.

This example shows how to:

1. Issue a credential to an account.
1. Create a permissioned domain with the issued credential.
1. Delete the permissioned domain.

Download the Modular Tutorials folder.

Without the Modular Tutorial Samples, you will not be able to try the examples that follow.


## Get Accounts

To get test accounts:

1. Open create-permissioned-domains.html in a browser.
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

`create-permissioned-domains.html`

- If you copied the gathered information from another tutorial:Paste the gathered information to the Result field.Click Distribute Account Info.
- Paste the gathered information to the Result field.
- Click Distribute Account Info.
- If you have an existing account seed:Paste the account seed to the Account 1 Seed or Account 2 Seed field.Click Get Account 1 from Seed or Get Account 2 from Seed.
- Paste the account seed to the Account 1 Seed or Account 2 Seed field.
- Click Get Account 1 from Seed or Get Account 2 from Seed.
- If you do not have existing accounts:Click Get New Account 1.Click Get New Account 2.
- Click Get New Account 1.
- Click Get New Account 2.

1. Paste the gathered information to the Result field.
1. Click Distribute Account Info.

1. Paste the account seed to the Account 1 Seed or Account 2 Seed field.
1. Click Get Account 1 from Seed or Get Account 2 from Seed.

1. Click Get New Account 1.
1. Click Get New Account 2.


## Issue a Credential

1. Click the Account 1 radial button. This account will be the credential issuer.
1. Copy the account 2 address into Subject.
1. Enter a Credential Type. For example, KYC.
1. Click Create Credential.


## Create a Permissioned Domain

1. Click Create Permissioned Domain.
1. Copy the LedgerIndex value from the metadata response.
1. (Optional) Update the permissioned domain with a different credential.Change the Credential Type.Click Create Credential.Copy the LedgerIndex value into DomainID.Click Create Permissioned Domain.
1. Change the Credential Type.
1. Click Create Credential.
1. Copy the LedgerIndex value into DomainID.
1. Click Create Permissioned Domain.

1. Change the Credential Type.
1. Click Create Credential.
1. Copy the LedgerIndex value into DomainID.
1. Click Create Permissioned Domain.


## Delete a Permissioned Domain

1. Copy the LedgerIndex value into DomainID.
1. Click Delete Permissioned Domain.


# Code Walkthrough


## credential-manager.js


### Create Credential

Define a function that issues a credential to a subject and connects to the XRP Ledger.

```
/ Create credential function
async function createCredential() {

  let net = getNet()
  const client = new xrpl.Client(net)
  results = `\n\n===Creating Credential===\n\nConnecting to ${getNet()} ...`
  updateResults()
  await client.connect()  
  results = `\n\nConnected.`
  updateResults()
```

Gather the issuer information, subject, and credential type. Convert the credential type value to a hex string if not already in hex. Wrap the code in a try-catch block to handle errors.

`try-catch`

```
// Gather transaction info
  try {
  
  // Get account wallet from seed
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  
  // Get subject
  const subject = subjectField.value
  
  // Get credential type - convert string to hex if needed
  let credentialType = credentialTypeField.value;
  if (!/^[0-9A-F]+$/i.test(credentialType)) {
    let hex = '';
    for (let i = 0; i < credentialType.length; i++) {
      const charCode = credentialType.charCodeAt(i);
      const hexCharCode = charCode.toString(16).padStart(2, '0');
      hex += hexCharCode;
    }
    credentialType = hex.toUpperCase();
  }
  
  // Prepare transaction
  const transaction = {
    "TransactionType": "CredentialCreate",
    "Account": wallet.address,
    "Subject": subject,
    "CredentialType": credentialType
  }
  
  results = `\n\n===Preparing and Sending Transaction===\n\n${JSON.stringify(transaction, null, 2)}`
  updateResults()
```

Submit the CredentialCreate transaction and report the results. Parse the metadata response to return only relevant credential info.

`CredentialCreate`

```
// Submit transaction
  const tx = await client.submitAndWait(transaction, {autofill: true, wallet: wallet})
  
  if (tx.result.meta.TransactionResult == "tesSUCCESS") {
    // Parse for credential info
    const parsedResponse = JSON.parse(JSON.stringify(tx.result.meta.AffectedNodes, null, 2))
    const credentialInfo = parsedResponse.find( node => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Credential" )
    results = `\n\n===Create Credential Result===\n\n${JSON.stringify(credentialInfo.CreatedNode, null, 2)}`
    } else {
    results = `\n\n===Error===\n\n${JSON.stringify(tx.result.meta.TransactionResult, null, 2)}: Check codes at https://xrpl.org/docs/references/protocol/transactions/types/credentialcreate#error-cases`
    }

  updateResults()

  } catch (error) {
      results = `\n\n===Error===\n\n${error}`
      updateResults()
  }
  
  client.disconnect()
}
```


## permissioned-domain-manager.js


### Create Permissioned Domain

Define a function that creates a permissioned domain and connects to the XRP Ledger.

```
// Create permissioned domain
async function createDomain() {

  let net = getNet()
  const client = new xrpl.Client(net)
  results = `\n\n===Creating Permissioned Domain===\n\nConnecting to ${getNet()} ...`
  updateResults()
  await client.connect()  
  results = `\n\nConnected.`
  updateResults()
```

Gather issuer information, credential type, and domain ID. Format the transaction depending on if the optional domain ID field is included. Wrap the code in a try-catch block to handle errors.

`try-catch`

```
// Gather transaction info
  try {
    
    // Get account wallet from seed
    const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
    
    // Get Domain ID
    const domainID = domainIDField.value
    
    // Get credential type - convert string to hex if needed
    let credentialType = credentialTypeField.value;
    if (!/^[0-9A-F]+$/i.test(credentialType)) {
      let hex = '';
      for (let i = 0; i < credentialType.length; i++) {
        const charCode = credentialType.charCodeAt(i);
        const hexCharCode = charCode.toString(16).padStart(2, '0');
        hex += hexCharCode;
      }
      credentialType = hex.toUpperCase();
    }
    
    // Prepare transaction
    const transaction = {
      "TransactionType": "PermissionedDomainSet",
      "Account": wallet.address,
      "AcceptedCredentials": [
        {
          "Credential": {
            "Issuer": wallet.address,
            "CredentialType": credentialType
          }
        }
      ]
    }

    if (domainID) {
      transaction.DomainID = domainID
    }
    
    results = `\n\n===Preparing and Sending Transaction===\n\n${JSON.stringify(transaction, null, 2)}`
    updateResults()
```

Submit the PermissionedDomainSet transaction and report the results. The metadata is formed differently if a domain ID is included; parse the response accordingly.

`PermissionedDomainSet`

```
// Submit transaction
    const tx = await client.submitAndWait(transaction, {autofill: true, wallet: wallet})
    
    if (tx.result.meta.TransactionResult == "tesSUCCESS") {
      // Parse for domain info
      if (domainID) {
        results = `\n\n===Create Permissioned Domain Result===\n\n${JSON.stringify(tx.result.tx_json, null, 2)}`
      } else {
        const parsedResponse = JSON.parse(JSON.stringify(tx.result.meta.AffectedNodes, null, 2))
        const domainInfo = parsedResponse.find( node => node.CreatedNode && node.CreatedNode.LedgerEntryType === "PermissionedDomain" )
        results = `\n\n===Create Permissioned Domain Result===\n\n${JSON.stringify(domainInfo.CreatedNode, null, 2)}`
      }
    } else {
    results = `\n\n===Error===\n\n${JSON.stringify(tx.result.meta.TransactionResult, null, 2)}: Check codes at https://xrpl.org/docs/references/protocol/transactions/types/permissioneddomainset#error-cases`
    }
    updateResults()

    } catch (error) {
        results = `\n\n===Error===\n\n${error}`
        updateResults()
    }
  
  client.disconnect()
}
```


### Delete Permissioned Domain

Define a function to delete a permissioned domain and connect to the XRP Ledger.

```
// Delete permissioned domain
async function deleteDomain() {

  let net = getNet()
  const client = new xrpl.Client(net)
  results = `\n\n===Delete Permissioned Domain===\n\nConnecting to ${getNet()} ...`
  updateResults()
  await client.connect()  
  results = `\n\nConnected.`
  updateResults()
```

Gather account information and domain ID values. Wrap the code in a try-catch block to handle errors.

`try-catch`

```
// Get delete domain transaction info
  try {
  
  // Get account wallet from seed
  const wallet = xrpl.Wallet.fromSeed(accountSeedField.value)
  
  // Get Domain ID
  const domainID = domainIDField.value
  
  // Prepare transaction
  const transaction = {
    "TransactionType": "PermissionedDomainDelete",
    "Account": wallet.address,
    "DomainID": domainID
  }
 
  results = `\n\n===Preparing and Sending Transaction===\n\n${JSON.stringify(transaction, null, 2)}`
  updateResults()
```

Submit the PermissionedDomainDelete transaction and report the results.

`PermissionedDomainDelete`

```
// Submit delete domain transaction
  const tx = await client.submitAndWait(transaction, {autofill: true, wallet: wallet})
  
  if (tx.result.meta.TransactionResult == "tesSUCCESS") {
    results = `\n\n===Delete Permissioned Domain Result===\n\nSuccessfully deleted the permissioned domain.`
  } else {
  results = `\n\n===Error===\n\n${JSON.stringify(tx.result.meta.TransactionResult, null, 2)}: Check codes at https://xrpl.org/docs/references/protocol/transactions/types/permissioneddomaindelete#error-cases`
  }
  updateResults()

  } catch (error) {
      results = `\n\n===Error===\n\n${error}`
      updateResults()
  }
  
  client.disconnect()
}
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Create Permissioned Domain Test Harness](https://xrpl.org/assets/create-permissioned-domain-1.68491cb2e3c9558b278b5e4145cee54375cac137de5e399ed948287eec2f18c5.ac57e6ef.png)

![Created Accounts](https://xrpl.org/assets/create-permissioned-domain-2.4f6121924d7d7bfce10feff4d62ac435a87ce16a7ffaf38670db87e27c89a696.ac57e6ef.png)

![Created Credential](https://xrpl.org/assets/create-permissioned-domain-3.a04352c31543884ada414eae4e2fff5f5ae09b0ccdbe39d28bc1f2a453499985.ac57e6ef.png)

![Created Domain](https://xrpl.org/assets/create-permissioned-domain-4.941666efb60ab922ce77b95cfc34ad840c327e8f1fb72e78e83995988174cf34.ac57e6ef.png)

![Deleted Domain](https://xrpl.org/assets/create-permissioned-domain-5.c7a1fa72af255692000dc0fc838098cca2a5c7f8fe35912cbf09bb53070d1c1c.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=07471605-f631-45de-9b32-60feab6bb186&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=07471605-f631-45de-9b32-60feab6bb186&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ff99242f-581c-4240-8c96-b2e7c105f7b2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ff99242f-581c-4240-8c96-b2e7c105f7b2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=2bcbf3d1-ecb9-4a0e-80f8-eb761d5ded04&bo=1&sid=1ab69f709d9d11f0b98fa592a0410c84&vid=1ab6fcc09d9d11f0ae3bed84405beebd&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Create%20Permissioned%20Domains&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&r=&lt=2940&evt=pageLoad&sv=2&cdb=AQAS&rn=411892)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=33ded1c0-61f9-4165-9591-0345c4405a30&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=33ded1c0-61f9-4165-9591-0345c4405a30&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7486d0f2-7b30-4477-9909-027b743d3c6f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7486d0f2-7b30-4477-9909-027b743d3c6f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a37964bb-1477-43a2-a666-35dcfd20f958&pt=Create%20Permissioned%20Domains&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fjavascript%2Fcompliance%2Fcreate-permissioned-domains&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/javascript/compliance/create-permissioned-domains#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/javascript/compliance/create-permissioned-domains#)
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
- [Resources](https://xrpl.org/docs/tutorials/javascript/compliance/create-permissioned-domains#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/javascript/compliance/create-permissioned-domains#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.4bd424a808fd8acec92380ea44197c66.1759195854904.1759195854904.1759195854904.1&__hssc=78174987.1.1759195854904&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/javascript/compliance/create-permissioned-domains.md)
- [Modular Tutorials](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/modular-tutorials/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.4bd424a808fd8acec92380ea44197c66.1759195854904.1759195854904.1759195854904.1&__hssc=78174987.1.1759195854904&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:31:11.295Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
