# ledger_entry
URL: https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_entry
Section: O5

## Overview


## Extracted Content
# ledger_entry

[Source]

The ledger_entry method returns a single ledger entry from the XRP Ledger in its raw format. See ledger format for information on the different types of entries you can retrieve.

`ledger_entry`


## Request Format

This method can retrieve several different types of data. You can select which type of item to retrieve by passing the appropriate parameters, comprised of the general and type-specific fields listed below, and following the standard request formatting. (For example, a WebSocket request always has the command field and optionally an id field, and a JSON-RPC request uses the method and params fields.)

`command`

`id`

`method`

`params`

There is no commandline syntax for this method. You can use the json method to access this method from the commandline instead.


### General Fields

| Field | Type | Description |
| --- | --- | --- |
| binary | Boolean | (Optional) If true, return the requested ledger entry's contents as a hex string in the XRP Ledger's binary format. Otherwise, return data in JSON format. The default is false. |
| ledger_hash | String | (Optional) The unique hash of the ledger version to use. (See Specifying Ledgers) |
| ledger_index | String or Unsigned Integer | (Optional) The ledger index of the ledger to use, or a shortcut string (e.g. "validated" or "closed" or "current") to choose a ledger automatically. (See Specifying Ledgers) |
| include_deleted | Boolean | (Optional, Clio servers only) If set to true and the queried object has been deleted, return its complete data as it was prior to its deletion. If set to false or not provided, and the queried object has been deleted, return objectNotFound (current behavior). |


`binary`

`true`

`false`

`ledger_hash`

`ledger_index`

`include_deleted`

`objectNotFound`

The generator and ledger parameters are deprecated and may be removed without further notice.

`generator`

`ledger`

In addition to the general fields above, you must specify exactly 1 of the following fields to indicate what type of entry to retrieve, along with its sub-fields as appropriate. The valid fields are:

- ledger_entryRequest FormatGeneral FieldsGet Ledger Entry by IDGet AccountRoot EntryGet AMM EntryGet Bridge EntryGet Credential EntryGet DirectoryNode EntryGet Offer EntryGet Oracle EntryGet RippleState EntryGet Check EntryGet Escrow EntryGet PayChannel EntryGet DepositPreauth EntryGet Ticket EntryGet NFT PageGet MPT Issuance ObjectGet MPToken ObjectResponse FormatPossible Errors
- Request FormatGeneral FieldsGet Ledger Entry by IDGet AccountRoot EntryGet AMM EntryGet Bridge EntryGet Credential EntryGet DirectoryNode EntryGet Offer EntryGet Oracle EntryGet RippleState EntryGet Check EntryGet Escrow EntryGet PayChannel EntryGet DepositPreauth EntryGet Ticket EntryGet NFT PageGet MPT Issuance ObjectGet MPToken Object
- General Fields
- Get Ledger Entry by ID
- Get AccountRoot Entry
- Get AMM Entry
- Get Bridge Entry
- Get Credential Entry
- Get DirectoryNode Entry
- Get Offer Entry
- Get Oracle Entry
- Get RippleState Entry
- Get Check Entry
- Get Escrow Entry
- Get PayChannel Entry
- Get DepositPreauth Entry
- Get Ticket Entry
- Get NFT Page
- Get MPT Issuance Object
- Get MPToken Object
- Response Format
- Possible Errors

- Request FormatGeneral FieldsGet Ledger Entry by IDGet AccountRoot EntryGet AMM EntryGet Bridge EntryGet Credential EntryGet DirectoryNode EntryGet Offer EntryGet Oracle EntryGet RippleState EntryGet Check EntryGet Escrow EntryGet PayChannel EntryGet DepositPreauth EntryGet Ticket EntryGet NFT PageGet MPT Issuance ObjectGet MPToken Object
- General Fields
- Get Ledger Entry by ID
- Get AccountRoot Entry
- Get AMM Entry
- Get Bridge Entry
- Get Credential Entry
- Get DirectoryNode Entry
- Get Offer Entry
- Get Oracle Entry
- Get RippleState Entry
- Get Check Entry
- Get Escrow Entry
- Get PayChannel Entry
- Get DepositPreauth Entry
- Get Ticket Entry
- Get NFT Page
- Get MPT Issuance Object
- Get MPToken Object
- Response Format
- Possible Errors

