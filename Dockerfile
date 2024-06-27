FROM node:20.12.2-alpine3.19 AS BUILDER

WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20.12.2-alpine3.19

WORKDIR /app
COPY --from=BUILDER ["/app/node_modules/", "/app/node_modules"]
COPY . .
CMD [ "npm", "run", "start" ]
