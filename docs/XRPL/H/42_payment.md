# Payment
URL: https://xrpl.org/docs/references/protocol/transactions/types/payment
Section: H42

## Overview


## Extracted Content
# Payment

[Source]

A Payment transaction represents a transfer of value from one account to another. (Depending on the path taken, this can involve additional exchanges of value, which occur atomically.) This transaction type can be used for several types of payments.

Payments are also the only way to create accounts.


## Example Payment JSON

```
{
  "TransactionType" : "Payment",
  "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "Destination" : "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
  "DeliverMax" : {
     "currency" : "USD",
     "value" : "1",
     "issuer" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
  },
  "Fee": "12",
  "Flags": 2147483648,
  "Sequence": 2,
}
```


## Payment Fields

In addition to the common fields, Payment transactions use the following fields:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amount | Currency Amount | Amount | API v1: Yes | Alias to DeliverMax. |
| CredentialIDs | Array of Strings | Vector256 | No | Set of Credentials to authorize a deposit made by this transaction. Each member of the array must be the ledger entry ID of a Credential entry in the ledger. (Requires the Credentials amendment. )_ |
| DeliverMax | Currency Amount | Amount | Yes | API v2: The maximum amount of currency to deliver. Partial payments can deliver less than this amount and still succeed; other payments fail unless they deliver the exact amount. |
| DeliverMin | Currency Amount | Amount | No | Minimum amount of destination currency this transaction should deliver. Only valid if this is a partial payment. |
| Destination | String - Address | AccountID | Yes | The account receiving the payment. |
| DestinationTag | Number | UInt32 | No | Arbitrary tag that identifies the reason for the payment to the destination, or a hosted recipient to pay. |
| DomainID | String - Hash | UInt256 | No | The ledger entry ID of a permissioned domain. If this is a cross-currency payment, only use the corresponding permissioned DEX to convert currency. Both the sender and the recipient must have valid credentials that grant access to the specified domain. This field has no effect if the payment is not cross-currency. (Requires the PermissionedDEX amendment ) |
| InvoiceID | String - Hexadecimal | UInt256 | No | Arbitrary 256-bit value representing a specific reason or identifier for this payment. |
| Paths | Array of path arrays | PathSet | No | (Auto-fillable) Array of payment paths to be used for this transaction. Must be omitted for XRP-to-XRP transactions. |
| SendMax | Currency Amount | Amount | No | Highest amount of source currency this transaction is allowed to cost, including transfer fees, exchange rates, and slippage. Does not include the XRP destroyed as a cost for submitting the transaction. Must be supplied for cross-currency/cross-issue payments. Must be omitted for XRP-to-XRP payments. |


`Amount`

`DeliverMax`

`CredentialIDs`

`DeliverMax`

`DeliverMin`

`Destination`

`DestinationTag`

`DomainID`

`InvoiceID`

`Paths`

`SendMax`

When specifying a transaction, you must specify either Amount or DeliverMax, but not both. When displaying transactions in JSON, API v1 always uses Amount and API v2 (or later) always uses DeliverMax.

`Amount`

`DeliverMax`

`Amount`

`DeliverMax`


## Types of Payments

The Payment transaction type functions differently depending on how you fill in the Payment fields:

`Payment`

`Payment`

