# Use the official Node.js LTS image
FROM node:22.8.0-slim

RUN apt update && \
    apt install openssl procps -y

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Establishes the Prisma Schema for DB Connectio
RUN npx prisma generate

# Expose the port used by the application
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:dev"]
