const express = require("express");
const router = require("./router/index.router");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

app
  .listen(port, () => {
    console.log(`O Servidor está rodando na porta: ${port}`);
  })
  .on("error", (err) => {
    process.once("SIGUSR2", () => {
      process.kill(process.pid, "SIGUSR2");
    });
  });
