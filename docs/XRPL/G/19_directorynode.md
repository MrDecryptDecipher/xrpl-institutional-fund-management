# DirectoryNode
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/directorynode
Section: G19

## Overview


## Extracted Content
# DirectoryNode

[Source]

The DirectoryNode ledger entry type provides a list of links to other entries in the ledger's state data. A single conceptual Directory takes the form of a doubly linked list, with one or more DirectoryNode entries each containing up to 32 IDs of other entries. The first DirectoryNode entry is called the root of the directory, and all entries other than the root can be added or deleted as necessary.

`DirectoryNode`

There are three kinds of directory:

- Owner directories list other entries owned by an account, such as RippleState (trust line) or Offer entries.
- Offer directories list the offers available in the decentralized exchange. A single offer directory contains all the offers that have the same exchange rate for the same token (currency code and issuer).
- NFT Offer directories list buy and sell offers for NFTs. Each NFT has up to two directories, one for buy offers, the other for sell offers.

`RippleState`

`Offer`

All types of directories are automatically updated by the protocol as necessary.


## Example DirectoryNode JSON

- Offer Directory
- Owner Directory
- NFT Offer Directory

```
{
    "ExchangeRate": "4e133c40576f7c00",
    "Flags": 0,
    "Indexes": [
        "353E55E7A0B0E82D16DF6E748D48BDAFE4C56045DF5A8B0ED723FF3C38A4787A"
    ],
    "LedgerEntryType": "DirectoryNode",
    "PreviousTxnID": "0F79E60C8642A23658ECB29D939499EA0F28D804077B7EE16613BE0C813A2DD6",
    "PreviousTxnLgrSeq": 91448326,
    "RootIndex": "79C54A4EBD69AB2EADCE313042F36092BE432423CC6A4F784E133C40576F7C00",
    "TakerGetsCurrency": "0000000000000000000000000000000000000000",
    "TakerGetsIssuer": "0000000000000000000000000000000000000000",
    "TakerPaysCurrency": "0000000000000000000000005553440000000000",
    "TakerPaysIssuer": "2ADB0B3959D60A6E6991F729E1918B7163925230",
    "index": "79C54A4EBD69AB2EADCE313042F36092BE432423CC6A4F784E133C40576F7C00"
}
```


## DirectoryNode Fields

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| DomainID | String | UInt256 | No | (Offer directories only) The ledger entry ID of a permissioned domain. If present, this order book belongs to the corresponding Permissioned DEX. Otherwise, this order book is part of the open DEX. (Requires the PermissionedDEX amendment ) |
| ExchangeRate | String | UInt64 | No | (Offer directories only) DEPRECATED. Do not use. |
| Flags | Number | UInt32 | Yes | A bit-map of boolean flags enabled for this object. Currently, the protocol defines no flags for DirectoryNode objects. The value is always 0. |
| Indexes | Array | Vector256 | Yes | The contents of this directory: an array of IDs of other objects. |
| IndexNext | Number | UInt64 | No | If this directory consists of multiple pages, this ID links to the next object in the chain, wrapping around at the end. |
| IndexPrevious | Number | UInt64 | No | If this directory consists of multiple pages, this ID links to the previous object in the chain, wrapping around at the beginning. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0064, mapped to the string DirectoryNode, indicates that this object is part of a directory. |
| NFTokenID | String | UInt256 | No | (NFT offer directories only) ID of the NFT in a buy or sell offer. |
| Owner | String | AccountID | No | (Owner directories only) The address of the account that owns the objects in this directory. |
| PreviousTxnID | String | UInt256 | No | The identifying hash of the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| PreviousTxnLgrSeq | Number | UInt32 | No | The index of the ledger that contains the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| RootIndex | String | UInt256 | Yes | The ID of root object for this directory. |
| TakerGetsCurrency | String | UInt160 | No | (Offer directories only) The currency code of the TakerGets amount from the offers in this directory. |
| TakerGetsIssuer | String | UInt160 | No | (Offer directories only) The issuer of the TakerGets amount from the offers in this directory. |
| TakerPaysCurrency | String | UInt160 | No | (Offer directories only) The currency code of the TakerPays amount from the offers in this directory. |
| TakerPaysIssuer | String | UInt160 | No | (Offer directories only) The issuer of the TakerPays amount from the offers in this directory. |


`DomainID`

`ExchangeRate`

`Flags`

`DirectoryNode`

`0`

`Indexes`

`IndexNext`

`IndexPrevious`

`LedgerEntryType`

`0x0064`

