# Fix SQLite Transaction Database Page Size Issue
URL: https://xrpl.org/docs/infrastructure/troubleshooting/fix-sqlite-tx-db-page-size-issue
Section: AF7

## Overview


## Extracted Content
# Fix SQLite Transaction Database Page Size Issue

rippled servers with full ledger history (or a very large amount of transaction history) and a database that was initially created with a rippled version earlier than 0.40.0 (released January 2017) may encounter a problem with their SQLite database page size that stops the server from operating properly. Servers that store only recent transaction history (the default configuration) and servers whose database files were created with rippled version 0.40.0 and later are not likely to have this problem.

`rippled`

`rippled`

`rippled`

This document describes steps to detect and correct this problem if it occurs.


## Background

rippled servers store a copy of their transaction history in a SQLite database. Before version 0.40.0, rippled configured this database to have a capacity of roughly 2 TB. For most uses, this is plenty. However, full transaction history back to ledger 32570 (the oldest ledger version available in the production XRP Ledger history) is likely to exceed this exceed the SQLite database capacity. rippled servers version 0.40.0 and later create their SQLite database files with a larger capacity, so they are unlikely to encounter this problem.

`rippled`

`rippled`

`rippled`

The capacity of the SQLite database is a result of the database's page size parameter, which cannot be easily changed after the database is created. (For more information on SQLite's internals, see the official SQLite documentation.) The database can reach its capacity even if there is still free space on the disk and filesystem where it is stored. As described in the Fix below, reconfiguring the page size to avoid this problem requires a somewhat time-consuming migration process.

TipFull history is not necessary for most use cases. Servers with full transaction history may be useful for long-term analysis and archive purposes or as a precaution against disasters.


## Detection

If your server is vulnerable to this problem, you can detect it two ways:

- You can detect the problem proactively (before it causes problems) if your rippled server is version 1.1.0 or later.
- You can identify the problem reactively (when your server is crashing) on any rippled version.

`rippled`

`rippled`

In both cases, detection of the problem requires access to rippled's server logs.

`rippled`

TipThe location of the debug log depends on your rippled server's config file. The default configuration writes the server's debug log to the file /var/log/rippled/debug.log.

`rippled`

`/var/log/rippled/debug.log`


### Proactive Detection

To detect the SQLite page size problem proactively, you must be running rippled 1.1.0 or later. The rippled server writes a message such as the following in its debug log periodically, at least once every 2 minutes. (The exact numeric values from the log entry and the path to your transaction database depend on your environment.)

`rippled`

`rippled`

```
Transaction DB pathname: /opt/rippled/transaction.db; SQLite page size: 1024
  bytes; Free pages: 247483646; Free space: 253423253504 bytes; Note that this
  does not take into account available disk space.
```

The value SQLite page size: 1024 bytes indicates that your transaction database is configured with a smaller page size and does not have capacity for full transaction history. If the value is already 4096 bytes or higher, then your SQLite database should already have adequate capacity to store full transaction history and you do not need to perform the migration described in this document.

`SQLite page size: 1024 bytes`

The rippled server halts if the Free space described in this log message becomes less than 524288000 bytes (500 MB). If your free space is approaching that threshold, fix the problem to avoid an unexpected outage.

`rippled`

`Free space`


### Reactive Detection

If your server's SQLite database capacity has already been exceeded, the rippled service writes a log message indicating the problem and halts.

`rippled`


#### rippled 1.1.0 and Later

On rippled versions 1.1.0 and later, the server shuts down gracefully with a message such as the following in the server's debug log:

`rippled`

```
Free SQLite space for transaction db is less than 512MB. To fix this, rippled
  must be executed with the vacuum <sqlitetmpdir> parameter before restarting.
  Note that this activity can take multiple days, depending on database size.
```


#### Earlier than rippled 1.1.0

On rippled versions before 1.1.0, the server crashes repeatedly with messages such as the following in the server's debug log:

`rippled`

```
Terminating thread doJob: AcquisitionDone: unhandled
  N4soci18sqlite3_soci_errorE 'sqlite3_statement_backend::loadOne: database or
  disk is full while executing "INSERT INTO [...]
```


## Fix

You can fix this issue using rippled on supported Linux systems according to the steps described in this document. In the case of a full-history server with system specs approximately matching the recommended hardware configuration, the process may take more than two full days.

