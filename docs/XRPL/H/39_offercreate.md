# OfferCreate
URL: https://xrpl.org/docs/references/protocol/transactions/types/offercreate
Section: H39

## Overview


## Extracted Content
# OfferCreate

[Source]

An OfferCreate transaction places an Offer in the decentralized exchange.


## Example OfferCreate JSON

```
{
    "TransactionType": "OfferCreate",
    "Account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "Fee": "12",
    "Flags": 0,
    "LastLedgerSequence": 7108682,
    "Sequence": 8,
    "TakerGets": "6000000",
    "TakerPays": {
      "currency": "GKO",
      "issuer": "ruazs5h1qEsqpke88pcqnaseXdm6od2xc",
      "value": "2"
    }
}
```


## OfferCreate Fields

In addition to the common fields, OfferCreate transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| DomainID | String - Hash | UInt256 | No | The ledger entry ID of a permissioned domain. If provided, restrict this offer to the permissioned DEX of that domain. (Requires the PermissionedDEX amendment ) |
| Expiration | Number | UInt32 | No | Time after which the Offer is no longer active, in seconds since the Ripple Epoch. |
| OfferSequence | Number | UInt32 | No | An Offer to delete first, specified in the same way as OfferCancel. |
| TakerGets | Currency Amount | Amount | Yes | The amount and type of currency being sold. |
| TakerPays | Currency Amount | Amount | Yes | The amount and type of currency being bought. |


`DomainID`

`Expiration`

`OfferSequence`

`TakerGets`

`TakerPays`


## OfferCreate Flags

Transactions of the OfferCreate type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfPassive | 0x00010000 | 65536 | Do not consume offers that exactly match this one, only offers that cross it. This makes it possible to set up offers in the ledger that peg the exchange rate at a specific value. |
| tfImmediateOrCancel | 0x00020000 | 131072 | Treat the offer as an Immediate or Cancel order and do not place an Offer entry into the order books. The transaction trades as much as it can by consuming existing offers when it's processed. |
| tfFillOrKill | 0x00040000 | 262144 | Treat the offer as a Fill or Kill order, do not place an Offer entry into the order books, and cancel the offer if it cannot be fully filled at the time of execution. By default, this means that the owner must receive the full TakerPays amount; if the tfSell flag is enabled, the owner must be able to spend the entire TakerGets amount instead. |
| tfSell | 0x00080000 | 524288 | Exchange the entire TakerGets amount, even if it means obtaining more than the TakerPays amount in exchange. |
| tfHybrid | 0x00100000 | 1048576 | Make this a hybrid offer that can use both a permissioned DEX and the open DEX. The DomainID field must be provided when using this flag. |


`tfPassive`

`0x00010000`

`tfImmediateOrCancel`

`0x00020000`

`tfFillOrKill`

`0x00040000`

`TakerPays`

`tfSell`

`TakerGets`

`tfSell`

`0x00080000`

`TakerGets`

`TakerPays`

`tfHybrid`

`0x00100000`

`DomainID`


## Error Cases

