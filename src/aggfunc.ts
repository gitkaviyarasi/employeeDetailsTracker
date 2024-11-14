import inquirer from 'inquirer';
import { pool } from './connection.js';
import { displayResults } from './actions.js';

export async function updateEmployeeManager(){
    
    try {
        // Step 1: Fetch the list of employees
      //  console.log('Choose an employee to update their manager');
        const employeesResult = await pool.query('SELECT id, first_name,last_name FROM employee');
        const employees = employeesResult.rows;

        const employeeChoices = employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name} (ID: ${emp.id})`,
            value: emp.id
        }));
    const {selectedEmployee,managerId} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedEmployee',
            message: 'Select an employee to update their role',
            choices: employeeChoices
        },
        
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager id',
            validate: (input) => {
                return input.trim() !== '' || 'Manager id cannot be empty';
            }
        }
    ]);
    

            const updateEmpManagerQuery = `UPDATE employee SET manager_id = ${managerId} WHERE id = ${selectedEmployee}`;
            await pool.query(updateEmpManagerQuery);
            console.log('Employee manager updated');
        } catch (err) {
            console.error(err);
          }
  
    //return employee;

}
export async function viewEmployeesByManager(){
    try{
        const managerId = await inquirer.prompt([
            {
                type: 'input',
                name: 'managerIdi',
                message: 'Enter the manager Id',
            }
        ]);

        const selectEmployeesByManager = `SELECT * FROM employee WHERE manager_id = ${managerId.managerIdi}`;
        const result = await pool.query(selectEmployeesByManager);
        displayResults(result);
        

    }
    catch(err){
        console.error(err);
    } 
}

export async function viewEmployeesByDept(){
    try{
        const DeptId = await inquirer.prompt([
            {
                type: 'input',
                name: 'DeptIdin',
                message: 'Enter the Department Id:',
            }
        ]);
        const selectEmployeesByDept = `SELECT 
        e.id AS employee_id, 
        e.first_name,
        e.last_name,
        e.manager_id,
        r.title AS role_title,
        r.salary,d.id AS department_id, 
        d.name AS department_name 
        FROM employee e JOIN roles r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        where d.id = ${DeptId.DeptIdin} ORDER BY d.id, e.last_name;`;

        const result = await pool.query(selectEmployeesByDept);
        displayResults(result);
        
    }
    catch(err){
        console.error(err);
    } 
}

export async function totalUtilizedBudget(){
    try{
        const deptId = await inquirer.prompt([
            {
                type: 'input',
                name: 'deptIdin',
                message: 'Enter the department Id',
            }
        ]);
        const selectTotalUtilizedBudget = ` 
        select department_id,sum(salary) from roles where department_id = ${deptId.deptIdin} group by department_id;`;
        const result = await pool.query(selectTotalUtilizedBudget);
        if (result.rows.length === 0) {
            console.log(`No employees in department ${deptId.deptIdin}`);
            return;
        }
        else{
        displayResults(result);
        }
        

    }
    catch(err){
        console.error(err);
    }

}