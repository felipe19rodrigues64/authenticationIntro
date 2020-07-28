var express = require('express');
var router = express.Router();
var products = require("../controllers/ProductsController.js");

// Get all users
router.get('/', function(req, res) {
  products.list(req, res);
});

// Get single user by id
router.get('/show/:id', function(req, res) {
  products.show(req, res);
});

// Create user
router.get('/create', function(req, res) {
  products.create(req, res);
});

// Save user
router.post('/save', function(req, res) {
  products.save(req, res);
});

// Edit user
router.get('/edit/:id', function(req, res) {
  products.edit(req, res);
});

// Edit user
router.post('/update/:id', function(req, res) {
  products.update(req, res);
});

// Edit update user
router.post('/delete/:id', function(req, res, next) {
  products.delete(req, res);
});

module.exports = router;

