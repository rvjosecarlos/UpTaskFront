# 📋 UpTask - Administrador de Proyectos y Tareas (Frontend)

Aplicación frontend para la gestión de proyectos y tareas. Permite a los usuarios registrarse, crear proyectos, asignar tareas y colaborar con otros miembros.

## 🛠️ Stack

- React
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS

## ✨ Características

- ✅ **Autenticación** - Registro y login de usuarios (JWT)
- ✅ **CRUD de proyectos** - Crear, editar, eliminar y listar proyectos
- ✅ **CRUD de tareas** - Administrar tareas dentro de cada proyecto
- ✅ **Rutas protegidas** - Acceso restringido según autenticación
- ✅ **Diseño responsive** - Interfaz adaptable a móvil y escritorio

## 🔗 Conexión con backend

Este frontend consume la API de [UpTaskBack](https://github.com/rvjosecarlos/UpTaskBack), un backend desarrollado en Node.js + Express + MongoDB.

---

📸 Capturas

![Vista app](https://res.cloudinary.com/domj6qqht/image/upload/v1771394543/uptask_f_hmnu3o.gif)

![Vista app](https://res.cloudinary.com/domj6qqht/image/upload/v1771394619/uptask_f2_jb8nkk.gif)

---

## 📌 Funcionalidades principales

- Dashboard - Vista general de proyectos del usuario
- Detalle de proyecto - Listado de tareas con opciones
- Panel de administración - Solo el creador puede editar/eliminar
- Colaboradores - Invitar y gestionar miembros del proyecto
