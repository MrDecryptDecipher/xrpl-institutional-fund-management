# nfts_by_issuer
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nfts_by_issuer
Section: V7

## Overview


## Extracted Content
# nfts_by_issuer

[Source]

nfts_by_issuer returns a list of NFTokens that are issued by the specified account. It can optionally filter by taxon.

`nfts_by_issuer`


## Request Format

An example of the request format:

```
{
  "method": "nfts_by_issuer",
  "issuer": "rLaBCoaMQqXzHDmiGs2Qv2JA2bg3Yvzxyt"
}
```

The request contains the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| issuer | String | A unique identifier for the account, most commonly the account's address. |
| marker | Marker | (Optional) Value from a previous paginated response. Resume retrieving data where that response left off. This value is NOT stable if there is a change in the server's range of available ledgers; meaning if you are querying the “validated” ledger it is possible that new NFTs are created during your paging. |
| nft_taxon | Integer | (Optional) Use to filter NFTs issued by this issuer that have this taxon. |
| ledger_hash | String | (Optional) Use to look for NFTs issued up to the provided ledger. If not provided, the server uses the current ledger. |
| ledger_index | String or Integer | (Optional) Use to look for NFTs issued up to the provided ledger. If not provided, the server uses the current ledger. |
| limit | Integer | (Optional) Limit the number of NFTs to retrieve. The server is not required to honor this value. |


`Field`

`issuer`

`marker`

`nft_taxon`

`ledger_hash`

`ledger_index`

`limit`

NoteIf you do not specify a ledger version, Clio uses the latest validated ledger.


## Response Format

An example of a successful response:

```
{
   "result": {
      "issuer": "rfXeQv31yWMrhhPxMHZRzQqhw5mQrcuici",
      "limit": 50,
      "ledger_index": 1534,
      "nfts": [
         {
            "nft_id": "00080000479C76BC5174816A938ABF667E67D851140BFE03F068FA97000005FB",
            "ledger_index": 1533,
            "owner": "rfXeQv31yWMrhhPxMHZRzQqhw5mQrcuici",
            "is_burned": false,
            "uri": "",
            "flags": 8,
            "transfer_fee": 0,
            "issuer": "rfXeQv31yWMrhhPxMHZRzQqhw5mQrcuici",
            "nft_taxon": 1,
            "nft_serial": 1531
         }
      ],
      "validated": true,
      "status": "success"
   },
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
| issuer | String | Issuer's account ID. |
| nfts | Array<Object> | A list of NFTs issued by the account. The order of the NFTs is not associated with the date the NFTs were minted. |
| marker | Marker | (Optional) Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. If this field is not returned, you know that you no longer need to make calls to this API. |
| limit | Integer | The limit, as specified in the request. |
| nft_taxon | Integer | (Optional) The nft_taxon as specified in the request. |


`Field`

`issuer`

`nfts`

`marker`

`limit`

`limit`

`nft_taxon`

`nft_taxon`

The format of each NFT in the nfts array is the same as the response to an nft_info request.

`nfts`

`nft_info`

For definitions of the fields returned in the tx object, see Transaction Metadata.

`tx`

Note:You might get back a response where the nfts field is empty but a marker is defined. You need to repeatedly request with the new markers until you receive a response that no longer has a marker. This can happen if you specify a specific ledger and there are tokens that were minted by the account after the specified ledger.

`nfts`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: Clio v2.1.0](https://img.shields.io/badge/New in-Clio v2.1.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb7132da-f2fc-4dbb-96ba-5867b6bd0043&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb7132da-f2fc-4dbb-96ba-5867b6bd0043&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1d6a99f6-77d5-4dca-94ac-30078de73714&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1d6a99f6-77d5-4dca-94ac-30078de73714&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=5e6c7918-b952-4793-85fd-f5ff2cb06f2b&bo=1&sid=e9da3dc09da711f0954715d158a18f69&vid=e9da8ee09da711f0b02765801ec31306&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=nfts_by_issuer&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&r=&lt=3153&evt=pageLoad&sv=2&cdb=AQAS&rn=810943)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7b224439-8ca9-4f44-a133-91a49c49a997&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7b224439-8ca9-4f44-a133-91a49c49a997&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=81ec963f-ddff-41b8-8a2e-f8acbaaf9d9c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=81ec963f-ddff-41b8-8a2e-f8acbaaf9d9c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b06cb4d5-105c-4b73-aad6-1b11c66e95d5&pt=nfts_by_issuer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnfts_by_issuer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nfts_by_issuer#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nfts_by_issuer#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nfts_by_issuer#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nfts_by_issuer#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/clio-methods/nfts_by_issuer.md)
- [[Source]](https://github.com/XRPLF/clio/blob/develop/src/rpc/handlers/NFTsByIssuer.cpp)
- [https://github.com/XRPLF/clio/releases/tag/2.1.0](https://github.com/XRPLF/clio/releases/tag/2.1.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:48:25.066Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
