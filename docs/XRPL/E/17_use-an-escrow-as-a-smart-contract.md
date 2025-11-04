# Use an Escrow as a Smart Contract
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/use-an-escrow-as-a-smart-contract
Section: E17

## Overview


## Extracted Content
# Use an Escrow as a Smart Contract

A smart contract is a blockchain-based program that encodes the conditions and fulfillment of an agreement between two or more parties and automatically fulfills the terms of the agreement once conditions are met. A smart contract can help you exchange anything of value in a transparent, traceable, tamper-resistant, and irreversible way.

The benefit of encoding a smart contract into a blockchain is that it enables the contract to be securely carried out without traditional third-parties, like financial or legal institutions. Instead, the contract is supervised by the distributed, decentralized network of computers that run the blockchain.

You can use XRP Ledger escrows as smart contracts that release XRP after a certain time has passed or after a cryptographic condition has been fulfilled. In this case, we'll use an escrow as a smart contract that releases XRP after a cryptographic condition has been fulfilled.

Let's use this scenario to help illustrate this use case: A party planner uses smart contracts to manage payments from party hosts to party vendors. Specifically, the party planner wants to use a smart contract to have the party host pay the party band 2000 XRP once they are done with their set.

In this use case, the party host is the sender of the escrow, the party band is the receiver of the escrow, and the party planner is playing the role of an oracle. In the context of smart contracts, an oracle is a neutral third-party agent that can verify real-world events to either fulfill or invalidate a smart contract. This use case uses a human oracle for illustrative purposes, but in real-life, a software application would more likely play the role of the oracle.

Using an XRP Ledger escrow to provide this smart contract is a great arrangement because the party planner, as the third-party oracle, never "holds" the funds as one might in a traditional escrow arrangement, and can't possibly take the funds for themselves.

Here’s a roadmap to the high-level tasks that these participants need to complete to use an escrow as a smart contract.


## Meet the prerequisites

The party host (sender) must have:

- An XRP Ledger account that holds enough XRP to pay for escrow and any fees incurred.
- Access to a secure signing environment, which includes having a network connection to a rippled server (any server) that they can submit signed transactions to.

An XRP Ledger account that holds enough XRP to pay for escrow and any fees incurred.

Access to a secure signing environment, which includes having a network connection to a rippled server (any server) that they can submit signed transactions to.

`rippled`

The party band (receiver) must have:

- An XRP Ledger account that can receive the XRP paid by the escrow.
- Access to a rippled server that they can use to look up the details of an XRP Ledger transaction hash and submit the fulfillment value to finish the escrow.

An XRP Ledger account that can receive the XRP paid by the escrow.

Access to a rippled server that they can use to look up the details of an XRP Ledger transaction hash and submit the fulfillment value to finish the escrow.

`rippled`

The party planner (oracle) must have:

- The ability to generate a condition and a fulfillment.
- To be able to keep a secret (the fulfillment) until the time is right.
- A way to communicate the fulfillment publicly or at least to the party band when the time is right.
- The ability to recognize whether the party band has fulfilled their end of the contract (played at the party).

The ability to generate a condition and a fulfillment.

To be able to keep a secret (the fulfillment) until the time is right.

A way to communicate the fulfillment publicly or at least to the party band when the time is right.

The ability to recognize whether the party band has fulfilled their end of the contract (played at the party).


## Define the terms of the smart contract

To create the escrow as a smart contract, the participants must first define the terms of the contract. In this scenario, the participants need to agree on the following details.

- Should the escrow disallow fulfillment until a specific time?While this is an option, the participants agree that it is unnecessary for their escrow. For conditionally-held escrows, enabling this option doesn't provide any additional security, since whether the escrow can be finished still depends entirely on whether the party planner (oracle) publishes the fulfillment before the expiration.
- Should the escrow expire?Absolutely yes. The participants agree that the escrow should expire after 12 noon the day after the party. This gives the party band (receiver) enough time to finish the escrow, after the party planner verifies that they fulfilled their end of the contract and publishes the cryptographic fulfillment. After expiration, the locked XRP returns to the party host's (sender's) account.

If the participants don't allow the escrow to expire and the party planner doesn't release the condition, the XRP stays locked in the escrow forever.
- How much XRP should the escrow lock up and potentially pay?The participants agree that the escrow should lock up and potentially pay 2000 XRP, which is the party band's fee.
- From which XRP Ledger account should the escrow lock up XRP for potential payment to the party band?The participants agree that the escrow should lock up and potentially pay XRP out of the party host's XRP Ledger account.
- Which XRP Ledger account should the escrow potentially pay XRP to?The participants agree that the escrow should potentially pay XRP to the party band's XRP Ledger account.

Should the escrow disallow fulfillment until a specific time?

```
While this is an option, the participants agree that it is unnecessary for their escrow. For conditionally-held escrows, enabling this option doesn't provide any additional security, since whether the escrow can be finished still depends entirely on whether the party planner (oracle) publishes the fulfillment before the expiration.
```

Should the escrow expire?

```
Absolutely yes. The participants agree that the escrow should expire after 12 noon the day after the party. This gives the party band (receiver) enough time to finish the escrow, after the party planner verifies that they fulfilled their end of the contract and publishes the cryptographic fulfillment. After expiration, the locked XRP returns to the party host's (sender's) account.

If the participants don't allow the escrow to expire and the party planner doesn't release the condition, the XRP stays locked in the escrow forever.
```

