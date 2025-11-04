# Cash a Check for an Exact Amount
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-an-exact-amount
Section: E22

## Overview


## Extracted Content
# Cash a Check for an Exact Amount

This tutorial shows how to cash a Check for an exact amount. As long as the Check is not expired, the specified recipient can cash it to receive any exact amount up to the amount specified. You would cash a Check this way if you want to receive a specific amount, for example to pay off an invoice or bill exactly. If the sender does not have enough money, cashing the check fails but you can try again later.

You can also cash a check for a flexible amount.


## Prerequisites

- You should be familiar with the basics of using the xrpl.js client library.
- You need an XRP Ledger account including its secret key. (You can get one on Testnet for free.) See also: XRP Faucets.
- You need the ID of a Check ledger entry that you are the recipient of. See also: Send a Check and Look Up Checks.


## Source Code

The complete source code for this tutorial is available in the source repository for this website:

Checks sample code


## Steps


### 1. Prepare the CheckCash transaction

Figure out the values of the CheckCash transaction fields. You also need to create a Wallet instance for your account's key pair. To cash a check for an exact amount, the following fields are the bare minimum; everything else is either optional or can be auto-filled when signing:

`Wallet`

| Field | Value | Description |
| --- | --- | --- |
| TransactionType | String | The value CheckCash indicates this is a CheckCash transaction. |
| Account | String - Address | The address of the sender who is cashing the Check. (In other words, your address.) |
| CheckID | String | The ID of the Check to cash. You can get this information from the person who sent you the Check, or by looking up checks where your account is the destination. |
| Amount | Currency Amount | The amount to receive. The type of currency (token or XRP) must match the Check object. The quantity in the value field must be less than or equal to the amount in the Check object. (For currencies with transfer fees, you must cash the Check for less than its SendMax so the transfer fee can be paid by the SendMax.) For more information on specifying currency amounts, see Specifying Currency Amounts. |


`TransactionType`

`CheckCash`

`Account`

`CheckID`

`Amount`

`value`

`SendMax`

`SendMax`

In the sample code, these values are hard-coded, so you should edit them to match your case:

```
// Define parameters. Edit this code with your values before running it.
const secret = "s████████████████████████████" // Replace with your secret
const check_id =  "49D339B76FAB3FE3C9DFAD32EB7DB9269FD07B07E165DD7BAFDF68D14CE6CAB8"
const amount = "30000000" // Replace with the amount you want to cash
               // String for XRP in drops
               // {currency, issuer, value} object for token amount
```

Then, you use these parameters to fill out the transaction. For example:

```
// Prepare the transaction ------------------------------------------------
    const checkcash = {
        TransactionType: "CheckCash",
        Account: wallet.address,
        CheckID: check_id,
        Amount: amount
    }
```


### 2. Submit the transaction

Send the transaction and wait for it to be validated by the consensus process, as normal:

```
// Submit the transaction -------------------------------------------------
    const tx = await client.submitAndWait(
      checkcash, 
      { autofill: true, 
          wallet: wallet }
    )
```


### 3. Confirm transaction result

If the transaction succeeded, it should have a "TransactionResult": "tesSUCCESS" field in the metadata, and the field "validated": true in the result, indicating that this result is final.

`"TransactionResult": "tesSUCCESS"`

`"validated": true`

TipThe submitAndWait() method in xrpl.js only returns when the transaction's result is final, so you can assume that the transaction is validated if it returns a result code of tesSUCCESS.

`submitAndWait()`

`tesSUCCESS`

You can look at the transaction metadata to confirm the balance changes that occurred as a result of delivering the exact amount. The xrpl.getBalanceChanges() function can help to summarize this. For example:

`xrpl.getBalanceChanges()`

```
// Confirm transaction results --------------------------------------------
    console.log(`Transaction result: ${JSON.stringify(tx, null, 2)}`)

    if (tx.result.meta.TransactionResult === "tesSUCCESS") {
      // submitAndWait() only returns when the transaction's outcome is final,
      // so you don't also have to check for validated: true.
      console.log("Transaction was successful.")

      console.log("Balance changes:", 
        JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
      )
    }
```

Example balance changes output:

```
Balance changes: [
  {
    "account": "rEHjrKs86KfPjgeZvso2uQqhU2iA7AqD6r",
    "balances": [
      {
        "currency": "XRP",
        "value": "29.999988"
      }
    ]
  },
  {
    "account": "rh8pPR6p87egsGuAg53QrJ7Y4PLf4Qdrf7",
    "balances": [
      {
        "currency": "XRP",
        "value": "-30"
      }
    ]
  }
]
```

The metadata shows the net balance changes as the result of all of the transactions effects, which may be surprising in some cases. For example, in the above example, rEHjr... received 30 XRP from the Check but burned 12 drops of XRP on the transaction cost, resulting in a net gain of 29.99988 XRP from the transaction.

If an account receives exactly the same amount of XRP as it burns, its balance stays the same so it does not even appear in the list of balance changes.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=82133b00-ef1b-49c9-9325-2e34e74c01d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=82133b00-ef1b-49c9-9325-2e34e74c01d6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=612fa3b7-61e6-416d-a8a0-f663987f22f9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=612fa3b7-61e6-416d-a8a0-f663987f22f9&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=31ad651e-9237-4b41-be8b-7b363745ecb8&bo=1&sid=8c4959509d9e11f09ce8a1ec33dbb4a4&vid=8c49bf809d9e11f08ff8c1e0b85d7f94&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Cash%20a%20Check%20for%20an%20Exact%20Amount&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&r=&lt=3539&evt=pageLoad&sv=2&cdb=AQAS&rn=804589)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=89828e57-5559-43be-be39-a2ac37e2a6c8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=89828e57-5559-43be-be39-a2ac37e2a6c8&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=49219ad7-4568-4bf8-8ca0-8c74af39e154&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=49219ad7-4568-4bf8-8ca0-8c74af39e154&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0455fe48-f871-401f-bb82-fc649153ce96&pt=Cash%20a%20Check%20for%20an%20Exact%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-an-exact-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-an-exact-amount#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-an-exact-amount#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-an-exact-amount#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-an-exact-amount#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-an-exact-amount.md)
- [Checks sample code](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/checks/js/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:41:24.136Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
