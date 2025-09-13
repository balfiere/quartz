---
tags: [11ty, site_building]
publish: false
created: 2025-09-13T00:03:55.5555-05:00
modified: 2025-09-13T01:49:38.3838-05:00
---

this is a tutorial on how i generate my [articles](https://kwaamfan.neocities.org/articles/) page from a json file using eleventy. it assumes you already have eleventy installed; if not, [this tutorial](https://whiona.weblog.lol/2023/10/my-neocities-workflow-using-eleventy-and-the-cli-to-speed-up-development) is good at walking you through the initial set up. knowing some basic programming concepts, particularly for loops and arrays, is recommended, but i've tried to explain things so you can still follow along even if you've never programmed before.

## benefits

if a page has many elements with the same format (a microblog, changelog, image gallery, review page, etc) it may be cumbersome to copy and paste the repeated elements every time you want to add something new, especially if you use complicated formatting with lots of nested `divs` and whatnot. storing the unique data in json makes it easier to write new content and modify old content without having to muck about in the weeds of html. if you decide to change your layout, it also makes it 10000% easier to do so: just change your template file, rebuild your page with eleventy, and your new layout is applied to all entries — no need to edit each element manually or mess around with regex.

while you can use javascript to load json data (and i have a tutorial on how to do so [[using javascript to load data from a json file|here]]), i prefer this method for data that is the focus of the given page and saving the javascript for smaller, less critical things. this keeps the page viewable for users with javascript disabled and improves performance.

## the json file

inside your `eleventy` folder, create a folder with your page's desired sub url. for this example this would be `articles`. now create a json file with the same name as your folder.

> [!note] sidenote
> you can also name the file `index.json` if you only want the data to be available to the the index page of your folder (naming it the same as the folder as in this example makes the data available to all pages in the directory and subdirectories). json files can also be kept in the `_data` folder of eleventy's root directory if you want your data to be available for all folders of your site. for more information on how eleventy makes data files available see [Template and Directory Data Files](https://www.11ty.dev/docs/data-template-dir/) and [Global Data Files](https://www.11ty.dev/docs/data-global/)

for this example the contents of `articles.json` look like this:

```json
{
    "articles": [
        [
            "title 1",
            "author 1",
            "description 1",
            "url 1"
        ],
        [
            "title 2",
            "author 2",
            "description 2",
            "url 2"
        ],
        [
            "title 3",
            "author 3",
            "description 3",
            "url 3"
        ]
    ]
}
```

`articles` is the "key", the name we will call in our function in order to access the data it stores. the data is stored in an [array](https://www.w3schools.com/js/js_json_arrays.asp) of arrays, denoted by the square brackets. you could use [objects](https://www.w3schools.com/js/js_json_objects.asp) if you prefer to name each individual value, but i think it's easier to write out the values in the same order instead of remembering to write out the key each time, and keeps the json file less cluttered.

## the template file

in the folder `articles`, make a new file called `index.html`. make it look like how you want other than the repeating elements. for my file it'll look like this:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>articles</title>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="favicon.gif">
    </head>
    <body>
        <header>links to some of my favorite articles, blog posts, and essays.
            <a href="/main/index.html">go back</a>.
        </header>
        <main>
        
        </main>
    </body>
</html>
```

inside `<main></main>` is where i want my repeating elements. i want each element to look like so:

```html
<article>
	<a target="_blank" href="url">
		<div class="title">title</div>
		<div class="author">author</div>
		<div class="description">description</div>
	</a>
</article>
```

in order to print out a new `<article>` element for all of our data, we'll need to use a [template language](https://en.wikipedia.org/wiki/Template_processor) that allows us to write our page in html, while also being able to add a function that will iterate over the data in `articles.json`. by default eleventy uses [liquid](https://www.11ty.dev/docs/languages/liquid/) as its template engine for html files, and is what i'll be using for this tutorial.

> [!NOTE] sidenote
> if you want to make sure your file uses liquid, you could also name your file `index.liquid`. to use other template languages, you can either change out the file extension (ex. `index.njk` for [nunjucks](https://www.11ty.dev/docs/languages/nunjucks/)) or [change the default template engine](https://www.11ty.dev/docs/config/#default-template-engine-for-html-files) in `.eleventy.js`. i prefer to use the `.html` file extension so i can use my IDE's syntax highlighting and auto close tag features.

### writing a for loop in liquid

we'll use a [for loop](https://users.cs.utah.edu/~germain/PPS/Topics/for_loops.html) in order to iterate over the entries of our `articles` array that we created in `articles.json`. in liquid, the syntax that tells the engine to generate dynamic content are curly brackets `{ }`. for statements that generate the control flow, such as if statements and loops, the delimiters `{%` and `%}` are used and are called [tags](https://shopify.github.io/liquid/basics/introduction/#tags). the basic syntax of a for loop in liquid is this:

```
{% for element in object %}
some code that gets repeated for the number of elements in the object
{% endfor %}
```

[Iteration – Liquid template language](https://shopify.github.io/liquid/tags/iteration/)

so we can put the `<article>` element described above inside the tags, replacing `object` with the name of the our object `articles` and optionally renaming `element` to `article` to get

```html
{% for article in articles %}
<article>
	<a target="_blank" href="url">
		<div class="title">title</div>
		<div class="author">author</div>
		<div class="description">description</div>
	</a>
</article>
{% endfor %}
```

in our `articles.json`, the array `articles` has three elements, so the loop will repeat three times. but as it stands now, we'll have three `<article>` elements all with the same data — we want to make the title, author, description, and url unique for each `<article>`. in order to get the unique data of our json file, we need to use variables. in liquid, these are called [objects](https://shopify.github.io/liquid/basics/introduction/#objects) and are denoted with double curly brackets `{{` and `}}`.

inside the loop at iteration `i`, `article` is the element at index `articles[i]`. so the first time the loop runs, `i` = 0 and `article` = `articles[0]` = `["title 1", "author 1", "description 1", "url 1"]`. since `article` is also an array, we can access each element using `article[i]`. for example, to get the author name `author 1` we would use `article[1]`.

now we have enough information to update our for loop with variables replacing the parts we want to be unique. the final loop will look like so:

```html
{% for article in articles %}
<article>
	<a target="_blank" href="{{ article[3] }}">
		<div class="title">{{ article[0] }}</div>
		<div class="author">{{ article[1] }}</div>
		<div class="description">{{ article[2] }}</div>
	</a>
</article>
{% endfor %}
```

### final template file

the final version of `index.html` should look like this:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>articles</title>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="favicon.gif">
    </head>
    <body>
        <header>links to some of my favorite articles, blog posts, and essays.
            <a href="/main/index.html">go back</a>.
        </header>
        <main>
			{% for article in articles %}
			<article>
				<a target="_blank" href="{{ article[3] }}">
					<div class="title">{{ article[0] }}</div>
					<div class="author">{{ article[1] }}</div>
					<div class="description">{{ article[2] }}</div>
				</a>
			</article>
			{% endfor %}
        </main>
    </body>
</html>
```

## building the file with eleventy

to compile just the page in the articles folder, set your working directory to your eleventy folder and use the command

```
npx @11ty/eleventy --input=articles --output=_site/articles
```

your new file will then be located in `_site/articles`. you could of course just use `npx @11ty/eleventy`, but i'd rather not wait for eleventy to build every subdirectory when i only want to change a single page.

if you're like me and use [deploy-to-neocities: 🐈 Github Action to deploy a folder to Neocities](https://github.com/bcomnes/deploy-to-neocities) or otherwise like to keep your site folder outside of your eleventy folder, you could alias a command such as

```bash
cd ~/Documents/neocities/eleventy
npx @11ty/eleventy --input=articles --output=_site/articles
cp -a _site/articles/index.html ../public/articles/
```

to copy your compiled file over, where `public` is a folder next to `eleventy` and is the main folder of your site.

the final file looks like

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>articles</title>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="favicon.gif">
    </head>
    <body>
        <header>links to some of my favorite articles, blog posts, and essays.
            <a href="/main/index.html">go back</a>.
        </header>
        <main>
			
			<article>
				<a target="_blank" href="url 1">
					<div class="title">title 1</div>
					<div class="author">author 1</div>
					<div class="description">description 1</div>
				</a>
			</article>
			
			<article>
				<a target="_blank" href="url 2">
					<div class="title">title 2</div>
					<div class="author">author 2</div>
					<div class="description">description 2</div>
				</a>
			</article>
			
			<article>
				<a target="_blank" href="url 3">
					<div class="title">title 3</div>
					<div class="author">author 3</div>
					<div class="description">description 3</div>
				</a>
			</article>
			
        </main>
    </body>
</html>
```

## generating more complex pages

while i've only shown an example with a json file that has a single object, your json file can have as many objects as you want. you can also have more than one for loop, plus do other things such as if statements, modifying objects with [filters](https://shopify.github.io/liquid/basics/introduction/#filters), etc. for a more complex example, feel free to look at how i use eleventy to build my about page [here](https://github.com/balfiere/neocities/tree/main/eleventy/about).