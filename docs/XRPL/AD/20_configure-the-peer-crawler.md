# Configure the Peer Crawler
URL: https://xrpl.org/docs/infrastructure/configuration/peering/configure-the-peer-crawler
Section: AD20

## Overview


## Extracted Content
# Configure the Peer Crawler

By default, rippled servers provide statistics publicly to anyone who asks using the peer crawler API, to make it easier to track the health and topology of the XRP Ledger's peer-to-peer network. You can configure your server to provide more or less information, or to reject peer crawler requests entirely.

`rippled`

This document contains steps for two options:

- Change the Information Reported by the Peer Crawler
- Disable the Peer Crawler


## Change the Information Reported by the Peer Crawler

To configure how much information your server provides in response to peer crawler requests, complete the following steps:

1. Edit your rippled's config file.vim /etc/opt/ripple/rippled.cfgThe recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Add or update the [crawl] stanza in your config file, and save the changes:[crawl]
overlay = 1
server = 1
counts = 0
unl = 1The fields in this stanza control which fields the server returns in the peer crawler response. The names of the config fields match the fields of the API response. A setting with a value of 1 means to include the field in the response. A value of 0 means to omit that field from the response. This example shows the default values for each setting.
1. After saving the changes to the config file, restart your rippled server to apply the updated configuration:systemctl restart rippled

Edit your rippled's config file.

`rippled`

```
vim /etc/opt/ripple/rippled.cfg
```

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Add or update the [crawl] stanza in your config file, and save the changes:

`[crawl]`

```
[crawl]
overlay = 1
server = 1
counts = 0
unl = 1
```

The fields in this stanza control which fields the server returns in the peer crawler response. The names of the config fields match the fields of the API response. A setting with a value of 1 means to include the field in the response. A value of 0 means to omit that field from the response. This example shows the default values for each setting.

`1`

`0`

After saving the changes to the config file, restart your rippled server to apply the updated configuration:

`rippled`

```
systemctl restart rippled
```


## Disable the Peer Crawler

To disable the peer crawler API on your server, so it does not respond to peer crawler requests at all, complete the following steps:

1. Edit your rippled's config file.vim /etc/opt/ripple/rippled.cfgThe recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Add or update the [crawl] stanza in your config file, and save the changes:[crawl]
0Remove or comment out all other contents of the crawl stanza.
1. After saving the changes to the config file, restart your rippled server to apply the updated configuration:systemctl restart rippled

Edit your rippled's config file.

`rippled`

```
vim /etc/opt/ripple/rippled.cfg
```

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Add or update the [crawl] stanza in your config file, and save the changes:

`[crawl]`

```
[crawl]
0
```

Remove or comment out all other contents of the crawl stanza.

After saving the changes to the config file, restart your rippled server to apply the updated configuration:

`rippled`

```
systemctl restart rippled
```


## See Also

- Concepts:Peer Protocol
- Peer Protocol
- Tutorials:Manage the rippled Server
- Manage the rippled Server
- References:server_info methodpeers methodPeer Crawler
- server_info method
- peers method
- Peer Crawler

- Peer Protocol

- Manage the rippled Server

- server_info method
- peers method
- Peer Crawler

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e2ab3e00-527e-4b0c-b78b-1fbdc8931659&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e2ab3e00-527e-4b0c-b78b-1fbdc8931659&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63b402a8-a820-4bde-9567-90b4eb8384b7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63b402a8-a820-4bde-9567-90b4eb8384b7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0611cf29-6841-4bc2-ac63-5bea008d5c96&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0611cf29-6841-4bc2-ac63-5bea008d5c96&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4c605f05-6749-4c5f-a9ac-c3399d901409&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4c605f05-6749-4c5f-a9ac-c3399d901409&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4509e583-f6f2-4a71-84e9-0cf6a1e9b163&pt=Configure%20the%20Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=0d67ea3b-aa80-4811-b625-25cdb6009246&bo=1&sid=927f24209daa11f0b41f292dbdcad374&vid=927fbec09daa11f0af325dd8dfc4a9fb&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20the%20Peer%20Crawler&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-the-peer-crawler&r=&lt=3548&evt=pageLoad&sv=2&cdb=AQAS&rn=71361)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/peering/configure-the-peer-crawler#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/peering/configure-the-peer-crawler#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/peering/configure-the-peer-crawler#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/peering/configure-the-peer-crawler#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3481643f606259b98bc857f1f3d0f9f6.1759201637132.1759201637132.1759201637132.1&__hssc=78174987.1.1759201637132&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/peering/configure-the-peer-crawler.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3481643f606259b98bc857f1f3d0f9f6.1759201637132.1759201637132.1759201637132.1&__hssc=78174987.1.1759201637132&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:07:27.297Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
