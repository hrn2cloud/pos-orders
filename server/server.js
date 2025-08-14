const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/api/clover', async (req, res) => {
  try {
    const merchantId = req.query.merchantId || '{merchantId}';
    const cloverUrl = "https://api.clover.com/v3/merchants";
    const response = await axios.get(cloverUrl, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Clover API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
