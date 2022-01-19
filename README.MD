# todo-guru
An example of the TODO app that shows an example of the usage REST-Over-Websocket approach.

Live example can be found [here](http://34.136.105.166/)

## Spinning up the project with docker
If Docker and Docker Compose are installed on your computer then go to the folder `docker` and create a folder named `docker-environment` and add the .env files as shown in the `docker-environment.example` folder and then run the following command:
`[sudo]  npm run docker:build` 
`[sudo] npm run docker:start`
This will build the app and start the project in prod mode. Also, you might start the project in dev mode(with hot reload on files change) with the command `[sudo] npm run docker:dev`

## Spinning up the project without docker
if you need to install the project without docker then run the following commands:
`yarn install` and `yarn dev` for running the project in dev mode and `yarn start` for running the project in prod mode