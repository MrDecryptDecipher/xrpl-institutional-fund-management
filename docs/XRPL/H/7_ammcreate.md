# AMMCreate
URL: https://xrpl.org/docs/references/protocol/transactions/types/ammcreate
Section: H7

## Overview


## Extracted Content
# AMMCreate

[Source]

Create a new Automated Market Maker (AMM) instance for trading a pair of assets (fungible tokens or XRP).

Creates both an AMM entry and a special AccountRoot entry to represent the AMM. Also transfers ownership of the starting balance of both assets from the sender to the created AccountRoot and issues an initial balance of liquidity provider tokens (LP Tokens) from the AMM account to the sender.

`AccountRoot`

CautionWhen you create the AMM, you should fund it with (approximately) equal-value amounts of each asset. Otherwise, other users can profit at your expense by trading with this AMM (performing arbitrage). The currency risk that liquidity providers take on increases with the volatility (potential for imbalance) of the asset pair. The higher the trading fee, the more it offsets this risk, so it's best to set the trading fee based on the volatility of the asset pair.

(Added by the AMM amendment.)


## Example AMMCreate JSON

```
{
    "Account" : "rJVUeRqDFNs2xqA7ncVE6ZoAhPUoaJJSQm",
    "Amount" : {
        "currency" : "TST",
        "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
        "value" : "25"
    },
    "Amount2" : "250000000",
    "Fee" : "2000000",
    "Flags" : 2147483648,
    "Sequence" : 6,
    "TradingFee" : 500,
    "TransactionType" : "AMMCreate"
}
```


## AMMCreate Fields

In addition to the common fields, AMMCreate transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amount | Currency Amount | Amount | Yes | The first of the two assets to fund this AMM with. This must be a positive amount. |
| Amount2 | Currency Amount | Amount | Yes | The second of the two assets to fund this AMM with. This must be a positive amount. |
| TradingFee | Number | UInt16 | Yes | The fee to charge for trades against this AMM instance, in units of 1/100,000; a value of 1 is equivalent to 0.001%. The maximum value is 1000, indicating a 1% fee. The minimum value is 0. |


`Amount`

`Amount2`

`TradingFee`

`1000`

`0`

One or both of Amount and Amount2 can be tokens; at most one of them can be XRP. They cannot both have the same currency code and issuer. The tokens' issuers must have Default Ripple enabled. The assets cannot be LP tokens for another AMM.

`Amount`

`Amount2`


## Special Transaction Cost

Since each AMM instance involves an AccountRoot ledger entry, an AMM ledger entry, and a trust line for each token in its pool, an AMMCreate transaction requires a much higher than usual transaction cost to deter ledger spam. Instead of the standard minimum of 0.00001 XRP, AMMCreate must destroy at least the incremental owner reserve amount, currently 0.2 XRP. This is the same special transaction cost as AccountDelete transactions.


## Error Cases

Besides errors that can occur for all transactions, AMMCreate transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecAMM_INVALID_TOKENS | Either Amount or Amount2 has a currency code that is the same as this AMM's LP Tokens would use. (This is very unlikely to occur.) |
| tecDUPLICATE | There is already another AMM for this currency pair. |
| tecFROZEN | At least one of the deposit assets (Amount or Amount2) is currently frozen. |
| tecINSUF_RESERVE_LINE | The sender of this transaction does meet the increased reserve requirement of processing this transaction, probably because they need a new trust line to hold the LP Tokens, and they don't have enough XRP to meet the additional owner reserve for a new trust line. |
| tecNO_AUTH | At least one of the deposit assets uses authorized trust lines and the sender does not have authorization to hold that asset. |
| tecNO_LINE | The sender does not have a trust line for at least one of the deposit assets. |
| tecNO_PERMISSION | At least one of the deposit assets cannot be used in an AMM. |
| tecUNFUNDED_AMM | The sender does not hold enough of the assets specified in Amount and Amount2 to fund the AMM. |
| terNO_RIPPLE | The issuer of at least one of the assets has not enabled the Default Ripple flag. |
| temAMM_BAD_TOKENS | The values of Amount and Amount2 are not valid: for example, both refer to the same token. |
| temBAD_FEE | The TradingFee value is invalid. It must be zero or a positive integer and cannot be over 1000. |
| temDISABLED | The AMM feature is not enabled on this network. |


`tecAMM_INVALID_TOKENS`

`Amount`

`Amount2`

`tecDUPLICATE`

`tecFROZEN`

`Amount`

`Amount2`

`tecINSUF_RESERVE_LINE`

`tecNO_AUTH`

`tecNO_LINE`

`tecNO_PERMISSION`

`tecUNFUNDED_AMM`

`Amount`

`Amount2`

`terNO_RIPPLE`

`temAMM_BAD_TOKENS`

`Amount`

`Amount2`

`temBAD_FEE`

`TradingFee`

`temDISABLED`


## See Also

- AMM entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=74bf3342-4de9-46b1-bee7-4c24982ff1a6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=74bf3342-4de9-46b1-bee7-4c24982ff1a6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=11711049-d6f8-4a29-be71-e80bec6de894&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=11711049-d6f8-4a29-be71-e80bec6de894&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ab3d8dc7-cef1-427f-9726-ba4ea5b9032a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ab3d8dc7-cef1-427f-9726-ba4ea5b9032a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44b5181c-2f9f-4d8e-8f39-0119396ee1aa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44b5181c-2f9f-4d8e-8f39-0119396ee1aa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4faa8561-7209-4017-a29a-1ca73568a85a&pt=AMMCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=346e9b8d-74b5-4ce6-a1de-95a7da49a305&bo=1&sid=9a3544809da111f0ac4de50ac00d4bf0&vid=9a35ae209da111f09f794f1bf0518835&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AMMCreate&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammcreate&r=&lt=3646&evt=pageLoad&sv=2&cdb=AQAS&rn=499363)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/ammcreate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/ammcreate#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/ammcreate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/ammcreate#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/ammcreate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/AMMCreate.cpp)
- [performing arbitrage](https://www.machow.ski/posts/an_introduction_to_automated_market_makers/#price-arbitrage)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:03:14.745Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
