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
    inquirer.prompt({
        name: "viewEmployees",
        type: "list",
        message: "How would you like to view employees?",
        choices: ['By Name', 'By ID', 'By Manager', 'Back']
    })
    .then(function(answer) {
        switch (answer.viewEmployees){
            case 'By Name':
                viewEmployeesByName();
                break;
            case 'By ID':
                viewEmployeesByID();
                break;
            case 'By Manager':
                viewEmployeesByManager();
                break;
            case 'Back':
                viewOptions();
                break;
        };
    });
};

function viewDepartments() {
    inquirer.prompt({
        name: "viewDepartments",
        type: "list",
        message: "What would you like to view from all the departments?",
        choices: ['View All Names', 'View All Budgets', 'Back']
    })
    .then(function(answer) {
        switch (answer.viewDepartments){
            case 'View All Names':
                viewDepartmentNames();
                break;
            case 'View All Budgets':
                viewDepartmentBudgets();
                break;
            case 'Back':
                viewOptions();
                break;
        };
    });
};

function viewRoles() {
    console.log('View Roles here');
    viewOptions();
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
    inquirer.prompt({
        name: "existingEmployee",
        type: "list",
        message: "Would you like to add or delete?",
        choices: ['Add', 'Delete', 'Back']
    })
    .then(function(answer) {
        switch (answer.existingEmployee){
            case 'Add':
                addEmployees();
                break;
            case 'Delete':
                deleteEmployees();
                break;
            case 'Back':
                existingOptions();
                break;
        };
    });
};

function existingDepartments() {
    inquirer.prompt({
        name: "existingDepartment",
        type: "list",
        message: "Would you like to add or delete?",
        choices: ['Add', 'Delete', 'Back']
    })
    .then(function(answer) {
        switch (answer.existingDepartment){
            case 'Add':
                addDeparment();
                break;
            case 'Delete':
                deleteDepartment();
                break;
            case 'Back':
                existingOptions();
                break;
        };
    });
};

function existingRoles() {
    inquirer.prompt({
        name: "existingRoles",
        type: "list",
        message: "Would you like to add or delete?",
        choices: ['Add', 'Delete', 'Back']
    })
    .then(function(answer) {
        switch (answer.existingRoles){
            case 'Add':
                addRoles();
                break;
            case 'Delete':
                deleteRoles();
                break;
            case 'Back':
                existingOptions();
                break;
        };
    });
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
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
        (async () => {
            const ans1 = await inquirer.prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices: () => {
                        var choiceArray = [];
                        for (var i=0; i<results.length;i++){
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    },
                    message: 'Which role would you like to update?'
                }]);
            const ans2 = await inquirer.prompt([
                {
                    name: 'newName',
                    type: 'input',
                    message: 'What would you like the new name to be?',
                    default: ans1.choice
                }]);
            return {...ans1, ...ans2};
        })()
        .then(function(answer){
            console.log(answer)
        });
    });
};

function updateManagers() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title FROM role INNER JOIN employee ON employee.role_id=role.id WHERE title='manager';", function(err, results) {
        if (err) throw err;
        (async () => {
            const ans1 = await inquirer.prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices: () => {
                        var choiceArray = [];
                        for (var i=0; i<results.length;i++){
                            var fullName = [];
                            fullName.push(results[i].first_name);
                            fullName.push(results[i].last_name);
                            choiceArray.push(fullName.toString().replace(',', ' '));
                        }
                        return choiceArray;
                    },
                    message: 'Who would you like to update?'
                }]);
            const ans2 = await inquirer.prompt([
                {
                    name: 'newName',
                    type: 'input',
                    message: 'What would you like the new name to be? (First and Last Name only)',
                    default: ans1.choice
                }]);
            return {...ans1, ...ans2};
        })()
        .then(function(answer){
            const origName = answer.choice.split(' ');
            const newName = answer.newName.split(' ');
            connection.query('UPDATE employee SET ? WHERE ?',
            [
                {
                    first_name: newName[0]
                },
                {
                    first_name: origName[0]
                }
            ],
            function(error) {
                if (error) throw err;
            });
            connection.query('UPDATE employee SET ? WHERE ?',
            [
                {
                    last_name: newName[1]
                },
                {
                    last_name: origName[1]
                }
            ],
            function(error) {
                if (error) throw err;
            });
            console.log('Manager updated successfully!');
            updateOptions();
        });
    });
};