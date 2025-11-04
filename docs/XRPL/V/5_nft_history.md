# nft_history
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nft_history
Section: V5

## Overview


## Extracted Content
# nft_history

[Source]

The nft_history command asks the Clio server for past transaction metadata for the NFT being queried.

`nft_history`

Notenft_history returns only successful transactions associated with the NFT.

`nft_history`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC

```
{
  "id": 1,
  "command": "nft_history",
  "nft_id": "00080000B4F4AFC5FBCBD76873F18006173D2193467D3EE70000099B00000000"
}
```

The request contains the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| nft_id | String | A unique identifier for the non-fungible token (NFT). |
| ledger_index_min | Integer | (Optional) Use to specify the earliest ledger from which to include NFTs. A value of -1 instructs the server to use the earliest validated ledger version available. |
| ledger_index_max | Integer | (Optional) Use to specify the most recent ledger to include NFTs from. A value of -1 instructs the server to use the most recent validated ledger version available. |
| ledger_hash | String | (Optional) The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | String or Unsigned Integer | (Optional) The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically.  Do not specify the ledger_index as closed or current; doing so forwards the request to the P2P rippled server and the nft_history API is not available on rippled. (See Specifying Ledgers) |
| binary | Boolean | (Optional) Defaults to false. If set to true, returns transactions as hex strings instead of JSON. |
| forward | Boolean | (Optional) Defaults to false. If set to true, returns values indexed with the oldest ledger first. Otherwise, the results are indexed with the newest ledger first. (Each page of results might not be internally ordered, but the pages are ordered overall.) |
| limit | UInt32 | (Optional) Limit the number of NFTs to retrieve. The server is not required to honor this value. |
| marker | Marker | Value from a previous paginated response. Resume retrieving data where that response left off. This value is NOT stable if there is a change in the server's range of available ledgers. If you are querying the “validated” ledger, it is possible that new NFTs are created during your paging. |


`Field`

`nft_id`

`ledger_index_min`

`-1`

`ledger_index_max`

`-1`

`ledger_hash`

`ledger_index`

`ledger_index`

`closed`

`current`

`rippled`

`nft_history`

`rippled`

`binary`

`false`

`true`

`forward`

`false`

`true`

`limit`

`marker`

NoteIf you do not specify a ledger version, Clio uses the latest validated ledger.


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC

```
{
  "id": 0,
  "type": "response",
  "result": {
    "ledger_index_min": 21377274,
    "ledger_index_max": 27876163,
    "transactions": [
      {
        "meta": {
          "AffectedNodes": [
            {
              "CreatedNode": {
                "LedgerEntryType": "NFTokenPage",
                "LedgerIndex": "97707A94B298B50334C39FB46E245D4744C0F5B5FFFFFFFFFFFFFFFFFFFFFFFF",
                "NewFields": {
                  "NFTokens": [
                    {
                      "NFToken": {
                        "NFTokenID": "0008271097707A94B298B50334C39FB46E245D4744C0F5B50000099B00000000",
                        "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469"
                      }
                    }
                  ]
                }
              }
            },
            {
              "ModifiedNode": {
                "FinalFields": {
                  "Account": "rNoj836fhDm1eXaHHefPKs7iDb4gwzS7nc",
                  "Balance": "999999988",
                  "Flags": 0,
                  "MintedNFTokens": 1,
                  "OwnerCount": 1,
                  "Sequence": 27876155
                },
                "LedgerEntryType": "AccountRoot",
                "LedgerIndex": "AC0A2AD29B67B5E6DA1C5DE696440F59BCD8DEA0A4CF7AFD683D1489AAB1ED24",
                "PreviousFields": {
                  "Balance": "1000000000",
                  "OwnerCount": 0,
                  "Sequence": 27876154
                },
                "PreviousTxnID": "B483F0F7100658380E42BCF1B15AD59B71C4082635AD53B78D08A5198BBB6939",
                "PreviousTxnLgrSeq": 27876154
              }
            }
          ],
          "TransactionIndex": 0,
          "TransactionResult": "tesSUCCESS"
        },
        "tx": {
          "Account": "rNoj836fhDm1eXaHHefPKs7iDb4gwzS7nc",
          "Fee": "12",
          "Flags": 8,
          "LastLedgerSequence": 27876176,
          "NFTokenTaxon": 0,
          "Sequence": 27876154,
          "SigningPubKey": "EDDC20C6791F9FB13AFDCE2C717BE8779DD451BB556243F1FDBAA3CD159D68A9F6",
          "TransactionType": "NFTokenMint",
          "TransferFee": 10000,
          "TxnSignature": "EF657AB47E86FDC112BA054D90587DFE64A61604D9EDABAA7B01B61B56433E3C2AC5BF5AD2E8F5D2A9EAC22778F289094AC383A3F172B2304157A533E0C79802",
          "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469",
          "hash": "E0774E1B8628E397C6E88F67D4424E55E4C81324607B19318255310A6FBAA4A2",
          "ledger_index": 27876158,
          "date": 735167200
        },
        "validated": true
      }
    ],
    "nft_id": "0008271097707A94B298B50334C39FB46E245D4744C0F5B50000099B00000000",
    "validated": true
  },
  "warnings": [
    {
      "id": 2001,
      "message": "This is a clio server. clio only serves validated data. If you want to talk to rippled, include 'ledger_index':'current' in your request"
    }
  ]
}
```

With the binary parameter set to true, you receive a compact response that uses hex strings. It's not human readable, but much more concise.

