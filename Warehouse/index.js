const express = require("express");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/warehouse", routes);

var server = app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

var exitHandler = () => {
  server.close((err) => {
    if (err) {
      return console.error("Error closing Express server", err);
    }
  
    // repository.close();
    console.log("Server closed");
  });
}

['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM', 'exit', 'uncaughtException'].forEach(e => {
  process.on(e, exitHandler);
});
