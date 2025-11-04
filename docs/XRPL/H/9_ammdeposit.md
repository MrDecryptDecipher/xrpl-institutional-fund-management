# AMMDeposit
URL: https://xrpl.org/docs/references/protocol/transactions/types/ammdeposit
Section: H9

## Overview


## Extracted Content
# AMMDeposit

[Source]

Deposit funds into an Automated Market Maker (AMM) instance and receive the AMM's liquidity provider tokens (LP Tokens) in exchange. You can deposit one or both of the assets in the AMM's pool.

If successful, this transaction creates a trust line to the AMM Account (limit 0) to hold the LP Tokens.

You can't deposit either asset into an AMM if:

- At least one of the pooled assets is frozen by the token issuer.
- You aren't authorized to hold at least one of the pooled assets.

(Added by the AMM amendment.)


## Example AMMDeposit JSON

```
{
    "Account" : "rJVUeRqDFNs2xqA7ncVE6ZoAhPUoaJJSQm",
    "Amount" : {
        "currency" : "TST",
        "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
        "value" : "2.5"
    },
    "Amount2" : "30000000",
    "Asset" : {
        "currency" : "TST",
        "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
    },
    "Asset2" : {
        "currency" : "XRP"
    },
    "Fee" : "10",
    "Flags" : 1048576,
    "Sequence" : 7,
    "TransactionType" : "AMMDeposit"
}
```


## AMMDeposit Fields

In addition to the common fields, AMMDeposit transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Asset | Object | Issue | Yes | The definition for one of the assets in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| Asset2 | Object | Issue | Yes | The definition for the other asset in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| Amount | Currency Amount | Amount | No | The amount of one asset to deposit to the AMM. If present, this must match the type of one of the assets (tokens or XRP) in the AMM's pool. |
| Amount2 | Currency Amount | Amount | No | The amount of another asset to add to the AMM. If present, this must match the type of the other asset in the AMM's pool and cannot be the same asset as Amount. |
| EPrice | Currency Amount | Amount | No | The maximum effective price, in the deposit asset, to pay for each LP Token received. |
| LPTokenOut | Currency Amount | Amount | No | How many of the AMM's LP Tokens to buy. |
| TradingFee | Number | UInt16 | No | Submit a vote for the AMM's trading fee, in units of 1/100,000; a value of 1 is equivalent to 0.001%. The maximum value is 1000, indicating a 1% fee. |


`Asset`

`Asset2`

`Amount`

`Amount2`

`Amount`

`EPrice`

`LPTokenOut`

`TradingFee`


### AMMDeposit Modes

This transaction has five modes, defined by which flag you specify. Each mode expects a specific combination of fields. The modes fall into two categories:

- Double-asset deposits, in which you provide both assets in the AMM's pool, proportional to the balance of the assets already there. These deposits are not subject to a fee.
- Single-asset deposits, in which you provide only one of the AMM's two assets. The AMM charges a fee, debited from the LP Tokens paid out, based on how much your deposit shifts the balance of assets in the pool.

The following combinations of fields indicate a double-asset deposit:

| Flag Name | Flag Value | Fields Specified | Meaning |
| --- | --- | --- | --- |
| tfLPToken | 0x00010000 | LPTokenOut only | Deposit both of this AMM's assets, in amounts calculated so that you receive the specified amount of LP Tokens in return. The amounts deposited maintain the relative proportions of the two assets the AMM already holds. |
| tfTwoAsset | 0x00100000 | Amount and Amount2 | Deposit both of this AMM's assets, up to the specified amounts. The actual amounts deposited must maintain the same balance of assets as the AMM already holds, so the amount of either one deposited MAY be less than specified. The amount of LP Tokens you get in return is based on the total value deposited. |
| tfTwoAssetIfEmpty | 0x00800000 | Amount and Amount2 | Deposit both of this AMM's assets, in exactly the specified amounts, to an AMM with an empty asset pool. The amount of LP Tokens you get in return is based on the total value deposited. |


