const connection = require("./connection");

const getPayment = (db, id, userId) => {
  console.log("Get payment", id);

  return connection
    .select(
      db,
      `select * 
      from payment 
      where 1 = 1
          and id = ?
          and userId = ?`,
      [id, userId]
    )
    .then((res) => {
      if (res && res.length > 0) {
        return res[0];
      }
    });
};

const confirm = (db, id) => {
  console.log("Confirm payment", id);

  return connection.update(
    db,
    `update payment set status = 'OK' where id = ?`,
    [id]
  );
};

module.exports = {
  getPayment,
  confirm,
};
