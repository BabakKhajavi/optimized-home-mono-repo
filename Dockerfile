# Root-level Dockerfile
FROM node:20
WORKDIR /

# Copy the entire monorepo into the Docker image
COPY . .

# Install dependencies at the root level
RUN yarn install
