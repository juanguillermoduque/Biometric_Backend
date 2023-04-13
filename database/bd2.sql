CREATE DATABASE biometric;

USE biometric;

CREATE TABLE usuarios( 
    num_id BIGINT UNSIGNED UNIQUE NOT NULL PRIMARY KEY,
    first_name VARCHAR(84) NOT NULL,
    last_name VARCHAR(84) NOT NULL, 
    type_id enum('CC','TI','CE') NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    rol enum('INSTRUCTOR','APRENDIZ','ADMIN'),
    estado enum('ACTIVO','INACTIVO'), 
    password VARCHAR(80) NOT NULL,
    biometric_date BIGINT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL, 
);

CREATE TABLE fichas(
    id_ficha BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_ficha VARCHAR()
    code_ficha BIGINT UNSIGNED UNIQUE NOT NULL, 
    name_ficha VARCHAR(50) NOT NULL,
    --num_students INT NOT NULL,
    date_start DATE NULL,
    date_end DATE NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

CREATE TABLE competencias(
    id_competencia BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_competencia VARCHAR(100),
    id_ficha BIGINT UNSIGNED,
    FOREIGN KEY(id_ficha) REFERENCES fichas(id_ficha)
);

CREATE TABLE ficha_Instructor(
    id_ficha_Instructor BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    id_ficha BIGINT UNSIGNED,
    id_instructor BIGINT UNSIGNED,
    FOREIGN KEY(id_ficha) REFERENCES fichas(id_ficha),
    FOREIGN KEY(id_instructor) REFERENCES usuarios(num_id)
);

CREATE TABLE horario(
    id_horario BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_instructor BIGINT UNSIGNED,
    jornada ENUM('DIURNA','MIXTA','NOCTURNA'),
    id_ficha BIGINT UNSIGNED,
    date_start TIME NULL,
    date_end TIME NULL,
    fecha DATE,
    FOREIGN KEY(id_ficha) REFERENCES fichas(id_ficha),
    FOREIGN KEY(id_instructor) REFERENCES usuarios(num_id)
);

CREATE TABLE asistencias(
    id_asistencia BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_aprendiz BIGINT UNSIGNED,
    id_horario BIGINT UNSIGNED,
    hora_ingreso TIME NOT NULL,
    comments VARCHAR(100),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(id_aprendiz) REFERENCES usuarios(num_id),
    FOREIGN KEY(id_horario) REFERENCES horario(id_horario)
);

CREATE TABLE excusa(
    id_excusa BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_asistencia BIGINT UNSIGNED,
    comments VARCHAR(100),
    archivo INT,
    FOREIGN KEY(id_asistencia) REFERENCES asistencias(id_asistencia)

);



