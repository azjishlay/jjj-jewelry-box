var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');

module.exports = function(app){
	app.get('/', function(req, res){
		var data = {stuff:{id:1,name:'test',points:200}};
		res.render('index',data);
	});

};