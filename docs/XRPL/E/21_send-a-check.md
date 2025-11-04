# Send a Check
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/send-a-check
Section: E21

## Overview


## Extracted Content
# Send a Check

Sending a Check is like writing permission for an intended recipient to pull a payment from you. The outcome of this process is a Check entry in the ledger which the recipient can cash later.

In many cases, you want to send a Payment instead of a Check, since that delivers the money directly to the recipient in one step. However, if your intended recipient uses DepositAuth, you cannot send them Payments directly, so a Check is a good alternative.


## Prerequisites

To send a Check with this tutorial, you need the following:

- The address and secret key of a funded account to send the Check from.You can use the XRP Ledger Test Net Faucet to get a funded address and secret with 10,000 Test Net XRP.
- You can use the XRP Ledger Test Net Faucet to get a funded address and secret with 10,000 Test Net XRP.
- The address of a funded account to receive the Check.
- You should be familiar with the basics of using xrpl.js.

- You can use the XRP Ledger Test Net Faucet to get a funded address and secret with 10,000 Test Net XRP.


## Source Code

The complete source code for this tutorial is available in the source repository for this website:

Checks sample code


## Steps


### 1. Prepare the CheckCreate transaction

Decide how much money the Check is for and who can cash it. Figure out the values of the CheckCreate transaction fields. The following fields are the bare minimum; everything else is either optional or can be auto-filled when signing:

| Field | Value | Description |
| --- | --- | --- |
| TransactionType | String | Use the string CheckCreate here. |
| Account | String (Address) | The address of the sender who is creating the Check. (In other words, your address.) |
| Destination | String (Address) | The address of the intended recipient who can cash the Check. |
| SendMax | String or Object (Amount) | The maximum amount the sender can be debited when this Check gets cashed. For XRP, use a string representing drops of XRP. For tokens, use an object with currency, issuer, and value fields. See Specifying Currency Amounts for details. If you want the recipient to be able to cash the Check for an exact amount of a non-XRP currency with a transfer fee, remember to include an extra percentage to pay for the transfer fee. (For example, for the recipient to cash a Check for 100 CAD from an issuer with a 2% transfer fee, you must set the SendMax to 102 CAD from that issuer.) |


`TransactionType`

`CheckCreate`

`Account`

`Destination`

`SendMax`

`currency`

`issuer`

`value`

`SendMax`

For example, imagine you were asked to pay a company named Grand Payments for some consulting work. By email, Grand Payments informs you that the maximum charge is 120 XRP, their XRP Ledger address is rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis, and this work has been billed with an invoice ID of 46060241FABCF692D4D934BA2A6C4427CD4279083E38C77CBE642243E43BE291 which they ask you to attach for their records. The following code shows how you could use a Check to send that payment:

`rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis`

`46060241FABCF692D4D934BA2A6C4427CD4279083E38C77CBE642243E43BE291`

```
// Prepare the transaction --------------------------------------------
        const checkcreate = {
            "TransactionType": "CheckCreate",
            "Account": wallet.address,
            "Destination": "rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis",
            "SendMax": xrpl.xrpToDrops(120), // Can be more than you have
            "InvoiceID": "46060241FABCF692D4D934BA2A6C4427CD4279083E38C77CBE642243E43BE291"
        }
```

TipThe InvoiceID is optional metadata that can be attached to any Check (or Payment). This field is purely informational and is not used in transaction processing.

`InvoiceID`


### 2. Submit the transaction

Send the transaction and wait for it to be validated by the consensus process, as normal:

```
// Submit the transaction ---------------------------------------------
        console.log("Submitting transaction...")
        const tx = await client.submitAndWait(
            checkcreate, 
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

To cash or cancel the Check later, you'll need the Check ID. You can find this in the transaction's metadata by looking for a CreatedNode entry with a LedgerEntryType of "Check". This indicates that the transaction created a Check ledger entry. The LedgerIndex of this object is the ID of the Check. This should be a hash value such as 84C61BE9B39B2C4A2267F67504404F1EC76678806C1B901EA781D1E3B4CE0CD9.

`CreatedNode`

`LedgerEntryType`

`"Check"`

`LedgerIndex`

`84C61BE9B39B2C4A2267F67504404F1EC76678806C1B901EA781D1E3B4CE0CD9`

At this point, it is up to the recipient to cash the Check.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a1d04766-3690-4018-a815-90dd26292d0e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a1d04766-3690-4018-a815-90dd26292d0e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3efa5e17-202f-430f-a78f-3c1a339daae4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3efa5e17-202f-430f-a78f-3c1a339daae4&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8a6c4b5c-d90c-44ec-b494-6b5c12a5a3a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8a6c4b5c-d90c-44ec-b494-6b5c12a5a3a7&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=75d021c2-26b4-468e-a553-fcf5c1ebd4ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=75d021c2-26b4-468e-a553-fcf5c1ebd4ba&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=e4d31c37-a71a-415b-8667-282fd902f899&pt=Send%20a%20Check&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=496c255e-09dd-4068-bacf-c5e3ecd32eb5&bo=1&sid=81ada6409d9e11f0bbd813f5f40c2d91&vid=81ae1f209d9e11f0a541c58439274372&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Send%20a%20Check&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-checks%2Fsend-a-check&r=&lt=3261&evt=pageLoad&sv=2&cdb=AQAS&rn=34743)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/send-a-check#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/send-a-check#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/send-a-check#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/send-a-check#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-checks/send-a-check.md)
- [Checks sample code](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/checks/js/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:41:05.098Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
