const path = require("path");
const router = require("express").Router();

//loads index.html on the server
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});
//loads animal.html on the server
//not animals/api because it is referencing just the html page
router.get("/animals", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/animals.html"));
});
//loads zookeeper page onto server
router.get("/zookeepers", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});
//wildcard route in case user goes to undefined path-wildcard route always comes last
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
