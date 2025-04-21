# 📦 Mi App Segura

> **101-app**  
> API RESTful Express + SQLite, Dockerizada, con SDLC seguro y Zero Trust  

---

## 📝 Índice

1. [Visión General](#visión-general)  
2. [Motivación](#motivación)  
3. [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)  
4. [Requisitos](#requisitos)  
5. [Instalación & Uso](#instalación--uso)  
6. [Testing](#testing)  
7. [Despliegue con Docker](#despliegue-con-docker)  
8. [SDLC Seguro (S‑SDLC)](#sdlc-seguro-s-sdlc)  
9. [Defensa en Profundidad & Zero Trust](#defensa-en-profundidad--zero-trust)  
10. [Inteligencia Artificial en Ciberseguridad](#inteligencia-artificial-en-ciberseguridad)  
11. [Buenas Prácticas de Seguridad](#buenas-prácticas-de-seguridad)  
12. [Código de Conducta](#código-de-conducta)  
13. [Licencia MIT](#licencia-mit)  
14. [Comandos Git & GitHub](#comandos-git--github)  
15. [Referencias & Normativas](#referencias--normativas)  

---

## 🌐 Visión General

**Mi App Segura** es una aplicación de ejemplo para gestión de ítems con:

- **Backend**: Node.js + Express  
- **Base de datos**: SQLite  
- **Contenerización**: Docker & Docker Compose  
- **Testing**: Jest (unit & integration)  
- **Ciclo de vida**: SDLC seguro (S‑SDLC), Zero Trust, DevSecOps  

Toda la seguridad se integra **desde el inicio**: diseño, desarrollo, pruebas, despliegue y mantenimiento.

---

## 🎯 Motivación

En la **era digital**, las amenazas cibernéticas evolucionan rápidamente. Este proyecto:

- Ilustra un **flujo completo**: requisitos → diseño → implementación → pruebas → despliegue → mantenimiento  
- Aplica **seguridad por diseño** (Shift‑Left, Threat Modeling)  
- Facilita la **reproducibilidad** y el **hardening** con Docker  
- Demuestra **defensa en profundidad** y **Zero Trust**

---

## 🏗 Arquitectura y Tecnologías

```text
┌───────────────┐         ┌───────────────┐
│  Cliente HTTP │◀──────▶│  Express.js   │
│ (Postman/SPA) │         └───────────────┘
└───────────────┘               │
                                ▼
                         ┌─────────────┐
                         │  SQLite DB  │
                         └─────────────┘
```

- **Node.js** & **Express**  
- **SQLite** (DAO layer)  
- **Jest** (tests)  
- **Docker** / **Docker Compose**  
- **ESLint**, **SonarQube** (SAST)  
- **OWASP Dependency‑Check** (SCA)  
- **OWASP ZAP** (DAST)  
- **Trivy** (container scanner)  
- **GitHub Actions** (CI/CD)

---

## ⚙️ Requisitos

- **Node.js** ≥ 18  
- **npm** o **yarn**  
- **Docker** & **Docker Compose**  
- **Git**  

---

## 🚀 Instalación & Uso

```bash
# 1. Clonar
git clone https://github.com/tu-usuario/mi-app-segura.git
cd mi-app-segura/app

# 2. Instalar dependencias
npm install

# 3. Variables de entorno
cp .env.example .env
# Edita .env según tu configuración

# 4. Desarrollo
npm run dev
# → http://localhost:3000

# 5. Producción
npm start
```

### 📦 Rutas de la API

| Método | Ruta         | Descripción                             |
| ------ | ------------ | --------------------------------------- |
| GET    | `/items`     | Listar todos los ítems                  |
| POST   | `/items`     | Crear ítem `{ name, description }`      |
| PUT    | `/items/:id` | Actualizar ítem                         |
| DELETE | `/items/:id` | Eliminar ítem                           |

Ejemplo:

```bash
curl -X POST http://localhost:3000/items \
  -H 'Content-Type: application/json' \
  -d '{"name":"Item1","description":"Descripción"}'
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Cobertura
npm run test:coverage
```

- **Unitarios** y **Integración**  
- **Fixtures**, **mocks**, **BDD/AAA**  
- Cobertura ≥ 90%

---

## 🐳 Despliegue con Docker

```bash
# Levantar con Docker Compose
docker-compose up --build -d

# Logs
docker-compose logs -f

# Shell en contenedor app
docker exec -it mi-app-segura_app_1 sh
```

- **Multi‑stage Dockerfile**  
- Volúmenes para persistencia  
- Healthchecks y redes aisladas

---

## 🔄 SDLC Seguro (S‑SDLC)

1. **Requisitos**  
   - Clasificación de datos, cumplimiento GDPR/PCI/NIS2  
   - Modelado de amenazas (STRIDE, PASTA)  
2. **Diseño**  
   - Arquitectura Zero Trust, microsegmentación  
   - Principio de mínimo privilegio  
3. **Implementación**  
   - Code reviews, SAST (SonarQube), linters (ESLint)  
   - SCA (OWASP Dep‑Check)  
4. **Pruebas**  
   - Unit, integración, E2E  
   - DAST (OWASP ZAP), pentesting  
5. **Despliegue**  
   - CI/CD (GitHub Actions) → tests, scans, deploy  
   - Container scan (Trivy)  
6. **Mantenimiento**  
   - SIEM/SOAR, monitorización (Prometheus)  
   - Parches, SBOM, gestión de vulnerabilidades  

---

## 🛡 Defensa en Profundidad & Zero Trust

### Capas de Seguridad

1. **Perímetro**: firewalls, IDS/IPS, NAC  
2. **Puntos finales**: anti‑malware, EDR, cifrado  
3. **Aplicaciones**: SAST, DAST, actualizaciones  
4. **Datos**: cifrado en reposo y tránsito  
5. **IAM**: RBAC, MFA, PAM  
6. **Infraestructura**: redes segmentadas, microsegmentación  
7. **Física**: control de acceso, CCTV  

### Zero Trust

- **Nunca confiar, siempre verificar**  
- **Mínimo privilegio**  
- **Microsegmentación** para contener brechas  
- **Autenticación continua** (MFA, context-aware)  
- **Automatización**  

---

## 🤖 Inteligencia Artificial en Ciberseguridad

- Detección y respuesta en tiempo real (Darktrace)  
- Predicción de amenazas (Cylance)  
- Automatización de análisis (CrowdStrike)  
- Análisis de DNS y patrones (Akamai)  

---

## ✔️ Buenas Prácticas de Seguridad

- Shift‑Left: seguridad desde el diseño  
- Modelado de amenazas continuo  
- SBOM y gestión de dependencias  
- Actualizaciones y parches automáticos  
- Auditorías y pentesting regulares  
- Formación y concienciación continua  

---

## 📜 Código de Conducta

Este proyecto sigue el [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct).

---

## 📄 Licencia MIT

```
MIT License
...
```

---

## 💻 Comandos Git & GitHub

```bash
# Añadir cambios
git add .

# Commit
git commit -m "feat: descripción del cambio"

# Push
git push origin main

# Crear rama
git checkout -b feat/nueva-característica

# Merge request
gh pr create --fill
```

---

## 📚 Referencias & Normativas

- NIST SP 800-207: Zero Trust Architecture  
- ISO/IEC 27001, 27034  
- OWASP Top 10, SAST/DAST/SCA  
- NIS2, GDPR, PCI DSS