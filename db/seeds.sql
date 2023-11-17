USE employees_db; 

INSERT INTO department (id, name) 
VALUES 
(1,'Sales'), 
(2,'Engineering'), 
(3,'Finance'), 
(4,'Legal');
INSERT INTO role (id, title, salary, department_id) 
VALUES
 (1,'Sales Lead', 100000, 1),
 (2, 'Sales Associate', 50000, 1),
 (3, 'Lead Engineer', 150000, 2),
 (4, 'Software Engineer', 120000, 2),
 (5, 'Accountant', 125000, 3),
 (6, 'Legal Team Lead', 250000, 4),
 (7, 'Lawyer', 190000, 4);
INSERT INTO employee (id,first_name, last_name, role_id, manager_id)
VALUES (1, "Hannah", "Montana", 1, null), 
(2,"Raven", "Baxter",3, null),
 (3,"Lizzie", "McGuire", 5, null), 
 (4,"Kim", "Possible", 6, null), 
 (5, "Phil", "Diffy", 2, 1), 
 (6,"Alex", "Russo", 4, 2), 
 (7,"Miley", "Stewart", 7, 4);