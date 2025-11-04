# Peer Protocol
URL: https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol
Section: B5

## Overview


## Extracted Content
# Peer Protocol

Servers in the XRP Ledger communicate to each other using the XRP Ledger peer protocol.

The peer protocol is the main mode of communication between servers in the XRP Ledger. All information about the behavior, progress, and connectivity of the XRP Ledger passes through the peer protocol. Examples of peer-to-peer communications include all of the following:

- Requesting a connection to other servers in the peer-to-peer network, or advertising that connection slots are available.
- Sharing candidate transactions with the rest of the network.
- Requesting ledger data from historical ledgers, or providing that data.
- Proposing a set of transactions for consensus, or sharing the calculated outcome of applying a consensus transaction set.

To set up a peer-to-peer connection, one server connects to another using HTTPS and requests an HTTP upgrade to switch to the XRPL/2.0 protocol (formerly RTXP/1.2). (For more information, see the Overlay Network article in the rippled repository.)

`XRPL/2.0`

`RTXP/1.2`

`rippled`


## Peer Discovery

The XRP Ledger uses a "gossip" protocol to help find servers find others to connect to in the XRP Ledger network. Whenever a server starts up, it reconnects to any other peers it previously connected to. As a fallback, it uses the hardcoded public hubs. After a server successfully connects to a peer, it asks that peer for the contact information (generally, IP address and port) of other XRP Ledger servers that may also be seeking peers. The server can then connect to those servers, and ask them for the contact information of yet more XRP Ledger servers to peer with. Through this process, the server makes enough peer connections that it can remain reliably connected to the rest of the network even if it loses a connection to any single peer.

Typically, a server needs to connect to a public hub only once, for a short amount of time, to find other peers. After doing so, the server may or may not remain connected to the hub, depending on how stable its network connection is, how busy the hub is, and how many other high-quality peers the server finds. The server saves the addresses of these other peers so it can try reconnecting directly to those peers later, after a network outage or a restart.

The peers method shows a list of peers your server is currently connected to.

For certain high-value servers (such as important validators) you may prefer not to have your server connect to untrusted peers through the peer discovery process. In this case, you can configure your server to use private peers only.


## Peer Protocol Port

To participate in the XRP Ledger, rippled servers connect to arbitrary peers using the peer protocol. (All peers are treated as untrusted, unless they are clustered with the current server.)

`rippled`

Ideally, the server should be able to send and receive connections on the peer port. You should forward the port used for the peer protocol through your firewall to the rippled server.

`rippled`

IANA has assigned port 2459 for the XRP Ledger peer protocol, but for compatibility with legacy systems, the default rippled config file listens for incoming peer protocol connections on port 51235 on all network interfaces. If you run a server, you can configure which port(s) your server listens on using the rippled.cfg file.

`rippled`

`rippled.cfg`

Example:

```
[port_peer]
port = 2459
ip = 0.0.0.0
protocol = peer
```

The peer protocol port also serves special peer port methods.


## Node Key Pair

When a server first starts up, it generates a node key pair to use to identify itself in peer protocol communications. The server uses its key to sign all its peer protocol communications. This makes it possible to reliably identify and verify the integrity of messages from another server in the peer-to-peer network even if that server's messages are being relayed by untrusted peers.

The node key pair is saved in the database and reused when the server restarts. If you delete the server's databases, it creates a new node key pair, effectively coming online with a different identity. To reuse the same key pair even if the databases are deleted, you can configure the server with a [node_seed] stanza. To generate a value suitable for use in the [node_seed] stanza, use the validation_create method.

`[node_seed]`

`[node_seed]`

The node key pair also identifies other servers for purposes of clustering or reserving peer slots. If you have a cluster of servers, you should configure each server in the cluster with a unique [node_seed] setting. For more information on setting up a cluster, see Cluster rippled Servers.

`[node_seed]`

`rippled`


## Fixed Peers and Peer Reservations