| Payment type | Amount | SendMax | Paths | Account = Destination? | Description |
| --- | --- | --- | --- | --- | --- |
| Direct XRP Payment | String (XRP) | Omitted | Omitted | No | Transfers XRP directly from one account to another, using one transaction. Always delivers the exact amount. No fee applies other than the basic transaction cost. |
| Creating or redeeming tokens | Object | Object (optional) | Optional | No | Increases or decreases the amount of a non-XRP currency or asset tracked in the XRP Ledger. Transfer fees and freezes do not apply when sending and redeeming directly. |
| Cross-currency Payment | Object (non-XRP) / String (XRP) | Object (non-XRP) / String (XRP) | Usually required | No | Send tokens from one holder to another. The Amount or SendMax can be XRP or tokens, but can't both be XRP. These payments ripple through the issuer and can take longer paths through several intermediaries if the transaction specifies a path set. Transfer fees set by the issuer(s) apply to this type of transaction. These transactions consume offers in the decentralized exchange to connect different currencies, or currencies with the same currency code and different issuers. |
| Partial payment | Object (non-XRP) / String (XRP) | Object (non-XRP) / String (XRP) | Usually required | No | Sends up to a specific amount of any currency. Uses the tfPartialPayment flag. May include a DeliverMin amount specifying the minimum that the transaction must deliver to be successful; if the transaction does not specify DeliverMin, it can succeed by delivering any positive amount. |
| Currency conversion | Object (non-XRP) / String (XRP) | Object (non-XRP) / String (XRP) | Required | Yes | Consumes offers in the decentralized exchange to convert one currency to another, possibly taking arbitrage opportunities. The Amount and SendMax cannot both be XRP. Also called a circular payment because it delivers money to the sender. This type of transaction may be classified as an "exchange" and not a "payment". |
| MPT Payment | Object | Omitted | Omitted | No | Send MPTs to a holder. See MPT Payments. |


`Amount`

`SendMax`

`Paths`

`Account`

`Destination`

`Amount`

`SendMax`

`tfPartialPayment`

`DeliverMin`

`DeliverMin`

`Amount`

`SendMax`


## Special issuer Values for SendMax and Amount

Most of the time, the issuer field of a non-XRP Currency Amount indicates the issuer of a token. However, when describing payments, there are special rules for the issuer field in the DeliverMax (or Amount) and SendMax fields of a payment.

`issuer`

`issuer`

`DeliverMax`

`Amount`

`SendMax`

- There is only ever one balance between two addresses for the same currency code. This means that, sometimes, the issuer field of an amount actually refers to a counterparty, instead of the address that issued the token.
- When the issuer field of the destination DeliverMax field matches the Destination address, it is treated as a special case meaning "any issuer that the destination accepts." This includes all addresses to which the destination has trust lines with a positive limit, as well as tokens issued by the destination itself.
- When the issuer field of the SendMax field matches the source account's address, it is treated as a special case meaning "any issuer that the source can use." The payment can send tokens the source account already holds, or issue new tokens to others who have trust lines with the source account.

`issuer`

`issuer`

`DeliverMax`

`Destination`

`issuer`

`SendMax`

In all of these cases, the currency code must still match exactly.


## Creating Accounts

The Payment transaction type can create new accounts in the XRP Ledger by sending enough XRP to an unfunded address. Other transactions to unfunded addresses always fail.

For more information, see Creating Accounts.


## Paths

If present, the Paths field must contain a path set - an array of path arrays. Each individual path represents one way value can flow from the sender to receiver through various intermediary accounts, order books, and automated market makers. A single transaction can potentially use multiple paths, for example if the transaction exchanges currency using several different order books to achieve the best rate.

`Paths`

You must omit the Paths field for direct payments, including:

`Paths`

- An XRP-to-XRP transfer.
- A direct transfer on a trust line that connects the sender and receiver.

If the Paths field is provided, the server decides at transaction processing time which paths to use, from the provided set plus a default path (the most direct way possible to connect the specified accounts). This decision is deterministic and attempts to minimize costs, but it is not guaranteed to be perfect.

`Paths`

The Paths field must not be an empty array, nor an array whose members are all empty arrays.

`Paths`

For more information, see Paths.


## Payment Flags

Transactions of the Payment type support additional values in the Flags field, as follows:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfNoRippleDirect | 0x00010000 | 65536 | Do not use the default path; only use paths included in the Paths field. This is intended to force the transaction to take arbitrage opportunities. Most clients do not need this. |
| tfPartialPayment | 0x00020000 | 131072 | If the specified Amount cannot be sent without spending more than SendMax, reduce the received amount instead of failing outright. See Partial Payments for more details. |
| tfLimitQuality | 0x00040000 | 262144 | Only take paths where all the conversions have an input:output ratio that is equal or better than the ratio of Amount:SendMax. See Limit Quality for details. |


`tfNoRippleDirect`

`0x00010000`

`Paths`

`tfPartialPayment`

`0x00020000`

`Amount`

`SendMax`

`tfLimitQuality`

`0x00040000`

`Amount`