- General Fields
- Get Ledger Entry by ID
- Get AccountRoot Entry
- Get AMM Entry
- Get Bridge Entry
- Get Credential Entry
- Get DirectoryNode Entry
- Get Offer Entry
- Get Oracle Entry
- Get RippleState Entry
- Get Check Entry
- Get Escrow Entry
- Get PayChannel Entry
- Get DepositPreauth Entry
- Get Ticket Entry
- Get NFT Page
- Get MPT Issuance Object
- Get MPToken Object

CautionIf you specify more than 1 of these type-specific fields in a request, the server retrieves results for only 1 of them. It is not defined which one the server chooses, so you should avoid doing this.


### Get Ledger Entry by ID

Retrieve any type of ledger entry by its unique ID.

| Field | Type | Description |
| --- | --- | --- |
| index | String | The ledger entry ID of a single entry to retrieve from the ledger, as a 64-character (256-bit) hexadecimal string. |


`index`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "command": "ledger_entry",
  "index": "7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4",
  "ledger_index": "validated"
}
```

You can use this type of request to get any singleton ledger entry, if it exists in the ledger data, because its ID is always the same. For example:

- Amendments - 7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4
- FeeSettings - 4BC50C9B0D8515D3EAAE1E74B29A95804346C491EE1A95BF25E4AAB854A6A651
- Recent History LedgerHashes - B4979A36CDC7F3D3D5C31A4EAE2AC7D7209DDA877588B9AFC66799692AB0D66B
- NegativeUNL - 2E8A59AA9D3B5B186B0B9E0F62E6C02587CA74A4D778938E957B6357D364B244

`Amendments`

`7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4`

`FeeSettings`

`4BC50C9B0D8515D3EAAE1E74B29A95804346C491EE1A95BF25E4AAB854A6A651`

`LedgerHashes`

`B4979A36CDC7F3D3D5C31A4EAE2AC7D7209DDA877588B9AFC66799692AB0D66B`

`NegativeUNL`

`2E8A59AA9D3B5B186B0B9E0F62E6C02587CA74A4D778938E957B6357D364B244`


### Get AccountRoot Entry

Retrieve an AccountRoot entry by its address. This is roughly equivalent to the account_info method.

| Field | Type | Description |
| --- | --- | --- |
| account_root | String - Address | The classic address of the AccountRoot entry to retrieve. |


`account_root`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_accountroot",
  "command": "ledger_entry",
  "account_root": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "ledger_index": "validated"
}
```


### Get AMM Entry

(Added by the AMM amendment)

Retrieve an Automated Market-Maker (AMM) object from the ledger. This is similar to amm_info method, but the ledger_entry version returns only the ledger entry as stored.

`ledger_entry`

| Field | Type | Description |
| --- | --- | --- |
| amm | Object or String | The AMM to retrieve. If you specify a string, it must be the object ID of the AMM, as hexadecimal. If you specify an object, it must contain asset and asset2 sub-fields. |
| amm.asset | Object | One of the two assets in this AMM's pool, as a currency object without an amount. |
| amm.asset2 | Object | The other of the two assets in this AMM's pool, as a currency object without an amount. |


`amm`

`asset`

`asset2`

`amm.asset`

`amm.asset2`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 3,
  "command": "ledger_entry",
  "amm": {
    "asset": {
      "currency": "XRP"
    },
    "asset2": {
      "currency" : "TST",
      "issuer" : "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd"
    }
  },
  "ledger_index": "validated"
}
```


### Get Bridge Entry

(Requires the XChainBridge amendment )

Retrieve a Bridge entry, which represents a single cross-chain bridge that connects the XRP Ledger with another blockchain.

| Field | Type | Description |
| --- | --- | --- |
| bridge_account | String | The account that submitted the XChainCreateBridge transaction on the blockchain. |
| bridge | Object | The Bridge to retrieve. Includes the door accounts and assets on the issuing and locking chain. |


`bridge_account`

`XChainCreateBridge`

`bridge`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_bridge",
  "command": "ledger_entry",
  "bridge_account": "rnQAXXWoFNN6PEqwqsdTngCtFPCrmfuqFJ",
  "bridge": {
    "IssuingChainDoor": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    "IssuingChainIssue": {
      "currency": "XRP"
    },
    "LockingChainDoor": "rnQAXXWoFNN6PEqwqsdTngCtFPCrmfuqFJ",
    "LockingChainIssue": {
      "currency": "XRP"
    }
  },
  "ledger_index": "validated"
}
```


