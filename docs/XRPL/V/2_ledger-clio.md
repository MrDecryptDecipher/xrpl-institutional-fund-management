# ledger
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/ledger-clio
Section: V2

## Overview


## Extracted Content
# ledger

[Source]

The ledger command retrieves information about the public ledger.

`ledger`

Note that the Clio server returns validated ledger data by default.


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC

```
{
    "id": 14,
    "command": "ledger",
    "ledger_index": "validated",
    "transactions": false,
    "expand": false,
    "owner_funds": false,
    "diff": false
}
```

The request can contain the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| ledger_hash | Hash | (Optional) The unique hash of the ledger version to use. (See Specifying Ledgers). |
| ledger_index | Ledger Index | (Optional) The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| transactions | Boolean | (Optional) If true, return information on transactions in the specified ledger version. Defaults to false. Ignored if you did not specify a ledger version. |
| expand | Boolean | (Optional) Provide full JSON-formatted information for transaction/account information instead of only hashes. Defaults to false. Ignored unless you request transactions. |
| owner_funds | Boolean | (Optional) If true, include owner_funds field in the metadata of OfferCreate transactions in the response. Defaults to false. Ignored unless transactions are included and expand is true. |
| binary | Boolean | (Optional) If true, and transactions and expand are both also true, return transaction information in binary format (hexadecimal string) instead of JSON format. |
| diff | Boolean | (Optional) If true, returns all objects that were added, modified, or deleted as part of applying transactions in the specified ledger. |


`Field`

`ledger_hash`

`ledger_index`

`transactions`

`true`

`false`

`expand`

`false`

`owner_funds`

`true`

`owner_funds`

`false`

`expand`

`binary`

`true`

`transactions`

`expand`

`true`

`diff`

`true`

The ledger field is deprecated and may be removed without further notice.

`ledger`

The ledger command in Clio does not support the following fields:

`ledger`

- accounts
- full
- queue

`accounts`

`full`

`queue`

Clio returns an error when any of the above fields is set to true. (It is OK to include the fields in the request as long as the provided value is false.)

`true`

`false`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- JSON-RPC (with diff)

```
{
  "result": {
    "ledger_hash": "3787026448652A36491493C1202A443B2A6CC6022599BB0B25DDB0802DD7F1E7",
    "ledger_index": 82681623,
    "validated": true,
    "ledger": {
      "account_hash": "39D34D858A0FD652143ED84B67A09193772DE0CCEBD2D63619E679293B7A3388",
      "close_flags": 0,
      "close_time": 748569571,
      "close_time_human": "2023-Sep-20 23:59:31.000000000 UTC",
      "close_time_resolution": 10,
      "closed": true,
      "ledger_hash": "3787026448652A36491493C1202A443B2A6CC6022599BB0B25DDB0802DD7F1E7",
      "ledger_index": "82681623",
      "parent_close_time": 748569570,
      "parent_hash": "674FF6C68956E06CB9628833677C3DD71824C87C0AEFB487984CF98C3964DAEE",
      "total_coins": "99988406188847858",
      "transaction_hash": "11EE9C448D6B07B88A80B4FC7935B485E513816B3B47D0976CE9F51E7CF10A85"
    }
  },
  "status": "success",
  "type": "response",
  "warnings": [
    {
      "id": 2001,
      "message": "This is a clio server. clio only serves validated data. If you want to talk to rippled, include 'ledger_index':'current' in your request"
    }
  ]
}
```

The response follows the standard format, with a successful result containing information about the ledger, including the following fields:

| Field | Type | Description |
| --- | --- | --- |
| ledger | Object | The complete header data of this ledger. |
| ledger.account_hash | String | Hash of all account state information in this ledger, as hex |
| ledger.accountState | Array | (Omitted unless requested) All the account-state information in this ledger. |
| ledger.close_flags | Integer | A bit-map of flags relating to the closing of this ledger. |
| ledger.close_time | Integer | The time this ledger was closed, in seconds since the Ripple Epoch. |
| ledger.close_time_human | String | The time this ledger was closed, in human-readable format. Always uses the UTC time zone. |
| ledger.close_time_resolution | Integer | Ledger close times are rounded to within this many seconds. |
| ledger.closed | Boolean | Whether or not this ledger has been closed. |
| ledger.ledger_hash | String | Unique identifying hash of the entire ledger. |
| ledger.ledger_index | String | The Ledger Index of this ledger, as a quoted integer. |
| ledger.parent_close_time | Integer | The time at which the previous ledger was closed. |
| ledger.parent_hash | String | Unique identifying hash of the ledger that came immediately before this one. |
| ledger.total_coins | String | Total number of XRP drops in the network, as a quoted integer. (This decreases as transaction costs destroy XRP.) |
| ledger.transaction_hash | String | Hash of the transaction information included in this ledger, as hex. |
| ledger.transactions | Array | (Omitted unless requested) Transactions applied in this ledger version. By default, members are the transactions' identifying Hash strings. If the request specified expand as true, members are full representations of the transactions instead, in either JSON or binary depending on whether the request specified binary as true. |
| ledger_hash | String | Unique identifying hash of the entire ledger. |
| ledger_index | Number | The Ledger Index of this ledger. |
| validated | Boolean | (May be omitted) If true, this is a validated ledger version. If omitted or set to false, this ledger's data is not final. |
| diff | Object | (Omitted unless requested with the diff parameter) Object containing an array of hashes that were added, modified, or deleted as part of applying transactions for the ledger. |


