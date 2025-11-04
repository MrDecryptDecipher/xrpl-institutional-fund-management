# account_tx
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx
Section: N8

## Overview


## Extracted Content
# account_tx

[Source]

The account_tx method retrieves a list of validated transactions that involve a given account.

`account_tx`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "command": "account_tx",
  "account": "rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w",
  "ledger_index_min": -1,
  "ledger_index_max": -1,
  "binary": false,
  "limit": 2,
  "forward": false,
  "api_version": 2
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| account | String | A unique identifier for the account, most commonly the account's address. |
| tx_type | String | (Optional) Clio Only Return only transactions of a specific type, such as "Clawback", "AccountSet", "AccountDelete", et al. Case-insensitive. See Transaction Types. New in: Clio v2.0 AMM support since: Clio v2.1.0 |
| ledger_index_min | Integer | (Optional) Use to specify the earliest ledger to include transactions from. A value of -1 instructs the server to use the earliest validated ledger version available. |
| ledger_index_max | Integer | (Optional) Use to specify the most recent ledger to include transactions from. A value of -1 instructs the server to use the most recent validated ledger version available. |
| ledger_hash | String | (Optional) Use to look for transactions from a single ledger only. (See Specifying Ledgers.) |
| ledger_index | String or Unsigned Integer | (Optional) Use to look for transactions from a single ledger only. (See Specifying Ledgers.) |
| binary | Boolean | (Optional) Defaults to false. If set to true, returns transactions as hex strings instead of JSON. |
| forward | Boolean | (Optional) Defaults to false. If set to true, returns values indexed with the oldest ledger first. Otherwise, the results are indexed with the newest ledger first. (Each page of results may not be internally ordered, but the pages are overall ordered.) |
| limit | Integer | (Optional) Default varies. Limit the number of transactions to retrieve. The server is not required to honor this value. |
| marker | Marker | Value from a previous paginated response. Resume retrieving data where that response left off. This value is stable even if there is a change in the server's range of available ledgers. |


`Field`

`account`

`tx_type`

`ledger_index_min`

`-1`

`ledger_index_max`

`-1`

`ledger_hash`

`ledger_index`

`binary`

`false`

`true`

`forward`

`false`

`true`

`limit`

`marker`

- API v2: If you specify either ledger_index or ledger_hash, including ledger_index_min and ledger_index_max returns an invalidParams error.

`ledger_index`

`ledger_hash`

`ledger_index_min`

`ledger_index_max`

`invalidParams`


### Iterating over queried data

As with other paginated methods, you can use the marker field to return multiple pages of data.

`marker`

In the time between requests, "ledger_index_min": -1 and "ledger_index_max": -1 may change to refer to different ledger versions than they did before. The marker field can safely paginate even if there are changes in the ledger range from the request, so long as the marker does not indicate a point outside the range of ledgers specified in the request.

`"ledger_index_min": -1`

`"ledger_index_max": -1`

