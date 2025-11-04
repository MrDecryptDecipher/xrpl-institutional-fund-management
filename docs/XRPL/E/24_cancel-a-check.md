# Cancel a Check
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cancel-a-check
Section: E24

## Overview


## Extracted Content
# Cancel a Check

This tutorial shows how to cancel a Check, which removes the Check entry from the ledger without sending money.

You may want to cancel an incoming Check if you do not want it. You might cancel an outgoing Check if you made a mistake when sending it or if circumstances have changed. If a Check expires, it's also necessary to cancel it to remove it from the ledger so the sender gets their owner reserve back.


## Prerequisites

- You should be familiar with the basics of using the xrpl.js client library.
- You need an XRP Ledger account including its secret key. (You can get one on Testnet for free.) See also: XRP Faucets.
- You need the ID of a Check ledger entry that you are either the sender or recipient of. See also: Send a Check.


## Source Code

The complete source code for this tutorial is available in the source repository for this website:

Checks sample code


## Steps


### 1. Prepare the CheckCancel transaction

Figure out the values of the CheckCancel transaction fields. The following fields are the bare minimum; everything else is either optional or can be auto-filled when signing:

| Field | Value | Description |
| --- | --- | --- |
| TransactionType | String | Use the string CheckCancel when canceling a Check. |
| Account | String (Address) | The address of the sender who is canceling the Check. (In other words, your address.) |
| CheckID | String | The ID of the Check entry to cancel. You can get this information when you send a check, or by looking up checks. |


`TransactionType`

`CheckCancel`

`Account`

`CheckID`

For example:

```
// Prepare the transaction ------------------------------------------------
    const checkcancel = {
        "TransactionType": "CheckCancel",
        "Account": wallet.address,
        "CheckID": check_id
    };
```


### 2. Submit the CheckCancel transaction

Submit the CheckCancel transaction in the usual way and wait for it to be validated. If the result code is tesSUCCESS and the transaction is in a validated ledger, the transaction is successful. For example:

`tesSUCCESS`

```
// Submit the transaction -------------------------------------------------
    const tx = await client.submitAndWait(
      checkcancel, 
      { autofill: true, 
          wallet: wallet }
    )
```


## 3. Confirm transaction result

If the transaction succeeded, it should have a "TransactionResult": "tesSUCCESS" field in the metadata, and the field "validated": true in the result, indicating that this result is final. For example:

`"TransactionResult": "tesSUCCESS"`

`"validated": true`

```
// Confirm results --------------------------------------------------------
    console.log(`Transaction result: ${JSON.stringify(tx, null, 2)}`)

    if (tx.result.meta.TransactionResult === "tesSUCCESS") {
      // submitAndWait() only returns when the transaction's outcome is final,
      // so you don't also have to check for validated: true.
      console.log("Transaction was successful.")
    }
```

TipThe submitAndWait() method in xrpl.js only returns when the transaction's result is final, so you can assume that the transaction is validated if it returns a result code of tesSUCCESS.

`submitAndWait()`

`tesSUCCESS`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4525459e-fa79-4957-9478-55982ce37513&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4525459e-fa79-4957-9478-55982ce37513&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a48b4141-b8fc-4bf5-9ce7-10d21d8e617e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a48b4141-b8fc-4bf5-9ce7-10d21d8e617e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6b47b971-bbaf-4fc6-87c8-0ed289877f1c&bo=1&sid=a4d5b9f09d9e11f0b01c05d4e899ffe9&vid=a4d610a09d9e11f0b73ebb91be31ba0b&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Cancel%20a%20Check&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&r=&lt=3605&evt=pageLoad&sv=2&cdb=AQAS&rn=626093)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3dd258df-3d94-4dc9-92fc-c1b8dd5f38ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3dd258df-3d94-4dc9-92fc-c1b8dd5f38ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=772f2157-8c88-4764-807d-5e06baa1e0cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=772f2157-8c88-4764-807d-5e06baa1e0cd&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=72b3401f-fbff-411b-b521-e832330e9a8f&pt=Cancel%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcancel-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cancel-a-check#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cancel-a-check#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cancel-a-check#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cancel-a-check#)
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
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cancel-a-check.md)
- [Checks sample code](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/checks/js/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:42:03.636Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
