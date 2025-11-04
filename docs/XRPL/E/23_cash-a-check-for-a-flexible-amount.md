# Cash a Check for a Flexible Amount
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-a-flexible-amount
Section: E23

## Overview


## Extracted Content
# Cash a Check for a Flexible Amount

This tutorial shows how to cash a Check for a flexible amount. As long as the Check is not expired, the specified recipient can cash it to receive the maximum amount available. You would cash a Check this way if you want to receive as much as possible. When doing this, you set a minimum amount to receive in case the sender does not have enough money to pay the full amount. If the check cannot deliver at least the minimum amount, cashing the check fails but you can try again later.

You can also cash a check for an exact amount.


## Prerequisites

- You should be familiar with the basics of using the xrpl.js client library.
- You need an XRP Ledger account including its secret key. (You can get one on Testnet for free.) See also: XRP Faucets.
- You need the ID of a Check ledger entry that you are the recipient of. See also: Send a Check and Look Up Checks.


## Source Code

The complete source code for this tutorial is available in the source repository for this website:

Checks sample code


## Steps


### 1. Prepare the CheckCash transaction

Figure out the values of the CheckCash transaction fields. To cash a check for a flexible amount, the following fields are the bare minimum; everything else is either optional or can be auto-filled when signing:

| Field | Value | Description |
| --- | --- | --- |
| TransactionType | String | The value CheckCash indicates this is a CheckCash transaction. |
| Account | String - Address | The address of the sender who is cashing the Check. (In other words, your address.) |
| CheckID | String | The ID of the Check to cash. You can get this information from the person who sent you the Check, or by looking up checks where your account is the destination. |
| DeliverMin | Currency Amount | A minimum amount to receive from the Check. If you cannot receive at least this much, cashing the Check fails, leaving the Check in the ledger so you can try again. For XRP, this must be a string specifying drops of XRP. For tokens, this is an object with currency, issuer, and value fields. The currency and issuer fields must match the corresponding fields in the Check object, and the value must be less than or equal to the amount in the Check object. For more information on specifying currency amounts, see Specifying Currency Amounts. |


`TransactionType`

`CheckCash`

`Account`

`CheckID`

`DeliverMin`

`currency`

`issuer`

`value`

`currency`

`issuer`

`value`

In the sample code, these values are hard-coded, so you should edit them to match your case:

