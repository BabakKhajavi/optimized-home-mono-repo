# Dockerfile for apps/service
FROM node:20

WORKDIR /

# Copy the service app files
COPY . .

# Build the service app
RUN npm run build

# Start the service app
CMD ["node", "dist/server.js"]
