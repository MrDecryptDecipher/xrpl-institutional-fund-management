# rippled Server States
URL: https://xrpl.org/docs/references/http-websocket-apis/api-conventions/rippled-server-states
Section: M7

## Overview


## Extracted Content
# rippled Server States

Depending on how the rippled server is configured, how long it has been running, and other factors, a server may be participating in the global XRP Ledger peer-to-peer network to different degrees. This is represented as the server_state field in the responses to the server_info method and server_state method. The possible responses follow a range of ascending interaction, with each later value superseding the previous one. Their definitions are as follows (in order of increasing priority):

`rippled`

`server_state`

| Value | Description |
| --- | --- |
| disconnected | The server is not connected to the XRP Ledger peer-to-peer network whatsoever. It may be running in offline mode, or it may not be able to access the network for whatever reason. |
| connected | The server believes it is connected to the network. |
| syncing | The server is currently behind on ledger versions. (It is normal for a server to spend a few minutes catching up after you start it.) |
| tracking | The server is in agreement with the network |
| full | The server is fully caught-up with the network and could participate in validation, but is not doing so (possibly because it has not been configured as a validator). |
| validating | The server is currently participating in validation of the ledger |
| proposing | The server is participating in validation of the ledger and currently proposing its own version. |


`Value`

`disconnected`

`connected`

`syncing`

`tracking`

`full`

`validating`

`proposing`

NoteThe distinction between full, validating, and proposing is based on synchronization with the rest of the global network, and it is normal for a server to fluctuate between these states as a course of general operation.

`full`

`validating`

`proposing`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=941a93a6-4d90-466d-a173-8d10bbb6c107&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=941a93a6-4d90-466d-a173-8d10bbb6c107&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ebf36a4f-66bc-40cd-bdc7-a0c881e307c4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ebf36a4f-66bc-40cd-bdc7-a0c881e307c4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=96757478-57ce-4667-b263-cab72cc25c2e&bo=1&sid=069751c09da511f08b48eb78454ddb32&vid=0697b9309da511f0bd4b4f527bdcd468&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=rippled%20Server%20States&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&r=&lt=4791&evt=pageLoad&sv=2&cdb=AQAS&rn=109129)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f5dc4d3a-058c-4dc5-b864-02972c53fe11&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f5dc4d3a-058c-4dc5-b864-02972c53fe11&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b341b56e-28b3-4d0a-8f8a-513c48e52e2d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b341b56e-28b3-4d0a-8f8a-513c48e52e2d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66c4c81b-a6c2-4352-bb0f-eedcac7bbe7f&pt=rippled%20Server%20States&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Frippled-server-states&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/rippled-server-states#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/rippled-server-states#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/rippled-server-states#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/rippled-server-states#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/api-conventions/rippled-server-states.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:27:42.506Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
