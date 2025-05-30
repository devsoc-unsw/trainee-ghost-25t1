-- Query to initialise the database

CREATE DATABASE IF NOT EXISTS projectemon;

USE projectemon;

CREATE TABLE IF NOT EXISTS users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   hashed_password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   team_id INT
);

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_user_id INT NULL,
    class_code VARCHAR(8),
    random_code CHAR(8) UNIQUE, -- A random code used for joining
    assignment VARCHAR(255) NULL,
    xp INT NOT NULL DEFAULT 0,
    hp INT NOT NULL DEFAULT 0,
    attack INT NOT NULL DEFAULT 0,
    defense INT NOT NULL DEFAULT 0,
    special_attack INT NOT NULL DEFAULT 0,
    special_defense INT NOT NULL DEFAULT 0,
    speed INT NOT NULL DEFAULT 0,
    pokemon_name VARCHAR(100)
    -- I'm thinking we can ust make it so team rocket comes when three tasks
    -- are currently overdue, so we do not need to store anything here. This 
    -- will simplify things
);

ALTER TABLE users
ADD CONSTRAINT fk_user_team
FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL;

ALTER TABLE teams
ADD CONSTRAINT fk_team_admin
FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    difficulty TINYINT CHECK (difficulty BETWEEN 1 and 10),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_votes INT DEFAULT 0,
    task_status ENUM('complete', 'incomplete', 'pending') DEFAULT 'incomplete',
    completed_at TIMESTAMP,
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Votes for people to verify that at ask is actually completed
CREATE TABLE IF NOT EXISTS task_completion_votes (
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, task_id)
);

CREATE TABLE IF NOT EXISTS task_doers (
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, task_id)
);

CREATE TABLE IF NOT EXISTS notifications (
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    type ENUM('completed','pending','overdue'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, task_id)
);