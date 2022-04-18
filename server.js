const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { animals } = require("./data/animals");
const PORT = process.env.PORT || 3001;

const apiRoutes = require("./routes/apiRoutes/animalRoutes");
const htmlRoutes = require("./routes/htmlRoutes/index");
//middleware
//create routes for front end files
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post("/api/animals", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  // add animal to json file and animals array in this function using validator function
  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
    console.log(animal);
  }
});
//loads index.html on the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
//loads animal.html on the server
//not animals/api because it is referencing just the html page
app.get("/animals", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/animals.html"));
});
//loads zookeeper page onto server
app.get("/zookeepers", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/zookeepers.html"));
});
//wildcard route in case user goes to undefined path-wildcard route always comes last
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

//https://<your-app>.herokuapp.com/api/animals
