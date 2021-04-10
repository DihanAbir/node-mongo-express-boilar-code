const express = require("express");
const cookirParser = require("cookie-parser");
const app = express();

// db
const { connectionDB } = require("./db/dbConnection");

// routes
const notesRoute = require("./routes/noteRoutes");
const usersRoute = require("./routes/user");
const indexRoute = require("./routes/indexRoute");
// middleware
app.use(express.json());
app.use(cookirParser("secreateKey"));

// calling databsae
connectionDB();

//   operations
app.use("/notes", notesRoute);
app.use("/users", usersRoute);
app.use("/", indexRoute);
//   operations

// listning the server
const Port = 5000;
app.listen(Port, () => {
  console.log(`server is listingin port : ${Port}`);
});
