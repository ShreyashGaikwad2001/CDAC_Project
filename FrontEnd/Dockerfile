# Stage 1: Build the React app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g yarn; yarn install;

COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html


# Expose port 80 (default HTTP port)
EXPOSE 80

# For HTTPS (if needed), expose port 443 and configure certificates in nginx.conf
# EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
