# Contribute Code
URL: https://xrpl.org/resources/contribute-code
Section: AG11

## Overview


## Extracted Content
# Contribute Code

The software that powers the XRP Ledger is open source. Anyone can download, modify, extend, or explore it. If you want to contribute code, it's important to work with the community to define the specifications of your changes and test the code before it becomes a part of the XRP Ledger protocol and blockchain.


## Core Server Source

The software that powers the XRP Ledger is open-source, so anyone can download, modify, extend, or explore it. Community involvement makes it better. Look for "[Source]" links in the documentation to jump directly into the related source code, or browse the source code on GitHub:

| XRP Ledger Source Code |  |
| --- | --- |
| Repository | https://github.com/XRPLF/rippled |
| License | Multiple; ISC (permissive) |
| Programming Language | C++ |


If you're not sure where to start, Dev Null Productions provides a detailed and thorough Source Code Guide that describes the structure and functions of the core XRP Ledger server (rippled) implementation.

`rippled`


## XRP Ledger Standards

Changes to rippled are tracked by an XRP Ledger Standard (XLS), a document that identifies and details the specifications of a change. Before committing to development, you must start a discussion in the XRPL-Standards repo. This provides the community a chance to discuss and provide feedback about your change.

`rippled`

NoteBug fixes don't require an XLS, but may require an amendment.

Creating an XLS has its own process, but can be summarized as:

1. Start a discussion and gather feedback.
1. Create an XLS draft in the standards repo.
1. Publishing the XLS draft as a Candidate Specification.

For details, see the XLS contributing guide.


## Amendment Implementation

After you've created an XLS draft, you now need to determine if your change requires an amendment. Changes that affect transaction processing require amendments, specifically changes that:

- Modify ledger rules, resulting in different outcomes.
- Add or remove transactions.
- Affect consensus.

NoteIf your change doesn't need an amendment, you can go straight to coding and deployment.

Implementing code as an amendment requires you to add the amendment to these files:

- Feature.cpp:Supported parameter should be set to no until development is complete.DefaultVote parameter should be set to yes for bug fixes; everything else defaults to no.
- Feature.h: Increment the numFeatures counter and declare an extern uint256 const variable.

Feature.cpp:

Supported parameter should be set to no until development is complete.

`Supported`

`no`

DefaultVote parameter should be set to yes for bug fixes; everything else defaults to no.

`DefaultVote`

`yes`

`no`

Feature.h: Increment the numFeatures counter and declare an extern uint256 const variable.

`numFeatures`

`extern uint256 const`


## Coding and Deployment

The general development path breaks down as follows:

1. Create a fork or branch in the rippled repository to develop your code.TipIf you're not sure where to start, Dev Null Productions provides a detailed and thorough rippled Source Code Guide.
1. Run unit and integration tests. Running a server in stand-alone mode is useful for testing your changes in an isolated environment, but you may want to stand up a private network for extensive changes.
1. Create a pull request on XRPLF:develop.Note for Amendments: Update the Supported paramter to yes in Feature.cpp.
1. After the pull request is approved by XRP Ledger maintainers, your code is merged into develop and additional testing can be done on Devnet.Note for Amendments:The DefaultVote parameter is now locked.If problems are found with the amendment, you must restart the process of making fixes and submitting a new PR. You can change the default vote in the new PR.
1. The DefaultVote parameter is now locked.
1. If problems are found with the amendment, you must restart the process of making fixes and submitting a new PR. You can change the default vote in the new PR.
1. On a quarterly basis, a release candidate is built from approved PRs on develop. The package is deployed to Testnet and a few nodes on Mainnet. If no issues are found with the release candidate, the code is merged into master and nodes on Mainnet can upgrade to this build.
1. New amendments go through the consensus process and validators vote on whether to enable them.

Create a fork or branch in the rippled repository to develop your code.

`rippled`

TipIf you're not sure where to start, Dev Null Productions provides a detailed and thorough rippled Source Code Guide.

`rippled`

