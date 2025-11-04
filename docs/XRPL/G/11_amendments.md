# Amendments
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amendments
Section: G11

## Overview


## Extracted Content
# Amendments

[Source]

The Amendments ledger entry type contains a list of Amendments that are currently active. Each ledger version contains at most one Amendments entry.

`Amendments`

`Amendments`


## Example Amendments JSON

```
{
    "Amendments": [
        "42426C4D4F1009EE67080A9B7965B44656D7714D104A72F9B4369F97ABF044EE",
        "4C97EBA926031A7CF7D7B36FDE3ED66DDA5421192D63DE53FFB46E43B9DC8373",
        // (... Long list of enabled amendment IDs ...)
        "03BDC0099C4E14163ADA272C1B6F6FABB448CC3E51F522F978041E4B57D9158C",
        "35291ADD2D79EB6991343BDA0912269C817D0F094B02226C1C14AD2858962ED4"
    ],
    "Flags": 0,
    "LedgerEntryType": "Amendments",
    "Majorities": [
        {
            "Majority": {
            "Amendment": "7BB62DC13EC72B775091E9C71BF8CF97E122647693B50C5E87A80DFD6FCFAC50",
                "CloseTime": 779561310
            }
        },
        {
            "Majority": {
                "Amendment": "755C971C29971C9F20C6F080F2ED96F87884E40AD19554A5EBECDCEC8A1F77FE",
                "CloseTime": 779561310
            }
        }
    ],
    "index": "7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4"
}
```


## Amendments Fields

In addition to the common fields, the Amendments ledger entry has the following fields:

`Amendments`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amendments | Array | Vector256 | No | Array of 256-bit amendment IDs for all currently enabled amendments. If omitted, there are no enabled amendments. |
| Flags | Number | UInt32 | Yes | A bit-map of boolean flags enabled for this object. Currently, the protocol defines no flags for Amendments objects. The value is always 0. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0066, mapped to the string Amendments, indicates that this object describes the status of amendments to the XRP Ledger. |
| Majorities | Array | Array | No | Array of objects describing the status of amendments that have majority support but are not yet enabled. If omitted, there are no pending amendments with majority support. |
| PreviousTxnID | String | UInt256 | No | The identifying hash of the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| PreviousTxnLgrSeq | Number | UInt32 | No | The index of the ledger that contains the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |


`Amendments`

`Flags`

`Amendments`

`0`

`LedgerEntryType`

`0x0066`

`Amendments`

`Majorities`

`PreviousTxnID`

`PreviousTxnLgrSeq`

Each member of the Majorities field, if it is present, is an object with one field, Majority, whose contents are a nested object with the following fields:

`Majorities`

`Majority`

| Name | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| Amendment | String | UInt256 | The Amendment ID of the pending amendment. |
| CloseTime | Number | UInt32 | The close_time field of the ledger version where this amendment most recently gained a majority. |


`Amendment`

`CloseTime`

`close_time`

In the amendment process, a consensus of validators adds a new amendment to the Majorities field using an EnableAmendment pseudo-transaction with the tfGotMajority flag when 80% or more of validators support it. If support for a pending amendment goes below 80%, an EnableAmendment pseudo-transaction with the tfLostMajority flag removes the amendment from the Majorities array. If an amendment remains in the Majorities field for at least 2 weeks, an EnableAmendment pseudo-transaction with no flags removes it from Majorities and permanently adds it to the Amendments field.

`Majorities`

`tfGotMajority`

`tfLostMajority`

`Majorities`

`Majorities`

`Majorities`

`Amendments`

NoteTechnically, all transactions in a ledger are processed based on which amendments are enabled in the ledger version immediately before it. While applying transactions to a ledger version where an amendment becomes enabled, the rules don't change mid-ledger. After the ledger is closed, the next ledger uses the new rules as defined by any new amendments that applied.


## Amendments Flags

There are no flags defined for the Amendments entry.

`Amendments`


## Amendments Reserve

The Amendments entry does not require a reserve.

`Amendments`


## Amendments ID Format

The ID of the Amendments entry is the hash of the Amendments space key (0x0066) only. This means that the ID is always:

`Amendments`

`Amendments`

`0x0066`

```
7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4
```

(Don't mix up the ID of the Amendments ledger entry type with the Amendment ID of an individual amendment.)

`Amendments`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea13bb80-0d5b-4cf1-b0e0-2240d834298e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea13bb80-0d5b-4cf1-b0e0-2240d834298e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b6e85237-8128-4212-a057-648be91b64cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b6e85237-8128-4212-a057-648be91b64cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=2c2d5744-bba9-40c2-9717-81fc3618e449&bo=1&sid=f41218c09d9f11f0a8f6c72787e901c8&vid=f41299109d9f11f0b3529797542990e9&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Amendments&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&r=&lt=2694&evt=pageLoad&sv=2&cdb=AQAS&rn=365126)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=16594d3c-5ce4-4262-96e6-376f61ba5a8b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=16594d3c-5ce4-4262-96e6-376f61ba5a8b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7cb632cb-ef22-4320-8fd9-b283d911e18d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7cb632cb-ef22-4320-8fd9-b283d911e18d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cdc99c74-feda-4de2-8a1a-6cec45ee95a6&pt=Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amendments#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amendments#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amendments#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amendments#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/amendments.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L187-L192)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:51:27.111Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
