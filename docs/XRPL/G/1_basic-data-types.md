# Basic Data Types
URL: https://xrpl.org/docs/references/protocol/data-types/basic-data-types
Section: G1

## Overview


## Extracted Content
# Basic Data Types

Different types of objects are uniquely identified in different ways:

Accounts are identified by their Address, for example "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59". Addresses always start with "r". Many rippled methods also accept a hexadecimal representation.

`"r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59"`

`rippled`

Transactions are identified by a Hash of the transaction's binary format. You can also identify a transaction by its sending account and Sequence Number.

Each closed Ledger has a Ledger Index and a Hash value. When Specifying Ledgers you can use either one.


## Addresses

Accounts in the XRP Ledger are identified by an address in the XRP Ledger's base58 format. The address is derived from the account's master public key, which is in turn derived from a secret key. An address is represented as a string in JSON and has the following characteristics:

- Between 25 and 35 characters in length
- Starts with the character r
- Uses alphanumeric characters, excluding the number "0" capital letter "O", capital letter "I", and lowercase letter "l"
- Case-sensitive
- Includes a 4-byte checksum so that the probability of generating a valid address from random characters is approximately 1 in 232

`r`

`0`

`O`

`I`

`l`

There is also an X-address format that "packs" a destination tag into the address. These addresses start with an X (for Mainnet) or a T (for test networks). Exchanges and wallets can use X-addresses to represent all the data a customer needs to know in one value. For more information, see the X-address format site and codec.

`X`

`T`

The XRP Ledger protocol only supports "classic" addresses natively, but many client libraries support X-addresses too.


## Hashes

