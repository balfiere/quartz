---
created: 2025-07-18T16:49:59.5959-05:00
modified: 2025-07-19T14:30:37.3737-05:00
publish: true
title: hiding hard subtitles
tags: [language_learning, linux]
---


i use [subtitle hider](https://github.com/Bennycopter/subtitle-hider) to blur english subtitles hardcoded into videos i want to watch in a language i'm learning. since it creates a new window, it's compatible with any video player app, website, etc.

in hyprland, i use the following settings to launch the program with a keybind using my preferred settings and location. (the title has been changed from `main.py` to `subtitle_hider.py` and saved in `~/scripts`)

in my window rules configuration:

```bash
windowrule = float, title:subtitle_hider.py
windowrule = opacity 0.3 override 0.5 override, title:subtitle_hider.py
windowrule = xray 0, title:subtitle_hider.py
windowrule = noshadow, title:subtitle_hider.py
windowrule = noborder, title:subtitle_hider.py
windowrule = noblur, focus:1,title:subtitle_hider.py
windowrule = move onscreen 11% 71%, title:subtitle_hider.py
windowrule = size 78% 6%, title:subtitle_hider.py 
```

in my user binds configuration:

```bash
bind = $mainMod SHIFT, H, exec, python $HOME/scripts/subtitle_hider.py # launch window that blurs part of the screen (for hiding hard subs)
```

this is what it looks like in action. you can see that on hover the blur effect is turned off and it can be freely moved and resized. the color of the window can be set to white, black, or transparent (blur only).

![[blursubtitles.avif]]

video: [บุกญี่ปุ่น หลัง Lost Decades เศรษฐกิจหลุดเงามืดแล้ว จริงหรือไม่ ? \| INSIGHTS ON JAPAN ECONOMY EP.1 - YouTube](https://youtu.be/8i_iCxQjw-A)

program to show keystrokes: [GitHub - AlynxZhou/showmethekey: Show keys you typed on screen.](https://github.com/AlynxZhou/showmethekey)