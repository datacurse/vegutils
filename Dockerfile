# Use the official Node.js Alpine image as the base image
FROM node:20-alpine AS base

# Install necessary dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

# Install corepack globally (only once) and enable pnpm
RUN npm install --global corepack@latest && corepack enable pnpm

# Copy package.json and lock files to take advantage of Docker cache
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm i --frozen-lockfile

# Copy the source code and build the app
COPY . .

# Build the application
RUN pnpm run build

# Expose the app's port
EXPOSE 3000

# Set environment variable for the app's port
ENV PORT 3000

# Start the application
CMD ["pnpm", "run", "start"]
