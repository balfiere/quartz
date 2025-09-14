---
tags:
  - site_building/accessibility
  - site_building/html_css
publish: true
created: 2025-09-02T23:46:18.1818-05:00

updated: 2025-09-13T23:56:57.5757-05:00
---

# preventing gif autoplay

there are multiple ways to stop gifs from autoplaying on a webpage. i've seen a lot of people on neocities using [freezeframe.js](https://github.com/ctrl-freaks/freezeframe.js), but in my experience gifs can still play until the page is fully loaded. on pages with lots of gifs, that's still a lot of animation that can get played, so here's my preference on how to get around the issue.

## prefers-reduced-motion

`prefers-reduced-motion` is a media feature that detects when the user has a setting enabled in their operating system that limits the amount of animation. you can combine it with the `<picture>` tag to load in a still image whenever the user has this feature enabled. basically it looks like this:

```html
<picture>
	<source srcSet="images/image.png" media="(prefers-reduced-motion)" />
	<img src="images/image.gif" />
</picture>
```

> [!warning]
> there must not be any spaces inside of `srcSet`. if there's a space in a folder or file name inside of the path, replace it with `%20`

`image.png` will be loaded instead of `image.gif` if the user has this feature enabled. the drawback of this method is that each gif must be converted to a png (you could also use other file formats, but png will retain the transparency). i've described how to do this using ImageMagick [[most used imageMagick commands#extract first frame of a gif|here]], and i've shared the scripts i've used to write a folder of gifs to the html code described above [[batch print images in a folder to html|here]].

you can test if this is working by opening your page in a chromium browser, inspecting the page, pressing ctrl-shift-p (or clicking on the 3 dots on the upper right corner and selecting `Run command`), searching `reduced`, and selecting `Emulate CSS prefers-reduced-motion: reduce`.