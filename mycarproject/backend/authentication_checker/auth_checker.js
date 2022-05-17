const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    const header = request.headers.authorization.split(" ");
    const token = header[1];
    const dToken = jwt.verify(token, "this_secret_should_be_longer");
    request.userData = { username: dToken.username, userId: dToken.userId };
    next();
  } catch (error) {
    response.status(401).json({
      message: "Auth failed!",
    });
  }
};