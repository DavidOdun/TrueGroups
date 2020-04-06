CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "preferred_first_name" varchar,
  "user_name" varchar,
  "email" varchar,
  "password" varchar,
  "user_type" varchar,
  "institution" varchar,
  "created_at" timestamp
);

CREATE TABLE "student_responses" (
  "id" int PRIMARY KEY,
  "question_id" int,
  "response" varchar
);

CREATE TABLE "questions" (
  "question_id" int PRIMARY KEY,
  "question_string" varchar
);

CREATE TABLE "classes" (
  "class_id" int PRIMARY KEY,
  "class_name" varchar,
  "professor_id" int,
  "current_members" int,
  "max_members" int,
  "created_at" timestamp
);

CREATE TABLE "class_members" (
  "class_id" int PRIMARY KEY,
  "member_id" int
);

CREATE TABLE "groups" (
  "group_id" int PRIMARY KEY,
  "group_name" varchar,
  "class_name" varchar,
  "project_name" varchar,
  "created_at" timestamp
);

CREATE TABLE "group_members" (
  "group_id" int PRIMARY KEY,
  "member_id" int
);

ALTER TABLE "student_responses" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("question_id");

ALTER TABLE "group_members" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("id");

ALTER TABLE "student_responses" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "classes" ADD FOREIGN KEY ("professor_id") REFERENCES "users" ("id");

ALTER TABLE "class_members" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("id");

ALTER TABLE "class_members" ADD FOREIGN KEY ("class_id") REFERENCES "classes" ("class_id");

ALTER TABLE "groups" ADD FOREIGN KEY ("group_id") REFERENCES "classes" ("class_id");

ALTER TABLE "group_members" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("group_id");