`tfLPToken`

`0x00010000`

`LPTokenOut`

`tfTwoAsset`

`0x00100000`

`Amount`

`Amount2`

`tfTwoAssetIfEmpty`

`0x00800000`

`Amount`

`Amount2`

The following combinations of fields indicate a single asset deposit:

| Flag Name | Flag Value | Fields Specified | Meaning |
| --- | --- | --- | --- |
| tfSingleAsset | 0x00080000 | Amount only | Deposit exactly the specified amount of one asset, and receive an amount of LP Tokens based on the resulting share of the pool (minus fees). |
| tfOneAssetLPToken | 0x00200000 | Amount and LPTokenOut | Deposit up to the specified amount of one asset, so that you receive exactly the specified amount of LP Tokens in return (after fees). |
| tfLimitLPToken | 0x00400000 | Amount and EPrice | Deposit up to the specified amount of one asset, but pay no more than the specified effective price per LP Token (after fees). |


`tfSingleAsset`

`0x00080000`

`Amount`

`tfOneAssetLPToken`

`0x00200000`

`Amount`

`LPTokenOut`

`tfLimitLPToken`

`0x00400000`

`Amount`

`EPrice`

Any other combination of these fields and flags is invalid.


### Single Asset Deposit Fee

The fee for a single asset deposit is calculated to be the same as if you had used the AMM to trade part of the deposit amount for the other asset, then done a double-asset deposit. The AMM's trading fee applies to the amount you would need to trade for, but not to the rest of the deposit. For example, if the AMM's asset pool is split perfectly evenly between USD and EUR, and you try to deposit 100 USD, the amount of LP Tokens you receive is slightly less than if you had deposited 50 EUR + 50 USD, because you pay the trading fee to convert some of your USD to an equal amount of EUR.

The formula for how many LP Tokens you receive for a double-asset deposit is:

