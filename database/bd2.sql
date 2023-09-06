DROP DATABASE  IF EXISTS biometric;
CREATE DATABASE biometric CHARACTER SET  UTF8MB4 COLLATE UTF8MB4_SPANISH_CI;

USE biometric;

CREATE TABLE roles(
    id_rol BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(100) UNIQUE
)ENGINE = INNODB;

INSERT INTO roles(nombre_rol) values ('ADMINISTRADOR');
INSERT INTO roles(nombre_rol) values ('INSTRUCTOR');
INSERT INTO roles(nombre_rol) values ('APRENDIZ');
INSERT INTO roles(nombre_rol) values ('APRENDIZ - INSTRUCTOR');
INSERT INTO roles(nombre_rol) values ('INSTRUCTOR - ADMINISTRADOR');

CREATE TABLE componentes(
    id_componente BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_componente VARCHAR(100)
)ENGINE = INNODB;

INSERT INTO componentes(nombre_componente) values ('Asistencias Aprendiz'),('Excusas Aprendiz'),('Asistencias Instructor'),('Excusas Instructor'),
('Fichas Instructor'),('Fichas'),('Horarios'),('Usuarios');


CREATE TABLE componentes_roles(
    id_componente_roles BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_componente BIGINT UNSIGNED,
    id_rol BIGINT UNSIGNED,
    FOREIGN KEY(id_componente) REFERENCES componentes(id_componente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = INNODB;

INSERT INTO componentes_roles(id_rol , id_componente) values (1,6),(1,7),(1,8);
INSERT INTO componentes_roles(id_rol , id_componente) values (2,3),(2,4),(2,5);
INSERT INTO componentes_roles(id_rol , id_componente) values (3,1),(3,2);
INSERT INTO componentes_roles(id_rol , id_componente) values (4,1),(4,2),(4,3),(4,4),(4,5);
INSERT INTO componentes_roles(id_rol , id_componente) values (5,6),(5,7),(5,8),(5,3),(5,4),(5,5);

CREATE TABLE usuarios( 
    num_id BIGINT UNSIGNED UNIQUE NOT NULL PRIMARY KEY,
    first_name VARCHAR(84) NOT NULL,
    last_name VARCHAR(84) NOT NULL, 
    type_id enum('CC','TI','CE') NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    estado enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO', 
    password VARCHAR(80) NOT NULL,
    biometric_date BIGINT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
)ENGINE = INNODB;

INSERT INTO usuarios (num_id,first_name,last_name,type_id,email,estado,password,biometric_date) 
values (1,'Juan','Duque','CE','g.duque@utp.edu.co','ACTIVO','$2b$10$liJNtFnh.ngj48T5Lb38geFy1sFybQTRzI3WTxV/eNUZMALRojXtW',1), 
(2,'Daryana','Robles','CC','darianarobles05@gmail.com','ACTIVO','$2b$10$liJNtFnh.ngj48T5Lb38geFy1sFybQTRzI3WTxV/eNUZMALRojXtW',2),
(3,'Jhojan','Agudelo','CC','davio13bar@gmail.com','ACTIVO','$2b$10$liJNtFnh.ngj48T5Lb38geFy1sFybQTRzI3WTxV/eNUZMALRojXtW',3),
(4,'Aprendiz','Instructor','CC','aprendiz_instructor@gmail.com','ACTIVO','$2b$10$liJNtFnh.ngj48T5Lb38geFy1sFybQTRzI3WTxV/eNUZMALRojXtW',4),
(5,'Admin','Instructor','CC','admin_instructor@gmail.com','ACTIVO','$2b$10$liJNtFnh.ngj48T5Lb38geFy1sFybQTRzI3WTxV/eNUZMALRojXtW',5),
(6,'Pruebas','BS','CC','pruebasbiometricservice@gmail.com','ACTIVO','biometrics2465417',6);

CREATE TABLE usuario_roles(
    id_usuario_roles BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_rol BIGINT UNSIGNED,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(num_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = INNODB;

INSERT INTO usuario_roles(id_usuario,id_rol) values (1,1);
INSERT INTO usuario_roles(id_usuario,id_rol) values (2,2);
INSERT INTO usuario_roles(id_usuario,id_rol) values (3,3);
INSERT INTO usuario_roles(id_usuario,id_rol) values (4,4);
INSERT INTO usuario_roles(id_usuario,id_rol) values (5,5);
INSERT INTO usuario_roles(id_usuario,id_rol) values (6,3);

CREATE TABLE programas(
    id_programa BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name_programa VARCHAR(50) NOT NULL     
)ENGINE = INNODB;

INSERT INTO programas(name_programa) values ('Analisis y desarrollo de Software'),('Desarrollo publicitario'),('Desarrollo de medios gráficos visuales'),
('Animación digital'),('Animación 3d'),('Desarrollo de colecciones para la industria de la moda'),('Programacion de Software'),('Sistemas');

CREATE TABLE fichas(
    id_ficha BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code_ficha BIGINT UNSIGNED UNIQUE NOT NULL, 
    id_programa BIGINT UNSIGNED,
    estado enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO', 
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(id_programa) REFERENCES programas(id_programa) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = INNODB;

INSERT INTO fichas(code_ficha, id_programa) values (2465417, 1);
INSERT INTO fichas(code_ficha, id_programa) values (2476528, 2);
INSERT INTO fichas(code_ficha, id_programa) values (2400510, 3);
INSERT INTO fichas(code_ficha, id_programa) values (2800510, 4);
INSERT INTO fichas(code_ficha, id_programa) values (2100510, 5);

CREATE TABLE ficha_instructor(
    id_ficha_instructor BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ficha BIGINT UNSIGNED,
    id_instructor BIGINT UNSIGNED,
    FOREIGN KEY(id_ficha) REFERENCES fichas(code_ficha) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_instructor) REFERENCES usuarios(num_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(id_ficha,id_instructor)
)ENGINE = INNODB;

INSERT INTO ficha_instructor(id_ficha, id_instructor) values (2465417, 2);
INSERT INTO ficha_instructor(id_ficha, id_instructor) values (2476528, 2);
INSERT INTO ficha_instructor(id_ficha, id_instructor) values (2400510, 2);
INSERT INTO ficha_instructor(id_ficha, id_instructor) values (2800510, 4);
INSERT INTO ficha_instructor(id_ficha, id_instructor) values (2100510, 4);

CREATE TABLE ficha_aprendiz(
    id_ficha_aprendiz BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ficha BIGINT UNSIGNED,
    id_aprendiz BIGINT UNSIGNED,
    FOREIGN KEY(id_ficha) REFERENCES fichas(code_ficha) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_aprendiz) REFERENCES usuarios(num_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(id_ficha,id_aprendiz)
)ENGINE = INNODB;


CREATE TABLE horario(
    id_horario BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_instructor BIGINT UNSIGNED,
    jornada ENUM('DIURNA','MIXTA','NOCTURNA'),
    id_ficha BIGINT UNSIGNED,
    date_start TIME NULL,
    date_end TIME NULL,
    fecha DATE,
    FOREIGN KEY(id_ficha) REFERENCES fichas(id_ficha) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_instructor) REFERENCES usuarios(num_id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = INNODB;

INSERT INTO horario(id_instructor, jornada, id_ficha, date_start, date_end, fecha) values (2,'DIURNA',1,'07:00:00','09:00:00','2023-10-10');
INSERT INTO horario(id_instructor, jornada, id_ficha, date_start, date_end, fecha) values (2,'DIURNA',1,'09:00:00','11:00:00','2023-10-11');

CREATE TABLE asistencias(
    id_asistencia BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_aprendiz BIGINT UNSIGNED,
    id_horario BIGINT UNSIGNED,
    hora_ingreso TIME NOT NULL,
    comments VARCHAR(100),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(id_aprendiz) REFERENCES usuarios(num_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_horario) REFERENCES horario(id_horario) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = INNODB;

INSERT INTO asistencias(id_aprendiz, id_horario, hora_ingreso, comments) values (2,1,'07:00:00','hola');

CREATE TABLE excusa(
    id_excusa BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_horario BIGINT UNSIGNED,
    id_aprendiz BIGINT UNSIGNED,
    estado enum('Pendiente', 'Revisado', 'Rechazado') DEFAULT 'Pendiente',
    comments VARCHAR(100),
    ruta_archivo VARCHAR (255),
    FOREIGN KEY(id_horario) REFERENCES horario(id_horario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_aprendiz) REFERENCES usuarios(num_id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = INNODB;