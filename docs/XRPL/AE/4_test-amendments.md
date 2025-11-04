# Test Amendments
URL: https://xrpl.org/docs/infrastructure/testing-and-auditing/test-amendments
Section: AE4

## Overview


## Extracted Content
# Test Amendments

You can test how rippled behaves before proposed amendments are fully enabled on the production network. Since other members of the consensus network won't have the feature enabled, run your server in stand-alone mode.

`rippled`

CautionThis is intended for development purposes only.

To forcibly enable a feature, add a [features] stanza with amendment short names to your rippled.cfg file. Each amendment needs its own line.

`[features]`

`rippled.cfg`

- Example

```
[features]
MultiSign
TrustSetAuth
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=35fd0ee6-6521-4c8b-96d0-15dc99091bd2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=35fd0ee6-6521-4c8b-96d0-15dc99091bd2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=56fdcda4-0af9-4095-a461-61733dfd9d18&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=56fdcda4-0af9-4095-a461-61733dfd9d18&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=cda535c1-a9ae-4a56-8f28-4e91ecada167&bo=1&sid=480848c09dab11f09d39d3e11b343d14&vid=480915909dab11f0a29e85d854e4cd09&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Test%20Amendments&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&r=&lt=3060&evt=pageLoad&sv=2&cdb=AQAS&rn=145371)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=62759c45-0cb4-4a8f-987a-9c58d194ba71&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=62759c45-0cb4-4a8f-987a-9c58d194ba71&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=674bea77-f249-4c82-a75f-e14c23983055&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=674bea77-f249-4c82-a75f-e14c23983055&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=562042d8-9c69-4a6d-a9f1-f858a8bae0fe&pt=Test%20Amendments&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Ftest-amendments&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/testing-and-auditing/test-amendments#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/testing-and-auditing/test-amendments#)
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
- [Resources](https://xrpl.org/docs/infrastructure/testing-and-auditing/test-amendments#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/testing-and-auditing/test-amendments#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/testing-and-auditing/test-amendments.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:12:29.146Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
