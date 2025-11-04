# NFTokenPage
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenpage
Section: G27

## Overview


## Extracted Content
# NFTokenPage

[Source]

An NFTokenPage entry represents a collection of NFTs owned by the same account. An account can have multiple NFTokenPage entries, which form a doubly linked list. NFT directories are automatically updated when an account mints, burns, buys, or sells NFTs.

`NFTokenPage`

`NFTokenPage`

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFTokenPage JSON

```
{
  "LedgerEntryType": "NFTokenPage",
  "PreviousPageMin":
    "8A244DD75DAF4AC1EEF7D99253A7B83D2297818B2297818B70E264D2000002F2",
  "NextPageMin":
    "8A244DD75DAF4AC1EEF7D99253A7B83D2297818B2297818BE223B0AE0000010B",
  "PreviousTxnID":
    "95C8761B22894E328646F7A70035E9DFBECC90EDD83E43B7B973F626D21A0822",
  "PreviousTxnLgrSeq":
    42891441,
  "NFTokens": [
    {
      "NFToken": {
        "NFTokenID":
          "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65",
        "URI": "697066733A2F2F62616679626569676479727A74357366703775646D37687537367568377932366E6634646675796C71616266336F636C67747179353566627A6469"
      }
    },
    /* potentially more objects */
  ]
}
```


## NFTokenPage Fields

In addition to the common fields, NFTokenPage entries have the following fields:

`NFTokenPage`

| Field Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0050, mapped to the string NFTokenPage, indicates that this is a page containing NFToken objects. |
| NextPageMin | String | UInt256 | No | The locator of the next page, if any. Details about this field and how it should be used are outlined below. |
| NFTokens | Array | Array | Yes | The collection of NFToken objects contained in this NFTokenPage object. This specification places an upper bound of 32 NFToken objects per page. Objects are sorted from low to high with the NFTokenID used as the sorting parameter. |
| PreviousPageMin | String | UInt256 | No | The locator of the previous page, if any. Details about this field and how it should be used are outlined below. |
| PreviousTxnID | String | UInt256 | No | Identifies the transaction ID of the transaction that most recently modified this NFTokenPage object. |
| PreviousTxnLgrSeq | Number | UInt32 | No | The sequence of the ledger that contains the transaction that most recently modified this NFTokenPage object. |


`LedgerEntryType`

`0x0050`

`NFTokenPage`

`NFToken`

`NextPageMin`

`NFTokens`

`NFToken`

`NFTokenID`

`PreviousPageMin`

`PreviousTxnID`

`PreviousTxnLgrSeq`


### NFTokenPage ID Format

NFTokenPage identifiers are constructed to allow a more efficient paging structure, ideally suited for NFToken objects.

`NFTokenPage`

`NFToken`

The identifier of an NFTokenPage is derived by concatenating the 160-bit AccountID of the owner of the page, followed by a 96 bit value that indicates whether a particular NFTokenID can be contained in this page.

`NFTokenPage`

`AccountID`

`NFTokenID`

More specifically, a NFToken with the NFTokenID value A can be included in a page with NFTokenPage ID B if and only if low96(A) >= low96(B).

`NFToken`

`NFTokenID`

`A`

`NFTokenPage`

`B`

`low96(A) >= low96(B)`

This uses a function low96(x) which returns the low 96 bits of a 256-bit value, For example, applying the low96 function to the NFTokenID of 000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65 returns the value 42540EE208C3098E00000D65.

`low96(x)`

`low96`

`NFTokenID`

`000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65`

`42540EE208C3098E00000D65`

This design allows for efficient lookups of individual NFToken objects without needing to check each NFTokenPage in a list.

`NFToken`

`NFTokenPage`


### Finding NFTokens

To find a specific NFToken, you need to know its NFTokenID and current owner. Compute the NFTokenPage ID as described above. Search for a ledger entry whose identifier is less than or equal to that value. If that entry does not exist or is not an NFTokenPage, that account does not own that NFToken.

`NFToken`

`NFTokenID`

`NFTokenPage`

`NFTokenPage`

`NFToken`


### Adding NFTokens

To add an NFToken, find the NFTokenPage it should be in (using the same technique as searching for an NFToken object) and add it to that page. If the NFTokenPage is already full, find the previous and next pages (if any) and balance those three pages, inserting a new NFTokenPage as needed.

`NFToken`

`NFTokenPage`

`NFToken`

`NFTokenPage`

`NFTokenPage`


### Removing NFTokens

Removing NFToken objects works like adding them. If the number of NFToken objects in the page goes below a certain threshold, the ledger combines the page with a previous or next page if possible.

`NFToken`

`NFToken`


## NFTokenPage Reserve

Each NFTokenPage counts as one item towards its owner's owner reserve. Burning or trading away enough NFTs to remove the page frees up the reserve.

`NFTokenPage`

Since each page can hold up to 32 entries, the effective reserve cost per NFT can be as low as R/32 where R is the incremental owner reserve for one item.


### The reserve in practice

Because of the way splitting and combining pages works, the actual number of NFToken objects per page is somewhat unpredictable and depends on the actual NFTokenID values involved. In practice, after minting or receiving a large number of NFTs, each page can have as few as 16 items, or as many as 32, with the typical case being around 24 NFToken objects per page.

`NFToken`

`NFTokenID`

`NFToken`

Currently, the reserve per item is 0.2 XRP. The table below shows how much the total owner reserve is for various numbers of NFTs owned under various scenarios:

| NFTs Owned | Best Case | Typical | Worst Case |
| --- | --- | --- | --- |
| 32 or fewer | 0.2 XRP | 0.2 XRP | 0.2 XRP |
| 50 | 0.4 XRP | 0.6 XRP | 0.8 XRP |
| 200 | 1.4 XRP | 1.8 XRP | 2.6 XRP |
| 1000 | 6.4 XRP | 8.4 XRP | 12.6 XRP |


These numbers are estimates; the actual numbers may vary.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=550ddfd3-824b-4afb-a2ac-5e9ea304eef3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=550ddfd3-824b-4afb-a2ac-5e9ea304eef3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=32c49108-4a7b-4783-8fa5-9756534bdf6f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=32c49108-4a7b-4783-8fa5-9756534bdf6f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=76bc8f7d-875d-480c-8cc3-49069b074fe7&bo=1&sid=b82739f09da011f0b31b6321484a185e&vid=b827c2f09da011f0a78503e2aca7cfd4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFTokenPage&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&r=&lt=2130&evt=pageLoad&sv=2&cdb=AQAS&rn=187709)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6550d9ef-962e-44f1-87c1-24942822cec8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6550d9ef-962e-44f1-87c1-24942822cec8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e3d342a9-ea97-4cf6-b3c9-c1387322ac35&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e3d342a9-ea97-4cf6-b3c9-c1387322ac35&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6a7a9cd8-a6d1-413e-893f-a6dfdf321258&pt=NFTokenPage&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenpage&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenpage#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenpage#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenpage#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenpage#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5eb2e617f97005b321e14f346708f000.1759197407769.1759197407769.1759197407769.1&__hssc=78174987.1.1759197407770&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/nftokenpage.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L97-L103)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.5eb2e617f97005b321e14f346708f000.1759197407769.1759197407769.1759197407769.1&__hssc=78174987.1.1759197407770&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:56:58.482Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
