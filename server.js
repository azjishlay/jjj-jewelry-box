// initial requires
var express = require('express');
var bodyParser = require('body-parser');

// setup the express app
var app = express();

// use body-parser to help express handle requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Set up handlebars for express
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// load the static files
var staticContentFolder = __dirname + '/public';
app.use(express.static(staticContentFolder));

// require the api and html paths
require("./routes/apiRoutes.js")(app)
require("./routes/htmlRoutes.js")(app)

// start the server
var PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
	console.log('Find the magic at port: ' + PORT);
})