const bitcoin = require('bitcoinjs-lib');
const RpcClient = require('bitcoin-core');

// Configuration for your Bitcoin Core RPC
const rpcConfig = {
  protocol: 'http',
  user: 'your_rpc_username',
  pass: 'your_rpc_password',
  host: '127.0.0.1', // Replace with your Bitcoin Core's RPC server address
  port: 8332,        // Replace with the RPC port you've configured
};

const rpc = new RpcClient(rpcConfig);

// Example function to create a Bitcoin transaction
async function createTransaction() {
  const keyPair = bitcoin.ECPair.makeRandom();
  const address = keyPair.getAddress();

  // Fetch the current balance
  const balance = await rpc.getBalance();
  console.log(`Current balance: ${balance}`);

  // Create a transaction
  const txb = new bitcoin.TransactionBuilder();

  // Add an input
  txb.addInput('previousTxId', 0); // Replace with the actual previous transaction ID and output index

  // Add an output
  txb.addOutput('receiverAddress', 100000); // Replace with the recipient's address and the amount in satoshis

  // Sign the transaction
  txb.sign(0, keyPair);

  const tx = txb.build();
  const txHex = tx.toHex();

  console.log('Unsigned Transaction Hex:', txHex);
}

createTransaction()
  .catch((error) => console.error('Error:', error));

