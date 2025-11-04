# XChainOwnedClaimID
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedclaimid
Section: G35

## Overview


## Extracted Content
# XChainOwnedClaimID

[Source]

An XChainOwnedClaimID entry represents one cross-chain transfer of value and includes information of the account on the source chain that locks or burns the funds on the source chain.

`XChainOwnedClaimID`

The XChainOwnedClaimID entry must be acquired on the destination chain before submitting a XChainCommit on the source chain. Its purpose is to prevent transaction replay attacks. It is also used as a place to collect attestations from witness servers.

`XChainOwnedClaimID`

`XChainCommit`

You can create a new XChainOwnedClaimID by sending an XChainCreateClaimID transaction. An XChainOwnedClaimID is destroyed when the funds are successfully claimed on the destination chain.

`XChainOwnedClaimID`

`XChainOwnedClaimID`

(Requires the XChainBridge amendment )


## Example XChainOwnedClaimID JSON

```
{
  "Account": "rBW1U7J9mEhEdk6dMHEFUjqQ7HW7WpaEMi",
  "Flags": 0,
  "OtherChainSource": "r9oXrvBX5aDoyMGkoYvzazxDhYoWFUjz8p",
  "OwnerNode": "0",
  "PreviousTxnID": "1CFD80E9CF232B8EED62A52857DE97438D12230C06496932A81DEFA6E66070A6",
  "PreviousTxnLgrSeq": 58673,
  "SignatureReward": "100",
  "XChainBridge": {
    "IssuingChainDoor": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    "IssuingChainIssue": {
      "currency": "XRP"
    },
    "LockingChainDoor": "rMAXACCrp3Y8PpswXcg3bKggHX76V3F8M4",
    "LockingChainIssue": {
      "currency": "XRP"
    }
  },
  "XChainClaimAttestations": [
    {
      "XChainClaimProofSig": {
        "Amount": "1000000",
        "AttestationRewardAccount": "rfgjrgEJGDxfUY2U8VEDs7BnB1jiH3ofu6",
        "AttestationSignerAccount": "rfsxNxZ6xB1nTPhTMwQajNnkCxWG8B714n",
        "Destination": "rBW1U7J9mEhEdk6dMHEFUjqQ7HW7WpaEMi",
        "PublicKey": "025CA526EF20567A50FEC504589F949E0E3401C13EF76DD5FD1CC2850FA485BD7B",
        "WasLockingChainSend": 1
      }
    },
    {
      "XChainClaimProofSig": {
        "Amount": "1000000",
        "AttestationRewardAccount": "rUUL1tP523M8KimERqVS7sxb1tLLmpndyv",
        "AttestationSignerAccount": "rEg5sHxZVTNwRL3BAdMwJatkmWDzHMmzDF",
        "Destination": "rBW1U7J9mEhEdk6dMHEFUjqQ7HW7WpaEMi",
        "PublicKey": "03D40434A6843638681E2F215310EBC4131AFB12EA85985DA073183B732525F7C9",
        "WasLockingChainSend": 1
      },
    }
  ],
  "XChainClaimID": "b5",
  "LedgerEntryType": "XChainOwnedClaimID",
  "LedgerIndex": "20B136D7BF6D2E3D610E28E3E6BE09F5C8F4F0241BBF6E2D072AE1BACB1388F5"
}
```


## XChainOwnedClaimID Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String - Address | AccountID | Yes | The account that owns this object. |
| LedgerIndex | String | UInt256 | Yes | The ledger index is a hash of a unique prefix for XChainOwnedClaimIDs, the actual XChainClaimID value, and the fields in XChainBridge. |
| OtherChainSource | String | AccountID | Yes | The account that must send the corresponding XChainCommit on the source chain. The destination may be specified in the XChainCommit transaction, which means that if the OtherChainSource isn't specified, another account can try to specify a different destination and steal the funds. This also allows tracking only a single set of signatures, since we know which account will send the XChainCommit transaction. |
| SignatureReward | Currency Amount | Amount | Yes | The total amount to pay the witness servers for their signatures. It must be at least the value of SignatureReward in the Bridge ledger object. |
| XChainBridge | XChainBridge | XChainBridge | Yes | The door accounts and assets of the bridge this object correlates to. |
| XChainClaimAttestations | Array | Array | Yes | Attestations collected from the witness servers. This includes the parameters needed to recreate the message that was signed, including the amount, which chain (locking or issuing), optional destination, and reward account for that signature. |
| XChainClaimID | String | UInt64 | Yes | The unique sequence number for a cross-chain transfer. |


