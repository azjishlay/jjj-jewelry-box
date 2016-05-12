// require the sequelize npm app
var Sequelize = require("sequelize"); 

// require the connection to the db
var sequelize = require("../config/connection.js"); 

// "kwerry" model that matches up with DB
var kwerry = sequelize.define("kwerry", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING
	},
	content: {
		type: Sequelize.STRING
	},
	date_created: {
		type: Sequelize.DATE
	},
	user_fk: {
		type: Sequelize.INTEGER
	},
	points: {
		type: Sequelize.INTEGER
	}
});

// Syncs with DB
kwerry.sync({force: true}).then(function () {
  // Table created
  console.log('kwerry table created')
});

// Makes the kwerry Model available for other files (will also create a table)
module.exports = kwerry;