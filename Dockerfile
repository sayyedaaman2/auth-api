# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# EXPOSE port (cange if your app uses diffrent port)
EXPOSE 9000

# Run the app
CMD ["npm", "start"]