`Account`

`LedgerIndex`

`XChainOwnedClaimID`

`XChainClaimID`

`XChainBridge`

`OtherChainSource`

`XChainCommit`

`XChainCommit`

`OtherChainSource`

`XChainCommit`

`SignatureReward`

`SignatureReward`

`Bridge`

`XChainBridge`

`XChainClaimAttestations`

`XChainClaimID`


### XChainClaimAttestations Fields

| Field | JSON Type | Internal Type | Required | Description |
| --- | --- | --- | --- | --- |
| XChainClaimProofSig | Array | Object | Yes | An attestation from one witness server. |
| Amount | Currency Amount | Amount | Yes | The amount to claim in the XChainCommit transaction on the destination chain. |
| AttestationRewardAccount | String | AccountID | Yes | The account that should receive this signer's share of the SignatureReward. |
| AttestationSignerAccount | String | AccountID | Yes | The account on the door account's signer list that is signing the transaction. |
| Destination | String | AccountID | No | The destination account for the funds on the destination chain. |
| PublicKey | String | Blob | Yes | The public key used to verify the signature. |
| WasLockingChainSend | Number | UInt8 | Yes | A boolean representing the chain where the event occurred. |


`XChainClaimProofSig`

`Amount`

`XChainCommit`

`AttestationRewardAccount`

`SignatureReward`

`AttestationSignerAccount`

`Destination`

`PublicKey`

`WasLockingChainSend`


### XChainBridge Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| IssuingChainDoor | String | AccountID | Yes | The door account on the issuing chain. For an XRP-XRP bridge, this must be the genesis account (the account that is created when the network is first started, which contains all of the XRP). |
| IssuingChainIssue | Issue | Issue | Yes | The asset that is minted and burned on the issuing chain. For an IOU-IOU bridge, the issuer of the asset must be the door account on the issuing chain, to avoid supply issues. |
| LockingChainDoor | String | AccountID | Yes | The door account on the locking chain. |
| LockingChainIssue | Issue | Issue | Yes | The asset that is locked and unlocked on the locking chain. |


`IssuingChainDoor`

`IssuingChainIssue`

`LockingChainDoor`

`LockingChainIssue`


## See Also

- Transactions:XChainCreateClaimID transaction
- XChainCreateClaimID transaction

- XChainCreateClaimID transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=83eacd8e-f1ca-4def-b0f3-1f469cf18db3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=83eacd8e-f1ca-4def-b0f3-1f469cf18db3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c05385a1-c3c5-46a1-9655-d2d10abd6918&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=c05385a1-c3c5-46a1-9655-d2d10abd6918&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=aff1ce11-a53d-4fd9-9c7c-7ba42401a911&bo=1&sid=2662eea09da111f0af78812709e6cc31&vid=266344e09da111f0af084937a1aad740&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=XChainOwnedClaimID&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&r=&lt=3530&evt=pageLoad&sv=2&cdb=AQAS&rn=977658)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a807d130-4767-422d-89d8-b6392fa58690&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a807d130-4767-422d-89d8-b6392fa58690&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=256d949f-9c12-4266-a263-a3fa60b98238&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=256d949f-9c12-4266-a263-a3fa60b98238&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=b295cc50-1125-4d3b-bdc4-84e51e13f70c&pt=XChainOwnedClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedclaimid#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedclaimid#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedclaimid#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedclaimid#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b26362f0bb8850f2eec470ae7f6af2fe.1759197590445.1759197590445.1759197590445.1&__hssc=78174987.1.1759197590445&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedclaimid.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L259-L269)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.b26362f0bb8850f2eec470ae7f6af2fe.1759197590445.1759197590445.1759197590445.1&__hssc=78174987.1.1759197590445&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:00:02.941Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
