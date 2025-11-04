# Configure StatsD
URL: https://xrpl.org/docs/infrastructure/configuration/configure-statsd
Section: AD27

## Overview


## Extracted Content
# Configure StatsD

rippled can export health and behavioral information about itself in StatsD format. Those metrics can be consumed and visualized through rippledmon or any other collector that accepts StatsD formatted metrics.

`rippled`

`rippledmon`


## Configuration Steps

To enable StatsD on your rippled server, perform the following steps:

`rippled`

1. Set up a rippledmon instance on another machine to receive and aggregate stats.$ git clone https://github.com/ripple/rippledmon.git
$ cd rippledmon
$ docker-compose upMake sure Docker and Docker Compose are installed on your machine when performing the steps above. For more information about configuring rippledmon, see the rippledmon repository.
1. Add the [insight] stanza to your rippled's config file.[insight]
server=statsd
address=192.0.2.0:8125
prefix=my_rippledFor the address, use the IP address and port where rippledmon is listening. By default, this port is 8125.For the prefix, choose a name that identifies the rippled server you are configuring. The prefix must not include whitespace, colons ":", or the vertical bar "|". The prefix appears on all of the StatsD metrics exported from this server.The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. For the address, use the IP address and port where rippledmon is listening. By default, this port is 8125.
1. For the prefix, choose a name that identifies the rippled server you are configuring. The prefix must not include whitespace, colons ":", or the vertical bar "|". The prefix appears on all of the StatsD metrics exported from this server.
1. Restart the rippled service.$ sudo systemctl restart rippled
1. Check that the metrics are being exported:$ tcpdump -i en0 | grep UDPReplace en0 with the appropriate network interface for your machine. For a complete list of the interfaces on your machine use $ tcpdump -D.Sample Output:00:41:53.066333 IP 192.0.2.2.63409 > 192.0.2.0.8125: UDP, length 196You should periodically see messages indicating outbound traffic to the configured address and port of your rippledmon instance.

Set up a rippledmon instance on another machine to receive and aggregate stats.

`rippledmon`

```
$ git clone https://github.com/ripple/rippledmon.git
$ cd rippledmon
$ docker-compose up
```

Make sure Docker and Docker Compose are installed on your machine when performing the steps above. For more information about configuring rippledmon, see the rippledmon repository.

`rippledmon`

`rippledmon`

Add the [insight] stanza to your rippled's config file.

`[insight]`

`rippled`

```
[insight]
server=statsd
address=192.0.2.0:8125
prefix=my_rippled
```

- For the address, use the IP address and port where rippledmon is listening. By default, this port is 8125.
- For the prefix, choose a name that identifies the rippled server you are configuring. The prefix must not include whitespace, colons ":", or the vertical bar "|". The prefix appears on all of the StatsD metrics exported from this server.

`address`

`rippledmon`

`prefix`

`rippled`

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Restart the rippled service.

`rippled`

```
$ sudo systemctl restart rippled
```

Check that the metrics are being exported:

```
$ tcpdump -i en0 | grep UDP
```

Replace en0 with the appropriate network interface for your machine. For a complete list of the interfaces on your machine use $ tcpdump -D.

`en0`

`$ tcpdump -D`

Sample Output:

```
00:41:53.066333 IP 192.0.2.2.63409 > 192.0.2.0.8125: UDP, length 196
```

You should periodically see messages indicating outbound traffic to the configured address and port of your rippledmon instance.

`rippledmon`

For descriptions of each StatsD metric, see the rippledmon repository.

`rippledmon`


## See Also

- Concepts:XRP Ledger OverviewThe rippled Server
- XRP Ledger Overview
- The rippled Server
- Tutorials:Install rippledCapacity Planning
- Install rippled
- Capacity Planning
- References:server_info methodprint method
- server_info method
- print method

- XRP Ledger Overview
- The rippled Server

`rippled`

- Install rippled
- Capacity Planning

`rippled`

- server_info method
- print method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0c9379fe-f2a7-450c-98b3-4f992fd7d732&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0c9379fe-f2a7-450c-98b3-4f992fd7d732&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9ae7d9e1-f8c3-4424-9f6e-2d2057003737&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9ae7d9e1-f8c3-4424-9f6e-2d2057003737&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=60e4297e-9f98-42c1-946a-0fbf7d9ec908&bo=1&sid=e7901bb09daa11f09231897943e484c4&vid=e792b6009daa11f0bf5fdd9b26d85fd8&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20StatsD&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&r=&lt=3748&evt=pageLoad&sv=2&cdb=AQAS&rn=649393)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8825b512-99c4-4f24-913f-b55ce664ec35&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8825b512-99c4-4f24-913f-b55ce664ec35&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4294e460-5946-4686-a581-cd642de37b44&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4294e460-5946-4686-a581-cd642de37b44&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53e2f87d-f99c-4513-94b2-2eb0d28c0cc1&pt=Configure%20StatsD&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-statsd&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/configure-statsd#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/configure-statsd#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/configure-statsd#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/configure-statsd#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.719e12067fe83a79700bc55bf0827209.1759201780124.1759201780124.1759201780124.1&__hssc=78174987.1.1759201780125&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/configure-statsd.md)
- [StatsD](https://github.com/statsd/statsd)
- [rippledmon](https://github.com/ripple/rippledmon)
- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [rippledmon repository](https://github.com/ripple/rippledmon)
- [rippledmon repository](https://github.com/ripple/rippledmon)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.719e12067fe83a79700bc55bf0827209.1759201780124.1759201780124.1759201780124.1&__hssc=78174987.1.1759201780125&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:09:49.526Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
