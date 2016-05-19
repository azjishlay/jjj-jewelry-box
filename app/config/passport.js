var passport = require('passport');
var passportLocal = require('passport-local');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var Sequelize = require("sequelize"); 
var sequelize = require("./connection.js");
var employees = require('../models/users.js');
var invoices = require('../models/invoices.js');
var products = require('../models/products.js');




module.exports = function(app){
	// cookieParser/expressSession middleware needed to feed passport correctly
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false 
}));

	// passport middleware needs to be placed after all parsing to work correctly
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(function(username, password, done){
	// teach passport how to authenticate users
	// add code to check username and password with DB here

	employees.findAll({ where: {user_name: username, password: password }}).then(function(result){


		// if(!Error) {
			if (username === result[0].user_name && password === result[0].password) {

				done(null, {
					id: result[0].id,
					name: result[0].name,
					sales: result[0].sales,
					sales_goal: result[0].sales_goals,
					photo: result[0].photo
				});

				employeeID = result[0].id;

			} else{
				done(null, null);
			}
		// } else {
		// 		// done(new Error('login failed'));
		// 		console.log('error: ' + Error);
		// 	}
				});

	}));

	// teach passport how to serialize and deserialize users
passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	employees.findAll({ where: {id: id}}).then(function(result){
		invoices.findAll({ where: {employee_id: result[0].id}}).then(function(result2){

				var lowEnd = 0;
				var mid = 0;
				var highEnd = 0;
				var luxury = 0;
				var sub = 0;
invoices.findAll({ attributes: [[sequelize.fn('COUNT', sequelize.col('subtotal')), 'subtotals']], where: {employee_id: result[0].id} }).then(function(result3){
	console.log(result3[0].dataValues.subtotals);

			// console.log("result:" + JSON.parse(result2[0]));

				for (i = 0; i < result3[0].dataValues.subtotals; i++){
					sub = parseInt(result2[i].subtotal);
					if (sub < 500){
						lowEnd += sub;
					}else if (sub < 1000 && sub >= 500){
						mid += sub;
					}else if(sub < 5000 && sub >= 1000){
						highEnd += sub;
					}else if (sub >= 5000){
						luxury += sub;
					}else{
						console.log("error");
					}
				}

			done(null, {id: result[0].id, name: result[0].name, sales: result[0].sales, sales_goal: result[0].sales_goals, photo: result[0].photo, performance: (result[0].sales / result[0].sales_goals) * 100, lowEnd: lowEnd, mid: mid, highEnd: highEnd, luxury: luxury });
});
		})
	})
});

};