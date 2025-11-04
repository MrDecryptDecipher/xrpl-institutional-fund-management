# Offline Account Setup Tutorial
URL: https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/offline-account-setup
Section: E9

## Overview


## Extracted Content
# Offline Account Setup Tutorial

A highly secure signing configuration involves keeping an XRP Ledger account's cryptographic keys securely on an offline, air-gapped machine. After setting up this configuration, you can sign a variety of transactions, transfer only the signed transactions to an online computer, and submit them to the XRP Ledger network without ever exposing your secret key to malicious actors online.

CautionProper operational security is necessary to protect your offline machine. For example, the offline machine must be physically located where untrusted people cannot get access to it, and trusted operators must be careful not to transfer compromised software onto the machine. (For example, do not use a USB drive that was previously attached to a network-connected computer.)


## Prerequisites

To use offline signing, you must meet the following prerequisites:

- You must have one computer to use as an offline machine. This machine must be set up with a supported operating system. See your operating system's support for offline setup instructions. (For example, Red Hat Enterprise Linux DVD ISO installation instructions.) Be sure that the software and physical media you use are not infected with malware.
- You must have a separate computer to use as an online machine. This machine does not need to run rippled but it must be able to connect to the XRP Ledger network and receive information about the state of the shared ledger. For example, you can use a WebSocket connection to a public server.
- You must have a secure way to transfer signed transaction binary data from the offline machine to the online machine.One way to do this is with a QR code generator on the offline machine, and a QR code scanner on the online machine. (In this case, your "online machine" could be a handheld device such as a smartphone.)Another way is to copy files from the offline machine to an online machine using physical media. If you use this method, be sure not to use physical media that could infect your offline machine with malicious software. (For example, do not reuse the same USB drive on both online and offline machines.)You could manually type the data onto the online machine, but doing so would be tedious and error-prone.
- One way to do this is with a QR code generator on the offline machine, and a QR code scanner on the online machine. (In this case, your "online machine" could be a handheld device such as a smartphone.)
- Another way is to copy files from the offline machine to an online machine using physical media. If you use this method, be sure not to use physical media that could infect your offline machine with malicious software. (For example, do not reuse the same USB drive on both online and offline machines.)
- You could manually type the data onto the online machine, but doing so would be tedious and error-prone.

`rippled`

- One way to do this is with a QR code generator on the offline machine, and a QR code scanner on the online machine. (In this case, your "online machine" could be a handheld device such as a smartphone.)
- Another way is to copy files from the offline machine to an online machine using physical media. If you use this method, be sure not to use physical media that could infect your offline machine with malicious software. (For example, do not reuse the same USB drive on both online and offline machines.)
- You could manually type the data onto the online machine, but doing so would be tedious and error-prone.


## Steps


### 1. Set up offline machine

The offline machine needs secure persistent storage (for example, an encrypted disk drive) and a way to sign transactions. For an offline machine, you typically use physical media to transfer any necessary software after downloading it from an online machine. You must be sure that the online machine, the physical media, and the software itself are not infected with malware.

Software options for signing on the XRP Ledger include:

- Install rippled from a package (.deb or .rpm depending on which Linux distribution you use) file, then run it in stand-alone mode.
- Install xrpl.js (or another client library) and its dependencies offline. The Yarn package manager, for example, has recommended instructions for offline usage.
- See also: Set Up Secure Signing

`rippled`

`.deb`

`.rpm`

You may want to set up custom software to help construct transaction instructions on the offline machine. For example, your software may track what sequence number to use next, or contain preset templates for certain types of transactions you expect to send.


### 2. Generate cryptographic keys

On the offline machine, generate a pair of cryptographic keys to be used with your account. Be sure to generate the keys with a securely random procedure, not from a short passphrase or some other source that does not have enough entropy. For example, you can use the wallet_propose method of rippled:

`rippled`

- rippled Commandline

