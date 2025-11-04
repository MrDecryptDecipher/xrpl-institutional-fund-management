# Diagnosing Problems with rippled
URL: https://xrpl.org/docs/infrastructure/troubleshooting/diagnosing-problems
Section: AF1

## Overview


## Extracted Content
# Diagnosing Problems with rippled

If you are having problems with rippled, the first step is to collect more information to accurately characterize the problem. From there, it can be easier to figure out a root cause and a fix.

`rippled`

See the following pages for some common categories of problems, their causes, and fixes:

- If your server does not start (such as crashing or otherwise shutting down automatically), see rippled Server Won't Start.
- If your server starts, but does not reliably sync or remain synced to the XRP Ledger network, see rippled Server Doesn't Sync.

The rest of this document suggests steps for diagnosing problems that happen while your server is up and running (including if the process is active but unable to sync with the network).


## Get the server_info

You can use the commandline to get server status information from the local rippled instance. For example:

`rippled`

```
rippled server_info
```

The response to this command has a lot of information, which is documented along with the server_info method. For troubleshooting purposes, the most important fields are (from most commonly used to least):

- server_state - Most of the time, this field should show proposing for a server that is configured as a validator, or full for a non-validating server. The value connected means that the server can communicate with the rest of the peer-to-peer network, but it does not yet have enough data to track progress of the shared ledger state. Normally, syncing to the state of the rest of the ledger takes about 5-15 minutes after starting.If your server remains in the connected state for hours, or returns to the connected state after being in the full or proposing states, that usually indicates that your server cannot keep up with the rest of the network. The most common bottlenecks are disk I/O, network bandwidth, and RAM.For example, the following server state information shows a healthy server that took less than 3 minutes to sync (split between the disconnected, connected, and syncing states), and is currently in the fully-synced proposing state, where it has remained for approximately 90 minutes:$ ./rippled server_info
Loading: "/etc/opt/ripple/rippled.cfg"
2020-Jan-03 22:49:32.834134358 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
  "result" : {
    "info" : {
      ... (trimmed) ...
      "server_state" : "proposing",
      "server_state_duration_us" : "5183282365",
      "state_accounting" : {
        "connected" : {
          "duration_us" : "126164786",
          "transitions" : 1
        },
        "disconnected" : {
          "duration_us" : "2111321",
          "transitions" : 1
        },
        "full" : {
          "duration_us" : "5183282365",
          "transitions" : 1
        },
        "syncing" : {
          "duration_us" : "5545604",
          "transitions" : 1
        },
        "tracking" : {
          "duration_us" : "0",
          "transitions" : 1
        }
      },
      ... (trimmed) ...
    }
  }
}If you do not have a full or proposing state, then your server has not yet synced to the network. If your server shows multiple transitions between the same states (transitions is 2 or more), that indicates that your server lost sync with the network. It's a problem if you have many transitions in a short period of time; it's OK if you have a few transitions over a long period of time, because some fluctuations in internet connectivity are unavoidable. The amount of time in individual states (duration_us) compared with total uptime (server_state_duration_us) can also tell you how well your server is staying synced. After about 24 hours of uptime, if less than 99% of your server's total runtime is spent in the full or proposing states, you may want to investigate possible sources of instability.For help debugging syncing issues, see Server Doesn't Sync.
- If your server remains in the connected state for hours, or returns to the connected state after being in the full or proposing states, that usually indicates that your server cannot keep up with the rest of the network. The most common bottlenecks are disk I/O, network bandwidth, and RAM.
- For example, the following server state information shows a healthy server that took less than 3 minutes to sync (split between the disconnected, connected, and syncing states), and is currently in the fully-synced proposing state, where it has remained for approximately 90 minutes:$ ./rippled server_info
Loading: "/etc/opt/ripple/rippled.cfg"
2020-Jan-03 22:49:32.834134358 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
  "result" : {
    "info" : {
      ... (trimmed) ...
      "server_state" : "proposing",
      "server_state_duration_us" : "5183282365",
      "state_accounting" : {
        "connected" : {
          "duration_us" : "126164786",
          "transitions" : 1
        },
        "disconnected" : {
          "duration_us" : "2111321",
          "transitions" : 1
        },
        "full" : {
          "duration_us" : "5183282365",
          "transitions" : 1
        },
        "syncing" : {
          "duration_us" : "5545604",
          "transitions" : 1
        },
        "tracking" : {
          "duration_us" : "0",
          "transitions" : 1
        }
      },
      ... (trimmed) ...
    }
  }
}If you do not have a full or proposing state, then your server has not yet synced to the network. If your server shows multiple transitions between the same states (transitions is 2 or more), that indicates that your server lost sync with the network. It's a problem if you have many transitions in a short period of time; it's OK if you have a few transitions over a long period of time, because some fluctuations in internet connectivity are unavoidable. The amount of time in individual states (duration_us) compared with total uptime (server_state_duration_us) can also tell you how well your server is staying synced. After about 24 hours of uptime, if less than 99% of your server's total runtime is spent in the full or proposing states, you may want to investigate possible sources of instability.
- For help debugging syncing issues, see Server Doesn't Sync.
- complete_ledgers - This field shows which ledger indexes your server has complete ledger data for. Healthy servers usually have a single range of recent ledgers, such as "12133424-12133858".If you have a disjoint set of complete ledgers such as "11845721-12133420,12133424-12133858", that could indicate that your server has had intermittent outages or has temporarily fallen out of sync with the rest of the network. The most common causes for this are insufficient disk I/O or network bandwidth.Normally, a rippled server downloads recent ledger history from its peers. If gaps in your ledger history persist for more than a few hours, you may not be connected to any peers who have the missing data. If this occurs, you can force your server to try and peer with one of Ripple's full-history public servers by adding the following stanza to your config file and restarting:[ips_fixed]
s2.ripple.com 51235
- If you have a disjoint set of complete ledgers such as "11845721-12133420,12133424-12133858", that could indicate that your server has had intermittent outages or has temporarily fallen out of sync with the rest of the network. The most common causes for this are insufficient disk I/O or network bandwidth.
- Normally, a rippled server downloads recent ledger history from its peers. If gaps in your ledger history persist for more than a few hours, you may not be connected to any peers who have the missing data. If this occurs, you can force your server to try and peer with one of Ripple's full-history public servers by adding the following stanza to your config file and restarting:[ips_fixed]
s2.ripple.com 51235
- amendment_blocked - This field is normally omitted from the server_info response. If this field appears with the value true, then the network has approved an amendment for which your server doesn't have an implementation. Most likely, you can fix this by updating rippled to the latest version. You can also use the feature method to see what amendment IDs are currently enabled and which one(s) your server does and does not support.
- peers - This field indicates how many other servers in the XRP Ledger peer-to-peer network your server is connected to. Healthy servers typically show between 5 and 50 peers, unless explicitly configured to connect only to certain peers.If you have 0 peers, your server may be unable to contact the network, or your system clock may be wrong. (Ripple recommends running an NTP daemon on all servers to keep their clocks synced.)If you have exactly 10 peers, that may indicate that your rippled is unable to receive incoming connections through a router using NAT. You can improve connectivity by configuring your router's firewall to forward the port used for peer-to-peer connections (port 51235 by default).
- If you have 0 peers, your server may be unable to contact the network, or your system clock may be wrong. (Ripple recommends running an NTP daemon on all servers to keep their clocks synced.)
- If you have exactly 10 peers, that may indicate that your rippled is unable to receive incoming connections through a router using NAT. You can improve connectivity by configuring your router's firewall to forward the port used for peer-to-peer connections (port 51235 by default).