`rippled`


### Prerequisites

- You must be running rippled version 1.1.0 or later.Upgrade rippled to the latest stable version before starting this process.You can check what version of rippled you have installed locally by running the following command:rippled --version
- Upgrade rippled to the latest stable version before starting this process.
- You can check what version of rippled you have installed locally by running the following command:rippled --version
- You must have enough free space to temporarily store a second copy of the transaction database, in a directory that is writable by the rippled user. This free space does not need to be in the same filesystem as the existing transaction database.The transaction database is stored in the transaction.db file in the folder specified by your configuration's [database_path] setting. You can check the size of this file to see how much free space you need. For example:ls -l /var/lib/rippled/db/transaction.db

You must be running rippled version 1.1.0 or later.

`rippled`

- Upgrade rippled to the latest stable version before starting this process.
- You can check what version of rippled you have installed locally by running the following command:rippled --version

Upgrade rippled to the latest stable version before starting this process.

You can check what version of rippled you have installed locally by running the following command:

`rippled`

```
rippled --version
```

You must have enough free space to temporarily store a second copy of the transaction database, in a directory that is writable by the rippled user. This free space does not need to be in the same filesystem as the existing transaction database.

`rippled`

The transaction database is stored in the transaction.db file in the folder specified by your configuration's [database_path] setting. You can check the size of this file to see how much free space you need. For example:

`transaction.db`

`[database_path]`

```
ls -l /var/lib/rippled/db/transaction.db
```


### Migration Process

To migrate your transaction database to a larger page size, perform the following steps:

1. Check that you meet all the prerequisites.
1. Create a folder to store temporary files during the migration process.mkdir /tmp/rippled_txdb_migration
1. Grant the rippled user ownership of the temporary folder so it can write files there. (This is not necessary if your temporary folder is somewhere the rippled user already has write access to.)chown rippled /tmp/rippled_txdb_migration
1. Confirm that your temporary folder has enough free space to store a copy of the transaction database.For example, compare the Avail output from the df command to the size of your transaction.db file.df -h /tmp/rippled_txdb_migration

Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2       5.4T  2.6T  2.6T  50% /tmp
1. If rippled is still running, stop it:sudo systemctl stop rippled
1. Open a screen session (or other similar tool) so that the process does not stop when you log out:screen
1. Become the rippled user:sudo su - rippled
1. Run rippled executable directly, providing the --vacuum command with the path to the temporary directory:/opt/ripple/bin/rippled -q --vacuum /tmp/rippled_txdb_migrationThe rippled executable immediately displays the following message:VACUUM beginning. page_size: 1024
1. Wait for the process to complete. This can take more than two full days.When the process is complete, the rippled executable displays the following message, then exits:VACUUM finished. page_size: 4096While you wait, you can detach your screen session by pressing CTRL-A, then D. Later, you can reattach your screen session with a command such as the following:screen -x -rWhen the process is over, exit the screen session:exitFor more information on the screen command, see the official Screen User's Manual or any of the other many resources available online.
1. Restart the rippled service.sudo systemctl start rippled
1. Confirm that the rippled service started successfully.You can use the commandline interface to check the server status (unless you have configured your server not to accept JSON-RPC requests). For example:/opt/ripple/bin/rippled server_infoFor a description of the expected response from this command, see the server_info method documentation.
1. Watch the server's debug log to confirm that the SQLite page size is now 4096:tail -F /var/log/rippled/debug.logThe periodic log message should also show significantly more free pages and free pages than it did before the migration.
1. Optionally, you may now remove the temporary folder you created for the migration process.rm -r /tmp/rippled_txdb_migrationIf you mounted additional storage to hold the temporary copy of the transaction database, you can unmount and remove it now.

Check that you meet all the prerequisites.

Create a folder to store temporary files during the migration process.

```
mkdir /tmp/rippled_txdb_migration
```

Grant the rippled user ownership of the temporary folder so it can write files there. (This is not necessary if your temporary folder is somewhere the rippled user already has write access to.)

`rippled`

`rippled`

```
chown rippled /tmp/rippled_txdb_migration
```

Confirm that your temporary folder has enough free space to store a copy of the transaction database.

For example, compare the Avail output from the df command to the size of your transaction.db file.

`Avail`

`df`

