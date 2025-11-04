# AccountSet
URL: https://xrpl.org/docs/references/protocol/transactions/types/accountset
Section: H4

## Overview


## Extracted Content
# AccountSet

[Source]

An AccountSet transaction modifies the properties of an account in the XRP Ledger.


## Example AccountSet JSON

```
{
    "TransactionType": "AccountSet",
    "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "Fee": "12",
    "Sequence": 5,
    "Domain": "6578616D706C652E636F6D",
    "SetFlag": 5,
    "MessageKey": "03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB"
}
```


## AccountSet Fields

In addition to the common fields, AccountSet transactions use the following fields:

| Field | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| ClearFlag | Number | UInt32 | Unique identifier of a flag to disable for this account. |
| Domain | String | Blob | The domain that owns this account, as a string of hex representing the ASCII for the domain in lowercase. Cannot be more than 256 bytes in length. |
| EmailHash | String | UInt128 | An arbitrary 128-bit value. Conventionally, clients treat this as the md5 hash of an email address to use for displaying a Gravatar image. |
| MessageKey | String | Blob | Public key for sending encrypted messages to this account. To set the key, it must be exactly 33 bytes, with the first byte indicating the key type: 0x02 or 0x03 for secp256k1 keys, 0xED for Ed25519 keys. To remove the key, use an empty value. |
| NFTokenMinter | String - Address | AccountID | Another account that can mint NFTokens for you. (Added by the NonFungibleTokensV1_1 amendment.) |
| SetFlag | Number | UInt32 | Integer flag to enable for this account. |
| TransferRate | Number | UInt32 | The fee to charge when users transfer this account's tokens, represented as billionths of a unit. Cannot be more than 2000000000 or less than 1000000000, except for the special case 0 meaning no fee. |
| TickSize | Number | UInt8 | (Optional) Tick size to use for offers involving a currency issued by this address. The exchange rates of those offers is rounded to this many significant digits. Valid values are 3 to 15 inclusive, or 0 to disable. (Added by the TickSize amendment) |
| WalletLocator | String | UInt256 | An arbitrary 256-bit value. If specified, the value is stored as part of the account but has no inherent meaning or requirements. |
| WalletSize | Number | UInt32 | Not used. This field is valid in AccountSet transactions but does nothing. |


`ClearFlag`

`Domain`

`EmailHash`

`MessageKey`

`0x02`

`0x03`

`0xED`

`NFTokenMinter`

`SetFlag`

`TransferRate`

`2000000000`

`1000000000`

`0`

`TickSize`

`3`

`15`

`0`

`WalletLocator`

`WalletSize`

(All fields are optional.)

If none of these options are provided, then the AccountSet transaction has no effect (beyond destroying the transaction cost). See Cancel or Skip a Transaction for more details.


## Domain

The Domain field is represented as the hex string of the lowercase ASCII of the domain. For example, the domain example.com would be represented as "6578616D706C652E636F6D".

`Domain`

`"6578616D706C652E636F6D"`

To remove the Domain field from an account, send an AccountSet with the Domain set to an empty string.

`Domain`

You can put any domain in your account's Domain field. To prove that an account and domain belong to the same person or business, you need a "two-way link":

`Domain`

- Accounts you own should have a domain you own in the Domain field.
- At that domain, host an xrp-ledger.toml file listing accounts you own, and optionally other information about how you use the XRP Ledger.

`Domain`


## AccountSet Flags

There are several options which can be either enabled or disabled for an account. Account options are represented by different types of flags depending on the situation:

- The AccountSet transaction type has several "AccountSet Flags" (prefixed asf) that can enable an option when passed as the SetFlag parameter, or disable an option when passed as the ClearFlag parameter. Newer options have only this style of flag. You can enable up to one asf flag per transaction, and disable up to one asf flag per transaction.
- The AccountSet transaction type has several transaction flags (prefixed tf) that can be used to enable or disable specific account options when passed in the Flags parameter. You can enable and disable a combination of settings in one transaction using multiple tf flags, but not all settings have tf flags.
- The AccountRoot ledger object type has several ledger-state-flags (prefixed lsf) which represent the state of particular account options within a particular ledger. These settings apply until a transaction changes them.

`AccountSet`

`asf`

`SetFlag`

`ClearFlag`

`asf`

`asf`

