# RippleState
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ripplestate
Section: G32

## Overview


## Extracted Content
# RippleState

[Source]

A RippleState ledger entry represents a trust line between two accounts. Each account can change its own limit and other settings, but the balance is a single shared value. A trust line that is entirely in its default state is considered the same as a trust line that does not exist and is automatically deleted. You can create or modify a trust line with a TrustSet transaction.

`RippleState`


## High vs. Low Account

There can only be one RippleState entry per currency for any given pair of accounts. Since no account is privileged in the XRP Ledger, a RippleState entry sorts account addresses numerically, to ensure a canonical form. Whichever address is numerically lower when decoded is deemed the "low account" and the other is the "high account". The net balance of the trust line is stored from the low account's perspective.

`RippleState`

`RippleState`

The "issuer" for the balance in a trust line depends on whether the balance is positive or negative. If a RippleState entry shows a positive balance, the high account is the issuer. If the balance is negative, the low account is the issuer. Often, the issuer has its limit set to 0 and the other account has a positive limit, but this is not reliable because limits can change without affecting an existing balance.

`RippleState`


## Example RippleState JSON

```
{
    "Balance": {
        "currency": "USD",
        "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
        "value": "-10"
    },
    "Flags": 393216,
    "HighLimit": {
        "currency": "USD",
        "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "value": "110"
    },
    "HighNode": "0000000000000000",
    "LedgerEntryType": "RippleState",
    "LowLimit": {
        "currency": "USD",
        "issuer": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
        "value": "0"
    },
    "LowNode": "0000000000000000",
    "PreviousTxnID": "E3FE6EA3D48F0C2B639448020EA4F03D4F4F8FFDB243A852A0F59177921B4879",
    "PreviousTxnLgrSeq": 14090896,
    "index": "9CA88CDEDFF9252B3DE183CE35B038F57282BC9503CDFA1923EF9A95DF0D6F7B"
}
```


## RippleState Fields

In addition to the common fields, RippleState entries have the following fields:

`RippleState`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Balance | Object | Amount | Yes | The balance of the trust line, from the perspective of the low account. A negative balance indicates that the high account holds tokens issued by the low account. The issuer in this is always set to the neutral value ACCOUNT_ONE. |
| Flags | Number | UInt32 | Yes | A bit-map of boolean options enabled for this entry. |
| HighLimit | Object | Amount | Yes | The limit that the high account has set on the trust line. The issuer is the address of the high account that set this limit. |
| HighNode | String | UInt64 | Yes | (Omitted in some historical ledgers) A hint indicating which page of the high account's owner directory links to this entry, in case the directory consists of multiple pages. |
| HighQualityIn | Number | UInt32 | No | The inbound quality set by the high account, as an integer in the implied ratio HighQualityIn:1,000,000,000. As a special case, the value 0 is equivalent to 1 billion, or face value. |
| HighQualityOut | Number | UInt32 | No | The outbound quality set by the high account, as an integer in the implied ratio HighQualityOut:1,000,000,000. As a special case, the value 0 is equivalent to 1 billion, or face value. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0072, mapped to the string RippleState, indicates that this is a RippleState entry. |
| LockCount | Object or String | Amount | No | The total number of lock balances on a RippleState ledger object. |
| LockedBalance | Object or String | Amount | No | The total number of locked tokens on a RippleState ledger object. |
| LowLimit | Object | Amount | Yes | The limit that the low account has set on the trust line. The issuer is the address of the low account that set this limit. |
| LowNode | String | UInt64 | Yes | (Omitted in some historical ledgers) A hint indicating which page of the low account's owner directory links to this entry, in case the directory consists of multiple pages. |
| LowQualityIn | Number | UInt32 | No | The inbound quality set by the low account, as an integer in the implied ratio LowQualityIn:1,000,000,000. As a special case, the value 0 is equivalent to 1 billion, or face value. |
| LowQualityOut | Number | UInt32 | No | The outbound quality set by the low account, as an integer in the implied ratio LowQualityOut:1,000,000,000. As a special case, the value 0 is equivalent to 1 billion, or face value. |
| PreviousTxnID | String | UInt256 | Yes | The identifying hash of the transaction that most recently modified this entry. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this entry. |


