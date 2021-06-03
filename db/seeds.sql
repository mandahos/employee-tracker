INSERT INTO departments (title)
VALUES
    ('Managment'),
    ('HR'),
    ('Sales'),
    ('Web Development'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Managment', 68000, 1 ),
    ('HR', 55000, 2),
    ('Sales', 75000, 3 ),
    ('Web Developer', 88000, 4),
    ('Lawyer', 150000, 5);    

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Aileen', 'Wuornos', 1, NULL),
    ('Myra', 'Hindley', 2, NULL),
    ('Ted', 'Bundy', 3, 1),
    ('Joel', 'Rifkin', 4, 1),
    ('Andrei', 'Chikatilo', 5, 2),
    ('Charles', 'Cullen', 2, 2),
    ('Pedro', 'Rodrigues-Filho', 4, 2);



