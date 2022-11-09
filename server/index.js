const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "userdb",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM userdb.users WHERE email =  '" + email + "' ",
    async function (err, result) {
      console.log(result);
      console.log(err);

      if (err) {
        res.send(err);
      }
      if (result.length == 0) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          db.query(
            "INSERT INTO users (email, password) VALUE (?,?)",
            [email, hash],
            (error, response) => {
              if (err) {
                res.send(err);
              }

              res.send({ msg: "Inserted Sucessfully" });
            }
          );
        });
      } else {
        res.send({ msg: "Email already exists" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "User Logged In" });
        } else {
          res.send({ msg: "Incorrect password" });
        }
      });
    } else {
      res.send({ msg: "User not registered!" });
    }
  });
});

app.listen(3001, () => {
  console.log("server running on 3001");
});
