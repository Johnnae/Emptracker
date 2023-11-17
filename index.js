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

function viewEmployees(){
  const query= "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee manager ON manager.id=employee.manager_id"
 
  db.query(query, function(err, results){
    if (err) throw err;
    console.table(results);
    init();
  })
 }

 function addDepartment(){
   inquirer.prompt([
     {
       type: 'input',
       name: 'name',
       message: 'What is the name of the department?'
     }
   ]).then((department) => {
     db.query("INSERT INTO department(name) VALUES (?)", department.name, function(err, results){
       if (err) throw err;
       console.log(`The ${department.name} Department was added`);
       init();
     })
   })
 }

 function addRole(){ 
    db.query("SELECT * FROM department", function(err, results){
      if (err) throw err;
      const departmentChoices = results.map((department) =>({
          name: department.name,
          value: department.id
      }))
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message:"What is the role's salary?"
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'What department does the role belong to?',
          choices: departmentChoices
        }
        
       ]).then((role) => {
         db.query("INSERT INTO role SET ?", role, function(err, results){
           if (err) throw err;
           console.log(`The ${role.title} role was added`);
           init();
         })
       })

    })
  }

  function addEmployee(){
    db.query("SELECT * FROM role", function(err, results){
      if (err) throw err;
      const roleChoices = results.map((role) =>({
          name: role.title,
          value: role.id
      }))

      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message:'What is the employee last name?'
        },
        {
          type: 'list',
          name: 'role_id',
          message: "What is the employee's role?",
          choices: roleChoices
        }
      ]).then((employee) => {
        db.query("INSERT INTO employee SET ?", employee, function(err, results){
          if (err) throw err;
          console.log(`The ${employee.first_name} ${employee.last_name} employee was added`);
          init();
        })
      })
    })
  }

  function updateEmployeeRole(){

    db.query("SELECT * FROM employee", function(err, results){
      if (err) throw err;
      const employeeChoices = results.map((employee) =>({
          name: employee.first_name + " " + employee.last_name,
          value: employee.id
      }))

      db.query("SELECT * FROM role", function(err, results){
        if (err) throw err;
        const roleChoices = results.map((role) =>({
            name: role.title,
            value: role.id
        }))

        inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'role_id',
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
          }
        ]).then((employee) => {
          db.query("UPDATE employee SET role_id = ? WHERE id = ?", [employee.role_id, employee.employee_id], function(err, results){
            if (err) throw err;
            console.log(`The employee's role was updated`);
            init();
          })
        })
      })
    })
  }
 



init()