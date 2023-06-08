const express = require("express");

const cors = require("cors");

const path = require("path");

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require("swagger-ui-express");

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Hello World',
//       version: '1.0.0',
//     },
//     servers:[
//       {
//        url: "http://localhost:8080"
//       }
//     ],
//     swagger: "^0.7.5",
//     basePath: '/v2',
//     schemes: [
//       'http',
//       'https'
//   ],
//   consumes: [
//     'application/json'
// ],
// produces: [
//     'application/json'
// ],
//   },
//   apis: ['./app/routes/routes.js'], // files containing annotations as above
// }
// const swaggerSpec = swaggerJsdoc(options);

const app = express();

var corsOptions = {

  origin: "http://localhost:8081/"

};

app.use(cors(corsOptions));
//app.use('/api',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// requests of content-type - application/json

app.use(express.json());

// requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

require("./app/routes/routes")(app);

require("./app/models/db");

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});


// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});
