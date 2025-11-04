# AMMBid
URL: https://xrpl.org/docs/references/protocol/transactions/types/ammbid
Section: H5

## Overview


## Extracted Content
# AMMBid

[Source]

Bid on an Automated Market Maker's (AMM's) auction slot. If you win, you can trade against the AMM at a discounted fee until you are outbid or 24 hours have passed. If you are outbid before 24 hours have passed, you are refunded part of the cost of your bid based on how much time remains. If the AMM's trading fee is zero, you can still bid, but the auction slot provides no benefit unless the trading fee changes.

You bid using the AMM's LP Tokens; the amount of a winning bid is returned to the AMM, decreasing the outstanding balance of LP Tokens.

(Added by the AMM amendment.)


## Example AMMBid JSON

```
{
    "Account" : "rJVUeRqDFNs2xqA7ncVE6ZoAhPUoaJJSQm",
    "Asset" : {
        "currency" : "XRP"
    },
    "Asset2" : {
        "currency" : "TST",
        "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
    },
    "AuthAccounts" : [
        {
          "AuthAccount" : {
              "Account" : "rMKXGCbJ5d8LbrqthdG46q3f969MVK2Qeg"
          }
        },
        {
          "AuthAccount" : {
              "Account" : "rBepJuTLFJt3WmtLXYAxSjtBWAeQxVbncv"
          }
        }
    ],
    "BidMax" : {
        "currency" : "039C99CD9AB0B70B32ECDA51EAAE471625608EA2",
        "issuer" : "rE54zDvgnghAoPopCgvtiqWNq3dU5y836S",
        "value" : "100"
    },
    "Fee" : "10",
    "Flags" : 2147483648,
    "Sequence" : 9,
    "TransactionType" : "AMMBid"
}
```


## AMMBid Fields

In addition to the common fields, AMMBid transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Asset | Object | Issue | Yes | The definition for one of the assets in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| Asset2 | Object | Issue | Yes | The definition for the other asset in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| BidMin | Currency Amount | Amount | No | Pay at least this amount for the slot. Setting this value higher makes it harder for others to outbid you. If omitted, pay the minimum necessary to win the bid. |
| BidMax | Currency Amount | Amount | No | Pay at most this amount for the slot. If the cost to win the bid is higher than this amount, the transaction fails. If omitted, pay as much as necessary to win the bid. |
| AuthAccounts | Array | Array | No | A list of up to 4 additional accounts that you allow to trade at the discounted fee. This cannot include the address of the transaction sender. Each of these objects should be an Auth Account object. |


`Asset`

`Asset2`

`BidMin`

`BidMax`

`AuthAccounts`


### Auth Account Objects

Each member of the AuthAccounts array must be an object with the following field:

`AuthAccounts`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | AccountID | Yes | The address of the account to authorize. |


`Account`

Like other "inner objects" that can appear in arrays, the JSON representation of each of these objects is wrapped in an object whose only key is the object type, AuthAccount.

`AuthAccount`


## Auction Slot Price

If successful, the transaction automatically outbids the previous slot owner and debits the bid price from the sender's LP Tokens. The price to win the auction decreases over time, divided into 20 intervals of 72 minutes each. If the sender does not have enough LP Tokens to win the bid, or the price of the bid is higher than the transaction's BidMax value, the transaction fails with a tecAMM_INVALID_TOKENS result.

`BidMax`

`tecAMM_INVALID_TOKENS`

- If the auction slot is currently empty, expired, or in its last interval, the minimum bid is defined by the following formula:M = L * F / 25M is the minimum bid.L is the total number of LP Tokens currently issued by the AMMF is the trading fee, as a decimal
- M is the minimum bid.
- L is the total number of LP Tokens currently issued by the AMM
- F is the trading fee, as a decimal
- Otherwise, the price to outbid the current holder is calculated using the following formula:P = B * 1.05 * (1 - t^60) + MP is the price to outbid, in LP Tokens.B is the price of the current bid, in LP Tokens.t is the fraction of time elapsed in the current 24-hour slot, rounded down to a multiple of 0.05.M is the minimum bid as defined above.There are two special cases for the cost to outbid someone. In the first interval after someone wins the bid, the price to outbid them is the minimum bid plus 5% more than the existing bid:P = B * 1.05 + MIn the last interval of someone's slot, the cost to outbid someone is only the minimum bid:P = M
- P is the price to outbid, in LP Tokens.
- B is the price of the current bid, in LP Tokens.
- t is the fraction of time elapsed in the current 24-hour slot, rounded down to a multiple of 0.05.
- M is the minimum bid as defined above.

