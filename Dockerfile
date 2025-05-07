# === Etapa 1: Build do Angular ===
FROM node:lts-alpine AS builder

WORKDIR /app
COPY ./frontend/ ./
RUN npm install
RUN npm run build --prod

# === Etapa 2: Servir com Nginx ===
FROM nginx:alpine

COPY --from=builder /app/dist/app /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
