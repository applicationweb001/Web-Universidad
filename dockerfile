# etapa de compilación
FROM node:13.10.1-alpine3.11 as build-stage
WORKDIR /app
COPY package*.json ./
RUN set -xe \
    && apk add --no-cache bash git openssh \
    && npm install -g npm \
    && git --version && bash --version && ssh -V && npm -v && node -v && yarn -v
RUN npm install
RUN npm install @vue/cli@4.3.0 -g
COPY . .
RUN npm run build

# etapa de producción
FROM nginx:1.17.9-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