If the auction slot is currently empty, expired, or in its last interval, the minimum bid is defined by the following formula:

```
M = L * F / 25
```

- M is the minimum bid.
- L is the total number of LP Tokens currently issued by the AMM
- F is the trading fee, as a decimal

`M`

`L`

`F`

Otherwise, the price to outbid the current holder is calculated using the following formula:

```
P = B * 1.05 * (1 - t^60) + M
```

- P is the price to outbid, in LP Tokens.
- B is the price of the current bid, in LP Tokens.
- t is the fraction of time elapsed in the current 24-hour slot, rounded down to a multiple of 0.05.
- M is the minimum bid as defined above.

`P`

`B`

`t`

`M`

There are two special cases for the cost to outbid someone. In the first interval after someone wins the bid, the price to outbid them is the minimum bid plus 5% more than the existing bid:

```
P = B * 1.05 + M
```

In the last interval of someone's slot, the cost to outbid someone is only the minimum bid:

```
P = M
```

NoteTo make sure all servers in the network reach the same results when building a ledger, time measurements are based on the official close time of the previous ledger, which is approximate.


## Bid Refunds

When you outbid an active auction slot, the AMM refunds the previous holder part of the price, using this formula:

```
R = B * (1 - t)
```

- R is the amount to refund, in LP Tokens.
- B is the price of the previous bid to be refunded, in LP Tokens.
- t is the fraction of time elapsed in the current 24-hour slot, rounded down to a multiple of 0.05.

`R`

`B`

`t`

As a special case, during the final (20th) interval of the auction slot, the refunded amount is zero.

NoteAs with all XRP Ledger times, transaction processing uses the official close time of the previous ledger, which can result in a difference of up to about 10 seconds from real time.


## Error Cases

Besides errors that can occur for all transactions, AMMBid transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecAMM_EMPTY | The AMM has no assets in its pool. In this state, you can only delete the AMM or fund it with a new deposit. |
| tecAMM_FAILED | This transaction could not win the auction, either because the sender does not hold enough LP Tokens to pay the necessary bid or because the price to win the auction was higher than the transaction's specified BidMax value. |
| tecAMM_INVALID_TOKENS | The sender of this transaction does not hold enough LP Tokens to meet the slot price. |
| temBAD_AMM_TOKENS | The specified BidMin or BidMax were not specified as the correct LP Tokens for this AMM. |
| temDISABLED | The AMM feature is not enabled on this network. |
| temMALFORMED | The transaction specified invalid options, such as a list of AuthAccounts that is too long. |
| terNO_ACCOUNT | One of the accounts specified in this request do not exist. |
| terNO_AMM | The Automated Market Maker instance for the asset pair in this transaction does not exist. |


`tecAMM_EMPTY`

`tecAMM_FAILED`

`BidMax`

`tecAMM_INVALID_TOKENS`

`temBAD_AMM_TOKENS`

`BidMin`

`BidMax`

`temDISABLED`

`temMALFORMED`

`AuthAccounts`

`terNO_ACCOUNT`

`terNO_AMM`


## See Also

- AMM entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8116ec5f-3bc5-4496-924b-2c7a44d20005&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8116ec5f-3bc5-4496-924b-2c7a44d20005&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5328f78d-fd5e-4e7b-b1e6-cb947be12dd5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5328f78d-fd5e-4e7b-b1e6-cb947be12dd5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=d451fdd1-99a4-439e-8425-3c1962fdfae1&bo=1&sid=7e4634309da111f0bafdbbccce2ad5cb&vid=7e46c5f09da111f0adab2b05ab5d2d8a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AMMBid&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&r=&lt=2175&evt=pageLoad&sv=2&cdb=AQAS&rn=579993)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=977127a1-b34b-47d0-9921-412a6a9e5003&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=977127a1-b34b-47d0-9921-412a6a9e5003&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=99b3e05e-84db-4bc3-b0c6-889126ed8491&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=99b3e05e-84db-4bc3-b0c6-889126ed8491&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8c0df2b7-c307-4caf-b24a-a684317ed144&pt=AMMBid&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammbid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/ammbid#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/ammbid#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/ammbid#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/ammbid#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.9de0258af6fd902d4781b11b028494be.1759197739862.1759197739862.1759197739862.1&__hssc=78174987.1.1759197739863&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/ammbid.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/AMMBid.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.9de0258af6fd902d4781b11b028494be.1759197739862.1759197739862.1759197739862.1&__hssc=78174987.1.1759197739863&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:02:31.663Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
