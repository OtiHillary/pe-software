CREATE TABLE "user"(
   id SERIAL PRIMARY KEY,
   fullname VARCHAR(50),
   email VARCHAR(255) NOT NULL,
   password VARCHAR(25) NOT NULL,
   type VARCHAR(25),
   created_on  date,
   last_log    date
);


CREATE TABLE Performance (
   id SERIAL PRIMARY KEY,
   dept TEXT NOT NULL,
   type TEXT NOT NULL,
   yield TEXT NOT NULL,
   user_id TEXT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES pesuser (name)
);

CREATE TABLE goals (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   description TEXT NOT NULL,
   status INT,
   day_started DATE,
   due_date DATE,
   user_id TEXT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES pesuser (name)
);

const goals = [
    { name: 'Sales Growth' , desc: 'Growth of sales by X% by 2025, using daily metrics', status: 70, date_started: '', due_date: '', user_id: 'newDev inc' },
    { name: 'Developement' , status: 'Not started', description: 'Growth of sales by X% by 2025, using daily metrics',daysLeft: 12 },
    { name: 'Developement' , status: 'Not started', description: 'Growth of sales by X% by 2025, using daily metrics',daysLeft: 12 },
    { name: 'Databases' , status: 'Not started', description: 'Growth of sales by X% by 2025, using daily metrics',daysLeft: 12 },
    { name: 'Customer Satisfaction' , status: 12, description: 'Growth of sales by X% by 2025, using daily metrics',daysLeft: 11 },
    { name: 'Customer Satisfction' , status: 15, description: 'Growth of sales by X% by 2025, using daily metrics',daysLeft: 20 },
]

INSERT INTO goals (name, description, status, day_started, due_date, user_id)
VALUES ( 'Sales Growth', 'Growth of sales by X% by 2025, using daily metrics', 70, '1990-01-01', '1990-01-01', 'DevSquad inc' );

INSERT INTO goals (name, description, status, day_started, due_date, user_id)
VALUES ( 'Development', 'Growth of sales by X% by 2025, using daily metrics', 50, '1990-01-01', '1990-01-01', 'DevSquad inc' );

INSERT INTO goals (name, description, status, day_started, due_date, user_id)
VALUES ( 'Customer Satisfaction', 'Growth of sales by X% by 2025, using daily metrics', 50, '1990-01-01', '1990-01-01', 'DevSquad inc' );


CREATE TABLE pesuser (
   id SERIAL,
   name VARCHAR(255) PRIMARY KEY NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   gsm VARCHAR(50),
   role VARCHAR(50),
   address TEXT,
   faculty_college VARCHAR(255),
   dob DATE,
   doa DATE,
   poa VARCHAR(255),
   doc VARCHAR(255),
   post VARCHAR(255),
   dopp DATE,
   level VARCHAR(50),
   image VARCHAR(255),
   org VARCHAR(255)
);

CREATE TABLE roles (
   id SERIAL,
   name VARCHAR(255) PRIMARY KEY NOT NULL,
   assigned INT,
   org VARCHAR(255)
);

CREATE TABLE permission (
   id SERIAL PRIMARY KEY,
   manage_user TEXT,
   access_em TEXT,
      ae_all TEXT,
      ae_sub TEXT,
      ae_sel TEXT,
   define_performance TEXT,
      dp_all TEXT,
      dp_sub TEXT,
      dp_sel TEXT,
   access_hierachy TEXT,
   manage_review TEXT,
      mr_all TEXT,
      mr_sub TEXT,
      mr_sel TEXT,
      user_id VARCHAR(255),
      org VARCHAR(255),
   FOREIGN KEY (user_id) REFERENCES pesuser (name)
);

-- permission entire
INSERT INTO permission ( manage_user, access_em, ae_all, ae_sub, ae_sel, define_performance, dp_all, dp_sub, dp_sel, access_hierachy, manage_review, mr_all, mr_sub, mr_sel, user_id )
VALUES (  )


-- roles entries
INSERT INTO roles (name, assigned, org)
VALUES ( 'admin', 1, 'DevSquad inc');

INSERT INTO roles (name, assigned, org)
VALUES ( 'professor', 1, 'DevSquad inc');

INSERT INTO roles (name, assigned, org)
VALUES ( 'UI/UX designer', 1, 'DevSquad inc');

INSERT INTO roles (name, assigned, org)
VALUES ( 'team-lead', 1, 'DevSquad inc');

INSERT INTO roles (name, assigned, org)
VALUES ( 'developer', 1, 'DevSquad inc');

INSERT INTO roles (name, assigned, org)
VALUES ( 'prompt engineer', 1, 'DevSquad inc');

INSERT INTO roles (name, assigned, org)
VALUES ( 'intern', 1, 'DevSquad inc');


-- users entries
INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
VALUES ('DevSquad inc', 'oti.dev@gmail.com', 'otonye', '+1234567890', 'admin', 'd74 post service housing estate', 'Computer Science/unilag', '1990-01-01', '2020-09-01', 'teamlead', 'ID Card', 'Computer Science', '2024-05-31', 'Bachelor', 'young oti.PNG', NULL);


-- others
INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
VALUES ('dave chapelle', 'dave.chapelle@example.com', 'otonye', '+9876543210', 'Professor', 'd74 post service housing estate', 'Arts', '1985-07-15', '2010-01-01', 'Contract', 'Diploma', 'History', NULL, 'PhD', 'young oti.PNG', 'DevSquad inc');

INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
VALUES ('otonye edwin', 'otonye.dev@example.com', 'otonye', '+1234567890', 'team-lead', 'd74 post service housing estate', 'Science/unilag', '1990-01-01', '2020-09-01', 'teamlead', 'ID Card', 'Computer Science', '2024-05-31', 'Bachelor', 'young oti.PNG', 'DevSquad inc');

INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
VALUES ('royce duate', 'duate.chapelle@example.com', 'otonye', '+9876543210', 'UI/UX designer', 'd74 post service housing estate', 'Arts', '1985-07-15', '2010-01-01', 'Contract', 'Diploma', 'History', NULL, 'PhD', 'young oti.PNG', 'DevSquad inc');

INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
VALUES ('hillary clinton ', 'hillary.dev@example.com', 'otonye', '+1234567890', 'developer', 'd74 post service housing estate', 'Science/unilag', '1990-01-01', '2020-09-01', 'teamlead', 'ID Card', 'Computer Science', '2024-05-31', 'Bachelor', 'young oti.PNG', 'DevSquad inc');

INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
VALUES ('jane doe', 'davey.chapelle@example.com', 'otonye', '+9876543210', 'prompt engineer', 'd74 post service housing estate', 'Arts', '1985-07-15', '2010-01-01', 'Contract', 'Diploma', 'History', NULL, 'PhD', 'young oti.PNG', 'DevSquad inc');

