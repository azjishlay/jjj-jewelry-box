var users = require('../models/users.js');
var invoices = require('../models/invoices.js');
var line_items = require('../models/line_items.js');
var products = require('../models/products.js');
var product_categories = require('../models/product_categories.js');
var clients = require('../models/clients');

module.exports = function(app){

    // create all of the relations ...
    
    products.belongsTo(product_categories,{foreignKey: 'category_id'});
    product_categories.hasMany(products,{foreignKey:'category_id'});
    
    clients.belongsTo(users,{foreignKey:'employee_id'});
    users.hasMany(clients,{foreignKey:'employee_id'});
    
    line_items.belongsTo(invoices,{foreignKey:'invoice_id'});
    invoices.hasMany(line_items,{foreignKey:'invoice_id'});
    
    line_items.belongsTo(products,{foreignKey:'product_id'});
    products.hasMany(line_items,{foreignKey:'product_id'});
    
    invoices.belongsTo(users,{foreignKey:'employee_id'});
    users.hasMany(invoices,{foreignKey:'employee_id'});
    
    invoices.belongsTo(clients,{foreignKey:'customer_id'});
    clients.hasMany(invoices,{foreignKey:'customer_id'});
    
};