# NFTokenAcceptOffer
URL: https://xrpl.org/docs/references/protocol/transactions/types/nftokenacceptoffer
Section: H32

## Overview


## Extracted Content
# NFTokenAcceptOffer

[Source]

The NFTokenAcceptOffer transaction is used to accept offers to buy or sell an NFT. It has two possible modes:

`NFTokenAcceptOffer`

- In direct mode, a buyer can accept a sell offer directly, or a seller can accept a buy offer directly.
- In brokered mode, a third party (the broker) can match two distinct offers, one buying and one selling. If the buy price is higher than the sell price, the broker can claim the difference as a fee for themself.

(Added by the NonFungibleTokensV1_1 amendment.)


## Example NFTokenAcceptOffer JSON

```
{
  "Account": "r9spUPhPBfB6kQeF6vPhwmtFwRhBh2JUCG",
  "Fee": "12",
  "LastLedgerSequence": 75447550,
  "Memos": [
    {
      "Memo": {
        "MemoData": "61356534373538372D633134322D346663382D616466362D393666383562356435386437"
      }
    }
  ],
  "NFTokenSellOffer": "68CD1F6F906494EA08C9CB5CAFA64DFA90D4E834B7151899B73231DE5A0C3B77",
  "Sequence": 68549302,
  "TransactionType": "NFTokenAcceptOffer"
}
```


## Brokered vs. Direct Mode

The mode in which the transaction operates depends on the presence of the NFTokenSellOffer and NFTokenBuyOffer fields of the transaction:

`NFTokenSellOffer`

`NFTokenBuyOffer`

| NFTokenSellOffer | NFTokenBuyOffer | Mode |
| --- | --- | --- |
| ✅ | ✅ | Brokered |
| ✅ | ❌ | Direct |
| ❌ | ✅ | Direct |


`NFTokenSellOffer`

`NFTokenBuyOffer`

If neither of those fields is specified, the transaction is malformed and produces a tem class error.

`tem`

The semantics of brokered mode are slightly different than direct mode: the account sending the transaction acts as a broker, bringing the two offers together and causing them to be matched, but does not acquire ownership of the involved NFToken. If the transaction is successful, the NFToken is sent directly from the seller to the buyer.

`NFToken`

`NFToken`


## Execution Details

If the transaction succeeds:

- The NFToken changes ownership, meaning that the token is removed from the NFTokenPage of the existing owner and added to the NFTokenPage of the new owner.
- Funds are transferred from the buyer to the seller, as specified in the NFTokenOffer. If the NFToken has a transfer fee, then its issuer receives the specified percentage, and the rest goes to the seller.

`NFToken`

`NFTokenPage`

`NFTokenPage`

`NFTokenOffer`

`NFToken`

The transaction fails with a tec-class code if:

`tec`

- The buyer already owns the NFToken.
- The seller is not the current owner of the NFToken.
- One or both offers in the transaction have already expired.
- The sell offer specifies a specific destination account, and the sender of the transaction is not that account.
- The sender of this transaction owns the buy or sell offer.

`NFToken`

`NFToken`


## Fields


## NFTokenAcceptOffer Fields

In addition to the common fields, NFTokenAcceptOffer transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| NFTokenSellOffer | String - Hash | UInt256 | No | Identifies the NFTokenOffer that offers to sell the NFToken. |
| NFTokenBuyOffer | String - Hash | UInt256 | No | Identifies the NFTokenOffer that offers to buy the NFToken. |
| NFTokenBrokerFee | Currency Amount | Amount | No | Brokered mode only. The amount that the broker keeps as their fee for bringing the two offers together; the remaining amount is sent to the seller of the NFT. If specified, the fee must be such that, before applying the transfer fee, the amount that the seller would receive is at least as much as the amount indicated in the sell offer. |


`NFTokenSellOffer`

`NFTokenOffer`

`NFToken`

`NFTokenBuyOffer`

`NFTokenOffer`

`NFToken`

`NFTokenBrokerFee`

In direct mode, you must specify either the NFTokenSellOffer or the NFTokenBuyOffer field. In brokered mode, you must specify both fields.

`NFTokenSellOffer`

`NFTokenBuyOffer`

This functionality is intended to allow the owner of an NFToken to offer their token for sale to a third party broker, who may then attempt to sell the NFToken on for a larger amount, without the broker having to own the NFToken or custody funds.

`NFToken`

`NFToken`

`NFToken`

