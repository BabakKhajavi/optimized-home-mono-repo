# dashboard/Dockerfile
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
