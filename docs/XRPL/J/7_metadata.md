# Transaction Metadata
URL: https://xrpl.org/docs/references/protocol/transactions/metadata
Section: J7

## Overview


## Extracted Content
# Transaction Metadata

Transaction metadata is a section of data that gets added to a transaction after it is processed. Any transaction that gets included in a ledger has metadata, regardless of whether it is successful. The transaction metadata describes the outcome of the transaction in detail.

WarningThe changes described in transaction metadata are only final if the transaction is in a validated ledger version.

Some fields that may appear in transaction metadata include:

| Field | Value | Description |
| --- | --- | --- |
| AffectedNodes | Array | List of ledger entries that were created, deleted, or modified by this transaction, and specific changes to each. |
| DeliveredAmount | Currency Amount | (May be omitted) For a partial payment, this field records the amount of currency actually delivered to the destination. To avoid errors when reading transactions, instead use the delivered_amount field, which is provided for all Payment transactions, partial or not. |
| TransactionIndex | Unsigned Integer | The transaction's position within the ledger that included it. This is zero-indexed. (For example, the value 2 means it was the 3rd transaction in that ledger.) |
| TransactionResult | String | A result code indicating whether the transaction succeeded or how it failed. |
| delivered_amount | Currency Amount | (Omitted for non-Payment transactions) The amount of currency actually received by the Destination account. Use this field to determine how much was delivered, regardless of whether the transaction is a partial payment. See this description for details. |


`AffectedNodes`

`DeliveredAmount`

`delivered_amount`

`TransactionIndex`

`2`

`TransactionResult`

`delivered_amount`

`Destination`


## Example Metadata

The following JSON object shows the metadata for an order, trading XRP for USD:

