const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 80;

const allowedOrigins = [
    'https://your-frontend-domain.com',
    'http://localhost:3000',
    'http://localhost:8081',
];

const corsOptions = {
    origin: allowedOrigins, // Replace with your actual frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Add body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/api/clover/*', async (req, res) => {
  try {
    const cloverUrl = `https://api.clover.com/v3/merchants${req.originalUrl.replace('/api/clover', '')}`;
      const headersToForward = {};
      if (req.headers.authorization) {
          headersToForward.Authorization = req.headers.authorization;
      }

      const reqConfig = {
          method: req.method,  // Pass the same HTTP method (e.g., GET, POST)
          url: cloverUrl,      // Pass the reconstructed URL
          headers: headersToForward,    // Pass the cleaned headers
          data: req.body,      // Pass the incoming request body
          params: req.query,   // Pass the incoming query parameters
      }
      const response = await axios(reqConfig);
      res.json(response.data);
    } catch (error) {
      console.error('Proxy failed to forward request:', error.message);
      // Send an appropriate error response
      res.status(error.response ? error.response.status : 500).json({
          error: 'Failed to forward request to Clover API',
          details: error.message
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
