// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the DB
var sequelize = require("../config/connection.js"); 

// create model that matches up with DB
var product_categories = sequelize.define("categories", {
	id: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING(255),
	}
});

// sync with DB
product_categories.sync({force: true}).then(function () {
  // Table created
  console.log('created table: product categories')
});

// make model available to others
module.exports = product_categories;