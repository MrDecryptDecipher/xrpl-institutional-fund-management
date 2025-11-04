# xrp-ledger.toml File
URL: https://xrpl.org/docs/references/xrp-ledger-toml
Section: AC

## Overview


## Extracted Content
# xrp-ledger.toml File

If you run an XRP Ledger validator or use the XRP Ledger for your business, you can provide information about your usage of the XRP Ledger to the world in a machine-readable xrp-ledger.toml file. Scripts and applications can use the information contained in your xrp-ledger.toml file to better understand and represent you in the XRP Ledger. In some cases, humans may also find it useful to read the same file.

`xrp-ledger.toml`

`xrp-ledger.toml`

One of the primary use cases for the xrp-ledger.toml file is domain verification.

`xrp-ledger.toml`


#### Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.


## Serving the File

The xrp-ledger.toml file is meant to be served by a web server. The file should be available at the following URL:

`xrp-ledger.toml`

```
https://{DOMAIN}/.well-known/xrp-ledger.toml
```

The {DOMAIN} is your domain name, including any subdomains. For example, you could serve the file from either of the following URLs:

`{DOMAIN}`

```
https://example.com/.well-known/xrp-ledger.toml
https://xrp.services.example.com/.well-known/xrp-ledger.toml
```


### Protocol

The contents MUST be served through the HTTPS protocol for security, using a current and secure version of TLS, using a valid certificate signed by a well-known certificate authority. (Note: TLS was formerly called SSL, but those versions are no longer secure.) In other words, a prerequisite for hosting an xrp-ledger.toml file is to have a properly-configured HTTPS web server.

`xrp-ledger.toml`

The plain HTTP protocol is vulnerable to man-in-the-middle attacks; for example, some internet services have been known to modify contents retrieved over plain HTTP to inject their own advertisements. To prevent similar techniques from misrepresenting the contents of the xrp-ledger.toml file and potentially causing scripts to behave incorrectly or deceptively, one SHOULD NOT trust the contents of an xrp-ledger.toml file that is served over plain HTTP.

`xrp-ledger.toml`

`xrp-ledger.toml`


### Domain

The domain where you serve the xrp-ledger.toml file is a statement of ownership. The file's contents are not as useful or trustworthy when they stand on their own. For practical reasons, it may be undesirable to serve the file from your main domain, so you MAY use any number of subdomains. When setting the Domain field of XRP Ledger accounts, you MUST provide the full domain, including all subdomains you used. See Account Verification for details.

`xrp-ledger.toml`

`Domain`

You MAY serve the same file from multiple subdomains, if desired. For example, if the subdomain www.example.com goes to the same website as example.com, you can serve the file from both locations. If your website requires the www prefix, be sure to include it when you specify the domain (for example, when setting the Domain field of an XRP Ledger account).

`www.example.com`

`example.com`

`www`

`Domain`

It is RECOMMENDED that you serve a human-readable website from the same domain as the xrp-ledger.toml file. The website can provide further information about your identity and how you use the XRP Ledger, which helps to build trust toward you and your services.

`xrp-ledger.toml`


### Path

In compliance with RFC5785, the path MUST start with /.well-known/. The file MUST be available at the path /.well-known/xrp-ledger.toml exactly (case-sensitive, all lower case).

`/.well-known/`

`/.well-known/xrp-ledger.toml`

You MAY, if desired, serve the same file from paths with different capitalization, such as /.well-known/XRP-Ledger.TOML. You MUST NOT serve different contents depending on how the path is capitalized.

`/.well-known/XRP-Ledger.TOML`


### Headers


#### Content-Type

The recommended Content-Type for the xrp-ledger.toml file is application/toml. However, applications consuming the file SHOULD also accept a Content-Type value of text/plain.

`xrp-ledger.toml`

`application/toml`

`text/plain`


#### CORS

To allow scripts on other websites to query the file, CORS should be enabled for the file. Specifically, the server should provide the following header when serving xrp-ledger.toml:

