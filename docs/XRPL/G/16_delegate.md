# Delegate
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/delegate
Section: G16

## Overview


## Extracted Content
# Delegate

[Source]

A Delegate ledger entry stores a set of permissions that an account has delegated to another account. You create a Delegate entry by sending a DelegateSet transaction.

`Delegate`

`Delegate`

(Requires the PermissionDelegation amendment .)


## Example Delegate JSON

```
{
  "Account": "rG8uoRH9uA6AJ6NRj8P4cJG1HNfYcnMPrt",
  "Authorize": "r9GAKojMTyexqvy8DXFWYq63Mod5k5wnkT",
  "Flags": 0,
  "LedgerEntryType": "Delegate",
  "OwnerNode": "0",
  "Permissions": [
    {
      "Permission": {
        "PermissionValue": "AccountDomainSet"
      }
    }
  ],
  "PreviousTxnID": "08DB1BD6ECFC9E8CBD8D954F4EFF6EFD155A392C5060D767B5621CE18951983A",
  "PreviousTxnLgrSeq": 4748731,
  "index": "749D3DCDF9F032DDDB8AC49641BACBFDD398C4B6C231C4AB325B7755962329A2"
}
```


## Delegate Fields

In addition to the common fields, Delegate entries have the following fields:

`Delegate`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The account delegating permissions to another, also called the delegating account. |
| Authorize | String - Address | AccountID | Yes | The account receiving permissions, also called the delegate. |
| Permissions | Array | Array | Yes | A list of permissions granted, with at least 1 and at most 10 items. Each item in the list is a Permission Object. |
| OwnerNode | String - Hexadecimal | UInt64 | Yes | A hint indicating which page of the delegating account's owner directory links to this object, in case the directory consists of multiple pages. |
| PreviousTxnID | String - Hexadecimal | UInt256 | Yes | The identifying hash of the transaction that most recently modified this object. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |


`Account`

`Authorize`

`Permissions`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`


### Permission Objects

Each item in the Permissions array is an inner object with the following nested field:

`Permissions`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| PermissionValue | String or Number | UInt32 | Yes | A permission that has been granted to the delegate, which can be either a transaction type or a granular permission. See Permission Values for a full list. |


`PermissionValue`


## Delegate Flags

There are no flags defined for Delegate entries.

`Delegate`


## Delegate Reserve

Delegate entries count as one item towards the owner reserve of the delegating account, as long as the entry is in the ledger, regardless of how many permissions are delegating. Removing all permissions deletes the entry and frees up the reserve.

`Delegate`

Delegate entries are not deletion blockers. If the owner (delegating) account is deleted, all such ledger entries are deleted along with them. However, the Authorize

`Delegate`

`Authorize`


## See Also

- Transactions:DelegateSet transaction
- DelegateSet transaction

- DelegateSet transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=124adcc3-3cf5-4dab-abad-0c799222fc37&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=124adcc3-3cf5-4dab-abad-0c799222fc37&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=da1faca6-8ccb-4cc1-a288-1723f0acaa45&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=da1faca6-8ccb-4cc1-a288-1723f0acaa45&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=597bacba-b217-464e-8669-71404b5cc226&bo=1&sid=2fee19409da011f0ac0b93ca2468baaf&vid=2fee9a809da011f089df4309fc2a72f4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Delegate&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&r=&lt=2982&evt=pageLoad&sv=2&cdb=AQAS&rn=796233)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29c3dab9-b306-4776-8e48-d479d9f662c1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29c3dab9-b306-4776-8e48-d479d9f662c1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2c8b5df6-bb7a-4dfc-800e-c8b2df39de19&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2c8b5df6-bb7a-4dfc-800e-c8b2df39de19&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=99d7c90e-6057-46e5-8d68-b3d6e1fa6874&pt=Delegate&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdelegate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/delegate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/delegate#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/delegate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/delegate#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.4b504df1b321e3f6123a40aa3abe0c28.1759197179099.1759197179099.1759197179099.1&__hssc=78174987.1.1759197179099&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/delegate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/1e01cd34f7a216092ed779f291b43324c167167a/include/xrpl/protocol/detail/ledger_entries.macro#L475-L482)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.4b504df1b321e3f6123a40aa3abe0c28.1759197179099.1759197179099.1759197179099.1&__hssc=78174987.1.1759197179099&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:53:08.399Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
