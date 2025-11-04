# account_info
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info
Section: N3

## Overview


## Extracted Content
# account_info

[Source]

The account_info command retrieves information about an account, its activity, and its XRP balance. All information retrieved is relative to a particular version of the ledger.

`account_info`


## Request Format

An example of an account_info request:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 2,
  "command": "account_info",
  "account": "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
  "ledger_index": "current",
  "queue": true
}
```

The request contains the following parameters:

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| account | String - Address | Yes | The account to look up. |
| ledger_hash | String | No | The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | Number or String | No | The ledger index of the ledger to use, or a shortcut string to choose a ledger automatically. (See Specifying Ledgers) |
| queue | Boolean | No | If true, return stats about queued transactions sent by this account. Can only be used when querying for the data from the current open ledger. |
| signer_lists | Boolean | No | If true, return any SignerList objects associated with this account. |


`Field`

`account`

`ledger_hash`

`ledger_index`

`queue`

`true`

`signer_lists`

`true`

The following fields are deprecated and should not be provided: ident, ledger, strict.

`ident`

`ledger`

`strict`


## Response Format

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": 5,
    "status": "success",
    "type": "response",
    "result": {
        "account_data": {
            "Account": "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
            "Balance": "999999999960",
            "Flags": 8388608,
            "LedgerEntryType": "AccountRoot",
            "OwnerCount": 0,
            "PreviousTxnID": "4294BEBE5B569A18C0A2702387C9B1E7146DC3A5850C1E87204951C6FDAA4C42",
            "PreviousTxnLgrSeq": 3,
            "Sequence": 6,
            "index": "92FA6A9FC8EA6018D5D16532D7795C91BFB0831355BDFDA177E86C8BF997985F"
        },
        "ledger_current_index": 4,
        "queue_data": {
            "auth_change_queued": true,
            "highest_sequence": 10,
            "lowest_sequence": 6,
            "max_spend_drops_total": "500",
            "transactions": [
                {
                    "auth_change": false,
                    "fee": "100",
                    "fee_level": "2560",
                    "max_spend_drops": "100",
                    "seq": 6
                },
                ... (trimmed for length) ...
                {
                    "LastLedgerSequence": 10,
                    "auth_change": true,
                    "fee": "100",
                    "fee_level": "2560",
                    "max_spend_drops": "100",
                    "seq": 10
                }
            ],
            "txn_count": 5
        },
        "validated": false
    }
}
```

The response follows the standard format, with the result containing the requested account, its data, and a ledger to which it applies, as the following fields:

| Field | Type | Description |
| --- | --- | --- |
| account_data | Object | The AccountRoot ledger object with this account's information, as stored in the ledger. |
| account_flags | Object | The account's flag statuses (see below), based on the Flags field of the account. |
| signer_lists | Array | API v1: (Omitted unless the request specified signer_lists and at least one SignerList is associated with the account.) Array of SignerList ledger objects associated with this account for Multi-Signing. Since an account can own at most one SignerList, this array must have exactly one member if it is present. The field is nested under account_data.API v2: Identical to API v1, but the field is returned in the root response instead. Clio implements the API v2 behavior in all cases. |
| ledger_current_index | Integer | (Omitted if ledger_index is provided instead) The ledger index of the current in-progress ledger, which was used when retrieving this information. |
| ledger_index | Integer | (Omitted if ledger_current_index is provided instead) The ledger index of the ledger version used when retrieving this information. The information does not contain any changes from ledger versions newer than this one. |
| queue_data | Object | (Omitted unless queue specified as true and querying the current open ledger.) Information about queued transactions sent by this account. This information describes the state of the local rippled server, which may be different from other servers in the peer-to-peer XRP Ledger network. Some fields may be omitted because the values are calculated "lazily" by the queuing mechanism. |
| validated | Boolean | True if this data is from a validated ledger version; if omitted or set to false, this data is not final. |


`Field`

`account_data`

`account_flags`

`Flags`

`signer_lists`

`signer_lists`

`account_data`

`ledger_current_index`

`ledger_index`

`ledger_index`

`ledger_current_index`

`queue_data`

`queue`

`true`

`rippled`

`validated`

The account_flags field contains the following nested fields:

`account_flags`

| Field | Type | Description |
| --- | --- | --- |
| defaultRipple | Boolean | If true, the account allows rippling on its trust lines by default. |
| depositAuth | Boolean | If true, the account is using Deposit Authorization and does not accept any payments from unknown parties. |
| disableMasterKey | Boolean | If true, the account's master key pair is disabled. |
| disallowIncomingCheck | Boolean | If true, the account does not allow others to send Checks to it. (Requires the DisallowIncoming amendment) |
| disallowIncomingNFTokenOffer | Boolean | If true, the account does not allow others to make NFT buy or sell offers to it. (Requires the DisallowIncoming amendment) |
| disallowIncomingPayChan | Boolean | If true, the account does not allow others to make Payment Channels to it. (Requires the DisallowIncoming amendment) |
| disallowIncomingTrustline | Boolean | If true, the account does not allow others to make trust lines to it. (Requires the DisallowIncoming amendment) |
| disallowIncomingXRP | Boolean | If true, the account does not want to receive XRP from others. (This is advisory, and not enforced at a protocol level.) |
| globalFreeze | Boolean | If true, all tokens issued by the account are currently frozen. |
| noFreeze | Boolean | If true, the account has permanently given up the abilities to freeze individual trust lines or end a global freeze. See No Freeze for details. |
| passwordSpent | Boolean | If false, the account can send a special key reset transaction with a transaction cost of 0. The protocol turns this flag on and off automatically; it is not controlled by a user-facing setting. |
| requireAuthorization | Boolean | If true, the account is using Authorized Trust Lines to limit who can hold the tokens it issues. |
| requireDestinationTag | Boolean | If true, the account requires a destination tag on all payments it receives. |


