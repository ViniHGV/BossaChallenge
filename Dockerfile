FROM node:21 AS base

RUN npm install -g @nestjs/cli@10.3.2

FROM base AS dependencies

WORKDIR /home/node/app

COPY package.json package-lock.json nest-cli.json ./

RUN npm install

FROM base AS build

WORKDIR /home/node/app

COPY . .

COPY --from=dependencies /home/node/app/node_modules ./node_modules

RUN npm run build

FROM node:21-alpine3.20 AS deploy

WORKDIR /home/node/app

RUN npm i prisma

COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/package.json ./package.json
COPY --from=build /home/node/app/prisma ./prisma

ENV DATABASE_URL=postgresql://postgres:admin@db:5432/mydb?schema=public
ENV SECRET=IKOWECBWUIEBCUIOEWVCUI312VEI3UY2VRYU423C5IY7U34DC5YU3

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
