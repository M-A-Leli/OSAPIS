# ---- BUILD STAGE ----
FROM node:24-alpine3.21 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy app source
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production --no-progress

# ---- PRODUCTION STAGE ----
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app to Nginx static directory
COPY --from=builder /app/dist/OSAPIS/browser /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
ENV PORT=8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
