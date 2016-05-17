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

// set up handlebars for express
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: 'app/views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

// load the static files
var staticContentFolder = __dirname + '/app/public';
app.use(express.static(staticContentFolder));

// express sitemap app
var sitemap = require('express-sitemap')();
sitemap.generate(app);

// require the api and html paths
require("./app/routes/apiRoutes.js")(app)
require("./app/routes/htmlRoutes.js")(app)

// start the server
var PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
	console.log('Find the magic at port: ' + PORT);
})