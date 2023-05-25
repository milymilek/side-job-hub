FROM node:alpine

# when using alpine apt-get install -> apk add --update
#RUN apk update && apk add upgrade && apk add --no-cache nodejs npm
RUN apk add nodejs npm

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]