```
// Define parameters. Edit this code with your values before running it.
const secret = "s████████████████████████████" // Replace with your secret
const check_id =  "5C5E9F39A92908BBA7B85AECD9457E9616AD36DF1895074723253B767A380D14"
const deliver_min = "20000000" // Replace with the minimum amount to receive
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
        DeliverMin: deliver_min
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


## 3. Confirm final result

If the transaction succeeded, it should have a "TransactionResult": "tesSUCCESS" field in the metadata, and the field "validated": true in the result, indicating that this result is final.

`"TransactionResult": "tesSUCCESS"`

`"validated": true`

TipThe submitAndWait() method in xrpl.js only returns when the transaction's result is final, so you can assume that the transaction is validated if it returns a result code of tesSUCCESS.

`submitAndWait()`

`tesSUCCESS`

If the transaction suceeded, you can assume that it delivered at least the DeliverMin amount of this transaction and at most the SendMax of the Check. To confirm the exact balance changes that occurred as a result of cashing the check, including how much was actually debited and credited, you must look at the transaction metadata. The xrpl.getBalanceChanges() function can help to summarize this. For example:

`DeliverMin`

`SendMax`

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

The metadata shows the net balance changes as the result of all of the transactions effects, which may be surprising in some cases. If an account receives exactly the same amount of XRP as it burns, its balance stays the same so it does not even appear in the list of balance changes.

If you are not using getBalanceChanges(), the following guidelines should help with parsing the metadata:

`getBalanceChanges()`

- For XRP, the AccountRoot object of the Check's sender has its XRP Balance field debited. The AccountRoot object of the Check's recipient (the one who sent the CheckCash transaction) has its XRP Balance credited for at least the DeliverMin of the CheckCash transaction minus the transaction cost of sending the transaction.For example, the following ModifiedNode shows that the account rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis, the Check's recipient and the sender of this CheckCash transaction, had its XRP balance change from 9999999970 drops to 10099999960 drops, meaning the recipient was credited a net of 99.99999 XRP as a result of processing the transaction.{
  "ModifiedNode": {
    "FinalFields": {
       "Account": "rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis",
       "Balance": "10099999960",
       "Flags": 0,
       "OwnerCount": 2,
       "Sequence": 5
    },
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "7939126A732EBBDEC715FD3CCB056EB31E65228CA17E3B2901E7D30B90FD03D3",
    "PreviousFields": {
       "Balance": "9999999970",
       "Sequence": 4
    },
    "PreviousTxnID": "0283465F0D21BE6B1E91ABDE17266C24C1B4915BAAA9A88CC098A98D5ECD3E9E",
    "PreviousTxnLgrSeq": 8005334
  }
}The net amount of 99.99999 XRP includes deducting the transaction cost that is destroyed to pay for sending this CheckCash transaction. The following part of the transaction instructions shows that the transaction cost (the Fee field) was 10 drops of XRP. By adding this to the net balance change, we conclude that the recipient, rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis, was credited a gross amount of exactly 100 XRP for cashing the Check."Account" : "rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis",
"TransactionType" : "CheckCash",
"DeliverMin" : "95000000",
"Fee" : "10",
- For tokens where the sender or recipient of the check is the issuer, the RippleState object representing the trust line between those accounts has its Balance adjusted in the favor of the Check's recipient.
- For tokens with a third-party issuer, there are changes to two RippleState objects, representing the trust lines connecting the sender to the issuer, and the issuer to the recipient. The RippleState object representing the relationship between the Check's sender and the issuer has its Balance changed in favor of the issuer, and the RippleState object representing the relationship between the issuer and the recipient has its Balance changed in favor of the recipient.If the token has a transfer fee, the Check's sender may be debited more than the recipient is credited. (The difference is the transfer fee, which is returned to the issuer as a decreased net obligation.)
- If the token has a transfer fee, the Check's sender may be debited more than the recipient is credited. (The difference is the transfer fee, which is returned to the issuer as a decreased net obligation.)

For XRP, the AccountRoot object of the Check's sender has its XRP Balance field debited. The AccountRoot object of the Check's recipient (the one who sent the CheckCash transaction) has its XRP Balance credited for at least the DeliverMin of the CheckCash transaction minus the transaction cost of sending the transaction.

`AccountRoot`

`Balance`

`AccountRoot`

`Balance`

`DeliverMin`

For example, the following ModifiedNode shows that the account rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis, the Check's recipient and the sender of this CheckCash transaction, had its XRP balance change from 9999999970 drops to 10099999960 drops, meaning the recipient was credited a net of 99.99999 XRP as a result of processing the transaction.

`ModifiedNode`

`rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis`

`9999999970`

`10099999960`

```
{
  "ModifiedNode": {
    "FinalFields": {
       "Account": "rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis",
       "Balance": "10099999960",
       "Flags": 0,
       "OwnerCount": 2,
       "Sequence": 5
    },
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "7939126A732EBBDEC715FD3CCB056EB31E65228CA17E3B2901E7D30B90FD03D3",
    "PreviousFields": {
       "Balance": "9999999970",
       "Sequence": 4
    },
    "PreviousTxnID": "0283465F0D21BE6B1E91ABDE17266C24C1B4915BAAA9A88CC098A98D5ECD3E9E",
    "PreviousTxnLgrSeq": 8005334
  }
}
```

The net amount of 99.99999 XRP includes deducting the transaction cost that is destroyed to pay for sending this CheckCash transaction. The following part of the transaction instructions shows that the transaction cost (the Fee field) was 10 drops of XRP. By adding this to the net balance change, we conclude that the recipient, rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis, was credited a gross amount of exactly 100 XRP for cashing the Check.

`Fee`

`rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis`

```
"Account" : "rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis",
"TransactionType" : "CheckCash",
"DeliverMin" : "95000000",
"Fee" : "10",
```

For tokens where the sender or recipient of the check is the issuer, the RippleState object representing the trust line between those accounts has its Balance adjusted in the favor of the Check's recipient.

`RippleState`

`Balance`

For tokens with a third-party issuer, there are changes to two RippleState objects, representing the trust lines connecting the sender to the issuer, and the issuer to the recipient. The RippleState object representing the relationship between the Check's sender and the issuer has its Balance changed in favor of the issuer, and the RippleState object representing the relationship between the issuer and the recipient has its Balance changed in favor of the recipient.

`RippleState`

`RippleState`

`Balance`

`RippleState`

`Balance`

- If the token has a transfer fee, the Check's sender may be debited more than the recipient is credited. (The difference is the transfer fee, which is returned to the issuer as a decreased net obligation.)

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=684fb3e1-d3bd-4b0b-a3b5-87c4a1c459fc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=684fb3e1-d3bd-4b0b-a3b5-87c4a1c459fc&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1899cb0e-af44-48fb-beb8-70a58f83dc9d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1899cb0e-af44-48fb-beb8-70a58f83dc9d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=474a841f-ec33-4cc9-8909-24b701978a31&bo=1&sid=96da01809d9e11f0958947c62ddca1b7&vid=96da3b709d9e11f09673c9a786a0bd51&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Cash%20a%20Check%20for%20a%20Flexible%20Amount&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&r=&lt=2226&evt=pageLoad&sv=2&cdb=AQAS&rn=459419)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb010707-a3c2-43e1-9e53-75eb1c8a4d59&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=fb010707-a3c2-43e1-9e53-75eb1c8a4d59&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39af6dd1-83fc-4a0a-b2a2-908bbf161094&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=39af6dd1-83fc-4a0a-b2a2-908bbf161094&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=f0731383-b765-409d-9983-04904f8373e3&pt=Cash%20a%20Check%20for%20a%20Flexible%20Amount&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fcash-a-check-for-a-flexible-amount&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-a-flexible-amount#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-a-flexible-amount#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-a-flexible-amount#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-a-flexible-amount#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/cash-a-check-for-a-flexible-amount.md)
- [Checks sample code](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/checks/js/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:41:44.772Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
