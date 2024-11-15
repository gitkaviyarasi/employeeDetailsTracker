CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE department (
    id serial primary key,
    name varchar(30) unique not null
);

CREATE TABLE roles (
    id serial primary key,
    title varchar(30) unique not null,
    salary decimal not null,
    department_id integer not null ,
    foreign key (department_id) references department(id)
);

CREATE TABLE employee(
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    manager_id integer ,
    foreign key (role_id) references roles(id),
    foreign key (manager_id) references employee(id)
)