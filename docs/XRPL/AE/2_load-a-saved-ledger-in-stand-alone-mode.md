# Load a Saved Ledger in Stand-Alone Mode
URL: https://xrpl.org/docs/infrastructure/testing-and-auditing/load-a-saved-ledger-in-stand-alone-mode
Section: AE2

## Overview


## Extracted Content
# Load a Saved Ledger in Stand-Alone Mode

You can start a rippled server in Stand-Alone Mode using a historical ledger version that was previously saved to disk. For example, if your rippled server was previously synced with any XRP Ledger peer-to-peer network including the production Mainnet, the Testnet, or the Devnet, you can load any ledger version your server had available.

`rippled`

`rippled`

Loading a historical ledger version is useful for "replaying" a ledger to verify that transactions were processed according to the rules of the network, or to compare the results of processing transaction sets with different amendments enabled. In the unlikely event that an attack against the XRP Ledger's consensus mechanism caused unwanted effects to the shared ledger state, a consensus of validators could "roll back" to a known-good network state starting with this process.

CautionAs rippled is updated to newer versions, amendments are retired and become core functions of the ledger, which can affect how transactions are processed. To produce historically accurate results, you need to replay ledgers using the version of rippled the transaction was processed in.

`rippled`

`rippled`


## 1. Start rippled normally.

`rippled`

To load an existing ledger, you must first retrieve that ledger from the network. Start rippled in online mode as normal:

`rippled`

```
rippled --conf=/path/to/rippled.cfg
```


## 2. Wait until rippled is synced.

`rippled`

Use the server_info method to check the state of your server relative to the network. Your server is synced when the server_state value shows any of the following values:

`server_state`

- full
- proposing
- validating

`full`

`proposing`

`validating`

For more information, see Possible Server States.


## 3. (Optional) Retrieve specific ledger versions.

If you only want the most recent ledger, you can skip this step.

If you want to load a specific historical ledger version, use the ledger_request method to make rippled fetch it. If rippled does not already have the ledger version, you may have to run the ledger_request command multiple times until it has finished retrieving the ledger.

`rippled`

`rippled`

`ledger_request`

If you want to replay a specific historical ledger version, you must fetch both the ledger version to replay and the ledger version before it. (The previous ledger version sets up the initial state upon which you apply the changes described by the ledger version you replay.)


## 4. Shut down rippled.

`rippled`

Use the stop method:

```
rippled stop --conf=/path/to/rippled.cfg
```


## 5. Start rippled in stand-alone mode.

`rippled`

To load the most recent ledger version, start the server with the -a and --load options:

`-a`

`--load`

```
rippled -a --load --conf=/path/to/rippled.cfg
```

To load a specific historical ledger, start the server with the --load parameter along with the --ledger parameter, providing the ledger index or identifying hash of the ledger version to load:

`--load`

`--ledger`

```
rippled -a --load --ledger 19860944 --conf=/path/to/rippled.cfg
```

This makes the saved ledger version the "current" (open) ledger for the server when it starts.

For more information on the options you can use when starting rippled in stand-alone mode, see Commandline Usage: Stand-Alone Mode Options.

`rippled`


## 6. Manually advance the ledger.

To process the saved ledger, manually advance it with the ledger_accept method:

`ledger_accept`

```
rippled ledger_accept --conf=/path/to/rippled.cfg
```

This puts the transactions in canonical order and processes them to make a closed ledger.


## See Also

- References:ledger_accept methodserver_info methodrippled Commandline Usage
- ledger_accept method
- server_info method
- rippled Commandline Usage
- Use Cases:Contribute Code to the XRP Ledger
- Contribute Code to the XRP Ledger

- ledger_accept method
- server_info method
- rippled Commandline Usage

`rippled`

- Contribute Code to the XRP Ledger

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cc57762d-fc2a-4c64-afd7-035b4b0c11f6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cc57762d-fc2a-4c64-afd7-035b4b0c11f6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea8a277d-2255-4e33-a206-efe2a8eaeaad&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ea8a277d-2255-4e33-a206-efe2a8eaeaad&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=617d3f1c-b20a-4811-8a89-f2108cec7438&bo=1&sid=30ec4bb09dab11f08fadf97fb2715337&vid=30ece1309dab11f0999eb70540116b5e&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&r=&lt=3708&evt=pageLoad&sv=2&cdb=AQAS&rn=936084)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=84417141-b03e-45f5-8f7c-c7086f41f83d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=84417141-b03e-45f5-8f7c-c7086f41f83d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a27f597e-c21b-41a6-baa1-631fbd1c757c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a27f597e-c21b-41a6-baa1-631fbd1c757c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ebe0e4c6-d518-4cdd-bc5a-9265fa6bf7e6&pt=Load%20a%20Saved%20Ledger%20in%20Stand-Alone%20Mode&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Fload-a-saved-ledger-in-stand-alone-mode&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/testing-and-auditing/load-a-saved-ledger-in-stand-alone-mode#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/testing-and-auditing/load-a-saved-ledger-in-stand-alone-mode#)
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
- [Resources](https://xrpl.org/docs/infrastructure/testing-and-auditing/load-a-saved-ledger-in-stand-alone-mode#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/testing-and-auditing/load-a-saved-ledger-in-stand-alone-mode#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.96e229a5a62b3a1342f1057175717556.1759201905007.1759201905007.1759201905007.1&__hssc=78174987.1.1759201905007&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/testing-and-auditing/load-a-saved-ledger-in-stand-alone-mode.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.96e229a5a62b3a1342f1057175717556.1759201905007.1759201905007.1759201905007.1&__hssc=78174987.1.1759201905007&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:11:54.746Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
