const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

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

  const db = connect();

  db.each(
    `select * 
    from stock 
    where 1 = 1
        and itemId = ?`,
    [itemId],
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log({row});
    }
  );

  close(db);
};

module.exports = {
  getStock,
};
