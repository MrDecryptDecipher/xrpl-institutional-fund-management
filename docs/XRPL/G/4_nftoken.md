# NFToken
URL: https://xrpl.org/docs/references/protocol/data-types/nftoken
Section: G4

## Overview


## Extracted Content
# NFToken

The NFToken object represents a single non-fungible token (NFT). It is not stored on its own, but is contained in a NFTokenPage object alongside other NFToken objects.

`NFToken`

`NFToken`

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFToken JSON

```
{
    "NFTokenID": "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65",
    "URI": "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi"
}
```

Unlike full-fledged ledger entries, NFToken has no field to identify the object type or current owner of the object. NFToken objects are grouped into pages that implicitly define the object type and identify the owner.

`NFToken`

`NFToken`


## NFTokenID

NFTokenID, optional, string, UInt256

`NFTokenID`

This composite field uniquely identifies a token, and consists of the following sections.

A) 16 bits that identify flags or settings specific to the NFToken

B) 16 bits that encode the transfer fee associated with this NFToken, if any

C) A 160-bit account identifier of the issuer

D) A 32-bit issuer-specified NFTokenTaxon

`NFTokenTaxon`

E) An (automatically generated) monotonically increasing 32-bit sequence number.

The 16-bit flags, transfer fee fields, the 32-bit NFTokenTaxon, and the sequence number fields are stored in big-endian format.

`NFTokenTaxon`


## NFToken Flags

Flags are properties or other options associated with the NFToken object.

`NFToken`

| Flag Name | Flag Value | Description |
| --- | --- | --- |
| lsfBurnable | 0x0001 | If enabled, the issuer (or an entity authorized by the issuer) can destroy this NFToken. The object's owner can always do so. |
| lsfOnlyXRP | 0x0002 | If enabled, this NFToken can only be offered or sold for XRP. |
| lsfTrustLine | 0x0004 | DEPRECATED If enabled, automatically create trust lines to hold transfer fees. Otherwise, buying or selling this NFToken for a fungible token amount fails if the issuer does not have a trust line for that token. The fixRemoveNFTokenAutoTrustLine amendment makes it invalid to enable this flag. |
| lsfTransferable | 0x0008 | If enabled, this NFToken can be transferred from one holder to another. Otherwise, it can only be transferred to or from the issuer. |
| lsfReservedFlag | 0x8000 | This flag is reserved for future use. Attempts to set this flag fail. |


`lsfBurnable`

`0x0001`

`NFToken`

`lsfOnlyXRP`

`0x0002`

`NFToken`

`lsfTrustLine`

`0x0004`

`NFToken`

`lsfTransferable`

`0x0008`

`NFToken`

`lsfReservedFlag`

`0x8000`

NFToken flags are immutable: they can only be set during the NFTokenMint transaction and cannot be changed later.

`NFToken`


### Example

The example sets three flags: lsfBurnable (0x0001), lsfOnlyXRP (0x0002), lsfTransferable (0x0008). 1+2+8 = 11, or 0x000B in big endian format.

`lsfBurnable`

`0x0001`

`lsfOnlyXRP`

`0x0002`

`lsfTransferable`

`0x0008`

`0x000B`


### TransferFee

The TransferFee value specifies the percentage fee, in units of 1/100,000, charged by the issuer for secondary sales of the token. Valid values for this field are between 0 and 50,000, inclusive. A value of 1 is equivalent to 0.001% or 1/10 of a basis point (bps), allowing transfer rates between 0% and 50%.

`TransferFee`


### Example

This value sets the transfer fee to 314, or 0.314%.


### Issuer Identification

The third section of the NFTokenID is a big endian representation of the issuer’s public address.

`NFTokenID`


### NFTokenTaxon

The fourth section is a NFTokenTaxon created by the issuer.

`NFTokenTaxon`

An issuer might issue several NFToken objects with the same NFTokenTaxon; to ensure that NFToken objects are spread across multiple pages, the NFTokenTaxon is scrambled using the fifth section, a sequential number, as the seed for a random number generator. The scrambled value is stored with the NFToken, but the unscrambled value is the actual NFTokenTaxon.

`NFToken`

`NFTokenTaxon`

`NFToken`

`NFTokenTaxon`

`NFToken`

`NFTokenTaxon`

Notice that the scrambled version of the NFTokenTaxon is 0xBC8B858E, the scrambled version of the NFTokenTaxon specified by the issuer. But the actual value of the NFTokenTaxon is the unscrambled value.

`NFTokenTaxon`

`0xBC8B858E`

`NFTokenTaxon`

`NFTokenTaxon`


### Token Sequence

The fifth section is a sequence number that increases with each NFToken the issuer creates.

`NFToken`

The NFTokenMint transaction sets this part of the NFTokenID automatically based on the MintedNFTokens field of the Issuer account. If the issuer's AccountRoot object does not have a MintedNFTokens field, the field is assumed to have the value 0; the value of the field is then incremented by exactly 1.

`NFTokenID`

`MintedNFTokens`

`Issuer`

`MintedNFTokens`


## URI

