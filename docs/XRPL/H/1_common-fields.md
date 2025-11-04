# Transaction Common Fields
URL: https://xrpl.org/docs/references/protocol/transactions/common-fields
Section: H1

## Overview


## Extracted Content
# Transaction Common Fields

Every transaction has the same set of common fields, plus additional fields based on the transaction type. Field names are case-sensitive. The common fields for all transactions are:

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The account that initiated the transaction. |
| TransactionType | String | UInt16 | Yes | The type of transaction. Valid transaction types include: Payment, OfferCreate, TrustSet, and many others. |
| Fee | String - Number | Amount | Yes; auto-fillable | Integer amount of XRP, in drops, to be destroyed as a cost for sending this transaction. Some transaction types have different minimum requirements. See Transaction Cost for details. |
| Sequence | Number | UInt32 | Yes; auto-fillable | The sequence number of the account sending the transaction. A transaction is only valid if the Sequence number is exactly 1 greater than the previous transaction from the same account. The special case 0 means the transaction is using a Ticket instead (Added by the TicketBatch amendment.). |
| AccountTxnID | String - Hash | UInt256 | No | Hash value identifying another transaction. If provided, this transaction is only valid if the sending account's previously-sent transaction matches the provided hash. |
| Delegate | String - Address | AccountID | No | A delegate account that is sending the transaction on behalf of the Account. (Requires the PermissionDelegation amendment ) |
| Flags | Number | UInt32 | No | Set of bit-flags for this transaction. |
| LastLedgerSequence | Number | UInt32 | No; auto-fillable | Highest ledger index this transaction can appear in. Specifying this field places a strict upper limit on how long the transaction can wait to be validated or rejected. See Reliable Transaction Submission for more details. |
| Memos | Array of Objects | Array | No | Additional arbitrary information attached to this transaction. |
| NetworkID | Number | UInt32 | Network-specific | The network ID of the chain this transaction is intended for. MUST BE OMITTED for Mainnet and some test networks. REQUIRED on chains whose network ID is 1025 or higher. |
| Signers | Array | Array | No | Array of objects that represent a multi-signature which authorizes this transaction. |
| SourceTag | Number | UInt32 | No | Arbitrary integer used to identify the reason for this payment, or a sender on whose behalf this transaction is made. Conventionally, a refund should specify the initial payment's SourceTag as the refund payment's DestinationTag. |
| SigningPubKey | String - Hexadecimal | Blob | Automatically added when signing | The public key that corresponds to the private key used to sign this transaction. If an empty string, indicates a multi-signature is present in the Signers field instead. |
| TicketSequence | Number | UInt32 | No | The sequence number of the ticket to use in place of a Sequence number. If this is provided, Sequence must be 0. Cannot be used with AccountTxnID. |
| TxnSignature | String - Hexadecimal | Blob | Automatically added when signing | The signature that verifies this transaction as originating from the account it says it is from. |


`Account`

`TransactionType`

`Payment`

`OfferCreate`

`TrustSet`

`Fee`

`Sequence`

`Sequence`

`0`

`AccountTxnID`

`Delegate`

`Account`

`Flags`

`LastLedgerSequence`

`Memos`

`NetworkID`

`Signers`

`SourceTag`

`SourceTag`

`DestinationTag`

`SigningPubKey`

`Signers`

`TicketSequence`

`Sequence`

`Sequence`

`0`

`AccountTxnID`

`TxnSignature`

: The PreviousTxnID field of transactions was replaced by the AccountTxnID field. This String / UInt256 field is present in some historical transactions. This is unrelated to the field also named PreviousTxnID in some ledger objects.

`PreviousTxnID`

`AccountTxnID`

`PreviousTxnID`


## AccountTxnID

The AccountTxnID field lets you chain your transactions together, so that a current transaction is not valid unless the previous transaction sent from the same account has a specific transaction hash.

`AccountTxnID`

Unlike the PreviousTxnID field, which tracks the last transaction to modify an account (regardless of sender), the AccountTxnID tracks the last transaction sent by an account. To use AccountTxnID, you must first enable the asfAccountTxnID flag, so that the ledger keeps track of the ID for the account's previous transaction. (PreviousTxnID, by comparison, is always tracked.)

