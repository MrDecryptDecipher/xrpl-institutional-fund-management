# PayChannel
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/paychannel
Section: G30

## Overview


## Extracted Content
# PayChannel

[Source]

A PayChannel entry represents a payment channel. You can create a payment channel with a PaymentChannelCreate transaction.

`PayChannel`

(Added by the PayChan amendment.)


## Example PayChannel JSON

```
{
    "Account": "rBqb89MRQJnMPq8wTwEbtz4kvxrEDfcYvt",
    "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Amount": "4325800",
    "Balance": "2323423",
    "PublicKey": "32D2471DB72B27E3310F355BB33E339BF26F8392D5A93D3BC0FC3B566612DA0F0A",
    "SettleDelay": 3600,
    "Expiration": 536027313,
    "CancelAfter": 536891313,
    "SourceTag": 0,
    "DestinationTag": 1002341,
    "DestinationNode": "0000000000000000",
    "Flags": 0,
    "LedgerEntryType": "PayChannel",
    "OwnerNode": "0000000000000000",
    "PreviousTxnID": "F0AB71E777B2DA54B86231E19B82554EF1F8211F92ECA473121C655BFC5329BF",
    "PreviousTxnLgrSeq": 14524914,
    "index": "96F76F27D8A327FC48753167EC04A46AA0E382E6F57F32FD12274144D00F1797"
}
```


## PayChannel Fields

In addition to the common fields, PayChannel entries have the following fields:

`PayChannel`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | AccountID | Yes | The source address that owns this payment channel. This comes from the sending address of the transaction that created the channel. |
| Amount | String | Amount | Yes | Total XRP, in drops or tokens, that have been allocated to this channel. This includes amounts that have been paid to the destination address. This is initially set by the transaction that created the channel and can be increased if the source address sends a PaymentChannelFund transaction. |
| Balance | Object or String | Amount | Yes | Total already paid out by the channel. The difference between this value and the Amount field is how much can still be paid to the destination address with PaymentChannelClaim transactions. If the channel closes, the remaining difference is returned to the source address. |
| CancelAfter | Number | UInt32 | No | The immutable expiration time for this payment channel, in seconds since the Ripple Epoch. This channel is expired if this value is present and smaller than the previous ledger's close_time field. This is optionally set by the transaction that created the channel, and cannot be changed. |
| Destination | String | AccountID | Yes | The destination address for this payment channel. While the payment channel is open, this address is the only one that can receive XRP from the channel. This comes from the Destination field of the transaction that created the channel. |
| DestinationTag | Number | UInt32 | No | An arbitrary tag to further specify the destination for this payment channel, such as a hosted recipient at the destination address. |
| DestinationNode | String | UInt64 | No | A hint indicating which page of the destination's owner directory links to this entry, in case the directory consists of multiple pages. Omitted on payment channels created before enabling the fixPayChanRecipientOwnerDir amendment. |
| Expiration | Number | UInt32 | No | The mutable expiration time for this payment channel, in seconds since the Ripple Epoch. The channel is expired if this value is present and smaller than the previous ledger's close_time field. See Channel Expiration for more details. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0078, mapped to the string PayChannel, indicates that this is a payment channel entry. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the source address's owner directory links to this entry, in case the directory consists of multiple pages. |
| PreviousTxnID | String | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this entry. |
| PublicKey | String | Blob | Yes | Public key, in hexadecimal, of the key pair that can be used to sign claims against this channel. This can be any valid secp256k1 or Ed25519 public key. This is set by the transaction that created the channel and must match the public key used in claims against the channel. The channel source address can also send XRP from this channel to the destination without signed claims. |
| SettleDelay | Number | UInt32 | Yes | Number of seconds the source address must wait to close the channel if it still has any XRP in it. Smaller values mean that the destination address has less time to redeem any outstanding claims after the source address requests to close the channel. Can be any value that fits in a 32-bit unsigned integer (0 to 2^32-1). This is set by the transaction that creates the channel. |
| SourceTag | Number | UInt32 | No | An arbitrary tag to further specify the source for this payment channel, such as a hosted recipient at the owner's address. |
| TransferRate | Number | UInt32 | No | The fee to charge when users make claims on a payment channel, initially set on the creation of a payment channel and updated on subsequent funding or claim transactions. |


`Account`

`Amount`

`PaymentChannelFund`

`Balance`

`Amount`

`PaymentChannelClaim`

`CancelAfter`

`close_time`

`Destination`

`Destination`

`DestinationTag`

`DestinationNode`

`Expiration`

`close_time`

`LedgerEntryType`

`0x0078`

`PayChannel`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`PublicKey`

`SettleDelay`

`SourceTag`

`TransferRate`


## Channel Expiration

