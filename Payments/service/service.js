const connection = require("../repository/connection");
const userRepository = require("../repository/user-repository");
const paymentRepository = require("../repository/payment-repository");
const { NotFoundError, BadRequestError, InternalError } = require("../errors");

const pay = async (id, userId) => {
  console.log("Pay", id, userId);

  const db = await connection.connect();

  const user = await userRepository.getUser(db, userId);
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }
  const payment = await paymentRepository.getPayment(db, id, userId);
  if (!payment) {
    throw new NotFoundError(`Payment ${id} not found`);
  }

  if (payment.status !== "") {
    throw new BadRequestError(`Payment ${id} has status ${payment.status}`);
  }

  await paymentRepository.confirm(db, id);

  await connection.close(db);
};

const getById = async (id) => {
  console.log("getById", id);

  const db = await connection.connect();

  const payment = await paymentRepository.getPayment(db, id);
  if (!payment) {
    throw new NotFoundError(`Payment ${id} not found`);
  }

  await connection.close(db);

  return payment;
};

module.exports = {
  pay,
  getById,
};
