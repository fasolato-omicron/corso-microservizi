const express = require("express");
const service = require("../service/service");
const { NotFoundError, BadRequestError, InternalError } = require("../errors");

const router = express.Router();

//Healthcheck
router.get("/healthcheck", (req, res) => {
  res.send("OK");
});

router.post("/pay/:id/:userId", async (req, res, next) => {
  console.log("Pay request", req.params);

  try {
    await service.pay(req.params.id, req.params.userId);
  } catch (err) {
    next(err);
  }

  res.end("OK");
});

module.exports = router;
