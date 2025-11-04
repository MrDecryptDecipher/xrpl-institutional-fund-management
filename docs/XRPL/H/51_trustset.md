# TrustSet
URL: https://xrpl.org/docs/references/protocol/transactions/types/trustset
Section: H51

## Overview


## Extracted Content
# TrustSet

[Source]

Create or modify a trust line linking two accounts.


## Example TrustSet JSON

```
{
    "TransactionType": "TrustSet",
    "Account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "Fee": "12",
    "Flags": 262144,
    "LastLedgerSequence": 8007750,
    "LimitAmount": {
      "currency": "USD",
      "issuer": "rsP3mgGb2tcYUrxiLFiHJiQXhsziegtwBc",
      "value": "100"
    },
    "Sequence": 12
}
```


## TrustSet Fields

In addition to the common fields, TrustSet transactions use the following fields:

| Field | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| LimitAmount | Object | Amount | Object defining the trust line to create or modify, in the format of a Currency Amount. |
| LimitAmount.currency | String | (Amount.currency) | The currency to this trust line applies to, as a three-letter ISO 4217 Currency Code or a 160-bit hex value according to currency format. "XRP" is invalid. |
| LimitAmount.value | String | (Amount.value) | Quoted decimal representation of the limit to set on this trust line. |
| LimitAmount.issuer | String | (Amount.issuer) | The address of the account to extend trust to. |
| QualityIn | Number | UInt32 | (Optional) Value incoming balances on this trust line at the ratio of this number per 1,000,000,000 units. A value of 0 is shorthand for treating balances at face value. For example, if you set the value to 10,000,000, 1% of incoming funds remain with the sender. If an account sends 100 currency, the sender retains 1 currency unit and the destination receives 99 units. This option is included for parity: in practice, you are much more likely to set a QualityOut value. Note that this fee is separate and independent from token transfer fees. |
| QualityOut | Number | UInt32 | (Optional) Value outgoing balances on this trust line at the ratio of this number per 1,000,000,000 units. A value of 0 is shorthand for treating balances at face value.  For example, if you set the value to 10,000,000, 1% of outgoing funds would remain with the issuer.  If the sender sends 100 currency units, the issuer retains 1 currency unit and the destination receives 99 units. Note that this fee is separate and independent from token transfer fees. |


`LimitAmount`

`LimitAmount`

`currency`

`LimitAmount`

`value`

`LimitAmount`

`issuer`

`QualityIn`

`0`

`QualityOut`

`QualityOut`

`0`

If the account specified in LimitAmount.issuer is blocking incoming trust lines, the transaction fails with the result code tecNO_PERMISSION. (Requires the DisallowIncoming amendment )

`LimitAmount.issuer`

`tecNO_PERMISSION`


## TrustSet Flags

Transactions of the TrustSet type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfSetfAuth | 0x00010000 | 65536 | Authorize the other party to hold currency issued by this account. (No effect unless using the asfRequireAuth AccountSet flag.) Cannot be unset. |
| tfSetNoRipple | 0x00020000 | 131072 | Enable the No Ripple flag, which blocks rippling between two trust lines of the same currency if this flag is enabled on both. |
| tfClearNoRipple | 0x00040000 | 262144 | Disable the No Ripple flag, allowing rippling on this trust line. |
| tfSetFreeze | 0x00100000 | 1048576 | Freeze the trust line. |
| tfClearFreeze | 0x00200000 | 2097152 | Unfreeze the trust line. |
| tfSetDeepFreeze | 0x00400000 | 4194304 | Deep Freeze the trust line. |
| tfClearDeepFreeze | 0x00800000 | 8388608 | Clear the Deep Freeze on the trust line. |


`tfSetfAuth`

`0x00010000`

`asfRequireAuth`

`tfSetNoRipple`

`0x00020000`

`tfClearNoRipple`

`0x00040000`

`tfSetFreeze`

`0x00100000`

`tfClearFreeze`

`0x00200000`

`tfSetDeepFreeze`

`0x00400000`

`tfClearDeepFreeze`

`0x00800000`

If a transaction tries to enable No Ripple but cannot, it fails with the result code tecNO_PERMISSION. Before the fix1578 amendment became enabled, such a transaction would result in tesSUCCESS (making any other changes it could) instead.

`tecNO_PERMISSION`

`tesSUCCESS`

The Auth flag of a trust line does not determine whether the trust line counts towards its owner's XRP reserve requirement. An issuer can pre-authorize a trust line with the tfSetfAuth flag only, even if the limit and balance of the trust line are 0.

`tfSetfAuth`


## See Also

- RippleState entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3acec307-0a8b-4e87-95d6-ec516bf02b81&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3acec307-0a8b-4e87-95d6-ec516bf02b81&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8ca705e5-24ff-42e3-8730-01788e7eb5f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8ca705e5-24ff-42e3-8730-01788e7eb5f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=28821f03-b0ae-441f-a150-eb4b2921c023&bo=1&sid=b2cce7c09da311f0a0851953070a9da8&vid=b2cd54709da311f0804f594679a12507&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=TrustSet&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&r=&lt=3494&evt=pageLoad&sv=2&cdb=AQAS&rn=685111)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3243f65d-4b39-4ba5-86aa-8d5153da86f5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3243f65d-4b39-4ba5-86aa-8d5153da86f5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e1879ea3-e34e-4725-8776-f59ba3b989f0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e1879ea3-e34e-4725-8776-f59ba3b989f0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=771e413d-b9a1-4d0e-8742-88df036ac538&pt=TrustSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Ftrustset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/trustset#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/trustset#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/trustset#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/trustset#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.8a55a86c4523eb540ac7bdabdcfa413d.1759198685150.1759198685150.1759198685150.1&__hssc=78174987.1.1759198685150&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/trustset.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/SetTrust.cpp)
- [ISO 4217 Currency Code](https://www.xe.com/iso4217.php)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.8a55a86c4523eb540ac7bdabdcfa413d.1759198685150.1759198685150.1759198685150.1&__hssc=78174987.1.1759198685150&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:18:15.594Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
