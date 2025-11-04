# rippled Server Modes
URL: https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes
Section: B2

## Overview


## Extracted Content
# rippled Server Modes

The rippled server software can run in several modes depending on its configuration, including:

`rippled`

- P2P Mode - This is the main mode of the server: it follows the peer-to-peer network, processes transactions, and maintains some amount of ledger history. This mode can be configured to do any or all of the following roles:Validator - Helps secure the network by participating in consensus.API Server - Provides API access to read data from the shared ledger, submit transactions, and watch activity in the ledger. Optionally, this can be a Full History Server, which keeps a complete record of transaction and ledger history.Hub Server - Relays messages between many other members of the peer-to-peer network.
- Validator - Helps secure the network by participating in consensus.
- API Server - Provides API access to read data from the shared ledger, submit transactions, and watch activity in the ledger. Optionally, this can be a Full History Server, which keeps a complete record of transaction and ledger history.
- Hub Server - Relays messages between many other members of the peer-to-peer network.
- Stand-alone mode - An offline mode for testing. Does not connect to the peer-to-peer network or use consensus.

- Validator - Helps secure the network by participating in consensus.
- API Server - Provides API access to read data from the shared ledger, submit transactions, and watch activity in the ledger. Optionally, this can be a Full History Server, which keeps a complete record of transaction and ledger history.
- Hub Server - Relays messages between many other members of the peer-to-peer network.

You can also run the rippled executable as a client application for accessing rippled APIs locally. (Two instances of the same binary can run side-by-side in this case; one as a server, and the other running briefly as a client and then terminating.)

`rippled`

`rippled`

For information on the commands to run rippled in each of these modes, see the Commandline Reference.

`rippled`


## P2P Mode

P2P Mode is the main and default mode of the rippled server, and it can handle almost anything you might want your server to do. These servers form a peer-to-peer network that processes transactions and maintains the shared state of the XRP Ledger. If you want to submit transactions, read ledger data, or otherwise participate in the network, your requests must go through a P2P Mode server at some point.

`rippled`

P2P Mode servers can be further configured to provide additional functionality. A server running in P2P Mode with a minimally-modified config file is also called a stock server. Other configurations include:

- Validator
- API Server
- Public Hubs

P2P Mode servers connect to Mainnet by default.


### API Servers

All P2P Mode servers provide APIs for purposes like submitting transactions, checking balances and settings, and administering the server. If you query the XRP Ledger for data or submit transactions for business use, it can be useful to run your own server.


#### Full History Servers

Unlike some other blockchains, the XRP Ledger does not require servers to have a complete transaction history to know the current state and process new transactions. As a server operator, you decide how much ledger history to store at a time. However, a P2P Mode server can only answer API requests using the ledger history it has locally available. For example, if you keep six months of history, your server can't describe the outcome of a transaction from a year ago. API servers with full history can report all transactions and balances since the start of the XRP Ledger.


### Public Hubs

A hub server is a P2P Mode server with lots of peer protocol connections to other servers. Hub servers, especially public hubs that allow connections from the open internet, help the XRP Ledger network maintain efficient connectivity. Successful public hubs embody the following traits:

- Good bandwidth.
- Connections with a lot of reliable peers.
- Ability to relay messages reliably.

Good bandwidth.

Connections with a lot of reliable peers.

Ability to relay messages reliably.

To configure your server as a hub, increase the maximum number of peers allowed and make sure you've forwarded the appropriate ports through your firewall and NAT (network address translation) router as appropriate.


### Validators

The robustness of the XRP Ledger depends on an interconnected web of validators who each trust some other validators not to collude. In addition to processing each transaction and calculating ledger state exactly like other P2P Mode servers, validators participate actively in the consensus protocol. If you or your organization relies on the XRP Ledger, it is in your interest to contribute to the consensus process by running one server as a validator.

Validation uses only a small amount of computing resources, but there is not much benefit to a single entity or organization running multiple validators because doing so does not provide more protections against collusion. Each validator identifies itself with a unique cryptographic key pair that must be carefully managed; multiple validators must not share a key pair. For these reasons, validation is disabled by default.

You can safely enable validation on a server that is also used for other purposes; this type of configuration is called an all-purpose server. Alternatively, you can run a dedicated validator that does not perform other tasks, possibly in a cluster with other P2P Mode rippled servers.

`rippled`

For more information about running a validator, see Run rippled as a Validator.

`rippled`


## Stand-Alone Mode

In stand-alone mode, the server operates without connecting to the network and participating in the consensus process. Without the consensus process, you have to manually advance the ledger and no distinction is made between "closed" and "validated" ledgers. However, the server still provides API access and processes transactions the same. This enables you to:

- Test the effects of Amendments before those Amendments have gone into effect across the decentralized network.
- Create a new genesis ledger from scratch.
- Load an existing ledger version from disk, then replay specific transactions to re-create their outcomes or test other possibilities.


## See Also

- Tutorials:Configure rippledUse rippled in Stand-Alone Mode
- Configure rippled
- Use rippled in Stand-Alone Mode

- Configure rippled
- Use rippled in Stand-Alone Mode

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=82849f09-7485-4b95-a16f-b814ed2491a2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=82849f09-7485-4b95-a16f-b814ed2491a2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5d1f6c5d-7b73-49eb-ab8f-0d6a1693b5ec&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5d1f6c5d-7b73-49eb-ab8f-0d6a1693b5ec&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=29a00c05-ee15-487c-95ad-3269c55ffed2&bo=1&sid=d726d5709d9a11f08f8fa5dbc62ad5b0&vid=d72759109d9a11f0947ec964844f2055&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=rippled%20Server%20Modes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&r=&lt=4672&evt=pageLoad&sv=2&cdb=AQAS&rn=645102)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=43ac23da-30f5-45b0-9fe6-f50252960c66&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=43ac23da-30f5-45b0-9fe6-f50252960c66&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=750fcecc-5aef-4367-aef0-0bae47a37dc3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=750fcecc-5aef-4367-aef0-0bae47a37dc3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e214b5e4-a099-4a66-aa3f-7180fea05fa1&pt=rippled%20Server%20Modes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Frippled-server-modes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d550cf29972524cff16edc0bb9de6990.1759194883168.1759194883168.1759194883168.1&__hssc=78174987.1.1759194883168&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/rippled-server-modes.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d550cf29972524cff16edc0bb9de6990.1759194883168.1759194883168.1759194883168.1&__hssc=78174987.1.1759194883168&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:14:51.757Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
