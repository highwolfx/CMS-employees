var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require('./config/config.js');
var connection = mysql.createConnection(config.databaseOptions);


connection.connect(function(err) {
    if (err) throw err;
    start();
});