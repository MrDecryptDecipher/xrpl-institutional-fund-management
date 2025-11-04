# Set Up Multi-Signing
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing
Section: E6

## Overview


## Extracted Content
# Set Up Multi-Signing

Multi-signing is one of three ways to authorize transactions for the XRP Ledger, alongside signing with regular keys and master keys. You can configure your address to allow any combination of the three methods to authorize transactions.

This tutorial demonstrates how to enable multi-signing for an address.


## Prerequisites

- You must have a funded XRP Ledger address with enough spare XRP to send transactions and meet the reserve requirement of a new signer list.With the MultiSignReserve amendment enabled, multi-signing requires 0.2 XRP for the account reserve, regardless of the number of signers and signatures you use. (The MultiSignReserve amendment has been enabled in the production XRP Ledger since 2019-04-07.)If you are on a test network that does not have the MultiSignReserve amendment enabled, multi-signing requires more than the usual amount of XRP for the account reserve, increasing with the number of signers in the list.
- With the MultiSignReserve amendment enabled, multi-signing requires 0.2 XRP for the account reserve, regardless of the number of signers and signatures you use. (The MultiSignReserve amendment has been enabled in the production XRP Ledger since 2019-04-07.)
- If you are on a test network that does not have the MultiSignReserve amendment enabled, multi-signing requires more than the usual amount of XRP for the account reserve, increasing with the number of signers in the list.
- You must have access to a tool that can generate key pairs in the XRP Ledger format. If you are using a rippled server for this, you must have admin access because the wallet_propose method is admin-only.Alternatively, if you are authorizing others who already have XRP Ledger addresses to be signers for your address, you only need to know the account addresses of those people or entities.
- Alternatively, if you are authorizing others who already have XRP Ledger addresses to be signers for your address, you only need to know the account addresses of those people or entities.
- Multi-signing must be available. (The MultiSign amendment has been enabled in the production XRP Ledger since 2016-06-27.)

You must have a funded XRP Ledger address with enough spare XRP to send transactions and meet the reserve requirement of a new signer list.

- With the MultiSignReserve amendment enabled, multi-signing requires 0.2 XRP for the account reserve, regardless of the number of signers and signatures you use. (The MultiSignReserve amendment has been enabled in the production XRP Ledger since 2019-04-07.)
- If you are on a test network that does not have the MultiSignReserve amendment enabled, multi-signing requires more than the usual amount of XRP for the account reserve, increasing with the number of signers in the list.

With the MultiSignReserve amendment enabled, multi-signing requires 0.2 XRP for the account reserve, regardless of the number of signers and signatures you use. (The MultiSignReserve amendment has been enabled in the production XRP Ledger since 2019-04-07.)

If you are on a test network that does not have the MultiSignReserve amendment enabled, multi-signing requires more than the usual amount of XRP for the account reserve, increasing with the number of signers in the list.

You must have access to a tool that can generate key pairs in the XRP Ledger format. If you are using a rippled server for this, you must have admin access because the wallet_propose method is admin-only.

`rippled`

- Alternatively, if you are authorizing others who already have XRP Ledger addresses to be signers for your address, you only need to know the account addresses of those people or entities.

Multi-signing must be available. (The MultiSign amendment has been enabled in the production XRP Ledger since 2016-06-27.)


## 1. Design Your Configuration

Decide how many signers you want to include (up to 32). Choose a quorum number for your signer list and weights for your signers based on how many signatures you want to require for a given transaction. For a straightforward "M-of-N" signing setup, assign each signer weight 1 and set your list's quorum to be "M", the number of signatures to require.

`1`


## 2. Prepare member keys

You need one or more validly-formed XRP Ledger addresses to include as members of  your signer list. You or your chosen signers must know the secret keys associated with these addresses. The addresses can be funded accounts that exist in the ledger, but they do not need to be.

You can generate new addresses using the wallet_propose method. For example:

```
$ rippled wallet_propose
Loading: "/etc/opt/ripple/rippled.cfg"
Connecting to 127.0.0.1:5005
{
    "result" : {
        "account_id" : "rnRJ4dpSBKDR2M1itf4Ah6tZZm5xuNZFPH",
        "key_type" : "secp256k1",
        "master_key" : "FLOG SEND GOES CUFF GAGE FAT ANTI DEL GUM TIRE ISLE BEAR",
        "master_seed" : "snheH5UUjU4CWqiNVLny2k21TyKPC",
        "master_seed_hex" : "A9F859765EB8614D26809836382AFB82",
        "public_key" : "aBR4hxFXcDNHnGYvTiqb2KU8TTTV1cYV9wXTAuz2DjBm7S8TYEBU",
        "public_key_hex" : "03C09A5D112B393D531E4F092E3A5769A5752129F0A9C55C61B3A226BB9B567B9B",
        "status" : "success"
    }
}
```

