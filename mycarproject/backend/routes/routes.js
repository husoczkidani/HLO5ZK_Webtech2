const express = require("express");
const router = express.Router();
const User = require('../models/user')

router.post("/register", (request, response) => {
    const registeredUser = new User({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    })
    registeredUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

module.exports = router;