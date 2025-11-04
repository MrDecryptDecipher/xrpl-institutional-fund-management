# AccountRoot
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/accountroot
Section: G10

## Overview


## Extracted Content
# AccountRoot

[Source]

An AccountRoot ledger entry type describes a single account, its settings, and XRP balance. You can create a new account by sending a Payment transaction with enough XRP to a mathematically-valid address.

`AccountRoot`


## Example AccountRoot JSON

```
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "AccountTxnID": "0D5FB50FA65C9FE1538FD7E398FFFE9D1908DFA4576D8D7A020040686F93C77D",
    "Balance": "148446663",
    "Domain": "6D64756F31332E636F6D",
    "EmailHash": "98B4375E1D753E5B91627516F6D70977",
    "Flags": 8388608,
    "LedgerEntryType": "AccountRoot",
    "MessageKey": "0000000000000000000000070000000300",
    "OwnerCount": 3,
    "PreviousTxnID": "0D5FB50FA65C9FE1538FD7E398FFFE9D1908DFA4576D8D7A020040686F93C77D",
    "PreviousTxnLgrSeq": 14091160,
    "Sequence": 336,
    "TransferRate": 1004999999,
    "index": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8"
}
```


## AccountRoot Fields

In addition to the common fields, AccountRoot entries have the following fields:

`AccountRoot`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | AccountID | Yes | The identifying (classic) address of this account. |
| AccountTxnID | String | UInt256 | No | The identifying hash of the transaction most recently sent by this account. This field must be enabled to use the AccountTxnID transaction field. To enable it, send an AccountSet transaction with the asfAccountTxnID flag enabled. |
| AMMID | String | UInt256 | No | (Added by the AMM amendment) The ledger entry ID of the corresponding AMM ledger entry. Set during account creation; cannot be modified. If present, indicates that this is a special AMM AccountRoot; always omitted on non-AMM accounts. |
| Balance | String | Amount | No | The account's current XRP balance in drops, represented as a string. |
| BurnedNFTokens | Number | UInt32 | No | How many total of this account's issued non-fungible tokens have been burned. This number is always equal or less than MintedNFTokens. |
| Domain | String | Blob | No | A domain associated with this account. In JSON, this is the hexadecimal for the ASCII representation of the domain. Cannot be more than 256 bytes in length. |
| EmailHash | String | UInt128 | No | The md5 hash of an email address. Clients can use this to look up an avatar through services such as Gravatar. |
| FirstNFTokenSequence | Number | UInt32 | No | The account's Sequence Number at the time it minted its first non-fungible-token. (Added by the fixNFTokenRemint amendment) |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0061, mapped to the string AccountRoot, indicates that this is an AccountRoot object. |
| MessageKey | String | Blob | No | A public key that may be used to send encrypted messages to this account. In JSON, uses hexadecimal. Must be exactly 33 bytes, with the first byte indicating the key type: 0x02 or 0x03 for secp256k1 keys, 0xED for Ed25519 keys. |
| MintedNFTokens | Number | UInt32 | No | How many total non-fungible tokens have been minted by and on behalf of this account. (Added by the NonFungibleTokensV1_1 amendment) |
| NFTokenMinter | String | AccountID | No | Another account that can mint non-fungible tokens on behalf of this account. (Added by the NonFungibleTokensV1_1 amendment) |
| OwnerCount | Number | UInt32 | Yes | The number of objects this account owns in the ledger, which contributes to its owner reserve. |
| PreviousTxnID | String | UInt256 | Yes | The identifying hash of the transaction that most recently modified this object. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |
| RegularKey | String | AccountID | No | The address of a key pair that can be used to sign transactions for this account instead of the master key. Use a SetRegularKey transaction to change this value. |
| Sequence | Number | UInt32 | Yes | The sequence number of the next valid transaction for this account. |
| TicketCount | Number | UInt32 | No | How many Tickets this account owns in the ledger. This is updated automatically to ensure that the account stays within the hard limit of 250 Tickets at a time. This field is omitted if the account has zero Tickets. (Added by the TicketBatch amendment.) |
| TickSize | Number | UInt8 | No | How many significant digits to use for exchange rates of Offers involving currencies issued by this address. Valid values are 3 to 15, inclusive. (Added by the TickSize amendment.) |
| TransferRate | Number | UInt32 | No | A transfer fee to charge other users for sending currency issued by this account to each other. |
| WalletLocator | String | UInt256 | No | An arbitrary 256-bit value that users can set. |
| WalletSize | Number | UInt32 | No | Unused. (The code supports this field but there is no way to set it.) |