server_state - Most of the time, this field should show proposing for a server that is configured as a validator, or full for a non-validating server. The value connected means that the server can communicate with the rest of the peer-to-peer network, but it does not yet have enough data to track progress of the shared ledger state. Normally, syncing to the state of the rest of the ledger takes about 5-15 minutes after starting.

`server_state`

`proposing`

`full`

`connected`

- If your server remains in the connected state for hours, or returns to the connected state after being in the full or proposing states, that usually indicates that your server cannot keep up with the rest of the network. The most common bottlenecks are disk I/O, network bandwidth, and RAM.
- For example, the following server state information shows a healthy server that took less than 3 minutes to sync (split between the disconnected, connected, and syncing states), and is currently in the fully-synced proposing state, where it has remained for approximately 90 minutes:$ ./rippled server_info
Loading: "/etc/opt/ripple/rippled.cfg"
2020-Jan-03 22:49:32.834134358 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
  "result" : {
    "info" : {
      ... (trimmed) ...
      "server_state" : "proposing",
      "server_state_duration_us" : "5183282365",
      "state_accounting" : {
        "connected" : {
          "duration_us" : "126164786",
          "transitions" : 1
        },
        "disconnected" : {
          "duration_us" : "2111321",
          "transitions" : 1
        },
        "full" : {
          "duration_us" : "5183282365",
          "transitions" : 1
        },
        "syncing" : {
          "duration_us" : "5545604",
          "transitions" : 1
        },
        "tracking" : {
          "duration_us" : "0",
          "transitions" : 1
        }
      },
      ... (trimmed) ...
    }
  }
}If you do not have a full or proposing state, then your server has not yet synced to the network. If your server shows multiple transitions between the same states (transitions is 2 or more), that indicates that your server lost sync with the network. It's a problem if you have many transitions in a short period of time; it's OK if you have a few transitions over a long period of time, because some fluctuations in internet connectivity are unavoidable. The amount of time in individual states (duration_us) compared with total uptime (server_state_duration_us) can also tell you how well your server is staying synced. After about 24 hours of uptime, if less than 99% of your server's total runtime is spent in the full or proposing states, you may want to investigate possible sources of instability.
- For help debugging syncing issues, see Server Doesn't Sync.

