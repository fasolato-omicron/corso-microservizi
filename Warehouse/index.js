const express = require("express");
const routes = require("./routes/routes");
const amqp = require('amqplib/callback_api');
const { InternalError } = require("./errors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/warehouse", routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500);
    res.end("error", { error: err });
  }
});

var server = app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

var exitHandler = (event,err) => {
  server.close((err) => {
    if (err) {
      return console.error("Error closing Express server", err);
    }

    // repository.close();
    console.log("Server closed on event", event);
  });
};

[
  "SIGINT",
  "SIGUSR1",
  "SIGUSR2",
  "SIGTERM",
  "exit",
].forEach((e) => {
  process.on(e, () => exitHandler(e));
});
process.on("uncaughtException", (error, source) => {
  console.error("Uncaught error", error, source);
})




amqp.connect(
  {hostname: process.env.RABBIT_HOST, username: process.env.RABBIT_USER, password: process.env.RABBIT_PASSWORD}, 
  (err, conn) => {
  if(err) {
    throw new InternalError(err);
  }
  conn.createChannel((err, channel) => {
    if(err) {
      throw new InternalError(err);
    }

    channel.assertQueue(process.env.RABBIT_QUEUEA, {durable: false});

    channel.consume(process.env.RABBIT_QUEUEA, (msg) => {
      console.log("Received message", msg.content.toString());
    }, {
      noAck: true
    })
  })
});