Normally, a rippled server attempts to maintain a healthy number of peers, and automatically connects to untrusted peers up to a maximum number. You can configure a rippled server to remain connected to specific peer servers in several ways:

`rippled`

`rippled`

- Use Fixed Peers to remain always connected to specific other peers based on their IP addresses. This only works if the peers have fixed IP addresses. Use the [ips_fixed] config stanza to configure fixed peers. This is a necessary part of clustering or private peers. Fixed peers are defined in the config file, so changes only apply after restarting the server. Fixed peers are most useful for keeping servers connected if those servers are run by the same person or organization.
- Use Peer Reservations to prioritize specific peers. If your server has a peer reservation for a specific peer, then your server always accepts connection requests from that peer even if your server is already at its maximum number of connected peers. (This can cause your server to go over the maximum number of peers.) You identify a reserved peer by its node key pair, so you can do this even for peers with variable IP addresses. Peer reservations are configured through admin commands and saved in the server databases, so they can be adjusted while the server is online and are saved across restarts. Peer reservations are most useful for connecting servers run by different people or organizations.

`[ips_fixed]`

In the following cases, a rippled server does not connect to untrusted peers:

`rippled`

- If the server is configured as a private peer, it connects only to its fixed peers.
- If the server is running in stand-alone mode it does not connect to any peers.


## Private Peers

You can configure a rippled server to act as a "private" server to keep its IP address hidden from the general public. This can be a useful precaution against denial of service attacks and intrusion attempts on important rippled servers such as trusted validators. To participate in the peer-to-peer network, a private server must be configured to connect to at least one non-private server, which relays its messages to the rest of the network.

`rippled`

`rippled`

CautionIf you configure a private server without any fixed peers, the server cannot connect to the network, so it cannot know network state, broadcast transactions, or participate in the consensus process.

Configuring a server as a private server has several effects:

- The server does not make outgoing connections to other servers in the peer-to-peer network unless it has been explicitly configured to connect to those servers.
- The server does not accept incoming connections from other servers unless it has been explicitly configured to accept connections from those servers.
- The server asks its direct peers not to reveal its IP address in untrusted communications, including the peer crawler API response. This does not affect trusted communications such as the peers admin method.Validators always ask their peers to hide the validators' IP addresses, regardless of the private server settings. This helps protect validators from being overloaded by denial of service attacks.CautionIt is possible to modify a server's source code so that it ignores this request and shares its immediate peers' IP addresses anyway. You should configure your private server to connect only to servers that you know are not modified in this way.

The server does not make outgoing connections to other servers in the peer-to-peer network unless it has been explicitly configured to connect to those servers.

The server does not accept incoming connections from other servers unless it has been explicitly configured to accept connections from those servers.

The server asks its direct peers not to reveal its IP address in untrusted communications, including the peer crawler API response. This does not affect trusted communications such as the peers admin method.

Validators always ask their peers to hide the validators' IP addresses, regardless of the private server settings. This helps protect validators from being overloaded by denial of service attacks.

CautionIt is possible to modify a server's source code so that it ignores this request and shares its immediate peers' IP addresses anyway. You should configure your private server to connect only to servers that you know are not modified in this way.


### Pros and Cons of Peering Configurations

To be part of the XRP Ledger, a rippled server must be connected to the rest of the open peer-to-peer network. Roughly speaking, there are three categories of configurations for how a rippled server connects to the network:

`rippled`

`rippled`

