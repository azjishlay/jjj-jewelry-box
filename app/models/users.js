// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the db
var sequelize = require("../config/connection.js"); 

// "group" model that matches up with DB
var employees = sequelize.define("employees", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	user_name: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	photo: {
		type: Sequelize.STRING
	},
	name: {
		type: Sequelize.STRING
	},
	gender: {
		type: Sequelize.STRING
	},
	sales: {
		type: Sequelize.INTEGER
	},
	sales_goals: {
		type: Sequelize.INTEGER
	}
});

// Syncs with DB
employees.sync({}).then(function () {
  // Table created
  console.log('employees table created')
});

// Makes the employees Model available for other files (will also create a table)
module.exports = employees;