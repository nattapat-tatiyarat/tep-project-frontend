FROM node:18-alpine
RUN npm install -g http-server
WORKDIR /
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run production

EXPOSE 8080
CMD [ "http-server", "public" ]