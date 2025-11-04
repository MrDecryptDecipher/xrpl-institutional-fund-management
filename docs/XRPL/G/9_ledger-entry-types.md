# Ledger Entry Types
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types
Section: G9

## Overview


## Extracted Content
# Ledger Entry Types

Each ledger version's state data is a set of ledger objects, sometimes called ledger entries, which collectively represent all settings, balances, and relationships at a given point in time. To store or retrieve an object in the state data, the protocol uses that object's unique Ledger Object ID.

In the peer protocol, ledger objects have a canonical binary format. In rippled APIs, ledger objects are represented as JSON objects.

`rippled`

A ledger object's data fields depend on the type of object; the XRP Ledger supports the following types:

- AccountRootThe settings, XRP balance, and other metadata for one account.
- AmendmentsThe status of enabled and pending amendments.
- AMMThe definition and details of an Automated Market Maker (AMM) instance.
- BridgeA single cross-chain bridge that connects and enables value to move efficiently between two blockchains.
- CheckA check that can be redeemed for money by its destination.
- CredentialA credential, which can be used to preauthorize payments or gain access to specific permissioned domains.
- DelegateA record of which permissions have been granted to another account.
- DepositPreauthA record of preauthorization for sending payments to an account that requires authorization.
- DIDA Decentralized Identifier (DID).
- DirectoryNodeA set of links to other ledger entries, either objects owned by an account or trades in the decentralized exchange.
- EscrowAn escrow, which holds funds to be released when certain conditions are met.
- FeeSettingsThe current base transaction cost and reserve requirements.
- LedgerHashesLists of prior ledger versions' hashes for history lookup.
- MPTokenMulti-Purpose Tokens (MPT) of one issuance held by a specific account.
- MPTokenIssuanceDefinition of a Multi-Purpose Token (MPT) issuance.
- NegativeUNLList of validators currently believed to be offline.
- NFTokenOfferAn offer to buy or sell an NFT.
- NFTokenPageA group of up to 32 NFTs, stored together for efficiency.
- OfferAn offer (order) to trade currencies in the decentralized exchange.
- OracleA record of price information about currency pairs from an outside source.
- PayChannelA payment channel, which allows for rapid, asynchronous payments.
- PermissionedDomainA permissioned domain, which is used to limit access to other features.
- RippleStateA trust line, which tracks the net balance of fungible tokens between two accounts.
- SignerListA list of addresses for multi-signing transactions.
- TicketA ticket, which sets aside a sequence number for use in a future transaction.
- XChainOwnedClaimIDA cross-chain transfer of value.
- XChainOwnedCreateAccountClaimIDA record of attestations for creating an account via a cross-chain transfer.

The settings, XRP balance, and other metadata for one account.

The status of enabled and pending amendments.

The definition and details of an Automated Market Maker (AMM) instance.

A single cross-chain bridge that connects and enables value to move efficiently between two blockchains.

A check that can be redeemed for money by its destination.

A credential, which can be used to preauthorize payments or gain access to specific permissioned domains.

A record of which permissions have been granted to another account.

A record of preauthorization for sending payments to an account that requires authorization.

A Decentralized Identifier (DID).

A set of links to other ledger entries, either objects owned by an account or trades in the decentralized exchange.

An escrow, which holds funds to be released when certain conditions are met.

The current base transaction cost and reserve requirements.

Lists of prior ledger versions' hashes for history lookup.

Multi-Purpose Tokens (MPT) of one issuance held by a specific account.

Definition of a Multi-Purpose Token (MPT) issuance.

List of validators currently believed to be offline.

An offer to buy or sell an NFT.

A group of up to 32 NFTs, stored together for efficiency.

An offer (order) to trade currencies in the decentralized exchange.

A record of price information about currency pairs from an outside source.

A payment channel, which allows for rapid, asynchronous payments.

A permissioned domain, which is used to limit access to other features.

A trust line, which tracks the net balance of fungible tokens between two accounts.

A list of addresses for multi-signing transactions.

A ticket, which sets aside a sequence number for use in a future transaction.

A cross-chain transfer of value.

A record of attestations for creating an account via a cross-chain transfer.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9d3f95d6-e208-442a-aee4-8189778cba48&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9d3f95d6-e208-442a-aee4-8189778cba48&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=eb4bbfe1-669b-4c92-87d1-9552aa7cbdbe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=eb4bbfe1-669b-4c92-87d1-9552aa7cbdbe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=d85f213c-6a13-4d90-8aeb-d90c20c3d2c7&bo=1&sid=d88005209d9f11f08ac0452f1a3dbd95&vid=d880a0e09d9f11f0bd7ad9f645d7ac8f&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Ledger%20Entry%20Types&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&r=&lt=3040&evt=pageLoad&sv=2&cdb=AQAS&rn=390269)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5bd45c6-2804-4930-9195-e56c1362eecb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5bd45c6-2804-4930-9195-e56c1362eecb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ad7e72c-b598-439b-9259-0edb73a80ef4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ad7e72c-b598-439b-9259-0edb73a80ef4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1d5fbdcd-9042-415a-b1b9-f06c8353c031&pt=Ledger%20Entry%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types#)
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
- [XRP Ledger Protocol Reference](https://xrpl.org/docs/references/protocol)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1b0c162527d371bf049c9e1bd7c4f44f.1759197032466.1759197032466.1759197032466.1&__hssc=78174987.1.1759197032466&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/index.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1b0c162527d371bf049c9e1bd7c4f44f.1759197032466.1759197032466.1759197032466.1&__hssc=78174987.1.1759197032466&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:50:41.318Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
