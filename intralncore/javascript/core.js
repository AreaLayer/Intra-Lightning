const bitcoin = require('bitcoinjs-lib');
const {Mainnet, Testnet} = require('bitcoin-js');
const lightning = require('lightning');
const { ChannelManager, KeysManager, ChainParameters } = require('lightning');

async function main() {
  // Create a new KeysManager to manage our lightning node's keys
  const keysManager = new KeysManager();

  // Create a new ChannelManager to manage lightning channels
  const channelManager = new ChannelManager(
    new ChainParameters({
      network: bitcoin.networks.testnet, // or bitcoin.networks.mainnet
      getRelayFee: () => 0,
      getLeaseFee: () => null,
      createOnionPacket: () => Promise.reject(),
      sendCustomMessage: () => Promise.reject(),
      onUnknownMessage: () => {},
      simpleMonitoring: true,
    }),
    keysManager
  );

  // Create a Map to store peer managers for each channel
  const peerManagers = new Map();

  // Start an infinite loop to handle incoming messages/events
  while (true) {
    // TODO: Handle incoming messages/events here
  }
}

function handleOpenChannel(openChannel, channelManager, peerManagers) {
  // Retrieve the channel_id from the open_channel message
  const channelID = openChannel.channel_id;

  // Retrieve the peerManager for the given channelID
  let peerManager = peerManagers.get(channelID);

  if (!peerManager) {
    // Create a new PeerManager for this channel if it doesn't exist
    peerManager = new lightning.PeerManager(openChannel.chain_hash, channelManager);
    peerManagers.set(channelID, peerManager);
  }

  // Handle the OpenChannel message using the PeerManager
  try {
    peerManager.handleOpenChannel(openChannel);
    // Handle success case
  } catch (error) {
    if (error instanceof lightning.PeerManagerError && error.decodeError === lightning.DecodeError.InvalidValue) {
      // Handle the case where the OpenChannel message is invalid
      // e.g., the channel capacity is too low
    } else if (
      error instanceof lightning.PeerManagerError &&
      error.decodeError === lightning.DecodeError.InvalidValue &&
      error.channelID === channelID
    ) {
      // Handle other specific invalid message cases
    } else {
      // Handle other error cases
    }
  }
}
