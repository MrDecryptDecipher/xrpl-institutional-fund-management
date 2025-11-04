# Cluster rippled Servers
URL: https://xrpl.org/docs/infrastructure/configuration/peering/cluster-rippled-servers
Section: AD18

## Overview


## Extracted Content
# Cluster rippled Servers

If you run multiple rippled servers in the same data center, you can configure them in a cluster to maximize efficiency. To configure clustering:

`rippled`

1. For each of your servers, note the IP address of the server.
1. For each of your servers, generate a unique seed using the validation_create method.For example, using the commandline interface:$ rippled validation_create

Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005
{
   "result" : {
      "status" : "success",
      "validation_key" : "FAWN JAVA JADE HEAL VARY HER REEL SHAW GAIL ARCH BEN IRMA",
      "validation_public_key" : "n9Mxf6qD4J55XeLSCEpqaePW4GjoCR5U1ZeGZGJUCNe3bQa4yQbG",
      "validation_seed" : "ssZkdwURFMBXenJPbrpE14b6noJSu"
   }
}Save the validation_seed and validation_public_key parameters from each response somewhere secure.
1. On each server, edit the config file, modifying the following sections:In the [ips_fixed] section, list the IP address and port of each other member of the cluster. For each of those servers, the port number should match the protocol = peer port (usually 51235) from that server's rippled.cfg. For example:[ips_fixed]
192.168.0.1 51235
192.168.0.2 51235This defines specific peer servers to which this server should always attempt to maintain a direct peer-to-peer connection.NoteIf you omit the port number, the server uses port 2459, the IANA-assigned port for the XRP Ledger protocol.In the [node_seed] section, set the server's node seed to one of the validation_seed values you generated using the validation_create method in step 2. Each server must use a unique node seed. For example:[node_seed]
ssZkdwURFMBXenJPbrpE14b6noJSuThis defines the key pair the server uses to sign peer-to-peer communications, excluding validation messages.In the [cluster_nodes] section, set the members of the server's cluster, identified by their validation_public_key values. Each server should list the public keys of all other members of the cluster here. Optionally, add a custom name for each server. For example:[cluster_nodes]
n9McNsnzzXQPbg96PEUrrQ6z3wrvgtU4M7c97tncMpSoDzaQvPar keynes
n94UE1ukbq6pfZY9j54sv2A1UrEeHZXLbns3xK5CzU9NbNREytaa friedmanThis defines the key pairs the server uses to recognize members of its cluster.
1. In the [ips_fixed] section, list the IP address and port of each other member of the cluster. For each of those servers, the port number should match the protocol = peer port (usually 51235) from that server's rippled.cfg. For example:[ips_fixed]
192.168.0.1 51235
192.168.0.2 51235This defines specific peer servers to which this server should always attempt to maintain a direct peer-to-peer connection.NoteIf you omit the port number, the server uses port 2459, the IANA-assigned port for the XRP Ledger protocol.
1. In the [node_seed] section, set the server's node seed to one of the validation_seed values you generated using the validation_create method in step 2. Each server must use a unique node seed. For example:[node_seed]
ssZkdwURFMBXenJPbrpE14b6noJSuThis defines the key pair the server uses to sign peer-to-peer communications, excluding validation messages.
1. In the [cluster_nodes] section, set the members of the server's cluster, identified by their validation_public_key values. Each server should list the public keys of all other members of the cluster here. Optionally, add a custom name for each server. For example:[cluster_nodes]
n9McNsnzzXQPbg96PEUrrQ6z3wrvgtU4M7c97tncMpSoDzaQvPar keynes
n94UE1ukbq6pfZY9j54sv2A1UrEeHZXLbns3xK5CzU9NbNREytaa friedmanThis defines the key pairs the server uses to recognize members of its cluster.
1. After saving the config file, restart rippled on each server.# systemctl restart rippled
1. To confirm that each server is now a member of the cluster, use the peers method. The cluster field should list the public keys and (if configured) the custom names for each server.For example, using the commandline interface:$ rippled peers

Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005
{
  "result" : {
    "cluster" : {
        "n9McNsnzzXQPbg96PEUrrQ6z3wrvgtU4M7c97tncMpSoDzaQvPar": {
          "tag": "keynes",
          "age": 1
        },
        "n94UE1ukbq6pfZY9j54sv2A1UrEeHZXLbns3xK5CzU9NbNREytaa": {
          "tag": "friedman",
          "age": 1
        }
    },
    "peers" : [
      ... (omitted) ...
    ],
    "status" : "success"
  }
}

For each of your servers, note the IP address of the server.

For each of your servers, generate a unique seed using the validation_create method.

For example, using the commandline interface:

```
$ rippled validation_create

Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005
{
   "result" : {
      "status" : "success",
      "validation_key" : "FAWN JAVA JADE HEAL VARY HER REEL SHAW GAIL ARCH BEN IRMA",
      "validation_public_key" : "n9Mxf6qD4J55XeLSCEpqaePW4GjoCR5U1ZeGZGJUCNe3bQa4yQbG",
      "validation_seed" : "ssZkdwURFMBXenJPbrpE14b6noJSu"
   }
}
```

Save the validation_seed and validation_public_key parameters from each response somewhere secure.

`validation_seed`

`validation_public_key`

