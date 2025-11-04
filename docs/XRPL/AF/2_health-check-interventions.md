# Health Check Interventions
URL: https://xrpl.org/docs/infrastructure/troubleshooting/health-check-interventions
Section: AF2

## Overview


## Extracted Content
# Health Check Interventions

The Health Check method can be used by automated monitoring to recognize when a rippled server is not healthy and prompt interventions such as restarting the server or alerting a human administrator.

`rippled`

Infrastructure monitoring, and reliability engineering more generally, is an advanced discipline that involves using multiple sources of data to make decisions in context. This document provides some suggestions for how to use the health check most effectively, but these recommendations are only meant as guidelines as part of a larger strategy.


## Momentary Failures

Some metrics in the health check can rapidly fluctuate into unhealthy ranges and then recover automatically shortly afterward. It is unnecessary and undesirable to raise alerts every single time the health check reports an unhealthy status. An automated monitoring system should call the health check method often, but only escalate to a higher level of intervention if the problem is severe and consistent.

For example, if you check the health of the server once per second, you might raise an alert if the server reports "warning" status three times in a row, or four times in a five-second span. You might also raise an alert if the server reports "critical" status twice in a five-second span. It is usually excessive to raise an alert every single time the server reports "warning".

TipThe server normally reports a "critical" status for the first few seconds after startup, switches to a "warning" status after it establishes a connection to the network, and finally reports a "healthy" status when it has fully synced to the network. After a restart, you should give a server 5–15 minutes to sync before taking additional interventions.


## Special Cases

Certain server configurations may always report a warning status even when operating normally. If your server qualifies as a special case, you must configure your automated monitoring to recognize the difference between the normal status and an actual problem. This probably involves parsing the JSON response body for the health check method and comparing the values there with expected normal ranges.

`warning`

Some examples of special cases that may occur include:

- A private peer typically has a very small number of peer-to-peer connections to known servers only, but the health check reports a warning on the peers metric if the server is connected to 7 or fewer peers. You should know the exact number of peers your server is configured to have and check for that value.
- On a parallel or test network where new transactions are not being sent continuously, the network waits up to 20 seconds for new transactions before attempting to validate a new ledger version, but the health check reports a warning on the validated_ledger metric if the latest validated ledger is 7 or more seconds old. If you are running rippled on a non-production network, you may want to ignore warning messages for this metric unless you know that there should be transactions being regularly sent. You may still want to alert on the critical level of 20 seconds, because the XRP Ledger protocol is designed to validate new ledger versions at least once every 20 seconds even if there are no new transactions to process.

`peers`

`validated_ledger`

`rippled`

`warning`

`critical`


## Suggested Interventions

When a health check fails, and it's not just a momentary failure, the action to take to recover from the outage varies based on the cause. You may be able to configure your infrastructure to fix some types of failures automatically. Other failures require the intervention of a human administrator who can investigate and take the necessary steps to resolve more complex or critical failures; depending on the structure of your organization, you may have different levels of human administrator so that less skilled, lower level administrators can fix certain issues independently, but need to escalate to higher level administrators to fix larger or more complex issues. How and when you respond is likely to depend on your unique situation, but the metrics reported in the health check result can be a factor in these decisions.

The following sections suggest some common interventions you may want to attempt and the health check statuses most likely to prompt those interventions. Automated systems and human administrators may selectively escalate through these and other interventions:

- Redirect traffic away from the affected server
- Restart the server software or hardware
- Upgrade the rippled software
- Investigate network in case the problem originates elsewhere
- Replace hardware

`rippled`


### Redirect Traffic

A common reliability technique is to run a pool of redundant servers through one or more load-balancing proxies. You can do this with rippled servers, but should not do this with validators. In some cases, the load balancers can monitor the health of servers in their pools and direct traffic only to the servers that are currently reporting themselves as healthy. This allows servers to recover from being temporarily overloaded and automatically rejoin the pool of active servers.

