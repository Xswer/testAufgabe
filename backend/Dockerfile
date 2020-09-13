FROM node:alpine

ENV APP_HOME=/usr/src/app

WORKDIR $APP_HOME

COPY package*.json $APP_HOME/

RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]
# CMD ["npm", "run", "debug"]
# CMD ["npm", "run", "build:start"]
