const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const classesRouter = require("../classes/classes-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ api: "connected" });
});

server.use("/users", usersRouter);
server.use("/auth", authRouter);
server.use("/classes", classesRouter);

module.exports = server;
