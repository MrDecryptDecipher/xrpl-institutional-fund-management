# tem Codes
URL: https://xrpl.org/docs/references/protocol/transactions/transaction-results/tem-codes
Section: J4

## Overview


## Extracted Content
# tem Codes

These codes indicate that the transaction was malformed, and cannot succeed according to the XRP Ledger protocol. They have numerical values in the range -299 to -200. The exact code for any given error is subject to change, so don't rely on it.

TipTransactions with tem codes are not applied to ledgers, and cannot cause any changes to XRP Ledger state. A tem result is final unless the rules for a valid transaction change. (For example, using functionality from an Amendment before that amendment is enabled results in temDISABLED; such a transaction could succeed later if it becomes valid when the amendment is enabled.)

`tem`

`tem`

`temDISABLED`

| Code | Explanation |
| --- | --- |
| temBAD_AMM_TOKENS | The transaction incorrectly specified one or more assets. For example, the asset's issuer does not match the corresponding asset in the AMM's pool, or the transaction specified the same asset twice. (Added by the AMM amendment) |
| temBAD_AMOUNT | An amount specified by the transaction (for example the destination Amount or SendMax values of a Payment) was invalid, possibly because it was a negative number. |
| temBAD_AUTH_MASTER | The key used to sign this transaction does not match the master key for the account sending it, and the account does not have a Regular Key set. |
| temBAD_CURRENCY | The transaction improperly specified a currency field. See Specifying Currency Amounts for the correct format. |
| temBAD_EXPIRATION | The transaction improperly specified an expiration value, for example as part of an OfferCreate transaction. Alternatively, the transaction did not specify a required expiration value, for example as part of an EscrowCreate transaction. |
| temBAD_FEE | The transaction improperly specified its Fee value, for example by listing a non-XRP currency or some negative amount of XRP. |
| temBAD_ISSUER | The transaction improperly specified the issuer field of some currency included in the request. |
| temBAD_LIMIT | The TrustSet transaction improperly specified the LimitAmount value of a trust line. |
| temBAD_NFTOKEN_TRANSFER_FEE | The NFTokenMint transaction improperly specified the TransferFee field of the transaction. (Added by the NonFungibleTokensV1_1 amendment.) |
| temBAD_OFFER | The OfferCreate transaction specifies an invalid offer, such as offering to trade XRP for itself, or offering a negative amount. |
| temBAD_PATH | The Payment transaction specifies one or more Paths improperly, for example including an issuer for XRP, or specifying an account differently. |
| temBAD_PATH_LOOP | One of the Paths in the Payment transaction was flagged as a loop, so it cannot be processed in a bounded amount of time. |
| temBAD_SEND_XRP_LIMIT | The Payment transaction used the tfLimitQuality flag in a direct XRP-to-XRP payment, even though XRP-to-XRP payments do not involve any conversions. |
| temBAD_SEND_XRP_MAX | The Payment transaction included a SendMax field in a direct XRP-to-XRP payment, even though sending XRP should never require SendMax. (XRP is only valid in SendMax if the destination Amount is not XRP.) |
| temBAD_SEND_XRP_NO_DIRECT | The Payment transaction used the tfNoDirectRipple flag for a direct XRP-to-XRP payment, even though XRP-to-XRP payments are always direct. |
| temBAD_SEND_XRP_PARTIAL | The Payment transaction used the tfPartialPayment flag for a direct XRP-to-XRP payment, even though XRP-to-XRP payments should always deliver the full amount. |
| temBAD_SEND_XRP_PATHS | The Payment transaction included Paths while sending XRP, even though XRP-to-XRP payments should always be direct. |
| temBAD_SEQUENCE | The transaction is references a sequence number that is higher than its own Sequence number, for example trying to cancel an offer that would have to be placed after the transaction that cancels it. |
| temBAD_SIGNATURE | The signature to authorize this transaction is either missing, or formed in a way that is not a properly-formed signature. (See tecNO_PERMISSION for the case where the signature is properly formed, but not authorized for this account.) |
| temBAD_SRC_ACCOUNT | The Account on whose behalf this transaction is being sent (the "source account") is not a properly-formed account address. |
| temBAD_TRANSFER_RATE | The TransferRate field of an AccountSet transaction is not properly formatted or out of the acceptable range. |
| temCANNOT_PREAUTH_SELF | The sender of the DepositPreauth transaction was also specified as the account to preauthorize. You cannot preauthorize yourself. |
| temDST_IS_SRC | The transaction improperly specified a destination address as the Account sending the transaction. This includes trust lines (where the destination address is the issuer field of LimitAmount) and payment channels (where the destination address is the Destination field). |
| temDST_NEEDED | The transaction improperly omitted a destination. This could be the Destination field of a Payment transaction, or the issuer sub-field of the LimitAmount field fo a TrustSet transaction. |
| temINVALID | The transaction is otherwise invalid. For example, the transaction ID may not be the right format, the signature may not be formed properly, or something else went wrong in understanding the transaction. |
| temINVALID_COUNT | The transaction includes a TicketCount field, but the number of Tickets specified is invalid. |
| temINVALID_FLAG | The transaction includes a Flag that does not exist, or includes a contradictory combination of flags. |
| temMALFORMED | Unspecified problem with the format of the transaction. |
| temREDUNDANT | The transaction would do nothing; for example, it is sending a payment directly to the sending account, or creating an offer to buy and sell the same currency from the same issuer. |
| temREDUNDANT_SEND_MAX |  |
| temRIPPLE_EMPTY | The Payment transaction includes an empty Paths field, but paths are necessary to complete this payment. |
| temSEQ_AND_TICKET | The transaction contains both a TicketSequence field and a non-zero Sequence value. A transaction cannot include both. (Added by the TicketBatch amendment.) |
| temBAD_WEIGHT | The SignerListSet transaction includes a SignerWeight that is invalid, for example a zero or negative value. |
| temBAD_SIGNER | The SignerListSet transaction includes a signer who is invalid. For example, there may be duplicate entries, or the owner of the SignerList may also be a member. |
| temBAD_QUORUM | The SignerListSet transaction has an invalid SignerQuorum value. Either the value is not greater than zero, or it is more than the sum of all signers in the list. |
| temUNCERTAIN | Used internally only. This code should never be returned. |
| temUNKNOWN | Used internally only. This code should never be returned. |
| temDISABLED | The transaction requires logic that is disabled. Typically this means you are trying to use an amendment that is not enabled for the current ledger. |


