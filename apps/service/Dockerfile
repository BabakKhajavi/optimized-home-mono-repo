# apps/service/Dockerfile
FROM node:20
WORKDIR /app

# Copy the monorepo dependencies from the root-level Docker image
COPY --from=0 /app /app

# Navigate to the service directory
WORKDIR /app/apps/service

# Build the service app
RUN yarn build

# Start the service app
CMD ["node", "dist/server.js"]
