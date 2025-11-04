# channel_authorize
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/payment-channel-methods/channel_authorize
Section: S1

## Overview


## Extracted Content
# channel_authorize

[Source]

(Added by the PayChan amendment to be enabled.)

The channel_authorize method creates a signature that can be used to redeem a specific amount of XRP or fungible tokens from a payment channel.

`channel_authorize`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "channel_authorize_example_id1",
    "command": "channel_authorize",
    "channel_id": "5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3",
    "seed": "s████████████████████████████",
    "key_type": "secp256k1",
    "amount": "1000000",
}
```

The request includes the following parameters:

| Field | Type | Description |
| --- | --- | --- |
| channel_id | String | The unique ID of the payment channel to use. |
| secret | String | (Optional) The secret key to use to sign the claim. This must be the same key pair as the public key specified in the channel. Cannot be used with seed, seed_hex, or passphrase. |
| seed | String | (Optional) The secret seed to use to sign the claim. This must be the same key pair as the public key specified in the channel. Must be in the XRP Ledger's base58 format. If provided, you must also specify the key_type. Cannot be used with secret, seed_hex, or passphrase. |
| seed_hex | String | (Optional) The secret seed to use to sign the claim. This must be the same key pair as the public key specified in the channel. Must be in hexadecimal format. If provided, you must also specify the key_type. Cannot be used with secret, seed, or passphrase. |
| passphrase | String | (Optional) A string passphrase to use to sign the claim. This must be the same key pair as the public key specified in the channel. The key derived from this passphrase must match the public key specified in the channel. If provided, you must also specify the key_type. Cannot be used with secret, seed, or seed_hex. |
| key_type | String | (Optional) The signing algorithm of the cryptographic key pair provided. Valid types are secp256k1 or ed25519. The default is secp256k1. |
| amount | Object or String | Cumulative amount of XRP, in drops, or fungible tokens to authorize. If the destination has already received a lesser amount from this channel, the signature created by this method can be redeemed for the difference. |


`channel_id`

`secret`

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

`amount`

The request must specify exactly one of secret, seed, seed_hex, or passphrase.

`secret`

`seed`

`seed_hex`

`passphrase`

WarningDo not send secret keys to untrusted servers or through unsecured network connections. (This includes the secret, seed, seed_hex, or passphrase fields of this request.) You should only use this method on a secure, encrypted network connection to a server you run or fully trust with your funds. Otherwise, eavesdroppers could use your secret key to sign claims and take all the money from this payment channel and anything else using the same key pair. See Set Up Secure Signing for instructions.

`secret`

`seed`

`seed_hex`

`passphrase`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "channel_authorize_example_id1",
    "status": "success"
    "result": {
        "signature": "304402204EF0AFB78AC23ED1C472E74F4299C0C21F1B21D07EFC0A3838A420F76D783A400220154FB11B6F54320666E4C36CA7F686C16A3A0456800BBC43746F34AF50290064",
    }
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| signature | String | The signature for this claim, as a hexadecimal value. To process the claim, the destination account of the payment channel must send a PaymentChannelClaim transaction with this signature, the exact Channel ID, amount, and public key of the channel. |


`signature`


## Possible Errors

- Any of the universal error types.
- badKeyType - The key_type parameter in the request is not a valid key type. (Valid types are secp256k1 or ed25519.)
- badSeed - The secret in the request is not a valid secret key.
- channelAmtMalformed - The amount in the request is not a valid amount.
- channelMalformed - The channel_id in the request is not a valid Channel ID. The Channel ID should be a 256-bit (64-character) hexadecimal string.

`badKeyType`

`key_type`

`secp256k1`

`ed25519`

`badSeed`

`secret`

`channelAmtMalformed`

`amount`

`channelMalformed`

`channel_id`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.4.0](https://img.shields.io/badge/Updated in-rippled 1.4.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=498bd0f9-4ef6-4f7f-b847-898b77012b1e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=498bd0f9-4ef6-4f7f-b847-898b77012b1e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f3c8abe7-874c-4ba0-a74f-42cc016aa24c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f3c8abe7-874c-4ba0-a74f-42cc016aa24c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=24d09c60-54a3-4867-94f2-cef39075303f&bo=1&sid=c529a1509da611f080e841577da15104&vid=c52a2e509da611f0adab2bf909c4c13c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=channel_authorize&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&r=&lt=2708&evt=pageLoad&sv=2&cdb=AQAS&rn=786008)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3f5c067b-c4b8-40b5-9768-508d94e657e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3f5c067b-c4b8-40b5-9768-508d94e657e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9aeb5610-491a-4b73-b6ae-5077b86a1e3e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9aeb5610-491a-4b73-b6ae-5077b86a1e3e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5d292452-5b9d-40c7-918c-3a7877b8fa67&pt=channel_authorize&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fpayment-channel-methods%2Fchannel_authorize&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/payment-channel-methods/channel_authorize#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/payment-channel-methods/channel_authorize#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/payment-channel-methods/channel_authorize#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/payment-channel-methods/channel_authorize#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/payment-channel-methods/channel_authorize.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/d4a56f223a3b80f64ff70b4e90ab6792806929ca/src/ripple/rpc/handlers/PayChanClaim.cpp#L41)
- [https://github.com/XRPLF/rippled/releases/tag/1.4.0](https://github.com/XRPLF/rippled/releases/tag/1.4.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:40:16.304Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
