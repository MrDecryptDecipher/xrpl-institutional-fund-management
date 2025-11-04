# Clawback
URL: https://xrpl.org/docs/references/protocol/transactions/types/clawback
Section: H19

## Overview


## Extracted Content
# Clawback

[Source]

Claw back tokens issued by your account.

Clawback is disabled by default. To use clawback, you must send an AccountSet transaction to enable the Allow Trust Line Clawback setting. An issuer with any existing tokens cannot enable Clawback. You can only enable Allow Trust Line Clawback if you have a completely empty owner directory, meaning you must do so before you set up any trust lines, offers, escrows, payment channels, checks, or signer lists.  After you enable Clawback, it cannot reverted: the account permanently gains the ability to claw back issued assets on trust lines.

(Added by the Clawback amendment.)


## Example Clawback JSON

```
{
  "TransactionType": "Clawback",
  "Account": "rp6abvbTbjoce8ZDJkT6snvxTZSYMBCC9S",
  "Amount": {
      "currency": "FOO",
      "issuer": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
      "value": "314.159"
    }
}
```


## Clawback Fields

In addition to the common fields, Clawback transactions use the following fields:

| Field | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| Amount | Currency Amount | Amount | The amount being clawed back, as well as the counterparty from which the amount is being clawed back. The quantity to claw back, in the value sub-field, must not be zero. If this is more than the current balance, the transaction claws back the entire balance. The sub-field issuer within Amount represents the token holder's account ID, rather than the issuer's. |
| Holder | String | AccountID | (Optional) Specifies the holder's address from which to claw back. The holder must already own an MPToken object with a non-zero balance. (Requires the MPTokensV1 amendment ) |


`Amount`

`value`

`issuer`

`Amount`

`Holder`

`MPToken`

NoteFor an IOU (trust line) in the XRP Ledger, the party that created a token is called the issuer, but trust lines are bidirectional and, under some configurations, both sides can be seen as the issuer. In this transaction, the token issuer's address is in the Account field, and the token holder's address is in the Amount field's issuer sub-field.

`Account`

`Amount`

`issuer`

NoteTo claw back funds from an MPT holder, the issuer must have specified that the MPT allows clawback by setting the tfMPTCanClawback flag when creating the MPT using the MPTokenIssuanceCreate transaction. Assuming an MPT was created with this flag set, clawbacks are allowed using the Clawback transaction.

`tfMPTCanClawback`

`MPTokenIssuanceCreate`

`Clawback`


## Error Cases

Besides errors that can occur for all transactions, Clawback transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| temDISABLED | Occurs if the Clawback amendment is not enabled. |
| temBAD_AMOUNT | Occurs if the holder's balance is 0. It is not an error if the amount exceeds the holder's balance; in that case, the maximum available balance is clawed back. Also occurs if the counterparty listed in Amount is the same as the Account issuing this transaction. |
| tecAMM_ACCOUNT | This operation is not allowed with an AMM account. Use AMMClawback instead. |
| tecNO_LINE | Occurs there is no trust line with the counterparty or that trust line's balance is 0. |
| tecNO_PERMISSION | Occurs if you attempt to set lsfAllowTrustlineClawback while lsfNoFreeze is set. Also occurs, conversely, if you try to set lsfNoFreeze while lsfAllowTrustLineClawback is set. |


`temDISABLED`

`temBAD_AMOUNT`

`Amount`

`Account`

`tecAMM_ACCOUNT`

`AMMClawback`

`tecNO_LINE`

`tecNO_PERMISSION`

`lsfAllowTrustlineClawback`

`lsfNoFreeze`

`lsfNoFreeze`

`lsfAllowTrustLineClawback`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=26c9f5dd-6442-4a2a-b214-f38bd118dcda&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=26c9f5dd-6442-4a2a-b214-f38bd118dcda&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a637f440-5bda-430e-a17e-85c30135c5cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a637f440-5bda-430e-a17e-85c30135c5cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=2cadf7e1-127d-44dc-af71-d41b1ab4f1bd&bo=1&sid=30b95f709da211f08e21c7a87cfb7bd9&vid=30b9dc409da211f098e13398de3256a7&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Clawback&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&r=&lt=2840&evt=pageLoad&sv=2&cdb=AQAS&rn=541160)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4df842a2-4061-4657-8f6d-a6b3cffcba81&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4df842a2-4061-4657-8f6d-a6b3cffcba81&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7366e8a0-2ef8-441a-bb86-e5d1fcb6d09c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7366e8a0-2ef8-441a-bb86-e5d1fcb6d09c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5277abd2-175f-4c34-b480-f7cadba21ef2&pt=Clawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/clawback#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/clawback#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/clawback#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/clawback#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.87e5920488fd3cc5a69b4917d0ed614e.1759198039259.1759198039259.1759198039259.1&__hssc=78174987.1.1759198039259&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/clawback.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/Clawback.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.87e5920488fd3cc5a69b4917d0ed614e.1759198039259.1759198039259.1759198039259.1&__hssc=78174987.1.1759198039259&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:07:27.414Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
