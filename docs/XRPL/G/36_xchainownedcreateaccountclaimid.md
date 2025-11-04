# XChainOwnedCreateAccountClaimID
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedcreateaccountclaimid
Section: G36

## Overview


## Extracted Content
# XChainOwnedCreateAccountClaimID

[Source]

An XChainOwnedCreateAccountClaimID ledger entry collects attestations for creating an account via a cross-chain transfer.

`XChainOwnedCreateAccountClaimID`

You can create a new XChainOwnedCreateAccountClaimID entry by sending an XChainAddAccountCreateAttestation transaction with a signed attestation of a relevant transaction occurring on another chain.

`XChainOwnedCreateAccountClaimID`

An XChainOwnedCreateAccountClaimID ledger entry is destroyed when all the attestations have been received and the funds have transferred to the new account.

`XChainOwnedCreateAccountClaimID`

(Requires the XChainBridge amendment )


## Example XChainOwnedCreateAccountClaimID JSON

```
{
  "LedgerEntryType": "XChainOwnedCreateAccountClaimID",
  "LedgerIndex": "5A92F6ED33FDA68FB4B9FD140EA38C056CD2BA9673ECA5B4CEF40F2166BB6F0C",
  "Account": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
  "XChainAccountCreateCount": "66",
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
  "XChainCreateAccountAttestations": [
    {
      "XChainCreateAccountProofSig": {
        "Amount": "20000000",
        "AttestationRewardAccount": "rMtYb1vNdeMDpD9tA5qSFm8WXEBdEoKKVw",
        "AttestationSignerAccount": "rL8qTrAvZ8Q1o1H9H9Ahpj3xjgmRvFLvJ3",
        "Destination": "rBW1U7J9mEhEdk6dMHEFUjqQ7HW7WpaEMi",
        "PublicKey": "021F7CC4033EFBE5E8214B04D1BAAEC14808DC6C02F4ACE930A8EF0F5909B0C438",
        "SignatureReward": "100",
        "WasLockingChainSend": 1
      }
    }
  ]
}
```


## XChainOwnedCreateAccountClaimID Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Account | String | AccountID | Yes | The account that owns this object. |
| LedgerIndex | String | UInt256 | Yes | The ledger index is a hash of a unique prefix for XChainOwnedCreateAccountClaimIDs, the actual XChainAccountClaimCount value, and the fields in XChainBridge. |
| XChainAccountCreateCount | Number | UInt64 | Yes | An integer that determines the order that accounts created through cross-chain transfers must be performed. Smaller numbers must execute before larger numbers. |
| XChainBridge | XChainBridge | XChainBridge | Yes | The door accounts and assets of the bridge this object correlates to. |
| XChainCreateAccountAttestations | Array | Array | Yes | Attestations collected from the witness servers. This includes the parameters needed to recreate the message that was signed, including the amount, destination, signature reward amount, and reward account for that signature. With the exception of the reward account, all signatures must sign the message created with common parameters. |


`Account`

`LedgerIndex`

`XChainOwnedCreateAccountClaimID`

`XChainAccountClaimCount`

`XChainBridge`

`XChainAccountCreateCount`

`XChainBridge`

`XChainCreateAccountAttestations`


### XChainCreateAccountAttestations Fields

| Field | JSON Type | Internal Type | Required | Description |
| --- | --- | --- | --- | --- |
| XChainCreateAccountProofSig | Array | Object | Yes | An attestation from one witness server. |
| Amount | Currency Amount | Amount | Yes | The amount committed by the XChainAccountCreateCommit transaction on the source chain. |
| AttestationRewardAccount | String | AccountID | Yes | The account that should receive this signer's share of the SignatureReward. |
| AttestationSignerAccount | String | AccountID | Yes | The account on the door account's signer list that is signing the transaction. |
| Destination | String | AccountID | Yes | The destination account for the funds on the destination chain. |
| PublicKey | String | Blob | Yes | The public key used to verify the signature. |
| WasLockingChainSend | Number | UInt8 | Yes | A boolean representing the chain where the event occurred. |


`XChainCreateAccountProofSig`

`Amount`

`XChainAccountCreateCommit`

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

- Transactions:XChainAddAccountCreateAttestation transaction
- XChainAddAccountCreateAttestation transaction

- XChainAddAccountCreateAttestation transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=05ac83ae-2ce3-4c38-bc38-44740aa3f758&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=05ac83ae-2ce3-4c38-bc38-44740aa3f758&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0682c13e-5ba4-4e4e-95d6-bcd4a92c3144&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=0682c13e-5ba4-4e4e-95d6-bcd4a92c3144&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=61d46ed3-3952-4f3f-946a-3240e0d4fe50&bo=1&sid=345268209da111f0bd1fb177f328aaa4&vid=3452f4d09da111f0b1e75f9bfc6eb18a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=XChainOwnedCreateAccountClaimID&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&r=&lt=2715&evt=pageLoad&sv=2&cdb=AQAS&rn=142467)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5139bd61-9f69-4dc0-939e-17466966aa8e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5139bd61-9f69-4dc0-939e-17466966aa8e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=58bc44ab-1ca5-4830-826e-70fb9ce7820e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=58bc44ab-1ca5-4830-826e-70fb9ce7820e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2e582625-dc80-40d6-9e28-2b0fb906c7a5&pt=XChainOwnedCreateAccountClaimID&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fxchainownedcreateaccountclaimid&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedcreateaccountclaimid#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedcreateaccountclaimid#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedcreateaccountclaimid#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedcreateaccountclaimid#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f5fd1711b9b20eb9fcc8a295a9c434fb.1759197616051.1759197616051.1759197616051.1&__hssc=78174987.1.1759197616051&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/xchainownedcreateaccountclaimid.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L315-L323)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f5fd1711b9b20eb9fcc8a295a9c434fb.1759197616051.1759197616051.1759197616051.1&__hssc=78174987.1.1759197616051&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:00:28.857Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
