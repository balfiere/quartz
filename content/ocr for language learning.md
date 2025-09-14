---
tags:
  - language_learning
  - linux
  - scripts
publish: true
created: 2025-07-19T20:26:46.4646-05:00

aliases:
  - ocr
updated: 2025-09-13T23:56:57.5757-05:00
---

# ocr for language learning

the following are the programs and scripts i use to make looking up words easier when reading manga, webtoons, or books in pdf format.

## screenshots (for cartoons)

i mainly use two methods for ocr: the [pot app](https://pot-app.com/en) and [huggingface spaces](https://huggingface.co/spaces?category=ocr) through api. pot defaults to using the ocr built into the system (for linux, [tesseract](https://github.com/tesseract-ocr/tesseract)) which doesn't require internet but takes up more space on your computer and can be slow on older hardware. it also supports using online ocr services. using a huggingface space through api requires internet access and some scripting knowledge but some of the models are more fine-tuned for certain types of text, producing better results. if you don't want to use the api, they can still be used it the browser by uploading a screenshot.

when i was using windows i used [capture2text](https://capture2text.sourceforge.net/) which also uses tesseract to ocr images and supports keybinds + sending to clipboard which can be combined with [[goldendict]]'s or yomitan's clipboard monitoring to make lookups fast.

### pot

after installing pot, its icon should appear in the system tray. then simply click on the icon, click "ocr recognize", select the region, and a window should pop with the text extracted. the ocr engine and language can be changed from here. if auto copy is turned on in the settings and [[goldendict]] clipboard monitoring is turned on, then words can be looked up from manga, cartoons, etc in a few clicks from any application.

on wayland, selecting "ocr recognize" from the app currently doesn't work. i bind the following script to SUPER+S to use pot:

```bash
#!/bin/bash

# check if pot is running
if ! pidof pot
then
	# open pot first
	~/Applications/pot.appimage &
fi

# remove old screenshot
rm ~/.cache/com.pot-app.desktop/pot_screenshot_cut.png

# open screenshot gui
grimblast --notify save area ~/.cache/com.pot-app.desktop/pot_screenshot_cut.png

# open screenshot in pot
curl "127.0.0.1:60828/ocr_recognize?screenshot=false"
```

if not using hyprland, change the `grimblast` line with `flameshot gui -s -p ~/.cache/com.pot-app.desktop/pot_screenshot_cut.png` to use flameshot, or replace it with the screenshot tool of your choice.

### huggingface spaces

at the bottom of most huggingface spaces, there should be link on how to use the space via api with bash, python, and javascript. i mainly use the [Thai OCR with TrOCR](https://huggingface.co/spaces/phoner45/thai-ocr-img) space since it seems to work much better than pot + tesseract for handwritten-type fonts common in manga and manhwa. this is the python script i use with that space. it takes a screenshot of an area of the screen using grimblast, sends the image to the huggingface space to be processed, returns the output as a string, and sends the string to [[goldendict]]:

```python
#!/usr/bin/env python

from gradio_client import Client, handle_file
import subprocess

# remove old screenshot
subprocess.run(["rm", "~/Pictures/Screenshots/thaiOCR.png"]) 

# take screenshot
subprocess.run(["grimblast", "--notify", "save", "area", "~/Pictures/Screenshots/thaiOCR.png"])

# run ocr in huggingface space: https://huggingface.co/spaces/phoner45/thai-ocr-img
# works best if text only spans one line
client = Client("phoner45/thai-ocr-img")
result = client.predict(
		image=handle_file('~/Pictures/Screenshots/thaiOCR.png'),
		api_name="/predict"
)

# open ocr result in goldendict-ng
subprocess.run(["goldendict-ng", result])
```

in hyprland i have `bind = $mainMod SHIFT, S, exec, python ~/scripts/thaiTrOCR.py` added to my keybind configuration file so that i can ocr an image and get a definition to pop up all with a single keystroke.

## whole documents (for books)

### removing watermarks

when i checkout ebooks from [tk park](https://read.tkpark.or.th/), they put a watermark over every page of the book which can mess with ocr results. to remove a simple gray watermark from a black and white book, in a folder of images where each image is a page use

```bash
mkdir converted
for f in  *.png; do magick "$f" -sigmoidal-contrast 21,57% converted/"$f" ; done
```

to remove the watermark. it has better results with anti-aliasing around words vs replacing color directly, but you can still fall back on direct color replacement + fuzz:

```bash
for f in  *.png; do magick "$f" -fuzz 15% -fill white -opaque '#DEDFE0' converted/"$f" ; done
```

### pdf

entire pdfs can be ocr'd using [ocrmypdf](https://ocrmypdf.readthedocs.io/en/latest/) on linux, windows, and mac. in the directory with the pdf, type `ocrmypdf 'my input pdf.pdf' 'my output pdf.pdf' -l eng`. uses tesseract to ocr. can use `-c` to clean the pages before scanning, and `-i` to incorporate the cleaning into the final pdf. the selectable text is applied as an invisible layer on top of the pdf and can be extracted as a separate text file using the `sidecar` option.

the following is an example that cleans and deskews `in.pdf`, ocr's pages 3 through 326 in thai, produces a text file `output.txt` with only the ocr'd text, and applies the maximum amount of compression to the output file `ocr.pdf`.

```bash
ocrmypdf -l tha --clean --deskew --optimize 3 --pages 3-326 --sidecar output.txt --pdf-renderer=sandwich in.pdf ocr.pdf
```

#### image to pdf

if you have a folder of images that you want to turn into a pdf first, here are two methods:

```bash
# fast
img2pdf *.png -o processed.pdf

# imagemagick only
magick *.png -quality 100 processed.pdf
```

### thai only: python_thai_ocr

i typically prefer using [python_thai_ocr](https://github.com/nanonymoussu/python_thai_ocr/tree/main) over `ocrmypdf`, i find it gives more accurate results (even though they both use tesseract… idk what's up with that). the github page has instructions on how to use it, but i find that it often crashes and uses tons of cpu power when running on pdfs compared to images. to bypass the issue, i instead turn the pdf into a folder of images (if they aren't already just images) and simply run a script that processes each image individually, appending the output of each page to a text file: 

```bash
#!/bin/bash

# first argument is the output file
output=$1

# remove the output file if it already exists
rm -f "$output"

# create the output file
touch "$output"

# page counter
i=0

# process each image in the current directory
shopt -s nocaseglob
shopt -s nullglob
for f in *.{jpg,jpeg,tiff,bmp,png}
do
    # increase the page counter
    i=$((i+1))

    # process the image and save output to temporary file
    # uses https://github.com/nanonymoussu/python_thai_ocr
    python $HOME/python_thai_ocr/main.py "$f" temp

    # add page header
    echo -e "✧˖°─ .✦──── ･ ｡ﾟ⟡ ☽ Page ${i} ☾ ⟡ ˚｡ ･ ────✦.─ °˖✧\n" | cat >> "$output" # cute version (more at https://emojicombos.com/divider)
    # echo -e "===============Page ${i}===============\n"  | cat >> "$output" # boring version

    # add page content
    cat temp >> "$output"

    # add empty lines at end of page
    echo -e "\n\n" | cat >> "$output"

done

# remove temporary file
rm temp
```

if the script is saved to `~/scripts/thai_images2ocr` then it can be run by moving the working directory to the folder with the images and running `~/scripts/thai_images2ocr ocr.txt `.