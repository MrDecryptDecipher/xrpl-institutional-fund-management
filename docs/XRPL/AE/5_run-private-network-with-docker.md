# Run a Private Network with Docker
URL: https://xrpl.org/docs/infrastructure/testing-and-auditing/run-private-network-with-docker
Section: AE5

## Overview


## Extracted Content
# Run a Private Network with Docker

This tutorial describes how to run a private XRP Ledger network on your computer with Docker and the latest version of rippled.

While you can easily use the public XRP Testnet servers, running a private network can be useful when trying to understand how the XRP Ledger works, or when testing new features in isolation.

CautionThis tutorial is suited for development or testing purposes only, and does not involve using real money. You should not use this configuration for a production network.


## Learning Goals

In this tutorial, you will learn:

- How to set up and configure a small network with three rippled validator nodes, including how to generate the keys for each node.
- How to run the network with Docker Compose.
- How to verify the network is up and running.

How to set up and configure a small network with three rippled validator nodes, including how to generate the keys for each node.

`rippled`

How to run the network with Docker Compose.

How to verify the network is up and running.

The following diagram shows a high-level overview of the containerized private network that you will set up.


## Prerequisites

To follow along with this tutorial, ensure that you have the latest version of Docker installed on your preferred platform.


## Generate the Validator Keys

Generate the keys for each of your validator nodes by using the validator-keys tool provided with rippled. The generated keys should be saved in a text file on your computer for later use.

`validator-keys`

`rippled`

1. In your terminal, run the following to execute commands within the rippled Docker container shell:docker run -it --entrypoint /bin/bash xrpllabsofficial/xrpld:latestNoteFor Apple M1 or M2 chips, run docker run -it --platform linux/amd64 --entrypoint /bin/bash xrpllabsofficial/xrpld:latest instead.Sample output:root@7732bd585b14:/#
1. Generate a validator keypair using the create_keys command.cd /opt/ripple/bin &&
    ./validator-keys create_keys --keyfile /PATH/TO/YOUR/validator-<NUMBER>-keys.jsonSample output:Validator keys stored in /PATH/TO/YOUR/validator-<NUMBER>-keys.json

This file should be stored securely and not shared.WarningIn a production or test environment you should follow best practices always and store the generated keys in a secure, offline, and recoverable location, such as an encrypted USB flash drive. However, as this tutorial is an example of a local development setup, storing the keys on your computer is sufficient.
1. Copy the public_key value from the JSON output, and store it in a text file on your computer.cat /PATH/TO/YOUR/validator-<NUMBER>-keys.jsonSample output:{
   "key_type" : "ed25519",
   "public_key" : "nHD9jtA9y1nWC2Fs1HeRkEisqV3iFpk12wHmHi3mQxQwUP1ywUKs",
   "revoked" : false,
   "secret_key" : "paLsUUm9bRrvNBPpvJQ4nF7vdRTZyDNofGMMYs9EDeEKeNJa99q",
   "token_sequence" : 0
}
1. Create a validator token using the create_token command../validator-keys create_token --keyfile /PATH/TO/YOUR/validator-<NUMBER>-keys.jsonCopy the token value from the output and save it in a text file on your computer. For example:[validator_token]
eyJ2YWxpZGF0aW9uX3NlY3J|dF9rZXkiOiI5ZWQ0NWY4NjYyNDFjYzE4YTI3NDdiNT
QzODdjMDYyNTkwNzk3MmY0ZTcxOTAyMzFmYWE5Mzc0NTdmYT|kYWY2IiwibWFuaWZl
c3QiOiJKQUFBQUFGeEllMUZ0d21pbXZHdEgyaUNjTUpxQzlnVkZLaWxHZncxL3ZDeE
hYWExwbGMyR25NaEFrRTFhZ3FYeEJ3RHdEYklENk9NU1l1TTBGREFscEFnTms4U0tG
bjdNTzJmZGtjd1JRSWhBT25ndTlzQUtxWFlvdUorbDJWMFcrc0FPa1ZCK1pSUzZQU2
hsSkFmVXNYZkFpQnNWSkdlc2FhZE9KYy9hQVpva1MxdnltR21WcmxIUEtXWDNZeXd1
NmluOEhBU1FLUHVnQkQ2N2tNYVJGR3ZtcEFUSGxHS0pkdkRGbFdQWXk1QXFEZWRGdj
VUSmEydzBpMjFlcTNNWXl3TFZKWm5GT3I3QzBrdzJBaVR6U0NqSXpkaXRROD0ifQ==
1. Repeat steps 2-4 for the remaining validator nodes. Once you have generated the keys and tokens for all validators, enter exit in your terminal to exit the Docker container.

