const inquirer = require("inquirer");


const fs = require("fs");
const util = require("util");

// const connection = require("");


async function startPage () {
    const { tasks } = await inquirer.prompt({
        name: 'taskChoices',
        type: 'list',
        message: 'What are you trying to do?',
        choices: ['View all Employees', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department', 'Done']
    }); 
        switch (tasks) {
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
                connection.end();
                break;  
        }
    }




startPage();