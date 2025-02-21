# apps/service/Dockerfile
FROM node:20
WORKDIR /app

# Copy only the necessary files to avoid issues with yarn.lock
COPY package.json ./

# Copy the shared libraries and root yarn.lock file
COPY ../../yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the service app files
COPY . .

# Build the service app
RUN yarn build

# Start the service app
CMD ["node", "dist/server.js"]
