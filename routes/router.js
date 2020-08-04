var express = require('express');
var router = express.Router();
var User = require('../models/User');
//var path = require('path');

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('email ou password errados.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Preencha todos os campos.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Não autorizado! Volte!');
          err.status = 400;
          return next(err);
        } else {
          var title = 'FullTime'
          var subtitle = 'Server-01'
          return res.send('<head><link href="/stylesheets/style.css" rel="stylesheet" type="text/css" media="all" /></head>' +
            '<br><br>' +
            '<h1>FullTime</h1><br><br>' +
            '<div class="container">' +
            '<h4>Bem vindo ' + user.username + 
            '</h4>' + '<br><h4>email: ' +  user.email + 
            '</h4><br><a type="button" href="menu">Entrar</a><br><br><a type="button" href="/logout">Logout</a><br>' +
            '</div>')
        }
      }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/menu', function (req, res, next) {
  return res.send('<html><head><title>FullTime</title>' +
    '<link href="/stylesheets/style.css" rel="stylesheet" type="text/css" media="all" />' +
    '</head><body><h1>FullTime</h1><br><br>' +
    '<div class="container">' +
    '<h4><br><a href="/employees">Funcionários</a></h4><br>' +
    '<h4><a href="/products">Produtos</a></h4><br>' +
    '</div></body></html>')
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;