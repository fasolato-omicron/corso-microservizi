FROM debian:bullseye as migrations
ARG DATABASE_PATH=/usr/warehouse/db/warehouse.db

RUN apt-get update && \
    apt-get install -y sqlite3

COPY ./db.sql .

RUN sqlite3 warehouse.db < db.sql

FROM node:19-alpine
ARG PORT=3000
ARG DATABASE_PATH=/usr/warehouse/db/warehouse.db

RUN mkdir -p /usr/warehouse && cd /usr/warehouse
WORKDIR /usr/warehouse

COPY ["package.json", "*.js", "./"]
RUN npm i

COPY ./repository/ ./repository
COPY ./routes/ ./routes

COPY --from=migrations /warehouse.db ${DATABASE_PATH}

ENV PORT=${PORT}
ENV DATABASE_PATH=${DATABASE_PATH}

ENTRYPOINT [ "npm", "start" ]