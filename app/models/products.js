// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the DB
var sequelize = require("../config/connection.js"); 

// create model that matches up with DB
var products = sequelize.define("products", {
	item_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true
	},
	category_id: {
		type: Sequelize.INTEGER(11),
	},
	sku: {
		type: Sequelize.INTEGER(11),
	},
	serial_number: {
		type: Sequelize.INTEGER(11),
	},
	name: {
		type: Sequelize.STRING(255),
	},
	designer: {
		type: Sequelize.STRING(255),
	},
	cost: {
		type: Sequelize.DECIMAL(10, 2),
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
	},
	quantity: {
		type: Sequelize.INTEGER(11),
	},
	metal: {
		type: Sequelize.STRING(255),
	},
	size: {
		type: Sequelize.INTEGER(4),
	},
	description: {
		type: Sequelize.STRING(255),
	},
	image_url: {
		type: Sequelize.STRING(255),
	}
});

// sync with DB
products.sync({force: true}).then(function () {
  // Table created
  console.log('created table: products')
});

// make model available to others
module.exports = products;