var createError = require('http-errors')
  , express = require('express')
  , path = require('path')
  , cookieParser = require('cookie-parser')
  , logger = require('morgan')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , mongoose = require('mongoose');

var reg = require('./custom_module/Registry').Registry;

var indexRouter = require('./routes/index');
///var usersRouter = require('./routes/users');

// define ports for connection
var httpPort = 80;
var httpsPort = 443;

var app = express();

// security options for https connection
/*
var SecurityOptions = {
	key : fs.readFileSync('certificate/server2.key'),
	cert : fs.readFileSync('certificate/server.crt')
};
*/

// db configuration
var configDB = reg.MongoCnf();
mongoose.connect(configDB.url); // connect to the database

// all environments setup
app.set('httpPort', process.env.PORT || httpPort);
app.set('httpsPort', process.env.PORT || httpsPort);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/module", express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
///app.use('/users', usersRouter);

//routes
reg.TaskRoutes()(app);
reg.UserRoutes()(app);

// getting the main page (index.html)
app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('httpPort'), function(){
	console.log('Express HTTP server listening on port ' + app.get('httpPort'));
});
/*
https.createServer(SecurityOptions, app).listen(app.get('httpsPort'), function(){
	console.log('Express HTTPS server listening on port ' + app.get('httpsPort'));
});
*/

module.exports = app;
