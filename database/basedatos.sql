CREATE DATABASE recursoshumanos;
USE recursoshumanos;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `nombre` varchar(50) NULL,
  `apellidos` varchar(100) NULL,
  `telefono` varchar(100) NULL,
  `correo` varchar(100) NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla de usuarios';

SHOW TABLES;