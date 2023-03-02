const connection = require("./connection");

const getUser = (db, id) => {
  console.log("Get user", id);

  return connection
    .select(
      db,
      `select * 
      from user 
      where 1 = 1
          and id = ?`,
      [id]
    )
    .then((res) => {
      if (res && res.length > 0) {
        return res[0];
      }
    });
};

module.exports = {
  getUser,
};
