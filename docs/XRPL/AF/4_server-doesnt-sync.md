# rippled Server Doesn't Sync
URL: https://xrpl.org/docs/infrastructure/troubleshooting/server-doesnt-sync
Section: AF4

## Overview


## Extracted Content
# rippled Server Doesn't Sync

This page explains possible reasons a rippled server may start successfully, but get stuck in a "connected" state without ever fully connecting to the network. (If the server crashes during or shortly after startup, see Server Won't Start instead.)

`rippled`

These instructions assume you have installed rippled on a supported platform.

`rippled`


## Normal Syncing Behavior

Syncing with the network normally takes about 5 to 15 minutes. During that time, the server does several things:

- Loads a recommended validator list (for example, from vl.ripple.com) to determine which validators it trusts.
- Discovers peer servers and connects to them.
- Listens to its trusted validators to find which ledger hashes have been recently validated.
- Downloads the full latest ledger from its peers, and uses that to build its internal database of ledger data.
- Collects newly-broadcast transactions and attempts to apply them to its in-progress ledger.

`vl.ripple.com`

If the server is unable to keep up with the network while doing these tasks, the server does not sync to the network.


## First Step: Restart

Many syncing issues can be resolved by restarting the server. No matter why it didn't sync the first time, it may succeed on the second try.

If the server_info method shows a server_state other than proposing or full and a server_state_duration_us of more than 900000000 (15 minutes in microseconds), then you should shut down the rippled service, wait a few seconds, and start it again. Optionally, restart the entire machine.

`server_state`

`proposing`

`full`

`server_state_duration_us`

`900000000`

`rippled`

If the problem persists, check the other possibilities listed on this page. If none of them seem to apply, open an issue in the rippled repository and add the "Syncing issue" label.

`rippled`


## Usual Causes of Syncing Issues

The most common cause of syncing issues is not meeting the system requirements. The three most common shortfalls are:

- Slow disks. You need a consistently fast solid state disk (SSD). Cloud providers like AWS usually don't guarantee disk performance, because it depends on hardware shared with other customers.
- Insufficient RAM. The memory requirements vary depending on several factors including ones that are hard to predict like network load and how people use the XRP Ledger, so it's good to have more than the minimum system requirements.
- Poor network connection. Network requirements vary the most based on how people use the XRP Ledger, but a slow or unstable connection can make it impossible to keep up with new transactions and data added to the XRP Ledger.

If you are having trouble remaining synced, double-check that your server meets the system requirements. Depending on how you use your server, you may need to meet the higher "Recommended" requirements. If you meet the "Recommended" requirements and still cannot sync, try the other possibilities on this page.


## Couldn't Load Validator List

The default configuration uses a recommended list of validators retrieved from vl.ripple.com. This list is signed by Ripple's cryptographic key pair and has a built-in expiration date. If your server cannot download the list from vl.ripple.com for some reason, your server does not choose a set of trusted validators and cannot determine which possible ledgers to declare as valid. (If you are connected to the testnet or another parallel network, your server uses a list of trusted validators for that network instead.)

`vl.ripple.com`

`vl.ripple.com`

The validator_list block in the server_info method response shows the status of your validator list including its expiration date. If you have a list, but it's expired, it's possible that your server had connectivity to the validator list site before but hasn't been able to connect lately, so your current list expired while your server was unable to download a more updated list.

`validator_list`

You can also use the validator_list_sites method to get more detailed information. If the last_refresh_status and last_refresh_time fields are missing from the validator site objects in the response, that probably indicates that your server is having trouble connecting to the validator list site. Check your firewall configuration to make sure you're not blocking outgoing traffic on port 80 (HTTP) or 443 (HTTPS). Also check that your DNS is able to resolve the domain of your validator list site.

`last_refresh_status`

`last_refresh_time`


## Not Enough Peers

If your server does not connect to enough peer servers, it may not be able to download enough data to remain synced with the network as the network continues processing new transactions. This can happen if your network connection is unreliable, or if you configure your server as a private server without adding enough reliable fixed peers.

Use the peers method to get information about your server's current peers. If you have exactly 10 or 11 peers, that may indicate that your firewall is blocking incoming peer connections. Set up port forwarding to allow more incoming connections. If your server is configured as a private server, double-check the contents and syntax of the [ips_fixed] stanza in your config file, and add more proxies or public hubs if possible.

`[ips_fixed]`


## Corrupt Databases

In rare cases, corrupt data saved in your rippled server's internal databases could cause it to fail to sync. You can safely delete your server's databases in most circumstances as long as the server is not running. Corrupt data can be the result of a momentary hardware failure when copying or writing to disk, a more serious disk failure, a different process crashing and writing to the wrong part of the disk, or other issues.

`rippled`

As a test, you can temporarily change the paths to your server's databases as long as you have enough free space to re-download the current ledger and store other settings.

NoteWhen you change the database paths, the server does not load some saved settings, such as the server's current node key pair and peer reservations. If changing the database paths fixes your server' syncing problems, you may want to re-create some of these settings.

1. Stop the rippled server if it is running.$ sudo systemctl stop rippled
1. Create new empty folders to hold the fresh databases.$ mkdir /var/lib/rippled/db_new/
$ mkdir /var/lib/rippled/db_new/nudb
1. Edit the config file to use the new paths. Be sure to change the path field of the [node_db] stanza and the value of the [database_path] stanza.[node_db]
type=NuDB
path=/var/lib/rippled/db_new/nudb

[database_path]
 /var/lib/rippled/db_newThe recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Start the rippled server again.$ sudo systemctl start rippledIf the server successfully syncs using the fresh databases, you can delete the folders that hold the old databases. You may also want to check for hardware failures, especially to your disk and RAM.

Stop the rippled server if it is running.

`rippled`

```
$ sudo systemctl stop rippled
```

Create new empty folders to hold the fresh databases.

```
$ mkdir /var/lib/rippled/db_new/
$ mkdir /var/lib/rippled/db_new/nudb
```

Edit the config file to use the new paths. Be sure to change the path field of the [node_db] stanza and the value of the [database_path] stanza.

`path`

`[node_db]`

`[database_path]`

```
[node_db]
type=NuDB
path=/var/lib/rippled/db_new/nudb

[database_path]
 /var/lib/rippled/db_new
```

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Start the rippled server again.

`rippled`

```
$ sudo systemctl start rippled
```

If the server successfully syncs using the fresh databases, you can delete the folders that hold the old databases. You may also want to check for hardware failures, especially to your disk and RAM.


## See Also

- Concepts:The rippled ServerPeer ProtocolTechnical FAQ
- The rippled Server
- Peer Protocol
- Technical FAQ
- Tutorials:Understanding Log MessagesCapacity Planning
- Understanding Log Messages
- Capacity Planning
- References:rippled API Referencepeers methodserver_info methodvalidator_list_sites method
- rippled API Referencepeers methodserver_info methodvalidator_list_sites method
- peers method
- server_info method
- validator_list_sites method

- The rippled Server
- Peer Protocol
- Technical FAQ

`rippled`

- Understanding Log Messages
- Capacity Planning

- rippled API Referencepeers methodserver_info methodvalidator_list_sites method
- peers method
- server_info method
- validator_list_sites method

- peers method
- server_info method
- validator_list_sites method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c68bce7e-07ea-4283-b877-f525ea6e10e1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c68bce7e-07ea-4283-b877-f525ea6e10e1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4b9452bf-a7e9-4424-bf98-50e2bfd12d0e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4b9452bf-a7e9-4424-bf98-50e2bfd12d0e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=32c439ca-e394-4fa1-a461-bd364579489e&bo=1&sid=a7f8f3c09dab11f08079599705f1c79c&vid=a7f9a5b09dab11f097d0f5d86f9706fe&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=rippled%20Server%20Doesn't%20Sync&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&r=&lt=2884&evt=pageLoad&sv=2&cdb=AQAS&rn=99238)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=185351b5-ad15-43a1-833d-de328d43ee6d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=185351b5-ad15-43a1-833d-de328d43ee6d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6a414549-454d-4485-a7f0-035adb2feed2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6a414549-454d-4485-a7f0-035adb2feed2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4229855a-c29f-40f5-9f59-a4c8c52305b2&pt=rippled%20Server%20Doesn't%20Sync&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-doesnt-sync&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/troubleshooting/server-doesnt-sync#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/troubleshooting/server-doesnt-sync#)
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
- [Resources](https://xrpl.org/docs/infrastructure/troubleshooting/server-doesnt-sync#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/troubleshooting/server-doesnt-sync#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/troubleshooting/server-doesnt-sync.md)
- [open an issue in the rippled repository](https://github.com/XRPLF/rippled/issues)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:15:18.986Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