### Get Credential Entry

Retrieve a Credential entry, which represents an attestation by one account about another account.

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| credential | Object or String | Yes | Specify the Credential to retrieve. If a string, must be the [ledger entry ID][] of the entry, as hexadecimal. If an object, requires subject, issuer, and credential_type sub-fields. |
| credential.subject | String - Address | Yes | The account that is the subject of the credential. |
| credential.issuer | String -  Address | Yes | The account that issued the credential. |
| credential.credential_type | String - Hexadecimal | Yes | The type of the credential, as issued. |


`credential`

`subject`

`issuer`

`credential_type`

`credential.subject`

`credential.issuer`

`credential.credential_type`

WebSocket:

```
{
  "id": "example_get_credential",
  "command": "ledger_entry",
  "credential": {
    "subject": "rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8",
    "issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "credential_type": "6D795F63726564656E7469616C"
  },
  "ledger_index": "validated"
}
```

JSON-RPC:

```
{
  "method": "ledger_entry",
  "params": [{
    "credential": {
      "subject": "rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8",
      "issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "credential_type": "6D795F63726564656E7469616C"
    },
    "ledger_index": "validated"
  }]
}
```

Commandline:

```
rippled json ledger_entry '{ "credential": {"subject": "rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8", "issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX","credential_type": "6D795F63726564656E7469616C"}, "ledger_index": "validated" }'
```


### Get DirectoryNode Entry

Retrieve a DirectoryNode, which contains a list of other ledger objects. Can be provided as string (object ID of the Directory) or as an object.

| Field | Type | Description |
| --- | --- | --- |
| directory | Object or String | The DirectoryNode to retrieve. If a string, must be the object ID of the directory, as hexadecimal. If an object, requires either dir_root or owner as a sub-field, plus optionally a sub_index sub-field. |
| directory.sub_index | Unsigned Integer | (Optional) If provided, jumps to a later "page" of the DirectoryNode. |
| directory.dir_root | String | (Optional) Unique index identifying the directory to retrieve, as a hex string. |
| directory.owner | String | (Optional) Unique address of the account associated with this directory. |


`directory`

`dir_root`

`owner`

`sub_index`

`directory.sub_index`

`directory.dir_root`

`directory.owner`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": 3,
  "command": "ledger_entry",
  "directory": {
    "owner": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "sub_index": 0
  },
  "ledger_index": "validated"
}
```


### Get Offer Entry

Retrieve an Offer entry, which defines an offer to exchange currency. Can be provided as string (unique index of the Offer) or as an object.

| Field | Type | Description |
| --- | --- | --- |
| offer | Object or String | If a string, interpret as ledger entry ID of the Offer to retrieve. If an object, requires the sub-fields account and seq to uniquely identify the offer. |
| offer.account | String - Address | (Required if offer is specified as an object) The account that placed the offer. |
| offer.seq | Unsigned Integer | (Required if offer is specified as an object) The Sequence Number of the transaction that created the Offer entry. |


`offer`

`account`

`seq`

`offer.account`

`offer`

`offer.seq`

`offer`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_offer",
  "command": "ledger_entry",
  "offer": {
    "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "seq": 359
  },
  "ledger_index": "validated"
}
```


### Get Oracle Entry

(Requires the PriceOracle amendment)

Retrieve an Oracle entry, which represents a single price oracle that can store token prices.

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| oracle | Object | Yes | The oracle identifier. |
| oracle.account | String - Address | Yes | The account that controls the Oracle object. |
| oracle.oracle_document_id | Number | Yes | A unique identifier of the price oracle for the Account |


`oracle`

`oracle.account`

`Oracle`

`oracle.oracle_document_id`

