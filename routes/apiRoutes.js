// require the sequelize models
var kwerry = require('../models/kwerry.js');
var response = require('../models/response.js');
var user = require('../models/user.js');
var group = require('../models/group.js');

module.exports = function(app){
	app.get('/api/kwerry', function(req, res){
		console.log(res);
	});
};