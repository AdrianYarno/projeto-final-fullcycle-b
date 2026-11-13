const express = require('express');
const app = express();

app.use(express.json());

let orders = [];
let nextId = 1;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/orders', (req, res) => {
  const { customer, item, amount } = req.body;

  if (!customer || !item || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      error: 'Campos obrigatórios: customer (string), item (string) e amount (número > 0).'
    });
  }

  const newOrder = {
    id: nextId++,
    customer,
    item,
    amount,
    status: 'CREATED',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  return res.status(201).json(newOrder);
});

app.get('/orders', (req, res) => {
  return res.status(200).json(orders);
});

app.resetOrders = () => {
  orders = [];
  nextId = 1;
};

module.exports = app;