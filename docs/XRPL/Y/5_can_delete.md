# can_delete
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/can_delete
Section: Y5

## Overview


## Extracted Content
# can_delete

[Source]

The can_delete method informs the rippled server of the latest ledger version which may be deleted when using online deletion with advisory deletion enabled. If advisory deletion is not enabled, this method does nothing.

`can_delete`

`rippled`

The can_delete method is an admin method that cannot be run by unprivileged users.

`can_delete`


### Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "command": "can_delete",
  "can_delete": 11320417
}
```

The request accepts the following parameter:

| Field | Type | Description |
| --- | --- | --- |
| can_delete | String or Integer | (Optional) The Ledger Index of the maximum ledger version to allow to be deleted. The special case never disables online deletion. The special case always enables automatic online deletion as if advisory deletion was disabled. The special case now allows online deletion one time at the next validated ledger that meets or exceeds the configured online_delete value. If omitted, the server makes no changes (but still replies with the current can_delete value). |


`Field`

`can_delete`

`never`

`always`

`now`

`online_delete`

`can_delete`


### Response Format

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| can_delete | Integer | The maximum ledger index that may be removed by the online deletion routine. |


`Field`

`can_delete`

Use this command with no parameter to query the existing can_delete setting.

`can_delete`


### Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- lgrNotFound - The ledger specified by the can_delete field of the request does not exist, or it does exist but the server does not have it.
- notEnabled - If either online deletion or advisory deletion are not enabled in the server's configuration.
- notReady - The server is not ready to run online deletion at the moment. This usually means the server has recently started up and has not yet acquired a validated ledger.

`invalidParams`

`lgrNotFound`

`can_delete`

`notEnabled`

`notReady`


## See Also

- Online Deletion
- Configure Advisory Deletion

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf1dcd5e-4e1e-451c-910e-3ca2da4b9885&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf1dcd5e-4e1e-451c-910e-3ca2da4b9885&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ba0baa3-f62b-4415-94b7-fb03550a692e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ba0baa3-f62b-4415-94b7-fb03550a692e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4960342a-23f6-40bc-9b21-93997387e0e0&bo=1&sid=4cc706609da811f0a4885dc240064626&vid=4cc794a09da811f0881ee7dffcb6f539&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=can_delete&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&r=&lt=2346&evt=pageLoad&sv=2&cdb=AQAS&rn=100096)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e207b58-2abf-4971-8483-aeeb453c9323&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e207b58-2abf-4971-8483-aeeb453c9323&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8d3cdd81-82d7-4532-b7ff-3f887c758c1c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8d3cdd81-82d7-4532-b7ff-3f887c758c1c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bb7eddeb-27b8-4545-8003-9df55e68f390&pt=can_delete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Flogging-and-data-management-methods%2Fcan_delete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/can_delete#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/can_delete#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/can_delete#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/can_delete#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.21d2ba0d8c0d89473437149780a6d80f.1759200663005.1759200663005.1759200663005.1&__hssc=78174987.1.1759200663005&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/logging-and-data-management-methods/can_delete.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/CanDelete.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.21d2ba0d8c0d89473437149780a6d80f.1759200663005.1759200663005.1759200663005.1&__hssc=78174987.1.1759200663005&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:51:10.456Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
