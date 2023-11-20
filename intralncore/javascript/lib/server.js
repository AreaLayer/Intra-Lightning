const express = require('express');
const bodyParser = require('body-parser');
const bitcoin = require('bitcoin');
const lightning = require('lightning-client');

const app = express();
const port = 3000;

// Configure Bitcoin Core RPC
const bitcoinConfig = {
  host: 'localhost',
  port: 8332,
  user: 'your_rpc_username',
  pass: 'your_rpc_password',
};

const bitcoinClient = new bitcoin.Client(bitcoinConfig);

// Configure Lightning RPC
const lightningConfig = {
  url: 'http://localhost:8080', // Replace with your Lightning node's RPC URL
  user: 'your_rpc_username',
  pass: 'your_rpc_password',
};

const lightningClient = new lightning(lightningConfig);

app.use(bodyParser.json());

// Endpoint for Bitcoin Core RPC
app.post('/bitcoin', (req, res) => {
  const { method, params } = req.body;

  bitcoinClient.cmd(method, ...params, (err, result) => {
    if (err) {
      console.error(`Bitcoin RPC error: ${err.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ result });
    }
  });
});

// Endpoint for Lightning RPC
app.post('/lightning', (req, res) => {
  const { method, params } = req.body;

  lightningClient.call(method, ...params, (err, result) => {
    if (err) {
      console.error(`Lightning RPC error: ${err.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ result });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
