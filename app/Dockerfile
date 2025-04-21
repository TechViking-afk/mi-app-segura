# 1. Partimos de una imagen oficial de Node.js ligera
FROM node:18-alpine

# 2. Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos package.json y package-lock.json y las instalamos solo para producción
COPY package*.json ./
RUN npm install --only=production

# 4. Copiamos el resto del código de la aplicación
COPY . .

# 5. Creamos un grupo y un usuario sin privilegios (no root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 6. Creamos el directorio para la base de datos y asignamos permisos
RUN mkdir -p /etc/todos && chown appuser:appgroup /etc/todos

# 7. Fijamos la variable de entorno para la ruta de la BD dentro del contenedor
ENV DB_LOCATION=/etc/todos/todo.db

# 8. Cambiamos al usuario sin privilegios
USER appuser

# 9. Exponemos el puerto en el que corre la aplicación
EXPOSE 3000

# 10. Comando de arranque usando el script start definido en package.json
CMD ["npm", "start"]