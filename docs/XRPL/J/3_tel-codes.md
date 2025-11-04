# tel Codes
URL: https://xrpl.org/docs/references/protocol/transactions/transaction-results/tel-codes
Section: J3

## Overview


## Extracted Content
# tel Codes

These codes indicate an error in the local server processing the transaction; it is possible that another server with a different configuration or load level could process the transaction successfully. They have numerical values in the range -399 to -300. The exact code for any given error is subject to change, so don't rely on it.

CautionTransactions with tel codes are not applied to ledgers and cannot cause any changes to the XRP Ledger state. However, these transactions may be automatically cached and retried later. Transactions that provisionally failed may still succeed or fail with a different code after being reapplied. For more information, see Finality of Results and Reliable Transaction Submission.

`tel`

| Code | Explanation |
| --- | --- |
| telBAD_DOMAIN | The transaction specified a domain value (for example, the Domain field of an AccountSet transaction) that cannot be used, probably because it is too long to store in the ledger. |
| telBAD_PATH_COUNT | The transaction contains too many paths for the local server to process. |
| telBAD_PUBLIC_KEY | The transaction specified a public key value (for example, as the MessageKey field of an AccountSet transaction) that cannot be used, probably because it is not the right length. |
| telCAN_NOT_QUEUE | The transaction did not meet the open ledger cost, but this server did not queue this transaction because it did not meet the queuing restrictions. For example, a transaction returns this code when the sender already has 10 other transactions in the queue. You can try again later or sign and submit a replacement transaction with a higher transaction cost in the Fee field. |
| telCAN_NOT_QUEUE_BALANCE | The transaction did not meet the open ledger cost and also was not added to the transaction queue because the sum of potential XRP costs of already-queued transactions is greater than the expected balance of the account. You can try again later, or try submitting to a different server. |
| telCAN_NOT_QUEUE_BLOCKS | The transaction did not meet the open ledger cost and also was not added to the transaction queue. This transaction could not replace an existing transaction in the queue because it would block already-queued transactions from the same sender. (For details, see Queuing Restrictions.) You can try again later, or try submitting to a different server. |
| telCAN_NOT_QUEUE_BLOCKED | The transaction did not meet the open ledger cost and also was not added to the transaction queue because a transaction queued ahead of it from the same sender blocks it. (For details, see Queuing Restrictions.) You can try again later, or try submitting to a different server. |
| telCAN_NOT_QUEUE_FEE | The transaction did not meet the open ledger cost and also was not added to the transaction queue. This code occurs when a transaction with the same sender and sequence number already exists in the queue and the new one does not pay a large enough transaction cost to replace the existing transaction. To replace a transaction in the queue, the new transaction must have a Fee value that is at least 25% more, as measured in fee levels. You can increase the Fee and try again, send this with a higher Sequence number so it doesn't replace an existing transaction, or try sending to another server. |
| telCAN_NOT_QUEUE_FULL | The transaction did not meet the open ledger cost and the server did not queue this transaction because this server's transaction queue is full. You could increase the Fee and try again, try again later, or try submitting to a different server. The new transaction must have a higher transaction cost, as measured in fee levels, than the transaction in the queue with the smallest transaction cost. |
| telFAILED_PROCESSING | An unspecified error occurred when processing the transaction. |
| telINSUF_FEE_P | The Fee from the transaction is not high enough to meet the server's current transaction cost requirement, which is derived from its load level and network-level requirements. If the individual server is too busy to process your transaction right now, it may cache the transaction and automatically retry later. |
| telLOCAL_ERROR | Unspecified local error. The transaction may be able to succeed if you submit it to a different server. |
| telNETWORK_ID_MAKES_TX_NON_CANONICAL | The transaction specifies the NetworkID field, but the current network rules require that the NetworkID field be omitted. (Mainnet and other networks with a chain ID of 1024 or less do not use this field.) If the transaction was intended for a network that does not use NetworkID, remove the field and try again. If the transaction was intended for a different network, submit it to a server that is connected to the correct network. |
| telNO_DST_PARTIAL | The transaction is an XRP payment that would fund a new account, but the tfPartialPayment flag was enabled. This is disallowed. |
| telREQUIRES_NETWORK_ID | The transaction does not specify a NetworkID field, but the current network requires one. If the transaction was intended for a network that requires NetworkID, add the field and try again. If the transaction was intended for a different network, submit it to a server that is connected to the correct network. |
| telWRONG_NETWORK | The transaction specifies the wrong NetworkID value for the current network. Either specify the correct the NetworkID value for the intended network, or submit the transaction to a server that is connected to the correct network. |


`telBAD_DOMAIN`

`Domain`

`telBAD_PATH_COUNT`

`telBAD_PUBLIC_KEY`

`MessageKey`

`telCAN_NOT_QUEUE`

`Fee`

`telCAN_NOT_QUEUE_BALANCE`

`telCAN_NOT_QUEUE_BLOCKS`

`telCAN_NOT_QUEUE_BLOCKED`

`telCAN_NOT_QUEUE_FEE`

`Fee`

`Fee`

`Sequence`

`telCAN_NOT_QUEUE_FULL`

`Fee`

`telFAILED_PROCESSING`

`telINSUF_FEE_P`

`Fee`

`telLOCAL_ERROR`

`telNETWORK_ID_MAKES_TX_NON_CANONICAL`

`NetworkID`

`NetworkID`

`NetworkID`

`telNO_DST`

`PARTIAL`

`tfPartialPayment`

`telREQUIRES_NETWORK_ID`

`NetworkID`

`NetworkID`

`telWRONG_NETWORK`

`NetworkID`

`NetworkID`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 1.11.0](https://img.shields.io/badge/New in-rippled 1.11.0-blue.svg)

![New in: rippled 1.11.0](https://img.shields.io/badge/New in-rippled 1.11.0-blue.svg)

![New in: rippled 1.11.0](https://img.shields.io/badge/New in-rippled 1.11.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=871d62c1-cbb3-478b-b7fe-08799f93e2d1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=871d62c1-cbb3-478b-b7fe-08799f93e2d1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4e797676-b678-4888-842d-f3438ed19c54&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4e797676-b678-4888-842d-f3438ed19c54&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=0681ee36-dd90-4ae5-b4ea-abd13b79e536&bo=1&sid=596923809da411f0a64333648b18d6b6&vid=59698a409da411f093ecc93d33ec40ae&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=tel%20Codes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&r=&lt=2862&evt=pageLoad&sv=2&cdb=AQAS&rn=124690)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=482315ff-7a41-4665-82d0-03afdd5e3bde&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=482315ff-7a41-4665-82d0-03afdd5e3bde&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c3682948-d345-465b-b1f2-e5a70b4ce792&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c3682948-d345-465b-b1f2-e5a70b4ce792&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1b1d3eed-b592-4406-aedb-d630d0c9429b&pt=tel%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftel-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tel-codes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tel-codes#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tel-codes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tel-codes#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/transaction-results/tel-codes.md)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:22:54.192Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
