# ledger_cleaner
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_cleaner
Section: Y6

## Overview


## Extracted Content
# ledger_cleaner

[Source]

The ledger_cleaner command controls the Ledger Cleaner, an asynchronous maintenance process that can find and repair corruption in rippled's database of ledgers.

`ledger_cleaner`

`rippled`

The ledger_cleaner method is an admin method that cannot be run by unprivileged users.

`ledger_cleaner`


### Request Format

An example of the request format:

- WebSocket

```
{
    "command": "ledger_cleaner",
    "max_ledger": 13818756,
    "min_ledger": 13818000,
    "stop": false
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| ledger | Number - Ledger Index | (Optional) If provided, check and correct the specified ledger only. |
| max_ledger | Number - Ledger Index | (Optional) Configure the ledger cleaner to check ledgers with ledger indexes equal or lower than this. |
| min_ledger | Number - Ledger Index | (Optional) Configure the ledger cleaner to check ledgers with ledger indexes equal or higher than this. |
| full | Boolean | (Optional) If true, fix ledger state objects and transactions in the specified ledger(s). Defaults to false. Automatically set to true if ledger is provided. |
| fix_txns | Boolean | (Optional) If true, correct transaction in the specified ledger(s). Overrides full if provided. |
| check_nodes | Boolean | (Optional) If true, correct ledger state objects in the specified ledger(s). Overrides full if provided. |
| stop | Boolean | (Optional) If true, disable the ledger cleaner. |


`Field`

`ledger`

`max_ledger`

`min_ledger`

`full`

`true`

`ledger`

`fix_txns`

`full`

`check_nodes`

`full`

`stop`


### Response Format

An example of a successful response:

- JSON-RPC

```
200 OK

{
   "result" : {
      "message" : "Cleaner configured",
      "status" : "success"
   }
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| message | String | Cleaner configured on success. |


`Field`

`message`

`Cleaner configured`


### Possible Errors

- Any of the universal error types.
- internal if one the parameters is specified incorrectly. (This is a bug; the intended error code is invalidParams.)

`internal`

`invalidParams`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bd69a855-9c92-4323-86e2-f42d71084a81&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bd69a855-9c92-4323-86e2-f42d71084a81&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=96e8d3af-7a7a-456c-9566-a11e4bb85cb4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=96e8d3af-7a7a-456c-9566-a11e4bb85cb4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=7663cbd0-f8f0-4431-80f3-27fb14443b6a&bo=1&sid=56a1b8709da811f09c8633f129ad2ab7&vid=56a228009da811f0bf879d3078f1889a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=ledger_cleaner&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&r=&lt=3296&evt=pageLoad&sv=2&cdb=AQAS&rn=892068)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c9bc6fe4-ae82-4cbc-b6c8-bb0d4a39818b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c9bc6fe4-ae82-4cbc-b6c8-bb0d4a39818b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c80b3dcf-07e9-4a7c-b1b9-153c0a4c7cf5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c80b3dcf-07e9-4a7c-b1b9-153c0a4c7cf5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=96ebf15f-0452-4bac-9bbe-c69bfddcc648&pt=ledger_cleaner&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_cleaner&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_cleaner#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_cleaner#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_cleaner#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_cleaner#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.dc92966942766a658c2619742c7124fb.1759200678433.1759200678433.1759200678433.1&__hssc=78174987.1.1759200678433&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_cleaner.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/df54b47cd0957a31837493cd69e4d9aade0b5055/src/ripple/rpc/handlers/LedgerCleaner.cpp)
- [Ledger Cleaner](https://github.com/XRPLF/rippled/blob/f313caaa73b0ac89e793195dcc2a5001786f916f/src/ripple/app/ledger/README.md#the-ledger-cleaner)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.dc92966942766a658c2619742c7124fb.1759200678433.1759200678433.1759200678433.1&__hssc=78174987.1.1759200678433&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:51:26.668Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