```
$ ./rippled wallet_propose
Loading: "/etc/opt/ripple/rippled.cfg"
2019-Dec-09 22:58:24.110862955 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
   "result" : {
      "account_id" : "r4MRc4BArFPXmiDjmLdrufyFManSYhfKE6",
      "key_type" : "secp256k1",
      "master_key" : "JANE GIBE LIST TEND NU RUDE JIG PA FLOG DEFT SAME NASH",
      "master_seed" : "shYHSiJod8CLPTj1SNJ2PdUFj4pFk",
      "master_seed_hex" : "8465FDB80B2E2620A7D58274C26291A0",
      "public_key" : "aBQLW8imt7VChRJU1NMVCB7fE3jSL3VNEgLDKf88ygAhnfuZh3oo",
      "public_key_hex" : "03396074ED4B8155ACF9A8DC3665EFA53B5CFA0A1E91C3879303D37721EB222644",
      "status" : "success"
   }
}
```

Take note of the following values:

- account_id. This is the address associated with the key pair, which becomes your account address in the XRP Ledger after you fund it with XRP (later in this process). It is safe to share your account_id publicly.
- master_seed. This is the secret seed value for the key pair, which you'll use to sign transactions from the account. For best security, encrypt this value before writing it to disk on the offline machine. As an encryption key, use a secure passphrase that human operators can memorize or write down somewhere physically secure, such as a diceware passphrase created with properly weighted dice. You may also want to use a physical security key as a second factor. The extent of the precautions to take at this stage is up to you.
- key_type. This is the cryptographic algorithm used for this key pair. You need to know what type of key pair you have. The default in rippled is secp256k1, but some client libraries use Ed25519 by default.

`account_id`

`account_id`

`master_seed`

`key_type`

`rippled`

`secp256k1`

`Ed25519`

Do not share the master_key, master_seed, or master_seed_hex values anywhere. Any of these can be used to reconstruct the private key associated with this address.

`master_key`

`master_seed`

`master_seed_hex`


### 3. Fund the new address

From an online machine, send enough XRP to the account address you noted in step 1. For more information, see Creating Accounts.

TipFor testing purposes, you can use the Testnet Faucet to get a new account with Test XRP, then use that account to fund the address you generated offline.


### 4. Confirm account details

When the transaction from the previous step is validated by consensus, your account has been created. From the online machine, you can confirm the status of the account with the account_info method. Make sure the response contains "validated": true to confirm that this result is final.

`"validated": true`

Take note of the sequence number of the account, in the Sequence field of the result's account_data. You need to know the sequence number to sign transactions from the account in future steps.

`Sequence`

`account_data`

The Sequence number of a newly-funded account matches the ledger index when it was funded. Before the DeletableAccounts amendment, a newly funded account's Sequence number was always 1.

`Sequence`

`Sequence`

- rippled Commandline

```
$ ./rippled account_info rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn

Loading: "/etc/opt/ripple/rippled.cfg"
2019-Dec-11 01:06:21.728637950 HTTPClient:NFO Connecting to 127.0.0.1:5005
{
   "result" : {
      "account_data" : {
         "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
         "Balance" : "5000000000000",
         "Flags" : 0,
         "LedgerEntryType" : "AccountRoot",
         "OwnerCount" : 0,
         "PreviousTxnID" : "00C5B713B11DA775C6F932D38CE162C16FA88B7269BAFC6FDF4C6ADB74419670",
         "PreviousTxnLgrSeq" : 3,
         "Sequence" : 1,
         "index" : "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8"
      },
      "ledger_current_index" : 4,
      "status" : "success",
      "validated" : false
   }
}
```


### 5. Enter the sequence number on the offline machine.

Save the account's starting sequence number on the offline machine. Whenever you prepare a transaction using the offline machine, use the saved sequence number, then increase the sequence number by 1 and save the new value.

You can prepare several transactions in advance this way, then transfer the signed transactions to the online machine all at once and submit them. As long as each transaction is validly formed and pays a high enough transaction cost, the XRP Ledger network should eventually include those transactions in validated ledgers, keeping the account's sequence number in the shared XRP Ledger in sync with the "current" sequence number you are tracking on the offline machine. (Most transactions get a final, validated result within 15 seconds or less after being submitted to the network.)

Optionally, save the current ledger index to the offline machine. You can use this value to choose an appropriate LastLedgerSequence value for upcoming transactions.

`LastLedgerSequence`


### 6. Sign initial setup transactions, if any.

On the offline machine, prepare and sign transactions for configuring your account. The details depend on how you intend to use your account. Some examples of things you might want to do include:

