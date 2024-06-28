### para comenzar el server
npm init

## correr desde la consola el archivo index.ts
node src/index.ts

## En el archivo package json se debe configurar para los modulos de EM6
"type": "module"
    Tambien se deben instalar las siguientes dependencias 
    npm i -D typescript ts-node

    Podemos correr ahora el comando npx ts-node src/index.ts pero debemos quitar el type module 
    "dev": "npx ts-node src/index.ts" archivo package.json
## Instalacion de nodemon para no estar ejecutando el comando anterior cada ves que se tiene un cambio
    npm i -D nodemon
    "dev": "nodemon --exec ts-node src/index.ts" archivo package.json

## tsconfig para express 
    npx tsc src/index.ts  genera los archivos js index.js

creamos el archivo tsconfig.json 
{
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "lib": ["ESNext"],
        "strict": false,
        "sourceMap": true,
        "esModuleInterop": true,
        "declaration": true
    },
    "include": ["src/**/*.ts"]
}

ahora la compilacion seria:  npx tsc 

## instalacion de expresss
npm i express 
npm i -D @types/express

##sequelize
Render https://render.com/ conectarse con github
sequelize https://sequelize.org/docs/v7/models/data-types/
npm i @sequelize/core@alpha
npm i @sequelize/postgres
npm i sequelize-typescript
Para guardar claves en variables de entorno 
dotenv npm i dotenv

## extension para los mensajes 
npm i colors
## dbeaver y tableplus
## validar datos 
npm i express-validator

## para las pruebas se utilizan supertest y jest
npm i -D supertest @types/supertest jest @types/jest ts-jest

Ejecutamos npx ts-jest config:init 
Extensiones permitidas 
.test.js 
.spec.js
__tests__


## como saber cuanto del codigo se ha probado en el package json
"test:coverage": "npm run pretest && jest --detectOpenHandles --coverage",

## swagger documentacion de las apis
npm i swagger-jsdoc swagger-ui-express
npm i -D @types/swagger-jsdoc @types/swagger-ui-express


## cors para permitir el acceso del frontend
npm i cors
npm i -D @types/cors

## morgan 
npm i morgan
npm i --save-dev @types/morgan