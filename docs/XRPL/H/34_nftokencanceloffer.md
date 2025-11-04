# NFTokenCancelOffer
URL: https://xrpl.org/docs/references/protocol/transactions/types/nftokencanceloffer
Section: H34

## Overview


## Extracted Content
# NFTokenCancelOffer

[Source]

The NFTokenCancelOffer transaction can be used to cancel existing token offers created using NFTokenCreateOffer.

`NFTokenCancelOffer`

`NFTokenCreateOffer`

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFTokenCancelOffer JSON

```
{
      "TransactionType": "NFTokenCancelOffer",
      "Account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "NFTokenOffers": [
      "9C92E061381C1EF37A8CDE0E8FC35188BFC30B1883825042A64309AC09F4C36D"
    ]
}
```


## Permissions

An existing offer, represented by an NFTokenOffer object, can be cancelled by:

`NFTokenOffer`

- The account that originally created the NFTokenOffer.
- The account in the Destination field of the NFTokenOffer, if one is present.
- Any account, if the NFTokenOffer specifies an expiration time and the close time of the parent ledger in which the NFTokenCancelOffer is included is greater than the expiration time.

`NFTokenOffer`

`Destination`

`NFTokenOffer`

`NFTokenOffer`

`NFTokenCancelOffer`

This transaction removes the listed NFTokenOffer object from the ledger, if present, and adjusts the reserve requirements accordingly. It is not an error if the NFTokenOffer cannot be found: if that is the case, the transaction should complete successfully.

`NFTokenOffer`

`NFTokenOffer`


## NFTokenCancelOffer Fields

In addition to the common fields, NFTokenCancelOffer transactions use the following fields:

| Field | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| NFTokenOffers | Array | Vector256 | An array of IDs of the NFTokenOffer objects to cancel (not the IDs of NFToken objects, but the IDs of the NFTokenOffer objects). Each entry must be a different object ID of an NFTokenOffer object; the transaction is invalid if the array contains duplicate entries. |


`NFTokenOffers`

`NFTokenOffer`

`NFToken`

`NFTokenOffer`

The transaction can succeed even if one or more of the IDs in the NFTokenOffers field do not refer to objects that currently exist in the ledger. (For example, those token offers might already have been deleted.) The transaction fails with an error if one of the IDs points to an object that does exist, but is not a NFTokenOffer object.

`NFTokenOffers`

It is important to note that if you inadvertently provide a nft_id rather than a nft_offer_index, you might receive a tesSUCCESS response. The reason is that when passed a properly formatted ID value that is not found, the system assumes that the NFTokenOffer has already been deleted.

`nft_id`

`nft_offer_index`

`tesSUCCESS`

`NFTokenOffer`

The transaction fails with an error if one of the IDs points to an object that does exist, but is not a NFTokenOffer object.


## Error Cases

Besides errors that can occur for all transactions, NFTokenCancelOffer transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| temDISABLED | The NonFungibleTokensV1 amendment is not enabled. |
| temMALFORMED | The transaction was not validly formatted. For example, the NFTokenOffers array was empty or contained more than the maximum number of offers that can be canceled at one time. |
| tecNO_PERMISSION | At least one of the IDs in the NFTokenOffers field refers to an object that cannot be canceled. For example, the sender of this transaction is not the owner or Destination of the offer, or the object was not an NFTokenOffer type object. |


`temDISABLED`

`temMALFORMED`

`NFTokenOffers`

`tecNO_PERMISSION`

`NFTokenOffers`

`Destination`

`NFTokenOffer`


## See Also

- NFTokenOffer entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=32b9ee9f-02db-4a2d-81aa-fd9d9d001b08&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=32b9ee9f-02db-4a2d-81aa-fd9d9d001b08&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3585248e-cf44-47d0-85dc-e4c5d4ab9482&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3585248e-cf44-47d0-85dc-e4c5d4ab9482&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=87651e7f-6617-459d-88e9-d965baf1e4d8&bo=1&sid=dec85ea09da211f0a125a96a9c65d64c&vid=dec913709da211f0a3ffd11215862489&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFTokenCancelOffer&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&r=&lt=2372&evt=pageLoad&sv=2&cdb=AQAS&rn=768241)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ba5d5d3-28aa-48d7-a037-f0438040a096&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ba5d5d3-28aa-48d7-a037-f0438040a096&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d68fb87b-28e0-4cb2-abb4-f16a87e91853&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d68fb87b-28e0-4cb2-abb4-f16a87e91853&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=46df0575-1112-4d81-83dc-811739a85493&pt=NFTokenCancelOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokencanceloffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/nftokencanceloffer#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/nftokencanceloffer#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/nftokencanceloffer#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/nftokencanceloffer#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.553c50181b9210b542297ccfcd70b38a.1759198331023.1759198331023.1759198331023.1&__hssc=78174987.1.1759198331023&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/nftokencanceloffer.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/NFTokenCancelOffer.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.553c50181b9210b542297ccfcd70b38a.1759198331023.1759198331023.1759198331023.1&__hssc=78174987.1.1759198331023&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:12:19.364Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