`marker`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "result": {
    "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "ledger_index_min": 32570,
    "ledger_index_max": 91824401,
    "transactions": [
      {
        "meta": {
          "AffectedNodes": [
            {
              "ModifiedNode": {
                "FinalFields": {
                  "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
                  "AccountTxnID": "932CC7E9BAC1F7B9FA5381679F293EEC0A646E5E7F2F6D14C85FEE2102F0E66C",
                  "Balance": "1086222646",
                  "Domain": "6D64756F31332E636F6D",
                  "EmailHash": "98B4375E1D753E5B91627516F6D70977",
                  "Flags": 9568256,
                  "MessageKey": "0000000000000000000000070000000300",
                  "OwnerCount": 17,
                  "RegularKey": "rD9iJmieYHn8jTtPjwwkW2Wm9sVDvPXLoJ",
                  "Sequence": 393,
                  "TicketCount": 5,
                  "TransferRate": 4294967295
                },
                "LedgerEntryType": "AccountRoot",
                "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
                "PreviousFields": {
                  "Balance": "1086222601"
                },
                "PreviousTxnID": "7E50969CDEF8E12B1AD26E64B338935813624A4D1CDDC4C9457832524F0FF74C",
                "PreviousTxnLgrSeq": 89353048
              }
            },
            {
              "ModifiedNode": {
                "FinalFields": {
                  "Account": "rPJARH5nLWQisdmvDAbvzwS7N32Z1kusTZ",
                  "Balance": "55022190",
                  "Flags": 0,
                  "OwnerCount": 0,
                  "Sequence": 89113341
                },
                "LedgerEntryType": "AccountRoot",
                "LedgerIndex": "C0363F86E070B70E7DA129736C3B05E509261C8668F61A7E958C4C10F17EAB90",
                "PreviousFields": {
                  "Balance": "55022245",
                  "Sequence": 89113340
                },
                "PreviousTxnID": "60D0FE881F9B1457FB1711011C6E490C22532B1D495557D6488BE3A634167CEE",
                "PreviousTxnLgrSeq": 90136515
              }
            }
          ],
          "TransactionIndex": 2,
          "TransactionResult": "tesSUCCESS",
          "delivered_amount": "45"
        },
        "tx_json": {
          "Account": "rPJARH5nLWQisdmvDAbvzwS7N32Z1kusTZ",
          "DeliverMax": "45",
          "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
          "DestinationTag": 316562,
          "Fee": "10",
          "Sequence": 89113340,
          "SigningPubKey": "EDE21591E615E1D77C8C8A7F95372D001B3DF090AB47B99729CFCBC1E4E07D35F4",
          "TransactionType": "Payment",
          "TxnSignature": "D229FEB6ED82367102AC12DE5045BE6D548CBB52E0CB8F037A23171910A6158FA3377F5118B6CEAFDB07D6D43F76FE29CC26BE1ACBC7A86C9D86E14043C66104",
          "ledger_index": 90136515,
          "date": 777284672
        },
        "ledger_index": 90136515,
        "hash": "894541402AC968C98C329A88D097170B14BF4DEB8B2A7DF377EE89DDD332E018",
        "ledger_hash": "14110F60753176E1F6A71AA084B6AD8663CBB46193CCFCDFAC02561626AA6B75",
        "close_time_iso": "2024-08-18T08:24:32Z",
        "validated": true
      },
      {
        "meta": {
          "AffectedNodes": [
            {
              "ModifiedNode": {
                "FinalFields": {
                  "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
                  "AccountTxnID": "932CC7E9BAC1F7B9FA5381679F293EEC0A646E5E7F2F6D14C85FEE2102F0E66C",
                  "Balance": "1086222601",
                  "Domain": "6D64756F31332E636F6D",
                  "EmailHash": "98B4375E1D753E5B91627516F6D70977",
                  "Flags": 9568256,
                  "MessageKey": "0000000000000000000000070000000300",
                  "OwnerCount": 17,
                  "RegularKey": "rD9iJmieYHn8jTtPjwwkW2Wm9sVDvPXLoJ",
                  "Sequence": 393,
                  "TicketCount": 5,
                  "TransferRate": 4294967295
                },
                "LedgerEntryType": "AccountRoot",
                "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
                "PreviousFields": {
                  "Balance": "1086222552"
                },
                "PreviousTxnID": "EED9EB1880B951FAB3EE0DBBEB67B7ABEE3FA77F15782B6BD40342B3C23CFB75",
                "PreviousTxnLgrSeq": 89343389
              }
            },
            {
              "ModifiedNode": {
                "FinalFields": {
                  "Account": "rPSDqHdMPsnkmyUX4BvBkY8rycQYwrhUqw",
                  "Balance": "52611432",
                  "Flags": 0,
                  "OwnerCount": 0,
                  "Sequence": 89196186
                },
                "LedgerEntryType": "AccountRoot",
                "LedgerIndex": "20761D2C37004C70318F7A3C5A1C35817A90A0AE56485F6E3281FB2B3F05B0C9",
                "PreviousFields": {
                  "Balance": "52611491",
                  "Sequence": 89196185
                },
                "PreviousTxnID": "BAF86C2776C08407E0FAF42D374874E10430CB8C23AD464D9D9097EA326ABE92",
                "PreviousTxnLgrSeq": 89353024
              }
            }
          ],
          "TransactionIndex": 4,
          "TransactionResult": "tesSUCCESS",
          "delivered_amount": "49"
        },
        "tx_json": {
          "Account": "rPSDqHdMPsnkmyUX4BvBkY8rycQYwrhUqw",
          "DeliverMax": "49",
          "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
          "DestinationTag": 342662134,
          "Fee": "10",
          "Sequence": 89196185,
          "SigningPubKey": "ED7E4A2970ADFCCE93D59D469322745E98CBEB3D7D5388728B3BB2268E71F30B0F",
          "TransactionType": "Payment",
          "TxnSignature": "8CE14FD18BD186694DED8C204C3FCC2A527CC24AD51C2E0B2B792D035C85D662BC1A1450A8DF04BBEC66821B362056311127C627056AC7779B385517FD3A9202",
          "ledger_index": 89353048,
          "date": 774249571
        },
        "ledger_index": 89353048,
        "hash": "7E50969CDEF8E12B1AD26E64B338935813624A4D1CDDC4C9457832524F0FF74C",
        "ledger_hash": "ED54DA98F3E495C36C2B0D9A511565E04454A1F4503B9DEE3FD39301D7625865",
        "close_time_iso": "2024-07-14T05:19:31Z",
        "validated": true
      }
    ],
    "validated": true,
    "marker": {
      "ledger": 89353048,
      "seq": 4
    },
    "limit": 2
  },
  "api_version": 2,
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

