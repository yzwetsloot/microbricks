FROM node:14-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/server
RUN npm install
EXPOSE 3000
CMD [ "node", "src/index.js" ]