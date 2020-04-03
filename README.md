
## DELILA RESTO API
Proyecto realizado en el modulo final de la carrera DWFS en Acámica
API destinada a la gestión de productos, usuarios y pedidos online 
### Repositorio Github:
https://github.com/martinlud136/Proyecto-Delilah-Resto-APP

## Estructura de archivos

```
DelilahRestoApp
./dbConfig
./resources
database.sql
delilah_resto.yaml
Delilah Resto API.postman_collection.json
package.json
package-lock.json
server.js
```
```
/dbConfig:
config.js
db.js
```
```
/resources:
pedidosRepo.js
productosRepo.js
usuariosRepo.js
```
## Iniciar Base de Datos
### XAMPP
Encender Apache y Mysql
### Crear Base de Datos
Ingresar a http://localhost/phpmyadmin/server_sql.php y realizar las querys que se encuentran en el archivo database.sql
### Configuración Base de Datos
```
URL: 'mysql://root@localhost:3306/delilah_resto'
Puerto: 3000
```
### Iniciar servidor
Para instalar las depencencias del servidor correr el siguiente comando en la carpeta
[Directorio local]\delilahRestoApp:

```
npm install
```
Iniciar el servidor:
```
node server
```
### Llamadas a la API
Importar el archivo Delilah Resto API.postman_collection.json en la API testing Postman.
Contiene todas las llamadas a los diferentes endpoints de la API.
