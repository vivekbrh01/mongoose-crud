//Requires
const express = require("express");
const PORT = process.env.PORT || 3003;
const mongoose = require("mongoose");

//Require router files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//Connect to Database
// mongoose.connect('mongodb://localhost:27017/mongoose-crud');
mongoose.connect(
  "mongodb://localhost/mongoose-crud",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("Connected", err ? err : true);
  }
);

//Instantiate the Express app
const app = express();

// Middlewares required
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//Setup View Engines
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Routing middlewares
app.use("/", indexRouter); // It matches for a pattern.
app.use("/users", usersRouter);
// app.use('/articles', articles);

//Error Handler Middlewares
//404
app.use((req, res, next) => {
  res.statusCode = 404;
  res.send("Page Not Found");

  // res.statusCode(404).send("Page Not found");
});

//Client or server errors
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.statusCode = 400;
    return res.json({ error: err.message });
  }
  if (err.name === "MongoError") {
    res.statusCode = 400;
    return res.json({ error: err.msg });
  }
  res.status(500).json({ err });
});

// Listener
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});

//////////////////////////////////////////
////////// Routing conventions //////////
////////////////////////////////////////

//....................//
//.Create a resource.//
//..................//

// GET -> "/aritcles/new" || "/articles/create"
// POST -> "/articles" || "/articles/new" || "/articles/create"

//....................//
// .......List.......//
//..................//

// GET -> "/articles"
// GET -> "/articles/:id"

//....................//
//.Update a resource.//
//..................//

// GET -> "/articles/:id/edit"
// PUT -> "/articles/:id"

//....................//
//.......Delete......//
//..................//

// DELETE -> "/articles/:id" || GET -> "/articles/:id/delete"

//........................//
//.....Add Comments......//
//......................//

//POST -> "/articles/:id/comments"
