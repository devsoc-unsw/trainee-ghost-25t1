-- Query to initialise the database

CREATE DATABASE IF NOT EXISTS projectemon;

CREATE TABLE IF NOT EXISTS users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   hashed_password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   team_id INT
);

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY_KEY,
    name VARCHAR(255) NOT NULL,
    admin_user_id INT NULL,
    class_code VARCHAR(8),
    assignment VARCHAR(255) NULL,
    xp INT NOT NULL DEFAULT 0,
    hp INT NOT NULL DEFAULT 0,
    attack INT NOT NULL DEFAULT 0,
    defence INT NOT NULL DEFAULT 0,
    sp_attack INT NOT NULL DEFAULT 0,
    sp_defense INT NOT NULL DEFAULT 0,
    speed INT NOT NULL DEFAULT 0,
    pokemon_name VARCHAR(100)
    -- I'm thinking we can just make it so team rocket comes when three tasks
    -- are currently overdue, so we do not need to store anything here. This 
    -- will simplify things
    FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE SET NULL
);

ALTER TABLE users
ADD CONSTRAINT fk_user_team
FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL;

ALTER TABLE teams
ADD CONSTRAINT fk_team_admin
FOREIGN KEY (admin_user_id) REFERENCES user(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    difficulty TINYINT CHECK (difficulty BETWEEN 1 and 10),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tasks_doers (
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, task_id)
);