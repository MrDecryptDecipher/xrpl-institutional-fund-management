# Start a New Genesis Ledger in Stand-Alone Mode
URL: https://xrpl.org/docs/infrastructure/testing-and-auditing/start-a-new-genesis-ledger-in-stand-alone-mode
Section: AE1

## Overview


## Extracted Content
# Start a New Genesis Ledger in Stand-Alone Mode

In stand-alone mode, you can have rippled create a new genesis ledger. This provides a known state, with none of the ledger history from the production XRP Ledger. (This is very useful for unit tests, among other things.)

`rippled`

- To start rippled in stand-alone mode with a new genesis ledger, use the -a and --start options:

`rippled`

`-a`

`--start`

```
rippled -a --start --conf=/path/to/rippled.cfg
```

For more information on the options you can use when starting rippled in stand-alone mode, see Commandline Usage: Stand-Alone Mode Options.

`rippled`

In a genesis ledger, the genesis address holds all 100 billion XRP. The keys of the genesis address are hardcoded as follows:

Address: rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh

`rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh`

Secret: snoPBrXtMeMyMHUVTgbuqAfg1SUTb ("masterpassphrase")

`snoPBrXtMeMyMHUVTgbuqAfg1SUTb`

`masterpassphrase`


## Settings in New Genesis Ledgers

In a new genesis ledger, the hard-coded default Reserve is 200 XRP minimum for funding a new address, with an increment of 50 XRP per object in the ledger. These values are higher than the current reserve requirements of the production network. (See also: Fee Voting)

By default, a new genesis ledger has no amendments enabled. If you start a new genesis ledger with --start, the genesis ledger contains an EnableAmendment pseudo-transaction to turn on all amendments natively supported by the rippled server, except for amendments that you explicitly disable in the config file. The effects of those amendments are available starting from the very next ledger version. (Reminder: in stand-alone mode, you must advance the ledger manually.)

`--start`

`rippled`


## See Also

- Concepts:The rippled Serverrippled Server ModesParallel NetworksAmendmentsFee Voting
- The rippled Serverrippled Server Modes
- rippled Server Modes
- Parallel Networks
- Amendments
- Fee Voting
- References:ledger_accept methodserver_info methodrippled Commandline Usage
- ledger_accept method
- server_info method
- rippled Commandline Usage
- Use Cases:Contribute Code to the XRP Ledger
- Contribute Code to the XRP Ledger

- The rippled Serverrippled Server Modes
- rippled Server Modes
- Parallel Networks
- Amendments
- Fee Voting

`rippled`

- rippled Server Modes

`rippled`

- ledger_accept method
- server_info method
- rippled Commandline Usage

`rippled`

- Contribute Code to the XRP Ledger

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5810f01f-a633-415b-a729-1061ef4d8587&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5810f01f-a633-415b-a729-1061ef4d8587&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a8d59b97-e98e-4f35-9ddd-8f0094cfa410&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a8d59b97-e98e-4f35-9ddd-8f0094cfa410&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4ec13220-7d21-4319-b9f3-3b8fa87cb762&bo=1&sid=275c8cf09dab11f0995935305b1bc9fb&vid=275d47d09dab11f0987f0d9e81eb9754&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&r=&lt=4793&evt=pageLoad&sv=2&cdb=AQAS&rn=119457)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=986a24f7-5447-4244-9953-dd7928caf320&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=986a24f7-5447-4244-9953-dd7928caf320&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0d9fe630-823f-4b20-8d31-52fe016a1797&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0d9fe630-823f-4b20-8d31-52fe016a1797&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=675850b2-c361-4546-837b-12ee210a8d67&pt=Start%20a%20New%20Genesis%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fstart-a-new-genesis-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/testing-and-auditing/start-a-new-genesis-ledger-in-stand-alone-mode#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/testing-and-auditing/start-a-new-genesis-ledger-in-stand-alone-mode#)
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
- [Resources](https://xrpl.org/docs/infrastructure/testing-and-auditing/start-a-new-genesis-ledger-in-stand-alone-mode#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/testing-and-auditing/start-a-new-genesis-ledger-in-stand-alone-mode#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.cf9b9e60ada1150a0a5c5909f6fd8549.1759201887140.1759201887140.1759201887140.1&__hssc=78174987.1.1759201887140&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/testing-and-auditing/start-a-new-genesis-ledger-in-stand-alone-mode.md)
- [hardcoded](https://github.com/XRPLF/rippled/blob/94ed5b3a53077d815ad0dd65d490c8d37a147361/src/ripple/app/ledger/Ledger.cpp#L184)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.cf9b9e60ada1150a0a5c5909f6fd8549.1759201887140.1759201887140.1759201887140.1&__hssc=78174987.1.1759201887140&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:11:35.718Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