`Account`

`AccountTxnID`

`AccountTxnID`

`asfAccountTxnID`

`AMMID`

`Balance`

`BurnedNFTokens`

`MintedNFTokens`

`Domain`

`EmailHash`

`FirstNFTokenSequence`

`LedgerEntryType`

`0x0061`

`AccountRoot`

`MessageKey`

`0x02`

`0x03`

`0xED`

`MintedNFTokens`

`NFTokenMinter`

`OwnerCount`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`RegularKey`

`Sequence`

`TicketCount`

`TickSize`

`3`

`15`

`TransferRate`

`WalletLocator`

`WalletSize`


## Special AMM AccountRoot Entries

(Added by the AMM amendment)

Automated Market Makers use an AccountRoot ledger entry to issue their LP Tokens and hold the assets in the AMM pool, and an AMM ledger entry for tracking some of the details of the AMM. The address of an AMM's AccountRoot is randomized so that users cannot identify and fund the address in advance of the AMM being created. Unlike normal accounts, AMM AccountRoot objects are created with the following settings:

- lsfDisableMaster enabled and no means of authorizing transactions. This ensures no one can control the account directly, and it cannot send transactions.
- lsfDepositAuth enabled and no accounts preauthorized. This ensures that the only way to add money to the AMM Account is using the AMMDeposit transaction.
- lsfDefaultRipple enabled. This ensures that users can send and trade the AMM's LP Tokens among themselves.

`lsfDisableMaster`

`lsfDepositAuth`

`lsfDefaultRipple`

In addition, the following special rules apply to an AMM's AccountRoot entry:

- It is not subject to the reserve requirement. It can hold XRP only if XRP is one of the two assets in the AMM's pool.
- It cannot be the destination of Checks, Escrows, or Payment Channels. Any transactions that would create such entries instead fail with the result code tecNO_PERMISSION.
- Users cannot create trust lines to it for anything other than the AMM's LP Tokens. Transactions that would create such trust lines instead fail with result code tecNO_PERMISSION. (The AMM does have two trust lines to hold the tokens in its pool, or one trust line if the other asset in its pool is XRP.)
- If the Clawback amendment is also enabled, the issuer cannot clawback funds from an AMM.

`tecNO_PERMISSION`

`tecNO_PERMISSION`

Other than those exceptions, these accounts are like ordinary accounts; the LP Tokens they issue behave like other tokens except that those tokens can also be used in AMM-related transactions. You can check an AMM's balances and the history of transactions that affected it the same way you would with a regular account.


## AccountRoot Flags

Many AccountRoot flags correspond to options you can change with an AccountSet transaction. However, the bit values used in the ledger are different than the values used to enable or disable those flags in a transaction. Ledger flags have names that begin with lsf.

`lsf`

AccountRoot objects can have the following flags combined in the Flags field:

`Flags`

| Flag Name | Hex Value | Decimal Value | Corresponding AccountSet Flag | Description |
| --- | --- | --- | --- | --- |
| lsfAllowTrustLineClawback | 0x80000000 | 2147483648 | asfAllowTrustLineClawback | Enable Clawback for this account. (Requires the Clawback amendment.) |
| lsfDefaultRipple | 0x00800000 | 8388608 | asfDefaultRipple | Enable rippling on this addresses's trust lines by default. Required for issuing addresses; discouraged for others. |
| lsfDepositAuth | 0x01000000 | 16777216 | asfDepositAuth | This account has DepositAuth enabled, meaning it can only receive funds from transactions it sends, and from preauthorized accounts. (Added by the DepositAuth amendment) |
| lsfDisableMaster | 0x00100000 | 1048576 | asfDisableMaster | Disallows use of the master key to sign transactions for this account. |
| lsfDisallowIncomingCheck | 0x08000000 | 134217728 | asfDisallowIncomingCheck | This account blocks incoming Checks. (Added by the DisallowIncoming amendment.) |
| lsfDisallowIncomingNFTokenOffer | 0x04000000 | 67108864 | asfDisallowIncomingNFTokenOffer | This account blocks incoming NFTokenOffers. (Added by the DisallowIncoming amendment.) |
| lsfDisallowIncomingPayChan | 0x10000000 | 268435456 | asfDisallowIncomingPayChan | This account blocks incoming Payment Channels. (Added by the DisallowIncoming amendment.) |
| lsfDisallowIncomingTrustline | 0x20000000 | 536870912 | asfDisallowIncomingTrustline | This account blocks incoming trust lines. (Added by the DisallowIncoming amendment.) |
| lsfDisallowXRP | 0x00080000 | 524288 | asfDisallowXRP | Client applications should not send XRP to this account. (Advisory; not enforced by the protocol.) |
| lsfGlobalFreeze | 0x00400000 | 4194304 | asfGlobalFreeze | All assets issued by this account are frozen. |
| lsfNoFreeze | 0x00200000 | 2097152 | asfNoFreeze | This account cannot freeze trust lines connected to it. Once enabled, cannot be disabled. |
| lsfPasswordSpent | 0x00010000 | 65536 | (None) | This account has used its free SetRegularKey transaction. |
| lsfRequireAuth | 0x00040000 | 262144 | asfRequireAuth | This account must individually approve other users for those users to hold this account's tokens. |
| lsfRequireDestTag | 0x00020000 | 131072 | asfRequireDest | Requires incoming payments to specify a Destination Tag. |


