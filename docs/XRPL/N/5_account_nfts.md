# account_nfts
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts
Section: N5

## Overview


## Extracted Content
# account_nfts

[Source]

The account_nfts method returns a list of NFToken objects for the specified account.

`account_nfts`

`NFToken`

(Added by the NonFungibleTokensV1_1 amendment.)


## Request Format

An example of the request format:

There is no commandline syntax for this method. You can use the json method to access this method from the commandline instead.

- WebSocket
- JSON-RPC

```
{
  "command": "account_nfts",
  "account": "rsuHaTvJh1bDmDoxX9QcKP7HEBSBt4XsHx",
  "ledger_index": "validated"
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| account | String | The unique identifier of an account, typically the account's Address. The request returns a list of NFTs owned by this account. |
| ledger_hash | String | (Optional) The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | String or Number | (Optional) The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| limit | Integer | (Optional) Limit the number of token pages to retrieve. Each page can contain up to 32 NFTs. The limit value cannot be lower than 20 or more than 400. Positive values outside this range are replaced with the closest valid option. The default is 100. |
| marker | Marker | (Optional) Value from a previous paginated response. Resume retrieving data where that response left off. |


`account`

`ledger_hash`

`ledger_index`

`limit`

`limit`

`marker`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC

```
{
  "result": {
    "account": "rsuHaTvJh1bDmDoxX9QcKP7HEBSBt4XsHx",
    "account_nfts": [
      {
        "Flags": 1,
        "Issuer": "rGJUF4PvVkMNxG6Bg6AKg3avhrtQyAffcm",
        "NFTokenID": "00010000A7CAD27B688D14BA1A9FA5366554D6ADCF9CE0875B974D9F00000004",
        "NFTokenTaxon": 0,
        "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469",
        "nft_serial": 4
      },
      {
        "Flags": 1,
        "Issuer": "rGJUF4PvVkMNxG6Bg6AKg3avhrtQyAffcm",
        "NFTokenID": "00010000A7CAD27B688D14BA1A9FA5366554D6ADCF9CE087727D1EA000000005",
        "NFTokenTaxon": 0,
        "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469",
        "nft_serial": 5
      }
    ],
    "ledger_hash": "7971093E67341E325251268A5B7CD665EF450B126F67DF8384D964DF834961E8",
    "ledger_index": 2380540,
    "validated": true
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| account | String | The account that owns the list of NFTs. |
| account_nfts | Array | A list of NFTs owned by the account, formatted as NFT Objects (see below). |
| ledger_hash | String | (May be omitted) The identifying hash of the ledger that was used to generate this response. |
| ledger_index | Number - Ledger Index | (May be omitted) The ledger index of the ledger that was used to generate this response. |
| ledger_current_index | Number - Ledger Index | (May be omitted) The ledger index of the current in-progress ledger version, which was used to generate this response. |
| validated | Boolean | If included and set to true, the information in this response comes from a validated ledger version. Otherwise, the information is subject to change. |
| marker | Marker | (May be omitted) Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. Omitted when there are no additional pages after this one. |


`Field`

`account`

`account_nfts`

`ledger_hash`

`ledger_index`

`ledger_current_index`

`validated`

`true`

`marker`


### NFT Objects

Each object in the account_nfts array represents one NFToken and has the following fields:

`account_nfts`

| Field | Type | Description |
| --- | --- | --- |
| Flags | Number | A bit-map of boolean flags enabled for this NFToken. See NFToken Flags for possible values. |
| Issuer | String - Address | The account that issued this NFToken. |
| NFTokenID | String | The unique identifier of this NFToken, in hexadecimal. |
| NFTokenTaxon | Number | The unscrambled version of this token's taxon. Several tokens with the same taxon might represent instances of a limited series. |
| URI | String | The URI data associated with this NFToken, in hexadecimal. |
| nft_serial | Number | The token sequence number of this NFToken, which is unique for its issuer. |


`Field`

`Flags`

`Issuer`

`NFTokenID`

`NFTokenTaxon`

`URI`

`nft_serial`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actNotFound - The Address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.

`invalidParams`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f19daad2-3526-4069-8121-317ffeacc198&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f19daad2-3526-4069-8121-317ffeacc198&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b8bb01d5-88e7-4cdc-b345-f167e6f42e27&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b8bb01d5-88e7-4cdc-b345-f167e6f42e27&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=51f8daee-8a93-4e80-9094-54368f0af83b&bo=1&sid=5db702709da511f0b0bff12aee550686&vid=5db7e7d09da511f0a70b1767013a8abf&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_nfts&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&r=&lt=1501&evt=pageLoad&sv=2&cdb=AQAS&rn=546547)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0114b90a-379f-4847-9d82-f15f177be480&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0114b90a-379f-4847-9d82-f15f177be480&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=66010cd7-872f-4c20-ace9-821ab06c82ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=66010cd7-872f-4c20-ace9-821ab06c82ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=446eae8b-91c8-4c13-aa22-fd3b4b9c09ca&pt=account_nfts&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_nfts&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.399513ce1e18e01964bcdb405108808a.1759199403296.1759199403296.1759199403296.1&__hssc=78174987.1.1759199403296&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts.md)
- [[Source]](https://github.com/xrplf/rippled/blob/master/src/ripple/rpc/handlers/AccountObjects.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.399513ce1e18e01964bcdb405108808a.1759199403296.1759199403296.1759199403296.1&__hssc=78174987.1.1759199403296&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:30:12.711Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
