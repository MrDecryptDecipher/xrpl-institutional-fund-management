# Connect Your rippled to a Parallel Network
URL: https://xrpl.org/docs/infrastructure/configuration/connect-your-rippled-to-the-xrp-test-net
Section: AD29

## Overview


## Extracted Content
# Connect Your rippled to a Parallel Network

Various alternative test and development networks exist for developers to test their apps or experiment with features without risking real money. The funds used on these networks are not real funds and are intended for testing only. You can connect your rippled server to any of these test networks.

`rippled`

CautionOn test networks with new and experimental features, you may need to run a pre-production release of the server to sync with the network. See the Parallel Networks Page for information on what code version each network needs.


## Steps

To connect your rippled server to the XRP Testnet or Devnet, complete these steps. You can also use these steps to switch back to the production Mainnet after being on the Testnet or Devnet.

`rippled`


## 1. Configure your server to connect to the right hub.

Edit your rippled.cfg file.

`rippled.cfg`

The recommended installation uses the config file /etc/opt/ripple/rippled.cfg by default. Other places you can put a config file include $HOME/.config/ripple/rippled.cfg (where $HOME is the home directory of the user running rippled), $HOME/.local/ripple/rippled.cfg, or the current working directory from where you start rippled.

`/etc/opt/ripple/rippled.cfg`

`$HOME/.config/ripple/rippled.cfg`

`$HOME`

`rippled`

`$HOME/.local/ripple/rippled.cfg`

`rippled`

1. Set an [ips] stanza with the hub for the network you want to connect to:TestnetDevnetMainnetSidechain-Devnet[ips]
s.altnet.rippletest.net 51235
1. Testnet
1. Devnet
1. Mainnet
1. Sidechain-Devnet
1. Comment out the previous [ips] stanza, if there is one:# [ips]
# r.ripple.com 51235
# sahyadri.isrdc.in 51235
1. Add a [network_id] stanza with the appropriate value:TestnetDevnetMainnetSidechain-Devnet[network_id]
testnetFor custom networks, everyone who connects to the network should use a value unique to that network. When creating a new network, choose a network ID at random from the integers 11 to 4,294,967,295.NoteThis setting helps your server find peers who are on the same network, but it is not a hard control on what network your server follows. The UNL / trusted validator settings (in the next step) are what actually define what network the server follows.
1. Testnet
1. Devnet
1. Mainnet
1. Sidechain-Devnet

Set an [ips] stanza with the hub for the network you want to connect to:

`[ips]`

- Testnet
- Devnet
- Mainnet
- Sidechain-Devnet

```
[ips]
s.altnet.rippletest.net 51235
```

Comment out the previous [ips] stanza, if there is one:

`[ips]`

```
# [ips]
# r.ripple.com 51235
# sahyadri.isrdc.in 51235
```

Add a [network_id] stanza with the appropriate value:

`[network_id]`

- Testnet
- Devnet
- Mainnet
- Sidechain-Devnet

```
[network_id]
testnet
```

For custom networks, everyone who connects to the network should use a value unique to that network. When creating a new network, choose a network ID at random from the integers 11 to 4,294,967,295.

NoteThis setting helps your server find peers who are on the same network, but it is not a hard control on what network your server follows. The UNL / trusted validator settings (in the next step) are what actually define what network the server follows.


## 2. Set your trusted validator list.

Edit your validators.txt file. This file is located in the same folder as your rippled.cfg file and defines which validators your server trusts not to collude.

`validators.txt`

`rippled.cfg`

1. Uncomment or add the [validator_list_sites] and [validator_list_keys] stanzas for the network you want to connect to:TestnetDevnetMainnetSidechain-Devnet[validator_list_sites]
https://vl.altnet.rippletest.net

[validator_list_keys]
ED264807102805220DA0F312E71FC2C69E1552C9C5790F6C25E3729DEB573D5860TipPreview packages might come with the necessary stanzas pre-configured, but check them just in case.
1. Testnet
1. Devnet
1. Mainnet
1. Sidechain-Devnet
1. Comment out any previous [validator_list_sites], [validator_list_keys], or [validators] stanzas.For example:# [validator_list_sites]
# https://vl.ripple.com
#
# [validator_list_keys]
# ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734

# Old hard-coded List of Devnet Validators
# [validators]
# n9Mo4QVGnMrRN9jhAxdUFxwvyM4aeE1RvCuEGvMYt31hPspb1E2c
# n9MEwP4LSSikUnhZJNQVQxoMCgoRrGm6GGbG46AumH2KrRrdmr6B
# n9M1pogKUmueZ2r3E3JnZyM3g6AxkxWPr8Vr3zWtuRLqB7bHETFD
# n9MX7LbfHvPkFYgGrJmCyLh8Reu38wsnnxA4TKhxGTZBuxRz3w1U
# n94aw2fof4xxd8g3swN2qJCmooHdGv1ajY8Ae42T77nAQhZeYGdd
# n9LiE1gpUGws1kFGKCM9rVFNYPVS4QziwkQn281EFXX7TViCp2RC
# n9Jq9w1R8UrvV1u2SQqGhSXLroeWNmPNc3AVszRXhpUr1fmbLyhS

Uncomment or add the [validator_list_sites] and [validator_list_keys] stanzas for the network you want to connect to:

`[validator_list_sites]`

