# rippled Server Won't Start
URL: https://xrpl.org/docs/infrastructure/troubleshooting/server-wont-start
Section: AF6

## Overview


## Extracted Content
# rippled Server Won't Start

This page explains possible reasons the rippled server does not start and how to fix them.

`rippled`

These instructions assume you have installed rippled on a supported platform.

`rippled`


## File Descriptors Limit

On some Linux variants, you may get an error message such as the following when trying to run rippled:

`rippled`

```
WARNING: There are only 1024 file descriptors (soft limit) available, which
limit the number of simultaneous connections.
```

This occurs because the system has a security limit on the number of files a single process may open, but the limit is set too low for rippled. To fix the problem, root access is required. Increase the number of files rippled is allowed to open with the following steps:

`rippled`

`rippled`

1. Add the following lines to the end of your /etc/security/limits.conf file:*                soft    nofile          65536
*                hard    nofile          65536
1. Check that the hard limit on number of files that can be opened is now 65536:ulimit -HnThe command should output 65536.
1. Try starting rippled again.systemctl start rippled
1. If rippled still does not start, open /etc/sysctl.conf and append the following kernel-level setting:fs.file-max = 65536

Add the following lines to the end of your /etc/security/limits.conf file:

`/etc/security/limits.conf`

```
*                soft    nofile          65536
*                hard    nofile          65536
```

Check that the hard limit on number of files that can be opened is now 65536:

`65536`

```
ulimit -Hn
```

The command should output 65536.

`65536`

Try starting rippled again.

`rippled`

```
systemctl start rippled
```

If rippled still does not start, open /etc/sysctl.conf and append the following kernel-level setting:

`rippled`

`/etc/sysctl.conf`

```
fs.file-max = 65536
```


## Failed to open /etc/opt/ripple/rippled.cfg

If rippled crashes on startup with an error such as the following, it means that rippled cannot read its config file:

`rippled`

`rippled`

```
Loading: "/etc/opt/ripple/rippled.cfg"
Failed to open '"/etc/opt/ripple/rippled.cfg"'.
Terminating thread rippled: main: unhandled St13runtime_error 'Can not create "/var/opt/ripple"'
Aborted (core dumped)
```

Possible solutions:

