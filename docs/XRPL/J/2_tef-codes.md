# tef Codes
URL: https://xrpl.org/docs/references/protocol/transactions/transaction-results/tef-codes
Section: J2

## Overview


## Extracted Content
# tef Codes

These codes indicate that the transaction failed and was not included in a ledger, but the transaction could have succeeded in some theoretical ledger. Typically this means that the transaction can no longer succeed in any future ledger. They have numerical values in the range -199 to -100. The exact code for any given error is subject to change, so don't rely on it.

CautionTransactions with tef codes are not applied to ledgers and cannot cause any changes to the XRP Ledger state. However, a transaction that provisionally failed may still succeed or fail with a different code after being reapplied. For more information, see Finality of Results and Reliable Transaction Submission.

`tef`

| Code | Explanation |
| --- | --- |
| tefALREADY | The same exact transaction has already been applied. |
| tefBAD_ADD_AUTH | DEPRECATED. |
| tefBAD_AUTH | The key used to sign this account is not authorized to modify this account. (It could be authorized if the account had the same key set as the Regular Key.) |
| tefBAD_AUTH_MASTER | The single signature provided to authorize this transaction does not match the master key, but no regular key is associated with this address. |
| tefBAD_LEDGER | While processing the transaction, the ledger was discovered in an unexpected state. If you can reproduce this error, please report an issue to get it fixed. |
| tefBAD_QUORUM | The transaction was multi-signed, but the total weights of all included signatures did not meet the quorum. |
| tefBAD_SIGNATURE | The transaction was multi-signed, but contained a signature for an address not part of a SignerList associated with the sending account. |
| tefCREATED | DEPRECATED. |
| tefEXCEPTION | While processing the transaction, the server entered an unexpected state. This may be caused by unexpected inputs, for example if the binary data for the transaction is grossly malformed. If you can reproduce this error, please report an issue to get it fixed. |
| tefFAILURE | Unspecified failure in applying the transaction. |
| tefINTERNAL | When trying to apply the transaction, the server entered an unexpected state. If you can reproduce this error, please report an issue to get it fixed. |
| tefINVARIANT_FAILED | An invariant check failed when trying to claim the transaction cost. Added by the EnforceInvariants amendment. If you can reproduce this error, please report an issue. |
| tefMASTER_DISABLED | The transaction was signed with the account's master key, but the account has the lsfDisableMaster field set. |
| tefMAX_LEDGER | The transaction included a LastLedgerSequence parameter, but the current ledger's sequence number is already higher than the specified value. |
| tefNFTOKEN_IS_NOT_TRANSFERABLE | The transaction attempted to send a non-fungible token to another account, but the NFToken has the lsfTransferable flag disabled and the transfer would not be to or from the issuer. (Added by the NonFungibleTokensV1_1 amendment.) |
| tefNO_AUTH_REQUIRED | The TrustSet transaction tried to mark a trust line as authorized, but the lsfRequireAuth flag is not enabled for the corresponding account, so authorization is not necessary. |
| tefNO_TICKET | The transaction attempted to use a Ticket, but the specified TicketSequence number does not exist in the ledger, and cannot be created in the future because it is earlier than the sender's current sequence number. |
| tefNOT_MULTI_SIGNING | The transaction was multi-signed, but the sending account has no SignerList defined. |
| tefPAST_SEQ | The sequence number of the transaction is lower than the current sequence number of the account sending the transaction. |
| tefTOO_BIG | The transaction would affect too many objects in the ledger. For example, this was an AccountDelete transaction but the account to be deleted owns over 1000 objects in the ledger. |
| tefWRONG_PRIOR | The transaction contained an AccountTxnID field (or the deprecated PreviousTxnID field), but the transaction specified there does not match the account's previous transaction. |


`tefALREADY`

`tefBAD_ADD_AUTH`

`tefBAD_AUTH`

`tefBAD_AUTH_MASTER`

`tefBAD_LEDGER`

`tefBAD_QUORUM`

`tefBAD_SIGNATURE`

`tefCREATED`

`tefEXCEPTION`

`tefFAILURE`

`tefINTERNAL`

`tefINVARIANT_FAILED`

`tefMASTER_DISABLED`

`lsfDisableMaster`

`tefMAX_LEDGER`

`LastLedgerSequence`

`tefNFTOKEN_IS_NOT_TRANSFERABLE`

`NFToken`

`lsfTransferable`

`tefNO_AUTH_REQUIRED`

`lsfRequireAuth`

`tefNO_TICKET`

`TicketSequence`

`tefNOT_MULTI_SIGNING`

`tefPAST_SEQ`

`tefTOO_BIG`

`tefWRONG_PRIOR`

`AccountTxnID`

`PreviousTxnID`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fd0743c8-6b7b-4520-a12f-0a2a4772fc1a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fd0743c8-6b7b-4520-a12f-0a2a4772fc1a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=84d6c3e2-8c8a-4ce4-b4ee-25d35882e6ec&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=84d6c3e2-8c8a-4ce4-b4ee-25d35882e6ec&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=a4f729aa-e5ed-443f-b03d-2682f46908f6&bo=1&sid=4f6e36209da411f0adf3adb36f38e7d3&vid=4f6e9d009da411f08ffd33e1123ea160&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=tef%20Codes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&r=&lt=2098&evt=pageLoad&sv=2&cdb=AQAS&rn=844908)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=20e6e747-525c-44b9-999a-86152c387071&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=20e6e747-525c-44b9-999a-86152c387071&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5031ac1-d288-40fb-8b8a-1ee6df46b152&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e5031ac1-d288-40fb-8b8a-1ee6df46b152&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=298a9fff-7ceb-4740-b091-b2e15dbf5f92&pt=tef%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftef-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tef-codes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tef-codes#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tef-codes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tef-codes#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.799f4241f8a577615823af07422761e8.1759198949728.1759198949728.1759198949728.1&__hssc=78174987.1.1759198949728&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/transaction-results/tef-codes.md)
- [report an issue](https://github.com/XRPLF/rippled/issues)
- [report an issue](https://github.com/XRPLF/rippled/issues)
- [report an issue](https://github.com/XRPLF/rippled/issues)
- [report an issue](https://github.com/XRPLF/rippled/issues)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.799f4241f8a577615823af07422761e8.1759198949728.1759198949728.1759198949728.1&__hssc=78174987.1.1759198949728&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:22:37.547Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
