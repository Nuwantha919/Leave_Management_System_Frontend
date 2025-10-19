# Build frontend static files
FROM node:20.19.0-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with nginx
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
