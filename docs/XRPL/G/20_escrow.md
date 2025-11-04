# Escrow
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/escrow
Section: G20

## Overview


## Extracted Content
# Escrow

[Source]

An Escrow ledger entry represents an escrow, which holds XRP until specific conditions are met. You can create an escrow by sending an EscrowCreate transaction.

`Escrow`

(Added by the Escrow amendment.)


## Example Escrow JSON

```
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Amount": "10000",
    "CancelAfter": 545440232,
    "Condition": "A0258020A82A88B2DF843A54F58772E4A3861866ECDB4157645DD9AE528C1D3AEEDABAB6810120",
    "Destination": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "DestinationTag": 23480,
    "FinishAfter": 545354132,
    "Flags": 0,
    "LedgerEntryType": "Escrow",
    "OwnerNode": "0000000000000000",
    "DestinationNode": "0000000000000000",
    "PreviousTxnID": "C44F2EB84196B9AD820313DBEBA6316A15C9A2D35787579ED172B87A30131DA7",
    "PreviousTxnLgrSeq": 28991004,
    "SourceTag": 11747,
    "index": "DC5F3851D8A1AB622F957761E5963BC5BD439D5C24AC6AD7AC4523F0640244AC"
}
```


## Escrow Fields

In addition to the common fields, Escrow entries have the following fields:

`Escrow`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | AccountID | Yes | The address of the owner (sender) of this escrow. This is the account that provided the XRP, and gets it back if the escrow is canceled. |
| Amount | Object or String | Amount | Yes | The amount to be delivered by the payment is escrow. |
| CancelAfter | Number | UInt32 | No | The escrow can be canceled if and only if this field is present and the time it specifies has passed. Specifically, this is specified as seconds since the Ripple Epoch and it "has passed" if it's earlier than the close time of the previous validated ledger. |
| Condition | String | Blob | No | A PREIMAGE-SHA-256 crypto-condition, as hexadecimal. If present, the EscrowFinish transaction must contain a fulfillment that satisfies this condition. |
| Destination | String | AccountID | Yes | The destination address where the XRP is paid if the escrow is successful. |
| DestinationNode | String | UInt64 | No | A hint indicating which page of the destination's owner directory links to this object, in case the directory consists of multiple pages. Omitted on escrows created before enabling the fix1523 amendment. |
| DestinationTag | Number | UInt32 | No | An arbitrary tag to further specify the destination for this escrow, such as a hosted recipient at the destination address. |
| FinishAfter | Number | UInt32 | No | The time, in seconds since the Ripple Epoch, after which this escrow can be finished. Any EscrowFinish transaction before this time fails. (Specifically, this is compared with the close time of the previous validated ledger.) |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0075, mapped to the string Escrow, indicates that this is an Escrow entry. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the sender's owner directory links to this entry, in case the directory consists of multiple pages. |
| PreviousTxnID | String | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this entry. |
| SourceTag | Number | UInt32 | No | An arbitrary tag to further specify the source for this escrow, such as a hosted recipient at the owner's address. |
| TransferRate | Number | UInt32 | No | The fee to charge when users finish an escrow, initially set on the creation of an escrow contract and updated on subsequent finish transactions. |


`Account`

`Amount`

`CancelAfter`

`Condition`

`Destination`

`DestinationNode`

`DestinationTag`

`FinishAfter`

`LedgerEntryType`

`0x0075`

`Escrow`

`Escrow`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`SourceTag`

`TransferRate`


## Escrow Flags

There are no flags defined for Escrow entries.

`Escrow`


## Escrow Reserve

Escrow entries count as one item towards the sender's owner reserve as long as the entry is in the ledger. Finishing or canceling the escrow frees up this reserve.

`Escrow`


## Escrow ID Format

The ID of an Escrow entry is the SHA-512Half of the following values, concatenated in order:

`Escrow`

- The Escrow space key (0x0075)
- The AccountID of the sender of the EscrowCreate transaction that created the Escrow entry
- The Sequence number of the EscrowCreate transaction that created the Escrow entry If the EscrowCreate transaction used a Ticket, use the TicketSequence value instead.

`0x0075`

`Escrow`

`Escrow`

`TicketSequence`


## See Also

- Transactions:EscrowCancel transactionEscrowCreate transactionEscrowFinish transaction
- EscrowCancel transaction
- EscrowCreate transaction
- EscrowFinish transaction

- EscrowCancel transaction
- EscrowCreate transaction
- EscrowFinish transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea9ca96a-7ff2-442c-b737-6fd95fadbff1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea9ca96a-7ff2-442c-b737-6fd95fadbff1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=df384998-416c-4815-b9cf-3585b11f877f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=df384998-416c-4815-b9cf-3585b11f877f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=9011e0e9-3201-4bae-9ae3-2730f3c0c16d&bo=1&sid=61ea68409da011f0a07b43297ceb67c3&vid=61ead0709da011f084b2032459144b11&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Escrow&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&r=&lt=2831&evt=pageLoad&sv=2&cdb=AQAS&rn=710055)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63805885-2c8e-407a-a6ab-00d18306195d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=63805885-2c8e-407a-a6ab-00d18306195d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6b31a406-236e-443d-8e09-fef91fe3f24e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6b31a406-236e-443d-8e09-fef91fe3f24e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2942a0c0-4d06-4f52-bd29-f8870adcd0d0&pt=Escrow&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fescrow&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/escrow#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/escrow#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/escrow#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/escrow#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.51cbba348e4803a450e22a1063cbedd9.1759197263096.1759197263096.1759197263096.1&__hssc=78174987.1.1759197263096&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/escrow.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L329-L342)
- [PREIMAGE-SHA-256 crypto-condition](https://tools.ietf.org/html/draft-thomas-crypto-conditions-02#section-8.1)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.51cbba348e4803a450e22a1063cbedd9.1759197263096.1759197263096.1759197263096.1&__hssc=78174987.1.1759197263096&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:54:33.462Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
