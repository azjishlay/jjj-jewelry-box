var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var clients = require('../models/clients');
var passport = require('passport');

module.exports = function(app){

    app.get('/invoices', function(req, res){
        invoices.findAll({
            include:[{
                model: users
            },{
                model: clients
            },{
                model: line_items,
                include:[products]
            }]
        }).then(function(result){
            var data = {'invoice':result};
            //res.json(data);
            res.render('invoice', data);
        });
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