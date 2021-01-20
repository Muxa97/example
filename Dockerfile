FROM node:15.4-alpine3.10

COPY . /opt/app

WORKDIR /opt/app

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start"]
