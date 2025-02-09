FROM node:22 AS builder

WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json  ./

# Устанавливаем зависимости
RUN yarn install

# Копируем остальной код приложения
COPY . .

# Устанавливаем @nestjs/cli глобально
RUN yarn global add @nestjs/cli

# Собираем приложение
RUN yarn build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Копируем необходимые файлы из стадии сборки
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/

EXPOSE 5000
CMD [ "node", "dist/main.js" ]
