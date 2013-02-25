node-xmlreader
==============

An xml reader for node that uses a different approach than all other xml readers/parsers out there.

## Install

You can install xmlreader using the Node Package Manager (npm):

    npm install xmlreader

## Introduction ##

I wanted a xml reader that's easy to use and that doesn't require tricks to access the attributes and text values of xml-nodes. Most xml parsers out there use some kind of prefix, but that's not a sound solution.

I'm using functions to differentiate the attributes and text from the nodes:

``` node.attributes() ``` and ``` node.text() ```

I also wanted a xml parser that can handle multiple nodes of the same name. Most parsers out there just ignore those or threat every node as an array.

I'm using functions to get to nodes of the same name. The same functions can also be used to get to nodes where there's only one of them:

``` nodes.count() ``` and ``` nodes.at(1) ```

## Functions ##

#### get the attributes of a node ####

	node.attributes()

#### get the text of a node ####

	node.text()

#### get the number of nodes with the same name ####

	nodes.count()

#### get node i of a series of nodes with the same name ####

	nodes.at(i)

#### get the parent node of a node ####

	node.parent()

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
	if(err) return console.log(err);

	// use .text() to get the content of a node:
	console.log( res.response.text() );

	// use .attributes() to get the attributes of a node:
	console.log( res.response.attributes().shop );

	console.log("");

	// using the .count() and the .at() function, you can loop through nodes with the same name:
	for(var i = 0; i < res.response.who.count(); i++){
		console.log( res.response.who.at(i).text() );
	}

	console.log( res.response.who.at(1).text() ) ;
	console.log( res.response.who.at(1).location.text() );

	// you can also use .at() to get to nodes where there's only one of them:
	console.log( res.response.notes.at(0).text() );

	console.log("");

	// you can also get the parent of a node using .parent():
	console.log( res.response.who.at(1).parent().attributes().id ) ;
});
```