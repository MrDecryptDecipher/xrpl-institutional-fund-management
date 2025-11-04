# wallet_propose
URL: https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/key-generation-methods/wallet_propose
Section: Y3

## Overview


## Extracted Content
# wallet_propose

[Source]

Use the wallet_propose method to generate a key pair and XRP Ledger address. This command only generates key and address values, and does not affect the XRP Ledger itself in any way. To become a funded address stored in the ledger, the address must receive a Payment transaction that provides enough XRP to meet the reserve requirement.

`wallet_propose`

The wallet_propose method is an admin method that cannot be run by unprivileged users! (This command is restricted to protect against people sniffing network traffic for account secrets, since admin commands are not usually transmitted over the outside network.)

`wallet_propose`


### Request Format

An example of the request format:

- WebSocket (with key type)
- WebSocket (no key type)
- MoreJSON-RPC (with key type)JSON-RPC (no key type)Commandline
- JSON-RPC (with key type)
- JSON-RPC (no key type)
- Commandline

- JSON-RPC (with key type)
- JSON-RPC (no key type)
- Commandline

```
{
    "command": "wallet_propose",
    "seed": "snoPBrXtMeMyMHUVTgbuqAfg1SUTb",
    "key_type": "secp256k1"
}
```

The request can contain the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| key_type | String | Which signing algorithm to use to derive this key pair. Valid values are ed25519 and secp256k1 (all lower case). The default is secp256k1. |
| passphrase | String | (Optional) Generate a key pair and address from this seed value. This value can be formatted in hexadecimal, the XRP Ledger's base58 format, RFC-1751, or as an arbitrary string. Cannot be used with seed or seed_hex. |
| seed | String | (Optional) Generate the key pair and address from this seed value in the XRP Ledger's base58-encoded format. Cannot be used with passphrase or seed_hex. |
| seed_hex | String | (Optional) Generate the key pair and address from this seed value in hexadecimal format. Cannot be used with passphrase or seed. |


`Field`

`key_type`

`ed25519`

`secp256k1`

`secp256k1`

`passphrase`

`seed`

`seed_hex`

`seed`

`passphrase`

`seed_hex`

`seed_hex`

`passphrase`

`seed`

You must provide at most one of the following fields: passphrase, seed, or seed_hex. If you omit all three, rippled uses a random seed.

`passphrase`

`seed`

`seed_hex`

`rippled`

NoteThe commandline version of this command cannot generate Ed25519 keys.


#### Specifying a Seed

For most cases, you should use a seed value generated from a strong source of randomness. Anyone who knows the seed value for an address has full power to send transactions signed by that address. Generally, running this command with no parameters is a good way to generate a random seed.

Cases where you would specify a known seed include:

- Re-calculating your address when you only know the seed associated with that address
- Testing rippled functionality

`rippled`

If you do specify a seed, you can specify it in any of the following formats:

- As a secret key string in the XRP Ledger's base58 format. Example: snoPBrXtMeMyMHUVTgbuqAfg1SUTb.
- As an RFC-1751 format string (secp256k1 key pairs only). Example: I IRE BOND BOW TRIO LAID SEAT GOAL HEN IBIS IBIS DARE.
- As a 128-bit hexadecimal string. Example: DEDCE9CE67B451D852FD4E846FCDE31C.
- An arbitrary string to use as a seed value. For example: masterpassphrase.

`snoPBrXtMeMyMHUVTgbuqAfg1SUTb`

`I IRE BOND BOW TRIO LAID SEAT GOAL HEN IBIS IBIS DARE`

`DEDCE9CE67B451D852FD4E846FCDE31C`

`masterpassphrase`


### Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "account_id": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    "key_type": "secp256k1",
    "master_key": "I IRE BOND BOW TRIO LAID SEAT GOAL HEN IBIS IBIS DARE",
    "master_seed": "snoPBrXtMeMyMHUVTgbuqAfg1SUTb",
    "master_seed_hex": "DEDCE9CE67B451D852FD4E846FCDE31C",
    "public_key": "aBQG8RQAzjs1eTKFEAQXr2gS4utcDiEC9wmi7pfUPTi27VCahwgw",
    "public_key_hex": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020"
  }
}
```

The response follows the standard format, with a successful result containing various important information about the new (potential) account, including the following fields:

| Field | Type | Description |
| --- | --- | --- |
| key_type | String | Which signing algorithm was used to derive this key pair. Valid values are ed25519 and secp256k1 (all lower case). |
| master_seed | String | The master seed, in the XRP Ledger's base58 encoded string format. Typically, you use the key in this format to sign transactions. |
| master_seed_hex | String | The master seed, in hex format. |
| master_key | String | DEPRECATED The master seed, in RFC-1751 format. Note: The rippled implementation reverses the byte order of the key after decoding from RFC-1751 and before encoding to RFC-1751; if you read or write keys for use with the XRP Ledger using a different RFC-1751 implementation, you must do the same to be compatible with rippled's RFC-1751 encoding. |
| account_id | String | The Address of the account in the XRP Ledger's base58 format. This is not the public key, but a hash-of-a-hash of it. It also has a checksum so a typo almost certainly results in an invalid address rather than a valid, but different address. This is the primary identifier of an account in the XRP Ledger. You tell people this to get paid, and use it in transactions to indicate who you are and who you're paying, trusting, and so forth. Multi-signing lists also use these to identify other signers. |
| public_key | String | The public key of the key pair, in the XRP Ledger's base58 encoded string format. Derived from the master_seed. |
| public_key_hex | String | This is the public key of the key pair, in hexadecimal. Derived from the master_seed. To validate the signature on a transaction, rippled needs this public key. That's why the format for a signed transaction includes the public key in the SigningPubKey field. |
| warning | String | (May be omitted) If the request specified a seed value, this field provides a warning that it may be insecure. |


`Field`

`key_type`

`ed25519`

`secp256k1`

`master_seed`

`master_seed_hex`

`master_key`

`rippled`

`rippled`

`account_id`

`public_key`

`master_seed`

`public_key_hex`

`master_seed`

`rippled`

`SigningPubKey`

`warning`

You can also use this method to generate a key pair to use as a regular key pair for an account. You assign a regular key pair to an account to be able to sign most transactions with it, while keeping your master key pair offline whenever possible.

In addition to using it as a regular key pair, you can also use it as a member of a multi-signing list (SignerList).

For more information about master and regular key pairs, see Cryptographic Keys

For more information about multi-signing and signer lists, see Multi-Signing.


### Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly.
- badSeed - The request specified a disallowed seed value (in the passphrase, seed, or seed_hex fields), such as an empty string, or a string resembling a XRP Ledger address.

`invalidParams`

`badSeed`

`passphrase`

`seed`

`seed_hex`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 0.31.0](https://img.shields.io/badge/Updated in-rippled 0.31.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=41a08533-6094-4067-ad6b-77f0f255dfdf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=41a08533-6094-4067-ad6b-77f0f255dfdf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b7bb039f-9594-488b-86a6-443b50a9f6e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b7bb039f-9594-488b-86a6-443b50a9f6e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1b604b74-aa62-4f3b-b7cf-aa774b0bb794&bo=1&sid=37e8edd09da811f08d4425df298e264a&vid=37e95d809da811f08591c17ec45a712f&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=wallet_propose&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&r=&lt=2620&evt=pageLoad&sv=2&cdb=AQAS&rn=405207)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=faf24b5f-2178-4a37-ba24-6b81cebbb1e8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=faf24b5f-2178-4a37-ba24-6b81cebbb1e8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=eb44509c-477e-4ee3-acab-00c52cc0ab39&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=eb44509c-477e-4ee3-acab-00c52cc0ab39&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f54e0873-aa71-46b0-8d30-c20bcb68853d&pt=wallet_propose&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fadmin-api-methods%2Fkey-generation-methods%2Fwallet_propose&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/key-generation-methods/wallet_propose#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/key-generation-methods/wallet_propose#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/key-generation-methods/wallet_propose#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/admin-api-methods/key-generation-methods/wallet_propose#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.593216687854d161c8bccda8e6483ec4.1759200628188.1759200628188.1759200628188.1&__hssc=78174987.1.1759200628189&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/admin-api-methods/key-generation-methods/wallet_propose.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/WalletPropose.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/0.31.0](https://github.com/XRPLF/rippled/releases/tag/0.31.0)
- [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal)
- [RFC-1751](https://tools.ietf.org/html/rfc1751)
- [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal)
- [Ed25519](https://ed25519.cr.yp.to/)
- [RFC-1751](https://tools.ietf.org/html/rfc1751)
- [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal)
- [RFC-1751](https://tools.ietf.org/html/rfc1751)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.593216687854d161c8bccda8e6483ec4.1759200628188.1759200628188.1759200628188.1&__hssc=78174987.1.1759200628189&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:50:38.162Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
