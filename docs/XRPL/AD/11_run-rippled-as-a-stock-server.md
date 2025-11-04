# Run rippled as a Stock Server
URL: https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-stock-server
Section: AD11

## Overview


## Extracted Content
# Run rippled as a Stock Server

A stock server is a multipurpose configuration for rippled. With a stock server, you can submit transactions to the XRP Ledger, access ledger history, and use the latest tools to integrate with XRP and the XRP Ledger. You can connect client applications to the XRP Ledger using this server.

`rippled`

A stock server does all of the following:

- Connects to a network of peers
- Relays cryptographically signed transactions
- Maintains a local copy of the complete shared global ledger

Connects to a network of peers

Relays cryptographically signed transactions

Maintains a local copy of the complete shared global ledger

To participate in the consensus process as a validator, run rippled as a validator instead.


## Install and run rippled

`rippled`

The default package installation installs a stock server with a small amount of transaction history. For installation steps, see Install rippled.

`rippled`

After installation, you can adjust how much history your server stores at a time. For steps on how to do this, see Configure Online Deletion.


## Troubleshooting

For more information, see Troubleshooting rippled

`rippled`


## See Also

- Concepts:XRP Ledger OverviewThe rippled Server
- XRP Ledger Overview
- The rippled Server
- Tutorials:Cluster rippled ServersInstall rippledCapacity Planning
- Cluster rippled Servers
- Install rippled
- Capacity Planning
- References:Validator Keys Tool Guideconsensus_info methodvalidator_list_sites methodvalidators method
- Validator Keys Tool Guide
- consensus_info method
- validator_list_sites method
- validators method

- XRP Ledger Overview
- The rippled Server

`rippled`

- Cluster rippled Servers
- Install rippled
- Capacity Planning

`rippled`

- Validator Keys Tool Guide
- consensus_info method
- validator_list_sites method
- validators method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3dd38cd4-4176-4a84-b335-8b1a06818a36&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3dd38cd4-4176-4a84-b335-8b1a06818a36&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=076831ae-a404-4bce-8c35-328d584f6ae2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=076831ae-a404-4bce-8c35-328d584f6ae2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=62f3cd8a-493d-44ca-9191-760cd875e218&bo=1&sid=2223fd409daa11f085bf61d8ba3f406d&vid=22249f109daa11f09abcf9a4c9771b90&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Run%20rippled%20as%20a%20Stock%20Server&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&r=&lt=2792&evt=pageLoad&sv=2&cdb=AQAS&rn=825730)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dae253de-3d8a-4721-bf28-b122122ecf83&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dae253de-3d8a-4721-bf28-b122122ecf83&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=be3c785d-ae4d-4537-9d42-f791281bfaac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=be3c785d-ae4d-4537-9d42-f791281bfaac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6598466b-0d86-4aa4-8e46-954ffcd4cbb1&pt=Run%20rippled%20as%20a%20Stock%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-stock-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-stock-server#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-stock-server#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-stock-server#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-stock-server#)
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
- [Infrastructure](https://xrpl.org/docs/infrastructure)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a183b4e425c1ea0e173322a1c474ce3f.1759201450931.1759201450931.1759201450931.1&__hssc=78174987.1.1759201450931&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/server-modes/run-rippled-as-a-stock-server.md)
- [Validator Keys Tool Guide](https://github.com/ripple/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a183b4e425c1ea0e173322a1c474ce3f.1759201450931.1759201450931.1759201450931.1&__hssc=78174987.1.1759201450931&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:04:19.429Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
