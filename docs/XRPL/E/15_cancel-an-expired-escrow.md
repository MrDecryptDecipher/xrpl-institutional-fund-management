# Cancel an Expired Escrow
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/cancel-an-expired-escrow
Section: E15

## Overview


## Extracted Content
# Cancel an Expired Escrow

An escrow in the XRP Ledger is expired when its CancelAfter time is lower than the close_time of the latest validated ledger. Escrows without a CancelAfter time never expire.

`CancelAfter`

`close_time`

`CancelAfter`


## 1. Get the latest validated ledger

Use the ledger method to look up the latest validated ledger and get the close_time value.

`close_time`

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
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "ledger": {
      # ... (trimmed) ...

      "close_time": 560302643,
      "close_time_human": "2017-Oct-02 23:37:23",
      "close_time_resolution": 10,

      # ... (trimmed) ...
    },
    "ledger_hash": "668F0647A6F3CC277496245DBBE9BD2E3B8E70E7AA824E97EF3237FE7E1EE3F2",
    "ledger_index": 2906341,
    "validated": true
  }
}
```


## 2. Look up the escrow

Use the account_objects method and compare CancelAfter to close_time:

`CancelAfter`

`close_time`

Request:

- Websocket

```
{
  "id": 2,
  "command": "account_objects",
  "account": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
  "ledger_index": "validated",
  "type": "escrow"
}
```

Response:

- Websocket

```
{
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "account": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
    "account_objects": [
      {
        "Account": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
        "Amount": "10000",
        "CancelAfter": 559913895,
        "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "FinishAfter": 559892324,
        "Flags": 0,
        "LedgerEntryType": "Escrow",
        "OwnerNode": "0000000000000000",
        "PreviousTxnID": "4756C22BBB7FC23D9081FDB180806939D6FEBC967BE0EC2DB95B166AF9C086E9",
        "PreviousTxnLgrSeq": 2764813,
        "index": "7243A9750FA4BE3E63F75F6DACFD79AD6B6C76947F6BDC46CD0F52DBEEF64C89"
      }
    ],
    "ledger_hash": "82F24FFA72AED16F467BBE79D387E92FDA39F29038B26E79464CDEDFB506E366",
    "ledger_index": 2764826,
    "validated": true
  }
}
```


## 3. Submit EscrowCancel transaction

Anyone can cancel an expired escrow in the XRP Ledger by sending an EscrowCancel transaction. Set the Owner field of the transaction to the Account of the EscrowCreate transaction that created this escrow. Set the OfferSequence field to the Sequence of the EscrowCreate transaction.

`Owner`

`Account`

`EscrowCreate`

`OfferSequence`

`Sequence`

`EscrowCreate`

TipIf you don't know what OfferSequence to use, you can look up the transaction that created the Escrow: call the tx method with the value of the Escrow's PreviousTxnID field. In tx response, use the Sequence value of that transaction as the OfferSequence value of the EscrowCancel transaction.

`OfferSequence`

`PreviousTxnID`

`tx`

`Sequence`

`OfferSequence`

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
    "Account": "rhgdnc82FwHFUKXp9ZcpgwXWRAxKf5Buqp",
    "TransactionType": "EscrowCancel",
    "Owner": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
    "OfferSequence": 1
  }
}
```

Response:

```
{
  "id": 5,
  "status": "success",
  "type": "response",
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "1200042280000000240000000320190000000168400000000000000A7321027FB1CF34395F18901CD294F77752EEE25277C6E87A224FC7388AA7EF872DB43D74473045022100AC45749FC4291F7811B2D8AC01CA04FEE38910CB7216FB0C5C0AEBC9C0A95F4302203F213C71C00136A0ADC670EFE350874BCB2E559AC02059CEEDFB846685948F2B81142866B7B47574C8A70D5E71FFB95FFDB18951427B82144E87970CD3EA984CF48B1AA6AB6C77DC4AB059FC",
    "tx_json": {
      "Account": "rhgdnc82FwHFUKXp9ZcpgwXWRAxKf5Buqp",
      "Fee": "10",
      "Flags": 2147483648,
      "OfferSequence": 1,
      "Owner": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
      "Sequence": 3,
      "SigningPubKey": "027FB1CF34395F18901CD294F77752EEE25277C6E87A224FC7388AA7EF872DB43D",
      "TransactionType": "EscrowCancel",
      "TxnSignature": "3045022100AC45749FC4291F7811B2D8AC01CA04FEE38910CB7216FB0C5C0AEBC9C0A95F4302203F213C71C00136A0ADC670EFE350874BCB2E559AC02059CEEDFB846685948F2B",
      "hash": "65F36C5514153D94F0ADE5CE747061A5E70B73B56B4C66DA5040D99CAF252831"
    }
  }
}
```

Take note of the transaction's identifying hash value so you can check its final status when it is included in a validated ledger version.

`hash`


## 4. Wait for validation

On a live network (including Mainnet, Testnet, or Devnet), you can wait 4-7 seconds for the ledger to close automatically.

If you're running rippled in stand-alone mode, use the ledger_accept method to manually close the ledger.

`rippled`


## 5. Confirm final result

Use the tx method with the EscrowCancel transaction's identifying hash to check its final status. Look in the transaction metadata for a DeletedNode with LedgerEntryType of Escrow. Also look for a ModifiedNode of type AccountRoot for the sender of the escrowed payment. The FinalFields of the object should show the increase in XRP in the Balance field for the returned XRP.

