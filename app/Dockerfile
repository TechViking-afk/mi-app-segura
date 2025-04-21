# 1. Partimos de una imagen oficial de Node.js ligera
FROM node:18-alpine

# 2. Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los ficheros de dependencias y las instalamos solo para producción
COPY package*.json ./
RUN npm install --only=production

# 4. Copiamos el resto del código de la aplicación
COPY . .

# 5. Creamos un usuario sin privilegios (no root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 6. Creamos el directorio que la app necesita y le damos permisos
RUN mkdir -p /etc/todos && \
    chown appuser:appgroup /etc/todos

# 7. Cambiamos a appuser (que ya podrá escribir en /etc/todos)
USER appuser

# 8. Indicamos qué puerto va a exponer la aplicación
EXPOSE 3000

# 9. Comando que se ejecuta al arrancar el contenedor
CMD ["node", "src/index.js"]