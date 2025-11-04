# Use a Peer Reservation
URL: https://xrpl.org/docs/infrastructure/configuration/peering/use-a-peer-reservation
Section: AD25

## Overview


## Extracted Content
# Use a Peer Reservation

A peer reservation is a setting that makes a rippled server always accept connections from a peer matching the reservation. This page describes how to use peer reservations to keep a consistent peer-to-peer connection between two servers, with the cooperation of the administrators of both servers.

`rippled`

Peer reservations are most useful when the two servers are run by different parties, and the server that receives the incoming connection is a hub server with many peers. For clarity, these instructions use the following terms:

- The server making the outgoing connection is the stock server. This server uses the peer reservation on the hub server.
- The server receiving the incoming connection is the hub server. The administrator adds the peer reservation to this server.

However, you can use these instructions to set up a peer reservation regardless of whether one server or both are hubs, validators, or stock servers. It is also possible to use a peer reservation when the busier server is the one making the outgoing connection, but this process does not describe that configuration.


## Prerequisites

To complete these steps, you must meet the following prerequisites:

- The administrators both servers must have rippled installed and running.
- The administrators of both servers must agree to cooperate and must be able to communicate. A public communications channel is fine because you don't need to share any secret information.
- The hub server must be able to receive incoming peer connections. For instructions on how to configure a firewall to allow this, see Forward Ports for Peering.
- Both servers must be configured to sync with the same XRP Ledger network, such as the production XRP Ledger, the Testnet, or the Devnet.

`rippled`


## Steps

To use a peer reservation, complete the following steps:


### 1. (Stock Server) Set up a permanent node key pair

The administrator of the stock server completes this step.

If you have already configured your server with a permanent node key pair value, you can skip ahead to step 2: Communicate your node public key to the peer's admin. (For example, setting up a permanent node key pair for each server is part of the process of setting up a server cluster.)

TipSetting up a permanent node key pair is optional, but makes it easier to keep the peer reservation set up if you need to erase your server's databases or move to a new machine. If you don't want to set up a permanent node key pair, you can use your server's automatically-generated node public key as reported in the pubkey_node field of the server_info method response.

`pubkey_node`

1. Generate a new, random key pair using the validation_create method. (Omit the secret value.)For example:rippled validation_create

Loading: "/etc/rippled.cfg"
Connecting to 127.0.0.1:5005
{
   "result" : {
      "status" : "success",
      "validation_key" : "FAWN JAVA JADE HEAL VARY HER REEL SHAW GAIL ARCH BEN IRMA",
      "validation_public_key" : "n9Mxf6qD4J55XeLSCEpqaePW4GjoCR5U1ZeGZGJUCNe3bQa4yQbG",
      "validation_seed" : "ssZkdwURFMBXenJPbrpE14b6noJSu"
   }
}Save the validation_seed (your node seed value) and the validation_public_key value (your node public key )
1. Edit your rippled's config file.vim /etc/opt/ripple/rippled.cfgThe recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Add a [node_seed] stanza using the validation_seed value you generated earlier.For example:[node_seed]
ssZkdwURFMBXenJPbrpE14b6noJSuWarningAll servers should have unique [node_seed] values. If you copy your config file to another server, be sure to remove or change the [node_seed] value. Keep your [node_seed] secret; if a malicious actor gains access to this value, they could use it to impersonate your server in XRP Ledger peer-to-peer communications.
1. Restart your rippled server:systemctl restart rippled

Generate a new, random key pair using the validation_create method. (Omit the secret value.)

`secret`

For example:

```
rippled validation_create

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

Save the validation_seed (your node seed value) and the validation_public_key value (your node public key )

`validation_seed`

`validation_public_key`

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

Add a [node_seed] stanza using the validation_seed value you generated earlier.

`[node_seed]`

`validation_seed`

For example:

```
[node_seed]
ssZkdwURFMBXenJPbrpE14b6noJSu
```

WarningAll servers should have unique [node_seed] values. If you copy your config file to another server, be sure to remove or change the [node_seed] value. Keep your [node_seed] secret; if a malicious actor gains access to this value, they could use it to impersonate your server in XRP Ledger peer-to-peer communications.

`[node_seed]`

`[node_seed]`

`[node_seed]`

Restart your rippled server:

`rippled`

```
systemctl restart rippled
```


### 2. Communicate the stock server's node public key

The administrator of the stock server tells the administrator of the hub server what the stock server's node public key is. (Use the validation_public_key from step 1.) The administrator of the hub server needs this value for the next steps.

`validation_public_key`


### 3. (Hub Server) Add the peer reservation

The administrator of the hub server completes this step.

Use the peer_reservations_add method to add a reservation using the node public key that you got in the previous step. For example:

```
$ rippled peer_reservations_add n9Mxf6qD4J55XeLSCEpqaePW4GjoCR5U1ZeGZGJUCNe3bQa4yQbG "Description here"

