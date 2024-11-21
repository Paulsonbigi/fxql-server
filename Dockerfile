FROM node:alpine AS base

# Set the working directory to /src
WORKDIR /src

# Copy the package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the project dependencies
RUN yarn install

# Install nodemon globally for hot-reloading
RUN yarn global add nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port specified in the environment
EXPOSE ${PORT}

# Start the application with nodemon for hot-reloading in development mode
CMD ["yarn", "dev"]
