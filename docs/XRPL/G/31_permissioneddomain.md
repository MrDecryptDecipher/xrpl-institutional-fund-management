# PermissionedDomain
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/permissioneddomain
Section: G31

## Overview


## Extracted Content
# PermissionedDomain

[Source]

A PermissionedDomain ledger entry describes a single permissioned domain instance. You can create a permissioned domain by sending a PermissionedDomainSet transaction.

`PermissionedDomain`

(Requires the PermissionedDomains amendment )


## Example PermissionedDomain JSON

```
{
  "LedgerEntryType": "PermissionedDomain",
  "Fee": "10",
  "Flags": 0,
  "Owner": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "OwnerNode": "0000000000000000",
  "Sequence": 390,
  "AcceptedCredentials": [
    {
        "Credential": {
            "Issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
            "CredentialType": "6D795F63726564656E7469616C"
        }
    }
  ],
  "PreviousTxnID": "E7E3F2BBAAF48CF893896E48DC4A02BDA0C747B198D5AE18BC3D7567EE64B904",
  "PreviousTxnLgrSeq": 8734523,
  "index": "3DFA1DDEA27AF7E466DE395CCB16158E07ECA6BC4EB5580F75EBD39DE833645F"
}
```


## PermissionedDomain Fields

In addition to the common fields, PermissionedDomain entries have the following fields:

`PermissionedDomain`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| AcceptedCredentials | Array | Array | Yes | A list of 1 to 10 Credential objects that grant access to this domain. The array is stored sorted by issuer. |
| Owner | String - Address | AccountID | Yes | The address of the account that owns this domain. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the owner directory links to this entry, in case the directory consists of multiple pages. |
| PreviousTxnID | String - Hash | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |
| Sequence | Number | UInt32 | Yes | The Sequence value of the transaction that created this entry. |


`AcceptedCredentials`

`Owner`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`Sequence`

`Sequence`


### AcceptedCredentials Objects

Each member of the AcceptedCredentials array is an inner object named Credential with the following nested fields:

`AcceptedCredentials`

`Credential`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Issuer | String - Address | AccountID | Yes | The issuer of the credential. |
| CredentialType | String | Blob | Yes | The type of credential, as hexadecimal. This is an arbitrary value from 1 to 64 bytes that the issuer sets when they issue a credential. |


`Issuer`

`CredentialType`

In the usual JSON format, inner objects are wrapped in an object with one field, whose name defines the inner object type. In this case, the wrapping field is named Credential. For example:

`Credential`

```
"AcceptedCredentials": [
    {
        "Credential": {
            "Issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
            "CredentialType": "6D795F63726564656E7469616C"
        }
    },
    // ... additional Credential inner objects ...
]
```


## PermissionedDomain Flags

There are no flags defined for PermissionedDomain entries.

`PermissionedDomain`


## PermissionedDomain Reserve

Each PermissionedDomain entry counts as 1 item toward its owner's reserve requirement.

`PermissionedDomain`

A PermissionedDomain entry is a deletion blocker, meaning an account cannot be deleted if it owns any PermissionedDomain entries.

`PermissionedDomain`

`PermissionedDomain`


## PermissionedDomain ID Format

The ID of a PermissionedDomain entry is the SHA-512Half of the following values, concatenated in order:

`PermissionedDomain`

1. The PermissionedDomain space key (0x0082).
1. The AccountID of the PermissionedDomain's owner.
1. The Sequence number of the transaction that created the PermissionedDomain.

`PermissionedDomain`

`0x0082`

`PermissionedDomain`

`PermissionedDomain`


## See Also

- Transactions:PermissionedDomainDelete transactionPermissionedDomainSet transaction
- PermissionedDomainDelete transaction
- PermissionedDomainSet transaction

- PermissionedDomainDelete transaction
- PermissionedDomainSet transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=80d45740-bcd0-4554-b733-a676f1a77cf7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=80d45740-bcd0-4554-b733-a676f1a77cf7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4bdeaebf-c288-4e27-94a6-eb0110a16ff0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4bdeaebf-c288-4e27-94a6-eb0110a16ff0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=24cacc22-71a3-40ec-a99b-5ed302c59ec8&bo=1&sid=f11bc0409da011f095828dffcc4ea3ca&vid=f11c43109da011f0ba019762d51c5f92&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=PermissionedDomain&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&r=&lt=2720&evt=pageLoad&sv=2&cdb=AQAS&rn=737628)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b871180d-5265-4615-8f76-83d05d432a74&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b871180d-5265-4615-8f76-83d05d432a74&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=301c810f-e2a7-4fe4-b63c-ea360b0b4f2d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=301c810f-e2a7-4fe4-b63c-ea360b0b4f2d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e15bd85a-acef-4817-9b1d-33a8c9217e13&pt=PermissionedDomain&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fpermissioneddomain&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/permissioneddomain#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/permissioneddomain#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/permissioneddomain#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/permissioneddomain#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.23b524aa762d5c3fb0afeac03313082f.1759197503216.1759197503216.1759197503216.1&__hssc=78174987.1.1759197503216&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/permissioneddomain.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/include/xrpl/protocol/detail/ledger_entries.macro#L451-L461)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.23b524aa762d5c3fb0afeac03313082f.1759197503216.1759197503216.1759197503216.1&__hssc=78174987.1.1759197503216&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:58:33.584Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
