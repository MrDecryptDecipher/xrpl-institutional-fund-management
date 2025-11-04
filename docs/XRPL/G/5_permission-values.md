# Permission Values
URL: https://xrpl.org/docs/references/protocol/data-types/permission-values
Section: G5

## Overview


## Extracted Content
# Permission Values

Permission delegation defines permissions that can be granted to other accounts. These permissions fall into the following categories:

- Transaction Type Permissions - Permission to send transactions with the specified transaction type.
- Granular Permissions - Permission to send transactions with a specific subset of functionality.

(Requires the PermissionDelegation amendment .)


## Numeric and String Values

In the canonical binary format for transactions and ledger data, permission values are stored in a numeric form (specifically, as a 32-bit unsigned integer). However, in JSON they can be specified and returned in string format for convenience, similar to how transaction type names (TransactionType fields) work.

`TransactionType`

When specifying a permission value in JSON, you can use either the numeric value or the string value. When serving data, the server supplies the string value if it is known, and falls back to the numeric value otherwise.

Not all client libraries support numeric PermissionValue types. In most cases, you should use the string names of the permissions you want to grant.

- For transaction type permissions, the string is the name of the transaction type exactly (case-sensitive). For example, a permission value of "PaymentChannelClaim" grants permission to send PaymentChannelClaim transactions.
- For granular permissions, the string is the name of the granular permission (case-sensitive). For example, a permission value of "TrustlineAuthorize" grants permission to send TrustSet transactions that authorize trust lines (but not ones that modify other settings such as the trust line limit or freeze status).

`"PaymentChannelClaim"`

`"TrustlineAuthorize"`

The numeric value 0 is reserved for "full permissions", meaning permission to send transactions of all types, but it is not possible to delegate full permissions.

`0`


## Transaction Type Permissions

Transaction Type Permissions have numeric values from 1 to 65536 (that is, 216), inclusive. They correspond with known transaction types, except you add 1 when specifying a transaction type as a permission value. For example, the string "Payment" corresponds to a TransactionType value of 0, but a PermissionValue value of 1. To grant permissions to make Payment transactions, you can specify either "PermissionValue": "Payment" or "PermissionValue": 1.

`"Payment"`

`TransactionType`

`0`

`PermissionValue`

`1`

`"PermissionValue": "Payment"`

`"PermissionValue": 1`

For a mapping of transaction types known by a server and their corresponding numeric transaction type values, check the TRANSACTION_TYPES field in the server_definitions method.

`TRANSACTION_TYPES`


### List of Non-Delegatable Permissions

Some transaction types can't be delegated. If you attempt to grant these permissions to a delegate, the transaction fails with a result code such as tecNO_PERMISSION. This includes all transaction types that can be used to grant other permissions to different key pairs or accounts. Additionally, all pseudo-transaction types can't be delegated since they can't be sent by normal accounts anyway.

`tecNO_PERMISSION`

The following permissions cannot be delegated:

| Transaction Type | Permission Value |
| --- | --- |
| AccountSet | 4 |
| SetRegularKey | 6 |
| SignerListSet | 13 |
| AccountDelete | 22 |
| LedgerStateFix | 54 |
| DelegateSet | 65 |
| EnableAmendment | 101 |
| SetFee | 102 |
| UNLModify | 103 |


`4`

`6`

`13`

`22`

`54`

`65`

`101`

`102`

`103`

With only the PermissionDelegation amendment, it's possible to assign permissions for transaction types that are reserved, unassigned, or part of amendments that are not currently enabled; it's also possible to assign PermissionValue 0 for full permissions. However, these values do not actually grant any permissions. This is a bug, and a future amendment will prevent assigning values outside of currently-enabled, delegatable transaction types or known granular permissions.

`0`


## Granular Permissions

[Source]

Granular Permissions have numeric types of 65537 and up, corresponding to specific names of permissions. Values that are not defined are not allowed. Each granular permission is a subset of a single transaction type's functionality.

