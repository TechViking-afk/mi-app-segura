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

### 7. SDLC de seguridad (resumen)
1. **Requisitos & amenazas**  
   - Identificación de activos (datos, JWT_SECRET, DB)  
   - Modelo de amenazas (OWASP Threat Dragon → `threatmodel.json`)  
2. **Diseño seguro**  
   - Arquitectura en capas: rutas / persistencia / UI  
   - Principio de menor privilegio: usuario `appuser` en Docker, permisos `/etc/todos`  
3. **Implementación**  
   - Validación de input y sanitización  
   - Uso de prepared statements en SQL  
   - Gestión de secretos vía `.env`, sin hard‑code  
4. **Revisión & SAST**  
   - ESLint + `eslint-plugin-security`  
   - `npm audit --json > docs/audit.json`  
5. **Tests & DAST**  
   - `jest --coverage`  
   - `supertest` contra `http://localhost:3000`  
6. **Contenedores**  
   - `docker build --no-cache -t mi-app-segura .`  
   - Usuario no‑root + `docker scan`  
7. **Despliegue**  
   - `docker compose up --build --abort-on-container-exit`  
8. **Monitorización**  
   - Logs con `docker logs`, alertas en Prometheus/Grafana  

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