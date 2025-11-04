# print
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print
Section: AA5

## Overview


## Extracted Content
# print

[Source]

The print command returns the current status of various internal subsystems, including peers, the ledger cleaner, and the resource manager.

`print`

The print method is an admin method that cannot be run by unprivileged users!

`print`


### Request Format

An example of the request format:

- WebSocket
- Commandline

```
{
    "id": "print_req_1",
    "command": "print"
}
```

The request includes no parameters.


### Response Format

An example of a successful response:

- Commandline

```
Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005

{
   "result" : {
      "app" : {
         "ledgercleaner" : {
            "status" : "idle"
         },
         "peers" : {
            "peerfinder" : {
               "bootcache" : {
                  "entries" : 109
               },
               "config" : {
                  "auto_connect" : "true",
                  "features" : "",
                  "max_peers" : 21,
                  "out_peers" : 10,
                  "port" : 51235,
                  "want_incoming" : "true"
               },
               "counts" : {
                  "accept" : 0,
                  "close" : 0,
                  "cluster" : "0",
                  "connect" : 0,
                  "fixed" : "0",
                  "in" : "0/11",
                  "out" : "10/10",
                  "total" : "10"
               },
               "fixed" : 0,
               "livecache" : {
                  "entries" : [
                     {
                        "address" : "23.239.3.247:51235",
                        "expires" : "30000000000 nanoseconds",
                        "hops" : 2
                     },
                     {
                        "address" : "192.170.145.88:51235",
                        "expires" : "30000000000 nanoseconds",
                        "hops" : 1
                     },
                     {
                        "address" : "198.204.238.130:51235",
                        "expires" : "26000024558 nanoseconds",
                        "hops" : 1
                     },
                     {
                        "address" : "203.127.12.115:51235",
                        "expires" : "26000024558 nanoseconds",
                        "hops" : 2
                     },
                     {
                        "address" : "212.83.147.67:51235",
                        "expires" : "26000024558 nanoseconds",
                        "hops" : 2
                     }
                  ],
                  "hist" : "0, 10, 74, 10, 0, 0, 0, 0",
                  "size" : "94"
               },
               "peers" : [
                  {
                     "local_address" : "10.1.10.78:48923",
                     "remote_address" : "52.24.43.83:51235",
                     "state" : "active"
                  },
                  {
                     "local_address" : "10.1.10.78:50004",
                     "remote_address" : "52.26.205.197:51235",
                     "state" : "active"
                  },
                  {
                     "local_address" : "10.1.10.78:37019",
                     "remote_address" : "168.1.60.132:51235",
                     "state" : "active"
                  },
                  {
                     "local_address" : "10.1.10.78:38775",
                     "remote_address" : "192.170.145.88:51235",
                     "state" : "active"
                  },
                  {
                     "local_address" : "10.1.10.78:34793",
                     "remote_address" : "198.204.238.130:51235",
                     "state" : "active"
                  }
               ]
            }
         },
         "resource" : {
            "admin" : [
               {
                  "balance" : 0,
                  "count" : 1,
                  "name" : "\"127.0.0.1\""
               }
            ],
            "inactive" : [],
            "inbound" : [],
            "outbound" : [
               {
                  "balance" : 23,
                  "count" : 1,
                  "name" : "93.190.138.234:51235"
               },
               {
                  "balance" : 35,
                  "count" : 1,
                  "name" : "198.204.238.130:51235"
               },
               {
                  "balance" : 31,
                  "count" : 1,
                  "name" : "52.26.205.197:51235"
               },
               {
                  "balance" : 32,
                  "count" : 1,
                  "name" : "54.186.73.52:51235"
               },
               {
                  "balance" : 15,
                  "count" : 1,
                  "name" : "72.251.233.164:51235"
               }
            ]
         },
         "server" : {
            "active" : "2",
            "hist" : "16",
            "history" : [
               {
                  "bytes_in" : "214",
                  "bytes_out" : "11688",
                  "elapsed" : "0 seconds",
                  "id" : "16",
                  "requests" : 1,
                  "when" : "2015-Jun-16 16:33:50"
               },
               {
                  "bytes_in" : "214",
                  "bytes_out" : "11431",
                  "elapsed" : "0 seconds",
                  "id" : "15",
                  "requests" : 1,
                  "when" : "2015-Jun-16 16:11:59"
               },
               {
                  "bytes_in" : "227",
                  "bytes_out" : "337",
                  "elapsed" : "0 seconds",
                  "id" : "3",
                  "requests" : 1,
                  "when" : "2015-Jun-16 14:57:23"
               },
               {
                  "bytes_in" : "214",
                  "bytes_out" : "2917",
                  "elapsed" : "0 seconds",
                  "id" : "2",
                  "requests" : 1,
                  "when" : "2015-Jun-16 12:39:29"
               },
               {
                  "bytes_in" : "220",
                  "bytes_out" : "1426",
                  "elapsed" : "0 seconds",
                  "id" : "1",
                  "requests" : 1,
                  "when" : "2015-Jun-16 12:39:13"
               }
            ]
         },
         "validators" : {}
      },
      "status" : "success"
   }
}
```

The response follows the standard format. Additional fields in the result depend on the internal state of the rippled server. The results of this command are subject to change without notice.

`rippled`


### Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1263a894-e882-416f-a3cf-891bcfe07101&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1263a894-e882-416f-a3cf-891bcfe07101&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=31b6e199-80d0-4d82-a923-d19a5c5f9f0d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=31b6e199-80d0-4d82-a923-d19a5c5f9f0d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a5037363-efdd-4207-ba2c-f8d850518f6d&bo=1&sid=36de8f409da911f0829e8dcd40071a0d&vid=36df46709da911f08bbb41625c52f5b8&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=print&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&r=&lt=3523&evt=pageLoad&sv=2&cdb=AQAS&rn=218059)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=acbb363b-c236-4a37-ab1a-dfd08398c366&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=acbb363b-c236-4a37-ab1a-dfd08398c366&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d18c03d-4b71-4cb7-9c97-5db776a516de&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d18c03d-4b71-4cb7-9c97-5db776a516de&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=90415388-3088-440e-a4dd-e4c5842b05bb&pt=print&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fprint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1b15ab1473002dea37de95fe3861e4a5.1759201054079.1759201054079.1759201054079.1&__hssc=78174987.1.1759201054079&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/315a8b6b602798a4cff4d8e1911936011e12abdb/src/ripple/rpc/handlers/Print.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1b15ab1473002dea37de95fe3861e4a5.1759201054079.1759201054079.1759201054079.1&__hssc=78174987.1.1759201054079&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:57:41.861Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
