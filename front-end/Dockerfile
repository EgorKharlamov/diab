FROM node:14.5.0-alpine3.10

RUN mkdir -p /usr/front-end
WORKDIR /usr/front-end
COPY ./package.json /usr/front-end
RUN npm install
COPY . /usr/front-end

CMD ["npm", "run", "build"]


