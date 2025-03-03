# Base image
FROM node:20.13-alpine as base

# Set Workdir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy all (exclude by .dockerignore) to /home/node/app
COPY . .

# Install all dependencies
RUN npm install

RUN npm install -g nodemon

# Set Non Root User
USER node

# Set permissions to node:node
COPY --chown=node:node . .