`AccountSet`

`tf`

`Flags`

`tf`

`tf`

`AccountRoot`

`lsf`

To enable or disable Account Flags, use the SetFlag and ClearFlag parameters of an AccountSet transaction. AccountSet flags have names that begin with asf.

`SetFlag`

`ClearFlag`

`asf`

All flags are disabled by default.

The available AccountSet flags are:

| Flag Name | Decimal Value | Description |
| --- | --- | --- |
| asfAccountTxnID | 5 | Track the ID of this account's most recent transaction. Required for AccountTxnID |
| asfAllowTrustLineClawback | 16 | Allow account to claw back tokens it has issued. (Requires the Clawback amendment.) Can only be set if the account has an empty owner directory (no trust lines, offers, escrows, payment channels, checks, or signer lists). After you set this flag, it cannot be reverted. The account permanently gains the ability to claw back issued assets on trust lines. |
| asfAuthorizedNFTokenMinter | 10 | Enable to allow another account to mint non-fungible tokens (NFTokens) on this account's behalf. Specify the authorized account in the NFTokenMinter field of the AccountRoot object. To remove an authorized minter, enable this flag and omit the NFTokenMinter field. (Added by the NonFungibleTokensV1_1 amendment.) |
| asfDefaultRipple | 8 | Enable rippling on this account's trust lines by default. |
| asfDepositAuth | 9 | Enable Deposit Authorization on this account. (Added by the DepositAuth amendment.) |
| asfDisableMaster | 4 | Disallow use of the master key pair. Can only be enabled if the account has configured another way to sign transactions, such as a Regular Key or a Signer List. |
| asfDisallowIncomingCheck | 13 | Block incoming Checks. (Requires the DisallowIncoming amendment.) |
| asfDisallowIncomingNFTokenOffer | 12 | Block incoming NFTokenOffers. (Requires the DisallowIncoming amendment.) |
| asfDisallowIncomingPayChan | 14 | Block incoming Payment Channels. (Requires the DisallowIncoming amendment.) |
| asfDisallowIncomingTrustline | 15 | Block incoming trust lines. (Requires the DisallowIncoming amendment.) |
| asfDisallowXRP | 3 | XRP should not be sent to this account. (Advisory; not enforced by the XRP Ledger protocol.) |
| asfGlobalFreeze | 7 | Freeze all assets issued by this account. |
| asfNoFreeze | 6 | Permanently give up the ability to freeze individual trust lines or disable Global Freeze. This flag can never be disabled after being enabled. |
| asfRequireAuth | 2 | Require authorization for users to hold balances issued by this address. Can only be enabled if the address has no trust lines connected to it. |
| asfRequireDest | 1 | Require a destination tag to send transactions to this account. |


`asfAccountTxnID`

`AccountTxnID`

`asfAllowTrustLineClawback`

`asfAuthorizedNFTokenMinter`

`NFTokenMinter`

`NFTokenMinter`

`asfDefaultRipple`

`asfDepositAuth`

`asfDisableMaster`

`asfDisallowIncomingCheck`

`asfDisallowIncomingNFTokenOffer`

`asfDisallowIncomingPayChan`

`asfDisallowIncomingTrustline`

`asfDisallowXRP`

`asfGlobalFreeze`

`asfNoFreeze`

`asfRequireAuth`

`asfRequireDest`

For reference, here are the corresponding ledger flags for each AccountSet flag:

| AccountSet Flag Name | Corresponding Ledger Flag |
| --- | --- |
| asfAccountTxnID | (None) |
| asfAllowTrustLineClawback | lsfAllowTrustlineClawback |
| asfAuthorizedNFTokenMinter | (None) |
| asfDefaultRipple | lsfDefaultRipple |
| asfDepositAuth | lsfDepositAuth |
| asfDisableMaster | lsfDisableMaster |
| asfDisallowIncomingCheck | lsfDisallowIncomingCheck |
| asfDisallowIncomingNFTokenOffer | lsfDisallowIncomingNFTokenOffer |
| asfDisallowIncomingPayChan | lsfDisallowIncomingPayChan |
| asfDisallowIncomingTrustline | lsfDisallowIncomingTrustline |
| asfDisallowXRP | lsfDisallowXRP |
| asfGlobalFreeze | lsfGlobalFreeze |
| asfNoFreeze | lsfNoFreeze |
| asfRequireAuth | lsfRequireAuth |
| asfRequireDest | lsfRequireDestTag |


