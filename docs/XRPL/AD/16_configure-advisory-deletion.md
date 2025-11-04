# Configure Advisory Deletion
URL: https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-advisory-deletion
Section: AD16

## Overview


## Extracted Content
# Configure Advisory Deletion

The default config file sets rippled to automatically delete outdated history of XRP Ledger state and transactions as new ledger versions become available. If your server uses most of its hardware resources during peak hours, you can configure the server to delete ledgers only when prompted by a command scheduled to run during off-peak hours, so that online deletion is less likely to impact server performance.

`rippled`


## Prerequisites

This tutorial assumes your server meets the following prerequisites:

- You are on a supported operating system: Ubuntu Linux, Red Hat Enterprise Linux (RHEL), or CentOS.
- The rippled server is already installed and online deletion is enabled.The default config file enables online deletion after 2000 ledger versions.
- A cron daemon is installed and running.Ubuntu Linux runs a cron daemon by default.On RHEL or CentOS, you can install the cronie package:$ sudo yum install cronie
- Your server has enough disk space to store your chosen amount of history in its ledger store.See Capacity Planning for details of how much storage is required for different configurations. With advisory deletion enabled, the maximum history a server may accumulate before deletion is equal to the number of ledger versions configured in the online_delete setting plus the amount of time between online deletion prompts.
- You know which hours are least busy for your server.

You are on a supported operating system: Ubuntu Linux, Red Hat Enterprise Linux (RHEL), or CentOS.

The rippled server is already installed and online deletion is enabled.

`rippled`

The default config file enables online deletion after 2000 ledger versions.

A cron daemon is installed and running.

`cron`

Ubuntu Linux runs a cron daemon by default.

`cron`

On RHEL or CentOS, you can install the cronie package:

`cronie`

```
$ sudo yum install cronie
```

Your server has enough disk space to store your chosen amount of history in its ledger store.

See Capacity Planning for details of how much storage is required for different configurations. With advisory deletion enabled, the maximum history a server may accumulate before deletion is equal to the number of ledger versions configured in the online_delete setting plus the amount of time between online deletion prompts.

`online_delete`

You know which hours are least busy for your server.


## Configuration Steps

To configure advisory deletion with a daily schedule, perform the following steps:

1. Enable advisory_delete in the [node_db] stanza of your rippled's config file.[node_db]
# Other settings unchanged ...
  online_delete=300000
  advisory_delete=1Set advisory_delete to 1 to run online deletion only when prompted. (Set it to 0 to run online deletion automatically as new ledger versions become available.)Set online_delete to the minimum number of ledger versions to keep after running online deletion. The server accumulates more history than this until online deletion runs.The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.
1. Set advisory_delete to 1 to run online deletion only when prompted. (Set it to 0 to run online deletion automatically as new ledger versions become available.)
1. Set online_delete to the minimum number of ledger versions to keep after running online deletion. The server accumulates more history than this until online deletion runs.
1. Test running the can_delete method to prompt the server to run online deletion.You can use the rippled commandline interface to run this command. For example:$ rippled --conf=/etc/opt/ripple/rippled.cfg can_delete nowThe response indicates the maximum ledger index that the server may delete from its ledger store. For example, the following message indicates that ledger versions up to and including ledger index 43633667 can be deleted:{
  "result": {
    "can_delete": 43633667,
    "status": "success"
  }
}The server only deletes those ledger versions if the number of newer validated ledger versions it has is equal to or greater than the online_delete setting.
1. Configure your cron daemon to run the can_delete method you tested in the previous step at a scheduled time.Edit your cron configuration:$ crontab -eThe following example sets the server to run deletion at 1:05 AM server time daily:5 1 * * * rippled --conf /etc/opt/ripple/rippled.cfg can_delete nowBe sure that you schedule the command to run based on your server's configured time zone.TipYou do not need to schedule a cron job to run online deletion if you have advisory_delete disabled. In that case, rippled runs online deletion automatically when the difference between the server's oldest and current validated ledger versions is at least the value of online_delete.
1. Start (or restart) the rippled service.$ sudo systemctl restart rippled
1. Periodically check your server's complete_ledgers range using the server_info method to confirm that ledgers are being deleted as scheduled.The lowest ledger index in complete_ledgers should increase after online deletion.Deletion may take several minutes to complete when it runs, depending on how busy your server is and how much history you delete at a time.

Enable advisory_delete in the [node_db] stanza of your rippled's config file.

`advisory_delete`

`[node_db]`

`rippled`

```
[node_db]
# Other settings unchanged ...
  online_delete=300000
  advisory_delete=1
```

- Set advisory_delete to 1 to run online deletion only when prompted. (Set it to 0 to run online deletion automatically as new ledger versions become available.)
- Set online_delete to the minimum number of ledger versions to keep after running online deletion. The server accumulates more history than this until online deletion runs.

