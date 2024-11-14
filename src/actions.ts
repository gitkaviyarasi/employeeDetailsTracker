import {pool} from './connection.js';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';
import { green,red } from 'console-log-colors';
//import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';

// selects all department from the department table.
export async function viewDepartments() {
     const  selectAllDepartments = `SELECT * FROM department`;
     try {
        const result = await pool.query(selectAllDepartments);
        displayResults(result);
    } catch (err) {
        console.error(err);
      }
    }

// selects all roles from the roles table.    
export async function viewRoles() {
    const  selectAllRoles = `SELECT * FROM roles`;
    try {
        const result = await pool.query(selectAllRoles);
        displayResults(result);
    } catch (err) {
        console.error(err);
      }
    }

export async function viewEmployees() {
    const  selectAllEmployees = `SELECT * FROM employee`;
    try {
        const result = await pool.query(selectAllEmployees);
        displayResults(result);
    } catch (err) {
        console.error(err);
      }
    }
   // gets the department name from the user and inserts it into the department table. 
   export async function addDepartment(){
    const adddepartment = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department name',
            validate: (input) => {
                return input.trim() !== '' || 'Department name cannot be empty';
            }
        }
    ]);
    if (adddepartment.department) {
        try {
            const addDeptQuery = `INSERT INTO department (name) VALUES ('${adddepartment.department}')`;
            await pool.query(addDeptQuery);
            console.log(green('Department added'));
        } catch (err) {
            console.error(err);
          }
    }
}

// Gets the role title, salary and department id from the user and inserts it into the roles table.
export async function addRole(){
    const addrole = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role title',
                validate: (input) => {
                    return input.trim() !== '' || 'Role title cannot be empty';
                }
        },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary',
                validate: (input) => {
                    return input.trim() !== '' || 'Role salary cannot be empty';
                }
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id',
                validate: (input) => {
                    return input.trim() !== '' || 'Department id cannot be empty';
                }
            }
    
       
    ]);
    if (addrole.title) {
        try {
            const addRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES ('${addrole.title}', ${addrole.salary}, ${addrole.department_id})`;
            await pool.query(addRoleQuery);
            console.log(green('Role added'));
        } catch (err:any) {
            if (err.code === '23503') {
                console.log(red('Department ID does not exist. Please enter a valid department ID'));
                console.log(red(err.detail))
                //344await addRole();
            }else{
            console.error(err.code);
            console.error(err.detail);
            }
          }
    }
}
// adds a new employee to the employee table.
export async function addEmployee(){
    const addemployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employee first name',
            validate: (input) => {
                return input.trim() !== '' || 'Employee first name cannot be empty';
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employee last name',
            validate: (input) => {
                return input.trim() !== '' || 'Employee last name cannot be empty';
            }
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role id',
            validate: (input) => {
                return input.trim() !== '' || 'Role id cannot be empty';
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager id',
        }
    ]);
    {
        try {
            if (addemployee.manager_id === '') {
                const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${addemployee.first_name}', '${addemployee.last_name}', ${addemployee.role_id})`;
                await pool.query(addEmployeeQuery);
                console.log(green('Employee added'));
            }
            
            else {
            const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${addemployee.first_name}', '${addemployee.last_name}', ${addemployee.role_id}, ${addemployee.manager_id})`;
            await pool.query(addEmployeeQuery);
            console.log(green('Employee added'));
            }
        } catch (err:any) {
            if (err.code === '23503') {
                console.log(red(err.detail))
                console.log(red('Please try again with a correct data'))
                //await addEmployee();
            }
            else{
            console.error(err);
        }

          }
       
    }

}

//WHEN I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database
export async function updateEmployeeRole(){
    try {
        // Step 1: Fetch the list of employees
        const employeesResult = await pool.query('SELECT id, first_name,last_name FROM employee');
        const employees = employeesResult.rows;

        const employeeChoices = employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name} (ID: ${emp.id})`,
            value: emp.id
        }));

    const { selectedEmployee,roleid } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedEmployee',
                message: 'Select an employee to update their role',
                choices: employeeChoices
            },
            {
                type: 'input',
                name: 'roleid',
                message: 'Enter the new role ID for the employee',
                validate: (input) => {
                    return input.trim() !== '' || 'Role ID cannot be empty';
                }
            
            }
        ]);
        //const updroleid = answers.roleid;
        const updateRoleQuery = `UPDATE employee SET role_id = $1 WHERE id = $2`;
        await pool.query(updateRoleQuery, [roleid, selectedEmployee]);

        console.log(green('Employee role updated successfully.'));
    } catch (error) {
        console.error("An error occurred while updating the employee's role:", error);
    }
}
            


export function displayResults(result: QueryResult) {
    // Get headers from the first row
    const headers = Object.keys(result.rows[0]);

    // Calculate the maximum width of each column
    const columnWidths = headers.map(header => {
        return Math.max(
            header.length,
            ...result.rows.map(row => (row[header] ? row[header].toString().length : 0))
        );
    });

    // Display headers with correct spacing
    const headerRow = headers.map((header, index) => header.padEnd(columnWidths[index])).join('\t');
    console.log(green(headerRow));

    // Display a separator line
    console.log(columnWidths.map(width => '-'.repeat(width)).join('\t'));

    // Display rows with correct spacing
    result.rows.forEach(row => {
        const rowText = headers
            .map((header, index) => (row[header] ? row[header].toString() : '').padEnd(columnWidths[index]))
            .join('\t');
        console.log(green(rowText));
    });


}
