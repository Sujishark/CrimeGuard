# Use an official Node.js runtime as a base image
FROM node:14

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# # Define the command to run your application
# CMD ["node", "index.js"]

# Use nodemon to run your application
# CMD ["npm","run","start:dev"]