`Balance`

`Flags`

`HighLimit`

`issuer`

`HighNode`

`HighQualityIn`

`HighQualityIn`

`HighQualityOut`

`HighQualityOut`

`LedgerEntryType`

`0x0072`

`RippleState`

`LockCount`

`RippleState`

`LockedBalance`

`RippleState`

`LowLimit`

`issuer`

`LowNode`

`LowQualityIn`

`LowQualityIn`

`LowQualityOut`

`LowQualityOut`

`PreviousTxnID`

`PreviousTxnLgrSeq`


## RippleState Flags

RippleState entries can have the following flags combined into the Flags field:

`RippleState`

`Flags`

| Flag Name | Hex Value | Decimal Value | Corresponding TrustSet Flag | Description |
| --- | --- | --- | --- | --- |
| lsfAMMNode | 0x01000000 | 16777216 | (None) | This entry consumed AMM liquidity to complete a Payment transaction. |
| lsfLowReserve | 0x00010000 | 65536 | (None) | This entry contributes to the low account's owner reserve. |
| lsfHighReserve | 0x00020000 | 131072 | (None) | This entry contributes to the high account's owner reserve. |
| lsfLowAuth | 0x00040000 | 262144 | tfSetAuth | The low account has authorized the high account to hold tokens issued by the low account. |
| lsfHighAuth | 0x00080000 | 524288 | tfSetAuth | The high account has authorized the low account to hold tokens issued by the high account. |
| lsfLowNoRipple | 0x00100000 | 1048576 | tfSetNoRipple | The low account has disabled rippling from this trust line. |
| lsfHighNoRipple | 0x00200000 | 2097152 | tfSetNoRipple | The high account has disabled rippling from this trust line. |
| lsfLowFreeze | 0x00400000 | 4194304 | tfSetFreeze | The low account has frozen the trust line, preventing the high account from transferring the asset. |
| lsfHighFreeze | 0x00800000 | 8388608 | tfSetFreeze | The high account has frozen the trust line, preventing the low account from transferring the asset. |
| lsfLowDeepFreeze | 0x02000000 | 33554432 | tfSetLowDeepFreeze | The low account has deep-frozen the trust line, preventing the high account from sending and receiving the asset. |
| lsfHighDeepFreeze | 0x04000000 | 67108864 | tfSetHighDeepFreeze | The high account has deep-frozen the trust line, preventing the low account from sending and receiving the asset. |


`lsfAMMNode`

`0x01000000`

`Payment`

`lsfLowReserve`

`0x00010000`

`lsfHighReserve`

`0x00020000`

`lsfLowAuth`

`0x00040000`

`tfSetAuth`

`lsfHighAuth`

`0x00080000`

`tfSetAuth`

`lsfLowNoRipple`

`0x00100000`

`tfSetNoRipple`

`lsfHighNoRipple`

`0x00200000`

`tfSetNoRipple`

`lsfLowFreeze`

`0x00400000`

`tfSetFreeze`

`lsfHighFreeze`

`0x00800000`

`tfSetFreeze`

`lsfLowDeepFreeze`

`0x02000000`

`tfSetLowDeepFreeze`

`lsfHighDeepFreeze`

`0x04000000`

`tfSetHighDeepFreeze`

The two accounts connected by the trust line can each change their own settings with a TrustSet transaction.


## RippleState Reserve

A RippleState entry counts as one item towards the owner reserve of one or both of the accounts it connects. In typical cases, the holder of a token owes a reserve and the issuer of the token does not.

`RippleState`

