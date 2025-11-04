# server_info
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/server_info-clio
Section: V1

## Overview


## Extracted Content
# server_info

[Source]

The server_info command asks the Clio server for a human-readable version of various information about the Clio server being queried. For rippled servers, see server_info (rippled) instead.

`server_info`

`rippled`

`server_info`

`rippled`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC

```
{
  "id": 1,
  "command": "server_info"
}
```

The request does not take any parameters.


## Response Format

When a client connects to the Clio server over localhost, the response includes the counters and etl objects. These objects are omitted from the response when the client is not located on the same server, and hence does not connect over localhost.

`localhost`

`counters`

`etl`

`localhost`

An example of a successful response when client connects over localhost:

`localhost`

- WebSocket
- JSON-RPC

```
{
    "id": 1,
    "result": {
        "info": {
            "complete_ledgers": "19499132-19977628",
            "counters": {
                "rpc": {
                    "account_objects": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "991"
                    },
                    "account_tx": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "91633"
                    },
                    "account_lines": {
                        "started": "5",
                        "finished": "5",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "4915159"
                    },
                    "submit_multisigned": {
                        "started": "2",
                        "finished": "2",
                        "errored": "0",
                        "forwarded": "2",
                        "duration_us": "4823"
                    },
                    "ledger_entry": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "17806"
                    },
                    "server_info": {
                        "started": "5",
                        "finished": "5",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "2375580"
                    },
                    "account_info": {
                        "started": "5",
                        "finished": "5",
                        "errored": "0",
                        "forwarded": "5",
                        "duration_us": "9256"
                    },
                    "account_currencies": {
                        "started": "4",
                        "finished": "4",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "517302"
                    },
                    "noripple_check": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "1",
                        "duration_us": "2218"
                    },
                    "tx": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "562"
                    },
                    "gateway_balances": {
                        "started": "6",
                        "finished": "6",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "1395156"
                    },
                    "channel_authorize": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "1",
                        "duration_us": "2017"
                    },
                    "manifest": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "1",
                        "duration_us": "1707"
                    },
                    "subscribe": {
                        "started": "6",
                        "finished": "6",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "116"
                    },
                    "random": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "111"
                    },
                    "ledger_data": {
                        "started": "14",
                        "finished": "3",
                        "errored": "11",
                        "forwarded": "0",
                        "duration_us": "6179145"
                    },
                    "ripple_path_find": {
                        "started": "1",
                        "finished": "1",
                        "errored": "0",
                        "forwarded": "1",
                        "duration_us": "1409563"
                    },
                    "account_channels": {
                        "started": "14",
                        "finished": "14",
                        "errored": "0",
                        "forwarded": "0",
                        "duration_us": "1062692"
                    },
                    "submit": {
                        "started": "6",
                        "finished": "6",
                        "errored": "0",
                        "forwarded": "6",
                        "duration_us": "11383"
                    },
                    "transaction_entry": {
                        "started": "8",
                        "finished": "5",
                        "errored": "3",
                        "forwarded": "0",
                        "duration_us": "494131"
                    }
                },
                "subscriptions": {
                    "ledger": 0,
                    "transactions": 0,
                    "transactions_proposed": 0,
                    "manifests": 2,
                    "validations": 2,
                    "account": 0,
                    "accounts_proposed": 0,
                    "books": 0
                }
            },
            "load_factor": 1,
            "clio_version": "0.3.0-b2",
            "validation_quorum": 8,
            "rippled_version": "1.9.1-rc1",
            "validated_ledger": {
                "age": 4,
                "hash": "4CD25FB70D45646EE5822E76E58B66D39D5AE6BA0F70491FA803DA0DA218F434",
                "seq": 19977628,
                "base_fee_xrp": 1E-5,
                "reserve_base_xrp": 1E1,
                "reserve_inc_xrp": 2E0
            }
        },
        "cache": {
            "size": 8812733,
            "is_full": true,
            "latest_ledger_seq": 19977629
        },
        "etl": {
            "etl_sources": [
                {
                    "validated_range": "19405538-19977629",
                    "is_connected": "1",
                    "ip": "52.36.182.38",
                    "ws_port": "6005",
                    "grpc_port": "50051",
                    "last_msg_age_seconds": "0"
                }
            ],
            "is_writer": true,
            "read_only": false,
            "last_publish_age_seconds": "2"
        },
        "validated": true
    },
    "status": "success",
    "type": "response",
    "warnings": [
        {
            "id": 2001,
            "message": "This is a clio server. clio only serves validated data. If you want to talk to rippled, include ledger_index:current in your request"
        },
        {
            "id": 2002,
            "message": "This server may be out of date"
        }
    ]
}
```

