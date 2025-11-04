# Configure a Private Server
URL: https://xrpl.org/docs/infrastructure/configuration/peering/configure-a-private-server
Section: AD19

## Overview


## Extracted Content
# Configure a Private Server

A private server is a rippled server that connects to the network only through specific, trusted peers instead of connecting directly to discovered peers in the open peer-to-peer network. This kind of configuration is an optional precaution most commonly recommended for validators, but it can be useful for other specific purposes.

`rippled`


## Prerequisites

To use a private server, you must meet the following requirements:

- You must have rippled installed and updated to the latest version, but not running yet.
- You must decide whether to connect through proxies you run yourself, or through public hubs. For a comparison of these options, see Pros and Cons of Peering Configurations.If you are using proxies, you must have additional machines with rippled installed and running to use as the proxies. These servers must be able to connect to the outside network and to your private server.For either configuration, you must know the IP addresses and ports of the peers you intend to connect to.
- If you are using proxies, you must have additional machines with rippled installed and running to use as the proxies. These servers must be able to connect to the outside network and to your private server.
- For either configuration, you must know the IP addresses and ports of the peers you intend to connect to.

`rippled`

- If you are using proxies, you must have additional machines with rippled installed and running to use as the proxies. These servers must be able to connect to the outside network and to your private server.
- For either configuration, you must know the IP addresses and ports of the peers you intend to connect to.

`rippled`


## Steps

To set up a specific server as a private peer, complete the following steps:

1. Edit your rippled's config file.vim /etc/opt/ripple/rippled.cfgThe recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Enable private peering.Add or uncomment the following stanza in your config file:[peer_private]
1
1. Add fixed peers.Add or uncomment an [ips_fixed] stanza in your config file. Each line in this stanza should be the hostname or IP address of a peer to connect to, followed by a space and the port where this peer accepts peer protocol connections.For example, to connect using public hubs, you could use the following stanza:[ips_fixed]
r.ripple.com 51235If your server connects using proxies, the IP addresses and ports should match the configurations of the rippled servers you are using as proxies. For each of those servers, the port number should match the protocol = peer port in that server's config file (usually 51235). For example, your configuration might look like this:[ips_fixed]
192.168.0.1 51235
192.168.0.2 51235NoteIf you omit the port number, the server uses port 2459, the IANA-assigned port for the XRP Ledger protocol.
1. If using proxies, cluster them with your private peer and each other.If you are using public hubs, skip this step.If you are using proxies, configure the proxies as a cluster that includes your private peer. Each member of the cluster should have an [ips_fixed] stanza that lists each other member of the cluster. However, only the private server should have a [peer_private] stanza.Restart rippled on the proxies one-by-one. On each proxy server:sudo service systemctl restart rippled
1. Start rippled on the private server.sudo service systemctl start rippled
1. Use the peers method to confirm that your private server is connected only to its peers.The peers array in the response should not contain any objects whose address is not one of your configured peers. If this is not the case, double-check your config file and restart the private server.

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

Enable private peering.

Add or uncomment the following stanza in your config file:

```
[peer_private]
1
```

Add fixed peers.

Add or uncomment an [ips_fixed] stanza in your config file. Each line in this stanza should be the hostname or IP address of a peer to connect to, followed by a space and the port where this peer accepts peer protocol connections.

`[ips_fixed]`

For example, to connect using public hubs, you could use the following stanza:

```
[ips_fixed]
r.ripple.com 51235
```

If your server connects using proxies, the IP addresses and ports should match the configurations of the rippled servers you are using as proxies. For each of those servers, the port number should match the protocol = peer port in that server's config file (usually 51235). For example, your configuration might look like this:

`rippled`

`protocol = peer`

```
[ips_fixed]
192.168.0.1 51235
192.168.0.2 51235
```

NoteIf you omit the port number, the server uses port 2459, the IANA-assigned port for the XRP Ledger protocol.

If using proxies, cluster them with your private peer and each other.

If you are using public hubs, skip this step.

If you are using proxies, configure the proxies as a cluster that includes your private peer. Each member of the cluster should have an [ips_fixed] stanza that lists each other member of the cluster. However, only the private server should have a [peer_private] stanza.

`[ips_fixed]`

`[peer_private]`

Restart rippled on the proxies one-by-one. On each proxy server:

`rippled`

```
sudo service systemctl restart rippled
```

Start rippled on the private server.

`rippled`

```
sudo service systemctl start rippled
```

Use the peers method to confirm that your private server is connected only to its peers.

The peers array in the response should not contain any objects whose address is not one of your configured peers. If this is not the case, double-check your config file and restart the private server.

`peers`

`address`


## Next Steps

As an additional precaution, you should configure your firewall to block incoming connections to your private server from servers that are not your specific peers. If you are running proxy servers, forward peer ports through your firewall to the proxies, but not to the private peer. The exact details of how to configure this depend on what firewall you use.

Be sure the firewall does not block outgoing HTTP connections on port 80. The default configuration uses this port to download the latest recommended validator list from vl.ripple.com. Without a validator list, the server does not know which validators to trust and cannot recognize when the network reaches a consensus.


## See Also

- Concepts:Peer ProtocolConsensusParallel Networks
- Peer Protocol
- Consensus
- Parallel Networks
- Tutorials:Configure the Peer Crawler
- Configure the Peer Crawler
- References:peers methodconnect methodfetch_info methodPeer Crawler
- peers method
- connect method
- fetch_info method
- Peer Crawler

- Peer Protocol
- Consensus
- Parallel Networks

- Configure the Peer Crawler

- peers method
- connect method
- fetch_info method
- Peer Crawler

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2a316f99-1f82-4996-b869-f94858f6f355&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2a316f99-1f82-4996-b869-f94858f6f355&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=865ffa6f-17c7-44bb-8e5e-d405a161f94d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=865ffa6f-17c7-44bb-8e5e-d405a161f94d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=320ed0d7-1b1c-43bc-ba7a-465d5e7483e6&bo=1&sid=865c43909daa11f0816809459e0b02dd&vid=865d69009daa11f0aa835b80026c86f8&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20a%20Private%20Server&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&r=&lt=1997&evt=pageLoad&sv=2&cdb=AQAS&rn=1935)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d4b14b6c-f328-4042-b66d-c0c28e3765a1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d4b14b6c-f328-4042-b66d-c0c28e3765a1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e344c198-abf0-4adc-9272-c635baad0c00&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e344c198-abf0-4adc-9272-c635baad0c00&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ab8b8dde-646d-4200-b308-21c6e42c1e5f&pt=Configure%20a%20Private%20Server&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fconfigure-a-private-server&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/peering/configure-a-private-server#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/peering/configure-a-private-server#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/peering/configure-a-private-server#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/peering/configure-a-private-server#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/peering/configure-a-private-server.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:07:09.078Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
