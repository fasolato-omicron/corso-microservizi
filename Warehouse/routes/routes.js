const express = require("express");
const repository = require("../repository/repository");
const queueRepository = require("../repository/queue-repository");
const { NotFoundError, BadRequestError, InternalError } = require("../errors");

const router = express.Router();

//Healthcheck
router.get("/healthcheck", (req, res) => {
  res.send("OK");
});

//Post Method
router.post("/send_items", async (req, res, next) => {
  const order = req.body;
  console.log("Send items request", order);

  for(const i of order.items) {
    try {
      var rows = await repository.getStock(i.id);
    } catch (err) {
      return next(err);
    }
    if (!rows || rows.length === 0) {
      return next(new NotFoundError(`Item ${i.id} not found`));
    }
    var qty = 0;
    for(const s of rows) {
      if (s.status === "OK") {
        qty += s.quantity;
      }
    }
    if (qty === 0) {
      return next(new NotFoundError(`No stock left of item ${i.id}`));
    }
  }

  // Update Warehouse stock
  for(const i of order.items) {
    var rows = await repository.getStock(i.id);
    var x = i.quantity;
    for(const r of rows) {
      if(r.quantity >= x) {
        await repository.updateQuantity(r.id, r.quantity - x);
        x = 0;
      } else {
        await repository.updateQuantity(r.id, r.quantity);
        x -= r.quantity;
      }
      if(x === 0) {
        break;
      }
    }
  }

  res.end("OK");
});

router.post("/send-test-message", async (req, res) => {
  const msg = req.body;
  console.log("Send test message", msg);

  queueRepository.sendMessage(msg);

  res.end("OK");
});

module.exports = router;
