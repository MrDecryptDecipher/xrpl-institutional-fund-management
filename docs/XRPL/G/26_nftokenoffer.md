# NFTokenOffer
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenoffer
Section: G26

## Overview


## Extracted Content
# NFTokenOffer

[Source]

An NFTokenOffer entry represents an offer to buy, sell or transfer an NFT. You can create an NFT buy or sell offer by sending an NFTokenCreateOffer transaction.

`NFTokenOffer`

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFTokenOffer JSON

```
{
    "Amount": "1000000",
    "Flags": 1,
    "LedgerEntryType": "NFTokenOffer",
    "NFTokenID": "00081B5825A08C22787716FA031B432EBBC1B101BB54875F0002D2A400000000",
    "NFTokenOfferNode": "0",
    "Owner": "rhRxL3MNvuKEjWjL7TBbZSDacb8PmzAd7m",
    "OwnerNode": "17",
    "PreviousTxnID": "BFA9BE27383FA315651E26FDE1FA30815C5A5D0544EE10EC33D3E92532993769",
    "PreviousTxnLgrSeq": 75443565,
    "index": "AEBABA4FAC212BF28E0F9A9C3788A47B085557EC5D1429E7A8266FB859C863B3"
}
```


### NFTokenOffer Fields

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amount | Currency Amount | Amount | Yes | Amount expected or offered for the NFT. If the token has the lsfOnlyXRP flag set, the amount must be specified in XRP. Sell offers that specify assets other than XRP must specify a non-zero amount. Sell offers that specify XRP can be 'free' (that is, the Amount field can be equal to "0"). |
| Destination | String - Address | AccountID | No | The account for which this offer is intended. If present, only that account can accept the offer. |
| Expiration | Number | UInt32 | No | The time after which the offer is no longer active. The value is the number of seconds since the Ripple Epoch. |
| NFTokenID | String - Hexadecimal | UInt256 | Yes | The NFTokenID of the NFT referenced by this offer. |
| NFTokenOfferNode | String - Hexadecimal | UInt64 | No | Internal bookkeeping, indicating the page inside the token buy or sell offer directory, as appropriate, where this token is being tracked. This field allows the efficient deletion of offers. |
| Owner | String - Address | AccountID | Yes | The account that created and owns this offer. Only the current owner of an NFT can create an offer to sell an NFToken, but offers from past owners can remain in the ledger after the NFT has been transferred. Any account can create an offer to buy an NFT. |
| OwnerNode | String - Hexadecimal | UInt64 | No | Internal bookkeeping, indicating the page inside the owner directory where this token is being tracked. This field allows the efficient deletion of offers. |
| PreviousTxnID | String - Hash | UInt256 | Yes | Identifying hash of the transaction that most recently modified this object. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | Index of the ledger that contains the transaction that most recently modified this object. |


`Amount`

`lsfOnlyXRP`

`"0"`

`Destination`

`Expiration`

`NFTokenID`

`NFTokenID`

`NFTokenOfferNode`

`Owner`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`


## NFTokenOffer Flags

NFTokenOffer entries can have the following flags combined in the Flags field:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| lsfSellNFToken | 0x00000001 | 1 | If enabled, the offer is a sell offer. Otherwise, the offer is a buy offer. |


`lsfSellNFToken`

`0x00000001`


## NFTokenOffer Transactions

Unlike Offers for fungible tokens, a NFTokenOffer is not stored in an order book and is never automatically matched or executed. A buyer must explicitly choose to accept an NFTokenOffer that offers to sell a NFToken. Similarly, a seller must explicitly choose to accept a specific NFTokenOffer that offers to buy a NFToken object that they own.

`NFTokenOffer`

`NFTokenOffer`

`NFToken`

`NFTokenOffer`

`NFToken`

The transactions for NFToken trading are:

`NFToken`

- NFTokenCreateOffer
- NFTokenCancelOffer
- NFTokenAcceptOffer


## Locating NFTokenOffer entries

Each unique NFT has up to two directories: one contains offers to buy the token and the other contains offers to sell the token. (These two directories are created as necessary and deleted if empty.) Marketplaces or other client applications can use these directories to find and display offers to trade NFToken objects to users or even automatically match them and accept them.

`NFToken`


### NFTokenOffer Reserve

NFTokenOffer entries each count as one item towards the owner reserve of the account placing the offer, as long as the entry is in the ledger. Accepting or canceling the offer frees up the reserve.

`NFTokenOffer`


### NFTokenOffer ID Format

The unique ID (NFTokenOfferID) of a NFTokenOffer object is the result of the following values concatenated in order:

`NFTokenOfferID`

`NFTokenOffer`

- The NFTokenOffer space key, 0x0037;
- The AccountID of the account placing the offer; and
- The Sequence (or Ticket) of the NFTokenCreateOffer transaction that created the NFTokenOffer.

`NFTokenOffer`

`0x0037`

`AccountID`

`Sequence`

`Ticket`

`NFTokenCreateOffer`

`NFTokenOffer`


## See Also

- Transactions:NFTokenAcceptOffer transactionNFTokenCancelOffer transactionNFTokenCreateOffer transaction
- NFTokenAcceptOffer transaction
- NFTokenCancelOffer transaction
- NFTokenCreateOffer transaction

- NFTokenAcceptOffer transaction
- NFTokenCancelOffer transaction
- NFTokenCreateOffer transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b284798b-2232-4dc7-96cc-8e26510ea637&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b284798b-2232-4dc7-96cc-8e26510ea637&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b1c894c4-f7d3-4ce1-9486-7b21ff408d8a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b1c894c4-f7d3-4ce1-9486-7b21ff408d8a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=106552bb-d14a-4e52-b75e-93607f249e64&bo=1&sid=ac09b4309da011f0bf3b0d9f70564f8a&vid=ac0a36309da011f087e53350f41cba27&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFTokenOffer&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&r=&lt=2934&evt=pageLoad&sv=2&cdb=AQAS&rn=472753)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fd271c7d-32ec-41dd-be76-7dc8161c41f9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fd271c7d-32ec-41dd-be76-7dc8161c41f9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=db72fa52-607a-47f9-8002-c72e6d224ed8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=db72fa52-607a-47f9-8002-c72e6d224ed8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=9dbbb677-c1ab-4f9c-af21-1a6c55823da9&pt=NFTokenOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnftokenoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenoffer#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenoffer#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenoffer#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/nftokenoffer#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.efd41c2bfec1b06e64eb32ac9d935802.1759197386720.1759197386720.1759197386720.1&__hssc=78174987.1.1759197386721&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/nftokenoffer.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L34-L44)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.efd41c2bfec1b06e64eb32ac9d935802.1759197386720.1759197386720.1759197386720.1&__hssc=78174987.1.1759197386721&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:56:36.992Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
