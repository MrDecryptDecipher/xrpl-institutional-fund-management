# Parallel Networks
URL: https://xrpl.org/docs/concepts/networks-and-servers/parallel-networks
Section: B7

## Overview


## Extracted Content
# Parallel Networks

There is one production XRP Ledger peer-to-peer network, and all business that takes place on the XRP Ledger occurs within the production network—the Mainnet.

To help members of the XRP Ledger community interact with XRP Ledger technology without affecting anything on the Mainnet, there are alternative networks, or altnets. Here's a breakdown of some public altnets:

| Network | Upgrade Cadence | Description |
| --- | --- | --- |
| Mainnet | Stable releases | The XRP Ledger, a  decentralized cryptographic ledger powered by a network of peer-to-peer servers and the home of XRP. |
| Testnet | Stable releases | An "alternate universe" network that acts as a testing ground for software built on the XRP Ledger, without impacting production XRP Ledger users and without risking real money. The amendment status of the Testnet is intended to closely mirror the Mainnet, although slight variations in timing may occur due to the unpredictable nature of decentralized systems. |
| Devnet | Beta releases | A preview of coming attractions, where unstable changes to the core XRP Ledger software may be tested out. Developers can use this altnet to interact with and learn about planned new XRP Ledger features and amendments that are not yet enabled on the Mainnet. |
| Hooks V3 Testnet | Hooks server | A preview of on-chain smart contract functionality using hooks. |
| Sidechain-Devnet | Beta releases | A sidechain to test cross-chain bridge features. Devnet is treated as the locking chain and this sidechain is the issuing chain.Library support:- xrpl.js 2.12.0- xrpl-py 2.4.0Note: You can also use the xbridge-cli commandline tool to set up a cross-chain bridge on your local machine. |


`xbridge-cli`

Each altnet has its own separate supply of test XRP, which is given away for free to parties interested in experimenting with the XRP Ledger and developing applications and integrations. Test XRP does not have real-world value and is lost when the network is reset.

CautionUnlike the XRP Ledger Mainnet, test networks are usually centralized and there are no guarantees about the stability and availability of these networks. They have been and continue to be used to test various properties of server configuration, network topology, and network performance.


## Parallel Networks and Consensus

The main factor in determining which network a server follows is its configured UNL—the list of validators it trusts not to collude. Each server uses its configured UNL to know which ledger to accept as the truth. When different consensus groups of rippled instances only trust other members of the same group, each group continues as a parallel network. Even if malicious or misbehaving computers connect to both networks, the consensus process avoids confusion as long as the members of each network are not configured to trust members of another network in excess of their quorum settings.

`rippled`

Ripple runs the main servers in the Testnet and Devnet; you can also connect your own rippled server to these networks. The Testnet and Devnet do not use diverse, censorship-resistant sets of validators. This makes it possible for Ripple to reset the Testnet or Devnet at any time.

`rippled`


## See Also

- Tools:XRP Testnet Faucet
- XRP Testnet Faucet
- Concepts:ConsensusAmendments
- Consensus
- Amendments
- Tutorials:Connect Your rippled to the XRP TestnetUse rippled in Stand-Alone Mode
- Connect Your rippled to the XRP Testnet
- Use rippled in Stand-Alone Mode
- References:server_info methodconsensus_info methodvalidator_list_sites methodvalidators methodDaemon Mode Options
- server_info method
- consensus_info method
- validator_list_sites method
- validators method
- Daemon Mode Options

- XRP Testnet Faucet

- Consensus
- Amendments

- Connect Your rippled to the XRP Testnet
- Use rippled in Stand-Alone Mode

`rippled`

- server_info method
- consensus_info method
- validator_list_sites method
- validators method
- Daemon Mode Options

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf368c22-8c8b-4d83-b397-fce1e4fa2c6b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf368c22-8c8b-4d83-b397-fce1e4fa2c6b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ac9ce201-ea4e-4883-9ec9-83b2760b7550&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ac9ce201-ea4e-4883-9ec9-83b2760b7550&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ce59a0e9-7572-46eb-85b4-b0d275312f63&bo=1&sid=19a70af09d9b11f08ea9a704f4be647e&vid=19a780309d9b11f08522e775cb97c7ce&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Parallel%20Networks&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&r=&lt=3653&evt=pageLoad&sv=2&cdb=AQAS&rn=730497)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c24b9995-eea1-4beb-b4ae-5b1ffd6bb1e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c24b9995-eea1-4beb-b4ae-5b1ffd6bb1e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=67acde47-2cff-4881-b2fb-efcc6fc20ba7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=67acde47-2cff-4881-b2fb-efcc6fc20ba7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9e34dbcc-84d9-4933-b963-fa45793d5016&pt=Parallel%20Networks&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Fparallel-networks&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/parallel-networks#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/parallel-networks#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/parallel-networks#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/parallel-networks#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2093b89fb0f2e41fe7d586fcfebfbd36.1759194994308.1759194994308.1759194994308.1&__hssc=78174987.1.1759194994309&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/parallel-networks.md)
- [Hooks V3 Testnet](https://hooks-testnet-v3.xrpl-labs.com/)
- [Hooks server](https://github.com/XRPL-Labs/xrpld-hooks)
- [hooks](https://xrpl-hooks.readme.io/)
- [xrpl.js 2.12.0](https://www.npmjs.com/package/xrpl/v/2.12.0)
- [xrpl-py 2.4.0](https://pypi.org/project/xrpl-py/2.4.0/)
- [xbridge-cli](https://github.com/XRPLF/xbridge-cli)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2093b89fb0f2e41fe7d586fcfebfbd36.1759194994308.1759194994308.1759194994308.1&__hssc=78174987.1.1759194994309&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:16:42.147Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
