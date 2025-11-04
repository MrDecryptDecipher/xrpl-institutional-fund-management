# System Requirements
URL: https://xrpl.org/docs/infrastructure/installation/system-requirements
Section: AD3

## Overview


## Extracted Content
# System Requirements

The following system requirements apply to both the core XRP Ledger server, rippled, and the Clio server for API access.

`rippled`


## Recommended Specifications

For reliable performance in production environments, it is recommended to run a server on bare metal with the following characteristics or better:

- Operating System: Ubuntu (LTS), Red Hat Enterprise Linux (latest release), or a compatible Linux distribution.
- CPU: 3+ GHz 64-bit x86_64 processor with 8+ cores.
- Disk: SSD / NVMe (10,000 IOPS sustained - not burst or peak - or better). Minimum 50 GB for the database partition. Do not use Amazon Elastic Block Store (AWS EBS) because its latency is too high to sync reliably.
- RAM: 64 GB.
- Network: Enterprise data center network with a gigabit network interface on the host.

For a validator in AWS, consider z1d.2xlarge with an extra 1 TB disk for logging and core dump storage.

`z1d.2xlarge`


## Minimum Specifications

CautionThese specifications are not enough to reliably stay synced with Mainnet. For production use, follow the recommended specifications above.

For testing purposes, you can run an XRP Ledger server on commodity hardware with the following minimum requirements:

- Operating System: macOS, Windows (64-bit), or most Linux distributions (Red Hat, Ubuntu, and Debian supported).
- CPU: 64-bit x86_64, 4+ cores.For development purposes, it is also possible to compile rippled for some Apple Silicon or ARM processors. See the Build instructions for guidance. However, architectures other than x86_64 are not officially supported and are not recommended for production.
- For development purposes, it is also possible to compile rippled for some Apple Silicon or ARM processors. See the Build instructions for guidance. However, architectures other than x86_64 are not officially supported and are not recommended for production.
- Disk: SSD / NVMe (10,000 IOPS sustained - not burst or peak - or better). Minimum 50 GB for the database partition. Do not use Amazon Elastic Block Store (AWS EBS) because its latency is too high to sync reliably.
- RAM: 16 GB+.

- For development purposes, it is also possible to compile rippled for some Apple Silicon or ARM processors. See the Build instructions for guidance. However, architectures other than x86_64 are not officially supported and are not recommended for production.

`rippled`

Amazon EC2's i3.2xlarge VM size may be appropriate depending on your workload. A fast network connection is preferable. Any increase in a server's client-handling load increases resources needs.

`i3.2xlarge`


## System Time

A rippled server relies on maintaining the correct time. It is recommended that the system synchronize time using the Network Time Protocol (NTP) with daemons such as ntpd or chrony.

`rippled`

`ntpd`

`chrony`


## See Also

- Concepts:The rippled ServerConsensus
- The rippled Server
- Consensus
- Tutorials:Capacity Planning - More information on the recommended specifications and planning for production needsInstall rippledTroubleshoot rippled
- Capacity Planning - More information on the recommended specifications and planning for production needs
- Install rippled
- Troubleshoot rippled
- References:rippled API Referencerippled Commandline Usageserver_info method
- rippled API Referencerippled Commandline Usageserver_info method
- rippled Commandline Usage
- server_info method

- The rippled Server
- Consensus

`rippled`

- Capacity Planning - More information on the recommended specifications and planning for production needs
- Install rippled
- Troubleshoot rippled

`rippled`

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

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f369296b-a35d-485c-b7d0-ffc3a72ad881&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f369296b-a35d-485c-b7d0-ffc3a72ad881&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fa25acbd-273b-44e0-8f6c-3bdfc5177e7e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fa25acbd-273b-44e0-8f6c-3bdfc5177e7e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=66eef671-d70c-4223-8e93-f7c8a636f3c0&bo=1&sid=b57e53909da911f0b29de1968645c5c2&vid=b57ec2409da911f09a8af3803a5c90cd&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=System%20Requirements&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&r=&lt=2125&evt=pageLoad&sv=2&cdb=AQAS&rn=268254)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ca9064ee-0805-449c-9627-b2ad8e07e7ef&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ca9064ee-0805-449c-9627-b2ad8e07e7ef&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f623a357-2e11-41d5-9a81-40b70dc1a029&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f623a357-2e11-41d5-9a81-40b70dc1a029&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=58e9e0e7-c8de-44c0-9b0d-1228b0f94840&pt=System%20Requirements&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Finstallation%2Fsystem-requirements&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/installation/system-requirements#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/installation/system-requirements#)
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
- [Resources](https://xrpl.org/docs/infrastructure/installation/system-requirements#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/installation/system-requirements#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/installation/system-requirements.md)
- [Build instructions](https://github.com/XRPLF/rippled/blob/develop/BUILD.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:01:17.656Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
