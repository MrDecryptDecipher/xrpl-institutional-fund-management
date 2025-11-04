# Peer Crawler
URL: https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/peer-crawler
Section: AB2

## Overview


## Extracted Content
# Peer Crawler

The Peer Crawler is a special peer port method for reporting on the health and topology of the peer-to-peer network. This API method is available by default on a non-privileged basis through the Peer Protocol port, which is also used for rippled servers' peer-to-peer communications about consensus, ledger history, and other necessary information.

`rippled`

The information reported by the peer crawler is effectively public, and can be used to report on the overall XRP Ledger network, its health, and topology.


## Request Format

To request the Peer Crawler information, make the following HTTP request:

- Protocol: https
- HTTP Method: GET
- Host: (any rippled server, by hostname or IP address)
- Port: (the port number where the rippled server uses the Peer Protocol, typically 51235)
- Path: /crawl
- Security: Most rippled servers use a self-signed certificate to respond to the request. By default, most tools (including web browsers) flag or block such responses for being untrusted. You must ignore the certificate checking (for example, if using cURL, add the --insecure flag) to display a response from those servers.

`rippled`

`rippled`

`/crawl`

`rippled`

`--insecure`


## Response Format

The response has the status code 200 OK and a JSON object in the message body.

The JSON object has the following fields:

| Field | Value | Description |
| --- | --- | --- |
| counts | Object | (May be omitted) Stats about this server's health, similar to the response from the get_counts method. The default configuration does not report this field. Information reported includes: how large the ledger and transaction databases are, the cache hit rate for the in-application caches, and how many objects of various types are cached in memory. Types of objects that may be stored in memory include ledgers (Ledger), transactions (STTx), validation messages (STValidation), and more. |
| overlay | Object | (May be omitted) Information about the peer servers currently connected to this one, similar to the response from the peers method. Contains one field, active, which is an array of objects (see below). |
| server | Object | (May be omitted) Information about this server. Contains public fields from the server_state method, including what rippled version you are running (build_version), which ledger versions your server has available (complete_ledgers), and the amount of load your server is experiencing. |
| unl | Object | (May be omitted) Information about the validators and validator list sites this server is configured to trust, similar to the response from the validators method and validator_list_sites method. |
| version | Number | Indicates the version of this peer crawler response format. The current peer crawler version number is 2. |


`Field`

`counts`

`Ledger`

`STTx`

`STValidation`

`overlay`

`active`

`server`

`rippled`

`build_version`

`complete_ledgers`

`unl`

`version`

`2`

Each member of the overlay.active array is an object with the following fields:

`overlay.active`

