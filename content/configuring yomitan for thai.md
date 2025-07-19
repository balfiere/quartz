---
tags: [language_learning/thai]
publish: true
created: 2025-07-19T16:30:07.077-05:00
modified: 2025-07-19T16:40:47.4747-05:00
---

## dictionaries

the dictionaries i use are:

- [kaikki th-th and th-en](https://github.com/yomidevs/kaikki-to-yomitan)
- [apple th-en](https://drive.proton.me/urls/XZRWCKDM54#Bnq28tvMixEm)
- [JTDIC th-jp](https://github.com/peldas/yomitan-dicts?tab=readme-ov-file#thai-japanese)
- [Lexitron th-en](https://opend-portal.nectec.or.th/dataset/lexitron-2-0)
- [volubilis th-en](https://belisan-volubilis.blogspot.com/)
- royal institute dictionary th-th
- Isan-Thai-English dictionary th-th-en
- plant names th-en
- pleang na nakoen th-th
- jones th-en
- abbreviations th-th

the unlinked dictionaries were sourced from [thai dictionaries project](https://thaidictproject.wixsite.com/website/thai-dictionaries?lang=en) and converted using [pyglossary](https://github.com/ilius/pyglossary). you can download all these dictionaries in one file [here](https://mega.nz/file/tE8ljJDI#QcdJseebIbIiT7wR99oxblF14S0QkriZzjq8dNVfG1I). to import, go to the settings page of yomitan, scroll down to "backup", click "import dictionary collection", then select the json file downloaded earlier. to enable them, scroll up to "dictionaries" then click on "configure installed and enabled dictionaries...". enable all of them. i recommend putting the kaikki dictionaries on top since they have the best coverage and nicest formatting imo.

## yomitan settings

- in "general", set language to thai.
- in "appearance", set the font to something that's compatible with thai (i prefer ibm plex sans thai). i recommend setting the font size and line height bigger, like 24px and 1.5. click "configure custom css" then add this under "popup css" to make the head word less big when increasing the font size.

```css
:root {
--headword-font-size-no-units: 1.75;
}

.actions {
font-size: 16px;
}
```


- in "popup position and size", i recommend increasing the size if you increased the font. i use 650x600px.
- in "audio", enable languagepod101. you can also get forvo audio using [this anki extension](https://ankiweb.net/shared/info/1045800357).
- in "translation", click "configure custom text replacement patterns". add the following replacements:

| pattern | replacement |
| ------- | ----------- |
| (.)ํา   | $1ำ         |
| \s      |             |