In your terminal, run the following to execute commands within the rippled Docker container shell:

`rippled`

```
docker run -it --entrypoint /bin/bash xrpllabsofficial/xrpld:latest
```

NoteFor Apple M1 or M2 chips, run docker run -it --platform linux/amd64 --entrypoint /bin/bash xrpllabsofficial/xrpld:latest instead.

`docker run -it --platform linux/amd64 --entrypoint /bin/bash xrpllabsofficial/xrpld:latest`

Sample output:

```
root@7732bd585b14:/#
```

Generate a validator keypair using the create_keys command.

`create_keys`

```
cd /opt/ripple/bin &&
    ./validator-keys create_keys --keyfile /PATH/TO/YOUR/validator-<NUMBER>-keys.json
```

Sample output:

```
Validator keys stored in /PATH/TO/YOUR/validator-<NUMBER>-keys.json

This file should be stored securely and not shared.
```

WarningIn a production or test environment you should follow best practices always and store the generated keys in a secure, offline, and recoverable location, such as an encrypted USB flash drive. However, as this tutorial is an example of a local development setup, storing the keys on your computer is sufficient.

Copy the public_key value from the JSON output, and store it in a text file on your computer.

```
cat /PATH/TO/YOUR/validator-<NUMBER>-keys.json
```

Sample output:

```
{
   "key_type" : "ed25519",
   "public_key" : "nHD9jtA9y1nWC2Fs1HeRkEisqV3iFpk12wHmHi3mQxQwUP1ywUKs",
   "revoked" : false,
   "secret_key" : "paLsUUm9bRrvNBPpvJQ4nF7vdRTZyDNofGMMYs9EDeEKeNJa99q",
   "token_sequence" : 0
}
```

Create a validator token using the create_token command.

`create_token`

```
./validator-keys create_token --keyfile /PATH/TO/YOUR/validator-<NUMBER>-keys.json
```

Copy the token value from the output and save it in a text file on your computer. For example:

```
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

Repeat steps 2-4 for the remaining validator nodes. Once you have generated the keys and tokens for all validators, enter exit in your terminal to exit the Docker container.

`exit`


## Configure the Network

This section describes how to configure the validator nodes in your network.

NoteThe configuration in this tutorial enables the network to retain some ledger history, but the amount of transaction history stored will depend on how long the network has been online.


### Create the node directories

On your computer, create the directories for all nodes in the private network, and their respective configuration folders.

```
xrpl-private-network/
    ├── validator_1/
    │   └── config
    ├── validator_2/
    │   └── config
    └── validator_3/
        └── config
