# Practica_DEINT_UD2 (Frontend de Servicios Financieros)
Este repositorio contiene el proyecto desarrollado para la asignatura **Desarrollo de Interfaces** (Unidad 2).  
El Frontend está implementado utilizando **React**, siguiendo una estructura modular y orientada a componentes.

---

## ⚠️ IMPORTANTE  
Para que la aplicación funcione correctamente, es necesario cumplir estos requisitos:

### 🔹 1. Base de datos disponible  
La aplicación depende de una base de datos MySQL previamente creada.

### 🔹 2. Backend arrancado  
El frontend consume los endpoints del backend, por lo que debe estar ejecutándose antes de iniciar React. La carpeta del backend debe de estar en el mismo directorio que el frontend.

### 🔹 3. Nombre de carpeta de Frontend correcto  
El backend requiere que el frontend tenga un nombre especifico "Practica_DEINT_UD2" para que este no tenga problemas para encontrar la ruta donde guarda las imágenes.

Repositorio del backend:  
https://github.com/Ruben12MT/Practica_OPT_UD2.git

---

## 📦 Repositorio del Frontend  
Este repositorio contiene el código del cliente desarrollado en React:  
https://github.com/Ruben12MT/Practica_DEINT_UD2.git

---

## 🗄️ Datos de conexión a la base de datos  
Estos datos deben coincidir con la configuración del backend:

- **Database name:** `bancos_db`  
- **dbUser:** `root`  
- **dbPassword:** `test`

> Asegúrate de que la base de datos existe y contiene las tablas necesarias para que el backend funcione correctamente.

---

## ▶️ Pasos para ejecutar el proyecto

### 1. **Clonar el repositorio**
Descarga el proyecto en tu máquina local:
```bash
git clone git@github.com:Ruben12MT/Practica_DEINT_UD2.git
```
### 2. **Dirigete a la carpeta generada y ábrela en una terminal**

En la ruta de la carpeta del proyecto:
```bash
cd Practica_DEINT_UD2
```
### 3. **Instalar React y las librerías necesarias**

Dentro de la carpeta del proyecto:
```bash
npm install
```
### 4. **Arrancar el servidor en modo desarrollo**

Ejecuta el proyecto con:
```bash
npm run dev
```

