# Online Deletion
URL: https://xrpl.org/docs/infrastructure/configuration/data-retention/online-deletion
Section: AD14

## Overview


## Extracted Content
# Online Deletion

[Source]

The online deletion feature lets the rippled server delete the server's local copy of old ledger versions to keep disk usage from rapidly growing over time. The default config file sets online deletion to run automatically, but online deletion can also be configured to run only when prompted.

`rippled`

The server always keeps the complete current state of the ledger, with all the balances and settings it contains. The deleted data includes older transactions and versions of the ledger state that are older than the stored history.

The default config file sets the rippled server to keep the most recent 2000 ledger versions and automatically delete older data.

`rippled`

TipEven with online deletion, the amount of disk space required to store the same time span's worth of ledger data increases over time, because the size of individual ledger versions tends to grow over time. This growth is very slow in comparison to the accumulation of data that occurs without deleting old ledgers. For more information on disk space needs, see Capacity Planning.


## Background

The rippled server stores ledger history in its ledger store. This data accumulates over time.

`rippled`

Inside the ledger store, ledger data is "de-duplicated". In other words, data that doesn't change from version to version is only stored once. The records themselves in the ledger store do not indicate which ledger version(s) contain them; part of the work of online deletion is identifying which records are only used by outdated ledger versions. This process is time consuming and affects the disk I/O and application cache, so the server cannot delete old data every time it closes a new ledger.


## Online Deletion Behavior

The online deletion settings configure how many ledger versions the rippled server should keep available in the ledger store at a time. However, the specified number is a guideline, not a hard rule:

`rippled`