Many objects in the XRP Ledger, particularly transactions and ledgers, are uniquely identified by a 256-bit hash value. This value is typically calculated as a "SHA-512Half", which calculates a SHA-512 hash from some contents, then takes the first half of the output. (That's 256 bits, which is 32 bytes, or 64 characters of the hexadecimal representation.) Since the hash of an object is derived from the contents in a way that is extremely unlikely to produce collisions, two objects with the same hash can be considered the same.

An XRP Ledger hash value has the following characteristics:

- Exactly 64 characters in length
- Hexadecimal character set: 0-9 and A-F.
- Typically written in upper case.

NoteSHA-512Half has similar security to the officially-defined SHA-512/256 hash function. However, the XRP Ledger's usage predates SHA-512/256 and is also easier to implement on top of an existing SHA-512 function. (As of this writing, SHA-512 support in cryptographic libraries is much more common than for SHA-512/256.)


### Hash Prefixes

[Source]

In many cases, the XRP Ledger prefixes an object's binary data with a 4-byte code before calculating its hash, so that objects of different types have different hashes even if their binary formats are the same. The existing 4-byte codes are structured as three alphabetic characters, encoded as ASCII, followed by a zero byte.

Some types of hash appear in API requests and responses. Others are only calculated as the first step of signing a certain type of data, or calculating a higher-level hash. The following table shows all 4-byte hash prefixes the XRP Ledger uses:

| Object Type | API Fields | Hash Prefix (Hex) | Hash Prefix (Text) |
| --- | --- | --- | --- |
| Consensus proposal | N/A | 0x50525000 | PRP\0 |
| Ledger Version | ledger_hash | 0x4C575200 | LWR\0 |
| Ledger state data | account_state in ledger header | 0x4D4C4E00 | MLN\0 |
| Ledger data inner node | N/A | 0x4D494E00 | MIN\0 |
| Ledger data inner node (SHAMapv2) | N/A | 0x494E5200 | INR\0 |
| Payment Channel Claim | N/A | 0x434C4D00 | CLM\0 |
| Signed Transaction | hash of transactions | 0x54584E00 | TXN\0 |
| Transaction with metadata | N/A | 0x534E4400 | SND\0 |
| Unsigned Transaction (Single-signing) | N/A | 0x53545800 | STX\0 |
| Unsigned Transaction (Multi-signing) | N/A | 0x534D5400 | SMT\0 |
| Validation vote | N/A | 0x56414C00 | VAL\0 |
| Validator manifest | N/A | 0x4D414E00 | MAN\0 |


`0x50525000`

`PRP\0`

`ledger_hash`

`0x4C575200`

`LWR\0`

`account_state`

`0x4D4C4E00`

`MLN\0`

`0x4D494E00`

`MIN\0`

`0x494E5200`

`INR\0`

`0x434C4D00`

`CLM\0`

`hash`

`0x54584E00`

`TXN\0`

`0x534E4400`

`SND\0`

`0x53545800`

`STX\0`

`0x534D5400`

`SMT\0`

`0x56414C00`

`VAL\0`

`0x4D414E00`

`MAN\0`

Ledger objects IDs are calculated in a similar way, but they use a 2-byte prefix called a "space key" instead of a prefix in the form described here.


## Account Sequence

A sequence number is a 32-bit unsigned integer that is used to make sure transactions from a given sender execute only once each, and in the correct order.

Every account in the XRP Ledger has a sequence number in its Sequence field, which increases by 1 whenever that account sends a transaction and that transaction gets included in a validated ledger. Each transaction also has a sequence number in its Sequence field, which must match the account's current sequence number when the transaction executes. For each account, each sequence number can only be used once, in numerical order.

`Sequence`

`Sequence`

Tickets make some exceptions from these rules so that it is possible to send transactions out of the normal order. Tickets represent sequence numbers reserved for later use; a transaction can use a Ticket instead of a normal sequence number.

With the DeletableAccounts amendment, the starting Sequence number for an account matches the [Ledger Index][] of the ledger version where the account was created. Before DeletableAccounts, every account started with Sequence number 1.

`Sequence`

`Sequence`

Whenever a transaction is included in a ledger, it uses up a sequence number (or Ticket) regardless of whether the transaction executed successfully or failed with a tec-class error code. Other transaction failures don't get included in ledgers, so they don't change the sender's sequence number (or have any other effects).

`tec`

Within the ledger, an [Address][] and a sequence number are sometimes used together to identify an object that was created by the validated transaction with that sender and sequence number. Escrows and Offers are examples of objects identified this way.

It is possible for multiple unconfirmed transactions to have the same sender and sequence number. Such transactions are mutually exclusive, and at most one of them can be included in a validated ledger. (Any others ultimately have no effect.)


## Ledger Index

A ledger index is a 32-bit unsigned integer used to identify a ledger. The ledger index is sometimes known as the ledger's sequence number. (This is different from an account sequence.) The very first ledger was ledger index 1, and each new ledger has a ledger index that is 1 higher than the ledger index of the ledger immediately before it.

The ledger index indicates the order of the ledgers; the [Hash][] value identifies the exact contents of the ledger. Two ledgers with the same hash are always the same. For validated ledgers, hash values and ledger indexes are equally valid and correlate 1:1. However, this is not true for in-progress ledgers:

- Two different rippled servers may have different contents for a current ledger with the same ledger index, due to latency in propagating transactions throughout the network.
- There may be multiple closed ledger versions competing to be validated by consensus. These ledger versions have the same ledger index but different contents (and different hashes). Only one of these closed ledgers can become validated.
- The current open ledger's hash is not calculated. This is because a current ledger's contents change over time, which would cause its hash to change, even though its ledger index stays the same. The hash of a ledger is only calculated when the ledger is closed.

`rippled`


### Specifying Ledgers

Many API methods require you to specify an instance of the ledger, with the data retrieved being considered up-to-date as of that particular version of the shared ledger. The commands that accept a ledger version all work the same way. There are three ways you can specify which ledger you want to use:

1. Specify a ledger by its Ledger Index in the ledger_index parameter. Each closed ledger has a ledger index that is 1 higher than the previous ledger. (The very first ledger had ledger index 1.)"ledger_index": 61546724
1. Specify a ledger by its Hash value in the ledger_hash parameter."ledger_hash": "8BB204CE37CFA7A021A16B5F6143400831C4D1779E6FE538D9AC561ABBF4A929"
1. Specify a ledger by one of the following shortcuts, in the ledger_index parameter:validated for the most recent ledger that has been validated by consensus"ledger_index": "validated"closed for the most recent ledger that has been closed for modifications and proposed for validationcurrent for the server's current working version of the ledger.
1. validated for the most recent ledger that has been validated by consensus"ledger_index": "validated"
1. closed for the most recent ledger that has been closed for modifications and proposed for validation
1. current for the server's current working version of the ledger.

Specify a ledger by its Ledger Index in the ledger_index parameter. Each closed ledger has a ledger index that is 1 higher than the previous ledger. (The very first ledger had ledger index 1.)

`ledger_index`

```
"ledger_index": 61546724
```

Specify a ledger by its Hash value in the ledger_hash parameter.

`ledger_hash`

```
"ledger_hash": "8BB204CE37CFA7A021A16B5F6143400831C4D1779E6FE538D9AC561ABBF4A929"
```

Specify a ledger by one of the following shortcuts, in the ledger_index parameter:

`ledger_index`

- validated for the most recent ledger that has been validated by consensus"ledger_index": "validated"
- closed for the most recent ledger that has been closed for modifications and proposed for validation
- current for the server's current working version of the ledger.

validated for the most recent ledger that has been validated by consensus

`validated`

```
"ledger_index": "validated"
```

closed for the most recent ledger that has been closed for modifications and proposed for validation

`closed`

current for the server's current working version of the ledger.

`current`

There is also a deprecated ledger parameter which accepts any of the above three formats. Do not use this parameter; it may be removed without further notice.

`ledger`

If you do not specify a ledger, the server decides which ledger to use to serve the request. By default, peer-to-peer servers chooses the current (in-progress) ledger. Clio servers use the most recent validated ledger instead. Do not provide more than one field specifying ledgers.

`current`

NoteDo not rely on the default behavior for specifying a ledger; it is subject to change. Always specify a ledger version in the request if you can.

Clio servers only record validated ledger data. If you make a request to a Clio server for the current or closed ledger, the server forwards the request to a P2P Mode server. If you request a ledger index or hash that is not validated, Clio responds with a lgrNotFound error.

`current`

`closed`

`lgrNotFound`


## Specifying Currency Amounts

There are three kinds of currencies in the XRP Ledger: XRP, tokens, and MPTs. These three types of currencies are specified in different formats, with different precision and rounding behavior.

Some fields, such as the destination Amount of a Payment transaction, can be either type. Some fields only accept XRP specifically, such as the Fee field (transaction cost).

`Amount`

`Fee`

XRP is specified as a string containing an integer number of "drops" of XRP, where 1 million drops equals 1 XRP. Tokens are instead specified as an object with fields for the decimal amount, currency code, and issuer. For example:

- XRP - To specify an Amount field with a value of 13.1 XRP:"Amount": "13100000"
- Token - To specify an Amount field with a value of 13.1 FOO issued by or to rf1B...:"Amount": {
    "value": "13.1",
    "currency": "FOO",
    "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
}
- MPT - Use Amount to specify the value of an MPT. Assuming an AssetScale of 1, you would specify a value of 13.1 units of an MPT as follows:"Amount": {
"mpt_issuance_id": 
 "0000012FFD9EE5DA93AC614B4DB94D7E0FCE415CA51BED47",
"value": "131"
}

XRP - To specify an Amount field with a value of 13.1 XRP:

`Amount`

```
"Amount": "13100000"
```

Token - To specify an Amount field with a value of 13.1 FOO issued by or to rf1B...:

`Amount`

`rf1B...`

```
"Amount": {
    "value": "13.1",
    "currency": "FOO",
    "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
}
```

MPT - Use Amount to specify the value of an MPT. Assuming an AssetScale of 1, you would specify a value of 13.1 units of an MPT as follows:

`Amount`

`AssetScale`

```
"Amount": {
"mpt_issuance_id": 
 "0000012FFD9EE5DA93AC614B4DB94D7E0FCE415CA51BED47",
"value": "131"
}
```

For more information, see Currency Formats.


## Specifying Time

The rippled server and its APIs represent time as an unsigned integer. This number measures the number of seconds since the "Ripple Epoch" of January 1, 2000 (00:00 UTC). This is like the way the Unix epoch works, except the Ripple Epoch is 946684800 seconds after the Unix Epoch.

`rippled`

Don't convert Ripple Epoch times to UNIX Epoch times in 32-bit variables: this could lead to integer overflows.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e4b6db85-7e20-4871-a5f3-2aa280a6f2e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e4b6db85-7e20-4871-a5f3-2aa280a6f2e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=677f1bde-6eac-4ac6-93c3-e2976d3e25d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=677f1bde-6eac-4ac6-93c3-e2976d3e25d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=91d216bf-488c-465c-a1b3-559c5155a9c6&bo=1&sid=7539dc309d9f11f0aae763e6e2bf34c6&vid=753a4b109d9f11f0b26ecf108192d086&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Basic%20Data%20Types&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&r=&lt=3586&evt=pageLoad&sv=2&cdb=AQAS&rn=331379)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3b27ce19-2c21-49d3-bdcc-dcad2efaf93f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3b27ce19-2c21-49d3-bdcc-dcad2efaf93f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=df9c0fe8-8570-4870-860d-c94c2331c4ec&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=df9c0fe8-8570-4870-860d-c94c2331c4ec&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=66d2ee71-5ae2-43b6-b1b7-e5d7e7d0963a&pt=Basic%20Data%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fbasic-data-types&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/data-types/basic-data-types#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/data-types/basic-data-types#)
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
- [Resources](https://xrpl.org/docs/references/protocol/data-types/basic-data-types#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/data-types/basic-data-types#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/data-types/basic-data-types.md)
- [public key](https://en.wikipedia.org/wiki/Public-key_cryptography)
- [X-address format site](https://xrpaddress.info/)
- [codec](https://github.com/xrp-community/xrpl-tagged-address-codec)
- [SHA-512](http://dx.doi.org/10.6028/NIST.FIPS.180-4)
- [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/protocol/HashPrefix.h)
- [Unix epoch](http://en.wikipedia.org/wiki/Unix_time)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:47:58.254Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
