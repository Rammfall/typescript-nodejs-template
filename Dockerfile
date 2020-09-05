FROM node:12.18.3

RUN apt-get update

WORKDIR /usr/app

COPY . .

RUN ls
RUN npm install
RUN npm run build
RUN npm prune --production
RUN ls

CMD ["npm", "start"]