An example of a successful response when client does not connect over localhost:

`localhost`

- WebSocket
- JSON-RPC

```
{
    "id": 1,
    "result": {
        "info": {
            "complete_ledgers":"32570-73737719",
            "load_factor":1,
            "clio_version":"1.0.2",
            "validation_quorum":28,
            "rippled_version":"1.9.1",
            "validated_ledger": {
                "age":7,
                "hash":"4ECDEAF9E6F8B37EFDE297953168AAB42DEED1082A565639EBB2D29E047341B4",
                "seq":73737719,
                "base_fee_xrp":1E-5,
                "reserve_base_xrp":1E1,
                "reserve_inc_xrp":2E0
            },
            "cache": {
                "size":15258947,
                "is_full":true,
                "latest_ledger_seq":73737719
            }
        },
        "validated":true,
        "status":"success"
    },
    "warnings": [
        {
            "id":2001,
            "message":"This is a clio server. clio only serves validated data. If you want to talk to rippled, include 'ledger_index':'current' in your request"
        }
    ]
}
```

The response follows the standard format, with a successful result containing an info object as its only field.

`info`

The info object may have some arrangement of the following fields:

`info`

| Field | Type | Description |
| --- | --- | --- |
| complete_ledgers | String | Range expression indicating the sequence numbers of the ledger versions the local rippled has in its database. This may be a disjoint sequence such as 24900901-24900984,24901116-24901158. If the server does not have any complete ledgers (for example, it recently started syncing with the network), this is the string empty. |
| counters | Object | (May be omitted) Stats on API calls handled since server startup. This is present only if the client connects to the Clio server over localhost. |
| rpc | Object | (May be omitted) Stats on each API call handled by the Clio server since startup. Since this is nested within the counters object, this is also present only if the client connects to the Clio server over localhost. The rpc object is a map of API method names to API Stats Objects. |
| subscriptions | Object | (May be omitted) Number of current subscribers for each stream type.  Since this is nested within the counters object, this is also present only if the client connects to the Clio server over localhost. |
| subscriptions.ledger |  |  |
| subscriptions.transactions |  |  |
| subscriptions.transactions_proposed |  |  |
| subscriptions.manifests |  |  |
| subscriptions.validations |  |  |
| subscriptions.account |  |  |
| subscriptions.accounts_proposed |  |  |
| subscriptions.books |  |  |
| time | String | The current time in UTC, according to the server's clock. |
| uptime | Number | Number of consecutive seconds that the server has been operational. |
| amendment_blocked | Boolean | (May be omitted) Whether the Clio server is Amendment Blocked |
| load_factor | Number | The load-scaled open ledger transaction cost the server is currently enforcing, as a multiplier on the base transaction cost. For example, at 1000 load factor and a reference transaction cost of 10 drops of XRP, the load-scaled transaction cost is 10,000 drops (0.01 XRP). The load factor is determined by the highest of the individual server's load factor, the cluster's load factor, the open ledger cost and the overall network's load factor. |
| clio_version | String | The version number of the running Clio server. |
| libxrpl_version | String | The version number of the libxrpl library this Clio server was built against. |
| validation_quorum | Number | (May be omitted) Minimum number of trusted validations required to validate a ledger version. Some circumstances may cause the server to require more validations. This value is obtained from rippled. This field may be omitted from the response if the Clio server is unable to connect to rippled for some reason. |
| rippled_version | String | (May be omitted) The version number of the running rippled server that the Clio server is connected to. This field may be omitted from the response if the Clio server is unable to connect to rippled for some reason. |
| network_id | String | (May be omitted) The network ID of the network that the rippled this Clio server is connected to is operating on. This field may be omitted from the response if the Clio server is unable to connect to rippled for some reason. |
| validated_ledger | Object | (May be omitted) Information about the most recent fully-validated ledger. If the most recent validated ledger is not available, the response omits this field and includes closed_ledger instead. |
| validated_ledger.age | Number | The time since the ledger was closed, in seconds. |
| validated_ledger.base_fee_xrp | Number | Base fee, in XRP. This may be represented in scientific notation such as 1e-05 for 0.00001. |
| validated_ledger.hash | String | Unique hash for the ledger, as hexadecimal. |
| validated_ledger.reserve_base_xrp | Number | Minimum amount of XRP (not drops) necessary for every account to keep in reserve. This may be represented in scientific notation such as 1e-05 for 0.00001. |
| validated_ledger.reserve_inc_xrp | Number | Amount of XRP (not drops) added to the account reserve for each object an account owns in the ledger. This may be represented in scientific notation such as 1e-05 for 0.00001. |
| validated_ledger.seq | Number | The ledger index of the latest validated ledger. |
| validator_list_expires | String | (Admin only) Either the human readable time, in UTC, when the current validator list expires, the string unknown if the server has yet to load a published validator list or the string never if the server uses a static validator list. |
| cache | Object | Information on Clio's state data cache. |
| cache.size | Number | Number of state data objects currently in the cache. |
| cache.is_full | Boolean | True if cache contains all state data for a specific ledger, false otherwise. Some API calls, such as the book_offers method, process much faster when the cache is full. |
| cache.latest_ledger_seq | Number | The ledger index of the latest validated ledger stored in the cache. |
| etl | Object | The rippled sources (ETL sources) that the Clio server is connected to. This is present only if the client connects to the Clio server over localhost. |
| etl.etl_sources | Object Array | List the rippled sources (ETL sources) that the Clio server is connected to and extracts data from. |
| etl.etl_sources.validated_range | String | The validated ledger range retrieved by the P2P rippled server. |
| etl.etl_sources.is_connected | Boolean | True if Clio is connected to this source via websocket, false otherwise. A value of false here could indicate a networking issue, or that rippled is not running, amongst other things. |
| etl.etl_sources.ip | Number | IP of the rippled server. |
| etl.etl_sources.ws_port | Number | Websocket port of the rippled server. |
| etl.etl_sources.grpc_port | Number | The gRPC connection port of the P2P rippled server that the Clio server is connected to. |
| etl.etl_sources.last_msg_age_seconds | Number | Total seconds that have elapsed since Clio last heard anything from rippled. This should not be higher than 8. |
| etl.is_writer | Boolean | True if this Clio server is currently writing data to the database, false otherwise. |
| etl.read_only | Boolean | True if this Clio server is configured in read-only mode, false otherwise. |
| etl.last_publish_age_seconds | Number | Time in seconds that have elapsed since this Clio server last published a ledger. This should not be more than 8. |
| validated | Boolean | When true, this indicates that the response uses a ledger version that has been validated by consensus. In Clio, this is always true as Clio stores and returns validated ledger data. If a request was forwarded to rippled and the server returns current data, a missing or false value indicates that this ledger's data is not final. |
| status | String | Returns the status of the API request: success when the request completes successfully. |


