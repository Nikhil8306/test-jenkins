import express from "express";
const app = express();


app.get("/", (req, res) => {
    res.send("Hello There")
})


app.listen(9000, () => {
    console.log("Server running !");   
})
