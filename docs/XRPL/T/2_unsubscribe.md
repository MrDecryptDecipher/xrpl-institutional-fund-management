# unsubscribe
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/subscription-methods/unsubscribe
Section: T2

## Overview


## Extracted Content
# unsubscribe

[Source]

The unsubscribe command tells the server to stop sending messages for a particular subscription or set of subscriptions.

`unsubscribe`


## Request Format

An example of the request format:

- WebSocket

```
{
    "id": "Unsubscribe a lot of stuff",
    "command": "unsubscribe",
    "streams": ["ledger","server","transactions","transactions_proposed"],
    "accounts": ["rrpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1"],
    "accounts_proposed": ["rrpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1"],
    "books": [
        {
            "taker_pays": {
                "currency": "XRP"
            },
            "taker_gets": {
                "currency": "USD",
                "issuer": "rUQTpMqAF5jhykj4FExVeXakrZpiKF6cQV"
            },
            "both": true
        }
    ]
}
```

The parameters in the request are specified almost exactly like the parameters to the subscribe method, except that they are used to define which subscriptions to end instead. The parameters are:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| streams | Array | No | Array of string names of generic streams to unsubscribe from, including ledger, server, transactions, and transactions_proposed. |
| accounts | Array | No | Array of unique account addresses to stop receiving updates for, in the XRP Ledger's base58 format. (This only stops those messages if you previously subscribed to those accounts specifically. You cannot use this to filter accounts out of the general transactions stream.) |
| accounts_proposed | Array | No | Like accounts, but for accounts_proposed subscriptions that included not-yet-validated transactions. |
| books | Array | No | Array of objects defining order books to unsubscribe from, as explained below. |


`Field`

`streams`

`ledger`

`server`

`transactions`

`transactions_proposed`

`accounts`

`accounts_proposed`

`accounts`

`accounts_proposed`

`books`

The rt_accounts and url parameters, and the rt_transactions stream name, are deprecated and may be removed without further notice.

`rt_accounts`

`url`

`rt_transactions`

The objects in the books array are defined almost like the ones from subscribe, except that they don't have all the fields. The fields they have are as follows:

`books`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| taker_gets | Object | No | Specification of which currency the account taking the offer would receive, as an object with currency and issuer fields. Omit issuer for XRP. |
| taker_pays | Object | No | Specification of which currency the account taking the offer would receive, as an object with currency and issuer fields. Omit issuer for XRP. |
| both | Boolean | No | If true, remove a subscription for both sides of the order book. |


`Field`

`taker_gets`

`currency`

`issuer`

`issuer`

`taker_pays`

`currency`

`issuer`

`issuer`

`both`

`true`


## Response Format

An example of a successful response:

- WebSocket

```
{
    "id": "Unsubscribe a lot of stuff",
    "result": {},
    "status": "success",
    "type": "response"
}
```

The response follows the standard format, with a successful result containing no fields.


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- noPermission - The request included the url field, but you are not connected as an admin.
- malformedStream - The streams field of the request is not formatted properly.
- malformedAccount - One of the addresses in the accounts or accounts_proposed fields of the request is not a properly-formatted XRP Ledger address.Note: You can subscribe to the stream of an address that does not yet have an entry in the global ledger to get a message when that address becomes funded.
- Note: You can subscribe to the stream of an address that does not yet have an entry in the global ledger to get a message when that address becomes funded.
- srcCurMalformed - One or more taker_pays sub-fields of the books field in the request is not formatted properly.
- dstAmtMalformed - One or more taker_gets sub-fields of the books field in the request is not formatted properly.
- srcIsrMalformed - The issuer field of one or more taker_pays sub-fields of the books field in the request is not valid.
- dstIsrMalformed - The issuer field of one or more taker_gets sub-fields of the books field in the request is not valid.
- badMarket - One or more desired order books in the books field does not exist; for example, offers to exchange a currency for itself.

`invalidParams`

`noPermission`

`url`

`malformedStream`

`streams`

`malformedAccount`

`accounts`

`accounts_proposed`

- Note: You can subscribe to the stream of an address that does not yet have an entry in the global ledger to get a message when that address becomes funded.

`srcCurMalformed`

`taker_pays`

`books`

`dstAmtMalformed`

`taker_gets`

`books`

`srcIsrMalformed`

`issuer`

`taker_pays`

`books`

`dstIsrMalformed`

`issuer`

`taker_gets`

`books`

`badMarket`

`books`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=37fb7ae6-7e16-45b3-8859-cf2e4abef9cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=37fb7ae6-7e16-45b3-8859-cf2e4abef9cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=73fe8a17-7e6b-4b33-836c-2ef8140705c2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=73fe8a17-7e6b-4b33-836c-2ef8140705c2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6a7d4ce4-5582-4aac-9d05-8f37478ad908&bo=1&sid=070883909da711f0bddaf92c61955c98&vid=0708f3e09da711f0b2d1f9e5f481245d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=unsubscribe&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&r=&lt=3482&evt=pageLoad&sv=2&cdb=AQAS&rn=174779)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f54d4ba-ca74-4fa4-92ff-6051e312c872&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f54d4ba-ca74-4fa4-92ff-6051e312c872&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9d384a1f-5a92-46e0-8701-0755efcdcfc6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9d384a1f-5a92-46e0-8701-0755efcdcfc6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d392a22c-29b4-49ee-88da-12bcb528f37c&pt=unsubscribe&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fsubscription-methods%2Funsubscribe&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/subscription-methods/unsubscribe#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/subscription-methods/unsubscribe#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/subscription-methods/unsubscribe#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/subscription-methods/unsubscribe#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.68c7b7e0ca718ad433be2dc4c90e8eec.1759200114854.1759200114854.1759200114854.1&__hssc=78174987.1.1759200114854&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/subscription-methods/unsubscribe.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/Unsubscribe.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.68c7b7e0ca718ad433be2dc4c90e8eec.1759200114854.1759200114854.1759200114854.1&__hssc=78174987.1.1759200114854&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:42:04.868Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
