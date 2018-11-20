# Run Node JS KOA Framework with Swagger Documentation

Koa is one of the Node JS Framework written on the top of express framework, if you guyz know express then it will be easy to understand koa framework.

We have also used swagger documentation for the better understanding. Swagger is most popular API Documentation tool, it is supportable with many server side languages.

## Requirment
 `Mongodb 3.6+`:
+ **Install MonngDB 3.6**
+ *` Ref: `* [Install Mongodb](https://docs.mongodb.com/manual/installation/)

`NodeJS v8+`
+ *`Ref:`* [Learn Node](http://nodejs.org)
+ Framework: [Learn Koa](https://koajs.com/)

## Run Locally with Node
+ Clone the project:
+   ```https://github.com/radhey113/koajs-swagger-boiler-plate.git```
+ Go to project working directory / Project folder
+ Execute command   `npm install`
+ After that Run Command `npm start`
+ Open `http://localhost:4001` to check that your server is running or not.
+ To check the documentation Kindly follow the: `http://localhost:4001/doc`


## Run Project with Dockerfile
+ Install Docker
  + `https://docs.docker.com/install/`
      + [Run Docker image](https://medium.com/@radheyg11/docker-with-node-e6cf77cfd21f)
+ Go to terminal, Run command
  + `cd <Project directory path>`
+ Run command to create node project build
  + `docker build -t node:8 ./`
+ To Run node server (Local 4001 port mapping node server 4001 port from container)
  + `docker run -p 4001:4001 node:8`
+ To Run node server in deamon mode use command `<Parameter -d>`
  + `docker run -p 4001:4001 -d node:8`
+ Open `http://localhost:4001` to check that your server is running or not.
+ To check the documentation Kindly follow the: `http://localhost:4001/doc`

##### Set environment variable
- No need to set custom environment variable, if you want to set any environment variable just add it to `.env` file.

*I hope it will help you to create your new nodejs project with koa js using swagger api documentation.*
## Thank you