Take note of the account_id (XRP Ledger Address) and master_seed (secret key) for each one you generate.

`account_id`

`master_seed`


## 3. Send SignerListSet transaction

Sign and submit a SignerListSet transaction in the normal (single-signature) way. This associates a signer list with your XRP Ledger address, so that a combination of signatures from the members of that signer list can multi-sign later transactions on your behalf.

In this example, the signer list has 3 members, with the weights and quorum set up such that multi-signed transactions need a signature from rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW plus at least one signature from the other two members of the list.

`rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW`

Never submit a secret key to a server you do not control. Do not send a secret key unencrypted over the network.

- Commandline
- Javascript
- Python

```
$ rippled submit shqZZy2Rzs9ZqWTCQAdqc3bKgxnYq '{
>     "Flags": 0,
>     "TransactionType": "SignerListSet",
>     "Account": "rnBFvgZphmN39GWzUJeUitaP22Fr9be75H",
>     "Fee": "10000",
>     "SignerQuorum": 3,
>     "SignerEntries": [
>         {
>             "SignerEntry": {
>                 "Account": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
>                 "SignerWeight": 2
>             }
>         },
>         {
>             "SignerEntry": {
>                 "Account": "rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v",
>                 "SignerWeight": 1
>             }
>         },
>         {
>             "SignerEntry": {
>                 "Account": "raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n",
>                 "SignerWeight": 1
>             }
>         }
>     ]
> }'
Loading: "/etc/opt/ripple/rippled.cfg"
Connecting to 127.0.0.1:5005
{
   "result" : {
      "engine_result" : "tesSUCCESS",
      "engine_result_code" : 0,
      "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
      "status" : "success",
      "tx_blob" : "12000C2200000000240000000120230000000368400000000000271073210303E20EC6B4A39A629815AE02C0A1393B9225E3B890CAE45B59F42FA29BE9668D74473045022100BEDFA12502C66DDCB64521972E5356F4DB965F553853D53D4C69B4897F11B4780220595202D1E080345B65BAF8EBD6CA161C227F1B62C7E72EA5CA282B9434A6F04281142DECAB42CA805119A9BA2FF305C9AFA12F0B86A1F4EB1300028114204288D2E47F8EF6C99BCC457966320D12409711E1EB13000181147908A7F0EDD48EA896C3580A399F0EE78611C8E3E1EB13000181143A4C02EA95AD6AC3BED92FA036E0BBFB712C030CE1F1",
      "tx_json" : {
         "Account" : "rnBFvgZphmN39GWzUJeUitaP22Fr9be75H",
         "Fee" : "10000",
         "Flags" : 0,
         "Sequence" : 1,
         "SignerEntries" : [
            {
               "SignerEntry" : {
                  "Account" : "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
                  "SignerWeight" : 2
               }
            },
            {
               "SignerEntry" : {
                  "Account" : "rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v",
                  "SignerWeight" : 1
               }
            },
            {
               "SignerEntry" : {
                  "Account" : "raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n",
                  "SignerWeight" : 1
               }
            }
         ],
         "SignerQuorum" : 3,
         "SigningPubKey" : "0303E20EC6B4A39A629815AE02C0A1393B9225E3B890CAE45B59F42FA29BE9668D",
         "TransactionType" : "SignerListSet",
         "TxnSignature" : "3045022100BEDFA12502C66DDCB64521972E5356F4DB965F553853D53D4C69B4897F11B4780220595202D1E080345B65BAF8EBD6CA161C227F1B62C7E72EA5CA282B9434A6F042",
         "hash" : "3950D98AD20DA52EBB1F3937EF32F382D74092A4C8DF9A0B1A06ED25200B5756"
      }
   }
}
```

Make sure that the Transaction Result is tesSUCCESS. Otherwise, the transaction failed. If you have a problem in stand-alone mode or a non-production network, check that multi-sign is enabled.

`tesSUCCESS`

NoteWithout the MultiSignReserve amendment, the more members in the signer list, the more XRP your address must have for purposes of the owner reserve. If your address does not have enough XRP, the transaction fails with tecINSUFFICIENT_RESERVE. With the MultiSignReserve amendment enabled, the XRP your address must have for purposes of the owner reserve is 5 XRP, regardless of the number of members in the signer list. See also: Signer Lists and Reserves.

