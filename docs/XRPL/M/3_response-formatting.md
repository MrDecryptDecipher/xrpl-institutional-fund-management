# Response Formatting
URL: https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting
Section: M3

## Overview


## Extracted Content
# Response Formatting

Responses are formatted slightly differently based on whether the method is called with the WebSocket, JSON-RPC, or Commandline interfaces. The Commandline and JSON-RPC interfaces use the same format because the Commandline interface calls JSON-RPC.

The fields of a successful response include:

- WebSocket
- JSON-RPC

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| status | String | Yes | The value success indicates the request was successfully received and understood by the server. Some client libraries omit this field on success. |
| type | String | Yes | The value response indicates a direct response to an API request. Asynchronous notifications use a different value such as ledgerClosed or transaction. |
| result | Object | Yes | The result of the query; contents vary depending on the API method. |
| id | (Varies) | No | Arbitrary ID provided by the request that prompted this response. Omitted if the request didn't specify an ID. |
| warning | String | No | If this field is provided, the value is the string load. This means the client is approaching the rate limiting threshold where the server will disconnect this client. |
| warnings | Array | No | If this field is provided, it contains one or more Warnings Objects with important warnings. For details, see API Warnings. |
| forwarded | Boolean | No | If true, this request and response have been forwarded from a Clio server to a P2P Mode server (and back) because the request requires data that is not available from Clio. The default is false. |


`status`

`success`

`type`

`response`

`ledgerClosed`

`transaction`

`result`

`id`

`warning`

`load`

`warnings`

`forwarded`

`true`

`false`


## Example Successful Response

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "account_data": {
      "Account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
      "Balance": "27389517749",
      "Flags": 0,
      "LedgerEntryType": "AccountRoot",
      "OwnerCount": 18,
      "PreviousTxnID": "B6B410172C0B65575D89E464AF5B99937CC568822929ABF87DA75CBD11911932",
      "PreviousTxnLgrSeq": 6592159,
      "Sequence": 1400,
      "index": "4F83A2CF7E70F77F79A307E6A472BFC2585B806A70833CCD1C26105BAE0D6E05"
    },
    "ledger_index": 6760970
  }
}
```


## API Warnings

When the response contains a warnings array, each member of the array represents a separate warning from the server. Each such Warning Object contains the following fields:

`warnings`

| Field | Type | Description |
| --- | --- | --- |
| id | Number | A unique numeric code for this warning message. |
| message | String | A human-readable string describing the cause of this message. Do not write software that relies the contents of this message; use the id (and details, if applicable) to identify the warning instead. |
| details | Object | (May be omitted) Additional information about this warning. The contents vary depending on the type of warning. |


`id`

`message`

`id`

`details`

`details`

The following reference describes all possible warnings.


### 1001. Unsupported amendments have reached majority

Example warning:

```
"warnings" : [
  {
    "details" : {
      "expected_date" : 864030,
      "expected_date_UTC" : "2000-Jan-11 00:00:30.0000000 UTC"
    },
    "id" : 1001,
    "message" : "One or more unsupported amendments have reached majority. Upgrade to the latest version before they are activated to avoid being amendment blocked."
  }
]
```

This warning indicates that the one or more amendments to the XRP Ledger protocol are scheduled to become enabled, but the current server does not have an implementation for those amendments. If those amendments become enabled, the current server will become amendment blocked, so you should upgrade to the latest rippled version as soon as possible.

`rippled`

The server only sends this warning if the client is connected as an admin.

This warning includes a details field with the following fields:

`details`

| Field | Type | Description |
| --- | --- | --- |
| expected_date | Number | The time that the first unsupported amendment is expected to become enabled, in seconds since the Ripple Epoch. |
| expected_date_UTC | String | The timestamp, in UTC, when the first unsupported amendment is expected to become enabled. |


`expected_date`

`expected_date_UTC`

Due to the variation in ledger close times, these times are approximate. It is also possible that the amendment fails to maintain support from >80% of validators until the specified time, and does not become enabled at the expected time. The server will not become amendment blocked so long as the unsupported amendments do not become enabled.


### 1002. This server is amendment blocked

Example warning:

```
"warnings" : [
  {
    "id" : 1002,
    "message" : "This server is amendment blocked, and must be updated to be able to stay in sync with the network."
  }
]
```

This warning indicates that the server is amendment blocked and can no longer remain synced with the XRP Ledger.

The server administrator must upgrade rippled to a version that supports the activated amendments.

`rippled`


### 2001. This is a clio server

Example warning:

```
"warnings": [
  {
    "id": 2001,
    "message": "This is a clio server. clio only serves validated data. If you want to talk to rippled, include 'ledger_index':'current' in your request"
  }
]
```

This warning indicates that the server answering the request a Clio server, which does not have direct access to the peer-to-peer network. Certain API methods behave differently or may have additional information, and requests that require non-validated data are forwarded to a peer-to-peer server.

It is generally safe to ignore this warning.

CautionIf you request ledger data without explicitly specifying a ledger version, Clio uses the latest validated ledger by default instead of the current in-progress ledger.


## See Also

- Request Formatting
- Error Formatting for unsuccessful API responses.
- Concepts:The rippled ServerConsensusAmendmentsKnown Amendments
- The rippled Server
- Consensus
- AmendmentsKnown Amendments
- Known Amendments
- Tutorials:Get Started with XRP Ledger APIsInstall and Update rippled
- Get Started with XRP Ledger APIs
- Install and Update rippled
- References:feature methodserver_info method
- feature method
- server_info method

- The rippled Server
- Consensus
- AmendmentsKnown Amendments
- Known Amendments

`rippled`

- Known Amendments

- Get Started with XRP Ledger APIs
- Install and Update rippled

`rippled`

- feature method
- server_info method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bb97f529-5292-4ae1-8060-d542d06e4ed4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bb97f529-5292-4ae1-8060-d542d06e4ed4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5528d441-0f70-4418-aa9d-494d236c31ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5528d441-0f70-4418-aa9d-494d236c31ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=e7d0f347-8939-4a07-abdd-92113c81940e&bo=1&sid=d60f17409da411f0864bc1802f2cce1c&vid=d60f87f09da411f0beff6da7635c0732&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Response%20Formatting&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&r=&lt=3210&evt=pageLoad&sv=2&cdb=AQAS&rn=441028)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1c906b92-e582-4bea-a0f9-35595ad5c704&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1c906b92-e582-4bea-a0f9-35595ad5c704&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=85d4770a-f440-448e-b712-030103e525ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=85d4770a-f440-448e-b712-030103e525ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aeca44e1-b4ef-4312-836a-332c449f6586&pt=Response%20Formatting&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fresponse-formatting&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/api-conventions/response-formatting.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:26:25.766Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
