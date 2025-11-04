# Oracle
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/oracle
Section: G29

## Overview


## Extracted Content
# Oracle

[Source]

An Oracle ledger entry holds data associated with a single price oracle, which can store information on up to 10 asset pairs. You can create or modify a price oracle with an OracleSet transaction.

`Oracle`

(Added by the PriceOracle amendment)


## Example Oracle JSON

```
{
  "LedgerEntryType": "Oracle",
  "Owner": "rNZ9m6AP9K7z3EVg6GhPMx36V4QmZKeWds",
  "Provider": "70726F7669646572",
  "AssetClass": "63757272656E6379",
  "PriceDataSeries": [
    {
      "PriceData": {
        "BaseAsset": "XRP",
        "QuoteAsset": "USD",
        "AssetPrice": 740,
        "Scale": 3,
      }
    },
  ],
  "LastUpdateTime": 1724871860,
  "PreviousTxnID": "C53ECF838647FA5A4C780377025FEC7999AB4182590510CA461444B207AB74A9",
  "PreviousTxnLgrSeq": 3675418
}
```


## Oracle Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Owner | String | AccountID | Yes | The account with update and delete privileges for the oracle. It's recommended to set up multi-signing on this account. |
| Provider | String | Blob | Yes | An arbitrary value that identifies an oracle provider, such as Chainlink, Band, or DIA. This field is a string, up to 256 ASCII hex encoded characters (0x20-0x7E). |
| PriceDataSeries | Array | Array | Yes | An array of up to 10 PriceData objects, each representing the price information for an asset pair. More than five PriceData objects require two owner reserves. |
| LastUpdateTime | Number | UInt32 | Yes | The time the data was last updated, represented in Unix time. (Note: Unlike many other time values on the XRP Ledger, this value does not use the Ripple Epoch.) |
| URI | String | Blob | No | An optional Universal Resource Identifier to reference price data off-chain. This field is limited to 256 bytes. |
| AssetClass | String | Blob | Yes | Arbitrary string to describe the type of asset, such as currency, commodity, or index. Must be formatted as hexadecimal representing ASCII characters (0x20-0x7E), maximum 16 bytes. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the oracle owner's owner directory links to this entry, in case the directory consists of multiple pages. |
| PreviousTxnID | String | UInt256 | Yes | The hash of the previous transaction that modified this entry. |
| PreviousTxnLgrSeq | String | UInt32 | Yes | The ledger index that this object was most recently modified or created in. |


`Owner`

`Provider`

`0x20`

`0x7E`

`PriceDataSeries`

`PriceData`

`PriceData`

`LastUpdateTime`

`URI`

`AssetClass`

`0x20`

`0x7E`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`


### PriceData Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| BaseAsset | String | Currency | Yes | The primary asset in a trading pair. Any valid identifier, such as a stock symbol, bond CUSIP, or currency code is allowed. |
| QuoteAsset | String | Currency | Yes | The quote asset in a trading pair. The quote asset denotes the price of one unit of the base asset. |
| AssetPrice | String | UInt64 | No | The asset price after applying the Scale precision level. It's not included if the last update transaction didn't include the BaseAsset/QuoteAsset pair. Displayed in hexadecimal format. |
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


## Oracle Reserve

An Oracle object counts as one item for purposes of the owner reserve if it contains one to five PriceData objects, and counts as two items if it contains six to ten PriceData objects.

`Oracle`

`PriceData`

`PriceData`


## Oracle ID Format

The ID of an Oracle object is the SHA-512Half of the following values, concatenated in order:

`Oracle`

1. The Oracle space key (0x52)
1. The Owner Account ID.
1. The OracleDocumentID.

`Oracle`

`0x52`

`Owner`

`OracleDocumentID`


## Currency Internal Format

The Currency field type contains 160 bits of arbitrary data representing a currency or asset code. If the data matches the XRPL's standard format for [currency codes][], the API displays it as a string such as "USD"; otherwise, it displays as 40 characters of hexadecimal. The following JSON example represents the 912810RR9/USD trading pair. The BaseAsset is a CUSIP code 912810RR9 represented as a hexadecimal string, and the QuoteAsset is a standard USD currency code:

`Currency`

`"USD"`

`912810RR9/USD`

`BaseAsset`

`912810RR9`

`QuoteAsset`

`USD`

```
{
  "PriceData" : {
    "BaseAsset" : "3931323831305252390000000000000000000000",
    "QuoteAsset" : "USD",
    "Scale" : 1,
    "SymbolPrice" : 740
  }
}
```


## See Also

- Transactions:OracleSet transactionOracleDelete transaction
- OracleSet transaction
- OracleDelete transaction

- OracleSet transaction
- OracleDelete transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=14f404a7-6669-407e-bc0d-5bcf7d5517b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=14f404a7-6669-407e-bc0d-5bcf7d5517b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e61a1f15-951d-4079-a53f-3dae3ea8b225&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e61a1f15-951d-4079-a53f-3dae3ea8b225&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=e81f61fa-772f-4e0a-a922-24a51cc9cf79&bo=1&sid=d49bd5a09da011f095bd754ad8586bea&vid=d49c3ad09da011f0ada573cd508e6c06&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Oracle&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&r=&lt=4010&evt=pageLoad&sv=2&cdb=AQAS&rn=259361)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=770a2e44-6235-4fad-a416-55eb47e97d56&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=770a2e44-6235-4fad-a416-55eb47e97d56&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=80470c92-3c80-486e-aa8b-58b4e5824532&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=80470c92-3c80-486e-aa8b-58b4e5824532&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db0b2924-bf1b-4bc5-9624-7d6d44c1833f&pt=Oracle&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Foracle&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/oracle#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/oracle#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/oracle#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/oracle#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.263c9355f4aed5ae6b599be275aa6a8c.1759197453395.1759197453395.1759197453395.1&__hssc=78174987.1.1759197453395&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/oracle.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L385-L395)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.263c9355f4aed5ae6b599be275aa6a8c.1759197453395.1759197453395.1759197453395.1&__hssc=78174987.1.1759197453395&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:57:44.885Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
