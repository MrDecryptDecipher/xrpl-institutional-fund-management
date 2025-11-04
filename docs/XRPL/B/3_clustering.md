# Clustering
URL: https://xrpl.org/docs/concepts/networks-and-servers/clustering
Section: B3

## Overview


## Extracted Content
# Clustering

Clustering is a configuration operation for rippled servers that improves efficiency among mutually trusted servers. Clustering should only be used for servers that are located within the same datacenter and are operated by the same organization. Clustering provides the following benefits:

`rippled`

- Clustered servers share the work of cryptography. If one server has verified the authenticity of a message, the other servers in the cluster trust it and do not re-verify.
- Clustered servers share information about peers and API clients that are misbehaving or abusing the network. This makes it harder to attack all servers of the cluster at once.
- Clustered servers always propagate transactions throughout the cluster, even if the transaction does not meet the current load-based transaction fee on some of them.

If you are running a validator as a private peer, it's recommended to run a cluster of servers as proxies, since a cluster is more resilient to failure than individual servers.


## See Also

- Tutorials:Cluster rippled ServersRun rippled as a Validator
- Cluster rippled Servers
- Run rippled as a Validator
- References:peers methodconnect methodPeer Crawler
- peers method
- connect method
- Peer Crawler

- Cluster rippled Servers
- Run rippled as a Validator

`rippled`

- peers method
- connect method
- Peer Crawler

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=de01c75e-45af-4c89-9268-bd4067da18c5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=de01c75e-45af-4c89-9268-bd4067da18c5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5835919a-532b-41a7-956c-ee78ed6a9b24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5835919a-532b-41a7-956c-ee78ed6a9b24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=bb72dfd7-36b5-4579-b61c-2e57813415c1&bo=1&sid=e5ef42009d9a11f08494b37e8e9efb83&vid=e5efd8f09d9a11f0bfc8cb0383b98824&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Clustering&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&r=&lt=4671&evt=pageLoad&sv=2&cdb=AQAS&rn=608108)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63207c71-5a33-4f7c-9d62-0031934a4c4c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63207c71-5a33-4f7c-9d62-0031934a4c4c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a3f1f2c3-3452-4d7f-8a47-6604dfe0e40b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a3f1f2c3-3452-4d7f-8a47-6604dfe0e40b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2015803d-38ba-484d-9268-7a5556841bdf&pt=Clustering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fclustering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/clustering#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/clustering#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/clustering#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/clustering#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.867097abd6bc8a5e0ac532a22c579b8e.1759194908868.1759194908868.1759194908868.1&__hssc=78174987.1.1759194908868&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/clustering.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.867097abd6bc8a5e0ac532a22c579b8e.1759194908868.1759194908868.1759194908868.1&__hssc=78174987.1.1759194908868&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:15:14.328Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
