# tx
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx
Section: P5

## Overview


## Extracted Content
# tx

[Source]

The tx method retrieves information on a single transaction, by its identifying hash or its CTID.

`tx`


## Request Format

An example of the request format:

- WebSocket (Hash)
- WebSocket (CTID)
- JSON-RPC (Hash)
- MoreJSON-RPC (CTID)Commandline
- JSON-RPC (CTID)
- Commandline

- JSON-RPC (CTID)
- Commandline

```
{
  "id": 1,
  "command": "tx",
  "transaction": "C53ECF838647FA5A4C780377025FEC7999AB4182590510CA461444B207AB74A9",
  "binary": false,
  "api_version": 2
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| ctid | String | No | The compact transaction identifier of the transaction to look up. Must use uppercase hexadecimal only.  (Not supported in Clio v2.0 and earlier) |
| transaction | String | No | The 256-bit hash of the transaction to look up, as hexadecimal. |
| binary | Boolean | No | If true, return transaction data and metadata as binary serialized to hexadecimal strings. If false, return transaction data and metadata as JSON. The default is false. |
| min_ledger | Number | No | Use this with max_ledger to specify a range of up to 1000 ledger indexes, starting with this ledger (inclusive). If the server cannot find the transaction, it confirms whether it was able to search all the ledgers in this range. |
| max_ledger | Number | No | Use this with min_ledger to specify a range of up to 1000 ledger indexes, ending with this ledger (inclusive). If the server cannot find the transaction, it confirms whether it was able to search all the ledgers in the requested range. |


`ctid`

`transaction`

`binary`

`true`

`false`

`false`

`min_ledger`

`max_ledger`

`max_ledger`

`min_ledger`

You must provide either ctid or transaction, but not both.

`ctid`

`transaction`

CautionThis command may successfully find the transaction even if it is included in a ledger outside the range of min_ledger to max_ledger.

`min_ledger`

`max_ledger`


## Response Format

An example of a successful response:

- WebSocket (Hash)
- WebSocket (CTID)
- JSON-RPC (Hash)
- MoreJSON-RPC (CTID)Commandline
- JSON-RPC (CTID)
- Commandline

- JSON-RPC (CTID)
- Commandline

```
{
  "result": {
    "tx_json": {
      "Account": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
      "DeliverMax": {
        "currency": "USD",
        "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
        "value": "1"
      },
      "Destination": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
      "Fee": "10",
      "Flags": 0,
      "Paths": [
        [
          {
            "account": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "currency": "USD",
            "issuer": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "type": 49
          }
        ],
        [
          {
            "account": "rD1jovjQeEpvaDwn9wKaYokkXXrqo4D23x",
            "currency": "USD",
            "issuer": "rD1jovjQeEpvaDwn9wKaYokkXXrqo4D23x",
            "type": 49
          },
          {
            "account": "rB5TihdPbKgMrkFqrqUC3yLdE8hhv4BdeY",
            "currency": "USD",
            "issuer": "rB5TihdPbKgMrkFqrqUC3yLdE8hhv4BdeY",
            "type": 49
          },
          {
            "account": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "currency": "USD",
            "issuer": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "type": 49
          }
        ]
      ],
      "SendMax": {
        "currency": "USD",
        "issuer": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
        "value": "1.01"
      },
      "Sequence": 88,
      "SigningPubKey": "02EAE5DAB54DD8E1C49641D848D5B97D1B29149106174322EDF98A1B2CCE5D7F8E",
      "TransactionType": "Payment",
      "TxnSignature": "30440220791B6A3E036ECEFFE99E8D4957564E8C84D1548C8C3E80A87ED1AA646ECCFB16022037C5CAC97E34E3021EBB426479F2ACF3ACA75DB91DCC48D1BCFB4CF547CFEAA0",
      "date": 416445410,
      "ledger_index": 348734
    },
    "ctid": "C005523E00000000",
    "hash": "E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7",
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
              "Balance": "59328999119",
              "Flags": 0,
              "OwnerCount": 11,
              "Sequence": 89
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "E0D7BDE68B468FF0B8D948FD865576517DA987569833A05374ADB9A72E870A06",
            "PreviousFields": {
              "Balance": "59328999129",
              "Sequence": 88
            },
            "PreviousTxnID": "C26AA6B4F7C3B9F55E17CD0D11F12032A1C7AD2757229FFD277C9447A8815E6E",
            "PreviousTxnLgrSeq": 348700
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "-1"
              },
              "Flags": 131072,
              "HighLimit": {
                "currency": "USD",
                "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                "value": "100"
              },
              "HighNode": "0",
              "LowLimit": {
                "currency": "USD",
                "issuer": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
                "value": "0"
              },
              "LowNode": "0"
            },
            "LedgerEntryType": "RippleState",
            "LedgerIndex": "EA4BF03B4700123CDFFB6EB09DC1D6E28D5CEB7F680FB00FC24BC1C3BB2DB959",
            "PreviousFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "0"
              }
            },
            "PreviousTxnID": "53354D84BAE8FDFC3F4DA879D984D24B929E7FEB9100D2AD9EFCD2E126BCCDC8",
            "PreviousTxnLgrSeq": 343570
          }
        }
      ],
      "TransactionIndex": 0,
      "TransactionResult": "tesSUCCESS",
      "delivered_amount": "unavailable"
    },
    "validated": true,
    "ledger_index": 348734,
    "ledger_hash": "195F62F34EB2CCFA4C5888BA20387E82EB353DDB4508BAE6A835AF19FB8B0C09",
    "close_time_iso": "2013-03-12T23:16:50Z"
  },
  "api_version": 2,
  "status": "success",
  "type": "response"
}
```

- API v2
- API v1

The response follows the standard format, with a successful result containing the fields of the Transaction object as well as the following additional fields:

| Field | Type | Description |
| --- | --- | --- |
| ctid | String | The transaction's compact transaction identifier.  (Not supported in Clio v2.0 and earlier.) |
| date | Number | The close time of the ledger in which the transaction was applied, in seconds since the Ripple Epoch. |
| hash | String | The unique identifying hash of the transaction |
| inLedger | Number | (Deprecated) Alias for ledger_index. |
| ledger_index | Number | The ledger index of the ledger that includes this transaction. |
| meta | Object (JSON) | (JSON mode) Transaction metadata, which describes the results of the transaction. |
| meta_blob | String (binary) | (Binary mode) Transaction metadata, which describes the results of the transaction, represented as a hex string. |
| tx_blob | String (binary) | (Binary mode) The transaction data represented as a hex string. |
| tx_json | Object (JSON) | The transaction data represented in JSON. |
| validated | Boolean | If true, this data comes from a validated ledger version; if omitted or set to false, this data is not final. |


`Field`

`ctid`

`date`

`hash`

`inLedger`

`ledger_index`

`ledger_index`

`meta`

`meta_blob`

`tx_blob`

`tx_json`

`validated`

`true`

`false`


### Not Found Response

If the server does not find the transaction, it returns a txnNotFound error, which could mean two things:

`txnNotFound`

- The transaction has not been included in any ledger version, and has not been executed.
- The transaction was included in a ledger version that the server does not have available.

This means that a txnNotFound on its own is not enough to know the final outcome of a transaction.

`txnNotFound`

To further narrow down the possibilities, you can provide a range of ledgers to search using the min_ledger and max_ledger fields in the request. If you provide both of those fields, the txnNotFound response includes the following field:

`min_ledger`

`max_ledger`

`txnNotFound`

| Field | Type | Description |
| --- | --- | --- |
| searched_all | Boolean | (Omitted unless the request provided min_ledger and max_ledger) If true, the server was able to search all of the specified ledger versions, and the transaction was in none of them. If false, the server did not have all of the specified ledger versions available, so it is not sure if one of them might contain the transaction. |


`searched_all`

`min_ledger`

`max_ledger`

`true`

`false`

An example of a txnNotFound response that fully searched a requested range of ledgers:

`txnNotFound`

- WebSocket
- JSON-RPC

```
{
  "error": "txnNotFound",
  "error_code": 29,
  "error_message": "Transaction not found.",
  "id": 1,
  "request": {
    "binary": false,
    "command": "tx",
    "id": 1,
    "max_ledger": 54368673,
    "min_ledger": 54368573,
    "transaction": "E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7"
  },
  "searched_all": true,
  "status": "error",
  "type": "response"
}
```


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- txnNotFound - Either the transaction does not exist, or it was part of an ledger version that rippled does not have available.
- excessiveLgrRange - The min_ledger and max_ledger fields of the request are more than 1000 apart.
- invalidLgrRange - The specified min_ledger is larger than the max_ledger, or one of those parameters is not a valid ledger index.

`invalidParams`

`txnNotFound`

`rippled`

`excessiveLgrRange`

`min_ledger`

`max_ledger`

`invalidLgrRange`

`min_ledger`

`max_ledger`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 1.12.0](https://img.shields.io/badge/New in-rippled 1.12.0-blue.svg)

![New in: rippled 1.12.0](https://img.shields.io/badge/New in-rippled 1.12.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0cd077ab-46a0-4bfb-bafb-2dfbffbf71f1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0cd077ab-46a0-4bfb-bafb-2dfbffbf71f1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=386cc17e-a4d6-4303-96b8-c152d81bb33c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=386cc17e-a4d6-4303-96b8-c152d81bb33c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4d79a672-5e64-421b-8d0b-feb1a219cb53&bo=1&sid=3a4e71609da611f08a2a2daf1d2d3f14&vid=3a4ed2809da611f0801c958ffc62874a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=tx&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&r=&lt=1864&evt=pageLoad&sv=2&cdb=AQAS&rn=909463)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9686bee9-6e0f-4d13-b017-e7bd7a9c060e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9686bee9-6e0f-4d13-b017-e7bd7a9c060e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e56f8459-f822-4497-8020-32afd09e781b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e56f8459-f822-4497-8020-32afd09e781b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ef9d2363-9428-4989-a409-d1b616992ec0&pt=tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Ftx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d7377c9518512adaed0f54d99dacb0b5.1759199773264.1759199773264.1759199773264.1&__hssc=78174987.1.1759199773264&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/Tx.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.12.0](https://github.com/XRPLF/rippled/releases/tag/1.12.0)
- [https://github.com/XRPLF/rippled/releases/tag/1.12.0](https://github.com/XRPLF/rippled/releases/tag/1.12.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d7377c9518512adaed0f54d99dacb0b5.1759199773264.1759199773264.1759199773264.1&__hssc=78174987.1.1759199773264&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:36:23.855Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