`Field`

`defaultRipple`

`true`

`depositAuth`

`true`

`disableMasterKey`

`true`

`disallowIncomingCheck`

`true`

`disallowIncomingNFTokenOffer`

`true`

`disallowIncomingPayChan`

`true`

`disallowIncomingTrustline`

`true`

`disallowIncomingXRP`

`true`

`globalFreeze`

`true`

`noFreeze`

`true`

`passwordSpent`

`false`

`requireAuthorization`

`true`

`requireDestinationTag`

`true`

The queue_data field, if present, contains the following nested fields:

`queue_data`

| Field | Type | Description |
| --- | --- | --- |
| txn_count | Integer | Number of queued transactions from this address. |
| auth_change_queued | Boolean | (May be omitted) Whether a transaction in the queue changes this address's ways of authorizing transactions. If true, this address can queue no further transactions until that transaction has been executed or dropped from the queue. |
| lowest_sequence | Integer | (May be omitted) The lowest Sequence Number among transactions queued by this address. |
| highest_sequence | Integer | (May be omitted) The highest Sequence Number among transactions queued by this address. |
| max_spend_drops_total | String | (May be omitted) Integer amount of drops of XRP that could be debited from this address if every transaction in the queue consumes the maximum amount of XRP possible. |
| transactions | Array | (May be omitted) Information about each queued transaction from this address. |


`Field`

`txn_count`

`auth_change_queued`

`true`

`lowest_sequence`

`highest_sequence`

`max_spend_drops_total`

`transactions`

Each object in the transactions array of queue_data, if present, may contain any or all of the following fields:

`transactions`

`queue_data`

| Field | Type | Description |
| --- | --- | --- |
| auth_change | Boolean | Whether this transaction changes this address's ways of authorizing transactions. |
| fee | String | The Transaction Cost of this transaction, in drops of XRP. |
| fee_level | String | The transaction cost of this transaction, relative to the minimum cost for this type of transaction, in fee levels. |
| max_spend_drops | String | The maximum amount of XRP, in drops, this transaction could send or destroy. |
| seq | Integer | The Sequence Number of this transaction. |


`Field`

`auth_change`

`fee`

`fee_level`

`max_spend_drops`

`seq`


## Possible Errors

- Any of the universal error types.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing. For example, the request specified queue as true but specified a ledger_index that is not the current open ledger. In API v1, you won't receive this error when specifying a non-boolean value for signer_lists.
- actNotFound - The address specified in the account field of the request does not correspond to an account in the ledger.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.

`invalidParams`

`queue`

`true`

`ledger_index`

`signer_lists`

`actNotFound`

`account`

`lgrNotFound`

`ledger_hash`

`ledger_index`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.11.0](https://img.shields.io/badge/Updated in-rippled 1.11.0-blue.svg)

![New in: rippled 1.11.0](https://img.shields.io/badge/New in-rippled 1.11.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8e0951af-6e41-4ecb-a4fd-b61c0e259b22&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8e0951af-6e41-4ecb-a4fd-b61c0e259b22&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4e01a825-236a-4141-9337-3aeb460c4caa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4e01a825-236a-4141-9337-3aeb460c4caa&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=445c5c71-2ac7-4c8c-a686-4a7120c1006b&bo=1&sid=437aae609da511f0a4adf193b10878b7&vid=437b1b809da511f0b0e7eb65c3bcd3bc&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=account_info&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&r=&lt=3751&evt=pageLoad&sv=2&cdb=AQAS&rn=319555)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=215537cf-689c-430c-87f2-2db0da4a27d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=215537cf-689c-430c-87f2-2db0da4a27d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b95b1ecb-59b5-42ce-9ddd-b69ab3f5d498&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b95b1ecb-59b5-42ce-9ddd-b69ab3f5d498&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=ae49bc60-bea3-4a2e-9866-f4f86e9b51c2&pt=account_info&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Faccount-methods%2Faccount_info&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.7cecf324a760ed417f79f5d47e20010b.1759199357324.1759199357324.1759199357324.1&__hssc=78174987.1.1759199357324&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/AccountInfo.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [Clio](https://github.com/XRPLF/clio)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.7cecf324a760ed417f79f5d47e20010b.1759199357324.1759199357324.1759199357324.1&__hssc=78174987.1.1759199357324&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:29:30.435Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
