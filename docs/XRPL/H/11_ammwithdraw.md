# AMMWithdraw
URL: https://xrpl.org/docs/references/protocol/transactions/types/ammwithdraw
Section: H11

## Overview


## Extracted Content
# AMMWithdraw

[Source]

Withdraw assets from an Automated Market Maker (AMM) instance by returning the AMM's liquidity provider tokens (LP Tokens).

(Added by the AMM amendment.)


## Example AMMWithdraw JSON

```
{
    "Account" : "rJVUeRqDFNs2xqA7ncVE6ZoAhPUoaJJSQm",
    "Amount" : {
        "currency" : "TST",
        "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
        "value" : "5"
    },
    "Amount2" : "50000000",
    "Asset" : {
        "currency" : "TST",
        "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
    },
    "Asset2" : {
        "currency" : "XRP"
    },
    "Fee" : "10",
    "Flags" : 1048576,
    "Sequence" : 10,
    "TransactionType" : "AMMWithdraw"
}
```


## AMMWithdraw Fields

In addition to the common fields, AMMWithdraw transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Asset | Object | Issue | Yes | The definition for one of the assets in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| Asset2 | Object | Issue | Yes | The definition for the other asset in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| Amount | Currency Amount | Amount | No | The amount of one asset to withdraw from the AMM. This must match the type of one of the assets (tokens or XRP) in the AMM's pool. |
| Amount2 | Currency Amount | Amount | No | The amount of another asset to withdraw from the AMM. If present, this must match the type of the other asset in the AMM's pool and cannot be the same type as Amount. |
| EPrice | Currency Amount | Amount | No | The minimum effective price, in LP Token returned, to pay per unit of the asset to withdraw. |
| LPTokenIn | Currency Amount | Amount | No | How many of the AMM's LP Tokens to redeem. |


`Asset`

`Asset2`

`Amount`

`Amount2`

`Amount`

`EPrice`

`LPTokenIn`

NoteFor a double-asset withdrawal, it is possible for Asset to correspond to either Amount or Amount2 as long as Asset2 corresponds to the other one. It is recommended to match them (that is, Amount2 is an amount of the asset defined in Asset2) because it is less confusing that way.

`Asset`

`Amount`

`Amount2`

`Asset2`

`Amount2`

`Asset2`


### AMMWithdraw Modes

This transaction has several modes, depending on which flags you specify. Each mode expects a specific combination of fields. The modes fall into two categories:

- Double-asset withdrawals, in which you receive both assets from the AMM's pool in proportions that match their balances there. These withdrawals are not subject to a fee.
- Single-asset withdrawals, in which you receive one asset from the AMM's pool. The AMM charges a fee based on how much your deposit shifts the balance of assets in the pool. Depending on the withdraw mode, the amount of the fee can be added to the amount of LP Tokens paid in, or debited from the amount of the asset paid out.

The following combinations of fields indicate a double-asset withdrawal:

| Flag Name(s) | Flag Value | Fields Specified | Meaning |
| --- | --- | --- | --- |
| tfLPToken | 0x00010000 | LPTokenIn only | Return the specified amount of LP Tokens and receive both assets from the AMM's pool in amounts based on the returned LP Tokens' share of the total LP Tokens issued. |
| tfWithdrawAll | 0x00020000 | No Fields | Return all of your LP Tokens and receive as much as you can of both assets in the AMM's pool. |
| tfTwoAsset | 0x00100000 | Amount and Amount2 | Withdraw both of this AMM's assets, in up to the specified amounts. The actual amounts received maintains the balance of assets in the AMM's pool. |


`tfLPToken`

`0x00010000`

`LPTokenIn`

`tfWithdrawAll`

`0x00020000`

`tfTwoAsset`

`0x00100000`

`Amount`

`Amount2`

The following combinations of fields indicate a single asset withdrawal:

| Flag Name(s) | Flag Value | Fields Specified | Meaning |
| --- | --- | --- | --- |
| tfSingleAsset | 0x00080000 | Amount only | Withdraw exactly the specified amount of one asset, by returning as many LP Tokens as necessary. |
| tfOneAssetWithdrawAll | 0x00040000 | Amount only | Withdraw at least the specified amount of one asset, by returning all of your LP Tokens. Fails if you can't receive at least the specified amount. The specified amount can be 0, meaning the transaction succeeds if it withdraws any positive amount. |
| tfOneAssetLPToken | 0x00200000 | Amount and LPTokenIn | Withdraw up to the specified amount of one asset, by returning up to the specified amount of LP Tokens. |
| tfLimitLPToken | 0x00400000 | Amount and EPrice | Withdraw up to the specified amount of one asset, but pay no more than the specified effective price in LP Tokens per unit of the asset received. |


`tfSingleAsset`

`0x00080000`

`Amount`

`tfOneAssetWithdrawAll`

`0x00040000`

`Amount`

`tfOneAssetLPToken`

`0x00200000`

`Amount`

`LPTokenIn`

`tfLimitLPToken`

`0x00400000`

`Amount`

`EPrice`

Any other combination of these fields is invalid.


### Single Asset Withdrawal Fee