- Using discovered peers. The server connects to any untrusted servers it finds and stays connected as long as those servers behave appropriately. (For example, they don't request too much data, their network connections are stable, and they appear to be following the same network.) This is the default.
- As a private server using proxies run by the same person or organization. The proxies are stock rippled servers (also connected to discovered peers) that maintain a fixed peering connection with the private server.
- As a private server using public hubs. This is similar to using proxies, but it relies on specific third parties.

`rippled`

The pros and cons of each configuration are as follows:

| Configuration | Pros | Cons |
| --- | --- | --- |
| Simplest configuration, with a low maintenance burden.Creates the opportunity for a lot of direct peer connections. Having more direct peers comes with several benefits. Your server can fetch history from multiple peers in parallel, both when syncing and when backfilling history. Since not all peers maintain full history, having access to more peers can also provide access to a wider range of historical data.Lowers the possibility of disconnecting from the network because your server can replace disconnected peers with new ones. | Doesn't allow you to select your server's peers, which means that you have no idea whether your peers may decide to act maliciously. Although `rippled` servers are designed to protect against malicious peers, there is always a risk that malicious peers could exploit software flaws to affect your server.Your server's peers may disconnect or change often. |
| Most secure and reliable configuration when implemented effectively.As reliable and as redundant as you make it.Can optimize the private server's performance with clustering.Enables you to create as many direct peer connections as you want. Your private server can fetch history from multiple peers in parallel. Since you run the peers, you also control how much ledger history each peer keeps. | Higher maintenance burden and cost from running multiple servers.Does not completely rule out the possibility of peer connection outages. No matter how many proxies you run, if they all exist on the same server rack, then one network or power outage can affect all of them. |
| Low maintenance burden with a small amount of configuration.Provides access to safe connections to the network.Compared to connecting using proxies, may be less likely to cause your private server to disconnect from the network due to a simultaneous peer outage. | Depends on high-reputation third parties to remain reliable.May cause your server to become disconnected from the network if the public hubs you rely on are too busy. Due to the nature of public hubs, they are the most popular and may not be able to keep a steady connection open to everyone.To help avoid this issue, use more public hubs; the more the better. It can also help to use non-default hubs, which are less likely to be busy. |


- Simplest configuration, with a low maintenance burden.
- Creates the opportunity for a lot of direct peer connections. Having more direct peers comes with several benefits. Your server can fetch history from multiple peers in parallel, both when syncing and when backfilling history. Since not all peers maintain full history, having access to more peers can also provide access to a wider range of historical data.
- Lowers the possibility of disconnecting from the network because your server can replace disconnected peers with new ones.

Simplest configuration, with a low maintenance burden.

Creates the opportunity for a lot of direct peer connections. Having more direct peers comes with several benefits. Your server can fetch history from multiple peers in parallel, both when syncing and when backfilling history. Since not all peers maintain full history, having access to more peers can also provide access to a wider range of historical data.

Lowers the possibility of disconnecting from the network because your server can replace disconnected peers with new ones.

- Doesn't allow you to select your server's peers, which means that you have no idea whether your peers may decide to act maliciously. Although `rippled` servers are designed to protect against malicious peers, there is always a risk that malicious peers could exploit software flaws to affect your server.
- Your server's peers may disconnect or change often.

Doesn't allow you to select your server's peers, which means that you have no idea whether your peers may decide to act maliciously. Although `rippled` servers are designed to protect against malicious peers, there is always a risk that malicious peers could exploit software flaws to affect your server.

Your server's peers may disconnect or change often.

- Most secure and reliable configuration when implemented effectively.
- As reliable and as redundant as you make it.
- Can optimize the private server's performance with clustering.
- Enables you to create as many direct peer connections as you want. Your private server can fetch history from multiple peers in parallel. Since you run the peers, you also control how much ledger history each peer keeps.

Most secure and reliable configuration when implemented effectively.

As reliable and as redundant as you make it.

Can optimize the private server's performance with clustering.

Enables you to create as many direct peer connections as you want. Your private server can fetch history from multiple peers in parallel. Since you run the peers, you also control how much ledger history each peer keeps.

- Higher maintenance burden and cost from running multiple servers.
- Does not completely rule out the possibility of peer connection outages. No matter how many proxies you run, if they all exist on the same server rack, then one network or power outage can affect all of them.

Higher maintenance burden and cost from running multiple servers.

Does not completely rule out the possibility of peer connection outages. No matter how many proxies you run, if they all exist on the same server rack, then one network or power outage can affect all of them.

- Low maintenance burden with a small amount of configuration.
- Provides access to safe connections to the network.
- Compared to connecting using proxies, may be less likely to cause your private server to disconnect from the network due to a simultaneous peer outage.

Low maintenance burden with a small amount of configuration.

Provides access to safe connections to the network.

Compared to connecting using proxies, may be less likely to cause your private server to disconnect from the network due to a simultaneous peer outage.

- Depends on high-reputation third parties to remain reliable.
- May cause your server to become disconnected from the network if the public hubs you rely on are too busy. Due to the nature of public hubs, they are the most popular and may not be able to keep a steady connection open to everyone.To help avoid this issue, use more public hubs; the more the better. It can also help to use non-default hubs, which are less likely to be busy.

Depends on high-reputation third parties to remain reliable.

May cause your server to become disconnected from the network if the public hubs you rely on are too busy. Due to the nature of public hubs, they are the most popular and may not be able to keep a steady connection open to everyone.

To help avoid this issue, use more public hubs; the more the better. It can also help to use non-default hubs, which are less likely to be busy.


### Configuring a Private Server

To configure your server as a private server, set the [peer_private] setting to 1 in the config file. For detailed instructions, see Configure a Private Server.

`[peer_private]`

`1`


## See Also

- Concepts:ConsensusParallel Networks
- Consensus
- Parallel Networks
- Tutorials:Cluster rippled ServersConfigure a Private ServerConfigure the Peer CrawlerForward Ports for PeeringManually Connect to a Specific PeerSet Maximum Number of PeersUse a Peer Reservation
- Cluster rippled Servers
- Configure a Private Server
- Configure the Peer Crawler
- Forward Ports for Peering
- Manually Connect to a Specific Peer
- Set Maximum Number of Peers
- Use a Peer Reservation
- References:peers methodpeer_reservations_add methodpeer_reservations_del methodpeer_reservations_list methodconnect methodfetch_info methodPeer Crawler
- peers method
- peer_reservations_add method
- peer_reservations_del method
- peer_reservations_list method
- connect method
- fetch_info method
- Peer Crawler

- Consensus
- Parallel Networks

- Cluster rippled Servers
- Configure a Private Server
- Configure the Peer Crawler
- Forward Ports for Peering
- Manually Connect to a Specific Peer
- Set Maximum Number of Peers
- Use a Peer Reservation

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=82eccdae-a766-4111-8b28-0997ad0aba42&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=82eccdae-a766-4111-8b28-0997ad0aba42&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=715c097e-6d1c-4781-a923-724cdb5b044c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=715c097e-6d1c-4781-a923-724cdb5b044c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=3d2b553e-1040-4752-a81a-86938fee2cfa&bo=1&sid=ff4876a09d9a11f0940ca5337b37fa2d&vid=ff48da509d9a11f081ed65c52a592a94&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Peer%20Protocol&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&r=&lt=3698&evt=pageLoad&sv=2&cdb=AQAS&rn=164923)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8e38b115-4673-4563-b379-026b4c3fc2ad&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8e38b115-4673-4563-b379-026b4c3fc2ad&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3fb5b5dd-e491-40d5-ae36-e3c3d66a0345&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3fb5b5dd-e491-40d5-ae36-e3c3d66a0345&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=286e76ca-de3a-4cc2-a97a-49361058e329&pt=Peer%20Protocol&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fpeer-protocol&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/peer-protocol.md)
- [HTTP upgrade](https://tools.ietf.org/html/rfc7230#section-6.7)
- [Overlay Network](https://github.com/XRPLF/rippled/blob/96bbabbd2ece106779bb544aa0e4ce174e99fdf6/src/ripple/overlay/README.md#handshake)
- [rippled repository](https://github.com/ripple/rippled)
- [hardcoded public hubs](https://github.com/XRPLF/rippled/blob/fa57859477441b60914e6239382c6fba286a0c26/src/ripple/overlay/impl/OverlayImpl.cpp#L518-L525)
- [has assigned port 2459](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=2459)
- [default rippled config file](https://github.com/XRPLF/rippled/blob/master/cfg/rippled-example.cfg)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:16:04.056Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
