# account_objects
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_objects
Section: N6

## Overview


## Extracted Content
# account_objects

[Source]

The account_objects command returns all ledger entries owned by an account, in their raw ledger format.

`account_objects`

There are other API methods that are specialized for getting certain types of ledger entry, such as the account_lines method for trust lines, or account_offers method for offers. These methods provide a processed view of the data that is more suitable for typical use cases. Use account_objects if you want to get ledger entries of types that don't have a specialized method, or if you want to get the entries in their canonical format.

`account_objects`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_account_objects",
  "command": "account_objects",
  "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
  "ledger_index": "validated",
  "type": "state",
  "deletion_blockers_only": false,
  "limit": 10
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | Yes | Get ledger entries associated with this account. |
| deletion_blockers_only | Boolean | No | If true, only return ledger entries that would block this account from being deleted. The default is false. |
| ledger_hash | Hash | No | The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | Ledger Index | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| limit | Number | No | The maximum number of ledger entries to include in the results. Must be within the inclusive range 10 to 400 on non-admin connections. The default is 200. |
| marker | Marker | No | Value from a previous paginated response. Resume retrieving data where that response left off. |
| type | String | No | Filter results to a specific type of ledger entry. This field accepts canonical names of ledger entry types (case insensitive) or short names. Ledger entry types that can't appear in an owner directory are not allowed. If omitted, return ledger entries of all types. |


`Field`

`account`

`deletion_blockers_only`

`true`

`false`

`ledger_hash`

`ledger_index`

`limit`

`10`

`400`

`200`

`marker`

`type`

NoteThe commandline interface to the account_objects command doesn't accept the type field. Use the json method to send the JSON-RPC format request on the commandline instead.

`account_objects`

