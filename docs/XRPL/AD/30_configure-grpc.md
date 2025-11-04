# Configure gRPC
URL: https://xrpl.org/docs/infrastructure/configuration/configure-grpc
Section: AD30

## Overview


## Extracted Content
# Configure gRPC

The rippled server has a limited gRPC API it can provide. Clio servers use this API to retrieve data about the latest validated ledgers and transactions. You can enable the gRPC API on your server with a new configuration stanza.

`rippled`

CautiongRPC support is intended specifically for providing data to Clio servers. Breaking changes to the gRPC API may occur without warning or it may be removed entirely in future versions of the server.


## Prerequisites

To enable gRPC, you must meet the following prerequisites:

- You must have installed rippled.
- Your server must be able to bind to the port you choose.

You must have installed rippled.

Your server must be able to bind to the port you choose.


## Steps

To enable gRPC on your server, complete the following steps:

1. Ensure the [port_grpc] stanza is in your rippled config file.[port_grpc]
port = 50051
ip = 127.0.0.1port defines the port the server listens on for gRPC connections from client applications. The recommended port is 50051.ip defines which interfaces the server listens on. 127.0.0.1 limits connections to the local loopback network (same machine) and is enabled by default. Changing the value to 0.0.0.0 listens on all available network interfaces.The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. port defines the port the server listens on for gRPC connections from client applications. The recommended port is 50051.
1. ip defines which interfaces the server listens on. 127.0.0.1 limits connections to the local loopback network (same machine) and is enabled by default. Changing the value to 0.0.0.0 listens on all available network interfaces.
1. Start (or restart) the rippled service.sudo systemctl restart rippled

Ensure the [port_grpc] stanza is in your rippled config file.

`[port_grpc]`

`rippled`

```
[port_grpc]
port = 50051
ip = 127.0.0.1
```

- port defines the port the server listens on for gRPC connections from client applications. The recommended port is 50051.
- ip defines which interfaces the server listens on. 127.0.0.1 limits connections to the local loopback network (same machine) and is enabled by default. Changing the value to 0.0.0.0 listens on all available network interfaces.

`port`

`50051`

`ip`

`127.0.0.1`

`0.0.0.0`

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Start (or restart) the rippled service.

`rippled`

```
sudo systemctl restart rippled
```


## See Also

- Concepts:XRP Ledger Overviewrippled Server Modes
- XRP Ledger Overview
- rippled Server Modes
- Tutorials:Get Started Using HTTP / WebSocket APIsReliable Transaction SubmissionManage the rippled Server
- Get Started Using HTTP / WebSocket APIs
- Reliable Transaction Submission
- Manage the rippled Server
- References:HTTP / WebSocket API Reference
- HTTP / WebSocket API Reference

- XRP Ledger Overview
- rippled Server Modes

`rippled`

- Get Started Using HTTP / WebSocket APIs
- Reliable Transaction Submission
- Manage the rippled Server

- HTTP / WebSocket API Reference

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b173273a-927a-438a-8076-30355d6e08a8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b173273a-927a-438a-8076-30355d6e08a8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3d33478-bd5f-450e-ae8c-f150853801b2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3d33478-bd5f-450e-ae8c-f150853801b2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=cf80a504-06ea-41e5-b5bc-7c0abaf4d4d0&bo=1&sid=101c81d09dab11f0b5bf7528708df069&vid=101f60009dab11f0997f195c1e9871c2&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20gRPC&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&r=&lt=2753&evt=pageLoad&sv=2&cdb=AQAS&rn=395570)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=297c8d6a-f8c1-4428-842c-1eefec4e323d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=297c8d6a-f8c1-4428-842c-1eefec4e323d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd2e0deb-a8d1-404e-b4aa-778d511a5226&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd2e0deb-a8d1-404e-b4aa-778d511a5226&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=947dbe70-a947-43f3-af9f-a32c651ed117&pt=Configure%20gRPC&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-grpc&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/configure-grpc#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/configure-grpc#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/configure-grpc#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/configure-grpc#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d15b658aa76f54f3ff26d2a7149c41e8.1759201850298.1759201850298.1759201850298.1&__hssc=78174987.1.1759201850299&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/configure-grpc.md)
- [gRPC API](https://grpc.io/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d15b658aa76f54f3ff26d2a7149c41e8.1759201850298.1759201850298.1759201850298.1&__hssc=78174987.1.1759201850299&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:10:58.597Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
