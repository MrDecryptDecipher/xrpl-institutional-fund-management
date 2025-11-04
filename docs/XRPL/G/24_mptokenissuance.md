# MPTokenIssuance
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptokenissuance
Section: G24

## Overview


## Extracted Content
# MPTokenIssuance

An MPTokenIssuance entry represents a single MPT issuance and holds data associated with the issuance itself. You can create an MPTokenIssuance using an MPTokenIssuanceCreate transaction, and can delete it with an MPTokenIssuanceDestroy transaction.

`MPTokenIssuance`

`MPTokenIssuance`

(Requires the MPTokensV1 amendment .)


## Example MPTokenIssuance JSON

```
{
    "LedgerEntryType": "MPTokenIssuance",
    "Flags": 131072,
    "Issuer": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
    "AssetScale": 2,
    "MaximumAmount": "100000000",
    "OutstandingAmount": "100",
    "TransferFee": 50000,
    "MPTokenMetadata": "7B227469636B6572223A20225442494C4C222C20226E616D65223A2022542D42696C6C205969656C6420546F6B656E222C202264657363223A202241207969656C642D62656172696E6720737461626C65636F696E206261636B65642062792073686F72742D7465726D20552E532E205472656173757269657320616E64206D6F6E6579206D61726B657420696E737472756D656E74732E222C202269636F6E223A202268747470733A2F2F6578616D706C652E6F72672F7462696C6C2D69636F6E2E706E67222C202261737365745F636C617373223A2022727761222C202261737365745F737562636C617373223A20227472656173757279222C20226973737565725F6E616D65223A20224578616D706C65205969656C6420436F2E222C202275726C73223A205B7B2275726C223A202268747470733A2F2F6578616D706C657969656C642E636F2F7462696C6C222C202274797065223A202277656273697465222C20227469746C65223A202250726F647563742050616765227D2C207B2275726C223A202268747470733A2F2F6578616D706C657969656C642E636F2F646F6373222C202274797065223A2022646F6373222C20227469746C65223A20225969656C6420546F6B656E20446F6373227D5D2C20226164646974696F6E616C5F696E666F223A207B22696E7465726573745F72617465223A2022352E303025222C2022696E7465726573745F74797065223A20227661726961626C65222C20227969656C645F736F75726365223A2022552E532E2054726561737572792042696C6C73222C20226D617475726974795F64617465223A2022323034352D30362D3330222C20226375736970223A2022393132373936525830227D7D",
    "OwnerNode": "74"
}
```

By convention, the metadata should decode to JSON data describing what the MPT represents. The XLS-89 specification defines a recommended format for metadata. The above MPTokenMetadata field encodes the sample JSON from the spec, as a UTF-8 string with minimal whitespace.

`MPTokenMetadata`


## MPTokenIssuance Fields

In addition to the common fields, MPTokenIssuance entries have the following fields:

`MPTokenIssuance`

| Field Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Issuer | String - Address | AccountID | Yes | The address of the account that controls both the issuance amounts and characteristics of a particular fungible token. |
| AssetScale | Number | UInt8 | Yes | Where to put the decimal place when displaying amounts of this MPT. More formally, the asset scale is a non-negative integer (0, 1, 2, …) such that one standard unit equals 10^(-scale) of a corresponding fractional unit. For example, if a US Dollar Stablecoin has an asset scale of 2, then 1 unit of that MPT would equal 0.01 US Dollars. This indicates to how many decimal places the MPT can be subdivided. The default is 0, meaning that the MPT cannot be divided into smaller than 1 unit. |
| MaximumAmount | String - Number | UInt64 | No | The maximum number of MPTs that can exist at one time. If omitted, the maximum is currently limited to 263-1. |
| OutstandingAmount | String - Number | UInt64 | Yes | The total amount of MPTs of this issuance currently in circulation. This value increases when the issuer sends MPTs to a non-issuer, and decreases whenever the issuer receives MPTs. |
| TransferFee | Number | UInt16 | Yes | This value specifies the fee, in tenths of a basis point, charged by the issuer for secondary sales of the token, if such sales are allowed at all. Valid values for this field are between 0 and 50,000 inclusive. A value of 1 is equivalent to 1/10 of a basis point or 0.001%, allowing transfer rates between 0% and 50%. A TransferFee of 50,000 corresponds to 50%. The default value for this field is 0. Any decimals in the transfer fee are rounded down. The fee can be rounded down to zero if the payment is small. Issuers should make sure that their MPT's AssetScale is large enough. |
| MPTokenMetadata | String - Hexadecimal | Blob | Yes | Arbitrary metadata about this issuance, in hex format. The limit for this field is 1024 bytes. |
| OwnerNode | String - Hexadecimal | UInt64 | Yes | A hint indicating which page of the owner directory links to this entry, in case the directory consists of multiple pages. |
| PreviousTxnID | String - Hexadecimal | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |
| Sequence | Number | UInt32 | Yes | The Sequence (or Ticket) number of the transaction that created this issuance. This helps to uniquely identify the issuance and distinguish it from any other later MPT issuances created by this account. |


