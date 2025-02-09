# Этап сборки
FROM node:22 AS builder

# Enable Corepack and install Yarn 4.5.1
RUN corepack enable && corepack prepare yarn@4.5.1 --activate

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json  ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Собираем приложение
RUN yarn workspace frontend build

# Этап выполнения
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

COPY --from=builder /app ./

# Установка зависимостей только для продакшена
RUN npm install --production --legacy-peer-deps

# Убедитесь, что команда `start` существует в вашем `package.json`
EXPOSE 3000

CMD ["npm", "start"]
