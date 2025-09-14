---
tags:
  - media/image
  - scripts
  - site_building
publish: true
created: 2025-09-02T23:47:12.1212-05:00

updated: 2025-09-13T23:56:57.5757-05:00
---

# batch print images in a folder to html

i use a script to batch write all gifs in a folder to html, using the `<picture>` tag and `media="(prefers-reduced-motion)"` to load a png if the user [[preventing gif autoplay#prefers-reduced-motion|prefers reduced motion]].

the following scripts are what i use for my toybox page. i have a folder `main` which includes `pixels.html` (the html page where i put the code outputted by the following scripts) and the folders `images/pixels`. inside the `pixels` folder i have separate folders for each show, game, or other category where i keep the pixels.

the scripts output a file called `gif.txt`, which i then open and copy with a text editor, then paste where i want it in `pixels.html`. lastly i manually add alt text and a link to the image source.

## windows

in windows i used a .cmd file with the following text inside. if i remember correctly it should run if you double click the file; if not there should be an option to run it in the terminal or powershell or something if you right click it.

```powershell
for %%I in (.) do set CurrDirName=%%~nxI
for %%j in (*.GIF) do echo ^<picture^>^<source srcSet=^"images/pixels/^%CurrDirName%^/%%~nj.png^" media=^"^(prefers-reduced-motion)^" ^/^>^<img src=^"images/pixels/^%CurrDirName%^/%%j^" ^/^>^<^/picture^>  >> gif.txt
```

then i use ImageMagick to [[most used imageMagick commands#extract first frame of a gif|batch extract the first frame of a folder of gifs]].

## linux

in linux (pretty sure this works w all distros and should also work with mac) i use a .sh file with the following text inside. be sure to allow to execute as a program (right click the file, it should be under properties). then you can run it by right clicking and run as program, or with the command line by `~/scripts/gifToHtml.sh` (assuming the script is called gifToHtml.sh and located in a folder titled `scripts` in the home directory). this script converts gifs to png if a png file with the same name doesn't exist.

```bash
#!/bin/bash

# get the current folder name
current_folder=$(basename "$PWD")

# remove old gif.txt
if [ -f gif.txt ]; then
  rm gif.txt
fi

# loop through all GIF files in the current directory
for file in *.gif; do

  # get the file name
  file_name="${file##*/}"

  # get the file name without the extension
  file_name_without_extension="${file_name%.*}"

  # if there isn't a png with the same name, convert the gif
  if [ ! -f "$file_name_without_extension.png" ]; then
    mogrify -format png "$file"[0]
  fi

  # print in html format
  echo "<picture><source srcSet=\"images/pixels/${current_folder}/$file_name_without_extension.png\" media=\"(prefers-reduced-motion)\" /><img src=\"images/pixels/${current_folder}/$file_name\" /></picture>" >> gif.txt
done
```