```

In your terminal, run the following command to create the directories:

```
mkdir -p xrpl-private-network/{validator_1/config,validator_2/config,validator_3/config}
```


### Create the validator configuration files

For each validator node, follow these steps:

1. In the validator's config directory, create a rippled.cfg file.
1. Copy the information from the rippled.cfg template below into the file.[server]
port_rpc_admin_local
port_rpc
port_ws_admin_local
port_ws_public
port_peer
# ssl_key = /etc/ssl/private/server.key
# ssl_cert = /etc/ssl/certs/server.crt

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_ws_admin_local]
port = 6006
ip = 127.0.0.1
admin = 127.0.0.1
protocol = ws

[port_ws_public]
port = 80
ip = 0.0.0.0
protocol = ws

[port_peer]
port = 51235
ip = 0.0.0.0
protocol = peer

[port_rpc]
port = 51234
ip = 0.0.0.0
admin = 127.0.0.1
protocol = https, http

[node_size]
small
# tiny
# small
# medium
# large
# huge

[node_db]
type=NuDB
path=/var/lib/rippled/db/nudb
advisory_delete=0

# How many ledgers do we want to keep (history)?
# Integer value that defines the number of ledgers
# between online deletion events
online_delete=256

[ledger_history]
# How many ledgers do we want to keep (history)?
# Integer value (ledger count)
# or (if you have lots of TB SSD storage): 'full'
256

[database_path]
/var/lib/rippled/db

[debug_logfile]
/var/log/rippled/debug.log

[sntp_servers]
time.windows.com
time.apple.com
time.nist.gov
pool.ntp.org

[ips_fixed]
validator_1 51235
validator_2 51235
validator_3 51235

[validators_file]
validators.txt

[rpc_startup]
{ "command": "log_level", "severity": "warning" }
# severity (order: lots of information .. only errors)
# debug
# info
# warn
# error
# fatal

[ssl_verify]
0

[validator_token]
<Add your validator token here>
1. Add the generated validator token that you created at the beginning of the tutorial. For example:[validator_token]
eyJtYW5pZmVzdCI6IkpBQUFBQUZ4SWUwcVd3ZnpLZ2tacWJTL01QVGxHVXlOeTVJZ2kzYzlG
V1JvTDFIMGoydkNobk1oQTBOc2RHeFNXbWF6b0xkdU5NeDVmaVVZU2h3bjk2SnpSaUFReFJz
cENuR2dka1l3UkFJZ1dLazV4cklSN3FNRWd1UmJwOTRrN0E0QnBOZmwrT2VYUm92bTNIOGtS
YkVDSUZXYmVocHd5ZS9UWFpZRGYwUEgwTkxjN2I1cWNEOXUvbzVYUjA4YW1pUEJjQkpBYjEw
NE95bG5IS0JSZTJmRW1qSVVjT24vZ2ZacE44bXdhZ1dGbUxlemc2RFRLL0hpTVkyektNQ3l0
aksreHpHNWpjc3JlS3k5Q29sRGtpKzk3V0JHQ2c9PSIsInZhbGlkYXRpb25fc2VjcmV0X2tl
eSI6IjZFNTNFQjA1M0IwNEM1RTczNDc4M0VCMEU0RTBFOTg1NDVDNDQ0QzI3OTBFQjdBMzA2
NUQzMUVBOTU1QjQyMTIifQ==Each validator node must have its own unique token.

In the validator's config directory, create a rippled.cfg file.

`config`

`rippled.cfg`

Copy the information from the rippled.cfg template below into the file.

`rippled.cfg`

```
[server]
port_rpc_admin_local
port_rpc
port_ws_admin_local
port_ws_public
port_peer
# ssl_key = /etc/ssl/private/server.key
# ssl_cert = /etc/ssl/certs/server.crt

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_ws_admin_local]
port = 6006
ip = 127.0.0.1
admin = 127.0.0.1
protocol = ws

[port_ws_public]
port = 80
ip = 0.0.0.0
protocol = ws

[port_peer]
port = 51235
ip = 0.0.0.0
protocol = peer

[port_rpc]
port = 51234
ip = 0.0.0.0
admin = 127.0.0.1
protocol = https, http

[node_size]
small
# tiny
# small
# medium
# large
# huge

[node_db]
type=NuDB
path=/var/lib/rippled/db/nudb
advisory_delete=0

# How many ledgers do we want to keep (history)?
# Integer value that defines the number of ledgers
# between online deletion events
online_delete=256

[ledger_history]
# How many ledgers do we want to keep (history)?
# Integer value (ledger count)
# or (if you have lots of TB SSD storage): 'full'
256

[database_path]
/var/lib/rippled/db

[debug_logfile]
/var/log/rippled/debug.log

[sntp_servers]
time.windows.com
time.apple.com
time.nist.gov
pool.ntp.org

[ips_fixed]
validator_1 51235
validator_2 51235
validator_3 51235

[validators_file]
validators.txt

[rpc_startup]
{ "command": "log_level", "severity": "warning" }
# severity (order: lots of information .. only errors)
# debug
# info
# warn
# error
# fatal

[ssl_verify]
0

