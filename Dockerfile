FROM node:14

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci --only-production

# Bundle app source
COPY . .

CMD ./bin/run -f narrow-table -l