`SendMax`


## Partial Payments

A partial payment allows a payment to succeed by reducing the amount received. Partial payments are useful for returning payments without incurring additional costs to oneself. However, partial payments can also be used to exploit integrations that naively assume the Amount field of a successful transaction always describes the exact amount delivered. To reduce confusion, Amount has been renamed to DeliverMax in API v2 and later.

`Amount`

`Amount`

`DeliverMax`

A partial payment is any Payment transaction with the tfPartialPayment flag enabled. A partial payment can be successful if it delivers any positive amount greater than or equal to its DeliverMin field (or any positive amount at all if DeliverMin is not specified) without sending more than the SendMax value.

`tfPartialPayment`

`DeliverMin`

`DeliverMin`

`SendMax`

The delivered_amount field of a payment's metadata indicates the amount of currency actually received by the destination account.

`delivered_amount`

For more information, see the full article on Partial Payments.


## Limit Quality

The XRP Ledger defines the "quality" of a currency exchange as the ratio of the numeric amount in to the numeric amount out. For example, if you spend $2 USD to receive £1 GBP, then the "quality" of that exchange is 0.5.

`0.5`

The tfLimitQuality flag allows you to set a minimum quality of conversions that you are willing to take. This limit quality is defined as the destination Amount divided by the SendMax amount (the numeric amounts only, regardless of currency). When set, the payment processing engine avoids using any paths whose quality (conversion rate) is worse (numerically lower) than the limit quality.

`tfLimitQuality`

`Amount`

`SendMax`

By itself, the tfLimitQuality flag reduces the number of situations in which a transaction can succeed. Specifically, it rejects payments where some part of the payment uses an unfavorable conversion, even if the overall average quality of conversions in the payment is equal or better than the limit quality. If a payment is rejected in this way, the transaction result is tecPATH_DRY.

`tfLimitQuality`

`tecPATH_DRY`

Consider the following example. If I am trying to send you 100 Chinese Yuan (Amount = 100 CNY) for 20 United States dollars (SendMax = 20 USD) or less, then the limit quality is 5. Imagine one trader is offering ¥95 for $15 (a ratio of about 6.3 CNY per USD), but the next best offer in the market is ¥5 for $2 (a ratio of 2.5 CNY per USD). If I were to take both offers to send you 100 CNY, then it would cost me 17 USD, for an average quality of about 5.9.

`Amount`

`SendMax`

`5`

`6.3`

`2.5`

`5.9`

Without the tfLimitQuality flag set, this transaction would succeed, because the $17 it costs me is within my specified SendMax. However, with the tfLimitQuality flag enabled, the transaction would fail instead, because the path to take the second offer has a quality of 2.5, which is worse than the limit quality of 5.

`tfLimitQuality`

`SendMax`

`tfLimitQuality`

`2.5`

`5`

The tfLimitQuality flag is most useful when combined with partial payments. When both tfPartialPayment and tfLimitQuality are set on a transaction, then the transaction delivers as much of the destination Amount as it can, without using any conversions that are worse than the limit quality.

`tfLimitQuality`

`tfPartialPayment`

`tfLimitQuality`

`Amount`

In the above example with a ¥95/$15 offer and a ¥5/$2 offer, the situation is different if my transaction has both tfPartialPayment and tfLimitQuality enabled. If we keep my SendMax of 20 USD and a destination Amount of 100 CNY, then the limit quality is still 5. However, because I am doing a partial payment, the transaction sends as much as it can instead of failing if the full destination amount cannot be sent. This means that my transaction consumes the ¥95/$15 offer, whose quality is about 6.3, but it rejects the ¥5/$2 offer because that offer's quality of 2.5 is worse than the quality limit of 5. In the end, my transaction only delivers ¥95 instead of the full ¥100, but it avoids wasting money on poor exchange rates.

`tfPartialPayment`

`tfLimitQuality`

`SendMax`

`Amount`

`5`

`6.3`

`2.5`

`5`


## MPT Payments

(Requires the MPTokensV1 amendment )

When you send a payment using MPTs, the Amount field requires only the mpt_issuance_id and the value. The MPTokenIssuanceID is used to uniquely identify the MPT for the transaction.

