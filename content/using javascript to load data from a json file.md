---
publish: true
title: using javascript to load data from a json file
tags:
  - json
  - programming/javascript
  - site_building
  - tutorial
created: 2025-09-13T23:18:39.3939-05:00
updated: 2025-09-13T23:56:57.5757-05:00
---

# using javascript to load data from a json file

this is a tutorial on how i load data stored in a [[json]] file to my site's main page using javascript. you should have a basic understanding of the following javascript concepts: [objects](https://www.w3schools.com/js/js_objects.asp), [arrays](https://www.w3schools.com/js/js_arrays.asp), [loops](https://www.w3schools.com/js/js_loops.asp), and [DOM methods](https://www.w3schools.com/js/js_htmldom_methods.asp), although i've tried to explain things so that a beginner can follow along and added links for extra reading.

## pros and cons

for reasons to store your site's content in json format, see [[json#why use json on my site?]]

the main drawback of this method is that it uses javascript, which will decrease the performance of the page slightly and cannot be seen by people with javascript disabled. i personally only use this method on my main page inside the floating windows, as i consider the info not critical to enjoy my site, and i hide these windows for users with javascript disabled anyways. if you still want to use json but don't want to add more javascript to your site, or you find javascript confusing, i've written a tutorial on [[building a web page with json data using 11ty|how i use 11ty to print data from a json file to my site]]. while there is much more initial setup involved in using a static site generator, i think the syntax of templating languages like liquid is easier for non-programmers to understand. static site generators also have other benefits like making it easy to use the same template across multiple pages and being able to convert file formats like markdown to html.

note that when you save changes to the json file, the changes will be reflected the next time someone visits the page that uses it, but your neocities preview won't be updated. whether this is a pro or con is up to you.

## the json file

for this tutorial i'll be explaining how i load the following things with javascript:

- my site to-do list
- what i'm currently playing, reading, and watching
- my button wall

i store all the data in one json file that looks like this:

```json
{
	"todo": [
		"to do 1",
		"to do 2"
	],
	"done": [
		"finished to do 1",
		"finished to do 2"
	],
	"currently": {
		"playing": [
			"game 1",
			"game 2"
		],
		"reading": [
			"book"
		],
		"watching": [ ]
	},
	"buttons": [
		["filename1", "button 1 alt text", 0],
		["filename2", "button 2 alt text", 1, "url2"],
		["filename3", "button 3 alt text", 0, "url3"],
		["filename4", "button 4 alt text", 1]
	]
}
```

for this example it will be called `data.json` and located in the root directory of the html page it will be loaded into.

## loading the json file

just before the `</body>`, insert `<script src="script.js"></script>`. then create a new file called `script.js` in the page's root directory. in your new javascript file, add

```js
async function fetchJsonData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const myJsonData = await response.json();
		
		// code goes here

    } catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

fetchJsonData();
```

`fetch()` loads the given file. the `if (!response.ok)` and `.catch(error)` bits are just for debugging errors. the actual programming we'll be doing will be after `const myJsonData = await response.json();`.

