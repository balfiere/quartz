---
tags:
  - html_css
  - site_building
publish: true
created: 2025-09-03T00:15:50.5050-05:00
modified: 2025-09-13T00:10:14.1414-05:00
---

you can create collapsible sections in html without javascript by using the `details` tag. here's how i style my `details` and `summary` tag to make it look the same as my normal headers.

here's what the html looks like.

```html
<details>
	<summary class="h2">h2 level header</summary>
	text under collapsed header
	<details>
		<summary class="h3">h3 level header</summary>
		you can even nest details
	</details>
</details>
```

here's the relevant css i use to style it.

```css
h2, .h2 {
/* style your header however you want, just add a class with the same name */
}

h3, .h3{
/* do the same with the other header levels you want to use */
}

summary {
	cursor: pointer; /* lets the user know your header is clickable */
	display: flex; /* if you replace the built in arrow, this will align the items next to each other */
	align-items: center; /* align the text and the replacement arrow vertically */
}

summary::before {
	content: '';
	background: url('images/plus.png') no-repeat; /* an image to help indicate that the header is collapsible */
	width: 9px; height: 10px; /* use the dimensions of the image */
}

details[open] > summary::before {
	background: url('images/min.png') no-repeat; /* when the details tag is open, change the image */
}

summary::-webkit-details-marker {
	display: none; /* hide the original arrow */
}
```
