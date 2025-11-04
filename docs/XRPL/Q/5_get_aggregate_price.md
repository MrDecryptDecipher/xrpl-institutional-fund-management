# get_aggregate_price
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/get_aggregate_price
Section: Q5

## Overview


## Extracted Content
# get_aggregate_price

(Requires the PriceOracle amendment)

[Source]

The get_aggregate_price method retrieves the aggregate price of specified Oracle objects, returning three price statistics: mean, median, and trimmed mean.

`get_aggregate_price`

`Oracle`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC

```
{
  "command": "get_aggregate_price",
  "ledger_index": "current",
  "base_asset": "XRP",
  "quote_asset": "USD",
  "trim": 20,
  "oracles": [
    {
      "account": "rp047ow9WcPmnNpVHMQV5A4BF6vaL9Abm6",
      "oracle_document_id": 34
    },
    {
      "account": "rp147ow9WcPmnNpVHMQV5A4BF6vaL9Abm7",
      "oracle_document_id": 56
    },
    {
      "account": "rp247ow9WcPmnNpVHMQV5A4BF6vaL9Abm8",
      "oracle_document_id": 2
    },
    {
      "account": "rp347ow9WcPmnNpVHMQV5A4BF6vaL9Abm9",
      "oracle_document_id": 7
    },
    {
      "account": "rp447ow9WcPmnNpVHMQV5A4BF6vaL9Abm0",
      "oracle_document_id": 109
    }
  ]
}
```

The request contains the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| base_asset | String | Yes | The currency code of the asset to be priced. |
| quote_asset | String | Yes | The currency code of the asset to quote the price of the base asset. |
| trim | Number | No | The percentage of outliers to trim. Valid trim range is 1-25. If included, the API returns statistics for the trimmed mean. |
| trim_threshold | Number | No | Defines a time range in seconds for filtering out older price data. Default value is 0, which doesn't filter any data. |
| oracles | Array | Yes | An array of oracle identifier objects. You must list between 1 and 200 oracle identifiers. |


`base_asset`

`quote_asset`

`trim`

`trimmed mean`

`trim_threshold`

`oracles`

Each member of the oracles array is an oracle identifier object with the following fields:

`oracles`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String | Yes | The XRPL account that controls the Oracle object. |
| oracle_document_id | Number | Yes | A unique identifier of the price oracle for the Account |


`account`

`Oracle`

`oracle_document_id`

`Account`


## Response Format

An example of the response format:

```
{
  "result": {
    "entire_set": {
      "mean": "0.78",
      "size": 3,
      "standard_deviation": "0.03464101615137754"
    },
    "ledger_current_index": 3677185,
    "median": "0.8",
    "time": 1724877762,
    "trimmed_set": {
      "mean": "0.78",
      "size": 3,
      "standard_deviation": "0.03464101615137754"
    },
    "validated": false
  },
  "status": "success",
  "type": "response"
}
```

| Field | Type | Description |
| --- | --- | --- |
| entire_set | Object | The statistics from the collected oracle prices. |
| entire_set.mean | String - Number | The simple mean. |
| entire_set.size | Number | The size of the data set to calculate the mean. |
| entire_set.standard_deviation | String - Number | The standard deviation. |
| trimmed_set | Object | The trimmed statistics from the collected oracle prices. Only appears if the trim field was specified in the request. |
| trimmed_set.mean | String - Number | The simple mean of the trimmed data. |
| trimmed_set.size | Number | The size of the data to calculate the trimmed mean. |
| trimmed_set.standard_deviation | String - Number | The standard deviation of the trimmed data. |
| time | Number | The most recent timestamp out of all LastUpdateTime values, represented in Unix time. |


`entire_set`

`entire_set.mean`

`entire_set.size`

`entire_set.standard_deviation`

`trimmed_set`

`trim`

`trimmed_set.mean`

`trimmed_set.size`

`trimmed_set.standard_deviation`

`time`

`LastUpdateTime`

- The most recent Oracle objects are obtained for the specified oracles.
- The most recent LastUpdateTime among all objects is chosen as the upper time threshold.
- An Oracle object is included in the aggregation dataset if it contains the specified base_asset/quote_asset pair, has an AssetPrice field, and its LastUpdateTime is within the time range specified.
- If an Oracle object doesn't contain an AssetPrice for the specified token pair, then up to three previous Oracle objects are examined and the most recent one that fulfills the requirements is included.

`Oracle`

`LastUpdateTime`

`Oracle`

`base_asset`

`quote_asset`

`AssetPrice`

`LastUpdateTime`

`Oracle`

`AssetPrice`

`Oracle`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- internal - The trim_threshold setting removed all prices.
- objectNotFound - There are no prices in the dataset.
- oracleMalformed - The oracles array is malformed. At least one object field is specified incorrectly or missing, or the number of objects is outside the bounds of 1 to 200.

`invalidParams`

`internal`

`trim_threshold`

`objectNotFound`

`oracleMalformed`

`oracles`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e8e5f5c8-56f7-448e-8202-030a486eccb2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e8e5f5c8-56f7-448e-8202-030a486eccb2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e333b256-1ef2-4ad6-8075-e96a2f9eac97&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e333b256-1ef2-4ad6-8075-e96a2f9eac97&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=edca0a27-12cd-4c18-bb72-7a8920598350&bo=1&sid=83259ea09da611f0aa68739f960e5e4b&vid=832633009da611f0a82fc166b4275cf3&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=get_aggregate_price&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&r=&lt=3439&evt=pageLoad&sv=2&cdb=AQAS&rn=386395)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8db20eda-1666-4cf2-bac5-88ea258e7008&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8db20eda-1666-4cf2-bac5-88ea258e7008&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4a363bb1-30d8-441f-9190-48c4f12c3541&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4a363bb1-30d8-441f-9190-48c4f12c3541&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=842a74da-6e2d-4fea-b5a4-dc1ce658a791&pt=get_aggregate_price&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fget_aggregate_price&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/get_aggregate_price#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/get_aggregate_price#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/get_aggregate_price#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/get_aggregate_price#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.55ce721553869511924d4649105e8ee0.1759199893807.1759199893807.1759199893807.1&__hssc=78174987.1.1759199893807&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/get_aggregate_price.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/GetAggregatePrice.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.55ce721553869511924d4649105e8ee0.1759199893807.1759199893807.1759199893807.1&__hssc=78174987.1.1759199893807&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:38:24.588Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
