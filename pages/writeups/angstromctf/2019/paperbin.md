---
layout: post
author: k0d14k
---

CTF: Angstrom 2019

Category: misc

Difficulty: Easy-Medium

# Description

---

> defund accidentally deleted all of his math papers! Help recover them from his computer's [raw data](https://files.actf.co/ac4e8f7e16fb244613ffe42741046f98839e477e7a511d583dcc1bb291486029/paper_bin.dat).
> 

`address` : [https://2019.angstromctf.com/challenges](https://2019.angstromctf.com/challenges)

`hint` : File carving

# Solution

---

In this challenge We have to restore defund’s pdfs from a dump.

As the hint says We can perform a File carving over the dump to get these pdfs.

I’ve tried with two different tools, `binwalk` and `foremost`. Binwalk dumps too much files so I prefered use foremost to have a cleaner output.

```bash
┌──(kali㉿kali)-[~/…/AngstromCTF/2019/misc/paperBin]
└─$ foremost paper_bin.dat
Processing: paper_bin.dat
|*|
                                                                                                                                                                                                                                              
┌──(kali㉿kali)-[~/…/AngstromCTF/2019/misc/paperBin]
└─$ cd output  
                                                                                                                                                                                                                                              
┌──(kali㉿kali)-[~/…/2019/misc/paperBin/output]
└─$ ll
total 8
-rwxrwx--- 1 root vboxsf 1607 Nov 24 10:17 audit.txt
drwxrwx--- 1 root vboxsf 4096 Nov 24 10:17 pdf
                                                                                                                                                                                                                                              
┌──(kali㉿kali)-[~/…/2019/misc/paperBin/output]
└─$
```

As We can see `foremost` has extract an `audit.txt` file and a `pdf` directory

`audit.txt` contains many util information.

```bash
Foremost version 1.5.7 by Jesse Kornblum, Kris Kendall, and Nick Mikus
Audit File

Foremost started at Thu Nov 24 10:17:43 2022
Invocation: foremost paper_bin.dat 
Output directory: /home/kali/Documents/vm_shared/ctf/AngstromCTF/2019/misc/paperBin/output
Configuration file: /etc/foremost.conf
------------------------------------------------------------------
File: paper_bin.dat
Start: Thu Nov 24 10:17:43 2022
Length: 6 MB (7123824 bytes)
 
Num      Name (bs=512)         Size      File Offset     Comment 

0:      00000000.pdf         341 KB             222      
1:      00000688.pdf         346 KB          352478      
2:      00001384.pdf         363 KB          708830      
3:      00002112.pdf         353 KB         1081566      
4:      00002824.pdf         333 KB         1446110      
5:      00003496.pdf         370 KB         1790174      
6:      00004240.pdf         349 KB         2171102      
7:      00004944.pdf         388 KB         2531550      
8:      00005728.pdf         356 KB         2932958      
9:      00006448.pdf         318 KB         3301598      
10:     00007088.pdf         411 KB         3629278      
11:     00007912.pdf         351 KB         4051166      
12:     00008616.pdf         317 KB         4411614      
13:     00009256.pdf         319 KB         4739294      
14:     00009896.pdf         339 KB         5066974      
15:     00010576.pdf         324 KB         5415134      
16:     00011232.pdf         321 KB         5751006      
17:     00011880.pdf         293 KB         6082782       (PDF is Linearized)
18:     00012472.pdf         374 KB         6385886      
19:     00013224.pdf         344 KB         6770910      
Finish: Thu Nov 24 10:17:43 2022

20 FILES EXTRACTED

pdf:= 20
------------------------------------------------------------------

Foremost finished at Thu Nov 24 10:17:43 2022
```

mh what does it means that a PDF is linearized?

From a google research I’ve discovered as follow:

```bash
Sometimes called “fast web view,” linearization is a special way of saving a PDF file that 
organizes its internal components to make them easier to read when the file is streamed over a 
network connection. While a standard, non-linearized PDF stores information associated with each 
page across the entire file, linearized PDFs use an object tree format to consolidate page elements
in an ordered, page by page basis.
```

So in this `00011880.pdf` file we have a linear structure that maybe can be readed by a human.

Let’s try to open it with `bless`. 

The file’s structure doesn’t appear human readable but, at the end of the file, I found this:

![Screenshot from 2022-11-24 10-24-04.png](Paper%20bin%2052e58a108fe94896bb83e25d8267c649/Screenshot_from_2022-11-24_10-24-04.png)

This pdf file is produced by `pdfTeX` that’s a `TeX` plugin and `TeX` is a technology used to format texts with a simple sintax. Mh very cool, Are We able to convert this pdf into a TeX file? 

Of course, just we need to install `pdftotext` tool (read Links and tools).

```bash
┌──(kali㉿kali)-[~/…/2019/misc/paperBin/output]
└─$ pdftotext 
pdftotext version 22.08.0
Copyright 2005-2022 The Poppler Developers - http://poppler.freedesktop.org
Copyright 1996-2011, 2022 Glyph & Cog, LLC
Usage: pdftotext [options] <PDF-file> [<text-file>]
  -f <int>             : first page to convert
  -l <int>             : last page to convert
  -r <fp>              : resolution, in DPI (default is 72)
  -x <int>             : x-coordinate of the crop area top left corner
  -y <int>             : y-coordinate of the crop area top left corner
  -W <int>             : width of crop area in pixels (default is 0)
  -H <int>             : height of crop area in pixels (default is 0)
  -layout              : maintain original physical layout
  -fixed <fp>          : assume fixed-pitch (or tabular) text
  -raw                 : keep strings in content stream order
  -nodiag              : discard diagonal text
  -htmlmeta            : generate a simple HTML file, including the meta information
  -tsv                 : generate a simple TSV file, including the meta information for bounding boxes
  -enc <string>        : output text encoding name
  -listenc             : list available encodings
  -eol <string>        : output end-of-line convention (unix, dos, or mac)
  -nopgbrk             : don't insert page breaks between pages
  -bbox                : output bounding box for each word and page size to html. Sets -htmlmeta
  -bbox-layout         : like -bbox but with extra layout bounding box data.  Sets -htmlmeta
  -cropbox             : use the crop box rather than media box
  -colspacing <fp>     : how much spacing we allow after a word before considering adjacent text to be a new column, as a fraction of the font size (default is 0.7, old releases had a 0.3 default)
  -opw <string>        : owner password (for encrypted files)
  -upw <string>        : user password (for encrypted files)
  -q                   : don't print any messages or errors
  -v                   : print copyright and version info
  -h                   : print usage information
  -help                : print usage information
  --help               : print usage information
  -?                   : print usage information
                                                                                                                                                                                                                                              
┌──(kali㉿kali)-[~/…/2019/misc/paperBin/output]
└─$ pdftotext pdf/00011880.pdf 
                                                                                                                                                                                                                                              
┌──(kali㉿kali)-[~/…/2019/misc/paperBin/output]
└─$ cat pdf/*.txt | grep 'actf'
actf{proof by triviality}
```

Remember to replace spaces with `_`.

### Flag : actf{proof_by_triviality}

# Links and tools

---

`pdftotext` : [https://www.makeuseof.com/how-to-convert-linux-pdf-file-to-text-document/](https://www.makeuseof.com/how-to-convert-linux-pdf-file-to-text-document/)