| Field | Value | Description |
| --- | --- | --- |
| complete_ledgers | String | The range of ledger versions this peer has available. |
| ip | String (IPv4 Address) | (May be omitted) The IP address of this connected peer. Omitted if the peer is configured as a validator or a private peer. |
| port | String or Number | (May be omitted) The port number on the peer server that serves RTXP. This will be a string if outbound and a number otherwise. Typically 51235. Omitted if the peer is configured as a validator or a private peer. |
| public_key | String (Base-64 Encoded) | The public key of the ECDSA key pair used by this peer to sign RTXP messages. (This is the same data as the pubkey_node reported by the peer server's server_info method.) |
| type | String | The value in or out, indicating whether the TCP connection to the peer is incoming or outgoing. |
| uptime | Number | The number of seconds the server has been connected to this peer. |
| version | String | The rippled version number the peer reports to be using. |


`Field`

`complete_ledgers`

`ip`

`port`

`51235`

`public_key`

`pubkey_node`

`type`

`in`

`out`

`uptime`

`version`

`rippled`


#### Example

Request:

- HTTP
- cURL

```
GET https://localhost:51235/crawl
```

Response:

```
200 OK

{
    "overlay": {
        "active": [
            {
                "complete_ledgers": "45498918-45500918",
                "ip": "88.99.137.170",
                "port": "51235",
                "public_key": "AkU+AY9FWh8AXMc43fAUM69SzfAMGat0d/N+qx3kD6Dg",
                "type": "out",
                "uptime": 208,
                "version": "rippled-1.2.1"
            },
            {
                "complete_ledgers": "45500790-45500918",
                "ip": "198.13.58.221",
                "port": "51235",
                "public_key": "AlQvJAlNDYtoBSaZCXM0pT5RWvdOW9QhMW5++mHswkej",
                "type": "out",
                "uptime": 208,
                "version": "rippled-1.2.0"
            },
            {
                "complete_ledgers": "45500662-45500918",
                "ip": "52.90.101.104",
                "port": "51235",
                "public_key": "AkA04ujnwMn8mRyfJg4K7vzcQSOG7FHq4wUg60OQWnCY",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.2.1"
            },
            {
                "complete_ledgers": "45500662-45500918",
                "ip": "54.202.12.93",
                "port": "51235",
                "public_key": "AxoekFvFYzELGty9cqiXZB+NsOWTZ0Qs9mFIw69CGb3d",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.2.1"
            },
            {
                "complete_ledgers": "45498918-45500918",
                "ip": "173.255.240.113",
                "port": "51235",
                "public_key": "A4lWBMIDEQrO8Eerp9Hj3rFacbV0FiID3wTIx8Aoplq2",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.1.0"
            },
            {
                "complete_ledgers": "45499894-45500918",
                "ip": "54.186.73.52",
                "port": "51235",
                "public_key": "AjikFnq0P2XybCyREr2KPiqXqJteqwPwVRVbVK+93+3o",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.2.1"
            },
            {
                "complete_ledgers": "45499894-45500918",
                "ip": "54.186.248.91",
                "port": "51235",
                "public_key": "A4A4TPA17KlUjstp7fcL0qaWd4X+fvZ5MTxG5P5AggHW",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.2.1"
            },
            {
                "complete_ledgers": "45490918-45500918",
                "ip": "162.243.114.118",
                "port": "51235",
                "public_key": "AufDkW4E1DOxjzRPj46Eu+AyJdsakUeJTz3xklv1kCfp",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.2.1"
            },
            {
                "complete_ledgers": "45498918-45500918",
                "ip": "::ffff:45.56.78.201",
                "port": "51235",
                "public_key": "AmsXz4UUqjlz6iy8HHhZdHmBHteEBwYZLOHCHA4puCwj",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.1.0"
            },
            {
                "complete_ledgers": "32570-45500918",
                "ip": "169.55.164.30",
                "port": "51235",
                "public_key": "Aw7J0CVhFKt0h6PDEpqu6t4LbPY0PsX8jCFbvSQFDOkW",
                "type": "out",
                "uptime": 209,
                "version": "rippled-1.2.1"
            }
        ]
    },
    "server": {
        "build_version": "1.2.1",
        "complete_ledgers": "45500881-45500888",
        "io_latency_ms": 1,
        "jq_trans_overflow": "0",
        "last_close": {
            "converge_time": 3002,
            "proposers": 25
        },
        "load_base": 256,
        "load_factor": 256,
        "load_factor_fee_reference": 256,
        "load_factor_server": 256,
        "peer_disconnects": "0",
        "peer_disconnects_resources": "0",
        "peers": 10,
        "pubkey_node": "n9MJZBu5HyxyEq8xPGBxXFTfT3uzdnNsvR6R1NyXxbEzt79SrZJE",
        "published_ledger": 45500888,
        "server_state": "full",
        "server_state_duration_us": "40756665",
        "state_accounting": {
            "connected": {
                "duration_us": "163459544",
                "transitions": 1
            },
            "disconnected": {
                "duration_us": "2539592",
                "transitions": 1
            },
            "full": {
                "duration_us": "40756665",
                "transitions": 1
            },
            "syncing": {
                "duration_us": "5071794",
                "transitions": 1
            },
            "tracking": {
                "duration_us": "1",
                "transitions": 1
            }
        },
        "time": "2019-Mar-02 01:48:50.912360",
        "uptime": 213,
        "validated_ledger": {
            "close_time": 604806530,
            "hash": "00415B0ECF1D31E8DC9A7DCB04CAF1FD47E61D4D9D047743C1508CDBD36576CE",
            "reserve_base": 20000000,
            "reserve_inc": 5000000,
            "seq": 45500918
        }
    },
    "unl": {
        "local_static_keys": [],
        "publisher_lists": [
            {
                "available": true,
                "expiration": "2019-Mar-06 00:00:00.000000000",
                "pubkey_publisher": "ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734",
                "seq": 47,
                "uri": "https://vl.ripple.com",
                "version": 1
            }
        ],
        "validator_list": {
            "count": 1,
            "expiration": "2019-Mar-06 00:00:00.000000000",
            "status": "active"
        },
        "validator_sites": [
            {
                "last_refresh_status": "accepted",
                "last_refresh_time": "2019-Mar-02 01:45:19.940242379",
                "next_refresh_time": "2019-Mar-02 01:50:19.568004480",
                "refresh_interval_min": 5,
                "uri": "https://vl.ripple.com"
            }
        ]
    },
    "version": 2
}
```


## See Also

- Peer Protocol
- Configure the Peer Crawler
- Validator History Service is an example of a service that uses the peer crawler for ingesting, aggregating, storing, and disbursing validation related data.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.2.1](https://img.shields.io/badge/Updated in-rippled 1.2.1-blue.svg)

![Updated in: rippled 1.2.1](https://img.shields.io/badge/Updated in-rippled 1.2.1-blue.svg)

![Updated in: rippled 1.2.1](https://img.shields.io/badge/Updated in-rippled 1.2.1-blue.svg)

![Updated in: rippled 1.2.1](https://img.shields.io/badge/Updated in-rippled 1.2.1-blue.svg)

![Updated in: rippled 1.2.1](https://img.shields.io/badge/Updated in-rippled 1.2.1-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6eab566-cb30-4590-a412-ecb9320c8fd6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6eab566-cb30-4590-a412-ecb9320c8fd6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a5066eee-9a46-4a56-83ae-c05b05c51594&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a5066eee-9a46-4a56-83ae-c05b05c51594&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a013d8bd-e247-442e-b90e-1b2088ce296f&bo=1&sid=6dc69f409da911f097a55d08552ae313&vid=6dc70db09da911f0ad51d1b16bb212d0&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Peer%20Crawler&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&r=&lt=2327&evt=pageLoad&sv=2&cdb=AQAS&rn=252709)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4d771ea7-546d-44cb-8b7d-7b2ddba70974&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4d771ea7-546d-44cb-8b7d-7b2ddba70974&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a47685f5-a942-4043-b7fa-7f38dd94b6bd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a47685f5-a942-4043-b7fa-7f38dd94b6bd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7980f16b-4249-4a53-90a0-21b502fc3a3b&pt=Peer%20Crawler&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpeer-port-methods%2Fpeer-crawler&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/peer-crawler#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/peer-crawler#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/peer-crawler#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/peer-port-methods/peer-crawler#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.bb9f4e959f25a76586fc1facdd2587c6.1759201149557.1759201149557.1759201149557.1&__hssc=78174987.1.1759201149557&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/peer-port-methods/peer-crawler.md)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.1](https://github.com/XRPLF/rippled/releases/tag/1.2.1)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.1](https://github.com/XRPLF/rippled/releases/tag/1.2.1)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.1](https://github.com/XRPLF/rippled/releases/tag/1.2.1)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.1](https://github.com/XRPLF/rippled/releases/tag/1.2.1)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.1](https://github.com/XRPLF/rippled/releases/tag/1.2.1)
- [Validator History Service](https://github.com/ripple/validator-history-service)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.bb9f4e959f25a76586fc1facdd2587c6.1759201149557.1759201149557.1759201149557.1&__hssc=78174987.1.1759201149557&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:59:19.178Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
