import { Blob } from '@vercel/blob';
import express from 'express';

const router = express.Router();

// Vercel Storage setup
const blob = new Blob({ name: 'portfolio-blob' });

// Save message
router.post('/message', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const timestamp = new Date().toISOString();
  const key = `messages/${timestamp}-${name}.json`;

  try {
    await blob.put(key, JSON.stringify({ name, email, subject, message, timestamp }));
    res.json({ message: 'Message received' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Admin panel to view messages
router.get('/admin/messages', async (req, res) => {
  try {
    const keys = await blob.list('messages/');
    const allMessages = [];

    for (let key of keys) {
      const data = await blob.get(key);
      allMessages.push(JSON.parse(data.toString()));
    }

    // Simple HTML table view
    let html = `<h1>Admin Messages</h1><table border="1" style="border-collapse:collapse;">
      <tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Time</th></tr>`;

    allMessages.forEach(msg => {
      html += `<tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.subject || '-'}</td>
        <td>${msg.message}</td>
        <td>${msg.timestamp}</td>
      </tr>`;
    });

    html += `</table>`;
    res.send(html);

  } catch (err) {
    console.log(err);
    res.status(500).send('Failed to fetch messages');
  }
});

export default router;