# Build stage
FROM node:22 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Add build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build the app
RUN npm run build

# Production stage
FROM node:22

WORKDIR /app

# Copy built files and package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install serve to run the application
RUN npm install -g serve

EXPOSE 80

# Start the application
CMD ["serve", "-s", "dist", "-l", "80"]
