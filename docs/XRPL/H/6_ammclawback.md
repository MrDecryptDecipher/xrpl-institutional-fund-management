# AMMClawback
URL: https://xrpl.org/docs/references/protocol/transactions/types/ammclawback
Section: H6

## Overview


## Extracted Content
# AMMClawback

[Source]

Claw back tokens from a holder who has deposited your issued tokens into an AMM pool.

Clawback is disabled by default. To use clawback, you must send an AccountSet transaction to enable the Allow Trust Line Clawback setting. An issuer with any existing tokens cannot enable clawback. You can only enable Allow Trust Line Clawback if you have a completely empty owner directory, meaning you must do so before you set up any trust lines, offers, escrows, payment channels, checks, or signer lists. After you enable clawback, it cannot reverted: the account permanently gains the ability to claw back issued assets on trust lines.

(Added by the AMMClawback amendment.)


## Example AMMClawback JSON

```
{
  "TransactionType": "AMMClawback",
  "Account": "rPdYxU9dNkbzC5Y2h4jLbVJ3rMRrk7WVRL",
  "Holder": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
  "Asset": {
      "currency" : "FOO",
      "issuer" : "rPdYxU9dNkbzC5Y2h4jLbVJ3rMRrk7WVRL"
  },
  "Asset2" : {
      "currency" : "BAR",
      "issuer" : "rHtptZx1yHf6Yv43s1RWffM3XnEYv3XhRg"
  },
  "Amount": {
      "currency" : "FOO",
      "issuer" : "rPdYxU9dNkbzC5Y2h4jLbVJ3rMRrk7WVRL",
      "value" : "1000"
  }
}
```


## AMMClawback Fields

In addition to the common fields, AMMClawback transactions use the following fields:

| Field | JSON Type | Internal Type | Required | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The issuer of the asset being clawed back. Only the issuer can submit this transaction. |
| Asset | Object | Issue | Yes | Specifies the asset that the issuer wants to claw back from the AMM pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). The issuer field must match with Account. |
| Asset2 | Object | Issue | Yes | Specifies the other asset in the AMM's pool. The asset can be XRP, a token, or an MPT (see: Specifying Without Amounts). |
| Amount | Currency Amount | Amount | No | The maximum amount to claw back from the AMM account. The currency and issuer subfields should match the Asset subfields. If this field isn't specified, or the value subfield exceeds the holder's available tokens in the AMM, all of the holder's tokens are clawed back. |
| Holder | String - Address | AccountID | Yes | The account holding the asset to be clawed back. |


`Account`

`Asset`

`issuer`

`Account`

`Asset2`

`Amount`

`currency`

`issuer`

`Asset`

`value`

`Holder`


## AMMClawback Flags

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfClawTwoAssets | 0x00000001 | 1 | Claw back the specified amount of Asset, and a corresponding amount of Asset2 based on the AMM pool's asset proportion; both assets must be issued by the issuer in the Account field. If this flag isn't enabled, the issuer claws back the specified amount of Asset, while a corresponding proportion of Asset2 goes back to the Holder. |


`tfClawTwoAssets`

`0x00000001`

`Asset`

`Asset2`

`Account`

`Asset`

`Asset2`

`Holder`


## Error Cases

Besides errors that can occur for all transactions, AMMClawback transactions can result in the following transaction result codes:

`AMMClawback`

| Error Code | Description |
| --- | --- |
| tecNO_PERMISSION | Occurs if you attempt to claw back tokens from an AMM without the lsfAllowTrustlineClawback flag enabled, or the tfClawTwoAssets flag is enabled when you didn't issue both assets in the AMM. Also occurs if the Asset issuer doesn't match Account. |
| tecAMM_BALANCE | Occurs if the Holder doesn't hold any LP tokens from the AMM pool. |
| temDISABLED | Occurs if the AMMClawback amendment is not enabled. |
| temBAD_AMOUNT | Occurs if the Amount field in the AMMClawback transaction is less than or equal to 0, or the currency and issuer subfields don't match between Amount and Asset. |
| temINVALID_FLAG | Occurs if you try enabling flags besides tfClawTwoAssets. |
| temMALFORMED | Occurs if the issuer subfield doesn't match between Asset and Account, Account is the same as the Holder, or Asset is XRP. |
| terNO_AMM | Occurs if the AMM pool specified by Asset and Asset2 doesn't exist. |


`tecNO_PERMISSION`

`lsfAllowTrustlineClawback`

`tfClawTwoAssets`

`Asset`

`Account`

`tecAMM_BALANCE`

`Holder`

`temDISABLED`

`temBAD_AMOUNT`

`Amount`

`AMMClawback`

`currency`

`issuer`

`Amount`

`Asset`

`temINVALID_FLAG`

`tfClawTwoAssets`

`temMALFORMED`

`issuer`

`Asset`

`Account`

`Account`

`Holder`

`Asset`

`terNO_AMM`

`Asset`

`Asset2`


## See Also

- AMM entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3405887d-24b0-4a17-bfae-5ab7169f6c91&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3405887d-24b0-4a17-bfae-5ab7169f6c91&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=027647d6-fe09-48cc-8ef6-fdf32ff11e5d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=027647d6-fe09-48cc-8ef6-fdf32ff11e5d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=327053a5-43b3-49b0-a4f9-7948f8b1fbf0&bo=1&sid=8d1b25809da111f0ad8e1b24e745ca9d&vid=8d1b9f709da111f0a1922d7305af8872&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AMMClawback&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&r=&lt=5092&evt=pageLoad&sv=2&cdb=AQAS&rn=144377)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0866a7d5-2a51-4590-83b3-5bcea1446ebf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0866a7d5-2a51-4590-83b3-5bcea1446ebf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=87ddf1eb-ef70-494e-bad0-c6104f4f6267&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=87ddf1eb-ef70-494e-bad0-c6104f4f6267&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=689b6867-a8d3-4202-b229-3bbf56b9447c&pt=AMMClawback&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fammclawback&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/ammclawback#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/ammclawback#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/ammclawback#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/ammclawback#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b1a8caab4970d5ee77162afd6d9c8749.1759197763192.1759197763192.1759197763192.1&__hssc=78174987.1.1759197763193&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/ammclawback.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/AMMClawback.cpp)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b1a8caab4970d5ee77162afd6d9c8749.1759197763192.1759197763192.1759197763192.1&__hssc=78174987.1.1759197763193&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:02:54.020Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
