# Check
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/check
Section: G14

## Overview


## Extracted Content
# Check

[Source]

A Check entry describes a check, similar to a paper personal check, which can be cashed by its destination to get money from its sender. You can create a check by sending a CheckCreate transaction.

`Check`

(Added by the Checks amendment.)


## Example Check JSON

```
{
  "Account": "rUn84CUYbNjRoTQ6mSW7BVJPSVJNLb1QLo",
  "Destination": "rfkE1aSy9G8Upk4JssnwBxhEv5p4mn2KTy",
  "DestinationNode": "0000000000000000",
  "DestinationTag": 1,
  "Expiration": 570113521,
  "Flags": 0,
  "InvoiceID": "46060241FABCF692D4D934BA2A6C4427CD4279083E38C77CBE642243E43BE291",
  "LedgerEntryType": "Check",
  "OwnerNode": "0000000000000000",
  "PreviousTxnID": "5463C6E08862A1FAE5EDAC12D70ADB16546A1F674930521295BC082494B62924",
  "PreviousTxnLgrSeq": 6,
  "SendMax": "100000000",
  "Sequence": 2,
  "index": "49647F0D748DC3FE26BDACBC57F251AADEFFF391403EC9BF87C97F67E9977FB0"
}
```


## Check Fields

In addition to the common fields, Check entries have the following fields:

`Check`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | Account | Yes | The sender of the Check. Cashing the Check debits this address's balance. |
| Destination | String | Account | Yes | The intended recipient of the Check. Only this address can cash the Check, using a CheckCash transaction. |
| DestinationNode | String | UInt64 | No | A hint indicating which page of the destination's owner directory links to this object, in case the directory consists of multiple pages. |
| DestinationTag | Number | UInt32 | No | An arbitrary tag to further specify the destination for this Check, such as a hosted recipient at the destination address. |
| Expiration | Number | UInt32 | No | Indicates the time after which this Check is considered expired. See Specifying Time for details. |
| InvoiceID | String | UInt256 | No | Arbitrary 256-bit hash provided by the sender as a specific reason or identifier for this Check. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0043, mapped to the string Check, indicates that this object is a Check object. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the sender's owner directory links to this object, in case the directory consists of multiple pages. |
| PreviousTxnID | String | UInt256 | Yes | The identifying hash of the transaction that most recently modified this object. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |
| SendMax | String or Object | Amount | Yes | The maximum amount of currency this Check can debit the sender. If the Check is successfully cashed, the destination is credited in the same currency for up to this amount. |
| Sequence | Number | UInt32 | Yes | The sequence number of the CheckCreate transaction that created this check. |
| SourceTag | Number | UInt32 | No | An arbitrary tag to further specify the source for this Check, such as a hosted recipient at the sender's address. |


`Account`

`Destination`

`DestinationNode`

`DestinationTag`

`Expiration`

`InvoiceID`

`LedgerEntryType`

`0x0043`

`Check`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`SendMax`

`Sequence`

`SourceTag`


## Check Flags

There are no flags defined for Check entries.

`Check`


## Check Reserve

Check entries count as one item towards the owner reserve of the sender of the Check as long as the entry is in the ledger. This reserve is freed up when the check is cashed or canceled.

`Check`


## Check ID Format

[Source]

The ID of a Check entry is the SHA-512Half of the following values, concatenated in order:

`Check`

- The Check space key (0x0043)
- The AccountID of the sender of the CheckCreate transaction that created the Check
- The Sequence number of the CheckCreate transaction that created the Check. If the CheckCreate transaction used a Ticket, use the TicketSequence value instead.

`0x0043`

`Check`

`Sequence`

`Check`

`TicketSequence`

See the tutorial showing how to Send a Check.


## See Also

- Transactions:CheckCancel transactionCheckCash transactionCheckCreate transaction
- CheckCancel transaction
- CheckCash transaction
- CheckCreate transaction

- CheckCancel transaction
- CheckCash transaction
- CheckCreate transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9313a7c4-e439-4715-9672-fb9cedb5fbb2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9313a7c4-e439-4715-9672-fb9cedb5fbb2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=362cfb17-3d09-4d37-a085-50ad32461015&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=362cfb17-3d09-4d37-a085-50ad32461015&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ef431314-137b-4912-bf28-3b09f40657f9&bo=1&sid=14edf3f09da011f0ab590d7b7c22c9fe&vid=14ef58809da011f0b38933ee2f8232d1&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Check&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&r=&lt=1649&evt=pageLoad&sv=2&cdb=AQAS&rn=995482)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=245e483b-30cd-4e44-9f0c-787f2fbeacd5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=245e483b-30cd-4e44-9f0c-787f2fbeacd5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3912fb6d-c2f6-47fa-9994-a95fca341b17&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3912fb6d-c2f6-47fa-9994-a95fca341b17&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92465151-bc2f-4429-bb66-cc6b33346ca1&pt=Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fcheck&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/check#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/check#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/check#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/check#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.ac71dbe64a7ac12fa392d7d4f0f85b6d.1759197133866.1759197133866.1759197133866.1&__hssc=78174987.1.1759197133866&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/check.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L50-L63)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/protocol/impl/Indexes.cpp#L193-L200)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.ac71dbe64a7ac12fa392d7d4f0f85b6d.1759197133866.1759197133866.1759197133866.1&__hssc=78174987.1.1759197133866&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:52:23.406Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
