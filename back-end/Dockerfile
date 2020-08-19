FROM node:14.5.0-alpine3.10

RUN mkdir -p /usr/back-end
WORKDIR /usr/back-end
COPY . .
RUN npm install

CMD ["npm", "run", "start"]