- API v2
- API v1

| Field | Type | Description |
| --- | --- | --- |
| account | String | Unique Address identifying the related account |
| ledger_index_min | Integer - Ledger Index | The ledger index of the earliest ledger actually searched for transactions. |
| ledger_index_max | Integer - Ledger Index | The ledger index of the most recent ledger actually searched for transactions. |
| limit | Integer | The limit value used in the request. (This may differ from the actual limit value enforced by the server.) |
| marker | Marker | Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. |
| transactions | Array | Array of transactions matching the request's criteria, as explained below. |
| validated | Boolean | If included and set to true, the information in this response comes from a validated ledger version. Otherwise, the information is subject to change. |


`Field`

`account`

`ledger_index_min`

`ledger_index_max`

`limit`

`limit`

`marker`

`transactions`

`validated`

`true`

NoteThe server may respond with different values of ledger_index_min and ledger_index_max than you provided in the request, for example if it did not have the versions you specified on hand.

`ledger_index_min`

`ledger_index_max`

Each transaction object includes the following fields, depending on whether it was requested in JSON or hex string ("binary":true) format.

`"binary":true`

| Field | Type | Description |
| --- | --- | --- |
| close_time_iso | String | The ledger close time represented in ISO 8601 time format. |
| hash | String | The unique hash identifier of the transaction. |
| ledger_hash | String | A hex string of the ledger version that included this transaction. |
| ledger_index | Integer | The ledger index of the ledger version that included this transaction. |
| tx_json | Object (JSON) | (JSON mode) JSON object defining the transaction. |
| tx_blob | String (Binary) | (Binary mode) A unique hex string defining the transaction. |
| meta | Object (JSON) | (JSON mode) The transaction results metadata in JSON. |
| meta_blob | String (Binary) | (Binary mode) The transaction results metadata as a hex string. |
| validated | Boolean | Whether or not the transaction is included in a validated ledger. Any transaction not yet in a validated ledger is subject to change. |


`Field`

`close_time_iso`

`hash`

`ledger_hash`

`ledger_index`

`tx_json`

`tx_blob`

`meta`

`meta_blob`

`validated`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing. In API v1, you won't receive this error if you specify:ledger_index_min or ledger_index_max, but also try to specify ledger_index or ledger_hash.A non-boolean value for the binary or forward fields.
- ledger_index_min or ledger_index_max, but also try to specify ledger_index or ledger_hash.
- A non-boolean value for the binary or forward fields.
- actMalformed - The Address specified in the account field of the request is not formatted properly.
- lgrIdxMalformed - The ledger specified by the ledger_index_min or ledger_index_max does not exist, or if it does exist the server does not have it. In API v1, you won't receive this error if you specify a ledger_index_min or ledger_index_max value beyond the range of ledgers that the server has.
- lgrIdxsInvalid - Either the request specifies a ledger_index_max that is before the ledger_index_min, or the server does not have a validated ledger range because it is not synced with the network.

`invalidParams`

- ledger_index_min or ledger_index_max, but also try to specify ledger_index or ledger_hash.
- A non-boolean value for the binary or forward fields.

`ledger_index_min`

`ledger_index_max`

`ledger_index`

`ledger_hash`

`binary`

`forward`

`actMalformed`

`account`

`lgrIdxMalformed`

`ledger_index_min`

`ledger_index_max`

`ledger_index_min`

`ledger_index_max`

`lgrIdxsInvalid`

`ledger_index_max`

`ledger_index_min`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=745f3271-6eb2-4a31-a293-33d0784ca120&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=745f3271-6eb2-4a31-a293-33d0784ca120&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0fd033b-90b6-4ae8-9426-bb853d544b10&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0fd033b-90b6-4ae8-9426-bb853d544b10&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=51f073f1-2730-4ae3-9db9-aa361457fbcb&bo=1&sid=840db2d09da511f0b4d833b3aeb9ec08&vid=840e33509da511f0a8bf952ac635f403&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_tx&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&r=&lt=2965&evt=pageLoad&sv=2&cdb=AQAS&rn=657032)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1ce35d7c-2289-48a7-bf28-0404e7229db7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1ce35d7c-2289-48a7-bf28-0404e7229db7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5aab43cf-8bc6-4d1d-b9cc-4ed1334a5620&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5aab43cf-8bc6-4d1d-b9cc-4ed1334a5620&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=41f5a433-c755-44d5-8464-caca8853f256&pt=account_tx&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_tx&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/AccountTx.cpp)
- [New in: Clio v2.0](https://github.com/XRPLF/clio/releases/tag/2.0.0)
- [AMM support since: Clio v2.1.0](https://github.com/XRPLF/clio/releases/tag/2.1.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:31:19.999Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