`xrp-ledger.toml`

```
Access-Control-Allow-Origin: *
```

For information on how to configure your server to provide this header, see CORS setup.


#### Other Headers

The server MAY use other standard HTTP headers as desired, including ones for compression, cache control, redirection, and linking related resources.


### Generation

The xrp-ledger.toml file MAY be an actual file stored on the web server, or it MAY be generated on-demand by the web server. The latter case may be preferable depending on the contents provided in the file or the configuration of your website.

`xrp-ledger.toml`


## Contents

The contents of the xrp-ledger.toml file MUST be formatted in TOML. All contents are optional. Comments are optional, but encouraged for readability.

`xrp-ledger.toml`

Example contents:

```
# Example xrp-ledger.toml file. These contents should not be considered
# authoritative for any real entity or business.
# Note: all fields and all sections are optional.

[METADATA]
modified = 2019-01-22T00:00:00.000Z
expires = 2019-03-01T00:00:00.000Z

[[VALIDATORS]]
public_key = "nHBtDzdRDykxiuv7uSMPTcGexNm879RUUz5GW4h1qgjbtyvWZ1LE"
attestation = "A59AB577E14A7BEC053752ABFE78C3DED6DCEC81A7C41DF1931BC61742BB4FAEAA0D4F1C1EAE5BC74F6D68A3B26C8A223EA2492A5BD18D51F8AC7F4A97DFBE0C"
network = "main"
owner_country = "us"
server_country = "us"
unl = "https://vl.ripple.com"

[[VALIDATORS]]
public_key = "nHB57Sey9QgaB8CubTPvMZLkLAzfJzNMWBCCiDRgazWJujRdnz13"
attestation = "A59AB577E14A7BEC053752FBFE78C3DED6DCEC81A7C41DF1931BC61742BB4FAEAA0D4F1C1EAE5BC74F6D68A3B26C8A223EA249BA5BD18D51F8AC7F4A97DFBE0C"
network = "testnet"
owner_country = "us"
server_country = "us"
unl = "https://vl.testnet.rippletest.net"

# Note: the attestions above are only examples and are not real.

[[ACCOUNTS]]
address = "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV"
desc = "Ripple-owned address from old ripple.txt file"
# Note: This doesn't prove ownership of an account unless the
#   "Domain" field of the account in the XRP Ledger matches the
#   domain this file was served from.

[[SERVERS]]
json_rpc = "https://s1.ripple.com:51234/"
ws = "wss://s1.ripple.com/"
peer = "https://s1.ripple.com:51235/"
desc = "General purpose server cluster"

[[SERVERS]]
json_rpc = "https://s2.ripple.com:51234/"
ws = "wss://s2.ripple.com/"
peer = "https://s2.ripple.com:51235/"
desc = "Full-history server cluster"

[[SERVERS]]
json_rpc = "https://s.testnet.rippletest.net:51234/"
ws = "wss://s.testnet.rippletest.net:51233/"
peer = "https://s.testnet.rippletest.net:51235/"
network = "testnet"
desc = "Test Net public server cluster"

[[PRINCIPALS]]
name = "Rome Reginelli" # Primary spec author
email = "rome@example.com" # Not my real email address
social_1 = "https://website.tld/username" # Social media username/handle as an alternative way to connect

[[CURRENCIES]]
code = "LOL"
issuer = "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
network = "testnet"
display_decimals = 2
symbol = "😆" # In practical situations, it may be unwise to use emoji

# End of file
```


### Metadata

The metadata section provides information about the xrp-ledger.toml file itself. If present, this section MUST BE presented as a single table, headed by the line  [METADATA], using single square brackets. (Most other sections of the xrp-ledger.toml file use double brackets, for arrays of information, but there is at most one [METADATA] section.) You MAY provide any of the following fields (case-sensitive):

`xrp-ledger.toml`

`[METADATA]`

`xrp-ledger.toml`

`[METADATA]`

