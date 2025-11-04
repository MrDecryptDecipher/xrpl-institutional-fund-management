# Amendments
URL: https://xrpl.org/docs/concepts/networks-and-servers/amendments
Section: B8

## Overview


## Extracted Content
# Amendments

Amendments represent new features or other changes to transaction processing.

The amendment system uses the consensus process to approve any changes that affect transaction processing on the XRP Ledger. Fully-functional, transaction process changes are introduced as amendments; validators then vote on these changes. If an amendment receives more than 80% support for two weeks, the amendment passes and the change applies permanently to all subsequent ledger versions. Disabling a passed amendment requires a new amendment to do so.

NoteBug fixes that change transaction processes also require amendments.


## Amendment Process

The Contributing Code to the XRP Ledger topic walks through the workflow to develop an amendment from an idea to activation on the XRP Ledger.

After the code for an amendment is built into a software release, the process to enable it happens within the XRP Ledger network, which checks the status of amendments every flag ledger (typically about 15 minutes apart).

Every 256th ledger is called a flag ledger. The flag ledger doesn't have special contents, but the amendment process happens around it.

1. Flag Ledger -1: When rippled validators send validation messages, they also submit their amendment votes.
1. Flag Ledger: Servers interpret the votes from trusted validators.
1. Flag Ledger +1: Servers insert an EnableAmendment pseudo-transaction and flag based on what they think happened:The tfGotMajority flag means the amendment has more than 80% support.The tfLostMajority flag means support for the amendment has decreased to 80% or less.No flag means the amendment is enabled.NoteIt's possible for an amendment to lose 80% support on the same ledger it reaches the required two-week period to be enabled. In these cases, an EnableAmendment pseudo-transactions is added for both scenarios, but the amendment is ultimately enabled.
1. The tfGotMajority flag means the amendment has more than 80% support.
1. The tfLostMajority flag means support for the amendment has decreased to 80% or less.
1. No flag means the amendment is enabled.
1. Flag Ledger +2: Enabled amendments apply to transactions on this ledger onwards.

Flag Ledger -1: When rippled validators send validation messages, they also submit their amendment votes.

`rippled`

Flag Ledger: Servers interpret the votes from trusted validators.

Flag Ledger +1: Servers insert an EnableAmendment pseudo-transaction and flag based on what they think happened:

`EnableAmendment`

- The tfGotMajority flag means the amendment has more than 80% support.
- The tfLostMajority flag means support for the amendment has decreased to 80% or less.
- No flag means the amendment is enabled.

`tfGotMajority`

`tfLostMajority`

NoteIt's possible for an amendment to lose 80% support on the same ledger it reaches the required two-week period to be enabled. In these cases, an EnableAmendment pseudo-transactions is added for both scenarios, but the amendment is ultimately enabled.

`EnableAmendment`

Flag Ledger +2: Enabled amendments apply to transactions on this ledger onwards.


## Amendment Voting

Each version of rippled is compiled with a list of known amendments and the code to implement those amendments. Operators of rippled validators configure their servers to vote on each amendment and can change it at any time. If the operator doesn't choose a vote, the server uses a default vote defined by the source code.

`rippled`

`rippled`

NoteThe default vote can change between software releases.

Amendments must maintain two weeks of support from more than 80% of trusted validators to be enabled. If support drops below 80%, the amendment is temporarily rejected, and the two week period restarts. Amendments can gain and lose a majority any number of times before they become permanently enabled.

Amendments that have had their source code removed without being enabled are considered Vetoed by the network.


## Amendment Blocked Servers

Amendment blocking is a security feature to protect the accuracy of XRP Ledger data. When an amendment is enabled, servers running earlier versions of rippled without the amendment's source code no longer understand the rules of the network. Rather than guess and misinterpret ledger data, these servers become amendment blocked and can't:

`rippled`

- Determine the validity of a ledger.
- Submit or process transactions.
- Participate in the consensus process.
- Vote on future amendments.

The voting configuration of a rippled server has no impact on it becoming amendment blocked. A rippled server always follows the amendments enabled by the rest of the network, so blockages are based solely on having the code to understand rule changes. This means you can also become amendment blocked if you connect your server to a parallel network with different amendments enabled. For example, the XRP Ledger Devnet typically has experimental amendments enabled. If you are using the latest production release, your server likely won't have the code for those experimental amendments.

`rippled`

`rippled`

You can unblock amendment blocked servers by upgrading to the newest version of rippled.

`rippled`


### Amendment Blocked Clio Servers

The Clio server can become amendment blocked if it encounters an unknown field type while loading ledger data. This occurs if the field is newer than the libxrpl dependency that was used when building Clio. To unblock your Clio server, upgrade to a newer Clio release that was built with a compatible libxrpl.

`libxrpl`

`libxrpl`


## Retiring Amendments

When amendments are enabled, the source code for pre-amendment behaviors remain in rippled. While there are use-cases for keeping old code, such as reconstructing ledger outcomes for verification, tracking amendments and legacy code adds complexity over time.

`rippled`

The XRP Ledger Standard 11d defines a process for retiring old amendments and associated pre-amendment code. After an amendment has been enabled on the Mainnet for two years, it can be retired. Retiring an amendment makes it part of the core protocol unconditionally; it's no longer tracked or treated as an amendment, and all pre-amendment code is removed.


## See Also

- Concepts:Consensus
- Consensus
- Tutorials:Run rippled as a ValidatorConfigure Amendment VotingContribute Code to the XRP Ledger
- Run rippled as a Validator
- Configure Amendment Voting
- Contribute Code to the XRP Ledger
- References:Known Amendments
- Known Amendments

- Consensus

- Run rippled as a Validator
- Configure Amendment Voting
- Contribute Code to the XRP Ledger

- Known Amendments

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.8.1](https://img.shields.io/badge/Updated in-rippled 1.8.1-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a89d2e76-445a-4cdc-a770-fdc83a02784c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a89d2e76-445a-4cdc-a770-fdc83a02784c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3454a3e6-7b27-41d2-b137-c1daff1295d4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3454a3e6-7b27-41d2-b137-c1daff1295d4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4ab4f4c7-4c48-4c2f-9196-47d38a0a8d83&bo=1&sid=26eaf6109d9b11f09575b93f26411f55&vid=26eb55d09d9b11f0a26923d867591f8a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Amendments&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&r=&lt=4720&evt=pageLoad&sv=2&cdb=AQAS&rn=78144)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1c2aca70-5b55-46cc-8504-c48664b17dae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1c2aca70-5b55-46cc-8504-c48664b17dae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78955271-a1c4-4cae-94c1-a40b3de8e1cc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78955271-a1c4-4cae-94c1-a40b3de8e1cc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ed0ea4-d5a3-4877-ae44-7ffcba2c74a9&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/amendments#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/amendments#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/amendments#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/amendments#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/amendments.md)
- [https://github.com/XRPLF/rippled/releases/tag/1.8.1](https://github.com/XRPLF/rippled/releases/tag/1.8.1)
- [XRP Ledger Standard 11d](https://github.com/XRPLF/XRPL-Standards/discussions/19)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:17:04.936Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