The Expiration field of a payment channel is the mutable expiration time, in contrast to the immutable expiration time represented by the CancelAfter field. The expiration of a channel is always considered relative to the close_time field of the previous ledger. The Expiration field is omitted when a PayChannel entry is created. There are several ways the Expiration field of a PayChannel entry can be updated, which can be summarized as follows: a channel's source address can set the Expiration of the channel freely as long as the channel always remains open at least SettleDelay seconds after the first attempt to close it.

`Expiration`

`CancelAfter`

`close_time`

`Expiration`

`PayChannel`

`Expiration`

`PayChannel`

`Expiration`

`SettleDelay`

When a payment channel expires, at first it remains on the ledger, because only new transactions can modify ledger contents. Transaction processing automatically closes a payment channel when any transaction accesses it after the expiration. To close an expired channel and return the unspent XRP to the owner, some address must send a new PaymentChannelClaim or PaymentChannelFund transaction accessing the channel.


### Source Address

The source address can set the Expiration directly with the PaymentChannelFund transaction type. The new value must not be earlier than whichever of the following values is earliest:

`Expiration`

- The current Expiration value (if one is set)
- The previous ledger's close time plus the SettleDelay of the channel

`Expiration`

`SettleDelay`

In other words, the source address can always make the Expiration later if an expiration is already set. The source can make an Expiration value earlier or set an Expiration if one isn't currently set, as long as the new value is at least SettleDelay seconds in the future. If the source address attempts to set an invalid Expiration date, the transaction fails with the temBAD_EXPIRATION error code.

`Expiration`

`Expiration`

`Expiration`

`SettleDelay`

`Expiration`

`temBAD_EXPIRATION`

The source address can also set the Expiration with the tfClose flag of the PaymentChannelClaim transaction type. If the flag is enabled, the ledger automatically sets the Expiration to whichever of the following values is earlier:

`Expiration`

`tfClose`

`Expiration`

- The current Expiration value (if one is set)
- The previous ledger's close time plus the SettleDelay of the channel

`Expiration`

`SettleDelay`

The source address can remove the Expiration with the tfRenew flag of the PaymentChannelClaim transaction type.

`Expiration`

`tfRenew`


### Destination Address

The destination address cannot set the Expiration field. However, the destination address can use the PaymentChannelClaim's tfClose flag to close a channel immediately.

`Expiration`

`tfClose`


### Other Addresses

If any other address attempts to set an Expiration field, the transaction fails with the tecNO_PERMISSION error code. However, if the channel is already expired, the transaction causes the channel to close and results in tesSUCCESS instead.

`Expiration`

`tecNO_PERMISSION`

`tesSUCCESS`


## PayChannel Reserve

PayChannel entries count as one item towards the owner reserve of the account that created the payment channel, as long as the entry is in the ledger. Removing the channel frees up the reserve; this can only be done after the channel expires (including as a result of being explicitly closed).

`PayChannel`


## PayChannel ID Format

The ID of a PayChannel entry is the SHA-512Half of the following values, concatenated in order:

`PayChannel`

- The PayChannel space key (0x0078)
- The AccountID of the source account
- The AccountID of the destination account
- The Sequence number of the PaymentChannelCreate transaction that created the channel If the PaymentChannelCreate transaction used a Ticket, use the TicketSequence value instead.

`0x0078`

`TicketSequence`


## See Also

- Transactions:PaymentChannelClaim transactionPaymentChannelCreate transactionPaymentChannelFund transaction
- PaymentChannelClaim transaction
- PaymentChannelCreate transaction
- PaymentChannelFund transaction

- PaymentChannelClaim transaction
- PaymentChannelCreate transaction
- PaymentChannelFund transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9375f6de-7ff5-43e6-8f5c-ef9d1a3b315e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9375f6de-7ff5-43e6-8f5c-ef9d1a3b315e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2eb93f84-5af6-4383-a649-d4527facbe0b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2eb93f84-5af6-4383-a649-d4527facbe0b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=21095de3-31b5-405f-90e5-39a031eff2d0&bo=1&sid=e0f655909da011f0b7b9733687248963&vid=e0f6a3509da011f0ae1ec318dd65f8ea&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=PayChannel&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&r=&lt=2898&evt=pageLoad&sv=2&cdb=AQAS&rn=3188)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=753a5aff-46dd-4073-979f-70c73a8fdf37&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=753a5aff-46dd-4073-979f-70c73a8fdf37&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=495af15d-d823-4a55-8fdb-a0075a6b5927&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=495af15d-d823-4a55-8fdb-a0075a6b5927&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aa351f7c-4ea1-4e14-a2e7-e5867f53bff5&pt=PayChannel&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpaychannel&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/paychannel#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/paychannel#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/paychannel#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/paychannel#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.69ae304b03fb61f6c40e237587b109ec.1759197475941.1759197475941.1759197475941.1&__hssc=78174987.1.1759197475941&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/paychannel.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L348-L363)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.69ae304b03fb61f6c40e237587b109ec.1759197475941.1759197475941.1759197475941.1&__hssc=78174987.1.1759197475941&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:58:10.186Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
