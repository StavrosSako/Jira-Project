CREATE DATABASE IF NOT EXISTS jira_db;
USE jira_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'team_leader', 'member') DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@jira.local', '$2a$10$cM9KpQn1RCF0Ok6zyTrwJ.fIMNHhhzzLe27Y5ytTUzHnoOmwhqTRi', 'admin'),
('leader1', 'leader1@jira.local', '$2a$10$cM9KpQn1RCF0Ok6zyTrwJ.fIMNHhhzzLe27Y5ytTUzHnoOmwhqTRi', 'team_leader'),
('member1', 'member1@jira.local', '$2a$10$cM9KpQn1RCF0Ok6zyTrwJ.fIMNHhhzzLe27Y5ytTUzHnoOmwhqTRi', 'member');