[validator_token]
<Add your validator token here>
```

Add the generated validator token that you created at the beginning of the tutorial. For example:

```
[validator_token]
eyJtYW5pZmVzdCI6IkpBQUFBQUZ4SWUwcVd3ZnpLZ2tacWJTL01QVGxHVXlOeTVJZ2kzYzlG
V1JvTDFIMGoydkNobk1oQTBOc2RHeFNXbWF6b0xkdU5NeDVmaVVZU2h3bjk2SnpSaUFReFJz
cENuR2dka1l3UkFJZ1dLazV4cklSN3FNRWd1UmJwOTRrN0E0QnBOZmwrT2VYUm92bTNIOGtS
YkVDSUZXYmVocHd5ZS9UWFpZRGYwUEgwTkxjN2I1cWNEOXUvbzVYUjA4YW1pUEJjQkpBYjEw
NE95bG5IS0JSZTJmRW1qSVVjT24vZ2ZacE44bXdhZ1dGbUxlemc2RFRLL0hpTVkyektNQ3l0
aksreHpHNWpjc3JlS3k5Q29sRGtpKzk3V0JHQ2c9PSIsInZhbGlkYXRpb25fc2VjcmV0X2tl
eSI6IjZFNTNFQjA1M0IwNEM1RTczNDc4M0VCMEU0RTBFOTg1NDVDNDQ0QzI3OTBFQjdBMzA2
NUQzMUVBOTU1QjQyMTIifQ==
```

Each validator node must have its own unique token.


### Create the validators.txt files

Now that you have created the configuration files for your validators, you need to add a validator.txt file. This file defines which validators are trusted by your network.

`validator.txt`

For each node, follow these steps:

1. Create a validators.txt file in the configuration directory.
1. Copy the public keys from the validator-keys.json files that you generated at the beginning of the tutorial.
1. Add the public keys of all the validators. For example:[validators]
    nHBgaEDL8buUECuk4Rck4QBYtmUgbAoeYJLpWLzG9iXsznTRYrQu
    nHBCHX7iLDTyap3LumqBNuKgG7JLA5tc6MSJxpLs3gjkwpu836mY
    nHU5STUKTgWdreVqJDx6TopLUymzRUZshTSGcWNtjfByJkYdiiRc

Create a validators.txt file in the configuration directory.

`validators.txt`

Copy the public keys from the validator-keys.json files that you generated at the beginning of the tutorial.

`validator-keys.json`

Add the public keys of all the validators. For example:

```
[validators]
    nHBgaEDL8buUECuk4Rck4QBYtmUgbAoeYJLpWLzG9iXsznTRYrQu
    nHBCHX7iLDTyap3LumqBNuKgG7JLA5tc6MSJxpLs3gjkwpu836mY
    nHU5STUKTgWdreVqJDx6TopLUymzRUZshTSGcWNtjfByJkYdiiRc
```


## Start the Network

Docker Compose lets you manage multiple containers on your computer with a simple yaml file configuration. This section describes how to run the network with Docker Compose, and how to verify that the network is running successfully.

`yaml`

Note Docker Compose ensures the containers are part of the same Docker virtual network by default, so you don't need to take any additional steps for the rippled containers to communicate with each other.

`rippled`

To start running your private network, follow these steps:

1. Create a docker-compose.yml file in the root of the private network directory, xrpl-private-network, and add the following content:version: "3.9"
services:
  validator_1:
    platform: linux/amd64
    container_name: validator_1
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8001:80"
      - "5006:5005"
      - "4001:6006"
      - "9001:51235"
    volumes:
      - ./validator_1/config:/config/
  validator_2:
    platform: linux/amd64
    container_name: validator_2
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8002:80"
      - "5007:5005"
      - "4002:6006"
      - "9002:51235"
    volumes:
      - ./validator_2/config:/config/
  validator_3:
    platform: linux/amd64
    container_name: validator_3
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8003:80"
      - "5008:5005"
      - "4003:6006"
      - "9003:51235"
    volumes:
      - ./validator_3/config:/config/The volumes key in each service represents the location where your config files are stored. For example, ./validator_1/config:/config/ maps the /validator_1/config directory on your host computer to /config/ in the Docker container. Any changes made in the host directory will be reflected in the container automatically.
1. From your terminal, in the location where you created the docker-compose.yml file, run docker-compose up -d. You should see a similar output to the one below:[+] Running 4/4
 ✔ Network xrpl-private-network_default    Created                             0.0s
 ✔ Container validator_3                   Started                             0.5s
 ✔ Container validator_1                   Started                             0.5s
 ✔ Container validator_2                   Started                             0.5s

Create a docker-compose.yml file in the root of the private network directory, xrpl-private-network, and add the following content:

`docker-compose.yml`

`xrpl-private-network`

```
version: "3.9"
services:
  validator_1:
    platform: linux/amd64
    container_name: validator_1
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8001:80"
      - "5006:5005"
      - "4001:6006"
      - "9001:51235"
    volumes:
      - ./validator_1/config:/config/
  validator_2:
    platform: linux/amd64
    container_name: validator_2
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8002:80"
      - "5007:5005"
      - "4002:6006"
      - "9002:51235"
    volumes:
      - ./validator_2/config:/config/
  validator_3:
    platform: linux/amd64
    container_name: validator_3
    image: "xrpllabsofficial/xrpld"
    ports:
      - "8003:80"
      - "5008:5005"
      - "4003:6006"
      - "9003:51235"
    volumes:
      - ./validator_3/config:/config/
