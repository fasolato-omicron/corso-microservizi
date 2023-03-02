const express = require("express");
const repository = require("../repository/repository");

const router = express.Router();

//Healthcheck
router.get("/healthcheck", (req, res) => {
  res.send("OK");
});

//Post Method
router.post("/send_items", (req, res) => {
  const order = req.body;
  console.log("Send items request", order);
  repository.getStock(order.items[0].id);
  res.send("Post API");
});

module.exports = router;
