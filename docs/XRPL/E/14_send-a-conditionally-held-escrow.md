# Send a Conditionally-Held Escrow
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-conditionally-held-escrow
Section: E14

## Overview


## Extracted Content
# Send a Conditionally-Held Escrow


## 1. Generate condition and fulfillment

XRP Ledger escrows require PREIMAGE-SHA-256 crypto-conditions. To calculate a condition and fulfillment in the proper format, you should use a crypto-conditions library such as five-bells-condition. To generate the fulfillment:

- Use a cryptographically secure source of randomness to generate at least 32 random bytes.
- Follow Interledger Protocol's PSK specification and use an HMAC-SHA-256 of the ILP packet as the fulfillment.

Example code for a random fulfillment and condition:

- JavaScript
- Python

```
const cc = require('five-bells-condition')
const crypto = require('crypto')

const preimageData = crypto.randomBytes(32)
const fulfillment = new cc.PreimageSha256()
fulfillment.setPreimage(preimageData)

const condition = fulfillment.getConditionBinary().toString('hex').toUpperCase()
console.log('Condition:', condition)

// Keep secret until you want to finish the escrow
const fulfillment_hex = fulfillment.serializeBinary().toString('hex').toUpperCase()
console.log('Fulfillment:', fulfillment_hex)
```

Save the condition and the fulfillment for later. Be sure to keep the fulfillment secret until you want to finish executing the held payment. Anyone who knows the fulfillment can finish the escrow, releasing the held funds to their intended destination.


## 2. Calculate release or cancel time

A Conditional Escrow transaction must contain either a CancelAfter or FinishAfter field, or both. The CancelAfter field lets the XRP revert to the sender if the condition is not fulfilled before the specified time. The FinishAfter field specifies a time before which the escrow cannot execute, even if someone sends the correct fulfillment. Whichever field you provide, the time it specifies must be in the future.

`Escrow`

`CancelAfter`

`FinishAfter`

`CancelAfter`

`FinishAfter`

Example for setting a CancelAfter time of 24 hours in the future:

`CancelAfter`

- JavaScript
- Python 2/3

```
const rippleOffset = 946684800
const CancelAfter = Math.floor(Date.now() / 1000) + (24*60*60) - rippleOffset
console.log(CancelAfter)
// Example: 556927412
```

WarningIn the XRP Ledger, you must specify time as seconds since the Ripple Epoch. If you use a UNIX time in the CancelAfter or FinishAfter field without converting it, that sets the unlock time to an extra 30 years in the future!

`CancelAfter`

`FinishAfter`


## 3. Submit EscrowCreate transaction

Sign and submit an EscrowCreate transaction. Set the Condition field of the transaction to the time when the held payment should be released. Set the Destination to the recipient, which can be the same address as the sender. Include the CancelAfter or FinishAfter time you calculated in the previous step. Set the Amount to the total amount of XRP, in drops, to escrow.

`Condition`

`Destination`

`CancelAfter`

`FinishAfter`

`Amount`

Never submit a secret key to a server you do not control. Do not send a secret key unencrypted over the network.

- Websocket
- Javascript
- Python

Request:

```
{
  "id": 1,
  "command": "submit",
  "secret": "s████████████████████████████",
  "tx_json": {
    "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
    "TransactionType": "EscrowCreate",
    "Amount": "100000",
    "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
    "CancelAfter": 556927412
  }
}
```

Response:

```
{
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "120001228000000024000000052024213209B46140000000000186A068400000000000000A732103E498E35BC1E109C5995BD3AB0A6D4FFAB61B853C8F6010FABC5DABAF34478B61744730450221008AC8BDC2151D5EF956197F0E6E89A4F49DEADC1AC38367870E444B1EA8D88D97022075E31427B455DFF87F0F22B849C71FC3987A91C19D63B6D0242E808347EC8A8F701127A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD81012081149A2AA667E1517EFA8A6B552AB2EDB859A99F26B283144B4E9C06F24296074F7BC48F92A97916C6DC5EA9",
    "tx_json": {
      "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
      "Amount": "100000",
      "CancelAfter": 556927412,
      "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
      "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 5,
      "SigningPubKey": "03E498E35BC1E109C5995BD3AB0A6D4FFAB61B853C8F6010FABC5DABAF34478B61",
      "TransactionType": "EscrowCreate",
      "TxnSignature": "30450221008AC8BDC2151D5EF956197F0E6E89A4F49DEADC1AC38367870E444B1EA8D88D97022075E31427B455DFF87F0F22B849C71FC3987A91C19D63B6D0242E808347EC8A8F",
      "hash": "E22D1F6EB006CAD35E0DBD3B4F3748427055E4C143EBE95AA6603823AEEAD324"
    }
  }
}
```