`Account`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_oracle",
  "command": "ledger_entry",
  "oracle" : {
    "account": "rNZ9m6AP9K7z3EVg6GhPMx36V4QmZKeWds",
    "oracle_document_id":  34
  },
  "ledger_index": "validated"
}
```


### Get RippleState Entry

Retrieve a RippleState entry, which tracks a (non-XRP) currency balance between two accounts.

| Field | Type | Description |
| --- | --- | --- |
| state | Object | Alias to ripple_state. |
| ripple_state | Object | Object specifying the RippleState (trust line) object to retrieve. The accounts and currency sub-fields are required to uniquely specify the RippleState entry to retrieve. |
| ripple_state.accounts | Array | (Required if ripple_state is specified) 2-length array of account Addresses, defining the two accounts linked by this RippleState entry. |
| ripple_state.currency | String | (Required if ripple_state is specified) Currency Code of the RippleState entry to retrieve. |
| state | Object | Alias to ripple_state. |


`state`

`ripple_state`

`ripple_state`

`accounts`

`currency`

`ripple_state.accounts`

`ripple_state`

`ripple_state.currency`

`ripple_state`

`state`

`ripple_state`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_ripplestate",
  "command": "ledger_entry",
  "ripple_state": {
    "accounts": [
      "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW"
    ],
    "currency": "USD"
  },
  "ledger_index": "validated"
}
```


### Get Check Entry

Retrieve a Check entry, which is a potential payment that can be cashed by its recipient.

| Field | Type | Description |
| --- | --- | --- |
| check | String | The object ID of a Check entry to retrieve. |


`check`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_check",
  "command": "ledger_entry",
  "check": "C4A46CCD8F096E994C4B0DEAB6CE98E722FC17D7944C28B95127C2659C47CBEB",
  "ledger_index": "validated"
}
```


### Get Escrow Entry

Retrieve an Escrow entry, which holds XRP until a specific time or condition is met. Can be provided as string (object ID of the Escrow) or as an object.

| Field | Type | Description |
| --- | --- | --- |
| escrow | Object or String | The Escrow to retrieve. If a string, must be the object ID of the Escrow, as hexadecimal. If an object, requires owner and seq sub-fields. |
| escrow.owner | String - Address | (Required if escrow is specified as an object) The owner (sender) of the Escrow object. |
| escrow.seq | Unsigned Integer | (Required if escrow is specified as an object) The Sequence Number of the transaction that created the Escrow object. |


`escrow`

`owner`

`seq`

`escrow.owner`

`escrow`

`escrow.seq`

`escrow`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_escrow",
  "command": "ledger_entry",
  "escrow": {
    "owner": "rL4fPHi2FWGwRGRQSH7gBcxkuo2b9NTjKK",
    "seq": 126
  },
  "ledger_index": "validated"
}
```


### Get PayChannel Entry

Retrieve a PayChannel entry, which holds XRP for asynchronous payments.

| Field | Type | Description |
| --- | --- | --- |
| payment_channel | String | The object ID of the PayChannel to retrieve. |


`payment_channel`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_paychannel",
  "command": "ledger_entry",
  "payment_channel": "C7F634794B79DB40E87179A9D1BF05D05797AE7E92DF8E93FD6656E8C4BE3AE7",
  "ledger_index": "validated"
}
```


### Get DepositPreauth Entry

Retrieve a DepositPreauth entry, which tracks preauthorization for payments to accounts requiring Deposit Authorization.

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| deposit_preauth | Object or String | Yes | Specify the DepositPreauth to retrieve. If a string, must be the [ledger entry ID][] of the DepositPreauth entry, as hexadecimal. If an object, requires owner sub-field and either authorized or authorize_credentials sub-field. |
| deposit_preauth.owner | String - Address | Yes | The account that provided the preauthorization. |
| deposit_preauth.authorized | String - Address | No | The account that received the preauthorization. |
| deposit_preauth.authorized_credentials | Array | No | A set of credentials that received the preauthorization. |


`deposit_preauth`

`owner`

`authorized`

`authorize_credentials`

`deposit_preauth.owner`

`deposit_preauth.authorized`

`deposit_preauth.authorized_credentials`

Each member of the deposit_preauth.authorized_credentials array, if provided, must include the following nested fields:

`deposit_preauth.authorized_credentials`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| issuer | String - Address | Yes | The address of the account that issued the credential. |
| credential_type | String - Hexadecimal | Yes | The type of the credential, as issued. |


`issuer`

`credential_type`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_deposit_preauth",
  "command": "ledger_entry",
  "deposit_preauth": {
    "owner": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "authorized": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX"
  },
  "ledger_index": "validated"
}
```


