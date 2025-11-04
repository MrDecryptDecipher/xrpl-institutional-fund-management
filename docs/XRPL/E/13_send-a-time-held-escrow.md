# Send a Time-Held Escrow
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-time-held-escrow
Section: E13

## Overview


## Extracted Content
# Send a Time-Held Escrow

The EscrowCreate transaction type can create an escrow whose only condition for release is that a specific time has passed. To do this, use the FinishAfter field and omit the Condition field.

`FinishAfter`

`Condition`


## 1. Calculate release time

You must specify the time as whole seconds since the Ripple Epoch, which is 946684800 seconds after the UNIX epoch. For example, to release funds at midnight UTC on November 13, 2017:

- JavaScript
- Python 3

```
// JavaScript Date() is natively expressed in milliseconds; convert to seconds
const release_date_unix = Math.floor( new Date("2017-11-13T00:00:00Z") / 1000 );
const release_date_ripple = release_date_unix - 946684800;
console.log(release_date_ripple);
// 563846400
```

WarningIf you use a UNIX time in the FinishAfter field without converting to the equivalent Ripple time first, that sets the unlock time to an extra 30 years in the future!

`FinishAfter`


## 2. Submit EscrowCreate transaction

Sign and submit an EscrowCreate transaction. Set the FinishAfter field of the transaction to the time when the held payment should be released. Omit the Condition field to make time the only condition for releasing the held payment. Set the Destination to the recipient, which may be the same address as the sender. Set the Amount to the total amount of XRP, in drops, to escrow.

`FinishAfter`

`Condition`

`Destination`

`Amount`

Never submit a secret key to a server you do not control. Do not send a secret key unencrypted over the network.

- Websocket
- Javascript
- Python

Request:

```
{
  "id": 2,
  "command": "submit",
  "secret": "s████████████████████████████",
  "tx_json": {
      "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
      "TransactionType": "EscrowCreate",
      "Amount": "10000",
      "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "FinishAfter": 557020800
  }
}
```

Response:

```
{
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "1200012280000000240000000120252133768061400000000000271068400000000000000A732103C3555B7339FFDDB43495A8371A3A87B4C66B67D49D06CB9BA1FDBFEEB57B6E437446304402203C9AA4C21E1A1A7427D41583283E7A513DDBDD967B246CADD3B2705D858A7A8E02201BEA7B923B18910EEB9F306F6DE3B3F53549BBFAD46335B62B4C34A6DCB4A47681143EEB46C355B04EE8D08E8EED00F422895C79EA6A83144B4E9C06F24296074F7BC48F92A97916C6DC5EA9",
    "tx_json": {
      "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
      "Amount": "10000",
      "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "Fee": "10",
      "FinishAfter": 557020800,
      "Flags": 2147483648,
      "Sequence": 1,
      "SigningPubKey": "03C3555B7339FFDDB43495A8371A3A87B4C66B67D49D06CB9BA1FDBFEEB57B6E43",
      "TransactionType": "EscrowCreate",
      "TxnSignature": "304402203C9AA4C21E1A1A7427D41583283E7A513DDBDD967B246CADD3B2705D858A7A8E02201BEA7B923B18910EEB9F306F6DE3B3F53549BBFAD46335B62B4C34A6DCB4A476",
      "hash": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263"
    }
  }
}
```

Take note of the transaction's identifying hash value so you can check its final status when it is included in a validated ledger version.

`hash`


## 3. Wait for validation

On a live network (including Mainnet, Testnet, or Devnet), you can wait 4-7 seconds for the ledger to close automatically.

If you're running rippled in stand-alone mode, use the ledger_accept method to manually close the ledger.

`rippled`


## 4. Confirm that the escrow was created

Use the tx method with the transaction's identifying hash to check its final status. Look for a CreatedNode in the transaction metadata to indicate that it created an Escrow ledger object.

`CreatedNode`

Request:

- Websocket

```
{
  "id": 3,
  "command": "tx",
  "transaction": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263"
}
```

Response:

- Websocket

