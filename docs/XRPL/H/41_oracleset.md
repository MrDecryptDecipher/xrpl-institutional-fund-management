# OracleSet
URL: https://xrpl.org/docs/references/protocol/transactions/types/oracleset
Section: H41

## Overview


## Extracted Content
# OracleSet

[Source]

Creates a new Oracle ledger entry or updates the fields of an existing one, using the Oracle Document ID.

`Oracle`

(Added by the PriceOracle amendment.)


## Example OracleSet JSON

```
{
  "TransactionType": "OracleSet",
  "Account": "rNZ9m6AP9K7z3EVg6GhPMx36V4QmZKeWds",
  "OracleDocumentID": 34,
  "Provider": "70726F7669646572",
  "LastUpdateTime": 1724871860,
  "AssetClass": "63757272656E6379",
  "PriceDataSeries": [
    {
      "PriceData": {
        "BaseAsset": "XRP",
        "QuoteAsset": "USD",
        "AssetPrice": 740,
        "Scale": 3
      }
    }
  ]
}
```


## OracleSet Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | AccountID | Yes | This account must match the account in the Owner field of the Oracle object. |
| OracleDocumentID | Number | UInt32 | Yes | A unique identifier of the price oracle for the Account. |
| Provider | String | Blob | Variable | An arbitrary value that identifies an oracle provider, such as Chainlink, Band, or DIA. This field is a string, up to 256 ASCII hex encoded characters (0x20-0x7E). This field is required when creating a new Oracle ledger entry, but is optional for updates. |
| URI | String | Blob | No | An optional Universal Resource Identifier to reference price data off-chain. This field is limited to 256 bytes. |
| LastUpdateTime | Number | UInt32 | Yes | The time the data was last updated, in seconds since the UNIX Epoch. The value must be within 300 seconds (5 minutes) of the ledger's close time. |
| AssetClass | String | Blob | Variable | Describes the type of asset, such as "currency", "commodity", or "index". This field is a string, up to 16 ASCII hex encoded characters (0x20-0x7E). This field is required when creating a new Oracle ledger entry, but is optional for updates. |
| PriceDataSeries | Array | Array | Yes | An array of up to 10 PriceData objects, each representing the price information for a token pair. More than five PriceData objects require two owner reserves. |


`Account`

`Owner`

`Oracle`

`OracleDocumentID`

`Account`

`Provider`

`Oracle`

`URI`

`LastUpdateTime`

`AssetClass`

`Oracle`

`PriceDataSeries`

`PriceData`

`PriceData`


### PriceData Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| BaseAsset | String | Currency | Yes | The primary asset in a trading pair. Any valid identifier, such as a stock symbol, bond CUSIP, or currency code is allowed. For example, in the BTC/USD pair, BTC is the base asset; in 912810RR9/BTC, 912810RR9 is the base asset. |
| QuoteAsset | String | Currency | Yes | The quote asset in a trading pair. The quote asset denotes the price of one unit of the base asset. For example, in the BTC/USD pair, BTC is the base asset; in 912810RR9/BTC, 912810RR9 is the base asset. |
| AssetPrice | String | UInt64 | No | The asset price after applying the Scale precision level. It's not included if the last update transaction didn't include the BaseAsset/QuoteAsset pair. It's recommended you provide this value as a hexadecimal, but client libraries will accept decimal numbers and convert to hexadecimal strings. |
| Scale | Number | UInt8 | No | The scaling factor to apply to an asset price. For example, if Scale is 6 and original price is 0.155, then the scaled price is 155000. Valid scale ranges are 0-10. It's not included if the last update transaction didn't include the BaseAsset/QuoteAsset pair. |


`BaseAsset`

`QuoteAsset`

`AssetPrice`

`Scale`

`BaseAsset`

`QuoteAsset`

`Scale`

`Scale`

`BaseAsset`

`QuoteAsset`

PriceData is created or updated, following these rules:

`PriceData`

