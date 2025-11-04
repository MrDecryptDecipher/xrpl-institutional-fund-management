# Set Maximum Number of Peers
URL: https://xrpl.org/docs/infrastructure/configuration/peering/set-max-number-of-peers
Section: AD24

## Overview


## Extracted Content
# Set Maximum Number of Peers

The rippled server has a configurable soft maximum number of peers to connect to. The default maximum number of peers is 21.

`rippled`

NoteInternally, the server generates approximate quotas of incoming and outgoing peers. You can potentially go over the soft maximum if you are using fixed peers, peer reservations, or if you manually connect to additional peers using the connect method.

To change the maximum number of peers your server allows, complete the following steps:

1. Edit your rippled's config file.$ vim /etc/opt/ripple/rippled.cfgThe recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. In the config file, uncomment and edit the [peers_max] stanza, or add one if you don't have one already:[peers_max]
30The only content of the stanza should be an integer indicating the total number of peers to allow. By default, the server attempts to maintain a ratio of about 85% incoming and 15% outgoing peers, but with a minimum of 10 outgoing peers, so any value less than 68 won't increase the number of outgoing peer connections your server makes.If the [peers_max] value is less than 10, the server still allows a hardcoded minimum of 10 outgoing peers so that it can maintain connectivity with the network. To block all outgoing peer connections, configure the server as a private peer instead.CautionThe more peer servers you are connected to, the more network bandwidth your rippled server uses. You should only configure large numbers of peer servers if your rippled server has a good network connection and you can afford the costs you may incur for the bandwidth it uses.
1. Restart the rippled server.$ sudo systemctl restart rippled.service

Edit your rippled's config file.

`rippled`

```
$ vim /etc/opt/ripple/rippled.cfg
```

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

In the config file, uncomment and edit the [peers_max] stanza, or add one if you don't have one already:

`[peers_max]`

```
[peers_max]
30
```

The only content of the stanza should be an integer indicating the total number of peers to allow. By default, the server attempts to maintain a ratio of about 85% incoming and 15% outgoing peers, but with a minimum of 10 outgoing peers, so any value less than 68 won't increase the number of outgoing peer connections your server makes.

If the [peers_max] value is less than 10, the server still allows a hardcoded minimum of 10 outgoing peers so that it can maintain connectivity with the network. To block all outgoing peer connections, configure the server as a private peer instead.

`[peers_max]`

CautionThe more peer servers you are connected to, the more network bandwidth your rippled server uses. You should only configure large numbers of peer servers if your rippled server has a good network connection and you can afford the costs you may incur for the bandwidth it uses.

`rippled`

`rippled`

Restart the rippled server.

`rippled`

```
$ sudo systemctl restart rippled.service
```


## See Also

- Concepts:Peer ProtocolThe rippled Server
- Peer Protocol
- The rippled Server
- Tutorials:Capacity PlanningTroubleshoot the rippled Server
- Capacity Planning
- Troubleshoot the rippled Server
- References:connect methodpeers methodprint methodserver_info method
- connect method
- peers method
- print method
- server_info method

- Peer Protocol
- The rippled Server

`rippled`

- Capacity Planning
- Troubleshoot the rippled Server

`rippled`

- connect method
- peers method
- print method
- server_info method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a2dd1a3b-da9d-49cb-a06c-07175628fa21&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a2dd1a3b-da9d-49cb-a06c-07175628fa21&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ba954a01-591a-4f8f-92cf-b0b5fc652575&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ba954a01-591a-4f8f-92cf-b0b5fc652575&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=75b11ad2-3a08-4462-b5cf-57c4134b577e&bo=1&sid=c01c9f009daa11f0a221c1f37cdc18d6&vid=c01d2be09daa11f08930cf888be0a496&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Set%20Maximum%20Number%20of%20Peers&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&r=&lt=3159&evt=pageLoad&sv=2&cdb=AQAS&rn=942211)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=757d2a1f-9bda-4fc9-947d-4fd96fdac65c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=757d2a1f-9bda-4fc9-947d-4fd96fdac65c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4662205f-777d-4de7-8ae1-c3128d8fef56&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4662205f-777d-4de7-8ae1-c3128d8fef56&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ea084aa5-7e52-4770-93cf-83e6b7fbaa43&pt=Set%20Maximum%20Number%20of%20Peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fset-max-number-of-peers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/peering/set-max-number-of-peers#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/peering/set-max-number-of-peers#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/peering/set-max-number-of-peers#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/peering/set-max-number-of-peers#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/peering/set-max-number-of-peers.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:08:44.152Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
