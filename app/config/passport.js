var passport = require('passport');
var passportLocal = require('passport-local');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var Sequelize = require("sequelize"); 
var sequelize = require("./connection.js");
var employees = require('../models/users.js');
var invoices = require('../models/invoices.js');
var products = require('../models/products.js');

var lowEnd = 0;
var mid = 0;
var highEnd = 0;
var luxury = 0;
var sub = 0;



module.exports = function(app){
	// cookieParser/expressSession middleware needed to feed passport correctly
app.use(cookieParser()); //cookie parser holds the session id
	// session secret prevents anyone from guessing session ids and accessing other users
	// server will know if secret has been changed and deny access
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false 
}));

	// passport middleware needs to be placed after all parsing to work correctly
	// initialize is default passport middleware
app.use(passport.initialize());
	// session puts data into local authentication
	app.use(passport.session());
passport.use(new passportLocal.Strategy(function(username, password, done){
	// teach passport how to authenticate users

	employees.findAll({ where: {user_name: username, password: password }}).then(function(result){

				// checking db for username and password match
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

				});

	}));

	// teach passport how to serialize and deserialize users
passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	employees.findAll({ where: {id: id}}).then(function(result){
		invoices.findAll({ where: {employee_id: result[0].id}}).then(function(result2){


invoices.findAll({ attributes: [[sequelize.fn('COUNT', sequelize.col('subtotal')), 'subtotals']], where: {employee_id: result[0].id} }).then(function(result3){
	console.log(result3[0].dataValues.subtotals);

	 lowEnd = 0;
	 mid = 0;
	 highEnd = 0;
	 luxury = 0;
	 sub = 0;

			// count invoice tiers
				for (i = 0; i < result3[0].dataValues.subtotals; i++){
					sub = parseInt(result2[i].subtotal);
					if (sub < 500){
						lowEnd += 1;
					}else if (sub < 1000 && sub >= 500){
						mid += 1;
					}else if(sub < 5000 && sub >= 1000){
						highEnd += 1;
					}else if (sub >= 5000){
						luxury += 1;
					}else{
						console.log("error");
					}
				}

	var performance = Math.round((result[0].sales / result[0].sales_goals) * 100);
				// make all variables
			done(null, {id: result[0].id, name: result[0].name, sales: result[0].sales, sales_goal: result[0].sales_goals, photo: result[0].photo, performance: performance, lowEnd: lowEnd, mid: mid, highEnd: highEnd, luxury: luxury });
});
		})
	})
});

};