`temBAD_AMM_TOKENS`

`temBAD_AMOUNT`

`Amount`

`SendMax`

`temBAD_AUTH_MASTER`

`temBAD_CURRENCY`

`temBAD_EXPIRATION`

`temBAD_FEE`

`Fee`

`temBAD_ISSUER`

`issuer`

`temBAD_LIMIT`

`LimitAmount`

`temBAD_NFTOKEN_TRANSFER_FEE`

`TransferFee`

`temBAD_OFFER`

`temBAD_PATH`

`temBAD_PATH_LOOP`

`temBAD_SEND_XRP_LIMIT`

`tfLimitQuality`

`temBAD_SEND_XRP_MAX`

`SendMax`

`SendMax`

`SendMax`

`Amount`

`temBAD_SEND_XRP_NO_DIRECT`

`tfNoDirectRipple`

`temBAD_SEND_XRP_PARTIAL`

`tfPartialPayment`

`temBAD_SEND_XRP_PATHS`

`Paths`

`temBAD_SEQUENCE`

`Sequence`

`temBAD_SIGNATURE`

`tecNO_PERMISSION`

`temBAD_SRC_ACCOUNT`

`Account`

`temBAD_TRANSFER_RATE`

`TransferRate`

`temCANNOT_PREAUTH_SELF`

`temDST_IS_SRC`

`Account`

`issuer`

`LimitAmount`

`Destination`

`temDST_NEEDED`

`Destination`

`issuer`

`LimitAmount`

`TrustSet`

`temINVALID`

`temINVALID_COUNT`

`TicketCount`

`temINVALID_FLAG`

`temMALFORMED`

`temREDUNDANT`

`temREDUNDANT_SEND_MAX`

`temRIPPLE_EMPTY`

`Paths`

`temSEQ_AND_TICKET`

`TicketSequence`

`Sequence`

`temBAD_WEIGHT`

`SignerWeight`

`temBAD_SIGNER`

`temBAD_QUORUM`

`SignerQuorum`

`temUNCERTAIN`

`temUNKNOWN`

`temDISABLED`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Removed in: rippled 0.28.0](https://img.shields.io/badge/Removed in-rippled 0.28.0-red.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e2087389-3b94-42e5-ac78-023c267846fe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e2087389-3b94-42e5-ac78-023c267846fe&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e8436ae3-e37f-47ba-b986-b00054a994a2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e8436ae3-e37f-47ba-b986-b00054a994a2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=47846804-b645-46aa-af80-9475a7f215f8&bo=1&sid=655770b09da411f09092f5ba3f4cf29e&vid=6557cf109da411f0aafcb7bf0e2f3dcd&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=tem%20Codes&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&r=&lt=2691&evt=pageLoad&sv=2&cdb=AQAS&rn=575344)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cb540488-c9e9-4211-91b0-d56895be5b14&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cb540488-c9e9-4211-91b0-d56895be5b14&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bbea3bf2-734d-4d0f-8462-3e3419f08cfc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bbea3bf2-734d-4d0f-8462-3e3419f08cfc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a9564b24-ba68-451f-8452-07f9cb2c47cd&pt=tem%20Codes&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftransaction-results%2Ftem-codes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tem-codes#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tem-codes#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tem-codes#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/transaction-results/tem-codes#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/transaction-results/tem-codes.md)
- [https://github.com/XRPLF/rippled/releases/tag/0.28.0](https://github.com/XRPLF/rippled/releases/tag/0.28.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:23:16.903Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
