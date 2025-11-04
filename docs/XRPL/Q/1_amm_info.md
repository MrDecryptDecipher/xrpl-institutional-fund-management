# amm_info
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info
Section: Q1

## Overview


## Extracted Content
# amm_info

[Source]

The amm_info method gets information about an Automated Market Maker (AMM) instance.

`amm_info`

(Added by the AMM amendment)


### Request Format

An example of the request format:

There is no commandline syntax for this method. You can use the json method to access this method from the commandline instead.

- WebSocket
- JSON-RPC

```
{
    "command": "amm_info",
    "asset": {
      "currency": "XRP"
    },
    "asset2": {
      "currency": "TST",
      "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
    }
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | No | Show only LP Tokens held by this liquidity provider. |
| amm_account | String - Address | No | The address of the AMM's special AccountRoot. (This is the issuer of the AMM's LP Tokens.) |
| asset | Object | No | One of the assets of the AMM to look up, as an object with currency and issuer fields (omit issuer for XRP), like currency amounts. |
| asset2 | Object | No | The other of the assets of the AMM, as an object with currency and issuer fields (omit issuer for XRP), like currency amounts. |


`Field`

`account`

`amm_account`

`issuer`

`asset`

`currency`

`issuer`

`issuer`

`asset2`

`currency`

`issuer`

`issuer`

You must specify either amm_account or both asset and asset2.

`amm_account`

`asset`

`asset2`


### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC

```
{
  "result": {
    "amm": {
      "account": "rp9E3FN3gNmvePGhYnf414T2TkUuoxu8vM",
      "amount": "296890496",
      "amount2": {
        "currency": "TST",
        "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
        "value": "25.81656470648473"
      },
      "asset2_frozen": false,
      "auction_slot": {
        "account": "rJVUeRqDFNs2xqA7ncVE6ZoAhPUoaJJSQm",
        "auth_accounts": [
          {
            "account": "r3f2WpQMsAd8k4Zoijv2PZ78EYFJ2EdvgV"
          },
          {
            "account": "rnW8FAPgpQgA6VoESnVrUVJHBdq9QAtRZs"
          }
        ],
        "discounted_fee": 60,
        "expiration": "2023-Jan-26 00:28:40.000000000 UTC",
        "price": {
          "currency": "039C99CD9AB0B70B32ECDA51EAAE471625608EA2",
          "issuer": "rp9E3FN3gNmvePGhYnf414T2TkUuoxu8vM",
          "value": "0"
        },
        "time_interval": 0
      },
      "lp_token": {
        "currency": "039C99CD9AB0B70B32ECDA51EAAE471625608EA2",
        "issuer": "rp9E3FN3gNmvePGhYnf414T2TkUuoxu8vM",
        "value": "87533.41976112682"
      },
      "trading_fee": 600,
      "vote_slots": [
        {
          "account": "rJVUeRqDFNs2xqA7ncVE6ZoAhPUoaJJSQm",
          "trading_fee": 600,
          "vote_weight": 9684
        }
      ]
    },
    "ledger_current_index": 316725,
    "validated": false
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| amm | Object | An AMM Description Object for the requested asset pair. |
| ledger_current_index | Ledger Index | (Omitted if ledger_index is provided instead) The ledger index of the current in-progress ledger, which was used when retrieving this information. |
| ledger_hash | Hash | (Omitted if ledger_current_index is provided instead) The identifying hash of the ledger version that was used when retrieving this data. |
| ledger_index | Ledger Index | (Omitted if ledger_current_index is provided instead) The ledger index of the ledger version used when retrieving this information. |
| validated | Boolean | If true, the ledger used for this request is validated and these results are final; if omitted or set to false, the data is pending and may change. |


`amm`

`ledger_current_index`

`ledger_index`

`ledger_hash`

`ledger_current_index`

`ledger_index`

`ledger_current_index`

`validated`

`true`

`false`


### AMM Description Object

The amm field is an object describing the current status of an Automated Market Maker (AMM) in the ledger, and contains the following fields:

`amm`

| Field | Type | Description |
| --- | --- | --- |
| account | String | The Address of the AMM Account. |
| amount | Currency Amount | The total amount of one asset in the AMM's pool. (Note: This could be asset or asset2 from the request.) |
| amount2 | Currency Amount | The total amount of the other asset in the AMM's pool. (Note: This could be asset or asset2 from the request.) |
| asset_frozen | Boolean | (Omitted for XRP) If true, the amount currency is currently frozen. |
| asset2_frozen | Boolean | (Omitted for XRP) If true, the amount2 currency is currently frozen. |
| auction_slot | Object | (May be omitted) An Auction Slot Object describing the current auction slot holder, if there is one. |
| lp_token | Currency Amount | The total amount of this AMM's LP Tokens outstanding. If the request specified a liquidity provider in the account field, instead, this is the amount of this AMM's LP Tokens held by that liquidity provider. |
| trading_fee | Number | The AMM's current trading fee, in units of 1/100,000; a value of 1 is equivalent to a 0.001% fee. |
| vote_slots | Array | (May be omitted) The current votes for the AMM's trading fee, as Vote Slot Objects. |


`account`

`amount`

`asset`

`asset2`

`amount2`

`asset`

`asset2`

`asset_frozen`

`true`

`amount`

`asset2_frozen`

`true`

`amount2`

`auction_slot`

`lp_token`

`account`

`trading_fee`

`vote_slots`


### Auction Slot Object

The auction_slot field of the amm object describes the current auction slot holder of the AMM, and contains the following fields:

`auction_slot`

`amm`

| Field | Type | Description |
| --- | --- | --- |
| account | String | The Address of the account that owns the auction slot. |
| auth_accounts | Array | A list of additional accounts that the auction slot holder has designated as being eligible of the discounted trading fee. Each member of this array is an object with one field, account, containing the address of the designated account. |
| discounted_fee | Number | The discounted trading fee that applies to the auction slot holder, and any eligible accounts, when trading against this AMM. This is 1/10 of the AMM's normal trading fee. |
| expiration | String | The ISO 8601 UTC timestamp after which this auction slot expires. After expired, the auction slot does not apply (but the data can remain in the ledger until another transaction replaces it or cleans it up). |
| price | Currency Amount | The amount, in LP Tokens, that the auction slot holder paid to win the auction slot. This affects the price to outbid the current slot holder. |
| time_interval | Number | The current 72-minute time interval this auction slot is in, from 0 to 19. The auction slot expires after 24 hours (20 intervals of 72 minutes) and affects the cost to outbid the current holder and how much the current holder is refunded if someone outbids them. |


`account`

`auth_accounts`

`account`

`discounted_fee`

`expiration`

`price`

`time_interval`


### Vote Slot Objects

Each entry in the vote_slots array represents one liquidity provider's vote to set the trading fee, and contains the following fields:

`vote_slots`

| Field | Type | Description |
| --- | --- | --- |
| account | String | The Address of this liquidity provider. |
| trading_fee | Number | The trading fee this liquidity provider voted for, in units of 1/100,000. |
| vote_weight | Number | How much this liquidity provider's vote counts towards the final trading fee. This is proportional to how much of the AMM's LP Tokens this liquidity provider holds. The value is equal to 100,000 times the number of this LP Tokens this liquidity provider holds, divided by the total number of LP Tokens outstanding. For example, a value of 1000 means that the liquidity provider holds 1% of this AMM's LP Tokens. |


`account`

`trading_fee`

`vote_weight`


### Possible Errors

- Any of the universal error types.
- actNotFound - The AMM for this asset pair does not exist, or an account specified in the request does not exist.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.

`actNotFound`

`invalidParams`


## See Also

- AMM object - The canonical storage format of the AMM object
- AMMBid - More info on the auction slot and bidding mechanism
- AMMVote - More info on the trading fee voting mechanism

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a33faee6-e8c6-42ac-92b1-63230ed83379&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a33faee6-e8c6-42ac-92b1-63230ed83379&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9307e53a-5f12-4146-8c5e-553c53b2d691&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9307e53a-5f12-4146-8c5e-553c53b2d691&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1cadb979-4390-4450-b6e5-8c6d8f6fae05&bo=1&sid=522b89509da611f08819e93c11b0fbac&vid=522c07909da611f095b3b9908ef8aba9&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=amm_info&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&r=&lt=3640&evt=pageLoad&sv=2&cdb=AQAS&rn=296015)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5d4d37c0-0e05-4b50-ad0a-115cdac4590e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5d4d37c0-0e05-4b50-ad0a-115cdac4590e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=41a0c06b-8e8a-432f-8c56-bee455c177e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=41a0c06b-8e8a-432f-8c56-bee455c177e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9d7299f4-8fbd-44ef-88f5-0eee4d74ab08&pt=amm_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Famm_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.72fd7aa9702810bc446463d13590ab2a.1759199811458.1759199811458.1759199811458.1&__hssc=78174987.1.1759199811458&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/AMMInfo.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.72fd7aa9702810bc446463d13590ab2a.1759199811458.1759199811458.1759199811458.1&__hssc=78174987.1.1759199811458&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:37:04.102Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
