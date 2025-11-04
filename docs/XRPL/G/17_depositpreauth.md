# DepositPreauth
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/depositpreauth
Section: G17

## Overview


## Extracted Content
# DepositPreauth

[Source]

A DepositPreauth entry tracks a preauthorization from one account. You can create a preauthorization by sending a DepositPreauth transaction, but it has no effect unless you are using Deposit Authorization.

`DepositPreauth`

A preauthorization allows specific others to send money directly to you even if you have Deposit Authorization enabled. Preauthorizations are one-directional, and have no effect on payments going the opposite direction.

You can preauthorize a specific account or a set of credentials. In the case of a set of credentials, any account that has a matching set of credentials on-ledger can send you money. (Credential preauthorization requires the Credentials amendment. )


## Example DepositPreauth JSON

- Single account preauthorization
- MoreCredential preauthorization
- Credential preauthorization

- Credential preauthorization

```
{
  "LedgerEntryType": "DepositPreauth",
  "Account": "rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8",
  "Authorize": "rEhxGqkqPPSxQ3P25J66ft5TwpzV14k2de",
  "Flags": 0,
  "OwnerNode": "0000000000000000",
  "PreviousTxnID": "3E8964D5A86B3CD6B9ECB33310D4E073D64C865A5B866200AD2B7E29F8326702",
  "PreviousTxnLgrSeq": 7,
  "index": "4A255038CC3ADCC1A9C91509279B59908251728D0DAADB248FFE297D0F7E068C"
}
```


## DepositPreauth Fields

In addition to the common fields, DepositPreauth entries have the following fields:

`DepositPreauth`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | Account | Yes | The account that granted the preauthorization. (The destination of the preauthorized payments.) |
| Authorize | String | Account | No | The account that received the preauthorization. (The sender of the preauthorized payments.) |
| AuthorizeCredentials | Array | Array | No | The set of credentials that received preauthorization. (Any account with these credentials is preauthorized.) This array has a minimum length of 1 and a maximum length of 8 credentials. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0070, mapped to the string DepositPreauth, indicates that this is a DepositPreauth object. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the sender's owner directory links to this object, in case the directory consists of multiple pages. Note: The object does not contain a direct link to the owner directory containing it, since that value can be derived from the Account. |
| PreviousTxnID | String - Hash | UInt256 | Yes | The identifying hash of the transaction that most recently modified this object. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |


`Account`

`Authorize`

`AuthorizeCredentials`

`LedgerEntryType`

`0x0070`

`DepositPreauth`

`OwnerNode`

`Account`

`PreviousTxnID`

`PreviousTxnLgrSeq`

Each entry must have either the Authorize field or the AuthorizeCredentials field, but not both.

`Authorize`

`AuthorizeCredentials`


### Authorized Credential Objects

If the entry has an AuthorizeCredentials field, each member of that array is an inner object, identifying one credential to require, with the following format:

`AuthorizeCredentials`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Issuer | String - Address | AccountID | Yes | The issuer of the credential. |
| CredentialType | String - Hexadecimal | Blob | Yes | The credential type of the credential. |


`Issuer`

`CredentialType`

To be preauthorized, an account must hold all the specified credentials.


## DepositPreauth Flags

There are no flags defined for DepositPreauth entries.

`DepositPreauth`


## DepositPreauth Reserve

DepositPreauth entries count as one item towards the owner reserve of the account that granted preauthorization, as long as the entry is in the ledger. Unauthorizing the counterparty frees up the reserve.

`DepositPreauth`


## DepositPreauth ID Format

There are two formats for the ID of a DepositPreauth entry, depending on whether it authorizes an individual account or a set of credentials.

`DepositPreauth`


### Individual Account Preauthorization

In this case, the ID is the SHA-512Half of the following values, concatenated in order:

- The DepositPreauth space key (0x0070)
- The AccountID of the owner of this object (the sender of the DepositPreauth transaction that created this object; in other words, the one that granted the preauthorization)
- The AccountID in the Authorize field

`0x0070`

`Authorize`


### Credential Preauthorization

(Requires the Credentials amendment. )

In this case, the ID is the SHA-512Half of the following values, concatenated in order:

- The Credential Preauth space key (0x0050)
- The AccountID of the owner of this object (the sender of the DepositPreauth transaction that created this object; in other words, the one that granted the preauthorization)
- The contents of the AuthorizeCredentials field.

`0x0050`

`AuthorizeCredentials`


## See Also

- TransactionsDepositPreauth transaction
- DepositPreauth transaction

- DepositPreauth transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=515cbeb0-aa19-4888-992a-c74e1428b99e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=515cbeb0-aa19-4888-992a-c74e1428b99e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4a14d2f2-746f-4bfa-9b78-150f7971091f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4a14d2f2-746f-4bfa-9b78-150f7971091f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=70f96a24-b314-41f0-97c8-deeb679fcf3e&bo=1&sid=3bc1f2209da011f0b8c9e59b060dbe16&vid=3bc281509da011f097ba71bdc35245e6&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=DepositPreauth&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&r=&lt=2493&evt=pageLoad&sv=2&cdb=AQAS&rn=11363)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44954615-cba7-4346-aa71-7c7931ed7024&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44954615-cba7-4346-aa71-7c7931ed7024&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf324c10-9f0d-4680-bd58-0b60af2a50db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cf324c10-9f0d-4680-bd58-0b60af2a50db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=7b29f59c-6b6c-41f1-9cae-d83eb9c74874&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/depositpreauth#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/depositpreauth#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/depositpreauth#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/depositpreauth#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.114c88a023fd1b0b2caeba85f8d8e061.1759197198808.1759197198808.1759197198808.1&__hssc=78174987.1.1759197198808&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/depositpreauth.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L246-L253)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.114c88a023fd1b0b2caeba85f8d8e061.1759197198808.1759197198808.1759197198808.1&__hssc=78174987.1.1759197198808&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:53:28.739Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