```
{
  "id": 3,
  "status": "success",
  "type": "response",
  "result": {
    "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "Amount": "10000",
    "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Fee": "10",
    "FinishAfter": 557020800,
    "Flags": 2147483648,
    "Sequence": 1,
    "SigningPubKey": "03C3555B7339FFDDB43495A8371A3A87B4C66B67D49D06CB9BA1FDBFEEB57B6E43",
    "TransactionType": "EscrowCreate",
    "TxnSignature": "304402203C9AA4C21E1A1A7427D41583283E7A513DDBDD967B246CADD3B2705D858A7A8E02201BEA7B923B18910EEB9F306F6DE3B3F53549BBFAD46335B62B4C34A6DCB4A476",
    "date": 557014081,
    "hash": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
    "inLedger": 1828796,
    "ledger_index": 1828796,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousTxnID": "613B28E0890FC975F2CBA3D700F75116F623B1E3FE48CB7CB2EB216EAD6F097D",
            "PreviousTxnLgrSeq": 1799920
          }
        },
        {
          "CreatedNode": {
            "LedgerEntryType": "Escrow",
            "LedgerIndex": "2B9845CB9DF686B9615BF04F3EC66095A334D985E03E71B893B90FCF6D4DC9E6",
            "NewFields": {
              "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "Amount": "10000",
              "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "FinishAfter": 557020800
            }
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "Balance": "9999989990",
              "Flags": 0,
              "OwnerCount": 1,
              "Sequence": 2
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "AE5AB6584A76C37C7382B6880609FC7792D90CDA36FF362AF412EB914C1715D3",
            "PreviousFields": {
              "Balance": "10000000000",
              "OwnerCount": 0,
              "Sequence": 1
            },
            "PreviousTxnID": "F181D45FD094A7417926F791D9DF958B84CE4B7B3D92CC9DDCACB1D5EC59AAAA",
            "PreviousTxnLgrSeq": 1828732
          }
        },
        {
          "CreatedNode": {
            "LedgerEntryType": "DirectoryNode",
            "LedgerIndex": "D623EBEEEE701D4323D0ADA5320AF35EA8CC6520EBBEF69343354CD593DABC88",
            "NewFields": {
              "Owner": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "RootIndex": "D623EBEEEE701D4323D0ADA5320AF35EA8CC6520EBBEF69343354CD593DABC88"
            }
          }
        }
      ],
      "TransactionIndex": 3,
      "TransactionResult": "tesSUCCESS"
    },
    "validated": true
  }
}
```


## 5. Wait for the release time

Held payments with a FinishAfter time cannot be finished until a ledger has already closed with a close_time header field that is later than the Escrow node's FinishAfter time.

`FinishAfter`

`close_time`

`FinishAfter`

You can check the close time of the most recently-validated ledger with the ledger method:

Request:

- Websocket

```
{
  "id": 4,
  "command": "ledger",
  "ledger_index": "validated"
}
```

Response:

- Websocket

```
{
  "id": 4,
  "status": "success",
  "type": "response",
  "result": {
    "ledger": {
      "accepted": true,
      "account_hash": "3B5A8FF5334F94F4D3D09F236F9D1B4C028FCAE30948ACC986D461DDEE1D886B",
      "close_flags": 0,
      "close_time": 557256670,
      "close_time_human": "2017-Aug-28 17:31:10",
      "close_time_resolution": 10,
      "closed": true,
      "hash": "A999223A80174A7CB39D766B625C9E476F24AD2F15860A712CD029EE5ED1C320",
      "ledger_hash": "A999223A80174A7CB39D766B625C9E476F24AD2F15860A712CD029EE5ED1C320",
      "ledger_index": "1908253",
      "parent_close_time": 557256663,
      "parent_hash": "6A70C5336ACFDA05760D827776079F7A544D2361CFD5B21BD55A92AA20477A61",
      "seqNum": "1908253",
      "totalCoins": "99997280690562728",
      "total_coins": "99997280690562728",
      "transaction_hash": "49A51DFB1CAB2F134D93D5D1C5FF55A15B12DA36DAF9F5862B17C47EE966647D"
    },
    "ledger_hash": "A999223A80174A7CB39D766B625C9E476F24AD2F15860A712CD029EE5ED1C320",
    "ledger_index": 1908253,
    "validated": true
  }
}
```


## 6. Submit EscrowFinish transaction

Sign and submit an EscrowFinish transaction to execute the release of the funds after the FinishAfter time has passed. Set the Owner field of the transaction to the Account address from the EscrowCreate transaction, and the OfferSequence to the Sequence number from the EscrowCreate transaction. For an escrow held only by time, omit the Condition and Fulfillment fields.

`FinishAfter`

`Owner`

`Account`

`OfferSequence`

`Sequence`

`Condition`

`Fulfillment`

The EscrowFinish transaction is necessary because the XRP Ledger's state can only be modified by transactions. The sender of this transaction may be the recipient of the escrow, the original sender of the escrow, or any other XRP Ledger address.

