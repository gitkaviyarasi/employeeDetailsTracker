import inquirer from "inquirer";
import { pool } from "./connection.js";


export async function chooseDeleteCategory()
{
    const answer = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to delete?',
        choices: ['1.Delete Department', '2.Delete Role', '3.Delete Employee', 'Return to Main Menu'],
    }]);
    
    switch (answer.action) {
        case '1.Delete Department':
        await deleteDepartment();
        break;
    
        case '2.Delete Role':
        await deleteRole();
        break;
    
        case '3.Delete Employee':
        await deleteEmployee();
        break;
    
        case 'Return to Main Menu':
        process.exit();
        break;
    }
}

export async function deleteDepartment(){
    const deptId = await inquirer.prompt([
        {
            type: 'input',
            name: 'deptId',
            message: 'Enter the department Id',
            validate: (input) => {
                return input.trim() !== '' || 'Department id cannot be empty';
            }
        }
    ]);
    try{
    const deleteDeptQuery = `DELETE FROM department WHERE id = ${deptId.deptId}`;
    await pool.query(deleteDeptQuery);
    console.log(`Department Id ${deptId.deptId} deleted`);
    }
    catch(err:any){
        if((err.code)=== '23503'){
        console.log('Department Id is referenced in another table. Please delete the reference first');
        await chooseDeleteCategory();
        }
        else{
        console.error(err);
        }

    }
}

export async function deleteRole(){
    const roleId = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role Id',
            validate: (input) => {
                return input.trim() !== '' || 'Role id cannot be empty';
            }
        }
    ]);
    try{
    const deleteRoleQuery = `DELETE FROM roles WHERE id = ${roleId.roleId}`;
    await pool.query(deleteRoleQuery);
    console.log(`Role id ${roleId.roleId} deleted`);
    }
    catch(err:any){
        if((err.code)=== '23503'){
        console.log('Role Id is referenced in another table. Please delete the reference first');
        await chooseDeleteCategory();
        }
        else{
        console.error(err);
        }

    }
    
}

export async function deleteEmployee(){
    const employeeId = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the employee Id',
            validate: (input) => {
                return input.trim() !== '' || 'Employee id cannot be empty';
            }
        }
    ]);
    try{
    const deleteEmployeeQuery = `DELETE FROM employee WHERE id = ${employeeId.employeeId}`;
    await pool.query(deleteEmployeeQuery);
    console.log(`Employee Id ${employeeId.employeeId} deleted`);
    }
    catch(err:any){
        if((err.code)=== '23503'){
        console.log('Employee Id is referenced in another row. Please delete the reference first');
        await chooseDeleteCategory();
        }
        else{
        console.error(err);
        }

    }
}