The URI field points to the data or metadata associated with the NFToken. This field does not need to be an HTTP or HTTPS URL; it could be an IPFS URI, a magnet link, an RFC 2379 "data" URL, or even a totally custom encoding. The URI is not checked for validity, but the field is limited to a maximum length of 256 bytes.

`NFToken`

CautionThe URI is immutable, so no one can update it if, for example, it links to a website that no longer exists.


# Retrieving NFToken Data and Metadata

To minimize the footprint of NFTokens without sacrificing functionality or imposing unnecessary restrictions, XRPL NFTs do not have arbitrary data fields. Instead, data is maintained separately and referenced by the NFToken. The URI provides a reference to immutable content for the Hash and any mutable data for the NFToken object.

`NFTokens`

`NFToken`

`Hash`

`NFToken`

The URI field is especially useful for referring to non-traditional Peer-to-Peer (P2P) URLs. For example, a minter that stores NFToken data or metadata using the Inter Planetary File System (IPFS) can use the URI field to refer to data on IPFS in different ways, each of which is suited to different use-cases. For more context on types of IPFS links that can be used to store NFT data, see Best Practices for Storing NFT Data using IPFS,

`URI`

`NFToken`

`URI`


## TXT Record Format

The format for a text record is as follows.

```
xrpl-nft-data-token-info-v1 IN TXT "https://host.example.com/api/token-info/{nftokenid}"
```

Replace the string {nftokenid} with the requested NFTokenID as a 64-byte hex string when you attempt to query information.

`{nftokenid}`

`NFTokenID`

Your implementation should check for the presence of TXT records and use those query strings if present. If no string is present, implementations should attempt to use a default URL. Assuming the domain is example.com, the default URL would be:

`TXT`

```
https://example.com/.well-known/xrpl-nft/{nftokenid}
```

You create NFToken objects using the NFTokenMint transaction. You can optionally destroy NFToken objects using the NFTokenBurn transaction.

`NFToken`

`NFTokenMint`

`NFToken`

`NFTokenBurn`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Token ID Breakdown](https://xrpl.org/assets/nftoken1.5f12a2b2d41a9586e45b7ca69563643484988bf0452a83266e4af908b7e7ba80.ac57e6ef.png)

![Flags](https://xrpl.org/assets/nftokena.5d9760b499a546d181200df6a1174da378cfce060300adfcf7a17b919cef5c05.ac57e6ef.png)

![Transfer Fee](https://xrpl.org/assets/nftokenb.93a27ca201844bf3abecf9af08452d52491cb73202cc8c54e0043dbf9427927c.ac57e6ef.png)

![Issuer Address](https://xrpl.org/assets/nftokenc.7ff8c8a4eedf3da48ce85a9dc7e907215b7e9efedca86cbde7599526ee866b87.ac57e6ef.png)

![Diagram of `NFTokenTaxon` bits](https://xrpl.org/assets/nftokend.b473b5342eae0ab70a882477e864fffb1a24562cb6d7ede38e758074da6cb9f0.ac57e6ef.png)

![Sequence Number](https://xrpl.org/assets/nftokene.ce2338c141ad95f826db271897c2d5483e5ddd80a7798571287a326bf779be9c.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1fc75fb2-9043-450f-aed7-0224442f62f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1fc75fb2-9043-450f-aed7-0224442f62f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=22b0db96-5cb5-4d4e-b17e-57edc8b391ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=22b0db96-5cb5-4d4e-b17e-57edc8b391ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=11a5c513-84e3-41f9-a18d-bb0da1892b0e&bo=1&sid=9f0f99d09d9f11f086435329d227ca99&vid=9f1009f09d9f11f0bdfd7f63b82e96ef&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFToken&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&r=&lt=3680&evt=pageLoad&sv=2&cdb=AQAS&rn=547768)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44d64efb-99ba-4c06-99fd-620c4b71d591&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44d64efb-99ba-4c06-99fd-620c4b71d591&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c7fc82c6-6054-468f-a2f3-4355b2143f71&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c7fc82c6-6054-468f-a2f3-4355b2143f71&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e2fef699-6d68-44c7-9095-d7ba8755238f&pt=NFToken&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fnftoken&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/data-types/nftoken#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/data-types/nftoken#)
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
- [Resources](https://xrpl.org/docs/references/protocol/data-types/nftoken#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/data-types/nftoken#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.83e332e50526e19b269b692797b80944.1759196933950.1759196933950.1759196933950.1&__hssc=78174987.1.1759196933950&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/data-types/nftoken.md)
- [NFTokenTaxon](https://www.merriam-webster.com/dictionary/taxon)
- [RFC 2379 "data" URL](https://datatracker.ietf.org/doc/html/rfc2397)
- [Best Practices for Storing NFT Data using IPFS](https://docs.ipfs.io/how-to/best-practices-for-nft-data/#types-of-ipfs-links-and-when-to-use-them)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.83e332e50526e19b269b692797b80944.1759196933950.1759196933950.1759196933950.1&__hssc=78174987.1.1759196933950&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:49:06.765Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