```

The volumes key in each service represents the location where your config files are stored. For example, ./validator_1/config:/config/ maps the /validator_1/config directory on your host computer to /config/ in the Docker container. Any changes made in the host directory will be reflected in the container automatically.

`volumes`

`service`

`./validator_1/config:/config/`

`/validator_1/config`

`/config/`

From your terminal, in the location where you created the docker-compose.yml file, run docker-compose up -d. You should see a similar output to the one below:

`docker-compose.yml`

`docker-compose up -d`

```
[+] Running 4/4
 ✔ Network xrpl-private-network_default    Created                             0.0s
 ✔ Container validator_3                   Started                             0.5s
 ✔ Container validator_1                   Started                             0.5s
 ✔ Container validator_2                   Started                             0.5s
```


## Verify the Network

Now that the private ledger network is up, you need to verify that each validator node is running as expected:

1. In your terminal, run docker exec -it <validator_name> bin/bash to execute commands in the validator Docker container. Replace <validator_name> with the name of the container (e.g., validator_1).
1. Run the rippled server_info command to check the state of the validator:rippled server_info | grep server_stateSample Output:"server_state" : "proposing"NoteIf the state is not updated to proposing, repeat step 2 after a few minutes as the ledger can take some time to update.
1. Verify the number of peers connected to the validator.rippled server_info | grep peersSample Output:"peers" : 2
1. Run the following command to check the genesis account information:rippled account_info rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh validated strictSample Output: {
   "result" : {
       "account_data" : {
         "Account" : "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
         "Balance" : "100000000000000000",
         "Flags" : 0,
         "LedgerEntryType" : "AccountRoot",
         "OwnerCount" : 0,
         "PreviousTxnID" : "0000000000000000000000000000000000000000000000000000000000000000",
         "PreviousTxnLgrSeq" : 0,
         "Sequence" : 1,
         "index" : "2B6AC232AA4C4BE41BF49D2459FA4A0347E1B543A4C92FCEE0821C0201E2E9A8"
       },
       "ledger_hash" : "CFCEFB049A71E26DE812529ABB212F330FAF583A98FE073F14713B0644D7CEE9",
       "ledger_index" : 10181,
       "status" : "success",
       "validated" : true
   }
}
1. To leave the Docker container shell, enter exit in the terminal.

In your terminal, run docker exec -it <validator_name> bin/bash to execute commands in the validator Docker container. Replace <validator_name> with the name of the container (e.g., validator_1).

`docker exec -it <validator_name> bin/bash`

`<validator_name>`

`validator_1`

Run the rippled server_info command to check the state of the validator:

`rippled server_info`

```
rippled server_info | grep server_state
```

Sample Output:

```
"server_state" : "proposing"
```

NoteIf the state is not updated to proposing, repeat step 2 after a few minutes as the ledger can take some time to update.

Verify the number of peers connected to the validator.

```
rippled server_info | grep peers
```

Sample Output:

```
"peers" : 2
```

Run the following command to check the genesis account information:

```
rippled account_info rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh validated strict
```

Sample Output:

```
{
   "result" : {
       "account_data" : {
         "Account" : "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
         "Balance" : "100000000000000000",
         "Flags" : 0,
         "LedgerEntryType" : "AccountRoot",
         "OwnerCount" : 0,
         "PreviousTxnID" : "0000000000000000000000000000000000000000000000000000000000000000",
         "PreviousTxnLgrSeq" : 0,
         "Sequence" : 1,
         "index" : "2B6AC232AA4C4BE41BF49D2459FA4A0347E1B543A4C92FCEE0821C0201E2E9A8"
       },
       "ledger_hash" : "CFCEFB049A71E26DE812529ABB212F330FAF583A98FE073F14713B0644D7CEE9",
       "ledger_index" : 10181,
       "status" : "success",
       "validated" : true
   }
}
```

To leave the Docker container shell, enter exit in the terminal.

`exit`


### Perform a test transaction

Perform a test transaction to ensure you can send money to an account.

1. In your terminal, run the the following command to submit a transaction:docker exec -it validator_1 \
    rippled submit 'snoPBrXtMeMyMHUVTgbuqAfg1SUTb' '{ "Account": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", "Amount": "1000000000", "Destination": "r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs", "TransactionType": "Payment", "Fee": "10" }'Sample Output:{
  "result" : {
      "engine_result" : "tesSUCCESS",
      "engine_result_code" : 0,
      "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
      "status" : "success",
      "tx_blob" :   "1200002280000000240000000161400000003B9ACA0068400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074463044022057CCEED351A4278F35C13FD104A55338DC8F48C1F9902D58045A4CD0CE89C92A0220184026BD3B1E2C21239017CAF1BBF683 35EDC57F6F98D952E263763DE449561B8114B5F762798A53D543A014CAF8B297CFF8F2F937E883145988EBB744055F4E8BDC7F67FD53EB9FCF961DC0",
      "tx_json" : {
        "Account" : "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
        "Amount" : "1000000000",
        "Destination" : "r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs",
        "Fee" : "10",
        "Flags" : 2147483648,
        "Sequence" : 1,
        "SigningPubKey" : "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
        "TransactionType" : "Payment",
        "TxnSignature" : "3044022057CCEED351A4278F35C13FD104A55338DC8F48C1F9902D58045A4CD0CE89C92A0220184026BD3B1E2C21239017CAF1BBF68335EDC57F6F98D952E263763DE449561B",
        "hash" : "EB516738841794B24819C68273E0F853A3D234350E6534F7F2841F620CE99437"
      }
  }
}
1. For each validator, verify that the destination account r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs has 1000000000 XRP. For example:docker exec -it validator_1 \
    rippled account_info r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs validated strictSample Output:{
   "result" : {
       "account_data" : {
         "Account" : "r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs",
         "Balance" : "1000000000",
         "Flags" : 0,
         "LedgerEntryType" : "AccountRoot",
         "OwnerCount" : 0,
         "PreviousTxnID" : "EB516738841794B24819C68273E0F853A3D234350E6534F7F2841F620CE99437",
         "PreviousTxnLgrSeq" : 36,
         "Sequence" : 1,
         "index" : "0F2E4615AE24EEF58EE82BD1E67D237234ED41BFC8B7885630B7AC05082E97AA"
       },
       "ledger_hash" : "6F9F54903CC4546F7A426CD78AFD68D907F5DC40B1780DF31A662CF65920E49C",
       "ledger_index" : 51,
       "status" : "success",
       "validated" : true
   }
}
All validator nodes should respond with the same balance of 1000000000 XRP for the r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs account.

In your terminal, run the the following command to submit a transaction:

```
docker exec -it validator_1 \
    rippled submit 'snoPBrXtMeMyMHUVTgbuqAfg1SUTb' '{ "Account": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", "Amount": "1000000000", "Destination": "r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs", "TransactionType": "Payment", "Fee": "10" }'
