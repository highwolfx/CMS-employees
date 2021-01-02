var mysql = require("mysql");
var inquirer = require("inquirer");

// Grabs Config file with login and password information
var config = require('./config/config.js');
var connection = mysql.createConnection(config.databaseOptions);


connection.connect(function(err) {
    if (err) throw err;
    start();
});


// Top level introduction question
function start() {
    inquirer.prompt({
        name: "toplevel",
        type: "list",
        message: "What would you like to do?",
        choices: ['View', 'Add/Delete', 'Update Existing', 'Exit']
    })
    .then(function(answer) {
        switch (answer.toplevel){
            case 'View':
                viewOptions();
                break;
            case 'Add/Delete':
                existingOptions();
                break;
            case 'Update Existing':
                updateOptions();
                break;
            case 'Exit':
                connection.end();
                break;
        };
    });
};


// All "View" Options
function viewOptions() {
    inquirer.prompt({
        name: "viewlevel",
        type: "list",
        message: "What would you like to view?",
        choices: ['Employees', 'Departments', 'Roles', 'Back']
    })
    .then(function(answer) {
        switch (answer.viewlevel){
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


// All "Add/Delete" Options
function existingOptions() {
    inquirer.prompt({
        name: "existinglevel",
        type: "list",
        message: "What would you like to add/delete",
        choices: ['Employees', 'Departments', 'Roles', 'Back']
    })
    .then(function(answer) {
        switch (answer.existinglevel){
            case 'Employees':
                existingEmployees();
                break;
            case 'Departments':
                existingDepartments();
                break;
            case 'Roles':
                existingRoles();
                break;
            case 'Back':
                start();
                break;
        };
    });
};

function existingEmployees() {

};

function existingDepartments() {

};

function existingRoles() {

};


// All "Update" options
function updateOptions() {
    inquirer.prompt({
        name: "updatelevel",
        type: "list",
        message: "What would you like to update?",
        choices: ['Employees Roles', 'Employee Managers', 'Back']
    })
    .then(function(answer) {
        switch (answer.updatelevel){
            case 'Employees Roles':
                updateRoles();
                break;
            case 'Employee Managers':
                updateManagers();
                break;
            case 'Back':
                start();
                break;
        };
    });
};

function updateRoles() {

};

function updateManagers() {

};