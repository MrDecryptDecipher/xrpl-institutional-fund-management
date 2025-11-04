# Health Check
URL: https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/health-check
Section: AB1

## Overview


## Extracted Content
# Health Check

[Source]

The Health Check is a special peer port method for reporting on the health of an individual rippled server. This method is intended for use in automated monitoring to recognize outages and prompt automated or manual interventions such as restarting the server.

`rippled`

This method checks several metrics to see if they are in ranges generally considered healthy. If all metrics are in normal ranges, this method reports that the server is healthy. If any metric is outside normal ranges, this method reports that the server is unhealthy and reports the metric(s) that are unhealthy. Since some metrics may rapidly fluctuate into and out of unhealthy ranges, you should not raise alerts unless the health check fails multiple times in a row.

NoteSince the health check is a peer port method, it is not available when testing the server in stand-alone mode.


## Request Format

To request the Health Check information, make the following HTTP request:

- Protocol: https
- HTTP Method: GET
- Host: (any rippled server, by hostname or IP address)
- Port: (the port number where the rippled server uses the Peer Protocol, typically 51235)
- Path: /health
- Security: Most rippled servers use a self-signed certificate to respond to the request. By default, most tools (including web browsers) flag or block such responses for being untrusted. You must ignore the certificate checking (for example, if using cURL, add the --insecure flag) to display a response from those servers.

`rippled`

`rippled`

`/health`

`rippled`

`--insecure`


## Example Response

- Healthy
- Warning
- Critical

```
HTTP/1.1 200 OK
Server: rippled-1.6.0-b8
Content-Type: application/json
Connection: close
Transfer-Encoding: chunked

{
  "info": {}
}
```


## Response Format

The response's HTTP status code indicates the health of the server:

| Status Code | Health Status | Description |
| --- | --- | --- |
| 200 OK | Healthy | All health metrics are within acceptable ranges. |
| 503 Service Unavailable | Warning | One or more metrics are in the warning range. Manual intervention may or may not be necessary. |
| 500 Internal Server Error | Critical | One or more metrics are in the critical range. There is a serious problem that probably needs manual intervention to fix. |


The response body is a JSON object with a single info object at the top level. The info object contains values for each metric that is in a warning or critical range. The response omits metrics that are in a healthy range, so a fully healthy server has an empty object.

`info`

`info`

The info object may contain the following fields:

`info`

| Field | Value | Description |
| --- | --- | --- |
| amendment_blocked | Boolean | (May be omitted) If true, the server is amendment blocked and must be upgraded to remain synced with the network; this state is critical. If the server is not amendment blocked, this field is omitted. |
| load_factor | Number | (May be omitted) A measure of the overall load the server is under. This reflects I/O, CPU, and memory limitations. This is a warning if the load factor is over 100, or critical if the load factor is 1000 or higher. |
| peers | Number | (May be omitted) The number of peer servers this server is connected to. This is a warning if connected to 7 or fewer peers, and critical if connected to zero peers. |
| server_state | String | (May be omitted) The current server state. This is a warning if the server is in the tracking, syncing, or connected states. This is critical if the server is in the disconnected state. |
| validated_ledger | Number | (May be omitted) The number of seconds since the last time a ledger was validated by consensus. If there is no validated ledger available (as during the initial sync period when starting the server), this is the value -1 and is considered a warning. This metric is also a warning if the last validated ledger was at least 7 seconds ago, or critical if the last validated ledger was at least 20 seconds ago. |


`Field`

`amendment_blocked`

`true`

`load_factor`

`peers`

`server_state`

`tracking`

`syncing`

`connected`

`disconnected`

`validated_ledger`

`-1`


## See Also

For guidance interpreting the results of the health check, see Health Check Interventions.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 1.6.0](https://img.shields.io/badge/New in-rippled 1.6.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ee6cccf8-823c-4e4a-91c1-726de7729e4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ee6cccf8-823c-4e4a-91c1-726de7729e4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b970a20f-3c83-4b3a-a446-4239dfac1320&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b970a20f-3c83-4b3a-a446-4239dfac1320&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=dcff785e-f023-4404-b705-d57882b83163&bo=1&sid=62cf4dc09da911f0a013e773f9aea063&vid=62cfdb709da911f0a1c89d1ee1012b2e&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Health%20Check&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&r=&lt=3700&evt=pageLoad&sv=2&cdb=AQAS&rn=855856)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6c5d16b1-f7a7-45d5-97a8-f2a6244b9cdf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6c5d16b1-f7a7-45d5-97a8-f2a6244b9cdf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=18bdc504-d7fb-4da6-9f02-a13c0fc21e3e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=18bdc504-d7fb-4da6-9f02-a13c0fc21e3e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ca07679d-d1a8-4f64-bff9-bd85d3fe92a4&pt=Health%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fhealth-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/health-check#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/health-check#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/health-check#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/health-check#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/peer-port-methods/health-check.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/de0c52738785de8bf837f9124da65c7905e7bb5a/src/ripple/overlay/impl/OverlayImpl.cpp#L1084-L1168)
- [https://github.com/XRPLF/rippled/releases/tag/1.6.0](https://github.com/XRPLF/rippled/releases/tag/1.6.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:58:57.834Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