### Get Ticket Entry

Retrieve a Ticket entry, which represents a sequence number set aside for future use. (Added by the TicketBatch amendment)

| Field | Type | Description |
| --- | --- | --- |
| ticket | Object or String | The Ticket to retrieve. If a string, must be the ledger entry ID of the Ticket, as hexadecimal. If an object, the account and ticket_seq sub-fields are required to uniquely specify the Ticket entry. |
| ticket.account | String - Address | (Required if ticket is specified as an object) The owner of the Ticket. |
| ticket.ticket_seq | Number | (Required if ticket is specified as an object) The Ticket Sequence number of the Ticket to retrieve. |


`ticket`

`account`

`ticket_seq`

`ticket.account`

`ticket`

`ticket.ticket_seq`

`ticket`

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_ticket",
  "command": "ledger_entry",
  "ticket": {
    "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "ticket_seq": 389
  },
  "ledger_index": "validated"
}
```


### Get NFT Page

Return an NFT Page in its raw ledger format.

| Field | Type | Description |
| --- | --- | --- |
| nft_page | String | The ledger entry ID of an NFT Page to retrieve. |


`nft_page`

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "example_get_nft_page",
    "command": "ledger_entry",
    "nft_page": "255DD86DDF59D778081A06D02701E9B2C9F4F01DFFFFFFFFFFFFFFFFFFFFFFFF",
    "ledger_index": "validated"
}
```


### Get MPT Issuance Object

(Requires the [MPToken amendment][] )

Return an MPTokenIssuance object.

`MPTokenIssuance`

| Field | Type | Description |
| --- | --- | --- |
| mpt_issuance | String | The 192-bit MPTokenIssuanceID that's associated with the MPTokenIssuance, as hexadecimal. |


`mpt_issuance`

