# validator_list_sites
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/validator_list_sites
Section: AA7

## Overview


## Extracted Content
# validator_list_sites

[Source]

The validator_list_sites command returns status information of sites serving validator lists.

`validator_list_sites`

The validator_list_sites method is an admin method that cannot be run by unprivileged users!

`validator_list_sites`


### Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": 1,
    "command": "validator_list_sites"
}
```

The request includes no parameters.


### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id":5,
    "status":"success",
    "type":"response",
    "result": {
        "validator_sites": [
            {
                "last_refresh_status": "accepted",
                "last_refresh_time": "2017-Oct-13 21:26:37",
                "refresh_interval_min": 5,
                "uri": "http://127.0.0.1:51447/validators"
            }
        ]
    }
}
}
```

The response follows the standard format, with a successful result containing the following field:

| Field | Type | Description |
| --- | --- | --- |
| validator_sites | Array | Array of validator site objects. |


`Field`

`validator_sites`

Each member of the validator_sites field array is an object with the following fields:

`validator_sites`

| Field | Type | Description |
| --- | --- | --- |
| last_refresh_status | String | If present, shows the status of the most recent refresh of the site. If missing, the site has not yet been successfully queried. See Site Status Values below for possible states and their meanings. |
| last_refresh_time | String | Human readable time when the site was last queried. If missing, the site has not yet been successfully queried. |
| refresh_interval_min | Unsigned Integer | The number of minutes between refresh attempts. |
| uri | String | The URI of the site. |


`Field`

`last_refresh_status`

`last_refresh_time`

`refresh_interval_min`

`uri`


#### Site Status Values

The last_refresh_status field can have the following values:

`last_refresh_status`

| Value | Meaning |
| --- | --- |
| accepted | The site provided a valid list, which your server is now using. |
| same_sequence | The site provided a list with the same sequence number as your existing list, so your server continued using its existing list. |
| unsupported_version | The site provided a list, but your server does not support the list format version number in the list. You might need to update rippled to a newer software version. |
| untrusted | The site provided a list from the site that is signed by a cryptographic key pair your server is not configured to trust. You may want to check for typos in your validators.txt file and check to see if the list publisher changed their cryptographic keys. |
| stale | The site provided a list with a lower sequence number than the list your server is already using. |
| invalid | The site provided a list or signature that was not validly formed. |


`accepted`

`same_sequence`

`unsupported_version`

`rippled`

`untrusted`

`validators.txt`

`stale`

`invalid`


### Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b01d079e-5c1e-4d52-9def-113a2c57301d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b01d079e-5c1e-4d52-9def-113a2c57301d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d645a3e2-54d7-4d97-b5f8-3d86f871af72&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d645a3e2-54d7-4d97-b5f8-3d86f871af72&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=9bfde326-f6f2-43ee-a20c-1476403a28ca&bo=1&sid=4c05eb209da911f0bb6f19bd6f097923&vid=4c066dd09da911f0a486d3d4caaf11ed&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=validator_list_sites&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&r=&lt=3207&evt=pageLoad&sv=2&cdb=AQAS&rn=287036)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=23ccd22b-ef07-4235-8c1f-18f89bf756d5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=23ccd22b-ef07-4235-8c1f-18f89bf756d5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5efa0841-7fec-4e99-9a21-e32317e8d4e1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5efa0841-7fec-4e99-9a21-e32317e8d4e1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=39b48df7-65a7-4fea-ac96-fc5cd6b0ee4e&pt=validator_list_sites&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Fvalidator_list_sites&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/validator_list_sites#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/validator_list_sites#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/validator_list_sites#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/validator_list_sites#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1420c0fc8eefe68198b9165356ffb86a.1759201089727.1759201089727.1759201089727.1&__hssc=78174987.1.1759201089727&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/validator_list_sites.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/ValidatorListSites.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1420c0fc8eefe68198b9165356ffb86a.1759201089727.1759201089727.1759201089727.1&__hssc=78174987.1.1759201089727&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:58:18.953Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
