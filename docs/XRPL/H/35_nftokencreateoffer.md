# NFTokenCreateOffer
URL: https://xrpl.org/docs/references/protocol/transactions/types/nftokencreateoffer
Section: H35

## Overview


## Extracted Content
# NFTokenCreateOffer

[Source]

Creates either a new Sell offer for an NFToken owned by the account executing the transaction, or a new Buy offer for an NFToken owned by another account.

`NFToken`

`NFToken`

If successful, the transaction creates a NFTokenOffer object. Each offer counts as one object towards the owner reserve of the account that placed the offer.

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFTokenCreateOffer JSON

```
{
    "TransactionType": "NFTokenCreateOffer",
    "Account": "rs8jBmmfpwgmrSPgwMsh7CvKRmRt1JTVSX",
    "NFTokenID": "000100001E962F495F07A990F4ED55ACCFEEF365DBAA76B6A048C0A200000007",
    "Amount": "1000000",
    "Flags": 1
}
```


## NFTokenCreateOffer Fields

In addition to the common fields, NFTokenCreateOffer transactions use the following fields:

| Field | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| Owner | String | AccountID | (Optional) Who owns the corresponding NFToken. If the offer is to buy a token, this field must be present and it must be different than the Account field (since an offer to buy a token one already holds is meaningless). If the offer is to sell a token, this field must not be present, as the owner is, implicitly, the same as the Account (since an offer to sell a token one doesn't already hold is meaningless). |
| NFTokenID | String | UInt256 | Identifies the NFToken object that the offer references. |
| Amount | Currency Amount | Amount | Indicates the amount expected or offered for the corresponding NFToken. The amount must be non-zero, except where this is an offer to sell and the asset is XRP; then, it is legal to specify an amount of zero, which means that the current owner of the token is giving it away, gratis, either to anyone at all, or to the account identified by the Destination field. |
| Expiration | Number | UInt32 | (Optional) Time after which the offer is no longer active, in seconds since the Ripple Epoch. |
| Destination | String | AccountID | (Optional) If present, indicates that this offer may only be accepted by the specified account. Attempts by other accounts to accept this offer MUST fail. |


`Owner`

`NFToken`

`Account`

`Account`

`NFTokenID`

`NFToken`

`Amount`

`NFToken`

`Destination`

`Expiration`

`Destination`


## NFTokenCreateOffer Flags

Transactions of the NFTokenCreateOffer type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfSellNFToken | 0x00000001 | 1 | If enabled, indicates that the offer is a sell offer. Otherwise, it is a buy offer. |


`tfSellNFToken`

`0x00000001`

`1`


## Error Cases

Besides errors that can occur for all transactions, NFTokenCreateOffer transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| temDISABLED | The NonFungibleTokensV1 amendment is not enabled. |
| temBAD_AMOUNT | The Amount field is not valid. For example, the amount was zero for a buy offer, or the amount is denominated in fungible tokens but the NFToken has the lsfOnlyXRP flag enabled. |
| temBAD_EXPIRATION | The specified Expiration time is invalid (for example, 0). |
| tecDIR_FULL | The sender already owns too many objects in the ledger, or there are already too many offers to buy or sell this token. |
| tecEXPIRED | The specified Expiration time has already passed. |
| tecFROZEN | The Amount is denominated in fungible tokens, but one of the trust lines that would receive tokens from this offer is frozen. This could be the seller's trust line or the NFToken's issuer's trust line (if the NFToken has a transfer fee). |
| tecINSUFFICIENT_RESERVE | The sender does not have enough XRP to meet the reserve requirement after placing this offer. |
| tecNO_DST | The account specified in the Destination field does not exist in the ledger. |
| tecNO_ENTRY | The NFToken is not owned by the expected account. |
| tecNO_ISSUER | The issuer specified in the Amount field does not exist. |
| tecNO_LINE | The Amount field is denominated in fungible tokens, but the NFToken's issuer does not have a trust line for those tokens and the NFToken does not have the lsfTrustLine flag enabled. |
| tecNO_PERMISSION | The Destination account blocks incoming NFTokenOffers. (Requires the DisallowIncoming amendment ) |
| tecUNFUNDED_OFFER | For a buy offer, the sender does have the funds specified in the Amount field available. If the Amount is XRP, this could be due to the reserve requirement; if the Amount is denominated in fungible tokens, this could be because they are frozen. |
| tefNFTOKEN_IS_NOT_TRANSFERABLE | The NFToken has the lsfTransferable flag disabled and this transaction would not transfer the NFToken to or from the issuer. |


`temDISABLED`

`temBAD_AMOUNT`

`Amount`

`NFToken`

`lsfOnlyXRP`

`temBAD_EXPIRATION`

`Expiration`

`0`

`tecDIR_FULL`

`tecEXPIRED`

`Expiration`

`tecFROZEN`

`Amount`

`NFToken`

`NFToken`

`tecINSUFFICIENT_RESERVE`

`tecNO_DST`

`Destination`

`tecNO_ENTRY`

`NFToken`

`tecNO_ISSUER`

`Amount`

`tecNO_LINE`

`Amount`

`NFToken`

`NFToken`

`lsfTrustLine`

`tecNO_PERMISSION`

`Destination`

`tecUNFUNDED_OFFER`

`Amount`

`Amount`

`Amount`

`tefNFTOKEN_IS_NOT_TRANSFERABLE`

`NFToken`

`lsfTransferable`

`NFToken`


## See Also

- NFTokenOffer entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=77c90939-aa5c-44b2-a953-74f7e67fad6d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=77c90939-aa5c-44b2-a953-74f7e67fad6d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6476f3fe-8b95-4e95-a8d3-0ef0a9c1edbb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6476f3fe-8b95-4e95-a8d3-0ef0a9c1edbb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4c56dd87-1112-4368-9dd8-fa5c96e3cef3&bo=1&sid=eb760d409da211f0a9612d695a8698ad&vid=eb76d2409da211f0941509000956a41c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFTokenCreateOffer&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&r=&lt=2058&evt=pageLoad&sv=2&cdb=AQAS&rn=253378)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9078b91a-8c81-4a4c-a3e9-f31d5143404c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9078b91a-8c81-4a4c-a3e9-f31d5143404c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=562e31fd-1d76-4180-8568-b54250b4f9c3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=562e31fd-1d76-4180-8568-b54250b4f9c3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b912b906-bfda-44fc-8748-d91375568d6b&pt=NFTokenCreateOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencreateoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/nftokencreateoffer#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/nftokencreateoffer#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/nftokencreateoffer#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/nftokencreateoffer#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.662a7f2455d4fed15ffb84669160df22.1759198351722.1759198351722.1759198351722.1&__hssc=78174987.1.1759198351722&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/nftokencreateoffer.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/NFTokenCreateOffer.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.662a7f2455d4fed15ffb84669160df22.1759198351722.1759198351722.1759198351722.1&__hssc=78174987.1.1759198351722&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:12:41.990Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
