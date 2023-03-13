FROM node:16-alpine As builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit 
COPY . .
RUN npm run build

FROM nginx:latest As production
COPY --from=builder /app/build usr/share/nginx/html
COPY nginx/conf.d/default.conf etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]