`type`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_account_objects",
  "result": {
    "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "account_objects": [
      {
        "Balance": {
          "currency": "ASP",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0"
        },
        "Flags": 65536,
        "HighLimit": {
          "currency": "ASP",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "ASP",
          "issuer": "r3vi7mWxru9rJCxETCyA1CHvzL96eZWx5z",
          "value": "10"
        },
        "LowNode": "0",
        "PreviousTxnID": "BF7555B0F018E3C5E2A3FF9437A1A5092F32903BE246202F988181B9CED0D862",
        "PreviousTxnLgrSeq": 1438879,
        "index": "2243B0B630EA6F7330B654EFA53E27A7609D9484E535AB11B7F946DF3D247CE9"
      },
      {
        "Balance": {
          "currency": "JOE",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0"
        },
        "Flags": 2228224,
        "HighLimit": {
          "currency": "JOE",
          "issuer": "rE6R3DWF9fBD7CyiQciePF9SqK58Ubp8o2",
          "value": "100"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "JOE",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0"
        },
        "LowNode": "0",
        "PreviousTxnID": "8E488B0E939D4DACD62102A5BFA2FDC63679EFCC56F2FDA2FDF45283674BB711",
        "PreviousTxnLgrSeq": 5989200,
        "index": "273BD42DD72E7D84416ED759CEC92DACCD12A4502287E50BECF816233C021ED1"
      },
      {
        "Balance": {
          "currency": "USD",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0"
        },
        "Flags": 131072,
        "HighLimit": {
          "currency": "USD",
          "issuer": "rEhDDUUNxpXgEHVJtC2cjXAgyx5VCFxdMF",
          "value": "1"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "USD",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0"
        },
        "LowNode": "0",
        "PreviousTxnID": "B6B410172C0B65575D89E464AF5B99937CC568822929ABF87DA75CBD11911932",
        "PreviousTxnLgrSeq": 6592159,
        "index": "2CC2B211F6D1159B5CFD07AF8717A9C51C985E2497B2875C192EE87266AB0F81"
      },
      {
        "Balance": {
          "currency": "USD",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "5"
        },
        "Flags": 1114112,
        "HighLimit": {
          "currency": "USD",
          "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
          "value": "0"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "USD",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "5"
        },
        "LowNode": "0",
        "PreviousTxnID": "2A5C5D95880A254A2C57BB5332558205BC33B9F2B38D359A170283CB4CBD080A",
        "PreviousTxnLgrSeq": 39498567,
        "index": "2DECFAC23B77D5AEA6116C15F5C6D4669EBAEE9E7EE050A40FE2B1E47B6A9419"
      },
      {
        "Balance": {
          "currency": "EUR",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0.793598266778297"
        },
        "Flags": 1114112,
        "HighLimit": {
          "currency": "EUR",
          "issuer": "rLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun",
          "value": "0"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "EUR",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "1"
        },
        "LowNode": "0",
        "PreviousTxnID": "E9345D44433EA368CFE1E00D84809C8E695C87FED18859248E13662D46A0EC46",
        "PreviousTxnLgrSeq": 5447146,
        "index": "4513749B30F4AF8DA11F077C448128D6486BF12854B760E4E5808714588AA915"
      },
      {
        "Balance": {
          "currency": "CNY",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0"
        },
        "Flags": 2228224,
        "HighLimit": {
          "currency": "CNY",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "3"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "CNY",
          "issuer": "rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK",
          "value": "0"
        },
        "LowNode": "8",
        "PreviousTxnID": "2FDDC81F4394695B01A47913BEC4281AC9A283CC8F903C14ADEA970F60E57FCF",
        "PreviousTxnLgrSeq": 5949673,
        "index": "578C327DA8944BDE2E10C9BA36AFA2F43E06C8D1E8819FB225D266CBBCFDE5CE"
      },
      {
        "Balance": {
          "currency": "DYM",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "1.336889190631542"
        },
        "Flags": 65536,
        "HighLimit": {
          "currency": "DYM",
          "issuer": "rGwUWgN5BEg3QGNY3RX2HfYowjUTZdid3E",
          "value": "0"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "DYM",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "3"
        },
        "LowNode": "0",
        "PreviousTxnID": "6DA2BD02DFB83FA4DAFC2651860B60071156171E9C021D9E0372A61A477FFBB1",
        "PreviousTxnLgrSeq": 8818732,
        "index": "5A2A5FF12E71AEE57564E624117BBA68DEF78CD564EF6259F92A011693E027C7"
      },
      {
        "Balance": {
          "currency": "BTC",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0"
        },
        "Flags": 131072,
        "HighLimit": {
          "currency": "BTC",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "3"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "BTC",
          "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
          "value": "0"
        },
        "LowNode": "43",
        "PreviousTxnID": "03EDF724397D2DEE70E49D512AECD619E9EA536BE6CFD48ED167AE2596055C9A",
        "PreviousTxnLgrSeq": 8317037,
        "index": "767C12AF647CDF5FEB9019B37018748A79C50EDAF87E8D4C7F39F78AA7CA9765"
      },
      {
        "Balance": {
          "currency": "USD",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "-11.68225001668339"
        },
        "Flags": 131072,
        "HighLimit": {
          "currency": "USD",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "5000"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "USD",
          "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
          "value": "0"
        },
        "LowNode": "4a",
        "PreviousTxnID": "8C55AFC2A2AA42B5CE624AEECDB3ACFDD1E5379D4E5BF74A8460C5E97EF8706B",
        "PreviousTxnLgrSeq": 43251698,
        "index": "826CF5BFD28F3934B518D0BDF3231259CBD3FD0946E3C3CA0C97D2C75D2D1A09"
      },
      {
        "Balance": {
          "currency": "USD",
          "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
          "value": "0"
        },
        "Flags": 2228224,
        "HighLimit": {
          "currency": "USD",
          "issuer": "rE6R3DWF9fBD7CyiQciePF9SqK58Ubp8o2",
          "value": "100"
        },
        "HighNode": "0",
        "LedgerEntryType": "RippleState",
        "LowLimit": {
          "currency": "USD",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0"
        },
        "LowNode": "0",
        "PreviousTxnID": "B1A7405C4A698E6A371E5B02836E779A942936AB754865FE82141E5280F09D1B",
        "PreviousTxnLgrSeq": 5718137,
        "index": "8DF1456AAB7470A760F6A095C156B457FF1038D43E6B11FD8011C2DF714E4FA1"
      }
    ],
    "ledger_hash": "59D7E38286AD80C402EC1533BFE002285E792698EEFA06BD3D5AEAC618B56B0A",
    "ledger_index": 98162008,
    "limit": 10,
    "marker": "F60ADF645E78B69857D2E4AEC8B7742FEABC8431BD8611D099B428C3E816DF93,94A9F05FEF9A153229E2E997E64919FD75AAE2028C8153E8EBDB4440BD3ECBB5|NONFH",
    "validated": true,
    "_nodepref": "nonfh"
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| account | String - Address | The account this request corresponds to. |
| account_objects | Array | Array of ledger entries in this account's owner directory. This includes entries that are owned by this account and entries that are linked to this account but owned by someone else, such as escrows where this account is the destination. Each member is a ledger entry in its raw ledger format. This may contain fewer entries than the maximum specified in the limit field. |
| ledger_hash | String | (May be omitted) The identifying hash of the ledger that was used to generate this response. |
| ledger_index | Number - Ledger Index | (May be omitted) The ledger index of the ledger that was used to generate this response. |
| ledger_current_index | Number - Ledger Index | (May be omitted) The ledger index of the open ledger that was used to generate this response. |
| limit | Number | (May be omitted) The limit that was used in this request, if any. |
| marker | Marker | (May be omitted) Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. Omitted when there are no additional pages after this one. |
| validated | Boolean | (May be omitted) If true, the information in this response comes from a validated ledger version. Otherwise, the information is subject to change. |