Loading: "/etc/opt/ripple/rippled.cfg"
Connecting to 127.0.0.1:5005

{
  "result": {
    "status": "success"
  }
}
```

TipThe description is an optional field that you can provide to add a human-readable note about who this reservation is for.


### 4. Communicate the hub server's current IP address and peer port

The administrator of the hub server must tell their server's current IP address and peer port to the administrator of the stock server. If the hub server is behind a firewall that does network address translation (NAT), use the server's external IP address. The default config file uses port 51235 for the peer protocol.


### 5. (Stock Server) Connect to the peer server

The administrator of the stock server completes this step.

Use the connect method to connect your server to the hub server. For example:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "command": "connect",
    "ip": "169.54.2.151",
    "port": 51235
}
```

If the hub server's administrator has set up the peer reservation as described in the previous steps, this should automatically connect and remain connected as long as possible.


## Next Steps

As a server administrator, you can manage the reservations your server has for other peers. (It is not possible to check which other servers have reservations for yours.) You can:

- Add more peer reservations or update their descriptions, using the peer_reservations_add method.
- Check which servers you have configured reservations for, using the peer_reservations_list method.
- Remove one of your reservations using the peer_reservations_del method.
- Check which peers are currently connected and how much bandwidth they have used, using the peers method.

TipAlthough there is no API method to immediately disconnect from an unwanted peer, you can use a software firewall such as firewalld to block an unwanted peer from connecting to your server. For examples, see the community-contributed rbh script.

`firewalld`


## See Also

- Concepts:Peer ProtocolConsensusParallel Networks
- Peer Protocol
- Consensus
- Parallel Networks
- Tutorials:Capacity PlanningTroubleshooting rippled
- Capacity Planning
- Troubleshooting rippled
- References:peers methodpeer_reservations_add methodpeer_reservations_del methodpeer_reservations_list methodconnect methodfetch_info methodPeer Crawler
- peers method
- peer_reservations_add method
- peer_reservations_del method
- peer_reservations_list method
- connect method
- fetch_info method
- Peer Crawler

- Peer Protocol
- Consensus
- Parallel Networks

- Capacity Planning
- Troubleshooting rippled

`rippled`

- peers method
- peer_reservations_add method
- peer_reservations_del method
- peer_reservations_list method
- connect method
- fetch_info method
- Peer Crawler

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3836b3b0-816b-48f1-b1e8-071650429ec4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3836b3b0-816b-48f1-b1e8-071650429ec4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8dbc87f6-c46e-4f67-bee5-015bd677b8b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8dbc87f6-c46e-4f67-bee5-015bd677b8b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d52bd4d7-ce6f-4327-a39e-83041119eaed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d52bd4d7-ce6f-4327-a39e-83041119eaed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6d3e0c59-8274-46ee-830b-64d9bcbb414d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6d3e0c59-8274-46ee-830b-64d9bcbb414d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8163fa02-c788-4451-9d37-93001bc8d3b8&pt=Use%20a%20Peer%20Reservation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=43971e1a-e12a-4943-ae7f-de3cea3c137b&bo=1&sid=cc7a31909daa11f09c04e7fab8a9d58b&vid=cc7ab1509daa11f08346458ec5580e48&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Use%20a%20Peer%20Reservation&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fpeering%2Fuse-a-peer-reservation&r=&lt=3279&evt=pageLoad&sv=2&cdb=AQAS&rn=497345)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/peering/use-a-peer-reservation#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/peering/use-a-peer-reservation#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/peering/use-a-peer-reservation#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/peering/use-a-peer-reservation#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/peering/use-a-peer-reservation.md)
- [rbh script](https://github.com/gnanderson/rbh)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:09:08.657Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
