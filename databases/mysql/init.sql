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
('admin', 'stivris@project.com', '$2a$10$yeCOTA1fPecTBLVB21uCFOY.Vz4c7oRlfc2kIwsyXSyKiUPkh5p2e', 'admin')