```
"meta": {
  "AffectedNodes": [
    {
      "ModifiedNode": {
        "FinalFields": {
          "Account": "rBTwLga3i2gz3doX6Gva3MgEV8ZCD8jjah",
          "Balance": "27724423128",
          "Flags": 0,
          "OwnerCount": 14,
          "Sequence": 129693478
        },
        "LedgerEntryType": "AccountRoot",
        "LedgerIndex": "1ED8DDFD80F275CB1CE7F18BB9D906655DE8029805D8B95FB9020B30425821EB",
        "PreviousFields": {
          "Balance": "27719423228",
          "Sequence": 129693477
        },
        "PreviousTxnID": "3110F983CDC090750B45C9BFB74B8CE629CA80F57C35612402B2760153822BA5",
        "PreviousTxnLgrSeq": 86724072
      }
    },
    {
      "DeletedNode": {
        "FinalFields": {
          "Account": "rPx6Rbh8fStXeP3LwECBisownN2ZyMyzYS",
          "BookDirectory": "DFA3B6DDAB58C7E8E5D944E736DA4B7046C30E4F460FD9DE4E1566CBCC208000",
          "BookNode": "0",
          "Flags": 0,
          "OwnerNode": "0",
          "PreviousTxnID": "DCB061EC44BBF73BBC20CE0432E9D8D7C4B8B28ABA8AE5A5BA687476E7A796EF",
          "PreviousTxnLgrSeq": 86724050,
          "Sequence": 86586865,
          "TakerGets": "0",
          "TakerPays": {
            "currency": "USD",
            "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
            "value": "0"
          }
        },
        "LedgerEntryType": "Offer",
        "LedgerIndex": "348AF66EBD872FBF2BD23085D3FB4A200E15509451475027C4A5EE8D8B77C623",
        "PreviousFields": {
          "TakerGets": "5000000",
          "TakerPays": {
            "currency": "USD",
            "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
            "value": "3.012"
          }
        }
      }
    },
    {
      "ModifiedNode": {
        "FinalFields": {
          "Flags": 0,
          "Owner": "rPx6Rbh8fStXeP3LwECBisownN2ZyMyzYS",
          "RootIndex": "4A68E363398C8DA470CF85237CA4A044476CD38BA7D5C9B8E8F19417A13B01C1"
        },
        "LedgerEntryType": "DirectoryNode",
        "LedgerIndex": "4A68E363398C8DA470CF85237CA4A044476CD38BA7D5C9B8E8F19417A13B01C1"
      }
    },
    {
     "ModifiedNode": {
        "FinalFields": {
          "Balance": {
            "currency": "USD",
            "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
            "value": "-3.0120000001701"
          },
          "Flags": 2228224,
          "HighLimit": {
            "currency": "USD",
            "issuer": "rPx6Rbh8fStXeP3LwECBisownN2ZyMyzYS",
            "value": "0"
          },
          "HighNode": "0",
          "LowLimit": {
            "currency": "USD",
            "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
            "value": "0"
          },
          "LowNode": "bd5"
        },
        "LedgerEntryType": "RippleState",
        "LedgerIndex": "7345788A2C9121EB8168D2755950887CED3887CCDBC882015BC070A61C2AD1DA",
        "PreviousFields": {
          "Balance": {
            "currency": "USD",
            "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
            "value": "-0.0000000001701"
          }
        },
        "PreviousTxnID": "B4726FC087FAB3DB3578A34095B96F9055075A86A16CE741B406D91202685998",
        "PreviousTxnLgrSeq": 86722015
      }
    },
    {
      "ModifiedNode": {
        "FinalFields": {
          "Balance": {
            "currency": "USD",
            "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
            "value": "-52157.74818800332"
          },
          "Flags": 2228224,
          "HighLimit": {
            "currency": "USD",
            "issuer": "rBTwLga3i2gz3doX6Gva3MgEV8ZCD8jjah",
            "value": "1000000000"
          },
          "HighNode": "0",
          "LowLimit": {
            "currency": "USD",
            "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
            "value": "0"
          },
          "LowNode": "b29"
        },
        "LedgerEntryType": "RippleState",
        "LedgerIndex": "8250CE37F6495903C1F7D16E072E8823ECE06FA73F011A0F8D79D5626BF581BB",
        "PreviousFields": {
          "Balance": {
            "currency": "USD",
            "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
            "value": "-52160.76470600332"
          }
        },
        "PreviousTxnID": "B4726FC087FAB3DB3578A34095B96F9055075A86A16CE741B406D91202685998",
        "PreviousTxnLgrSeq": 86722015
      }
    },
    {
      "ModifiedNode": {
        "FinalFields": {
          "Account": "rPx6Rbh8fStXeP3LwECBisownN2ZyMyzYS",
          "Balance": "52479871",
          "Flags": 0,
          "OwnerCount": 2,
         "Sequence": 86586866
        },
        "LedgerEntryType": "AccountRoot",
        "LedgerIndex": "9D398F1DEA77448C78196D6B01289A13D32DFCB4F9023A2A06338F893FA85521",
        "PreviousFields": {
          "Balance": "57479871",
          "OwnerCount": 3
        },
        "PreviousTxnID": "DCB061EC44BBF73BBC20CE0432E9D8D7C4B8B28ABA8AE5A5BA687476E7A796EF",
        "PreviousTxnLgrSeq": 86724050
      }
    },
    {
      "DeletedNode": {
        "FinalFields": {
          "ExchangeRate": "4e1566cbcc208000",
          "Flags": 0,
          "RootIndex": "DFA3B6DDAB58C7E8E5D944E736DA4B7046C30E4F460FD9DE4E1566CBCC208000",
          "TakerGetsCurrency": "0000000000000000000000000000000000000000",
          "TakerGetsIssuer": "0000000000000000000000000000000000000000",
          "TakerPaysCurrency": "0000000000000000000000005553440000000000",
          "TakerPaysIssuer": "0A20B3C85F482532A9578DBB3950B85CA06594D1"
        },
        "LedgerEntryType": "DirectoryNode",
        "LedgerIndex": "DFA3B6DDAB58C7E8E5D944E736DA4B7046C30E4F460FD9DE4E1566CBCC208000"
      }
    }
  ],
  "TransactionIndex": 5,
  "TransactionResult": "tesSUCCESS"
}
```


