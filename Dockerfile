# Stage 1 - Build frontend
FROM node:18 AS build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Stage 2 - Backend setup
FROM node:18
WORKDIR /app
COPY backend ./backend
COPY --from=build /app/frontend/build ./backend/public

WORKDIR /app/backend
RUN npm install

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