If the escrow has expired, you can only cancel the escrow instead.

Never submit a secret key to a server you do not control. Do not send a secret key unencrypted over the network.

- Websocket
- Javascript
- Python

Request:

```
{
  "id": 5,
  "command": "submit",
  "secret": "s████████████████████████████",
  "tx_json": {
    "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "TransactionType": "EscrowFinish",
    "Owner": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "OfferSequence": 1
  }
}
```

Response:

```
{
  "id": 21,
  "status": "success",
  "type": "response",
  "result": {
    "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "Fee": "10",
    "Flags": 2147483648,
    "OfferSequence": 1,
    "Owner": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "Sequence": 2,
    "SigningPubKey": "03C3555B7339FFDDB43495A8371A3A87B4C66B67D49D06CB9BA1FDBFEEB57B6E43",
    "TransactionType": "EscrowFinish",
    "TxnSignature": "3045022100923B91BA4FD6450813F5335D71C64BA9EB81304A86859A631F2AD8571424A46502200CCE660D36781B84634C5F23619EB6CFCCF942709F54DCCF27CF6F499AE78C9B",
    "date": 557256681,
    "hash": "41856A742B3CAF307E7B4D0B850F302101F0F415B785454F7501E9960A2A1F6B",
    "inLedger": 1908257,
    "ledger_index": 1908257,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "Balance": "400210000",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 1
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousFields": {
              "Balance": "400200000"
            },
            "PreviousTxnID": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
            "PreviousTxnLgrSeq": 1828796
          }
        },
        {
          "DeletedNode": {
            "FinalFields": {
              "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "Amount": "10000",
              "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "FinishAfter": 557020800,
              "Flags": 0,
              "OwnerNode": "0000000000000000",
              "PreviousTxnID": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
              "PreviousTxnLgrSeq": 1828796
            },
            "LedgerEntryType": "Escrow",
            "LedgerIndex": "2B9845CB9DF686B9615BF04F3EC66095A334D985E03E71B893B90FCF6D4DC9E6"
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "Balance": "9999989980",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 3
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "AE5AB6584A76C37C7382B6880609FC7792D90CDA36FF362AF412EB914C1715D3",
            "PreviousFields": {
              "Balance": "9999989990",
              "OwnerCount": 1,
              "Sequence": 2
            },
            "PreviousTxnID": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
            "PreviousTxnLgrSeq": 1828796
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Flags": 0,
              "Owner": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "RootIndex": "D623EBEEEE701D4323D0ADA5320AF35EA8CC6520EBBEF69343354CD593DABC88"
            },
            "LedgerEntryType": "DirectoryNode",
            "LedgerIndex": "D623EBEEEE701D4323D0ADA5320AF35EA8CC6520EBBEF69343354CD593DABC88"
          }
        }
      ],
      "TransactionIndex": 2,
      "TransactionResult": "tesSUCCESS"
    },
    "validated": true
  }
}
```

Take note of the transaction's identifying hash value so you can check its final status when it is included in a validated ledger version.

`hash`


## 7. Wait for validation

On a live network (including Mainnet, Testnet, or Devnet), you can wait 4-7 seconds for the ledger to close automatically.

If you're running rippled in stand-alone mode, use the ledger_accept method to manually close the ledger.

`rippled`


## 8. Confirm final result

Use the tx method with the EscrowFinish transaction's identifying hash to check its final status. In particular, look in the transaction metadata for a ModifiedNode of type AccountRoot for the destination of the escrowed payment. The FinalFields of the object should show the increase in XRP in the Balance field.

`ModifiedNode`

`AccountRoot`

`FinalFields`

`Balance`

Request:

- Websocket

```
{
  "id": 21,
  "command": "tx",
  "transaction": "41856A742B3CAF307E7B4D0B850F302101F0F415B785454F7501E9960A2A1F6B"
}
```

Response:

- Websocket

