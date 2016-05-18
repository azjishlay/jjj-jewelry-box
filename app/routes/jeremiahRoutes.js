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
            var data = {'invoices':result};
            //res.json(data);
            res.render('invoices', data);
        });
    });

    app.get('/create-invoice', function(req, res){
        
        res.render('create-invoice');
    });

    app.get('/api/users',function (req,res){
        users.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/clients',function (req,res){
        clients.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/products',function (req,res){
        products.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/products/:id',function (req,res){
        var reqID = req.params.id;
        products.findAll({
            where:{id:reqID}
        }).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/skuSearch/:sku',function (req,res){
        var sku = req.params.sku;
        products.findAll({
            where: {name:{$like: '%'+sku+'%'}}
        })
            .then(function(result){
            res.json(result);
        });
    });

    app.get('/work-orders', function(req, res){
        res.render('work-orders');
    });

    app.get('/create-work-order', function(req, res){
        res.render('create-work-order');
    });
    
};