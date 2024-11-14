// Description: This file is the entry point of the application. It is responsible for displaying the main menu and calling the appropriate functions based on the user's choice.
import inquirer from 'inquirer';
import {connectToDb} from './connection.js';
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './actions.js';
import { updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDept, totalUtilizedBudget } from './aggfunc.js';
import { chooseDeleteCategory } from './delete.js';


async function mainMenu() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'Delete',
        'Total Utilized Budget of a Department',
        'Exit',
      ],
    },
  ]);

  switch (answer.action) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add a department':
      //  await addDeptIn(); 
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Update an Employee Manager':
      await updateEmployeeManager();
      break;
    case 'View Employees by Manager':
      await viewEmployeesByManager();
      break;
    case 'View Employees by Department':
      await viewEmployeesByDept();
      break;
    case 'Delete':
      await chooseDeleteCategory();
      break;
    case 'Total Utilized Budget of a Department':
      await totalUtilizedBudget();
      break;

    case 'Exit':
      console.log("Goodbye!");
      process.exit();
  }

  mainMenu();
}
await connectToDb();
mainMenu();