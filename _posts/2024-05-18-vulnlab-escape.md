---
layout: post
date: 2024-05-18 15:00 -0500
title: "VulnLab: Escape"
categories:
  - writeups
  - vulnlab
tags:
  - kiosk
  - rdp
  - uac
  - password-deobfuscation
image: /images/vulnlab_escape/escape.png
---
## Summary

Escape is an easy rated Windows box from [VulnLab](https://wiki.vulnlab.com/guidance/easy/escape). This box involved breaking out of a restricted kiosk environment, recovering an obfuscated RDP password, and finally bypassing UAC to escalate privilges. 

## Walkthrough
### Enumeration
Nmap shows that only port 3389 is open on the server.

```console
Nmap scan report for 10.10.126.31
Host is up, received echo-reply ttl 127 (0.13s latency).
Scanned at 2024-05-18 15:07:54 CDT for 315s
Not shown: 65534 filtered tcp ports (no-response)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT     STATE SERVICE       REASON          VERSION
3389/tcp open  ms-wbt-server syn-ack ttl 127 Microsoft Terminal Services
| rdp-ntlm-info:
|   Target_Name: ESCAPE
|   NetBIOS_Domain_Name: ESCAPE
|   NetBIOS_Computer_Name: ESCAPE
|   DNS_Domain_Name: Escape
|   DNS_Computer_Name: Escape
|   Product_Version: 10.0.19041
|_  System_Time: 2024-05-18T20:13:04+00:00
|_ssl-date: 2024-05-18T20:13:08+00:00; -1s from scanner time.
| ssl-cert: Subject: commonName=Escape
| Issuer: commonName=Escape
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2024-02-02T11:08:33
| Not valid after:  2024-08-03T11:08:33
| MD5:   f4fa:8611:3b8a:76e2:65fe:541a:947b:4b84
| SHA-1: 240f:ec8d:6051:8a16:92fd:9600:818a:f8c6:dbe5:bd4b
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIQQlhl5eFZarZNEpCItMxt3jANBgkqhkiG9w0BAQsFADAR
| MQ8wDQYDVQQDEwZFc2NhcGUwHhcNMjQwMjAyMTEwODMzWhcNMjQwODAzMTEwODMz
| WjARMQ8wDQYDVQQDEwZFc2NhcGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
| AoIBAQDRO5ErOER+vxewtaw8DXrvlXgfc5R1seKph22xCI0CaMbLswSXtruA+V8p
| iIWLN+b0Z12z35n7o2kbJuD91T1o3FpiVGVXiRFiTT+d1CET3OYd0VqQOOaxpwfp
| MPvFTfBnbiAhMtalXVkV/R2tYnw94hgmVBxALs7VJp/x3mwcZVkdcEfJ7g7cjpZy
| EMD0Wcs+yYxXVdkYL6e+zPlRBNZjdaTasOAzCJ9a5xmUslhWoIInlL1coI1XD7QL
| 5fJlIUOtr8k9RHKMJPEOS/syeWUUzSkkLzWMFqgWqnikvsS8MI1S94+N2AO7zX4W
| rcOsSqd20W8cxWeqFlo51+/mAk+tAgMBAAGjJDAiMBMGA1UdJQQMMAoGCCsGAQUF
| BwMBMAsGA1UdDwQEAwIEMDANBgkqhkiG9w0BAQsFAAOCAQEAEPNmAPmsdJGT9Q0h
| ugo6UcqXu/bhBYKteY4lrHH9P6MMa7rmZE5EFETmK1jp839dYldFGWCGxZ0GAJL/
| aGpicW/ImVVyaSmzwYCXS69wRG0ll0Gu0rmj4PgeQ4KOPN45GWvqWFUepsqEMEF4
| xSAe6igyZMGZAL7qN/px4qmc9nTLSmGp3yDgzxvRqc8d3B+I0q+i1El1e2JcfTyH
| Wjdz3DWjHIXfyo514Ntpdnneugkpehfnnqcjy3JL+soGtrglw3RUA05+0TVgk3l7
| MEEtnIj+jkoDw/iNEfGFswkHWJGf8ASxQohxf0BGh0o4T+Jv7+C2Jdw3szVWfAFX
| loAYvQ==
|_-----END CERTIFICATE-----
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 0s, deviation: 0s, median: -1s
```

Since there's no credentials, we can try to access the RDP service by disabling NLA.

```console
$ xfreerdp /v:$ip /dynamic-resolution +clipboard -sec-nla
```

This brings up the following prompt. Looks like we can login as the `KioskUser0` without a password.

![](images/vulnlab_escape/Pasted%20image%2020240518153626.png)

Once we're logged in, we are presented with sign for the `Busan Expo`. 

![](images/vulnlab_escape/Pasted%20image%2020240518153903.png)

### Kiosk Breakout
Right click and most commands are restricted in kiosk mode; however, we can use the Windows key to bring up the menu and select Microsoft Edge from there to get a browser with a URL bar and most functionality enabled.

Within Edge, we can use the following in the URL bar to get a directory listing of the `C:\` drive. 

```console
file://c:\
```

![](images/vulnlab_escape/Pasted%20image%2020240518154237.png)

Within the `C:\_admin` directory, there are a couple files that look like they're associated with the remote desktop service.

![](images/vulnlab_escape/Pasted%20image%2020240518154403.png)

The `profiles.xml` looks like it has an encrypted password in it. We'll need to figure out a way to decrypt that.

![](images/vulnlab_escape/Pasted%20image%2020240518155104.png)

### User Flag

We can just grab the user flag from here. 

![](images/vulnlab_escape/Pasted%20image%2020240518155305.png)

### Privilege Escalation

To proceed, we're going to need a proper shell. Since we're fairly restricted on what we can execute, we'll need to download `cmd.exe` and then rename it to `msedge` since that's one of the only things allowed in kiosk mode.

![](images/vulnlab_escape/Pasted%20image%2020240518160619.png)

After checking around a little bit it seems like we're pretty much restricted to accessing the `Downloads` folder, so we can copy the `profiles.xml` file to the `C:\Users\KioskUser0\Downloads` folder and do everything from there. 

![](images/vulnlab_escape/Pasted%20image%2020240518161024.png)

Start up RDP plus from `C:\Program Files (x86)\Remote Desktop Plus\rdp.exe`. 

![](images/vulnlab_escape/Pasted%20image%2020240518161251.png)

From the `Manage profiles` menu, select `Import profile` from the `Import and export` menu.

![](images/vulnlab_escape/Pasted%20image%2020240518161405.png)

Select the `profile.xml` file and notice that the password is obfuscated in the edit configuration menu.

![](images/vulnlab_escape/Pasted%20image%2020240518161612.png)

We can use a tool called [BulletsPassView](https://www.nirsoft.net/utils/bulletspassview-x64.zip) to read the obfuscated password.

![](images/vulnlab_escape/Pasted%20image%2020240518170437.png)

When the tool detects an obfuscated password, it displays the plaintext password in the tool window. 

Since we've already got a shell we can just try `runas` with that password to see if it's possible to escalate to the admin user. We get a shell with the following command:

```
PS> runas /user:ESCAPE\admin cmd
```

After getting the new shell, we can observe that the `admin` user is a member of the `Administrators` group, however this shell is running at a medium integrity level which means we'll need to bypass UAC to get a high integrity shell. 

![](images/vulnlab_escape/Pasted%20image%2020240518171013.png)

Something I learned doing this lab was that it wasn't necessary to use something like `fodhelper` to bypass UAC in this case. Using the following command brought up the UAC dialog and clicking on the "Yes" button brings up PowerShell running as a high integrity process. 

```
PS> Start-Process powershell -Verb runas
```

![](images/vulnlab_escape/Pasted%20image%2020240518171406.png)

We can see that we now have all administrative privileges. 

![](images/vulnlab_escape/Pasted%20image%2020240518171447.png)

Now, with the high integrity PowerShell go ahead and grab the `root.txt` from the `C:\Users\Administrator\Dekstop\` directory. 

That's it! Congrats on rooting the box.