`Field`

`account`

`account_objects`

`limit`

`ledger_hash`

`ledger_index`

`ledger_current_index`

`limit`

`marker`

`validated`

`true`

The account_objects array may be empty even if there are additional ledger entries to retrieve. This is especially likely when using type to filter ledger entry types. If the response includes a marker field, there are additional pages of data; if the response does not include a marker, then this is the end of the data. This behavior is a consequence of how the API method iterates through the account's owner directory, and a precaution against requests putting excessive load on the server.

`account_objects`

`type`

`marker`

`marker`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actNotFound - The Address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.

`invalidParams`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5c3dd000-93a2-475e-bdc1-8ecdf8cbe48b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5c3dd000-93a2-475e-bdc1-8ecdf8cbe48b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=45c76bf7-25a4-4a2c-afc4-5a766e23ce17&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=45c76bf7-25a4-4a2c-afc4-5a766e23ce17&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=642a4057-2c84-4fba-908d-e375c8f4a294&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=642a4057-2c84-4fba-908d-e375c8f4a294&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3642215c-ca78-46a2-bac1-de48ffe97d72&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3642215c-ca78-46a2-bac1-de48ffe97d72&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bcddd2f1-c5d6-46db-bc13-678b7e94e344&pt=account_objects&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c566948c-8f68-4756-83d6-2493da5570df&bo=1&sid=6b596af09da511f0aba305475f76dc2d&vid=6b59dda09da511f0931ce596eb0f3170&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_objects&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_objects&r=&lt=3547&evt=pageLoad&sv=2&cdb=AQAS&rn=942998)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_objects#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_objects#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_objects#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_objects#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f1d4be82fc5095b5c9b6838f718b6b44.1759199425273.1759199425273.1759199425273.1&__hssc=78174987.1.1759199425273&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_objects.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/rpc/handlers/AccountObjects.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f1d4be82fc5095b5c9b6838f718b6b44.1759199425273.1759199425273.1759199425273.1&__hssc=78174987.1.1759199425273&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:30:35.480Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
