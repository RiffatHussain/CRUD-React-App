# ---- Build React app ----
FROM node:18 AS build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# ---- Build backend ----
FROM node:18
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN npm ci
COPY --from=build /app/frontend/build ./public

# Environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 5000
CMD ["node", "server.js"]
