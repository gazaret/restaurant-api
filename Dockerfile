FROM node:14

WORKDIR /app/restaurant-api

COPY . .

RUN npm i
RUN npm run build

CMD ["npm", "run", "start:prod"]
