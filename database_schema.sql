CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  first_name varchar(255),
  last_name varchar(255),
  preferred_first_name varchar(255),
  user_name varchar(255),
  email varchar(255),
  password varchar(255),
  user_type varchar(255),
  institution varchar(255),
  created_at timestamp
);

CREATE TABLE student_responses (
  id int PRIMARY KEY,
  question_id int,
  response varchar(255)
);

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  question_string varchar(255)
);

CREATE TABLE classes (
  class_code serial PRIMARY KEY,
  class_name varchar(255),
  professor_id int,
  current_members int,
  max_members int,
  created_at timestamp
);

CREATE TABLE class_members (
  class_code int PRIMARY KEY,
  member_id int
);

CREATE TABLE groups (
  group_code int PRIMARY KEY,
  group_name varchar(255),
  class_name varchar(255),
  project_name varchar(255),
  created_at timestamp
);

CREATE TABLE group_members (
  group_code int PRIMARY KEY,
  member_id int
);

ALTER TABLE student_responses ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);

ALTER TABLE group_members ADD FOREIGN KEY (member_id) REFERENCES student_responses (id);

ALTER TABLE student_responses ADD FOREIGN KEY (id) REFERENCES users (id);

ALTER TABLE classes ADD FOREIGN KEY (professor_id) REFERENCES users (id);

ALTER TABLE class_members ADD FOREIGN KEY (member_id) REFERENCES users (id);

ALTER TABLE class_members ADD FOREIGN KEY (class_code) REFERENCES classes (class_code);

ALTER TABLE groups ADD FOREIGN KEY (group_code) REFERENCES classes (class_code);

ALTER TABLE group_members ADD FOREIGN KEY (group_code) REFERENCES groups (group_code);