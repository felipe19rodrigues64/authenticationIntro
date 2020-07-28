var mongoose = require("mongoose");
var User = require("../models/User");

var userController = {};

// Show list of employees
userController.list = function(req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log("Erro: ", err);
    }
    else {
      res.render("../views/users/index", {users: users});
    }
  });
};

// Show employee by id
userController.show = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Erro: ", err);
    }
    else {
      res.render("../views/users/show", {user: user});
    }
  });
};

// Create new employee
userController.create = function(req, res) {
  res.render("../views/users/create");
};

// Save new employee
userController.save = function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/users/create");
    } else {
      console.log("Usuário salvo com sucesso.");
      res.redirect("/users/show/"+user._id);
    }
  });
};

// Edit an employee
userController.edit = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Erro: ", err);
    }
    else {
      res.render("../views/users/edit", {user: user});
    }
  });
};

// Update an employee
userController.update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, userid: req.body.userid, password:req.body.password}}, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("../views/users/edit", {user: req.body});
    }
    res.redirect("/users/show/"+user._id);
  });
};

// Delete an employee
userController.delete = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Usuário deletado!");
      res.redirect("/users");
    }
  });
};

module.exports = userController;

