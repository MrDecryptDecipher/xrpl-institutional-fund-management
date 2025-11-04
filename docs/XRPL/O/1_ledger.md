# ledger
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger
Section: O1

## Overview


## Extracted Content
# ledger

[Source]

Retrieve information about the public ledger.


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "example_ledger_req",
    "command": "ledger",
    "ledger_index": "validated",
    "transactions": false,
    "expand": false,
    "owner_funds": false
}
```

The request can contain the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| ledger_hash | Hash | No | A 32-byte hex string for the ledger version to use. (See Specifying Ledgers). |
| ledger_index | Ledger Index | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| transactions | Boolean | No | If true, return information on transactions in the specified ledger version. The default is false. Ignored if you did not specify a ledger version. |
| expand | Boolean | No | Provide full JSON-formatted information for transaction/account information instead of only hashes. The default is false. Ignored unless you request transactions, accounts, or both. |
| owner_funds | Boolean | No | If true, include owner_funds field in the metadata of OfferCreate transactions in the response. The default is false. Ignored unless transactions are included and expand is true. |
| binary | Boolean | No | If true, and transactions and expand are both also true, return transaction information in binary format (hexadecimal string) instead of JSON format. |
| queue | Boolean | No | If true, and the command is requesting the current ledger, includes an array of queued transactions in the results. |


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

`queue`

`true`

`current`

The ledger field is deprecated and may be removed without further notice. The full, accounts, and type fields (admin-only) are also deprecated; the Clio server does not implement these parameters.

`ledger`

`full`

`accounts`

`type`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "example_ledger_req",
    "result": {
      "ledger": {
        "account_hash": "B8B2C0C3F9E75E3AEE31D467B2544AB56244E618890BA58679707D6BFC0AF41D",
        "close_flags": 0,
        "close_time": 752188602,
        "close_time_human": "2023-Nov-01 21:16:42.000000000 UTC",
        "close_time_resolution": 10,
        "closed": true,
        "ledger_hash": "1BEECD5D21592EABDEF98D8E4BC038AD10B5700FF7E98011870DF5D6C2A2F39B",
        "ledger_index": "83626901",
        "parent_close_time": 752188601,
        "parent_hash": "6B32CFC42B32C5FB90019AE17F701D96B499A4C8E148A002E18135A434A19D98",
        "total_coins": "99988256314388830",
        "transaction_hash": "21586C664DC47E12AF34F22EBF1DB55D23F8C98972542BAC0C39B1009CAC84D4"
      },
      "ledger_hash": "1BEECD5D21592EABDEF98D8E4BC038AD10B5700FF7E98011870DF5D6C2A2F39B",
      "ledger_index": 83626901,
      "validated": true
    },
    "status": "success",
    "type": "response"
}
```

The response follows the standard format, with a successful result containing information about the ledger, including the following fields:

| Field | Type | Description |
| --- | --- | --- |
| ledger | Object | The complete ledger header data of this ledger, with some additional fields added for convenience. |
| ledger.account_hash | String | Hash of all account state information in this ledger, as hexadecimal. |
| ledger.close_flags | Number | A bit-map of flags relating to the closing of this ledger. |
| ledger.close_time | Number | The time this ledger was closed, in seconds since the Ripple Epoch. |
| ledger.close_time_human | String | The time this ledger was closed, in human-readable format. Always uses the UTC time zone. |
| ledger.close_time_resolution | Number | Ledger close times are rounded to within this many seconds. |
| ledger.closed | Boolean | Whether or not this ledger has been closed. |
| ledger.ledger_hash | String | Unique identifying hash of the entire ledger. |
| ledger.ledger_index | API v1: String  API v2: Number | The Ledger Index of this ledger. |
| ledger.parent_close_time | Number | The time at which the previous ledger was closed. |
| ledger.parent_hash | String | The unique identifying hash of the ledger that came immediately before this one, as hexadecimal. |
| ledger.total_coins | String | Total number of XRP drops in the network, as a quoted integer. (This decreases as transaction costs destroy XRP.) |
| ledger.transaction_hash | String | Hash of the transaction information included in this ledger. |
| ledger.transactions | Array | (Omitted unless requested) Transactions applied in this ledger version. By default, members are the transactions' identifying Hash strings. If the request specified expand as true, members are full representations of the transactions instead, in either JSON or binary depending on whether the request specified binary as true. |
| ledger_hash | String | The unique identifying hash of the entire ledger, as hexadecimal. |
| ledger_index | Number | The Ledger Index of this ledger. |
| validated | Boolean | (May be omitted) If true, this is a validated ledger version. If omitted or set to false, this ledger's data is not final. |
| queue_data | Array | (Omitted unless requested with the queue parameter) Array of objects describing queued transactions, in the same order as the queue. If the request specified expand as true, members contain full representations of the transactions, in either JSON or binary depending on whether the request specified binary as true. |


