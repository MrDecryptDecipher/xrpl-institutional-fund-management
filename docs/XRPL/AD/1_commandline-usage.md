# Commandline Usage
URL: https://xrpl.org/docs/infrastructure/commandline-usage
Section: AD1

## Overview


## Extracted Content
# Commandline Usage

The rippled executable usually runs as a daemon that powers the XRP Ledger, although it can also run in other modes. This page describes all the options you can pass to rippled when running it from the command line.

`rippled`

`rippled`


## Available Modes

- Daemon Mode - The default. Connect to the XRP Ledger to process transactions and build a ledger database.
- Stand-Alone Mode - Use the -a or --standalone option. Like daemon mode, except it does not connect to other servers. You can use this mode to test transaction processing or other features.
- Client Mode - Specify an API method name to connect to another rippled server as a JSON-RPC client, then exit. You can use this to look up server status and ledger data if the executable is already running in another process.
- Other Usage - Each of the following commands causes the rippled executable to print some information, then exit:Help - Use -h or --help to print a usage statement.Unit Tests - Use -u or --unittest to run unit tests and print a summary of results. This can be helpful to confirm that you have compiled rippled successfully.Version statement - Use --version to have rippled print its version number, Git commit hash, and Git build branch.
- Help - Use -h or --help to print a usage statement.
- Unit Tests - Use -u or --unittest to run unit tests and print a summary of results. This can be helpful to confirm that you have compiled rippled successfully.
- Version statement - Use --version to have rippled print its version number, Git commit hash, and Git build branch.

`-a`

`--standalone`

`rippled`

`rippled`

- Help - Use -h or --help to print a usage statement.
- Unit Tests - Use -u or --unittest to run unit tests and print a summary of results. This can be helpful to confirm that you have compiled rippled successfully.
- Version statement - Use --version to have rippled print its version number, Git commit hash, and Git build branch.

`-h`

`--help`

`-u`

`--unittest`

`rippled`

`--version`

`rippled`


## Generic Options

These options apply to most modes:

| Option | Description |
| --- | --- |
| --conf {FILE} | Use {FILE} as the config file instead of looking for config files in the default locations. If not specified, rippled first checks the local working directory for a rippled.cfg file. On Linux, if that file is not found, rippled next checks for $XDG_CONFIG_HOME/ripple/ripple.cfg. (Typically, $XDG_CONFIG_HOME maps to $HOME/.config.) |


`--conf {FILE}`

`{FILE}`

`rippled`

`rippled.cfg`

`rippled`

`$XDG_CONFIG_HOME/ripple/ripple.cfg`

`$XDG_CONFIG_HOME`

`$HOME/.config`


### Verbosity Options

The following generic options affect the amount of information written to standard output and log files:

| Option | Short Version | Description |
| --- | --- | --- |
| --debug |  | DEPRECATED Enables trace-level debugging (alias for --verbose). Use the log_level method instead. |
| --silent |  | Don't write logs to standard out and standard error during startup. Recommended when starting rippled as a systemd unit to reduce redundant logging. |
| --verbose | -v | DEPRECATED Enables trace-level debugging. Use the log_level method instead. |


`--debug`

`--verbose`

`--silent`

`rippled`

`--verbose`

`-v`


## Daemon Mode Options

```
rippled [OPTIONS]
```

Daemon mode is the default mode of operation for rippled. In addition to the Generic Options, you can provide any of the following:

`rippled`

| Option | Description |
| --- | --- |
| --fg | Run the daemon as a single process in the foreground. Otherwise, rippled forks a second process for the daemon while the first process runs as a monitor. |
| --import | Before fully starting, import ledger data from another rippled server's ledger store. Requires a valid [import_db] stanza in the config file. |
| --newnodeid | Generate a random node identity for the server. |
| --nodeid {VALUE} | Specify a node identity. {VALUE} can also be a parameter associated with the container or hardware running the server, such as $HOSTNAME. |
| --quorum {QUORUM} | This option is intended for starting test networks. Override the minimum quorum for validation by requiring an agreement of {QUORUM} trusted validators. By default, the quorum for validation is automatically set to a safe number of trusted validators based on how many there are. If some validators are not online, this option can allow progress with a lower than normal quorum. WarningIf you set the quorum manually, it may be too low to prevent your server from diverging from the rest of the network. Only use this option if you have a deep understanding of consensus and have a need to use a non-standard configuration. |


`--fg`

`rippled`

`--import`

