# server_state
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_state
Section: U6

## Overview


## Extracted Content
# server_state

[Source]

The server_state command asks the server for various machine-readable information about the rippled server's current state. The response is almost the same as the server_info method, but uses units that are easier to process instead of easier to read. (For example, XRP values are given in integer drops instead of scientific notation or decimal values, and time is given in milliseconds instead of seconds.)

`server_state`

`rippled`

The Clio server does not support server_state directly, but you can ask for the server_state of the rippled server that Clio is connected to. Specify "ledger_index": "current" (WebSocket) or "params": [{"ledger_index": "current"}] (JSON-RPC).

`server_state`

`server_state`

`rippled`

`"ledger_index": "current"`

`"params": [{"ledger_index": "current"}]`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "command": "server_state",
  "ledger_index": "current"
}
```

The request does not takes any parameters.


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 1,
  "result": {
    "state": {
      "build_version": "1.7.2",
      "complete_ledgers": "64572720-65887201",
      "io_latency_ms": 1,
      "jq_trans_overflow": "0",
      "last_close": {
        "converge_time": 3005,
        "proposers": 41
      },
      "load_base": 256,
      "load_factor": 256,
      "load_factor_fee_escalation": 256,
      "load_factor_fee_queue": 256,
      "load_factor_fee_reference": 256,
      "load_factor_server": 256,
      "peer_disconnects": "365006",
      "peer_disconnects_resources": "336",
      "peers": 216,
      "pubkey_node": "n9MozjnGB3tpULewtTsVtuudg5JqYFyV3QFdAtVLzJaxHcBaxuXD",
      "server_state": "full",
      "server_state_duration_us": "3588969453592",
      "state_accounting": {
        "connected": {
          "duration_us": "301410595",
          "transitions": "2"
        },
        "disconnected": {
          "duration_us": "1207534",
          "transitions": "2"
        },
        "full": {
          "duration_us": "3589171798767",
          "transitions": "2"
        },
        "syncing": {
          "duration_us": "6182323",
          "transitions": "2"
        },
        "tracking": {
          "duration_us": "43",
          "transitions": "2"
        }
      },
      "time": "2021-Aug-24 20:44:43.466048 UTC",
      "uptime": 3589480,
      "validated_ledger": {
        "base_fee": 10,
        "close_time": 683153081,
        "hash": "B52AC3876412A152FE9C0442801E685D148D05448D0238587DBA256330A98FD3",
        "reserve_base": 20000000,
        "reserve_inc": 5000000,
        "seq": 65887201
      },
      "validation_quorum": 33
    }
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing a state object as its only field.

`state`

The state object may have some arrangement of the following fields:

`state`

| Field | Type | Description |
| --- | --- | --- |
| amendment_blocked | Boolean | (May be omitted) If true, this server is amendment blocked. If the server is not amendment blocked, the response omits this field. |
| build_version | String | The version number of the running rippled version. |
| complete_ledgers | String | Range expression indicating the sequence numbers of the ledger versions the local rippled has in its database. It is possible to be a disjoint sequence, e.g. "2500-5000,32570-7695432". If the server does not have any complete ledgers (for example, it recently started syncing with the network), this is the string empty. |
| closed_ledger | Object | (May be omitted) Information on the most recently closed ledger that has not been validated by consensus, as a Server Ledger Object. If the most recently validated ledger is available, the response omits this field and includes validated_ledger instead. |
| io_latency_ms | Number | Amount of time spent waiting for I/O operations, in milliseconds. If this number is not very, very low, then the rippled server is probably having serious load issues. |
| jq_trans_overflow | String - Number | The number of times this server has had over 250 transactions waiting to be processed at once. A large number here may mean that your server is unable to handle the transaction load of the XRP Ledger network. For detailed recommendations of future-proof server specifications, see Capacity Planning. |
| last_close | Object | Information about the last time the server closed a ledger, including the amount of time it took to reach a consensus and the number of trusted validators participating. |
| last_close.converge_time | Number | The amount of time it took to reach a consensus on the most recently validated ledger version, in milliseconds. |
| last_close.proposers | Number | How many trusted validators the server considered (including itself, if configured as a validator) in the consensus process for the most recently validated ledger version. |
| load | Object | (Admin only) Detailed information about the current load state of the server. |
| load.job_types | Array | (Admin only) Information about the rate of different types of jobs the server is doing and how much time it spends on each. |
| load.threads | Number | (Admin only) The number of threads in the server's main job pool. |
| load_base | Number | The baseline amount of server load used in transaction cost calculations. If the load_factor is equal to the load_base, then only the base transaction cost is enforced. If the load_factor is higher than the load_base, then transaction costs are multiplied by the ratio between them. For example, if the load_factor is double the load_base, then transaction costs are doubled. |
| load_factor | Number | The load factor the server is currently enforcing. The ratio between this value and the load_base determines the multiplier for transaction costs. The load factor is determined by the highest of the individual server's load factor, the cluster's load factor, the open ledger cost, and the overall network's load factor. |
| load_factor_fee_escalation | Number | (May be omitted) The current multiplier to the transaction cost to get into the open ledger, in fee levels. |
| load_factor_fee_queue | Number | (May be omitted) The current multiplier to the transaction cost to get into the queue, if the queue is full, in fee levels. |
| load_factor_fee_reference | Number | (May be omitted) The transaction cost with no load scaling, in fee levels. |
| load_factor_server | Number | (May be omitted) The load factor the server is enforcing, based on load to the server, cluster, and network, but not factoring in the open ledger cost. |
| network_ledger | String | (May be omitted) When starting the server with the --net parameter, this field contains the string waiting while the server is syncing to the network. The field is omitted otherwise. |
| peers | Number | How many other rippled servers this one is currently connected to. |
| ports | Array | A list of ports where the server is listening for API commands. Each entry in the array is a Port Descriptor object. |
| pubkey_node | String | Public key used to verify this server for peer-to-peer communications. This node key pair is automatically generated by the server the first time it starts up. (If deleted, the server can create a new pair of keys.) You can set a persistent value in the config file using the [node_seed] config option, which is useful for clustering. |
| pubkey_validator | String | (Admin only) Public key used by this node to sign ledger validations. This validation key pair is derived from the [validator_token] or [validation_seed] config field. |
| server_state | String | A string indicating to what extent the server is participating in the network. See Possible Server States for more details. |
| server_state_duration_us | Number | The number of consecutive microseconds the server has been in the current state. |
| state_accounting | Object | A map of various server states with information about the time the server spends in each. This can be useful for tracking the long-term health of your server's connectivity to the network. The contents of this field are formatted as State Accounting Objects. |
| time | String | The current time in UTC, according to the server's clock. |
| uptime | Number | Number of consecutive seconds that the server has been operational. |
| validated_ledger | Object | (May be omitted) Information about the most recent fully-validated ledger, as a Server Ledger Object. If the most recent validated ledger is not available, the response omits this field and includes closed_ledger instead. |
| validation_quorum | Number | Minimum number of trusted validations required to validate a ledger version. Some circumstances may cause the server to require more validations. |
| validator_list_expires | Number | (Admin only) When the current validator list expires, in seconds since the Ripple Epoch, or 0 if the server has yet to load a published validator list. |


`Field`

`amendment_blocked`

`true`

`build_version`

`rippled`

`complete_ledgers`

`rippled`

`empty`

`closed_ledger`

`validated_ledger`

`io_latency_ms`

`rippled`

`jq_trans_overflow`

`last_close`

`last_close.converge_time`

`last_close.proposers`

`load`

`load.job_types`

`load.threads`

`load_base`

`load_factor`

`load_base`

`load_factor`

`load_base`

`load_factor`

`load_base`

`load_factor`

`load_base`

`load_factor_fee_escalation`

`load_factor_fee_queue`

`load_factor_fee_reference`

`load_factor_server`

`network_ledger`

`--net`

`waiting`

`peers`

`rippled`

`ports`

`pubkey_node`

`[node_seed]`

`pubkey_validator`

`[validator_token]`

`[validation_seed]`

`server_state`

`server_state_duration_us`

`state_accounting`

`time`

`uptime`

`validated_ledger`

`closed_ledger`

`validation_quorum`

`validator_list_expires`


### Port Descriptor Object

Each member of the ports array is an object with the following fields:

`ports`

| Field | Value | Description |
| --- | --- | --- |
| port | String - Number | A port number where the server is listening. |
| protocol | Array of String | A list of protocols being served on this port. Valid protocols include http or https for JSON-RPC, ws, ws2, wss, wss2 for WebSocket, grpc for gRPC, and peer for the XRP Ledger Peer Protocol. |


`port`

`protocol`

`http`

`https`

`ws`

`ws2`

`wss`

`wss2`

`grpc`

`peer`

NoteDepending on network infrastructure, the ports and protocols reported here may not match how the server can be reached from the outside network. For example, if TLS terminates at a load balancer or proxy, the server may report http on one port, but might only be reachable through https on port 443 from outside.

`http`

`https`


### State Accounting Object

Each field in the state_accounting object has a key that refers to a specific server state, and a value that is an object with the following fields:

`state_accounting`

| Field | Value | Description |
| --- | --- | --- |
| duration_us | String - Number | The number of microseconds the server has spent in this state. (This is updated whenever the server transitions into another state.) |
| transitions | String - Number | The number of times the server has changed into this state. |


`duration_us`

`transitions`


### Server Ledger Object

The response provides either a validated_ledger field or a closed_ledger field. Either field contains an object with the following fields:

`validated_ledger`

`closed_ledger`

| Field | Value | Description |
| --- | --- | --- |
| base_fee | Number | The base fee, in drops of XRP, for propagating a transaction to the network, as of this ledger version. |
| close_time | Number | The official close time time of this ledger version, in seconds since the Ripple Epoch. This value is rounded; see Ledger Close Times for details. |
| hash | String - Hash | The unique hash of this ledger version, as hexadecimal. |
| reserve_base | Number | The minimum account reserve, as of the most recent validated ledger version. |
| reserve_inc | Number | The owner reserve for each item an account owns, as of the most recent validated ledger version. |
| seq | Number | The ledger index of this ledger version. |


`base_fee`

`close_time`

`hash`

`reserve_base`

`reserve_inc`

`seq`

Note that the server_info method provides a similar object with slightly different formatting (using decimal XRP instead of drops, for example).


## Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 1.12.0](https://img.shields.io/badge/New in-rippled 1.12.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39f8fdb8-8359-4ba5-9c7c-8a719aa2d1bd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39f8fdb8-8359-4ba5-9c7c-8a719aa2d1bd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63bc6713-0831-4da0-a221-c17190fc6078&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63bc6713-0831-4da0-a221-c17190fc6078&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c412fbd6-7671-40e7-8c42-e748617dc28e&bo=1&sid=50b5cd409da711f09f25b580de3adbc0&vid=50b649809da711f0a4cb15379d9f0b0d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=server_state&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&r=&lt=4016&evt=pageLoad&sv=2&cdb=AQAS&rn=346373)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4cf37a25-b746-49d5-86b2-b4c23426c23e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4cf37a25-b746-49d5-86b2-b4c23426c23e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63f84da0-818f-4fce-bd98-03f6aaf8eadf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63f84da0-818f-4fce-bd98-03f6aaf8eadf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7aa31bc3-116f-4c82-9afe-d54b9e9c2cbb&pt=server_state&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_state&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_state#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_state#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_state#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_state#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_state.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/ServerState.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.12.0](https://github.com/XRPLF/rippled/releases/tag/1.12.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:44:14.094Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
