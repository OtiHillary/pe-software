CREATE TABLE assessment (
   id SERIAL PRIMARY KEY,
   appraisal TEXT NOT NULL,
   performance TEXT NOT NULL,
   stress TEXT NOT NULL,
   status INT,
   day_started DATE,
   due_date DATE,
   user_id TEXT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES pesuser (name)
)

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

CREATE TABLE tools_or_facilities (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    identification_symbol VARCHAR(100),
    location TEXT,
    facility_register_id_number VARCHAR(100),
    type VARCHAR(100),
    priority_rating VARCHAR(50),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "index" (
   id SERIAL PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   redundancy NUMERIC,
   dept VARCHAR(255)
   productivity NUMERIC,
   utility NUMERIC,
   CONSTRAINT fk_pesuser FOREIGN KEY (user_id) REFERENCES pesuser (name)
);