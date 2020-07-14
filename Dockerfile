FROM node:latest

MAINTAINER Mike Polinowski

#ENV NODE_ENV=production
#ENV NODE_ENV=dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


ENV PORT=3000

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install
RUN npm install nodemon -g
RUN npm audit fix

COPY . /app

EXPOSE $PORT
ENTRYPOINT ["npm", "start"]