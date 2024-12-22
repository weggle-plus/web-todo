const db = require("../database/db");
const { promisify } = require("util");

const dbGet = promisify(db.get).bind(db);

const findUserById = async (id) => {
  try {
    const query = "SELECT id, password FROM users WHERE id = ?";
    const user = await dbGet(query, [id]);
    return user;
  } catch (err) {
    throw {
      message: "DB조회중 오류 발생",
    };
  }
};

module.exports = { findUserById };