| Field | Type | Description |
| --- | --- | --- |
| modified | Offset Date-Time | The time the xrp-leder.toml file was last modified. |
| expires | Offset Date-Time | If the current time is equal or greater than this time, the xrp-ledger.toml file should be considered expired. |


`modified`

`xrp-leder.toml`

`expires`

`xrp-ledger.toml`

The specification does not define a domain field; the field should be determined from the site serving the file.

`domain`

TipFor Offset Date-Time values, Ripple RECOMMENDS that you use the offset Z and provide precision up to milliseconds. (For example, 2019-01-22T22:26:58.027Z) If you edit the file by hand, you MAY approximate the time by providing zeroes for the hours, minutes, seconds, and milliseconds. (For example, 2019-01-22T00:00:00.000Z)

`Z`

`2019-01-22T22:26:58.027Z`

`2019-01-22T00:00:00.000Z`


### Validators

The validators list provides information about validating servers you run. If present, the validators list MUST BE presented as an array of tables, with each entry using the header [[VALIDATORS]], including double square brackets. Each entry describes a separate validating server.

`[[VALIDATORS]]`

The first [[VALIDATORS]] entry in the file is treated as your primary validator. If you run one or more validators for the production XRP Ledger, you should put the one you want others to trust first.

`[[VALIDATORS]]`

For each [[VALIDATORS]] entry, you MAY provide any of the following fields:

`[[VALIDATORS]]`

