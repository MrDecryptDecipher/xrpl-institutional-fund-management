# Transaction Censorship Detection
URL: https://xrpl.org/docs/concepts/networks-and-servers/transaction-censorship-detection
Section: B6

## Overview


## Extracted Content
# Transaction Censorship Detection

The XRP Ledger is designed to be censorship resistant. In support of this design, the XRP Ledger provides an automated transaction censorship detector that is available on all rippled servers, enabling all participants to see if censorship is affecting the network.

`rippled`

While a rippled server is in sync with the network, the detector tracks all transactions that should have been accepted in the last round of consensus and included in the last validated ledger. The detector issues log messages of increasing severity when it sees transactions that have not been included in a validated ledger after several rounds of consensus.

`rippled`


## How It Works

At a high-level, here’s how the transaction censorship detector works:

1. The detector adds all transactions in the server's initial consensus proposal to the tracker.
1. At the close of the consensus round, the detector removes all transactions included in the resulting validated ledger from the tracker.
1. The detector issues a warning message in the log for any transaction that remains in the tracker for 15 ledgers, surfacing it as a potentially censored transaction. The transaction's presence in the tracker at this time means that is has not been included in a validated ledger after 15 rounds of consensus. If the transaction remains in the tracker for another 15 ledgers, the detector issues another warning message in the log.For as long as the transaction remains in the tracker, the detector continues to issue a warning message in the log every 15 ledgers, for up to five warning messages. After the fifth warning message, the detector issues a final error message in the log and then stops issuing warning and error messages.If you see these messages in your rippled server log, you should investigate why other servers are failing to include the transaction, starting with the assumption that the cause is more likely to be a false positive (innocent bug) than malicious censorship.

The detector adds all transactions in the server's initial consensus proposal to the tracker.

At the close of the consensus round, the detector removes all transactions included in the resulting validated ledger from the tracker.

The detector issues a warning message in the log for any transaction that remains in the tracker for 15 ledgers, surfacing it as a potentially censored transaction. The transaction's presence in the tracker at this time means that is has not been included in a validated ledger after 15 rounds of consensus. If the transaction remains in the tracker for another 15 ledgers, the detector issues another warning message in the log.

For as long as the transaction remains in the tracker, the detector continues to issue a warning message in the log every 15 ledgers, for up to five warning messages. After the fifth warning message, the detector issues a final error message in the log and then stops issuing warning and error messages.

If you see these messages in your rippled server log, you should investigate why other servers are failing to include the transaction, starting with the assumption that the cause is more likely to be a false positive (innocent bug) than malicious censorship.

`rippled`


## Example Warning Message

This is an example warning message issued by the transaction censorship detector after transaction E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7 remained in the tracker for 15 ledgers, from ledger 18851530 to ledger 18851545.

```
LedgerConsensus:WRN Potential Censorship: Eligible tx E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7, which we are tracking since ledger 18851530 has not been included as of ledger 18851545.
```


## Example Error Message

This is an example error message issued by the transaction censorship detector after transaction E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7 remained in the tracker for 75 ledgers (5 sets of 15 ledgers), from ledger 18851530 to ledger 18851605.

```
LedgerConsensus:ERR Potential Censorship: Eligible tx E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7, which we are tracking since ledger 18851530 has not been included as of ledger 18851605. Additional warnings suppressed.
```


## Potential False Positives

The transaction censorship detector may issue false positives in certain scenarios. In this case, a false positive means that the detector has flagged a transaction that has remained in the tracker for 15 ledgers or more, but for innocent reasons.

Here are some scenarios that could cause the detector to issue false positive messages:

- Your server is running a build with code that is different from the rest of the network. This may cause your server to apply transactions differently, resulting in false positives. While this type of false positive is unlikely, in general, it is crucial that you run a compatible version of the core XRP Ledger server.
- Your server is out of sync with the network and has not yet realized it.
- Servers in the network, including possibly your own server, have a bug that causes them to inconsistently relay transactions to other servers in the network.Currently, there are no known bugs that cause this unexpected behavior. However, if you see the impact of what you suspect is a bug, consider reporting it to the Ripple Bug Bounty program.

Your server is running a build with code that is different from the rest of the network. This may cause your server to apply transactions differently, resulting in false positives. While this type of false positive is unlikely, in general, it is crucial that you run a compatible version of the core XRP Ledger server.

Your server is out of sync with the network and has not yet realized it.

Servers in the network, including possibly your own server, have a bug that causes them to inconsistently relay transactions to other servers in the network.

Currently, there are no known bugs that cause this unexpected behavior. However, if you see the impact of what you suspect is a bug, consider reporting it to the Ripple Bug Bounty program.


## See Also

- Concepts:Consensus Principles and RulesTransaction Queue
- Consensus Principles and Rules
- Transaction Queue
- Tutorials:Reliable Transaction SubmissionUnderstanding Log Messages
- Reliable Transaction Submission
- Understanding Log Messages
- References:Transaction Results
- Transaction Results

- Consensus Principles and Rules
- Transaction Queue

- Reliable Transaction Submission
- Understanding Log Messages

- Transaction Results

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 1.2.0](https://img.shields.io/badge/New in-rippled 1.2.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=847329f2-791e-40e5-9af9-480f9dc2d8b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=847329f2-791e-40e5-9af9-480f9dc2d8b8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=66214100-d009-4fa8-9c77-d065e80f23db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=66214100-d009-4fa8-9c77-d065e80f23db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=de33ccd5-fd7e-4430-a16f-7f7a85572221&bo=1&sid=0fbb31809d9b11f086b037adb8ae4e71&vid=0fbbaa209d9b11f09aadefa8d85cb110&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Transaction%20Censorship%20Detection&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&r=&lt=3032&evt=pageLoad&sv=2&cdb=AQAS&rn=642544)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d9c5b0c8-f14e-4556-a25f-8d751522958b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d9c5b0c8-f14e-4556-a25f-8d751522958b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb82f8f7-83d8-45b0-b327-f1b48b562b99&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb82f8f7-83d8-45b0-b327-f1b48b562b99&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5a8f421b-a1ed-4193-b44d-26fc21fe62b0&pt=Transaction%20Censorship%20Detection&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Fconcepts%2Fnetworks-and-servers%2Ftransaction-censorship-detection&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/concepts/networks-and-servers/transaction-censorship-detection#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/concepts/networks-and-servers/transaction-censorship-detection#)
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
- [Resources](https://xrpl.org/docs/concepts/networks-and-servers/transaction-censorship-detection#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/concepts/networks-and-servers/transaction-censorship-detection#)
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
- [Networks and Servers](https://xrpl.org/docs/concepts/networks-and-servers)
- [rippled Server Modes](https://xrpl.org/docs/concepts/networks-and-servers/rippled-server-modes)
- [Clustering](https://xrpl.org/docs/concepts/networks-and-servers/clustering)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.7c2414696124d2f971ffb4a0b271217d.1759194977327.1759194977327.1759194977327.1&__hssc=78174987.1.1759194977327&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/concepts/networks-and-servers/transaction-censorship-detection.md)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.0](https://github.com/XRPLF/rippled/releases/tag/1.2.0)
- [Ripple Bug Bounty](https://ripple.com/bug-bounty/?__hstc=78174987.7c2414696124d2f971ffb4a0b271217d.1759194977327.1759194977327.1759194977327.1&__hssc=78174987.1.1759194977327&__hsfp=421414132)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.7c2414696124d2f971ffb4a0b271217d.1759194977327.1759194977327.1759194977327.1&__hssc=78174987.1.1759194977327&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:16:25.547Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
