# ter Codes
URL: https://xrpl.org/docs/references/protocol/transactions/transaction-results/ter-codes
Section: J5

## Overview


## Extracted Content
# ter Codes

These codes indicate that the transaction has not been applied yet, and generally will be automatically retried by the server that returned the result code. The transaction could apply successfully in the future; for example, if a certain other transaction applies first. These codes have numerical values in the range -99 to -1, but the exact code for any given error is subject to change, so don't rely on it.

Transactions with ter codes have not been applied to the current ledger and have not yet changed the XRP Ledger state. A transaction that provisionally got a ter result may still succeed or fail with a different code after being automatically applied later. For more information, see Finality of Results and Reliable Transaction Submission.

`ter`

`ter`

| Code | Explanation |
| --- | --- |
| terFUNDS_SPENT | DEPRECATED. |
| terINSUF_FEE_B | The account sending the transaction does not have enough XRP to pay the Fee specified in the transaction. |
| terLAST | Used internally only. This code should never be returned. |
| terNO_ACCOUNT | The address sending the transaction is not funded in the ledger (yet). |
| terNO_AMM | The AMM-related transaction specifies an asset pair that does not currently have an AMM instance. (Added by the AMM amendment) |
| terNO_AUTH | The transaction would involve adding currency issued by an account with lsfRequireAuth enabled to a trust line that is not authorized. For example, you placed an offer to buy a currency you aren't authorized to hold. |
| terNO_LINE | Used internally only. This code should never be returned. |
| terNO_RIPPLE | The transaction can't succeed because of rippling settings. For example, the transaction tried to create an AMM even though the issuer of at least one of the tokens has not enabled the Default Ripple flag. |
| terOWNERS | The transaction requires that account sending it has a nonzero "owners count", so the transaction cannot succeed. For example, an account cannot enable the lsfRequireAuth flag if it has any trust lines or available offers. |
| terPRE_SEQ | The Sequence number of the current transaction is higher than the current sequence number of the account sending the transaction. |
| terPRE_TICKET | The transaction attempted to use a Ticket, but the specified TicketSequence number does not exist in the ledger. However, the Ticket could still be created by another transaction. |
| terQUEUED | The transaction met the load-scaled transaction cost but did not meet the open ledger requirement, so the transaction has been queued for a future ledger. |
| terRETRY | Unspecified retriable error. |
| terSUBMITTED | Transaction has been submitted, but not yet applied. |


`terFUNDS_SPENT`

`terINSUF_FEE_B`

`Fee`

`terLAST`

`terNO_ACCOUNT`

`terNO_AMM`

`terNO_AUTH`

`lsfRequireAuth`

`terNO_LINE`

`terNO_RIPPLE`

`terOWNERS`

`lsfRequireAuth`

`terPRE_SEQ`

`Sequence`

`terPRE_TICKET`

`TicketSequence`

`terQUEUED`

`terRETRY`

`terSUBMITTED`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9210be61-0145-412c-9c96-a78ce776add4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9210be61-0145-412c-9c96-a78ce776add4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d974364d-e7d8-4a1f-b143-1c793ad3af1e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d974364d-e7d8-4a1f-b143-1c793ad3af1e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=ed5209aa-e656-424e-91ae-67fa4fd76c5a&bo=1&sid=7281e8109da411f0bbf831e2f018f9b0&vid=728257f09da411f0bbaf7f88e3a730ea&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=ter%20Codes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&r=&lt=2527&evt=pageLoad&sv=2&cdb=AQAS&rn=357537)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1a228e9c-0ddd-455c-b0dd-e898578c49e0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1a228e9c-0ddd-455c-b0dd-e898578c49e0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8056c8e8-3ba2-4e1f-8146-a3d4940d9d26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8056c8e8-3ba2-4e1f-8146-a3d4940d9d26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6ab2cb8b-3a4f-4304-a31d-e7c7623d1458&pt=ter%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Fter-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/transaction-results/ter-codes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/transaction-results/ter-codes#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/transaction-results/ter-codes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/transaction-results/ter-codes#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.0566a76583fec8c98a27ffe3caed7264.1759199008425.1759199008425.1759199008425.1&__hssc=78174987.1.1759199008425&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/transaction-results/ter-codes.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.0566a76583fec8c98a27ffe3caed7264.1759199008425.1759199008425.1759199008425.1&__hssc=78174987.1.1759199008425&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:23:34.860Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
