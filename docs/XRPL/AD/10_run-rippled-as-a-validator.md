# Run rippled as a Validator
URL: https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-validator
Section: AD10

## Overview


## Extracted Content
# Run rippled as a Validator

A rippled server running in validator mode does everything a stock server does:

`rippled`

- Connects to a network of peers
- Relays cryptographically signed transactions
- Maintains a local copy of the complete shared global ledger

Connects to a network of peers

Relays cryptographically signed transactions

Maintains a local copy of the complete shared global ledger

What makes a validator different is that it also issues validation messages, which are sets of candidate transactions for evaluation by the XRP Ledger network during the consensus process.

Issuing validation messages does not automatically give your validator a say in the consensus process, so the system is not vulnerable to a Sybil attack. Other servers ignore your validation messages unless they add your validator to their Unique Node List (UNL). If your validator is included in a UNL, it is a trusted validator and its proposals are considered in the consensus process by the servers that trust it.

Even if your validator isn't a trusted validator, it still plays an important role in the overall health of the network. These validators help set the standard that trusted validators are measured against. For example, if a trusted validator is disagreeing with a lot of these validators that aren't listed in UNLs, that might indicate a problem.

WarningValidators should not be accessible to the public. Do not allow public WebSocket access to your validator server or any other form of public access.


## 1. Understand the traits of a good validator

