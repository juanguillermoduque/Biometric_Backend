DROP DATABASE  IF EXISTS biometric;
CREATE DATABASE biometric;

USE biometric;

CREATE TABLE roles(
    id_rol BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(100)
);

INSERT INTO roles(nombre_rol) values ('ADMIN');

CREATE TABLE componentes(
    id_componente BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_componente VARCHAR(100)
);

INSERT INTO componentes(nombre_componente) values ('Crear Asistencias'),('Editar asistencias'),('Reporte asistencias'),('Listar asistencias'),
('Crear competencias'),('Editar competencias'),('Reporte competencias'),('Listar competencias'),
('Crear excusas'),('Editar excusas'),('Reporte excusas'), ('Listar excusas'),
('Crear fichas'),('Editar fichas'),('Reporte fichas'),( 'Listar fichas'),
('Crear horarios'),('Editar horarios'),('Reporte horarios'),( 'Listar horarios'),
('Crear usuarios'),('Editar usuarios'),('Reporte usuarios'),( 'Listar usuarios');

CREATE TABLE componentes_roles(
    id_componente_roles BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_componente BIGINT UNSIGNED,
    id_rol BIGINT UNSIGNED,
    FOREIGN KEY(id_componente) REFERENCES componentes(id_componente),
    FOREIGN KEY(id_rol) REFERENCES roles(id_rol)
);

INSERT INTO componentes_roles(id_rol , id_componente) values (1,1),(1,2),(1,3),(1,4),(1,5),
(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),
(1,21),(1,22),(1,23),(1,24);


CREATE TABLE usuarios( 
    num_id BIGINT UNSIGNED UNIQUE NOT NULL PRIMARY KEY,
    first_name VARCHAR(84) NOT NULL,
    last_name VARCHAR(84) NOT NULL, 
    type_id enum('CC','TI','CE') NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    estado enum('ACTIVO','INACTIVO'), 
    password VARCHAR(80) NOT NULL,
    biometric_date BIGINT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

INSERT INTO usuarios (num_id,first_name,last_name,type_id,email,estado,password,biometric_date) 
values (1,'Juan','Duque','CE','Hola@hola','ACTIVO','sena',1);

CREATE TABLE fichas(
    id_ficha BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code_ficha BIGINT UNSIGNED UNIQUE NOT NULL, 
    name_ficha VARCHAR(50) NOT NULL,
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
    id_ficha_Instructor BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
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







