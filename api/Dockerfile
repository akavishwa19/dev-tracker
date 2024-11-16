# Build stage
FROM node:22 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and config files
COPY . .

# Generate Prisma client and build TypeScript code
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:22

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including development dependencies
RUN npm install --include=dev

# Copy built files and necessary configs
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/src ./src

# Generate Prisma client in production environment
RUN npx prisma generate

# Expose API port
EXPOSE 5510

# Create a shell script to handle startup
RUN echo '#!/bin/sh\n\
npx prisma migrate deploy\n\
NODE_PATH=./dist exec node -r tsconfig-paths/register dist/index.js\n'\
> /app/start.sh && chmod +x /app/start.sh

# Run the startup script
CMD ["/app/start.sh"]