`MPTokenIssuanceID`

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "example_get_mpt_issuance",
    "command": "ledger_entry",
    "mpt_issuance": "000004C463C52827307480341125DA0577DEFC38405B0E3E",
    "ledger_index": "validated"
}
```


### Get MPToken Object

(Requires the [MPToken amendment][] )

Return an MPToken object.

`MPToken`

| Field | Type | Description |
| --- | --- | --- |
| mptoken | ️Object or String | If a string, interpret as ledger entry ID of the MPToken to retrieve. If an object, requires the sub-fields account and mpt_issuance_id to uniquely identify the MPToken. |
| mptoken.mpt_issuance_id | String | (Required if the MPToken is specified as an object) The 192-bit MPTokenIssuanceID that's associated with the MPTokenIssuance. |
| mptoken.account ️ | String | (Required if the MPToken is specified as an object) The account that owns the MPToken. |


`mptoken`

`account`

`mpt_issuance_id`

`mptoken.mpt_issuance_id`

`MPToken`

`mptoken.account`

`MPToken`

- WebSocket
- JSON-RPC
- Commandline

```
{
    "id": "example_get_mpt_issuance",
    "command": "ledger_entry",
    "mptoken": {
      "mpt_issuance_id": "000002DFA4D893CFBC4DC6AE877EB585F90A3B47528B958D",
      "account":"r33kves44ksufkHSGg3M6GPPAsoVHEN8C1"
    }
}
```


## Response Format

The response follows the standard format, with a successful result containing the following fields:

| Field | Type | Description |
| --- | --- | --- |
| index | String | The unique ID of this ledger entry. |
| ledger_index | Unsigned Integer | The ledger index of the ledger that was used when retrieving this data. |
| node | Object | (Omitted if "binary": true specified.) Object containing the data of this ledger entry, according to the ledger format. |
| node_binary | String | (Omitted unless "binary":true specified) The binary representation of the ledger object, as hexadecimal. |
| deleted_ledger_index | String | (Clio server only, returned if include_deleted parameter is set.) The ledger index where the ledger entry object was deleted. |


`index`

`ledger_index`

`node`

`"binary": true`

`node_binary`

`"binary":true`

`deleted_ledger_index`

`include_deleted`

An example of a successful response:

- WebSocket
- JSON-RPC
- Commandline

```
{
  "id": "example_get_accountroot",
  "result": {
    "index": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
    "ledger_hash": "31850E8E48E76D1064651DF39DF4E9542E8C90A9A9B629F4DE339EB3FA74F726",
    "ledger_index": 61966146,
    "node": {
      "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "AccountTxnID": "4E0AA11CBDD1760DE95B68DF2ABBE75C9698CEB548BEA9789053FCB3EBD444FB",
      "Balance": "424021949",
      "Domain": "6D64756F31332E636F6D",
      "EmailHash": "98B4375E1D753E5B91627516F6D70977",
      "Flags": 9568256,
      "LedgerEntryType": "AccountRoot",
      "MessageKey": "0000000000000000000000070000000300",
      "OwnerCount": 12,
      "PreviousTxnID": "4E0AA11CBDD1760DE95B68DF2ABBE75C9698CEB548BEA9789053FCB3EBD444FB",
      "PreviousTxnLgrSeq": 61965653,
      "RegularKey": "rD9iJmieYHn8jTtPjwwkW2Wm9sVDvPXLoJ",
      "Sequence": 385,
      "TransferRate": 4294967295,
      "index": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8"
    },
    "validated": true
  },
  "status": "success",
  "type": "response"
}
```


## Possible Errors

- Any of the universal error types.
- deprecatedFeature - The request specified a removed field, such as generator.
- entryNotFound - The requested ledger entry does not exist in the ledger.
- invalidParams - One or more fields are specified incorrectly, or one or more required fields are missing.
- lgrNotFound - The ledger specified by the ledger_hash or ledger_index does not exist, or it does exist but the server does not have it.
- malformedAddress - The request improperly specified an Address field.
- malformedCurrency - The request improperly specified a Currency Code field.
- malformedOwner - The request improperly specified the escrow.owner sub-field.
- malformedRequest - The request provided an invalid combination of fields, or provided the wrong type for one or more fields.
- unknownOption - The fields provided in the request did not match any of the expected request formats.

`deprecatedFeature`

`generator`

`entryNotFound`

`invalidParams`

`lgrNotFound`

`ledger_hash`

`ledger_index`

`malformedAddress`

`malformedCurrency`

`malformedOwner`

`escrow.owner`

`malformedRequest`

`unknownOption`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Updated in: rippled 1.2.0](https://img.shields.io/badge/Updated in-rippled 1.2.0-blue.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1118c09e-66fb-4eee-a25c-4dcf50dcb7f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1118c09e-66fb-4eee-a25c-4dcf50dcb7f8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1e84d7d0-d7fd-4e18-ac90-79e678f15b76&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1e84d7d0-d7fd-4e18-ac90-79e678f15b76&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=be4c371e-f771-4dfd-af24-136a4aa9f5d2&bo=1&sid=f0d1f7109da511f08fa195e0873e06d0&vid=f0d26b509da511f0978c9181d280683c&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=ledger_entry&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&r=&lt=3226&evt=pageLoad&sv=2&cdb=AQAS&rn=657111)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2b555db6-f756-44aa-9fab-3eb681ec71f1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2b555db6-f756-44aa-9fab-3eb681ec71f1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1b7b6f3a-250c-4990-b1ca-3ee3829f0456&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1b7b6f3a-250c-4990-b1ca-3ee3829f0456&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=db3b5e61-7dae-4ffd-b020-0ae4d1b36de2&pt=ledger_entry&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fpublic-api-methods%2Fledger-methods%2Fledger_entry&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_entry#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_entry#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_entry#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_entry#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_entry.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/rpc/handlers/LedgerEntry.cpp)
- [https://github.com/XRPLF/rippled/releases/tag/1.2.0](https://github.com/XRPLF/rippled/releases/tag/1.2.0)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:34:41.047Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
