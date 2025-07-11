FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g serve

COPY . .

RUN npm run build

RUN ls -la dist/

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist/* -l 3000 --single"]