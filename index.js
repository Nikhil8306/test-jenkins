import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log("Received request");
  res.send("OK")
})

const server = app.listen(2001, () => {
  console.log("Server running !");
})

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
  console.log("Shutting down...");
  server.close(() => {
    process.exit(0);
  });
}