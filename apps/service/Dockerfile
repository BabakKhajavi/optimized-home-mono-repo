# apps/service/Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["node", "dist/server.js"]
