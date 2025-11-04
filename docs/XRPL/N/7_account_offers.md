# account_offers
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_offers
Section: N7

## Overview


## Extracted Content
# account_offers

[Source]

The account_offers method retrieves a list of offers made by a given account that are outstanding as of a particular ledger version.

`account_offers`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 9,
  "command": "account_offers",
  "account": "rpP2JgiMyTF5jR5hLG3xHCPi1knBb1v9cM"
}
```

A request can include the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | Yes | Look up Offers placed by this account. |
| ledger_hash | Hash | No | The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | Ledger Index | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| limit | Number | No | Limit the number of Offers to retrieve. The server may return fewer than this number of results. Must be within the inclusive range 10 to 400. Positive values outside this range are replaced with the closest valid option.The default is 200. |
| marker | Marker | No | Value from a previous paginated response. Resume retrieving data where that response left off. |


`account`

`ledger_hash`

`ledger_index`

`limit`

`marker`

The following parameters are deprecated should not be provided: ledger, strict.

`ledger`

`strict`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 9,
  "status": "success",
  "type": "response",
  "result": {
    "account": "rpP2JgiMyTF5jR5hLG3xHCPi1knBb1v9cM",
    "ledger_current_index": 18539550,
    "offers": [
      {
        "flags": 0,
        "quality": "0.00000000574666765650638",
        "seq": 6577664,
        "taker_gets": "33687728098",
        "taker_pays": {
          "currency": "EUR",
          "issuer": "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
          "value": "193.5921774819578"
        }
      },
      {
        "flags": 0,
        "quality": "7989247009094510e-27",
        "seq": 6572128,
        "taker_gets": "2361918758",
        "taker_pays": {
          "currency": "XAU",
          "issuer": "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67",
          "value": "0.01886995237307572"
        }
      },
      ... trimmed for length ...
    ],
    "validated": false
  }
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| account | String | Unique Address identifying the account that made the offers |
| offers | Array | Array of objects, where each object represents an offer made by this account that is outstanding as of the requested ledger version. If the number of offers is large, only returns up to limit at a time. |
| ledger_current_index | Number - Ledger Index | (Omitted if ledger_hash or ledger_index provided) The ledger index of the current in-progress ledger version, which was used when retrieving this data. |
| ledger_index | Number - Ledger Index | (Omitted if ledger_current_index provided instead) The ledger index of the ledger version that was used when retrieving this data, as requested. |
| ledger_hash | String - Hash | (May be omitted) The identifying hash of the ledger version that was used when retrieving this data. |
| marker | Marker | (May be omitted) Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. Omitted when there are no pages of information after this one. |


`Field`

`account`

`offers`

`limit`

`ledger_current_index`

`ledger_hash`

`ledger_index`

`ledger_index`

`ledger_current_index`

`ledger_hash`

`marker`

Each offer object contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| flags | Unsigned integer | Options set for this offer entry as bit-flags. |
| seq | Unsigned integer | Sequence number of the transaction that created this entry. (Transaction sequence numbers are relative to accounts.) |
| taker_gets | String or Object | The amount the account accepting the offer receives, as a String representing an amount in XRP, or a currency specification object. (See Specifying Currency Amounts) |
| taker_pays | String or Object | The amount the account accepting the offer provides, as a String representing an amount in XRP, or a currency specification object. (See Specifying Currency Amounts) |
| quality | String | The exchange rate of the offer, as the ratio of the original taker_pays divided by the original taker_gets. When executing offers, the offer with the most favorable (lowest) quality is consumed first; offers with the same quality are executed from oldest to newest. |
| expiration | Unsigned integer | (May be omitted) A time after which this offer is considered unfunded, as the number of seconds since the Ripple Epoch. See also: Offer Expiration. |


`Field`

`flags`

`seq`

`taker_gets`

`taker_pays`

`quality`

`taker_pays`

`taker_gets`

`expiration`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actNotFound - The Address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.
- actMalformed - The marker field provided is incorrect.

`invalidParams`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

`actMalformed`

`marker`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e86e2381-18b5-4e53-807a-5ffd134e201b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e86e2381-18b5-4e53-807a-5ffd134e201b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=729f8376-4c9f-4d00-987e-9245b022f8cc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=729f8376-4c9f-4d00-987e-9245b022f8cc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=7680bab2-55cd-4d13-9588-74debeed4be9&bo=1&sid=76f3b2309da511f0820229a5a94f80a1&vid=76f457809da511f095a6e345a0c6bcf5&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_offers&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&r=&lt=2846&evt=pageLoad&sv=2&cdb=AQAS&rn=689704)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3c0ffe9f-751d-42db-86c9-a7a26e60e555&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3c0ffe9f-751d-42db-86c9-a7a26e60e555&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=65f62646-3eae-4748-a848-479a8dd8b97b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=65f62646-3eae-4748-a848-479a8dd8b97b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0a7526c3-35b2-469c-97e1-aead29c13551&pt=account_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_offers#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_offers#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_offers#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_offers#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d5abacded940aeef28ad8cf24b5dab80.1759199446154.1759199446154.1759199446154.1&__hssc=78174987.1.1759199446154&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_offers.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/AccountOffers.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d5abacded940aeef28ad8cf24b5dab80.1759199446154.1759199446154.1759199446154.1&__hssc=78174987.1.1759199446154&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:30:55.705Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
