# fee
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/fee
Section: U1

## Overview


## Extracted Content
# fee

[Source]

The fee command reports the current state of the open-ledger requirements for the transaction cost. This requires the FeeEscalation amendment to be enabled.

`fee`

This is a public command available to unprivileged users.


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "fee_websocket_example",
  "command": "fee"
}
```

The request does not include any parameters.


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "fee_websocket_example",
  "status": "success",
  "type": "response",
  "result": {
    "current_ledger_size": "14",
    "current_queue_size": "0",
    "drops": {
      "base_fee": "10",
      "median_fee": "11000",
      "minimum_fee": "10",
      "open_ledger_fee": "10"
    },
    "expected_ledger_size": "24",
    "ledger_current_index": 26575101,
    "levels": {
      "median_level": "281600",
      "minimum_level": "256",
      "open_ledger_level": "256",
      "reference_level": "256"
    },
    "max_queue_size": "480"
  }
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| current_ledger_size | String (Integer) | Number of transactions provisionally included in the in-progress ledger. |
| current_queue_size | String (Integer) | Number of transactions currently queued for the next ledger. |
| drops | Object | Various information about the transaction cost (the Fee field of a transaction), in drops of XRP. |
| drops.base_fee | String (Integer) | The transaction cost required for a reference transaction to be included in a ledger under minimum load, represented in drops of XRP. |
| drops.median_fee | String (Integer) | An approximation of the median transaction cost among transactions included in the previous validated ledger, represented in drops of XRP. |
| drops.minimum_fee | String (Integer) | The minimum transaction cost for a reference transaction to be queued for a later ledger, represented in drops of XRP. If greater than base_fee, the transaction queue is full. |
| drops.open_ledger_fee | String (Integer) | The minimum transaction cost that a reference transaction must pay to be included in the current open ledger, represented in drops of XRP. |
| expected_ledger_size | String (Integer) | The approximate number of transactions expected to be included in the current ledger. This is based on the number of transactions in the previous ledger. |
| ledger_current_index | Number | The Ledger Index of the current open ledger these stats describe. |
| levels | Object | Various information about the transaction cost, in fee levels. The ratio in fee levels applies to any transaction relative to the minimum cost of that particular transaction. |
| levels.median_level | String (Integer) | The median transaction cost among transactions in the previous validated ledger, represented in fee levels. |
| levels.minimum_level | String (Integer) | The minimum transaction cost required to be queued for a future ledger, represented in fee levels. |
| levels.open_ledger_level | String (Integer) | The minimum transaction cost required to be included in the current open ledger, represented in fee levels. |
| levels.reference_level | String (Integer) | The equivalent of the minimum transaction cost, represented in fee levels. |
| max_queue_size | String (Integer) | The maximum number of transactions that the transaction queue can currently hold. |


`Field`

`current_ledger_size`

`current_queue_size`

`drops`

`Fee`

`drops.base_fee`

`drops.median_fee`

`drops.minimum_fee`

`base_fee`

`drops.open_ledger_fee`

`expected_ledger_size`

`ledger_current_index`

`levels`

`levels.median_level`

`levels.minimum_level`

`levels.open_ledger_level`

`levels.reference_level`

`max_queue_size`


## Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 0.32.0](https://img.shields.io/badge/Updated in-rippled 0.32.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=085f69be-2e51-4226-8792-b6ba5dda50a5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=085f69be-2e51-4226-8792-b6ba5dda50a5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78333e05-34ef-492c-903a-30def9b17b37&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78333e05-34ef-492c-903a-30def9b17b37&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ad96af8d-a945-40d7-8053-49167bb0cb52&bo=1&sid=13816e709da711f0a305f7dbd655ed63&vid=138209d09da711f08eca7d35848ff498&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=fee&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&r=&lt=2499&evt=pageLoad&sv=2&cdb=AQAS&rn=996427)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ee2cc4c2-f57c-49c4-9fa1-3264b46720f9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ee2cc4c2-f57c-49c4-9fa1-3264b46720f9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c51494f8-7bf4-4cd0-866f-f8afde8da1f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c51494f8-7bf4-4cd0-866f-f8afde8da1f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=89011eb5-815e-4e40-9452-926a81cfb95a&pt=fee&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Ffee&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/fee#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/fee#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/fee#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/fee#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e5f15977913ec1c9adc69b69adbe2e0c.1759200137414.1759200137414.1759200137414.1&__hssc=78174987.1.1759200137414&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/server-info-methods/fee.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/release/src/ripple/rpc/handlers/Fee1.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/0.32.0](https://github.com/XRPLF/rippled/releases/tag/0.32.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e5f15977913ec1c9adc69b69adbe2e0c.1759200137414.1759200137414.1759200137414.1&__hssc=78174987.1.1759200137414&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:42:25.958Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
