# Ledger History
URL: https://xrpl.org/docs/concepts/networks-and-servers/ledger-history
Section: B4

## Overview


## Extracted Content
# Ledger History

The consensus process creates a chain of validated ledger versions, each derived from the previous one by applying a set of transactions. Every rippled server stores ledger versions and transaction history locally. The amount of transaction history a server stores depends on how long that server has been online and how much history it is configured to fetch and keep.

`rippled`

Servers in the peer-to-peer XRP Ledger network share transactions and other data with each other as part of the consensus process. Each server independently builds each new ledger version and compares results with its trusted validators to ensure consistency. (If a consensus of trusted validators disagrees with a server's results, that server fetches the necessary data from its peers to achieve consistency.) Servers can download older data from their peers to fill gaps in their available history. The structure of the ledger uses cryptographic hashes of the data so that any server can verify the integrity and consistency of the data.


## Databases

Servers keep ledger state data and transactions in a key-value store called the ledger store. Additionally, rippled maintains a few SQLite database files for more flexible access to things like transaction history, and to track certain settings changes.

`rippled`

It is generally safe to delete all of a rippled server's database files when that server is not running. (You may want to do this, for example, if you change the server's storage settings or if you are switching from a test net to the production network.)

`rippled`


## Available History

By design, all data and transactions in the XRP Ledger are public, and anyone can search or query anything. However, your server can only search data that it has available locally. If you try to query for a ledger version or transaction that your server does not have available, your server replies that it cannot find that data. Other servers that have the necessary history can respond successfully to the same query. If you have a business that uses XRP Ledger data, you should be mindful of how much history your server has available.

The server_info method reports how many ledger versions your server has available in the complete_ledgers field.

`complete_ledgers`


## Fetching History

When an XRP Ledger server starts, its first priority is to get a complete copy of the latest validated ledger. From there, it keeps up with advances in the ledger progress. The server fills in any gaps in its ledger history that occur after syncing, and can backfill history from before it became synced. (Gaps in ledger history can occur if a server temporarily becomes too busy to keep up with the network, loses its network connection, or suffers other temporary issues.) When downloading ledger history, the server requests the missing data from its peer servers, and verifies the data's integrity using cryptographic hashes.

Backfilling history is one of the server's lowest priorities, so it may take a long time to fill missing history, especially if the server is busy or its hardware and network specs aren't good enough. For recommendations on hardware specs, see Capacity Planning. Backfilling history also requires that at least one of the server's direct peers has the history in question. For more information on managing your server's peer-to-peer connections, see Configure Peering.

The XRP Ledger identifies data (on several different levels) by a unique hash of its contents. The XRP Ledger's state data contains a short summary of the ledger's history, in the form of the LedgerHashes object type. Servers use the LedgerHashes objects to know which ledger versions to fetch, and to confirm that the ledger data they receive is correct and complete.


### Backfilling

The amount of history a server attempts to download depends on its configuration. The server automatically tries to fill gaps by downloading history up to the oldest ledger it already has available. You can use the [ledger_history] setting to make the server backfill history beyond that point. However, the server never downloads ledgers that would be scheduled for deletion.

`[ledger_history]`

The [ledger_history] setting defines a minimum number of ledgers to accumulate from before the current validated ledger. Use the special value full to download the full history of the network. If you specify a number of ledgers, it must be equal to or more than the online_deletion setting; you cannot use [ledger_history] to make the server download less history. To reduce the amount of history a server stores, change the online deletion settings instead.

`[ledger_history]`

`full`

`online_deletion`

`[ledger_history]`


## Full History

Some servers in the XRP Ledger network are configured as "full-history" servers. These servers, which require significantly more disk space than other tracking servers, collect all available XRP Ledger history and do not use online deletion.

The XRP Ledger Foundation provides access to a set of full history servers operated by community members (see xrplcluster.com for more details). Ripple also provides a set of public full-history servers as a public service at s2.ripple.com.

`s2.ripple.com`

Providers of Full History servers reserve the right to block access that is found to abuse resources, or put inordinate load on the systems.

TipUnlike some cryptocurrency networks, servers in the XRP Ledger do not need full history to know the current state and keep up with current transactions.

For instructions on setting up full history, see Configure Full History.


## See Also

- Concepts:LedgersConsensus
- Ledgers
- Consensus
- Tutorials:Configure rippledConfigure Online DeletionConfigure Advisory DeletionConfigure Full History
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

![Updated in: rippled 1.6.0](https://img.shields.io/badge/Updated in-rippled 1.6.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=40394a30-bf35-42d1-8a3c-fb71edc83775&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=40394a30-bf35-42d1-8a3c-fb71edc83775&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=981a3954-fe94-4c78-8b9c-c92d8805166c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=981a3954-fe94-4c78-8b9c-c92d8805166c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a24c132c-545c-4abc-9ffe-5b82fff3bd79&bo=1&sid=f1ed8de09d9a11f0adf753f8be941ed5&vid=f1ee61409d9a11f0b40901a5a2c8b8d1&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Ledger%20History&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&r=&lt=3624&evt=pageLoad&sv=2&cdb=AQAS&rn=767287)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4ea9ab69-5d4d-400e-8c23-cdc7b5fe79a2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4ea9ab69-5d4d-400e-8c23-cdc7b5fe79a2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3507fc9c-cade-41a2-8842-6fbb072a6c24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3507fc9c-cade-41a2-8842-6fbb072a6c24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=60bec571-939d-4706-8618-96e86779a729&pt=Ledger%20History&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fledger-history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/ledger-history#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/ledger-history#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/ledger-history#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/ledger-history#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/ledger-history.md)
- [https://github.com/XRPLF/rippled/releases/tag/1.6.0](https://github.com/XRPLF/rippled/releases/tag/1.6.0)
- [xrplcluster.com](https://xrplcluster.com)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:15:36.424Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
