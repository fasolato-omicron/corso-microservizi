const { InternalError } = require("../errors");
const amqp = require("amqplib/callback_api");

const sendMessage = (body) => {
  amqp.connect(
    {hostname: process.env.RABBIT_HOST, username: process.env.RABBIT_USER, password: process.env.RABBIT_PASSWORD}, 
    (err, conn) => {
      if (err) {
        throw new InternalError(err);
      }
      conn.createChannel((err, channel) => {
        if (err) {
          throw new InternalError(err);
        }

        channel.assertQueue(process.env.RABBIT_QUEUEB, { durable: false });

        channel.sendToQueue(process.env.RABBIT_QUEUEB, Buffer.from(JSON.stringify(body)));
      });

      setTimeout(() => {
        conn.close();
      }, 500);
    }
  );
};

module.exports = {
  sendMessage,
};
