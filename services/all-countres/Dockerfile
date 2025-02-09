# Этап сборки
FROM node:20 AS build

WORKDIR /app

# Копирование файлов зависимостей и установка зависимостей
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Копирование файлов проекта и сборка
COPY . .
RUN npm run build

# Этап сервировки
FROM node:20

WORKDIR /app

# Копирование только нужных файлов из предыдущего этапа (собранных файлов)
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/

# Установка только продакшн-зависимостей
RUN npm install --production --legacy-peer-deps

# Убедитесь, что команда `start` существует в вашем `package.json`
EXPOSE 3000

CMD ["npm", "start"]