## 4. Wait for validation

On a live network (including Mainnet, Testnet, or Devnet), you can wait 4-7 seconds for the ledger to close automatically.

If you're running rippled in stand-alone mode, use the ledger_accept method to manually close the ledger.

`rippled`


## 5. Confirm that the escrow was created

Use the tx method with the transaction's identifying hash to check its final status. In particular, look for a CreatedNode in the transaction metadata to indicate that it created an Escrow ledger object.

`CreatedNode`

Request:

- Websocket

```
{
  "id": 3,
  "command": "tx",
  "transaction": "E22D1F6EB006CAD35E0DBD3B4F3748427055E4C143EBE95AA6603823AEEAD324"
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
    "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
    "Amount": "100000",
    "CancelAfter": 556927412,
    "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
    "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Fee": "10",
    "Flags": 2147483648,
    "Sequence": 5,
    "SigningPubKey": "03E498E35BC1E109C5995BD3AB0A6D4FFAB61B853C8F6010FABC5DABAF34478B61",
    "TransactionType": "EscrowCreate",
    "TxnSignature": "30450221008AC8BDC2151D5EF956197F0E6E89A4F49DEADC1AC38367870E444B1EA8D88D97022075E31427B455DFF87F0F22B849C71FC3987A91C19D63B6D0242E808347EC8A8F",
    "date": 556841101,
    "hash": "E22D1F6EB006CAD35E0DBD3B4F3748427055E4C143EBE95AA6603823AEEAD324",
    "inLedger": 1772019,
    "ledger_index": 1772019,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousTxnID": "52C4F626FE6F33699B6BE8ADF362836DDCE9B0B1294BFAA15D65D61501350BE6",
            "PreviousTxnLgrSeq": 1771204
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Flags": 0,
              "Owner": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
              "RootIndex": "4B4EBB6D8563075813D47491CC325865DFD3DC2E94889F0F39D59D9C059DD81F"
            },
            "LedgerEntryType": "DirectoryNode",
            "LedgerIndex": "4B4EBB6D8563075813D47491CC325865DFD3DC2E94889F0F39D59D9C059DD81F"
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
              "Balance": "9999798970",
              "Flags": 0,
              "OwnerCount": 1,
              "Sequence": 6
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "5F3B7107F4B524367A173A2B0EAB66E8CC4D2178C1B0C0528CB2F73A8B6BF254",
            "PreviousFields": {
              "Balance": "9999898980",
              "OwnerCount": 0,
              "Sequence": 5
            },
            "PreviousTxnID": "52C4F626FE6F33699B6BE8ADF362836DDCE9B0B1294BFAA15D65D61501350BE6",
            "PreviousTxnLgrSeq": 1771204
          }
        },
        {
          "CreatedNode": {
            "LedgerEntryType": "Escrow",
            "LedgerIndex": "E2CF730A31FD419382350C9DBD8DB7CD775BA5AA9B97A9BE9AB07304AA217A75",
            "NewFields": {
              "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
              "Amount": "100000",
              "CancelAfter": 556927412,
              "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
              "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
            }
          }
        }
      ],
      "TransactionIndex": 0,
      "TransactionResult": "tesSUCCESS"
    },
    "validated": true
  }
}
```


## 6. Submit EscrowFinish transaction

Sign and submit an EscrowFinish transaction to execute the release of the funds after the FinishAfter time has passed. Set the Owner field of the transaction to the Account address from the EscrowCreate transaction, and the OfferSequence to the Sequence number from the EscrowCreate transaction. Set the Condition and Fulfillment fields to the condition and fulfillment values, in hexadecimal, that you generated in step 1. Set the Fee (transaction cost) value based on the size of the fulfillment in bytes: a conditional EscrowFinish requires at least 330 drops of XRP plus 10 drops per 16 bytes in the size of the fulfillment.

