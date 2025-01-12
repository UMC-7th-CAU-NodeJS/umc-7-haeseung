FROM node:20.11.1

COPY . .

RUN npm install

CMD ["npm", "start"]
