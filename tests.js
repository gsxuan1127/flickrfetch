/*var page = require('webpage').create();
page.open('http://www.flickr.com/photos/aylaujp/493155741/sizes/o/in/photostream/', function(status) {
		
		//page.injectJs('jquery.js');
		//debugger;		
		page.evaluate(function() {
			console.log(document.getElementById('#allsizes-photo').innerHTML);
			//console.log($("#allsizes-photo").innerHTML);
		  });
		  
		phantom.exit();
});
*/

// Read the Phantom webpage '#intro' element text using jQuery and "includeJs"

var page = require('webpage').create();
var fs = require('fs'),
    system = require('system');
	
//console.log("hi");

page.onConsoleMessage = function(msg) {
    console.log(msg);	
};

page.open("http://www.flickr.com/photos/flibble/589033516/sizes/o/in/photostream/", function(status) {
    if ( status === "success" ) {
		page.injectJs('jquery.js');        
            page.evaluate(function() {
				console.log($("#allsizes-photo").find('img').attr('src'));
			});			
            phantom.exit();        
    }
});

