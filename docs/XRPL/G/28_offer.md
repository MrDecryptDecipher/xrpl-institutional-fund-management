# Offer
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/offer
Section: G28

## Overview


## Extracted Content
# Offer

[Source]

An Offer ledger entry describes an offer to exchange currencies in the XRP Ledger's decentralized exchange. (In finance, this is more traditionally known as an order.) You an create a new offer entry by sending an OfferCreate transaction that is not fully executed immediately.

`Offer`

An offer can become unfunded through other activities in the network, while remaining in the ledger. When processing transactions, the network automatically removes any unfunded Offers that those transactions come across. (Otherwise, unfunded Offers remain, because only transactions can change the ledger state.)


## Example Offer JSON

```
{
    "Account": "rBqb89MRQJnMPq8wTwEbtz4kvxrEDfcYvt",
    "BookDirectory": "ACC27DE91DBA86FC509069EAF4BC511D73128B780F2E54BF5E07A369E2446000",
    "BookNode": "0000000000000000",
    "Flags": 131072,
    "LedgerEntryType": "Offer",
    "OwnerNode": "0000000000000000",
    "PreviousTxnID": "F0AB71E777B2DA54B86231E19B82554EF1F8211F92ECA473121C655BFC5329BF",
    "PreviousTxnLgrSeq": 14524914,
    "Sequence": 866,
    "TakerGets": {
        "currency": "XAG",
        "issuer": "r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH",
        "value": "37"
    },
    "TakerPays": "79550000000",
    "index": "96F76F27D8A327FC48753167EC04A46AA0E382E6F57F32FD12274144D00F1797"
}
```


## Offer Fields

In addition to the common fields, Offer entries have the following fields:

`Offer`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The account that owns this offer. |
| AdditionalBooks | Array | Array | No | A list of additional offer directories that link to this offer. This field is only present if this is a hybrid offer in a permissioned DEX. The array always contains exactly 1 entry. (Requires the PermissionedDEX amendment ) |
| BookDirectory | String - Hash | UInt256 | Yes | The ID of the offer directory that links to this offer. |
| BookNode | String | UInt64 | Yes | A hint indicating which page of the offer directory links to this entry, in case the directory consists of multiple pages. |
| DomainID | String - Hash | UInt256 | No | The ledger entry ID of a permissioned domain. If present, this offer belongs to the corresponding Permissioned DEX. (Requires the PermissionedDEX amendment ) |
| Expiration | Number | UInt32 | No | Indicates the time after which this offer is considered unfunded. See Specifying Time for details. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x006F, mapped to the string Offer, indicates that this is an offer entry. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the owner directory links to this entry, in case the directory consists of multiple pages. |
| PreviousTxnID | String - Hash | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |
| Sequence | Number | UInt32 | Yes | The Sequence value of the OfferCreate transaction that created this offer. Used in combination with the Account to identify this offer. |
| TakerPays | Currency Amount | Amount | Yes | The remaining amount and type of currency requested by the offer creator. |
| TakerGets | Currency Amount | Amount | Yes | The remaining amount and type of currency being provided by the offer creator. |


`Account`

`AdditionalBooks`

`BookDirectory`

`BookNode`

`DomainID`

`Expiration`

`LedgerEntryType`

`0x006F`

`Offer`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`Sequence`

`Sequence`

`Account`

`TakerPays`

`TakerGets`


## Offer Flags

Offer entries can have the following flags combined into the Flags field:

`Offer`

`Flags`

| Flag Name | Hex Value | Decimal Value | Corresponding OfferCreate Flag | Description |
| --- | --- | --- | --- | --- |
| lsfPassive | 0x00010000 | 65536 | tfPassive | The offer was placed as passive. This has no effect after the offer is placed into the ledger. |
| lsfSell | 0x00020000 | 131072 | tfSell | The offer was placed as a sell offer. This has no effect after the offer is placed in the ledger, because tfSell only matters if you get a better rate than you asked for, which can only happen when the offer is initially placed. |
| lsfHybrid | 0x00040000 | 262144 | tfHybrid | The offer was placed as a hybrid offer, which means it is listed in a permissioned DEX and the open DEX. (Requires the PermissionedDEX amendment ) |


`lsfPassive`

`0x00010000`

`tfPassive`

`lsfSell`

`0x00020000`

`tfSell`

`tfSell`

`lsfHybrid`

`0x00040000`

`tfHybrid`


## Offer Reserve

Offer entries count as one item towards the owner reserve of the account that placed the offer, as long as the entry is in the ledger. Canceling or consuming the offer frees up the reserve. The reserve is also freed up if the offer is removed because it was found unfunded.

`Offer`


## Offer ID Format

The ID of an Offer entry is the SHA-512Half of the following values, concatenated in order:

`Offer`

- The Offer space key (0x006F)
- The AccountID of the account placing the offer
- The Sequence number of the OfferCreate transaction that created the offer.If the OfferCreate transaction used a ticket, use the TicketSequence value instead.

The Offer space key (0x006F)

`0x006F`

The AccountID of the account placing the offer

The Sequence number of the OfferCreate transaction that created the offer.

If the OfferCreate transaction used a ticket, use the TicketSequence value instead.

`TicketSequence`


## See Also

- Transactions:OfferCancel transactionOfferCreate transaction
- OfferCancel transaction
- OfferCreate transaction

- OfferCancel transaction
- OfferCreate transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=437cbcc6-cd13-4c0a-835f-929843d454b3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=437cbcc6-cd13-4c0a-835f-929843d454b3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=12aa02b7-7428-42a5-8f26-1f2062a1c0a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=12aa02b7-7428-42a5-8f26-1f2062a1c0a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=17cf83c5-1c8f-4dc8-8d22-4ea4e1810191&bo=1&sid=c60f2c109da011f08da6c57fdf614086&vid=c60fa7f09da011f0bd0ed1e3553978c7&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Offer&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&r=&lt=2983&evt=pageLoad&sv=2&cdb=AQAS&rn=180314)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0a5984a-86e3-48b5-b5a7-5a2cdd947800&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0a5984a-86e3-48b5-b5a7-5a2cdd947800&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=076fe7df-b30f-4d6f-b7d1-64a28e932721&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=076fe7df-b30f-4d6f-b7d1-64a28e932721&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=25c787c0-080b-4b8d-ad1c-31659ef5e221&pt=Offer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/offer#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/offer#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/offer#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/offer#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3898f0086e08dcd3f9d2ac0ff14e25ce.1759197430887.1759197430887.1759197430887.1&__hssc=78174987.1.1759197430887&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/offer.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/7e24adbdd0b61fb50967c4c6d4b27cc6d81b33f3/include/xrpl/protocol/detail/ledger_entries.macro#L242-L255)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3898f0086e08dcd3f9d2ac0ff14e25ce.1759197430887.1759197430887.1759197430887.1&__hssc=78174987.1.1759197430887&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:57:21.137Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
