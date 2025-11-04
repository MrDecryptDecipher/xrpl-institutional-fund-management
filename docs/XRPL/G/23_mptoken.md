# MPToken
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptoken
Section: G23

## Overview


## Extracted Content
# MPToken

An MPToken entry tracks MPTs held by an account that is not the token issuer. You can create or delete an empty MPToken entry by sending an MPTokenAuthorize transaction. You can send and receive MPTs using several other transaction types including Payment and OfferCreate transactions.

`MPToken`

`MPToken`

(Requires the MPTokensV1 amendment .)


## Example MPToken JSON

```
{
    "LedgerEntryType": "MPToken",
    "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "MPTokenIssuanceID": "000004C463C52827307480341125DA0577DEFC38405B0E3E",
    "Flags": 0,
    "MPTAmount": "100000000",
    "OwnerNode": "1"
}
```


## MPToken Fields

In addition to the common fields, MPToken entries have the following fields:

`MPToken`

| Field Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The owner (holder) of these MPTs. |
| MPTokenIssuanceID | String - Hexadecimal | UInt192 | Yes | The MPTokenIssuance identifier. |
| MPTAmount | String - Number | UInt64 | Yes | The amount of tokens currently held by the owner. The minimum is 0 and the maximum is 263-1. |
| LockedAmount | String - Number | UInt64 | No | The amount of tokens currently locked up (for example, in escrow or payment channels). (Requires the TokenEscrow amendment .) |
| PreviousTxnID | String - Hash | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The sequence of the ledger that contains the transaction that most recently modified this object. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the owner directory links to this entry, in case the directory consists of multiple pages. |


`Account`

`MPTokenIssuanceID`

`MPTokenIssuance`

`MPTAmount`

`LockedAmount`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`OwnerNode`


### MPToken Flags

MPToken entries can have the following flags combined in the Flags field:

`MPToken`

`Flags`

| Flag Name | Flag Value | Description |
| --- | --- | --- |
| lsfMPTLocked | 0x00000001 | If enabled, indicates that the MPT owned by this account is currently locked and cannot be used in any XRP transactions other than sending value back to the issuer. |
| lsfMPTAuthorized | 0x00000002 | (Only applicable for allow-listing) If set, indicates that the issuer has authorized the holder for the MPT. This flag can be set using a MPTokenAuthorize transaction; it can also be "un-set" using a MPTokenAuthorize transaction specifying the tfMPTUnauthorize flag. |


`lsfMPTLocked`

`0x00000001`

`lsfMPTAuthorized`

`0x00000002`

`MPTokenAuthorize`

`MPTokenAuthorize`

`tfMPTUnauthorize`


## MPToken ID Format

The ID of an MPToken entry is the SHA-512Half of the following values, concatenated in order:

`MPToken`

- The MPToken space key (0x0074).
- The MPTokenIssuanceID for the issuance being held.
- The AccountID of the token holder.

`MPToken`

`MPTokenIssuanceID`

`AccountID`


## See Also

- MPTokenAuthorize transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3c57c0d9-5502-4e2c-9b14-64952a761f32&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3c57c0d9-5502-4e2c-9b14-64952a761f32&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=10655f50-dbdd-46c1-a122-8eb637d33c40&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=10655f50-dbdd-46c1-a122-8eb637d33c40&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d125ed9-0828-4fb1-b16d-8e62e8505815&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d125ed9-0828-4fb1-b16d-8e62e8505815&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ddd1a9a6-6924-469c-a128-4974ad9f5781&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ddd1a9a6-6924-469c-a128-4974ad9f5781&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2edeab64-7494-4840-b0e6-70e5db9ceb19&pt=MPToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=bb30de48-e789-412d-8d5b-b4d69610aba6&bo=1&sid=8583e9b09da011f0809fedf50e33fffe&vid=85846c809da011f0992109cb14bee7bb&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=MPToken&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptoken&r=&lt=3551&evt=pageLoad&sv=2&cdb=AQAS&rn=363700)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptoken#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptoken#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptoken#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptoken#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.acc91707a29c3e3d7bdbf2d8720b12a2.1759197320781.1759197320781.1759197320781.1&__hssc=78174987.1.1759197320781&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/mptoken.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.acc91707a29c3e3d7bdbf2d8720b12a2.1759197320781.1759197320781.1759197320781.1&__hssc=78174987.1.1759197320781&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:55:30.543Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
