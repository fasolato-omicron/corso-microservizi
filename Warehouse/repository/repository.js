const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

select = (query, params) => {
  return new Promise((resolve, reject) => {
    const db = connect();

    const res = [];

    db.each(
      query,
      params,
      (err, row) => {
        if (err) {
          reject(err);
        }
        res.push(row);
      },
      (err, n) => {
        if (err) {
          reject(err);
        } else {
          close(db);
          resolve(res);
        }
      }
    );
  });
};

update = (query, params) => {
  return new Promise((resolve, reject) => {
    const db = connect();

    db.run(query, params, (err) => {
      if(err) {
        reject(err);
      } else {
        close(db);
        resolve();
      }
    })
  });
}

connect = () => {
  var db = new sqlite3.Database(process.env.DATABASE_PATH, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the database.");
  });

  return db;
};

close = (db) => {
  db.close((err) => {
    if (err) {
      return console.error("Error closing the database", err);
    }
    console.log("Database connection closed");
  });
};

getStock = (itemId) => {
  console.log("Get stock for item", itemId);

  return select(
    `select * 
    from stock 
    where 1 = 1
        and itemId = ?`,
    [itemId]
  );
};

updateQuantity = (id, qty) => {
  console.log("Update stock quantity", id, qty);

  return update(
    `update stock set quantity = ?
     where id = ?`,
     [qty, id]
  );
}

module.exports = {
  getStock,
  updateQuantity
};
