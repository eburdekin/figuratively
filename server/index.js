import express from "express";
import pkg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
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

const getUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id",
      [username, email]
    );
    res.status(201).json({ message: "User added", id: results.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email } = req.body;
  try {
    const results = await pool.query(
      "UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id",
      [username, email, id]
    );
    res.status(201).json({ message: "User updated", id: results.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING id",
      [id]
    );
    res.status(200).json({ message: "User deleted", id: results.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

app.route("/users").get(getUsers).post(createUser);

app.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