If your server remains in the connected state for hours, or returns to the connected state after being in the full or proposing states, that usually indicates that your server cannot keep up with the rest of the network. The most common bottlenecks are disk I/O, network bandwidth, and RAM.

`connected`

`connected`

`full`

`proposing`

For example, the following server state information shows a healthy server that took less than 3 minutes to sync (split between the disconnected, connected, and syncing states), and is currently in the fully-synced proposing state, where it has remained for approximately 90 minutes:

`disconnected`

`connected`

`syncing`

`proposing`

```
$ ./rippled server_info
Loading: "/etc/opt/ripple/rippled.cfg"
2020-Jan-03 22:49:32.834134358 HTTPClient:NFO Connecting to 127.0.0.1:5005

{
  "result" : {
    "info" : {
      ... (trimmed) ...
      "server_state" : "proposing",
      "server_state_duration_us" : "5183282365",
      "state_accounting" : {
        "connected" : {
          "duration_us" : "126164786",
          "transitions" : 1
        },
        "disconnected" : {
          "duration_us" : "2111321",
          "transitions" : 1
        },
        "full" : {
          "duration_us" : "5183282365",
          "transitions" : 1
        },
        "syncing" : {
          "duration_us" : "5545604",
          "transitions" : 1
        },
        "tracking" : {
          "duration_us" : "0",
          "transitions" : 1
        }
      },
      ... (trimmed) ...
    }
  }
}
```

If you do not have a full or proposing state, then your server has not yet synced to the network. If your server shows multiple transitions between the same states (transitions is 2 or more), that indicates that your server lost sync with the network. It's a problem if you have many transitions in a short period of time; it's OK if you have a few transitions over a long period of time, because some fluctuations in internet connectivity are unavoidable. The amount of time in individual states (duration_us) compared with total uptime (server_state_duration_us) can also tell you how well your server is staying synced. After about 24 hours of uptime, if less than 99% of your server's total runtime is spent in the full or proposing states, you may want to investigate possible sources of instability.

`full`

`proposing`

`transitions`

`duration_us`

`server_state_duration_us`

`full`

`proposing`

For help debugging syncing issues, see Server Doesn't Sync.

complete_ledgers - This field shows which ledger indexes your server has complete ledger data for. Healthy servers usually have a single range of recent ledgers, such as "12133424-12133858".

`complete_ledgers`

`"12133424-12133858"`

- If you have a disjoint set of complete ledgers such as "11845721-12133420,12133424-12133858", that could indicate that your server has had intermittent outages or has temporarily fallen out of sync with the rest of the network. The most common causes for this are insufficient disk I/O or network bandwidth.
- Normally, a rippled server downloads recent ledger history from its peers. If gaps in your ledger history persist for more than a few hours, you may not be connected to any peers who have the missing data. If this occurs, you can force your server to try and peer with one of Ripple's full-history public servers by adding the following stanza to your config file and restarting:[ips_fixed]
s2.ripple.com 51235

