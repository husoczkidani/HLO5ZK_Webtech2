const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const Car = require('../models/car')
const authChecker = require("../authentication_checker/auth_checker");

router.post("/register", (req, res, next) => {
  console.log(req.body)
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
          message: "User created successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: err.message
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
          message: "Authentication failed",
        });
      }
      fecthedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      const token = jwt.sign(
        { username: fecthedUser.username, userId: fecthedUser._id },
        "this_secret_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});
  
//Get all cars
router.get("/cars", authChecker, (req, res, next) => {
  Car
    .find({
      "user": ObjectId(req.userData.userId)
    })
    .then((documents) => {
      return res.status(200).json({
        message: "Success!",
        Car: documents
      });
    });
});

//Add new car
router.post("/create", authChecker, (req, res, next) => {
  const car = new Car({
    brand: req.body.brand,
    type: req.body.type,
    fuel: req.body.fuel,
    year: req.body.year,
    horsepower: req.horsepower,
    user: req.userData.userId,
  });
  car.save()
    .then((created) => {
      //console.log("Element added " + element._id);
      res.status(201).json({
        message: "Success!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
});


//Delete from list
router.delete("/delete/:id", (req, res, next) => {
  Car.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({ message: "Delete successful!" });
  });
});

module.exports = router;