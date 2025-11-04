# Configure Online Deletion
URL: https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-online-deletion
Section: AD15

## Overview


## Extracted Content
# Configure Online Deletion

In its default configuration, the rippled server deletes history older than the most recent 2000 ledger versions, keeping approximately 15 minutes of ledger history (based on the current rate between ledgers). This page describes how to configure the amount of history your rippled server stores before deleting.

`rippled`

`rippled`


## Prerequisites

This tutorial assumes your server meets the following prerequisites:

- You are on a supported operating system: Ubuntu Linux, Red Hat Enterprise Linux (RHEL), or CentOS.
- The rippled server is already installed and online deletion is enabled.If you followed the installation instructions for a recommended platform, online deletion is enabled by default.
- Your server has enough disk space to store your chosen amount of history in its ledger store.

You are on a supported operating system: Ubuntu Linux, Red Hat Enterprise Linux (RHEL), or CentOS.

The rippled server is already installed and online deletion is enabled.

`rippled`

If you followed the installation instructions for a recommended platform, online deletion is enabled by default.

Your server has enough disk space to store your chosen amount of history in its ledger store.


## Configuration Steps

To change the amount of history your server stores, perform the following steps:

1. Decide how many ledger versions' worth of history to store.New ledger versions are usually validated 3 to 4 seconds apart, so the number of ledger versions corresponds roughly to the amount of time you want to store. See Capacity Planning for details of how much storage is required for different configurations.Online deletion is based on how many ledger versions to keep after deleting history, so you should have enough disk space to store twice as many ledgers as you set it to keep.
1. In your rippled's config file, edit the online_delete field of the [node_db] stanza.[node_db]
# Other settings unchanged ...
  online_delete=300000
  advisory_delete=0Set online_delete to the minimum number of ledger versions to keep after running online deletion. With automatic deletion (the default), the server typically runs deletion when it has accumulated about twice this many ledger versions.The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Start (or restart) the rippled service.$ sudo systemctl restart rippled
1. Wait for your server to sync to the network.Depending on your network and system capabilities and how long your server was offline, it may take between 5 and 15 minutes to fully sync.When your server is synced with the network, the server_info method reports a server_state value of "full", "proposing", or "validating".
1. Periodically check your server's complete_ledgers range using the server_info method to confirm that ledgers are being deleted.After online deletion runs, the complete_ledgers range reflects that older ledgers are no longer available. As your server accumulates history, the total number of ledgers available should slowly increase to twice the online_delete value you configured, then decrease when online deletion runs.
1. Monitor your rippled logs for messages that begin with SHAMapStore::WRN. This can indicate that online deletion is being interrupted because your server fell out of sync with the network.If this happens regularly, your server may not have sufficient specifications to keep up with the ledger while running online deletion. Check that other services on the same hardware (such as scheduled backups or security scans) aren't competing with the rippled server for resources. You may want to try any of the following:Increase your system specs. See System Requirements for recommendations.Change your configuration to store less history. (Step 2 of this tutorial)Change your server's node_size parameter.Use NuDB instead of RocksDB for the ledger store.Schedule online deletion using Advisory Deletion.
1. Increase your system specs. See System Requirements for recommendations.
1. Change your configuration to store less history. (Step 2 of this tutorial)
1. Change your server's node_size parameter.
1. Use NuDB instead of RocksDB for the ledger store.
1. Schedule online deletion using Advisory Deletion.

Decide how many ledger versions' worth of history to store.

New ledger versions are usually validated 3 to 4 seconds apart, so the number of ledger versions corresponds roughly to the amount of time you want to store. See Capacity Planning for details of how much storage is required for different configurations.

Online deletion is based on how many ledger versions to keep after deleting history, so you should have enough disk space to store twice as many ledgers as you set it to keep.

In your rippled's config file, edit the online_delete field of the [node_db] stanza.

`rippled`

`online_delete`

`[node_db]`

```
[node_db]
# Other settings unchanged ...
  online_delete=300000
  advisory_delete=0
```

Set online_delete to the minimum number of ledger versions to keep after running online deletion. With automatic deletion (the default), the server typically runs deletion when it has accumulated about twice this many ledger versions.

`online_delete`

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
$ sudo systemctl restart rippled
```

Wait for your server to sync to the network.

Depending on your network and system capabilities and how long your server was offline, it may take between 5 and 15 minutes to fully sync.

When your server is synced with the network, the server_info method reports a server_state value of "full", "proposing", or "validating".

`server_state`

`"full"`

`"proposing"`

`"validating"`

Periodically check your server's complete_ledgers range using the server_info method to confirm that ledgers are being deleted.

`complete_ledgers`

After online deletion runs, the complete_ledgers range reflects that older ledgers are no longer available. As your server accumulates history, the total number of ledgers available should slowly increase to twice the online_delete value you configured, then decrease when online deletion runs.

`complete_ledgers`

`online_delete`

Monitor your rippled logs for messages that begin with SHAMapStore::WRN. This can indicate that online deletion is being interrupted because your server fell out of sync with the network.

`rippled`

`SHAMapStore::WRN`

If this happens regularly, your server may not have sufficient specifications to keep up with the ledger while running online deletion. Check that other services on the same hardware (such as scheduled backups or security scans) aren't competing with the rippled server for resources. You may want to try any of the following:

`rippled`

- Increase your system specs. See System Requirements for recommendations.
- Change your configuration to store less history. (Step 2 of this tutorial)
- Change your server's node_size parameter.
- Use NuDB instead of RocksDB for the ledger store.
- Schedule online deletion using Advisory Deletion.

`node_size`


## See Also

- Concepts:Ledger HistoryOnline Deletion
- Ledger HistoryOnline Deletion
- Online Deletion
- Tutorials:Configure Advisory DeletionCapacity Planning
- Configure Advisory Deletion
- Capacity Planning
- References:server_info methodLedger Data Formats
- server_info method
- Ledger Data Formats

- Ledger HistoryOnline Deletion
- Online Deletion

- Online Deletion

- Configure Advisory Deletion
- Capacity Planning

- server_info method
- Ledger Data Formats

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9215858b-1404-4e65-8d5c-fd85f80b21ff&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9215858b-1404-4e65-8d5c-fd85f80b21ff&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9459b665-9a62-497b-a7dc-01e9d7bc0e57&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9459b665-9a62-497b-a7dc-01e9d7bc0e57&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=7b67fcee-e6c8-4b08-b079-b42b283f1983&bo=1&sid=586045f09daa11f0bea2ab9a40597b3d&vid=5860cf309daa11f0ba22fb6d2dc588e6&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20Online%20Deletion&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&r=&lt=4776&evt=pageLoad&sv=2&cdb=AQAS&rn=436123)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5ca3892e-a167-4233-928d-ebdaffa88aa6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5ca3892e-a167-4233-928d-ebdaffa88aa6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d5fd792-be54-4d90-a3b5-e3d6161d59d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d5fd792-be54-4d90-a3b5-e3d6161d59d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=01d4bac3-716d-456a-a407-61a66fdae859&pt=Configure%20Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-online-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-online-deletion#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-online-deletion#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-online-deletion#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-online-deletion#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.7eb672ceebb263898c1df54d721a891f.1759201542892.1759201542892.1759201542892.1&__hssc=78174987.1.1759201542892&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/data-retention/configure-online-deletion.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.7eb672ceebb263898c1df54d721a891f.1759201542892.1759201542892.1759201542892.1&__hssc=78174987.1.1759201542892&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:05:51.014Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
