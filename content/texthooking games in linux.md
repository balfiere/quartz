---
tags:
  - language_learning
  - linux
publish: true
created: 2025-07-19T22:23:15.1515-05:00

updated: 2025-09-13T23:56:57.5757-05:00
---

# texthooking games in linux

## installing games

### where to download

- [cs rin ru](https://cs.rin.ru/forum/) (if on steam)
- [RuTracker.org](https://rutracker.org/forum/index.php) (lots of old, hard to find games on here. definitely check here for otome games)
- [Browse :: Nyaa](https://nyaa.si/) (if no h content)
- [Browse :: Sukebei](https://sukebei.nyaa.si/) (if h content. sometimes games without h content are still posted here tho)
- [Deso Novel](https://desonovel.vnlx.org/) (mostly eroge but has some non-eroge. most older links are down)

### installing old region locked games

to install games, set up a prefix according to [Visual novels on Linux - TheMoeWay](https://learnjapanese.moe/vn-linux/). if using [PortProton](https://flathub.org/apps/ru.linux_gaming.PortProton) to launch games, move the prefix to

```
~/.var/app/ru.linux_gaming.PortProton/prefixes/VNS
```

otherwise PortProton will not be able to run the game in the created prefix.

if game needs to be installed (not a portable game), install using lutris in the above prefix. games that require the CD to be mounted or need to be installed from CD can use [CDemu](https://cdemu.sourceforge.io/project/#binary) to mount the iso/mds.

i also like to install LAVFilters into this prefix, which can be installed using [winetricks](https://github.com/Winetricks/winetricks). if using PortProton, open PortProton, click on "Wine Settings", set prefix to "VNS" and wine to your favorite version of wine (mine is GE-PROTON9-27) then click "Winetricks". scroll down and select library "lavfilters702", then click "Install".

other guides for setting up wine prefixes for visual novels (has more info on getting video playback working):

- [Setting up a wine prefix for visual novels with movie playback support (guide)](https://www.reddit.com/r/visualnovels/comments/qo51zc/setting_up_a_wine_prefix_for_visual_novels_with/)
- [Playing visual novels on GNU/Linux with Wine - Friendly GNU/Linux Thread/Website](https://fglt.nl/guides/visual-novels-on-gnu-linux.html)

## running games

### PortProton

i mainly use [PortProton](https://flathub.org/apps/ru.linux_gaming.PortProton) to manage my prefixes, per-game settings, and launching games with proton. i find it a bit easier to tweak settings and change proton versions compared to lutris or steam.

to force japanese local: at the game menu, click "Settings" > "Base settings" > "Advanced". next to "Force certain locale for an app:" select "ja_JP.utf"

most games can be run using the all-purpose "VNS" prefix with some form of Proton-GE. i usually test games with the latest version, 9-27, then normal wine (they start with WINE-LG if downloading though PortProton) before creating a separate prefix to troubleshoot the issue, then stick with the same proton version until finishing the game.

once the game starts, the portproton icon will appear in the system tray. the .exe of the text hooker of choice can be started from either "winefile" or "taskmgr".

### other launchers

if using lutris, read [this section](https://learnjapanese.moe/vn-linux/#install-run-the-visual-novel) of TheMoeWay guide linked above on how to add installed games to lutris and [this section](https://learnjapanese.moe/vn-linux/#set-up-textractor-to-launch-with-vn) on how to get your texthooker of choice to launch automatically.

i like to use [cartridges](https://codeberg.org/kramo/cartridges) to manage all of my games (not just visual novels). to add a game manually, can use `xdg-open` or `gio open` with a link to the game .exe to open in the default app for launching .exe files. you can also launch the game with your distro's installed version of wine in a specific prefix using the `wine` command:

```bash
WINEPREFIX="~/.var/app/ru.linux_gaming.PortProton/prefixes/DEFAULT" wine '~/Games/Folder/GameName.exe'
```

### games crashing

sometimes games will crash if a prefix is missing the necessary codec to play video in game. information on what codec is necessary for a given game may be posted at [protondb](https://www.protondb.com/) if the game is on steam or [this archived compatibility list](https://web.archive.org/web/20240919002026mp_/https://www.visualnovelwiki.org/en/vns) from visualnovelwiki.

codecs can be installed through winetricks or [vn_winestuff](https://github.com/b-fission/vn_winestuff). more info on how to use the script can be found [here](https://web.archive.org/web/20240919002026mp_/https://www.visualnovelwiki.org/en/linux/special-codec). an example for use with a prefix made by PortProton:

```bash
git clone https://github.com/b-fission/vn_winestuff.git
cd vn_winestuff
WINEPREFIX=~/.var/app/ru.linux_gaming.PortProton/prefixes/TEST ./codec.sh wmp11 quartz2
```

### force use of dGPU

most visual novels are openGL and will default to running on iGPU. if launching game through PortProton, can force openGL games to run on dGPU byt clicking "Settings" > "Base settings" and turning on "Use Native Wayland". if opening directly from the command line or another game manager, add `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia` to the front of the command.

## texthooking

### texthookers

my preferred texthookers in order are agent > lunahook > lunatranslator.

#### agent

[agent](https://github.com/0xDC00/agent) uses javascript to hook games. while most texthookers can only hook visual novels, agent can hook a wider range of games so long as a [script](https://github.com/0xDC00/scripts) for the game has been written. 

while other texthookers only support windows, the linux version of agent can be used with yuzu to hook emulated switch games. agent can only be used with certain builds of emulators, which can be found [here](https://github.com/koukdw/emulators/releases/tag/working). so far i haven't had luck with getting the linux version of agent to hook the linux versions of vita3k and pcsx2. if hooking a windows game or emulator, need to run the windows version of agent.

#### lunahook

[lunahook](https://web.archive.org/web/20250331024706/https://github.com/HIllya51/LunaHook) is just the texthooking part of the larger [lunatranslator](https://github.com/HIllya51/LunaTranslator/blob/main/.github/README_en.md) program. it is meant to replace the no longer developed program [textractor](https://github.com/Artikash/Textractor). the lunatranslator developer no longer builds lunahook separately, but version 5.0.0 can be found [here](https://github.com/Crumbler/LunaHookFork/releases/tag/v5.0.0) and version 6.3.3 can be found [here](https://github.com/Tathagata-0/LunaTranslator/releases) (use the Release_English version, the regular Release version crashes for me). be sure to download the plugins too. most games are 32-bit so you'll usually use `LunaHost32.exe`, but some games (like games built with ren'py) are 64-bit.

lunahook automatically finds potential hooks based on the engine the game was written in. if the right hook isn't found, you can make it search for a hook manually by typing the text currently on the screen or starting the search, advancing the text, and letting lunahook search for potential addresses the text info could be stored.

#### lunatranslator

[lunatranslator](https://github.com/HIllya51/LunaTranslator/blob/main/.github/README_en.md) can texthook games as well as use ocr. i find it prone to crashing when running through wine, so i reach for it last. it has a feature where you can set it to ocr part of the screen and rescan automatically based on button presses or screen change. i mainly use this with old emulated games that use non-standard text encoding, as hooking them isn't as straightforward as games that use a standard encoding. the ocr feature works with any part of the screen, so it can be used with an emulated game running in linux.

### steam games

since steam games are installed into their own prefix, and texthookers need to run in the same instance as the game, need to use special tools to run other programs at same time as launching a game from steam.

for detailed instructions on how to launch a text hooker with a steam game (works with texthookers that aren't agent as well): [LINUX GUIDE How to use text hooker (Agent) with Steam Flatpak](https://www.reddit.com/r/visualnovels/comments/15wv7h1/linux_guide_how_to_use_text_hooker_agent_with/)

tldr: after installing [SteamTinkerLauncher](https://github.com/sonic2kk/steamtinkerlaunch), open properties > compatibility then set the compatibility tool to Steam Tinker Launcher. open the game, click main menu, click game menu, click misc options, then set the desired text hooker as a custom command and click fork custom command.

may need to add font files to game prefix at `drive_c/windows/Fonts`.

### Hcodes

if unable to hook automatically, agent and textractor support using Hcodes. can be found from the following sources:

- [H-Code \| Visual Novel Text Hooking Wiki \| Fandom](https://web.archive.org/web/20210116003921/https://vn-hooking.fandom.com/wiki/H-Code)
- [Japanese Visual Novel Hook Codes.pdf - Google Drive](https://drive.google.com/file/d/13amn4LzLDUPmXBO_rfO3eQ0piKpGCvth/view?pli=1)
- sometimes people post hcodes in the discussion section of a game's [vndb](https://vndb.org/) page

### filtering text

using lunahook or textractor, can use the plugin 'Regex Filter' to remove unwanted characters. examples:

- `\s` (filters all whitespace)
- `[\u0021-\u00ff]` (filters all european language and most special characters)
- `[\u0100-\uffff]` (filters all non european language characters)
- `[\u0000-\u2fff\ua000-\uffff]` (filters all non Chinese/Japanese/Korean characters)
- `<.+?>` (filters all HTML tags like `<p id="some_guid">` or `</span>`)

[FAQ · Artikash/Textractor Wiki · GitHub](https://github.com/Artikash/Textractor/wiki/FAQ#textractor-is-extracting-text-mostly-correctly-but-theres-some-extra-characters-as-markupgarbage-eg-a-n-in-place-of-every-line-break-is-there-a-way-to-clean-the-text)
