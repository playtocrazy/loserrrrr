var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan')
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

var index = require('./routers/index');
var linebot = require('./controllers/linebot');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// development only
if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
}

app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));
app.use('/static', serveStatic(__dirname + '/public'));

// define router
app.use('/', index);

// bind LINE webhook
linebot.createWebhook(app, server);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});