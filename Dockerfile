FROM node:12-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Taking nginx
FROM nginx:1.12-alpine

# Coping build file to root of the ngnix
COPY --from=build-stage /app/build /usr/share/nginx/html

# Exposing the port of ngnix
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
