# PaymentChannelFund
URL: https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelfund
Section: H45

## Overview


## Extracted Content
# PaymentChannelFund

[Source]

Add an additional amount to an open payment channel, and optionally update the expiration time of the channel. Only the source account of the channel can use this transaction.

(Added by the PayChan amendment.)


## Example PaymentChannelFund JSON

```
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "TransactionType": "PaymentChannelFund",
    "Channel": "C1AE6DDDEEC05CF2978C0BAD6FE302948E9533691DC749DCDD3B9E5992CA6198",
    "Amount": "200000",
    "Expiration": 543171558
}
```


## PaymentChannelFund Fields

In addition to the common fields, PaymentChannelFund transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Channel | String - Hexadecimal | UInt256 | Yes | The unique ID of the channel to fund. |
| Amount | Currency Amount | Amount | Yes | Amount to add to the channel. Must be a positive amount. Non-XRP tokens can only be used if the TokenEscrow amendment  is enabled. |
| Expiration | Number | UInt32 | No | New expiration time to set for the channel, in seconds since the Ripple Epoch. This must be later than either the current time plus the SettleDelay of the channel, or the existing Expiration of the channel. After the Expiration time, any transaction that would access the channel closes the channel without taking its normal action. (Expiration is separate from the channel's immutable CancelAfter time.) For more information, see the PayChannel ledger entry type. |


`Channel`

`Amount`

`Expiration`

`SettleDelay`

`Expiration`

`Expiration`

`Expiration`

`CancelAfter`


## Error Cases

Besides errors that can occur for all transactions, PaymentChannelFund transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecINSUFFICIENT_RESERVE | The sending account has less XRP than the reserve requirement. |
| tecNO_DST | The destination account of the channel has been deleted. This is only possible if the payment channel was created before the fixPayChanRecipientOwnerDir amendment became enabled (on 2020-05-01). |
| tecNO_ENTRY | The Payment Channel identified by the Channel field does not exist. |
| tecNO_PERMISSION | The sender of the transaction is not the source address for the channel. |
| tecUNFUNDED | The sending account does not have enough XRP or fungible tokens to fund the channel with the requested amount and still meet the reserve requirement. |
| temBAD_AMOUNT | The Amount field of the transaction is invalid. The amount must either be XRP or fungible tokens and cannot be zero or negative. |
| temBAD_EXPIRATION | The Expiration field is invalid. |


`tecINSUFFICIENT_RESERVE`

`tecNO_DST`

`tecNO_ENTRY`

`Channel`

`tecNO_PERMISSION`

`tecUNFUNDED`

`temBAD_AMOUNT`

`Amount`

`temBAD_EXPIRATION`

`Expiration`


## See Also

- PayChannel entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4f155d6c-1ea0-41a0-b76d-9889f56f051c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4f155d6c-1ea0-41a0-b76d-9889f56f051c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=acffa831-f8b8-4765-9af7-199ecccef657&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=acffa831-f8b8-4765-9af7-199ecccef657&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=f5bd31d5-4ab9-4319-b39d-62f477f4fc89&bo=1&sid=6ce263209da311f096b3d315616b90cc&vid=6ce2f4a09da311f08bf0d9ae4881212b&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=PaymentChannelFund&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&r=&lt=2051&evt=pageLoad&sv=2&cdb=AQAS&rn=532959)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d68624f5-4616-4056-a122-57b234a92e0b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d68624f5-4616-4056-a122-57b234a92e0b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=41342e4c-98b6-4838-827b-ef57c9fd0445&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=41342e4c-98b6-4838-827b-ef57c9fd0445&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebd139c6-c3be-4d4c-9887-d7a5ee4f26c3&pt=PaymentChannelFund&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelfund&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelfund#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelfund#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelfund#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelfund#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3336c7827ff417d5af1c51c8960e3291.1759198569950.1759198569950.1759198569950.1&__hssc=78174987.1.1759198569950&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/paymentchannelfund.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/PayChan.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3336c7827ff417d5af1c51c8960e3291.1759198569950.1759198569950.1759198569950.1&__hssc=78174987.1.1759198569950&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:16:19.673Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
