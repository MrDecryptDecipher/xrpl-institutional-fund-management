# Update Automatically on Linux
URL: https://xrpl.org/docs/infrastructure/installation/update-rippled-automatically-on-linux
Section: AD6

## Overview


## Extracted Content
# Update Automatically on Linux

On Linux, you can set up rippled to automatically upgrade to the latest version with a one-time cron configuration.

`rippled`

`cron`

These instructions assume you have already installed rippled from a package on Red Hat Enterprise Linux, Ubuntu Linux, or Debian Linux.

`rippled`

To set up automatic updates, complete the following steps:

1. Check that /opt/ripple/etc/update-rippled-cron exists. If it does not, update manually (Red Hat or Ubuntu/Debian).
1. Create a symlink in your cron.d folder to the /opt/ripple/etc/update-rippled-cron config file:sudo ln -s /opt/ripple/etc/update-rippled-cron /etc/cron.d/This configuration runs a script to update the installed rippled package within an hour of each new release. To avoid network instability from too many servers updating at the same time, this script does not automatically restart the server, so it continues to run the old version until it restarts.
1. Whenever a new release comes out, you must manually restart the rippled service to switch to the updated software.sudo systemctl restart rippled.service

Check that /opt/ripple/etc/update-rippled-cron exists. If it does not, update manually (Red Hat or Ubuntu/Debian).

`/opt/ripple/etc/update-rippled-cron`

Create a symlink in your cron.d folder to the /opt/ripple/etc/update-rippled-cron config file:

`cron.d`

`/opt/ripple/etc/update-rippled-cron`

```
sudo ln -s /opt/ripple/etc/update-rippled-cron /etc/cron.d/
```

This configuration runs a script to update the installed rippled package within an hour of each new release. To avoid network instability from too many servers updating at the same time, this script does not automatically restart the server, so it continues to run the old version until it restarts.

`rippled`

Whenever a new release comes out, you must manually restart the rippled service to switch to the updated software.

`rippled`

```
sudo systemctl restart rippled.service
```

CautionIn the future, it is possible that changes to Ripple's repositories may require manual intervention to update the URLs where your script searches for updates. Stay tuned to the XRP Ledger Blog or the ripple-server mailing list for announcements on any required changes.


## See Also

- Concepts:The rippled ServerConsensus
- The rippled Server
- Consensus
- Tutorials:Capacity PlanningTroubleshoot rippled
- Capacity Planning
- Troubleshoot rippled
- References:rippled API Referencerippled Commandline Usageserver_info method
- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- The rippled Server
- Consensus

`rippled`

- Capacity Planning
- Troubleshoot rippled

- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- rippled Commandline Usage
- server_info method

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e8032f3-7d44-4e5a-9a5c-630c57eca1f4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2e8032f3-7d44-4e5a-9a5c-630c57eca1f4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea20118d-fd9c-402c-9e09-64f42eed2533&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea20118d-fd9c-402c-9e09-64f42eed2533&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6669dc68-0ff7-455b-a827-d9ad5515eae6&bo=1&sid=dc1dafb09da911f0bf02a1f2662f2424&vid=dc1e29309da911f0a2241f531bafa917&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Update%20Automatically%20on%20Linux&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&r=&lt=2615&evt=pageLoad&sv=2&cdb=AQAS&rn=7980)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=30f18ff6-51a1-4141-b49f-551ad70e90d7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=30f18ff6-51a1-4141-b49f-551ad70e90d7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=88512815-da54-4f06-b5c4-3dd52d645f26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=88512815-da54-4f06-b5c4-3dd52d645f26&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4db44b77-75c4-4228-bfef-7ba286c3c07e&pt=Update%20Automatically%20on%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fupdate-rippled-automatically-on-linux&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/installation/update-rippled-automatically-on-linux#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/installation/update-rippled-automatically-on-linux#)
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
- [Resources](https://xrpl.org/docs/infrastructure/installation/update-rippled-automatically-on-linux#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/installation/update-rippled-automatically-on-linux#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.ca0377333af7289fa675b79b6fa28be9.1759201333148.1759201333148.1759201333148.1&__hssc=78174987.1.1759201333148&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/installation/update-rippled-automatically-on-linux.md)
- [ripple-server mailing list](https://groups.google.com/forum/#!forum/ripple-server)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.ca0377333af7289fa675b79b6fa28be9.1759201333148.1759201333148.1759201333148.1&__hssc=78174987.1.1759201333148&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:02:20.346Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
