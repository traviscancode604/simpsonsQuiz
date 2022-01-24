FROM node:17.0.1

WORKDIR /code

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD ["node", "quiz.js"]