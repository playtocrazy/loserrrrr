var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan')
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

var index = require('./routers/index');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));
app.use(serveStatic(__dirname + '/public'));

// development only
if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
}

// define router
app.use('/', index);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});