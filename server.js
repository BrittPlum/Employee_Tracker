const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'root',
    database: 'employeeTracker_db',
});

// using inquierer to get routes to all our methods 


const start = () => {
    inquirer
        .prompt({
            name: "start",
            type: 'list',
            message: "What would you like to do?",
            choices: ['add', 'view', 'update', 'delete'],
        })
        .then((answer) => {
            if (answer.start === 'add') {
                addRoute();
            } else if (answer.start === 'view') {
                viewRoute();
            } else if (answer.start === 'update') {
                updateRoute();
            } else{
                deleteRoute();
            }
        })
}

const addRoute = () => {
    inquirer
        .prompt({
            name: "add",
            type: 'list',
            message: "Would you like to add department, role, or employee?",
            choices: ['department', 'role', 'employee']
        })
        .then((answer) => {
            if (answer.add === 'department') {
                addDepartment();
            } else if (answer.add === 'role') {
                addRole();
            } else {
                addEmployee();
            }
        })
}

const viewRoute = () => {
    inquirer
        .prompt({
            name: 'view',
            type: 'list',
            message: 'What would you like to view?',
            choices: ['department', 'role', 'employee']
        })
        .then((answer) => {
            if (answer.view === 'department') {
                viewDepartment();
            } else if (answer.view === 'role') {
                viewRole();
            } else {
                viewEmployee();
            }
        })
}

const updateRoute = () => {
    inquirer
        .prompt({
            name: 'update',
            type: 'list',
            message: 'What would you like to update?',
            choices: ['department', 'role', 'employee']
        })
        .then((answer) => {
            if (answer.update === 'department') {
                updateDepartment();
            } else if (answer.update === 'role') {
                updateRole();
            }  {
                updateEmployee();
            }
        })
}

const deleteRoute = () => {
    inquirer
        .prompt({
            name: 'delete',
            type: 'list',
            message: 'What would you like to delete?',
            choices: ['department', 'role', 'employee']
        })
        .then((answer) => {
            if (answer.delete === 'department') {
                deleteDepartment();
            } else if (answer.delete === 'role') {
                deleteeRole();
            } else{
                deleteEmployee();
            }
        })
}



const addDepartment = () => {
    inquirer
        .prompt({
            name:'department',
            message:'What would you like to name your department?'
        })
        .then((answer) => {
            connection.query(
            'INSERT INTO department SET ?',
            {
                name:answer.department
            },
            (err) => {
            if(err) throw err;
            console.log('Your deparmtnet was added sucessfully');
             }
       )})
}
const addRole = () => {
    inquirer 
        .prompt([
            {
            name:'title',
            message:'What is the title of the role you are adding?'
            },
            {
            name:'salary',
            message:'What is the salary for the role you are adding?'
            },
            {
            name:'department_id',
            message:'what is the department_id for the role you are adding?'
            }   
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
           {
               title:answer.title,
               salary:answer.salary,
               department_id:answer.department_id
           },
           (err) => {
               if(err) throw err;
               console.log('Your role has been added sucessfully');
           }
        )})

}

const addEmployee = () => {
    inquirer
    .prompt([
        {
        name:'first',
        message:'What is the first name of the employee you would like to add?'
        },
        {
        name:'last',
        message:'What is the last name of the employee you would like to add?'
        },
        {
        name:'role',
        message:'What is the role id of the employee you would like to add'
        },
        {
        name:'manager',
        message:'What is the manager id of the employee you are trying to add?'
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first:answer.first_name,
                last:answer.last_name,
                role:answer.role_id,
                manager:answer.manager_id
            },
            (err) => {
                if(err) throw err;
                console.log('Your employee has been added sucessfully');
            }
    )})
}


const viewDepartment = () => {
    connection.query(
        'SELECT * FROM departmnent',
        (err, results) => {
             if(err) throw err;
             console.table(results)
             start();
         
        })

}

const viewRole = () => {
    connection.query(
        'SELECT role.title as title, role.salary as salary, department.name AS department FROM role JOIN department ON role.department_id = department.id', 
         (err, results) => {
             if(err) throw err;
             console.table(results)
             start();
         }
        )
}

const viewEmployee = () => {
    connection.query(
        'SELECT one.first_name AS First, one.last_name AS Last, role.title as title, role.salary as Salary, CONCAT(two.first_name, " ", two.last_name) AS Manager FROM employee one JOIN employee two on one.manager_id = two.id JOIN role ON one.role_id = role.id',
    (err, results) => {
        if(err) throw err;
        console.table(results)
        start();
    }
  )
}


// const byManager = () => {
//     connection.query(
//         'SELECT * FROM emplopyee WHERE manager_id= ?', (err, results) => {
//             inquiere
//             .prompt({
//                 {
//                     name:'manager',
//                     message:''
//                 }
//             })
            
//     }
    
  
//     )}


// const updateEmployeeRole = () => {}

// const updateEmployeeManager = () => {}


 const deleteDeparment = () => {
     connection.query(
         ''
     )
 }

 const deleteRole = () => {}

 const deleteEmployee = () => {}







connection.connect((err) => {
    if (err) throw err;
    start();
});