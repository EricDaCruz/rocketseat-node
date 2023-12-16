import express from "express";

const app = express();

app.get("/", (req, res) => {
   return res.status(200).json({ message: "Hello World Ignite" });
});

app.listen(3333, () => console.log("Server running http://localhost:3333"));
