# To-Do

Aplicacion para gestionar tareas desde una interfaz web conectada a un servidor local con JSON Server.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Structure](#structure)
- [How to run](#how-to-run)
- [Checklist before uploading](#checklist-before-uploading)

---

## Features

- Listar tareas desde el servidor
- Crear nuevas tareas
- Editar tareas existentes
- Eliminar tareas
- Cambiar el estado entre pendiente y completada

---

## Technologies

- HTML5
- CSS
- JavaScript
- Vite
- Tailwind CSS
- JSON Server

---

## Structure

```
to-do
    |-- backend
    |   |-- database
    |   |   `-- db.json
    |   |-- package.json
    |   `-- package-lock.json
    |-- frontend
    |   |-- src
    |   |   |-- services
    |   |   |   `-- tareas.service.js
    |   |   |-- ui
    |   |   |   `-- renderTareas.js
    |   |   |-- main.js
    |   |   `-- style.css
    |   |-- index.html
    |   |-- package.json
    |   `-- package-lock.json
    `-- README.md
```

---

## How to run

Instalar dependencias del backend:

```bash
cd backend
npm install
```

Levantar el servidor:

```bash
npx json-server database/db.json
```

Instalar dependencias del frontend:

```bash
cd frontend
npm install
```

Levantar el frontend:

```bash
npm run dev
```

El backend debe quedar en:

```bash
http://localhost:3000/todos
```

El frontend se abre en la URL que muestre Vite en la terminal.

---

## Checklist before uploading

- Servidor local funcionando
- Tareas cargando desde JSON Server
- Crear, editar y eliminar funcionando
- Sin errores en consola

---

## Authors

- **Name:** Andres Gutierrez

---

*Updated: May 22, 2026*
*Version: 1.0.0*
