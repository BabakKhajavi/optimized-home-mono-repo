# Dockerfile for apps/service
FROM node:20

WORKDIR /

# Copy the service app files
COPY . .

# Install TypeScript
RUN npm install -g typescript

# Install dependencies
RUN npm install

# Build the service app
RUN npm run build

# Start the service app
CMD ["node", "dist/server.js"]