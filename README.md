# Aromas-frescos - Node.js + TypeScript + SQLite

## Descripción

Este proyecto es una API RESTful construida con **Node.js** y **TypeScript**, utilizando **SQLite** como base de datos. La API gestiona productos, clientes y compras, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre cada una de estas entidades. Está diseñada para manejar compras de productos, incluso aquellas que aún no han sido pagadas, y lleva un historial de productos disponibles y no disponibles.

## Características

- **Productos**: Nombre, marca, categoría, precio y estado (disponible/no disponible).
- **Clientes**: Nombre, número de teléfono obligatorio y email opcional.
- **Compras**: Registro de productos comprados por los clientes, incluyendo información sobre el estado de pago.
- **Base de datos**: Persistencia de datos utilizando **SQLite**.

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript con tipado estático.
- [Express](https://expressjs.com/) - Framework web para Node.js.
- [SQLite](https://www.sqlite.org/index.html) - Base de datos ligera y de código abierto.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/en/) (versión LTS recomendada)
- npm (se instala con Node.js)
  
Opcional:
- [Postman](https://www.postman.com/) para probar las rutas de la API.

## Instalación

1. Clona este repositorio en tu máquina local.

   ```bash
   git clone https://github.com/tu-usuario/my-api.git
2. Navega al directorio del proyecto.
   
    ```bash
    cd my-api
3. Instala las dependencias necesarias.

   ```bash
   npm install
5. Compila el proyecto de TypeScript a JavaScript.
   ```bash
   npm run dev
El servidor estará corriendo en http://localhost:3000.


## Uso
La API expone varias rutas para gestionar clientes, productos y compras. Puedes utilizar herramientas como Postman o cURL para hacer peticiones a estas rutas.

### Endpoints disponibles

  Clientes

  - GET /api/customers: Obtener todos los clientes.
  - POST /api/customers: Crear un nuevo cliente.
  - Body:
   ``` bash 
      {
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890"
      }
```
  Productos

  - GET /api/products: Obtener todos los productos.
  - POST /api/products: Crear un nuevo producto.
  -  body:
   ``` bash
    {
  "name": "Laptop",
  "brand": "Lenovo",
  "category": "Electronics",
  "price": 999.99,
  "status": true
  }
  ```
Compras

- GET /api/purchases: Obtener todas las compras realizadas.
- POST /api/purchases: Registrar una nueva compra.
- Body:
    ``` bash
    {
    "customerId": 1,
    "productId": 2,
    "amount": 3,
    "paid": false
    }
     ```
## Estructura del proyecto
```bash
/my-api
│
├── /src                # Carpeta principal del código fuente
│   ├── /routes         # Definición de rutas
│   ├── /models         # Definición de modelos de datos
│   └── index.ts        # Archivo principal del servidor
│
├── package.json        # Dependencias y scripts del proyecto
├── tsconfig.json       # Configuración de TypeScript
├── nodemon.json        # Configuración de Nodemon para reinicio automático
└── README.md           # Documentación del proyecto
```
## Base de Datos
El proyecto utiliza SQLite como sistema de base de datos, almacenando los datos en un archivo local (my-database.db). Las tablas principales son:

  - Customers: Clientes registrados.
  - Products: Productos disponibles o fuera de stock.
  - Purchases: Relación entre clientes y productos comprados (incluyendo deudas).

Puedes inspeccionar la base de datos utilizando herramientas como DB Browser for SQLite o el paquete __sqlite3__ para acceder a los datos directamente.

## Scripts Disponibles

  - npm run dev: Ejecuta el servidor en modo de desarrollo utilizando Nodemon.
  - npm run build: Compila el proyecto de TypeScript a JavaScript.
  - npm run start: Ejecuta la versión compilada del servidor.

## Contribuciones
¡Por supuesto! Aquí te dejo un ejemplo de README para tu proyecto. Este README está basado en la configuración inicial de la API con Node.js, TypeScript y SQLite, y cubre aspectos como la descripción del proyecto, la instalación, uso, y una pequeña sección de licencias.

markdown

# My API - Node.js + TypeScript + SQLite

## Descripción

Este proyecto es una API RESTful construida con **Node.js** y **TypeScript**, utilizando **SQLite** como base de datos. La API gestiona productos, clientes y compras, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre cada una de estas entidades. Está diseñada para manejar compras de productos, incluso aquellas que aún no han sido pagadas, y lleva un historial de productos disponibles y no disponibles.

## Características

- **Productos**: Nombre, marca, categoría, precio y estado (disponible/no disponible).
- **Clientes**: Nombre, número de teléfono obligatorio y email opcional.
- **Compras**: Registro de productos comprados por los clientes, incluyendo información sobre el estado de pago.
- **Base de datos**: Persistencia de datos utilizando **SQLite**.

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript con tipado estático.
- [Express](https://expressjs.com/) - Framework web para Node.js.
- [SQLite](https://www.sqlite.org/index.html) - Base de datos ligera y de código abierto.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/en/) (versión LTS recomendada)
- npm (se instala con Node.js)
  
Opcional:
- [Postman](https://www.postman.com/) para probar las rutas de la API.

## Instalación

1. Clona este repositorio en tu máquina local.

   ```bash
   git clone https://github.com/tu-usuario/my-api.git

    Navega al directorio del proyecto.

    bash

cd my-api

Instala las dependencias necesarias.

bash

npm install

Compila el proyecto de TypeScript a JavaScript.

bash

npm run build

Inicia el servidor en modo de desarrollo.

bash

    npm run dev

    El servidor estará corriendo en http://localhost:3000.

Uso

La API expone varias rutas para gestionar clientes, productos y compras. Puedes utilizar herramientas como Postman o cURL para hacer peticiones a estas rutas.
Endpoints disponibles
Clientes

    GET /api/customers: Obtener todos los clientes.
    POST /api/customers: Crear un nuevo cliente.
        Body:

        json

        {
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "1234567890"
        }

Productos

    GET /api/products: Obtener todos los productos.
    POST /api/products: Crear un nuevo producto.
        Body:

        json

        {
          "name": "Laptop",
          "brand": "Lenovo",
          "category": "Electronics",
          "price": 999.99,
          "status": true
        }

Compras

    GET /api/purchases: Obtener todas las compras realizadas.
    POST /api/purchases: Registrar una nueva compra.
        Body:

        json

        {
          "customerId": 1,
          "productId": 2,
          "amount": 3,
          "paid": false
        }

Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

bash

/my-api
│
├── /src                # Carpeta principal del código fuente
│   ├── /routes         # Definición de rutas
│   ├── /models         # Definición de modelos de datos
│   └── index.ts        # Archivo principal del servidor
│
├── package.json        # Dependencias y scripts del proyecto
├── tsconfig.json       # Configuración de TypeScript
├── nodemon.json        # Configuración de Nodemon para reinicio automático
└── README.md           # Documentación del proyecto

Base de Datos

El proyecto utiliza SQLite como sistema de base de datos, almacenando los datos en un archivo local (my-database.db). Las tablas principales son:

    Customers: Clientes registrados.
    Products: Productos disponibles o fuera de stock.
    Purchases: Relación entre clientes y productos comprados (incluyendo deudas).

Puedes inspeccionar la base de datos utilizando herramientas como DB Browser for SQLite o el paquete sqlite3 para acceder a los datos directamente.
Scripts Disponibles

    npm run dev: Ejecuta el servidor en modo de desarrollo utilizando Nodemon.
    npm run build: Compila el proyecto de TypeScript a JavaScript.
    npm run start: Ejecuta la versión compilada del servidor.

Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

  1. Haz un fork de este repositorio.
  2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
  3. Realiza tus cambios y haz un commit (__git commit -m 'Agrega nueva funcionalidad'__).
  4. Sube tus cambios al repositorio (__git push origin feature/nueva-funcionalidad__).
  5. Abre un pull request.
