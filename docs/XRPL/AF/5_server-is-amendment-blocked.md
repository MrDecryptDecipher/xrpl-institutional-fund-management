# rippled Server is Amendment Blocked
URL: https://xrpl.org/docs/infrastructure/troubleshooting/server-is-amendment-blocked
Section: AF5

## Overview


## Extracted Content
# rippled Server is Amendment Blocked

Servers which are amendment blocked can't determine the validity of a ledger, submit or process transactions, or participate in the consensus process.

One of the first signs that your rippled server is amendment blocked is an amendmentBlocked error that is returned when you submit a transaction. Here's an example amendmentBlocked error:

`rippled`

`amendmentBlocked`

`amendmentBlocked`

```
{
   "result":{
      "error":"amendmentBlocked",
      "error_code":14,
      "error_message":"Amendment blocked, need upgrade.",
      "request":{
         "command":"submit",
         "tx_blob":"479H0KQ4LUUXIHL48WCVN0C9VD7HWSX0MG1UPYNXK6PI9HLGBU2U10K3HPFJSROFEG5VD749WDPHWSHXXO72BOSY2G8TWUDOJNLRTR9LTT8PSOB9NNZ485EY2RD9D80FLDFRBVMP1RKMELILD7I922D6TBCAZK30CSV6KDEDUMYABE0XB9EH8C4LE98LMU91I9ZV2APETJD4AYFEN0VNMIT1XQ122Y2OOXO45GJ737HHM5XX88RY7CXHVWJ5JJ7NYW6T1EEBW9UE0NLB2497YBP9V1XVAEK8JJYVRVW0L03ZDXFY8BBHP6UBU7ZNR0JU9GJQPNHG0DK86S4LLYDN0BTCF4KWV2J4DEB6DAX4BDLNPT87MM75G70DFE9W0R6HRNWCH0X075WHAXPSH7S3CSNXPPA6PDO6UA1RCCZOVZ99H7968Q37HACMD8EZ8SU81V4KNRXM46N520S4FVZNSJHA"
      },
      "status":"error"
   }
}
```

The following rippled log message also indicates that your server is amendment blocked:

`rippled`

```
2018-Feb-12 19:38:30 LedgerMaster:ERR One or more unsupported amendments activated: server blocked.
```

You can verify that your rippled server is amendment blocked using the server_info command. In the response, look for result.info.amendment_blocked. If amendment_blocked is set to true, your server is amendment blocked.

`rippled`

`server_info`

`result.info.amendment_blocked`

`amendment_blocked`

`true`

Example JSON-RPC Response:

```
{
    "result": {
        "info": {
            "amendment_blocked": true,
            "build_version": "0.80.1",
            "complete_ledgers": "6658438-6658596",
            "hostid": "ip-10-30-96-212.us-west-2.compute.internal",
            "io_latency_ms": 1,
            "last_close": {
                "converge_time_s": 2,
                "proposers": 10
            },
...
        },
        "status": "success"
    }
}
```


## Unblock Servers

The easiest solution is to update to the latest version of rippled, but depending on the scenario, you may want to update to an older version with the amendment blocking your server.

`rippled`

WarningIf the newest rippled version provides security or other urgent fixes, you should upgrade to the newest version as soon as possible.

`rippled`

To determine if you can unblock your rippled server by upgrading to a version older than the newest version, find out which features are blocking your server and then look up the rippled version that supports the blocking features.

`rippled`

`rippled`

To find out which features are blocking your rippled server, use the feature admin command. Look for features that have:

`rippled`

`feature`

```
"enabled" : true
"supported" : false
```

These values mean the amendment is required in the latest ledger, but your server doesn't support the implementation.

Example JSON-RPC Response:

```
{
    "result": {
        "features": {
            "07D43DCE529B15A10827E5E04943B496762F9A88E3268269D69C44BE49E21104": {
                "enabled": true,
                "name": "Escrow",
                "supported": true,
                "vetoed": false
            },
            "08DE7D96082187F6E6578530258C77FAABABE4C20474BDB82F04B021F1A68647": {
                "enabled": true,
                "name": "PayChan",
                "supported": true,
                "vetoed": false
            },
            "1562511F573A19AE9BD103B5D6B9E01B3B46805AEC5D3C4805C902B514399146": {
                "enabled": false,
                "name": "CryptoConditions",
                "supported": true,
                "vetoed": false
            },
            "157D2D480E006395B76F948E3E07A45A05FE10230D88A7993C71F97AE4B1F2D1": {
                "enabled": true,
                "supported": false,
                "vetoed": false
            },
...
            "67A34F2CF55BFC0F93AACD5B281413176FEE195269FA6D95219A2DF738671172": {
                "enabled": true,
                "supported": false,
                "vetoed": false
            },
...
            "F64E1EABBE79D55B3BB82020516CEC2C582A98A6BFE20FBE9BB6A0D233418064": {
                "enabled": true,
                "supported": false,
                "vetoed": false
            }
        },
        "status": "success"
    }
}
```

In this example, conflicts with the following features are causing your rippled server to be amendment blocked:

`rippled`

- 157D2D480E006395B76F948E3E07A45A05FE10230D88A7993C71F97AE4B1F2D1
- 67A34F2CF55BFC0F93AACD5B281413176FEE195269FA6D95219A2DF738671172
- F64E1EABBE79D55B3BB82020516CEC2C582A98A6BFE20FBE9BB6A0D233418064

157D2D480E006395B76F948E3E07A45A05FE10230D88A7993C71F97AE4B1F2D1

`157D2D480E006395B76F948E3E07A45A05FE10230D88A7993C71F97AE4B1F2D1`

67A34F2CF55BFC0F93AACD5B281413176FEE195269FA6D95219A2DF738671172

`67A34F2CF55BFC0F93AACD5B281413176FEE195269FA6D95219A2DF738671172`

F64E1EABBE79D55B3BB82020516CEC2C582A98A6BFE20FBE9BB6A0D233418064

`F64E1EABBE79D55B3BB82020516CEC2C582A98A6BFE20FBE9BB6A0D233418064`

To look up which rippled version supports these features, see Known Amendments.

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aab1f99b-332f-44d7-b221-db31f677a7ac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aab1f99b-332f-44d7-b221-db31f677a7ac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=77a148d4-df2f-4873-b16f-30e99f42006f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=77a148d4-df2f-4873-b16f-30e99f42006f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1f73426a-274e-4653-902c-c097e2318ad9&bo=1&sid=b8040f609dab11f0aa4de1069d91b8b9&vid=b804d9609dab11f09c0e9f992c79fd51&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=rippled%20Server%20is%20Amendment%20Blocked&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&r=&lt=2394&evt=pageLoad&sv=2&cdb=AQAS&rn=513598)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fdc2a876-dc27-41d2-bc97-5e4c20fe2663&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fdc2a876-dc27-41d2-bc97-5e4c20fe2663&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=663f4fd4-6457-442a-be13-aadbb1764904&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=663f4fd4-6457-442a-be13-aadbb1764904&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=be3c78e6-d37b-429a-b8e3-d617cf5650b8&pt=rippled%20Server%20is%20Amendment%20Blocked&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fserver-is-amendment-blocked&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/troubleshooting/server-is-amendment-blocked#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/troubleshooting/server-is-amendment-blocked#)
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
- [Resources](https://xrpl.org/docs/infrastructure/troubleshooting/server-is-amendment-blocked#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/troubleshooting/server-is-amendment-blocked#)
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
- [Infrastructure](https://xrpl.org/docs/infrastructure)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/troubleshooting/server-is-amendment-blocked.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:15:43.397Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
