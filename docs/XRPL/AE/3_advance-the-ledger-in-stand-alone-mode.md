# Advance the Ledger in Stand-Alone Mode
URL: https://xrpl.org/docs/infrastructure/testing-and-auditing/advance-the-ledger-in-stand-alone-mode
Section: AE3

## Overview


## Extracted Content
# Advance the Ledger in Stand-Alone Mode

In stand-alone mode, rippled does not communicate to other members of the peer-to-peer network or participate in a consensus process. Since there is no consensus process in this mode, you must manually advance the ledger index using the ledger_accept method:

`rippled`

```
rippled ledger_accept --conf=/path/to/rippled.cfg
```

In stand-alone mode, rippled makes no distinction between a "closed" ledger version and a "validated" ledger version. (For more information about the difference, see The XRP Ledger Consensus Process.)

`rippled`

Whenever rippled closes a ledger, it reorders the transactions according to a deterministic but hard-to-game algorithm. (This is an important part of consensus, since transactions may arrive at different parts of the network in different order.) When using rippled in stand-alone mode, you should manually advance the ledger before submitting a transaction that depends on the result of a transaction from a different address. Otherwise, the two transactions might be executed in reverse order when the ledger is closed.

`rippled`

`rippled`

NoteYou can safely submit multiple transactions from a single address to a single ledger, because rippled sorts transactions from the same address in ascending order by Sequence number.

`rippled`

`Sequence`


## See Also

- References:ledger_accept methodserver_info methodrippled Commandline Usage
- ledger_accept method
- server_info method
- rippled Commandline Usage

- ledger_accept method
- server_info method
- rippled Commandline Usage

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=14489181-87e3-4cb3-badf-48ae01afbe26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=14489181-87e3-4cb3-badf-48ae01afbe26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29bb43fc-aa6b-47a8-a2cc-59d0babe20d4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29bb43fc-aa6b-47a8-a2cc-59d0babe20d4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=3df8687e-5d11-409c-9738-3ed26413ed8c&bo=1&sid=3cc5ae209dab11f0b9af4f4778be43ec&vid=3cc658b09dab11f08be149b07a7ca6b1&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&r=&lt=1609&evt=pageLoad&sv=2&cdb=AQAS&rn=117856)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7ac80b85-5f7c-4766-8b2b-327da848484c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7ac80b85-5f7c-4766-8b2b-327da848484c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29fa6c80-10d8-4740-bf51-0bd736f1e7f7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=29fa6c80-10d8-4740-bf51-0bd736f1e7f7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=38f2d260-14e2-411f-9d33-6ec7518dd1f7&pt=Advance%20the%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fadvance-the-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/testing-and-auditing/advance-the-ledger-in-stand-alone-mode#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/testing-and-auditing/advance-the-ledger-in-stand-alone-mode#)
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
- [Resources](https://xrpl.org/docs/infrastructure/testing-and-auditing/advance-the-ledger-in-stand-alone-mode#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/testing-and-auditing/advance-the-ledger-in-stand-alone-mode#)
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
- [Infrastructure](https://xrpl.org/docs/infrastructure)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/testing-and-auditing/advance-the-ledger-in-stand-alone-mode.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:12:12.842Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