If you have a disjoint set of complete ledgers such as "11845721-12133420,12133424-12133858", that could indicate that your server has had intermittent outages or has temporarily fallen out of sync with the rest of the network. The most common causes for this are insufficient disk I/O or network bandwidth.

`"11845721-12133420,12133424-12133858"`

Normally, a rippled server downloads recent ledger history from its peers. If gaps in your ledger history persist for more than a few hours, you may not be connected to any peers who have the missing data. If this occurs, you can force your server to try and peer with one of Ripple's full-history public servers by adding the following stanza to your config file and restarting:

`rippled`

```
[ips_fixed]
s2.ripple.com 51235
```

amendment_blocked - This field is normally omitted from the server_info response. If this field appears with the value true, then the network has approved an amendment for which your server doesn't have an implementation. Most likely, you can fix this by updating rippled to the latest version. You can also use the feature method to see what amendment IDs are currently enabled and which one(s) your server does and does not support.

`amendment_blocked`

`server_info`

`true`

peers - This field indicates how many other servers in the XRP Ledger peer-to-peer network your server is connected to. Healthy servers typically show between 5 and 50 peers, unless explicitly configured to connect only to certain peers.

`peers`

- If you have 0 peers, your server may be unable to contact the network, or your system clock may be wrong. (Ripple recommends running an NTP daemon on all servers to keep their clocks synced.)
- If you have exactly 10 peers, that may indicate that your rippled is unable to receive incoming connections through a router using NAT. You can improve connectivity by configuring your router's firewall to forward the port used for peer-to-peer connections (port 51235 by default).

If you have 0 peers, your server may be unable to contact the network, or your system clock may be wrong. (Ripple recommends running an NTP daemon on all servers to keep their clocks synced.)

If you have exactly 10 peers, that may indicate that your rippled is unable to receive incoming connections through a router using NAT. You can improve connectivity by configuring your router's firewall to forward the port used for peer-to-peer connections (port 51235 by default).

`rippled`


### No Response from Server

The rippled executable returns the following message if it wasn't able to connect as a client to the rippled server:

`rippled`

`rippled`

```
{
   "error" : "internal",
   "error_code" : 71,
   "error_message" : "Internal error.",
   "error_what" : "no response from server"
}
```

This generally indicates one of several problems:

- The rippled server is starting up, or is not running at all. Check the status of the service; if it is running, wait a few seconds and try again.
- You may need to pass different parameters to the rippled commandline client to connect to your server.
- The rippled server may be configured not to accept JSON-RPC connections.

`rippled`

`rippled`

`rippled`


## Check the server log

By default, rippled writes the server's debug log to the file /var/log/rippled/debug.log. The location of the debug log can differ based on your server's config file. If you start the rippled service directly (instead of using systemctl or service to start it), it also prints log messages to the console by default.

`rippled`

`/var/log/rippled/debug.log`

`rippled`

`systemctl`

`service`

The default config file sets the log level to severity "warning" for all categories of log messages by internally using the log_level method during startup. You can control the verbosity of the debug log using the --silent commandline option during startup and with the log_level method while the server is running. (See the [rpc_startup] stanza of the config file for settings.)

`--silent`

`[rpc_startup]`

It is normal for a rippled the server to print many warning-level (WRN) messages during startup and a few warning-level messages from time to time later on. You can safely ignore most warnings in the first 5 to 15 minutes of server startup.

`rippled`

`WRN`

For a more thorough explanation of various types of log messages, see Understanding Log Messages.


## Info Collection Script

If you have problems diagnosing the problem, or you are unable to resolve the problem with any of the common fixes, you may want to ask for help in a support forum or the GitHub issues. When asking for help, you can use an info collection script to gather information about your system to help others diagnose the issue.

The official package installation (for Ubuntu/Debian or CentOS/RedHat) installs such a script by default, to /opt/ripple/bin/getRippledInfo. If you compiled rippled yourself, you can find the same script in the rippled source code repository.

`/opt/ripple/bin/getRippledInfo`

`rippled`

`rippled`

To use the script:

1. Run the script while rippled is running.$ /opt/ripple/bin/getRippledInfo

####################################################
  rippled info has been gathered. Please copy the
  contents of /tmp/ripple_info.Xo8Xr/rippled_info.md
  to a github gist at https://gist.github.com/

  PLEASE REVIEW THIS FILE FOR ANY SENSITIVE DATA
  BEFORE POSTING! We have tried our best to omit
  any sensitive information from this file, but you
  should verify before posting.