- Check that the config file exists (the default location is /etc/opt/ripple/rippled.cfg) and the user that runs your rippled process (usually rippled) has read permissions to the file.
- Create a config file that can be read by the rippled user at $HOME/.config/ripple/rippled.cfg (where $HOME points to the rippled user's home directory).TipThe rippled repository contains an example rippled.cfg file which is provided as the default config when you do an installation from a binary package. If you do not have the file, you can copy it from there.
- Specify the path to your preferred config file using the --conf commandline option.

Check that the config file exists (the default location is /etc/opt/ripple/rippled.cfg) and the user that runs your rippled process (usually rippled) has read permissions to the file.

`/etc/opt/ripple/rippled.cfg`

`rippled`

`rippled`

Create a config file that can be read by the rippled user at $HOME/.config/ripple/rippled.cfg (where $HOME points to the rippled user's home directory).

`rippled`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

TipThe rippled repository contains an example rippled.cfg file which is provided as the default config when you do an installation from a binary package. If you do not have the file, you can copy it from there.

`rippled`

`rippled.cfg`

Specify the path to your preferred config file using the --conf commandline option.

`--conf`


## Failed to open validators file

If rippled crashes on startup with an error such as the following, it means it can read its primary config file, but that config file specifies a separate validators config file (typically named validators.txt), which rippled cannot read.

`rippled`

`validators.txt`

`rippled`

```
Loading: "/home/rippled/.config/ripple/rippled.cfg"
Terminating thread rippled: main: unhandled St13runtime_error 'The file specified in [validators_file] does not exist: /home/rippled/.config/ripple/validators.txt'
Aborted (core dumped)
```

Possible solutions:

- Check that the validators.txt file exists and the rippled user has permissions to read it.TipThe rippled repository contains an example validators.txt file which is provided as the default config when you do an installation from a binary package. If you do not have the file, you can copy it from there.
- Edit your rippled.cfg file and modify the [validators_file] setting to have the correct path to your validators.txt (or equivalent) file. Check for extra whitespace before or after the filename.
- Edit your rippled.cfg file and remove the [validators_file] setting. Add validator settings directly to your rippled.cfg file. For example:[validator_list_sites]
https://vl.ripple.com

[validator_list_keys]
ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734

Check that the validators.txt file exists and the rippled user has permissions to read it.

`validators.txt`

`rippled`

TipThe rippled repository contains an example validators.txt file which is provided as the default config when you do an installation from a binary package. If you do not have the file, you can copy it from there.

`rippled`

`validators.txt`

Edit your rippled.cfg file and modify the [validators_file] setting to have the correct path to your validators.txt (or equivalent) file. Check for extra whitespace before or after the filename.

`rippled.cfg`

`[validators_file]`

`validators.txt`

Edit your rippled.cfg file and remove the [validators_file] setting. Add validator settings directly to your rippled.cfg file. For example:

`rippled.cfg`

`[validators_file]`

`rippled.cfg`

```
[validator_list_sites]
https://vl.ripple.com

[validator_list_keys]
ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734
```


## Cannot create database path

If rippled crashes on startup with an error such as the following, it means the server does not have write permissions to the [database_path] from its config file.

`rippled`

`[database_path]`

```
Loading: "/home/rippled/.config/ripple/rippled.cfg"
Terminating thread rippled: main: unhandled St13runtime_error 'Can not create "/var/lib/rippled/db"'
Aborted (core dumped)
```

The paths to the configuration file (/home/rippled/.config/ripple/rippled.cfg) and the database path (/var/lib/rippled/db) may vary depending on your system.

`/home/rippled/.config/ripple/rippled.cfg`

`/var/lib/rippled/db`

Possible solutions:

- Run rippled as a different user that has write permissions to the database path printed in the error message.
- Edit your rippled.cfg file and change the [database_path] setting to use a path that the rippled user has write permissions to.
- Grant the rippled user write permissions to the configured database path.

Run rippled as a different user that has write permissions to the database path printed in the error message.

`rippled`

Edit your rippled.cfg file and change the [database_path] setting to use a path that the rippled user has write permissions to.

`rippled.cfg`

`[database_path]`

`rippled`

Grant the rippled user write permissions to the configured database path.

`rippled`


## State DB Error

The following error can occur if the rippled server's state database is corrupted. This can occur as the result of being shutdown unexpectedly, or if you change the type of database from RocksDB to NuDB without changing the path and [database_path] settings in the config file.

`rippled`

`path`

`[database_path]`

```
2018-Aug-21 23:06:38.675117810 SHAMapStore:ERR state db error:
  writableDbExists false archiveDbExists false
  writableDb '/var/lib/rippled/db/rocksdb/rippledb.11a9' archiveDb '/var/lib/rippled/db/rocksdb/rippledb.2d73'

To resume operation, make backups of and remove the files matching /var/lib/rippled/db/state* and contents of the directory /var/lib/rippled/db/rocksdb

Terminating thread rippled: main: unhandled St13runtime_error 'state db error'
```

The easiest way to fix this problem is to delete the databases entirely. You may want to back them up elsewhere instead. For example:

```
mv /var/lib/rippled/db /var/lib/rippled/db-bak
```

Or, if you are sure you don't need the databases:

```
rm -r /var/lib/rippled/db
```

TipIt is generally safe to delete the rippled databases, because any individual server can re-download ledger history from other servers in the XRP Ledger network.

`rippled`

Alternatively, you can change the paths to the databases in the config file. For example:

```
[node_db]
type=NuDB
path=/var/lib/rippled/custom_nudb_path

[database_path]
/var/lib/rippled/custom_sqlite_db_path
```


## Online Delete is Less Than Ledger History

An error message such as the following indicates that the rippled.cfg file has contradictory values for [ledger_history] and online_delete.

`rippled.cfg`

`[ledger_history]`

`online_delete`

```
Terminating thread rippled: main: unhandled St13runtime_error 'online_delete must not be less than ledger_history (currently 3000)
```

The [ledger_history] setting represents how many ledgers of history the server should seek to back-fill. The online_delete field (in the [node_db] stanza) indicates how many ledgers of history to keep when dropping older history. The online_delete value must be equal to or larger than [ledger_history] to prevent the server from deleting historical ledgers that it is also trying to download.

`[ledger_history]`

`online_delete`

`[node_db]`

`online_delete`

`[ledger_history]`

To fix the problem, edit the rippled.cfg file and change or remove either the [ledger_history] or online_delete options. (If you omit [ledger_history], it uses a default of 256 ledger versions. If you specify the online_delete field, it must be larger than 256. If you omit online_delete, it disables automatic deletion of old ledger versions.)

`rippled.cfg`

`[ledger_history]`

`online_delete`

`[ledger_history]`

`online_delete`

`online_delete`


## Bad node_size value

An error such as the following indicates that the rippled.cfg file has an improper value for the node_size setting:

`rippled.cfg`

`node_size`

```
Terminating thread rippled: main: unhandled N5beast14BadLexicalCastE 'std::bad_cast'
```

Valid parameters for the node_size field are tiny, small, medium, large, or huge. For more information see Node Size.

`node_size`

`tiny`

`small`

`medium`

`large`

`huge`


## See Also

- Concepts:The rippled ServerTechnical FAQ
- The rippled Server
- Technical FAQ
- Tutorials:Understanding Log MessagesCapacity Planning
- Understanding Log Messages
- Capacity Planning
- References:rippled API Referencerippled Commandline Usageserver_info method
- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- The rippled Server
- Technical FAQ

`rippled`

- Understanding Log Messages
- Capacity Planning

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a57e3f97-56b3-4454-b62d-83ea9ded6d5f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a57e3f97-56b3-4454-b62d-83ea9ded6d5f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=315506af-5805-4951-94b8-dcdb27cffe05&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=315506af-5805-4951-94b8-dcdb27cffe05&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a0dc2374-1501-461d-a8ba-38b753d2bbaf&bo=1&sid=c73231909dab11f0812c270a4901cae9&vid=c73292809dab11f094dbe53b8036540c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=rippled%20Server%20Won't%20Start&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&r=&lt=2583&evt=pageLoad&sv=2&cdb=AQAS&rn=817701)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=be493d5f-4b15-4826-a937-17a7973f79f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=be493d5f-4b15-4826-a937-17a7973f79f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dfc4fdd3-d294-4737-b58c-f6b98f70a96c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dfc4fdd3-d294-4737-b58c-f6b98f70a96c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7721cbf-b14b-4c61-b9b6-4b251e249345&pt=rippled%20Server%20Won't%20Start&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-wont-start&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/troubleshooting/server-wont-start#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/troubleshooting/server-wont-start#)
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
- [Resources](https://xrpl.org/docs/infrastructure/troubleshooting/server-wont-start#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/troubleshooting/server-wont-start#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c13d576210c05772dd860d439311c66d.1759202157290.1759202157290.1759202157290.1&__hssc=78174987.1.1759202157290&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/troubleshooting/server-wont-start.md)
- [hard limit on number of files that can be opened](https://ss64.com/bash/ulimit.html)
- [an example rippled.cfg file](https://github.com/XRPLF/rippled/blob/master/cfg/rippled-example.cfg)
- [an example validators.txt file](https://github.com/XRPLF/rippled/blob/master/cfg/validators-example.txt)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c13d576210c05772dd860d439311c66d.1759202157290.1759202157290.1759202157290.1&__hssc=78174987.1.1759202157290&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:16:12.297Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
