// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the db
var sequelize = require("../config/connection.js"); 

// "invoices" model that matches up with DB
var invoices = sequelize.define("invoices", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	employee_id: {
		type: Sequelize.INTEGER
	},
	customer_id: {
		type: Sequelize.INTEGER
	},
	date_created: {
		type: Sequelize.DATE
	},
	subtotal: {
		type: Sequelize.FLOAT
	},
	taxes: {
		type: Sequelize.FLOAT
	},
	total: {
		type: Sequelize.FLOAT
	},
	payment_amount: {
		type: Sequelize.FLOAT
	},
	payment_type: {
		type: Sequelize.STRING
	}
});

// Syncs with DB
invoices.sync({}).then(function () {
  // Table created
  console.log('invoices table created')
});

// Makes the invoices Model available for other files (will also create a table)
module.exports = invoices;