`lsfAllowTrustLineClawback`

`0x80000000`

`asfAllowTrustLineClawback`

`lsfDefaultRipple`

`0x00800000`

`asfDefaultRipple`

`lsfDepositAuth`

`0x01000000`

`asfDepositAuth`

`lsfDisableMaster`

`0x00100000`

`asfDisableMaster`

`lsfDisallowIncomingCheck`

`0x08000000`

`asfDisallowIncomingCheck`

`lsfDisallowIncomingNFTokenOffer`

`0x04000000`

`asfDisallowIncomingNFTokenOffer`

`lsfDisallowIncomingPayChan`

`0x10000000`

`asfDisallowIncomingPayChan`

`lsfDisallowIncomingTrustline`

`0x20000000`

`asfDisallowIncomingTrustline`

`lsfDisallowXRP`

`0x00080000`

`asfDisallowXRP`

`lsfGlobalFreeze`

`0x00400000`

`asfGlobalFreeze`

`lsfNoFreeze`

`0x00200000`

`asfNoFreeze`

`lsfPasswordSpent`

`0x00010000`

`lsfRequireAuth`

`0x00040000`

`asfRequireAuth`

`lsfRequireDestTag`

`0x00020000`

`asfRequireDest`


## AccountRoot Reserve

The reserve for an AccountRoot entry is the base reserve, currently 1 XRP, except in the case of a special AMM AccountRoot.

This XRP cannot be sent to others but it can be burned as part of the transaction cost.


## AccountRoot ID Format

The ID of an AccountRoot entry is the SHA-512Half of the following values, concatenated in order:

- The Account space key (0x0061)
- The AccountID of the account

`0x0061`


## See Also

- Transactions:AccountSet transactionAccountDelete transaction
- AccountSet transaction
- AccountDelete transaction

- AccountSet transaction
- AccountDelete transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1e20f16b-4c9c-4fa1-b73f-d2c7daee94a4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1e20f16b-4c9c-4fa1-b73f-d2c7daee94a4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=88991004-e184-42ad-b5bd-7043b0e91654&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=88991004-e184-42ad-b5bd-7043b0e91654&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8c2e0485-f85c-4ff8-abc5-d37604a05fed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8c2e0485-f85c-4ff8-abc5-d37604a05fed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ef8f9ccd-a32f-4f67-b016-6fa24a2f6e86&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ef8f9ccd-a32f-4f67-b016-6fa24a2f6e86&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a5dc3c52-8ef6-4f38-ac59-96441abc411e&pt=AccountRoot&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=345c1f2f-71ec-499f-9901-fa506c950683&bo=1&sid=e5df53309d9f11f09b6ea13ed3e12553&vid=e5dfb8709d9f11f09315f3111026eb17&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=AccountRoot&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Faccountroot&r=&lt=4107&evt=pageLoad&sv=2&cdb=AQAS&rn=591038)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/accountroot#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/accountroot#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/accountroot#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/accountroot#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a51a2dc3c8dc562e049d9180e4dc7fbb.1759197054079.1759197054079.1759197054079.1&__hssc=78174987.1.1759197054079&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/accountroot.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L136-L158)
- [Cannot be more than 256 bytes in length.](https://github.com/xrplf/rippled/blob/55dc7a252e08a0b02cd5aa39e9b4777af3eafe77/src/ripple/app/tx/impl/SetAccount.h#L34)
- [Gravatar](https://en.gravatar.com/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a51a2dc3c8dc562e049d9180e4dc7fbb.1759197054079.1759197054079.1759197054079.1&__hssc=78174987.1.1759197054079&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:51:09.606Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
