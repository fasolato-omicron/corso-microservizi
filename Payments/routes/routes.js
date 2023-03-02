const express = require("express");

const router = express.Router();

//Healthcheck
router.get("/healthcheck", (req, res) => {
  res.send("OK");
});

module.exports = router;
