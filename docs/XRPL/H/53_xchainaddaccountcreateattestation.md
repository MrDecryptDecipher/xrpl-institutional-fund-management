# XChainAddAccountCreateAttestation
URL: https://xrpl.org/docs/references/protocol/transactions/types/xchainaddaccountcreateattestation
Section: H53

## Overview


## Extracted Content
# XChainAddAccountCreateAttestation

[Source]

(Requires the XChainBridge amendment )

The XChainAddAccountCreateAttestation transaction provides an attestation from a witness server that an XChainAccountCreateCommit transaction occurred on the other chain.

`XChainAddAccountCreateAttestation`

`XChainAccountCreateCommit`

The signature must be from one of the keys on the door's signer list at the time the signature was provided. If the signature list changes between the time the signature was submitted and the quorum is reached, the new signature set is used and some of the currently collected signatures may be removed.

Any account can submit signatures.

NoteThe reward is only sent to accounts that have keys on the current list. A quorum of signers need to agree on the SignatureReward, the same way they need to agree on the other data. A single witness server can't provide an incorrect value for this in an attempt to collect a larger reward.

`SignatureReward`


## Example XChainAddAccountCreateAttestation JSON

```
{
  "Account": "rDr5okqGKmMpn44Bbhe5WAfDQx8e9XquEv",
  "TransactionType": "XChainAddAccountCreateAttestation",
  "OtherChainSource": "rUzB7yg1LcFa7m3q1hfrjr5w53vcWzNh3U",
  "Destination": "rJMfWNVbyjcCtds8kpoEjEbYQ41J5B6MUd",
  "Amount": "2000000000",
  "PublicKey": "EDF7C3F9C80C102AF6D241752B37356E91ED454F26A35C567CF6F8477960F66614",
  "Signature": "F95675BA8FDA21030DE1B687937A79E8491CE51832D6BEEBC071484FA5AF5B8A0E9AFF11A4AA46F09ECFFB04C6A8DAE8284AF3ED8128C7D0046D842448478500",
  "WasLockingChainSend": 1,
  "AttestationRewardAccount": "rpFp36UHW6FpEcZjZqq5jSJWY6UCj3k4Es",
  "AttestationSignerAccount": "rpWLegmW9WrFBzHUj7brhQNZzrxgLj9oxw",
  "XChainAccountCreateCount": "2",
  "SignatureReward": "204",
  "XChainBridge": {
    "LockingChainDoor": "r3nCVTbZGGYoWvZ58BcxDmiMUU7ChMa1eC",
    "LockingChainIssue": {
      "currency": "XRP"
    },
    "IssuingChainDoor": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    "IssuingChainIssue": {
      "currency": "XRP"
    }
  },
  "Fee": "20"
}
```


## XChainAddAccountCreateAttestation Fields

| Field | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| Amount | Currency Amount | Amount | Yes | The amount committed by the XChainAccountCreateCommit transaction on the source chain. |
| AttestationRewardAccount | String | AccountID | Yes | The account that should receive this signer's share of the SignatureReward. |
| AttestationSignerAccount | String | AccountID | Yes | The account on the door account's signer list that is signing the transaction. |
| Destination | String | AccountID | Yes | The destination account for the funds on the destination chain. |
| OtherChainSource | String | AccountID | Yes | The account on the source chain that submitted the XChainAccountCreateCommit transaction that triggered the event associated with the attestation. |
| PublicKey | String | Blob | Yes | The public key used to verify the signature. |
| Signature | String | Blob | Yes | The signature attesting to the event on the other chain. |
| SignatureReward | Currency Amount | Amount | Yes | The signature reward paid in the XChainAccountCreateCommit transaction. |
| WasLockingChainSend | Number | UInt8 | Yes | A boolean representing the chain where the event occurred. |
| XChainAccountCreateCount | String | UInt64 | Yes | The counter that represents the order that the claims must be processed in. |
| XChainBridge | XChainBridge | XChainBridge | Yes | The bridge associated with the attestation. |


`Amount`

`XChainAccountCreateCommit`

`AttestationRewardAccount`

`SignatureReward`

`AttestationSignerAccount`

`Destination`

`OtherChainSource`

`XChainAccountCreateCommit`

`PublicKey`

`Signature`

`SignatureReward`

`XChainAccountCreateCommit`

`WasLockingChainSend`

`XChainAccountCreateCount`

`XChainBridge`


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

- XChainOwnedCreateAccountClaimID entry

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e3ec8026-6eec-43ac-a432-0c2174d6a3d3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e3ec8026-6eec-43ac-a432-0c2174d6a3d3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d96d9e0a-fa20-4d78-ba24-8ef882f1ab24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d96d9e0a-fa20-4d78-ba24-8ef882f1ab24&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=bc550f60-e469-4a58-be3a-b31cc7f627c6&bo=1&sid=cab807709da311f09c923f81ada247bc&vid=cab880909da311f0a92217880898e6f9&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=XChainAddAccountCreateAttestation&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&r=&lt=3278&evt=pageLoad&sv=2&cdb=AQAS&rn=618544)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=87bd5a99-8da2-4a53-bc63-e472ebc84b97&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=87bd5a99-8da2-4a53-bc63-e472ebc84b97&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61d35af4-8c47-4ca8-a31d-18957c16c79d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=61d35af4-8c47-4ca8-a31d-18957c16c79d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=53307e9c-77c7-499f-8736-86d1b75e6307&pt=XChainAddAccountCreateAttestation&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes%2Fxchainaddaccountcreateattestation&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types/xchainaddaccountcreateattestation#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types/xchainaddaccountcreateattestation#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types/xchainaddaccountcreateattestation#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types/xchainaddaccountcreateattestation#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/xchainaddaccountcreateattestation.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/master/src/ripple/protocol/impl/TxFormats.cpp#L447-L464)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:18:56.086Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
