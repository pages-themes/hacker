---
layout: post
author: Aju ALex
pdf_url: ready.pdf
title: Ready
date: 2021-05-15
publish: True
description: "Ready is a medium difficulty Linux machine. A vulnerable version of GitLab server leads to a remotecommand execution, by exploiting a combination of SSRF and CRLF vulnerabilities. Bad permission on abacked up configuration file of the Gitlab server, reveals a password that is found to be reusable for theuser root, inside a docker container. After root access is acquired, escaping the container is possible sinceit is running in privileged mode."
---

# Skills learned

- SSRF & CRLF Attacks
- Docker Escape

[back](../writup)