`rippled`

`[import_db]`

`--newnodeid`

`--nodeid {VALUE}`

`{VALUE}`

`$HOSTNAME`

`--quorum {QUORUM}`

`{QUORUM}`

The following options have been removed: --validateShards  and --nodetoshard .

`--validateShards`

`--nodetoshard`


## Stand-Alone Mode Options

```
rippled --standalone [OPTIONS]
rippled -a [OPTIONS]
```

Run in stand-alone mode. In this mode, rippled does not connect to the network or perform consensus. (Otherwise, rippled runs in daemon mode.)

`rippled`

`rippled`


## Initial Ledger Options

The following options determine which ledger to load first when starting up. These options are intended for debugging and for starting networks. These options work with both stand-alone mode and network mode. By default, the server loads its initial ledger using a combination of saved local data and data downloaded from the peer-to-peer network based on what ledger has been most recently validated by the network.

| Option | Description |
| --- | --- |
| --ledger {LEDGER} | Load the ledger version identified by {LEDGER} (either a ledger hash or a ledger index) as the initial ledger. The specified ledger version must be in the server's ledger store. |
| --ledgerfile {FILE} | Load the ledger version from the specified {FILE}, which must contain a complete ledger in JSON format. For an example of such a file, see the provided ledger-file.json. |
| --load | Use only the ledger store on disk when loading the initial ledger. |
| --net | Use only data from the network when loading the initial ledger. |
| --replay | Use with --ledger to replay a specific ledger. Your server must have the ledger in question and its direct ancestor already in the ledger store. Using the previous ledger as a base, the server processes all the transactions in the specified ledger, resulting in a re-creation of the specified ledger. With a debugger, you can add breakpoints to analyze specific transaction processing logic. |
| --start | Start with a new genesis ledger that has known amendments enabled, based on their default votes. This makes the functionality of those amendments available right away, instead of needing to wait two weeks for the Amendment Process. See also: Start a New Genesis Ledger in Stand-Alone Mode. |
| --valid | Consider the initial ledger a valid network ledger even before fully syncing with the network. This can be used for starting networks or rolling back an entire network to a known previous state, as long as 80% of that network's validators load the same ledger at around the same time. |


`--ledger {LEDGER}`

`{LEDGER}`

`--ledgerfile {FILE}`

`{FILE}`

`ledger-file.json`

`--load`

`--net`

`--replay`

`--ledger`

`--start`

`--valid`


## Client Mode Options

```
rippled [OPTIONS] -- {COMMAND} {COMMAND_PARAMETERS}
```

In client mode, the rippled executable acts as a client to another rippled service. (The service may be the same executable running in a separate process locally, or it could be a rippled server on another server.)

`rippled`

`rippled`

`rippled`

To run in client mode, provide the commandline syntax for one of the rippled API methods.

`rippled`

Besides the individual commands, client mode accepts the Generic Options and the following options:

| Option | Description |
| --- | --- |
| --rpc | Explicitly specify that the server should run in client mode. Not required. |
| --rpc_ip {IP_ADDRESS} | Connect to the rippled server at the specified IP Address, optionally including a port number. |
| --rpc_port {PORT} | DEPRECATED Connect to the rippled server on the specified port. Specify the port alongside the IP address using --rpc_ip instead. |


`--rpc`

`--rpc_ip {IP_ADDRESS}`

`rippled`

`--rpc_port {PORT}`

`rippled`

`--rpc_ip`

TipSome arguments accept negative numbers as values. To ensure that arguments to API commands are not interpreted as options instead, pass the -- argument before the command name.

`--`

Example usage (get account transaction history from the earliest available to latest available ledger versions):

```
rippled -- account_tx r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59 -1 -1
```


## Unit Tests

```
rippled --unittest [OPTIONS]
rippled -u [OPTIONS]
```

Unit testing runs tests built into the rippled source code to confirm that the executable performs as expected. After running unit tests, the process displays a summary of results and exits. Unit tests cover functionality such as built-in data types and transaction processing routines.

`rippled`

If unit testing reports a failure, that generally indicates one of the following:

- A problem occurred when compiling rippled and it is not functioning as intended
- The source code for rippled contains a bug
- A unit test has a bug or has not been updated to account for new behavior

`rippled`

`rippled`

While running unit tests, you can specify the Generic Options and any of the following options:

