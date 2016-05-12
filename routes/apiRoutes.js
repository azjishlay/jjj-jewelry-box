// require the sequelize models
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var users = require('../models/users.js');

module.exports = function(app){
	app.get('/api/kwerry', function(req, res){
		console.log(res);
	});
};