`asfAccountTxnID`

`asfAllowTrustLineClawback`

`lsfAllowTrustlineClawback`

`asfAuthorizedNFTokenMinter`

`asfDefaultRipple`

`lsfDefaultRipple`

`asfDepositAuth`

`lsfDepositAuth`

`asfDisableMaster`

`lsfDisableMaster`

`asfDisallowIncomingCheck`

`lsfDisallowIncomingCheck`

`asfDisallowIncomingNFTokenOffer`

`lsfDisallowIncomingNFTokenOffer`

`asfDisallowIncomingPayChan`

`lsfDisallowIncomingPayChan`

`asfDisallowIncomingTrustline`

`lsfDisallowIncomingTrustline`

`asfDisallowXRP`

`lsfDisallowXRP`

`asfGlobalFreeze`

`lsfGlobalFreeze`

`asfNoFreeze`

`lsfNoFreeze`

`asfRequireAuth`

`lsfRequireAuth`

`asfRequireDest`

`lsfRequireDestTag`

To enable the asfDisableMaster or asfNoFreeze flags, you must authorize the transaction by signing it with the master key pair. You cannot use a regular key pair or a multi-signature. You can disable asfDisableMaster (that is, re-enable the master key pair) using a regular key pair or multi-signature.

`asfDisableMaster`

`asfNoFreeze`

`asfDisableMaster`

The following Transaction flags (tf flags), specific to the AccountSet transaction type, serve the same purpose. Due to limited space, some settings do not have associated tf flags, and new tf flags are not being added to the AccountSet transaction type. You can use a combination of tf and asf flags to enable multiple settings with a single transaction.

`tf`

`tf`

`tf`

`AccountSet`

`tf`

`asf`

| Flag Name | Hex Value | Decimal Value | Replaced by AccountSet Flag |
| --- | --- | --- | --- |
| tfRequireDestTag | 0x00010000 | 65536 | asfRequireDest (SetFlag) |
| tfOptionalDestTag | 0x00020000 | 131072 | asfRequireDest (ClearFlag) |
| tfRequireAuth | 0x00040000 | 262144 | asfRequireAuth (SetFlag) |
| tfOptionalAuth | 0x00080000 | 524288 | asfRequireAuth (ClearFlag) |
| tfDisallowXRP | 0x00100000 | 1048576 | asfDisallowXRP (SetFlag) |
| tfAllowXRP | 0x00200000 | 2097152 | asfDisallowXRP (ClearFlag) |


`tfRequireDestTag`

`0x00010000`

`asfRequireDest`

`SetFlag`

`tfOptionalDestTag`

`0x00020000`

`asfRequireDest`

`ClearFlag`

`tfRequireAuth`

`0x00040000`

`asfRequireAuth`

`SetFlag`

`tfOptionalAuth`

`0x00080000`

`asfRequireAuth`

`ClearFlag`

`tfDisallowXRP`

`0x00100000`

`asfDisallowXRP`

`SetFlag`

`tfAllowXRP`

`0x00200000`

`asfDisallowXRP`

`ClearFlag`

CautionThe numeric values of tf and asf flags in transactions do not match up with the values they set in the accounts "at rest" in the ledger. To read the flags of an account in the ledger, see AccountRoot flags.

`tf`

`asf`

`AccountRoot`


### Blocking Incoming Transactions

Incoming transactions with unclear purposes may be an inconvenience for financial institutions, who would have to recognize when a customer made a mistake, and then potentially refund accounts or adjust balances depending on the mistake. The asfRequireDest and asfDisallowXRP flags are intended to protect users from accidentally sending funds in a way that is unclear about the reason the funds were sent.

`asfRequireDest`

`asfDisallowXRP`

For example, a destination tag is typically used to identify which hosted balance should be credited when a financial institution receives a payment. If the destination tag is omitted, it may be unclear which account should be credited, creating a need for refunds, among other problems. By using the asfRequireDest tag, you can ensure that every incoming payment has a destination tag, which makes it harder for others to send you an ambiguous payment by accident.

`asfRequireDest`

