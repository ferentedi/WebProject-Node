-- creates the database
CREATE DATABASE IF NOT EXISTS cardealership;

--creates a user for it
USE cardealership;
CREATE USER 'webprog'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'webprog'@'localhost';
