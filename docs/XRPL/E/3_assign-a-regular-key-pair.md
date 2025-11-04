# Assign a Regular Key Pair
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/assign-a-regular-key-pair
Section: E3

## Overview


## Extracted Content
# Assign a Regular Key Pair

The XRP Ledger allows an account to authorize a secondary key pair, called a regular key pair, to sign future transactions. If the private key of a regular key pair is compromised, you can remove or replace it without changing the rest of your account and re-establishing its relationships to other accounts. You can also rotate a regular key pair proactively. (Neither of those things is possible for the master key pair of an account, which is intrinsically linked to the account's address.)

For more information about master and regular key pairs, see Cryptographic Keys.

This tutorial walks through the steps required to assign a regular key pair to your account:

1. Generate a key pair
1. Assign the key pair to your account as a regular key pair
1. Verify the regular key pair
1. Explore next steps


## 1. Generate a Key Pair

Generate a key pair that you'll assign to your account as a regular key pair.

This key pair is the same data type as a master key pair, so you can generate it the same way: you can use the client library of your choice or use the wallet_propose method of a server you run. This might look as follows:

- WebSocket
- JSON-RPC
- Commandline
- Python
- JavaScript
- MoreJava
- Java

- Java

```
// Request:

{
  "command": "wallet_propose"
}

// Response:

{
  "result": {
    "account_id": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
    "key_type": "secp256k1",
    "master_key": "KNEW BENT LYNN LED GAD BEN KENT SHAM HOBO RINK WALT ALLY",
    "master_seed": "sh8i92YRnEjJy3fpFkL8txQSCVo79",
    "master_seed_hex": "966C0F68643EFBA50D58D191D4CA8AA7",
    "public_key": "aBRNH5wUurfhZcoyR6nRwDSa95gMBkovBJ8V4cp1C1pM28H7EPL1",
    "public_key_hex": "03AEEFE1E8ED4BBC009DE996AC03A8C6B5713B1554794056C66E5B8D1753C7DD0E"
  },
  "status": "success",
  "type": "response"
}
```

In the next step, you'll use the address from this response (account_id in the API response) to assign the key pair as a regular key pair to your account. Also, save the seed value from this key pair (master_seed in the API response) somewhere securely; you'll use that key to sign transactions later. (Everything else, you can forget about.)

`account_id`

`master_seed`


## 2. Assign the Key Pair to Your Account as a Regular Key Pair

Use a SetRegularKey transaction to assign the key pair you generated in step 1 to your account as a regular key pair.

When assigning a regular key pair to your account for the first time, the SetRegularKey transaction requires signing with your account's master private key (secret). There are several ways of securely signing transactions, but this tutorial uses a local rippled server.

`rippled`

When you send later SetRegularKey transactions, you can sign using the existing regular private key to replace or remove itself. Note that you should still not submit your regular private key across the network.


### Sign Your Transaction

The most secure way to sign a transaction is to sign locally with a client library. Alternatively, if you run your own rippled node you can sign the transaction using the sign method, but this must be done through a trusted and encrypted connection, or through a local (same-machine) connection.

`rippled`

In all cases, note the signed transaction's identifying hash for later.

Populate the request fields with the following values:

| Request Field | Value |
| --- | --- |
| Account | The address of your account. |
| RegularKey | account_id generated in step 1. |
| secret | master_key, master_seed, or master_seed_hex (master private key) for your account. |


`Account`

`RegularKey`

`account_id`

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
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7"
      },
   "secret": "ssCATR7CBvn4GLd1UuU2bqqQffHki"
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
    "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
      "Sequence": 4,
      "SigningPubKey": "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
      "TransactionType": "SetRegularKey",
      "TxnSignature": "304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C26",
      "hash": "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
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
    "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540"
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
    "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
      "Sequence": 4,
      "SigningPubKey": "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
      "TransactionType": "SetRegularKey",
      "TxnSignature": "304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C26",
      "hash": "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
    }
  },
  "status": "success",
  "type": "response"
}
```

Note that the response contains a hash of the transaction, which you can use to look up the transaction's final outcome.

`hash`


## 3. Verify the Regular Key Pair

At this point, the regular key pair is assigned to your account and you should be able to send transactions using the regular key pair. To avoid losing control of your account, it is important that you test your regular key before you take any additional steps such as disabling the master key pair. If you make a mistake and lose access to your account, no one can restore it for you.

To verify that your account has the regular key pair set correctly, submit an AccountSet transaction from your account, signing it with the regular private key you assigned to your account in step 2. As in step 1, this tutorial uses a local rippled server as a way of securely signing transactions.

`rippled`


### Sign Your Transaction

The most secure way to sign a transaction is to sign locally with a client library. Alternatively, if you run your own rippled node you can sign the transaction using the sign method, but this must be done through a trusted and encrypted connection, or through a local (same-machine) connection.

`rippled`

In all cases, note the signed transaction's identifying hash for later.

Populate the request fields with the following values:

| Request Field | Value |
| --- | --- |
| Account | The address of your account. |
| secret | master_key, master_seed, or master_seed_hex (regular private key) generated in step 1 and assigned to your account in step 2. |


`Account`

`secret`

`master_key`

`master_seed`

`master_seed_hex`


#### Request Format

Here's an example of the request format. Note that the request does not include any AccountSet options. This means that a successful transaction has no effect other than to confirm that the regular key pair is set correctly for your account (and to destroy the transaction cost).

`AccountSet`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "command": "sign",
  "tx_json": {
      "TransactionType": "AccountSet",
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93"
      },
   "secret": "sh8i92YRnEjJy3fpFkL8txQSCVo79"
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
    "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 4,
      "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
      "TransactionType": "AccountSet",
      "TxnSignature": "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
      "hash": "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
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
    "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E"
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
    "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 4,
      "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
      "TransactionType": "AccountSet",
      "TxnSignature": "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
      "hash": "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
    }
  },
  "status": "success",
  "type": "response"
}
```

