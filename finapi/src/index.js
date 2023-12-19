import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistAccountCPF(req, res, next) {
   const { cpf } = req.headers;

   const customer = customers.find((customer) => customer.cpf === cpf);

   if (!customer) {
      return res.status(400).json({ error: "Customer not found!" });
   }

   req.customer = customer;

   return next();
}

function getBalance(statement) {
   const balance = statement.reduce((acc, operation) => {
      if (operation.type === "credit") {
         return acc + operation.amount;
      } else {
         return acc - operation.amount;
      }
   }, 0);

   return balance;
}

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

//app.use(verifyIfExistAccountCPF); -> Everything below this line will use this middleware

app.get("/statement", verifyIfExistAccountCPF, (req, res) => {
   const { customer } = req;
   return res.status(200).json(customer.statement);
});

app.get("/statement/date", verifyIfExistAccountCPF, (req, res) => {
   const { customer } = req;
   const { date } = req.query;

   const dateFormat = new Date(date + " 00:00");

   const statement = customer.statement.filter(
      (statement) =>
         statement.created_at.toDateString() ===
         new Date(dateFormat).toDateString()
   );

   return res.status(200).json(statement);
});

app.post("/deposit", verifyIfExistAccountCPF, (req, res) => {
   const { customer } = req;
   const { description, amount } = req.body;

   const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit",
   };

   customer.statement.push(statementOperation);

   res.status(201).send();
});

app.post("/withdraw", verifyIfExistAccountCPF, (req, res) => {
   const { customer } = req;
   const { amount } = req.body;

   const balance = getBalance(customer.statement);

   if (balance < amount) {
      return res.status(400).json({ error: "Insufficient funds!" });
   }

   const statementOperation = {
      amount,
      created_at: new Date(),
      type: "debit",
   };

   customer.statement.push(statementOperation);

   res.status(201).send();
});

app.put("/account", verifyIfExistAccountCPF, (req, res) => {
   const { name } = req.body;
   const { customer } = req;

   customer.name = name;

   res.status(201).send();
});

app.get("/account", verifyIfExistAccountCPF, (req, res) => {
   const { customer } = req;

   res.json(customer);
});

app.listen(3333, () => console.log("Server running http://localhost:3333"));
