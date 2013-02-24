var sax = require("sax");




exports.read = function(xmlstring, callback){
	var saxparser = sax.parser(true);
	var rootobject = {};
	var object = rootobject;

	saxparser.onerror = function (err) {
		// an error happened.
		
		return callback(err);
	};

	saxparser.onopentag = function (node) {
		// opened a tag.  node has "name" and "attributes"

		// create a new object and fill it with a function that returns the attributes:
		var newobject = {
			attributes: function(name){
				return node.attributes;
			}
		};

		addGetParentFunction(newobject, object);

		// add 2 functions to the object so that the object can be accessed as if it was an array:
		addGetLengthFunction(newobject);
		addAtFunction(newobject);

		if(object[node.name]){
			// we're dealing with objects of the same name, let's wrap them in an array

			// check if there's already an array:
			if(!object[node.name].array){
				// no array, create one and at itself + newobject:
				var firstobject = object[node.name];
				object[node.name] = {};
				object[node.name].array = new Array(firstobject, newobject);
			}else{
				// alreay an array, just add the newobject to it:
				object[node.name].array.push(newobject);
			}

			// add 2 functions to work with that array:
			addGetLengthFunction(object[node.name]);
			addAtFunction(object[node.name]);
		}else{
			// we're dealing with simple objects, no array:
			object[node.name] = newobject;
		}

		// set the current object to the newobject:
		object = newobject;
	};
	saxparser.ontext = function (text) {
		object.text = function(){
			return text;
		}
	};

	saxparser.onclosetag = function (node) {
		object = object.getParent();
	}

	saxparser.onend = function () {
		return callback(null, rootobject);
	};

	// We need closures for this:
	function addGetLengthFunction(object){
		if(object.array){
			object.getLength = function(){
				return object.array.length;
			}
		}else{
			object.getLength = function(){
				return 1;
			}
		}
	}

	function addAtFunction(object){
		if(object.array){
			object.at = function(index){
				return object.array[index];
			}
		}else{
			object.at = function(index){
				return object;
			}
		}
	}

	function addGetParentFunction(object, parent){
		object.getParent = function(){
			return parent;
		}
	}


	saxparser.write(xmlstring).close();
}