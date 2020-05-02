FROM node:10-alpine
MAINTAINER Hai Liang Wang <hain@chatopera.com>

COPY ./app /app
WORKDIR /app
RUN npm install

CMD ["npm", "start"]
EXPOSE 8668