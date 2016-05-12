// require the sequelize models
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var users = require('../models/users.js');

// Routes
module.exports = function(app){

	// Each of the below routes just handles the HTML page that the user gets sent to.
	app.get('/', function(req, res){
		var data = {stuff:{id:1,name:'Jeremiah',points:200}};
		res.render('index',data);
	});

};