---
publish: true

title: json
tags:
  - json
  - programming/javascript
created: 2025-09-13T23:19:53.5353-05:00
updated: 2025-09-13T23:56:57.5757-05:00
---

# json

[json](https://www.w3schools.com/js/js_json.asp) is a text format for organizing data. standing for javascript object notation, its structure mimics the javascript object format and is often used with javascript, which can read and display that data on a site.

## why use json on my site?

the main benefit of storing data in a json file is that, for sections of your site with repeated elements, it is much easier to read and edit than html. say your blinkie wall looks like mine does:

```html
<picture>
	<source srcset="images/blinkies/blinkie1.png" media="(prefers-reduced-motion)"/><img src="images/blinkies/blinkie1.gif"/>
</picture>
<picture>
	<source srcset="images/blinkies/blinkie2.png" media="(prefers-reduced-motion)"/><img src="images/blinkies/blinkie2.webp"/>
</picture>
<picture>
	<source srcset="images/blinkies/blinkie3.png" media="(prefers-reduced-motion)"/><img src="images/blinkies/blinkie3.gif"/>
</picture>
<picture>
	<source srcset="images/blinkies/blinkie4.png" media="(prefers-reduced-motion)"/><img src="images/blinkies/blinkie4.avif"/>
</picture>
<picture>
	<source srcset="images/blinkies/blinkie5.png" media="(prefers-reduced-motion)"/><img src="images/blinkies/blinkie5.gif"/>
</picture>
```

while that seems like a lot, you could represent the unique data (the animated filename) like this:

```json
{
	"blinkies": [
		"blinkie1.gif",
		"blinkie2.webp",
		"blinkie3.gif",
		"blinkie4.avif",
		"blinkie5.gif"
	]
}
```

and write a function that loads the blinkies in the above format. now if you only have five blinkies, it's probably not a big deal to copy and paste the `<picture>` element for each one and editing the filenames manually. but if you have 50+ blinkies like i do, it quickly becomes rather laborious and the chance of making some typo in the html increases. if you instead use a json file, all you have to do is add the filename of your new blinkie. this makes adding new content and changing old content on your site much easier, since you don't have to trawl through the depths of your html page to find your blinkie wall every time you want to add a new one. in addition, keeping data stored in json makes it easier to change the format of how it's presented on your site: just change the function or your template file and the change will then apply to all elements.

finally, data stored in json format is easier to manipulate than html. for example, when i [[building a web page with json data using 11ty#generating more complex pages|build my about page with eleventy]], i first call [this script](https://github.com/balfiere/neocities/blob/main/scripts/about_image_update) that [[most used imageMagick commands#extract first frame of a gif|converts animated blinkies to png]] then automatically updates the `blinkie` array in the json file where i store data used on my about page with my new file. that means every time i save a new blinkie to my blinkie folder, all i have to do is type a single command in my terminal and my new blinkie will automatically be added to my page in an [[preventing gif autoplay|accessible format]].

## an example file

```json
{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    },
    "email": [
      "jd@example.com",
      "jd@example.org"
    ],
    "dateOfBirth": "1980-01-02T00:00:00.000Z",
    "registered": true,
    "emergencyContacts": [
      {
        "name": "Jane Doe",
        "phone": "888-555-1212",
        "relationship": "spouse"
      },
      {
        "name": "Justin Doe",
        "phone": "877-123-1212",
        "relationship": "parent"
      }
    ]
  }
}
```

from [ObjGen - Live Code Generation for the Web](https://www.objgen.com/json?demo=true)

note that everything should be wrapped in curly brackets.

## types of data structures

- simple key:value pairs like `"product": "Live JSON generator"`. the value can be a string, number, date, or boolean value. if the above file is stored as `jsonData`, then to access the value `"Live JSON generator"` we would use the syntax `jsonData.product`
- [objects](https://www.w3schools.com/js/js_json_objects.asp): wrapped in curly brackets `{ }`, json objects store multiple key:value pairs. for example, if we wanted to access the phone numbers of the person described by the `person` object, we would use the syntax `jsonData.person.phones`. if we specifically wanted to get their home phone number, we would use the syntax `jsonData.person.phones.home`
	- note that `jsonData.person.phones` would return an object while `jsonData.person.phones.home` would return the string "800-123-4567"
- [arrays](https://www.w3schools.com/js/js_json_arrays.asp): wrapped in square brackets `[ ]`, arrays are a special type of object. instead of accessing a value by calling its key, we instead use its index, which is the order it appears in the array. in javascript, indexing starts at 0. so to get the array of this person's emails, we would use `jsonData.person.emails`; to get their second email (the one with the .org extension) we would use `jsonData.person.emails[1]`. arrays are a good choice for storing data that will be used with a for loop, where there is no need to call the value with a key. this makes adding or removing things from the array simpler since you don't need to come up with a new key name for each new entry.

---
[What is JSON](https://www.w3schools.com/whatis/whatis_json.asp)