| Numeric Value | Name | Transaction Type | Description |
| --- | --- | --- | --- |
| 65537 | TrustlineAuthorize | TrustSet | Can authorize individual trust lines. |
| 65538 | TrustlineFreeze | TrustSet | Can freeze individual trust lines. |
| 65539 | TrustlineUnfreeze | TrustSet | Can unfreeze individual trust lines. |
| 65540 | AccountDomainSet | AccountSet | Can set the Domain field of the account. |
| 65541 | AccountEmailHashSet | AccountSet | Can set the EmailHash field of the account. |
| 65542 | AccountMessageKeySet | AccountSet | Can set the MessageKey field of the account. |
| 65543 | AccountTransferRateSet | AccountSet | Can set the transfer fee of fungible tokens issued by the account. |
| 65544 | AccountTickSizeSet | AccountSet | Can set the tick size of fungible tokens issued by the account. |
| 65545 | PaymentMint | Payment | Can send payments that mint new fungible tokens or MPTs. |
| 65546 | PaymentBurn | Payment | Can send payments that burn fungible tokens or MPTs. |
| 65547 | MPTokenIssuanceLock | MPTokenIssuanceSet | Can lock the balances of a particular MPT issued by the account. (Requires the MPTokensV1 amendment .) |
| 65548 | MPTokenIssuanceUnlock | MPTokenIssuanceSet | Can unlock the balances of a particular MPT issued by the account. (Requires the MPTokensV1 amendment .) |


`65537`

`TrustlineAuthorize`

`65538`

`TrustlineFreeze`

`65539`

`TrustlineUnfreeze`

`65540`

`AccountDomainSet`

`Domain`

`65541`

`AccountEmailHashSet`

`EmailHash`

`65542`

`AccountMessageKeySet`

`MessageKey`

`65543`

`AccountTransferRateSet`

`65544`

`AccountTickSizeSet`

`65545`

`PaymentMint`

`65546`

`PaymentBurn`

`65547`

`MPTokenIssuanceLock`

`65548`

`MPTokenIssuanceUnlock`


### Limitations to Granular Permissions

The set of granular permissions is hard-coded. No custom configurations are allowed. For example, you cannot add permissions based on specific currencies. Adding a new granular permission requires an amendment.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e94f12b8-584f-4c68-a86a-604651a280e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e94f12b8-584f-4c68-a86a-604651a280e5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3fa3cc9-a3cf-4112-bcb5-915a59432299&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b3fa3cc9-a3cf-4112-bcb5-915a59432299&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a6ecd8fc-1862-47b4-a45b-3144f86aacc8&bo=1&sid=ab45de709d9f11f0a77217276445702b&vid=ab465d509d9f11f09016c33ecd627b0c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Permission%20Values&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&r=&lt=2627&evt=pageLoad&sv=2&cdb=AQAS&rn=668144)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b4d7ff0a-26cb-4c49-8b70-02eb9e93bb63&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b4d7ff0a-26cb-4c49-8b70-02eb9e93bb63&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6431bf5e-3f59-45f4-a628-d5fe273ec659&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6431bf5e-3f59-45f4-a628-d5fe273ec659&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e74c293-1870-4f9c-a2a3-da7634829d96&pt=Permission%20Values&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fpermission-values&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/data-types/permission-values#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/data-types/permission-values#)
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
- [Resources](https://xrpl.org/docs/references/protocol/data-types/permission-values#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/data-types/permission-values#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6327bfc51e8505e966a1f5ef11943e1c.1759196956368.1759196956368.1759196956368.1&__hssc=78174987.1.1759196956368&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/data-types/permission-values.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/include/xrpl/protocol/detail/permissions.macro)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6327bfc51e8505e966a1f5ef11943e1c.1759196956368.1759196956368.1759196956368.1&__hssc=78174987.1.1759196956368&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:49:27.392Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