How much XRP should the escrow lock up and potentially pay?

```
The participants agree that the escrow should lock up and potentially pay 2000 XRP, which is the party band's fee.
```

From which XRP Ledger account should the escrow lock up XRP for potential payment to the party band?

```
The participants agree that the escrow should lock up and potentially pay XRP out of the party host's XRP Ledger account.
```

Which XRP Ledger account should the escrow potentially pay XRP to?

```
The participants agree that the escrow should potentially pay XRP to the party band's XRP Ledger account.
```


## Oracle: Generate a condition and a fulfillment

Because participants want to create a conditionally-held escrow to provide the smart contract, they need a condition value and a fulfillment value. In this scenario, the participant that creates these values is the neutral party planner (oracle).

The party planner generates the condition and fulfillment values. The party planner provides the condition value to the party host, who creates the escrow. The party planner also provides the condition to the party band so that they know that this is the right condition.

The party planner must keep the fulfillment value a secret. Anyone can use the condition and fulfillment values to finish the escrow. Most often, the receiver finishes the escrow because they're the ones who are motivated to get paid.

Generate a condition and a fulfillment >


## Sender: Calculate time values needed for the escrow

Because the participants want the escrow to be eligible for cancellation after 12 noon the day after the party, the party host (sender) must calculate a CancelAfter value to include in the escrow definition.

`CancelAfter`

Calculate time values needed for the escrow >


## Sender: Create the escrow

The party host (sender) creates the escrow that provides the smart contract. The party host must create the escrow because they are the only participant that can authorize the lock up and potential payout of XRP from their XRP Ledger account.

Create the escrow >


## Sender and Receiver: Wait for validation and confirm escrow creation

The party host (sender) waits for validation of the ledger that contains the escrow creation transaction and then confirms that the escrow was created.

Wait for validation >

The party host then provides the escrow transaction's hash value to the party band (receiver). The party band can use the hash value to look up the escrow transaction on the XRP Ledger to ensure that it was created according to the smart contract terms they agreed to. As part of this step, the party band should confirm that the condition matches the one the party planner (oracle) provided. If the condition is wrong, the fulfillment the party planner provides won't let the party band finish the escrow and get paid.

`hash`

`hash`

confirm escrow creation >


## Receiver: Finish the escrow

The party band (receiver) shows up and plays their set.

The party planner (oracle) is present at the party to ensure that everything is going smoothly. The party planner confirms first-hand that the party band has fulfilled their contract and publishes the fulfillment publicly, or at least to the party band.

The party band must finish the escrow before 12 noon. If they don't, the escrow expires and the party band doesn't get paid.

If the party planner does not publish the fulfillment (the party band is a no show) or if the party planner publishes the fulfillment, but no one finishes the escrow; after 12 noon the next day, anyone can cancel the escrow. Cancelling the escrow returns the held XRP to the party host's account.

Finish the escrow >


## Receiver and Sender: Wait for validation and confirm final result

The party band (receiver) waits for validation of the ledger that contains the escrow finish transaction and then confirms that the escrow was finished.

At this time, the party band provides the transaction's hash value to the party host (sender). They can use the hash value to look up the escrow transaction on the XRP Ledger to ensure that it is been finished correctly.

`hash`

`hash`

The party band can check their XRP Ledger account balance to ensure that their balance has increased by 2000 XRP. The party host's balance won't change at this step (unless the escrow was canceled) because the escrow creation already debited the locked-up XRP from their account.

Wait for validation >

confirm final result >

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=17a4ef96-c6ff-46ea-9d80-5dc9cbc5e12d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=17a4ef96-c6ff-46ea-9d80-5dc9cbc5e12d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8bac503d-d074-444c-b44e-631b3237c379&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8bac503d-d074-444c-b44e-631b3237c379&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=57b8980c-befd-4592-a6bd-8f36100870b2&bo=1&sid=434abba09d9e11f0955f435d7322cb11&vid=43514b309d9e11f0be76317318fe2d70&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Use%20an%20Escrow%20as%20a%20Smart%20Contract&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&r=&lt=3770&evt=pageLoad&sv=2&cdb=AQAS&rn=404956)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ac48d806-7009-44a4-80d6-e565664088f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=ac48d806-7009-44a4-80d6-e565664088f3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6a01a8eb-94ce-4d81-abf0-93a2478aab99&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6a01a8eb-94ce-4d81-abf0-93a2478aab99&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=4bc4fd42-7873-40da-8b0c-9ef9683f63c2&pt=Use%20an%20Escrow%20as%20a%20Smart%20Contract&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Fuse-an-escrow-as-a-smart-contract&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/use-an-escrow-as-a-smart-contract#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/use-an-escrow-as-a-smart-contract#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/use-an-escrow-as-a-smart-contract#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/use-an-escrow-as-a-smart-contract#)
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
- [Public Servers](https://xrpl.org/docs/tutorials/public-servers)
- [JavaScript](https://xrpl.org/docs/tutorials/javascript)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f8c33dcc3c6fd7d087dd93af57cefb35.1759196350563.1759196350563.1759196350563.1&__hssc=78174987.1.1759196350564&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/use-an-escrow-as-a-smart-contract.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.f8c33dcc3c6fd7d087dd93af57cefb35.1759196350563.1759196350563.1759196350563.1&__hssc=78174987.1.1759196350564&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:39:23.797Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
