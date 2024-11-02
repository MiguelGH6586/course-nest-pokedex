<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clone repository
2. Run
```
yarn install
```
3. Nest CLI Installed
```
npm i -g @nestjs/cli
```
4. Run DB
```
docker compose up -d
```
5. Clone file __.env.template__ and rename the copy as __.env__

6. fill the environment variables defined on the file __.env__

7. Run app with command
```
yarn start:dev
```

8. Populate db with seed
```
http://localhost:3000/api/v2/seed
```


## Stack used
* MongoDB
* NestJS
* Docker

# Production Build
1. Create file __.env.prod__
2. Fill environment variables of prod
3. Create the new image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

Now you can run the app with the following command
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```