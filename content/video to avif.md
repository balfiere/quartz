---
tags: [site_building]
publish: true
---

# video to avif

i use avif files on my site wherever i want to convert a video to an animated image. avif files are significantly smaller than gifs while retaining much more quality, have pretty good support on modern browsers, can be used with the `img` html tag, and are able to be hosted on neocities even on free accounts.

the following method requires a version of ffmpeg which has the libsvtav1 encoder library. see [[updating ffmpeg]] for a link to the ffmpeg build i use (includes builds for windows, mac, and linux) as well as how to update ffmpeg on pop os and other debian based distros. you can also use [ezgif.com](https://ezgif.com/video-to-avif) to convert videos to avif. ezgif also supports converting gifs to avif, but if you have the original video file i would highly suggesting using that as the step from video to gif introduces a lot of extra noise, which if you then convert to avif would lead to a larger image size and worse quality than if you had converted the video straight to avif. if you color your gifs in photoshop, you can export to mp4 instead of gif.

## basic command

```bash
ffmpeg -hide_banner -i "input.mkv" -c:v libsvtav1 "output.avif"
```

with scaling and time trimming

```bash
ffmpeg -hide_banner -ss 11.736986301369864 -to 24.095362 -i "input.mp4" -vf "scale=640:-2" -c:v libsvtav1 "output.avif"
```

## batch convert 

### windows

when i used windows i kept the following in a .ps1 file

```bash
foreach ($f in gci *.mp4) { ffmpeg -hide_banner -i $f -c:v libsvtav1 "$($f.basename).avif" }
```

### linux

```bash
for f in *.mp4; do ffmpeg -i "$f" -c:v libsvtav1 "$("$f".basename).avif"; done
```