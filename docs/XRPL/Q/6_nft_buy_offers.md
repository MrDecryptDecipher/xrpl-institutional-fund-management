# nft_buy_offers
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/nft_buy_offers
Section: Q6

## Overview


## Extracted Content
# nft_buy_offers

[Source]

The nft_buy_offers method returns a list of buy offers for a given NFToken object.

`nft_buy_offers`

(Added by the NonFungibleTokensV1_1 amendment.)


## Request Format

An example of the request format:

There is no commandline syntax for this method. You can use the json method to access this method from the commandline instead.

- WebSocket
- JSON-RPC

```
{
  "command": "nft_buy_offers",
  "nft_id": "00090000D0B007439B080E9B05BF62403911301A7B1F0CFAA048C0A200000007",
  "ledger_index": "validated"
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| nft_id | String | The unique identifier of a NFToken object. |
| ledger_hash | String | (Optional) The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | String or Number | (Optional) The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| limit | Integer | (Optional) Limit the number of NFT buy offers to retrieve. This value cannot be lower than 50 or more than 500. Positive values outside this range are replaced with the closest valid option. The default is 250. |
| marker | Marker | (Optional) Value from a previous paginated response. Resume retrieving data where that response left off. |


`nft_id`

`ledger_hash`

`ledger_index`

`limit`

`marker`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC

```
{
  "result": {
    "nft_id": "00090000D0B007439B080E9B05BF62403911301A7B1F0CFAA048C0A200000007",
    "offers": [
      {
        "amount": "1500",
        "flags": 0,
        "nft_offer_index": "3212D26DB00031889D4EF7D9129BB0FA673B5B40B1759564486C0F0946BA203F",
        "owner": "rsuHaTvJh1bDmDoxX9QcKP7HEBSBt4XsHx"
      }
    ]
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| nft_id | String | The NFToken these offers are for, as specified in the request. |
| offers | Array | A list of buy offers for the token. Each of these is formatted as a Buy Offer (see below). |
| limit | Number | (May be omitted) The limit, as specified in the request. |
| marker | Marker | (May be omitted) Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. Omitted when there are no pages of information after this one. |


`Field`

`nft_id`

`offers`

`limit`

`limit`

`marker`


### Buy Offers

Each member of the offers array represents one NFTokenOffer object to buy the NFT in question and has the following fields:

`offers`

| Field | Type | Description |
| --- | --- | --- |
| amount | String or Object | The amount offered to buy the NFT for, as a String representing an amount in drops of XRP, or an object representing an amount of a fungible token. (See Specifying Currency Amounts) |
| flags | Number | A set of bit-flags for this offer. See NFTokenOffer flags for possible values. |
| nft_offer_index | String | The ledger object ID of this offer. |
| owner | String | The account that placed this offer. |


`Field`

`amount`

`flags`

`nft_offer_index`

`owner`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actNotFound - The Address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.
- objectNotFound - The NFT does not have any buy offers (note that object refers to the buy offer rather than the NFT itself).

`invalidParams`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

`objectNotFound`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=927f72b6-2526-4447-95ea-e67b0e79a205&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=927f72b6-2526-4447-95ea-e67b0e79a205&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d92d021a-7161-4668-b051-be1254e53a1d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d92d021a-7161-4668-b051-be1254e53a1d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=374a2075-7b16-4b68-8f17-daad52b16b4d&bo=1&sid=9144e8209da611f09436b91a275eb507&vid=914542009da611f097c1433bf618846d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=nft_buy_offers&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&r=&lt=4453&evt=pageLoad&sv=2&cdb=AQAS&rn=744879)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=16373eff-4753-437a-a085-f4c798c62b42&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=16373eff-4753-437a-a085-f4c798c62b42&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=83505442-1da8-4c4e-aa5c-41d40f9634ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=83505442-1da8-4c4e-aa5c-41d40f9634ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39d8b7e0-9209-4c00-8294-23c9994cd1a0&pt=nft_buy_offers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpath-and-order-book-methods%2Fnft_buy_offers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/nft_buy_offers#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/nft_buy_offers#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/nft_buy_offers#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/nft_buy_offers#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.302eea953d73daefc54a420ef7ec131b.1759199917356.1759199917356.1759199917356.1&__hssc=78174987.1.1759199917356&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/nft_buy_offers.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/NFTOffers.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.302eea953d73daefc54a420ef7ec131b.1759199917356.1759199917356.1759199917356.1&__hssc=78174987.1.1759199917356&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:38:47.602Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
