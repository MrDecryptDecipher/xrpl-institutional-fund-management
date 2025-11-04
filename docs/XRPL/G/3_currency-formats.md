# Currency Formats
URL: https://xrpl.org/docs/references/protocol/data-types/currency-formats
Section: G3

## Overview


## Extracted Content
# Currency Formats

The XRP Ledger has three kinds of digital asset: XRP, tokens, and Multi-purpose Tokens (MPTs). All three types have high precision, although their formats are different.

(Requires the [MPToken amendment][] )


## Comparison

The following table summarizes some of the differences XRP, tokens, and MPTs in the XRP Ledger:

| XRP | Tokens | MPTs |
| --- | --- | --- |
| Has no issuer. | Always issued by an XRP Ledger account. | Always issued by an XRP Ledger account. |
| Specified as a string. | Specified as an object. | Specified as an object. |
| Tracked in accounts. | Tracked in trust lines. | Tracked in holder's account. |
| Can never be created; can only be destroyed. | Can be issued or redeemed freely. | Can be issued or redeemed freely. |
| Minimum value: 0. (Cannot be negative.) | Minimum value: -9999999999999999e80. Minimum nonzero absolute value: 1000000000000000e-96. | Minimum value: 0. (Cannot be negative.) |
| Maximum value 100000000000 (1011) XRP. That's 100000000000000000 (1017) "drops". | Maximum value 9999999999999999e80. | Maximum value 0x7FFFFFFFFFFFFFFF. |
| Precise to the nearest "drop" (0.000001 XRP) | 15 decimal digits of precision. |  |
| Can't be frozen. | The issuer can freeze balances. | The issuer can lock balances individually and globally. |
| No transfer fees; XRP-to-XRP payments are always direct. | Can take indirect paths with each issuer charging a percentage transfer fee. | Can charge a transfer fee for secondary sales of the token. |
| Can be used in Payment Channels and Escrow. | Not compatible with Payment Channels or Escrow. | Not compatible with Payment Channels or Escrow. |


`0`

`-9999999999999999e80`

`1000000000000000e-96`

`0`

`100000000000`

`100000000000000000`

`9999999999999999e80`

`0x7FFFFFFFFFFFFFFF`

See What is XRP?, Tokens, and Multi-purpose Tokens.


## Specifying Currency Amounts

Use the appropriate format for the type of currency you want to specify:

- XRP Amounts
- Token Amounts
- MPT Amounts


### XRP Amounts

To specify an amount of XRP, use a String Number indicating drops of XRP, where each drop is equal to 0.000001 XRP. For example, to specify 13.1 XRP:

```
"13100000"
```

Do not specify XRP as an object.

XRP amounts cannot be negative.


### Token Amounts

To specify an amount of a (fungible) token, use an Amount object. Tokens use the currency, value, and issuer fields.

`Amount`

`currency`

`value`

`issuer`

| Field | Type | Description |
| --- | --- | --- |
| currency | String - Currency Code | Arbitrary currency code for the token. Cannot be XRP. |
| value | String Number | Quoted decimal representation of the amount of the token. This can include scientific notation, such as 1.23e11 meaning 123,000,000,000. Both e and E may be used. This can be negative when displaying balances, but negative values are disallowed in other contexts such as specifying how much to send. |
| issuer | String | Generally, the account that issues this token. In special cases, this can refer to the account that holds the token instead (for example, in a Clawback transaction). |


`Field`

`currency`

`XRP`

`value`

`1.23e11`

`e`

`E`

`issuer`

CautionThese field names are case-sensitive.

For example, to represent $153.75 US dollars issued by account r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59, you would specify:

`r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59`

```
{
    "currency": "USD",
    "value": "153.75",
    "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59"
}
```


### MPT Amounts

Specify the amount of MPTs using the value field.

`value`

| Field | Type | Description |
| --- | --- | --- |
| mpt_issuance_id | String | Arbitrary unique identifier for a Multi-purpose Token. |
| value | String Number | A string representing a positive integer value.  Valid values for this field are between 0x0 and 0x7FFFFFFFFFFFFFFF. Use AssetScale to enable values as fractions of the MPT value. See MPT Precision. |