Specifically, the entry counts towards an account's reserve if that account modifies a trust line to put it in a non-default state. The lsfLowReserve and lsfHighReserve flags indicate which account(s) are responsible for the owner reserve. The protocol automatically sets these flags when it modifies a trust line.

`lsfLowReserve`

`lsfHighReserve`

The values that count towards a trust line's non-default state are as follows:

| High account responsible if... | Low account responsible if... |
| --- | --- |
| Balance is negative (the high account holds currency) | Balance is positive (the low account holds currency) |
| HighLimit is not 0 | LowLimit is not 0 |
| LowQualityIn is not 0 and not 1000000000 | HighQualityIn is not 0 and not 1000000000 |
| LowQualityOut is not 0 and not 1000000000 | HighQualityOut is not 0 and not 1000000000 |
| lsfHighNoRipple flag is not in its default state | lsfLowNoRipple flag is not in its default state |
| lsfHighFreeze flag is enabled | lsfLowFreeze flag is enabled |


`Balance`

`Balance`

`HighLimit`

`0`

`LowLimit`

`0`

`LowQualityIn`

`0`

`1000000000`

`HighQualityIn`

`0`

`1000000000`

`LowQualityOut`

`0`

`1000000000`

`HighQualityOut`

`0`

`1000000000`

`lsfHighNoRipple`

`lsfLowNoRipple`

`lsfHighFreeze`

`lsfLowFreeze`

The lsfLowAuth and lsfHighAuth flags do not count against the default state, because they cannot be disabled.

`lsfLowAuth`

`lsfHighAuth`

The default state of the two No Ripple flags depends on the state of the lsfDefaultRipple flag in their corresponding AccountRoot entries. If Default Ripple is disabled (the default), then the default state of the lsfNoRipple flag is enabled for all of an account's trust lines. If an account enables Default Ripple, then the lsfNoRipple flag is disabled (rippling is enabled) for an account's trust lines by default.

`lsfDefaultRipple`

`lsfNoRipple`

`lsfNoRipple`

NotePrior to the introduction of the Default Ripple flag in rippled version 0.27.3 (March 10, 2015), the default state for all trust lines was with both No Ripple flags disabled (rippling enabled).

`rippled`

The XRP Ledger uses lazy evaluation to calculate the owner reserve. This means that even if an account changes the default state of all its trust lines by changing the Default Ripple flag, that account's reserve stays the same initially. When an account modifies a trust line, the protocol re-evaluates whether that individual trust line is in its default state and should contribute to the owner reserve.


## RippleState ID Format

The ID of a RippleState entry is the SHA-512Half of the following values, concatenated in order:

- The RippleState space key (0x0072)
- The AccountID of the low account
- The AccountID of the high account
- The 160-bit currency code of the trust line(s)

`0x0072`


## See Also

- Transactions:TrustSet transaction
- TrustSet transaction

- TrustSet transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ffd17878-ab08-4bcc-a32f-8cfa6dd93ce2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ffd17878-ab08-4bcc-a32f-8cfa6dd93ce2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=35df3beb-413d-458d-becb-120b359f87fd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=35df3beb-413d-458d-becb-120b359f87fd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=f8dffbd3-d7f6-43b9-b68d-719fc7202037&bo=1&sid=fe2162009da011f0af2f497054d55e9d&vid=fe2208109da011f0b50ddbd3cfb8b6b3&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=RippleState&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&r=&lt=2113&evt=pageLoad&sv=2&cdb=AQAS&rn=895144)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=27485c88-21f9-4c0d-a09c-67d211db9501&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=27485c88-21f9-4c0d-a09c-67d211db9501&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c07a9f63-684c-4c9b-8d1f-71a8213a3a24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c07a9f63-684c-4c9b-8d1f-71a8213a3a24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=6804de6e-b018-4940-af8e-c0731fb80b42&pt=RippleState&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fripplestate&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ripplestate#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ripplestate#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ripplestate#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/ripplestate#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/ripplestate.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L277-L289)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:59:01.261Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
