# App-specific Dockerfile (apps/service/Dockerfile)
FROM node:20

# Copy the monorepo dependencies from the root-level Docker image
COPY --from=dependencies /app /app

WORKDIR /app/apps/service

# Build the service app
RUN yarn build

# Start the service app
CMD ["node", "dist/server.js"]
