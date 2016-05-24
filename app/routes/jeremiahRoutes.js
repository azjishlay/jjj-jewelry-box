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
            }],
            order: 'id DESC'
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



    app.get('/products', loggedIn, function(req, res, next){
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

    app.get('/api/users', loggedIn, function(req, res, next){
        users.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/clients', loggedIn, function(req, res, next){
        clients.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/products', loggedIn, function(req, res, next){
        products.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/categories', loggedIn, function(req, res, next){
        product_categories.findAll({}).then(function(result){
            res.json(result);
        });
    });

    app.get('/api/products/:id', loggedIn, function(req, res, next){
        var reqID = req.params.id;
        products.findAll({
            where:{id:reqID}
        }).then(function(result){
            res.json(result);
        });
    });

    app.get('/clients', loggedIn, function(req, res, next){
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

    app.get('/api/clients/:id', loggedIn, function(req, res, next){
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

    app.get('/api/skuSearch/:sku', loggedIn, function(req, res, next){
        var sku = req.params.sku;
        products.findAll({
            where: {name:{$like: '%'+sku+'%'}}
        })
            .then(function(result){
            res.json(result);
        });
    });

    app.post('/api/new/invoice', loggedIn, function(req, res, next){
        var newinvoice = req.body;
        users.findAll({
            where: {id:newinvoice.userID}
        })
            .then(function(results){
                var before = results[0].sales;
                before = parseFloat(before);
                var newSale = newinvoice.invoiceSub;
                newSale = parseFloat(newSale);
                var after = before + newSale;
                after = after.toFixed(2);
                users.update({
                    sales: after
                }, {
                    where: {id:newinvoice.userID}
                })
            });
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
                        discount: newinvoice.productDisc
                    }).then (function (results2) {
                        res.json(results2);
                    })
            })
    });

    app.get('/create-client', loggedIn, function(req, res, next){
        res.render('create-client',{
            // isAuth returns true or false
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });

    app.post('/api/new/client', loggedIn, function(req, res, next){
        var newclient = req.body;
        clients.create({
            photo_url: newclient.photo_url,
            salutation: newclient.salutation,
            first_name: newclient.first_name,
            last_name: newclient.last_name,
            nickname: newclient.nickname,
            gender: newclient.gender,
            birthday: newclient.birthday,
            birthstone: newclient.birthstone,
            age: newclient.age,
            marital_status: newclient.marital_status,
            family_members: newclient.family_members,
            anniversary: newclient.anniversary,
            phone_number: newclient.phone_number,
            email_address: newclient.email_address,
            billing_address: newclient.billing_address,
            shipping_address: newclient.shipping_address,
            preferences: newclient.preferences,
            favorites: newclient.favorites,
            employee_id: req.user.id

        })
            .then(function (results) {
                //console.log(results.dataValues.id);
                res.json(results);
            })
    });

    app.get('/create-product', loggedIn, function(req, res, next){
        res.render('create-product',{
            // isAuth returns true or false
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });

    app.post('/api/new/product', loggedIn, function(req, res, next){
        var newproduct = req.body;
        products.create({
            category_id: newproduct.category_id,
            sku: newproduct.sku,
            serial_number: newproduct.serial_number,
            name: newproduct.name,
            designer: newproduct.designer,
            cost: newproduct.cost,
            price: newproduct.price,
            quantity: newproduct.quantity,
            materials: newproduct.materials,
            size: newproduct.size,
            description: newproduct.description,
            image_url: newproduct.image_url

        })
            .then(function (results) {
                //console.log(results.dataValues.id);
                res.json(results);
            })
    });
};