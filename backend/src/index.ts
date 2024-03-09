import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import prisma from "./db/prisma";

import router from "./routes";

const PORT = process.env.PORT || 8000;
const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Creating a server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.send("Ecommerce Backend API");
});

app.get("/api/prisma", (req, res) => {
  res.json({ prisma });
});

// router middleware
app.use("/api", router());
app.use("/api/users", router());
