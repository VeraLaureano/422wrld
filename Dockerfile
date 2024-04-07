FROM node:18.20-bullseye

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 0800

CMD [ "npm", "start" ]