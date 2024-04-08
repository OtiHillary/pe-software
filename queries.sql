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
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (name)
);

CREATE TABLE goals (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   status INT NOT NULL,
   daysLeft INT NOT NULL,
   user_id TEXT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (name)
);

INSERT INTO performance (dept, type, yield, user_id)
VALUES
  ('Sales and Marketing', 'good', '70', 'otonye edwin'),
  ('Sales and Marketing', 'bad', '8', 'otonye edwin'),
  ('Invetory', 'good', '20', 'otonye edwin'),
  ('Sales and Marketing', 'good', '98', 'otonye edwin'),
  ('Maintenance', 'bad', '9', 'otonye edwin');

INSERT INTO goals (name, status, daysLeft, user_id)
VALUES
  ('Sales Growth' , '70' , 5, 'otonye edwin' ),
  ('development' , '100000' , 5, 'otonye edwin' ),
  ('Consumer satisfaction' , '73' , 1, 'otonye edwin' )