# book_changes
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_changes
Section: Q2

## Overview


## Extracted Content
# book_changes

[Source]

The book_changes method reports information about changes to the order books in the decentralized exchange (DEX) compared with the previous ledger version. This may be useful for building "candlestick" charts.

`book_changes`


### Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "example_book_changes",
    "command": "book_changes",
    "ledger_index": 88530953
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| ledger_hash | Hash | No | A 32-byte hex string for the ledger version to use. (See Specifying Ledgers) |
| ledger_index | Ledger Index | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |


`ledger_hash`

`ledger_index`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "result": {
      "type": "bookChanges",
      "ledger_hash": "7AB08A2415C10E07201521F3260F77ADFF4902A528EA66378E259A07767A24B9",
      "ledger_index": 88530953,
      "ledger_time": 771100891,
      "validated": true,
      "changes": [
        {
          "currency_a": "XRP_drops",
          "currency_b": "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y/CNY",
          "volume_a": "44082741",
          "volume_b": "158.6978676",
          "high": "277777.7777777778",
          "low": "277777.7777777778",
          "open": "277777.7777777778",
          "close": "277777.7777777778"
        },
        {
          "currency_a": "XRP_drops",
          "currency_b": "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y/XLM",
          "volume_a": "44191586",
          "volume_b": "217.6925474337355",
          "high": "202999.9948135647",
          "low": "202999.9948135647",
          "open": "202999.9948135647",
          "close": "202999.9948135647"
        },
        {
          "currency_a": "XRP_drops",
          "currency_b": "rf5YPb9y9P3fTjhxNaZqmrwaj5ar8PG1gM/47414C4100000000000000000000000000000000",
          "volume_a": "100000000",
          "volume_b": "1242.61659179386",
          "high": "80475.34586323083",
          "low": "80475.34586323083",
          "open": "80475.34586323083",
          "close": "80475.34586323083"
        },
        {
          "currency_a": "XRP_drops",
          "currency_b": "rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz/534F4C4F00000000000000000000000000000000",
          "volume_a": "33734",
          "volume_b": "0.1454210006367",
          "high": "231974.7481608686",
          "low": "231974.7481608686",
          "open": "231974.7481608686",
          "close": "231974.7481608686"
        },
        {
          "currency_a": "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y/CNY",
          "currency_b": "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y/USD",
          "volume_a": "158.6978670792",
          "volume_b": "21.76925474337",
          "high": "7.290000000001503",
          "low": "7.290000000001503",
          "open": "7.290000000001503",
          "close": "7.290000000001503"
        },
        {
          "currency_a": "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y/USD",
          "currency_b": "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y/XLM",
          "volume_a": "21.76925474337355",
          "volume_b": "217.6925474337355",
          "high": "0.1",
          "low": "0.1",
          "open": "0.1",
          "close": "0.1"
        }
      ]
    },
    "id": "example_book_changes",
    "status": "success",
    "type": "response",
    "warnings": [
      {
        "id": 2001,
        "message": "This is a clio server. clio only serves validated data. If you want to talk to rippled, include 'ledger_index':'current' in your request"
      }
    ]
  }
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| changes | Array | List of Book Update Objects, containing one entry for each order book that was updated in this ledger version. The array is empty if no order books were updated. |
| ledger_hash | Hash | The identifying hash of the ledger version that was used when retrieving this data. |
| ledger_index | Ledger Index | The ledger index of the ledger version that was used when retrieving this data. |
| ledger_time | Number | The official close time of the ledger that was used when retrieving this data, in seconds since the Ripple Epoch. |
| type | String | The string bookChanges, which indicates that this is an order book update message. |
| validated | Boolean | (May be omitted) If true, the information comes from a validated ledger version. |


`changes`

`ledger_hash`

`ledger_index`

`ledger_time`

`type`

`bookChanges`

`validated`

`true`


### Book Update Objects

A Book Update Object represents the changes to a single order book in a single ledger version, and contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| currency_a | String | An identifier for the first of the two currencies in the order book. For XRP, this is the string XRP_drops. For tokens, this is formatted as the address of the issuer in base58, followed by a forward-slash (/), followed by the Currency Code for the token, which can be a 3-character standard code or a 20-character hexadecimal code. |
| currency_b | String | An identifier for the second of two currencies in the order book. This is in the same format as currency_a, except currency_b can never be XRP. |
| volume_a | String - Number | The total amount, or volume, of the first currency (that is, currency_a) that moved as a result of trades through this order book in this ledger. |
| volume_b | String - Number | The volume of the second currency (that is, currency_b) that moved as a result of trades through this order book in this ledger. |
| high | String - Number | The highest exchange rate among all offers matched in this ledger, as a ratio of the first currency to the second currency. (In other words, currency_a : currency_b.) |
| low | String - Number | The lowest exchange rate among all offers matched in this ledger, as a ratio of the first currency to the second currency. |
| open | String - Number | The exchange rate at the top of this order book before processing the transactions in this ledger, as a ratio of the first currency to the second currency. |
| close | String - Number | The exchange rate at the top of this order book after processing the transactions in this ledger, as a ratio of the first currency to the second currency. |


`currency_a`

`XRP_drops`

`/`

`currency_b`

`currency_a`

`currency_b`

`volume_a`

`currency_a`

`volume_b`

`currency_b`

`high`

`currency_a : currency_b`

`low`

`open`

`close`

For XRP-token order books, XRP is always currency_a. For token-token order books, the currencies are sorted alphabetically by the issuer and then currency code.

`currency_a`

Exchange rates involving XRP are always calculated using drops of XRP. For example, if the rate from XRP to FOO is 1.0 XRP to 1 FOO, the rate reported by the API is 1000000 (1 million drops of XRP per 1 FOO).

`1000000`


## Possible Errors

- Any of the universal error types.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.

`lgrNotFound`

`ledger_hash`

`ledger_index`

`invalidParams`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b786a916-ba1a-47f9-b6b9-937ba3f2d5b3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b786a916-ba1a-47f9-b6b9-937ba3f2d5b3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b2cfd189-5e00-4862-9278-9ea521292500&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b2cfd189-5e00-4862-9278-9ea521292500&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=72897567-ec38-4690-bbf9-6473a0af81f2&bo=1&sid=5e8d2ff09da611f09a52574937884eaa&vid=5e8d85809da611f096dbed997b5cbf59&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=book_changes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&r=&lt=2846&evt=pageLoad&sv=2&cdb=AQAS&rn=627916)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=375273ab-7dd2-4c6b-983d-5e9701a902e1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=375273ab-7dd2-4c6b-983d-5e9701a902e1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e7cc73c8-f533-4eca-8845-4d867aaafd53&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e7cc73c8-f533-4eca-8845-4d867aaafd53&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=baf2fc76-f3b8-424a-8714-93d1913362e8&pt=book_changes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fbook_changes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_changes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_changes#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_changes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_changes#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.16ca0c5cb769e374199e867edcfb5f00.1759199832159.1759199832159.1759199832159.1&__hssc=78174987.1.1759199832159&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_changes.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/BookChanges.h)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.16ca0c5cb769e374199e867edcfb5f00.1759199832159.1759199832159.1759199832159.1&__hssc=78174987.1.1759199832159&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:37:22.902Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