`DirectoryNode`

`NFTokenID`

`Owner`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`RootIndex`

`TakerGetsCurrency`

`TakerGets`

`TakerGetsIssuer`

`TakerGets`

`TakerPaysCurrency`

`TakerPays`

`TakerPaysIssuer`

`TakerPays`


## DirectoryNode Flags

DirectoryNode entries can have the following values in the Flags field:

`DirectoryNode`

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| lsfNFTokenBuyOffers | 0x00000001 | 1 | This directory contains NFT buy offers. |
| lsfNFTokenSellOffers | 0x00000002 | 2 | This directory contains NFT sell offers. |


`lsfNFTokenBuyOffers`

`0x00000001`

`lsfNFTokenSellOffers`

`0x00000002`

Owner directories and offer directories for fungible tokens do not use flags; their Flags value is always 0.

`Flags`


## DirectoryNode Reserve

DirectoryNode entries do not require a reserve.

`DirectoryNode`


## Directory ID Formats

There are three different formulas for creating the ID of a DirectoryNode, depending on which of the following the DirectoryNode represents:

- The first page (also called the root) of an Owner or NFT Offer directory
- The first page of an Offer directory, with variants for the open DEX and permissioned DEX (Requires the PermissionedDEX amendment )
- Later pages of any type

The first page of an Owner directory or NFT Offer directory has an ID that is the SHA-512Half of the following values, concatenated in order:

- The Owner directory space key (0x004F)
- The AccountID from the Owner field.

`0x004F`

`Owner`

The first page of an Offer directory has a special ID: the higher 192 bits define the order book, and the remaining 64 bits define the exchange rate of the offers in that directory. (The ID is big-endian, so the book is in the more significant bits, which come first, and the quality is in the less significant bits which come last.) This provides a way to iterate through an order book from best offers to worst. Specifically: the first 192 bits are the first 192 bits of the SHA-512Half of the following values, concatenated in order:

- The Book directory space key (0x0042)
- The 160-bit currency code from the TakerPaysCurrency
- The 160-bit currency code from the TakerGetsCurrency
- The AccountID from the TakerPaysIssuer
- The AccountID from the TakerGetsIssuer
- The DomainID of the permissioned domain this order book belongs to, if part of a permissioned DEX. Omitted for order books in the open DEX.

`0x0042`

`TakerPaysCurrency`

`TakerGetsCurrency`

`TakerPaysIssuer`

`TakerGetsIssuer`

`DomainID`

The lower 64 bits of an Offer directory's ID represent the TakerPays amount divided by TakerGets amount from the offer(s) in that directory as a 64-bit number in the XRP Ledger's internal amount format.

`TakerPays`

`TakerGets`

If the DirectoryNode is not the first page in the directory, it has an ID that is the SHA-512Half of the following values, concatenated in order:

- The DirectoryNode space key (0x0064)
- The ID of the root DirectoryNode
- The page number of this object. (Since 0 is the root DirectoryNode, this value is an integer 1 or higher.)

`0x0064`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=470f395c-4c72-4715-b04d-f65c3ab179e9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=470f395c-4c72-4715-b04d-f65c3ab179e9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0f5eef7-b437-4ca5-8a9a-2bac4cabf9d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d0f5eef7-b437-4ca5-8a9a-2bac4cabf9d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=8cd6d01d-a745-489e-9765-d31fe61ed0b0&bo=1&sid=537970c09da011f087eac188498d02dd&vid=537a36f09da011f08a782f3df2fb455d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=DirectoryNode&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&r=&lt=2140&evt=pageLoad&sv=2&cdb=AQAS&rn=59178)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fce5b775-2470-4833-addd-564daa9a89a9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fce5b775-2470-4833-addd-564daa9a89a9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb876704-1caf-49f8-8ce8-3db6bf2d1fd8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb876704-1caf-49f8-8ce8-3db6bf2d1fd8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2527aa9d-d81a-4295-bd77-517576667202&pt=DirectoryNode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fdirectorynode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/directorynode#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/directorynode#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/directorynode#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/directorynode#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c615583072913a01f0a149688d4f401c.1759197239679.1759197239679.1759197239679.1&__hssc=78174987.1.1759197239679&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/directorynode.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/7e24adbdd0b61fb50967c4c6d4b27cc6d81b33f3/include/xrpl/protocol/detail/ledger_entries.macro#L177-L192)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c615583072913a01f0a149688d4f401c.1759197239679.1759197239679.1759197239679.1&__hssc=78174987.1.1759197239679&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:54:11.309Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
