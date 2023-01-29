---
layout: post
author: k0d14k
---

CTF: Angstrom 2019

Category: misc

Difficulty: Easy

# Description

---

> An oddly yellow cat handed me this [message](https://files.actf.co/397a7663cfc657bea92b8038eb2a27804ac75ba56b74e56572e57f00414fd43f/project.json) - what could it mean?
> 

`address` : [https://2019.angstromctf.com/challenges](https://2019.angstromctf.com/challenges)

# Solution

---

In this misc challenge we just have a JSON written in a file.

This JSON is made up as follow:

```json
{
	"targets": [...],
	"monitors": [...],
	"extensions": [...],
	"meta": {...}
}
```

I confess that the challenge includes a bit of guessing. But the `name` of the challenge, the `yellow cat` in the description and the `monitors` field in the JSON makes me mind about [Scratch](https://scratch.mit.edu/projects/editor/?tutorial=getStarted) and in fact the JSON file is a Scratch project.

Basically load this file in the Scratch web page and run the sprite.

![Screenshot from 2022-11-30 15-17-35.png](Scratch%20It%20Out%20d1e1bba25f2d422a9047e73e062a5923/Screenshot_from_2022-11-30_15-17-35.png)

### Flag : actf{Th5_0pT1maL_LANgUaG3}

# Links and tools

---

`Scratch` : [https://scratch.mit.edu/projects/editor/?tutorial=getStarted](https://scratch.mit.edu/projects/editor/?tutorial=getStarted)