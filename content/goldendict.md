---
tags: [language_learning]
publish: true
created: 2025-07-19T20:27:54.5454-05:00
modified: 2025-09-03T00:09:56.5656-05:00
---

[goldendict-ng](https://xiaoyifang.github.io/goldendict-ng/) is a program for windows, mac, and linux that allows the user to install their own dictionaries to look up words instantly. even though i mainly use yomitan to look words up in a browser, i still find it handy to have another dictionary service to fall back on when i want to looking something up outside of my browser.

i highly recommend reading [tatsumoto's guide](https://tatsumoto.neocities.org/blog/setting-up-goldendict) on setting up goldendict. the following are my personal preferences and some recommendations for using it with thai.

## dictionaries

install dictionaries by opening goldendict, clicking "edit" > "dictionaries..." then under "sources" > "files" add the folder that has all the dictionaries you've downloaded. if you want go to "wikipedia" and add the wikitionary of your target language (i recommend adding thai if you're studying it). if you're studying multiple languages i recommend clicking on "groups" and sorting your dictionaries based on target language.

a huge repository of dictionaries for many languages can be found [here](https://cloud.freemdict.com/index.php/s/pgKcDcbSDTCzXCs).

### thai

i recommend installing the dictionaries from [thai dictionaries project](https://thaidictproject.wixsite.com/website/thai-dictionaries?lang=en) except use [this version](https://github.com/windwerfer/volubilis_dict) of the volubilis dictionary. at the very least i would add

- Royal Institute Thai - Thai Dictionary (modified version)
- Isan Thai - Thai - English Dictionary (Dr. Preecha Phinthong)
- Pleang Na Nakorn dictionary
- Thai - English LEXiTRON dictionary v. 2
- the version of the volubilis dictionary linked above

you can download thai hunspell files [here](https://github.com/syafiqhadzir/hunspell-th).

### japanese

[jitendex](https://jitendex.org/) is available for goldendict. i also like kenkyusha new japanese-english dictionary, kireicake, and a dictionary of japanese grammar, all of which can be downloaded [here](https://cloud.freemdict.com/index.php/s/pgKcDcbSDTCzXCs?dir=/JAPANESE/Jpn-Eng).

## keyboard shortcuts

while goldendict can show a little popup icon on selection changes that you can click to send the selection to goldendict, this feature is broken on wayland. on linux, i bind SUPER+C to run the following script:

```bash
#!/bin/bash

# strip clipboard of all whitespace
clipboard=$(wl-paste | tr -d '[:space:]')

# open clipboard in goldendict
goldendict-ng $clipboard
```

on x11, change `wl-paste` with `xclip`. i find stripping the whitespace helpful when reading a pdf that's been [[ocr for language learning|ocr]]'d, since i find `ocrmypdf` often adds whitespace characters inside of words to keep the location of the invisible text layer in the same spot as the original document.

goldendict also supports clipboard monitoring i.e. every time you copy something the goldendict window will pop up with a translation for whatever was copied. i usually recommend having it off, then turning it on when reading manga, playing games, etc where you use [[ocr for language learning|ocr]] tools that send the output to the clipboard to expedite the word lookup process. 

## custom styling: multiple font support

to add support for multiple custom fonts, open the configuration folder (~/.goldendict on my machine, or open goldendict, click on help, then click on configuration folder). create a file called `article-style.css`. here's my custom styling to add support for thai and japanese.

```css
body,
.ipa,
.phon,
.phone,
.pron,
.audio-gb,
.audio-us {
	font-family: "IBM Plex Sans Thai Looped Light", "IBM Plex Sans JP"!important;
	font-size:16px!important;
}
```