`Field`

`mpt_issuance_id`

`value`

`AssetScale`

For example, to specify 1 million units of an MPT you would specify:

```
{
    "mpt_issuance_id": 
	     "0000012FFD9EE5DA93AC614B4DB94D7E0FCE415CA51BED47",
    "value": "1000000"
}
```


### Specifying Without Amounts

In some cases, you need to define an asset (which could be XRP or a token) without a specific amount, such as when defining an order book in the decentralized exchange.

To describe a token without an amount, specify it as a currency object, but omit the value field. For example:

`value`

```
{
  "currency": "TST",
  "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
}
```

To describe XRP without an amount, specify it as a JSON object with only a currency field. Never include an issuer field for XRP. For example:

`currency`

`issuer`

```
{
  "currency": "XRP"
}
```

To describe an MPT without an amount, specify it as a JSON object with only a mpt_issuance_id field. For example:

`mpt_issuance_id`

```
{
  "mpt_issuance_id": "0000012FFD9EE5DA93AC614B4DB94D7E0FCE415CA51BED47"
}
```


## String Numbers

XRP Ledger APIs generally use strings, rather than native JSON numbers, to represent numeric amounts of currency for both XRP and tokens. This protects against a loss of precision when using JSON parsers, which may automatically try to represent all JSON numbers in a floating-point format. Within the String value, the numbers are serialized in the same way as native JSON numbers:

- Base-10.
- Non-zero-prefaced.
- May contain . as a decimal point. For example, ½ is represented as 0.5. (American style, not European)
- Negative amounts start with the character -.
- May contain E or e to indicate being raised to a power of 10 (scientific notation). For example, 1.2E5 is equivalent to 1.2×105, or 120000. Negative exponents are also possible.
- No comma (,) characters are used.

`.`

`0.5`

`-`

`E`

`e`

`1.2E5`

`120000`

`,`


## XRP Precision

XRP has the same precision as a 64-bit unsigned integer where each unit is equivalent to 0.000001 XRP. It uses integer math, so that any amount less than a full drop is rounded down.


## Token Precision

Tokens can represent a wide variety of assets, including those typically measured in very small or very large denominations. This format uses significant digits and a power-of-ten exponent in a similar way to scientific notation. The format supports positive and negative significant digits and exponents within the specified range. Unlike typical floating-point representations of non-whole numbers, this format uses integer math for all calculations, so it always maintains 15 decimal digits of precision. Multiplication and division have adjustments to compensate for over-rounding in the least significant digits.

When sending token amounts in the XRP Ledger's peer-to-peer network, servers serialize the amount to a 64-bit binary value.

TipFor tokens that should not be divisible at all, see Non-Fungible Tokens (NFTs).


## MPT Precision

MPTs are always expressed in whole integers. You can change the AssetScale of your MPT to express the basic unit as a fraction of an MPT. The XRP Ledger doesn't use the AssetScale on-chain: this is for your convenience in specifying the basic unit.

`AssetScale`

`AssetScale`

For example, to express a value of 13.1 MPT, the MPT would require that the AssetScale be set to 1, and the value of the MPT set to 131.

`AssetScale`

`value`

```
"Amount": {
      "mpt_issuance_id":
        "0000012FFD9EE5DA93AC614B4DB94D7E0FCE415CA51BED47",
      "value": "131"
    }
```


## Currency Codes

The HTTP / WebSocket APIs support two formats of currency code:

- Standard Currency Codes: As a 3-character string such as "EUR" or "USD".
- Nonstandard Currency Codes: As a 160-bit hexadecimal string, such as "444F4C4C415259444F4F00000000000000000000".

`"EUR"`

`"USD"`

`"444F4C4C415259444F4F00000000000000000000"`

Tokens with the same code can ripple across connected trust lines. Currency codes have no other behavior built into the XRP Ledger.


