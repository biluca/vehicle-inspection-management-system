# Use the official Node.js LTS image
FROM node:22.8.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port used by the application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
