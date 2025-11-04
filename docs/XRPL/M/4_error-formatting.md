# Error Formatting
URL: https://xrpl.org/docs/references/http-websocket-apis/api-conventions/error-formatting
Section: M4

## Overview


## Extracted Content
# Error Formatting

It is impossible to list all the possible ways an error can occur. Some may occur in the transport layer (for example, loss of network connectivity), in which case the results vary depending on what client and transport you are using. However, if the rippled server successfully receives your request, it tries to respond in a standardized error format.

`rippled`

CautionWhen your request results in an error, the entire request is copied back as part of the response, so that you can try to debug the error. However, this also includes any secrets that were passed as part of the request. When sharing error messages, be very careful not to accidentally expose important account secrets to others.

Some example errors:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 3,
  "status": "error",
  "type": "response",
  "error": "ledgerIndexMalformed",
  "request": {
    "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "command": "account_info",
    "id": 3,
    "ledger_index": "-",
    "strict": true
  }
}
```


## WebSocket Format

| Field | Type | Description |
| --- | --- | --- |
| id | (Varies) | ID provided in the Web Socket request that prompted this response |
| status | String | "error" if the request caused an error |
| type | String | Typically "response", which indicates a successful response to a command. |
| error | String | A unique code for the type of error that occurred |
| request | Object | A copy of the request that prompted this error, in JSON format. Caution: If the request contained any secrets, they are copied here! |
| api_version | Number | (May be omitted) The api_version specified in the request, if any. |


`Field`

`id`

`status`

`"error"`

`type`

`"response"`

`error`

`request`

`api_version`

`api_version`


## JSON-RPC Format

Some JSON-RPC request respond with an error code on the HTTP layer. In these cases, the response is a plain-text explanation in the response body. For example, if you forgot to specify the command in the method parameter, the response is like this:

`method`

```
HTTP Status: 400 Bad Request
Null method
```

For other errors that returned with HTTP status code 200 OK, the responses are formatted in JSON, with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| result | Object | Object containing the response to the query |
| result.error | String | A unique code for the type of error that occurred |
| result.status | String | "error" if the request caused an error |
| result.request | Object | A copy of the request that prompted this error, in JSON format. Caution: If the request contained any account secrets, they are copied here! Note: The request is re-formatted in WebSocket format, regardless of the request made. |


`Field`

`result`

`result.error`

`result.status`

`"error"`

`result.request`


## Universal Errors

All methods can potentially return any of the following values for the error code:

`error`

- amendmentBlocked - The server is amendment blocked and needs to be updated to the latest version to stay synced with the XRP Ledger network.
- failedToForward - (Clio servers only) The server tried to forward this request to a rippled server, but the connection failed.
- invalid_API_version - The server does not support the API version number from the request.
- jsonInvalid - (WebSocket only) The request is not a proper JSON object.JSON-RPC returns a 400 Bad Request HTTP error in this case instead.
- JSON-RPC returns a 400 Bad Request HTTP error in this case instead.
- missingCommand - (WebSocket only) The request did not specify a command field.JSON-RPC returns a 400 Bad Request HTTP error in this case instead.
- JSON-RPC returns a 400 Bad Request HTTP error in this case instead.
- noClosed - The server does not have a closed ledger, typically because it has not finished starting up.
- noCurrent - The server does not know what the current ledger is, due to high load, network problems, validator failures, incorrect configuration, or some other problem.
- noNetwork - The server is having trouble connecting to the rest of the XRP Ledger peer-to-peer network (and is not running in stand-alone mode).
- tooBusy - The server is under too much load to do this command right now. Generally not returned if you are connected as an admin.
- unknownCmd - The request does not contain a command that the rippled server recognizes.
- wsTextRequired - (WebSocket only) The request's opcode is not text.

`amendmentBlocked`

`failedToForward`

`rippled`

`invalid_API_version`

`jsonInvalid`

- JSON-RPC returns a 400 Bad Request HTTP error in this case instead.

`missingCommand`

`command`

- JSON-RPC returns a 400 Bad Request HTTP error in this case instead.

`noClosed`

`noCurrent`

`noNetwork`

`tooBusy`

`unknownCmd`

`rippled`

`wsTextRequired`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6a37259-57df-420d-b6c2-1bbc6e48ce77&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6a37259-57df-420d-b6c2-1bbc6e48ce77&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=749084d9-6b9c-46c0-87c9-a74eedbd5c28&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=749084d9-6b9c-46c0-87c9-a74eedbd5c28&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=0894a4a0-39bb-4c4f-9ec9-526d797ca820&bo=1&sid=e3de2cc09da411f0a434efa557a9a46f&vid=e3deba509da411f0bd98af8630147a19&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Error%20Formatting&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&r=&lt=2096&evt=pageLoad&sv=2&cdb=AQAS&rn=62866)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=26633ea1-7212-4df4-a364-33ae3bc474fd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=26633ea1-7212-4df4-a364-33ae3bc474fd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=00d2ce80-1d1b-42c8-88b5-dcbd0f26470e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=00d2ce80-1d1b-42c8-88b5-dcbd0f26470e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=02de363d-df0b-4dfd-bca7-4f3308ec5910&pt=Error%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Ferror-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/error-formatting#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/error-formatting#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/error-formatting#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/error-formatting#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2d642dc6138cee28fc232ba50557a1e2.1759199198678.1759199198678.1759199198678.1&__hssc=78174987.1.1759199198679&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/api-conventions/error-formatting.md)
- [opcode](https://tools.ietf.org/html/rfc6455#section-5.2)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2d642dc6138cee28fc232ba50557a1e2.1759199198678.1759199198678.1759199198678.1&__hssc=78174987.1.1759199198679&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:26:47.328Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
