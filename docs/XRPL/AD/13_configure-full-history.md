# Configure Full History
URL: https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-full-history
Section: AD13

## Overview


## Extracted Content
# Configure Full History

In its default configuration, the rippled server automatically deletes outdated history of XRP Ledger state and transactions as new ledger versions become available. This is enough for most servers, which do not need older history to know the current state and process transactions. However, it can be useful for the network if some servers provide as much history of the XRP Ledger as possible.

`rippled`


## Warnings

Storing full history is expensive. As of 2023-07-19, the full history of the XRP Ledger occupies approximately 26 terabytes of disk space, which must be entirely stored on fast solid state disk drives for proper server performance. Such a large amount of solid state storage is not cheap, and the total amount of history you must store increases by approximately 12 GB per day.

Additionally, storing full history in NuDB requires single files that are larger than the 16 TB limit of ext4 filesystems, which is the default on many Linux distributions. You must use a filesystem with a larger single-file limit, such as XFS (recommended) or ZFS.

Acquiring full history from the peer-to-peer network takes a long time (several months) and requires that your server has enough system and network resources to acquire older history while keeping up with new ledger progress. To get a faster start on acquiring ledger history, you may want to find another server operator who has a large amount of history already downloaded, who can give you a database dump or at least allow your server to explicitly peer with theirs for a long time to acquire history. The server can load ledger history from a file and verify the integrity of the historical ledgers it imports.

You do not need a full history server to participate in the network, validate transactions, or know the current state of the network. Full history is only useful for knowing the outcome of transactions that occurred in the past, or the state of the ledger at a given time in the past. To get such information, you must rely on other servers having the history you need.


## Configuration Steps

To configure your server to acquire and store full history, complete the following steps:

1. Stop the rippled server if it is running.$ sudo systemctl stop rippled
1. Remove (or comment out) the online_delete and advisory_delete settings from the [node_db] stanza of your server's config file, and change the type to NuDB if you haven't already:[node_db]
  type=NuDB
  path=/var/lib/rippled/db/nudb
  #online_delete=300000
  #advisory_delete=0On a full-history server, you should use NuDB for the ledger store, because RocksDB requires too much RAM when the database is that large. For more information, see Capacity Planning. You can remove the following performance-related configuration options from the default [node_db] stanza, because they only apply to RocksDB: open_files, filter_bits, cache_mb, file_size_mb, and file_size_mult.CautionIf you have any history already downloaded with RocksDB, you must either delete that data or change the paths to the databases in the config file when you switch to NuDB. You must change both the path field of the [node_db] stanza and the [database_path] (SQLite database) setting. Otherwise, the server may fail to start.The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Set the [ledger_history] stanza of your server's config file to full:[ledger_history]
full
1. Set the [ips_fixed] stanza of your server's config file to explicitly peer with at least one server that has full history available.[ips_fixed]
169.55.164.20 51235
50.22.123.215 51235Your server can only download historical data from the peer-to-peer network if one its direct peers has the data available. The easiest way to ensure you can download full history is to peer with a server that already has full history.TipRipple makes a pool of full history servers publicly available. You can resolve the domain s2.ripple.com a few times to get the IP addresses of these servers. Ripple offers these servers as a public service, so be aware that their availability to peer with other servers is limited and you may be blocked if you abuse them.
1. If you have a database dump from another full-history server to use as a basis, set the [import_db] stanza of your server's config file to point to the data to be imported. (Otherwise, skip this step.)[import_db]
  type=NuDB
  path=/tmp/full_history_dump/
1. Remove your server's existing database files, if you have any from previously running rippled.After disabling online deletion, the server ignores any data that was downloaded while online deletion was enabled, so you may as well clear up the disk space. For example:rm -r /var/lib/rippled/db/*WarningBe sure that you have not put any files you want to keep in the folder before you delete it. It is generally safe to delete all of a rippled server's database files, but you should only do this if the configured database folder is not used for anything other than rippled's databases.
1. Start the rippled server, importing the database dump if you have one available:If you have a database dump to load configured in [import_db], start the server explicitly and include the --import commandline option:$ /opt/ripple/bin/rippled --conf /etc/opt/ripple/rippled.cfg --importImporting a large database dump may take several minutes or even hours. During this time, the server is not fully started and synced with the network. Watch the server logs to see the status of the import.If you are not importing a database dump, start the server normally:$ sudo systemctl start rippled
1. If you added an [import_db] stanza to your server's config file, remove it after the import completes.Otherwise, your server may try to import the same data again the next time it is restarted.
1. Monitor your server's available history with the server_info method.The range of available ledgers reported in the complete_ledgers field should increase over time.The earliest available ledger version in the production XRP Ledger's history is ledger index 32570. The first two weeks or so of ledger history was lost due to a bug in the server at the time. Test nets and other chains generally have history going back to ledger index 1.

Stop the rippled server if it is running.

`rippled`

```
$ sudo systemctl stop rippled
```

Remove (or comment out) the online_delete and advisory_delete settings from the [node_db] stanza of your server's config file, and change the type to NuDB if you haven't already:

`online_delete`

`advisory_delete`

`[node_db]`

`NuDB`

```
[node_db]
  type=NuDB
  path=/var/lib/rippled/db/nudb
  #online_delete=300000
  #advisory_delete=0
```

