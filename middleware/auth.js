const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(401).json({
      status: 401,
      source: req.path,
      title: "No token",
      detail: "No token provided in request headers",
    });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(500).send({
      status: 500,
      source: req.path,
      title: "Failed authentication",
      detail: err.message,
    });
  }
};
