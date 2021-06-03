const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

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

