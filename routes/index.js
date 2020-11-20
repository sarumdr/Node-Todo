var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
const bodyParser = require("body-parser");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//mongodb connect
mongoose.connect("mongodb://localhost/Todo");
var db = mongoose.connection;

//Collections
var Todo = require("../models/list");
var User = require("../models/user");

router.get("/", function (req, res) {
  res.render("todo");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/getlist", function (req, res) {
  Todo.find((err, docs) => {
    if (!err) {
           console.log(docs);
      res.send(JSON.stringify({ docs }));
    } else {
      res.send("Error");
    }
  });
});
router.post("/todo", (req, res) => {
  console.log("req........", req.body);
  var todo = new Todo({
    task: req.body.task,
    deadline: req.body.deadline,
  });
  var promise = todo.save();
  promise.then((todo) => {
    console.log("Todo saved");
    res.redirect("/");
  });
});

router.post("/changetask", (req, res) => {
  let TaskId = req.body.id;
  console.log(TaskId);
});

router.post("/delete", (req, res) => {
  console.log("delete");
  TaskId = req.body.id;
  console.log("ac", TaskId);
  Todo.findOneAndRemove({ _id: TaskId }, function (err, task) {
    console.log(err);
    console.log(task);
    console.log("deleteTask");

    res.redirect("/");
  });
});

let TaskId;
router.post("/edittask", (req, res) => {
  TaskId = req.body.id;
  console.log(TaskId);
  ////////////console.log("AttributeId");
  Todo.findOne({ _id: TaskId }, function (err, data) {
    console.log("editdata", data);
    res.send({ task: data.task, deadline: data.deadline });
  });
});

console.log(TaskId);
router.post("/Edit1", (req, res) => {
  console.log("edittask", TaskId);

  console.log("edit click");
  console.log(req.body);
  Todo.findOneAndUpdate(
    { _id: TaskId },
    { $set: { task: req.body.task, deadline: req.body.deadline } },
    function (err, task) {
      //res.view('index.ejs');
      console.log(task);
      ////////////console.log(attribute)
      res.redirect("/");
    }
  );
});

module.exports = router;
