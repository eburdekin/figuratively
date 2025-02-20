import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
    [name, email],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: "User added", id: results.rows[0].id });
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id",
    [name, email, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: "User updated", id: results.rows[0].id });
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING id",
    [id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ message: "User deleted", id: results.rows[0].id });
    }
  );
};

app.route("/users").get(getUsers).post(createUser);

app.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
