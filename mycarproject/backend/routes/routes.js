const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user')

router.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            message: 'User data not valid (example: taken email)'
          });
        });
    });
  });

router.post("/login", (req, res, next) => {
    let fecthedUser;
    User.findOne({ username: req.body.username })
      .then((user) => {
        console.log(user);
        if (!user) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        fecthedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Auth failed",
        });
      });
});
  

module.exports = router;