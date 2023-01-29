---
layout: post
author: k0d14k
---

CTF: Angstrom 2019

Category: misc

Difficulty: Easy

# Description

---

> Something is suspicious about defund's math papers. See if you can find anything in the [network packets](https://files.actf.co/8e1122c1c15f2373fb6e98c207c3218ecd322796a2e2275f4b99e7bb21b9e253/paper_trail.pcapng) we've intercepted from his computer.
> 

`address` : [https://2019.angstromctf.com/challenges](https://2019.angstromctf.com/challenges)

# Introduction

---

In this challenge we have a `.pcap` file. Let’s go to know something about this kind of Files.

A `.pcap` file stores a network traffic over a network inteface (as eth0, wlan0 ans so on).

Mainly this kind of files is created by a software as WireShark or tshark.

On a `.pcap` file we can apply search operations and filters over network packets captured by our software and stored into the file.

The following screenshot shows how a stored packet appears in Wireshark.

![Screenshot from 2022-11-29 21-28-14.png](Paper%20Trail%20d140749f961e4f6b956c40c3d30f78ff/Screenshot_from_2022-11-29_21-28-14.png)

# Solution

---

To solve this easy challenge we just need to read the `.pcap` file. If you try to open it in WireShark and read the packets you will see that there are few packets containing just a character and first 5 of them are `a`, `c`, `t`, `f`, `{`.

A speed way to collect every char is using tshark. The following command solves the challenge.

```bash
┌──(kali㉿kali)-[~/…/AngstromCTF/2019/misc/paperTrail]
└─$ tshark -r  paper_trail.pcapng -Y "irc" -e "irc.response.trailer" -T fields | tr -d  '\n'
I have to confide in someone, even if it's myselfmy publications are all randomly generated :(actf{fake_chat.freenode.netmath_papers}
```

Pay attention because there is some garbage you have to remove `chat.freenode.net`

```bash
┌──(kali㉿kali)-[~/…/AngstromCTF/2019/misc/paperTrail]
└─$ tshark -r  paper_trail.pcapng -Y "irc" -e "irc.response.trailer" -T fields |grep -v "chat.freenode.net" |tr -d  '\n'
I have to confide in someone, even if it's myselfmy publications are all randomly generated :(actf{fake_math_papers}
```

Let’s explain the command:

1. `tshark`
    1. `-r` Opens the file in read mode
    2. `-Y "irc"` Filters just the IRC traffic
    3. `-e "irc.response.trailer` takes just the packet trailer
    4. `-T fields` it’s required by the `-e` parameter
2. `grep`
    1. `-v` Inverts the selection and takes all of lines doesn’t match “chat.freenode.net”
3. `tr -d "\n"` Removes the new line and prints the output in a single line

### Flag : actf{fake_math_papers}

# Links and tools

---