DROP DATABASE IF EXISTS employees; 
CREATE DATABASE employees; 

USE employees; 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    department VARCHAR(30) NOT NULL, 
    employee_id INT,
    REFERENCES employee(id),
    
)

CREATE TABLE role ( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    FOREIGN KEY (department_id)
    REFERENCES department(id),

) 
CREATE TABLE employee ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id 
    FOREIGN KEY (role_id)
    REFERENCES role(id),
)