`PreviousTxnID`

`AccountTxnID`

`AccountTxnID`

`asfAccountTxnID`

`PreviousTxnID`

One situation in which this is useful is if you have a primary system for submitting transactions and a passive backup system. If the passive backup system becomes disconnected from the primary, but the primary is not fully dead, and they both begin operating at the same time, you could potentially have serious problems like some transactions sending twice and others not at all. Chaining your transactions together with AccountTxnID ensures that, even if both systems are active, only one of them can submit valid transactions at a time.

`AccountTxnID`

The AccountTxnID field cannot be used on transactions that use Tickets. Transactions that use AccountTxnID cannot be placed in the transaction queue.

`AccountTxnID`

`AccountTxnID`


## Auto-fillable Fields

Some fields can be automatically filled in before a transaction is signed, either by a rippled server or by a client library. Auto-filling values requires an active connection to the XRP Ledger to get the latest state, so it cannot be done offline. The details can vary by library, but auto-filling always provides suitable values for at least the following fields:

`rippled`

- Fee - Automatically fill in the Transaction Cost based on the network.NoteWhen using rippled's sign command, you can limit the maximum possible auto-filled value, using the fee_mult_max and fee_div_max parameters.
- Sequence - Automatically use the next sequence number for the account sending the transaction.

Fee - Automatically fill in the Transaction Cost based on the network.

`Fee`

NoteWhen using rippled's sign command, you can limit the maximum possible auto-filled value, using the fee_mult_max and fee_div_max parameters.

`rippled`

`fee_mult_max`

`fee_div_max`

Sequence - Automatically use the next sequence number for the account sending the transaction.

`Sequence`

For a production system, we recommend not leaving these fields to be filled by the server. For example, if transaction costs become high due to a temporary spike in network load, you may want to wait for the cost to decrease before sending some transactions, instead of paying the temporarily-high cost.

The Paths field of the Payment transaction type can also be automatically filled in.

`Paths`


## Delegate

If the Delegate field is provided, this transaction is being sent by a different account on behalf of the account in the Account field. The account in the Account is the delegating account and the account in the Delegate field is the delegate account. The transaction functions as if it was sent by the delegating account, with the following exceptions:

`Delegate`

`Account`

`Account`

`Delegate`

- The signature must be valid for the delegate account. (It can by signed with a master key, regular key, or multi-signing list that is authorized by the delegate.)
- The transaction cost (in the Fee field) is paid by the delegate account.

`Fee`

Sending a transaction this way is only possible if the delegating account has granted the appropriate transaction permissions to the delegate account. For more information, see Permission Delegation.

(Requires the PermissionDelegation amendment .)


## Flags Field

The Flags field can contain various options that affect how a transaction should behave. The options are represented as binary values that can be combined with bitwise-or operations to set multiple flags at once.

`Flags`

To check whether a transaction has a given flag enabled, use the bitwise-and operator on the flag's value and the Flags field. A result of zero indicates the flag is disabled, and a result equal to the flag value indicates the flag is enabled. (If you got any other result, you did something wrong.)

`Flags`

Most flags only have meaning for a specific transaction type. The same bitwise value may be reused for flags on different transaction types, so it is important to pay attention to the TransactionType field when setting and reading flags.

`TransactionType`

Bits that are not defined as flags MUST be 0. (The fix1543 amendment enforces this rule on some transaction types. Most transaction types enforce this rule by default.)


### Global Flags

The only flags that apply globally to all transactions are as follows:

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| tfFullyCanonicalSig | 0x80000000 | 2147483648 | DEPRECATED No effect. (If the RequireFullyCanonicalSig amendment is not enabled, this flag enforces a fully-canonical signature.) |
| tfInnerBatchTxn | 0x40000000 | 1073741824 | This flag is only used if a transaction is an inner transaction in a Batch transaction. This signifies that the transaction isn't signed. Any normal transaction that includes this flag is rejected. |


`tfFullyCanonicalSig`

`0x80000000`

`tfInnerBatchTxn`

`0x40000000`

