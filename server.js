const express = require("express");

const cors = require("cors");

const path = require("path");

const app = express();

var corsOptions = {

  origin: "http://localhost:8081/"

};

app.use(cors(corsOptions));

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