`Issuer`

`AssetScale`

`0`

`MaximumAmount`

`OutstandingAmount`

`TransferFee`

`TransferFee`

`AssetScale`

`MPTokenMetadata`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`Sequence`

`Sequence`

`Ticket`


### MPTokenIssuance Flags

Flags are properties or other options associated with the MPToken object. Except for lsfMPTLocked, which can be mutated via  MPTokenIssuanceSet transactions, these flags are immutable: they can only be set during the MPTokenIssuanceCreate transaction and cannot be changed later.

`MPToken`

`lsfMPTLocked`

`MPTokenIssuanceSet`

`MPTokenIssuanceCreate`

| Flag Name | Flag Value | Description |
| --- | --- | --- |
| lsfMPTLocked | 0x00000001 | If set, indicates that all balances are locked. |
| lsfMPTCanLock | 0x00000002 | If set, indicates that the issuer can lock an individual balance or all balances of this MPT. If not set, the MPT cannot be locked in any way. |
| lsfMPTRequireAuth | 0x00000004 | If set, indicates that individual holders must be authorized. This enables issuers to limit who can hold their assets. |
| lsfMPTCanEscrow | 0x00000008 | If set, indicates that individual holders can place their balances into an escrow. |
| lsfMPTCanTrade | 0x00000010 | If set, indicates that individual holders can trade their balances using the XRP Ledger DEX or AMM. |
| lsfMPTCanTransfer | 0x00000020 | If set, indicates that tokens held by non-issuers can be transferred to other accounts. If not set, indicates that tokens held by non-issuers cannot be transferred except back to the issuer; this enables use cases such as store credit. |
| lsfMPTCanClawback | 0x00000040 | If set, indicates that the issuer may use the Clawback transaction to claw back value from individual holders. |


`lsfMPTLocked`

`0x00000001`

`lsfMPTCanLock`

`0x00000002`

`lsfMPTRequireAuth`

`0x00000004`

`lsfMPTCanEscrow`

`0x00000008`

`lsfMPTCanTrade`

`0x00000010`

`lsfMPTCanTransfer`

`0x00000020`

`lsfMPTCanClawback`

`0x00000040`

`Clawback`


## MPTokenIssuanceID

The ID of an MPTokenIssuance entry is the SHA-512Half of the following values, concatenated in order:

`MPTokenIssuance`

- The MPTokenIssuance space key (0x007E).
- The transaction sequence number.
- The AccountID of the issuer.

`MPTokenIssuance`

`AccountID`

The MPTokenIssuanceID is a 192-bit integer, concatenated in order:

`MPTokenIssuanceID`

- The transaction sequence number.
- The AccountID of the issuer.


## See Also

- Transactions:MPTokenIssuanceCreate transactionMPTokenIssuanceDestroy transactionMPTokenIssuanceSet transaction
- MPTokenIssuanceCreate transaction
- MPTokenIssuanceDestroy transaction
- MPTokenIssuanceSet transaction

- MPTokenIssuanceCreate transaction
- MPTokenIssuanceDestroy transaction
- MPTokenIssuanceSet transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=66bd2114-d04c-48cb-8f38-0ed4bee123d0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=66bd2114-d04c-48cb-8f38-0ed4bee123d0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5bb434cd-d96d-44f5-80bc-5bdb9bbd85a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5bb434cd-d96d-44f5-80bc-5bdb9bbd85a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=b69b5d33-13be-46e1-bdbc-890aa4946eeb&bo=1&sid=92a3abc09da011f08158c5905a0c6c5e&vid=92a3ede09da011f0ba02530967eb76e8&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=MPTokenIssuance&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&r=&lt=5328&evt=pageLoad&sv=2&cdb=AQAS&rn=331638)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=979d757f-54bc-45e8-938a-e004e2beeb01&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=979d757f-54bc-45e8-938a-e004e2beeb01&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf03f56c-c0f1-4c9e-9b0f-b34dc078992c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf03f56c-c0f1-4c9e-9b0f-b34dc078992c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=64f230d1-81fd-4641-84cf-d7fb277ceed9&pt=MPTokenIssuance&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fmptokenissuance&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptokenissuance#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptokenissuance#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptokenissuance#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/mptokenissuance#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a881d4de1d142933e67690efcae4da6a.1759197343577.1759197343577.1759197343577.1&__hssc=78174987.1.1759197343577&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/mptokenissuance.md)
- [XLS-89 specification](https://github.com/XRPLF/XRPL-Standards/tree/master/XLS-0089-multi-purpose-token-metadata-schema)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a881d4de1d142933e67690efcae4da6a.1759197343577.1759197343577.1759197343577.1&__hssc=78174987.1.1759197343577&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:55:55.681Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
