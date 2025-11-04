# Configure Validator List Threshold
URL: https://xrpl.org/docs/infrastructure/configuration/configure-validator-list-threshold
Section: AD28

## Overview


## Extracted Content
# Configure Validator List Threshold

A rippled server uses validators that meet a minimum intersection threshold between UNL publishers. This means a server only uses validators that exist on a number of validator lists, as defined by the server owner.

`rippled`

By default, the minimum threshold is calculated as follows:

- floor(validator_list_keys / 2) + 1
- If there are only 1 or 2 validator_list_keys, the threshold is 1.

`validator_list_keys`

`validator_list_keys`

`1`


## Modify the Validators File

1. Edit the validators.txt file. The recommended installation places this file at:/etc/opt/ripple/validators.txt
1. Add the following stanza and a valid threshold number.[validator_list_threshold]
0

Edit the validators.txt file. The recommended installation places this file at:

`validators.txt`

```
/etc/opt/ripple/validators.txt
```

Add the following stanza and a valid threshold number.

```
[validator_list_threshold]
0
```

Be sure to save the changes and restart your server.

NoteIf this value is 0 or isn't set, the threshold will be calculated using the default method. The value also can't be larger than the number of validator_list_keys.

`0`

`validator_list_keys`


## See Also

- validators method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 2.4.0](https://img.shields.io/badge/New in-rippled 2.4.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39fead1a-d52a-4152-9f77-da0c77b57537&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39fead1a-d52a-4152-9f77-da0c77b57537&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f2197afb-dff2-48c3-9840-85975342ab53&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f2197afb-dff2-48c3-9840-85975342ab53&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=f6cbba00-70f2-4f88-ad5e-089b509933ea&bo=1&sid=f32527a09daa11f083b00d32d7833673&vid=f325b2c09daa11f0b0ad21346143b13e&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20Validator%20List%20Threshold&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&r=&lt=3235&evt=pageLoad&sv=2&cdb=AQAS&rn=780373)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c990a202-57d5-423e-b4bc-702996243195&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c990a202-57d5-423e-b4bc-702996243195&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7ef307c6-0e40-4a4a-888c-1939436be2db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7ef307c6-0e40-4a4a-888c-1939436be2db&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=67936b57-a5af-4c94-9c10-e39dd9dd8399&pt=Configure%20Validator%20List%20Threshold&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconfigure-validator-list-threshold&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/configure-validator-list-threshold#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/configure-validator-list-threshold#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/configure-validator-list-threshold#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/configure-validator-list-threshold#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/configure-validator-list-threshold.md)
- [https://github.com/XRPLF/rippled/releases/tag/2.4.0](https://github.com/XRPLF/rippled/releases/tag/2.4.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:10:08.357Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
