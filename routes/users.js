var express = require('express');
var router = express.Router();
var users = require("../controllers/UsersController.js");

// Get all users
router.get('/', function(req, res) {
  users.list(req, res);
});

// Get single user by id
router.get('/show/:id', function(req, res) {
  users.show(req, res);
});

// Create user
router.get('/create', function(req, res) {
  users.create(req, res);
});

// Save user
router.post('/save', function(req, res) {
  users.save(req, res);
});

// Edit user
router.get('/edit/:id', function(req, res) {
  users.edit(req, res);
});

// Edit user
router.post('/update/:id', function(req, res) {
  users.update(req, res);
});

// Edit update user
router.post('/delete/:id', function(req, res, next) {
  users.delete(req, res);
});

module.exports = router;