####################################################The script collects the output of many commands and writes them to a temporary file. The filename is randomized with a string of letters and numbers (case-sensitive), for example: /tmp/ripple_info.Xo8Xr/rippled_info.md
1. Look over the output file for sensitive information.The script attempts to scrub sensitive information from the output, such as validator keys or tokens. However, you should still check the output before posting publicly, as a precaution. For example, the script outputs detailed information about your server hardware, and you may want to remove some sections for privacy reasons. Use a text editor to read the output file and to remove anything you don't want to post.nano /tmp/ripple_info.Xo8Xr/rippled_info.md
1. Upload the output file where others can see it.You can upload the file directly to GitHub Gist, Pastebin, or a similar service. If you are running rippled on a remote server, you may find it easier to first transfer the file to a machine with a web browser, using scp or a similar tool.

Run the script while rippled is running.

`rippled`

```
$ /opt/ripple/bin/getRippledInfo

####################################################
  rippled info has been gathered. Please copy the
  contents of /tmp/ripple_info.Xo8Xr/rippled_info.md
  to a github gist at https://gist.github.com/

  PLEASE REVIEW THIS FILE FOR ANY SENSITIVE DATA
  BEFORE POSTING! We have tried our best to omit
  any sensitive information from this file, but you
  should verify before posting.
####################################################
```

The script collects the output of many commands and writes them to a temporary file. The filename is randomized with a string of letters and numbers (case-sensitive), for example: /tmp/ripple_info.Xo8Xr/rippled_info.md

`/tmp/ripple_info.Xo8Xr/rippled_info.md`

Look over the output file for sensitive information.

The script attempts to scrub sensitive information from the output, such as validator keys or tokens. However, you should still check the output before posting publicly, as a precaution. For example, the script outputs detailed information about your server hardware, and you may want to remove some sections for privacy reasons. Use a text editor to read the output file and to remove anything you don't want to post.

```
nano /tmp/ripple_info.Xo8Xr/rippled_info.md
```

Upload the output file where others can see it.

You can upload the file directly to GitHub Gist, Pastebin, or a similar service. If you are running rippled on a remote server, you may find it easier to first transfer the file to a machine with a web browser, using scp or a similar tool.

`rippled`

`scp`


## See Also

- Concepts:The rippled ServerAmendments
- The rippled Server
- Amendments
- Tutorials:Capacity PlanningConfigure rippled
- Capacity Planning
- Configure rippled
- References:rippled API Referencerippled Commandline Usagelog_level methodserver_info method
- rippled API Referencerippled Commandline Usagelog_level methodserver_info method
- rippled Commandline Usage
- log_level method
- server_info method

- The rippled Server
- Amendments

`rippled`

- Capacity Planning
- Configure rippled

- rippled API Referencerippled Commandline Usagelog_level methodserver_info method
- rippled Commandline Usage
- log_level method
- server_info method

- rippled Commandline Usage
- log_level method
- server_info method

`rippled`

## Images

![XRP LEDGER](data:,)