`transaction.db`

```
df -h /tmp/rippled_txdb_migration

Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2       5.4T  2.6T  2.6T  50% /tmp
```

If rippled is still running, stop it:

`rippled`

```
sudo systemctl stop rippled
```

Open a screen session (or other similar tool) so that the process does not stop when you log out:

`screen`

```
screen
```

Become the rippled user:

`rippled`

```
sudo su - rippled
```

Run rippled executable directly, providing the --vacuum command with the path to the temporary directory:

`rippled`

`--vacuum`

```
/opt/ripple/bin/rippled -q --vacuum /tmp/rippled_txdb_migration
```

The rippled executable immediately displays the following message:

`rippled`

```
VACUUM beginning. page_size: 1024
```

Wait for the process to complete. This can take more than two full days.

When the process is complete, the rippled executable displays the following message, then exits:

`rippled`

```
VACUUM finished. page_size: 4096
```

While you wait, you can detach your screen session by pressing CTRL-A, then D. Later, you can reattach your screen session with a command such as the following:

`screen`

```
screen -x -r
```

When the process is over, exit the screen session:

```
exit
```

For more information on the screen command, see the official Screen User's Manual or any of the other many resources available online.

`screen`

Restart the rippled service.

`rippled`

```
sudo systemctl start rippled
```

Confirm that the rippled service started successfully.

`rippled`

You can use the commandline interface to check the server status (unless you have configured your server not to accept JSON-RPC requests). For example:

```
/opt/ripple/bin/rippled server_info
```

For a description of the expected response from this command, see the server_info method documentation.

Watch the server's debug log to confirm that the SQLite page size is now 4096:

`SQLite page size`

```
tail -F /var/log/rippled/debug.log
```

The periodic log message should also show significantly more free pages and free pages than it did before the migration.

Optionally, you may now remove the temporary folder you created for the migration process.

```
rm -r /tmp/rippled_txdb_migration
```

If you mounted additional storage to hold the temporary copy of the transaction database, you can unmount and remove it now.


## See Also

- Concepts:The rippled ServerLedger History
- The rippled Server
- Ledger History
- Tutorials:Understanding Log MessagesConfigure Full History
- Understanding Log Messages
- Configure Full History
- References:rippled API Referencerippled Commandline Usageserver_info method
- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- The rippled Server
- Ledger History

`rippled`

- Understanding Log Messages
- Configure Full History

- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- rippled Commandline Usage
- server_info method

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=36101a42-bc03-48ca-863d-9ec1bab1099a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=36101a42-bc03-48ca-863d-9ec1bab1099a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9275b424-ee41-41b8-ab2c-05dd3cf2eb53&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9275b424-ee41-41b8-ab2c-05dd3cf2eb53&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=5b6e03cd-8721-4152-8f64-94961ec9028a&bo=1&sid=d968a4c09dab11f0ab8e4bf49b2459ca&vid=d96955d09dab11f08f8a310fdc4f31b7&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&r=&lt=5050&evt=pageLoad&sv=2&cdb=AQAS&rn=143922)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8ad66417-698d-4e2e-80f5-cbabd5d2624e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8ad66417-698d-4e2e-80f5-cbabd5d2624e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=90404e12-3c16-4504-9dde-d138dabf7e49&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=90404e12-3c16-4504-9dde-d138dabf7e49&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=59737f3d-18dc-4550-9c32-59cb18a95de6&pt=Fix%20SQLite%20Transaction%20Database%20Page%20Size%20Issue&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Ffix-sqlite-tx-db-page-size-issue&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/troubleshooting/fix-sqlite-tx-db-page-size-issue#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/troubleshooting/fix-sqlite-tx-db-page-size-issue#)
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
- [Resources](https://xrpl.org/docs/infrastructure/troubleshooting/fix-sqlite-tx-db-page-size-issue#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/troubleshooting/fix-sqlite-tx-db-page-size-issue#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/troubleshooting/fix-sqlite-tx-db-page-size-issue.md)
- [the official SQLite documentation](https://www.sqlite.org/fileformat.html)
- [default configuration](https://github.com/XRPLF/rippled/blob/master/cfg/rippled-example.cfg#L1139-L1142)
- [the official Screen User's Manual](https://www.gnu.org/software/screen/manual/screen.html)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:16:46.206Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
