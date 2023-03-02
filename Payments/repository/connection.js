const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const connect = () => {
  return new Promise((resolve, reject) => {
    var db = new sqlite3.Database(process.env.DATABASE_PATH, (err) => {
      if (err) {
        reject(err);
      }
      console.log("Database connection successful");
      resolve(db);
    });
  });
};

const close = (db) => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      }
      console.log("Database connection closed");
      resolve();
    });
  });
};

const select = (db, query, params) => {
  return new Promise((resolve, reject) => {
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
          resolve(res);
        }
      }
    );
  });
};

const update = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  connect,
  close,
  select,
  update
};
