DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department(
id INTEGER,
name VARCHAR(30),
PRIMARY KEY (id)
)

CREATE TABLE role(
    id INTEGER,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
)

CREATE TABLE employee(
    id INTEGER,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
)

--   * Add departments, roles, employees

--   * View departments, roles, employees

--   * Update employee roles
--   * Update employee managers

--   * View employees by manager

--   * Delete departments, roles, and employees

--   * View the total utilized budget of a department ie the combined salaries of all employees in that department

-- look at great bay example activity 10 in sql