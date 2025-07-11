FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g serve

COPY . .

RUN npm run build

RUN echo "=== Estructura de dist ===" && ls -la dist/

EXPOSE 3000

CMD ["serve", "-s", "dist/tech-repair/browser", "-l", "3000", "--single"]