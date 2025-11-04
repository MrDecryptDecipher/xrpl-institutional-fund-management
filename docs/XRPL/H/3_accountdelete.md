# AccountDelete
URL: https://xrpl.org/docs/references/protocol/transactions/types/accountdelete
Section: H3

## Overview


## Extracted Content
# AccountDelete

[Source]

An AccountDelete transaction deletes an account and any objects it owns in the XRP Ledger, if possible, sending the account's remaining XRP to a specified destination account. See Deleting Accounts for the requirements to delete an account.

(Added by the DeletableAccounts amendment.)


## Example AccountDelete JSON

```
{
    "TransactionType": "AccountDelete",
    "Account": "rWYkbWkCeg8dP6rXALnjgZSjjLyih5NXm",
    "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
    "DestinationTag": 13,
    "Fee": "200000",
    "Sequence": 2470665,
    "Flags": 2147483648
}
```


## AccountDelete Fields

In addition to the common fields, AccountDelete transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| CredentialIDs | Array of Strings | Vector256 | No | Set of Credentials to authorize a deposit made by this transaction. Each member of the array must be the ledger entry ID of a Credential entry in the ledger. For details, see Credential IDs. |
| Destination | String - Address | AccountID | Yes | The address of an account to receive any leftover XRP after deleting the sending account. Must be a funded account in the ledger, and must not be the sending account. |
| DestinationTag | Number | UInt32 | No | Arbitrary destination tag that identifies a hosted recipient or other information for the recipient of the deleted account's leftover XRP. |


`CredentialIDs`

`Destination`

`DestinationTag`


## Special Transaction Cost

As an additional deterrent against ledger spam, the AccountDelete transaction requires a much higher than usual transaction cost: instead of the standard minimum of 0.00001 XRP, AccountDelete must destroy at least the owner reserve amount, currently 0.2 XRP. This discourages excessive creation of new accounts because the reserve requirement cannot be fully recouped by deleting the account.

The transaction cost always applies when a transaction is included in a validated ledger, even if the transaction fails to delete the account. (See Error Cases.) To greatly reduce the chances of paying the high transaction cost if the account cannot be deleted, submit the transaction with fail_hard enabled.

`fail_hard`


## Error Cases

Besides errors that can occur for all transactions, AccountDelete transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| temDISABLED | Occurs if the DeletableAccounts amendment is not enabled. |
| temDST_IS_SRC | Occurs if the Destination matches the sender of the transaction (Account field). |
| tecDST_TAG_NEEDED | Occurs if the Destination account requires a destination tag, but the DestinationTag field was not provided. |
| tecNO_DST | Occurs if the Destination account is not a funded account in the ledger. |
| tecNO_PERMISSION | Occurs if the Destination account requires deposit authorization and the sender is not preauthorized. |
| tecTOO_SOON | Occurs if the sender's Sequence number is too high. The transaction's Sequence number plus 256 must be less than the current Ledger Index. This prevents replay of old transactions if this account is resurrected after it is deleted. |
| tecHAS_OBLIGATIONS | Occurs if the account to be deleted is connected to objects that cannot be deleted in the ledger. (This includes objects created by other accounts, such as escrows and for example NFT's minted, even if owned by another account.) |
| tefTOO_BIG | Occurs if the sending account is linked to more than 1000 objects in the ledger. The transaction could succeed on retry if some of those objects were deleted separately first. |


`temDISABLED`

`temDST_IS_SRC`

`Destination`

`Account`

`tecDST_TAG_NEEDED`

`Destination`

`DestinationTag`

`tecNO_DST`

`Destination`

`tecNO_PERMISSION`

`Destination`

`tecTOO_SOON`

`Sequence`

`Sequence`

`tecHAS_OBLIGATIONS`

`tefTOO_BIG`


## See Also

- AccountRoot entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6f7cde78-1234-4b7e-83e3-cfcb39d3c25e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6f7cde78-1234-4b7e-83e3-cfcb39d3c25e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bfef4120-c09f-4de6-b1d4-1f496454c48c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bfef4120-c09f-4de6-b1d4-1f496454c48c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f2d9e031-ad05-4887-a207-1f9baf33d6b0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f2d9e031-ad05-4887-a207-1f9baf33d6b0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9445f56b-21c2-4336-989d-dc51389592f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9445f56b-21c2-4336-989d-dc51389592f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ee2ca79b-9c4f-4880-8991-3c4a67562989&pt=AccountDelete&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=563cf9a5-a13e-4bea-b493-e77c177c5f6e&bo=1&sid=61585db09da111f0b6d623e9843bb905&vid=61592bb09da111f0bf48d9bb0298b455&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AccountDelete&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountdelete&r=&lt=4054&evt=pageLoad&sv=2&cdb=AQAS&rn=200109)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/accountdelete#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/accountdelete#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/accountdelete#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/accountdelete#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.319edc588c1f52d4dcb8036214ba65e9.1759197690923.1759197690923.1759197690923.1&__hssc=78174987.1.1759197690923&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/accountdelete.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/DeleteAccount.cpp)
- [even if owned by another account](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/DeleteAccount.cpp#L197)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.319edc588c1f52d4dcb8036214ba65e9.1759197690923.1759197690923.1759197690923.1&__hssc=78174987.1.1759197690923&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:01:39.734Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