- Assign a regular key pair that you can rotate regularly.
- Require destination tags so that users can't send you payments without tagging the reason they sent it or the customer it's intended for.
- Set Up Multi-Signing for a higher bar of account security.
- Enable DepositAuth so you can only receive payments you've explicitly accepted or from parties you've pre-approved.
- Require Auth so that users can't open trust lines to you without your permission. If you don't plan to use the XRP Ledger's decentralized exchange or token features, you may want to do this as a precaution.
- Token Issuers may have additional setup, such as:Set a Transfer Fee for users transferring your tokens.Disallow XRP payments if you plan to use this address for tokens only.
- Set a Transfer Fee for users transferring your tokens.
- Disallow XRP payments if you plan to use this address for tokens only.

- Set a Transfer Fee for users transferring your tokens.
- Disallow XRP payments if you plan to use this address for tokens only.

At this stage, you are only signing the transactions, not submitting them. For each transaction, you must provide all fields, including fields that are normally auto-fillable such as the Fee (transaction cost) and Sequence (sequence number). If you prepare multiple transactions at the same time, you must use sequentially increasing Sequence numbers in the order you want the transactions to execute.

`Fee`

`Sequence`

`Sequence`

Example (enable Require Auth):

- rippled Commandline

```
$ rippled sign sn3nxiW7v8KXzPzAqzyHXbSSKNuN9 '{"Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn", "Fee": "12", "Sequence": 1, "TransactionType": "AccountSet", "SetFlag": 2}' offline

Loading: "/etc/opt/ripple/rippled.cfg"
2019-Dec-11 00:18:31.865955978 HTTPClient:NFO Connecting to 127.0.0.1:5005
{
   "result" : {
      "deprecated" : "This command has been deprecated and will be removed in a future version of the server. Please migrate to a standalone signing tool.",
      "status" : "success",
      "tx_blob" : "1200032280000000240000000120210000000268400000000000000C7321039543A0D3004CDA0904A09FB3710251C652D69EA338589279BC849D47A7B019A174473045022100D5C92D7705036CD7EBB601C8DFCD90927FA591A62AF832C489E9C898EC8E2FA0022052F1819340EB73E9749B8930A6935727362B8E141D1B2E246B49F912223FFD4381144B4E9C06F24296074F7BC48F92A97916C6DC5EA9",
      "tx_json" : {
         "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
         "Fee" : "12",
         "Flags" : 2147483648,
         "Sequence" : 1,
         "SetFlag" : 2,
         "SigningPubKey" : "039543A0D3004CDA0904A09FB3710251C652D69EA338589279BC849D47A7B019A1",
         "TransactionType" : "AccountSet",
         "TxnSignature" : "3045022100D5C92D7705036CD7EBB601C8DFCD90927FA591A62AF832C489E9C898EC8E2FA0022052F1819340EB73E9749B8930A6935727362B8E141D1B2E246B49F912223FFD43",
         "hash" : "F81C34E7F05423DC1C973CB5008CA41AE984DE142EAA3975A749FABF0D08FA63"
      }
   }
}
```

To ensure all transactions have a final outcome within a limited amount of time, provide a LastLedgerSequence field. This value should be based on the current ledger index (which you must look up from an online machine) and the amount of time you want the transaction to remain valid. Be sure to set a large enough LastLedgerSequence value to allow for time spent switching from the online machine to the offline machine and back. For example, a value 256 higher than the current ledger index means that the transaction is valid for about 15 minutes. For more information, see Finality of Results and Reliable Transaction Submission.

`LastLedgerSequence`

`LastLedgerSequence`


### 7. Copy transactions to online machine.

After you have signed the transactions, the next step is to get the signed transaction data to your online machine. See Prerequisites for some examples of how to do this.


### 8. Submit setup transactions.

The next step is to submit the transactions. Most transactions should have a final outcome in the next validated ledger after submission (about 4 seconds later), or possibly the ledger after that if they get queued (less than 10 seconds). For detailed steps to track the final outcome of a transaction, see Reliable Transaction Submission.

Example of transaction submission:

- rippled Commandline