When using the sign method (or submit method in "sign-and-submit" mode), rippled adds a Flags field with tfFullyCanonicalSig enabled unless the Flags field is already present. The tfFullyCanonicalSig flag is not automatically enabled if Flags is explicitly specified. The flag is not automatically enabled when using the sign_for method to add a signature to a multi-signed transaction.

`rippled`

`Flags`

`tfFullyCanonicalSig`

`Flags`

`tfFullyCanonicalSig`

`Flags`

NoteThe tfFullyCanonicalSig flag was used from 2014 until 2020 to protect against transaction malleability while maintaining compatibility with legacy signing software. The RequireFullyCanonicalSig amendment ended compatibility with such legacy software and made the protections the default for all transactions. If you are using a parallel network that does not have RequireFullyCanonicalSig enabled, you should always enable the tfFullyCanonicalSig flag to protect against transaction malleability.

`tfFullyCanonicalSig`

`tfFullyCanonicalSig`


### Flag Ranges

A transaction's Flags field can contain flags that apply at different levels or contexts. Flags for each context are limited to the following ranges:

`Flags`

| Range Name | Bit Mask | Description |
| --- | --- | --- |
| Universal Flags | 0xff000000 | Flags that apply equally to all transaction types. |
| Type-based Flags | 0x00ff0000 | Flags with different meanings depending on the transaction type that uses them. |
| Reserved Flags | 0x0000ffff | Flags that are not currently defined. A transaction is only valid if these flags are disabled. |


`0xff000000`

`0x00ff0000`

`0x0000ffff`

NoteThe AccountSet transaction type has its own non-bitwise flags, which serve a similar purpose to type-based flags. Ledger objects also have a Flags field with different bitwise flag definitions.

`Flags`


## Memos Field

The Memos field includes arbitrary messaging data with the transaction. It is presented as an array of objects. Each object has only one field, Memo, which in turn contains another object with one or more of the following fields:

`Memos`

`Memo`

| Field | Type | Internal Type | Description |
| --- | --- | --- | --- |
| MemoData | String | Blob | Arbitrary hex value, conventionally containing the content of the memo. |
| MemoFormat | String | Blob | Hex value representing characters allowed in URLs. Conventionally containing information on how the memo is encoded, for example as a MIME type. |
| MemoType | String | Blob | Hex value representing characters allowed in URLs. Conventionally, a unique relation (according to RFC 5988) that defines the format of this memo. |


`MemoData`

`MemoFormat`

`MemoType`

The MemoType and MemoFormat fields should only consist of the following characters: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%

`MemoType`

`MemoFormat`

`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%`

The Memos field is limited to no more than 1 KB in size (when serialized in binary format).

`Memos`

Example of a transaction with a Memos field:

```
{
    "TransactionType": "Payment",
    "Account": "rMmTCjGFRWPz8S2zAUUoNVSQHxtRQD4eCx",
    "Destination": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
    "Memos": [
        {
            "Memo": {
                "MemoType": "687474703a2f2f6578616d706c652e636f6d2f6d656d6f2f67656e65726963",
                "MemoData": "72656e74"
            }
        }
    ],
    "Amount": "1"
}
```


## NetworkID Field

The NetworkID field is a protection against "cross-chain" transaction replay attacks, preventing the same transaction from being copied over and executing on a parallel network that it wasn't intended for. For compatibility with existing chains, the NetworkID field must be omitted on any network with a Network ID of 1024 or less, but must be included on any network with a Network ID of 1025 or greater. The following table shows the status and values for various known networks:

`NetworkID`

`NetworkID`

| Network | ID | NetworkID Field |
| --- | --- | --- |
| Mainnet | 0 | Disallowed |
| Testnet | 1 | Disallowed |
| Devnet | 2 | Disallowed |
| Batch Testnet | 21336 | Required |
| Xahau Mainnet | 21337 | Required |
| Xahau Testnet | 21338 | Required |
| JS Hooks Testnet | 31338 | Required |


`NetworkID`

Transaction replay attacks are theoretically possible, but require specific conditions on the second network. All of the following must be true:

