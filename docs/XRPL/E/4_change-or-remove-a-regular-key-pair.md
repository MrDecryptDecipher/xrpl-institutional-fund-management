# Change or Remove a Regular Key Pair
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/change-or-remove-a-regular-key-pair
Section: E4

## Overview


## Extracted Content
# Change or Remove a Regular Key Pair

The XRP Ledger allows an account to authorize a secondary key pair, called a regular key pair, to sign future transactions.  If your account's regular key pair is compromised, or if you want to periodically change the regular key pair as a security measure, use a SetRegularKey transaction to remove or change the regular key pair for your account.

For more information about master and regular key pairs, see Cryptographic Keys.


## Changing a Regular Key Pair

The steps to change your existing regular key pair are almost the same as the steps to assign a regular key for the first time. You generate the key pair and assign it to your account as a regular key pair, overwriting the existing regular key pair. However, the main difference is that when changing the existing regular key pair, you can use the existing regular private key to replace itself; but when assigning a regular key pair to an account for the first time, you have to use the account's master private key to do it.

For more information about master and regular key pairs, see Cryptographic Keys.


## Removing a Regular Key Pair

If you want to remove a compromised regular key pair from your account, you don't need to generate a key pair first. Use a SetRegularKey transaction, omitting the RegularKey field. Note that the transaction fails if you don't have another way of signing for your account currently enabled (either the master key pair or a signer list).

`RegularKey`

When removing a regular key pair to your account, the SetRegularKey transaction requires signing by your account's master private key (secret) or existing regular key pair. Sending your master or regular private key anywhere is dangerous, so we keep transaction signing separate from transaction submission to the network.

`SetRegularKey`


### Sign Your Transaction

The most secure way to sign a transaction is to sign locally with a client library. Alternatively, if you run your own rippled node you can sign the transaction using the sign method, but this must be done through a trusted and encrypted connection, or through a local (same-machine) connection.

`rippled`

In all cases, note the signed transaction's identifying hash for later.

Populate the request fields with the following values:

| Request Field | Value |
| --- | --- |
| Account | The address of your account. |
| secret | master_key, master_seed, or master_seed_hex (master or regular private key) for your account. |


`Account`

`secret`

`master_key`

`master_seed`

`master_seed_hex`


#### Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "command": "sign",
  "tx_json": {
      "TransactionType": "SetRegularKey",
      "Account": "r9xQZdFGwbwTB3g9ncKByWZ3du6Skm7gQ8"
      },
   "secret": "snoPBrXtMeMyMHUVTgbuqAfg1SUTb"
}
```


#### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "result": {
    "tx_blob": "1200052280000000240000000268400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100CAB9A6F84026D57B05760D5E2395FB7BE86BF39F10DC6E2E69DC91238EE0970B022058EC36A8EF9EE65F5D0D8CAC4E88C8C19FEF39E40F53D4CCECBB59701D6D1E838114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
    "tx_json": {
      "Account": "r9xQZdFGwbwTB3g9ncKByWZ3du6Skm7gQ8",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 2,
      "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
      "TransactionType": "SetRegularKey",
      "TxnSignature": "3045022100CAB9A6F84026D57B05760D5E2395FB7BE86BF39F10DC6E2E69DC91238EE0970B022058EC36A8EF9EE65F5D0D8CAC4E88C8C19FEF39E40F53D4CCECBB59701D6D1E83",
      "hash": "59BCAB8E5B9D4597D6A7BFF22F6C555D0F41420599A2E126035B6AF19261AD97"
    }
  },
  "status": "success",
  "type": "response"
}
```

The sign command response contains a tx_blob value, as shown above. The offline signing response contains a signedTransaction value. Both are signed binary representations (blobs) of the transaction.

`sign`

`tx_blob`

`signedTransaction`

Next, use the submit command to send the transaction blob (tx_blob or signedTransaction) to the network.

`submit`

`tx_blob`

`signedTransaction`


### Submit Your Transaction

Take the signedTransaction value from the offline signing response or the tx_blob value from the sign command response and submit it as the tx_blob value using the submit method.

`signedTransaction`

`tx_blob`

`sign`

`tx_blob`


#### Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "command": "submit",
    "tx_blob": "1200052280000000240000000268400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100CAB9A6F84026D57B05760D5E2395FB7BE86BF39F10DC6E2E69DC91238EE0970B022058EC36A8EF9EE65F5D0D8CAC4E88C8C19FEF39E40F53D4CCECBB59701D6D1E838114623B8DA4A0BFB3B61AB423391A182DC693DC159E"
}
```


#### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "1200052280000000240000000268400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100CAB9A6F84026D57B05760D5E2395FB7BE86BF39F10DC6E2E69DC91238EE0970B022058EC36A8EF9EE65F5D0D8CAC4E88C8C19FEF39E40F53D4CCECBB59701D6D1E838114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
    "tx_json": {
      "Account": "r9xQZdFGwbwTB3g9ncKByWZ3du6Skm7gQ8",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 2,
      "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
      "TransactionType": "SetRegularKey",
      "TxnSignature": "3045022100CAB9A6F84026D57B05760D5E2395FB7BE86BF39F10DC6E2E69DC91238EE0970B022058EC36A8EF9EE65F5D0D8CAC4E88C8C19FEF39E40F53D4CCECBB59701D6D1E83",
      "hash": "59BCAB8E5B9D4597D6A7BFF22F6C555D0F41420599A2E126035B6AF19261AD97"
    }
  },
  "status": "success",
  "type": "response"
}
```

The way to verify that regular key pair removal succeeded is to confirm that you can't send a transaction using the removed regular private key.

Here's an example error response for an AccountSet transaction signed using the regular private key removed by the SetRegularKey transaction above.

`SetRegularKey`


### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "error": "badSecret",
  "error_code": 41,
  "error_message": "Secret does not match account.",
  "request": {
    "command": "submit",
    "secret": "snoPBrXtMeMyMHUVTgbuqAfg1SUTb",
    "tx_json": {
      "Account": "r9xQZdFGwbwTB3g9ncKByWZ3du6Skm7gQ8",
      "TransactionType": "AccountSet"
    }
  },
  "status": "error",
  "type": "response"
}
```

In some cases, you can even use the SetRegularKey transaction to send a key reset transaction without paying the transaction cost. The XRP Ledger's transaction queue prioritizes key reset transactions above other transactions even though the nominal transaction cost of a key reset transaction is zero.

`SetRegularKey`

- Concepts:Cryptographic KeysMulti-SigningTransaction Cost
- Cryptographic Keys
- Multi-Signing
- Transaction Cost
- Tutorials:Change or Remove a Regular Key PairSet Up Multi-SigningList XRP as an Exchange
- Change or Remove a Regular Key Pair
- Set Up Multi-Signing
- List XRP as an Exchange
- References:wallet_propose methodsign methodSetRegularKey transactionAccountRoot object where the regular key is stored in the field RegularKey
- wallet_propose method
- sign method
- SetRegularKey transaction
- AccountRoot object where the regular key is stored in the field RegularKey

- Cryptographic Keys
- Multi-Signing
- Transaction Cost

- Change or Remove a Regular Key Pair
- Set Up Multi-Signing
- List XRP as an Exchange

- wallet_propose method
- sign method
- SetRegularKey transaction
- AccountRoot object where the regular key is stored in the field RegularKey

`RegularKey`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1ca08dac-e38c-4fed-a336-49a6cdd4026b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1ca08dac-e38c-4fed-a336-49a6cdd4026b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=49eb45bc-4f49-48d2-a03f-32ccd61c4bda&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=49eb45bc-4f49-48d2-a03f-32ccd61c4bda&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=359867fc-46ff-4cec-bd76-770dccc1206d&bo=1&sid=92473f809d9d11f0a1e43fc23999ae13&vid=9247c1e09d9d11f0a744b11684a8cd0c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Change%20or%20Remove%20a%20Regular%20Key%20Pair&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&r=&lt=2918&evt=pageLoad&sv=2&cdb=AQAS&rn=480218)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2b8bff48-54c4-4832-9410-2f3e05e91891&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2b8bff48-54c4-4832-9410-2f3e05e91891&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=106c073a-c0b2-4e49-9092-f31e60865b45&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=106c073a-c0b2-4e49-9092-f31e60865b45&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=264b4e47-cab1-454d-92f2-89c424df2052&pt=Change%20or%20Remove%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fchange-or-remove-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/change-or-remove-a-regular-key-pair#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/change-or-remove-a-regular-key-pair#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/change-or-remove-a-regular-key-pair#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/change-or-remove-a-regular-key-pair#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.430ae166d0bae83cfb94f09567758583.1759196053651.1759196053651.1759196053651.1&__hssc=78174987.1.1759196053651&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/change-or-remove-a-regular-key-pair.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.430ae166d0bae83cfb94f09567758583.1759196053651.1759196053651.1759196053651.1&__hssc=78174987.1.1759196053651&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:34:25.962Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