- New token pairs in the transaction are added to the object.
- Token pairs in the transaction overwrite corresponding token pairs in the object.
- Token pairs in the transaction with a missing AssetPrice field delete corresponding token pairs in the object.
- Token pairs that only appear in the object have AssetPrice and Scale removed to signify that the price is outdated.

`AssetPrice`

`AssetPrice`

`Scale`

When updating fewer entries than the existing oracle contains, the LastUpdateTime applies to all entries. Entries not included in the update have their prices removed to indicate they are out of date for the given LastUpdateTime. To access historical price data for these entries, you can:

`LastUpdateTime`

`LastUpdateTime`

- Use the ledger_entry method with PreviousTxnLgrSeq to traverse previous Oracle objects
- Use the tx method with PreviousTxnID to find historical transactions

`ledger_entry`

`PreviousTxnLgrSeq`

`tx`

`PreviousTxnID`

This design choice saves space by having a single LastUpdateTime for all entries rather than tracking update times per token pair.

`LastUpdateTime`

The order of token pairs in the transaction isn't important because each token pair uniquely identifies the location of the PriceData object in the PriceDataSeries.

`PriceData`

`PriceDataSeries`


## Error Cases

Besides errors that can occur for all transactions, OracleSet transactions can result in the following transaction result codes.

`OracleSet`

| Error Code | Description |
| --- | --- |
| temARRAY_EMPTY | The PriceDataSeries has no PriceData objects. |
| tecARRAY_TOO_LARGE | The PriceDataSeries exceeds the ten PriceData objects limit. |
| tecINVALID_UPDATE_TIME | The LastUpdateTime is invalid. This can occur when the time is more than 300 seconds before or after the ledger close time, or when updating an existing oracle, the new LastUpdateTime is not greater than the previous value. |
| tecTOKEN_PAIR_NOT_FOUND | The token pair you're trying to delete doesn't exist in the Oracle object. |
| tecARRAY_EMPTY | The PriceDataSeries has no PriceData objects. |
| temARRAY_TOO_LARGE | The PriceDataSeries exceeds the ten PriceData objects limit. |


`temARRAY_EMPTY`

`PriceDataSeries`

`PriceData`

`tecARRAY_TOO_LARGE`

`PriceDataSeries`

`PriceData`

`tecINVALID_UPDATE_TIME`

`LastUpdateTime`

`LastUpdateTime`

`tecTOKEN_PAIR_NOT_FOUND`

`Oracle`

`tecARRAY_EMPTY`

`PriceDataSeries`

`PriceData`

`temARRAY_TOO_LARGE`

`PriceDataSeries`

`PriceData`


## See Also

- Oracle entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f828e391-07be-4408-949f-4b44788ff206&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f828e391-07be-4408-949f-4b44788ff206&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=755a2f3b-a898-4290-b78d-5975e411a502&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=755a2f3b-a898-4290-b78d-5975e411a502&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=71da08e7-be47-4beb-a2b0-659e3c035f4e&bo=1&sid=338864b09da311f0aae4fb8414ecfcef&vid=3388f2109da311f0ae9747f7ffdc9c20&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=OracleSet&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&r=&lt=3655&evt=pageLoad&sv=2&cdb=AQAS&rn=346551)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d1b3142-d5fa-4d51-9c3c-ab2b029ae418&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2d1b3142-d5fa-4d51-9c3c-ab2b029ae418&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6d05d7bc-d624-4d60-8dde-0bc0fbf4f1de&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6d05d7bc-d624-4d60-8dde-0bc0fbf4f1de&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f7210091-a833-4347-9dff-b9f7919c1ba0&pt=OracleSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foracleset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/oracleset#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/oracleset#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/oracleset#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/oracleset#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.90c5f7ecab426cd391c1514e1ebcc531.1759198471853.1759198471853.1759198471853.1&__hssc=78174987.1.1759198471853&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/oracleset.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/SetOracle.cpp)
- [UNIX Epoch](https://en.wikipedia.org/wiki/Unix_time)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.90c5f7ecab426cd391c1514e1ebcc531.1759198471853.1759198471853.1759198471853.1&__hssc=78174987.1.1759198471853&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:14:44.265Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
