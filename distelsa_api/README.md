# Proyecto `distelsa_api`

Este proyecto está desarrollado utilizando Node.js v20.15.0, Oracle y MongoDB como base de datos, con un enfoque en administrar cursos y asignaciones de alumnos.

### Resumen de la Arquitectura

El proyecto sigue una [arquitectura basada en hexágonos con vertical slicing](https://medium.com/@jjmayorgaq/clean-architecture-architecture-hexagonal-8f6d45c5039a). Esto significa que está estructurado para separar claramente las responsabilidades y capas del sistema, facilitando la modularidad y la escalabilidad. A continuación, se detalla la estructura principal:

- **Servicios**: Cada funcionalidad principal del sistema (como `assignment`, `course`, `logger`, `student`) tiene su propio directorio dentro de `src/services`. Cada servicio incluye:
  - Rutas (`*.routes.ts`): Define las rutas de API para el servicio.
  - Controladores (`controllers/*.controller.ts`): Implementa la lógica de negocio.
  - Middlewares (`middlewares/*.middleware.ts`): Gestiona la lógica para validar y autenticar solicitudes.
  - Modelos (`models/*.model.ts`): Define los esquemas de datos para MongoDB.

- **Capa de Configuración**: El directorio `src/config` contiene archivos como `secrets.ts` y `swagger.ts`, utilizados para configuraciones específicas del entorno y para la documentación de API respectivamente.

- **Capa de Acceso a Datos**: En `src/db`, se encuentran los adaptadores de base de datos (`mongo.ts` y `oracle.ts`). Oracle se utiliza para almacenar la información relacionada con los estudiantes y Mongo se utiliza para almacenar logs del sistema.

- **Capa de Utilidades**: `src/utils` alberga archivos como `logger.ts`, `regexConstants.ts`, `responseHandler.ts` y `responseTypes.ts`, que proporcionan funciones y constantes comunes utilizadas en todo el proyecto.

### Estructura de Carpetas

```
distelsa_api
└───src
    │   app.ts
    │   server.ts
    ├───config
    ├───db
    ├───services
    │   ├───assignment
    │   │   ├───controllers
    │   │   ├───middlewares
    │   │   └───models
    │   ├───course
    │   │   ├───controllers
    │   │   ├───middlewares
    │   │   └───models
    │   ├───logger
    │   │   ├───controllers
    │   │   └───models
    │   └───student
    │       ├───controllers
    │       ├───middlewares
    │       └───models
    └───utils
    └───__tests__
```

## Ambiente Local
### Dependencias
- Node.js v20.15.0
### Instalación
Ejecuta el siguiente comando
```
npm install
```
### Ejecucion
```
npm run dev
```

Una vez se ecuentre en ejecución puede encontrar la documentacion de los endpoints en:
```
http://localhost:3000/api-docs/#/
```
tambien se adjunta la coleccion de postman dentro de la carpeta "postman"

### Pruebas Unitarias
Ejecuta el siguiente comando
```
npm run test
```

## Autor
Alex Réne López Rosa