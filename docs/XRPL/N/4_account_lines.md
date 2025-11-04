# account_lines
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_lines
Section: N4

## Overview


## Extracted Content
# account_lines

[Source]

The account_lines method returns information about an account's trust lines, which contain balances in all non-XRP currencies and assets. All information retrieved is relative to a particular version of the ledger.

`account_lines`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_account_lines",
  "command": "account_lines",
  "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
  "api_version": 2
}
```

The request accepts the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | Yes | Look up trust lines connected to this account, from this account's perspective. |
| ignore_default | Boolean | No | If true, don't return trust lines where this account's side is in the default state. The default is false. |
| ledger_hash | String - Hash | No | The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | Ledger Index | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| limit | Number | No | Limit the number of trust lines to retrieve. The server may return less than the specified limit, even if there are more pages of results. Must be within the inclusive range 10 to 400.  Positive values outside this range are replaced with the closest valid option. The default is 200. |
| marker | Marker | No | Value from a previous paginated response. Resume retrieving data where that response left off. |
| peer | String - Address | No | A second account; if provided, filter results to trust lines connecting the two accounts. |
| locked_balance | Object | No | The total amount locked in payment channels or escrow. |
| lock_count | Number | No | the total number of lock balances on a RippleState ledger object. |


`account`

`ignore_default`

`true`

`false`

`ledger_hash`

`ledger_index`

`limit`

`marker`

`peer`

`locked_balance`

`lock_count`

The following parameters are deprecated and may be removed without further notice: ledger and peer_index.

`ledger`

`peer_index`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "api_version": 2,
  "id": "example_account_lines",
  "result": {
    "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "ledger_current_index": 95348097,
    "lines": [
      {
        "account": "r3vi7mWxru9rJCxETCyA1CHvzL96eZWx5z",
        "balance": "0",
        "currency": "ASP",
        "limit": "0",
        "limit_peer": "10",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "r3vi7mWxru9rJCxETCyA1CHvzL96eZWx5z",
        "balance": "0",
        "currency": "XAU",
        "limit": "0",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": true,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
        "balance": "5",
        "currency": "USD",
        "limit": "5",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rHpXfibHgSb64n8kK9QWDpdbfqSpYbM9a4",
        "balance": "481.992867407479",
        "currency": "MXN",
        "limit": "1000",
        "limit_peer": "0",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun",
        "balance": "0.793598266778297",
        "currency": "EUR",
        "limit": "1",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK",
        "balance": "0",
        "currency": "CNY",
        "limit": "3",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rGwUWgN5BEg3QGNY3RX2HfYowjUTZdid3E",
        "balance": "1.336889190631542",
        "currency": "DYM",
        "limit": "3",
        "limit_peer": "0",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        "balance": "0.3488146605801446",
        "currency": "CHF",
        "limit": "0",
        "limit_peer": "0",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        "balance": "0",
        "currency": "BTC",
        "limit": "3",
        "limit_peer": "0",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        "balance": "11.68225001668339",
        "currency": "USD",
        "limit": "5000",
        "limit_peer": "0",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rpgKWEmNqSDAGFhy5WDnsyPqfQxbWxKeVd",
        "balance": "-0.00111",
        "currency": "BTC",
        "limit": "0",
        "limit_peer": "10",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rBJ3YjwXi2MGbg7GVLuTXUWQ8DjL7tDXh4",
        "balance": "-0.0008744482690504699",
        "currency": "BTC",
        "limit": "0",
        "limit_peer": "10",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun",
        "balance": "0",
        "currency": "USD",
        "limit": "1",
        "limit_peer": "0",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA",
        "balance": "9.07619790068559",
        "currency": "CNY",
        "limit": "100",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        "balance": "7.292695098901099",
        "currency": "JPY",
        "limit": "0",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "r3vi7mWxru9rJCxETCyA1CHvzL96eZWx5z",
        "balance": "0",
        "currency": "AUX",
        "limit": "0",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": true,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "r9vbV3EHvXWjSkeQ6CAcYVPGeq7TuiXY2X",
        "balance": "0.0004557360418801623",
        "currency": "USD",
        "limit": "1",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        "balance": "12.41688780720394",
        "currency": "EUR",
        "limit": "100",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rfF3PNkwkq1DygW2wum2HK3RGfgkJjdPVD",
        "balance": "35",
        "currency": "USD",
        "limit": "500",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rwUVoVMSURqNyvocPCcvLu3ygJzZyw8qwp",
        "balance": "-5",
        "currency": "JOE",
        "limit": "0",
        "limit_peer": "50",
        "no_ripple": false,
        "no_ripple_peer": true,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rE6R3DWF9fBD7CyiQciePF9SqK58Ubp8o2",
        "balance": "0",
        "currency": "USD",
        "limit": "0",
        "limit_peer": "100",
        "no_ripple": false,
        "no_ripple_peer": true,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rE6R3DWF9fBD7CyiQciePF9SqK58Ubp8o2",
        "balance": "0",
        "currency": "JOE",
        "limit": "0",
        "limit_peer": "100",
        "no_ripple": false,
        "no_ripple_peer": true,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rs9M85karFkCRjvc6KMWn8Coigm9cbcgcx",
        "balance": "0",
        "currency": "015841551A748AD2C1F76FF6ECB0CCCD00000000",
        "limit": "10.01037626125837",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      },
      {
        "account": "rEhDDUUNxpXgEHVJtC2cjXAgyx5VCFxdMF",
        "balance": "0",
        "currency": "USD",
        "limit": "0",
        "limit_peer": "1",
        "no_ripple": false,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      }
    ],
    "validated": false,
    "_nodepref": "nonfh"
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the address of the account and an array of trust line objects. Specifically, the result object contains the following fields:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String | Yes | Unique Address of the account this request corresponds to. This is the "perspective account" for purpose of the trust lines. |
| lines | Array | Yes | Array of trust line objects, as described below. If the number of trust lines is large, only returns up to the limit at a time. |
| ledger_current_index | Ledger Index | No | The ledger index that was used when retrieving this data. This field is only provided when using an open ledger version. |
| ledger_index | Ledger Index | No | The ledger index that was used when retrieving this data. This field is only provided when using a closed ledger version. |
| ledger_hash | String - Hash | No | The identifying hash the ledger version that was used when retrieving this data. This field is only provided when using a closed ledger version. |
| marker | Marker | No | Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. Omitted when there are no additional pages after this one. |
| limit | Number | No | The maximum number of trust lines retrieved. The server may return fewer than the specified limit, even if more results are available. If no limit was specified in the request, use a default limit of 200. |


`account`

`lines`

`limit`

`ledger_current_index`

`ledger_index`

`ledger_hash`

`marker`

`limit`

Each trust line object has some combination of the following fields:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | Yes | The counterparty to this trust line. |
| balance | String Number | Yes | Representation of the numeric balance currently held against this line. A positive balance means that the perspective account holds value; a negative balance means that the perspective account owes value. |
| currency | String - Currency Code | Yes | The currency code of the token this trust line can hold. |
| limit | String Number | Yes | The maximum amount of the given currency that this account is willing to owe the peer account |
| limit_peer | String Number | Yes | The maximum amount of currency that the counterparty account is willing to owe the perspective account |
| quality_in | Number | Yes | Rate at which the account values incoming balances on this trust line, as a ratio of this value per 1 billion units. (For example, a value of 500 million represents a 0.5:1 ratio.) As a special case, 0 is treated as a 1:1 ratio. |
| quality_out | Number | Yes | Rate at which the account values outgoing balances on this trust line, as a ratio of this value per 1 billion units. (For example, a value of 500 million represents a 0.5:1 ratio.) As a special case, 0 is treated as a 1:1 ratio. |
| no_ripple | Boolean | No | If true, this account has enabled the No Ripple flag for this trust line. If present and false, this account has disabled the No Ripple flag, but, because the account also has the Default Ripple flag disabled, that is not considered the default state. If omitted, the account has the No Ripple flag disabled for this trust line and Default Ripple enabled. |
| no_ripple_peer | Boolean | No | If true, the peer account has enabled the No Ripple flag for this trust line. If present and false, this account has disabled the No Ripple flag, but, because the account also has the Default Ripple flag disabled, that is not considered the default state. If omitted, the account has the No Ripple flag disabled for this trust line and Default Ripple enabled. |
| authorized | Boolean | No | If true, the perspective account has authorized this trust line. The default is false. |
| peer_authorized | Boolean | No | If true, the counterparty has authorized this trust line. The default is false. |
| freeze | Boolean | No | If true, the perspective account has frozen this trust line. The default is false. |
| freeze_peer | Boolean | No | If true, the counterparty has frozen this trust line. The default is false. |


`account`

`balance`

`currency`

`limit`

`limit_peer`

`quality_in`

`quality_out`

`no_ripple`

`true`

`false`

`no_ripple_peer`

`true`

`false`

`authorized`

`true`

`false`

`peer_authorized`

`true`

`false`

`freeze`

`true`

`false`

`freeze_peer`

`true`

`false`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actNotFound - The Address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.
- actMalformed - If the marker field provided is not acceptable.

`invalidParams`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

`actMalformed`

`marker`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=870bd0da-18a1-478d-a9f4-14947b610de1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=870bd0da-18a1-478d-a9f4-14947b610de1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a5ed83d1-4c6d-4e1f-8345-885204403a03&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a5ed83d1-4c6d-4e1f-8345-885204403a03&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ae96578b-2fd1-4b8b-a28a-7b82110d86bf&bo=1&sid=51c301909da511f0a2f7b33555fe4ec6&vid=51c360e09da511f0a9e68186e2379a0e&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_lines&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&r=&lt=3856&evt=pageLoad&sv=2&cdb=AQAS&rn=107657)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bf4267a2-04c7-437c-9682-b1d9ea0393e9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bf4267a2-04c7-437c-9682-b1d9ea0393e9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=90da90c0-3da9-4cff-8395-550ed14f8c4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=90da90c0-3da9-4cff-8395-550ed14f8c4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=8e0e2575-140b-4b35-87a3-30209b2f4dfe&pt=account_lines&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_lines&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_lines#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_lines#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_lines#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_lines#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1006dde3a1ffa1c9ede649529ae55394.1759199381327.1759199381327.1759199381327.1&__hssc=78174987.1.1759199381327&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_lines.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/rpc/handlers/AccountLines.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.1006dde3a1ffa1c9ede649529ae55394.1759199381327.1759199381327.1759199381327.1&__hssc=78174987.1.1759199381327&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:29:54.032Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