`rippled`

Redirecting traffic away from a server that is unhealthy is an appropriate response, especially for servers that report a health status of warning. Servers in the critical range may need more significant interventions.

`health`

`warning`

`critical`


### Restart

The most straightforward intervention is to restart the server. This can resolve temporary issues with several types of failures, including any of the following metrics:

- load_factor
- peers
- server_state
- validated_ledger

`load_factor`

`peers`

`server_state`

`validated_ledger`

To restart only the rippled service, use systemctl:

`rippled`

`systemctl`

```
$ sudo systemctl restart rippled.service
```

A stronger intervention is to restart the entire machine.

CautionAfter a server starts, it typically needs up to 15 minutes to sync to the network. During this time, the health check is likely to report a critical or warning status. You should be sure your automated systems give servers enough time to sync before restarting them again.


### Upgrade

If the server reports "amendment_blocked": true in the health check, this indicates that the XRP Ledger has enabled a protocol amendment that your server does not understand. As a precaution against misinterpreting the revised rules of the network in a way that causes you to lose money, such servers become "amendment blocked" instead of operating normally.

`"amendment_blocked": true`

To resolve being amendment blocked, update your server to a newer software version that understands the amendment.

Also, software bugs can cause a server to get stuck not syncing. In this case, the server_state metric is likely to be in a warning or critical state. If you are not using the latest stable release, you should upgrade to get the latest fixes for any known issues that could cause this.

`server_state`


### Investigate Network

An unreliable or insufficient network connection can cause a server to report outages. Warning or critical values in the following metrics can indicate network problems:

- peers
- server_state
- validated_ledger

`peers`

`server_state`

`validated_ledger`

In this case, the necessary interventions may involve changes to other systems, such as:

- Adjusting firewall rules to allow necessary traffic to reach a server, or to block harmful traffic from outside
- Restarting or replacing network interfaces, switches, routers, or cabling
- Contacting other network service providers to resolve an issue on their end


### Replace Hardware

If the outage is caused by a hardware failure or by higher load than the hardware is capable of handling, you may need to replace some components or even the entire server.

The amount of load on a server in the XRP Ledger depends in part on transaction volume in the network, which varies organically. Load also depends on your usage pattern. See Capacity Planning for how to plan the appropriate hardware and settings for your situation.

Warning or critical values for the following metrics may indicate insufficient hardware:

- load_factor
- server_state
- validated_ledger

`load_factor`

`server_state`

`validated_ledger`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=db91e3bb-bec2-4c06-99ff-70a22b1e8953&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=db91e3bb-bec2-4c06-99ff-70a22b1e8953&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dae2a308-26d6-402b-b7f5-a665245c7431&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=dae2a308-26d6-402b-b7f5-a665245c7431&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=1fa4f623-a155-4685-b593-094dc55d23b3&bo=1&sid=71c9ea909dab11f0a5b8235f2fbbf151&vid=71caa9809dab11f0a290fb1d2a7ab24a&vids=0&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Health%20Check%20Interventions&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&r=&lt=2083&evt=pageLoad&sv=2&cdb=AQAS&rn=371605)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=379abf00-1f1c-4333-9406-5e20e625e8ea&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=379abf00-1f1c-4333-9406-5e20e625e8ea&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=55834da1-71b6-4b04-b7e1-a12a06ff14ce&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=55834da1-71b6-4b04-b7e1-a12a06ff14ce&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c9166f10-eefd-4bfe-99ec-839a3bc7c877&pt=Health%20Check%20Interventions&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fhealth-check-interventions&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/troubleshooting/health-check-interventions#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/troubleshooting/health-check-interventions#)
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
- [Resources](https://xrpl.org/docs/infrastructure/troubleshooting/health-check-interventions#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/troubleshooting/health-check-interventions#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/troubleshooting/health-check-interventions.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:14:20.451Z
Agent: Qoder + Playwright MCP
Retries: 1
Status: SUCCESS