`mpt_issuance_id`

`value`

`MPTokenIssuanceID`

Version 1 MPTokens only support direct MPT payment between accounts. They cannot be traded in the decentralized exchange.


### Sample MPT Payment transaction

```
{
   "Account": "rLWSJKbwYSzG32JuGissYd66MFTvfMk4Bt",
   "Amount": {
      "mpt_issuance_id": "006419063CEBEB49FC20032206CE0F203138BFC59F1AC578",
      "value": "100"
   },
   "DeliverMax": {
      "mpt_issuance_id": "006419063CEBEB49FC20032206CE0F203138BFC59F1AC578",
      "value": "100"
   },
   "SendMax": {
      "mpt_issuance_id": "006419063CEBEB49FC20032206CE0F203138BFC59F1AC578",
      "value": "100"
   },
   "Destination": "raZ3wTTKiMHn3BiStvz4ET9rbCHfU1DMak",
   "Fee": "120",
   "Flags": 0,
}
```


## Credential IDs

(Requires the Credentials amendment )

You can send money to an account that uses Deposit Authorization by providing the CredentialIDs field with an exact set of credentials that are preauthorized by the recipient. The set of credentials must match a DepositPreauth entry in the ledger.

`CredentialIDs`

The credentials provided in the CredentialIDs field must all be valid, meaning:

`CredentialIDs`

- The provided credentials must exist.
- The provided credentials must have been accepted by the subject.
- None of the provided credentials may be expired.
- The sender of this transaction must be the subject of each of the credentials.

If you provide credentials even though the destination account does not use Deposit Authorization, the credentials are not needed but they are still checked for validity.

The CredentialIDs field is only used for deposit authorization, not for trading in a permissioned DEX, even though Permissioned DEXes also use credentials to grant access. To trade in a permissioned DEX, you use the DomainID field to specify a domain for which you hold valid credentials.

`CredentialIDs`

`DomainID`


## Special Case for Destination Accounts Below the Reserve

If an account has Deposit Authorization enabled, but its current XRP balance is less than the reserve requirement, there is a special exception to Deposit Authorization where anyone can send a Payment transaction, without preauthorization, for up to the base account reserve; this exists as an emergency measure to prevent an account from getting "stuck" without enough XRP to transact. To qualify for this special case, the payment MUST NOT use the CredentialIDs field.

`CredentialIDs`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![New in: rippled 2.0.0](https://img.shields.io/badge/New in-rippled 2.0.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44f6e78c-6f1e-4148-a56e-037cb0e974f7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=44f6e78c-6f1e-4148-a56e-037cb0e974f7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9db26bcf-eeef-4ab4-b1f1-2dc92f756a67&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9db26bcf-eeef-4ab4-b1f1-2dc92f756a67&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=098a2cfe-4dac-42b1-979d-056fc3e5c913&bo=1&sid=419042b09da311f09ce6cb4db2dc4645&vid=4190a8109da311f0803fc7663652f143&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Payment&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&r=&lt=3027&evt=pageLoad&sv=2&cdb=AQAS&rn=87900)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b8b5d527-a920-4ae1-9e4d-808bcf40b40e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b8b5d527-a920-4ae1-9e4d-808bcf40b40e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=371e153c-d5f6-4236-aee0-b4141d58e3f6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=371e153c-d5f6-4236-aee0-b4141d58e3f6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bfec56c7-9b29-4f20-8d64-34a6aa9eae74&pt=Payment&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fpayment&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/payment#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/payment#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/payment#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/payment#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6ac2b5cfadd96022cd286d19bd9e2a73.1759198495064.1759198495064.1759198495064.1&__hssc=78174987.1.1759198495064&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/payment.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/Payment.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/2.0.0](https://github.com/XRPLF/rippled/releases/tag/2.0.0)
- [slippage](http://en.wikipedia.org/wiki/Slippage_%28finance%29)
- [arbitrage](https://en.wikipedia.org/wiki/Arbitrage)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.6ac2b5cfadd96022cd286d19bd9e2a73.1759198495064.1759198495064.1759198495064.1&__hssc=78174987.1.1759198495064&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:15:14.952Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
