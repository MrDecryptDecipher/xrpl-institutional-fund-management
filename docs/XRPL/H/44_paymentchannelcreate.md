# PaymentChannelCreate
URL: https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelcreate
Section: H44

## Overview


## Extracted Content
# PaymentChannelCreate

[Source]

Create a payment channel and fund it. The address sending this transaction becomes the "source address" of the payment channel.

(Added by the PayChan amendment.)


## Example PaymentChannelCreate JSON

```
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "TransactionType": "PaymentChannelCreate",
    "Amount": "10000",
    "Destination": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
    "SettleDelay": 86400,
    "PublicKey": "32D2471DB72B27E3310F355BB33E339BF26F8392D5A93D3BC0FC3B566612DA0F0A",
    "CancelAfter": 533171558,
    "DestinationTag": 23480,
    "SourceTag": 11747
}
```


## PaymentChannelCreate Fields

In addition to the common fields, PaymentChannelCreate transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amount | Currency Amount | Amount | Yes | Amount to deduct from the sender's balance and set aside in this channel. While the channel is open, the amount can only go to the Destination address. When the channel closes, any unclaimed amount is returned to the source account's balance. Non-XRP tokens can only be used if the TokenEscrow amendment  is enabled. |
| Destination | String - Address | AccountID | Yes | The account that can receive money from this channel. This is also known as the "destination address" for the channel. Cannot be the same as the sender (Account). |
| SettleDelay | Number | UInt32 | Yes | Amount of time, in seconds, the source address must wait before closing the channel if it has unclaimed funds. |
| PublicKey | String - Hexadecimal | Blob | Yes | The 33-byte public key of the key pair the source will use to sign claims against this channel. This can be any secp256k1 or Ed25519 public key. For more information on key pairs, see Key Derivation |
| CancelAfter | Number | UInt32 | No | The time, in seconds since the Ripple Epoch, when this channel expires. Any transaction that would modify the channel after this time closes the channel without otherwise affecting it. This value is immutable; the channel can be closed earlier than this time but cannot remain open after this time. |
| DestinationTag | Number | UInt32 | No | Arbitrary tag to further specify the destination for this payment channel, such as a hosted recipient at the destination address. |


`Amount`

`Destination`

`Destination`

`Account`

`SettleDelay`

`PublicKey`

`CancelAfter`

`DestinationTag`

If the Destination account is blocking incoming payment channels, the transaction fails with result code tecNO_PERMISSION. (Requires the DisallowIncoming amendment )

`Destination`

`tecNO_PERMISSION`


## See Also

- PayChannel entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c66f26a4-8afe-4a12-8048-b1d507380e2a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c66f26a4-8afe-4a12-8048-b1d507380e2a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=31a4b724-24f7-46ea-9774-fe92bd09ee41&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=31a4b724-24f7-46ea-9774-fe92bd09ee41&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=020a4171-df03-4045-9a1d-c57b78565f95&bo=1&sid=62007e209da311f0ba13714f829b5a67&vid=620106109da311f09624c13020291815&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=PaymentChannelCreate&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&r=&lt=4797&evt=pageLoad&sv=2&cdb=AQAS&rn=899019)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61b4f625-4fd4-4d68-b985-94f51e0b183c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61b4f625-4fd4-4d68-b985-94f51e0b183c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d21e50f0-5a3b-442c-9b3e-b3f1b5bc5f69&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d21e50f0-5a3b-442c-9b3e-b3f1b5bc5f69&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=cb9c3ad7-f219-45a2-9c11-9b3e85c70314&pt=PaymentChannelCreate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelcreate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelcreate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelcreate#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelcreate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelcreate#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a5561a93e5949ef738fc3631c9404e64.1759198549615.1759198549615.1759198549615.1&__hssc=78174987.1.1759198549615&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/paymentchannelcreate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/PayChan.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a5561a93e5949ef738fc3631c9404e64.1759198549615.1759198549615.1759198549615.1&__hssc=78174987.1.1759198549615&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:16:01.054Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
