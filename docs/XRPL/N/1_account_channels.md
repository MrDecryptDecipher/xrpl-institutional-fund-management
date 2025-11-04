# account_channels
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_channels
Section: N1

## Overview


## Extracted Content
# account_channels

[Source]

(Added by the PayChan amendment.)

The account_channels method returns information about an account's Payment Channels. This includes only channels where the specified account is the channel's source, not the destination. (A channel's "source" and "owner" are the same.) All information retrieved is relative to a particular version of the ledger.

`account_channels`


## Request Format

An example of the request format:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 1,
  "command": "account_channels",
  "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "destination_account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
  "ledger_index": "validated"
}
```

The request includes the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | Yes | Look up channels where this account is the channel's owner/source. |
| amount | Object or String | No | The total amount allocated to this channel. |
| balance | Object or String | No | The total amount paid out from this channel, as of the ledger version used. (You can calculate the amount left in the channel by subtracting balance from amount). |
| destination_account | String - Address | No | A second account; if provided, filter results to payment channels whose destination is this account. |
| ledger_hash | String | No | The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | Number or String | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| limit | Number | No | Limit the number of transactions to retrieve. Cannot be less than 10 or more than 400. Positive values outside this range are replaced with the closest valid option. The default is 200. |
| marker | Marker | No | Value from a previous paginated response. Resume retrieving data where that response left off. |
| transfer_rate | Number | No | The fee to charge when users make claims on a payment channel, initially set on the creation of a payment channel and updated on subsequent funding or claim transactions. |


`account`

`amount`

`balance`

`balance`

`amount`

`destination_account`

`ledger_hash`

`ledger_index`

`limit`

`marker`

`transfer_rate`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 1,
  "result": {
    "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "channels": [
      {
        "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "amount": "1000",
        "balance": "0",
        "channel_id": "C7F634794B79DB40E87179A9D1BF05D05797AE7E92DF8E93FD6656E8C4BE3AE7",
        "destination_account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
        "public_key": "aBR7mdD75Ycs8DRhMgQ4EMUEmBArF8SEh1hfjrT2V9DQTLNbJVqw",
        "public_key_hex": "03CFD18E689434F032A4E84C63E2A3A6472D684EAF4FD52CA67742F3E24BAE81B2",
        "settle_delay": 60
      }
    ],
    "ledger_hash": "1EDBBA3C793863366DF5B31C2174B6B5E6DF6DB89A7212B86838489148E2A581",
    "ledger_index": 71766314,
    "validated": true
  },
  "status": "success",
  "type": "response"
}
```

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| account | String | The address of the source/owner of the payment channels. This corresponds to the account field of the request. |
| channels | Array of Channel Objects | Payment channels owned by this account. |
| ledger_hash | String | (May be omitted) The identifying Hash of the ledger version used to generate this response. |
| ledger_index | Number | The Ledger Index of the ledger version used to generate this response. |
| validated | Boolean | (May be omitted) If true, the information in this response comes from a validated ledger version. Otherwise, the information is subject to change. |
| limit | Number | (May be omitted) The limit to how many channel objects were actually returned by this request. |
| marker | Marker | (May be omitted) Server-defined value for pagination. Pass this to the next call to resume getting results where this call left off. Omitted when there are no additional pages after this one. |


`account`

`account`

`channels`

`account`

`ledger_hash`

`ledger_index`

`validated`

`true`

`limit`

`marker`

Each Channel Object has the following fields:

| Field | Type | Description |
| --- | --- | --- |
| account | String | The owner of the channel, as an Address. |
| amount | Object or String | The total amount of XRP, in drops or fungible tokens allocated to this channel. |
| balance | String | The total amount of XRP, in drops or fungible tokens paid out from this channel, as of the ledger version used. (You can calculate the amount left in the channel by subtracting balance from amount.) |
| channel_id | String | A unique ID for this channel, as a 64-character hexadecimal string. This is also the ID of the channel object in the ledger's state data. |
| destination_account | String | The destination account of the channel, as an Address. Only this account can receive the amount in the channel while it is open. |
| settle_delay | Unsigned Integer | The number of seconds the payment channel must stay open after the owner of the channel requests to close it. |
| public_key | String | (May be omitted) The public key for the payment channel in the XRP Ledger's base58 format. Signed claims against this channel must be redeemed with the matching key pair. |
| public_key_hex | String | (May be omitted) The public key for the payment channel in hexadecimal format, if one was specified at channel creation. Signed claims against this channel must be redeemed with the matching key pair. |
| expiration | Unsigned Integer | (May be omitted) Time, in seconds since the Ripple Epoch, when this channel is set to expire. This expiration date is mutable. If this is before the close time of the most recent validated ledger, the channel is expired. |
| cancel_after | Unsigned Integer | (May be omitted) Time, in seconds since the Ripple Epoch, of this channel's immutable expiration, if one was specified at channel creation. If this is before the close time of the most recent validated ledger, the channel is expired. |
| source_tag | Unsigned Integer | (May be omitted) A 32-bit unsigned integer to use as a source tag for payments through this payment channel, if one was specified at channel creation. This indicates the payment channel's originator or other purpose at the source account. Conventionally, if you bounce payments from this channel, you should specify this value in the DestinationTag of the return payment. |
| destination_tag | Unsigned Integer | (May be omitted) A 32-bit unsigned integer to use as a destination tag for payments through this channel, if one was specified at channel creation. This indicates the payment channel's beneficiary or other purpose at the destination account. |


`account`

`amount`

`balance`

`balance`

`amount`

`channel_id`

`destination_account`

`amount`

`settle_delay`

`public_key`

`public_key_hex`

`expiration`

`cancel_after`

`source_tag`

`DestinationTag`

`destination_tag`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- actNotFound - The address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.

`invalidParams`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.5.0](https://img.shields.io/badge/Updated in-rippled 1.5.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=37d03222-4668-4c90-9f55-ecadeb0acbb4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=37d03222-4668-4c90-9f55-ecadeb0acbb4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a57bf509-e1b5-4684-9e14-b490c669662d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a57bf509-e1b5-4684-9e14-b490c669662d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=77a25df3-121e-480f-bee1-04faa4df6292&bo=1&sid=2a8f99309da511f08b99dd123fae7d6d&vid=2a900a509da511f0b4600174264bc6e0&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_channels&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&r=&lt=3688&evt=pageLoad&sv=2&cdb=AQAS&rn=942164)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ce02da9-4b30-46bb-9e97-baf1a6db2e1b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6ce02da9-4b30-46bb-9e97-baf1a6db2e1b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=da3476fe-d136-456e-9d69-b7b0e8a402bf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=da3476fe-d136-456e-9d69-b7b0e8a402bf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0ef2b85f-8080-4a0c-9b7c-596509c940e9&pt=account_channels&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_channels&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_channels#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_channels#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_channels#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_channels#)
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
- [XRP Ledger Protocol Reference](https://xrpl.org/docs/references/protocol)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.4ded1d6daea34ef36db5c869950d17db.1759199315791.1759199315791.1759199315791.1&__hssc=78174987.1.1759199315791&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_channels.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/AccountChannels.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.5.0](https://github.com/XRPLF/rippled/releases/tag/1.5.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.4ded1d6daea34ef36db5c869950d17db.1759199315791.1759199315791.1759199315791.1&__hssc=78174987.1.1759199315791&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:28:47.896Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
