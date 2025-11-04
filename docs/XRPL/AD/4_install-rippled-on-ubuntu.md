# Install on Ubuntu or Debian Linux
URL: https://xrpl.org/docs/infrastructure/installation/install-rippled-on-ubuntu
Section: AD4

## Overview


## Extracted Content
# Install on Ubuntu or Debian Linux

This page describes the recommended instructions for installing the latest stable version of rippled on Ubuntu Linux, using a binary that has been compiled and published by Ripple as a deb package.

`rippled`

`deb`

Currently, Ubuntu 22.04 and Ubuntu 24.04 on x86_64 processors have received the highest level of support and testing. Packages are also available for Debian Linux 12 Bookworm. You may be able to adapt these instructions to other Linux distributions that also use the apt package manager, but other configurations are not officially supported.

`apt`


## Prerequisites

Before you install rippled, you must meet the System Requirements.

`rippled`


## Installation Steps

1. Update repositories:sudo apt -y update
1. Install utilities:sudo apt -y install apt-transport-https ca-certificates wget gnupg
1. Add Ripple's package-signing GPG key to your list of trusted keys:sudo install -m 0755 -d /etc/apt/keyrings && \
    wget -qO- https://repos.ripple.com/repos/api/gpg/key/public | \
    sudo gpg --dearmor -o /etc/apt/keyrings/ripple.gpg
1. Check the fingerprint of the newly-added key:gpg --show-keys /etc/apt/keyrings/ripple.gpgThe output should include an entry for Ripple such as the following:pub   rsa3072 2019-02-14 [SC] [expires: 2026-02-17]
    C0010EC205B35A3310DC90DE395F97FFCCAFD9A2
uid           TechOps Team at Ripple <techops+rippled@ripple.com>
sub   rsa3072 2019-02-14 [E] [expires: 2026-02-17]In particular, make sure that the fingerprint matches. (In the above example, the fingerprint is on the second line, starting with C001.)
1. Add the appropriate Ripple repository for your operating system version:echo "deb [signed-by=/etc/apt/keyrings/ripple.gpg] https://repos.ripple.com/repos/rippled-deb noble stable" | \
    sudo tee -a /etc/apt/sources.list.d/ripple.listThe above example is appropriate for Ubuntu 24.04 Noble Numbat. For other operating systems, replace the word noble with one of the following:bullseye for Debian 11 Bullseyebookworm for Debian 12 Bookwormjammy for Ubuntu 22.04 Jammy Jellyfishnoble for Ubuntu 24.04 Noble NumbatIf you want access to development or pre-release versions of rippled, use one of the following instead of stable:unstable - Pre-release builds (release branch)nightly - Experimental/development builds (develop branch)WarningUnstable and nightly builds may be broken at any time. Do not use these builds for production servers.
