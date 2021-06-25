FROM node:14

RUN mkdir -p /usr/src/restaurant-api
WORKDIR /usr/src/restaurant-api

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000/tcp

CMD ["npm", "run", "start:prod"]
