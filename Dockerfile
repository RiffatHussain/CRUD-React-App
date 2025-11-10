# ---- Build React app ----
FROM node:18 AS build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# ---- Build backend ----
FROM node:18
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN npm install
COPY --from=build /app/frontend/build ./public

EXPOSE 5000
CMD ["node", "server.js"]
