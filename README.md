# Atomic ID collector

Service that collects user's addresses and coins

## Prerequisites

Service uses MySQL database

Defaults:
- `MYSQL_HOST=127.0.0.1`
- `MYSQL_PORT=3306`
- `MYSQL_DB=atomic_id_collector`


MySQL secrets:
- `MYSQL_PASSWORD_FILE=/run/secrets/mysql_password`
- `MYSQL_USER_FILE=/run/secrets/mysql_user`
- `MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_root_password`

## Environment

- `MYSQL_HOST=`. Default: `127.0.0.1`
- `MYSQL_PORT=`. Default `3306`
- `MYSQL_USER=./cfg/secrets/mysql_user`. Set in `mysql_user` file
- `MYSQL_PASSWORD=./cfg/secrets/mysql_password`. Set in `mysql_password` file
- `MYSQL_DB=`. Default `atomic_id_collector`
- `PORT=`. Default 8080
- `NODE_ENV=`. Default `development`

## Starting development

To run service in `dev` mode use `npm install` and `npm run dev`

## Starting prod

`npm install`

`npm run build`

`npm start`

Or using docker-compose `docker-compose up -d --build`

Service will be available on `localhost:8080`
