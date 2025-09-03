---
tags: [site_building]
publish: true
created: 2025-09-02T23:51:07.077-05:00
modified: 2025-09-02T23:59:35.3535-05:00
---

the following commands are the most common [ImageMagick](https://imagemagick.org/) commands i use. when i used windows 11 i needed to add `magick` first (so for example `magick mogrify -format jpg image.png`) for the commands to work but i can use commands like `mogrify`, `convert`, etc directly in linux.

## compression

i compress images so pages load faster and my site stays within the 1gb limit. the most common command i use is

```
mogrify -resize 800> -format jpg -quality 80 -strip *.heic
```

which i use for images on my [microblog](https://kwaamfan.neocities.org/microblog/) taken from my phone. my images usually end up a tenth of their original size. `strip` removes metadata such as the location where photos were taken. replace `heic` with the format of the images you want to convert. if i find the result to be too blurry i use

```bash
for file in *.heic; do magick "$file" +sigmoidal-contrast 6.5,50% -filter Lanczos -distort Resize x800\> -unsharp 0.75x0.75+0.5+0.02 -sigmoidal-contrast 6.5,50% -format jpg -quality 90 -strip "${file%.*}.jpg"; done
```

which is much slower but adds a bit of sharpening and helps to preserve the depth of color.

## extract first frame of a gif

within a folder, the following command

```
mogrify -format png *.gif[0]
```

extracts the first frame of every gif in the folder and writes it to a png which uses the same file name.
