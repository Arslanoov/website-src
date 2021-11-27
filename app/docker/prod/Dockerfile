FROM node:16

ENV PORT 3000

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm run build

EXPOSE 3000

CMD "npm" "start"