Run unit and integration tests. Running a server in stand-alone mode is useful for testing your changes in an isolated environment, but you may want to stand up a private network for extensive changes.

Create a pull request on XRPLF:develop.

`XRPLF:develop`

Note for Amendments: Update the Supported paramter to yes in Feature.cpp.

`Supported`

`yes`

After the pull request is approved by XRP Ledger maintainers, your code is merged into develop and additional testing can be done on Devnet.

`develop`

Note for Amendments:

- The DefaultVote parameter is now locked.
- If problems are found with the amendment, you must restart the process of making fixes and submitting a new PR. You can change the default vote in the new PR.

`DefaultVote`

On a quarterly basis, a release candidate is built from approved PRs on develop. The package is deployed to Testnet and a few nodes on Mainnet. If no issues are found with the release candidate, the code is merged into master and nodes on Mainnet can upgrade to this build.

`develop`

`master`

New amendments go through the consensus process and validators vote on whether to enable them.


## Code Flowchart


## See Also

- Concepts:Amendments
- Amendments

- Amendments

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Code Flowchart](https://xrpl.org/assets/contribute-code-flowchart.e1670bfc28afe36c2082aaea25270bd003d8c5b7333a15a75b0e911afb44ffd0.ac57e6ef.png)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5ba9fb27-1c41-4db9-97c4-6bcef9a1588c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5ba9fb27-1c41-4db9-97c4-6bcef9a1588c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=183c5532-1413-4b18-afba-1672b9bd4724&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=183c5532-1413-4b18-afba-1672b9bd4724&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=9dbbb22d-3334-40eb-9c8b-61b75220bad7&bo=1&sid=e2def9809dac11f0968f6d27b3626621&vid=e2dfa8a09dac11f0938d3da1298476c0&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Contribute%20Code&p=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&r=&lt=2429&evt=pageLoad&sv=2&cdb=AQAS&rn=397867)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e4630bb-7d33-43e1-8058-684598f6e668&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e4630bb-7d33-43e1-8058-684598f6e668&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2cb3011d-b0fa-4d3b-b6ce-f7effee27e55&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2cb3011d-b0fa-4d3b-b6ce-f7effee27e55&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d9ba01aa-30da-4f95-acf0-655ecb84e26e&pt=Contribute%20Code&tw_document_href=https%3A%2F%2Fxrpl.org%2Fresources%2Fcontribute-code&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/resources/contribute-code#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/resources/contribute-code#)
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
- [Resources](https://xrpl.org/resources/contribute-code#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/resources/contribute-code#)
- [Contribute to the XRPL CommunityJoin the conversation](https://xrpl.org/community)
- [Events](https://xrpl.org/community/events)
- [Ambassadors](https://xrpl.org/community/ambassadors)
- [Developer Funding](https://xrpl.org/community/developer-funding)
- [XRPL Jobs](https://jobs.xrpl.org/)
- [Dev Blog](https://xrpl.org/blog)
- [Report a Scam](https://xrpl.org/community/report-a-scam)
- [Documentation](https://xrpl.org/docs)
- [Resources](https://xrpl.org/resources)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.278d6e5065df52f87c7f2dfb4e1604b3.1759202633242.1759202633242.1759202633242.1&__hssc=78174987.1.1759202633242&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/resources/contribute-code/index.md)
- [https://github.com/XRPLF/rippled](https://github.com/XRPLF/rippled)
- [Multiple; ISC (permissive)](https://github.com/XRPLF/rippled/blob/develop/LICENSE.md)
- [Source Code Guide](https://xrpintel.com/source)
- [XRPL-Standards repo](https://github.com/XRPLF/XRPL-Standards/discussions)
- [XLS contributing guide](https://github.com/XRPLF/XRPL-Standards/blob/master/CONTRIBUTING.md)
- [rippled repository](https://github.com/XRPLF/rippled)
- [rippled Source Code Guide](https://xrpintel.com/source)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.278d6e5065df52f87c7f2dfb4e1604b3.1759202633242.1759202633242.1759202633242.1&__hssc=78174987.1.1759202633242&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:24:03.348Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
