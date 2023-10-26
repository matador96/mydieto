FROM node:14.17.3-alpine3.14
RUN npm i -g npm@6.14.13

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci 
COPY . .
ENV NODE_ENV=production


CMD ["npm", "run", "start:prod"]