1 +B - (F × (1 - W) × B)P][)(W- 1L = T ×

Where:

- L is the amount of LP Tokens returned
- T is the total outstanding LP Tokens before the deposit
- B is the amount of the asset being deposited
- F is the trading fee, as a decimal
- W is the weight of the deposit asset in the pool. This is defined as 0.5 for all AMM pools (meaning a 50/50 split), so exponentiation by W is equivalent to taking the square root.
- P is the total amount of the deposit asset in the pool before the deposit

`L`

`T`

`B`

`F`

`W`

`P`


### Empty AMM Special Case

In some cases, an AMM can exist with no assets in its pool. You cannot perform normal deposits into an AMM in such a state because the ratio between the assets is undefined (0/0). Instead, you can use a special "Empty AMM" deposit case with the flag tfTwoAssetIfEmpty and exact amounts of both assets. This directly sets the ratio between the assets in the same way an AMMCreate transaction does when an AMM is initially created. Like a double-asset deposit, this is not subject to a fee.

`tfTwoAssetIfEmpty`

You can only do a special "Empty AMM" deposit if the AMM is empty.


### AMMDeposit Flags

Transactions of the AMMDeposit type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfLPToken | 0x00010000 | 65536 | Perform a double-asset deposit and receive the specified amount of LP Tokens. |
| tfSingleAsset | 0x00080000 | 524288 | Perform a single-asset deposit with a specified amount of the asset to deposit. |
| tfTwoAsset | 0x00100000 | 1048576 | Perform a double-asset deposit with specified amounts of both assets. |
| tfOneAssetLPToken | 0x00200000 | 2097152 | Perform a single-asset deposit and receive the specified amount of LP Tokens. |
| tfLimitLPToken | 0x00400000 | 4194304 | Perform a single-asset deposit with a specified effective price. |
| tfTwoAssetIfEmpty | 0x00800000 | 8388608 | Perform a special double-asset deposit to an AMM with an empty pool. |


`tfLPToken`

`0x00010000`

`tfSingleAsset`

`0x00080000`

`tfTwoAsset`

`0x00100000`

`tfOneAssetLPToken`

`0x00200000`

`tfLimitLPToken`

`0x00400000`

`tfTwoAssetIfEmpty`

`0x00800000`

You must specify exactly one of these flags, plus any global flags.


## Error Cases

Besides errors that can occur for all transactions, AMMDeposit transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecAMM_EMPTY | The AMM currently holds no assets, so you cannot do a normal deposit. You must use the Empty AMM Special Case deposit instead. |
| tecAMM_NOT_EMPTY | The transaction specified tfTwoAssetIfEmpty, but the AMM was not empty. |
| tecAMM_FAILED | The conditions on the deposit could not be satisfied. For example, the requested effective price in the EPrice field is too low. |
| tecFROZEN | The transaction tried to deposit a frozen token, or at least one of the paired tokens is frozen. |
| tecINSUF_RESERVE_LINE | The sender of this transaction does meet the increased reserve requirement of processing this transaction, probably because they need a new trust line to hold the LP Tokens, and they don't have enough XRP to meet the additional owner reserve for a new trust line. |
| tecUNFUNDED_AMM | The sender does not have a high enough balance to make the specified deposit. |
| temBAD_AMM_TOKENS | The transaction specified the LP Tokens incorrectly. For example, the issuer is not the AMM's associated AccountRoot address or the currency is not the currency code for this AMM's LP Tokens, or the transaction specified this AMM's LP Tokens in one of the asset fields. |
| temBAD_AMOUNT | An amount specified in the transaction is invalid. For example, a deposit amount is negative. |
| temBAD_FEE | A fee value specified in the transaction is invalid. For example, the trading fee is outside the allowable range. |
| temMALFORMED | The transaction specified an invalid combination of fields. See AMMDeposit Modes. |
| terNO_ACCOUNT | An account specified in the request does not exist. |
| terNO_AMM | The Automated Market Maker instance for the asset pair in this transaction does not exist. |


`tecAMM_EMPTY`

`tecAMM_NOT_EMPTY`

`tfTwoAssetIfEmpty`

`tecAMM_FAILED`

`EPrice`

`tecFROZEN`

`tecINSUF_RESERVE_LINE`

`tecUNFUNDED_AMM`

`temBAD_AMM_TOKENS`

`issuer`

`currency`

`temBAD_AMOUNT`

`temBAD_FEE`

`temMALFORMED`

`terNO_ACCOUNT`

`terNO_AMM`


## See Also

- AMM entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=460953a8-eb54-4a3f-9770-c561338a70ac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=460953a8-eb54-4a3f-9770-c561338a70ac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3507114c-271f-434f-b7d1-345b197e6890&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3507114c-271f-434f-b7d1-345b197e6890&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=fd0c78ac-3875-4988-ab19-e015f1304eb5&bo=1&sid=b14a3a309da111f09d83c320d23156ab&vid=b14ac3909da111f09ef67f4474d803cf&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AMMDeposit&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&r=&lt=3954&evt=pageLoad&sv=2&cdb=AQAS&rn=526546)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c19cf5c5-d2a2-4810-8078-90c433313b2e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c19cf5c5-d2a2-4810-8078-90c433313b2e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=18706683-20bc-4371-8f03-0d558312dc73&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=18706683-20bc-4371-8f03-0d558312dc73&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1c7d2984-177b-4a27-893c-2ac024287290&pt=AMMDeposit&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammdeposit&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/ammdeposit#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/ammdeposit#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/ammdeposit#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/ammdeposit#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5d2d9fbcf8455d83981cfa696994c492.1759197823567.1759197823567.1759197823567.1&__hssc=78174987.1.1759197823567&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/ammdeposit.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/AMMDeposit.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5d2d9fbcf8455d83981cfa696994c492.1759197823567.1759197823567.1759197823567.1&__hssc=78174987.1.1759197823567&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:03:58.414Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