`advisory_delete`

`1`

`0`

`online_delete`

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

Test running the can_delete method to prompt the server to run online deletion.

You can use the rippled commandline interface to run this command. For example:

`rippled`

```
$ rippled --conf=/etc/opt/ripple/rippled.cfg can_delete now
```

The response indicates the maximum ledger index that the server may delete from its ledger store. For example, the following message indicates that ledger versions up to and including ledger index 43633667 can be deleted:

```
{
  "result": {
    "can_delete": 43633667,
    "status": "success"
  }
}
```

The server only deletes those ledger versions if the number of newer validated ledger versions it has is equal to or greater than the online_delete setting.

`online_delete`

Configure your cron daemon to run the can_delete method you tested in the previous step at a scheduled time.

`cron`

`can_delete`

Edit your cron configuration:

`cron`

```
$ crontab -e
```

The following example sets the server to run deletion at 1:05 AM server time daily:

```
5 1 * * * rippled --conf /etc/opt/ripple/rippled.cfg can_delete now
```

Be sure that you schedule the command to run based on your server's configured time zone.

TipYou do not need to schedule a cron job to run online deletion if you have advisory_delete disabled. In that case, rippled runs online deletion automatically when the difference between the server's oldest and current validated ledger versions is at least the value of online_delete.

`cron`

`advisory_delete`

`rippled`

`online_delete`

Start (or restart) the rippled service.

`rippled`

```
$ sudo systemctl restart rippled
```

Periodically check your server's complete_ledgers range using the server_info method to confirm that ledgers are being deleted as scheduled.

`complete_ledgers`

The lowest ledger index in complete_ledgers should increase after online deletion.

`complete_ledgers`

Deletion may take several minutes to complete when it runs, depending on how busy your server is and how much history you delete at a time.


## Troubleshooting

If online deletion does not seem to be running after configuring it, try the following:

- Check that the user who configured the cron job has permissions to run the rippled server as a commandline client.
- Check the syntax of your cron job and the time when it is supposed to run.
- Check that the rippled executable is available at the path specified in your cron configuration. If necessary, specify the absolute path to the executable, such as /opt/ripple/bin/rippled.
- Check your rippled logs for messages that begin with SHAMapStore::WRN. This can indicate that online deletion is being interrupted because your server fell out of sync with the network.

`cron`

`rippled`

`cron`

`rippled`

`cron`

`/opt/ripple/bin/rippled`

`rippled`

`SHAMapStore::WRN`


## See Also

- Concepts:Ledger HistoryOnline Deletion
- Ledger HistoryOnline Deletion
- Online Deletion
- Tutorials:Configure Online DeletionDiagnosing Problems with rippledUnderstanding Log Messages
- Configure Online Deletion
- Diagnosing Problems with rippled
- Understanding Log Messages
- References:server_info methodcan_delete methodlogrotate methodLedger Data Formats
- server_info method
- can_delete method
- logrotate method
- Ledger Data Formats

- Ledger HistoryOnline Deletion
- Online Deletion

- Online Deletion

- Configure Online Deletion
- Diagnosing Problems with rippled
- Understanding Log Messages

- server_info method
- can_delete method
- logrotate method
- Ledger Data Formats

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6aa88c5e-b1c8-4580-b0b7-d74fe29f187b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6aa88c5e-b1c8-4580-b0b7-d74fe29f187b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8f52f084-8c18-4eec-b319-ce8505658501&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8f52f084-8c18-4eec-b319-ce8505658501&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1b1c7804-55e3-4e66-8e9b-49d8e2c4b602&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1b1c7804-55e3-4e66-8e9b-49d8e2c4b602&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b8052342-7d5b-468a-9e22-28f0ccc984a6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b8052342-7d5b-468a-9e22-28f0ccc984a6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b5bd1cb0-6287-4e5b-a3da-b6f26d85ff0b&pt=Configure%20Advisory%20Deletion&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c2517c67-40cc-4340-bfef-0ac31c546e11&bo=1&sid=650b1d909daa11f0ab35c3423dca853c&vid=650ba1909daa11f08b397b692ef1314d&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Configure%20Advisory%20Deletion&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fdata-retention%2Fconfigure-advisory-deletion&r=&lt=3410&evt=pageLoad&sv=2&cdb=AQAS&rn=696707)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-advisory-deletion#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-advisory-deletion#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-advisory-deletion#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/data-retention/configure-advisory-deletion#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.56011cb129a609ea47b511724a07a204.1759201561394.1759201561394.1759201561394.1&__hssc=78174987.1.1759201561395&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/data-retention/configure-advisory-deletion.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.56011cb129a609ea47b511724a07a204.1759201561394.1759201561394.1759201561394.1&__hssc=78174987.1.1759201561395&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:06:12.523Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
