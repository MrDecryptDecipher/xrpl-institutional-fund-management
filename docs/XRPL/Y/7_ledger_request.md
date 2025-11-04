# ledger_request
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_request
Section: Y7

## Overview


## Extracted Content
# ledger_request

[Source]

The ledger_request command tells server to fetch a specific ledger version from its connected peers. This only works if one of the server's immediately-connected peers has that ledger. You may need to run the command several times to completely fetch a ledger.

`ledger_request`

The ledger_request method is an admin method that cannot be run by unprivileged users!

`ledger_request`


### Request Format

An example of the request format:

- WebSocket
- Commandline

```
{
    "id": 102,
    "command": "ledger_request",
    "ledger_index": 13800000
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| ledger_index | Number | (Optional) Retrieve the specified ledger by its Ledger Index. |
| ledger_hash | String | (Optional) Retrieve the specified ledger by its identifying Hash. |


`Field`

`ledger_index`

`ledger_hash`

You must provide either ledger_index or ledger_hash but not both.

`ledger_index`

`ledger_hash`


### Response Format

The response follows the standard format. However, the request returns a failure response if it does not have the specified ledger even if it successfully instructed the rippled server to start retrieving the ledger.

`rippled`

NoteTo retrieve a ledger, the rippled server must have a direct peer with that ledger in its history. If none of the peers have the requested ledger, you can use the connect method or the fixed_ips section of the config file to add Ripple's full-history server at s2.ripple.com and then make the ledger_request request again.

`fixed_ips`

`s2.ripple.com`

`ledger_request`

A failure response indicates the status of fetching the ledger. A successful response contains the information for the ledger in a similar format to the ledger method.

- Commandline (failure)
- Commandline (in-progress)
- MoreCommandline (success)
- Commandline (success)

- Commandline (success)

```
Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005

{
   "result" : {
      "acquiring" : {
         "hash" : "01DDD89B6605E20338B8EEB8EB2B0E0DD2F685A2B164F3790C4D634B5734CC26",
         "have_header" : false,
         "peers" : 2,
         "timeouts" : 0
      },
      "error" : "lgrNotFound",
      "error_code" : 20,
      "error_message" : "acquiring ledger containing requested index",
      "request" : {
         "command" : "ledger_request",
         "ledger_index" : 18851277
      },
      "status" : "error"
   }
}
```

The three possible response formats are as follows:

1. When returning a lgrNotFound error, the response has a field, acquiring with a Ledger Request Object indicating the progress of fetching the ledger from the peer-to-peer network.
1. When the response shows the server is currently fetching the ledger, the body of the result is a Ledger Request Object indicating the progress of fetching the ledger from the peer-to-peer network.
1. When the ledger is fully available, the response is a representation of the ledger header.

`lgrNotFound`

`acquiring`


### Ledger Request Object

When the server is in the progress of fetching a ledger, but has not yet finished, the rippled server returns a ledger request object indicating its progress towards fetching the ledger. This object has the following fields:

`rippled`

| Field | Type | Description |
| --- | --- | --- |
| hash | String | (May be omitted) The Hash of the requested ledger, if the server knows it. |
| have_header | Boolean | Whether the server has the header section of the requested ledger. |
| have_state | Boolean | (May be omitted) Whether the server has the full state data of the requested ledger. |
| have_transactions | Boolean | (May be omitted) Whether the server has the full transaction set of the requested ledger. |
| needed_state_hashes | Array of Strings | (May be omitted) Up to 16 hashes of objects in the state data that the server still needs to retrieve. |
| needed_transaction_hashes | Array of Strings | (May be omitted) Up to 16 hashes of objects in the transaction set that the server still needs to retrieve. |
| peers | Number | How many peers the server is querying to find this ledger. |
| timeouts | Number | Number of times fetching this ledger has timed out so far. |


`Field`

`hash`

`have_header`

`have_state`

`have_transactions`

`needed_state_hashes`

`needed_transaction_hashes`

`peers`

`timeouts`


### Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing. This error can also occur if you specify a ledger index equal or higher than the current in-progress ledger.
- lgrNotFound - If the ledger is not yet available. This indicates that the server has started fetching the ledger, although it may fail if none of its connected peers have the requested ledger. (Previously, this error used the code ledgerNotFound instead.)

`invalidParams`

`lgrNotFound`

`ledgerNotFound`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 0.30.1](https://img.shields.io/badge/Updated in-rippled 0.30.1-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=62f1142e-b959-4c21-a284-ff14a601a53a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=62f1142e-b959-4c21-a284-ff14a601a53a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=424efa4a-0670-42aa-b41c-4d9c22137828&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=424efa4a-0670-42aa-b41c-4d9c22137828&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=70fe013e-42a4-4794-aad8-46f274427b2b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=70fe013e-42a4-4794-aad8-46f274427b2b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e7e78f49-d7c8-434c-a36b-7c3914519d1c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e7e78f49-d7c8-434c-a36b-7c3914519d1c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3775d278-ee93-466f-99ae-c439b332e93b&pt=ledger_request&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=49e32ee5-dba5-4b60-a830-586bb5570a4a&bo=1&sid=61d500109da811f0885ef30cb976c37b&vid=61d594909da811f08ab2ff763de6eb30&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=ledger_request&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fledger_request&r=&lt=3388&evt=pageLoad&sv=2&cdb=AQAS&rn=478272)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_request#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_request#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_request#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_request#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/ledger_request.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/e980e69eca9ea843d200773eb1f43abe3848f1a0/src/ripple/rpc/handlers/LedgerRequest.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/0.30.1](https://github.com/XRPLF/rippled/releases/tag/0.30.1)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:51:46.368Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
