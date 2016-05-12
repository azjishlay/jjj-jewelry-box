// require the sequelize models
var kwerry = require('../models/kwerry.js');
var response = require('../models/response.js');
var user = require('../models/user.js');
var group = require('../models/group.js');

// Routes
module.exports = function(app){

	// Each of the below routes just handles the HTML page that the user gets sent to.
	app.get('/', function(req, res){
		var data = {stuff:{id:1,name:'Jeremiah',points:200}};
		res.render('index',data);
	});

};