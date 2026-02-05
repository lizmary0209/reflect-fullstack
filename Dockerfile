FROM node:22-slim AS build
WORKDIR /app

COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client ./client
RUN cd client && npm run build

COPY server/package*.json ./server/
RUN cd server && npm ci

COPY server ./server

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/server ./server
COPY --from=build /app/client/dist ./client/dist

EXPOSE 8080
CMD ["node", "server/server.js"]
