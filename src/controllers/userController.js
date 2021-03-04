const knex = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateToken(params) {
  return jwt.sign(params, process.env.APP_KEY, {
    // expiresIn: 86400
  });
}

function hashPassword(old) {
  return bcrypt.hashSync(old, 10);
}

function comparePassword(newPassword, storedPassword) {
  return bcrypt.compareSync(newPassword, storedPassword);
}

class UserController {
  async register(req, res) {
    const user = req.body;
    user.password = hashPassword(user.password);

    try {
      const insertedUser = await knex("user").insert(user);
      return res.json({
        user_id: insertedUser[0],
        token: generateToken(insertedUser[0]),
      });
    } catch (error) {
      if (error.message.includes("user_email_unique")) {
        return res.status(403).json({ error: "email_unique" });
      }
      return res.status(403).json({ error: error.message });
    }
  }

  async login(req, res) {
    const user = req.body;

    try {
      const storedUser = await knex("user").where(
        "user.email",
        "=",
        user.email
      );
      console.log(storedUser);
      if (storedUser.length == 0) {
        return res.status(401).json({
          error: "email",
        });
      }
      if (comparePassword(user.password, storedUser[0].password)) {
        return res.json({
          user_id: storedUser[0].id,
          token: generateToken(storedUser[0].id),
        });
      } else {
        return res.status(401).json({
          error: "password",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
