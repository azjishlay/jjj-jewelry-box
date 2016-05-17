var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var passport = require('passport');


module.exports = function(app){

    app.get('/invoice', function(req, res){
        invoices.
        res.render('invoice');
    });

    app.get('/create-invoice', function(req, res){
        res.render('create-invoice');
    });

    app.get('/work-orders', function(req, res){
        res.render('work-orders');
    });

    app.get('/create-work-order', function(req, res){
        res.render('create-work-order');
    });
    
};