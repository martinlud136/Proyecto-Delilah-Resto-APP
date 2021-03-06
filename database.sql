DROP DATABASE IF EXISTS delilah_Resto;
CREATE DATABASE delilah_Resto; 
USE delilah_Resto;

CREATE TABLE usuarios (
  id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  nombreApellido VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  direccion VARCHAR(100),
  telefono INT(10) UNSIGNED NOT NULL,
  es_admin VARCHAR(10) NOT NULL,
  contrasena VARCHAR(15) NOT NULL
);

CREATE TABLE productos (
  id_producto INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  img VARCHAR(255) NOT NULL,
  precio INT UNSIGNED NOT NULL
);

CREATE TABLE formaPago (
  id_formaPago INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  formaPago ENUM("efectivo", "credito") NOT NULL
);

CREATE TABLE estado (
  id_estado INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado ENUM("nuevo", "confirmado", "preparando", "enviado", "entregado", "cancelado") NOT NULL
);

CREATE TABLE pedidos (
  id_pedido INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT UNSIGNED NOT NULL,
  id_estado INT UNSIGNED NOT NULL,
  id_formaPago INT UNSIGNED NOT NULL,
  fecha DATETIME,
  total INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
  FOREIGN KEY (id_estado) REFERENCES estado (id_estado),
  FOREIGN KEY (id_formaPago) REFERENCES formaPago (id_formaPago)
);

CREATE TABLE pedidos_productos (
  id_pedido INT UNSIGNED NOT NULL,
  id_producto INT UNSIGNED NOT NULL,
  cantidad INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
  FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);

INSERT INTO productos(nombre,img,precio) VALUES('Hamburguesa con queso', 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg', 245);
INSERT INTO productos(nombre,img,precio) VALUES('Pancho con papas', 'https://http2.mlstatic.com/super-combo-36-super-panchos-bark-D_NQ_NP_797412-MLA31043077054_062019-Q.jpg', 90);
INSERT INTO productos(nombre,img,precio) VALUES('Pollo al horno', 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg', 450);
INSERT INTO productos(nombre,img,precio) VALUES('Pizza de muzzarela', 'https://www.tiempodesanjuan.com/u/fotografias/m/2017/10/19/f800x450-421269_472715_0.jpg', 300);
INSERT INTO productos(nombre,img,precio) VALUES('Empanada de carne', 'https://dam.cocinafacil.com.mx/wp-content/uploads/2017/12/empanada-de-carne-molida.jpg', 60);
INSERT INTO productos(nombre,img,precio) VALUES('Milanesa con papas fritas', 'https://vinomanos.com/wp-content/uploads/2019/02/milanesas-receta.jpg', 300);
INSERT INTO productos(nombre,img,precio) VALUES('Rabas', 'https://lh3.googleusercontent.com/proxy/2FkENo8pd_jQ0dobIVjcVSwiUcNJS6AeMEgUS1EOow0aaZSAAewyLvYAFjHOnX74uHHHftPoaUhb38V8bERx4ua-7GsRpOvyhSaO8irYLNUgZadW', 150);

INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('Daniel334', 'Daniel Sáez', 'daniel@1.com', 'cabildo 332', 1537484362, "true", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('Juan_g', 'Juan Gómez', 'juan@2.com', 'libertador 1200', 1593625356, "false", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('Diego22','Diego Flores', 'diego@3.com', 'calle 4 n°453', 1593845623, "false", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('Marta_he4 ','Marta Herrera', 'marta@4.com', 'mendoza 800', 1522374353, "false", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('AntonioCarr','Antonio Carretero', 'antonio@5.com', 'neuquen 5726', 1599844635, "false", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('ManuelDom','Manuel Dodmínguez', 'manuel@6.com', 'pasaje 2 332', 1533494264, "false", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('AntonioVeg','Antonio Vega', 'antonio@7.com', 'caseros 500', 1585554434, "false", "1234");
INSERT INTO usuarios(usuario,nombreApellido,email,direccion,telefono,es_admin,contrasena) VALUES('Alfredo876','Alfredo Ruiz', 'alfredo@8.com', 'san martin 778', 1533424374, "false", "1234");

INSERT INTO formaPago(formaPago) VALUES("efectivo");
INSERT INTO formaPago(formaPago) VALUES("credito");

INSERT INTO estado(estado) VALUES("nuevo");
INSERT INTO estado(estado) VALUES("confirmado");
INSERT INTO estado(estado) VALUES("preparando");
INSERT INTO estado(estado) VALUES("enviado");
INSERT INTO estado(estado) VALUES("entregado");
INSERT INTO estado(estado) VALUES("cancelado");

INSERT INTO pedidos(id_usuario,id_estado,id_formaPago,fecha,total) VALUES(2 ,1 , 1, "2020-03-13", 400);
INSERT INTO pedidos(id_usuario,id_estado,id_formaPago,fecha,total) VALUES(3 ,1 , 2, "2020-05-15", 234);
INSERT INTO pedidos(id_usuario,id_estado,id_formaPago,fecha,total) VALUES(4 ,1 , 1, "2020-02-15", 700);
INSERT INTO pedidos(id_usuario,id_estado,id_formaPago,fecha,total) VALUES(4 ,1 , 2, "2020-06-23", 270);
INSERT INTO pedidos(id_usuario,id_estado,id_formaPago,fecha,total) VALUES(5 ,1 , 2, "2020-07-05", 150);

INSERT INTO pedidos_productos VALUES(1, 7, 1);
INSERT INTO pedidos_productos VALUES(1, 3, 4);
INSERT INTO pedidos_productos VALUES(1, 5, 2);
INSERT INTO pedidos_productos VALUES(1, 1, 2);
INSERT INTO pedidos_productos VALUES(2, 3, 5);
INSERT INTO pedidos_productos VALUES(3, 2, 2);
INSERT INTO pedidos_productos VALUES(3, 3, 3);
INSERT INTO pedidos_productos VALUES(3, 4, 2);
INSERT INTO pedidos_productos VALUES(4, 4, 3);
INSERT INTO pedidos_productos VALUES(5, 1, 1);
INSERT INTO pedidos_productos VALUES(5, 2, 3);
INSERT INTO pedidos_productos VALUES(5, 3, 5);
INSERT INTO pedidos_productos VALUES(5, 4, 2);
INSERT INTO pedidos_productos VALUES(5, 5, 2);