-- készít egy adatbázist
CREATE DATABASE IF NOT EXISTS autokereskedes;

--hozzaad egy usert
USE autokereskedes;
CREATE USER 'webprog'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'webprog'@'localhost';