### Standard Currency Codes

The standard format for currency codes is a three-character string such as USD. This is intended for use with ISO 4217 Currency Codes. The following rules apply:

`USD`

- Currency codes must be exactly 3 ASCII characters in length. The following characters are permitted: all uppercase and lowercase letters, digits, as well as the symbols ?, !, @, #, $, %, ^, &, *, <, >, (, ), {, }, [, ], and |.
- Currency codes are case-sensitive.
- The currency code XRP (all-uppercase) is disallowed. Real XRP typically does not use a currency code in the XRP Ledger protocol.

`?`

`!`

`@`

`#`

`$`

`%`

`^`

`&`

`*`

`<`

`>`

`(`

`)`

`{`

`}`

`[`

`]`

`|`

`XRP`

At the protocol level, this format is serialized into a 160-bit binary value starting with 0x00.

`0x00`


### Nonstandard Currency Codes

You can also use a 160-bit (40-character) hexadecimal string, such as 444F4C4C415259444F4F00000000000000000000 as the currency code. To prevent this from being treated as a "standard" currency code, the first 8 bits SHOULD NOT be 0x00. At a protocol level, non-standard currency codes starting with 0x00 are allowed, but they may not be handled correctly by all APIs. When using or reading a nonstandard currency code, consider the following:

`444F4C4C415259444F4F00000000000000000000`

`0x00`

`0x00`

- Most interfaces that read currency codes translate them into ASCII when the currency code is nonstandard.
- If you decode a nonstandard currency code into text (ASCII or UTF-8), beware of non-printing characters or text that may be treated as markup where you are displaying them. Also be careful of "lookalike" currency codes that may display as XRP or other assets, but aren't.
- Not all hexadecimal strings have a direct, human-readable format. See: Normalize Currency Codes.

Deprecated: Some previous versions of ripple-lib supported an "interest-bearing" or "demurraging" currency code type, such as 015841551A748AD2C1F76FF6ECB0CCCD00000000. These codes have the first 8 bits 0x01. Demurraging / interest-bearing currencies are no longer supported, but you may find them in ledger data. For more information, see Demurrage.

`015841551A748AD2C1F76FF6ECB0CCCD00000000`

`0x01`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1b442310-4444-4741-b76e-78689f2f64d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1b442310-4444-4741-b76e-78689f2f64d8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=de9b7203-4770-4a0f-9865-e4de93d7179f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=de9b7203-4770-4a0f-9865-e4de93d7179f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=0bebc8d5-6c3d-433c-8554-8b30e9155b21&bo=1&sid=90a6d4f09d9f11f0aabbd70c1e56b8d9&vid=90a70e509d9f11f0ac8df95e9eca7eec&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Currency%20Formats&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&r=&lt=3120&evt=pageLoad&sv=2&cdb=AQAS&rn=875116)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=88a51d0b-20f3-4b36-8175-23d7b02f1601&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=88a51d0b-20f3-4b36-8175-23d7b02f1601&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=865706e4-f213-4232-847f-bcdfe8dd91cc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=865706e4-f213-4232-847f-bcdfe8dd91cc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=5aa9915a-f0c5-4b63-8c63-da0a7e606e58&pt=Currency%20Formats&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fdata-types%2Fcurrency-formats&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/data-types/currency-formats#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/data-types/currency-formats#)
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
- [Resources](https://xrpl.org/docs/references/protocol/data-types/currency-formats#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/data-types/currency-formats#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e3ae962a64bc9326a95cdd7941924598.1759196911675.1759196911675.1759196911675.1&__hssc=78174987.1.1759196911675&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/data-types/currency-formats.md)
- [ISO 4217 Currency Codes](https://www.xe.com/iso4217.php)
- [Normalize Currency Codes](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/normalize-currency-codes)
- [ripple-lib](https://github.com/XRPLF/xrpl.js)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.e3ae962a64bc9326a95cdd7941924598.1759196911675.1759196911675.1759196911675.1&__hssc=78174987.1.1759196911675&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:48:45.357Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
