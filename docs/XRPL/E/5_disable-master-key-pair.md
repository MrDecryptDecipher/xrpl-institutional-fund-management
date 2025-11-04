# Disable Master Key Pair
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/disable-master-key-pair
Section: E5

## Overview


## Extracted Content
# Disable Master Key Pair

This page describes how to disable the master key pair that is mathematically associated with an account's address. You should do this if your account's master key pair may have been compromised, or if you want to make multi-signing the only way to submit transactions from your account.

WarningDisabling the master key pair removes one method of authorizing transactions. You should be sure you can use one of the other ways of authorizing transactions, such as with a regular key or by multi-signing, before you disable the master key pair. (For example, if you assigned a regular key pair, make sure that you can successfully submit transactions with that regular key.) Due to the decentralized nature of the XRP Ledger, no one can restore access to your account if you cannot use the remaining ways of authorizing transactions.

To disable the master key pair, you must use the master key pair. However, you can re-enable the master key pair using any other method of authorizing transactions.


## Prerequisites

To disable the master key pair for an account, you must meet the following prerequisites:

- You must have an XRP Ledger account and you must be able to sign and submit transactions from that account using the master key pair. See also: Set Up Secure Signing. Two common ways this can work are:You know the account's master seed value. A seed value is commonly represented as a base58 value starting with "s", such as sn3nxiW7v8KXzPzAqzyHXbSSKNuN9.Or, you use a dedicated signing device that stores the seed value securely, so you don't need to know it.
- You know the account's master seed value. A seed value is commonly represented as a base58 value starting with "s", such as sn3nxiW7v8KXzPzAqzyHXbSSKNuN9.
- Or, you use a dedicated signing device that stores the seed value securely, so you don't need to know it.
- Your account must have at least one method of authorizing transactions other than the master key pair. In other words, you must do one or both of the following:Assign a Regular Key Pair.Set Up Multi-Signing.
- Assign a Regular Key Pair.
- Set Up Multi-Signing.

- You know the account's master seed value. A seed value is commonly represented as a base58 value starting with "s", such as sn3nxiW7v8KXzPzAqzyHXbSSKNuN9.
- Or, you use a dedicated signing device that stores the seed value securely, so you don't need to know it.

`sn3nxiW7v8KXzPzAqzyHXbSSKNuN9`

- Assign a Regular Key Pair.
- Set Up Multi-Signing.


## Steps


### 1. Construct Transaction JSON

Prepare an AccountSet transaction from your account with the field "SetValue": 4. This is the value for the AccountSet flag "Disable Master" (asfDisableMaster). The only other required fields for this transaction are the required common fields. For example, if you leave off the auto-fillable fields, the following transaction instructions are enough:

`"SetValue": 4`

`asfDisableMaster`

```
{
  "TransactionType": "AccountSet",
  "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "SetFlag": 4
}
```

TipIt is strongly recommended to also provide the LastLedgerSequence field so that you can reliably get the outcome of the transaction in a predictable amount of time.

`LastLedgerSequence`


### 2. Sign Transaction

You must use the master key pair to sign the transaction.

WarningDo not submit your secret to a server you don't control, and do not send it over the network unencrypted. These examples assume you are using a local rippled server. You should adapt these instructions if you are using another secure signing configuration.

`rippled`


#### Example Request

- WebSocket
- JSON-RPC
- Commandline

```
{
  "command": "sign",
  "tx_json": {
    "TransactionType": "AccountSet",
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "SetFlag": 4
  },
  "secret": "s████████████████████████████"
}
```


#### Example Response

- WebSocket
- JSON-RPC
- Commandline

