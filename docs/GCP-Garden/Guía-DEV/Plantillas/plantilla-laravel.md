---
sidebar_position: 1
---

# [Plantilla] Estándares para uso de plantilla en Laravel

:::info
Esta es una plantilla de estándares para desarrollo con Laravel 11.31 y PHP 8.2. Establece una arquitectura de código organizada con controladores ligeros, servicios para la lógica de negocio y repositorios opcionales para acceso a datos.
:::

## Versiones
- **Versión de Laravel:** 11.31
- **Versión de PHP:** 8.2
- **Versión de Composer:** 2.8.5
- **Gestor de base de datos relacional:** PostgreSQL 17.0
- **Gestor de base de datos no relacional:** MongoDB 8.0.5

## Arquitectura y estructura del código
### Rutas
Para la definición de rutas, se creará un archivo independiente por módulo, esto permite mantener una estructura más organizada y facilita el mantenimiento del código.

### Controladores
Los controladores se definirán siguiendo la convención NombreController, por ejemplo, RoleController, la lógica de negocio se manejará a través de servicios (Service), manteniendo los controladores enfocados únicamente en la gestión de las solicitudes y respuestas.

### Servicios
Los servicios serán responsables de gestionar toda la lógica de negocio, manteniendo los controladores ligeros y enfocados en la interacción con las solicitudes y respuestas.

### Repositorios (opcional)
Si se opta por usar repositorios, estos encapsulan el acceso a la base de datos, para esto se deberá usar una interfaz para definir el contrato del repositorio:

- Se define un repositorio por cada entidad, siguiendo la convención NombreRepository, por ejemplo, RoleRepository.
- Los métodos del repositorio manejan todas las operaciones relacionadas con la base de datos, como consultas y manipulaciones de registros.

### Interfaces (requerido si se usan repositorios)
Las interfaces definen los contratos que deben cumplir los repositorios, estableciendo los métodos que estos deben implementar:
- Se define una interfaz por cada repositorio, siguiendo la convención NombreRepositorioInterface, por ejemplo, RoleRepositoryInterface.
- Cada interfaz debe tener cada uno de los métodos que se implementaran en el repositorio.
- El flujo recomendado es: 
1. **Controlador**:** recibe la solicitud y delega la lógica de negocio al servicio.
1. **Servicio**: procesa la solicitud y utiliza el repositorio para interactuar con la base de datos.
1. **Repositorio** (opcional): maneja las consultas y modificaciones en la base de datos.
1. **Interfaz** (requerido si se usa repositorios):** asegura que el repositorio cumpla con una estructura definida, facilitando cambios en la implementación futura.

### Jobs
Se utilizarán Jobs para manejar tareas que requieran un tiempo de ejecución prolongado, permitiendo procesarlas en segundo plano sin afectar la experiencia del usuario ni el rendimiento del sistema.

### Patrón de diseño Observer
Laravel proporciona el patrón de diseño Observer, el cual permite ejecutar acciones automáticamente después de eventos como la creación, actualización o eliminación de registros. En este caso, se utiliza para registrar en una bitácora las actividades realizadas por los usuarios en el sistema, asegurando un mejor seguimiento y auditoría.

### Traits
En la plantilla, se emplean Traits para definir métodos reutilizables en todo el sistema. Por ejemplo, se ha definido una función que se utilizará para paginar resultados, lo que permitirá estandarizar y reutilizar código en cualquier parte del sistema.

### Route Model Binding
Se debe utilizar el Route Model Binding para obtener información de un modelo de manera eficiente y automática, evitando consultas manuales en el servicio.

### Clase para manejar respuesta
Se ha definido una clase especializada para gestionar las respuestas enviadas al usuario desde los servicios, esta clase centraliza la generación de respuestas estándar, garantizando coherencia en los mensajes y códigos de estado HTTP.

Cuenta con métodos predefinidos como:

- **responseSuccess (estado HTTP 200 o 201)**: para respuestas exitosas.
- **responseConflict (estado HTTP 409)**: para conflictos en la solicitud.
- **responseBadRequest (estado HTTP 400)**: la solicitud contiene errores o parámetros inválidos.
- **responseUnprocessableEntity (estado HTTP 422)**: los datos enviados no pueden ser procesados.
- **responseNotFound (estado HTTP 404)**: el recurso solicitado no existe.
- **responseUnauthorized (estado HTTP 401)**: no autorizado.
- **responseForbidden (estado HTTP 403)**: no tiene permisos.

### Gestor de base de datos relacional
Se recomienda el uso de PostgreSQL como gestor de base de datos. Ya que, incorpora mejoras significativas en rendimiento y funcionalidades que optimizan el desarrollo de aplicaciones.

### Gestor de base de datos no relacional
La plantilla utiliza MongoDB como base de datos NoSQL para gestionar información clave del sistema, dicha base de datos se usa para:

- **Almacenamiento de sesiones de usuario**, permitiendo un acceso rápido y eficiente.
- **Registro de logs del sistema**, facilitando la auditoría y el monitoreo de eventos.
- **Seguimiento de la actividad del usuario**, asegurando un historial detallado de acciones.

Se recomienda mantener esta implementación para optimizar el rendimiento y la escalabilidad del sistema.

### Comentar el código
Se recomienda incluir comentarios descriptivos en el código para explicar la funcionalidad de cada método, esto nos ayudará a la comprensión del código, los comentarios claros y concisos son útiles para cualquier desarrollador que trabaje en el proyecto a largo plazo.

Los comentarios deben realizarse utilizando **PHPDoc**, esto nos permitirá documentar correctamente las firmas de los métodos, los tipos de parámetros y los valores de retorno, mejorando la legibilidad y la comprensión del código.

Los comentarios son obligatorios cuando se cumplan los siguientes requisitos:

- **El método tiene una complejidad alta:**
  - Si el método realiza operaciones complejas o lógica difícil de entender a simple vista.
  - Integraciones con APIs externas.
- **El método tiene un propósito no evidente:**
  - Si el nombre del método no es suficientemente descriptivo o su funcionalidad no es clara.
- **El método tiene dependencias externas o efectos secundarios:**
  - Si el método depende de servicios externos, bases de datos, archivos, o si modifica estados globales.

### Documentación de Endpoints
La plantilla utiliza Swagger para documentar las rutas de la API, facilitando la comprensión e interacción con los Endpoints, para esto se ha implementado L5-Swagger, que permite generar documentación a partir de anotaciones en los controladores.

Sin embargo, su uso **no es obligatorio**, cada equipo que implemente la plantilla es libre de utilizar su propia librería o método de documentación según sus necesidades y preferencias.