1. bullseye for Debian 11 Bullseye
1. bookworm for Debian 12 Bookworm
1. jammy for Ubuntu 22.04 Jammy Jellyfish
1. noble for Ubuntu 24.04 Noble Numbat
1. unstable - Pre-release builds (release branch)
1. nightly - Experimental/development builds (develop branch)
1. Update the package index to include Ripple's repo and install rippled.sudo apt -y update && sudo apt -y install rippled
1. Check the status of the rippled service:systemctl status rippled.serviceThe rippled service should start automatically. If not, you can start it manually:sudo systemctl start rippled.service
1. Optional: allow rippled to bind to privileged ports.This allows you to serve incoming API requests on port 80 or 443. (If you want to do so, you must also update the config file's port settings.)sudo setcap 'cap_net_bind_service=+ep' /opt/ripple/bin/rippled
1. Optional: configure core dumpsBy default Ubuntu is not configured to produce core files useful for debugging crashes. First run:ulimit -c unlimitedNow run sudo systemctl edit rippled. The default editor should open and add[Service]
LimitCORE=infinityThis creates the file /etc/systemd/system/rippled.service.d/override.conf and configures the OS to save core dumps, without changing the service file provided by the rippled package. If your server crashes, you can find the core dump in /var/lib/apport/coredump/. To load the core dump for inspection, use a command such as the following:gdb /opt/ripple/bin/rippled /var/lib/apport/coredump/coreNoteTo debug a core file this way, you must have the rippled-dbgsym package installed, and you need permission to read files in the core dump directory.

Update repositories:

```
sudo apt -y update
```

Install utilities:

```
sudo apt -y install apt-transport-https ca-certificates wget gnupg
```

Add Ripple's package-signing GPG key to your list of trusted keys:

```
sudo install -m 0755 -d /etc/apt/keyrings && \
    wget -qO- https://repos.ripple.com/repos/api/gpg/key/public | \
    sudo gpg --dearmor -o /etc/apt/keyrings/ripple.gpg
```

Check the fingerprint of the newly-added key:

```
gpg --show-keys /etc/apt/keyrings/ripple.gpg
```

The output should include an entry for Ripple such as the following:

```
pub   rsa3072 2019-02-14 [SC] [expires: 2026-02-17]
    C0010EC205B35A3310DC90DE395F97FFCCAFD9A2
uid           TechOps Team at Ripple <techops+rippled@ripple.com>
sub   rsa3072 2019-02-14 [E] [expires: 2026-02-17]
```

In particular, make sure that the fingerprint matches. (In the above example, the fingerprint is on the second line, starting with C001.)

`C001`

Add the appropriate Ripple repository for your operating system version:

```
echo "deb [signed-by=/etc/apt/keyrings/ripple.gpg] https://repos.ripple.com/repos/rippled-deb noble stable" | \
    sudo tee -a /etc/apt/sources.list.d/ripple.list
```

The above example is appropriate for Ubuntu 24.04 Noble Numbat. For other operating systems, replace the word noble with one of the following:

`noble`

- bullseye for Debian 11 Bullseye
- bookworm for Debian 12 Bookworm
- jammy for Ubuntu 22.04 Jammy Jellyfish
- noble for Ubuntu 24.04 Noble Numbat

`bullseye`

`bookworm`

`jammy`

`noble`

If you want access to development or pre-release versions of rippled, use one of the following instead of stable:

`rippled`

`stable`

- unstable - Pre-release builds (release branch)
- nightly - Experimental/development builds (develop branch)

`unstable`

`release`

`nightly`

`develop`

WarningUnstable and nightly builds may be broken at any time. Do not use these builds for production servers.

Update the package index to include Ripple's repo and install rippled.

`rippled`

```
sudo apt -y update && sudo apt -y install rippled
```

Check the status of the rippled service:

`rippled`

```
systemctl status rippled.service
```

The rippled service should start automatically. If not, you can start it manually:

`rippled`

```
sudo systemctl start rippled.service
```

Optional: allow rippled to bind to privileged ports.

`rippled`

This allows you to serve incoming API requests on port 80 or 443. (If you want to do so, you must also update the config file's port settings.)

```
sudo setcap 'cap_net_bind_service=+ep' /opt/ripple/bin/rippled
```

Optional: configure core dumps

By default Ubuntu is not configured to produce core files useful for debugging crashes. First run:

```
ulimit -c unlimited
```

Now run sudo systemctl edit rippled. The default editor should open and add

`sudo systemctl edit rippled`

```
[Service]
LimitCORE=infinity
```

This creates the file /etc/systemd/system/rippled.service.d/override.conf and configures the OS to save core dumps, without changing the service file provided by the rippled package. If your server crashes, you can find the core dump in /var/lib/apport/coredump/. To load the core dump for inspection, use a command such as the following:

`/etc/systemd/system/rippled.service.d/override.conf`

`rippled`

`/var/lib/apport/coredump/`

```
gdb /opt/ripple/bin/rippled /var/lib/apport/coredump/core
```

NoteTo debug a core file this way, you must have the rippled-dbgsym package installed, and you need permission to read files in the core dump directory.

`rippled-dbgsym`


## Next Steps

It can take several minutes to sync with the rest of the XRP Ledger network, during which time the server outputs various warnings. For information about log messages, see Understanding Log Messages.

You can use the rippled commandline interface to see if your server is synced with the network:

`rippled`

```
rippled server_info
```

If the server_state in the response is full or proposing, then your server is fully synced to the network. Otherwise, you may need to wait longer. Fresh servers usually sync within 15 minutes; servers that already have ledger history stored can take longer.

`server_state`

`full`

`proposing`

After your server has synchronized with the rest of the network, you have a fully functional XRP Ledger peer-to-peer server that you can use to submit transactions or get API access to the XRP Ledger. See Client Libraries or HTTP / WebSocket APIs for different ways to communicate with the server.

If you use the XRP Ledger for your business or you want to contribute to the stability of the network, you should run one server as a validator. For information about validating servers and why you might want to run one, see Run rippled as a Validator.

Having trouble getting your server started? See rippled Server Won't Start.


### Additional Configuration

rippled should connect to the XRP Ledger with the default configuration. However, you can change your settings by editing the rippled.cfg file. For recommendations about configuration settings, see Capacity Planning.

`rippled`

`rippled.cfg`

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

See the rippled GitHub repository for a description of all configuration options.

`rippled`

You must restart rippled for any configuration changes to take effect.

`rippled`

If you change the [debug_logfile] or [database_path] sections, you may need to grant ownership of the new configured path to the user you run rippled as.

`[debug_logfile]`

`[database_path]`

`rippled`


### Updates

You must update rippled regularly to remain synced with the rest of the XRP Ledger network. You can subscribe to the rippled Google Group to receive notifications of new rippled releases.

`rippled`

`rippled`

The rippled package includes a script you can use to enable automatic updates on Linux. On other platforms, you must update manually.

`rippled`


## See Also

- Concepts:The rippled ServerConsensus
- The rippled Server
- Consensus
- Tutorials:Configure rippledTroubleshoot rippledGet Started with the rippled API
- Configure rippled
- Troubleshoot rippled
- Get Started with the rippled API
- References:rippled API Referencerippled Commandline Usageserver_info method
- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- The rippled Server
- Consensus

`rippled`

- Configure rippled
- Troubleshoot rippled
- Get Started with the rippled API

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=53a1b542-f4f3-4e22-bfaa-32d983eaffaf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=53a1b542-f4f3-4e22-bfaa-32d983eaffaf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=083bb46a-e057-4c21-83fa-1c90108377ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=083bb46a-e057-4c21-83fa-1c90108377ae&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=d0a80640-7bed-444b-95a5-874c333c61f5&bo=1&sid=c1005ee09da911f09f261d41cc5e34f1&vid=c10101a09da911f0969e9357627604a4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Install%20on%20Ubuntu%20or%20Debian%20Linux&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&r=&lt=3877&evt=pageLoad&sv=2&cdb=AQAS&rn=326819)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9be940e7-f1ed-4503-b6b7-bd2497954533&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9be940e7-f1ed-4503-b6b7-bd2497954533&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7a55711b-f52b-43f4-9a36-d58e24382564&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=7a55711b-f52b-43f4-9a36-d58e24382564&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5b0c3594-f885-40f4-a22e-91d38fd2c638&pt=Install%20on%20Ubuntu%20or%20Debian%20Linux&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Finstall-rippled-on-ubuntu&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/installation/install-rippled-on-ubuntu#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/installation/install-rippled-on-ubuntu#)
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
- [Resources](https://xrpl.org/docs/infrastructure/installation/install-rippled-on-ubuntu#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/installation/install-rippled-on-ubuntu#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/installation/install-rippled-on-ubuntu.md)
- [release branch](https://github.com/XRPLF/rippled/tree/release)
- [develop branch](https://github.com/XRPLF/rippled/tree/develop)
- [the rippled GitHub repository](https://github.com/XRPLF/rippled/blob/master/cfg/rippled-example.cfg)
- [rippled Google Group](https://groups.google.com/forum/#!forum/ripple-server)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:01:38.708Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