```
{
  "id": 21,
  "status": "success",
  "type": "response",
  "result": {
    "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "Fee": "10",
    "Flags": 2147483648,
    "OfferSequence": 1,
    "Owner": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
    "Sequence": 2,
    "SigningPubKey": "03C3555B7339FFDDB43495A8371A3A87B4C66B67D49D06CB9BA1FDBFEEB57B6E43",
    "TransactionType": "EscrowFinish",
    "TxnSignature": "3045022100923B91BA4FD6450813F5335D71C64BA9EB81304A86859A631F2AD8571424A46502200CCE660D36781B84634C5F23619EB6CFCCF942709F54DCCF27CF6F499AE78C9B",
    "date": 557256681,
    "hash": "41856A742B3CAF307E7B4D0B850F302101F0F415B785454F7501E9960A2A1F6B",
    "inLedger": 1908257,
    "ledger_index": 1908257,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "Balance": "400210000",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 1
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousFields": {
              "Balance": "400200000"
            },
            "PreviousTxnID": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
            "PreviousTxnLgrSeq": 1828796
          }
        },
        {
          "DeletedNode": {
            "FinalFields": {
              "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "Amount": "10000",
              "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "FinishAfter": 557020800,
              "Flags": 0,
              "OwnerNode": "0000000000000000",
              "PreviousTxnID": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
              "PreviousTxnLgrSeq": 1828796
            },
            "LedgerEntryType": "Escrow",
            "LedgerIndex": "2B9845CB9DF686B9615BF04F3EC66095A334D985E03E71B893B90FCF6D4DC9E6"
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "Balance": "9999989980",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 3
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "AE5AB6584A76C37C7382B6880609FC7792D90CDA36FF362AF412EB914C1715D3",
            "PreviousFields": {
              "Balance": "9999989990",
              "OwnerCount": 1,
              "Sequence": 2
            },
            "PreviousTxnID": "55B2057332F8999208C43BA1E7091B423A16E5ED2736C06300B4076085205263",
            "PreviousTxnLgrSeq": 1828796
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Flags": 0,
              "Owner": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
              "RootIndex": "D623EBEEEE701D4323D0ADA5320AF35EA8CC6520EBBEF69343354CD593DABC88"
            },
            "LedgerEntryType": "DirectoryNode",
            "LedgerIndex": "D623EBEEEE701D4323D0ADA5320AF35EA8CC6520EBBEF69343354CD593DABC88"
          }
        }
      ],
      "TransactionIndex": 2,
      "TransactionResult": "tesSUCCESS"
    },
    "validated": true
  }
}
```


## See Also

- Concepts:What is XRP?Payment TypesEscrow
- What is XRP?
- Payment TypesEscrow
- Escrow
- Tutorials:Send XRPLook Up Transaction ResultsReliable Transaction Submission
- Send XRP
- Look Up Transaction Results
- Reliable Transaction Submission
- References:EscrowCancel transactionEscrowCreate transactionEscrowFinish transactionaccount_objects methodtx methodEscrow ledger object
- EscrowCancel transaction
- EscrowCreate transaction
- EscrowFinish transaction
- account_objects method
- tx method
- Escrow ledger object

- What is XRP?
- Payment TypesEscrow
- Escrow

- Escrow

- Send XRP
- Look Up Transaction Results
- Reliable Transaction Submission

- EscrowCancel transaction
- EscrowCreate transaction
- EscrowFinish transaction
- account_objects method
- tx method
- Escrow ledger object

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=72072f69-df79-4d28-8ce6-92e210af47e4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=72072f69-df79-4d28-8ce6-92e210af47e4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8fedfd5a-e55a-444c-abfa-8f1c1b43a70a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8fedfd5a-e55a-444c-abfa-8f1c1b43a70a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=397e10f7-8c8d-4a57-be27-e5f90aaa2eb3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=397e10f7-8c8d-4a57-be27-e5f90aaa2eb3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8dd3cfd3-7791-4ad4-b260-71c24b5070a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8dd3cfd3-7791-4ad4-b260-71c24b5070a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=34f9cdeb-be88-4ef8-a3e5-af9fea4528e2&pt=Send%20a%20Time-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=07520610-7095-4ade-8b3f-487c76dc08c0&bo=1&sid=0af219b09d9e11f0a7f9a58b1ecc8e82&vid=0af289609d9e11f0b5a16df6bb5f97ee&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Send%20a%20Time-Held%20Escrow&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-time-held-escrow&r=&lt=3479&evt=pageLoad&sv=2&cdb=AQAS&rn=814131)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-time-held-escrow#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-time-held-escrow#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-time-held-escrow#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-time-held-escrow#)
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
- [Public Servers](https://xrpl.org/docs/tutorials/public-servers)
- [JavaScript](https://xrpl.org/docs/tutorials/javascript)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.fc0e1036c00eb07d4abe33793c020f9d.1759196256295.1759196256295.1759196256295.1&__hssc=78174987.1.1759196256295&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-time-held-escrow.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.fc0e1036c00eb07d4abe33793c020f9d.1759196256295.1759196256295.1759196256295.1&__hssc=78174987.1.1759196256295&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:37:51.331Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
