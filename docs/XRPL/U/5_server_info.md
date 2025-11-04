# server_info (rippled)
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info
Section: U5

## Overview


## Extracted Content
# server_info (rippled)

[Source]

The server_info command asks the server for a human-readable version of various information about the rippled server being queried. For Clio servers, see server_info (Clio) instead.

`server_info`

`rippled`

`server_info`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 1,
  "command": "server_info",
  "counters": false
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| counters | Boolean | No | If true, return metrics about the job queue, ledger store, and API method activity. The default is false. |


`counters`

`true`

`false`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": 1,
    "result": {
      "info": {
        "build_version": "1.12.0",
        "complete_ledgers": "32570-82521701",
        "hostid": "LEST",
        "initial_sync_duration_us": "190181187",
        "io_latency_ms": 1,
        "jq_trans_overflow": "0",
        "last_close": {
          "converge_time_s": 3.001,
          "proposers": 35
        },
        "load_factor": 1,
        "network_id": 0,
        "peer_disconnects": "5",
        "peer_disconnects_resources": "0",
        "peers": 22,
        "ports": [
          {
            "port": "7777",
            "protocol": [
              "ws"
            ]
          },
          {
            "port": "8080",
            "protocol": [
              "ws"
            ]
          },
          {
            "port": "80",
            "protocol": [
              "http"
            ]
          },
          {
            "port": "51235",
            "protocol": [
              "peer"
            ]
          }
        ],
        "pubkey_node": "n9KQK8yvTDcZdGyhu2EGdDnFPEBSsY5wEgpU5GgpygTgLFsjQyPt",
        "server_state": "full",
        "server_state_duration_us": "91535211664",
        "state_accounting": {
          "connected": {
            "duration_us": "83091928",
            "transitions": "2"
          },
          "disconnected": {
            "duration_us": "104836801",
            "transitions": "2"
          },
          "full": {
            "duration_us": "91535211664",
            "transitions": "1"
          },
          "syncing": {
            "duration_us": "2252409",
            "transitions": "1"
          },
          "tracking": {
            "duration_us": "48",
            "transitions": "1"
          }
        },
        "time": "2023-Sep-13 22:08:48.097189 UTC",
        "uptime": 91725,
        "validated_ledger": {
          "age": 4,
          "base_fee_xrp": 0.00001,
          "hash": "5825332DC66029ECCD896CACB3BBB79E4F5372A8DCA91AA2874A1A1A87B79F84",
          "reserve_base_xrp": 10,
          "reserve_inc_xrp": 2,
          "seq": 82521701
        },
        "validation_quorum": 28
      }
    },
    "status": "success",
    "type": "response"
}
```

The response follows the standard format, with a successful result containing an info object as its only field.

`info`

The info object may have some arrangement of the following fields:

`info`

| Field | Type | Description |
| --- | --- | --- |
| amendment_blocked | Boolean | (May be omitted) If true, this server is amendment blocked. If the server is not amendment blocked, the response omits this field. |
| build_version | String | The version number of the running rippled server. |
| closed_ledger | Object | (May be omitted) Information on the most recently closed ledger that has not been validated by consensus, as a Server Ledger Object. If the most recently validated ledger is available, the response omits this field and includes validated_ledger instead. |
| complete_ledgers | String | Range expression indicating the sequence numbers of the ledger versions the local rippled has in its database. This may be a disjoint sequence such as 24900901-24900984,24901116-24901158. If the server does not have any complete ledgers (for example, it recently started syncing with the network), this is the string empty. |
| git | Object | (Admin only) The Git details of your rippled build. |
| git.branch | String | (Admin only) The Git branch used to build your version of rippled. |
| git.hash | String | (Admin only) The Git hash of the commit used to build your version of rippled. |
| hostid | String | On an admin request, returns the hostname of the server running the rippled instance; otherwise, returns a single RFC-1751 word based on the node public key. |
| io_latency_ms | Number | Amount of time spent waiting for I/O operations, in milliseconds. If this number is not very, very low, then the rippled server is probably having serious load issues. |
| jq_trans_overflow | String - Number | The number of times (since starting up) that this server has had over 250 transactions waiting to be processed at once. A large number here may mean that your server is unable to handle the transaction load of the XRP Ledger network. For detailed recommendations of future-proof server specifications, see Capacity Planning. |
| last_close | Object | Information about the last time the server closed a ledger, including the amount of time it took to reach a consensus and the number of trusted validators participating. |
| last_close.converge_time_s | Number | The amount of time it took to reach a consensus on the most recently validated ledger version, in seconds. |
| last_close.proposers | Number | How many trusted validators the server considered (including itself, if configured as a validator) in the consensus process for the most recently validated ledger version. |
| load | Object | (Admin only) Detailed information about the current load state of the server. |
| load.job_types | Array | (Admin only) Information about the rate of different types of jobs the server is doing and how much time it spends on each. |
| load.threads | Number | (Admin only) The number of threads in the server's main job pool. |
| load_factor | Number | The multiplier to the transaction cost the server is currently enforcing. For example, at 1000 load factor and a reference transaction cost of 10 drops of XRP, the load-scaled transaction cost is 10,000 drops (0.01 XRP). The load factor is determined by the highest of the individual server's load factor, the cluster's load factor, the open ledger cost, and the overall network's load factor. |
| load_factor_local | Number | (May be omitted) The current multiplier to the transaction cost based on load to this server. |
| load_factor_net | Number | (May be omitted) The current multiplier to the transaction cost being used by the rest of the network (estimated from other servers' reported load values). |
| load_factor_cluster | Number | (May be omitted) The current multiplier to the transaction cost based on load to servers in this cluster. |
| load_factor_fee_escalation | Number | (May be omitted) The current multiplier to the transaction cost that a transaction must pay to get into the open ledger. |
| load_factor_fee_queue | Number | (May be omitted) The current multiplier to the transaction cost that a transaction must pay to get into the queue, if the queue is full. |
| load_factor_server | Number | (May be omitted) The current multiplier to the transaction cost based on load to the server, cluster, and network, but not factoring in the open ledger cost. |
| network_ledger | String | (May be omitted) When starting the server with the --net parameter, this field contains the string waiting while the server is syncing to the network. The field is omitted otherwise. |
| peers | Number | How many other rippled servers this one is currently connected to. |
| ports | Array | A list of ports where the server is listening for API commands. Each entry in the array is a Port Descriptor object. |
| pubkey_node | String | Public key used to verify this server for peer-to-peer communications. This node key pair is automatically generated by the server the first time it starts up. (If deleted, the server can create a new pair of keys.) You can set a persistent value in the config file using the [node_seed] config option, which is useful for clustering. |
| pubkey_validator | String | (Admin only) Public key used by this node to sign ledger validations. This validation key pair is derived from the [validator_token] or [validation_seed] config field. |
| server_state | String | A string indicating to what extent the server is participating in the network. See Possible Server States for more details. |
| server_state_duration_us | Number | The number of consecutive microseconds the server has been in the current state. |
| state_accounting | Object | A map of various server states with information about the time the server spends in each. This can be useful for tracking the long-term health of your server's connectivity to the network. The contents of this field are formatted as State Accounting Objects. |
| uptime | Number | Number of consecutive seconds that the server has been operational. |
| validated_ledger | Object | (May be omitted) Information about the most recent fully-validated ledger, as a Server Ledger Object. If the most recent validated ledger is not available, the response omits this field and includes closed_ledger instead. |
| validation_quorum | Number | Minimum number of trusted validations required to validate a ledger version. Some circumstances may cause the server to require more validations. |
| validator_list_expires | String | (Admin only) Either the human readable time, in UTC, when the current validator list expires, the string unknown if the server has yet to load a published validator list or the string never if the server uses a static validator list. |
| counters | Object | This object contains performance metrics pertaining to the RPC calls (currently executing calls and completed calls) and the JobQueue. It also contains details of the nodestore like node_writes, node_reads_total, node_reads_hit, etc |
| current_activity | Object | This field lists the items currently being run in the job queue and contains two arrays for jobs and methods. |


`Field`

`amendment_blocked`

`true`

`build_version`

`rippled`

`closed_ledger`

`validated_ledger`

`complete_ledgers`

`rippled`

`24900901-24900984,24901116-24901158`

`empty`

`git`

`rippled`

`git.branch`

`rippled`

`git.hash`

`rippled`

`hostid`

`rippled`

`io_latency_ms`

`rippled`

`jq_trans_overflow`

`last_close`

`last_close.converge_time_s`

`last_close.proposers`

`load`

`load.job_types`

`load.threads`

`load_factor`

`1000`

`load_factor_local`

`load_factor_net`

`load_factor_cluster`

`load_factor_fee_escalation`

`load_factor_fee_queue`

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

`uptime`

`validated_ledger`

`closed_ledger`

`validation_quorum`

`validator_list_expires`

`unknown`

`never`

`counters`

`node_writes`

`node_reads_total`

`node_reads_hit`

`current_activity`

`jobs`

`methods`


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
| age | Number | The time since the ledger was closed, in seconds. |
| base_fee_xrp | Number | Base fee, in XRP (not drops). This may be represented in scientific notation such as 1e-05 for 0.00001. |
| hash | String - Hash | Unique hash for the ledger, as hexadecimal. |
| reserve_base_xrp | Number | Minimum amount of XRP (not drops) necessary for every account to keep in reserve |
| reserve_inc_xrp | Number | Amount of XRP (not drops) added to the account reserve for each object an account owns in the ledger. |
| seq | Number | The ledger index of the latest validated ledger. |


`age`

`base_fee_xrp`

`1e-05`

`hash`

`reserve_base_xrp`

`reserve_inc_xrp`

`seq`

Note that the server_state method provides a similar object with slightly different formatting (using drops of XRP instead of decimal XRP, for example).

NoteIf the closed_ledger field is present and has a small seq value (less than 8 digits), that indicates rippled does not currently have a copy of the validated ledger from the peer-to-peer network. This could mean your server is still syncing. Typically, it takes up to 15 minutes to sync with the network, depending on your connection speed and hardware specs. See Server Doesn't Sync for troubleshooting information.

`closed_ledger`

`seq`

`rippled`


## Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 1.12.0](https://img.shields.io/badge/New in-rippled 1.12.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bca55dc6-fcb2-49b0-9def-4f6b631ce902&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bca55dc6-fcb2-49b0-9def-4f6b631ce902&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=45bd2e34-312d-4770-bea5-0b63e1509808&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=45bd2e34-312d-4770-bea5-0b63e1509808&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6ac72d75-8fd6-4b67-894f-33ddbdd29b45&bo=1&sid=410a23e09da711f0bac7cb3f5d667e4b&vid=410aa5809da711f09bb6bd9c36e348d3&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=server_info%20(rippled)&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&r=&lt=2322&evt=pageLoad&sv=2&cdb=AQAS&rn=363353)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=228c649b-acbd-4644-9865-d81fe23f8362&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=228c649b-acbd-4644-9865-d81fe23f8362&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=db543ce2-823c-4977-a682-7d108ee4384a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=db543ce2-823c-4977-a682-7d108ee4384a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d371b1f6-517a-4eef-b7be-bee8d60c4466&pt=server_info%20(rippled)&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fserver-info-methods%2Fserver_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3f64901f8ac172b051146a9da44ae490.1759200215019.1759200215019.1759200215019.1&__hssc=78174987.1.1759200215019&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/ServerInfo.cpp)
- [RFC-1751](https://tools.ietf.org/html/rfc1751)
- [https://github.com/XRPLF/rippled/releases/tag/1.12.0](https://github.com/XRPLF/rippled/releases/tag/1.12.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3f64901f8ac172b051146a9da44ae490.1759200215019.1759200215019.1759200215019.1&__hssc=78174987.1.1759200215019&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:43:50.321Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
