### Stage builder
FROM node:lts-alpine as builder

WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build the source code
COPY src ./src
COPY tsconfig*.json nest-cli.json ./

RUN npm run build

### final image
FROM node:lts-alpine

WORKDIR /app

# Copy necessary files and set environment variables
COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

# Expose the port and set it as an environment variable
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# Set environment variable to execute in the CMD
CMD ["npm", "run", "start:prod"]
