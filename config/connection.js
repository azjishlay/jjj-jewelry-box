// require Sequelize
var Sequelize = require('sequelize');

// setup the mysql connection information
var source = {
            jaws: {
                port: 3306,
                host: ' ',
                user: ' ',
                password: ' ',
                database: ' '
            },
            jeremiah: {
                port: 8889,
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'jewelry'
            },
            jasmine:{
                port: 3306,
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'jewelry'
            },
            jerome:{
                port: 3306,
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'jewelry'
            }
        };

var db = source.jeremiah; 

// connect to the database and log the error or connect as ID
var sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

// export the connection variable for accessing mysql database info
module.exports = sequelize;