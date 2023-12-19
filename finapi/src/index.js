import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
   const { cpf, name } = req.body;

   const customerAlreadyExists = customers.some(
      (customer) => customer.cpf === cpf
   );

   if (customerAlreadyExists) {
      return res.status(400).json({ error: "Customer already exists!" });
   }

   customers.push({
      cpf,
      name,
      id: uuidv4(),
      statement: [],
   });

   return res.status(201).send();
});

app.get("/statement", (req, res) => {
   const { cpf } = req.headers;

   const customer = customers.find((customer) => customer.cpf === cpf);

   if (!customer) {
      return res.status(400).json({ error: "Customer not found!" });
   }

   return res.status(200).json(customer.statement);
});

app.listen(3333, () => console.log("Server running http://localhost:3333"));