`tecINSUFFICIENT_RESERVE`


## 4. Wait for validation

On a live network (including Mainnet, Testnet, or Devnet), you can wait 4-7 seconds for the ledger to close automatically.

If you're running rippled in stand-alone mode, use the ledger_accept method to manually close the ledger.

`rippled`


## 5. Confirm the new signer list

Use the account_objects method to confirm that the signer list is associated with the address in the latest validated ledger.

Normally, an account can own many objects of different types (such as trust lines and offers). If you funded a new address for this tutorial, the signer list is the only object in the response.

```
$ rippled account_objects rEuLyBCvcw4CFmzv8RepSiAoNgF8tTGJQC validated
Loading: "/etc/opt/ripple/rippled.cfg"
Connecting to 127.0.0.1:5005
{
   "result" : {
      "account" : "rEuLyBCvcw4CFmzv8RepSiAoNgF8tTGJQC",
      "account_objects" : [
         {
            "Flags" : 0,
            "LedgerEntryType" : "SignerList",
            "OwnerNode" : "0000000000000000",
            "PreviousTxnID" : "8FDC18960455C196A8C4DE0D24799209A21F4A17E32102B5162BD79466B90222",
            "PreviousTxnLgrSeq" : 5,
            "SignerEntries" : [
               {
                  "SignerEntry" : {
                     "Account" : "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
                     "SignerWeight" : 2
                  }
               },
               {
                  "SignerEntry" : {
                     "Account" : "raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n",
                     "SignerWeight" : 1
                  }
               },
               {
                  "SignerEntry" : {
                     "Account" : "rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v",
                     "SignerWeight" : 1
                  }
               }
            ],
            "SignerListID" : 0,
            "SignerQuorum" : 3,
            "index" : "79FD203E4DDDF2EA78B798C963487120C048C78652A28682425E47C96D016F92"
         }
      ],
      "ledger_hash" : "56E81069F06492FB410A70218C08169BE3AB3CFD5AEA20E999662D81DC361D9F",
      "ledger_index" : 5,
      "status" : "success",
      "validated" : true
   }
}
```

If the signer list is present with the expected contents, then your address is ready to multi-sign.


## 6. Further steps

At this point, your address is ready to send a multi-signed transaction. You may also want to:

- Disable the address's master key pair.
- Remove the address's regular key pair (if you previously set one) by sending a SetRegularKey transaction.


## See Also

- Concepts:Cryptographic KeysMulti-Signing
- Cryptographic Keys
- Multi-Signing
- Tutorials:Install rippledAssign a Regular Key PairReliable Transaction SubmissionEnable Public Signing
- Install rippled
- Assign a Regular Key Pair
- Reliable Transaction Submission
- Enable Public Signing
- References:wallet_propose methodaccount_objects methodsign_for methodsubmit_multisigned methodSignerListSet transactionSignerList object
- wallet_propose method
- account_objects method
- sign_for method
- submit_multisigned method
- SignerListSet transaction
- SignerList object

- Cryptographic Keys
- Multi-Signing

- Install rippled
- Assign a Regular Key Pair
- Reliable Transaction Submission
- Enable Public Signing

- wallet_propose method
- account_objects method
- sign_for method
- submit_multisigned method
- SignerListSet transaction
- SignerList object

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4718c513-e194-44ea-a542-6f5e7b72f67a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4718c513-e194-44ea-a542-6f5e7b72f67a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=deabee57-3ee7-4e30-adb3-c8237706ac08&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=deabee57-3ee7-4e30-adb3-c8237706ac08&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=fc4a6859-75f9-4b2a-9e28-46dca4696c69&bo=1&sid=adbda7009d9d11f084d695cd8a79b62f&vid=adbe3ef09d9d11f0b300d7a46acae1af&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Set%20Up%20Multi-Signing&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&r=&lt=3478&evt=pageLoad&sv=2&cdb=AQAS&rn=401150)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8205e6ca-b923-4fc0-a55a-8ae10b6f040c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=8205e6ca-b923-4fc0-a55a-8ae10b6f040c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4665da61-47dd-4b1a-b898-ffd616cce484&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=4665da61-47dd-4b1a-b898-ffd616cce484&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=de715415-5553-441c-8a88-c31ba528352c&pt=Set%20Up%20Multi-Signing&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Fset-up-multi-signing&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:35:12.346Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
