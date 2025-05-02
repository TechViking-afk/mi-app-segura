# 📝 Mi App Segura

Este proyecto es una **aplicación de gestión de tareas (todo app)** construida con Node.js y SQLite, empaquetada en Docker y diseñada siguiendo todo el ciclo de vida de desarrollo seguro (SDLC). A continuación encontrarás:

1. **Descripción del proyecto**  
2. **Requisitos previos**  
3. **Instalación y ejecución**  
4. **Estructura del repositorio**  
5. **Desarrollo y testing**  
6. **Docker**  
7. **SDLC de seguridad**  
8. **Historial de comandos**  

---

## 1. Descripción del proyecto

- CRUD de tareas con endpoints RESTful:  
  - **GET /**: Healthcheck  
  - **GET /items**: Listar tareas  
  - **GET /items/:id**: Obtener tarea por ID  
  - **POST /items**: Crear tarea  
  - **PUT /items/:id**: Actualizar tarea  
  - **DELETE /items/:id**: Eliminar tarea  
- Persistencia en SQLite (fichero en `/etc/todos/todo.db` o en memoria en tests).  
- Contenedorizado con Docker y Docker Compose.  
- Pruebas automatizadas con Jest + Supertest.  

## 2. Requisitos previos

- **Node.js** ≥18  
- **npm** ≥11  
- **Docker** y **Docker Compose**  
- **Git**  

## 3. Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/ddrojovillalba/mi-app-segura.git
cd mi-app-segura

# Variables de entorno
cp .env.example .env
# Edita .env y define JWT_SECRET, DB_LOCATION si lo deseas

# Instala dependencias
cd app
npm install

# Levanta en local
export NODE_ENV=development
npm start            # escucha en http://localhost:3000

# Ejecuta pruebas
export NODE_ENV=test
npm test
```

## 4. Estructura del repositorio

```
.
├── README.md
├── docker-compose.yml
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── index.js
│   │   └── persistence/
│   │       └── sqlite.js
│   └── spec/        # pruebas unitarias de persistencia
├── docs/
│   └── sdlc.md      # Ciclo de vida de desarrollo seguro
└── tests/           # pruebas de endpoints (Supertest)
```

## 5. Desarrollo y testing

```bash
# Añade tests de rutas
npm install --save-dev jest supertest

# Ejecuta todos los tests
npm test

# Cobertura de código (opcional)
npm run test:coverage
```

## 6. Docker

```bash
# Construir imagen y levantar contenedores
docker compose up --build

# Logs en tiempo real
docker compose logs -f

# Parar y limpiar
docker compose down
```

📌 **Nota:** Hemos movido la variable `DB_LOCATION` al Dockerfile:

```dockerfile
ENV DB_LOCATION=/etc/todos/todo.db
```

Y en `sqlite.js` ahora:

```js
const defaultLocation = process.env.DB_LOCATION || "/etc/todos/todo.db";
const location = process.env.NODE_ENV === "test" ? ":memory:" : defaultLocation;
```

## 7. SDLC de seguridad

En `docs/sdlc.md` encontrarás el detalle completo de cada fase del ciclo de vida de desarrollo seguro que hemos seguido.  

## 8. Historial de comandos clave

```bash
# Git básico
git add .
git commit -m "feat: completar README y SDLC"
git push

# Docker build & run
docker compose up --build
docker compose down

# Tests
npm install --save-dev jest supertest
export NODE_ENV=test
npm test
```

## 9. Desarrolladores

David Rojo Villalba -- https://github.com/ddrojovillalba/mi-app-segura.git
Miguel Angel Ruiz Miranda -- https://github.com/Maikel2k18/mi-app-segura.git
Victor Herrero Esteban -- https://github.com/TechViking-afk/mi-app-segura.git