```
$ rippled submit 1200032280000000240000000120210000000268400000000000000C7321039543A0D3004CDA0904A09FB3710251C652D69EA338589279BC849D47A7B019A174473045022100D5C92D7705036CD7EBB601C8DFCD90927FA591A62AF832C489E9C898EC8E2FA0022052F1819340EB73E9749B8930A6935727362B8E141D1B2E246B49F912223FFD4381144B4E9C06F24296074F7BC48F92A97916C6DC5EA9

Loading: "/etc/opt/ripple/rippled.cfg"
2019-Dec-11 01:14:25.988839227 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
   "result" : {
      "deprecated" : "Signing support in the 'submit' command has been deprecated and will be removed in a future version of the server. Please migrate to a standalone signing tool.",
      "engine_result" : "tesSUCCESS",
      "engine_result_code" : 0,
      "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
      "status" : "success",
      "tx_blob" : "1200032280000000240000000120210000000268400000000000000C7321039543A0D3004CDA0904A09FB3710251C652D69EA338589279BC849D47A7B019A174473045022100D5C92D7705036CD7EBB601C8DFCD90927FA591A62AF832C489E9C898EC8E2FA0022052F1819340EB73E9749B8930A6935727362B8E141D1B2E246B49F912223FFD4381144B4E9C06F24296074F7BC48F92A97916C6DC5EA9",
      "tx_json" : {
         "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
         "Fee" : "12",
         "Flags" : 2147483648,
         "Sequence" : 1,
         "SetFlag" : 2,
         "SigningPubKey" : "039543A0D3004CDA0904A09FB3710251C652D69EA338589279BC849D47A7B019A1",
         "TransactionType" : "AccountSet",
         "TxnSignature" : "3045022100D5C92D7705036CD7EBB601C8DFCD90927FA591A62AF832C489E9C898EC8E2FA0022052F1819340EB73E9749B8930A6935727362B8E141D1B2E246B49F912223FFD43",
         "hash" : "F81C34E7F05423DC1C973CB5008CA41AE984DE142EAA3975A749FABF0D08FA63"
      }
   }
}
```

TipIf you are submitting more than 10 transactions at a time, you may have more success if you submit them in groups of 10 or less at a time, because the transaction queue is limited to 10 transactions from the same sender at a time. After each group of 10 transactions, wait for all the transactions to leave the queue before submitting the next group.

Retry submitting any transactions that failed with a non-final outcome. There is no chance of the same transaction being processed more than once.


### 9. Confirm the final status of the transactions.

For each transaction you submitted, note the transaction's final outcome, for example using the tx method. For example:

- rippled Commandline

```
$ ./rippled tx F81C34E7F05423DC1C973CB5008CA41AE984DE142EAA3975A749FABF0D08FA63

Loading: "/etc/opt/ripple/rippled.cfg"
2019-Dec-11 01:38:30.124771464 HTTPClient:NFO Connecting to 127.0.0.1:5005
{
   "result" : {
      "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      "Fee" : "12",
      "Flags" : 2147483648,
      "Sequence" : 1,
      "SetFlag" : 2,
      "SigningPubKey" : "039543A0D3004CDA0904A09FB3710251C652D69EA338589279BC849D47A7B019A1",
      "TransactionType" : "AccountSet",
      "TxnSignature" : "3045022100D5C92D7705036CD7EBB601C8DFCD90927FA591A62AF832C489E9C898EC8E2FA0022052F1819340EB73E9749B8930A6935727362B8E141D1B2E246B49F912223FFD43",
      "date" : 629343510,
      "hash" : "F81C34E7F05423DC1C973CB5008CA41AE984DE142EAA3975A749FABF0D08FA63",
      "inLedger" : 4,
      "ledger_index" : 4,
      "meta" : {
         "AffectedNodes" : [
            {
               "ModifiedNode" : {
                  "FinalFields" : {
                     "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
                     "Balance" : "4999999999988",
                     "Flags" : 262144,
                     "OwnerCount" : 0,
                     "Sequence" : 2
                  },
                  "LedgerEntryType" : "AccountRoot",
                  "LedgerIndex" : "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8",
                  "PreviousFields" : {
                     "Balance" : "5000000000000",
                     "Flags" : 0,
                     "Sequence" : 1
                  },
                  "PreviousTxnID" : "00C5B713B11DA775C6F932D38CE162C16FA88B7269BAFC6FDF4C6ADB74419670",
                  "PreviousTxnLgrSeq" : 3
               }
            }
         ],
         "TransactionIndex" : 0,
         "TransactionResult" : "tesSUCCESS"
      },
      "status" : "success",
      "validated" : true
   }
}
```