- The server never deletes data more recent than the configured number of ledger versions, but it may have less than that amount available if it has not been running for long enough or if it lost sync with the network at any time. (The server attempts to backfill at least some history; see fetching history for details.)
- The server may store up to slightly over twice the configured number of ledger versions if online deletion is set to run automatically. (Each time it runs, it reduces the number of stored ledger versions to approximately the configured number.)If online deletion is delayed because the server is busy, ledger versions can continue to accumulate. When functioning normally, online deletion begins when the server has twice the configured number of ledger versions, but it may not complete until after several more ledger versions have accumulated.
- If advisory deletion is enabled, the server stores all the ledger versions that it has acquired and built until its administrator calls the can_delete method.The amount of data the server stores depends on how often you call can_delete and how big an interval of time your online_delete setting represents:If you call can_delete more often than your online_delete interval, the server stores up to twice the online_delete number of ledger versions. (After deletion, this is reduced to approximately the online_delete value.)For example, if you call can_delete with a value of now once per day and an online_delete value of 50,000, the server typically stores up to 100,000 ledger versions before running deletion. After running deletion, the server keeps at least 50,000 ledger versions (about two days' worth). With this configuration, approximately every other can_delete call results in no change because the server does not have enough ledger versions to delete.If you call can_delete less often than your online_delete interval, the server stores at most ledger versions spanning an amount of time that is approximately twice the interval between can_delete calls. (After deletion, this is reduced to approximately one interval's worth of data.)For example, if you call can_delete with a value of now once per day and an online_delete value of 2000, the server typically stores up to two full days' worth of ledger versions before running deletion. After running deletion, the server keeps approximately one day's worth (about 25,000 ledger versions), but never fewer than 2000 ledger versions.
- If you call can_delete more often than your online_delete interval, the server stores up to twice the online_delete number of ledger versions. (After deletion, this is reduced to approximately the online_delete value.)For example, if you call can_delete with a value of now once per day and an online_delete value of 50,000, the server typically stores up to 100,000 ledger versions before running deletion. After running deletion, the server keeps at least 50,000 ledger versions (about two days' worth). With this configuration, approximately every other can_delete call results in no change because the server does not have enough ledger versions to delete.
- If you call can_delete less often than your online_delete interval, the server stores at most ledger versions spanning an amount of time that is approximately twice the interval between can_delete calls. (After deletion, this is reduced to approximately one interval's worth of data.)For example, if you call can_delete with a value of now once per day and an online_delete value of 2000, the server typically stores up to two full days' worth of ledger versions before running deletion. After running deletion, the server keeps approximately one day's worth (about 25,000 ledger versions), but never fewer than 2000 ledger versions.

The server never deletes data more recent than the configured number of ledger versions, but it may have less than that amount available if it has not been running for long enough or if it lost sync with the network at any time. (The server attempts to backfill at least some history; see fetching history for details.)

The server may store up to slightly over twice the configured number of ledger versions if online deletion is set to run automatically. (Each time it runs, it reduces the number of stored ledger versions to approximately the configured number.)

If online deletion is delayed because the server is busy, ledger versions can continue to accumulate. When functioning normally, online deletion begins when the server has twice the configured number of ledger versions, but it may not complete until after several more ledger versions have accumulated.

If advisory deletion is enabled, the server stores all the ledger versions that it has acquired and built until its administrator calls the can_delete method.

The amount of data the server stores depends on how often you call can_delete and how big an interval of time your online_delete setting represents:

`online_delete`

- If you call can_delete more often than your online_delete interval, the server stores up to twice the online_delete number of ledger versions. (After deletion, this is reduced to approximately the online_delete value.)For example, if you call can_delete with a value of now once per day and an online_delete value of 50,000, the server typically stores up to 100,000 ledger versions before running deletion. After running deletion, the server keeps at least 50,000 ledger versions (about two days' worth). With this configuration, approximately every other can_delete call results in no change because the server does not have enough ledger versions to delete.
- If you call can_delete less often than your online_delete interval, the server stores at most ledger versions spanning an amount of time that is approximately twice the interval between can_delete calls. (After deletion, this is reduced to approximately one interval's worth of data.)For example, if you call can_delete with a value of now once per day and an online_delete value of 2000, the server typically stores up to two full days' worth of ledger versions before running deletion. After running deletion, the server keeps approximately one day's worth (about 25,000 ledger versions), but never fewer than 2000 ledger versions.

If you call can_delete more often than your online_delete interval, the server stores up to twice the online_delete number of ledger versions. (After deletion, this is reduced to approximately the online_delete value.)

`can_delete`

`online_delete`

`online_delete`

`online_delete`

For example, if you call can_delete with a value of now once per day and an online_delete value of 50,000, the server typically stores up to 100,000 ledger versions before running deletion. After running deletion, the server keeps at least 50,000 ledger versions (about two days' worth). With this configuration, approximately every other can_delete call results in no change because the server does not have enough ledger versions to delete.

`can_delete`

`now`

`online_delete`

`can_delete`

If you call can_delete less often than your online_delete interval, the server stores at most ledger versions spanning an amount of time that is approximately twice the interval between can_delete calls. (After deletion, this is reduced to approximately one interval's worth of data.)

`can_delete`

`online_delete`

`can_delete`

For example, if you call can_delete with a value of now once per day and an online_delete value of 2000, the server typically stores up to two full days' worth of ledger versions before running deletion. After running deletion, the server keeps approximately one day's worth (about 25,000 ledger versions), but never fewer than 2000 ledger versions.

`can_delete`

`now`

`online_delete`

With online deletion enabled and running automatically (that is, with advisory delete disabled), the total amount of ledger data stored should remain at minimum equal to the number of ledger versions the server is configured to keep, with the maximum being roughly twice that many.

When online deletion runs, it does not reduce the size of SQLite database files on disk; it only makes space within those files available to be reused for new data. Online deletion does reduce the size of RocksDB or NuDB database files containing the ledger store.

The server only counts validated ledger versions when deciding how far back it can delete. In exceptional circumstances where the server is unable to validate new ledger versions (either because of an outage in its local network connection or because the global XRP Ledger network is unable to reach a consensus) rippled continues to close ledgers so that it can recover quickly when the network is restored. In this case, the server may accumulate many closed but not validated ledger versions. These unvalidated ledgers do not affect how many validated ledger versions the server keeps before running online deletion.

`rippled`


### Interrupting Online Deletion

Online deletion automatically stops if the server state becomes less than full. If this happens, the server writes a log message with the prefix SHAMapStore::WRN. The server attempts to start online deletion again after the next validated ledger version after becoming fully synced.

`full`

`SHAMapStore::WRN`

If you stop the server or it crashes while online deletion is running, online deletion resumes after the server is restarted and the server becomes fully synced.

To temporarily disable online deletion, you can use the can_delete method with an argument of never. This change persists until you re-enable online deletion by calling can_delete again. For more information on controlling when online deletion happens, see Advisory Deletion.

`never`


## Configuration

The following settings relate to online deletion:

- online_delete - Specify how many validated ledger versions to keep. The server periodically deletes any ledger versions that are older than this number. If not specified, no ledgers are deleted.The default config file specifies 2000 for this value. This cannot be less than 256, because some events like Fee Voting and the Amendment Process update only every 256 ledgers.CautionIf you run rippled with online_delete disabled, then later enable online_delete and restart the server, the server disregards but does not delete existing ledger history that your server already downloaded while online_delete was disabled. To save disk space, delete your existing history before re-starting the server after changing the online_delete setting.
- [ledger_history] - Specify how many validated ledgers to backfill. Must be equal to or less than online_delete. If the server does not have at least this many validated ledger versions, it attempts to fetch the data from peers when it can.The default for this setting is 256 ledgers.The following diagram shows the relationship between online_delete and ledger_history settings:With advisory deletionWithout advisory deletionBackfill if possibleDelete automaticallyonline_delete setting, or mostrecent can_delete point,whichever is olderonline_delete settingledger_history settingBackfill if possibleKeep if availableDelete automaticallyLedger versionsoldestnewestLedger versionsoldestnewest
- advisory_delete - If enabled, online deletion is not scheduled automatically. Instead, an administrator must manually trigger online deletion. Use the value 0 for disabled or 1 for enabled.This setting is disabled by default.
- [fetch_depth] - Specify how many ledger versions to serve to peers. The server does not accept fetch requests from peers for historical data that is older than the specified number of ledger versions. Specify the value full to serve any available data to peers.The default for fetch_depth is full (serve all available data).The fetch_depth setting cannot be higher than online_delete if both are specified. If fetch_depth is set higher, the server treats it as equal to online_delete instead.The following diagram shows how fetch_depth works:fetch_depth settingLedgers served to peerswhen requestedLedgers available locally butnot served to peersLedgers not storedLedger versionsoldestnewest

online_delete - Specify how many validated ledger versions to keep. The server periodically deletes any ledger versions that are older than this number. If not specified, no ledgers are deleted.

`online_delete`

The default config file specifies 2000 for this value. This cannot be less than 256, because some events like Fee Voting and the Amendment Process update only every 256 ledgers.

CautionIf you run rippled with online_delete disabled, then later enable online_delete and restart the server, the server disregards but does not delete existing ledger history that your server already downloaded while online_delete was disabled. To save disk space, delete your existing history before re-starting the server after changing the online_delete setting.

`rippled`

`online_delete`

`online_delete`

`online_delete`

`online_delete`

[ledger_history] - Specify how many validated ledgers to backfill. Must be equal to or less than online_delete. If the server does not have at least this many validated ledger versions, it attempts to fetch the data from peers when it can.

`[ledger_history]`

`online_delete`

The default for this setting is 256 ledgers.

The following diagram shows the relationship between online_delete and ledger_history settings:

`online_delete`

`ledger_history`

With advisory deletionWithout advisory deletionBackfill if possibleDelete automaticallyonline_delete setting, or mostrecent can_delete point,whichever is olderonline_delete settingledger_history settingBackfill if possibleKeep if availableDelete automaticallyLedger versionsoldestnewestLedger versionsoldestnewest

advisory_delete - If enabled, online deletion is not scheduled automatically. Instead, an administrator must manually trigger online deletion. Use the value 0 for disabled or 1 for enabled.

`advisory_delete`

`0`

`1`

This setting is disabled by default.

[fetch_depth] - Specify how many ledger versions to serve to peers. The server does not accept fetch requests from peers for historical data that is older than the specified number of ledger versions. Specify the value full to serve any available data to peers.

`[fetch_depth]`

`full`

The default for fetch_depth is full (serve all available data).

`fetch_depth`

`full`

The fetch_depth setting cannot be higher than online_delete if both are specified. If fetch_depth is set higher, the server treats it as equal to online_delete instead.

`fetch_depth`

`online_delete`

`fetch_depth`

`online_delete`

The following diagram shows how fetch_depth works:

`fetch_depth`

fetch_depth settingLedgers served to peerswhen requestedLedgers available locally butnot served to peersLedgers not storedLedger versionsoldestnewest

For estimates of how much disk space is required to store different amounts of history, see Capacity Planning.


### Advisory Deletion

The default config file schedules online deletion to happen automatically and periodically. If the config file does not specify an online_delete interval, online deletion does not occur. If config file enables the advisory_delete setting, online deletion only happens when an administrator triggers it using the can_delete method.

`online_delete`

`advisory_delete`

You can use advisory deletion with a scheduled job to trigger automatic deletion based on clock time instead of the number of ledger versions closed. If your server is heavily used, the extra load from online deletion can cause your server to fall behind and temporarily de-sync from the consensus network. If this is the case, you can use advisory deletion and schedule online deletion to happen only during off-peak times.

You can use advisory deletion for other reasons. For example, you may want to manually confirm that transaction data is backed up to a separate server before deleting it. Alternatively, you may want to manually confirm that a separate task has finished processing transaction data before you delete that data.

The can_delete API method can enable or disable automatic deletion, in general or up to a specific ledger version, as long as advisory_delete is enabled in the config file. These settings changes persist even if you restart the rippled server, unless you disable advisory_delete in the config file before restarting.

`can_delete`

`advisory_delete`

`rippled`

`advisory_delete`


## How It Works

Online deletion works by creating two databases: at any given time, there is an "old" database, which is read-only, and a "current" database, which is writable. The rippled server can read objects from either database, so current ledger versions may contain objects in either one. If an object in a ledger does not change from ledger version to ledger version, only one copy of that object remains in the database, so the server does not store redundant copies of that object. When a new ledger version modifies an object, the server stores the modified object in the "new" database, while the previous version of the object (which is still used by previous ledger versions) remains in the "old" database.

`rippled`

When it comes time for online deletion, the server first walks through the oldest ledger version to keep, and copies all objects in that ledger version from the read-only "old" database into the "current" database. This guarantees that the "current" database now contains all objects used in the chosen ledger version and all newer versions. Then, the server deletes the "old" database, and changes the existing "current" database to become "old" and read-only. The server starts a new "current" database to contain any newer changes after this point.

LegendAfter online deletion"Current" DBbecomes"Old" DBNew "Current" DBbegins emptyOnline deletioncopies objects to the"current" database ifthose objects are stillbeing used by currentledgers."Current" DB (Writable)"Old" DB (Read-only)Online deletiondrops entire"Old" DBThe "current" DB cancontain outdatedobjects, but it's lesslikely to."Old" DB (Read-only)During online deletion"Current" DB (Writable)Before online deletionObjects included in recentledger version(s)Objects not used in anyrecent ledger version"Current" DB (Writable)"Old" DB (Read-only)


## See Also

- Concepts:LedgersConsensus
- Ledgers
- Consensus
- Tutorials:Capacity PlanningConfigure rippledConfigure Online DeletionConfigure Advisory DeletionConfigure Full History
- Capacity Planning
- Configure rippledConfigure Online DeletionConfigure Advisory DeletionConfigure Full History
- Configure Online Deletion
- Configure Advisory Deletion
- Configure Full History
- References:ledger methodserver_info methodledger_request methodcan_delete methodledger_cleaner method
- ledger method
- server_info method
- ledger_request method
- can_delete method
- ledger_cleaner method

- Ledgers
- Consensus

- Capacity Planning
- Configure rippledConfigure Online DeletionConfigure Advisory DeletionConfigure Full History
- Configure Online Deletion
- Configure Advisory Deletion
- Configure Full History

`rippled`

- Configure Online Deletion
- Configure Advisory Deletion
- Configure Full History

- ledger method
- server_info method
- ledger_request method
- can_delete method
- ledger_cleaner method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=362e4513-1964-4c6b-b732-bfccb700b7d5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=362e4513-1964-4c6b-b732-bfccb700b7d5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=08666e56-1541-40c2-92f7-3cf80575e2af&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=08666e56-1541-40c2-92f7-3cf80575e2af&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=977ffa41-c404-49af-a1a0-0caf6da8c4bd&bo=1&sid=4616b3f09daa11f0bcad4f5991c572f7&vid=461709709daa11f0890a811fa4a1d41a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Online%20Deletion&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&r=&lt=2802&evt=pageLoad&sv=2&cdb=AQAS&rn=494363)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c43ac108-9a23-4999-9bdf-55a2e22cc997&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c43ac108-9a23-4999-9bdf-55a2e22cc997&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fe10d269-a4c9-4005-9207-90bba2530596&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fe10d269-a4c9-4005-9207-90bba2530596&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=68f299b2-dfe9-443f-b778-98e75b136b6c&pt=Online%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fonline-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/data-retention/online-deletion#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/data-retention/online-deletion#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/data-retention/online-deletion#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/data-retention/online-deletion#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/data-retention/online-deletion.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/app/misc/SHAMapStoreImp.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:05:28.792Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
