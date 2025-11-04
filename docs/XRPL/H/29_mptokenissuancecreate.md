# MPTokenIssuanceCreate
URL: https://xrpl.org/docs/references/protocol/transactions/types/mptokenissuancecreate
Section: H29

## Overview


## Extracted Content
# MPTokenIssuanceCreate

[Source]

The MPTokenIssuanceCreate transaction creates an MPTokenIssuance object and adds it to the relevant directory node of the creator account. This transaction is the only opportunity an issuer has to specify any token fields that are defined as immutable (for example, MPT Flags).

`MPTokenIssuanceCreate`

If the transaction is successful, the newly created token is owned by the account (the creator account) that executed the transaction.

Whenever your query returns an MPTokenIssuance transaction response, there will always be an mpt_issuance_id field on the Transaction Metadata page.

`MPTokenIssuance`

`mpt_issuance_id`

(Requires the MPTokensV1 amendment .)


## Example MPTokenIssuanceCreate JSON

This example assumes that the issuer of the token is the signer of the transaction.

```
{
  "TransactionType": "MPTokenIssuanceCreate",
  "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
  "AssetScale": 2,
  "TransferFee": 314,
  "MaximumAmount": "50000000",
  "Flags": 83659,
  "MPTokenMetadata": "7B227469636B6572223A20225442494C4C222C20226E616D65223A2022542D42696C6C205969656C6420546F6B656E222C202264657363223A202241207969656C642D62656172696E6720737461626C65636F696E206261636B65642062792073686F72742D7465726D20552E532E205472656173757269657320616E64206D6F6E6579206D61726B657420696E737472756D656E74732E222C202269636F6E223A202268747470733A2F2F6578616D706C652E6F72672F7462696C6C2D69636F6E2E706E67222C202261737365745F636C617373223A2022727761222C202261737365745F737562636C617373223A20227472656173757279222C20226973737565725F6E616D65223A20224578616D706C65205969656C6420436F2E222C202275726C73223A205B7B2275726C223A202268747470733A2F2F6578616D706C657969656C642E636F2F7462696C6C222C202274797065223A202277656273697465222C20227469746C65223A202250726F647563742050616765227D2C207B2275726C223A202268747470733A2F2F6578616D706C657969656C642E636F2F646F6373222C202274797065223A2022646F6373222C20227469746C65223A20225969656C6420546F6B656E20446F6373227D5D2C20226164646974696F6E616C5F696E666F223A207B22696E7465726573745F72617465223A2022352E303025222C2022696E7465726573745F74797065223A20227661726961626C65222C20227969656C645F736F75726365223A2022552E532E2054726561737572792042696C6C73222C20226D617475726974795F64617465223A2022323034352D30362D3330222C20226375736970223A2022393132373936525830227D7D",
  "Fee": "10"
}
```


## MPTokenIssuanceCreate Fields

In addition to the common fields, MPTokenIssuanceCreate transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| AssetScale | Number | UInt8 | No | Where to put the decimal place when displaying amounts of this MPT. More formally, the asset scale is a non-negative integer (0, 1, 2, …) such that one standard unit equals 10^(-scale) of a corresponding fractional unit. For example, if a US Dollar Stablecoin has an asset scale of 2, then 1 unit of that MPT would equal 0.01 US Dollars. This indicates to how many decimal places the MPT can be subdivided. If omitted, the default is 0, meaning that the MPT cannot be divided into smaller than 1 unit. |
| TransferFee | Number | UInt16 | No | The value specifies the fee to charged by the issuer for secondary sales of the Token, if such sales are allowed. Valid values for this field are between 0 and 50,000 inclusive, allowing transfer rates of between 0.000% and 50.000% in increments of 0.001. The field must not be present if the tfMPTCanTransfer flag is not set. If it is, the transaction should fail and a fee should be claimed. |
| MaximumAmount | String - Number | UInt64 | No | The maximum asset amount of this token that can ever be issued, as a base-10 number encoded as a string. The current default maximum limit is 9,223,372,036,854,775,807 (2^63-1). This limit may increase in the future. If an upper limit is required, you must specify this field. |
| MPTokenMetadata | String - Hexadecimal | Blob | No | Arbitrary metadata about this issuance. The limit for this field is 1024 bytes. By convention, the metadata should decode to JSON data describing what the MPT represents. The XLS-89 specification defines a recommended format for metadata. |