`Field`

`ledger`

`ledger.account_hash`

`ledger.accountState`

`ledger.close_flags`

`ledger.close_time`

`ledger.close_time_human`

`ledger.close_time_resolution`

`ledger.closed`

`ledger.ledger_hash`

`ledger.ledger_index`

`ledger.parent_close_time`

`ledger.parent_hash`

`ledger.total_coins`

`ledger.transaction_hash`

`ledger.transactions`

`expand`

`binary`

`ledger_hash`

`ledger_index`

`validated`

`true`

`false`

`diff`

`diff`

If the request specified "owner_funds": true and expanded transactions, the response has a field owner_funds in the metaData object of each OfferCreate transaction. The purpose of this field is to make it easier to track the funding status of offers with each new validated ledger. This field is defined slightly differently than the version of this field in Order Book subscription streams:

`"owner_funds": true`

`owner_funds`

`metaData`

| Field | Value | Description |
| --- | --- | --- |
| owner_funds | String | Numeric amount of the TakerGets currency that the Account sending this OfferCreate transaction has after the execution of all transactions in this ledger. This does not check whether the currency amount is frozen. |


`Field`

`owner_funds`

`TakerGets`

`Account`

If the request specified "diff": true, the response has an object diff. The fields of this object are as follows:

`"diff": true`

`diff`

| Field | Value | Description |
| --- | --- | --- |
| object_id | String | The object identifier. |
| Hashes | Object or Hex String | Depending on whether the request set binary to true or false, this field returns the contents of the object that was created, the new value of an object that was modified, or an empty string if the object was deleted. |


`Field`

`object_id`

`Hashes`

`binary`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.

`invalidParams`

`lgrNotFound`

`ledger_hash`

`ledger_index`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: Clio v1.0.0](https://img.shields.io/badge/New in-Clio v1.0.0-blue.svg)

![Updated in: Clio 2.2.2](https://img.shields.io/badge/Updated in-Clio 2.2.2-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3e40d35c-22d1-48e9-88c1-5ea5568ed131&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3e40d35c-22d1-48e9-88c1-5ea5568ed131&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7bcb0668-5741-4178-9f44-60fa66bdda1a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7bcb0668-5741-4178-9f44-60fa66bdda1a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=09dc7655-5b9f-4ab7-82cc-ab66fb168ac2&bo=1&sid=91adbff09da711f0bc857fd71ee83816&vid=91ae34409da711f0867f436d19c98a98&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=ledger&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&r=&lt=2571&evt=pageLoad&sv=2&cdb=AQAS&rn=660704)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f8252d16-8d79-435b-9a9c-617c7c611ba7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f8252d16-8d79-435b-9a9c-617c7c611ba7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=854b1f0a-d827-4e2c-90f6-01862ee04ebb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=854b1f0a-d827-4e2c-90f6-01862ee04ebb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f6109a4-b415-4674-84db-308e2bd6edfc&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fledger-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/ledger-clio#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/ledger-clio#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/ledger-clio#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/ledger-clio#)
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
- [References](https://xrpl.org/docs/references)
- [XRP Ledger Protocol Reference](https://xrpl.org/docs/references/protocol)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5af18ca1404111792f62bde95a4eda58.1759200347455.1759200347455.1759200347455.1&__hssc=78174987.2.1759200347456&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/clio-methods/ledger-clio.md)
- [[Source]](https://github.com/XRPLF/clio/blob/master/src/rpc/handlers/Ledger.cpp)
- [https://github.com/XRPLF/clio/releases/tag/1.0.0](https://github.com/XRPLF/clio/releases/tag/1.0.0)
- [https://github.com/XRPLF/clio/releases/tag/2.2.2](https://github.com/XRPLF/clio/releases/tag/2.2.2)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5af18ca1404111792f62bde95a4eda58.1759200347455.1759200347455.1759200347455.1&__hssc=78174987.2.1759200347456&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:46:34.529Z
Agent: Qoder + Playwright MCP
Retries: 1
Status: SUCCESS