You can protect against unwanted incoming payments for non-XRP currencies by not creating trust lines in those currencies. Since XRP does not require trust, the asfDisallowXRP flag is used to discourage users from sending XRP to an account. However, this flag is not enforced in the XRP Ledger protocol because it could potentially cause accounts to become unusable if they run out of XRP. Instead, client applications should disallow or discourage XRP payments to accounts with the asfDisallowXRP flag enabled.

`asfDisallowXRP`

`asfDisallowXRP`

If you want to block all incoming payments, you can enable Deposit Authorization. This prevents any transaction from sending money to you, even XRP, unless your account is below the reserve requirement.

If the DisallowIncoming amendment is enabled, you also have the option to block all incoming Checks, NFTokenOffers, Payment Channels, and trust lines. It is generally harmless to be on the receiving end of these objects, but they can block you from deleting your account and it can be confusing to have objects you didn't expect mixed in with the list of objects you created. To block incoming objects, use one or more of these account flags:

- asfDisallowIncomingCheck - for Check objects
- asfDisallowIncomingNFTOffer - for NFTokenOffer objects
- asfDisallowIncomingPayChan - for PayChannel objects
- asfDisallowIncomingTrustline - for RippleState (trust line) objects

`asfDisallowIncomingCheck`

`asfDisallowIncomingNFTOffer`

`asfDisallowIncomingPayChan`

`asfDisallowIncomingTrustline`

When a transaction would create one of these ledger entries, if the destination account has the corresponding flag enabled, the transaction fails with the result code tecNO_PERMISSION. Unlike Deposit Authorization, these settings do not prevent you from receiving payments in general. Also, enabling this setting doesn't stop you from creating these types of objects yourself (unless the destination of your transaction is also using the setting, of course).

`tecNO_PERMISSION`


## TransferRate

The TransferRate field specifies a fee to charge whenever counterparties transfer the currency you issue.

`TransferRate`

In the HTTP and WebSocket APIs, the transfer fee is represented as an integer, the amount that must be sent for 1 billion units to arrive. For example, a 20% transfer fee is represented as the value 1200000000.  The value cannot be less than 1000000000. (Less than that would indicate giving away money for sending transactions, which is exploitable.) You can specify 0 as a shortcut for 1000000000, meaning no fee.

`1200000000`

`0`

`1000000000`

See Transfer Fees for more information.


## NFTokenMinter

To remove an authorized minter, set ClearFlag to 10 (asfAuthorizedNFTokenMinter) and omit the NFTokenMinter field.

`ClearFlag`

`asfAuthorizedNFTokenMinter`

`NFTokenMinter`


## See Also

- AccountRoot entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5fb790cb-e4a1-4053-bd55-2d43262b50e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5fb790cb-e4a1-4053-bd55-2d43262b50e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8522d7f9-87bf-46a3-8be6-86d2dc70a6e9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8522d7f9-87bf-46a3-8be6-86d2dc70a6e9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=8c92feb1-9704-4eb8-953c-7e6db8ae75ac&bo=1&sid=6ceee0109da111f0ae0c235fa64439bd&vid=6cef4d009da111f0ab475b13fcc1ba09&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AccountSet&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&r=&lt=2507&evt=pageLoad&sv=2&cdb=AQAS&rn=720242)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c55ce42a-9e6e-467a-a122-28592fe5ebd9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c55ce42a-9e6e-467a-a122-28592fe5ebd9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a59c3c25-7568-4c5e-b31c-5de13b0887f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a59c3c25-7568-4c5e-b31c-5de13b0887f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=86c09967-ebf2-45db-a429-3c8795a8a838&pt=AccountSet&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Faccountset&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/accountset#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/accountset#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/accountset#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/accountset#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.191c12bd1eb99b2396c37099800b18c5.1759197711073.1759197711073.1759197711073.1&__hssc=78174987.1.1759197711073&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/accountset.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/xrpld/app/tx/detail/SetAccount.cpp)
- [Cannot be more than 256 bytes in length.](https://github.com/XRPLF/rippled/blob/55dc7a252e08a0b02cd5aa39e9b4777af3eafe77/src/ripple/app/tx/impl/SetAccount.h#L34)
- [Gravatar](http://en.gravatar.com/site/implement/hash/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.191c12bd1eb99b2396c37099800b18c5.1759197711073.1759197711073.1759197711073.1&__hssc=78174987.1.1759197711073&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:02:06.487Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
