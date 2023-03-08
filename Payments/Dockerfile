FROM debian:bullseye as migrations
ARG DATABASE_PATH=/usr/payments/db/payments.db

RUN apt-get update && \
    apt-get install -y sqlite3

COPY ./db.sql .

RUN sqlite3 payments.db < db.sql

FROM node:19-alpine
ARG PORT=3000
ARG DATABASE_PATH=/usr/payments/db/payments.db

RUN mkdir -p /usr/payments && cd /usr/payments
WORKDIR /usr/payments

COPY ["package.json", "*.js", "./"]
COPY ./repository/ ./repository
COPY ./routes/ ./routes
COPY ./service/ ./service

RUN npm i

COPY --from=migrations /payments.db ${DATABASE_PATH}

ENV PORT=${PORT}
ENV DATABASE_PATH=${DATABASE_PATH}

ENTRYPOINT [ "npm", "start" ]