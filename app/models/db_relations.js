var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var clients = require('../models/clients');

module.exports = function(app){

    // create all of the relations ...
    products.belongsTo(categories,{foreignKey: 'category_id'});
    categories.hasMany(products,{foreignKey: 'category_id'});
    
};