var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const data = {
    data: {
      msg: `Server working`,
    },
  };

  res.status(200).json(data);
});

module.exports = router;
