# DepositPreauth
URL: https://xrpl.org/docs/references/protocol/transactions/types/depositpreauth
Section: H20

## Overview


## Extracted Content
# DepositPreauth

[Source]

A DepositPreauth transaction grants preauthorization to deliver payments to your account. This is only useful if you are using (or plan to use) Deposit Authorization.

TipYou can use this transaction before you enable Deposit Authorization. This may be useful to ensure a smooth transition from not requiring deposit authorization to requiring it.

(Added by the DepositPreauth amendment.)


## Example DepositPreauth JSON

- Single account preauthorization
- MoreCredential preauthorization
- Credential preauthorization

- Credential preauthorization

```
{
  "TransactionType" : "DepositPreauth",
  "Account" : "rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8",
  "Authorize" : "rEhxGqkqPPSxQ3P25J66ft5TwpzV14k2de",
  "Fee" : "10",
  "Flags" : 2147483648,
  "Sequence" : 2
}
```


## DepositPreauth Fields

In addition to the common fields, DepositPreauth transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Authorize | String - Address | AccountID | No | An account to preauthorize. |
| AuthorizeCredentials | Array | Array | No | A set of credentials to authorize. (Requires the Credentials amendment. ) |
| Unauthorize | String | AccountID | No | An account whose preauthorization should be revoked. |
| UnauthorizeCredentials | Array | Array | No | A set of credentials whose preauthorization should be revoked. (Requires the Credentials amendment. ) |


`Authorize`

`AuthorizeCredentials`

`Unauthorize`

`UnauthorizeCredentials`

You must provide exactly one of Authorize, AuthorizeCredentials, Unauthorize, or UnauthorizeCredentials.

`Authorize`

`AuthorizeCredentials`

`Unauthorize`

`UnauthorizeCredentials`

If this transaction is successful, it creates or removes a DepositPreauth entry in the ledger, based on the field provided.


### AuthorizeCredentials Objects

If provided, each member of the AuthorizeCredentials field or UnauthorizeCredentials field must be an inner object with the following fields:

`AuthorizeCredentials`

`UnauthorizeCredentials`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Issuer | String - Address | AccountID | Yes | The issuer of the credential. |
| CredentialType | String - Hexadecimal | Blob | Yes | The credential type of the credential. |


`Issuer`

`CredentialType`


## Error Cases

In addition to error types that can occur for all transactions, DepositPreauth transactions can result in the following error codes:

| Error Code | Description |
| --- | --- |
| tecDUPLICATE | The transaction would create a preauthorization that already exists. |
| tecINSUFFICIENT_RESERVE | The sender would not meet the reserve requirement after adding another entry to the ledger. (A DepositPreauth entry counts as one item towards the authorizer's owner reserve.) |
| tecNO_ENTRY | The transaction tried to revoke a preauthorization that does not exist in the ledger. |
| tecNO_ISSUER | One or more specified credential issuers does not exist in the ledger. |
| tecNO_TARGET | The transaction tried to authorize an account that is not a funded account in the ledger. |
| temCANNOT_PREAUTH_SELF | The address in the Authorize field is the sender of the transaction. You cannot preauthorize yourself. |
| temDISABLED | A required amendment is not enabled. |


`tecDUPLICATE`

`tecINSUFFICIENT_RESERVE`

`tecNO_ENTRY`

`tecNO_ISSUER`

`tecNO_TARGET`

`temCANNOT_PREAUTH_SELF`

`Authorize`

`temDISABLED`


## See Also

- DepositPreauth object

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0a94dd0-575d-4dbe-a414-154bd28c7320&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0a94dd0-575d-4dbe-a414-154bd28c7320&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=843f8ea6-479b-40d8-8b67-2263b5fdbeaf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=843f8ea6-479b-40d8-8b67-2263b5fdbeaf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=0f9476c5-4c0c-4848-8aa1-f947e0743e2d&bo=1&sid=3c504c209da211f0b76d915276a8d78a&vid=3c50bde09da211f08984c520d2839abc&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=DepositPreauth&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&r=&lt=2568&evt=pageLoad&sv=2&cdb=AQAS&rn=319625)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a2783657-3c84-4e54-9b1b-8fa441154db1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a2783657-3c84-4e54-9b1b-8fa441154db1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9193bd40-9626-465e-83c2-b37680122232&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9193bd40-9626-465e-83c2-b37680122232&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b836d3b5-dfff-465d-ad64-e298d6ea0a9e&pt=DepositPreauth&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fdepositpreauth&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/depositpreauth#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/depositpreauth#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/depositpreauth#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/depositpreauth#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/depositpreauth.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/DepositPreauth.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:07:48.791Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