```
{
  "result": {
    "deprecated": "This command has been deprecated and will be removed in a future version of the server. Please migrate to a standalone signing tool.",
    "tx_blob": "1200032280000000240000017C20210000000468400000000000000A732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7446304402204457A890BC06F48061F8D61042975702B57EBEF3EA2C7C484DFE38CFD42EA11102202505A7C62FF41E68FDE10271BADD75BD66D54B2F96A326BE487A2728A352442D81144B4E9C06F24296074F7BC48F92A97916C6DC5EA9",
    "tx_json": {
      "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 380,
      "SetFlag": 4,
      "SigningPubKey": "03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB",
      "TransactionType": "AccountSet",
      "TxnSignature": "304402204457A890BC06F48061F8D61042975702B57EBEF3EA2C7C484DFE38CFD42EA11102202505A7C62FF41E68FDE10271BADD75BD66D54B2F96A326BE487A2728A352442D",
      "hash": "327FD263132A4D08170E1B01FE1BB2E21D0126CE58165C97A9173CA9551BCD70"
    }
  },
  "status": "success",
  "type": "response"
}
```

Look for "status": "success" to indicate that the server successfully signed the transaction. If you get "status": "error" instead, check the error and error_message fields for more information. Some common possibilities include:

`"status": "success"`

`"status": "error"`

`error`

`error_message`

- "error": "badSecret" usually means you made a typo in the secret of the request.
- "error": "masterDisabled" means this address's master key pair is already disabled.

`"error": "badSecret"`

`secret`

`"error": "masterDisabled"`

Take note of the tx_blob value from the response. This is a signed transaction binary you can submit to the network.

`tx_blob`


### 3. Submit Transaction

Submit the signed transaction blob from the previous step to the XRP Ledger.


#### Example Request

- WebSocket
- JSON-RPC
- Commandline

```
{
    "command": "submit",
    "tx_blob": "1200032280000000240000017C20210000000468400000000000000A732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7446304402204457A890BC06F48061F8D61042975702B57EBEF3EA2C7C484DFE38CFD42EA11102202505A7C62FF41E68FDE10271BADD75BD66D54B2F96A326BE487A2728A352442D81144B4E9C06F24296074F7BC48F92A97916C6DC5EA9"
}
```


#### Example Response

- WebSocket
- JSON-RPC
- Commandline

```
{
  "result": {
    "engine_result" : "tesSUCCESS",
    "engine_result_code" : 0,
    "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
    "tx_blob" : "1200032280000000240000017C20210000000468400000000000000A732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7446304402204457A890BC06F48061F8D61042975702B57EBEF3EA2C7C484DFE38CFD42EA11102202505A7C62FF41E68FDE10271BADD75BD66D54B2F96A326BE487A2728A352442D81144B4E9C06F24296074F7BC48F92A97916C6DC5EA9",
    "tx_json" : {
      "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "Fee" : "10",
      "Flags" : 2147483648,
      "Sequence" : 380,
      "SetFlag" : 4,
      "SigningPubKey" : "03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB",
      "TransactionType" : "AccountSet",
      "TxnSignature" : "304402204457A890BC06F48061F8D61042975702B57EBEF3EA2C7C484DFE38CFD42EA11102202505A7C62FF41E68FDE10271BADD75BD66D54B2F96A326BE487A2728A352442D",
      "hash" : "327FD263132A4D08170E1B01FE1BB2E21D0126CE58165C97A9173CA9551BCD70"
    }
  },
  "status": "success",
  "type": "response"
}
```

If the transaction fails with the result tecNO_ALTERNATIVE_KEY, your account does not have another method of authorizing transactions currently enabled. You must assign a regular key pair or set up multi-signing, then try again to disable the master key pair.

`tecNO_ALTERNATIVE_KEY`


### 4. Wait for validation

On a live network (including Mainnet, Testnet, or Devnet), you can wait 4-7 seconds for the ledger to close automatically.

If you're running rippled in stand-alone mode, use the ledger_accept method to manually close the ledger.

`rippled`


### 5. Confirm Account Flags

Confirm that your account's master key is disabled using the account_info method. Be sure to specify the following parameters:

| Field | Value |
| --- | --- |
| account | The address of your account. |
| ledger_index | "validated" to get results from the latest validated ledger version. |


`account`

`ledger_index`

