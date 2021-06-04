const inquirer = require("inquirer");
const mysql = require('mysql2');


require('console.table');

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

// start page questions
function startPage() {


inquirer.prompt([{
    name: 'taskChoices',
    type: 'list',
    message: 'What are you trying to do?',
    choices: ['View all Employees', 'Add Employee','Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Done']
}]) 
.then ( data => {

    
        switch (data.taskChoices) {
            case 'View all Employees':
                showEmps();
                break;
            case  'Add Employee':
                addEmpl();
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
            case  'View all Departments':
                viewDepts();
                break;
            case  'Add Department':
                addDept();
                break;
            
            case  'Done':
            function exit () {
                process.exit()
            }
                break;  
        }
    }) 

};
//department view
async function viewDepts() {
    const departments = await db.promise().query(`
    SELECT * FROM departments
    `);
    console.table(departments[0]);
    startPage();
};

// roles view
async function viewRoles() {
    const roles = await db.promise().query(`
    SELECT roles.id, roles.title, departments.title AS department, roles.salary FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id
    `);
    console.table(roles[0]);
    startPage();
};

// shows the employees
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

async function addDept() {
    const departmentAdd = await inquirer.prompt ([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What department do you need to add?'
        }
    ])
    let answer = departmentAdd.departmentName;
    await db.promise().query('INSERT INTO departments(title) VALUE (?)', answer);
    console.log(` ***The department has been added.*** `);
    startPage();
};

async function addRoles() {
    const dept = await db.promise().query(`SELECT * FROM departments`);
    const departmentName = dept[0].map(( titles ) => {
        return {
            name: titles.name,
            value: titles.id

        }
    })


const roleAdd = await inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What role are we adding?'
    },
    {
        type: 'input', 
        name: 'salary',
        message: 'What is the salary for this role?'
    },
    {
        type: 'list',
        name: 'department',
        message: 'Which department does this role belong to?',
        choices: departmentName
    }
]);

let answer = [roleAdd.title, roleAdd.salary, roleAdd.departments];
await db.promise().query(`INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`, answer);
console.log(` ***The role has been added.*** `);
    startPage();
};

//add a new employee
async function addEmpl(){
    const position = await db.promise().query(`SELECT * FROM roles`);
    const manage = await db.promise().query(`SELECT * FROM employees`);
    const rolesAvail = position[0].map((role) => {
        return{
            name: role.title,
            value: role.id
        }
    });
    const allManagers = manage[0].map((manager) => {
        return {
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id
        }
    });

    const newEm = await inquirer.prompt([
        {
        type:'input',
        name: 'firstName',
        message: 'What is the employees first name?'
    },
    {
        type:'input',
        name: 'lastName',
        message: 'What is the employees last name?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Specify the new employees role:',
        choices: rolesAvail
    },  
    {
        type: 'list',
        name: 'manager',
        message: 'Select a manager:',
        choices: allManagers
    }
    ]);

    const answers = [newEm.firstname, newEm.lastname, newEm.role, newEm.manager];
    await db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, answers);
    console.log(` ***The employee has been added.*** `);
    startPage();
};

async function  updEmRole() {
    
    const allEmployed = await db.promise().query(`SELECT * FROM employees`);
    const allRoles = await db.promise().query(`SELECT * FROM roles`);
    const employeeChoices = allEmployed[0].map((empl) => {
        console.log(empl);
        return {
            name: `${empl.first_name} ${empl.last_name}`,
            value: empl.id
            }
    });
    
    const roleChoices = allRoles[0].map((role) => {
        console.log(role);
        return {
            name: role.title,
            value: role.id
        }
    });

    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: employeeChoices
        }, 
        {
            type: 'list',
            name: 'roleId',
            message: 'What is their new role?',
            choices: roleChoices
        }]);

    await db.promise().query(`UPDATE employees SET role_id = ? Where id = ?`,  [employeeId, roleId]);
        console.log(` ***Employee Successfully Updated.*** `);
        startPage();
};






startPage();