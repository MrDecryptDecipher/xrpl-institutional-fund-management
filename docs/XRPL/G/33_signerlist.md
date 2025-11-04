# SignerList
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/signerlist
Section: G33

## Overview


## Extracted Content
# SignerList

[Source]

A SignerList entry represents a list of parties that, as a group, are authorized to sign a transaction in place of an individual account by multi-signing. You can create, replace, or remove a signer list using a SignerListSet transaction.

`SignerList`

(Added by the MultiSign amendment.)


## Example SignerList JSON

```
{
    "Flags": 0,
    "LedgerEntryType": "SignerList",
    "OwnerNode": "0000000000000000",
    "PreviousTxnID": "5904C0DC72C58A83AEFED2FFC5386356AA83FCA6A88C89D00646E51E687CDBE4",
    "PreviousTxnLgrSeq": 16061435,
    "SignerEntries": [
        {
            "SignerEntry": {
                "Account": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
                "SignerWeight": 2
            }
        },
        {
            "SignerEntry": {
                "Account": "raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n",
                "SignerWeight": 1
            }
        },
        {
            "SignerEntry": {
                "Account": "rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v",
                "SignerWeight": 1
            }
        }
    ],
    "SignerListID": 0,
    "SignerQuorum": 3,
    "index": "A9C28A28B85CD533217F5C0A0C7767666B093FA58A0F2D80026FCC4CD932DDC7"
}
```


## SignerList Fields

In addition to the common fields, SignerList entries have the following fields:

`SignerList`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| LedgerEntryType | String | UInt16 | Yes | The value 0x0053, mapped to the string SignerList, indicates that this is a SignerList ledger entry. |
| OwnerNode | String | UInt64 | Yes | A hint indicating which page of the owner directory links to this object, in case the directory consists of multiple pages. |
| PreviousTxnID | String | UInt256 | Yes | The identifying hash of the transaction that most recently modified this object. |
| PreviousTxnLgrSeq | Number | UInt32 | Yes | The index of the ledger that contains the transaction that most recently modified this object. |
| SignerEntries | Array | Array | Yes | An array of Signer Entry objects representing the parties who are part of this signer list. |
| SignerListID | Number | UInt32 | Yes | An ID for this signer list. Currently always set to 0. If a future amendment allows multiple signer lists for an account, this may change. |
| SignerQuorum | Number | UInt32 | Yes | A target number for signer weights. To produce a valid signature for the owner of this SignerList, the signers must provide valid signatures whose weights sum to this value or more. |


`LedgerEntryType`

`0x0053`

`SignerList`

`OwnerNode`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`SignerEntries`

`SignerListID`

`0`

`SignerQuorum`

The SignerEntries may be any combination of funded and unfunded addresses that use either secp256k1 or ed25519 keys.

`SignerEntries`


### Signer Entry Object

Each member of the SignerEntries field is an object that describes that signer in the list. A Signer Entry has the following fields:

`SignerEntries`

| Name | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| Account | String | AccountID | An XRP Ledger address whose signature contributes to the multi-signature. It does not need to be a funded address in the ledger. |
| SignerWeight | Number | UInt16 | The weight of a signature from this signer. A multi-signature is only valid if the sum weight of the signatures provided meets or exceeds the signer list's SignerQuorum value. |
| WalletLocator | String | UInt256 | (Optional) Arbitrary hexadecimal data. This can be used to identify the signer or for other, related purposes. (Added by the ExpandedSignerList amendment.) |


`Account`

`SignerWeight`

`SignerQuorum`

`WalletLocator`

When processing a multi-signed transaction, the server looks up the Account values with respect to the ledger at the time of transaction execution. If the address does not correspond to a funded AccountRoot ledger entry, then only the master private key associated with that address can be used to produce a valid signature. If the account does exist in the ledger, then it depends on the state of that account. If the account has a Regular Key configured, the Regular Key can be used. The account's master key can only be used if it is not disabled. A multi-signature cannot be used as part of another multi-signature.

`Account`


## SignerList Flags

(Added by the MultiSignReserve amendment.)

SignerList entries can have the following value in the Flags field:

`Flags`

| Flag Name | Hex Value | Decimal Value | Description |
| --- | --- | --- | --- |
| lsfOneOwnerCount | 0x00010000 | 65536 | If this flag is enabled, this SignerList counts as one item for purposes of the owner reserve. Otherwise, this list counts as N+2 items, where N is the number of signers it contains. This flag is automatically enabled if you add or update a signer list after the MultiSignReserve amendment is enabled. |


`lsfOneOwnerCount`

`0x00010000`


## Signer Lists and Reserves

A signer list contributes to its owner's reserve requirement. Removing the signer list frees up the reserve.

The MultiSignReserve amendment (enabled 2019-04-17) made it so each signer list counts as one item, regardless of how many members it has. As a result, the owner reserve for any signer list added or updated after this time is 0.2 XRP.

A signer list created before the MultiSignReserve amendment itself counts as two items towards the owner reserve, and each member of the list counts as one. As a result, the total owner reserve associated with an old signer list is anywhere from 3 times to 10 times as much as a new signer list. To update a signer list to use the new, reduced reserve, update the signer list by sending a SignerListSet transaction.


## SignerList ID Format

The ID of a SignerList entry is the SHA-512Half of the following values, concatenated in order:

`SignerList`

- The RippleState space key (0x0053)
- The AccountID of the owner of the signer list
- The SignerListID (currently always 0)

`0x0053`

`SignerListID`

`0`


## See Also

- Transactions:SignerListSet transaction
- SignerListSet transaction

- SignerListSet transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f7e1a29-e2a6-426a-b9da-123c7d12fed6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2f7e1a29-e2a6-426a-b9da-123c7d12fed6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d537c62a-be65-4cea-bce2-7ae66b9fd9f5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d537c62a-be65-4cea-bce2-7ae66b9fd9f5&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=26aefc12-d4c6-4d5c-97d6-2025646cae3b&bo=1&sid=0d6ae5209da111f087630b69a5d9a0ac&vid=0d6b77709da111f0a59ef9e3b3679f63&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=SignerList&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&r=&lt=3578&evt=pageLoad&sv=2&cdb=AQAS&rn=724599)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=59fe5c49-7637-41bc-9112-9b4c30e2ffa2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=59fe5c49-7637-41bc-9112-9b4c30e2ffa2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5141c11f-e501-404a-b1b4-05f9fdc62c70&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5141c11f-e501-404a-b1b4-05f9fdc62c70&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=1e1f7576-1029-40dd-a864-d0163f1f9d3b&pt=SignerList&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fsignerlist&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/signerlist#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/signerlist#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/signerlist#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/signerlist#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a9151048b1a20baf73eddb264f113cfb.1759197548474.1759197548474.1759197548474.1&__hssc=78174987.1.1759197548474&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/signerlist.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L111-L118)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.a9151048b1a20baf73eddb264f113cfb.1759197548474.1759197548474.1759197548474.1&__hssc=78174987.1.1759197548474&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:59:19.962Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
