DROP DATABASE IF EXISTS delilah_Resto;
CREATE DATABASE delilah_Resto; 
USE delilah_Resto;

CREATE TABLE usuarios (
  id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  nombreApellido VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  direccion VARCHAR(100),
  telefono INT UNSIGNED,
  es_admin VARCHAR(10) NOT NULL,
  contrasena VARCHAR(10) NOT NULL
);

CREATE TABLE productos (
  id_producto INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  img VARCHAR(255) NOT NULL,
  precio INT UNSIGNED NOT NULL
);

CREATE TABLE formaPago (
  id_formaPago INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  formaPago VARCHAR(100)
);

CREATE TABLE estado (
  id_estado INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado VARCHAR(100)
);

CREATE TABLE pedidos (
  id_pedido INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT UNSIGNED NOT NULL,
  id_estado INT UNSIGNED NOT NULL,
  id_formaPago INT UNSIGNED NOT NULL,
  fecha DATE,
  total INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
  FOREIGN KEY (id_estado) REFERENCES estado (id_estado),
  FOREIGN KEY (id_formaPago) REFERENCES formaPago (id_formaPago)
);

CREATE TABLE pedidos_productos (
  id_pedido INT UNSIGNED NOT NULL,
  id_producto INT UNSIGNED NOT NULL,
  cantidad INT UNSIGNED NOT NULL,
  precio FLOAT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
  FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);

INSERT INTO productos VALUES("NULL" ,'Hamburguesa con queso', 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg', 245);
INSERT INTO productos VALUES("NULL" ,'Pancho con papas', 'https://http2.mlstatic.com/super-combo-36-super-panchos-bark-D_NQ_NP_797412-MLA31043077054_062019-Q.jpg', 90);
INSERT INTO productos VALUES("NULL" ,'Pollo al horno', 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg', 450);
INSERT INTO productos VALUES("NULL" ,'Pizza de muzzarela', 'https://www.tiempodesanjuan.com/u/fotografias/m/2017/10/19/f800x450-421269_472715_0.jpg', 300);
INSERT INTO productos VALUES("NULL" ,'Empanada de carne', 'https://dam.cocinafacil.com.mx/wp-content/uploads/2017/12/empanada-de-carne-molida.jpg', 60);
INSERT INTO productos VALUES("NULL" ,'Milanesa con papas fritas', 'https://vinomanos.com/wp-content/uploads/2019/02/milanesas-receta.jpg', 300);
INSERT INTO productos VALUES("NULL" ,'Rabas', 'https://lh3.googleusercontent.com/proxy/2FkENo8pd_jQ0dobIVjcVSwiUcNJS6AeMEgUS1EOow0aaZSAAewyLvYAFjHOnX74uHHHftPoaUhb38V8bERx4ua-7GsRpOvyhSaO8irYLNUgZadW', 150);

INSERT INTO usuarios VALUES("NULL", 'Daniel334', 'Daniel Sáez', 'daniel@1.com', 'cabildo 332', 153748362, "true", "1234");
INSERT INTO usuarios VALUES("NULL", 'Juan_g', 'Juan Gómez', 'juan@2.com', 'libertador 1200', 159362536, "false", "1234");
INSERT INTO usuarios VALUES("NULL", 'Diego22','Diego Flores', 'diego@3.com', 'calle 4 n°453', 159384623, "false", "1234");
INSERT INTO usuarios VALUES("NULL", 'Marta_he4 ','Marta Herrera', 'marta@4.com', 'mendoza 800', 152237453, "false", "1234");
INSERT INTO usuarios VALUES("NULL", 'AntonioCarr','Antonio Carretero', 'antonio@5.com', 'neuquen 5726', 159984635, "false", "1234");
INSERT INTO usuarios VALUES("NULL", 'ManuelDom','Manuel Dodmínguez', 'manuel@6.com', 'pasaje 2 332', 153349264, "false", "1234");
INSERT INTO usuarios VALUES("NULL", 'AntonioVeg','Antonio Vega', 'antonio@7.com', 'caseros 500', 158555434, "false", "1234");
INSERT INTO usuarios VALUES("NULL", 'Alfredo876','Alfredo Ruiz', 'alfredo@8.com', 'san martin 778', 153324374, "false", "1234");

INSERT INTO formaPago VALUES("NULL", "efectivo");
INSERT INTO formaPago VALUES("NULL", "credito");

INSERT INTO estado VALUES("NULL", "nuevo");
INSERT INTO estado VALUES("NULL", "confirmado");
INSERT INTO estado VALUES("NULL", "preparando");
INSERT INTO estado VALUES("NULL", "enviado");
INSERT INTO estado VALUES("NULL", "entregado");
INSERT INTO estado VALUES("NULL", "cancelado");