| Error Code | Description |
| --- | --- |
| tecDIR_FULL | The owner owns too many items in the ledger, or the order book contains too many Offers at the same exchange rate already. |
| tecEXPIRED | The transaction specifies an Expiration time that has already passed. |
| tecFROZEN | The transaction involves a token on a frozen trust line (including local and global freezes). The TakerPays (buy amount) token has been deep-frozen by the issuer. |
| tecINSUF_RESERVE_OFFER | The owner does not have enough XRP to meet the reserve requirement of adding a new offer ledger entry, and the transaction did not convert any currency. (If the transaction successfully traded any amount, the transaction succeeds with the result code tesSUCCESS, but does not create an offer ledger entry for the remainder.) |
| tecKILLED | The transaction specifies tfFillOrKill, and the full amount cannot be filled. If the ImmediateOfferKilled amendment is enabled, this result code also occurs when the transaction specifies tfImmediateOrCancel and executes without moving funds (previously, an Immediate or Cancel offer would return tesSUCCESS even if no funds were moved). |
| tecNO_AUTH | The transaction involves a token whose issuer uses Authorized Trust Lines and the the trust line that would receive the tokens exists but has not been authorized. |
| tecNO_ISSUER | The transaction specifies a token whose issuer value is not a funded account in the ledger. |
| tecNO_LINE | The transaction involves a token whose issuer uses Authorized Trust Lines and the necessary trust line does not exist. |
| tecNO_PERMISSION | The transaction uses a DomainID but the sender is not a member of that domain. (Requires the PermissionedDEX amendment ) |
| tecUNFUNDED_OFFER | The owner does not hold a positive amount of the TakerGets currency. (Exception: if TakerGets specifies a token that the owner issues, the transaction can succeed.) |
| temBAD_CURRENCY | The transaction specifies a fungible token incorrectly, such as a fungible token with the currency code "XRP". |
| temBAD_EXPIRATION | The transaction contains an Expiration field that is not validly formatted. |
| temBAD_ISSUER | The transaction specifies a token with an invalid issuer value. |
| temBAD_OFFER | The offer tries to trade XRP for XRP, or tries to trade an invalid or negative amount of a token. |
| temBAD_SEQUENCE | The transaction contains an OfferSequence that is not validly formatted, or is higher than the transaction's own Sequence number. |
| temINVALID_FLAG | The transaction specifies an invalid flag combination, such as both tfImmediateOrCancel and tfFillOrKill, or the transaction uses tfHybrid but omits the DomainID field. |
| temREDUNDANT | The transaction would trade a token for the same token (same issuer and currency code). |


`tecDIR_FULL`

`tecEXPIRED`

`Expiration`

`tecFROZEN`

`TakerPays`

`tecINSUF_RESERVE_OFFER`

`tesSUCCESS`

`tecKILLED`

`tfFillOrKill`

`tfImmediateOrCancel`

`tesSUCCESS`

`tecNO_AUTH`

`tecNO_ISSUER`

`issuer`

`tecNO_LINE`

`tecNO_PERMISSION`

`DomainID`

`tecUNFUNDED_OFFER`

`TakerGets`

`TakerGets`

`temBAD_CURRENCY`

`temBAD_EXPIRATION`

`Expiration`

`temBAD_ISSUER`

`issuer`

`temBAD_OFFER`

`temBAD_SEQUENCE`

`OfferSequence`

`Sequence`

`temINVALID_FLAG`

`tfImmediateOrCancel`

`tfFillOrKill`

`tfHybrid`

`DomainID`

`temREDUNDANT`


## See Also

- Offer entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e2910999-f938-47eb-acfc-91fb900b2cca&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e2910999-f938-47eb-acfc-91fb900b2cca&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aa555541-9a6f-44cb-861e-e261b302eb60&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aa555541-9a6f-44cb-861e-e261b302eb60&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=13e24787-d4f0-41cd-92a9-15f20c4072ad&bo=1&sid=1b5b3f009da311f0a7630305ccabb753&vid=1b5bb9d09da311f08f19e752f092eb74&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=OfferCreate&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&r=&lt=3668&evt=pageLoad&sv=2&cdb=AQAS&rn=836239)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=663f7375-d981-49d9-82db-c2ea6c473b6a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=663f7375-d981-49d9-82db-c2ea6c473b6a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3537eceb-0aa1-42e1-bcdd-062fece543b9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3537eceb-0aa1-42e1-bcdd-062fece543b9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9fcffb6f-6536-48e9-b1ff-be3357b4f06b&pt=OfferCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Foffercreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/offercreate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/offercreate#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/offercreate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/offercreate#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b0ba815871f8e587e2c672cc88042326.1759198430926.1759198430926.1759198430926.1&__hssc=78174987.1.1759198430926&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/offercreate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/CreateOffer.cpp)
- [Immediate or Cancel order](http://en.wikipedia.org/wiki/Immediate_or_cancel)
- [Fill or Kill order](http://en.wikipedia.org/wiki/Fill_or_kill)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b0ba815871f8e587e2c672cc88042326.1759198430926.1759198430926.1759198430926.1&__hssc=78174987.1.1759198430926&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:14:02.659Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