![Documentation || Dive into XRP Ledger technology and start integrating. icon](https://xrpl.org/assets/docs.4c378e43a6ae1375869ec22831e79f4ce2f3273ae2b00f029a3e3645a0ca6bed.82dffa6a.svg)

![Contribute to the XRPL Community || Join the conversation icon](https://xrpl.org/assets/contribute.5ef42ea6b2ef13b04b062d81a1687e75068ddd08d22b21b4871e591addb2f3fe.82dffa6a.svg)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b52622c5-fcbf-4354-8b32-38494857377a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=b52622c5-fcbf-4354-8b32-38494857377a&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a250500c-dba1-44e8-a17d-38025891649e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=a250500c-dba1-44e8-a17d-38025891649e&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://bat.bing.com/action/0?ti=26326193&Ver=2&mid=312ca0ec-ba98-446c-a744-a1434aab8432&bo=1&sid=63f90b209dab11f080cf95a337a03294&vid=63f9e5b09dab11f0a4b5e9199f743220&vids=1&msclkid=N&uach=pv%3D10.0&pi=0&lg=en-US@posix&sw=1280&sh=720&sc=24&nwd=1&tl=Diagnosing%20Problems%20with%20rippled&p=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&r=&lt=2071&evt=pageLoad&sv=2&cdb=AQAS&rn=41244)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e16fbe90-b436-437d-b4f1-57cd51d28c68&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=e16fbe90-b436-437d-b4f1-57cd51d28c68&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o309v&type=javascript&version=2.3.34)

![Image](https://t.co/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3d63a424-c26a-44d4-9722-4be3b238655c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)

![Image](https://analytics.twitter.com/i/adsct?bci=3&dv=UTC%26en-US%40posix%26Google%20Inc.%26Linux%20x86_64%26255%261280%26720%264%2624%261280%26720%260%26na&eci=2&event_id=3d63a424-c26a-44d4-9722-4be3b238655c&events=%5B%5B%22pageview%22%2C%7B%7D%5D%5D&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=2f5ea84b-e707-4b7c-875b-85bc93289ecf&pt=Diagnosing%20Problems%20with%20rippled&tw_document_href=https%3A%2F%2Fxrpl.org%2Fdocs%2Finfrastructure%2Ftroubleshooting%2Fdiagnosing-problems&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&txn_id=o61w3&type=javascript&version=2.3.34)


## Outbound References
## Internal XRPL References

- [Cookie Policy](https://xrpl.org/privacy-policy.html)
- [https://xrpl.org/](https://xrpl.org/)
- [About](https://xrpl.org/docs/infrastructure/troubleshooting/diagnosing-problems#)
- [XRPL Overview](https://xrpl.org/about)
- [Use Cases & Featured Projects](https://xrpl.org/about/uses)
- [History](https://xrpl.org/about/history)
- [XRP Overview](https://xrpl.org/about/xrp)
- [Impact](https://xrpl.org/about/impact)
- [FAQ](https://xrpl.org/about/faq)
- [Privacy Policy](https://xrpl.org/about/privacy-policy)
- [Docs](https://xrpl.org/docs/infrastructure/troubleshooting/diagnosing-problems#)
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
- [Resources](https://xrpl.org/docs/infrastructure/troubleshooting/diagnosing-problems#)
- [Code Samples](https://xrpl.org/resources/code-samples)
- [Dev Tools](https://xrpl.org/resources/dev-tools)
- [XRPL Learning Portal](https://learn.xrpl.org/)
- [XRPL Brand Kit](https://xrpl.org/XRPL_Brand_Kit.zip)
- [Ledger Explorer](https://livenet.xrpl.org/)
- [Known Amendments](https://xrpl.org/resources/known-amendments)
- [Contribute Code](https://xrpl.org/resources/contribute-code)
- [Contribute Documentation](https://xrpl.org/resources/contribute-documentation)
- [Contribute Blog](https://xrpl.org/resources/contribute-blog)
- [Community](https://xrpl.org/docs/infrastructure/troubleshooting/diagnosing-problems#)
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
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.405d5104651bbf32d142eecacad856ba.1759201989860.1759201989860.1759201989860.1&__hssc=78174987.1.1759201989860&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)
- [Edit](https://github.com/XRPLF/xrpl-dev-portal/tree/master/docs/infrastructure/troubleshooting/diagnosing-problems.md)
- [NTP](http://www.ntp.org/)
- [NAT](https://en.wikipedia.org/wiki/Network_address_translation)
- [by default](https://github.com/XRPLF/rippled/blob/8429dd67e60ba360da591bfa905b58a35638fda1/cfg/rippled-example.cfg#L1065)
- [By default,](https://github.com/XRPLF/rippled/blob/master/cfg/rippled-example.cfg#L1139-L1142)
- [GitHub issues](https://github.com/XRPLF/rippled/issues)
- [in the rippled source code repository](https://github.com/XRPLF/rippled/blob/develop/bin/getRippledInfo)
- [GitHub Gist](https://gist.github.com/)
- [Pastebin](https://pastebin.com/)
- [XRPL Foundation](https://xrpl.foundation)
- [XRPL Grants](https://xrplgrants.org/?__hstc=78174987.405d5104651bbf32d142eecacad856ba.1759201989860.1759201989860.1759201989860.1&__hssc=78174987.1.1759201989860&__hsfp=421414132)
- [GitHub](https://github.com/XRPLF/)

---
Crawled on: 2025-09-30T03:13:23.453Z
Agent: Qoder + Playwright MCP
Retries: 0
Status: SUCCESS
