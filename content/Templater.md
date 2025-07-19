---
tags: [obsidian]
publish: true
---

[Templater](https://silentvoid13.github.io/Templater/introduction.html) is an Obsidian extension that can be used to automate the creation of notes and automatically sort them based on prompts]. i use it extensively to quickly create [literature notes](https://zk.zettel.page/types-of-notes#2-literature-notes).

## system prompts with Templater

when using the templater extension, you can add prompts to create variables that can used in the created note. so when you make a new note using templater, a modal will pop up asking you for the desired variable. this can save a lot of time if a certain variable is used in multiple places throughout a note. to add prompts, use the `const variableName = await tp.system.prompt("Variable Name")` to the top of the template. here's an example i use in my TV episode template.

```javascript
<%*
const seriesName = await tp.system.prompt("Series Name")
const episodeNumber = await tp.system.prompt("Episode Number")
const URL = await tp.system.prompt("URL")
const publishDate = await tp.system.prompt("Published Date (YYYY-MM-DD)")
%>
```

## automatically sort notes with Templater

you can automatically move a note when creating it with the templater plugin using `tp.file.move`. here's a simple example, where `title` is a variable created with a [[Templater#system prompts with Templater|system prompt]].

```javascript
<%*	
	await tp.file.move("/desired folder/" + title)
%>
```

you can even automatically create folders using already created variables. for example, this is part of the code in my TV episode template. it automatically renames the note to "Episode {episodeNumber}" and moves it into a folder with the series name, creating the folder if it doesn't exist already.

```javascript
<%*
// rename file
titleName = "Episode " + episodeNumber;
await tp.file.rename(titleName);

// make the directory a folder with the name of the series inside the tv show literature note folder
const dir = "/020 literature notes/tv/" + seriesName;

// if directory doesn't exist
if (!tp.file.exists(dir)) {
	// create the folder
	await this.app.vault.createFolder(dir);
}

// move current note to the series folder
await tp.file.move(dir + "/" + titleName, tp.file.find_tfile(titleName))
%>
```

## creating another note using Templater

you can use the function `tp.file.create_new` inside of a template to create an additional file when creating a file using templater. when i make a literature note, i use it to automatically create another note that lists every note from that source. for example, if i make a note for a TV episode, the following code will check if a note with the series name already exists. if not, it creates another note using the template `TV Series Template` and automatically sorts it into the folder with my episode notes (the variables .

```js
// check if a note with the series name exists
const existing = tp.file.find_tfile(seriesName);

// if it doesn't exist
if (!existing) {
	
	// get the series template file content
	const templateName = "TV Series Template"
	let templateFile = await tp.file.find_tfile(templateName);
	let templateContent = await app.vault.read(templateFile);
	
	// create series note
	await tp.file.create_new(templateContent, seriesName, false, dir);
}
```

the note for the series uses [dataview](https://blacksmithgu.github.io/obsidian-dataview/) to display a table of all the episodes i've already taken notes on (replace the \`\` with \`\`\`)

```js
---
category: tv
type: series
series: "<% tp.file.title %>"
tags: format/tv, type/series 
---
# <% tp.file.title %>

``dataview
	table published as "Date Aired"
	where show = "<% tp.file.title %>"
	sort file asc
``

---
[[TV Shows]]
```
