-- select * from employee;

--delete     from department where id = 2;
SELECT *  from department;

select * from roles;

select * from employee;
-- select 
-- department_id AS department_id,
--   --  d.name AS department_name,
--     SUM(r.salary) AS Total_utilized_budget
-- FROM 
--  roles r ON e.role_id = r.id
-- JOIN 
--     department d ON r.department_id = d.id
-- WHERE 
--     department_id = 2
-- GROUP BY 
--     department_id;

    select department_id,sum(salary) from roles group by department_id;


--     d.id AS department_id,
--     d.name AS department_name,
--     SUM(r.salary) AS Total_utilized_budget
-- FROM 
--     employee e
-- JOIN 

--     roles r ON e.role_id = r.id
-- JOIN 
--     department d ON r.department_id = d.id
-- WHERE 
--     d.id = 3
-- GROUP BY 
--     d.id, d.name;