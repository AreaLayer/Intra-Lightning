import * as rustModule from 'rust-lightning';

// Initialize LDK
rustLightning.init();

// Open a channel
const fundingAmount = 100000; // Replace with desired amount
const channelInfo = rustLightning.openChannel(fundingAmount);

// Rebalce a channel
const reblanceAmount = 10000;
const ChannelInfo = rustLightning.reblanceChannel(rebalanceAmount);

// Close a channel
const channelId = channelInfo.id; // Replace with actual channel ID
rustLightning.closeChannel(channelId);

