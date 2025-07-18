---
title: texthooking games in linux
category: idea
tags: category/idea, linux, languagelearning
created: 2025-05-27T20:01
updated: 2025-06-27T21:41
---

# texthooking games in linux

### installing old region locked games

the following prefix has been set up according to [Visual novels on Linux - TheMoeWay](https://learnjapanese.moe/vn-linux/)

```
/home/balfiere/.var/app/ru.linux_gaming.PortProton/prefixes/VNS
```

if need to install (not portable game), install using lutris in the above prefix
games that require the CD to be mounted or need to be installed from CD can use CDemu to mount the iso/mds
after installing open games using port proton and the latest version of proton-ge
remember to force japanese local

[Setting up a wine prefix for visual novels with movie playback support [guide]](https://www.reddit.com/r/visualnovels/comments/qo51zc/setting_up_a_wine_prefix_for_visual_novels_with/)
[Playing visual novels on GNU/Linux with Wine - Friendly GNU/Linux Thread/Website](https://fglt.nl/guides/visual-novels-on-gnu-linux.html)

## running games

### force use of dGPU

most games are openGL and will default to running on iGPU. if launching game through port proton, open .ppdb file and add

```
export __NV_PRIME_RENDER_OFFLOAD="1" 
export __GLX_VENDOR_LIBRARY_NAME="nvidia"
```

if opening directly from the command line or cartridges, add `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia` to the front of the command

## texthooking

### steam games

since steam games are installed into their own prefix, and texthookers need to run in the same instance as the game, need to use special tools to run other programs at same time as launching a game from steam.

after installing SteamTinkerLauncher, open properties > compatibility then set the compatibility tool to Steam Tinker Launcher. open the game, click main menu, click game menu, click misc options, then set the desired text hooker as a custom command and click fork custom command.

for more detailed instructions: [[LINUX GUIDE] How to use text hooker (Agent) with Steam Flatpak](https://www.reddit.com/r/visualnovels/comments/15wv7h1/linux_guide_how_to_use_text_hooker_agent_with/)

may need to add font files to game prefix `drive_c/windows/Fonts`

### Hcodes

if unable to hook automatically, agent and textractor support using Hcodes. can be found from the following sources:

- [H-Code \| Visual Novel Text Hooking Wiki \| Fandom](https://web.archive.org/web/20210116003921/https://vn-hooking.fandom.com/wiki/H-Code)
- [Japanese Visual Novel Hook Codes.pdf - Google Drive](https://drive.google.com/file/d/13amn4LzLDUPmXBO_rfO3eQ0piKpGCvth/view?pli=1)
- sometimes people post hcodes in the discussion section of a game's [vndb](https://vndb.org/) page

### filtering text

use lunahook or textractor, can use plugin 'Regex Filter' to remove unwanted characters. examples:

- `\s` (filters all whitespace)
- `[\u0021-\u00ff]` (filters all european language and most special characters)
- `[\u0100-\uffff]` (filters all non european language characters)
- `[\u0000-\u2fff\ua000-\uffff]` (filters all non Chinese/Japanese/Korean characters)
- `<.+?>` (filters all HTML tags like `<p id="some_guid">` or `</span>`)

[FAQ · Artikash/Textractor Wiki · GitHub](https://github.com/Artikash/Textractor/wiki/FAQ#textractor-is-extracting-text-mostly-correctly-but-theres-some-extra-characters-as-markupgarbage-eg-a-n-in-place-of-every-line-break-is-there-a-way-to-clean-the-text)