`[validator_list_keys]`

- Testnet
- Devnet
- Mainnet
- Sidechain-Devnet

```
[validator_list_sites]
https://vl.altnet.rippletest.net

[validator_list_keys]
ED264807102805220DA0F312E71FC2C69E1552C9C5790F6C25E3729DEB573D5860
```

TipPreview packages might come with the necessary stanzas pre-configured, but check them just in case.

Comment out any previous [validator_list_sites], [validator_list_keys], or [validators] stanzas.

`[validator_list_sites]`

`[validator_list_keys]`

`[validators]`

For example:

```
# [validator_list_sites]
# https://vl.ripple.com
#
# [validator_list_keys]
# ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734

# Old hard-coded List of Devnet Validators
# [validators]
# n9Mo4QVGnMrRN9jhAxdUFxwvyM4aeE1RvCuEGvMYt31hPspb1E2c
# n9MEwP4LSSikUnhZJNQVQxoMCgoRrGm6GGbG46AumH2KrRrdmr6B
# n9M1pogKUmueZ2r3E3JnZyM3g6AxkxWPr8Vr3zWtuRLqB7bHETFD
# n9MX7LbfHvPkFYgGrJmCyLh8Reu38wsnnxA4TKhxGTZBuxRz3w1U
# n94aw2fof4xxd8g3swN2qJCmooHdGv1ajY8Ae42T77nAQhZeYGdd
# n9LiE1gpUGws1kFGKCM9rVFNYPVS4QziwkQn281EFXX7TViCp2RC
# n9Jq9w1R8UrvV1u2SQqGhSXLroeWNmPNc3AVszRXhpUr1fmbLyhS
```


## 3. Enable (or Disable) Features

For some test networks using experimental features, you must also forcefully enable the appropriate feature in the config file. For other networks, you should not use the [features] stanza. Add or modify the [features] stanza of your config file as follows:

`[features]`

`[features]`

- Testnet
- Devnet
- Mainnet
- Sidechain-Devnet

```
# [features]
# Delete or comment out. Don't force-enable features on Testnet.
```

WarningDo not use the [features] stanza when connecting to Mainnet or Testnet. Forcefully enabling different features than the rest of the network could cause your server to diverge from the network.

`[features]`


## 4. Restart the server.

```
$ sudo systemctl restart rippled
```


## 5. Verify that your server syncs.

It takes about 5 to 15 minutes to sync to the network after a restart. After your server is synced, the server_info method shows a validated_ledger object based on the network you are connected to.

`validated_ledger`

To confirm that your rippled is connected to the right network, compare the results from your server to a public server on the Testnet or Devnet. The seq field of the validated_ledger object should be the same on both servers (possibly off by one or two, if it changed as you were checking).

`rippled`

`seq`

`validated_ledger`

The following example shows how to check your server's latest validated ledger from the commandline:

```
rippled server_info | grep seq
```

You can use server_info in the WebSocket Tool to look up the latest ledger index (seq) on the intended network.

`seq`


## See Also

- Tools:XRP FaucetsWebSocket API Tool - Select 'Testnet Public Server' or 'Devnet Public Server' in the connection options.
- XRP Faucets
- WebSocket API Tool - Select 'Testnet Public Server' or 'Devnet Public Server' in the connection options.
- Concepts:Parallel NetworksConsensus
- Parallel Networks
- Consensus
- Tutorials:Run rippled as a ValidatorTest rippled Offline in Stand-Alone ModeTroubleshooting rippled
- Run rippled as a Validator
- Test rippled Offline in Stand-Alone Mode
- Troubleshooting rippled
- References:server_info method
- server_info method

- XRP Faucets
- WebSocket API Tool - Select 'Testnet Public Server' or 'Devnet Public Server' in the connection options.

- Parallel Networks
- Consensus

- Run rippled as a Validator
- Test rippled Offline in Stand-Alone Mode
- Troubleshooting rippled

`rippled`

`rippled`

- server_info method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2031cf96-3980-4dfd-9e2c-0e1d37a62b71&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2031cf96-3980-4dfd-9e2c-0e1d37a62b71&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f4a4ea36-711a-48f8-bb8b-9a1199c3851b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f4a4ea36-711a-48f8-bb8b-9a1199c3851b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=95e13bb7-b4a7-4cf1-a064-bf14db710b60&bo=1&sid=ff2663109daa11f0ac00f18d435be9cf&vid=ff274c009daa11f0af84dd88dc74bfe4&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&r=&lt=3220&evt=pageLoad&sv=2&cdb=AQAS&rn=512056)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=293cea52-331b-4660-9999-2bb1dcaf809c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=293cea52-331b-4660-9999-2bb1dcaf809c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a727daae-414f-42c9-a804-ade667c849fd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a727daae-414f-42c9-a804-ade667c849fd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=d1ba0f97-5558-49e1-a53e-8ad03ce0b1e3&pt=Connect%20Your%20rippled%20to%20a%20Parallel%20Network&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fconnect-your-rippled-to-the-xrp-test-net&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/connect-your-rippled-to-the-xrp-test-net#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/connect-your-rippled-to-the-xrp-test-net#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/connect-your-rippled-to-the-xrp-test-net#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/connect-your-rippled-to-the-xrp-test-net#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/connect-your-rippled-to-the-xrp-test-net.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:10:34.678Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
