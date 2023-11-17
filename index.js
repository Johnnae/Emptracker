const inquirer = require('inquirer');
const db = require('./db/connection');
const { add } = require('lodash');


function init(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices:["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"]
    }
  ]).then((answers) => {
    switch (answers.choice) {
      case "View Departments":
        viewDepartments();
        break;
      case "View Roles": 
        viewRoles();
        break;
      case "View Employees":
        viewEmployees();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role": 
        addRole();
        break;
      case "Add Employee":
        addEmployee()
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;

      default:
        db.end();
        break;
    }
  })
}

function viewDepartments(){
  db.query("SELECT * FROM department", function(err, results){
    if (err) throw err;
    console.table(results);
    init();
  })
}

function viewRoles(){
  db.query("SELECT role.title, department.name AS Department, role.salary FROM role LEFT JOIN department ON role.department_id=department.id", function(err, results){
    if (err) throw err;
    console.table(results);
    init();
  })
}



init()