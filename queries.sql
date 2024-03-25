create table "usereee"(
   id          SERIAL PRIMARY KEY,
   email       varchar(80) NOT NULL,
   password    varchar(80) NOT NULL,
   type        varchar(80)
);

CREATE TABLE "user"(
   id SERIAL PRIMARY KEY,
   fullname VARCHAR(50),
   email VARCHAR(255) NOT NULL,
   password VARCHAR(25) NOT NULL,
   type VARCHAR(25),
   created_on  date,
   last_log    date
);

model Performance{
  id         Int       @id @default(autoincrement())
  dept       String    @db.VarChar(25)
  type       String    @db.VarChar(25)
  yield      String    @db.VarChar(25)
  user_id    Int
  user       users     @relation(fields: [user_id], references: [id])
}

CREATE TABLE Performance (
   id SERIAL PRIMARY KEY,
   dept TEXT NOT NULL,
   type TEXT NOT NULL,
   yield TEXT NOT NULL,
   user_id INT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (id)
);


INSERT INTO performance (dept, type, yield, user_id)
VALUES
  ('Sales and Marketing', 'good', '70', 1),
  ('Sales and Marketing', 'bad', '8', 1),
  ('Invetory', 'good', '20', 1),
  ('Sales and Marketing', 'good', '98', 1),
  ('Maintenance', 'bad', '9', 1);