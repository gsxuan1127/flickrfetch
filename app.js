
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var app = express();
var Flickr = require('flickrapi');
var exec = require('child_process').exec,
    child;
var fs = require('fs');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

child = exec('phantomjs tests.js',
    function (error, stdout, stderr) {
        //console.log(stdout, stderr);      // Always empty
        //var result = JSON.parse(stdout);
		//console.log(stdout);
		console.log(stdout);
		var request = http.get("http://farm2.staticflickr.com/1164/589033516_204b7e9a63_o.jpg", function(res){
			var imagedata = ''
			res.setEncoding('binary')
			res.on('data', function(chunk){
				imagedata += chunk
			})
			res.on('end', function(){
				fs.writeFile('image.jpg', imagedata, 'binary', function(err){
					if (err) throw err
					console.log('File saved.')
				})
			})
		}).on('error',function(e){
			console.log('error' +  e);
		});
    }
);

/*


var request = http.get("http://farm1.staticflickr.com/203/493155741_b632a3f55d_o.jpg", function(res){
    var imagedata = ''
    res.setEncoding('binary')
	
    res.on('data', function(chunk){
        imagedata += chunk
    })

    res.on('end', function(){
        fs.writeFile('image.jpg', imagedata, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })
    })
}).on('error',function(e){
	console.log('error' +  e);
});*/