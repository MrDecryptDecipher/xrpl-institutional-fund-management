# Look up Escrows
URL: https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/look-up-escrows
Section: E16

## Overview


## Extracted Content
# Look up Escrows

All pending escrows are stored in the ledger as Escrow objects. You can look them up by the sender's address or the destination address.

NoteYou can only look up pending escrow objects by destination address if those escrows were created after the fix1523 amendment was enabled on 2017-11-14.

Use the account_objects method, where the sender or destination address is the account value.

`account`

- Websocket
- Javascript
- Python

Request:

```
{
  "id": 5,
  "command": "account_objects",
  "account": "rfztBskAVszuS3s5Kq7zDS74QtHrw893fm",
  "ledger_index": "validated",
  "type": "escrow"
}
```

Response:

```
{
  "id": 5,
  "result": {
    "account": "rfztBskAVszuS3s5Kq7zDS74QtHrw893fm",
    "account_objects": [{
      "Account": "rafD3taonqdnVpaxCCT6sjnScZUeFGf1JG",
      "Amount": "250",
      "Destination": "rfztBskAVszuS3s5Kq7zDS74QtHrw893fm",
      "DestinationNode": "0000000000000000",
      "FinishAfter": 570672000,
      "Flags": 0,
      "LedgerEntryType": "Escrow",
      "OwnerNode": "0000000000000000",
      "PreviousTxnID": "A0951691DF3BCBEEB3108F2229A702D078BBBF848268BC601E59B68A2E390AAC",
      "PreviousTxnLgrSeq": 4602906,
      "index": "2BF3226ACCA8FF7ACB7201F20A701F51D8666A2FA2FBFBE6A05C9161F9228A18"
    }, {
      "Account": "rfztBskAVszuS3s5Kq7zDS74QtHrw893fm",
      "Amount": "250",
      "Destination": "r9gyNNzhMtfwZara61u3ycfMLdkTpKJZHX",
      "DestinationNode": "0000000000000000",
      "FinishAfter": 570672000,
      "Flags": 0,
      "LedgerEntryType": "Escrow",
      "OwnerNode": "0000000000000000",
      "PreviousTxnID": "463D5A3CF09F4890B8471027F80414B3B438E6907425B71DC324D7118E90A107",
      "PreviousTxnLgrSeq": 4603003,
      "index": "35462CDC28AD830B29D101E8307AF5B6BFBC262F1BDCCA7EB45D1CA3F8B44F53"
    }, {
      "Account": "r9gyNNzhMtfwZara61u3ycfMLdkTpKJZHX",
      "Amount": "250",
      "Destination": "rfztBskAVszuS3s5Kq7zDS74QtHrw893fm",
      "DestinationNode": "0000000000000000",
      "FinishAfter": 570672000,
      "Flags": 0,
      "LedgerEntryType": "Escrow",
      "OwnerNode": "0000000000000000",
      "PreviousTxnID": "08C9B20AC9EB191238038A108CC4CBBC0243672484B466FB42DED0A7DF6A31A1",
      "PreviousTxnLgrSeq": 4602954,
      "index": "A7B0983A1B53D92278E21499064A4F8BBE08CB8D14DB6BBBA8F688AB1D3FDA45"
    }, {
      "Account": "rfztBskAVszuS3s5Kq7zDS74QtHrw893fm",
      "Amount": "250",
      "Destination": "rafD3taonqdnVpaxCCT6sjnScZUeFGf1JG",
      "DestinationNode": "0000000000000000",
      "FinishAfter": 570672000,
      "Flags": 0,
      "LedgerEntryType": "Escrow",
      "OwnerNode": "0000000000000000",
      "PreviousTxnID": "F4778F528AB3CB945BDB88036EF9FE6C0E899F1629D9E51129E3B93CD488395A",
      "PreviousTxnLgrSeq": 4602977,
      "index": "F99A4DDADDDF623908C9A048170AB107AFF78684AB8F3110E9F00BBBC606ABD2"
    }],
    "ledger_hash": "1D4850035F175CA6F1CD5CE3B53C01AA83E4F086C13085E4FBC1EEFCCB345A9B",
    "ledger_index": 4603176,
    "validated": true
  },
  "status": "success",
  "type": "response"
}
```

The response includes all pending escrow objects with rfztBskAVszuS3s5Kq7zDS74QtHrw893fm, where the sender address is the Account value, or the destination address is the Destination value.

`rfztBskAVszuS3s5Kq7zDS74QtHrw893fm`

`Account`

`Destination`


## See Also

- Concepts:What is XRP?Payment TypesEscrow
- What is XRP?
- Payment TypesEscrow
- Escrow
- Tutorials:Send XRPLook Up Transaction ResultsReliable Transaction Submission
- Send XRP
- Look Up Transaction Results
- Reliable Transaction Submission
- References:EscrowCancel transactionEscrowCreate transactionEscrowFinish transactionaccount_objects methodtx methodEscrow ledger object
- EscrowCancel transaction
- EscrowCreate transaction
- EscrowFinish transaction
- account_objects method
- tx method
- Escrow ledger object

- What is XRP?
- Payment TypesEscrow
- Escrow

- Escrow

- Send XRP
- Look Up Transaction Results
- Reliable Transaction Submission

- EscrowCancel transaction
- EscrowCreate transaction
- EscrowFinish transaction
- account_objects method
- tx method
- Escrow ledger object

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3faac8b7-c8c8-4cba-a0b5-5631f77fc4e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3faac8b7-c8c8-4cba-a0b5-5631f77fc4e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=12c47812-88b7-4c4f-86a8-b8db32df8661&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=12c47812-88b7-4c4f-86a8-b8db32df8661&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6c0b5ce5-7761-4d37-8b0d-8bd717f703f0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=6c0b5ce5-7761-4d37-8b0d-8bd717f703f0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f1de51ca-6993-43ec-878c-f650101824e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f1de51ca-6993-43ec-878c-f650101824e3&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=0515e6af-c923-4d37-8e70-4fc7adc32df0&pt=Look%20up%20Escrows&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=4c5690a0-6a07-43e6-81df-ea31155d6302&bo=1&sid=37778f909d9e11f0a9daa1930f1185a5&vid=3777fbe09d9e11f0a140a987008109d9&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Look%20up%20Escrows&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fuse-specialized-payment-types%2Fuse-escrows%2Flook-up-escrows&r=&lt=2873&evt=pageLoad&sv=2&cdb=AQAS&rn=328867)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/look-up-escrows#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/look-up-escrows#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/look-up-escrows#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/look-up-escrows#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/use-specialized-payment-types/use-escrows/look-up-escrows.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:38:59.526Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
