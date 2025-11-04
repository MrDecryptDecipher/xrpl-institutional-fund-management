# LedgerStateFix
URL: https://xrpl.org/docs/references/protocol/transactions/types/ledgerstatefix
Section: H27

## Overview


## Extracted Content
# LedgerStateFix

[Source]

LedgerStateFix is a general purpose transaction used to fix specific issues affecting the XRP ledger. You submit the transaction with the LedgerFixType value set to indicate the particular  error state to correct.

`LedgerStateFix`

`LedgerFixType`

(Added by the fixNFTokenPageLinks amendment.)


## Example LedgerStateFix JSON

```
{
   "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
   "Fee" : "2000000",
   "LedgerFixType" : 1,
   "Owner" : "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
   "Sequence" : 2,
   "TransactionType" : "LedgerStateFix"
}
```


## LedgerStateFix Fields

In addition to the common fields, LedgerStateFix transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| LedgerFixType | Number | UInt16 | Yes | The type of fix to apply. See LedgerFixType for possible values. Currently the only type is 1, which fixes the NFToken directory for a single account. |
| Owner | String - Address | AccountID | No | (Required if LedgerFixType is 1.) The account that owns the NFToken directory to fix. Does not need any relationship to the sender of the transaction. |


`LedgerFixType`

`1`

`Owner`

`LedgerFixType`

`1`


## LedgerFixType

LedgerStateFix transactions are targeted solutions for rare and specific issues. They can only be used to fix a specific type of ledger corruption, described below.

`LedgerStateFix`


### Type 1

Corrupt NFT directories resulting from these conditions:

- At least two NFToken pages were in the directory.
- The next-to-last page was completely full, holding 32 NFTokens.
- The last page of the directory contained only one NFToken.
- A transaction removed the last remaining token from the last page, causing the directory to delete the page.

When these conditions were met, the NFToken directory didn't properly update page links, causing holes in the directory when new last pages were created for additional NFTokens.

The fixNFTokenPageLinks amendment prevents new instances of this type of ledger corruption from happening.


## Special Transaction Cost

The LedgerStateFix transaction is rare and potentially compute intensive, so the transaction must pay a special transaction cost equal to at least the owner reserve for one item (currently 0.2 XRP).

`LedgerStateFix`

The transaction cost always applies when a transaction is included in a validated ledger, even if the transaction fails. (See Error Cases.) To greatly reduce the chances of paying the high transaction cost if the transaction fails, submit the transaction with fail_hard enabled.

`fail_hard`


## Error Cases

Besides errors that can occur for all transactions, LedgerStateFix transactions can result in the following transaction result codes:

| Error Code | Description |
| --- | --- |
| tecFAILED_PROCESSING | The transaction failed to apply the fix. For example, the transaction attempted to repair an NFT directory that was not broken. |
| tecOBJECT_NOT_FOUND | A ledger entry specified in the transaction does not exist. For example, the transaction tried to repair the NFT directory of an account that does not hold any NFTs. |
| tefINVALID_LEDGER_FIX_TYPE | The LedgerFixType value specified in the transaction is not valid. Currently, the only valid type is 1. |


`tecFAILED_PROCESSING`

`tecOBJECT_NOT_FOUND`

`tefINVALID_LEDGER_FIX_TYPE`

`LedgerFixType`

`1`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c4cae2e5-6a83-4db3-8206-0ac3e1b370bb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c4cae2e5-6a83-4db3-8206-0ac3e1b370bb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ff7e0579-7077-4c72-baf4-adaa66615f07&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ff7e0579-7077-4c72-baf4-adaa66615f07&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=b3e1ffc2-6ade-45bf-a7c5-162d9a7c403a&bo=1&sid=90d515e09da211f09dac3f9f78442793&vid=90d5b9a09da211f08aab0fbaea9ae4e3&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=LedgerStateFix&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&r=&lt=3853&evt=pageLoad&sv=2&cdb=AQAS&rn=623963)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e38194b8-ba3a-4a7b-84bc-3d2e583c3061&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e38194b8-ba3a-4a7b-84bc-3d2e583c3061&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=de41450a-2b47-4e68-a7f0-40e517d1cde7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=de41450a-2b47-4e68-a7f0-40e517d1cde7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bf37c01e-b015-40af-a698-27bee1779584&pt=LedgerStateFix&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fledgerstatefix&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/ledgerstatefix#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/ledgerstatefix#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/ledgerstatefix#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/ledgerstatefix#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c7410d5b7e1af5982c05bbbff774df08.1759198198679.1759198198679.1759198198679.1&__hssc=78174987.1.1759198198679&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/ledgerstatefix.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/LedgerStateFix.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.c7410d5b7e1af5982c05bbbff774df08.1759198198679.1759198198679.1759198198679.1&__hssc=78174987.1.1759198198679&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:10:08.645Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
