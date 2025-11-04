# NFTokenMint
URL: https://xrpl.org/docs/references/protocol/transactions/types/nftokenmint
Section: H36

## Overview


## Extracted Content
# NFTokenMint

[Source]

The NFTokenMint transaction creates a non-fungible token and adds it to the relevant NFTokenPage object of the NFTokenMinter as an NFToken object. This transaction is the only opportunity the NFTokenMinter has to specify any token fields that are defined as immutable (for example, the TokenFlags).

`NFTokenMint`

`NFTokenMinter`

`NFTokenMinter`

`TokenFlags`

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFTokenMint JSON

```
{
  "TransactionType": "NFTokenMint",
  "Account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
  "TransferFee": 314,
  "NFTokenTaxon": 0,
  "Flags": 8,
  "Fee": "10",
  "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469",
  "Memos": [
        {
            "Memo": {
                "MemoType":
                  "687474703A2F2F6578616D706C652E636F6D2F6D656D6F2F67656E65726963",
                "MemoData": "72656E74"
            }
        }
    ]
}
```


## NFTokenMint Fields

In addition to the common fields, NFTokenMint transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| NFTokenTaxon | Number | UInt32 | Yes | An arbitrary taxon, or shared identifier, for a series or collection of related NFTs. To mint a series of NFTs, give them all the same taxon. |
| Issuer | String - Address | AccountID | No | The issuer of the token, if the sender of the account is issuing it on behalf of another account. This field must be omitted if the account sending the transaction is the issuer of the NFToken. If provided, the issuer's AccountRoot object must have the NFTokenMinter field set to the sender of this transaction (this transaction's Account field). |
| TransferFee | Number | UInt16 | No | The value specifies the fee charged by the issuer for secondary sales of the NFToken, if such sales are allowed. Valid values for this field are between 0 and 50000 inclusive, allowing transfer rates of between 0.00% and 50.00% in increments of 0.001. If this field is provided, the transaction MUST have the tfTransferable flag enabled. |
| URI | String - Hexadecimal | Blob | No | Up to 256 bytes of arbitrary data. In JSON, this should be encoded as a string of hexadecimal. You can use the xrpl.convertStringToHex utility to convert a URI to its hexadecimal equivalent. This is intended to be a URI that points to the data or metadata associated with the NFT. The contents could decode to an HTTP or HTTPS URL, an IPFS URI, a magnet link, immediate data encoded as an RFC 2379 "data" URL, or even an issuer-specific encoding. The URI is NOT checked for validity. |
| Amount | Currency Amount | Amount | No | Indicates the amount expected or offered for the corresponding NFToken. The amount must be non-zero, except where the asset is XRP; then, it is legal to specify an amount of zero, which means that the current owner of the token is giving it away, gratis, either to anyone at all, or to the account identified by the Destination field. |
| Expiration | Number | UInt32 | No | Time after which the offer is no longer active, in seconds since the Ripple Epoch. Results in an error if the Amount field is not specified. |
| Destination | String - Address | AccountID | No | If present, indicates that this offer may only be accepted by the specified account. Attempts by other accounts to accept this offer MUST fail. Results in an error if the Amount field is not specified. |


`NFTokenTaxon`

`Issuer`

`NFToken`

`NFTokenMinter`

`Account`

`TransferFee`

`NFToken`

`tfTransferable`

`URI`

`xrpl.convertStringToHex`

`Amount`

`NFToken`

`Destination`

`Expiration`

`Amount`

`Destination`

`Amount`


## NFTokenMint Flags

