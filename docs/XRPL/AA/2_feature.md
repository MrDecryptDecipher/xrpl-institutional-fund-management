# feature
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/feature
Section: AA2

## Overview


## Extracted Content
# feature

[Source]

The feature command returns information about amendments this server knows about, including whether they are enabled and whether the server is voting in favor of those amendments in the amendment process.

`feature`

You can use the feature command to configure the server to vote against or in favor of an amendment. This change persists even if you restart the server.

`feature`

The feature method documented on this page is an admin method. For the non-admin version, see the feature public API method.

`feature`

`feature`


### Request Format

An example of the request format:

- WebSocket - list all
- WebSocket - reject
- JSON-RPC
- MoreCommandline
- Commandline

- Commandline

```
{
  "id": "list_all_features",
  "command": "feature"
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| feature | String | (Optional) The unique ID of an amendment, as hexadecimal; or the short name of the amendment. If provided, limits the response to one amendment. Otherwise, the response lists all amendments. |
| vetoed | Boolean | (Optional; ignored unless feature also specified) If true, instructs the server to vote against the amendment specified by feature. If false, instructs the server to vote in favor of the amendment. On the commandline, use 'accept' or 'reject rather than 'true' or 'false'. You cannot vote in favor of an amendment that is marked as obsolete in the server's source code. |


`Field`

`feature`

`vetoed`

`feature`

`true`

`feature`

NoteYou can configure your server to vote in favor of a new amendment, even if the server does not currently know how to apply that amendment, by specifying the amendment ID in the feature field. For example, you might want to do this if you plan to upgrade soon to a new rippled version that does support the amendment.

`feature`

`rippled`


### Response Format

An example of a successful response:

- WebSocket - list all
- WebSocket - reject
- JSON-RPC
- MoreCommandline
- Commandline

- Commandline

```
{
  "id": "list_all_features",
  "status": "success",
  "type": "response",
  "result": {
    "features": {
      "42426C4D4F1009EE67080A9B7965B44656D7714D104A72F9B4369F97ABF044EE": {
        "enabled": false,
        "name": "FeeEscalation",
        "supported": true,
        "vetoed": false
      },
      "4C97EBA926031A7CF7D7B36FDE3ED66DDA5421192D63DE53FFB46E43B9DC8373": {
        "enabled": false,
        "name": "MultiSign",
        "supported": true,
        "vetoed": false
      },
      "6781F8368C4771B83E8B821D88F580202BCB4228075297B19E4FDC5233F1EFDC": {
        "enabled": false,
        "name": "TrustSetAuth",
        "supported": true,
        "vetoed": false
      },
      "C1B8D934087225F509BEB5A8EC24447854713EE447D277F69545ABFA0E0FD490": {
        "enabled": false,
        "name": "Tickets",
        "supported": true,
        "vetoed": false
      },
      "DA1BD556B42D85EA9C84066D028D355B52416734D3283F85E216EA5DA6DB7E13": {
        "enabled": false,
        "name": "SusPay",
        "supported": true,
        "vetoed": false
      }
    }
  }
}
```

The response follows the standard format, with a successful result containing a map of amendments as a JSON object. The keys of the object are amendment IDs. The values for each key are amendment objects that describe the status of the amendment with that ID. If the request specified a feature, the map contains only the requested amendment object, after applying any changes from the request. Each amendment object has the following fields:

`feature`

| Field | Type | Description |
| --- | --- | --- |
| enabled | Boolean | Whether this amendment is currently enabled in the latest ledger. |
| name | String | (May be omitted) The human-readable name for this amendment, if known. |
| supported | Boolean | Whether the server knows how to apply this amendment. If this field is set to false (the server does not know how to apply this amendment) and enabled is set to true (this amendment is enabled in the latest ledger), this amendment may cause your server to be amendment blocked. |
| vetoed | Boolean or String | For most amendments, this is a boolean value indicating whether the server has been instructed to vote against this amendment. For amendments that are marked as obsolete in the code, this is the string Obsolete instead. |


`Field`

`enabled`

`name`

`supported`

`false`

`enabled`

`true`

`vetoed`

`Obsolete`

CautionThe name for an amendment does not strictly indicate what that amendment does. The name is not guaranteed to be unique or consistent across servers.

`name`


### Possible Errors

- Any of the universal error types.
- badFeature - The feature specified was invalidly formatted, or the server does not know an amendment with that name.

`badFeature`

`feature`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.7.0](https://img.shields.io/badge/Updated in-rippled 1.7.0-blue.svg)

![Updated in: rippled 1.11.0](https://img.shields.io/badge/Updated in-rippled 1.11.0-blue.svg)

![Updated in: rippled 1.11.0](https://img.shields.io/badge/Updated in-rippled 1.11.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8d9e7e58-479a-43b3-8e50-5cf164dcf651&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8d9e7e58-479a-43b3-8e50-5cf164dcf651&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2cbd4a39-1988-427d-9cd3-7a227c9ccd75&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2cbd4a39-1988-427d-9cd3-7a227c9ccd75&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6560f797-c073-4f9b-91ef-d4168d055949&bo=1&sid=15c085e09da911f0bb71d7a864c04275&vid=15c162809da911f0ad480dbc2943fa18&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=feature&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&r=&lt=2456&evt=pageLoad&sv=2&cdb=AQAS&rn=605429)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=714678b8-b7b8-46c9-812d-adc441dddd35&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=714678b8-b7b8-46c9-812d-adc441dddd35&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e6c94992-3ecf-4040-ad39-87e7c50c8ede&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e6c94992-3ecf-4040-ad39-87e7c50c8ede&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=266c6f5e-7ada-4a8f-ad43-9c93145aed11&pt=feature&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fstatus-and-debugging-methods%2Ffeature&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/feature#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/feature#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/feature#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/feature#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c406beb24a86eb14b7a95ce531e73c92.1759201000536.1759201000536.1759201000536.1&__hssc=78174987.1.1759201000536&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/feature.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/Feature1.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.7.0](https://github.com/XRPLF/rippled/releases/tag/1.7.0)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c406beb24a86eb14b7a95ce531e73c92.1759201000536.1759201000536.1759201000536.1&__hssc=78174987.1.1759201000536&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:56:48.982Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
