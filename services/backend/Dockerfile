FROM node:20 AS builder

WORKDIR /app

COPY .env ./


RUN ls -la /app/


COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

FROM node:20

RUN mkdir -p /app/
WORKDIR /app/

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist /app/dist

EXPOSE 5000
CMD [ "npm", "run", "start:prod" ]