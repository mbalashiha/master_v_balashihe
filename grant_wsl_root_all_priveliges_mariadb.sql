CREATE USER 'wsl_root'@'localhost' IDENTIFIED BY '##3333!!dka;';
GRANT ALL PRIVILEGES ON *.* TO 'wsl_root'@'localhost' WITH GRANT OPTION;
CREATE USER 'wsl_root'@'%' IDENTIFIED BY '##3333!!dka;';
GRANT ALL PRIVILEGES ON *.* TO 'wsl_root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE USER 'master_v_balashihe'@'localhost' IDENTIFIED BY 'bAzEqONe8ufuwoxEJEfij2B7c2R6ci';
GRANT ALL PRIVILEGES ON master_v_balashihe.* TO 'wsl_root'@'localhost' WITH GRANT OPTION;