`Field`

`complete_ledgers`

`rippled`

`24900901-24900984,24901116-24901158`

`empty`

`counters`

`localhost`

`rpc`

`counters`

`localhost`

`subscriptions`

`counters`

`localhost`

`subscriptions.ledger`

`subscriptions.transactions`

`subscriptions.transactions_proposed`

`subscriptions.manifests`

`subscriptions.validations`

`subscriptions.account`

`subscriptions.accounts_proposed`

`subscriptions.books`

`time`

`uptime`

`amendment_blocked`

`load_factor`

`1000`

`clio_version`

`libxrpl_version`

`libxrpl`

`validation_quorum`

`rippled`

`rippled`

`rippled_version`

`rippled`

`rippled`

`network_id`

`rippled`

`rippled`

`validated_ledger`

`closed_ledger`

`validated_ledger.age`

`validated_ledger.base_fee_xrp`

`1e-05`

`validated_ledger.hash`

`validated_ledger.reserve_base_xrp`

`1e-05`

`validated_ledger.reserve_inc_xrp`

`1e-05`

`validated_ledger.seq`

`validator_list_expires`

`unknown`

`never`

`cache`

`cache.size`

`cache.is_full`

`cache.latest_ledger_seq`

`etl`

`rippled`

`localhost`

`etl.etl_sources`

`rippled`

`etl.etl_sources.validated_range`