`FinishAfter`

`Owner`

`Account`

`OfferSequence`

`Sequence`

`Condition`

`Fulfillment`

`Fee`

NoteIf you included a FinishAfter field in the EscrowCreate transaction, you cannot execute it before that time has passed, even if you provide the correct fulfillment for the Escrow's condition. The EscrowFinish transaction fails with the result code tecNO_PERMISSION if the previously-closed ledger's close time is before the FinishAfter time.

`FinishAfter`

`tecNO_PERMISSION`

`FinishAfter`

If the escrow has expired, you can only cancel the escrow instead.

Never submit a secret key to a server you do not control. Do not send a secret key unencrypted over the network.

- Websocket
- Javascript
- Python

Request:

```
{
  "id": 4,
  "command": "submit",
  "secret": "s████████████████████████████",
  "tx_json": {
    "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
    "TransactionType": "EscrowFinish",
    "Owner": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
    "OfferSequence": 5,
    "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
    "Fulfillment": "A0228020D280D1A02BAD0D2EBC0528B92E9BF37AC3E2530832C2C52620307135156F1048",
    "Fee": "500"
  }
}
```

Response:

```
{
  "id": 4,
  "status": "success",
  "type": "response",
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "120002228000000024000000062019000000056840000000000001F4732103E498E35BC1E109C5995BD3AB0A6D4FFAB61B853C8F6010FABC5DABAF34478B617446304402207DE4EA9C8655E75BA01F96345B3F62074313EB42C15D9C4871E30F02202D2BA50220070E52AD308A31AC71E33BA342F31B68D1D1B2A7A3A3ED6E8552CA3DCF14FBB2701024A0228020D280D1A02BAD0D2EBC0528B92E9BF37AC3E2530832C2C52620307135156F1048701127A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD81012081149A2AA667E1517EFA8A6B552AB2EDB859A99F26B282149A2AA667E1517EFA8A6B552AB2EDB859A99F26B2",
    "tx_json": {
      "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
      "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
      "Fee": "500",
      "Flags": 2147483648,
      "Fulfillment": "A0228020D280D1A02BAD0D2EBC0528B92E9BF37AC3E2530832C2C52620307135156F1048",
      "OfferSequence": 5,
      "Owner": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
      "Sequence": 6,
      "SigningPubKey": "03E498E35BC1E109C5995BD3AB0A6D4FFAB61B853C8F6010FABC5DABAF34478B61",
      "TransactionType": "EscrowFinish",
      "TxnSignature": "304402207DE4EA9C8655E75BA01F96345B3F62074313EB42C15D9C4871E30F02202D2BA50220070E52AD308A31AC71E33BA342F31B68D1D1B2A7A3A3ED6E8552CA3DCF14FBB2",
      "hash": "0E88368CAFC69A722ED829FAE6E2DD3575AE9C192691E60B5ACDF706E219B2BF"
    }
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

```
{
  "id": 20,
  "command": "tx",
  "transaction": "0E88368CAFC69A722ED829FAE6E2DD3575AE9C192691E60B5ACDF706E219B2BF"
}
```

Response:

```
{
  "id": 20,
  "status": "success",
  "type": "response",
  "result": {
    "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
    "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
    "Fee": "500",
    "Flags": 2147483648,
    "Fulfillment": "A0228020D280D1A02BAD0D2EBC0528B92E9BF37AC3E2530832C2C52620307135156F1048",
    "OfferSequence": 2,
    "Owner": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
    "Sequence": 4,
    "SigningPubKey": "03E498E35BC1E109C5995BD3AB0A6D4FFAB61B853C8F6010FABC5DABAF34478B61",
    "TransactionType": "EscrowFinish",
    "TxnSignature": "3045022100925FEBE21C2E57F81C472A4E5869CAB1D0164C472A46532F39F6F9F7ED6846D002202CF9D9063ADC4CC0ADF4C4692B7EE165C5D124CAA855649389E245D993F41D4D",
    "date": 556838610,
    "hash": "0E88368CAFC69A722ED829FAE6E2DD3575AE9C192691E60B5ACDF706E219B2BF",
    "inLedger": 1771204,
    "ledger_index": 1771204,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "Balance": "400100000",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 1
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousFields": {
              "Balance": "400000000"
            },
            "PreviousTxnID": "795CBC8AFAAB9DC7BD9944C7FAEABF9BB0802A84520BC649213AD6A2C3256C95",
            "PreviousTxnLgrSeq": 1770775
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Flags": 0,
              "Owner": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
              "RootIndex": "4B4EBB6D8563075813D47491CC325865DFD3DC2E94889F0F39D59D9C059DD81F"
            },
            "LedgerEntryType": "DirectoryNode",
            "LedgerIndex": "4B4EBB6D8563075813D47491CC325865DFD3DC2E94889F0F39D59D9C059DD81F"
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
              "Balance": "9999898980",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 5
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "5F3B7107F4B524367A173A2B0EAB66E8CC4D2178C1B0C0528CB2F73A8B6BF254",
            "PreviousFields": {
              "Balance": "9999899480",
              "OwnerCount": 1,
              "Sequence": 4
            },
            "PreviousTxnID": "5C2A1E7B209A7404D3722A010D331A8C1C853109A47DDF620DE5E3D59F026581",
            "PreviousTxnLgrSeq": 1771042
          }
        },
        {
          "DeletedNode": {
            "FinalFields": {
              "Account": "rEhw9vD98ZrkY4tZPvkZst5H18RysqFdaB",
              "Amount": "100000",
              "Condition": "A0258020E24D9E1473D4DF774F6D8E089067282034E4FA7ECACA2AD2E547953B2C113CBD810120",
              "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "FinishAfter": 556838185,
              "Flags": 0,
              "OwnerNode": "0000000000000000",
              "PreviousTxnID": "795CBC8AFAAB9DC7BD9944C7FAEABF9BB0802A84520BC649213AD6A2C3256C95",
              "PreviousTxnLgrSeq": 1770775
            },
            "LedgerEntryType": "Escrow",
            "LedgerIndex": "DC524D17B3F650E7A215B332F418E54AE59B0DFC5392E74958B0037AFDFE8C8D"
          }
        }
      ],
      "TransactionIndex": 1,
      "TransactionResult": "tesSUCCESS"
    },
    "validated": true
  }
}
```


## See Also

- Crypto-Conditions Specification
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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=73303a91-b82a-4a92-b383-2c4fbdcf81bf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=73303a91-b82a-4a92-b383-2c4fbdcf81bf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=42b6bec4-8276-4bcf-aab9-046618ae98a5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=42b6bec4-8276-4bcf-aab9-046618ae98a5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=22907fdc-786b-4ac3-a879-67fe3acb2f57&bo=1&sid=1993ce009d9e11f080fe5d32c7136334&vid=19947ab09d9e11f085095745a4bc4a65&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Send%20a%20Conditionally-Held%20Escrow&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&r=&lt=2636&evt=pageLoad&sv=2&cdb=AQAS&rn=851390)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=346a0e58-c0c7-48ec-bc27-ca2573c005d0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=346a0e58-c0c7-48ec-bc27-ca2573c005d0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=79bbc885-73bf-4a3a-810a-75a39cca3e4b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=79bbc885-73bf-4a3a-810a-75a39cca3e4b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d982aa01-19bb-41e6-a14a-3dd3db34f07d&pt=Send%20a%20Conditionally-Held%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fsend-a-conditionally-held-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-conditionally-held-escrow#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-conditionally-held-escrow#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-conditionally-held-escrow#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-conditionally-held-escrow#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/send-a-conditionally-held-escrow.md)
- [crypto-conditions](https://tools.ietf.org/html/draft-thomas-crypto-conditions-04)
- [five-bells-condition](https://github.com/interledgerjs/five-bells-condition)
- [PSK specification](https://github.com/interledger/rfcs/blob/master/deprecated/0016-pre-shared-key/0016-pre-shared-key.md)
- [Crypto-Conditions Specification](https://tools.ietf.org/html/draft-thomas-crypto-conditions-04)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:38:19.250Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