Strive to have your validator embody the following properties. Being a good validator helps rippled server operators and validator list publishers (such as https://vl.ripple.com and https://vl.xrplf.org) trust your validator before adding it to their UNLs.

`rippled`

- AvailableA good validator is always running and submitting validation votes for every proposed ledger. Strive for 100% uptime.
- In agreementA good validator's votes match the outcome of the consensus process as often as possible. To do otherwise could indicate that your validator's software is outdated, buggy, or intentionally biased. Always run the latest rippled release without modifications. Watch rippled releases and subscribe to the Google Group to be notified of new releases.
- Issuing prompt votesA good validator's votes arrive quickly and not after a consensus round has already finished. To keep your votes on time, make sure your validator meets the recommended system requirements, which include a fast internet connection.It is possible to submit new transactions and query data using a validator, but heavy loads of API queries may make the validator less reliable at keeping up with consensus. If your API needs are light enough, then you can use a server for both purposes. Ideally, a validator should be dedicated to participating in consensus.
- IdentifiedA good validator has a clearly identified owner. Providing domain verification is a good start. Ideally, XRP Ledger network UNLs include validators run by different owners in multiple legal jurisdictions and geographic areas. This reduces the chance that any localized events could interfere with the impartial operations of trusted validators.

Available

A good validator is always running and submitting validation votes for every proposed ledger. Strive for 100% uptime.

In agreement

A good validator's votes match the outcome of the consensus process as often as possible. To do otherwise could indicate that your validator's software is outdated, buggy, or intentionally biased. Always run the latest rippled release without modifications. Watch rippled releases and subscribe to the Google Group to be notified of new releases.

`rippled`

`rippled`

Issuing prompt votes

A good validator's votes arrive quickly and not after a consensus round has already finished. To keep your votes on time, make sure your validator meets the recommended system requirements, which include a fast internet connection.

It is possible to submit new transactions and query data using a validator, but heavy loads of API queries may make the validator less reliable at keeping up with consensus. If your API needs are light enough, then you can use a server for both purposes. Ideally, a validator should be dedicated to participating in consensus.

Identified

A good validator has a clearly identified owner. Providing domain verification is a good start. Ideally, XRP Ledger network UNLs include validators run by different owners in multiple legal jurisdictions and geographic areas. This reduces the chance that any localized events could interfere with the impartial operations of trusted validators.

It is strongly recommended that operators use the list providers that are present in this example file.


## 2. Install a rippled server

`rippled`

For more information, see Install rippled.

`rippled`


## 3. Enable validation on your rippled server

`rippled`

Enabling validation on your rippled server means providing a validator token in your server's rippled.cfg file. You can use the validator-keys tool (included in rippled packages) to securely generate and manage your validator keys and tokens.

`rippled`

`rippled.cfg`

`validator-keys`

`rippled`

In a secure location not on your validator:

1. Generate a validator key pair using the validator-keys tool, which is included in the rippled package:$ cd /opt/ripple/bin/Then run:$ ./validator-keys create_keysSample output on Ubuntu:Validator keys stored in /home/my-user/.ripple/validator-keys.json

This file should be stored securely and not shared.Sample output on macOS:Validator keys stored in /Users/my-user/.ripple/validator-keys.json

This file should be stored securely and not shared.WarningStore the generated validator-keys.json key file in a secure, offline, and recoverable location, such as an encrypted USB flash drive. Do not store keys on the validator where you intend to use the keys. If your secret_key is compromised, revoke the key immediately. Do not modify the contents of validator-keys.json, except to update the backup after generating a new token. If you generate more than one token from the same backup without updating, the network ignores the later tokens because they use the same token_sequence number.For more information about the validator-keys tool and the key pairs it generates, see the Validator Keys Tool Guide.
1. Generate a validator token using the create_token command. [Make sure you are at /opt/ripple/bin/]$ ./validator-keys create_token --keyfile /PATH/TO/YOUR/validator-keys.jsonSample output:Update rippled.cfg file with these values:

# validator public key: nHUtNnLVx7odrz5dnfb2xpIgbEeJPbzJWfdicSkGyVw1eE5GpjQr

[validator_token]
eyJ2YWxpZGF0aW9uX3NlY3J|dF9rZXkiOiI5ZWQ0NWY4NjYyNDFjYzE4YTI3NDdiNT
QzODdjMDYyNTkwNzk3MmY0ZTcxOTAyMzFmYWE5Mzc0NTdmYT|kYWY2IiwibWFuaWZl
c3QiOiJKQUFBQUFGeEllMUZ0d21pbXZHdEgyaUNjTUpxQzlnVkZLaWxHZncxL3ZDeE
hYWExwbGMyR25NaEFrRTFhZ3FYeEJ3RHdEYklENk9NU1l1TTBGREFscEFnTms4U0tG
bjdNTzJmZGtjd1JRSWhBT25ndTlzQUtxWFlvdUorbDJWMFcrc0FPa1ZCK1pSUzZQU2
hsSkFmVXNYZkFpQnNWSkdlc2FhZE9KYy9hQVpva1MxdnltR21WcmxIUEtXWDNZeXd1
NmluOEhBU1FLUHVnQkQ2N2tNYVJGR3ZtcEFUSGxHS0pkdkRGbFdQWXk1QXFEZWRGdj
VUSmEydzBpMjFlcTNNWXl3TFZKWm5GT3I3QzBrdzJBaVR6U0NqSXpkaXRROD0ifQ==

Generate a validator key pair using the validator-keys tool, which is included in the rippled package:

`validator-keys`

`rippled`

```
$ cd /opt/ripple/bin/
```

Then run:

```
$ ./validator-keys create_keys
```

Sample output on Ubuntu:

```
Validator keys stored in /home/my-user/.ripple/validator-keys.json

This file should be stored securely and not shared.
```

Sample output on macOS:

```
Validator keys stored in /Users/my-user/.ripple/validator-keys.json

This file should be stored securely and not shared.
```

WarningStore the generated validator-keys.json key file in a secure, offline, and recoverable location, such as an encrypted USB flash drive. Do not store keys on the validator where you intend to use the keys. If your secret_key is compromised, revoke the key immediately. Do not modify the contents of validator-keys.json, except to update the backup after generating a new token. If you generate more than one token from the same backup without updating, the network ignores the later tokens because they use the same token_sequence number.

`validator-keys.json`

`secret_key`

`validator-keys.json`

`token_sequence`

For more information about the validator-keys tool and the key pairs it generates, see the Validator Keys Tool Guide.

`validator-keys`

Generate a validator token using the create_token command. [Make sure you are at /opt/ripple/bin/]

`create_token`

`/opt/ripple/bin/`

```
$ ./validator-keys create_token --keyfile /PATH/TO/YOUR/validator-keys.json
```

Sample output:

```
Update rippled.cfg file with these values:

# validator public key: nHUtNnLVx7odrz5dnfb2xpIgbEeJPbzJWfdicSkGyVw1eE5GpjQr

[validator_token]
eyJ2YWxpZGF0aW9uX3NlY3J|dF9rZXkiOiI5ZWQ0NWY4NjYyNDFjYzE4YTI3NDdiNT
QzODdjMDYyNTkwNzk3MmY0ZTcxOTAyMzFmYWE5Mzc0NTdmYT|kYWY2IiwibWFuaWZl
c3QiOiJKQUFBQUFGeEllMUZ0d21pbXZHdEgyaUNjTUpxQzlnVkZLaWxHZncxL3ZDeE
hYWExwbGMyR25NaEFrRTFhZ3FYeEJ3RHdEYklENk9NU1l1TTBGREFscEFnTms4U0tG
bjdNTzJmZGtjd1JRSWhBT25ndTlzQUtxWFlvdUorbDJWMFcrc0FPa1ZCK1pSUzZQU2
hsSkFmVXNYZkFpQnNWSkdlc2FhZE9KYy9hQVpva1MxdnltR21WcmxIUEtXWDNZeXd1
NmluOEhBU1FLUHVnQkQ2N2tNYVJGR3ZtcEFUSGxHS0pkdkRGbFdQWXk1QXFEZWRGdj
VUSmEydzBpMjFlcTNNWXl3TFZKWm5GT3I3QzBrdzJBaVR6U0NqSXpkaXRROD0ifQ==
```

On your validator:

1. Add [validator_token] and its value to your validator's rippled.cfg file.If you previously configured your validator without the validator-keys tool, delete [validation_seed] and its value from your rippled.cfg file. This changes your validator public key.
1. Restart rippled.$ sudo systemctl restart rippled.service
1. Use the server_info command to get information about your validator to verify that it is running as a validator.$ rippled server_infoThe pubkey_validator value in the response should match the public_key in the validator-keys.json file that you generated for use with your validator.The server_state value should be proposing.
1. The pubkey_validator value in the response should match the public_key in the validator-keys.json file that you generated for use with your validator.
1. The server_state value should be proposing.

Add [validator_token] and its value to your validator's rippled.cfg file.

`[validator_token]`

`rippled.cfg`

If you previously configured your validator without the validator-keys tool, delete [validation_seed] and its value from your rippled.cfg file. This changes your validator public key.

`validator-keys`

`[validation_seed]`

`rippled.cfg`

Restart rippled.

`rippled`

```
$ sudo systemctl restart rippled.service
```

Use the server_info command to get information about your validator to verify that it is running as a validator.

`server_info`

```
$ rippled server_info
```

- The pubkey_validator value in the response should match the public_key in the validator-keys.json file that you generated for use with your validator.
- The server_state value should be proposing.

The pubkey_validator value in the response should match the public_key in the validator-keys.json file that you generated for use with your validator.

`pubkey_validator`

`public_key`

`validator-keys.json`

The server_state value should be proposing.

`server_state`

Security Tip: Change the permissions on your rippled.cfg file to be more restrictive. On Linux it is recommended to be 0600. You can do this with chmod 0600 rippled.cfg

`rippled.cfg`

`0600`

`chmod 0600 rippled.cfg`


## 4. Connect to the network

This section describes three different configurations you can use to connect your validator to the XRP Ledger network. Use the configuration that best suits your use case.

- Discovered peers: Connect to any servers in the peer-to-peer network.
- Proxies: Run stock rippled servers as proxies between your validator and the rest of the peer-to-peer network.
- Public hubs: Connect only to specific public servers with a high reputation.

Discovered peers: Connect to any servers in the peer-to-peer network.

Proxies: Run stock rippled servers as proxies between your validator and the rest of the peer-to-peer network.

`rippled`

Public hubs: Connect only to specific public servers with a high reputation.

For a comparison of these approaches, see Pros and Cons of Peering Configurations.


### Connect using discovered peers

This configuration connects your validator to the XRP Ledger network using discovered peers. This is the default behavior for rippled servers.

`rippled`

To connect your validator to the XRP Ledger network using discovered peers, omit the [peer_private] stanza or set it to 0 in your validator's rippled.cfg file. The example rippled.cfg file is delivered with this configuration.

`[peer_private]`

`0`

`rippled.cfg`

`rippled.cfg`


### Connect using proxies

This configuration connects your validator to the network through stock rippled servers that you run yourself. These proxy servers sit between your validator and inbound and outbound network traffic.

`rippled`

To connect your validator to the XRP Ledger network using proxies:

1. Set up stock rippled servers. For more information, see Install rippled.
1. Configure your validator and stock rippled servers to run in a cluster.
1. In your validator's rippled.cfg file, set [peer_private] to 1. This prevents your validator's IP address from being forwarded. For more information, see Private Peers. It also prevents your validator from connecting to servers other than those defined in the [ips_fixed] stanza you defined to run your validator in a cluster.WarningBe sure that you don't publish your validator's IP address in other ways.
1. Configure your validator host machine's firewall to allow the following traffic only:Inbound traffic: Only from IP addresses of the stock rippled servers in the cluster you configured.Outbound traffic: Only to the IP addresses of the stock rippled servers in the cluster you configured and to your UNL list providers through port 443.
1. Inbound traffic: Only from IP addresses of the stock rippled servers in the cluster you configured.
1. Outbound traffic: Only to the IP addresses of the stock rippled servers in the cluster you configured and to your UNL list providers through port 443.
1. Restart rippled.$ sudo systemctl restart rippled.service
1. Use the Peer Crawler endpoint on one of your stock rippled servers. The response should not include your validator. This verifies that your validator's [peer_private] configuration is working. One of the effects of enabling [peer_private] on your validator is that your validator's peers do not include it in their Peer Crawler results.$ curl --insecure https://STOCK_SERVER_IP_ADDRESS_HERE:51235/crawl | python3 -m json.tool

Set up stock rippled servers. For more information, see Install rippled.

`rippled`

Configure your validator and stock rippled servers to run in a cluster.

`rippled`

In your validator's rippled.cfg file, set [peer_private] to 1. This prevents your validator's IP address from being forwarded. For more information, see Private Peers. It also prevents your validator from connecting to servers other than those defined in the [ips_fixed] stanza you defined to run your validator in a cluster.

`rippled.cfg`

`[peer_private]`

`1`

`[ips_fixed]`

WarningBe sure that you don't publish your validator's IP address in other ways.

Configure your validator host machine's firewall to allow the following traffic only:

- Inbound traffic: Only from IP addresses of the stock rippled servers in the cluster you configured.
- Outbound traffic: Only to the IP addresses of the stock rippled servers in the cluster you configured and to your UNL list providers through port 443.

Inbound traffic: Only from IP addresses of the stock rippled servers in the cluster you configured.

`rippled`

Outbound traffic: Only to the IP addresses of the stock rippled servers in the cluster you configured and to your UNL list providers through port 443.

`rippled`

Restart rippled.

`rippled`

```
$ sudo systemctl restart rippled.service
```

Use the Peer Crawler endpoint on one of your stock rippled servers. The response should not include your validator. This verifies that your validator's [peer_private] configuration is working. One of the effects of enabling [peer_private] on your validator is that your validator's peers do not include it in their Peer Crawler results.

`rippled`

`[peer_private]`

`[peer_private]`

```
$ curl --insecure https://STOCK_SERVER_IP_ADDRESS_HERE:51235/crawl | python3 -m json.tool
```


### Connect using public hubs

This configuration connects your validator to the network using three public hubs. This configuration is similar to connecting using proxies you run yourself, but instead you connect through public hubs.

To connect your validator to the network using public hubs:

1. In your validator's rippled.cfg file, include the following [ips_fixed] stanza. This stanza tells rippled to always attempt to maintain peer connections with these public hubs.[ips_fixed]
r.ripple.com 51235
sahyadri.isrdc.in 51235
hubs.xrpkuwait.com 51235
hub.xrpl-commons.org 51235

In your validator's rippled.cfg file, include the following [ips_fixed] stanza. This stanza tells rippled to always attempt to maintain peer connections with these public hubs.

`rippled.cfg`

`[ips_fixed]`

`rippled`

```
[ips_fixed]
r.ripple.com 51235
sahyadri.isrdc.in 51235
hubs.xrpkuwait.com 51235
hub.xrpl-commons.org 51235
```

The above list may evolve over time. To ensure you're using the most current set of public hubs, refer to the official rippled-example.cfg maintained by XRPLF.

`rippled-example.cfg`

CautionThis configuration connects your validator to the network using default public hubs. Because these are the default public hubs, they may sometimes be too busy to provide your validator with a connection to the network. To help avoid this issue, connect to more public hubs and, even better, connect to non-default public hubs.

You can include the IP addresses of other rippled servers here, but only if you can expect them to:

`rippled`

- Relay messages without censoring.
- Stay online consistently.
- Not DDoS you.
- Not try to crash your server.
- Not publish your IP address to strangers.

1. Also in your validator's rippled.cfg file, include the following [peer_private] stanza and set it to 1. This instructs your validator’s peers not to broadcast your validator’s IP address. This setting also instructs your validator to connect to only the peers configured in your [ips_fixed] stanza. This ensures that your validator connects to and shares its IP with only peer rippled servers you know and trust.[peer_private]
1WarningBe sure that you don't publish your validator's IP address in other ways.With [peer_private] enabled, rippled ignores any connections suggested by the [ips] stanza. If you need to connect to an IP currently in your [ips] stanza, put it in the [ips_fixed] stanza instead, but only if you can expect them to behave responsibly as described in step 1.
1. Restart rippled.$ sudo systemctl restart rippled.service

Also in your validator's rippled.cfg file, include the following [peer_private] stanza and set it to 1. This instructs your validator’s peers not to broadcast your validator’s IP address. This setting also instructs your validator to connect to only the peers configured in your [ips_fixed] stanza. This ensures that your validator connects to and shares its IP with only peer rippled servers you know and trust.

`rippled.cfg`

`[peer_private]`

`1`

`[ips_fixed]`

`rippled`

```
[peer_private]
1
```

WarningBe sure that you don't publish your validator's IP address in other ways.

With [peer_private] enabled, rippled ignores any connections suggested by the [ips] stanza. If you need to connect to an IP currently in your [ips] stanza, put it in the [ips_fixed] stanza instead, but only if you can expect them to behave responsibly as described in step 1.

`[peer_private]`

`rippled`

`[ips]`

`[ips]`

`[ips_fixed]`

Restart rippled.

`rippled`

```
$ sudo systemctl restart rippled.service
```


## 5. Verify your network connection

Here are some methods you can use to verify that your validator has a healthy connection to the XRP Ledger network:

- Use the peers command to return a list of all rippled servers currently connected to your validator. If the peers array is null, you don’t have a healthy connection to the network. If you've set up your validator using the instructions in this document, the peers array should include the same number of objects as the number of peers defined in your [ips_fixed] stanza.If you listed a public hub in your [ips_fixed] stanza and it is busy, it may reject your validator's connection. In this case, you may end up with fewer connections than configured in your [ips_fixed] stanza. Your validator retries the connection if it's initially rejected.If you are having trouble maintaining a reliable and safe connection to the network and haven't set up connections using public hubs or proxies, see 4. Connect to the network. Using one of the methods described in the section may help your validator remain healthily connected to the network.
- Use the server_info command to return some basic information about your validator. The server_state should be set to proposing. It may also be set to full or validating, but only for a few minutes before moving into proposing.If the server_state does not spend the majority of its time set to proposing, it may be a sign that your validator is unable to fully participate in the XRP Ledger network. For more information about server states and using the server_info endpoint to diagnose issues with your validator, see rippled Server States and Get the server_info.
- Use the validators command to return the current list of published and trusted validators used by the validator. Ensure that the validator_list_expires value is either never or not expired or about to expire.

Use the peers command to return a list of all rippled servers currently connected to your validator. If the peers array is null, you don’t have a healthy connection to the network. If you've set up your validator using the instructions in this document, the peers array should include the same number of objects as the number of peers defined in your [ips_fixed] stanza.

`peers`

`rippled`

`peers`

`null`

`peers`

`[ips_fixed]`

If you listed a public hub in your [ips_fixed] stanza and it is busy, it may reject your validator's connection. In this case, you may end up with fewer connections than configured in your [ips_fixed] stanza. Your validator retries the connection if it's initially rejected.

`[ips_fixed]`

`[ips_fixed]`

If you are having trouble maintaining a reliable and safe connection to the network and haven't set up connections using public hubs or proxies, see 4. Connect to the network. Using one of the methods described in the section may help your validator remain healthily connected to the network.

Use the server_info command to return some basic information about your validator. The server_state should be set to proposing. It may also be set to full or validating, but only for a few minutes before moving into proposing.

`server_info`

`server_state`

`proposing`

`full`

`validating`

`proposing`

If the server_state does not spend the majority of its time set to proposing, it may be a sign that your validator is unable to fully participate in the XRP Ledger network. For more information about server states and using the server_info endpoint to diagnose issues with your validator, see rippled Server States and Get the server_info.

`server_state`

`proposing`

`server_info`

`rippled`

`server_info`

Use the validators command to return the current list of published and trusted validators used by the validator. Ensure that the validator_list_expires value is either never or not expired or about to expire.

`validators`

`validator_list_expires`

`never`


## 6. Provide domain verification

To help validation list publishers and other participants in the XRP Ledger network understand who runs your validator, provide domain verification for your validator. At a high level, domain verification is a two-way link:

- Use your domain to claim ownership of a validator key.
- Use your validator key to claim ownership of a domain.

Use your domain to claim ownership of a validator key.

Use your validator key to claim ownership of a domain.

Creating this link establishes strong evidence that you own both the validator key and the domain. Providing this evidence is one aspect of being a good validator.

To provide domain verification:

1. Choose a domain name you own that you want to be publicly associated with your validator. As a precaution against DDoS attempts, your domain name should not resolve to the ip address of your validator.
1. Serve an xrp-ledger.toml file at your domain, and complete the domain verification steps. Once you have completed these steps, your validator should be visible to the livenet explorer or any other site that monitors the validator network and supports decetralized domain verification.
1. Share your validator's public key with the public, especially other rippled operators. For example, you can share your validator's public key on your website, on social media, in the XRPChat community forum, or in a press release.

Choose a domain name you own that you want to be publicly associated with your validator. As a precaution against DDoS attempts, your domain name should not resolve to the ip address of your validator.

Serve an xrp-ledger.toml file at your domain, and complete the domain verification steps. Once you have completed these steps, your validator should be visible to the livenet explorer or any other site that monitors the validator network and supports decetralized domain verification.

`xrp-ledger.toml`

Share your validator's public key with the public, especially other rippled operators. For example, you can share your validator's public key on your website, on social media, in the XRPChat community forum, or in a press release.

`rippled`


## Revoke validator keys

If your validator's master private key is compromised, you must revoke it immediately and permanently.

For information about how to revoke a master key pair you generated for your validator using the validator-keys tool, see Key Revocation.

`validator-keys`


## See Also

- Concepts:XRP Ledger OverviewThe rippled Server
- XRP Ledger Overview
- The rippled Server
- Tutorials:Cluster rippled ServersInstall rippledCapacity Planning
- Cluster rippled Servers
- Install rippled
- Capacity Planning
- References:Validator Keys Tool Guideconsensus_info methodvalidator_list_sites methodvalidators method
- Validator Keys Tool Guide
- consensus_info method
- validator_list_sites method
- validators method

- XRP Ledger Overview
- The rippled Server

`rippled`

- Cluster rippled Servers
- Install rippled
- Capacity Planning

`rippled`

- Validator Keys Tool Guide
- consensus_info method
- validator_list_sites method
- validators method

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b029c2b8-844b-4ebf-a857-b9aff39c5991&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b029c2b8-844b-4ebf-a857-b9aff39c5991&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=15215ff8-97f6-4f0f-ae75-c0375b44fab6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=15215ff8-97f6-4f0f-ae75-c0375b44fab6&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=745d2103-0712-4b24-9c55-20f0ce4436c6&bo=1&sid=0d98f6409daa11f0b2eebb12c2f7b4b6&vid=0d99c2609daa11f0949f0d38f9d81792&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Run%20rippled%20as%20a%20Validator&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&r=&lt=2861&evt=pageLoad&sv=2&cdb=AQAS&rn=228646)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5873c274-227d-4e91-8385-6dbdb581c73c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5873c274-227d-4e91-8385-6dbdb581c73c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d78c1536-f344-4cd6-8a5a-0eef9b1dfb1d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=d78c1536-f344-4cd6-8a5a-0eef9b1dfb1d&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=c8ddbad1-bea0-496c-9c90-c78ccf0ed4fd&pt=Run%20rippled%20as%20a%20Validator&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Fconfiguration%2Fserver-modes%2Frun-rippled-as-a-validator&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-validator#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-validator#)
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
- [Resources](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-validator#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/configuration/server-modes/run-rippled-as-a-validator#)
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
- [Infrastructure](https://xrpl.org/docs/infrastructure)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/configuration/server-modes/run-rippled-as-a-validator.md)
- [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack)
- [latest rippled release](https://github.com/XRPLF/rippled/tree/release)
- [Watch rippled releases](https://github.com/XRPLF/rippled/releases)
- [Google Group](https://groups.google.com/g/ripple-server)
- [example file](https://github.com/XRPLF/rippled/blob/develop/cfg/validators-example.txt)
- [revoke the key](https://github.com/ripple/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md#key-revocation)
- [Validator Keys Tool Guide](https://github.com/ripple/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md)
- [example rippled.cfg file](https://github.com/XRPLF/rippled/blob/develop/cfg/rippled-example.cfg)
- [rippled-example.cfg](https://github.com/XRPLF/rippled/blob/develop/cfg/rippled-example.cfg)
- [XRPChat community forum](https://www.xrpchat.com/)
- [Key Revocation](https://github.com/ripple/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md#key-revocation)
- [Validator Keys Tool Guide](https://github.com/ripple/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:03:57.047Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
