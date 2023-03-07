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

router.get("/:id/check", async (req, res, next) => {
  console.log("Pay request", req.params);

  try {
    const payment = await service.getById(req.params.id, req.params.userId);
    if(payment.status === "OK") {
      res.send(payment);
    } else {
      throw new BadRequestError(`Payment ${req.params.id} is invalid`)
    }
  } catch (err) {
    next(err);
  }

});

module.exports = router;