You may also find it useful to check the account_info of the sending account after all transactions have processed. Note the account's current sequence number (Sequence field) and, optionally, XRP balance.

`Sequence`

For any transactions that failed, you should decide what to do:

- If the transaction failed with a tefMAX_LEDGER code, you may need to specify a higher transaction cost to get the transaction processed. (This likely indicates that the XRP Ledger network is under load.) You may decide to replace the transaction with a new version that pays a higher cost and has a higher LastLedgerSequence parameter (if any).
- If the transaction failed with any tem-class code, you probably made a typo or another error in constructing the transaction. Double-check the transaction so that you can replace it with a validly-formed one.
- If the transaction failed with a tec-class code, you should address it on a case-by-case basis depending on the exact reason it failed.

`tefMAX_LEDGER`

`LastLedgerSequence`

`tem`

`tec`

For any transactions you decide to adjust or replace, note the details for when you return to the offline machine.


### 10. Reconcile offline machine status.

Return to the offline machine and apply any necessary changes to your custom server's saved settings, such as:

- Updating the account's current Sequence number. If all transactions were included in validated ledgers (successfully or with tec codes), then the offline machine's saved sequence number should already be correct. Otherwise, you may need to change the saved sequence number to match the Sequence value you noted in the previous step.
- Updating the current ledger index so that you can use appropriate LastLedgerSequence values in any new transactions. (You should always do this shortly before constructing any new transactions.)
- (Optional) Updating your actual amount of XRP available, if you are tracking it in the offline machine.

`Sequence`

`tec`

`Sequence`

`LastLedgerSequence`

Then adjust and sign any replacement transactions for transactions that failed in the previous step. Repeat the previous steps for constructing transactions on the offline machine, transferring them, and submitting them from the online machine.


## See Also

- Concepts:AccountsCryptographic Keys
- Accounts
- Cryptographic Keys
- Tutorials:Set Up Secure SigningAssign a Regular Key PairSet Up Multi-Signing
- Set Up Secure Signing
- Assign a Regular Key Pair
- Set Up Multi-Signing
- References:Basic Data Types: Account Sequenceaccount_info methodsign methodsubmit methodtx methodAccountSet transaction
- Basic Data Types: Account Sequence
- account_info method
- sign method
- submit method
- tx method
- AccountSet transaction

- Accounts
- Cryptographic Keys

- Set Up Secure Signing
- Assign a Regular Key Pair
- Set Up Multi-Signing

- Basic Data Types: Account Sequence
- account_info method
- sign method
- submit method
- tx method
- AccountSet transaction

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a52f0694-4355-46fe-b615-92b924927b84&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a52f0694-4355-46fe-b615-92b924927b84&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=03837306-2909-48ed-92f3-4b9b9874874b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=03837306-2909-48ed-92f3-4b9b9874874b&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6cf4a8f8-9976-4700-8c09-a13bfa57ae95&bo=1&sid=d3c081909d9d11f0b02b31b3c973fdd7&vid=d3c0e1009d9d11f0bafcabdbbfdd5a1a&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Offline%20Account%20Setup%20Tutorial&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&r=&lt=2045&evt=pageLoad&sv=2&cdb=AQAS&rn=715191)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=094ac012-92d3-460f-970d-7e7e4020a4ed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=094ac012-92d3-460f-970d-7e7e4020a4ed&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=551ccc6c-5fcd-457d-8f38-10905f5bbdb0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=551ccc6c-5fcd-457d-8f38-10905f5bbdb0&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=31e5388f-ae1a-4da9-932c-e5988e31d526&pt=Offline%20Account%20Setup%20Tutorial&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Ftutorials%2Fhow-tos%2Fmanage-account-settings%2Foffline-account-setup&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/offline-account-setup#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/offline-account-setup#)
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
- [Resources](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/offline-account-setup#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/tutorials/how-tos/manage-account-settings/offline-account-setup#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/tutorials/how-tos/manage-account-settings/offline-account-setup.md)
- [Red Hat Enterprise Linux DVD ISO installation instructions](https://access.redhat.com/solutions/7227)
- [xrpl.js](https://github.com/XRPLF/xrpl.js/)
- [recommended instructions for offline usage](https://yarnpkg.com/blog/2016/11/24/offline-mirror/)
- [diceware passphrase](https://theworld.com/~reinhold/diceware.html)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T01:36:24.034Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