`"validated"`


#### Example Request

- WebSocket
- JSON-RPC
- Commandline

```
{
  "command": "account_info",
  "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "ledger_index": "validated"
}
```


#### Example Response

- WebSocket
- JSON-RPC
- Commandline

```
{
  "result": {
    "account_data": {
      "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "AccountTxnID": "327FD263132A4D08170E1B01FE1BB2E21D0126CE58165C97A9173CA9551BCD70",
      "Balance": "423013688",
      "Domain": "6D64756F31332E636F6D",
      "EmailHash": "98B4375E1D753E5B91627516F6D70977",
      "Flags": 9633792,
      "LedgerEntryType": "AccountRoot",
      "MessageKey": "0000000000000000000000070000000300",
      "OwnerCount": 9,
      "PreviousTxnID": "327FD263132A4D08170E1B01FE1BB2E21D0126CE58165C97A9173CA9551BCD70",
      "PreviousTxnLgrSeq": 53391321,
      "RegularKey": "rD9iJmieYHn8jTtPjwwkW2Wm9sVDvPXLoJ",
      "Sequence": 381,
      "TransferRate": 4294967295,
      "index": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
      "urlgravatar": "http://www.gravatar.com/avatar/98b4375e1d753e5b91627516f6d70977"
    },
    "ledger_hash": "A90CEBD4AEDA24470AAC5CD307B6D26267ACE79C03669A0A0B8C41ACAEDAA6F0",
    "ledger_index": 53391576,
    "validated": true
  },
  "status": "success",
  "type": "response"
}
```

In the response's account_data object, compare the Flags field with the lsfDisableMaster flag value (0x00100000 in hex, or 1048576 in decimal) using bitwise-AND (the & operator in most common programming languages).

`account_data`

`Flags`

`lsfDisableMaster`

`0x00100000`

`1048576`

`&`

Example code:

- JavaScript
- Python

```
// Assuming the JSON-RPC response above is saved as account_info_response
const lsfDisableMaster = 0x00100000;
let acct_flags = account_info_response.result.account_data.Flags;
if ((lsfDisableMaster & acct_flags) === lsfDisableMaster) {
  console.log("Master key pair is DISABLED");
} else {
  console.log("Master key pair is available for use");
}
```

This operation has only two possible outcomes:

- A nonzero result, equal to the lsfDisableMaster value, indicates the master key has been successfully disabled.
- A zero result indicates the account's master key is not disabled.

`lsfDisableMaster`

If the result does not match your expectations, check whether the transaction you sent in the previous steps has executed successfully. It should be the most recent entry in the account's transaction history (account_tx method) and it should have the result code tesSUCCESS. If you see any other result code, the transaction was not executed successfully. Depending on the cause of the error, you may want to restart these steps from the beginning.

`tesSUCCESS`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9d1c83fd-723d-44af-b1d9-71da89e436d7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9d1c83fd-723d-44af-b1d9-71da89e436d7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8dbce175-bab5-48b1-bb11-194624e61a95&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8dbce175-bab5-48b1-bb11-194624e61a95&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=19227f5f-27c7-4e30-a855-0f9ce0d4ca9a&bo=1&sid=9faaf3e09d9d11f0958f8dabc8433753&vid=9fab4e409d9d11f09ae21586c6418e2f&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Disable%20Master%20Key%20Pair&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&r=&lt=2702&evt=pageLoad&sv=2&cdb=AQAS&rn=630556)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5a116d5-8df8-412b-acf9-69fa40c4e6b1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5a116d5-8df8-412b-acf9-69fa40c4e6b1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5979dacc-9113-484f-b755-03d03abdd69e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5979dacc-9113-484f-b755-03d03abdd69e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83a970de-9333-40df-9765-743638e8b35d&pt=Disable%20Master%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fdisable-master-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/disable-master-key-pair#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/disable-master-key-pair#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/disable-master-key-pair#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/disable-master-key-pair#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/disable-master-key-pair.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:34:52.631Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
