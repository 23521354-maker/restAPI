const express = require('express');
const app = express();
app.use(express.json());

let items = [];
let id = 1;

// Create
app.post('/items', (req, res) => {
  const item = { id: id++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// Read all
app.get('/items', (req, res) => {
  res.json(items);
});

// Read one
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// Update
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  Object.assign(item, req.body);
  res.json(item);
});

// Delete
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  items.splice(index, 1);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
