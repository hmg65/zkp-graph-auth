const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "userdb",
});

app.use(express.json());
app.use(cors());

app.get("/t", (req, res) => {
  let x = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
  res.json(x);
});

app.post("/g1", (req, res) => {
  const email = req.body.email;

  db.query("SELECT g1 FROM users WHERE email = ?", [email], (err, result) => {
    res.send(result);
  });

});

app.post("/update_gn", (req, res) => {
  const email = req.body.email;
const gn = req.body.gn;
  db.query("UPDATE users SET GN = ? WHERE email = ?", [gn,email], (err, result) => {
    let x  = Math.floor(Math.random() + 0.5);
    res.json(x);
  });
});


app.post("/verify", (req, res) => {
  const email = req.body.email;
  const v = req.body.v;
const r = req.body.r;

console.log(r);
  db.query("SELECT * FROM userdb.users WHERE email =  '" + email + "' ", (err, result,fields) => {

    var gn_str = result[0].gn;
    var g1_str = result[0].g1;
    var g2_str = result[0].g2;
      
    var g1_stored = new Array();
g1_stored = g1_str.split(',');
var g2_stored = new Array();
g2_stored = g2_str.split(',');
var gn_stored = new Array();
gn_stored = gn_str.split(',');



    if(v==0){

var final = [];

for (let i = 0; i < Math.min(r.length, g1_stored.length); i++) {
  final[i] = r[i] * g1_stored[i];
}

console.log(JSON.stringify(final));
console.log(JSON.stringify(gn_stored));

if(JSON.stringify(final)==JSON.stringify(gn_stored)){
  res.send({ verdict: 'true' });
}else{

  res.send({ verdict: 'false' });
}

    }else{
      
      var final = [];

      for (let i = 0; i < Math.min(r.length, g2_stored.length); i++) {
        final[i] = r[i] * g2_stored[i];
      }
      if(JSON.stringify(final)==JSON.stringify(gn_stored)){
        res.send({ verdict: 'true' });
      }else{
        res.send({ verdict: 'false' });
      }

    }
 
  });
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const g1 = req.body.g1;
  const g2 = req.body.g2;

  db.query(
    "SELECT * FROM userdb.users WHERE email =  '" + email + "' ",
    async function (err, result) {
      if (err) {
        res.send(err);
      }
      if (result.length == 0) {
        db.query(
          "INSERT INTO users (email, g1, g2) VALUE (?,?,?)",
          [email, g1, g2],
          (error, response) => {
            console.log(error);
            console.log(response);
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Inserted Sucessfully" });
          }
        );
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
