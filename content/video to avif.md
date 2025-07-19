---
created: 2025-07-18T17:54:40.4040-05:00
modified: 2025-07-19T14:47:01.011-05:00
tags: [site_building]
publish: true
---


i use avif files on my site wherever i want to convert a video to an animated image. avif files are significantly smaller than gifs while retaining much more quality, have pretty good support on modern browsers, can be used with the `img` html tag, and are able to be hosted on neocities even on free accounts. the backgrounds for my [places](/places) page, for example, default to jpg then switch to avif if the detected browser supports the format.

the following method requires a version of ffmpeg which has the libsvtav1 encoder library. see [[updating ffmpeg]] for a link to the ffmpeg build i use (includes builds for windows and linux) as well as how to update ffmpeg on pop os and other debian based distros. you can also use [ezgif.com](https://ezgif.com/video-to-avif) to convert videos to avif. ezgif also supports converting gifs to avif, but if you have the original video file i would highly suggesting using that as the step from video to gif introduces a lot of extra noise, which if you then convert to avif would lead to a larger image size and worse quality than if you had converted the video straight to avif. if you color your gifs in photoshop, you can export to mp4 instead of gif.

## basic command

```bash
ffmpeg -hide_banner -i "input.mkv" -c:v libsvtav1 "output.avif"
```

an example with time trimming and scaling

```bash
ffmpeg -hide_banner -ss 11.736986301369864 -to 24.095362 -i "input.mp4" -vf "scale=640:-2" -c:v libsvtav1 "output.avif"
```

an example with time trimming, cropping, scaling, and extra compression

```bash
ffmpeg -hide_banner -ss 00:00:26 -to 00:00:53 -i input.mp4 -vf "crop=in_w-4:in_h-22:2:0,scale=850:-2" -c:v libsvtav1 -crf 40 -preset 6 "output.avif"
```

## batch convert 

### windows

when i used windows i kept the following in a .ps1 file

```powershell
foreach ($f in gci *.mp4) { ffmpeg -hide_banner -i $f -c:v libsvtav1 "$($f.basename).avif" }
```

### linux

```bash
for f in *.mp4; do ffmpeg -i "$f" -c:v libsvtav1 "$("$f".basename).avif"; done
```