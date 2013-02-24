node-xmlreader
==============

An xml reader for node that uses a different approach than all other xml readers/parsers out there.

## Install

You can install xmlreader using the Node Package Manager (npm):

    npm install xmlreader

## Introduction ##

I wanted a xml reader that's easy to use and that doesn't require tricks to access the attributes and text values of xml-nodes. Most xml parsers out there use some kind of prefix, but that's not a sound solution.

I'm using functions to differentiate the attributes and text from the nodes:

``` res.response.attributes() ``` and ``` res.response.text() ```

I also wanted a xml parser that can handle multiple nodes of the same node. Most parsers out there just ignore those or threat every node as an array.

I'm using functions to get to nodes of the same name. The same functions can also be used to get to nodes where there's only one of them:

``` res.response.who.getLength() ``` and ``` res.response.who.at(1) ```


## Example ##

```js
var xmlreader = require('xmlreader');

var someXml = 	'<response id="1" shop="aldi">'
			+ 		'This is some other content'
			+		'<who name="james">James May</who>'
			+ 		'<who name="sam">'
			+			'Sam Decrock'
			+			'<location>Belgium</location>'
			+		'</who>'
			+ 		'<who name="jack">Jack Johnsen</who>'
			+		'<games age="6">'
			+			'<game>Some great game</game>'
			+			'<game>Some other great game</game>'
			+		'</games>'
			+		'<notes>These are some notes</notes>'
			+	'</response>'

xmlreader.read(someXml, function (err, res){
	// use .text() to get the content of a node:
	console.log( res.response.text() );

	// use .attributes() to get the attributes of a node:
	console.log( res.response.attributes().shop );

	console.log("");

	// using the getLength() and the at() function, you can loop through nodes with the same name:
	for(var i = 0; i < res.response.who.getLength(); i++){
		console.log( res.response.who.at(i).text() );
	}

	console.log( res.response.who.at(1).text() ) ;
	console.log( res.response.who.at(1).location.text() );

	// you can also get regular nodes like you get arrays:
	console.log( res.response.notes.at(0).text() );
});
```