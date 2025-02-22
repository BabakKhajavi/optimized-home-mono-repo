# Dockerfile for apps/service
FROM node:20

WORKDIR /app/apps/service

# Copy the service app files
COPY . .

# Build the service app
RUN yarn build

# Start the service app
CMD ["node", "dist/server.js"]
