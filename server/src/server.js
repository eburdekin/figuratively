import express from "express";
import cors from "cors";
// import prisma from "./config/prisma.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const allowedOrigins = [
  "http://localhost:5173",
  // "https://yourfrontenddomain.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and authorization headers
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// const getUsers = async (req, res) => {
//   try {
//     // const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
//     const results = await prisma.user.findMany();
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const getUserById = async (req, res) => {
//   // const id = parseInt(req.params.id);
//   try {
//     // const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     const results = await prisma.user.findUnique({
//       where: { id: parseInt(req.params.id) },
//     });
//     if (!results) {
//       res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(results.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const createUser = async (req, res) => {
//   // const { username, email } = req.body;
//   try {
//     // const results = await pool.query(
//     //   "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id",
//     //   [username, email]
//     // );
//     const newUser = await prisma.user.create({
//       data: {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//     });
//     res.status(201).json({ message: "User added", id: newUser.id });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const updateUser = async (req, res) => {
//   // const id = parseInt(req.params.id);
//   // const { username, email } = req.body;
//   try {
//     // const results = await pool.query(
//     //   "UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id",
//     //   [username, email, id]
//     // );
//     const updatedUser = await prisma.user.update({
//       where: { id: parseInt(req.params.id) },
//       data: {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//     });
//     res.status(201).json({ message: "User updated", id: updatedUser.id });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   // const id = parseInt(req.params.id);
//   try {
//     // const results = await pool.query(
//     //   "DELETE FROM users WHERE id=$1 RETURNING id",
//     //   [id]
//     // );
//     const deletedUser = await prisma.user.delete({
//       where: { id: parseInt(req.params.id) },
//     });
//     if (!deletedUser) {
//       res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted", id: deletedUser.id });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// app.route("/users").get(getUsers).post(createUser);

// app.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/images", imageRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