If the transaction fails with the following result codes, here are some things to check:

- tefBAD_AUTH: The regular key you signed your test transaction with doesn't match the regular key you set in the previous step. Check that the secret and address for your regular key pair match and double-check which values you used in each step.
- tefBAD_AUTH_MASTER or temBAD_AUTH_MASTER: Your account doesn't have a regular key assigned. Check that the SetRegularKey transaction executed successfully. You can also use the account_info method to confirm that your regular key is set in the RegularKey field as expected.

`tefBAD_AUTH`

`tefBAD_AUTH_MASTER`

`temBAD_AUTH_MASTER`

`RegularKey`

For possible causes of other result codes, see Transaction Results.


## See Also

Now that you're familiar with the benefits of assigning a regular key pair to an account, consider taking a look at these related topics and tutorials:

- Concepts:Cryptographic KeysMulti-SigningIssuing and Operational Addresses
- Cryptographic Keys
- Multi-Signing
- Issuing and Operational Addresses
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
- Issuing and Operational Addresses

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=511dc59e-923a-4ab2-b1a2-28b4c661ae7c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=511dc59e-923a-4ab2-b1a2-28b4c661ae7c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ad2257de-0b7a-4d64-a6c8-243c00e57e7b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ad2257de-0b7a-4d64-a6c8-243c00e57e7b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=77cce6b4-13d4-4b0c-ad87-f5fa697ee940&bo=1&sid=82f109409d9d11f09dcf355e9dabdf29&vid=82f16fb09d9d11f0a4e6991ec084137d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Assign%20a%20Regular%20Key%20Pair&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&r=&evt=pageLoad&sv=2&cdb=AQAS&rn=165822)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8370c0c3-6629-47fc-9ea4-3bd0c133cb9a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8370c0c3-6629-47fc-9ea4-3bd0c133cb9a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5bb0bc2e-56e7-471e-9cfd-996f1101b19e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5bb0bc2e-56e7-471e-9cfd-996f1101b19e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e3e2d4a-78c1-4870-bf83-c07eaeac5ffc&pt=Assign%20a%20Regular%20Key%20Pair&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fassign-a-regular-key-pair&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/assign-a-regular-key-pair#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/assign-a-regular-key-pair#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/assign-a-regular-key-pair#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/assign-a-regular-key-pair#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3cd82edd2dcfdbdf28e280d506bf3eea.1759196029596.1759196029596.1759196029596.1&__hssc=78174987.1.1759196029596&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/assign-a-regular-key-pair.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.3cd82edd2dcfdbdf28e280d506bf3eea.1759196029596.1759196029596.1759196029596.1&__hssc=78174987.1.1759196029596&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:34:06.480Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
