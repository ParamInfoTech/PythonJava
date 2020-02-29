FROM vijaykatkar/node-python-java

RUN npm install body-parser

RUN mkdir /app

ADD . /app

WORKDIR /app

CMD nodemon index.js --bind 0.0.0.0:$PORT