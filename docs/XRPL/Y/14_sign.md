# sign
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/signing-methods/sign
Section: Y14

## Overview


## Extracted Content
# sign

[Source]

The sign method takes a transaction in JSON format and a seed value, and returns a signed binary representation of the transaction. To contribute one signature to a multi-signed transaction, use the sign_for method instead.

`sign`

By default, this method is admin-only. It can be used as a public method if the server admin has enabled public signing.

CautionUnless you run the rippled server yourself, you should do local signing using a client library instead of using this command. For more information, see Set Up Secure Signing.

`rippled`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "api_version": 2,
  "command": "sign",
  "tx_json" : {
      "TransactionType" : "Payment",
      "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "Destination" : "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "DeliverMax" : {
         "currency" : "USD",
         "value" : "1",
         "issuer" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
      }
   },
   "secret" : "s████████████████████████████",
   "offline": false,
   "fee_mult_max": 1000
}
```

To sign a transaction, you must provide a secret key that can authorize the transaction. Typically you provide a seed value that the server derives the secret key from. You can do this in a few ways:

- Provide the seed in the secret field and omit the key_type field. This value can be formatted as an XRP Ledger base58 seed, RFC-1751, hexadecimal, or as a string passphrase. (secp256k1 keys only)
- Provide a key_type value and exactly one of seed, seed_hex, or passphrase. Omit the secret field. (Not supported by the commandline syntax.)

`secret`

`key_type`

`key_type`

`seed`

`seed_hex`

`passphrase`

`secret`

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| tx_json | Object | Transaction definition in JSON format |
| secret | String | (Optional) The secret seed of the account supplying the transaction, used to sign it. Do not send your secret to untrusted servers or through unsecured network connections. Cannot be used with key_type, seed, seed_hex, or passphrase. |
| seed | String | (Optional) The secret seed of the account supplying the transaction, used to sign it. Must be in the XRP Ledger's base58 format. If provided, you must also specify the key_type. Cannot be used with secret, seed_hex, or passphrase. |
| seed_hex | String | (Optional) The secret seed of the account supplying the transaction, used to sign it. Must be in hexadecimal format. If provided, you must also specify the key_type. Cannot be used with secret, seed, or passphrase. |
| passphrase | String | (Optional) The secret seed of the account supplying the transaction, used to sign it, as a string passphrase. If provided, you must also specify the key_type. Cannot be used with secret, seed, or seed_hex. |
| key_type | String | (Optional) The signing algorithm of the cryptographic key pair provided. Valid types are secp256k1 or ed25519. Defaults to secp256k1. Cannot be used with secret. |
| offline | Boolean | (Optional) If true, when constructing the transaction, do not try to automatically fill any transaction details. The default is false. |
| build_path | Boolean | (Optional) If this field is provided, the server auto-fills the Paths field of a Payment transaction before signing. You must omit this field if the transaction is a direct XRP payment or if it is not a Payment-type transaction. Caution: The server looks for the presence or absence of this field, not its value. This behavior may change. (Issue #3272) |
| fee_mult_max | Integer | (Optional) Signing fails with the error rpcHIGH_FEE if the auto-filled Fee value would be greater than the reference transaction cost × fee_mult_max ÷ fee_div_max. This field has no effect if you explicitly specify the Fee field of the transaction. The default is 10. |
| fee_div_max | Integer | (Optional) Signing fails with the error rpcHIGH_FEE if the auto-filled Fee value would be greater than the reference transaction cost × fee_mult_max ÷ fee_div_max. This field has no effect if you explicitly specify the Fee field of the transaction. The default is 1. |


`Field`

`tx_json`

`secret`

`key_type`

`seed`

`seed_hex`

`passphrase`

`seed`

`key_type`

`secret`

`seed_hex`

`passphrase`

`seed_hex`

`key_type`

`secret`

`seed`

`passphrase`

`passphrase`

`key_type`

`secret`

`seed`

`seed_hex`

`key_type`

`secp256k1`

`ed25519`

`secp256k1`

`secret`

`offline`

`true`

`false`

`build_path`

`Paths`

`fee_mult_max`

`rpcHIGH_FEE`

`Fee`

`fee_mult_max`

`fee_div_max`

`Fee`

`10`

`fee_div_max`

`rpcHIGH_FEE`

`Fee`

`fee_mult_max`

`fee_div_max`

`Fee`

`1`


### Auto-Fillable Fields

The server automatically tries to fill in certain fields in tx_json (the Transaction object) automatically if you omit them. The server provides the following fields before signing, unless the request specified offline as true:

`tx_json`

`offline`

`true`

- Sequence - The server automatically uses the next Sequence number from the sender's account information.Caution: The next sequence number for the account is not incremented until this transaction is applied. If you sign multiple transactions without submitting and waiting for the response to each one, you must manually provide the correct sequence numbers for each transaction after the first.
- Caution: The next sequence number for the account is not incremented until this transaction is applied. If you sign multiple transactions without submitting and waiting for the response to each one, you must manually provide the correct sequence numbers for each transaction after the first.
- Fee - If you omit the Fee parameter, the server tries to fill in an appropriate transaction cost automatically. On the production XRP Ledger, this fails with rpcHIGH_FEE unless you provide an appropriate fee_mult_max value.The fee_mult_max and fee_div_max parameters limit how high the automatically-provided transaction cost can be, in terms of the load-scaling multiplier that gets applied to the reference transaction cost. The default settings return an error if the automatically-provided value would use greater than a 10× multiplier. However, the production XRP Ledger typically has a 1000× load multiplier.The commandline syntax does not support fee_mult_max and fee_div_max. For the production XRP Ledger, you must provide a Fee value.Caution: A malicious server can specify an excessively high transaction cost, ignoring the values of fee_mult_max and fee_div_max.
- The fee_mult_max and fee_div_max parameters limit how high the automatically-provided transaction cost can be, in terms of the load-scaling multiplier that gets applied to the reference transaction cost. The default settings return an error if the automatically-provided value would use greater than a 10× multiplier. However, the production XRP Ledger typically has a 1000× load multiplier.
- The commandline syntax does not support fee_mult_max and fee_div_max. For the production XRP Ledger, you must provide a Fee value.
- Caution: A malicious server can specify an excessively high transaction cost, ignoring the values of fee_mult_max and fee_div_max.
- Paths - For Payment-type transactions (excluding XRP-to-XRP transfers), the Paths field can be automatically filled, as if you used the ripple_path_find method. Only filled if build_path is provided.

`Sequence`

- Caution: The next sequence number for the account is not incremented until this transaction is applied. If you sign multiple transactions without submitting and waiting for the response to each one, you must manually provide the correct sequence numbers for each transaction after the first.

`Fee`

`Fee`

`rpcHIGH_FEE`

`fee_mult_max`

- The fee_mult_max and fee_div_max parameters limit how high the automatically-provided transaction cost can be, in terms of the load-scaling multiplier that gets applied to the reference transaction cost. The default settings return an error if the automatically-provided value would use greater than a 10× multiplier. However, the production XRP Ledger typically has a 1000× load multiplier.
- The commandline syntax does not support fee_mult_max and fee_div_max. For the production XRP Ledger, you must provide a Fee value.
- Caution: A malicious server can specify an excessively high transaction cost, ignoring the values of fee_mult_max and fee_div_max.

`fee_mult_max`

`fee_div_max`

`fee_mult_max`

`fee_div_max`

`Fee`

`fee_mult_max`

`fee_div_max`

`Paths`

`build_path`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "api_version": 2,
  "status": "success",
  "type": "response",
  "result": {
    "tx_blob": "1200002280000000240000016861D4838D7EA4C6800000000000000000000000000055534400000000004B4E9C06F24296074F7BC48F92A97916C6DC5EA9684000000000002710732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7446304402200E5C2DD81FDF0BE9AB2A8D797885ED49E804DBF28E806604D878756410CA98B102203349581946B0DDA06B36B35DBC20EDA27552C1F167BCF5C6ECFF49C6A46F858081144B4E9C06F24296074F7BC48F92A97916C6DC5EA983143E9D4A2B8AA0780F682D136F7A56D6724EF53754",
    "tx_json": {
      "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "DeliverMax": {
        "currency": "USD",
        "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "value": "1"
      },
      "Destination": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "Fee": "10000",
      "Flags": 2147483648,
      "Sequence": 360,
      "SigningPubKey": "03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB",
      "TransactionType": "Payment",
      "TxnSignature": "304402200E5C2DD81FDF0BE9AB2A8D797885ED49E804DBF28E806604D878756410CA98B102203349581946B0DDA06B36B35DBC20EDA27552C1F167BCF5C6ECFF49C6A46F8580",
      "hash": "4D5D90890F8D49519E4151938601EF3D0B30B16CD6A519D9C99102C9FA77F7E0"
    }
  }
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| tx_blob | String | Binary representation of the fully-qualified, signed transaction, as hex |
| tx_json | Object | JSON specification of the complete transaction as signed, including any fields that were automatically filled in |


`Field`

`tx_blob`

`tx_json`

CautionIf this command results in an error messages, the message can contain a secret value provided in the request. Make sure that these errors are not visible to others.

- Do not write this error to a log file that can be seen by multiple people.
- Do not paste this error to a public place for debugging.
- Do not display the error message on a website, even by accident.


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- highFee - The current load-based multiplier to the transaction cost exceeds the limit for an automatically-provided transaction cost. Either specify a higher fee_mult_max (at least 1000) in the request or manually provide a value in the Fee field of the tx_json.
- tooBusy - The transaction did not include paths, but the server is too busy to do pathfinding right now. Does not occur if you are connected as an admin.
- noPath - The transaction did not include paths, and the server was unable to find a path by which this payment can occur.

`invalidParams`

`highFee`

`fee_mult_max`

`Fee`

`tx_json`

`tooBusy`

`noPath`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=79237be7-8163-4ad8-b143-8d3fa30d577e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=79237be7-8163-4ad8-b143-8d3fa30d577e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6fab7c09-4851-4947-8f1d-54c1a1855260&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6fab7c09-4851-4947-8f1d-54c1a1855260&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=32df9597-9a0f-495a-8466-ebe298afaa17&bo=1&sid=af857aa09da811f099cc711b347b16c4&vid=af860cb09da811f0a6452dc908bafb4b&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=sign&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&r=&lt=2638&evt=pageLoad&sv=2&cdb=AQAS&rn=869276)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f2acc700-b2b8-4b04-9af0-6347f39dac18&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f2acc700-b2b8-4b04-9af0-6347f39dac18&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1103478a-9da1-45aa-a60b-a0c1ff571615&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1103478a-9da1-45aa-a60b-a0c1ff571615&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a7f9f46b-580f-44b2-a1a2-f9f9cf888b60&pt=sign&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fsigning-methods%2Fsign&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/signing-methods/sign#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/signing-methods/sign#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/signing-methods/sign#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/signing-methods/sign#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e4dd25887870f6b18b1c844da98dcae3.1759200828895.1759200828895.1759200828895.1&__hssc=78174987.1.1759200828895&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/signing-methods/sign.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/SignHandler.cpp)
- [Issue #3272](https://github.com/XRPLF/rippled/issues/3272)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e4dd25887870f6b18b1c844da98dcae3.1759200828895.1759200828895.1759200828895.1&__hssc=78174987.1.1759200828895&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:54:00.699Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
