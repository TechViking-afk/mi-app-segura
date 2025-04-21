# 🔒 SDLC de Seguridad

Este documento detalla cada fase del **Secure Development Lifecycle (SDLC)** aplicada en **Mi App Segura**.

---

## 1. Recogida de requisitos y análisis

- **Identificación de activos**: Datos de usuario, JWT_SECRET, base de datos.  
- **Evaluación de amenazas**: Ataques de inyección SQL, fuga de secretos, contenedores inseguros.  
- **Definición de políticas de seguridad**: Uso de variables `JWT_SECRET`, validación de entrada, control de permisos.

## 2. Diseño seguro

- **Arquitectura de módulos**: Separación de responsabilidades (rutas, persistencia, lógica de negocio).  
- **Patrones de seguridad**: Principio de menor privilegio (appuser en Docker), folder `/etc/todos` propiedad de appuser.  
- **Modelo de datos**: Tabla `Items(id TEXT PRIMARY KEY, name TEXT, completed INTEGER)`.

## 3. Implementación con buenas prácticas

- **Validación de entradas**: Sanitización y tipado en capa de servicios.  
- **Gestión de secretos**:  
  - `.env` con `JWT_SECRET`, `DB_LOCATION`  
  - Nunca hardcodear en código.  
- **Código seguro**: Uso de `prepared statements` en SQLite (`db.run(..., [params])`).

## 4. Revisión de código y análisis estático

- **Pull Requests (PRs)** revisados por pares.  
- **Herramientas SAST**:  
  - ESLint con reglas de seguridad (plugin `eslint-plugin-security`).  
  - Scan de dependencias con `npm audit`.  

## 5. Tests de seguridad (SAST/DAST)

- **Automatización de pruebas**:  
  - **Jest** para unit y integration tests.  
  - **Supertest** para endpoints HTTP.  
- **Cobertura de seguridad**: Tests de endpoints, pruebas de persistencia aislada (`:memory:` en TEST env).

## 6. Contenedorización y despliegue seguro

- **Dockerfile** seguro:  
  - Imágenes base `node:18-alpine` ligeras.  
  - Creación de usuario no-root `appuser` y grupo `appgroup`.  
  - Carpeta `/etc/todos` con permisos ajustados.  
- **Docker Compose**:  
  - Variables de entorno cargadas en runtime.  
  - Red interna aislada.  

## 7. Operaciones y monitorización

- **Logging**: Console logs mínimo en `NODE_ENV !== 'test'`.  
- **Supervisión**: Integrar con herramientas de monitorización (Prometheus, Grafana).  
- **Actualizaciones**:  
  - Parches regulares de dependencias (`npm audit fix`).  
  - Reconstrucción de imágenes periódica.

## 8. Resumen de comandos SDLC

```bash
# Inicializar repositorio
git init
git remote add origin <repo-url>

# Desarollo local
npm install
npm start

# Tests automáticos
npm test
npm run test:coverage

# Escaneo de seguridad
npm audit fix

# Docker
docker compose up --build
docker compose down

# Flujo Git
git checkout -b feature/nueva-funcionalidad
# ...
git add .
git commit -m "feat: descripción"
git push origin feature/nueva-funcionalidad
```