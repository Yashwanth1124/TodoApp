import express from 'express';
import { processUserInput } from './aiModel.js';

const app = express();
app.use(express.json());

// API Endpoint to Process User Queries
app.post('/api/process-query', async (req, res) => {
  const { query } = req.body;
  const { reply, extractedTask } = await processUserInput(query);
  res.json({ reply, extractedTask });
});

// Start Server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