| Field | Type | Description |
| --- | --- | --- |
| public_key | String | The master public key of your primary validator, encoded in the XRP Ledger's base58 format (typically, this starts with n). |
| attestation | String | A signed message, in hexadecimal, indicating that the same entity runs this validator and the domain serving this TOML file. For more information, see Domain Verification. |
| network | String | Which network chain this validator follows. If omitted, clients SHOULD assume that the validator follows the production XRP Ledger. Use main to explicitly specify the production XRP Ledger. Use testnet for Ripple's XRP Ledger Test Net. You MAY provide other values to describe other test nets or non-standard network chains. |
| owner_country | String | The two-letter ISO-3166-2 country code describing the main legal jurisdiction that you (the validator's owner) are subject to. |
| server_country | String | The two-letter ISO-3166-2 country code describing the physical location where this validating server is. |
| unl | String | An HTTPS URL where one can find the list of other validators this validator trusts. If the validator is configured to use a validator list site for UNL recommendations, this MUST match the server's configuration. For the production XRP Ledger network, use https://vl.ripple.com (trailing slash optional). |


`public_key`

`n`

`attestation`

`network`

`main`

`testnet`

`owner_country`

`server_country`

`unl`

`https://vl.ripple.com`


### Accounts

The accounts list provides information about XRP Ledger accounts you own. If present, the accounts list MUST BE presented as an array of tables, with each entry using the header [[ACCOUNTS]], including double square brackets. Each entry describes a separate account. For each [[ACCOUNTS]] entry, you MAY provide any of the following fields:

`[[ACCOUNTS]]`

`[[ACCOUNTS]]`

| Field | Type | Description |
| --- | --- | --- |
| address | String | The public address of the account, encoded in the XRP Ledger's base58 format (typically, this starts with an r). |
| network | String | The network chain where this account is primarily used. If omitted, clients SHOULD assume that the account is claimed on the production XRP Ledger and possibly other network chains. Use main for the production XRP Ledger. Use testnet for Ripple's XRP Ledger Test Net. You MAY provide other values to describe other test nets or non-standard network chains. |
| desc | String | A human-readable description of this account's purpose or how you use it. |


`address`

`r`

`network`

`main`

`testnet`

`desc`

CautionAnyone could claim ownership of any account by hosting an xrp-ledger.toml file, so the presence of an account here SHOULD NOT be considered authoritative unless the Domain field for these accounts in the XRP Ledger also matches the domain that this xrp-ledger.toml file was served from. See Account Verification for details.

`xrp-ledger.toml`

`Domain`

`xrp-ledger.toml`


### Principals

The principals list provides information about the people (or business entities) involved in your XRP Ledger businesses and services. If present, the principals list MUST BE presented as an array of tables, with each entry using the header [[PRINCIPALS]], including double square brackets. Each entry describes a different point of contact. For each [[PRINCIPALS]] entry, you MAY provide any of the following fields:

`[[PRINCIPALS]]`

`[[PRINCIPALS]]`

| Field | Type | Description |
| --- | --- | --- |
| name | String | The name of this principal. |
| email | String | The email address where this principal can be contacted. |
| social_1 | String | The social media username/handle where this principal can be contacted. For consistency, use site names, not domains, when specifying social media platforms. For example, x = "@username" or linkedin = "username" |


`name`

`email`

`social_1`

`x = "@username"`

`linkedin = "username"`

You may provide other contact information as desired. (See Custom Fields for information about custom fields.)


### Servers

The servers list provides information about XRP Ledger servers (rippled) you run with public access. If present, the servers list MUST BE presented as an array of tables, with each entry using the header [[SERVERS]], including double square brackets. Each entry describes a different server or server cluster. For each [[SERVERS]] entry, you MAY provide any of the following fields:

`rippled`

`[[SERVERS]]`

`[[SERVERS]]`

| Field | Type | Description |
| --- | --- | --- |
| json_rpc | String (URL) | The URL where you serve a public JSON-RPC API. This MUST begin with either http:// or https://. HTTPS is RECOMMENDED for public APIs. |
| ws | String (URL) | The URL where you serve a public WebSocket API. This MUST begin with either ws:// or wss://. WSS is RECOMMENDED for public APIs. |
| peer | String (URL) | The URL where your server is listening for the XRP Ledger Peer Protocol. Other XRP Ledger servers can connect at this URL. If your server provides a Peer Crawler response, it is served from this URL with crawl appended. |
| network | String | Which network chain this server follows. If omitted, clients SHOULD assume that the server follows the production XRP Ledger. Use main to explicitly specify the production XRP Ledger. Use testnet for Ripple's XRP Ledger Test Net. You MAY provide other values to describe other test nets or non-standard network chains. |


`json_rpc`

`http://`

`https://`

`ws`

`ws://`

`wss://`

`peer`

`crawl`

`network`

`main`

`testnet`

For all URLs in this section, the trailing slash is RECOMMENDED. If omitted, client applications SHOULD assume that there is a trailing slash implied.


### Currencies

If you issue any assets, tokens, or currencies in the XRP Ledger, you can provide information about them in the [[CURRENCIES]] list. If present, the currencies list MUST BE presented as an array of tables, with each entry using the header [[CURRENCIES]], including double square brackets. Each entry describes a separate token or asset. For each [[CURRENCIES]] entry, you MAY provide any of the following fields:

`[[CURRENCIES]]`

`[[CURRENCIES]]`

`[[CURRENCIES]]`

| Field | Type | Description |
| --- | --- | --- |
| code | String | The (case-sensitive) ticker symbol of this token in the XRP Ledger. This can be a three-digit code, a 40-character hex code, or a custom format (for clients that know how to represent the non-standard code in the XRP Ledger). See the Currency Code reference for information on the XRP Ledger's currency code formats. |
| display_decimals | Number | The number of decimals that a client application should use to display amounts of this currency. |
| issuer | String | The address of the XRP Ledger account where you issue this currency, encoded in the XRP Ledger's base58 format (typically, this starts with an r). You SHOULD also list this address in the [[ACCOUNTS]] list. (Reminder: the presence of an address here is not authoritative on its own. See Account Verification for details.) |
| network | String | The network chain where you issue this token. Use main to explicitly specify the production XRP Ledger. If omitted, clients SHOULD assume that the currency is issued on the production XRP Ledger. Use testnet for Ripple's XRP Ledger Test Net. You MAY provide other values to describe other test nets or non-standard network chains. |
| symbol | String | The text symbol, such "$" or "€", that should be used with amounts of this asset or currency, if it has a symbol in the Unicode standard. |


`code`

`display_decimals`

`issuer`

`r`

`[[ACCOUNTS]]`

`network`

`main`

`testnet`

`symbol`


### Custom Fields

The xrp-ledger.toml file is intended for users of the XRP Ledger to provide information to other users, scripts, and applications. As such, there may be many kinds of information that are useful to convey but are not described in this specification. Users are encouraged to add other fields at any level of the xrp-ledger.toml file, as desired to convey relevant information.

`xrp-ledger.toml`

`xrp-ledger.toml`

Tools that parse the xrp-ledger.toml file MUST accept documents that contain any other fields that the application is not familiar with. Those tools MAY make those additional fields available to higher-level applications that call them, or MAY discard those fields. To maintain forward-compatibility with future versions of this specification, tools MAY also discard fields specified in this standard. Tools MUST NOT return an error if an xrp-ledger.toml file contains an unrecognized field. To detect typos, tools MAY provide a warning on unrecognized fields, especially if those field names are similar to the names of standard fields.

`xrp-ledger.toml`

`xrp-ledger.toml`

Tools MAY return an error if a field they recognize is not formatted as expected, even if that field is not defined in this specification.

When creating custom fields, be mindful of the field name you choose. If you use a very generic field name, other users may use the same name to mean something different, or formatted in a conflicting way. If you use a custom field that you think others will find useful, please contribute a specification for your field to the maintainers of this document.


## CORS Setup

You MUST configure your web server to allow Cross-Origin Resource Sharing (CORS) for the xrp-ledger.toml file. This configuration depends on your web server.

`xrp-ledger.toml`

If you run an Apache HTTP Server, add the following to your config file:

```
<Location "/.well-known/xrp-ledger.toml">
    Header set Access-Control-Allow-Origin "*"
</Location>
```

Alternatively, you can add the following to a .htaccess file in the /.well-known/ directory of your server:

`.htaccess`

`/.well-known/`

```
<Files "xrp-ledger.toml">
    Header set Access-Control-Allow-Origin "*"
</Files>
```

If you use nginx, add the following to your config file:

```
location /.well-known/xrp-ledger.toml {
    add_header 'Access-Control-Allow-Origin' '*';
}
```

For other web servers, see I want to add CORS support to my server. If you use managed hosting, check your web host's documentation for how to enable CORS on a specific path. (You probably do not want to enable CORS for your entire website.)


## Domain Verification

One use for the xrp-ledger.toml file is verifying that the same entity that runs a particular domain also runs a particular validator, as identified by the validator's public key. Verifying that a domain and a validator are owned by the same entity provides greater assurances of the identity of the validator operator and is a recommended step for becoming a trusted validator. (For other recommendations, see Properties of a Good Validator.)

`xrp-ledger.toml`

Domain verification requires establishing a two-way link between the domain operator and the validator:

1. The domain claims ownership of the validator:Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.In that xrp-ledger.toml file, provide a [[VALIDATORS]] entry with the validator's master public key in the public_key field.
1. Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.
1. In that xrp-ledger.toml file, provide a [[VALIDATORS]] entry with the validator's master public key in the public_key field.
1. The validator claims ownership of the domain:Ensure that you have access to the validator-keys.json file that you created when first setting up your validator. If you have lost your keys or the keys have been compromised, please revoke your keys and generate new keys.Note: Recall that your validator-keys.json file should be stored in a location not on your validator.In a location not on your validator, build the validator-keys-tool.Run the following command to generate a new validator token that incorporates your domain and update your xrp-ledger.toml and rippled.cfg files:$./validator-keys set_domain example.com
1. Ensure that you have access to the validator-keys.json file that you created when first setting up your validator. If you have lost your keys or the keys have been compromised, please revoke your keys and generate new keys.Note: Recall that your validator-keys.json file should be stored in a location not on your validator.
1. In a location not on your validator, build the validator-keys-tool.
1. Run the following command to generate a new validator token that incorporates your domain and update your xrp-ledger.toml and rippled.cfg files:$./validator-keys set_domain example.com

The domain claims ownership of the validator:

- Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.
- In that xrp-ledger.toml file, provide a [[VALIDATORS]] entry with the validator's master public key in the public_key field.

Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.

`xrp-ledger.toml`

In that xrp-ledger.toml file, provide a [[VALIDATORS]] entry with the validator's master public key in the public_key field.

`xrp-ledger.toml`

`[[VALIDATORS]]`

`public_key`

The validator claims ownership of the domain:

- Ensure that you have access to the validator-keys.json file that you created when first setting up your validator. If you have lost your keys or the keys have been compromised, please revoke your keys and generate new keys.Note: Recall that your validator-keys.json file should be stored in a location not on your validator.
- In a location not on your validator, build the validator-keys-tool.
- Run the following command to generate a new validator token that incorporates your domain and update your xrp-ledger.toml and rippled.cfg files:$./validator-keys set_domain example.com

Ensure that you have access to the validator-keys.json file that you created when first setting up your validator. If you have lost your keys or the keys have been compromised, please revoke your keys and generate new keys.

Note: Recall that your validator-keys.json file should be stored in a location not on your validator.

In a location not on your validator, build the validator-keys-tool.

Run the following command to generate a new validator token that incorporates your domain and update your xrp-ledger.toml and rippled.cfg files:

`xrp-ledger.toml`

`rippled.cfg`

```
$./validator-keys set_domain example.com
```

WarningThis command updates your validator-keys.json file. Please be sure to store the validator-keys.json file in a secure location.

`validator-keys.json`

Sample Output:

```
The domain name has been set to: example.com

The domain attestation for validator nHDG5CRUHp17ShsEdRweMc7WsA4csiL7qEjdZbRVTr74wa5QyqoF is:

attestation="A59AB577E14A7BEC053752FBFE78C3DE
             D6DCEC81A7C41DF1931BC61742BB4FAE
             AA0D4F1C1EAE5BC74F6D68A3B26C8A22
             3EA2492A5BD18D51F8AC7F4A97DFBE0C"

You should include it in your xrp-ledger.toml file in the
section for this validator.

You also need to update the rippled.cfg file to add a new
validator token and restart rippled:

# validator public key: nHDG5CRUHp17ShsEdRweMc7WsA4csiL7qEjdZbRVTr74wa5QyqoF

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

Update the contents of your xrp-ledger.toml file with the attestation block, and update the rippled.cfg file with the [validator_token] block from the sample output.

`xrp-ledger.toml`

`attestation`

`rippled.cfg`

`[validator_token]`

WarningYour validator token is meant to be kept secret. Do not share it on your xrp-ledger.toml file or anywhere else.

`xrp-ledger.toml`


## Account Verification

Similar to Domain Verification, account verification is the idea of proving that the same entity controls a particular domain and a particular XRP Ledger address. Account verification is not necessary for using the XRP Ledger or providing an xrp-ledger.toml file, but you may want to verify your accounts in the name of transparency.

`xrp-ledger.toml`

Account verification requires establishing a two-way link between the domain operator and the address:

1. The domain claims ownership of the address.Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.In that xrp-ledger.toml file, provide an [[ACCOUNTS]] entry with the address of the account you want to verify. If you issue currency from this address, you may also provide this account in the issuer field of a [[CURRENCIES]] entry.
1. Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.
1. In that xrp-ledger.toml file, provide an [[ACCOUNTS]] entry with the address of the account you want to verify. If you issue currency from this address, you may also provide this account in the issuer field of a [[CURRENCIES]] entry.
1. The address claims ownership by a domain.Set the account's Domain field to match the domain that this xrp-ledger.toml file was served from. The domain value (when decoded from ASCII) MUST match exactly, including all subdomains such as www.. For internationalized domain names, set the Domain value to the Punycode of the domain, as described in RFC3492. Since setting the Domain requires sending a transaction, whoever set the Domain value must have possessed the account's secret key when the transaction was sent.

The domain claims ownership of the address.

- Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.
- In that xrp-ledger.toml file, provide an [[ACCOUNTS]] entry with the address of the account you want to verify. If you issue currency from this address, you may also provide this account in the issuer field of a [[CURRENCIES]] entry.

Serve an xrp-ledger.toml file, following all the requirements described in this document, from the domain in question.

`xrp-ledger.toml`

In that xrp-ledger.toml file, provide an [[ACCOUNTS]] entry with the address of the account you want to verify. If you issue currency from this address, you may also provide this account in the issuer field of a [[CURRENCIES]] entry.

`xrp-ledger.toml`

`[[ACCOUNTS]]`

`issuer`

`[[CURRENCIES]]`

The address claims ownership by a domain.

Set the account's Domain field to match the domain that this xrp-ledger.toml file was served from. The domain value (when decoded from ASCII) MUST match exactly, including all subdomains such as www.. For internationalized domain names, set the Domain value to the Punycode of the domain, as described in RFC3492.

`Domain`

`xrp-ledger.toml`

`www.`

`Domain`

Since setting the Domain requires sending a transaction, whoever set the Domain value must have possessed the account's secret key when the transaction was sent.

`Domain`

`Domain`

Either of these two links, on their own, SHOULD NOT be considered authoritative. Anyone could host an xrp-ledger.toml file claiming ownership of any account, and any account operator could set its Domain field to any string it wants. If the two match, it provides strong evidence that the same entity controls both.

`xrp-ledger.toml`

`Domain`


## Acknowledgements

This specification is derived from the original ripple.txt spec and draws inspiration from the stellar.toml file. This specification also incorporates feedback from XRP community members and many past and current Ripple employees.

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5f7b4148-f7cd-4aa5-8087-57c919c23921&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=5f7b4148-f7cd-4aa5-8087-57c919c23921&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a3622419-e317-4384-b2d1-4dcb75ab01e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a3622419-e317-4384-b2d1-4dcb75ab01e2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=22a10153-2844-4856-9046-690631c99132&bo=1&sid=89a644e09da911f0a887b9eb6e5c4126&vid=89a71aa09da911f0b88dcdabc79c08f9&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=xrp-ledger.toml%20File&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&r=&lt=3790&evt=pageLoad&sv=2&cdb=AQAS&rn=748776)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b1db6a48-1c1b-4357-90a9-0dc35d96db40&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b1db6a48-1c1b-4357-90a9-0dc35d96db40&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9ca1984c-e41b-4eb0-9c84-f1ac4d95acb2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=9ca1984c-e41b-4eb0-9c84-f1ac4d95acb2&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=a2e867da-01a4-498b-97fb-5a2a9f395de5&pt=xrp-ledger.toml%20File&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Freferences%2Fxrp-ledger-toml&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/references/xrp-ledger-toml#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/references/xrp-ledger-toml#)
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
- [Resources](https://xrpl.org/docs/references/xrp-ledger-toml#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/references/xrp-ledger-toml#)
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
- [XRP Ledger Protocol Reference](https://xrpl.org/docs/references/protocol)

## External References

- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/references/xrp-ledger-toml.md)
- [RFC 2119](https://tools.ietf.org/html/rfc2119)
- [TLS](https://tools.ietf.org/html/rfc8446)
- [RFC5785](https://tools.ietf.org/html/rfc5785)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [TOML](https://github.com/toml-lang/toml)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [I want to add CORS support to my server](https://enable-cors.org/server.html)
- [validator-keys-tool](https://github.com/ripple/validator-keys-tool)
- [RFC3492](https://tools.ietf.org/html/rfc3492)
- [original ripple.txt spec](https://web.archive.org/web/20161007113240/https://wiki.ripple.com/Ripple.txt)
- [stellar.toml file](https://www.stellar.org/developers/guides/walkthroughs/how-to-complete-stellar-toml.html)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:00:17.181Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
