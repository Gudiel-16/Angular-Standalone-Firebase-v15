# ANGULAR

FROM node:18.18.0 AS compilacion

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# NGINX
FROM nginx:1.25.2-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=compilacion /app/dist/frontend /usr/share/nginx/html

EXPOSE 80