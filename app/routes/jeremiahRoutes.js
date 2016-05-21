var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var clients = require('../models/clients');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");


module.exports = function(app){

    function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

    app.get('/create-invoice', loggedIn, function(req, res, next){
        console.log('userID:');
        console.log(req.user.id);
        res.render('create-invoice',{
            // isAuth returns true or false
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });


    app.get('/invoices', loggedIn, function(req, res, next){
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
            //var data = {'invoices':result};
            //res.json(data);
            res.render('invoices',{'invoices':result,
                // isAuth returns true or false
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });
    });

    app.get('/create-client', function(req, res){
        res.render('create-client');
    });

    app.get('/create-product', function(req, res){
        res.render('create-product');
    });

    app.get('/products', function(req, res){
        products.findAll({
            include:[{
                model: product_categories
            }]
        }).then(function(result){
            // res.json(result);
            res.render('products2',{'products':result,
                // isAuth returns true or false
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });
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

    app.get('/api/categories',function (req,res){
        product_categories.findAll({}).then(function(result){
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

    app.get('/clients', function(req, res){
        clients.belongsTo(clients,{foreignKey:'family_members'});
        clients.findAll({
            include:[{
                model: clients
            },{
                model: users
            }]
        }).then(function(result){
            // res.json(result);
            res.render('clients',{'clients':result,
                // isAuth returns true or false
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });
    });

    app.get('/api/clients/:id',function (req,res){
        var reqID = req.params.id;
        clients.belongsTo(clients,{foreignKey:'family_members'});
        clients.findAll({
            include:[{
                model: clients
            }],
            where:{
                id:reqID
            }
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

    app.post('/api/new/invoice', function(req, res){
        var newinvoice = req.body;
        invoices.create({
            employee_id: newinvoice.userID,
            customer_id: newinvoice.clientID,
            date_created: sequelize.fn('NOW'),
            subtotal: newinvoice.invoiceSub,
            taxes: newinvoice.invoiceTax,
            total: newinvoice.invoiceTot,
            payment_amount: newinvoice.invoiceTot,
            payment_type: 'credit card'
        })
            .then(function (results) {
                    //console.log(results.dataValues.id);
                    line_items.create({
                        product_id: newinvoice.productID,
                        invoice_id: results.dataValues.id,
                        date_created: sequelize.fn('NOW'),
                        unit_price: newinvoice.productPrice,
                        quantity: newinvoice.productQty,
                        total: newinvoice.productID,
                        discount: "0"
                    }).then (function (results2) {
                        res.json(results2);
                    })
            })
    });

};