-- insert into department (name) values ('Engineering'), ('Sales'), ('Finance'), ('Legal');

-- insert into roles (title, salary, department_id) values ('Software Engineer', 100000, 1), ('Sales person', 80000, 2), ('Accountant', 75000, 3), ('Lawyer', 120000, 4);



 --insert into employee( first_name,last_name,role_id)values('Ram', 'Kumar', 2);


-- insert into employee (first_name, last_name, role_id,manager_id) values 
-- ('John', 'Doe', 1,13),
-- ('Mike', 'Brown', 2,13);

-- delete from employee;
-- insert into employee (first_name, last_name, role_id) values 
-- ('Sakthivel', 'Varashan', 1);

-- select * from employee;
-- insert into employee (first_name, last_name, role_id, manager_id) values 
-- ('Kaviyarasi','Krishnan',1,64),
-- ('Jeyanthi','Rajendran',2,64);
select * From employee;
select * from roles;
select * from Department;

SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.title, r.department_id
FROM employee e
JOIN roles r ON e.role_id = r.id
WHERE r.department_id = 2;

SELECT 
    e.id AS employee_id, 
    e.first_name, 
    e.last_name, 
    e.manager_id, 
    r.title AS role_title, 
    r.salary, 
    d.id AS department_id, 
    d.name AS department_name
FROM 
    employee e
JOIN 
    roles r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id
    where d.id = 2
ORDER BY 
    d.id, e.last_name;


