---
sidebar_position: 2
---

# Configurando Gitlab Runner

## Visión general

En esta guía hará la configuración necesaria para habilitar Gitlab Runner en su repositorio de Gtialb, los runner le permiten ejecutar tareas definidas en archivos `.gitlab-ci.yml.` En este archivo es en donde se definen los flujos de CI/CD que se ejecutarán en su pipeline.

Los pipelines son capaces de ejecutarse en entornos de:

- Shell
- Docker
- Kubernetes

El propósito de esta guía es lanzar su primer pipeline haciendo uso una maquina virtual la cual se encargara de ejecutar las tareas de su repositorio.

## Configuración y requerimientos

### Antes de empezar la guía

Esta actividad se realizará en un entorno en la nube real, no es una simulación o demo, por lo que, recuerda detener los servicios al finalizar las pruebas para evitar sorpresas de facturación.

### Activar Cloud Shell

Cloud Shell es una maquina virtual configurada con herramientas de desarrollo, para esta practica se utiliza la herramienta `terraform`, esta herramienta permite administrar los recursos de Google Cloud.

## Requisitos previos

### Clonar el repositorio

1.  Accede al siguiente enlace: [GitLab Runner en GitLab eGob](https://gitlab.egob.sv/gcp/gitlab-runner).
2.  Realiza un **fork** del repositorio para crear tu propia versión.
3.  Una vez creado el fork, copia la URL de tu repositorio.
4.  En tu terminal, clona tu versión del fork con el siguiente comando:

```bash
git clone https://gitlab.egob.sv/tuusuario/gitlab-runner.git
cd gitlab-runner
```

### Configurar el runner en tu proyecto

- Debes tener el rol de **Maintainer** en el proyecto.

Al crear un runner, se le asigna un **token de autenticación** que se usa para registrarlo. Este token permite que el runner se autentique con GitLab y pueda ejecutar trabajos desde la cola de trabajos.

### Pasos para crear un runner de proyecto

1.  En la barra lateral izquierda, selecciona **Buscar** o accede a tu proyecto.
2.  Ve a **Configuración > CI/CD**.
3.  Expandir la sección **Runners**.
4.  Selecciona **Nuevo runner de proyecto**.
5.  Elige el sistema operativo donde se instalará GitLab Runner (**Linux)**.
6.  Marcar la casilla **Ejecutar sin etiquetas**.
7.  (Opcional) En el campo **Descripción del runner**, agrega una descripción que se mostrará en GitLab.
8.  (Opcional) En la sección **Configuración**, agrega configuraciones adicionales.
9.  Selecciona **Crear runner**.
10. Se notificará la creación del token de autenticación, obtendrá un token con el formato **glrt-**
11. Almacenar este token ya que será utilizado para el registro del runner.

![Imange creación de token](./img/new-token.png)

### Terraform y Google Cloud Shell

**¿Qué es Terraform?**

Terraform es una herramienta de Infraestructura como Código (IaC) que permite crear, administrar y automatizar recursos en la nube mediante archivos de configuración. Facilita la implementación de infraestructura de manera reproducible y escalable en plataformas como Google Cloud, AWS y Azure.

1. Abrir Google Cloud Shell
   - Accede a la consola de Google Cloud: https://console.cloud.google.com/.
   - En la parte superior derecha, haz clic en el icono de **Cloud Shell** para abrir la terminal.
2. Subir el archivo terraform.tf
   - En Cloud Shell, haz clic en el icono de Subir archivo.
   - Selecciona el archivo terraform.tf desde tu computadora y súbelo a Cloud Shell.
3. Inicializar Terraform
   - En la terminal de Cloud Shell, ejecuta el siguiente comando para inicializar Terraform:

```bash
terraform init
```

4. Aplicar la configuración de Terraform
   - Ejecuta el siguiente comando para comenzar la implementación:

```bash
terraform apply
```

- Terraform solicitará ingresar el **token de autenticación** del runner. Ingrésalo y presiona **Enter**.
- Luego, se mostrará un resumen de los recursos que se crearán. Escribe **yes** y presiona **Enter** para confirmar.

5. Esperar la creación del runner
   - La ejecución tomará aproximadamente **5 minutos**, ya que Terraform desplegará una **instancia en Google Cloud** con Docker y configurará la **regla de salida** necesaria para permitir la conexión con GitLab EGOB.

![Imagen token registrado](./img/token-registered.png)

### Ejecutar la pipeline en GitLab

1. Crear un nuevo archivo en el repositorio
   - En la terminal, navega al directorio de tu repositorio:
   - ```bash
     cd gitlab-runner
     ```
   - Crea un nuevo archivo, por ejemplo, **test.txt**
   - ```bash
     echo "Prueba de ejecución del pipeline" > test.txt
     ```
2. Agregar y confirmar los cambios
   - Agrega el archivo al control de versiones:
   - ```bash
     git add test.txt
     ```
   - Crea un nuevo archivo, por ejemplo, **test.txt**
   - ```bash
     git commit -m "Agregando archivo de prueba para ejecutar pipeline"
     ```
3. Hacer push a la rama **main**
   - Sube los cambios al repositorio remoto:
   - ```bash
     git push origin main
     ```
4. Esperar la ejecución del pipeline

   - Una vez que el push se haya completado, GitLab ejecutará el **pipeline automáticamente.**
   - Ve a **GitLab > CI/CD > Pipelines** para ver el progreso.

![Imagen de los pipes](./img/pipes.png)

5. Revisar la ejecución del docker run hello-world
   - El pipeline ejecutará el siguiente comando dentro del runner:

![Imagen token registrado](./img/pipe-hello-world.png)

6. Modificar **.gitlab-ci.yml** para personalizar los flujos
   - Ahora puedes editar el archivo .gitlab-ci.yml en el repositorio para definir nuevos flujos de CI/CD según tus necesidades.