Transactions of the NFTokenMint type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfBurnable | 0x00000001 | 1 | Allow the issuer (or an entity authorized by the issuer) to destroy the minted NFToken. (The NFToken's owner can always do so.) |
| tfOnlyXRP | 0x00000002 | 2 | The minted NFToken can only be bought or sold for XRP. This can be desirable if the token has a transfer fee and the issuer does not want to receive fees in non-XRP currencies. |
| tfTrustLine | 0x00000004 | 4 | DEPRECATED Automatically create trust lines from the issuer to hold transfer fees received from transferring the minted NFToken. The fixRemoveNFTokenAutoTrustLine amendment makes it invalid to set this flag. |
| tfTransferable | 0x00000008 | 8 | The minted NFToken can be transferred to others. If this flag is not enabled, the token can still be transferred from or to the issuer, but a transfer to the issuer must be made based on a buy offer from the issuer and not a sell offer from the NFT holder. |
| tfMutable | 0x00000010 | 16 | The URI field of the minted NFToken can be updated using the NFTokenModify transaction. |


`tfBurnable`

`0x00000001`

`NFToken`

`NFToken`

`tfOnlyXRP`

`0x00000002`

`NFToken`

`tfTrustLine`

`0x00000004`

`NFToken`

`tfTransferable`

`0x00000008`

`NFToken`

`tfMutable`

`0x00000010`

`URI`

`NFToken`

`NFTokenModify`


## Embedding additional information

If you need to specify additional information during minting (for example, details identifying a property by referencing a particular plat, a vehicle by specifying a VIN, or other object-specific descriptions) you can use a transaction memo. Memos are a part of the signed transaction and are available from historical archives, but are not stored in the ledger's state data.


## Issuing on behalf of another account

If you want to issue an NFT for another account there are two things you must do. Given that Account A is your account and Account B is the account for which you want to mint a NFToken:

1. Set the NFTokenMinter account setting on Account B to be Account A. (This says that Account B trusts Account A to create NFTs on their behalf.)
1. When you mint the NFToken, set the Issuer field to Account B.

`NFTokenMinter`

`Issuer`


### Example of NFTokenMint with an issuer

```
{
  "TransactionType": "NFTokenMint",
  "Account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
  "Issuer": "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
  "TransferFee": 25000,
  "NFTokenTaxon": 0,
  "Flags": 8,
  "Fee": "10",
  "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469",
  "Memos": [
        {
            "Memo": {
                "MemoType":
                  "687474703A2F2F6578616D706C652E636F6D2F6D656D6F2F67656E65726963",
                "MemoData": "72656E74"
            }
        }
    ]
}
```

This transaction assumes that the issuer, rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2, has set the NFTokenMinter field in its AccountRoot to rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B, thereby authorizing that account to mint tokens on its behalf.

`rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2`

`NFTokenMinter`

`AccountRoot`

`rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B`


## Error Cases

Besides errors that can occur for all transactions, NFTokenMint transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| temDISABLED | The NonFungibleTokensV1 amendment is not enabled. |
| temBAD_NFTOKEN_TRANSFER_FEE | The TransferFee is not within the acceptable range. |
| temINVALID_FLAG | The Flags value has bits enabled that are not allowed or valid flags. If the fixRemoveNFTokenAutoTrustLine amendment is enabled, the tfTrustLine flag causes this error. |
| temMALFORMED | The transaction was not validly specified. For example, the URI field is longer than 256 bytes. |
| tecNO_ISSUER | The Issuer refers to an account that does not exist in the ledger. |
| tecNO_PERMISSION | The account referenced by the Issuer field has not authorized this transaction's sender (using the NFTokenMinter setting) to mint on their behalf. |
| tecINSUFFICIENT_RESERVE | The owner would not meet the updated reserve requirement after minting the token. Note that new NFTokens only increase the owner's reserve if it requires a new NFTokenPage object, which can each hold up to 32 NFTs. |
| tecMAX_SEQUENCE_REACHED | The Issuer's MintedNFTokens field is already at its maximum. This is only possible if 232-1 NFTokens have been minted in total by the issuer or on their behalf. |


`temDISABLED`

`temBAD_NFTOKEN_TRANSFER_FEE`

`TransferFee`

`temINVALID_FLAG`

`Flags`

`tfTrustLine`

`temMALFORMED`

`URI`

`tecNO_ISSUER`

`Issuer`

`tecNO_PERMISSION`

`Issuer`

`NFTokenMinter`

`tecINSUFFICIENT_RESERVE`

`NFToken`

`tecMAX_SEQUENCE_REACHED`

`Issuer`

`MintedNFTokens`

`NFToken`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0aa12afe-9d7e-4a84-b1cc-4099e18282a6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0aa12afe-9d7e-4a84-b1cc-4099e18282a6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=52612407-5b1d-4158-ba30-48e2b7a04e5f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=52612407-5b1d-4158-ba30-48e2b7a04e5f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=15366f46-fb31-4247-97b3-3996c51ce131&bo=1&sid=f6dbbb709da211f0aa914ba61eac9ca5&vid=f6dc58b09da211f0a3cdbdc21afeda5a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFTokenMint&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&r=&lt=2972&evt=pageLoad&sv=2&cdb=AQAS&rn=225628)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3299052e-3e42-474c-a35b-5e450448cdce&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3299052e-3e42-474c-a35b-5e450448cdce&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fbd216d8-8fdd-4176-81d8-7d122ae73469&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fbd216d8-8fdd-4176-81d8-7d122ae73469&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6c78abb9-3930-4608-8c8b-9961011520c9&pt=NFTokenMint&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenmint&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/nftokenmint#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/nftokenmint#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/nftokenmint#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/nftokenmint#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6931c938f47f3c786810a02551b3a925.1759198371583.1759198371583.1759198371583.1&__hssc=78174987.1.1759198371583&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/nftokenmint.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/NFTokenMint.cpp)
- [RFC 2379 "data" URL](https://datatracker.ietf.org/doc/html/rfc2397)
- [plat](https://en.wikipedia.org/wiki/Plat)
- [VIN](https://en.wikipedia.org/wiki/Vehicle_identification_number)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6931c938f47f3c786810a02551b3a925.1759198371583.1759198371583.1759198371583.1&__hssc=78174987.1.1759198371583&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:13:05.261Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
