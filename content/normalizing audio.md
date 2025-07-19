---
tags:
  - linux
  - language_learning
publish: true
---

# normalizing audio

i use ffmpeg to normalize the audio of my media files, particularly anything i want to [sentence mine](https://tatsumoto-ren.github.io/blog/sentence-mining.html). i also like to normalize my anki media folder every month or so. be sure you're on an up-to-date build of ffmpeg to use the following methods. (see [[updating ffmpeg]] for how i updated ffmpeg on pop os, which should work on other debian based distributions)

## batch normalize audio files

to batch normalize audio files, install [ffmpeg-normalize](https://github.com/slhck/ffmpeg-normalize) using `pip install ffmpeg-normalize`. inside the folder, run"

```bash
ffmpeg-normalize *.mp3 -c:a libmp3lame -ext mp3 -pr
```

[mp3gain](https://mp3gain.sourceforge.net/index.php) can be used change gain without the need to reencode the track. i like to use this in my anki media folder since it is much faster than ffmpeg-normalize. the link has downloads for windows, but on linux it can be installed from your distro's repository. to run from the command line:

```bash
mp3gain -r -k -s r *.mp3
```

## normalize video audio

for a single video:

```bash
ffmpeg -i infile.mp4 -filter:a speechnorm,loudnorm -c:a ac3 -c:v copy out.mp4 
```

to run the above command on a whole folder in linux or mac, use:

```bash
for i in *.mkv; do ffmpeg -i "$i" -filter:a speechnorm,loudnorm -c:a ac3 -c:v copy "normalized/$i"; done
```

or

```bash
ffmpeg-normalize *.mkv -c:a ac3 --dynamic --progress
```

the normalized videos will have the same name but will be in the subfolder titled "normalized"
