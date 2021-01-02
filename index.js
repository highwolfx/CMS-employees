var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

// Grabs Config file with login and password information
var config = require('./config/config.js');
var connection = mysql.createConnection(config.databaseOptions);

connection.connect((err) => {
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
    .then((answer) => {
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
    .then((answer) => {
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
        choices: ['By First Name', 'By Last Name', 'By ID', 'By Department', 'By Manager', 'Back']
    })
    .then((answer) => {
        switch (answer.viewEmployees){
            case 'By First Name':
                viewEmployeesByFirstName();
                break;
            case 'By Last Name':
                viewEmployeesByLastName();
                break;
            case 'By ID':
                viewEmployeesByID();
                break;
            case 'By Manager':
                viewEmployeesByManager();
                break;
            case 'By Department':
                viewEmployeesByDepartment();
                break;
            case 'Back':
                viewOptions();
                break;
        };
    });
};

function viewEmployeesByFirstName(){
    connection.query('SELECT DISTINCT a.first_name AS "First Name", a.last_name AS "Last Name", c.title AS "Role Title", d.name AS "Department", a.id AS "Employee ID", b.first_name AS "Manager First Name", b.last_name AS "Manager Last Name" FROM employee AS a INNER JOIN role AS c ON a.role_id=c.id LEFT OUTER JOIN employee AS b ON b.id=a.manager_id INNER JOIN department AS d ON c.department_ID=d.id ORDER BY a.first_name;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
        console.log('\n');
        console.log('\n');
    });
    viewEmployees();
};

function viewEmployeesByLastName(){
    connection.query('SELECT DISTINCT a.last_name AS "Last Name", a.first_name AS "First Name", c.title AS "Role Title", d.name AS "Department", a.id AS "Employee ID", b.first_name AS "Manager First Name", b.last_name AS "Manager Last Name" FROM employee AS a INNER JOIN role AS c ON a.role_id=c.id LEFT OUTER JOIN employee AS b ON b.id=a.manager_id INNER JOIN department AS d ON c.department_ID=d.id ORDER BY a.last_name;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
        console.log('\n');
        console.log('\n');
    });
    viewEmployees();
};

function viewEmployeesByID(){
    connection.query('SELECT DISTINCT a.id AS "Employee ID", a.first_name AS "First Name", a.last_name AS "Last Name", c.title AS "Role Title", d.name AS "Department", b.first_name AS "Manager First Name", b.last_name AS "Manager Last Name" FROM employee AS a INNER JOIN role AS c ON a.role_id=c.id LEFT OUTER JOIN employee AS b ON b.id=a.manager_id INNER JOIN department AS d ON c.department_ID=d.id ORDER BY a.id;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
        console.log('\n');
        console.log('\n');
    });
    viewEmployees();
};

function viewEmployeesByManager(){
    connection.query('SELECT DISTINCT b.first_name AS "Manager First Name", b.last_name AS "Manager Last Name", a.first_name AS "First Name", a.last_name AS "Last Name", a.id AS "Employee ID", c.title AS "Role Title", d.name AS "Department" FROM employee AS a INNER JOIN role AS c ON a.role_id=c.id LEFT OUTER JOIN employee AS b ON b.id=a.manager_id INNER JOIN department AS d ON c.department_ID=d.id ORDER BY b.first_name;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
        console.log('\n');
        console.log('\n');
    });
    viewEmployees();
};

function viewEmployeesByDepartment(){
    connection.query('SELECT DISTINCT d.name AS "Department", a.first_name AS "First Name", a.last_name AS "Last Name", c.title AS "Role Title", a.id AS "Employee ID", b.first_name AS "Manager First Name", b.last_name AS "Manager Last Name" FROM employee AS a INNER JOIN role AS c ON a.role_id=c.id LEFT OUTER JOIN employee AS b ON b.id=a.manager_id INNER JOIN department AS d ON c.department_ID=d.id ORDER BY d.name;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
        console.log('\n');
        console.log('\n');
    });
    viewEmployees();
};


function viewDepartments() {
    inquirer.prompt({
        name: "viewDepartments",
        type: "list",
        message: "What would you like to view from all the departments?",
        choices: ['View All Names', 'View All Budgets', 'Back']
    })
    .then((answer) => {
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

function viewDepartmentNames() {
    connection.query('SELECT id AS "Department ID", name AS "Department Name" FROM department;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
    });
    viewDepartments();
}

function viewDepartmentBudgets() {
    connection.query('SELECT role.department_ID AS "Department ID", SUM(role.salary) AS Budget, department.name AS "Department Name" FROM role INNER JOIN department ON role.department_ID=department.ID GROUP BY department.name;', (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
    });
    viewDepartments();
}


function viewRoles() {
    connection.query('SELECT role.title AS "Role Title", department_ID AS "Department ID", department.name AS "Department Name" FROM role INNER JOIN department ON role.department_ID=department.id GROUP BY department.id;',  (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('----------');
        console.log('\n');
        console.log('\n');
    });
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
    .then((answer) => {
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
    .then((answer) => {
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
    .then((answer) => {
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
    .then((answer) => {
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
    .then((answer) => {
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
    connection.query("SELECT * FROM role", (err, results) => {
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
                    default: ans1.choice,
                    validate: (input) => {
                        for (var i=0; i<results.length;i++){
                            if(input === results[i].title){
                                return 'You already have this role set. PLease choose another role name.';
                            };
                        };
                        if(input===""){
                            return 'Please enter a valid role name.';
                        } else{
                            return true;
                        };
                    }
                }]);
            return {...ans1, ...ans2};
        })()
        .then((answer) => {
            connection.query('UPDATE role SET ? WHERE ?',
            [
                {
                    title: answer.newName
                },
                {
                    title: answer.choice
                }
            ],
            (error) => {
                if (error) throw err;
            });
            console.log('----------')
            console.log(`Employee Role updated successfully! ${answer.choice} has been changed to ${answer.newName}!`);
            console.log('----------')
            updateOptions();
        });
    });
};

function updateManagers() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title FROM role INNER JOIN employee ON employee.role_id=role.id WHERE title='manager';", (err, results) => {
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
        .then((answer) => {
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
            (error) => {
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
            (error) => {
                if (error) throw err;
            });
            console.log('----------')
            console.log(`Manager updated successfully! ${answer.choice} has been changed to ${answer.newName}!`);
            console.log('----------')
            updateOptions();
        });
    });
};