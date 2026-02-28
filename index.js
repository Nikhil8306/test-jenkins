import express from "express";
const app = express();


app.get("/", (req, res) => {
  res.send("OK")
})


app.listen(2001, () => {
  console.log("Server running !");
  process.send("ready");
})

