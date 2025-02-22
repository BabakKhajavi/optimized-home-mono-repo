# Stage 1: Install dependencies at the root level
FROM node:20 AS dependencies
WORKDIR /app
COPY . .
RUN yarn install

# Stage 2: Build the service app
FROM node:20 AS build
WORKDIR /app
COPY --from=dependencies /app /app
WORKDIR /app/apps/service
RUN yarn build

# Stage 3: Final stage to run the service app
FROM node:20
WORKDIR /app
COPY --from=build /app/apps/service /app
CMD ["node", "dist/server.js"]