# The Clio Server
URL: https://xrpl.org/docs/concepts/networks-and-servers/the-clio-server
Section: B9

## Overview


## Extracted Content
# The Clio Server

Clio is an XRP Ledger API server optimized for WebSocket or HTTP API calls for validated ledger data.

A Clio server does not connect to the peer-to-peer network. Instead, it extracts data from a specified rippled server which is connected to the P2P network. By handling API calls efficiently, Clio servers can help reduce the load on rippled servers running in P2P mode.

`rippled`

`rippled`

Clio stores validated historical ledger and transaction data in a space efficient format, using up to 4 times less space than rippled.  Clio uses Cassandra or ScyllaDB, allowing for scalable read throughput. Multiple Clio servers can share access to the same dataset, thereby enabling you to build a highly available cluster of Clio servers without the need for redundant data storage or computation.

`rippled`

Clio requires access to a rippled server, which can run on the same machine as Clio or separately.

`rippled`

While Clio offers the complete HTTP / WebSocket APIs, by default, it only returns validated data. For any requests that require access to the P2P network, Clio automatically forwards the request to the rippled server on the P2P network and passes the response back.

`rippled`


## Why Should I Run a Clio Server?

There are lots of reasons you might want to run your own Clio server, but most of them can be summarized as: reduced load on rippled server(s) connected to the P2P network, lower memory usage and storage overhead, easier horizontal scaling, and higher throughput for API requests.

`rippled`

- Reduced load on rippled server(s) - A Clio server does not connect to the peer-to-peer network. It uses gRPC to get validated data from one or more trusted rippled servers that are connected to the P2P network. Thus, a Clio server handles requests more efficiently and reduces the load on rippled servers running in P2P mode.
- Lower memory usage and storage overhead - Clio uses Cassandra as a database and stores data in a space efficient format, using up to 4 times less space than rippled.
- Easier horizontal scaling - Multiple Clio servers can share access to the same dataset, thus enabling you to build a highly available cluster of Clio servers.
- Higher throughput for API requests - A Clio server extracts validated data from one or more trusted rippled servers and stores this data efficiently. Thus, handling API calls efficiently, resulting in a higher throughput and in some cases, lower latency as well.

Reduced load on rippled server(s) - A Clio server does not connect to the peer-to-peer network. It uses gRPC to get validated data from one or more trusted rippled servers that are connected to the P2P network. Thus, a Clio server handles requests more efficiently and reduces the load on rippled servers running in P2P mode.

`rippled`

`rippled`

`rippled`

Lower memory usage and storage overhead - Clio uses Cassandra as a database and stores data in a space efficient format, using up to 4 times less space than rippled.

`rippled`

Easier horizontal scaling - Multiple Clio servers can share access to the same dataset, thus enabling you to build a highly available cluster of Clio servers.

Higher throughput for API requests - A Clio server extracts validated data from one or more trusted rippled servers and stores this data efficiently. Thus, handling API calls efficiently, resulting in a higher throughput and in some cases, lower latency as well.

`rippled`


## How does a Clio Server Work?

A Clio server stores validated ledger data such as transaction metadata, account states, and ledger headers in a persistent datastore.

When a Clio server receives an API request, it looks up data from these data stores. For requests that require data from the P2P network, the Clio server forwards the request to a P2P server, and then passes the response back to the client.

Clio will always forward to rippled if any of the following is true:

`rippled`

- ledger_index is set to current or closed.
- accounts, queue or full are set to true for the ledger API.
- queue is set to true for the account_info API.
- Requested API method ("command") is submit, submit_multisigned, fee, ledger_closed, ledger_current, ripple_path_find, manifest, channel_authorize or channel_verify.

`ledger_index`

`current`

`closed`

`accounts`

`queue`

`full`

`true`

`ledger`

`queue`

`true`

`account_info`

`"command"`

`submit`

`submit_multisigned`

`fee`

`ledger_closed`

`ledger_current`

`ripple_path_find`

`manifest`

`channel_authorize`

`channel_verify`


## See Also

- Clio source code
- Tutorials:Install Clio server on Ubuntu
- Install Clio server on Ubuntu

- Install Clio server on Ubuntu

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ba5b70c4-4af3-4646-8376-bb71bb4ff816&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ba5b70c4-4af3-4646-8376-bb71bb4ff816&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cfc6d003-2082-4d14-8830-71086133b98e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cfc6d003-2082-4d14-8830-71086133b98e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=86f6c4cf-e3fc-468b-8fdd-fd2d2fc9bcf5&bo=1&sid=33ce44409d9b11f0b0e1e1d99a0e9da4&vid=33cedc009d9b11f0ba4a5d0649c5b43a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=The%20Clio%20Server&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&r=&lt=2968&evt=pageLoad&sv=2&cdb=AQAS&rn=96274)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ecfec869-a687-4671-a719-3ac192c03f83&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ecfec869-a687-4671-a719-3ac192c03f83&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=623b2ab8-c075-40ca-81c8-4374d9668b15&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=623b2ab8-c075-40ca-81c8-4374d9668b15&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86db50d8-1941-4456-adf7-9cfa64f595b1&pt=The%20Clio%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fthe-clio-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/the-clio-server#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/the-clio-server#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/the-clio-server#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/the-clio-server#)
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
- [Networks and Servers](https://xrpl.org/docs/concepts/networks-and-servers)
- [rippled Server Modes](https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes)
- [Clustering](https://xrpl.org/docs/concepts/networks-and-servers/clustering)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e2eb2f357c1fd01c2290739a24f271da.1759195038577.1759195038577.1759195038577.1&__hssc=78174987.1.1759195038577&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/the-clio-server.md)
- [Clio source code](https://github.com/XRPLF/clio)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e2eb2f357c1fd01c2290739a24f271da.1759195038577.1759195038577.1759195038577.1&__hssc=78174987.1.1759195038577&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:17:26.905Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