`rippled`

`etl.etl_sources.is_connected`

`rippled`

`etl.etl_sources.ip`

`rippled`

`etl.etl_sources.ws_port`

`rippled`

`etl.etl_sources.grpc_port`

`rippled`

`etl.etl_sources.last_msg_age_seconds`

`rippled`

`etl.is_writer`

`etl.read_only`

`etl.last_publish_age_seconds`

`validated`

`rippled`

`status`

`success`


### API Stats Objects

An API Stats object provides key metrics for every API call handled by the Clio server since startup. It includes the following fields:

| Field | Type | Description |
| --- | --- | --- |
| started | Number | Number of API calls of this type that the Clio server has started processing since startup. |
| finished | Number | Number of API calls of this type that the Clio server has finished processing since startup. |
| errored | Number | Number of API calls of this type that have resulted in some sort of error since startup. |
| forwarded | Number | Number of API calls of this type that the Clio server has forwarded to a rippled P2P server since startup. |
| duration_us | Number | The total number of microseconds spent processing API calls of this type since startup. |


`Field`

`started`

`finished`

`errored`

`forwarded`

`rippled`

`duration_us`


## Possible Errors

- Any of the universal error types.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: Clio v1.0.0](https://img.shields.io/badge/New in-Clio v1.0.0-blue.svg)

![New in: Clio v2.0](https://img.shields.io/badge/New in-Clio v2.0-blue.svg)

![New in: Clio v2.0](https://img.shields.io/badge/New in-Clio v2.0-blue.svg)

![New in: Clio v2.0](https://img.shields.io/badge/New in-Clio v2.0-blue.svg)

![New in: Clio v2.0](https://img.shields.io/badge/New in-Clio v2.0-blue.svg)

![New in: Clio v2.0](https://img.shields.io/badge/New in-Clio v2.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c30f0499-aa42-4662-b81b-e5842d2380e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c30f0499-aa42-4662-b81b-e5842d2380e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ee39f18c-1201-4d99-806d-50e6f9f814f2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ee39f18c-1201-4d99-806d-50e6f9f814f2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1ba48b2e-b826-4fea-92e1-19b9fa04572b&bo=1&sid=6c88d4d09da711f0a7a94bbc1e4b1a1b&vid=6c8949a09da711f0bd6e91dc1498c508&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=server_info&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&r=&lt=2901&evt=pageLoad&sv=2&cdb=AQAS&rn=75389)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7c042b36-7c27-4c14-a249-da3cde488203&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7c042b36-7c27-4c14-a249-da3cde488203&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=99c09e67-36b5-4cfb-b8c1-58d57f6b660a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=99c09e67-36b5-4cfb-b8c1-58d57f6b660a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=287cf3ff-2529-4547-93ec-6055257b018d&pt=server_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fserver_info-clio&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/server_info-clio#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/server_info-clio#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/server_info-clio#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/server_info-clio#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3e0c89e23bada1b649977a785d023add.1759200310047.1759200310047.1759200310047.1&__hssc=78174987.2.1759200310047&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/clio-methods/server_info-clio.md)
- [[Source]](https://github.com/XRPLF/clio/blob/master/src/rpc/handlers/ServerInfo.cpp)
- [https://github.com/XRPLF/clio/releases/tag/1.0.0](https://github.com/XRPLF/clio/releases/tag/1.0.0)
- [https://github.com/XRPLF/clio/releases/tag/2.0.0](https://github.com/XRPLF/clio/releases/tag/2.0.0)
- [https://github.com/XRPLF/clio/releases/tag/2.0.0](https://github.com/XRPLF/clio/releases/tag/2.0.0)
- [https://github.com/XRPLF/clio/releases/tag/2.0.0](https://github.com/XRPLF/clio/releases/tag/2.0.0)
- [https://github.com/XRPLF/clio/releases/tag/2.0.0](https://github.com/XRPLF/clio/releases/tag/2.0.0)
- [https://github.com/XRPLF/clio/releases/tag/2.0.0](https://github.com/XRPLF/clio/releases/tag/2.0.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3e0c89e23bada1b649977a785d023add.1759200310047.1759200310047.1759200310047.1&__hssc=78174987.2.1759200310047&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:45:35.664Z
Agent: Qoder + Playwright MCP
Retries: 1
Status: SUCCESS