`EscrowCancel`

`DeletedNode`

`LedgerEntryType`

`Escrow`

`ModifiedNode`

`AccountRoot`

`FinalFields`

`Balance`

Request:

- Websocket

```
{
  "id": 6,
  "command": "tx",
  "transaction": "65F36C5514153D94F0ADE5CE747061A5E70B73B56B4C66DA5040D99CAF252831"
}
```

Response:

- Websocket

```
{
  "id": 6,
  "status": "success",
  "type": "response",
  "result": {
    "Account": "rhgdnc82FwHFUKXp9ZcpgwXWRAxKf5Buqp",
    "Fee": "10",
    "Flags": 2147483648,
    "OfferSequence": 1,
    "Owner": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
    "Sequence": 3,
    "SigningPubKey": "027FB1CF34395F18901CD294F77752EEE25277C6E87A224FC7388AA7EF872DB43D",
    "TransactionType": "EscrowCancel",
    "TxnSignature": "3045022100AC45749FC4291F7811B2D8AC01CA04FEE38910CB7216FB0C5C0AEBC9C0A95F4302203F213C71C00136A0ADC670EFE350874BCB2E559AC02059CEEDFB846685948F2B",
    "date": 560302841,
    "hash": "65F36C5514153D94F0ADE5CE747061A5E70B73B56B4C66DA5040D99CAF252831",
    "inLedger": 2906406,
    "ledger_index": 2906406,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
            "PreviousTxnID": "4756C22BBB7FC23D9081FDB180806939D6FEBC967BE0EC2DB95B166AF9C086E9",
            "PreviousTxnLgrSeq": 2764813
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "rhgdnc82FwHFUKXp9ZcpgwXWRAxKf5Buqp",
              "Balance": "9999999970",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 4
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "3430FA3A160FA8F9842FA4A8B5549ECDCB3783E585D0F9796A1736DEAE35F6FE",
            "PreviousFields": {
              "Balance": "9999999980",
              "Sequence": 3
            },
            "PreviousTxnID": "DA6F5CA8CE13A03B8BC58515E085F2FEF90B3C08230B5AEC8DE4FAF39F79010B",
            "PreviousTxnLgrSeq": 2906391
          }
        },
        {
          "DeletedNode": {
            "FinalFields": {
              "Account": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
              "Amount": "10000",
              "CancelAfter": 559913895,
              "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "FinishAfter": 559892324,
              "Flags": 0,
              "OwnerNode": "0000000000000000",
              "PreviousTxnID": "4756C22BBB7FC23D9081FDB180806939D6FEBC967BE0EC2DB95B166AF9C086E9",
              "PreviousTxnLgrSeq": 2764813
            },
            "LedgerEntryType": "Escrow",
            "LedgerIndex": "7243A9750FA4BE3E63F75F6DACFD79AD6B6C76947F6BDC46CD0F52DBEEF64C89"
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Flags": 0,
              "Owner": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
              "RootIndex": "DACDBEBD31D14EAC4207A45DB88734AD14D26D908507F41D2FC623BDD91C582F"
            },
            "LedgerEntryType": "DirectoryNode",
            "LedgerIndex": "DACDBEBD31D14EAC4207A45DB88734AD14D26D908507F41D2FC623BDD91C582F"
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT",
              "Balance": "9999999990",
              "Flags": 0,
              "OwnerCount": 0,
              "Sequence": 2
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "F5F1834B80A8B5DA878270AB4DE4EA444281181349375F1D21E46D5F3F0ABAC8",
            "PreviousFields": {
              "Balance": "9999989990",
              "OwnerCount": 1
            },
            "PreviousTxnID": "4756C22BBB7FC23D9081FDB180806939D6FEBC967BE0EC2DB95B166AF9C086E9",
            "PreviousTxnLgrSeq": 2764813
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

In the above example, r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT is the sender of the escrow, and the increase in Balance from 9999989990 drops to 9999999990 drops represents the return of the escrowed 10,000 drops of XRP (0.01 XRP).

`r3wN3v2vTUkr5qd6daqDc2xE4LSysdVjkT`

`Balance`


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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd576e3c-a2d1-4d64-a4a1-50953e8007c5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dd576e3c-a2d1-4d64-a4a1-50953e8007c5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c93c77b9-e0a7-42c6-8406-276d3caf9440&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c93c77b9-e0a7-42c6-8406-276d3caf9440&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=bf99629a-7d07-4d15-a287-8f2b3a93ebae&bo=1&sid=298577c09d9e11f084ee3507094cb1af&vid=298676209d9e11f08ea04b23977cd517&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Cancel%20an%20Expired%20Escrow&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&r=&lt=2345&evt=pageLoad&sv=2&cdb=AQAS&rn=468568)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=56583865-db84-4553-acb6-ce4365727e51&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=56583865-db84-4553-acb6-ce4365727e51&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3b685757-e91e-46a0-a71d-23ef88c41133&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3b685757-e91e-46a0-a71d-23ef88c41133&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b2471db5-80a1-48a4-9c6d-1895630efbdf&pt=Cancel%20an%20Expired%20Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fcancel-an-expired-escrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/cancel-an-expired-escrow#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/cancel-an-expired-escrow#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/cancel-an-expired-escrow#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/cancel-an-expired-escrow#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/cancel-an-expired-escrow.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:38:42.366Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