If both offers are for the same asset, it is possible that the order in which funds are transferred might cause a transaction that would succeed to fail due to a lack of funds. To ensure deterministic transaction execution and maximize the chances of successful execution, the account attempting to buy the NFToken is debited first. Funds due to the broker are credited before crediting the seller.

`NFToken`

In brokered mode, the offers referenced by NFTokenBuyOffer and NFTokenSellOffer must both specify the same NFTokenID; that is, both must be for the same NFToken.

`NFTokenBuyOffer`

`NFTokenSellOffer`

`NFTokenID`

`NFToken`


## Error Cases

Besides errors that can occur for all transactions, NFTokenAcceptOffer transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| temDISABLED | The NonFungibleTokensV1 amendment is not enabled. |
| temMALFORMED | The transaction was not validly formatted. For example, it specified neither NFTokenSellOffer nor NFTokenBuyOffer, or it specified a negative NFTokenBrokerFee. |
| tecCANT_ACCEPT_OWN_NFTOKEN_OFFER | The buyer and seller are the same account. |
| tecEXPIRED | An offer specified in the transaction has already expired. |
| tecINSUFFICIENT_FUNDS | The buyer does not have the full amount they are offering. If the buy amount is specified in XRP, this could be because of the reserve requirement. If the buy amount is a token, it could be because the token is frozen. |
| tecINSUFFICIENT_PAYMENT | In brokered mode, the buy amount offered is not high enough to pay the BrokerFee and the sell cost of the NFToken. |
| tecOBJECT_NOT_FOUND | One of the offers specified in the transaction does not exist in the ledger. |
| tecNFTOKEN_BUY_SELL_MISMATCH | In brokered mode, the two offers are not a valid match. For example, the seller is asking more than the buyer is offering, the buy and sell offer are denominated in different assets, or the seller specified a destination that is not the buyer or the broker. |
| tecNFTOKEN_OFFER_TYPE_MISMATCH | The object identified by the NFTokenBuyOffer is not actually a buy offer, or the object identified by the NFTokenSellOffer is not actually a sell offer. |
| tecNO_PERMISSION | The seller does not own the NFToken being sold; or the matching offer specifies a different Destination account than the account accepting the offer. |


`temDISABLED`

`temMALFORMED`

`NFTokenSellOffer`

`NFTokenBuyOffer`

`NFTokenBrokerFee`

`tecCANT_ACCEPT_OWN_NFTOKEN_OFFER`

`tecEXPIRED`

`tecINSUFFICIENT_FUNDS`

`tecINSUFFICIENT_PAYMENT`

`BrokerFee`

`NFToken`

`tecOBJECT_NOT_FOUND`

`tecNFTOKEN_BUY_SELL_MISMATCH`

`tecNFTOKEN_OFFER_TYPE_MISMATCH`

`NFTokenBuyOffer`

`NFTokenSellOffer`

`tecNO_PERMISSION`

`NFToken`

`Destination`


## See Also

- NFTokenOffer entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e6ae0ad9-9f32-4733-9d5c-bfb153c5bfeb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e6ae0ad9-9f32-4733-9d5c-bfb153c5bfeb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bd49298a-d149-46cc-b61f-07b5e61299e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bd49298a-d149-46cc-b61f-07b5e61299e6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=325a5126-46a6-4bd5-924b-81bf7a582797&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=325a5126-46a6-4bd5-924b-81bf7a582797&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=acb6ac41-f116-4db7-bedc-cbfefd386b83&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=acb6ac41-f116-4db7-bedc-cbfefd386b83&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=83f1b25b-ce9d-43b9-96fc-a98d95554817&pt=NFTokenAcceptOffer&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ebdc676f-d533-4a29-8c09-5931ada7ec34&bo=1&sid=c9cc03309da211f0be47f73851e83b65&vid=c9cc60909da211f08d19b5f0fb71adee&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NFTokenAcceptOffer&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fnftokenacceptoffer&r=&lt=3897&evt=pageLoad&sv=2&cdb=AQAS&rn=423445)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/nftokenacceptoffer#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/nftokenacceptoffer#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/nftokenacceptoffer#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/nftokenacceptoffer#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.aa6a5636b8385fc89757ced42295489e.1759198293666.1759198293666.1759198293666.1&__hssc=78174987.1.1759198293666&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/nftokenacceptoffer.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/NFTokenAcceptOffer.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.aa6a5636b8385fc89757ced42295489e.1759198293666.1759198293666.1759198293666.1&__hssc=78174987.1.1759198293666&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:11:45.873Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
