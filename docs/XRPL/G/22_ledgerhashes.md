# LedgerHashes
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ledgerhashes
Section: G22

## Overview


## Extracted Content
# LedgerHashes

[Source]

(Not to be confused with the "ledger hash" string data type, which uniquely identifies a ledger version. This page describes the LedgerHashes ledger entry type.)

`LedgerHashes`

The LedgerHashes ledger entry type contains a history of prior ledgers that led up to this ledger version, in the form of their hashes. Entries of this type are modified automatically when closing a ledger. (This is one of the only times a ledger's state data is modified without a transaction or pseudo-transaction.) The LedgerHashes entries exist to make it possible to look up a previous ledger's hash with only the current ledger version and at most one lookup of a previous ledger version.

`LedgerHashes`

`LedgerHashes`

There are two kinds of LedgerHashes entry. Both types have the same fields. Each ledger version contains:

`LedgerHashes`

- Exactly one "recent history" LedgerHashes entry.
- A number of "previous history" LedgerHashes entries based on the current ledger index (that is, the length of the ledger history). Specifically, the XRP Ledger adds a new "previous history" object every 65536 ledger versions.

`LedgerHashes`

`LedgerHashes`

NoteAs an exception, a new genesis ledger has no LedgerHashes objects at all, because it has no ledger history.

`LedgerHashes`

Example LedgerHashes entry (trimmed for length):

`LedgerHashes`

```
{
  "LedgerEntryType": "LedgerHashes",
  "Flags": 0,
  "FirstLedgerSequence": 2,
  "LastLedgerSequence": 33872029,
  "Hashes": [
    "D638208ADBD04CBB10DE7B645D3AB4BA31489379411A3A347151702B6401AA78",
    "254D690864E418DDD9BCAC93F41B1F53B1AE693FC5FE667CE40205C322D1BE3B",
    "A2B31D28905E2DEF926362822BC412B12ABF6942B73B72A32D46ED2ABB7ACCFA",
    "AB4014846DF818A4B43D6B1686D0DE0644FE711577C5AB6F0B2A21CCEE280140",
    "3383784E82A8BA45F4DD5EF4EE90A1B2D3B4571317DBAC37B859836ADDE644C1",
    ... (up to 256 ledger hashes) ...
  ],
  "index": "B4979A36CDC7F3D3D5C31A4EAE2AC7D7209DDA877588B9AFC66799692AB0D66B"
}
```


## LedgerHashes Fields

In addition to the common fields, LedgerHashes entries have the following fields:

`LedgerHashes`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| FirstLedgerSequence | Number | UInt32 | No | DEPRECATED Do not use. (The "recent hashes" object on Mainnet has the value 2 in this field as a result of an old software bug. That value gets carried forward as the "recent hashes" object is updated. New "previous history" objects do not have this field, nor do "recent hashes" objects in parallel networks started with more recent versions of rippled.) |
| Hashes | Array of Strings | Vector256 | Yes | An array of up to 256 ledger hashes. The contents depend on which sub-type of LedgerHashes object this is. |
| LastLedgerSequence | Number | UInt32 | No | The Ledger Index of the last entry in this object's Hashes array. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0068, mapped to the string LedgerHashes, indicates that this object is a list of ledger hashes. |


`FirstLedgerSequence`

`2`

`rippled`

`Hashes`

`LedgerHashes`

`LastLedgerSequence`

`Hashes`

`LedgerEntryType`

`0x0068`

`LedgerHashes`


## Recent History LedgerHashes

There is exactly one LedgerHashes entry of the "recent history" sub-type in every ledger after the genesis ledger. This entry contains the identifying hashes of the most recent 256 ledger versions (or fewer, if the ledger history has less than 256 ledgers total) in the Hashes array. Whenever a new ledger is closed, part of the process of closing it involves updating the "recent history" entry with the hash of the previous ledger version this ledger version is derived from (also known as this ledger version's parent ledger). When there are more than 256 hashes, the oldest one is removed.

`LedgerHashes`

`Hashes`

Using the "recent history" LedgerHashes entry of a given ledger, you can get the hash of any of the 256 ledger versions before it.

`LedgerHashes`


## Previous History LedgerHashes

The "previous history" LedgerHashes entries collectively contain the hash of every 256th ledger version (also called "flag ledgers") in the full history of the ledger. When the child of a flag ledger closes, the flag ledger's hash is added to the Hashes array of the newest "previous history" LedgerHashes entry. Every 65536 ledgers, rippled creates a new LedgerHashes entry, so that each "previous history" entry has the hashes of 256 flag ledgers.

`LedgerHashes`

`Hashes`

`LedgerHashes`

`rippled`

`LedgerHashes`

NoteThe oldest "previous history" LedgerHashes entry contains only 255 hashes because the genesis ledger has ledger index 1, not 0.

`LedgerHashes`

The "previous history" LedgerHashes objects act as a skip list so you can get the hash of any historical flag ledger from its index. From there, you can use that flag ledger's "recent history" object to get the hash of any other ledger.

`LedgerHashes`


## LedgerHashes Flags

There are no flags defined for LedgerHashes entries.

`LedgerHashes`


## LedgerHashes ID Formats

[Source]

There are two formats for LedgerHashes ledger entry IDs, depending on whether the entry is a "recent history" sub-type or a "previous history" sub-type.

`LedgerHashes`

The "recent history" LedgerHashes entry has an ID that is the SHA-512Half of the LedgerHashes space key (0x0073). In other words, the "recent history" always has the ID B4979A36CDC7F3D3D5C31A4EAE2AC7D7209DDA877588B9AFC66799692AB0D66B.

`LedgerHashes`

`LedgerHashes`

`0x0073`

`B4979A36CDC7F3D3D5C31A4EAE2AC7D7209DDA877588B9AFC66799692AB0D66B`

Each "previous history" LedgerHashes entry has an ID that is the SHA-512Half of the following values, concatenated in order:

`LedgerHashes`

- The LedgerHashes space key (0x0073)
- The 32-bit Ledger Index of a flag ledger in the object's Hashes array, divided by 65536.TipDividing by 65536 keeps the most significant 16 bits, which are the same for all the flag ledgers listed in a "previous history" entry, and only those ledgers. You can use this fact to look up the LedgerHashes entry that contains the hash of any flag ledger.

The LedgerHashes space key (0x0073)

`LedgerHashes`

`0x0073`

The 32-bit Ledger Index of a flag ledger in the object's Hashes array, divided by 65536.

`Hashes`

TipDividing by 65536 keeps the most significant 16 bits, which are the same for all the flag ledgers listed in a "previous history" entry, and only those ledgers. You can use this fact to look up the LedgerHashes entry that contains the hash of any flag ledger.

`LedgerHashes`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dc6761fd-af47-4caa-8a83-b7fc699e30d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dc6761fd-af47-4caa-8a83-b7fc699e30d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=506ffcbf-1aa7-41c0-b075-781760f3ff98&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=506ffcbf-1aa7-41c0-b075-781760f3ff98&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ae65bf94-3f0d-443d-a1bc-52a1cb314221&bo=1&sid=781b08d09da011f0afdb4b6aeeb76946&vid=781ba4d09da011f09540b7efb05513e6&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=LedgerHashes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&r=&lt=2387&evt=pageLoad&sv=2&cdb=AQAS&rn=921184)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d477281e-b3a2-4d4f-9578-b5a3264af4b2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d477281e-b3a2-4d4f-9578-b5a3264af4b2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b9cccc56-f46d-401f-883c-ecc81a8ef649&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b9cccc56-f46d-401f-883c-ecc81a8ef649&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a8aa63e0-cc13-4a7c-b2eb-8ef687077b82&pt=LedgerHashes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fledgerhashes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ledgerhashes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ledgerhashes#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ledgerhashes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ledgerhashes#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.18e15e445632e88683845f14a7288d15.1759197300188.1759197300188.1759197300188.1&__hssc=78174987.1.1759197300188&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/ledgerhashes.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L202-L206)
- [skip list](https://en.wikipedia.org/wiki/Skip_list)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/protocol/impl/Indexes.cpp#L26-L42)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.18e15e445632e88683845f14a7288d15.1759197300188.1759197300188.1759197300188.1&__hssc=78174987.1.1759197300188&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:55:10.634Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