On a full-history server, you should use NuDB for the ledger store, because RocksDB requires too much RAM when the database is that large. For more information, see Capacity Planning. You can remove the following performance-related configuration options from the default [node_db] stanza, because they only apply to RocksDB: open_files, filter_bits, cache_mb, file_size_mb, and file_size_mult.

`[node_db]`

`open_files`

`filter_bits`

`cache_mb`

`file_size_mb`

`file_size_mult.`

CautionIf you have any history already downloaded with RocksDB, you must either delete that data or change the paths to the databases in the config file when you switch to NuDB. You must change both the path field of the [node_db] stanza and the [database_path] (SQLite database) setting. Otherwise, the server may fail to start.

`path`

`[node_db]`

`[database_path]`

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Set the [ledger_history] stanza of your server's config file to full:

`[ledger_history]`

`full`

```
[ledger_history]
full
```

Set the [ips_fixed] stanza of your server's config file to explicitly peer with at least one server that has full history available.

`[ips_fixed]`

```
[ips_fixed]
169.55.164.20 51235
50.22.123.215 51235
```

Your server can only download historical data from the peer-to-peer network if one its direct peers has the data available. The easiest way to ensure you can download full history is to peer with a server that already has full history.

TipRipple makes a pool of full history servers publicly available. You can resolve the domain s2.ripple.com a few times to get the IP addresses of these servers. Ripple offers these servers as a public service, so be aware that their availability to peer with other servers is limited and you may be blocked if you abuse them.

`s2.ripple.com`

If you have a database dump from another full-history server to use as a basis, set the [import_db] stanza of your server's config file to point to the data to be imported. (Otherwise, skip this step.)

`[import_db]`

```
[import_db]
  type=NuDB
  path=/tmp/full_history_dump/
```

Remove your server's existing database files, if you have any from previously running rippled.

`rippled`

After disabling online deletion, the server ignores any data that was downloaded while online deletion was enabled, so you may as well clear up the disk space. For example:

```
rm -r /var/lib/rippled/db/*
```

WarningBe sure that you have not put any files you want to keep in the folder before you delete it. It is generally safe to delete all of a rippled server's database files, but you should only do this if the configured database folder is not used for anything other than rippled's databases.

`rippled`

`rippled`

Start the rippled server, importing the database dump if you have one available:

`rippled`

If you have a database dump to load configured in [import_db], start the server explicitly and include the --import commandline option:

`[import_db]`

`--import`

```
$ /opt/ripple/bin/rippled --conf /etc/opt/ripple/rippled.cfg --import
```

Importing a large database dump may take several minutes or even hours. During this time, the server is not fully started and synced with the network. Watch the server logs to see the status of the import.

If you are not importing a database dump, start the server normally:

```
$ sudo systemctl start rippled
```

If you added an [import_db] stanza to your server's config file, remove it after the import completes.

`[import_db]`

Otherwise, your server may try to import the same data again the next time it is restarted.

Monitor your server's available history with the server_info method.

The range of available ledgers reported in the complete_ledgers field should increase over time.

`complete_ledgers`

The earliest available ledger version in the production XRP Ledger's history is ledger index 32570. The first two weeks or so of ledger history was lost due to a bug in the server at the time. Test nets and other chains generally have history going back to ledger index 1.


## See Also

- Concepts:Ledger Historyrippled Server Modes
- Ledger History
- rippled Server Modes
- Tutorials:Capacity Planning, particularly Disk SpaceConfigure Online DeletionDiagnosing Problems with rippledUnderstanding Log Messages
- Capacity Planning, particularly Disk Space
- Configure Online Deletion
- Diagnosing Problems with rippled
- Understanding Log Messages
- References:server_info methodcan_delete methodLedger Data Formatsrippled Commandline Usage Reference
- server_info method
- can_delete method
- Ledger Data Formats
- rippled Commandline Usage Reference

- Ledger History
- rippled Server Modes

- Capacity Planning, particularly Disk Space
- Configure Online Deletion
- Diagnosing Problems with rippled
- Understanding Log Messages

- server_info method
- can_delete method
- Ledger Data Formats
- rippled Commandline Usage Reference

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f321015-fc82-499a-93e3-5c96168aeaa9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f321015-fc82-499a-93e3-5c96168aeaa9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a5e5a88f-562e-49fe-a949-3847661571c4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a5e5a88f-562e-49fe-a949-3847661571c4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c4b3530e-46ed-439d-b84d-96adef83f7d1&bo=1&sid=36f2edc09daa11f0a4cbe56f2084360e&vid=36f368b09daa11f0bb1fc78b1c9eeea4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20Full%20History&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&r=&lt=2188&evt=pageLoad&sv=2&cdb=AQAS&rn=804249)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b87b9705-ebbc-42a1-a535-3196bd2cfaeb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b87b9705-ebbc-42a1-a535-3196bd2cfaeb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f5b8fb2d-ac69-43ad-a612-67fd5731a613&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f5b8fb2d-ac69-43ad-a612-67fd5731a613&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2081c62d-a295-40bf-90ab-57ea6a4231ec&pt=Configure%20Full%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-full-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-full-history#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-full-history#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-full-history#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-full-history#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/data-retention/configure-full-history.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:04:58.197Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
