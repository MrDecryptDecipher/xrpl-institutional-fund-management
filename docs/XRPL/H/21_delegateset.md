# DelegateSet
URL: https://xrpl.org/docs/references/protocol/transactions/types/delegateset
Section: H21

## Overview


## Extracted Content
# DelegateSet

[Source]

Delegate permissions to another account to send transactions on your behalf. This transaction type can grant, change, or revoke permissions; it creates, modifies, or deletes a Delegate ledger entry accordingly.

(Requires the PermissionDelegation amendment .)


## Example DelegateSet JSON

```
{
    "TransactionType": "DelegateSet",
    "Account": "rw81qtsfF9rws4RbmYepf5394gp81TQv5Y",
    "Authorize": "r9GAKojMTyexqvy8DXFWYq63Mod5k5wnkT",
    "Fee": "1",
    "Flags": 0,
    "LastLedgerSequence": 4747822,
    "Permissions": [
        {
            "Permission": {
                "PermissionValue": "AccountDomainSet"
            }
        }
    ],
    "Sequence": 4747802
}
```


## DelegateSet Fields

In addition to the common fields, DelegateSet transactions use the following fields:

| Field | Required? | JSON Type | Internal Type | Description |
| --- | --- | --- | --- | --- |
| Authorize | Yes | String - Address | AccountID | The account being granted permissions, also called the delegate. |
| Permissions | Yes | Array | Array | A list of up to 10 Permission objects each specifying a different permission granted to the delegate. The delegate's permissions are updated to match this set of permissions exactly. To revoke all permissions, use an empty array. |


`Authorize`

`Permissions`

If a Delegate ledger entry does not exist to record the granted permissions, this transaction creates one. If it already exists, the transaction updates the set of permissions to match the list in the transaction: any permissions not listed are revoked. If all permissions are revoked, the transaction deletes the Delegate ledger entry.

If you want to delegate more than 10 permissions, consider using multi-signing instead.


### Permission Objects

Each item in the Permissions array is an inner object with the following nested field:

`Permissions`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| PermissionValue | String or Number | UInt32 | Yes | A permission to grant to the delegate, which can be either a transaction type or a granular permission. See Permission Values for a full list. |


`PermissionValue`


## Error Cases

Besides errors that can occur for all transactions, DelegateSet transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecDIR_FULL | The sender owns too many items in the ledger already. |
| tecINSUFFICIENT_RESERVE | The sender does not have enough XRP to meet the reserve requirement of creating a new Delegate ledger entry. |
| tecNO_PERMISSION | At least one permission in the Permissions list is not delegatable. See Permission Values for which permissions are not delegatable. |
| tecNO_TARGET | The account specified in the Authorize field does not exist in the ledger. |
| temARRAY_TOO_LARGE | The Permissions list is too large. It cannot contain more than 10 entries. |
| temDISABLED | The [Permission Delegation amendment][] is not enabled. |
| temMALFORMED | The transaction was invalid. For example, the Authorize account is the same as the sender of the transaction, the Permissions list contains duplicate entries, or one of the permissions in the list is not a valid permission. |


`tecDIR_FULL`

`tecINSUFFICIENT_RESERVE`

`tecNO_PERMISSION`

`Permissions`

`tecNO_TARGET`

`Authorize`

`temARRAY_TOO_LARGE`

`Permissions`

`temDISABLED`

`temMALFORMED`

`Authorize`

`Permissions`


## See Also

- Delegate ledger entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2b8aecbb-40b4-4fda-aa03-a515474a24e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2b8aecbb-40b4-4fda-aa03-a515474a24e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=694cd3ce-f109-4fe1-a41b-8845914a5d58&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=694cd3ce-f109-4fe1-a41b-8845914a5d58&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1ad761ff-fbcc-48f3-815e-56f7c53d1f39&bo=1&sid=48c27c709da211f0a62f511e313b0113&vid=48c2e7009da211f09424e70c779d5e19&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=DelegateSet&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&r=&lt=1706&evt=pageLoad&sv=2&cdb=AQAS&rn=587413)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=15b7ff70-6bf5-432e-ba7b-79116e61c26b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=15b7ff70-6bf5-432e-ba7b-79116e61c26b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f49cc40d-2a7b-426c-8456-d49312824af1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f49cc40d-2a7b-426c-8456-d49312824af1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=fb382129-b284-4337-880a-fea2fb941971&pt=DelegateSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdelegateset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/delegateset#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/delegateset#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/delegateset#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/delegateset#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5c252102c7c5f1fdb361167d453fae39.1759198079546.1759198079546.1759198079546.1&__hssc=78174987.1.1759198079546&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/delegateset.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/1e01cd34f7a216092ed779f291b43324c167167a/src/xrpld/app/tx/detail/DelegateSet.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5c252102c7c5f1fdb361167d453fae39.1759198079546.1759198079546.1759198079546.1&__hssc=78174987.1.1759198079546&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:08:09.239Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
