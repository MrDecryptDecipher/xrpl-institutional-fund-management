# Transaction Types
URL: https://xrpl.org/docs/references/protocol/transactions/types
Section: H2

## Overview


## Extracted Content
# Transaction Types

The type of a transaction (TransactionType field) is the most fundamental information about a transaction. This indicates what type of operation the transaction is supposed to do.

`TransactionType`

All transactions have certain fields in common:

- Common Fields

Each transaction type has additional fields relevant to the type of action it causes.

- AccountDeleteDelete an account.
- AccountSetSet options on an account.
- AMMBidBid on an Automated Market Maker's auction slot, which grants a discounted fee.
- AMMClawbackClaw back tokens from a holder who has deposited your issued tokens into an Automated Market Maker pool.
- AMMCreateCreate a new Automated Market Maker for trading a given pair of assets.
- AMMDeleteDelete an Automated Market Maker with an empty asset pool.
- AMMDepositDeposit funds into an Automated Market Maker in exchange for LPTokens.
- AMMVoteVote on the trading fee for an Automated Market Maker.
- AMMWithdrawReturn LPTokens to an Automated Market Maker in exchange for a share of the assets the pool holds.
- BatchCreate and submit a batch of up to 8 transactions that succeed or fail atomically.
- CredentialAcceptAccept a credential provisionally issued to your account.
- CredentialCreateProvisionally issue a credential to a subject account.
- CredentialDeleteRemove a credential from the ledger, effectively revoking it.
- CheckCancelCancel a check.
- CheckCashRedeem a check.
- CheckCreateCreate a check.
- ClawbackClaw back tokens you've issued.
- DepositPreauthPreauthorize an account to send payments to you.
- DelegateSetGrant another account permission to send some transactions for you, or revoke that permission.
- DIDDeleteDelete a Decentralized Identifier.
- DIDSetCreate or update a Decentralized Identifier.
- EscrowCancelCancel an expired escrow, returning the funds to the sender.
- EscrowCreateEscrow funds, which can be released to the destination after a specific time or condition.
- EscrowFinishDeliver escrowed funds to the intended recipient.
- LedgerStateFixRepair corruptions to the XRP ledger's state data.
- MPTokenAuthorizeSet up your account to receive a specific MPT as a holder; or authorize a holder as an MPT issuer.
- MPTokenIssuanceCreateDefine the properties of a new Multi-Purpose Token (MPT).
- MPTokenIssuanceDestroyDelete a Multi-Purpose Token definition.
- MPTokenIssuanceSetSet mutable properties of a Multi-Purpose Token definition.
- NFTokenAcceptOfferAccept an offer to buy or sell an NFT.
- NFTokenBurnPermanently destroy an NFT.
- NFTokenCancelOfferCancel offers to buy or sell an NFT.
- NFTokenCreateOfferCreate an offer to buy or sell an NFT.
- NFTokenMintMint a Non-Fungible Token (NFT).
- NFTokenModifyModify a dynamic NFT.
- OfferCancelWithdraw an offer to trade in the decentralized exchange.
- OfferCreateOffer to trade currencies in the decentralized exchange; create a limit order.
- OracleDeleteDelete a price oracle.
- OracleSetCreate or update a price oracle.
- PaymentSend funds to another account, convert between currencies, or create a new account by sending it XRP.
- PaymentChannelClaimClaim funds from a payment channel.
- PaymentChannelCreateOpen a new payment channel.
- PaymentChannelFundAdd more funds to a payment channel.
- PermissionedDomainDeleteDelete a permissioned domain.
- PermissionedDomainSetCreate or update a permissioned domain.
- SetRegularKeyAdd, remove, or modify an account's regular key pair.
- SignerListSetAdd, remove, or modify an account's multi-signing list.
- TicketCreateSet aside one or more sequence numbers as tickets.
- TrustSetAdd or modify a trust line.
- XChainAccountCreateCommitCreate an account on another chain to serve as a door account for a cross-chain bridge.
- XChainAddAccountCreateAttestationProvide an attestation that an XChainAccountCreateCommit transaction occurred on another chain, for a cross-chain bridge.
- XChainAddClaimAttestationProvide an attestation that an XChainCommit transaction occurred on another chain, for a cross-chain bridge.
- XChainClaimComplete a cross-chain transfer of value by claiming the value on the destination chain.
- XChainCommitStart a cross-chain transfer of value.
- XChainCreateBridgeCreate a bridge between two chains.
- XChainCreateClaimIDCreate a cross-chain claim ID that is used for a cross-chain transfer.
- XChainModifyBridgeModify the parameters of a cross-chain bridge.

