const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/lookup', async (req, res) => {
  const number = req.query.number;
  if (!number) return res.status(400).json({ error: 'Number is required' });

  const url = `https://search5-noneu.truecaller.com/v2/search?q=${number}&countryCode=BD&type=4&encoding=json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Truecaller/15.8.6 (Android;15)',
        'Connection': 'Keep-Alive',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Authorization': 'Bearer a2i0G--tSTAV5-okDXVrJeZaIlfypP8TqZRY8Dd-MI5UturBJd0ojtWn17fzQGQe'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(204).end(); // No content yet
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
