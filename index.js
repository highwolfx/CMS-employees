var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require('./config/config.js');
var connection = mysql.createConnection(config.databaseOptions);


connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        name: "toplevel",
        type: "list",
        message: "What would you like to do?",
        choices: ['View', 'Add/Delete', 'Edit Existing', 'Exit']
    })
    .then(function(answer) {
        switch (answer.toplevel){
            case 'View':
                viewOptions();
                break;
            case 'Add/Delete':
                addOptions();
                break;
            case 'Edit Existing':
                editOptions();
                break;
            case 'Exit':
                connection.end();
                break;
        };
    });
};

function viewOptions() {
    inquirer.prompt({
        name: "query",
        type: "list",
        message: "What would you like to view?",
        choices: ['Employees', 'Departments', 'Roles', 'Back']
    })
    .then(function(answer) {
        switch (answer.query){
            case 'Employees':
                viewEmployees();
                break;
            case 'Departments':
                viewDepartments();
                break;
            case 'Roles':
                viewRoles();
                break;
            case 'Back':
                start();
                break;
        };
    });
};

function viewEmployees() {

};

function viewDepartments() {

};

function viewRoles() {

};



function addOptions() {

};



function editOptions() {

};