Delete an account.

Set options on an account.

Bid on an Automated Market Maker's auction slot, which grants a discounted fee.

Claw back tokens from a holder who has deposited your issued tokens into an Automated Market Maker pool.

Create a new Automated Market Maker for trading a given pair of assets.

Delete an Automated Market Maker with an empty asset pool.

Deposit funds into an Automated Market Maker in exchange for LPTokens.

Vote on the trading fee for an Automated Market Maker.

Return LPTokens to an Automated Market Maker in exchange for a share of the assets the pool holds.

Create and submit a batch of up to 8 transactions that succeed or fail atomically.

Accept a credential provisionally issued to your account.

Provisionally issue a credential to a subject account.

Remove a credential from the ledger, effectively revoking it.

Cancel a check.

Redeem a check.

Create a check.

Claw back tokens you've issued.

Preauthorize an account to send payments to you.

Grant another account permission to send some transactions for you, or revoke that permission.

Delete a Decentralized Identifier.

Create or update a Decentralized Identifier.

Cancel an expired escrow, returning the funds to the sender.

Escrow funds, which can be released to the destination after a specific time or condition.

Deliver escrowed funds to the intended recipient.

Repair corruptions to the XRP ledger's state data.

Set up your account to receive a specific MPT as a holder; or authorize a holder as an MPT issuer.

Define the properties of a new Multi-Purpose Token (MPT).

Delete a Multi-Purpose Token definition.

Set mutable properties of a Multi-Purpose Token definition.

Accept an offer to buy or sell an NFT.

Permanently destroy an NFT.

Cancel offers to buy or sell an NFT.

Create an offer to buy or sell an NFT.

Mint a Non-Fungible Token (NFT).

Modify a dynamic NFT.

Withdraw an offer to trade in the decentralized exchange.

Offer to trade currencies in the decentralized exchange; create a limit order.

Delete a price oracle.

Create or update a price oracle.

Send funds to another account, convert between currencies, or create a new account by sending it XRP.

Claim funds from a payment channel.

Open a new payment channel.

Add more funds to a payment channel.

Delete a permissioned domain.

Create or update a permissioned domain.

Add, remove, or modify an account's regular key pair.

Add, remove, or modify an account's multi-signing list.

Set aside one or more sequence numbers as tickets.

Add or modify a trust line.

Create an account on another chain to serve as a door account for a cross-chain bridge.

Provide an attestation that an XChainAccountCreateCommit transaction occurred on another chain, for a cross-chain bridge.

Provide an attestation that an XChainCommit transaction occurred on another chain, for a cross-chain bridge.

Complete a cross-chain transfer of value by claiming the value on the destination chain.

Start a cross-chain transfer of value.

Create a bridge between two chains.

Create a cross-chain claim ID that is used for a cross-chain transfer.

Modify the parameters of a cross-chain bridge.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e52369e6-797e-470e-81be-12f60236bf9e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e52369e6-797e-470e-81be-12f60236bf9e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=af2445b8-8c05-4607-acc0-5e44d2340026&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=af2445b8-8c05-4607-acc0-5e44d2340026&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=c259ccf9-7c96-45e6-a863-b1e01d7dfaa4&bo=1&sid=538da4d09da111f09d5219b93acb6ba9&vid=538e79e09da111f0a1311dea4633259f&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Transaction%20Types&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&r=&lt=2984&evt=pageLoad&sv=2&cdb=AQAS&rn=77399)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d7c045cd-f80a-480d-bfd1-d6dc5f1afec9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d7c045cd-f80a-480d-bfd1-d6dc5f1afec9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a7f3fbb0-4950-4b89-aef5-fedc685aba13&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a7f3fbb0-4950-4b89-aef5-fedc685aba13&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=aafac5b3-a6bd-429e-85dc-46193821219c&pt=Transaction%20Types&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fprotocol%2Ftransactions%2Ftypes&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/protocol/transactions/types#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/protocol/transactions/types#)
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
- [Resources](https://xrpl.org/docs/references/protocol/transactions/types#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/protocol/transactions/types#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.436a48505811bd787f043433d17bb5a4.1759197666670.1759197666670.1759197666670.1&__hssc=78174987.1.1759197666670&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/protocol/transactions/types/index.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.436a48505811bd787f043433d17bb5a4.1759197666670.1759197666670.1759197666670.1&__hssc=78174987.1.1759197666670&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T02:01:18.609Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
