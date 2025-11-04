# peers
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/peer-management-methods/peers
Section: Z5

## Overview


## Extracted Content
# peers

[Source]

The peers command returns a list of all other rippled servers currently connected to this one over the Peer Protocol, including information on their connection and sync status.

`peers`

`rippled`

The peers method is an admin method that cannot be run by unprivileged users!

`peers`


### Request Format

An example of the request format:

- WebSocket
- Commandline

```
{
    "id": 2,
    "command": "peers"
}
```

The request includes no additional parameters.


### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "peers_example",
  "result": {
    "cluster": {},
    "peers": [
      {
        "address": "5.189.239.203:51235",
        "complete_ledgers": "51813132 - 51815132",
        "ledger": "99A1E29C9F235DCCBB087F85F11756BECA606A756C22AB826AB1F319C470C3E3",
        "load": 157,
        "metrics": {
          "avg_bps_recv": "10255",
          "avg_bps_sent": "2015",
          "total_bytes_recv": "356809",
          "total_bytes_sent": "74208"
        },
        "public_key": "n94ht2A9aBoARRhk1rwypZNVXJDiMN4qzs1Bd5KsQaSnN3WVy8Tw",
        "uptime": 2,
        "version": "rippled-1.4.0"
      },
      {
        "address": "[::ffff:50.22.123.222]:51235",
        "complete_ledgers": "32570 - 51815131",
        "ledger": "99A1E29C9F235DCCBB087F85F11756BECA606A756C22AB826AB1F319C470C3E3",
        "load": 219,
        "metrics": {
          "avg_bps_recv": "7223",
          "avg_bps_sent": "6742",
          "total_bytes_recv": "593148",
          "total_bytes_sent": "204540"
        },
        "public_key": "n9LbkoB9ReSbaA9SGL317fm6CvjLcFG8hGoierLYfwiCDsEXHcP3",
        "uptime": 3,
        "version": "rippled-1.3.1"
      },
      {
        "address": "51.89.153.154:51235",
        "complete_ledgers": "51814130 - 51815130",
        "ledger": "808800914218F5622ED5F639BC0EEDF9530E47C6F81CD1EB3866FA1496F62B9C",
        "load": 27,
        "metrics": {
          "avg_bps_recv": "172748",
          "avg_bps_sent": "7355",
          "total_bytes_recv": "5455031",
          "total_bytes_sent": "234276"
        },
        "public_key": "n944vHEtDhPm4Bd9rPowZMJduR9XrpxKS9AKHFfcJtKRVAdhfFfD",
        "uptime": 8,
        "version": "rippled-1.4.0"
      },
      {
        "address": "192.151.157.20:51235",
        "complete_ledgers": "51813128 - 51815128",
        "latency": 8000,
        "load": 70,
        "metrics": {
          "avg_bps_recv": "463258",
          "avg_bps_sent": "21954",
          "total_bytes_recv": "13910029",
          "total_bytes_sent": "678908"
        },
        "public_key": "n9JbUWaFZDi1UxFexJXf1D9dRpn8UK6pTNwRxBCjEvLEwQa384uP",
        "uptime": 19,
        "version": "rippled-1.3.1"
      },
      {
        "address": "[::ffff:94.237.45.66]:51235",
        "complete_ledgers": "51815004 - 51815131",
        "ledger": "99A1E29C9F235DCCBB087F85F11756BECA606A756C22AB826AB1F319C470C3E3",
        "load": 202,
        "metrics": {
          "avg_bps_recv": "18258",
          "avg_bps_sent": "1903",
          "total_bytes_recv": "1184272",
          "total_bytes_sent": "65101"
        },
        "public_key": "n9Lg83FYh8YDivG9TcgXhq5Y3PwunmRqVfvibd19Ko9uu3DtqLBM",
        "uptime": 2,
        "version": "rippled-1.3.1"
      },
      {
        "address": "[::ffff:149.56.21.37]:51235",
        "complete_ledgers": "51478129 - 51815129",
        "ledger": "462FA0B34723C12EBE4DC9974B397D6A21D4F1770DE3CD584D4E33DBC83FC247",
        "load": 182,
        "metrics": {
          "avg_bps_recv": "132648",
          "avg_bps_sent": "13935",
          "total_bytes_recv": "3983628",
          "total_bytes_sent": "433757"
        },
        "public_key": "n94Dutms7xoSgWjbjYftDJGXvc5jaeYZq3J7o1Jwo35dZAyuzNWT",
        "uptime": 14,
        "version": "rippled-1.3.1"
      },
      {
        "address": "77.117.40.191:51235",
        "complete_ledgers": "51812267 - 51815071",
        "latency": 30555,
        "ledger": "0562C7A1898196FDC60B8DB1838961BFBA6B9304B1510E6030B32A4FB38400FB",
        "load": 3783,
        "metrics": {
          "avg_bps_recv": "495673",
          "avg_bps_sent": "57527",
          "total_bytes_recv": "17137378",
          "total_bytes_sent": "4140188"
        },
        "public_key": "n9LELaTdzKwfzhvHZKKrD3ZEJtWABSg4ocAT4dz5Vg5JgAVGwVdd",
        "uptime": 73,
        "version": "rippled-1.4.0"
      },
      {
        "address": "[::ffff:94.237.49.50]:51235",
        "complete_ledgers": "51815002 - 51815130",
        "latency": 8000,
        "ledger": "C6030B52471F8076F88A90C6FC2B2998794B32023FAC69FF573437D6D1470961",
        "load": 1563,
        "metrics": {
          "avg_bps_recv": "215539",
          "avg_bps_sent": "25705",
          "total_bytes_recv": "23134383",
          "total_bytes_sent": "2738880"
        },
        "public_key": "n9MLzBWq7WNM2sdpRKY2Tr3EJfxwSwsnDEpxU3auGJHgvq3Bit6S",
        "uptime": 112,
        "version": "rippled-1.3.1"
      }
    ]
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing a JSON object with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| cluster | Object | Summary of other rippled servers in the same cluster, if configured as a cluster. |
| peers | Array | Array of peer objects. |


`Field`

`cluster`

`rippled`

`peers`

Each field of the cluster object is the public key of that rippled server's identifying key pair. (This is the same value that that server returns as pubkey_node in the server_info method.) The contents of that field are an object with the following fields:

`cluster`

`rippled`

`pubkey_node`

| Field | Type | Description |
| --- | --- | --- |
| tag | String | The display name for this cluster member as defined in the config file. |
| fee | Number | (May be omitted) The load multiplier this cluster member is applying to the transaction cost |
| age | Number | The number of seconds since the last cluster report from this cluster member. |


`Field`

`tag`

`fee`

`age`

Each member of the peers array is a peer object with the following fields:

`peers`

| Field | Type | Description |
| --- | --- | --- |
| address | String | The IP address and port where this peer is connected |
| cluster | Boolean | (May be omitted) If true, the current server and the peer server are part of the same rippled cluster. |
| name | String | (May be omitted) If the peer is part of the same cluster, this is the display name for that server as defined in the config file. |
| complete_ledgers | String | Range expression indicating the ledger indexes of the ledger versions the peer rippled server has available |
| inbound | Boolean | (May be omitted) If true, the peer is connecting to the local server. |
| latency | Number | The network latency to the peer (in milliseconds) |
| ledger | String | The identifying hash of the peer's most recently closed ledger |
| load | Number | A measure of the amount of load the peer server is putting on the local server. Larger numbers indicate more load. (The units by which load is measured are not formally defined.) |
| protocol | String | (May be omitted) The protocol version that the peer is using, if not the same as the local server. |
| metrics | Object | Details on the amount of data sent to and received from this peer. See the description of the metrics object below for details. |
| public_key | String | (May be omitted) A public key that can be used to verify the integrity of the peer's messages. This is not the same key that is used for validations, but it follows the same format. |
| sanity | String | (May be omitted) Whether this peer is following the same rules and ledger history as the current server. A value of insane probably indicates that the peer is part of a parallel network. The value unknown indicates that the current server is unsure whether the peer is compatible. |
| status | String | (May be omitted) The most recent status message from the peer. Could be connecting, connected, monitoring, validating, or shutting. |
| uptime | Number | The number of seconds that your rippled server has been continuously connected to this peer. |
| version | string | (May be omitted) The rippled version number of the peer server |


`Field`

`address`

`cluster`

`true`

`rippled`

`name`

`complete_ledgers`

`rippled`

`inbound`

`true`

`latency`

`ledger`

`load`

`protocol`

`metrics`

`metrics`

`public_key`

`sanity`

`insane`

`unknown`

`status`

`connecting`

`connected`

`monitoring`

`validating`

`shutting`

`uptime`

`rippled`

`version`

`rippled`

The metrics object contains the following fields:

`metrics`

| Field | Type | Description |
| --- | --- | --- |
| avg_bps_recv | String | The average bytes per second of data received from this peer. |
| avg_bps_sent | String | The average bytes per second of data sent to this peer. |
| total_bytes_recv | String | The total number of bytes of data received from this peer. |
| total_bytes_sent | String | The total number of bytes of data sent to this peer. |


`Field`

`avg_bps_recv`

`avg_bps_sent`

`total_bytes_recv`

`total_bytes_sent`

NoteAll of the fields in the metrics object are 64-bit unsigned integers serialized to string format so that they do not lose precision in JSON encoding/decoding.

`metrics`


### Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=579ad4d3-0a54-4475-a03c-08486cc8fba6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=579ad4d3-0a54-4475-a03c-08486cc8fba6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3d013b8-863e-4b61-8851-5b1d971a45d2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3d013b8-863e-4b61-8851-5b1d971a45d2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=17453873-8e90-4106-a38c-7617baf740e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=17453873-8e90-4106-a38c-7617baf740e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=47f34f10-31fb-4e90-a084-724ea9c8718f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=47f34f10-31fb-4e90-a084-724ea9c8718f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a6aeadcc-9739-4847-ade5-9db01dd23727&pt=peers&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=054ffbc7-5269-4513-8d9f-eb78d9409d2f&bo=1&sid=fb0f08309da811f0a7947176ffe02f31&vid=fb0f61709da811f0b2148bab95a135c4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=peers&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fpeer-management-methods%2Fpeers&r=&lt=3072&evt=pageLoad&sv=2&cdb=AQAS&rn=295154)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/peer-management-methods/peers#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/peer-management-methods/peers#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/peer-management-methods/peers#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/peer-management-methods/peers#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.9e5de0252e517c0f7e2b72c10da30aaf.1759200953689.1759200953689.1759200953689.1&__hssc=78174987.1.1759200953690&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/peer-management-methods/peers.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/52f298f150fc1530d201d3140c80d3eaf781cb5f/src/ripple/rpc/handlers/Peers.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.9e5de0252e517c0f7e2b72c10da30aaf.1759200953689.1759200953689.1759200953689.1&__hssc=78174987.1.1759200953690&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:56:04.092Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