```

Sample Output:

```
{
  "result" : {
      "engine_result" : "tesSUCCESS",
      "engine_result_code" : 0,
      "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
      "status" : "success",
      "tx_blob" :   "1200002280000000240000000161400000003B9ACA0068400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074463044022057CCEED351A4278F35C13FD104A55338DC8F48C1F9902D58045A4CD0CE89C92A0220184026BD3B1E2C21239017CAF1BBF683 35EDC57F6F98D952E263763DE449561B8114B5F762798A53D543A014CAF8B297CFF8F2F937E883145988EBB744055F4E8BDC7F67FD53EB9FCF961DC0",
      "tx_json" : {
        "Account" : "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
        "Amount" : "1000000000",
        "Destination" : "r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs",
        "Fee" : "10",
        "Flags" : 2147483648,
        "Sequence" : 1,
        "SigningPubKey" : "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
        "TransactionType" : "Payment",
        "TxnSignature" : "3044022057CCEED351A4278F35C13FD104A55338DC8F48C1F9902D58045A4CD0CE89C92A0220184026BD3B1E2C21239017CAF1BBF68335EDC57F6F98D952E263763DE449561B",
        "hash" : "EB516738841794B24819C68273E0F853A3D234350E6534F7F2841F620CE99437"
      }
  }
}
```

For each validator, verify that the destination account r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs has 1000000000 XRP. For example:

`r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs`

```
docker exec -it validator_1 \
    rippled account_info r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs validated strict
