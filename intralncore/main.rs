use bitcoin::network::constants::Network;
use bitcoin::util::address::Address;
use bdk::blockchain::noop_progress;
use bdk::blockchain::Blockchain;
use bdk::database::MemoryDatabase;
use bdk::Wallet;
use bdk::WalletDescriptor;
use bdk::WalletEntry;
use ldk::channel_manager::ChannelManager;
use ldk::keysinterface::{KeysInterface, KeysManager};
use ldk::ln::chan_utils::OutPoint;
use ldk::ln::channelmanager::ChainParameters;
use ldk::ln::msgs::DecodeError;
use ldk::ln::peer_handler::{CustomMessageHandler, PeerManager};
use ldk::ln::peer_manager::{PeerManagerError, SocketDescriptor};
use ldk::ln::scripts::build_funding_redeemscript;
use ldk::ln::msgs::{ErrorMessage, FundingLocked, OpenChannel};
use ldk::ln::wire::Encode;
use ldk::util::config::UserConfig;
use ldk::util::events::{EventsProvider, MessageSendEvent};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

fn main() {
    // Create a new KeysManager to manage our lightning node's keys
    let keys_manager = Arc::new(Mutex::new(KeysManager::new(&MemoryDatabase::default())));

    // Create a new ChannelManager to manage lightning channels
    let channel_manager = Arc::new(Mutex::new(ChannelManager::new(
        UserConfig::default(),
        Arc::clone(&keys_manager) as Arc<dyn KeysInterface>,
        ChainParameters {
            network: Network::Testnet,
            best_block: Default::default(),
            get_relay_fee: Arc::new(|_| 0),
            get_lease_fee: Arc::new(|_| None),
            create_onion_packet: Arc::new(|_| Err(())),
            send_custom_message: Arc::new(|_| Err(())),
            on_unknown_msg: Arc::new(|_| {}),
            simple_monitoring: true,
        },
    )));

    // Create a hashmap to store peer managers for each channel
    let mut peer_managers: HashMap<OutPoint, PeerManager<SocketDescriptor>> = HashMap::new();

    // Start an infinite loop to handle incoming messages/events
    loop {
        // TODO: Handle incoming messages/events here
    }
}
fn handle_open_channel(
    open_channel: OpenChannel,
    channel_manager: Arc<Mutex<ChannelManager<KeysManager>>>,
    peer_managers: &mut HashMap<OutPoint, PeerManager<SocketDescriptor>>,
) {
    // Retrieve the channel_id from the open_channel message
    let channel_id = open_channel.channel_id;

    // Retrieve the peer_manager for the given channel_id
    let peer_manager = match peer_managers.get(&channel_id) {
        Some(peer_manager) => peer_manager,
        None => {
            // Create a new PeerManager for this channel if it doesn't exist
            let new_peer_manager = PeerManager::new(
                open_channel.chain_hash,
                Arc::clone(&channel_manager) as Arc<dyn CustomMessageHandler>,
            );
            peer_managers.insert(channel_id.clone(), new_peer_manager);
            peer_managers.get(&channel_id).unwrap()
        }
    };

    // Handle the OpenChannel message using the PeerManager
    match peer_manager.handle_open_channel(open_channel) {
        Ok(_) => { /* Handle success case */ }
        Err(PeerManagerError::InvalidMessage(_, DecodeError::InvalidValue)) => {
            // Handle the case where the OpenChannel message is invalid
            // e.g., the channel capacity is too low
        }
        Err(PeerManagerError::InvalidMessage(channel_id, DecodeError::InvalidValue)) => {
            // Handle other specific invalid message cases
        }
        _ => { /* Handle other error cases */ }
    }
}
