USE todo

INSERT INTO tasks (start_date, subject) VALUES (CURDATE(), "Work out at the gym");
INSERT INTO tasks (start_date, subject) VALUES (CURDATE(), "Do devcourse assignment");
INSERT INTO tasks (start_date, subject) VALUES (CURDATE(), "Meet pair");
INSERT INTO tasks (start_date, subject) VALUES (CURDATE(), "Buy meats");
INSERT INTO tasks (start_date, subject) VALUES (CURDATE() + INTERVAL 1 DAY, "Work out at the gym");
INSERT INTO tasks (start_date, subject) VALUES (CURDATE() + INTERVAL 1 DAY, "Organize dev note");
INSERT INTO tasks (start_date, subject) VALUES (CURDATE() + INTERVAL 3 DAY, "Study and summary sorting algorithms");