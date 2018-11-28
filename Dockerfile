FROM node:carbon

COPY . /app

WORKDIR /app

RUN npm install

CMD ["npm", "run", "prod"]

EXPOSE 3000

