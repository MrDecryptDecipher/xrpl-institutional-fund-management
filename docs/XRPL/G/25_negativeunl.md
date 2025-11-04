# NegativeUNL
URL: https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/negativeunl
Section: G25

## Overview


## Extracted Content
# NegativeUNL

[Source]

(Added by the NegativeUNL amendment.)

The NegativeUNL ledger entry type contains the current status of the Negative UNL, a list of trusted validators currently believed to be offline.

`NegativeUNL`

Each ledger version contains at most one NegativeUNL entry. If no validators are currently disabled or scheduled to be disabled, there is no NegativeUNL entry.

`NegativeUNL`

`NegativeUNL`


## Example NegativeUNL JSON

```
{
    "DisabledValidators": [
      {
        "DisabledValidator": {
          "FirstLedgerSequence": 91371264,
          "PublicKey": "ED58F6770DB5DD77E59D28CB650EC3816E2FC95021BB56E720C9A12DA79C58A3AB"
        }
      }
    ],
    "Flags": 0,
    "LedgerEntryType": "NegativeUNL",
    "PreviousTxnID": "8D47FFE664BE6C335108DF689537625855A6A95160CC6D351341B92624D9C5E3",
    "PreviousTxnLgrSeq": 91442944,
    "index": "2E8A59AA9D3B5B186B0B9E0F62E6C02587CA74A4D778938E957B6357D364B244"
}
```


## NegativeUNL Fields

In addition to the common fields, the NegativeUNL ledger entry has the following fields:

`NegativeUNL`

| Name | JSON Type | Internal Type | Required? | Description |
| --- | --- | --- | --- | --- |
| DisabledValidators | Array | Array | No | A list of DisabledValidator objects (see below), each representing a trusted validator that is currently disabled. |
| LedgerEntryType | String | UInt16 | Yes | The value 0x004E, mapped to the string NegativeUNL, indicates that this entry is the Negative UNL. |
| PreviousTxnID | String | UInt256 | No | The identifying hash of the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| PreviousTxnLgrSeq | Number | UInt32 | No | The index of the ledger that contains the transaction that most recently modified this entry. (Added by the fixPreviousTxnID amendment.) |
| ValidatorToDisable | String | Blob | No | The public key of a trusted validator that is scheduled to be disabled in the next flag ledger. |
| ValidatorToReEnable | String | Blob | No | The public key of a trusted validator in the Negative UNL that is scheduled to be re-enabled in the next flag ledger. |


`DisabledValidators`

`DisabledValidator`

`LedgerEntryType`

`0x004E`

`NegativeUNL`

`PreviousTxnID`

`PreviousTxnLgrSeq`

`ValidatorToDisable`

`ValidatorToReEnable`


### DisabledValidator Objects

Each DisabledValidator object represents one disabled validator. In JSON, a DisabledValidator object has one field, DisabledValidator, which in turn contains another object with the following fields:

`DisabledValidator`

`DisabledValidator`

`DisabledValidator`

| Name | JSON Type | Internal Type | Description |
| --- | --- | --- | --- |
| FirstLedgerSequence | Number | UInt32 | The ledger index when the validator was added to the Negative UNL. |
| PublicKey | String | Blob | The master public key of the validator, in hexadecimal. |


`FirstLedgerSequence`

`PublicKey`


## NegativeUNL Flags

There are no flags defined for the NegativeUNL entry.

`NegativeUNL`


## NegativeUNL ID Format

The ID of the NegativeUNL entry is the hash of the NegativeUNL space key (0x004E) only. This means that the ID is always:

`NegativeUNL`

`NegativeUNL`

`0x004E`

```
2E8A59AA9D3B5B186B0B9E0F62E6C02587CA74A4D778938E957B6357D364B244
```

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a0c88a3a-fbbb-4c6d-b3bd-6a537487daab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a0c88a3a-fbbb-4c6d-b3bd-6a537487daab&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d86ab198-2b35-47d9-9030-1009b5fb42ff&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d86ab198-2b35-47d9-9030-1009b5fb42ff&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d25c2c1d-1f2f-4435-a84b-1d3b7e17aeac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d25c2c1d-1f2f-4435-a84b-1d3b7e17aeac&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a3c3fe37-c759-4ee2-a102-db609df77f04&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a3c3fe37-c759-4ee2-a102-db609df77f04&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=bbd8ed40-50b8-4b5d-a7b1-372a31019e43&pt=NegativeUNL&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=039a7ec0-67fe-46e4-b3ab-81cee78c5acb&bo=1&sid=a2340b709da011f0b364ff75530f7c08&vid=a23492c09da011f0ad84e5626aecab4b&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=NegativeUNL&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Fledger-data%2Fledger-entry-types%2Fnegativeunl&r=&lt=3956&evt=pageLoad&sv=2&cdb=AQAS&rn=918873)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/negativeunl#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/negativeunl#)
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
- [Resources](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/negativeunl#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/negativeunl#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.897c08f81a5c0d608249e3f44b4ec056.1759197369136.1759197369136.1759197369136.1&__hssc=78174987.1.1759197369136&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/ledger-data/ledger-entry-types/negativeunl.md)
- [[Source]](https://github.com/XRPLF/rippled/blob/f64cf9187affd69650907d0d92e097eb29693945/include/xrpl/protocol/detail/ledger_entries.macro#L85-L91)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.897c08f81a5c0d608249e3f44b4ec056.1759197369136.1759197369136.1759197369136.1&__hssc=78174987.1.1759197369136&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:56:17.529Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