The fee for a single asset withdrawal is calculated to be the same as if you had done a double-asset withdrawal and then used the AMM to trade all of the other asset for the one you are withdrawing. The trading fee applies to the amount you would need to trade for, but not to the rest of the withdrawal.


### AMM Deletion

If the transaction withdraws the last of the AMM's assets, it automatically tries to delete the AMM along with all associated trust lines. However, there is a limit to how many empty trust lines can be removed in one transaction. If too many empty trust lines exist, the AMM remains in the ledger in an empty state; it can be deleted with further AMMDelete transactions, or it can be refilled with a special "empty AMM" two-asset AMMDeposit transaction. While an AMM is empty, no other operations on it are valid.


### AMMWithdraw Flags

Transactions of the AMMWithdraw type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfLPToken | 0x00010000 | 65536 | Perform a double-asset withdrawal and receive the specified amount of LP Tokens. |
| tfWithdrawAll | 0x00020000 | 131072 | Perform a double-asset withdrawal returning all your LP Tokens. |
| tfOneAssetWithdrawAll | 0x00040000 | 262144 | Perform a single-asset withdrawal returning all of your LP Tokens. |
| tfSingleAsset | 0x00080000 | 524288 | Perform a single-asset withdrawal with a specified amount of the asset to withdrawal. |
| tfTwoAsset | 0x00100000 | 1048576 | Perform a double-asset withdrawal with specified amounts of both assets. |
| tfOneAssetLPToken | 0x00200000 | 2097152 | Perform a single-asset withdrawal and receive the specified amount of LP Tokens. |
| tfLimitLPToken | 0x00400000 | 4194304 | Perform a single-asset withdrawal with a specified effective price. |


`tfLPToken`

`0x00010000`

`tfWithdrawAll`

`0x00020000`

`tfOneAssetWithdrawAll`

`0x00040000`

`tfSingleAsset`

`0x00080000`

`tfTwoAsset`

`0x00100000`

`tfOneAssetLPToken`

`0x00200000`

`tfLimitLPToken`

`0x00400000`

You must specify exactly one of these flags, plus any global flags.


## Error Cases

Besides errors that can occur for all transactions, AMMWithdraw transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecAMM_EMPTY | The AMM has no assets in its pool. In this state, you can only delete the AMM or fund it with a new deposit. |
| tecAMM_BALANCE | The transaction would withdraw all of one asset from the pool, or rounding would cause a "withdraw all" to leave a nonzero amount behind. |
| tecAMM_FAILED | The conditions on the withdrawal could not be satisfied; for example, the requested effective price in the EPrice field is too low. |
| tecAMM_INVALID_TOKENS | The AMM for this token pair does not exist, or one of the calculations resulted in a withdrawal amount rounding to zero. |
| tecFROZEN | The transaction tried to withdraw a frozen token. |
| tecINSUF_RESERVE_LINE | The sender of this transaction does not meet the increased reserve requirement of processing this transaction, probably because they need at least one new trust line to hold one of the assets to be withdrawn, and they don't have enough XRP to meet the additional owner reserve for a new trust line. |
| tecNO_AUTH | The sender is not authorized to hold one of the AMM assets. |
| temMALFORMED | The transaction specified an invalid combination of fields. See AMMWithdraw Modes. (This error can also occur if the transaction is malformed in other ways.) |
| temBAD_AMM_TOKENS | The transaction specified the LP Tokens incorrectly; for example, the issuer is not the AMM's associated AccountRoot address or the currency is not the currency code for this AMM's LP Tokens, or the transaction specified this AMM's LP Tokens in one of the asset fields. |
| terNO_AMM | The Automated Market Maker instance for the asset pair in this transaction does not exist. |


`tecAMM_EMPTY`

`tecAMM_BALANCE`

`tecAMM_FAILED`

`EPrice`

`tecAMM_INVALID_TOKENS`

`tecFROZEN`

`tecINSUF_RESERVE_LINE`

`tecNO_AUTH`

`temMALFORMED`

`temBAD_AMM_TOKENS`

`issuer`

`currency`

`terNO_AMM`


## See Also

- AMM entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e775609c-88fd-4ede-9bf4-8f057af05b7f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e775609c-88fd-4ede-9bf4-8f057af05b7f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5a614c68-c5f2-4793-952a-e275aa501cf5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5a614c68-c5f2-4793-952a-e275aa501cf5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=364fcb3c-1033-42d8-a7f0-c5158cb87870&bo=1&sid=cacdb2409da111f08ef72dc596bd8f5c&vid=cace19209da111f0b1b64d6e24c6412a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AMMWithdraw&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&r=&lt=3200&evt=pageLoad&sv=2&cdb=AQAS&rn=178282)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e6df8de-15fa-46cf-9de7-a674c9a77440&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e6df8de-15fa-46cf-9de7-a674c9a77440&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=57c37b2e-fc8d-4b32-ac25-9629405cf483&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=57c37b2e-fc8d-4b32-ac25-9629405cf483&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=904679ff-8435-44cf-9f67-f3a29c721924&pt=AMMWithdraw&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammwithdraw&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/ammwithdraw#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/ammwithdraw#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/ammwithdraw#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/ammwithdraw#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/ammwithdraw.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/AMMWithdraw.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:04:40.630Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