`Field`

`ledger`

`ledger.account_hash`

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

`queue_data`

`queue`

`expand`

`binary`

The ledger.accountState field (omitted unless requested with "full": true or "accounts": true) is deprecated.

`ledger.accountState`

`"full": true`

`"accounts": true`

The following deprecated fields have been removed: accepted, hash (use ledger_hash instead), seqNum (use ledger_index instead), totalCoins (use total_coins instead).

`accepted`

`hash`

`ledger_hash`

`seqNum`

`ledger_index`

`totalCoins`

`total_coins`

Each member of the queue_data array represents one transaction in the queue. Some fields of this object may be omitted because they have not yet been calculated. The fields of this object are as follows:

`queue_data`

| Field | Value | Description |
| --- | --- | --- |
| account | String | The Address of the sender for this queued transaction. |
| tx | String or Object | By default, this is a String containing the identifying hash of the transaction. If transactions are expanded in binary format, this is an object whose only field is tx_blob, containing the binary form of the transaction as a decimal string. If transactions are expanded in JSON format, this is an object containing the transaction object including the transaction's identifying hash in the hash field. |
| retries_remaining | Number | How many times this transaction can be retried before being dropped. |
| preflight_result | String | The tentative result from preliminary transaction checking. This is always tesSUCCESS. |
| last_result | String | (May be omitted) If this transaction was left in the queue after getting a retriable (ter) result, this is the exact ter result code it got. |
| auth_change | Boolean | (May be omitted) Whether this transaction changes this address's ways of authorizing transactions. |
| fee | String | (May be omitted) The Transaction Cost of this transaction, in drops of XRP. |
| fee_level | String | (May be omitted) The transaction cost of this transaction, relative to the minimum cost for this type of transaction, in fee levels. |
| max_spend_drops | String | (May be omitted) The maximum amount of XRP, in drops, this transaction could potentially send or destroy. |


`account`

`tx`

`tx_blob`

`hash`

`retries_remaining`

`preflight_result`

`tesSUCCESS`

`last_result`

`ter`

`ter`

`auth_change`

`fee`

`fee_level`

`max_spend_drops`

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


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.
- noPermission - If you specified full or accounts as true, but are not connected to the server as an admin (usually, admin requires connecting on localhost).

`invalidParams`

`lgrNotFound`

`ledger_hash`

`ledger_index`

`noPermission`

`full`

`accounts`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.12.0](https://img.shields.io/badge/Updated in-rippled 1.12.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=34a3d798-0a96-4efa-a827-1769aaa90adf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=34a3d798-0a96-4efa-a827-1769aaa90adf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ddcdd82d-a827-49ca-ad9c-37909befb367&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ddcdd82d-a827-49ca-ad9c-37909befb367&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=3773da0b-17a6-42ee-a7c8-26715b44c38f&bo=1&sid=c0c49a809da511f0ad68597d92be1923&vid=c0c522e09da511f09c8543e1059d94d9&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=ledger&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&r=&lt=2771&evt=pageLoad&sv=2&cdb=AQAS&rn=146423)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=da1fde5f-10e1-4d62-898b-08aec89eaf79&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=da1fde5f-10e1-4d62-898b-08aec89eaf79&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ab8b9a6e-61a1-475f-adba-1e87f75530e7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ab8b9a6e-61a1-475f-adba-1e87f75530e7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=270f107d-75b8-4820-ac93-60dd37a22682&pt=ledger&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f34410547d2b95b87d1360bdcee9cd72.1759199567770.1759199567770.1759199567770.1&__hssc=78174987.1.1759199567770&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/LedgerHandler.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.12.0](https://github.com/XRPLF/rippled/releases/tag/1.12.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f34410547d2b95b87d1360bdcee9cd72.1759199567770.1759199567770.1759199567770.1&__hssc=78174987.1.1759199567770&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:33:01.585Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
