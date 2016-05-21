var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var clients = require('../models/clients');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

// Generic function to redirect if user is not logged in
function loggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

module.exports = function(app){
	
	app.get('/', loggedIn, function(req, res) {

		clients.findAll({
			where: {
				employee_id: req.user.id
			}
		}).then(function(data){
			res.render('dashboard',{
				isAuthenticated: req.isAuthenticated(),
				user: req.user,
				myClients: data
			});
		});

	});

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/logout', function(req, res){
		// logout method added by passport
		req.logout();	
		res.redirect('/');
	});

	// app.get('/clients', function(req, res){
	// res.render('clients');
	// });
    //
	// app.get('/products', function(req, res){
	// res.render('products');
	// });
    //
	// app.get('/create-product', function(req, res){
	// res.render('products-add-new');
	// });
    //
	// app.get('/invoices', function(req, res){
	// res.render('invoices');
	// });
    //
	// app.get('/create-invoice', function(req, res){
	// 	res.render('create-invoice');
	// });
    //
	// app.get('/work-orders', function(req, res){
	// res.render('work-orders');
	// });
    //
	// app.get('/create-work-order', function(req, res){
	// 	res.render('create-work-order');
	// });
    //
	// app.get('/employees', function(req, res){
	// res.render('employees');
	// });
    //
	// app.get('/create-employee', function(req, res){
	// 	res.render('create-employee');
	// });

	app.post('/login', passport.authenticate('local'), function(req, res){
		res.redirect('/');
	});
	
};