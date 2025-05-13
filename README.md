# 📝 Mi App Segura

Este proyecto es una **aplicación de gestión de tareas (todo app)** construida con Node.js y SQLite, empaquetada en Docker y diseñada siguiendo todo el ciclo de vida de desarrollo seguro (SDLC) y prácticas DevSecOps. A continuación encontrarás:

1. Descripción del proyecto  
2. Requisitos previos  
3. Instalación y ejecución  
4. Estructura del repositorio  
5. Desarrollo y testing  
6. Docker  
7. SDLC de seguridad  
8. Historial de comandos clave  
9. Evaluación de seguridad con herramientas automáticas  
   - 9.1 NPM Audit  
   - 9.2 DeepSource  
10. Desarrolladores

---

## 1. Descripción del proyecto

- CRUD de tareas con endpoints RESTful:  
  - GET /: Healthcheck  
  - GET /items: Listar tareas  
  - GET /items/:id: Obtener tarea por ID  
  - POST /items: Crear tarea  
  - PUT /items/:id: Actualizar tarea  
  - DELETE /items/:id: Eliminar tarea  
- Persistencia en SQLite (fichero en /etc/todos/todo.db o en memoria en tests).  
- Contenedorizado con Docker y Docker Compose.  
- Pruebas automatizadas con Jest + Supertest.  

## 2. Requisitos previos

- Node.js ≥18  
- npm ≥11  
- Docker y Docker Compose  
- Git  

## 3. Instalación y ejecución

```bash
# 1. Clona el repositorio
git clone https://github.com/ddrojovillalba/mi-app-segura.git
cd mi-app-segura

# 2. Variables de entorno
cp .env.example .env
# Edita .env y define JWT_SECRET, DB_LOCATION si lo deseas

# 3. Instala dependencias
cd app
npm install

# 4. Levanta en local
export NODE_ENV=development
npm start

# 5. Ejecuta pruebas
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
│   │   └── persistence/sqlite.js
│   └── spec/
├── docs/
│   ├── sdlc.md
│   ├── devsecops.md
│   └── images/
└── tests/
```

## 5. Desarrollo y testing

```bash
npm install --save-dev jest supertest
npm test
npm run test:coverage
```

## 6. Docker

```bash
docker compose up --build
docker compose logs -f
docker compose down
```

## 7. SDLC de seguridad

Consulta docs/sdlc.md para más detalles.

## 8. Historial de comandos clave

```bash
git add .
git commit -m "feat: completar README y SDLC"
git push
docker compose up --build
docker compose down
npm test
```

## 9. Evaluación de seguridad con herramientas automáticas

### 9.1 NPM Audit

```bash
cd app
npm audit --audit-level=low
```

Actualizamos lodash en app/package.json a ^4.17.21 y volvimos a ejecutar npm audit: 0 vulnerabilidades.

### 9.2 DeepSource

Archivo .deepsource.toml añadido con:

```toml
version = 1
skip_paths = ["node_modules/", "dist/", "docs/images/", "app/src/static/"]
minimum_severity = "major"
[issues]
exclude = ["tests/**/*.js", "docs/**/*.md"]
[[analyzers]]
name = "javascript"
enabled = true
[analyzers.javascript]
environment = ["nodejs", "browser", "jest"]
[[analyzers]]
name = "eslint"
enabled = true
config_path = ".eslintrc.js"
[[analyzers]]
name = "security"
enabled = true
[[analyzers]]
name = "format"
enabled = true
[autofix]
enabled = true
rules = ["eslint", "format"]
[reporter]
reports = ["commit", "pull_request"]
```

DeepSource arrojó 4,5k issues en JavaScript tras commit.

## 10. Desarrolladores

David Rojo Villalba -- https://github.com/ddrojovillalba/mi-app-segura.git
Miguel Angel Ruiz Miranda -- https://github.com/Maikel2k18/mi-app-segura.git
Victor Herrero Esteban -- https://github.com/TechViking-afk/mi-app-segura.git