`AssetScale`

`TransferFee`

`MaximumAmount`

`MPTokenMetadata`

For an example of how to encode metadata for the MPTokenMetadata field, see Code Sample: Issue MPT with Metadata.

`MPTokenMetadata`


## MPTokenIssuanceCreate Flags

Transactions of the MPTokenIssuanceCreate type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfMPTCanLock | 0x00000002 | 2 | If set, indicates that the MPT can be locked both individually and globally. If not set, the MPT cannot be locked in any way. |
| tfMPTRequireAuth | 0x00000004 | 4 | If set, indicates that individual holders must be authorized. This enables issuers to limit who can hold their assets. |
| tfMPTCanEscrow | 0x00000008 | 8 | If set, indicates that individual holders can place their balances into an escrow. |
| tfMPTCanTrade | 0x00000010 | 16 | If set, indicates that individual holders can trade their balances using the XRP Ledger DEX. |
| tfMPTCanTransfer | 0x00000020 | 32 | If set, indicates that tokens can be transferred to other accounts that are not the issuer. |
| tfMPTCanClawback | 0x00000040 | 64 | If set, indicates that the issuer can use the Clawback transaction to claw back value from individual holders. |


`tfMPTCanLock`

`0x00000002`

`2`

`tfMPTRequireAuth`

`0x00000004`

`4`

`tfMPTCanEscrow`

`0x00000008`

`8`

`tfMPTCanTrade`

`0x00000010`

`16`

`tfMPTCanTransfer`

`0x00000020`

`32`

`tfMPTCanClawback`

`0x00000040`

`64`

`Clawback`


## See Also

- MPTokenIssuance entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5a34950-bf8a-4142-8f02-019e12a7b93f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5a34950-bf8a-4142-8f02-019e12a7b93f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b49f20ba-d939-424a-b592-999183686aab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b49f20ba-d939-424a-b592-999183686aab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ef45b49e-2527-492a-89a2-c60da03a805d&bo=1&sid=a68c7f209da211f0b5ab510576faf2bf&vid=a68e98a09da211f0b340ef4c674a08e4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=MPTokenIssuanceCreate&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&r=&lt=2772&evt=pageLoad&sv=2&cdb=AQAS&rn=281811)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=04cb78ab-c243-4c89-b147-283383714f07&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=04cb78ab-c243-4c89-b147-283383714f07&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=658746cb-4e53-4336-9a30-d3776a89a97c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=658746cb-4e53-4336-9a30-d3776a89a97c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7f9f6e79-350d-4aee-98ca-10f602a96782&pt=MPTokenIssuanceCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fmptokenissuancecreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/mptokenissuancecreate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/mptokenissuancecreate#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/mptokenissuancecreate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/mptokenissuancecreate#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d2be56b91740a6e7bc639c91132ca150.1759198237019.1759198237019.1759198237019.1&__hssc=78174987.1.1759198237019&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/mptokenissuancecreate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/MPTokenIssuanceCreate.cpp)
- [XLS-89 specification](https://github.com/XRPLF/XRPL-Standards/tree/master/XLS-0089-multi-purpose-token-metadata-schema)
- [Code Sample: Issue MPT with Metadata](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/issue-mpt-with-metadata/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d2be56b91740a6e7bc639c91132ca150.1759198237019.1759198237019.1759198237019.1&__hssc=78174987.1.1759198237019&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:10:46.984Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
