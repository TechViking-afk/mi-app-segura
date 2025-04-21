# Documentación S‑SDLC - To‑Do App Segura

## 1. Requisitos de seguridad
- Variables sensibles en `.env`
- Imágenes oficiales y actualizadas

## 2. Diseño seguro
- Separación de servicios con Docker Compose
- Exposición mínima de puertos

## 3. Codificación segura
- `npm install --only=production`
- Revisión de dependencias con `npm audit`

## 4. Pruebas de seguridad
- Pruebas básicas en `tests/`
- Escaneo de imagen Docker con Trivy

## 5. Despliegue seguro
- Levantamiento con `docker compose up --build`
- Política `restart: unless-stopped`

## 6. Mantenimiento
- Actualizar dependencias periódicamente
- Documentar cambios en un `CHANGELOG.md`