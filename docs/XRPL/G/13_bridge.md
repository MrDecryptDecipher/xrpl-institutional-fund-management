# Bridge
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/bridge
Section: G13

## Overview


## Extracted Content
# Bridge

[Source]

The Bridge ledger entry represents a single cross-chain bridge that connects the XRP Ledger with another blockchain, such as its sidechain, and enables value in the form of XRP and other tokens (IOUs) to move efficiently between the two blockchains. You can create a bridge by sending an XChainCreateBridge transaction.

`Bridge`

(Requires the XChainBridge amendment )


## Example Bridge JSON

```
{
  "Account": "r3nCVTbZGGYoWvZ58BcxDmiMUU7ChMa1eC",
  "Flags": 0,
  "LedgerEntryType": "Bridge",
  "MinAccountCreateAmount": "2000000000",
  "OwnerNode": "0",
  "PreviousTxnID": "67A8A1B36C1B97BE3AAB6B19CB3A3069034877DE917FD1A71919EAE7548E5636",
  "PreviousTxnLgrSeq": 102,
  "SignatureReward": "204",
  "XChainAccountClaimCount": "0",
  "XChainAccountCreateCount": "0",
  "XChainBridge": {
    "IssuingChainDoor": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    "IssuingChainIssue": {
      "currency": "XRP"
    },
    "LockingChainDoor": "r3nCVTbZGGYoWvZ58BcxDmiMUU7ChMa1eC",
    "LockingChainIssue": {
      "currency": "XRP"
    }
  },
  "XChainClaimID": "1",
  "index": "9F2C9E23343852036AFD323025A8506018ABF9D4DBAA746D61BF1CFB5C297D10"
}
```


## Bridge Fields

In addition to the common fields, Bridge entries have the following fields:

`Bridge`

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | Account | Yes | The account that submitted the XChainCreateBridge transaction on the blockchain. |
| MinAccountCreateAmount | Currency Amount | Amount | No | The minimum amount, in XRP, required for an XChainAccountCreateCommit transaction. If this isn't present, the XChainAccountCreateCommit transaction will fail. This field can only be present on XRP-XRP bridges. |
| SignatureReward | Currency Amount | Amount | Yes | The total amount, in XRP, to be rewarded for providing a signature for cross-chain transfer or for signing for the cross-chain reward. This amount will be split among the signers. |
| XChainAccountClaimCount | Number | UInt64 | Yes | A counter used to order the execution of account create transactions. It is incremented every time a XChainAccountCreateCommit transaction is "claimed" on the destination chain. When the "claim" transaction is run on the destination chain, the XChainAccountClaimCount must match the value that the XChainAccountCreateCount had at the time the XChainAccountClaimCount was run on the source chain. This orders the claims so that they run in the same order that the XChainAccountCreateCommit transactions ran on the source chain, to prevent transaction replay. |
| XChainAccountCreateCount | Number | UInt64 | Yes | A counter used to order the execution of account create transactions. It is incremented every time a successful XChainAccountCreateCommit transaction is run for the source chain. |
| XChainBridge | XChainBridge | XChain_Bridge | Yes | The door accounts and assets of the bridge this object correlates to. |
| XChainClaimID | Number | UInt64 | Yes | The value of the next XChainClaimID to be created. |


`Account`

`XChainCreateBridge`

`MinAccountCreateAmount`

`XChainAccountCreateCommit`

`XChainAccountCreateCommit`

`SignatureReward`

`XChainAccountClaimCount`

`XChainAccountCreateCommit`

`XChainAccountClaimCount`

`XChainAccountCreateCount`

`XChainAccountClaimCount`

`XChainAccountCreateCommit`

`XChainAccountCreateCount`

`XChainAccountCreateCommit`

`XChainBridge`

`XChainClaimID`

`XChainClaimID`


### XChainBridge Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| IssuingChainDoor | String | Account | Yes | The door account on the issuing chain. For an XRP-XRP bridge, this must be the genesis account (the account that is created when the network is first started, which contains all of the XRP). |
| IssuingChainIssue | Issue | Issue | Yes | The asset that is minted and burned on the issuing chain. For an IOU-IOU bridge, the issuer of the asset must be the door account on the issuing chain, to avoid supply issues. |
| LockingChainDoor | String | Account | Yes | The door account on the locking chain. |
| LockingChainIssue | Issue | Issue | Yes | The asset that is locked and unlocked on the locking chain. |


`IssuingChainDoor`

`IssuingChainIssue`

`LockingChainDoor`

`LockingChainIssue`


## See Also

- Transactions:XChainCreateBridge transactionXChainModifyBridge transaction
- XChainCreateBridge transaction
- XChainModifyBridge transaction

- XChainCreateBridge transaction
- XChainModifyBridge transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e983ee1-504d-46d6-8aeb-35a2c930bff1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6e983ee1-504d-46d6-8aeb-35a2c930bff1&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ae158155-e97f-4328-8b73-8cc4adc11dfb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ae158155-e97f-4328-8b73-8cc4adc11dfb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=43068182-b30f-410c-92c2-93acf678ab68&bo=1&sid=0b28d5409da011f0bd651f44d4e23bc1&vid=0b2947909da011f0b6270304ebf1938a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Bridge&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&r=&lt=2042&evt=pageLoad&sv=2&cdb=AQAS&rn=520558)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78cde50c-88d6-4877-bfa1-680f24591860&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=78cde50c-88d6-4877-bfa1-680f24591860&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aa184968-1342-4fed-9fc3-c8cdfe37254b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=aa184968-1342-4fed-9fc3-c8cdfe37254b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=82df980d-901e-4d27-acda-a0440af02513&pt=Bridge&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fbridge&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/bridge#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/bridge#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/bridge#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/bridge#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.bb396d3a3a536ea1de3d7301c0f1dd47.1759197116350.1759197116350.1759197116350.1&__hssc=78174987.1.1759197116350&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/bridge.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L212-L223)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.bb396d3a3a536ea1de3d7301c0f1dd47.1759197116350.1759197116350.1759197116350.1&__hssc=78174987.1.1759197116350&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:52:06.345Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