when we load the json file, we created a new [object](https://www.w3schools.com/js/js_objects.asp). in this example it'll be called `myJsonData`, but you could call it something else.

## loading a to-do list

since i want my to-do list to be an unordered list, in the html file i have

```html
<ul id="todo"></ul>
``` 

where i want my to-do list to appear. it's important to add an `id` to the element, since that's how our javascript function knows what to element to add our data to. make sure no other element on your page has the same `id`! to select the element with the `id` equal to `todo`, use the `getElementById` method like so:

```js
const todoList = document.getElementById('todo');
```

to build our to-do list we'll add a new `<li>` element for each entry of two different arrays in `data.json`: the `todo` array and `done` array.

### unfinished items

let's start with the `todo` array. this is the list of things not yet finished. to return this array we need to call it using the syntax `myJsonData.todo`. to loop through each element of the array we'll use the [forEach() array method](https://www.w3schools.com/jsref/jsref_foreach.asp):

```js
myJsonData.todo.forEach(item => {
	// the function here will be applied to each
	// element in the todo array
})
```

`item` is the value of `myJsonData.todo[i]` at iteration `i`. inside the function we want to create a new `<li>` element. we can use the [createElement() DOM method](https://www.w3schools.com/jsref/met_document_createelement.asp) to do so:

```js
const todoItem = document.createElement('li')
```

now we've created a new `<li>` element, but it's currently empty. to add our to-do list entry `item` inside of this new element, we need to set the [textContent property](https://www.w3schools.com/jsref/prop_node_textcontent.asp) of this newly created element to `item`.

```js
todoItem.textContent = item;
```

now that we have our element `<li>to do 1</li>`, we need to put it inside of `<ul id="todo"></ul>`, adding it to the end if there are other elements already inside it. to do so we'll use the [appendChild() DOM element method](https://www.w3schools.com/jsref/met_node_appendchild.asp):

```js
todoList.appendChild(todoItem);
```

our final loop looks like this:

```js
myJsonData.todo.forEach(item => {
	const todoItem = document.createElement('li');
	todoItem.textContent = item;
	todoList.appendChild(todoItem);
})
```

when the page is loaded, the DOM will look like this:

```html
<ul id="todo">
	<li>to do 1</li>
	<li>to do 2</li>
</ul>
```

### finished items

the for loop for the `done` array will look much the same, with one major difference: we want to wrap the finished entry with `<del>` tags so they have a strike through them. to do so we'll need to use `createElement` for both `<li>` and `<del>`:

```js
myJsonData.done.forEach(item => {
	const todoItem = document.createElement('li');
	const strikedItem = document.createElement('del');
})
```

since `<del>` will be inside of `<li>`, we need to set the text content of `<del>` to be the entry, then put `<del>finished to do 1</del>` inside of `<li>`:

```js
strikedItem.textContent = item;
todoItem.appendChild(strikedItem);
```

then, just like for `todo.forEach` loop, we'll append the `<li>` element to `<ul id="todo">`. the final loop will look like so:

```js
myJsonData.done.forEach(item => {
	const todoItem = document.createElement('li');
	const strikedItem = document.createElement('del');
	strikedItem.textContent = item;
	todoItem.appendChild(strikedItem);
	todoList.appendChild(todoItem);
})
```

### result

our javascript file currently looks like

```js
async function fetchJsonData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const myJsonData = await response.json();
		
		const todoList = document.getElementById('todo');
	    myJsonData.todo.forEach(item => {
		    const todoItem = document.createElement('li');
		    todoItem.textContent = item;
		    todoList.appendChild(todoItem);
	    })
		myJsonData.done.forEach(item => {
		    const todoItem = document.createElement('li');
			const strikedItem = document.createElement('del');
		    strikedItem.textContent = item;
		    todoItem.appendChild(strikedItem);
		    todoList.appendChild(todoItem);
	    })

    } catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

fetchJsonData();
```

when the page is loaded, the DOM will look like this:

```html
<ul id="todo">
    <li>to do 1</li>
    <li>to do 2</li>
    <li><del>finished to do 1</del></li>
    <li><del>finished to do 2</del></li>
</ul>
```

## loading a currently doing list

in my html file i have

```html
<div id="currently">
	playing:
	<ul id="playing"></ul>
	reading:
	<ul id="reading"></ul>
	watching:
	<ul id="watching"></ul>
</div>
```

in much the same way as the to-do list, we want to create a new `<li>` element for each entry of our currently doing lists. however, if we aren't currently doing something in a given category, we want to print some other message. in addition, i'll also demonstrate how you can loop through an object that isn't an array.

### looping through an object

as a reminder, this is what the json of the data we'll be working with looks like:

```json
"currently": {
	"playing": [
		"game 1",
		"game 2"
	],
	"reading": [
		"book"
	],
	"watching": [ ]
}
```

i put each array of stuff i'm currently doing inside an object called `currently`. furthermore, i made sure the name of each array is the same as the `id` of the element i want to put the data into. this allows us to loop through all the properties of `myJsonData.currently` using the [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) method:

```js
for (const [key, value] of Object.entries(myJsonData.currently)) {
	// do some stuff to your arrays here
})
```

the declaration `const [key, value]` allows us to use the "key", the name of the property, and its value inside of the statement. so for the first time the loop is executed, `key` is equal to `playing` and `value` is equal to the array `["game 1", "game 2"]`.

remember how in the to-do list example we got the element `<ul id="todo">` by explicitly using the word `todo`? now we'll be using the variable that stores the property name `key` to get this element. we can do so because our `key`s are the same as the `id`s we want to use them with:

```js
const currentlyList = document.getElementById(key);
```

### if-else statements

now we need to determine if our array is empty or not, as what we add to our `<ul>` will differ. we can use an if statement like so:

```js
if (value.length == 0) {
	// if the array is empty, do something
} else {
	// if the array is not empty, do something else
}
```

`value` is the array of the current property, and `.length` is how many elements it has. if there are no elements, the `length` is 0 and indicates that i'm not currently doing anything for that category. in that case, instead of just leaving it blank let's still create a new `<li>` element and set the text content to be the string `nothing </3`:

```js
const currentlyItem = document.createElement('li');
currentlyItem.textContent = "nothing </3";
currentlyList.appendChild(currentlyItem);
```

if the array is not empty, the code will be the same as the unfinished to-do list describe previously, except that we'll get the array using the variable `value`.

### result

the final function for loading the currently list is

```js
for (const [key, value] of Object.entries(myJsonData.currently)) {
	const currentlyList = document.getElementById(key);
	if (value.length == 0) {
		const currentlyItem = document.createElement('li');
		currentlyItem.textContent = "nothing </3";
		currentlyList.appendChild(currentlyItem);
	} else {
		value.forEach(item => {
			const currentlyItem = document.createElement('li');
			currentlyItem.textContent = item;
			currentlyList.appendChild(currentlyItem);
		});
	}
})
```

the resulting html will look like

```html
<div id="currently">
	playing:
	<ul id="playing">
		<li>game 1</li>
		<li>game 2</li>
	</ul>
	reading:
	<ul id="reading">
		<li>book</li>
	</ul>
	watching:
	<ul id="watching">
		<li>nothing </3</li>
	</ul>
</div>
```

> [!NOTE] side note
> if the whole `Objects.entries` for loop stuff is confusing, you could write a function that takes `id` of the element you want to put your data inside of as one argument and the array with your data as another. if you can't or don't want the `id` to match your array, and there isn't a [string method](https://www.w3schools.com/jsref/jsref_obj_string.asp) that can map one from the other, then such a method would be preferable. the downside of doing so is that you would need to call the function for each category. if you want to add another category in the future, you would need update the html, json, and javascript files. if you use `Object.entries`, there is no need to update the javascript file.

## loading a button wall

unlike the lists described above, the html of each button can look different. that's because there are two things that can differ between buttons that determine how the html is formatted: if the button has a link, and if the button is animated. if the button has a link, then we want to wrap the whole image in an `<a>` tag. if the button is animated, we want to use a `<picture>` element instead of just a normal `<img>` element so we can load a png if the viewer [[preventing gif autoplay#prefers-reduced-motion|prefers reduced motion]]. to solve this issue, here's how i've formatted my json data:

```json
"buttons": [
	["filename1", "button 1 alt text", 0],
	["filename2", "button 2 alt text", 1, "url2"],
	["filename3", "button 3 alt text", 0, "url3"],
	["filename4", "button 4 alt text", 1]
]
```

the first two values are the filename without extension and alt text of the button. the third value is a boolean that represents whether the button is animated. the last value is the url if clicking the button is supposed to lead to another site. when we need to determine if a given button has a link, we'll check if `button[3]` exists; if not, we know it has no url.

we'll start with getting the container we want to hold our buttons `<div id="buttons">` and another `forEach()` loop:

```js
const buttonwall = document.getElementById('buttons');
myJsonData.buttons.forEach(button => {
	// do some stuff to each button array
})
```

### checking if the image is animated

next we'll create new elements inside the for loop. every button will use the `<img>` element with its alt text defined by the second value of the array. an html element's [attributes](https://www.w3schools.com/html/html_attributes.asp) (ex. `alt` and `src` are common attributes of the `img` element) can be accessed using a period plus the attribute name:

```js
const img = document.createElement('img');
img.alt = button[1];
```

next we need to determine if the button is animated. we can use an if statement to check if the third value is equal to 1. if the image is not animated, all we need to do is set the source of the `img`, so i've already included it:

```javascript
// if the button is animated (third value is 1)
if (button[2] == 1) {
	// build <picture>
} else {
	img.src = `images/88x31/${button[0]}.png`;
}
javascript```

`button[0]` is the filename without extension. to use it in a string so that the interpreter knows we want the value `button[0]` represents, we wrap it in curly brackets prefaced with a dollar sign. this command assumes that your button images are located in the folder `88x31` inside the folder `images` located in the root directory of your html page. furthermore, it assumes that all non-animated images are png files. since i typically need to use [[most used imageMagick commands|imageMagick]] to make still pngs when i save a new button anyways, i find it more convenient to store my button names in this format and convert the rare jpg when necessary. you could also store your filenames with extension and use `button[0].split('.')[0]` to get the file name without extension when necessary.

when the image is animated, i want my html to look like this:

```html
<picture>
	<source srcSet="images/image.png" media="(prefers-reduced-motion)" />
	<img src="images/image.gif" />
</picture>
```

we should begin by creating `<picture>` and `<source>` as usual, however we need to change one important part of the declaration:

```js
var picture = document.createElement('picture');
var source = document.createElement('source');
```

instead of using [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), we declared our variables using [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var). this is because even though we are making new variables inside of one block (the current if statement), we want to be able to access them inside of the next block we'll be creating. variables declared with `const` have their scope limited to the block they're made in. `var` variables are not scoped to block statements, so they can be used still be used in the next if statement. for an intro on the concept of scope, see [this page](https://www.w3schools.com/programming/prog_scope.php) by w3 schools; for more about how javascript specifically handles scope, see [this page](https://www.w3schools.com/js/js_scope.asp).

> [!note] side note
> instead of declaring `picture` and `source` inside of this if statement, we could've declared but not initialized them using [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) like so:
> ```js
> let picture;
> let source;
> ```
> after starting the for loop but before the if statement, then initialized them to the new elements if the button was animated.

we need to set the source set of the `source` element to filename.png, and [media attribute](https://www.w3schools.com/tags/att_source_media.asp) to (prefers-reduced-motion). this means that when the user has prefers reduced motion enabled on their device, the `source` element, the still version of the button, will be loaded. we also need to set the fallback image's source to filename.gif. this is the animated version of the button that gets loaded for most users. we can set these attributes like so:

```js
source.srcset = `images/88x31/${button[0]}.png`;
source.media = "(prefers-reduced-motion)";
img.src = `images/88x31/${button[0]}.gif`;
```

now we can put both `source` and `img` inside of `picture` like so:

```js
picture.appendChild(source);
picture.appendChild(img);
```

the final if statement looks like so:

```js
if (button[2] == 1) {
	var picture = document.createElement('picture');
	var source = document.createElement('source');
	source.srcset = `images/88x31/${button[0]}.png`;
	source.media = "(prefers-reduced-motion)";
	img.src = `images/88x31/${button[0]}.gif`;
	picture.appendChild(source);
	picture.appendChild(img);
} else {
	img.src = `images/88x31/${button[0]}.png`;
}
```

### checking if the image has a link

next we'll be checking if the button has a link. what element we append to the button wall changes based on if it has a link and if it's animated. the if statement will have the following structure:

```js
// if the button has a link (index 3 is not undefined)
if (button[3]) {
	// build <a> and put the button in it
	// then append <a> to the button wall
} else {
	// append the button to the button wall
}
```

let's start with the simpler case, if it does not have a link. in this case, we need to check if the button is animated. if so, we need to append `picture` to `buttonwall`; if not, we need to append `img`. inside of `else{}` we'll have:

```js
// if the button is animated (third value is 1)
if (button[2] == 1) {
	buttonwall.appendChild(picture);
} else {
	buttonwall.appendChild(img);
}
```

if the button does have a link, we need to create a new `a` element, then set its `href` attribute to the fourth value of our button array. optionally we can set the `target` element to `_blank` to open the link in a new tab:

```js
const link = document.createElement('a');
link.href = button[3];
link.target = "_blank";
```

next we need to put our button inside of our link. we can use the same logic that we had in the `else{}` statement to determine the right element to append, swapping out `buttonwall` for `link`:

```js
if (button[2] == 1) {
	link.appendChild(picture);
} else {
	link.appendChild(img);
}
```

lastly we need to append `link` to `buttonwall`:

```js
buttonwall.appendChild(link);
```

our final if statement looks like so:

```js
// if the button has a link (index 3 is not undefined)
if (button[3]) {
	const link = document.createElement('a');
	link.href = button[3];
	link.target = "_blank";
	// if the button is animated (third value is 1)
	if (button[2] == 1) {
		link.appendChild(picture);
	} else {
		link.appendChild(img);
	}
	buttonwall.appendChild(link);
} else {
	// if the button is animated (third value is 1)
	if (button[2] == 1) {
		buttonwall.appendChild(picture);
	} else {
		buttonwall.appendChild(img);
	}
}
```

### result

the final javascript function to load the button wall is

```js
const buttonwall = document.getElementById('buttons');
myJsonData.buttons.forEach(button => {
	const img = document.createElement('img');
	img.alt = button[1];
	// if the button is animated (third value is 1)
	if (button[2] == 1) {
		var picture = document.createElement('picture');
		var source = document.createElement('source');
		source.srcset = `images/88x31/${button[0]}.png`;
		source.media = "(prefers-reduced-motion)";
		img.src = `images/88x31/${button[0]}.gif`;
		picture.appendChild(source);
		picture.appendChild(img);
	} else {
		img.src = `images/88x31/${button[0]}.png`;
	}
	// if the button has a link (index 3 is not undefined)
	if (button[3]) {
		const link = document.createElement('a');
		link.href = button[3];
		link.target = "_blank";
		// if the button is animated (third value is 1)
		if (button[2] == 1) {
			link.appendChild(picture);
		} else {
			link.appendChild(img);
		}
		buttonwall.appendChild(link);
	} else {
		// if the button is animated (third value is 1)
		if (button[2] == 1) {
			buttonwall.appendChild(picture);
		} else {
			buttonwall.appendChild(img);
		}
	}
})
```

and the resulting html is

```html
<div id="buttons">
	<img src="images/88x31/filename1.png" alt="button 1 alt text">
	<a href="url2" target="_blank">
		<picture>
			<source srcset="images/88x31/filename2.png" media="(prefers-reduced-motion)">
			<img src="images/88x31/filename2.gif" alt="button 2 alt text">
		</picture>
	</a>
	<a href="url3" target="_blank">
		<img src="images/88x31/filename3.png" alt="button 3 alt text">
	</a>
	<picture>
		<source srcset="images/88x31/filename4.png" media="(prefers-reduced-motion)">
		<img src="images/88x31/filename4.gif" alt="button 4 alt text">
	</picture>
</div>
```

### bonus: using a function

while the javascript works in its current state, we could shorten it a bit further. there were two times where we appended the same container with a `<picture>` or `<img>` element depending on whether or not the button is animated. one time we appended an `<a>` element, the other time we appended `<div id="buttons">`. we could instead write a function that takes the relevant variables and does the comparison, then call the function when we need to determine what type of element we need. the function would look like this:

```js
function pictureOrImg(container, array, picture, img) {
	if (array[2] == 1) {
		container.appendChild(picture);
	} else {
		container.appendChild(img);
	}
}
```

we need to pass the container (`<a>` or `<div id="buttons">`), the `button` array, and the candidate elements to be appended `<picture>` and `<img>`. even though the only difference between the two times the function is called is the first argument, the function can't read variables created outside of its scope. therefore, all potential variables need to be passed to it, even if it doesn't get read like `picture` and `img`.

the modified javascript would look like this:

```js
function pictureOrImg(container, array, picture, img) {
	if (array[2] == 1) {
		container.appendChild(picture);
	} else {
		container.appendChild(img);
	}
}

const buttonwall = document.getElementById('buttons');

myJsonData.buttons.forEach(button => {
	const img = document.createElement('img');
	img.alt = button[1];
	let picture;
	let source;
	// if the button is animated (third value is 1)
	if (button[2] == 1) {
		source.srcset = `images/88x31/${button[0]}.png`;
		source.media = "(prefers-reduced-motion)";
		img.src = `images/88x31/${button[0]}.gif`;
		picture.appendChild(source);
		picture.appendChild(img);
	} else {
		img.src = `images/88x31/${button[0]}.png`;
	}
	// if the button has a link (index 3 is not undefined)
	if (button[3]) {
		const link = document.createElement('a');
		link.href = button[3];
		link.target = "_blank";
		pictureOrImg(link, button, picture, img);
		buttonwall.appendChild(link);
	} else {
		pictureOrImg(buttonwall, button, picture, img);
	}
})
```

## final script

the final javascript file `script.js` now looks like this:

```js
async function fetchJsonData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const myJsonData = await response.json();
        
        // to do list
        const todoList = document.getElementById('todo');
        myJsonData.todo.forEach(item => {
            const todoItem = document.createElement('li');
            todoItem.textContent = item;
            todoList.appendChild(todoItem);
        })
        myJsonData.done.forEach(item => {
            const todoItem = document.createElement('li');
            const strikedItem = document.createElement('del');
            strikedItem.textContent = item;
            todoItem.appendChild(strikedItem);
            todoList.appendChild(todoItem);
        })

        // currently lists
        for (const [key, value] of Object.entries(myJsonData.currently)) {
            const currentlyList = document.getElementById(key);
            if (value.length == 0) {
                const currentlyItem = document.createElement('li');
                currentlyItem.textContent = "nothing </3";
                currentlyList.appendChild(currentlyItem);
            } else {
                value.forEach(item => {
                    const currentlyItem = document.createElement('li');
                    currentlyItem.textContent = item;
                    currentlyList.appendChild(currentlyItem);
                });
            }
        }

        // button wall
        const buttonwall = document.getElementById('buttons');
        function pictureOrImg(container, array, picture, img) {
            if (array[2] == 1) {
                container.appendChild(picture);
            } else {
                container.appendChild(img);
            }
        }
        myJsonData.buttons.forEach(button => {
            const img = document.createElement('img');
            img.alt = button[1];

            // split at the period
            const dummy = "button.gif"
            const split = dummy.split('.')[0];
            console.log(split);

            // if the button is animated (value 3 is 1)
            if (button[2] == 1) {
                var picture = document.createElement('picture');
                var source = document.createElement('source');
                source.srcset = `images/88x31/${button[0]}.png`;
                source.media = "(prefers-reduced-motion)";
                img.src = `images/88x31/${button[0]}.gif`;
                picture.appendChild(source);
                picture.appendChild(img);
            } else {
                img.src = `images/88x31/${button[0]}.png`;
            }
            // if has a link
            if (button[3]) {
                const link = document.createElement('a');
                link.href = button[3];
                link.target = "_blank";
                pictureOrImg(link, button, picture, img);
                buttonwall.appendChild(link);
            } else {
                pictureOrImg(buttonwall, button, picture, img);
            }
        })

    } catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

fetchJsonData();
```

if our html document looks like this:

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <main>
        to do:
        <ul id="todo">
        </ul>
        <div id="currently">
            playing:
            <ul id="playing"></ul>
            reading:
            <ul id="reading"></ul>
            watching:
            <ul id="watching"></ul>
        </div>
        buttons:
        <div id="buttons"></div>
    </main>
    <script src="script.js"></script>
</body>
</html>
```

given the `data.json` file described previously, when the script is done executing the inside of `<main>` looks like this:

```html
to do:
<ul id="todo">
    <li>to do 1</li>
    <li>to do 2</li>
    <li>
        <del>finished to do 1</del>
    </li>
    <li>
        <del>finished to do 2</del>
    </li>
</ul>
<div id="currently">
    playing:
    <ul id="playing">
        <li>game 1</li>
        <li>game 2</li>
    </ul>
    reading:
    <ul id="reading">
        <li>book</li>
    </ul>
    watching:
    <ul id="watching">
        <li>nothing </3</li>
    </ul>
</div>
buttons:
<div id="buttons">
    <img alt="button 1 alt text" src="images/88x31/filename1.png">
    <a href="url2" target="_blank">
        <picture>
            <source srcset="images/88x31/filename2.png" media="(prefers-reduced-motion)">
            <img alt="button 2 alt text" src="images/88x31/filename2.gif">
        </picture>
    </a>
    <a href="url3" target="_blank">
        <img alt="button 3 alt text" src="images/88x31/filename3.png"></a>
    <picture>
        <source srcset="images/88x31/filename4.png" media="(prefers-reduced-motion)">
        <img alt="button 4 alt text" src="images/88x31/filename4.gif">
    </picture>
</div>
```
