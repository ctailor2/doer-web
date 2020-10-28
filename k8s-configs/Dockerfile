FROM node:10.15.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

FROM arm64v8/nginx:latest
COPY k8s-configs/nginx/templates /etc/nginx/templates/
COPY --from=build /app/build /usr/share/nginx/html
