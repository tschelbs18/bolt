
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var login = require('./routes/login');
var home = require('./routes/home');

var settings = require('./routes/settings');

var help = require('./routes/help');
var duringRun = require('./routes/duringRun');

var finishedRun = require('./routes/finishedRun');

var pastRuns = require('./routes/pastRuns');

var routes = require('./routes/routes');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.post('/login', login.login);
app.post('/signup', login.signUp);
app.get('/home', home.view);

app.get('/settings', settings.view);
app.post('/saveSettings', settings.saveSettings);
app.get('/getHype', settings.getHype);

app.get('/help', help.view);
app.get('/during_run', duringRun.view);
app.get('/finished_run', finishedRun.view);
app.post('/finished_run', finishedRun.finishRun);

app.get('/past_runs', pastRuns.view);
app.post('/saveRun', pastRuns.saveRun);

app.get('/routes', routes.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
