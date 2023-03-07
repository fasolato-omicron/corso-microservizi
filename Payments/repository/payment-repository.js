const connection = require("./connection");

const getPayment = (db, id, userId) => {
  console.log("Get payment", id);

  var sql = "";
  var params = [];

  if (userId) {
    sql = `select * 
    from payment 
    where 1 = 1
        and id = ?
        and userId = ?`;
    params = [id, userId];
  } else {
    sql = `select * 
    from payment 
    where 1 = 1
        and id = ?`;
    params = [id];
  }
  return connection.select(db, sql, params).then((res) => {
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
