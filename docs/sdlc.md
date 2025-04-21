# Ciclo de Vida de Desarrollo de Software (SDLC)

Este documento describe las fases del SDLC aplicado a **mi-app-segura**, con un enfoque especial en la seguridad en cada etapa.

---

## 1. Planificación
- Definición de objetivos y alcance.
- Análisis preliminar de riesgos de seguridad.
- Selección de tecnologías: Node.js 18, SQLite, Docker.

## 2. Análisis de requisitos
- Requisitos funcionales (CRUD de tareas).
- Requisitos no funcionales (rendimiento, escalabilidad).
- Requisitos de seguridad:
  - Autenticación y autorización (JWT).
  - Gestión segura de secretos (`.env`, JWT_SECRET).
  - Validación y saneamiento de entradas (OWASP Top 10).

## 3. Diseño
- Arquitectura monolítica con capas: presentación, negocio, persistencia.
- Diagrama de flujo de datos.
- Modelado de la base de datos: tabla `Items`.
- Diseño de Dockerfile minimalista y `docker-compose`:
  - Usuario no root (`appuser`).
  - Montaje de volumen seguro para la base de datos.

## 4. Implementación
- Estándares de codificación y linters.
- Estructura de carpetas: `src/`, `spec/`, `app/`.
- Variables de entorno y `.env.example`.
- Control de versiones con Git:
  - Branch `main`; commits descriptivos (Conventional Commits).

## 5. Pruebas
- Pruebas unitarias y de integración con Jest y Supertest.
- Pruebas de persistencia (`sqlite.spec.js`).
- Pruebas de endpoints (healthcheck, CRUD).
- Pruebas de seguridad:
  - Escaneo de dependencias (`npm audit`).
  - Análisis estático de código.

## 6. Despliegue
- Construcción de la imagen Docker (`docker compose build`).
- Eliminación de la instrucción `version` obsoleta en `docker-compose.yml`.
- Puesta en producción:
  - Orquestación con Docker Compose.
  - Variables de entorno seguras en el host.

## 7. Mantenimiento
- Monitorización de logs y métricas.
- Actualización de dependencias y Node.js.
- Gestión de vulnerabilidades (alertas de `npm audit`).
- Backup y restauración de la base de datos SQLite.

## 8. Retrospectiva de seguridad
- Revisión postmortem de incidentes.
- Actualización de políticas y checklist de seguridad.
- Capacitación continua del equipo en prácticas seguras.

---

**Referencias**  
- OWASP Top 10  
- Guía de buenas prácticas de Docker  
- Jest y Supertest documentation