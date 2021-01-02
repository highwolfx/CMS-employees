DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_ID int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int,
  PRIMARY KEY (id)
);

-- SELECT * FROM role;
-- INSERT INTO role(title, salary, department_ID) VALUES ('Test 2', 4000, 1);
-- INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Alan', 'Peng', 3, 1);
-- SELECT * FROM employee;
-- INSERT INTO department(name) VALUE ('Manufacturing');
-- SELECT * FROM department;
-- SELECT employee.first_name, employee.last_name, role.title FROM role INNER JOIN employee ON employee.role_id=role.id WHERE title='manager';
-- SELECT role.title AS role_title, department_ID, department.name AS department_name FROM role INNER JOIN department ON role.department_ID=department.id;
-- SELECT role.department_ID AS "Department ID", SUM(role.salary) AS Budget, department.name AS "Department Name" FROM role INNER JOIN department ON role.department_ID=department.ID GROUP BY department.name;
-- SELECT DISTINCT a.id AS "Employee ID", a.first_name AS "First Name", a.last_name AS "Last Name", a.id="Manager Name" FROM employee AS a LEFT JOIN employee AS b on b.id = a.manager_id;