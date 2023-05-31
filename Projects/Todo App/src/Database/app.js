const express = require("express");
const app = express();
const cors = require("cors");
const todos = require("./schema");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todos", {
  keepAlive: true,
  useNewUrlParser: true,
  family: 4,
});

mongoose.connection.once("open", () => {
  console.log("DB is connected! ");
});

//DEFAULT GET
app.get("/", (req, res) => {
  res.send("Trying To Connect Mongo!");
});

//GET ALL
app.get("/todos", async (req, res) => {
  const todo = await todos.find();
  if (todo) return res.status(200).send(todo);
  res.status(404).send("error");
});

//GET TODO BY ID
app.get("/todos/:id", async (req, res) => {
  const todo = await todos.find({
    _id: req.params.id,
  });
  res.status(200).send(todo);
});

//POST A TODO
app.post("/todos", async (req, res) => {
  try {
    const todo = await todos.create(req.body);
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send("POST Failed!");
  }
});

//PUT A TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await todos.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(todo);
  } catch (error) {
    res.status(400).send("PUT Failed!");
  }
});

//PATCH A TODO
app.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await todos.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(todo);
  } catch (error) {
    res.status(400).send("PATCH Failed!");
  }
});

//DELETE A TODO
app.delete("/todos/:id", async (req, res, next) => {
  try {
    const todo = await todos.findOneAndRemove({ _id: req.params.id });
    res.status(200).send(`${todo} This todo has been deleted successfully!`);
  } catch (error) {
    next({ status: 400, message: "Deletion Failed!" });
  }
});

//PORT
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
