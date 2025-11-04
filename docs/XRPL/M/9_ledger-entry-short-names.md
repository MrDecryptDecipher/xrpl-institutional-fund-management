# Short Names of Ledger Entries
URL: https://xrpl.org/docs/references/http-websocket-apis/api-conventions/ledger-entry-short-names
Section: M9

## Overview


## Extracted Content
# Short Names of Ledger Entries

Some API methods, specifically the account_objects method and ledger_data method, allow filtering the ledger entries they return based on the type of ledger entry. The type field you specify can use either the canonical name of the ledger entry or a short name, as in the following table.

The "Ownable" column indicates whether the ledger entry type can appear in owner directories. Ledger entries that are not ownable cannot appear in account_objects responses and cannot be used as a type filter in that method.

`account_objects`

`type`

| Canonical Name | Short Name | Ownable | Related Amendment |
| --- | --- | --- | --- |
| AccountRoot | account | No |  |
| Amendments | amendments | No |  |
| AMM | amm | No | Requires the AMM. Error loading amendment status: Failed to fetch |
| Bridge | bridge | Yes | Requires the XChainBridge. Error loading amendment status: Failed to fetch |
| Check | check | Yes | Requires the Checks. Error loading amendment status: Failed to fetch |
| Credential | credential | Yes | Requires the Credentials. Error loading amendment status: Failed to fetch |
| Delegate | delegate | Yes | Requires the PermissionDelegation. Error loading amendment status: Failed to fetch |
| DepositPreauth | deposit_preauth | Yes | Requires the DepositPreauth. Error loading amendment status: Failed to fetch |
| DID | did | Yes | Requires the DID. Error loading amendment status: Failed to fetch |
| DirectoryNode | directory | No |  |
| Escrow | escrow | Yes |  |
| FeeSettings | fee | No |  |
| LedgerHashes | hashes | No |  |
| MPToken | mptoken | Yes | Requires the MPTokensV1. Error loading amendment status: Failed to fetch |
| MPTokenIssuance | mpt_issuance | Yes | Requires the MPTokensV1. Error loading amendment status: Failed to fetch |
| NegativeUNL | nunl | No | Requires the NegativeUNL. Error loading amendment status: Failed to fetch |
| NFTokenOffer | nft_offer | Yes | Requires the NonFungibleTokensV1_1. Error loading amendment status: Failed to fetch |
| NFTokenPage | nft_page | Yes | Requires the NonFungibleTokensV1_1. Error loading amendment status: Failed to fetch |
| Offer | offer | Yes |  |
| Oracle | oracle | Yes | Requires the PriceOracle. Error loading amendment status: Failed to fetch |
| PayChannel | payment_channel | Yes |  |
| PermissionedDomain | permissioned_domain | Yes | Requires the PermissionedDomains. Error loading amendment status: Failed to fetch |
| RippleState | state | Yes |  |
| SignerList | signer_list | Yes |  |
| Ticket | ticket | Yes | Requires the TicketBatch. Error loading amendment status: Failed to fetch |
| XChainOwnedClaimID | xchain_owned_claim_id | Yes | Requires the XChainBridge. Error loading amendment status: Failed to fetch |
| XChainOwnedCreateAccountClaimID | xchain_owned_create_account_claim_id | Yes | Requires the XChainBridge. Error loading amendment status: Failed to fetch |


`AccountRoot`

`account`

`Amendments`

`amendments`

`AMM`

`amm`

Requires the AMM. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`Bridge`

`bridge`

Requires the XChainBridge. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`Check`

`check`

Requires the Checks. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`Credential`

`credential`

Requires the Credentials. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`Delegate`

`delegate`

Requires the PermissionDelegation. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`DepositPreauth`

`deposit_preauth`

Requires the DepositPreauth. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`DID`

`did`

Requires the DID. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`DirectoryNode`

`directory`

`Escrow`

`escrow`

`FeeSettings`

`fee`

`LedgerHashes`

`hashes`

`MPToken`

`mptoken`

Requires the MPTokensV1. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`MPTokenIssuance`

`mpt_issuance`

Requires the MPTokensV1. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`NegativeUNL`

`nunl`

Requires the NegativeUNL. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`NFTokenOffer`

`nft_offer`

Requires the NonFungibleTokensV1_1. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`NFTokenPage`

`nft_page`

Requires the NonFungibleTokensV1_1. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`Offer`

`offer`

`Oracle`

`oracle`

Requires the PriceOracle. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`PayChannel`

`payment_channel`

`PermissionedDomain`

`permissioned_domain`

Requires the PermissionedDomains. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`RippleState`

`state`

`SignerList`

`signer_list`

`Ticket`

`ticket`

Requires the TicketBatch. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`XChainOwnedClaimID`

`xchain_owned_claim_id`

Requires the XChainBridge. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

`XChainOwnedCreate`

`AccountClaimID`

`xchain_owned_`

`create_account_claim_id`

Requires the XChainBridge. Error loading amendment status: Failed to fetch

> **Note**: Error loading amendment status: Failed to fetch

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=33d0320b-9a43-4225-8cd6-e7e9b45e38eb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=33d0320b-9a43-4225-8cd6-e7e9b45e38eb&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bbd6ff0a-2c49-46de-b2a7-f846a3c9121f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bbd6ff0a-2c49-46de-b2a7-f846a3c9121f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=dce11090-8259-4c2c-9e7e-01e1f6b36b39&bo=1&sid=1ade8ae09da511f09b1fe30513a90068&vid=1adee7a09da511f0a97fc58523c31498&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Short%20Names%20of%20Ledger%20Entries&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&r=&lt=1605&evt=pageLoad&sv=2&cdb=AQAS&rn=745472)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2a13ce39-eb16-4225-82cf-fbd813e84da4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=2a13ce39-eb16-4225-82cf-fbd813e84da4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6c980378-1e10-47ec-a68a-439928d1446f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6c980378-1e10-47ec-a68a-439928d1446f&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=3ba3ebab-8c2f-43de-9761-95f218b76bd0&pt=Short%20Names%20of%20Ledger%20Entries&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fhttp-websocket-apis%2Fapi-conventions%2Fledger-entry-short-names&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/ledger-entry-short-names#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/ledger-entry-short-names#)
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
- [Resources](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/ledger-entry-short-names#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/ledger-entry-short-names#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.93c73702b2481722f046df4cf28baaaa.1759199290905.1759199290905.1759199290905.1&__hssc=78174987.1.1759199290905&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/http-websocket-apis/api-conventions/ledger-entry-short-names.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.93c73702b2481722f046df4cf28baaaa.1759199290905.1759199290905.1759199290905.1&__hssc=78174987.1.1759199290905&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:28:24.151Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
