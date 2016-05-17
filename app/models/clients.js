// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the db
var sequelize = require("../config/connection.js"); 

// "group" model that matches up with DB
var clients = sequelize.define("clients", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	photo_url: {
		type: Sequelize.STRING
	},
	salutation: {
		type: Sequelize.STRING
	},
	first_name: {
		type: Sequelize.STRING
	},
	last_name: {
		type: Sequelize.STRING
	},
	nickname: {
		type: Sequelize.STRING
	},
	gender: {
		type: Sequelize.STRING
	},
	birthday: {
		type: Sequelize.DATE
	},
	birthstone: {
		type: Sequelize.STRING
	},
	age: {
		type: Sequelize.INTEGER
	},
	marital_status: {
		type: Sequelize.STRING
	},
	family_members: {
	type: Sequelize.STRING
	},
	anniversary: {
		type: Sequelize.DATE
	},
	phone_number: {
		type: Sequelize.STRING
	},
	email_address: {
		type: Sequelize.STRING
	},
	billing_address: {
		type: Sequelize.STRING
	},
	shipping_address: {
		type: Sequelize.STRING
	},
	preferences: {
		type: Sequelize.STRING
	},
	favorites: {
		type: Sequelize.STRING
	},
});

// Syncs with DB
clients.sync({}).then(function () {
  // Table created
  console.log('clients table created')
});

// Makes the employees Model available for other files (will also create a table)
module.exports = clients;