# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# instalar dependencias
COPY package*.json ./
RUN npm ci

# copiar el código y prisma schema (necesario para generar migrations)
COPY . .

# generar cliente y crear las migraciones en modo "create-only" (no necesita BD)
# Si la versión de prisma soporta --create-only esto creará prisma/migrations en la imagen.
RUN npx prisma generate || true
RUN npx prisma migrate dev --name init --create-only || true

# construir app
RUN npm run build

# --- etapa runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# herramientas necesarias (pg_isready)
RUN apk add --no-cache postgresql-client

# copiar dependencias y artefacto compilado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# instalar prisma CLI (para ejecutar migrate deploy en entrypoint)
RUN npm install prisma --omit=dev

# entrypoint que espera DB y aplica migraciones
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
