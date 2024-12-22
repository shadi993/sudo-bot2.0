# Use Node.js 22 on Debian Bookworm slim variant
FROM node:22-bookworm-slim AS base

# Perform apt-get update to ensure latest versions of dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    sqlite3 libsqlite3-dev \
    postgresql postgresql-client libpq-dev \
    redis-server \
    netcat-openbsd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=production

# Create a non-root user named "node"
# RUN groupadd -r node && useradd -r -g node node

# Create application directory
RUN mkdir -p /app && chown -R node:node /app

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy application source code
COPY . ./

# Change ownership of the application files to "node"
RUN chown -R node:node /app

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Switch to the non-root "node" user
USER node

# Expose the application port (modify if necessary)
EXPOSE 3000

# Set the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Default command to start the application
CMD ["npm", "start"]

# Development stage
FROM base AS development

# Install sudo for the development environment
USER root
RUN apt-get update && apt-get install -y sudo git && rm -rf /var/lib/apt/lists/*

# Add the node user to the sudoers file
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node

ENV NODE_ENV=development

# Switch back to the node user
USER node
