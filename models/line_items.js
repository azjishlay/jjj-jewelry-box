// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the db
var sequelize = require("../config/connection.js"); 

// "line_items" model that matches up with DB
var line_items = sequelize.define("line_items", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	invoice_id: {
		type: Sequelize.INTEGER
	},
	product_id: {
		type: Sequelize.INTEGER
	},
	date_created: {
		type: Sequelize.DATE
	},
	unit_price: {
		type: Sequelize.FLOAT
	},
	quantity: {
		type: Sequelize.FLOAT
	},
	total: {
		type: Sequelize.FLOAT
	},
	discount: {
		type: Sequelize.FLOAT
	}
});

// Syncs with DB
line_items.sync({force: true}).then(function () {
  // Table created
  console.log('line_items table created')
});

// Makes the line_items Model available for other files (will also create a table)
module.exports = line_items;