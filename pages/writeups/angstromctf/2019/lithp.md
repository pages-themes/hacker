---
layout: post
author: k0d14k
---

# LITHP

CTF: Angstrom 2019

Category: misc, rev

Difficulty: Easy-Medium


# Description

---

> My friend gave me this [program](https://files.actf.co/b7bb1a50e52ba3f9ff93f4d08691a7eef81457410192f769b076a3052ff21b21/lithp.lisp) but I couldn't understand what he was saying - what was he trying to tell me?
> 

`address` : [https://2019.angstromctf.com/challenges](https://2019.angstromctf.com/challenges)

# Solution

---

This challenge provides us a lisp piece of code containing the encrypted flag and the encryption function.

We need to reverse this snippet to decode the flag.

```lisp
;LITHP

(defparameter *encrypted* '(8930 15006 8930 10302 11772 13806 13340 11556 12432 13340 10712 10100 11556 12432 9312 10712 10100 10100 8930 10920 8930 5256 9312 9702 8930 10712 15500 9312))
(defparameter *flag* '(redacted))
(defparameter *reorder* '(19 4 14 3 10 17 24 22 8 2 5 11 7 26 0 25 18 6 21 23 9 13 16 1 12 15 27 20))

(defun enc (plain)
    (setf uwuth (multh plain))
    (setf uwuth (owo uwuth))
    (setf out nil)
    (dotimes (ind (length plain) out)
        (setq out (append out (list (/ (nth ind uwuth) -1))))))
    
(defun multh (plain)
    (cond
        ((null plain) nil)
        (t (cons (whats-this (- 1 (car plain)) (car plain)) (multh (cdr plain))))))

(defun owo (inpth)
    (setf out nil)
    (do ((redth *reorder* (cdr redth)))
        ((null redth) out)
        (setq out (append out (list (nth (car redth) inpth))))))

(defun whats-this (x y)
    (cond
        ((equal y 0) 0)
        (t (+ (whats-this x (- y 1)) x))))

;flag was encrypted with (enc *flag*) to give *encrypted*
```

## whats-this

```lisp
(defun whats-this (x y)
    (cond
        ((equal y 0) 0)
        (t (+ (whats-this x (- y 1)) x))))
```

We can start from the simplest function in this script. It implements the times operator by summing recursively the `y` parameter.

## multh

```lisp
(defun multh (plain)
    (cond
        ((null plain) nil)
        (t (cons (whats-this (- 1 (car plain)) (car plain)) (multh (cdr plain))))))
```

Let’s follow with `multh` that invokes `whats-this`. Multh is a recursive function which if the plain is empty multiplies the first item of the list before by the previous and then by `-1` with these values it creates a couple `(x y)` with `y = -(x * (x-1)`and `x` as an array entry.

If the condition isn’t respected it calls the same function over the other elements of the list.

## owo

```lisp
(defun owo (inpth)
    (setf out nil)
    (do ((redth *reorder* (cdr redth)))
        ((null redth) out)
        (setq out (append out (list (nth (car redth) inpth))))))
```

`owo` is a simple shuffle function. gets an array and shuffles it with the order given by reorder.

## enc

```lisp
(defun enc (plain)
    (setf uwuth (multh plain))
    (setf uwuth (owo uwuth))
    (setf out nil)
    (dotimes (ind (length plain) out)
        (setq out (append out (list (/ (nth ind uwuth) -1))))))
```

In few words `enc` just gets the flag, for each character multiplies it (as number) for the previous cardinal number then applies the `reorder` array to shuffle it and appends every character to the `out` list (that is `encrypted`).

## Solution

We can easy reverse the encryption function because we have the reorder array and now we now how the encryption works.

So we follow 2 steps:

1. reorder the encrypted array
2. bruteforce every printable character multiplied by it’s integer value -1

```python
"""
@author K0d14k
Script to solve AngstromCTF 2019 - MISC - LITHP
"""
from string import printable

encrypted = [8930, 15006, 8930, 10302, 11772, 13806, 13340, 11556, 12432, 13340, 10712, 10100, 11556, 12432, 9312, 10712, 10100, 10100, 8930, 10920, 8930, 5256, 9312, 9702, 8930, 10712, 15500, 9312]
reorder = [19, 4, 14, 3, 10, 17, 24, 22, 8, 2, 5, 11, 7, 26, 0, 25, 18, 6, 21, 23, 9, 13, 16, 1, 12, 15, 27, 20]
sortedlist = []
flag = ""

for k, v in sorted(set(zip(reorder, encrypted))):
    sortedlist.append(v)

for enc in sortedlist:
    for i in printable:
        if ord(i) * (ord(i) -1 ) == enc:
            flag += i
            print(flag)
```

### Flag : actf{help_me_I_have_a_lithp}

# Links and tools

---

`LISP Reference` : [https://lisp-lang.org/learn](https://lisp-lang.org/learn)

`YouTube Lisp tutorial` : [https://www.youtube.com/watch?v=ymSq4wHrqyU](https://www.youtube.com/watch?v=ymSq4wHrqyU)