# AMM
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amm
Section: G12

## Overview


## Extracted Content
# AMM

[Source]

An AMM ledger entry describes a single Automated Market Maker (AMM) instance. This is always paired with a special AccountRoot entry. You can create an AMM by sending an AMMCreate transaction.

`AMM`

(Added by the AMM amendment)


## Example AMM JSON

```
{
    "Account": "rBp3UDRuEteeJqp4rEk5kxMe7BGWNYrF9A",
    "Asset": {
      "currency": "XRP"
    },
    "Asset2": {
      "currency": "NEX",
      "issuer": "rQGiPFWhaTDdue1xHX7cVpxGqPQK54zng1"
    },
    "AuctionSlot": {
      "Account": "r3ZGQZw1NCbBp5AEGkMDE9NgNpzw91aofD",
      "Expiration": 778576560,
      "Price": {
        "currency": "03DC324562A8915B7C65E9D31B93D62D02BC491C",
        "issuer": "rBp3UDRuEteeJqp4rEk5kxMe7BGWNYrF9A",
        "value": "0"
      }
    },
    "Flags": 0,
    "LPTokenBalance": {
      "currency": "03DC324562A8915B7C65E9D31B93D62D02BC491C",
      "issuer": "rBp3UDRuEteeJqp4rEk5kxMe7BGWNYrF9A",
      "value": "5509581.299648495"
    },
    "LedgerEntryType": "AMM",
    "OwnerNode": "0",
    "PreviousTxnID": "9E8E9B8FD27391C818525BFF6A29452F7A9888F31622BEF6FC36064D05CF6436",
    "PreviousTxnLgrSeq": 91448830,
    "TradingFee": 1,
    "VoteSlots": [
      {
        "VoteEntry": {
          "Account": "r3ZGQZw1NCbBp5AEGkMDE9NgNpzw91aofD",
          "TradingFee": 1,
          "VoteWeight": 100000
        }
      }
    ],
    "index": "F490627BACE2D0AA744514A640B4999D50E495DD1677550D8B10E2D20FBB15C3"
}
```


## AMM Fields

In addition to the common fields, AMM entries have the following fields:

`AMM`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Asset | Object | Issue | Yes | The definition for one of the two assets this AMM holds. In JSON, this is an object with currency and issuer fields. |
| Asset2 | Object | Issue | Yes | The definition for the other asset this AMM holds. In JSON, this is an object with currency and issuer fields. |
| Account | String - Address | AccountID | Yes | The address of the special account that holds this AMM's assets. |
| AuctionSlot | Object | Object | No | Details of the current owner of the auction slot, as an Auction Slot object. |
| LPTokenBalance | Currency Amount | Amount | Yes | The total outstanding balance of liquidity provider tokens from this AMM instance. The holders of these tokens can vote on the AMM's trading fee in proportion to their holdings, or redeem the tokens for a share of the AMM's assets which grows with the trading fees collected. |
| PreviousTxnID | String - Hash | UInt256 | No | The identifying hash of the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| PreviousTxnLgrSeq | Number | UInt32 | No | The index of the ledger that contains the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| TradingFee | Number | UInt16 | Yes | The percentage fee to be charged for trades against this AMM instance, in units of 1/100,000. The maximum value is 1000, for a 1% fee. |
| VoteSlots | Array | Array | No | A list of vote objects, representing votes on the pool's trading fee. |


`Asset`

`currency`

`issuer`

`Asset2`

`currency`

`issuer`

`Account`

`AuctionSlot`

`LPTokenBalance`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`TradingFee`

`VoteSlots`


### Auction Slot Object

The AuctionSlot field contains an object with the following nested fields:

`AuctionSlot`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The current owner of this auction slot. |
| AuthAccounts | Array | Array | No | A list of at most 4 additional accounts that are authorized to trade at the discounted fee for this AMM instance. |
| DiscountedFee | String | UInt32 | Yes | The trading fee to be charged to the auction owner, in the same format as TradingFee. Normally, this is 1/10 of the normal fee for this AMM. |
| Price | Currency Amount | Amount | Yes | The amount the auction owner paid to win this slot, in LP Tokens. |
| Expiration | String | UInt32 | Yes | The time when this slot expires, in seconds since the Ripple Epoch. |


`Account`

`AuthAccounts`

`DiscountedFee`

`TradingFee`

`Price`

`Expiration`


## VoteEntry Object

The VoteSlots field contains an array of VoteEntry objects with the following fields:

`VoteSlots`

`VoteEntry`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The account that cast the vote. |
| TradingFee | Number | UInt16 | Yes | The proposed trading fee, in units of 1/100,000; a value of 1 is equivalent to 0.001%. The maximum value is 1000, indicating a 1% fee. |
| VoteWeight | Number | UInt32 | Yes | The weight of the vote, in units of 1/100,000. For example, a value of 1234 means this vote counts as 1.234% of the weighted total vote. The weight is determined by the percentage of this AMM's LP Tokens the account owns. The maximum value is 100000. |


`Account`

`TradingFee`

`VoteWeight`


## AMM Reserve

AMM entries do not require a reserve.

`AMM`


## AMM Flags

There are no flags defined for AMM entries.

`AMM`


## AMM ID Format

The ID of an AMM entry is the SHA-512Half of the following values, concatenated in order:

`AMM`

1. The AMM space key (0x0041)
1. The AccountID of the first asset's issuer.
1. The 160-bit currency code of the first token.
1. The AccountID of the second asset's issuer.
1. The 160-bit currency code of the second token.

`AMM`

`0x0041`

For XRP, use all 0's for both the token and the issuer.


## See Also

- Transactions:AMMBid transactionAMMClawback transactionAMMCreate transactionAMMDelete transactionAMMDeposit transactionAMMVote transactionAMMWithdraw transaction
- AMMBid transaction
- AMMClawback transaction
- AMMCreate transaction
- AMMDelete transaction
- AMMDeposit transaction
- AMMVote transaction
- AMMWithdraw transaction

- AMMBid transaction
- AMMClawback transaction
- AMMCreate transaction
- AMMDelete transaction
- AMMDeposit transaction
- AMMVote transaction
- AMMWithdraw transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3409ace4-357f-4799-badd-5ca42586c023&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3409ace4-357f-4799-badd-5ca42586c023&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1a974bdc-6398-4ba3-9c8c-ccb756caf931&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1a974bdc-6398-4ba3-9c8c-ccb756caf931&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=9332bd1b-47fc-443f-acc8-bdc4bf46dfce&bo=1&sid=fee399e09d9f11f0ad4009d88cb91e0d&vid=fee412509d9f11f081b0ad0fe8b48c8a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AMM&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&r=&lt=2764&evt=pageLoad&sv=2&cdb=AQAS&rn=601565)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fa412580-802e-449c-b4ce-78e8a37650b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fa412580-802e-449c-b4ce-78e8a37650b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e4015ae-27e2-430b-8d4e-e5cb81045518&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e4015ae-27e2-430b-8d4e-e5cb81045518&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b4d91935-0526-4ba7-9239-5fa70fe7c861&pt=AMM&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Famm&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amm#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amm#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amm#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/amm#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2fa0c22381651280760f815ae726af25.1759197094812.1759197094812.1759197094812.1&__hssc=78174987.1.1759197094812&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/amm.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L369-L380)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.2fa0c22381651280760f815ae726af25.1759197094812.1759197094812.1759197094812.1&__hssc=78174987.1.1759197094812&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:51:47.416Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