## AffectedNodes

The AffectedNodes array contains a complete list of the ledger entries that this transaction modified in some way. Each item in this array is an object with one top-level field indicating what happened:

`AffectedNodes`

- CreatedNode indicates that the transaction created a new ledger entry.
- DeletedNode indicates that the transaction removed a ledger entry
- ModifiedNode indicates that the transaction modified an existing ledger entry.

`CreatedNode`

`DeletedNode`

`ModifiedNode`

The value of each of these fields is a JSON object describing the changes made to the ledger entry.


### CreatedNode Fields

A CreatedNode object contains the following fields:

`CreatedNode`

| Field | Value | Description |
| --- | --- | --- |
| LedgerEntryType | String | The type of ledger entry that was created. |
| LedgerIndex | String - Hash | The ID of this ledger entry in the ledger's state tree. Note: This is not the same as a ledger index, even though the field name is very similar. |
| NewFields | Object | The content fields of the newly created ledger entry. Which fields are present depends on what type of ledger entry was created. |


`LedgerEntryType`

`LedgerIndex`

`NewFields`


### DeletedNode Fields

A DeletedNode object contains the following fields:

`DeletedNode`

| Field | Value | Description |
| --- | --- | --- |
| LedgerEntryType | String | The type of ledger entry that was deleted. |
| LedgerIndex | String - Hash | The ID of this ledger entry in the ledger's state tree. Note: This is not the same as a ledger index, even though the field name is very similar. |
| FinalFields | Object | The content fields of the ledger entry immediately before it was deleted. Which fields are present depends on what type of ledger entry was created. |
| PreviousFields | Object | (May be omitted) Selected fields of the ledger entry before it was deleted. Which fields are present depends on what type of ledger entry was created. |


`LedgerEntryType`

`LedgerIndex`

`FinalFields`

`PreviousFields`


### ModifiedNode Fields

A ModifiedNode object contains the following fields:

`ModifiedNode`

| Field | Value | Description |
| --- | --- | --- |
| LedgerEntryType | String | The type of ledger entry that was modified. |
| LedgerIndex | String - Hash | The ID of this ledger entry in the ledger's state tree. Note: This is not the same as a ledger index, even though the field name is very similar. |
| FinalFields | Object | The content fields of the ledger entry after applying any changes from this transaction. Which fields are present depends on what type of ledger entry was created. This omits the PreviousTxnID and PreviousTxnLgrSeq fields, even though most types of ledger entries have them. |
| PreviousFields | Object | The previous values for all fields of the object that were changed as a result of this transaction. If the transaction only added fields to the object, this field is an empty object. |
| PreviousTxnID | String - Hash | (May be omitted) The identifying hash of the previous transaction to modify this ledger entry. Omitted for ledger entry types that do not have a PreviousTxnID field. |
| PreviousTxnLgrSeq | Number - Ledger Index | (May be omitted)  The Ledger Index of the ledger version containing the previous transaction to modify this ledger entry. Omitted for ledger entry types that do not have a PreviousTxnLgrSeq field. |


`LedgerEntryType`

`LedgerIndex`

`FinalFields`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`PreviousFields`

`PreviousTxnID`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`PreviousTxnLgrSeq`

NoteIf the modified ledger entry has PreviousTxnID and PreviousTxnLgrSeq fields, the transaction always updates them with the transaction's own identifying hash and the index of the ledger version that included the transaction, but these fields' new value is not listed in the FinalFields of the ModifiedNode object, and their previous values are listed at the top level of the ModifiedNode object rather than in the nested PreviousFields object.

`PreviousTxnID`

`PreviousTxnLgrSeq`

`FinalFields`

`ModifiedNode`

`ModifiedNode`

`PreviousFields`


## NFT Fields

Transactions (tx and account_tx) involving NFTs can contain the following fields in the metadata. These values are added by the Clio server at request time and are not stored in the hashed binary metadata:

`tx`

`account_tx`

