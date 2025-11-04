# simulate
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/simulate
Section: P1

## Overview


## Extracted Content
# simulate

[Source]

The simulate method executes a dry run of any transaction type, enabling you to preview the results and metadata of a transaction without committing them to the XRP Ledger. Since this command never submits a transaction to the network, it doesn't incur any fees.

`simulate`

The simulate method isn't guaranteed to be the same when you actually submit a transaction because the ledger state--which affects how a transaction is processed--can change between the transaction simulation and submission.

`simulate`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC

```
{
    "id": 2,
    "command": "simulate",
    "tx_json" : {
        "TransactionType" : "Payment",
        "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "Destination" : "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
        "Amount" : {
            "currency" : "USD",
            "value" : "1",
            "issuer" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
        }
    }
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| tx_blob | String | Yes | The transaction to simulate, in binary format. If you include this field, do not also include tx_json. |
| tx_json | Object | Yes | The transaction to simulate, in JSON format. If you include this field, do not also include tx_blob. |
| binary | Boolean | No | The default value is false, which returns data and metadata in JSON format. If true, returns data and metadata in binary format, serialized to a hexadecimal string. |


`tx_blob`

`tx_json`

`tx_json`

`tx_blob`

`binary`

`false`

`true`

- The simulated transaction must be unsigned.
- If the Fee, Sequence, SigningPubKey, or NetworkID fields are provided, they will be used in the transaction. Otherwise, the server will autofill them.

`Fee`

`Sequence`

`SigningPubKey`

`NetworkID`


## Response Format

An example of a successful response:

```
{
  "id": 2,
  "result": {
    "applied": false,
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The simulated transaction would have been applied.",
    "ledger_index": 3,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "AccountTxnID": "4D5D90890F8D49519E4151938601EF3D0B30B16CD6A519D9C99102C9FA77F7E0",
              "Balance": "75159663",
              "Flags": 9043968,
              "OwnerCount": 5,
              "Sequence": 361,
              "TransferRate": 1004999999
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousFields": {
              "AccountTxnID": "2B44EBE00728D04658E597A85EC4F71D20503B31ABBF556764AD8F7A80BA72F6",
              "Balance": "75169663",
              "Sequence": 360
            },
            "PreviousTxnID": "2B44EBE00728D04658E597A85EC4F71D20503B31ABBF556764AD8F7A80BA72F6",
            "PreviousTxnLgrSeq": 18555460
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "12.0301"
              },
              "Flags": 65536,
              "HighLimit": {
                "currency": "USD",
                "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
                "value": "0"
              },
              "HighNode": "0",
              "LowLimit": {
                "currency": "USD",
                "issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
                "value": "100"
              },
              "LowNode": "0"
            },
            "LedgerEntryType": "RippleState",
            "LedgerIndex": "96D2F43BA7AE7193EC59E5E7DDB26A9D786AB1F7C580E030E7D2FF5233DA01E9",
            "PreviousFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "11.0301"
              }
            },
            "PreviousTxnID": "7FFE02667225DFE39594663DEDC823FAF188AC5F036A9C2CA3259FB5379C82B4",
            "PreviousTxnLgrSeq": 9787698
          }
        }
      ],
      "TransactionIndex": 0,
      "TransactionResult": "tesSUCCESS",
      "delivered_amount": {
        "currency": "USD",
        "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "value": "1"
      }
    },
    "tx_json": {
      "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "DeliverMax": {
        "currency": "USD",
        "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "value": "1"
      },
      "Destination": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "Fee": "10",
      "Sequence": 360,
      "TransactionType": "Payment"
    }
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| tx_json | Object | The transaction that was simulated, including auto-filled values. Included if binary was false. |
| tx_blob | String | The serialized transaction that was simulated, including auto-filled values. Included if binary was true. |
| ledger_index | Ledger Index | The ledger index of the ledger that would have included this transaction. |
| meta | Object | Transaction metadata, which describes the results of the transaction. Not included if the transaction fails with a code that means it wouldn’t be included in the ledger (such as a non-TEC code). Included if binary was false. |
| meta_blob | String | Transaction metadata, which describes the results of the transaction. Not included if the transaction fails with a code that means it wouldn’t be included in the ledger (such as a non-TEC code). Included if binary was true. |


`tx_json`

`binary`

`false`

`tx_blob`

`binary`

`true`

`ledger_index`

`meta`

`binary`

`false`

`meta_blob`

`binary`

`true`


## Possible Errors

- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- transactionSigned - The transaction was signed. The simulated transaction must be unsigned.

`invalidParams`

`transactionSigned`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0c8af100-c9b5-41e6-a4b3-dbd8b787e6b3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0c8af100-c9b5-41e6-a4b3-dbd8b787e6b3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=624dc744-69db-4c78-a1fa-7b580df668cf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=624dc744-69db-4c78-a1fa-7b580df668cf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=08a48619-4c50-421f-b9f4-eda95986d00c&bo=1&sid=08db9b509da611f09183b1d24b19f220&vid=08dc19b09da611f08ebd3732651f3382&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=simulate&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&r=&lt=2533&evt=pageLoad&sv=2&cdb=AQAS&rn=554212)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8e9ca4c9-550f-41e7-a080-46d376967334&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8e9ca4c9-550f-41e7-a080-46d376967334&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=deb79176-f380-4745-b770-9945d249fce2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=deb79176-f380-4745-b770-9945d249fce2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=16282b2b-2cb9-4704-826b-be94c285905e&pt=simulate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Ftransaction-methods%2Fsimulate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/simulate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/simulate#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/simulate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/simulate#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d6b0916e0999adfbe0ac23ca07b5a1d8.1759199688749.1759199688749.1759199688749.1&__hssc=78174987.1.1759199688749&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/transaction-methods/simulate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/rpc/handlers/Simulate.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.d6b0916e0999adfbe0ac23ca07b5a1d8.1759199688749.1759199688749.1759199688749.1&__hssc=78174987.1.1759199688749&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:34:58.219Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
