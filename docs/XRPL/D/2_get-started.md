# Get Started Using HTTP / WebSocket APIs
URL: https://xrpl.org/docs/tutorials/http-websocket-apis/build-apps/get-started
Section: D2

## Overview


## Extracted Content
# Get Started Using HTTP / WebSocket APIs

If you don't have or don't want to use a client library in your preferred programming language, you can access the XRP Ledger directly through the APIs of its core server software, rippled. The server provides APIs over JSON-RPC and WebSocket protocols. If you don't run your own instance of rippled you can still use a public server.

`rippled`

`rippled`

TipYou can dive right into the API with the WebSocket API Tool, or use the XRP Ledger Explorer to watch the progress of the ledger live.


## Differences Between JSON-RPC and WebSocket

Both JSON-RPC and WebSocket are HTTP-based protocols, and for the most part the data provided over both protocols is the same. The major differences are as follows:

- JSON-RPC uses individual HTTP requests and responses for each call, similar to a RESTful API. You can use any common HTTP client such as curl, Postman, or Requests to access this API.
- WebSocket uses a persistent connection that allows the server to push data to the client. Functions that require push messages, like event subscriptions, are only available using WebSocket.

Both APIs can be served unencrypted (http:// and ws://) or encrypted using TLS (https:// and wss://). Unencrypted connections should not be served over open networks, but can be used when the client is on the same machine as the server.

`http://`

`ws://`

`https://`

`wss://`


## Admin Access

The API methods are divided into Public Methods and Admin Methods so that organizations can offer public servers for the benefit of the community. To access admin methods, or admin functionality of public methods, you must connect to the API on a port and IP address marked as admin in the server's config file.

The example config file listens for connections on the local loopback network (127.0.0.1), with JSON-RPC (HTTP) on port 5005 and WebSocket (WS) on port 6006, and treats all connected clients as admin.


## WebSocket API

If you are looking to try out some methods on the XRP Ledger, you can skip writing your own WebSocket code and go straight to using the API at the WebSocket API Tool. Later on, when you want to connect to your own rippled server, you can build your own client or use a client library with WebSocket support.

`rippled`

Example WebSocket API request:

```
{
  "id": "my_first_request",
  "command": "server_info",
  "api_version": 1
}
```

The response shows you the current status of the server.

Read more: Request Formatting > Response Formatting > About the server_info method >


## JSON-RPC

You can use any HTTP client (like RESTED for Firefox, Postman for Chrome or Online HTTP client ExtendsClass) to make JSON-RPC calls a rippled server. Most programming languages have a library for making HTTP requests built in.

`rippled`

Example JSON-RPC request:

```
POST http://s1.ripple.com:51234/
Content-Type: application/json

{
    "method": "server_info",
    "params": [
        {
            "api_version": 1
        }
    ]
}
```

The response shows you the current status of the server.

Read more: Request Formatting > Response Formatting > About the server_info method >


## Commandline

The commandline interface connects to the same service as the JSON-RPC one, so the public servers and server configuration are the same. By default, the commandline connects to a rippled server running on the same machine.

`rippled`

Example commandline request:

```
rippled --conf=/etc/opt/ripple/rippled.cfg server_info
```

Read more: Commandline Usage Reference >

CautionThe commandline interface is intended for administrative purposes only and is not a supported API.  New versions of rippled may introduce breaking changes to the commandline API without warning!

`rippled`


## Available Methods

For a full list of API methods, see:

- Public rippled Methods: Methods available on public servers, including looking up data from the ledger and submitting transactions.
- Admin rippled Methods: Methods for managing the rippled server.

`rippled`

`rippled`

`rippled`


## See Also

- Concepts:XRP Ledger OverviewClient LibrariesParallel Networks
- XRP Ledger Overview
- Client Libraries
- Parallel Networks
- Tutorials:Get Started Using JavaScriptReliable Transaction SubmissionManage the rippled Server
- Get Started Using JavaScript
- Reliable Transaction Submission
- Manage the rippled Server
- References:rippled API Reference
- rippled API Reference

- XRP Ledger Overview
- Client Libraries
- Parallel Networks

- Get Started Using JavaScript
- Reliable Transaction Submission
- Manage the rippled Server

- rippled API Reference

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bd5712f1-1d20-43e7-9add-013aeaad8a5d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bd5712f1-1d20-43e7-9add-013aeaad8a5d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cccb03e3-661a-4a66-9e04-ce9b32267108&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cccb03e3-661a-4a66-9e04-ce9b32267108&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=b2a9eb55-4676-48c0-86a1-19d0aee18446&bo=1&sid=47e100b09d9d11f084603399fff5eddb&vid=47e16d209d9d11f0b6b4e54a8ed1ba7c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&r=&lt=1761&evt=pageLoad&sv=2&cdb=AQAS&rn=553476)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3c550bf3-0f15-4eab-9855-dd21c1a50da7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3c550bf3-0f15-4eab-9855-dd21c1a50da7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=960704a1-4444-4d73-b72a-bd0ce0c0753f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=960704a1-4444-4d73-b72a-bd0ce0c0753f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16d273c3-f7a4-4dde-8ebe-f760dca78ac1&pt=Get%20Started%20Using%20HTTP%20%2F%20WebSocket%20APIs&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhttp-websocket-apis%2Fbuild-apps%2Fget-started&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/http-websocket-apis/build-apps/get-started#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/http-websocket-apis/build-apps/get-started#)
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
- [Resources](https://xrpl.org/docs/tutorials/http-websocket-apis/build-apps/get-started#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/http-websocket-apis/build-apps/get-started#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2d9654a59240d3a80f5bbec797fc6d3d.1759195931221.1759195931221.1759195931221.1&__hssc=78174987.1.1759195931221&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/http-websocket-apis/build-apps/get-started.md)
- [curl](https://curl.se/)
- [Postman](https://www.postman.com/downloads/)
- [Requests](https://requests.readthedocs.io/)
- [example config file](https://github.com/XRPLF/rippled/blob/f00f263852c472938bf8e993e26c7f96f435935c/cfg/rippled-example.cfg#L1154-L1179)
- [RESTED for Firefox](https://addons.mozilla.org/en-US/firefox/addon/rested/)
- [Postman for Chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
- [Online HTTP client ExtendsClass](https://extendsclass.com/rest-client-online.html)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2d9654a59240d3a80f5bbec797fc6d3d.1759195931221.1759195931221.1759195931221.1&__hssc=78174987.1.1759195931221&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:32:20.728Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
