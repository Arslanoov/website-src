FROM node:16

ENV PORT 3001

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

CMD "npm" "run" "prebuild"
CMD "npm" "run" "dev"