| Option | Short Version | Description |
| --- | --- | --- |
| --unittest-ipv6 |  | Use IPv6 to connect to the local server when running unit tests. If not provided, unit tests use IPv4 instead. |
| --unittest-jobs {NUMBER_OF_JOBS} |  | Use the specified number of processes to run unit tests. This can finish running tests faster on multi-core systems. The {NUMBER_OF_JOBS} should be a positive integer indicating the number of processes to use. |
| --unittest-log |  | Allow unit tests to write to logs even if --quiet is specified. (No effect otherwise.) |
| --quiet | -q | Print fewer diagnostic messages when running unit tests. |


`--unittest-ipv6`

`--unittest-jobs {NUMBER_OF_JOBS}`

`{NUMBER_OF_JOBS}`

`--unittest-log`

`--quiet`

`--quiet`

`-q`


### Specific Unit Tests

```
rippled --unittest={TEST_OR_PACKAGE_NAME}
```

By default, rippled runs all unit tests except ones that are classified as "manual". You can run an individual test by specifying its name, or run a subset of tests by specifying a package name.

`rippled`

Tests are grouped into a hierarchy of packages separated by . characters and ending in the test case name.

`.`


#### Printing Unit Tests

```
rippled --unittest=print
```

The print unit test is a special case that prints a list of available tests with their packages.

`print`


#### Manual Unit Tests

Certain unit tests are classified as "manual" because they take a long time to complete. These tests are marked with |M| in the output of the print unit test. Manual tests do not run by default when you run all unit tests or a package of unit tests. You can run manual tests individually by specifying the name of the test. For example:

`|M|`

`print`

```
$ ./rippled --unittest=ripple.tx.OversizeMeta
ripple.tx.OversizeMeta
Longest suite times:
   60.9s ripple.tx.OversizeMeta
60.9s, 1 suite, 1 case, 9016 tests total, 0 failures
```


#### Providing Arguments to Unit Tests

Certain manual unit tests accept an argument. You can provide the argument with the following option:

| Option | Description |
| --- | --- |
| --unittest-arg {ARG} | Provide the argument {ARG} to the unit test(s) currently being run. Each unit test that accepts arguments defines its own argument format. |


`--unittest-arg {ARG}`

`{ARG}`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Removed in: rippled 1.7.0](https://img.shields.io/badge/Removed in-rippled 1.7.0-red.svg)

![Removed in: rippled 2.3.0](https://img.shields.io/badge/Removed in-rippled 2.3.0-red.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=50ec20e3-41ad-42ce-a1e8-6130809c9e36&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=50ec20e3-41ad-42ce-a1e8-6130809c9e36&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6abaa0b3-bb4e-4d12-bd49-229760683f4b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6abaa0b3-bb4e-4d12-bd49-229760683f4b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1737bf36-1aea-428c-bdaf-a42754e251c9&bo=1&sid=9d5faaa09da911f0a28183304a31e681&vid=9d6027509da911f09dbe37f9be3b8c3c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Commandline%20Usage&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&r=&lt=2787&evt=pageLoad&sv=2&cdb=AQAS&rn=290042)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=96cd14e9-a625-41fe-a1a1-0c602cdfa8ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=96cd14e9-a625-41fe-a1a1-0c602cdfa8ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a2bd74cf-0d26-4ec6-be37-9183e0ae3797&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a2bd74cf-0d26-4ec6-be37-9183e0ae3797&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e9bbf6f-689d-44f6-a42b-7abce4471b7f&pt=Commandline%20Usage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fcommandline-usage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/commandline-usage#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/commandline-usage#)
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
- [Resources](https://xrpl.org/docs/infrastructure/commandline-usage#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/commandline-usage#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.460628a5c7086a46b65833a25b3c3a05.1759201228559.1759201228559.1759201228559.1&__hssc=78174987.1.1759201228559&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/commandline-usage.md)
- [https://github.com/XRPLF/rippled/releases/tag/1.7.0](https://github.com/XRPLF/rippled/releases/tag/1.7.0)
- [https://github.com/XRPLF/rippled/releases/tag/2.3.0](https://github.com/XRPLF/rippled/releases/tag/2.3.0)
- [ledger-file.json](https://github.com/XRPLF/xrpl-dev-portal/blob/master/_api-examples/rippled-cli/ledger-file.json)
- [IPv6](https://en.wikipedia.org/wiki/IPv6)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.460628a5c7086a46b65833a25b3c3a05.1759201228559.1759201228559.1759201228559.1&__hssc=78174987.1.1759201228559&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:00:42.700Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
