import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
   const { cpf, name } = req.body;
   const id = uuidv4();

   customers.push({
      cpf,
      name,
      id,
      statement: [],
   });

   console.log(customers);

   return res.status(201).send();
});

app.listen(3333, () => console.log("Server running http://localhost:3333"));