| Field | Value | Description |
| --- | --- | --- |
| nftoken_id | String | Shows the NFTokenID for the NFToken that changed on the ledger as a result of the transaction. Only present if the transaction is NFTokenMint or NFTokenAcceptOffer. See NFTokenID. |
| nftoken_ids | Array | Shows all the NFTokenIDs for the NFTokens that changed on the ledger as a result of the transaction. Only present if the transaction is NFTokenCancelOffer. |
| offer_id | String | Shows the OfferIDof a new NFTokenOffer in a response from a NFTokenCreateOffer transaction. |


`nftoken_id`

`NFTokenID`

`NFToken`

`NFTokenMint`

`NFTokenAcceptOffer`

`nftoken_ids`

`NFTokenIDs`

`NFTokens`

`NFTokenCancelOffer`

`offer_id`

`OfferID`

`NFTokenOffer`

`NFTokenCreateOffer`


## MPT Fields

(Requires the MPTokensV1 amendment )


### Synthetic mpt_issuance_id field

MPTokenIssuanceID is an identifier that allows you to specify an MPTokenIssuance in RPCs. The server adds a synthetically parsed mpt_issuance_id field to API responses to avoid the need for client-side parsing of the MPTokenIssuanceID.

`MPTokenIssuanceID`

`MPTokenIssuance`

`mpt_issuance_id`

`MPTokenIssuanceID`


### Transaction Metadata

An mpt_issuance_id field is provided in JSON transaction metadata (not available for binary) for all successful MPTokenIssuanceCreate transactions. The following APIs are impacted: tx, account_tx, subscribe and ledger.

`mpt_issuance_id`

`MPTokenIssuanceCreate`

`tx`

`account_tx`

`subscribe`

`ledger`


## delivered_amount

The Amount of a Payment transaction indicates the amount to deliver to the Destination, so if the transaction was successful, then the destination received that much -- except if the transaction was a partial payment. (In that case, any positive amount up to Amount might have arrived.) Rather than choosing whether or not to trust the Amount field, you should use the delivered_amount field of the metadata to see how much actually reached its destination.

`Amount`

`Destination`

`Amount`

`Amount`

`delivered_amount`

The rippled server provides a delivered_amount field in JSON transaction metadata for all successful Payment transactions. This field is formatted like a normal currency amount. However, the delivered amount is not available for transactions that meet both of the following criteria:

`rippled`

`delivered_amount`

- Is a partial payment
- Included in a validated ledger before 2014-01-20

If both conditions are true, then delivered_amount contains the string value unavailable instead of an actual amount. If this happens, you can only figure out the actual delivered amount by reading the AffectedNodes in the transaction's metadata.

`delivered_amount`

`unavailable`

`AffectedNodes`

NoteThe delivered_amount field is generated on-demand for the request, and is not included in the binary format for transaction metadata, nor is it used when calculating the hash of the transaction metadata. In contrast, the DeliveredAmount field is included in the binary format for partial payment transactions after 2014-01-20.

`delivered_amount`

`DeliveredAmount`

See also: Partial Payments

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=702963d6-f293-43c8-9383-653d52a6c085&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=702963d6-f293-43c8-9383-653d52a6c085&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d13ceeee-f3da-4c05-b110-32707239a012&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d13ceeee-f3da-4c05-b110-32707239a012&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dec44741-734b-486f-995e-d0b70bcdeeb0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dec44741-734b-486f-995e-d0b70bcdeeb0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e774a112-d104-4902-a684-8696fb293802&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e774a112-d104-4902-a684-8696fb293802&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1222d06b-fefc-4520-bea2-054ffaa9dbb5&pt=Transaction%20Metadata&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=d017fd5d-4b30-4fef-886d-076a9d8070f7&bo=1&sid=880f10609da411f0849a09da314c65fc&vid=880f91809da411f09be0c94be533afa5&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Transaction%20Metadata&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fmetadata&r=&lt=3008&evt=pageLoad&sv=2&cdb=AQAS&rn=8787)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/metadata#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/metadata#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/metadata#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/metadata#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/metadata.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:24:15.811Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
