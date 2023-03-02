const express = require("express");
const routes = require("./routes/routes");
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

var server = app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
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
