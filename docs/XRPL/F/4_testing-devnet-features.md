# Test Pre-Release Transaction Types
URL: https://xrpl.org/docs/tutorials/how-tos/testing-devnet-features
Section: F4

## Overview


## Extracted Content
# Test Pre-Release Transaction Types

(Requires cloning and modifying XRPL core repositories and understanding of XRPL transaction serialization).

Pre-release transactions are amendments that represent new features or other changes to transaction processing. Features are typically released to the XRPL Devnet for early testing.

This guide walks through the steps to test transaction types in development using either JavaScript with xrpl.js or Python with xrpl-py. This approach is typically only necessary for pre-release amendments that are available on the XRPL Devnet for early testing.

`xrpl.js`

`xrpl-py`

Note: The code samples below illustrate how to prepare your development environment and modify the XRPL to support custom transaction types, using the respective client library.


## Prerequisites

- Basic understanding of XRPL transactions.
- Development environment setup for JavaScript or Python.
- Docker installed and configured.


## Steps


### 1. Set Up Your Development Environment

Ensure the proper dependencies are installed for Node.js or Python.

- JavaScript
- Python

```
npm install xrpl
```


### 2. Generate Definitions File

Utilize the server_definitions command to retrieve the definitions.json content.

NoteAny parallel test network may be used instead of Devnet.

- Linux
- Mac
- Windows (Cmd)
- Windows (PowerShell)

```
curl -X POST https://s.devnet.rippletest.net:51234/ -H 'Content-Type: application/json' -d '{"method": "server_definitions"}' > definitions.json
```


### 3. Update XRPL Library Definitions

Copy the generated definitions.json to your XRPL library installation.

`definitions.json`

- JavaScript
- Python

```
// Locate your ripple-binary-codec installation in node_modules and replace the definitions.json file.
// <_your project directory_>/node_modules/ripple-binary-codec/dist/definitions.json
```


### 4. Create and Submit Custom Transaction

- JavaScript
- Python

```
const { Client, Wallet } = require('xrpl');
const { encode } = require('ripple-binary-codec');

async function main() {
  const client = new Client("wss://s.devnet.rippletest.net:51233");
  await client.connect();

  const wallet = Wallet.fromSeed('sYOURSEEDHERE');

  const customTx = {
    TransactionType: 'NewTransactionType',
    Account: wallet.address,
    // additional fields for the new transaction
  };

  // If using Typescript, you will need to encode to allow typechecks to function
  // or just us @ts-expect-error when calling submit
  //   const encodedTransaction = encode(customTx);

  await client.submitAndWait(customTx, { wallet });
  // If using typescript, you should pass the encoded string of the transaction or us @ts-expect-error
  //   await client.submitAndWait(encodedTransaction, { wallet });
  // await client.disconnect();
}

main();
// Or call await main(); if your nodejs versions supports top level await
```


### Considerations

- Testing: Utilize the XRPL Testnet or Devnet for testing new transaction types.
- Updates: Regularly update your rippled and XRPL library clones to include the latest features and fixes.
- Custom Types and Serialization: If your transaction involves new data structures, ensure they are correctly defined and serialized according to XRPL standards.

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c16d67ea-0985-4d04-8b5e-8033df1770ab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c16d67ea-0985-4d04-8b5e-8033df1770ab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d4b3969e-e740-4ab8-bc90-08ee5896169b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d4b3969e-e740-4ab8-bc90-08ee5896169b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ef94618f-a1fe-4d3d-b0c5-cbc207818039&bo=1&sid=541357f09d9f11f09e557b0d28074a1e&vid=541401909d9f11f0a59b3f8e4f730a86&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Test%20Pre-Release%20Transaction%20Types&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&r=&lt=1922&evt=pageLoad&sv=2&cdb=AQAS&rn=597840)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=feeb68e6-e8d9-4728-ada3-d8a114876590&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=feeb68e6-e8d9-4728-ada3-d8a114876590&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=34686dfd-a909-494a-a310-b757e046513c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=34686dfd-a909-494a-a310-b757e046513c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb647708-6ee2-42b2-aa20-88108f3db7f4&pt=Test%20Pre-Release%20Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Ftesting-devnet-features&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/testing-devnet-features#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/testing-devnet-features#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/testing-devnet-features#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/testing-devnet-features#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/testing-devnet-features.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:47:32.571Z
Agent: Qoder + Playwright MCP
Retries: 1
Status: SUCCESS
