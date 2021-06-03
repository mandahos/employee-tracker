const inquirer = require("inquirer");
const mysql = require('mysql2');

require('console.table');

// const db = require("./db/connection");
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Loralai!76',
        database: 'employeetracker' 
    },
    console.log('Connected')
);

db.connect(function(err){
    if(err) throw err;
    startPage();
});


function startPage() {


inquirer.prompt([{
    name: 'taskChoices',
    type: 'list',
    message: 'What are you trying to do?',
    choices: ['View all Employees', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department', 'Done']
}]) 
.then ( data => {

    
        switch (data.taskChoices) {
            case 'View all Employees':
                showEmps();
                break;
            case  'Add Employee':
                addEmpl();
                break;
            case  'Remove Employee':
                rmvEmpl();
                break; 
            case  'Update Employee Role':
                updEmRole();
                break;
            case  'View all Roles':
                viewRoles(); 
                break;
            case  'Add Role': 
                addRoles();
                break;
            case  'Remove Role':
                rmvRole();
                break;
            case  'View all Departments':
                viewDepts();
                break;
            case  'Add Department':
                addDept();
                break;
            case  'Remove Department':
                rmvDept();
                break; 
            case  'Done':
            function exit () {
                process.exit()
            }
                break;  
        }
    }) 

}




async function showEmps() {
    const employees = await db.promise().query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.title AS department, roles.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees
    LEFT JOIN employees manager ON manager.id = employees.manager_id
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON departments.id = roles.department_id
    `);
    console.table(employees[0]);
    startPage();
    
};

async function viewRoles() {
    const roles = await db.promise().query(`
    SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles
    LEFT JOIN departments ON roles.department_id = department.id
    `);
    console.table(roles[0]);
    startPage();
};

async function viewDepts() {
    const departments = await db.promise().query(`
    SELECT * FROM departments
    `);
    console.table(departments[0]);
    startPage();
};





startPage();