On each server, edit the config file, modifying the following sections:

1. In the [ips_fixed] section, list the IP address and port of each other member of the cluster. For each of those servers, the port number should match the protocol = peer port (usually 51235) from that server's rippled.cfg. For example:[ips_fixed]
192.168.0.1 51235
192.168.0.2 51235This defines specific peer servers to which this server should always attempt to maintain a direct peer-to-peer connection.NoteIf you omit the port number, the server uses port 2459, the IANA-assigned port for the XRP Ledger protocol.
1. In the [node_seed] section, set the server's node seed to one of the validation_seed values you generated using the validation_create method in step 2. Each server must use a unique node seed. For example:[node_seed]
ssZkdwURFMBXenJPbrpE14b6noJSuThis defines the key pair the server uses to sign peer-to-peer communications, excluding validation messages.
1. In the [cluster_nodes] section, set the members of the server's cluster, identified by their validation_public_key values. Each server should list the public keys of all other members of the cluster here. Optionally, add a custom name for each server. For example:[cluster_nodes]
n9McNsnzzXQPbg96PEUrrQ6z3wrvgtU4M7c97tncMpSoDzaQvPar keynes
n94UE1ukbq6pfZY9j54sv2A1UrEeHZXLbns3xK5CzU9NbNREytaa friedmanThis defines the key pairs the server uses to recognize members of its cluster.

In the [ips_fixed] section, list the IP address and port of each other member of the cluster. For each of those servers, the port number should match the protocol = peer port (usually 51235) from that server's rippled.cfg. For example:

`[ips_fixed]`

`protocol = peer`

`rippled.cfg`

```
[ips_fixed]
192.168.0.1 51235
192.168.0.2 51235
```

This defines specific peer servers to which this server should always attempt to maintain a direct peer-to-peer connection.

NoteIf you omit the port number, the server uses port 2459, the IANA-assigned port for the XRP Ledger protocol.

In the [node_seed] section, set the server's node seed to one of the validation_seed values you generated using the validation_create method in step 2. Each server must use a unique node seed. For example:

`[node_seed]`

`validation_seed`

```
[node_seed]
ssZkdwURFMBXenJPbrpE14b6noJSu
```

This defines the key pair the server uses to sign peer-to-peer communications, excluding validation messages.

In the [cluster_nodes] section, set the members of the server's cluster, identified by their validation_public_key values. Each server should list the public keys of all other members of the cluster here. Optionally, add a custom name for each server. For example:

`[cluster_nodes]`

`validation_public_key`

```
[cluster_nodes]
n9McNsnzzXQPbg96PEUrrQ6z3wrvgtU4M7c97tncMpSoDzaQvPar keynes
n94UE1ukbq6pfZY9j54sv2A1UrEeHZXLbns3xK5CzU9NbNREytaa friedman
```

This defines the key pairs the server uses to recognize members of its cluster.

After saving the config file, restart rippled on each server.

`rippled`

```
# systemctl restart rippled
```

To confirm that each server is now a member of the cluster, use the peers method. The cluster field should list the public keys and (if configured) the custom names for each server.

`cluster`

For example, using the commandline interface:

```
$ rippled peers

Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005
{
  "result" : {
    "cluster" : {
        "n9McNsnzzXQPbg96PEUrrQ6z3wrvgtU4M7c97tncMpSoDzaQvPar": {
          "tag": "keynes",
          "age": 1
        },
        "n94UE1ukbq6pfZY9j54sv2A1UrEeHZXLbns3xK5CzU9NbNREytaa": {
          "tag": "friedman",
          "age": 1
        }
    },
    "peers" : [
      ... (omitted) ...
    ],
    "status" : "success"
  }
}
```


## See Also

- Concepts:Peer Protocol
- Peer Protocol
- Tutorials:Install rippled
- Install rippled
- References:validation_create methodpeers method
- validation_create method
- peers method

- Peer Protocol

- Install rippled

- validation_create method
- peers method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4e4f4429-1066-4b4f-8cf2-a6785138fc13&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4e4f4429-1066-4b4f-8cf2-a6785138fc13&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf508a80-f985-40c4-89f7-0ab19e5684e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf508a80-f985-40c4-89f7-0ab19e5684e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=690b34e3-63b0-4553-936e-d40513aa844c&bo=1&sid=7b738ca09daa11f0b9e9bb0098aeaa04&vid=7b740ce09daa11f087efc547421bf234&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Cluster%20rippled%20Servers&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&r=&lt=3325&evt=pageLoad&sv=2&cdb=AQAS&rn=4065)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=056b996e-a33f-4bf0-b52c-a1e22c162e64&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=056b996e-a33f-4bf0-b52c-a1e22c162e64&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3f87434-105a-4cbc-a08e-3a1321d1539d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3f87434-105a-4cbc-a08e-3a1321d1539d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6349f933-682a-40a7-b69c-684b3ad9e342&pt=Cluster%20rippled%20Servers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fcluster-rippled-servers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/peering/cluster-rippled-servers#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/peering/cluster-rippled-servers#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/peering/cluster-rippled-servers#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/peering/cluster-rippled-servers#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/peering/cluster-rippled-servers.md)
- [config file](https://github.com/XRPLF/rippled/blob/master/cfg/rippled-example.cfg)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:06:48.860Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
