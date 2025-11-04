# Forward Ports for Peering
URL: https://xrpl.org/docs/infrastructure/configuration/peering/forward-ports-for-peering
Section: AD22

## Overview


## Extracted Content
# Forward Ports for Peering

Servers in the XRP Ledger peer-to-peer network communicate over the peer protocol. For the best combination of security and connectivity to the rest of the network, you should use a firewall to protect your server from most ports, but open or forward the peer protocol port.

While your rippled server is running, you can check to see how many peers you have by running the server_info method. The peers field of the info object shows how many peers are currently connected to your server. If this number is exactly 10 or 11, that usually means your firewall is blocking incoming connections.

`rippled`

`peers`

`info`

Example of a server_info result (trimmed) showing only 10 peers, likely because a firewall is blocking incoming peer connections:

`server_info`

```
$ ./rippled server_info
Loading: "/etc/opt/ripple/rippled.cfg"
2019-Dec-23 22:15:09.343961928 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
   "result" : {
      "info" : {
         ... (trimmed) ...
         "load_factor" : 1,
         "peer_disconnects" : "0",
         "peer_disconnects_resources" : "0",
         "peers" : 10,
         "pubkey_node" : "n9KUjqxCr5FKThSNXdzb7oqN8rYwScB2dUnNqxQxbEA17JkaWy5x",
         "pubkey_validator" : "n9KM73uq5BM3Fc6cxG3k5TruvbLc8Ffq17JZBmWC4uP4csL4rFST",
         "published_ledger" : "none",
         "server_state" : "connected",
         ... (trimmed) ...
      },
      "status" : "success"
   }
}
```

To allow incoming connections, configure your firewall to allow incoming traffic on the peer protocol port, which is served on port 51235 in the default config file. The instructions to open a port depend on your firewall. If your server is behind a router that performs Network Address Translation (NAT), you must configure your router to forward the port to your server.

If you use the firewalld software firewall on Red Hat Enterprise Linux, you can use the firewall-cmd tool to open port 51235 to all incoming traffic.

`firewalld`

`firewall-cmd`

Assuming --zone=public is your public zone.

`--zone=public`

```
$ sudo firewall-cmd --zone=public --add-port=51235/tcp
```

Then, restart the rippled server:

`rippled`

```
$ sudo systemctl restart rippled.service
```

To make it permanent:

```
$ sudo firewall-cmd --zone=public --permanent --add-port=51235/tcp
```

For other software and hardware firewalls, see the manufacturer's official documentation.

If you are using a hosting service with a virtual firewall (for example, AWS Security Groups), you do not need to use firewalld, but you still need to allow inbound traffic from the open internet on the peer port. Make sure you apply the relevant rules to your host or virtual machine.

`firewalld`


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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=04aa0e8b-c527-49d9-9d2d-f36d4ae157db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=04aa0e8b-c527-49d9-9d2d-f36d4ae157db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cfa4ef5c-85cd-4f3e-980a-3d379809d77f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cfa4ef5c-85cd-4f3e-980a-3d379809d77f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=e343ab5c-246a-47a4-81bd-f0fdc03cd77f&bo=1&sid=aaf144709daa11f09bfe69d07c2663f8&vid=aaf1a6909daa11f09fea1fdc53b0665a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Forward%20Ports%20for%20Peering&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&r=&lt=3030&evt=pageLoad&sv=2&cdb=AQAS&rn=895151)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4c5f1c6d-2ae3-48cd-8fd5-07bfeac74e44&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4c5f1c6d-2ae3-48cd-8fd5-07bfeac74e44&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78663aa5-7f31-40ec-bb4d-d6be4df628c9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78663aa5-7f31-40ec-bb4d-d6be4df628c9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=258ea588-58c0-446e-8b57-baf47f8b1930&pt=Forward%20Ports%20for%20Peering&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fforward-ports-for-peering&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/peering/forward-ports-for-peering#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/peering/forward-ports-for-peering#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/peering/forward-ports-for-peering#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/peering/forward-ports-for-peering#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.59dca166bc9d2e817bfdc0a3de12f333.1759201678363.1759201678363.1759201678363.1&__hssc=78174987.1.1759201678364&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/peering/forward-ports-for-peering.md)
- [use the firewall-cmd tool](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-using_zones_to_manage_incoming_traffic_depending_on_source)
- [zone](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-working_with_zones#sec-Listing_Zones)
- [AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.59dca166bc9d2e817bfdc0a3de12f333.1759201678363.1759201678363.1759201678363.1&__hssc=78174987.1.1759201678364&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:08:07.649Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