```

Sample Output:

```
{
   "result" : {
       "account_data" : {
         "Account" : "r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs",
         "Balance" : "1000000000",
         "Flags" : 0,
         "LedgerEntryType" : "AccountRoot",
         "OwnerCount" : 0,
         "PreviousTxnID" : "EB516738841794B24819C68273E0F853A3D234350E6534F7F2841F620CE99437",
         "PreviousTxnLgrSeq" : 36,
         "Sequence" : 1,
         "index" : "0F2E4615AE24EEF58EE82BD1E67D237234ED41BFC8B7885630B7AC05082E97AA"
       },
       "ledger_hash" : "6F9F54903CC4546F7A426CD78AFD68D907F5DC40B1780DF31A662CF65920E49C",
       "ledger_index" : 51,
       "status" : "success",
       "validated" : true
   }
}
```

All validator nodes should respond with the same balance of 1000000000 XRP for the r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs account.

`r9wRwVgL2vWVnKhTPdtxva5vdH7FNw1zPs`


## Stop the Network

If you wish to stop running the private network:

1. In your terminal, go to the xrpl-private-network directory.
1. Run the following command to shut down the network:docker-compose downSample Output:[+] Running 4/4
 ✔ Container validator_3                 Removed                                                       1.7s
 ✔ Container validator_1                 Removed                                                       1.6s
 ✔ Container validator_2                 Removed                                                       1.6s
 ✔ Network xrpl-private-network_default  Removed                                                       0.0s

In your terminal, go to the xrpl-private-network directory.

`xrpl-private-network`

Run the following command to shut down the network:

```
docker-compose down
```

Sample Output:

```
[+] Running 4/4
 ✔ Container validator_3                 Removed                                                       1.7s
 ✔ Container validator_1                 Removed                                                       1.6s
 ✔ Container validator_2                 Removed                                                       1.6s
 ✔ Network xrpl-private-network_default  Removed                                                       0.0s
```


## See Also

- Networks and Servers:Peer Protocol
- Peer Protocol
- References:XRPL Testnet Setup Scripts for Docker
- XRPL Testnet Setup Scripts for Docker

Networks and Servers:

- Peer Protocol

References:

- XRPL Testnet Setup Scripts for Docker

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bf7d0cb1-f226-4d6b-9364-2d5a7967b186&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=bf7d0cb1-f226-4d6b-9364-2d5a7967b186&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6c18159-8013-4313-a5f5-467c20697fbf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f6c18159-8013-4313-a5f5-467c20697fbf&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=6c93997a-040f-41ff-87aa-f6f2e838683e&bo=1&sid=5264c2309dab11f0a167cd0420bed0cb&vid=52655e709dab11f0b0f78968a4482af5&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Run%20a%20Private%20Network%20with%20Docker&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&r=&lt=3012&evt=pageLoad&sv=2&cdb=AQAS&rn=706398)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1deee3b5-1bff-48d3-b86a-205d5941fb69&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=1deee3b5-1bff-48d3-b86a-205d5941fb69&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f08b718f-cded-4ab5-974b-797d9d55fc14&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=f08b718f-cded-4ab5-974b-797d9d55fc14&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=af8eed82-476b-4d8c-85d6-89c742a038d9&pt=Run%20a%20Private%20Network%20with%20Docker&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftesting-and-auditing%2Frun-private-network-with-docker&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/testing-and-auditing/run-private-network-with-docker#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/testing-and-auditing/run-private-network-with-docker#)
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
- [Resources](https://xrpl.org/docs/infrastructure/testing-and-auditing/run-private-network-with-docker#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/testing-and-auditing/run-private-network-with-docker#)
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
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/testing-and-auditing/run-private-network-with-docker.md)
- [Docker](https://docs.docker.com/get-docker/)
- [rippled](https://hub.docker.com/r/xrpllabsofficial/xrpld)
- [Docker Compose](https://docs.docker.com/compose/)
- [XRPL Testnet Setup Scripts for Docker](https://github.com/UNIC-IFF/xrpl-docker-testnet)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:13:01.539Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
