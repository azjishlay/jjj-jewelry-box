// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the DB
var sequelize = require("../config/connection.js"); 

// create model that matches up with DB
var products = sequelize.define("products", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	category_id: {
		type: Sequelize.INTEGER
	},
	sku: {
		type: Sequelize.INTEGER
	},
	serial_number: {
		type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING
	},
	designer: {
		type: Sequelize.STRING
	},
	cost: {
		type: Sequelize.DECIMAL
	},
	price: {
		type: Sequelize.DECIMAL
	},
	quantity: {
		type: Sequelize.INTEGER
	},
	materials: {
		type: Sequelize.STRING
	},
	size: {
		type: Sequelize.INTEGER
	},
	description: {
		type: Sequelize.STRING
	},
	image_url: {
		type: Sequelize.STRING
	}
});

// sync with DB
products.sync({}).then(function () {
  // Table created
  console.log('created table: products')
});

// make model available to others
module.exports = products;