- The transaction's sender is a funded account on the second network.
- The sender's Sequence number on the second network matches the transaction's Sequence, or the transaction uses a Ticket that's available on the second network.
- Either the transaction does not have a LastLedgerSequence field, or it specifies a value that is higher than the current ledger index on the second ledger.Mainnet generally has a higher ledger index than test networks or sidechains, so it is easier to replay Mainnet transactions on a sidechain or test network than the other way around, when transactions use LastLedgerSequence as intended.
- Mainnet generally has a higher ledger index than test networks or sidechains, so it is easier to replay Mainnet transactions on a sidechain or test network than the other way around, when transactions use LastLedgerSequence as intended.
- Either the networks both have IDs of 1024 or less, both networks use the same ID, or the second network does not require the NetworkID field.

`Sequence`

`Sequence`

`LastLedgerSequence`

- Mainnet generally has a higher ledger index than test networks or sidechains, so it is easier to replay Mainnet transactions on a sidechain or test network than the other way around, when transactions use LastLedgerSequence as intended.

`LastLedgerSequence`

`NetworkID`


## Signers Field

The Signers field contains a multi-signature, which has signatures from up to 32 key pairs, that together should authorize the transaction. The Signers list is an array of objects, each with one field, Signer. The Signer field has the following nested fields:

`Signers`

`Signers`

`Signer`

`Signer`

| Field | Type | Internal Type | Description |
| --- | --- | --- | --- |
| Account | String | AccountID | The address associated with this signature, as it appears in the signer list. |
| TxnSignature | String | Blob | A signature for this transaction, verifiable using the SigningPubKey. |
| SigningPubKey | String | Blob | The public key used to create this signature. |


`Account`

`TxnSignature`

`SigningPubKey`

`SigningPubKey`

The SigningPubKey must be a key that is associated with the Account address. If the referenced Account is a funded account in the ledger, then the SigningPubKey can be that account's current Regular Key if one is set. It could also be that account's Master Key, unless the lsfDisableMaster flag is enabled. If the referenced Account address is not a funded account in the ledger, then the SigningPubKey must be the master key associated with that address.

`SigningPubKey`

`Account`

`Account`

`SigningPubKey`

`lsfDisableMaster`

`Account`

`SigningPubKey`

Because signature verification is a compute-intensive task, multi-signed transactions cost additional XRP to relay to the network. Each signature included in the multi-signature increases the transaction cost required for the transaction. For example, if the current minimum transaction cost to relay a transaction to the network is 10000 drops, then a multi-signed transaction with 3 entries in the Signers array would need a Fee value of at least 40000 drops to relay.

`10000`

`Signers`

`Fee`

`40000`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Removed in: rippled 0.28.0](https://img.shields.io/badge/Removed in-rippled 0.28.0-red.svg)

![New in: rippled 1.11.0](https://img.shields.io/badge/New in-rippled 1.11.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a658254f-ac07-48e9-9a04-c807dd1fd6d4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a658254f-ac07-48e9-9a04-c807dd1fd6d4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3dd1291a-052e-4202-a976-7dca9d25ee60&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3dd1291a-052e-4202-a976-7dca9d25ee60&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=862ca634-196d-478e-99c5-fcaaceadfb02&bo=1&sid=41e107109da111f0bea6c33fce2f8bb7&vid=41e2afb09da111f0beb177f72b005e1b&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Transaction%20Common%20Fields&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&r=&lt=3664&evt=pageLoad&sv=2&cdb=AQAS&rn=821770)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c2b42a2f-4dc0-4290-8660-1f0aca8e5a7b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c2b42a2f-4dc0-4290-8660-1f0aca8e5a7b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cfac3ea4-97d1-4cd0-8cd1-515398f187a3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=cfac3ea4-97d1-4cd0-8cd1-515398f187a3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=92a91a65-2390-4f04-a1b8-f90947202e6f&pt=Transaction%20Common%20Fields&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Fcommon-fields&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/common-fields#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/common-fields#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/common-fields#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/common-fields#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/common-fields.md)
- [https://github.com/XRPLF/rippled/releases/tag/0.28.0](https://github.com/XRPLF/rippled/releases/tag/0.28.0)
- [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml)
- [RFC 5988](http://tools.ietf.org/html/rfc5988#section-4)
- [https://github.com/XRPLF/rippled/releases/tag/1.11.0](https://github.com/XRPLF/rippled/releases/tag/1.11.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:00:55.647Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
