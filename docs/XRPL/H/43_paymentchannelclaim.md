# PaymentChannelClaim
URL: https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelclaim
Section: H43

## Overview


## Extracted Content
# PaymentChannelClaim

[Source]

Claim funds from a payment channel, adjust the payment channel's expiration, or both. This transaction can be used differently depending on the transaction sender's role in the specified channel:

The source address of a channel can:

- Send funds from the channel to the destination with or without a signed Claim.
- Set the channel to expire as soon as the channel's SettleDelay has passed.
- Clear a pending Expiration time.
- Close a channel immediately, with or without processing a claim first. The source address cannot close the channel immediately if the channel has any amount remaining.

`SettleDelay`

`Expiration`

The destination address of a channel can:

- Receive funds from the channel using a signed Claim.
- Close the channel immediately after processing a Claim, refunding any unclaimed amount to the channel's source.

Any address sending this transaction can:

- Cause a channel to be closed if its Expiration or CancelAfter time is older than the previous ledger's close time. Any validly formed PaymentChannelClaim transaction has this effect, regardless of the contents of the transaction.

`Expiration`

`CancelAfter`

`PaymentChannelClaim`

(Added by the PayChan amendment.)


## Example PaymentChannelClaim JSON

```
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Amount": "1000000",
    "Balance": "1000000",
    "Channel": "5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3",
    "Fee": "10",
    "Flags": 2147483648,
    "PublicKey": "023693F15967AE357D0327974AD46FE3C127113B1110D6044FD41E723689F81CC6",
    "Sequence": 372,
    "TransactionType": "PaymentChannelClaim"
}
```


## PaymentChannelClaim Fields

In addition to the common fields, PaymentChannelClaim transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amount | Currency Amount | Amount | No | The amount of XRP, in drops, or fungible tokens authorized by the Signature. This must match the amount in the signed message. This is the cumulative amount that can be dispensed by the channel, including funds previously redeemed. Non-XRP tokens can only be used if the TokenEscrow amendment  is enabled. |
| Balance | Currency Amount | Amount | No | Total amount of XRP, in drops, or fungible tokens delivered by this channel after processing this claim. Required to deliver XRP or fungible tokens. Must be more than the total amount delivered by the channel so far, but not greater than the Amount of the signed claim. Must be provided except when closing the channel.  Non-XRP tokens can only be used if the TokenEscrow amendment  is enabled. |
| Channel | String - Hexadecimal | UInt256 | Yes | The unique ID of the channel. |
| CredentialIDs | Array of Strings | Vector256 | No | Set of credentials to authorize a deposit made by this transaction. Each member of the array must be the ledger entry ID of a Credential entry in the ledger. For details, see Credential IDs. |
| PublicKey | String - Hexadecimal | Blob | No | The public key used for the signature. This must match the PublicKey stored in the ledger for the channel. Required unless the sender of the transaction is the source address of the channel and the Signature field is omitted. (The transaction includes the public key so that rippled can check the validity of the signature before trying to apply the transaction to the ledger.) |
| Signature | String - Hexadecimal | Blob | No | The signature of this claim. The signed message contains the channel ID and the amount of the claim. Required unless the sender of the transaction is the source address of the channel. |


`Amount`

`Signature`

`Balance`

`Amount`

`Channel`

`CredentialIDs`

`PublicKey`

`PublicKey`

`Signature`

`rippled`

`Signature`

If the payment channel was created before the fixPayChanRecipientOwnerDir amendment became enabled (on 2020-05-01), it is possible that the destination account has been deleted and does not currently exist in the ledger. If the destination has been deleted, the source account cannot send XRP from the channel to the destination; instead, the transaction fails with tecNO_DST. Other uses of this transaction type are unaffected when the destination account has been deleted, including adjusting the channel expiration, closing a channel with no XRP, or removing a channel that has passed its expiration time.

`tecNO_DST`


## PaymentChannelClaim Flags

Transactions of the PaymentChannelClaim type support additional values in the Flags field, as follows:

`PaymentChannelClaim`

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfRenew | 0x00010000 | 65536 | Clear the channel's Expiration time. (Expiration is different from the channel's immutable CancelAfter time.) Only the source address of the payment channel can use this flag. |
| tfClose | 0x00020000 | 131072 | Request to close the channel. Only the channel source and destination addresses can use this flag. This flag closes the channel immediately if it has no more XRP allocated to it after processing the current claim, or if the destination address uses it. If the source address uses this flag when the channel still holds XRP, this schedules the channel to close after SettleDelay seconds have passed. (Specifically, this sets the Expiration of the channel to the close time of the previous ledger plus the channel's SettleDelay time, unless the channel already has an earlier Expiration time.) If the destination address uses this flag when the channel still holds XRP, any XRP that remains after processing the claim is returned to the source address. |


`tfRenew`

`0x00010000`

`Expiration`

`Expiration`

`CancelAfter`

`tfClose`

`0x00020000`

`SettleDelay`

`Expiration`

`SettleDelay`

`Expiration`


## See Also

- PayChannel entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=97e99997-8003-4773-af16-5f7e868b3fa4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=97e99997-8003-4773-af16-5f7e868b3fa4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5eba1cb6-216f-4d13-8eaf-90756a1ead79&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5eba1cb6-216f-4d13-8eaf-90756a1ead79&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=5e4bcb36-9933-437a-8fe4-ece4c1b84e5c&bo=1&sid=54b6f5b09da311f08fabfbf3baf6ec50&vid=54b76b009da311f08409679b7001f519&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=PaymentChannelClaim&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&r=&lt=4172&evt=pageLoad&sv=2&cdb=AQAS&rn=773263)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e674045-d10c-47c9-bdfa-f2a74c23583e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e674045-d10c-47c9-bdfa-f2a74c23583e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3774bd4d-faef-4e9a-9db1-61669c4e844a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3774bd4d-faef-4e9a-9db1-61669c4e844a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0fc783a7-9555-4704-8798-88939a87fc1b&pt=PaymentChannelClaim&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpaymentchannelclaim&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelclaim#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelclaim#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelclaim#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/paymentchannelclaim#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.457298c03b2d33c5d8cdf5656f5c4dc3.1759198527039.1759198527039.1759198527039.1&__hssc=78174987.1.1759198527039&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/paymentchannelclaim.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/PayChan.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.457298c03b2d33c5d8cdf5656f5c4dc3.1759198527039.1759198527039.1759198527039.1&__hssc=78174987.1.1759198527039&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:15:40.502Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
