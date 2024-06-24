# Proyecto `Prueba Técnica`

Este proyecto desarrolla la "Prueba Técnica.pdf" adjunta en el repositorio.

### Resumen del Proyecto

El proyecto se divide en 4 partes esenciales:

1. **Base de Datos (Oracle y Mongo)**: Ubicada en la carpeta `base_datos`, contiene los scripts necesarios para la creación de las tablas y esquemas.
2. **API (Node.js)**: Ubicada en la carpeta `admin_students_api`, contiene los servicios necesarios para el mantenimiento de las tablas de la base de datos.
3. **WEB (React)**: Ubicada en la carpeta `admin_students_web`, contiene la aplicación en React que permite la interacción con los servicios del API.
4. **Aplicación de Consola (JavaScript)**: Ubicada en la carpeta `video_game`, contiene una aplicación de consola.

## Ambiente Local

Debido a la necesidad de utilizar distintas bases de datos, se optó por contenerizarlas para mejorar el proceso de administración de bases de datos.

### Dependencias

- Node.js v20.15.0
- Docker

### Instalación

Para la creación de las bases de datos, ejecuta el siguiente comando en la carpeta raíz del proyecto:
```
docker-compose up -d
```

Esto descargará las imágenes de Docker y configurará los contenedores para las bases de datos.

### Ejecución
Al finalizar el despliegue de los contenedores, procede a ingresar con el usuario admin por defecto de la imagen de Oracle, y ejecuta el script adjunto.


### Ejecución

Una vez finalizado el despliegue de los contenedores, ingresa con el usuario `admin` por defecto de la imagen de Oracle y ejecuta el script adjunto.
```
Host: localhost
Port: 1521
Database: free      SID
User: sys
pass: 1234 (configurada en docker-compose.yml)
Role: SYSDBA
```

Para efectos de la prueba, se utilizó el usuario
 ```
 C##distelsa
 ```

Asegúrate de estar en el esquema correcto al ejecutar los scripts de creación de tablas.


## Autor

Alex Réne López Rosa