`binary`

- WebSocket
- JSON-RPC

```
{
  "id": 0,
  "type": "response",
  "result": {
    "ledger_index_min": 21377274,
    "ledger_index_max": 27876275,
    "transactions": [
      {
        "meta": "201C00000000F8E31100505697707A94B298B50334C39FB46E245D4744C0F5B5FFFFFFFFFFFFFFFFFFFFFFFFE8FAEC5A0008271097707A94B298B50334C39FB46E245D4744C0F5B50000099B000000007542697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469E1F1E1E1E51100612501A95B3A55B483F0F7100658380E42BCF1B15AD59B71C4082635AD53B78D08A5198BBB693956AC0A2AD29B67B5E6DA1C5DE696440F59BCD8DEA0A4CF7AFD683D1489AAB1ED24E62401A95B3A2D0000000062400000003B9ACA00E1E722000000002401A95B3B2D00000001202B0000000162400000003B9AC9F4811497707A94B298B50334C39FB46E245D4744C0F5B5E1E1F1031000",
        "tx_blob": "12001914271022000000082401A95B3A201B01A95B50202A0000000068400000000000000C7321EDDC20C6791F9FB13AFDCE2C717BE8779DD451BB556243F1FDBAA3CD159D68A9F67440EF657AB47E86FDC112BA054D90587DFE64A61604D9EDABAA7B01B61B56433E3C2AC5BF5AD2E8F5D2A9EAC22778F289094AC383A3F172B2304157A533E0C798027542697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469811497707A94B298B50334C39FB46E245D4744C0F5B5",
        "ledger_index": 27876158,
        "date": 735167200,
        "validated": true
      }
    ],
    "nft_id": "0008271097707A94B298B50334C39FB46E245D4744C0F5B50000099B00000000",
    "validated": true
  },
  "warnings": [
    {
      "id": 2001,
      "message": "This is a clio server. clio only serves validated data. If you want to talk to rippled, include 'ledger_index':'current' in your request"
    }
  ]
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| nft_id | String | A unique identifier for the non-fungible token (NFT). |
| ledger_index_min | Integer - Ledger Index | The ledger index of the earliest ledger actually searched for transactions. |
| ledger_index_max | Integer - Ledger Index | The ledger index of the most recent ledger actually searched for transactions. |
| limit | Integer | The limit value used in the request. (This may differ from the actual limit value enforced by the server.) |
| marker | Marker | Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off. |
| transactions | Array | Array of transactions matching the request's criteria, as explained below. |
| validated | Boolean | If included and set to true, the information in this response comes from a validated ledger version. Otherwise, the information is subject to change. |


`Field`

`nft_id`

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
| ledger_index | Integer | The ledger index of the ledger version that included this transaction. |
| meta | Object (JSON) or String (Binary) | If binary is True, then this is a hex string of the transaction metadata. Otherwise, the transaction metadata is included in JSON format. |
| tx | Object | (JSON mode only) JSON object defining the transaction |
| tx_blob | String | (Binary mode only) Unique hashed String representing the transaction. |
| validated | Boolean | Whether or not the transaction is included in a validated ledger. Any transaction not yet in a validated ledger is subject to change. |


`Field`

`ledger_index`

`meta`

`binary`

`tx`

`tx_blob`

`validated`

For definitions of the fields returned in the tx object, see Transaction Metadata.

`tx`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actMalformed - The Address specified in the account field of the request is not formatted properly.
- lgrIdxMalformed - The ledger specified by the ledger_index_min or ledger_index_max does not exist, or if it does exist but the server does not have it.
- lgrIdxsInvalid - Either the request specifies a ledger_index_max that is before the ledger_index_min, or the server does not have a validated ledger range because it is not synced with the network.

`invalidParams`

`actMalformed`

`account`

`lgrIdxMalformed`

`ledger_index_min`

`ledger_index_max`

`lgrIdxsInvalid`

`ledger_index_max`

`ledger_index_min`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: Clio v1.1.0](https://img.shields.io/badge/New in-Clio v1.1.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e91df4bd-78b8-49b2-8770-d75c99594f44&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e91df4bd-78b8-49b2-8770-d75c99594f44&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=df2bb60c-b100-4003-a160-e15779590a4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=df2bb60c-b100-4003-a160-e15779590a4d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ebb842f4-60e1-436d-a810-1688d339848b&bo=1&sid=cdb956c09da711f080fc31b82b4d8b56&vid=cdb9a4e09da711f0bc2171bae74aa2b1&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=nft_history&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&r=&lt=2757&evt=pageLoad&sv=2&cdb=AQAS&rn=754094)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=15216bc4-ff95-4bd9-9c65-2c4d5e1f9656&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=15216bc4-ff95-4bd9-9c65-2c4d5e1f9656&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=781eecf6-fb5a-4e30-baca-71949d3cde89&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=781eecf6-fb5a-4e30-baca-71949d3cde89&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=13ed53b9-9719-4903-8787-15b92dd976aa&pt=nft_history&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fclio-methods%2Fnft_history&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nft_history#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nft_history#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nft_history#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/clio-methods/nft_history#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/clio-methods/nft_history.md)
- [[Source]](https://github.com/XRPLF/clio/blob/develop/src/rpc/handlers/NFTHistory.cpp)
- [https://github.com/XRPLF/clio/releases/tag/1.1.0](https://github.com/XRPLF/clio/releases/tag/1.1.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:47:42.718Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
