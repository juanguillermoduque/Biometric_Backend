CREATE DATABASE biometric;

USE biometric;

CREATE TABLE fichas(
    idficha BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code_ficha BIGINT UNSIGNED UNIQUE NOT NULL, 
    name_ficha VARCHAR(50) NOT NULL,trimester INT NOT NULL,
    jornada ENUM('DIURNA','MIXTA','NOCTURNA'),
    num_Students INT NOT NULL,
    date_start TIMESTAMP NULL,
    date_end TIMESTAMP NULL,
    created_at TIMESTAMP NULL  ,
    updated_at TIMESTAMP NULL  
);

CREATE TABLE usuarios( 
    iduser BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idficha BIGINT UNSIGNED,first_name VARCHAR(84) NOT NULL,
    last_name VARCHAR(84) NOT NULL, 
    type_id enum('CC','TI','CE') NOT NULL,
    num_id BIGINT UNSIGNED UNIQUE NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    cellphone INT NOT NULL UNIQUE,
    rol enum('IN','AP','AD'),
    status enum('ACTIVO','INACTIVO'), 
    password VARCHAR(80) NOT NULL,
    biometric_date BLOB, 
    created_at TIMESTAMP NULL  ,
    updated_at TIMESTAMP NULL  , 
    FOREIGN KEY(idficha) REFERENCES fichas(idficha)
);

CREATE TABLE asistencias(
    idasistencia BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    iduser BIGINT UNSIGNED,
    date_enter TIMESTAMP NOT NULL,
    comments VARCHAR(100),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(iduser) REFERENCES usuarios(iduser)
);