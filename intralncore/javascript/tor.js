import WebSocket from 'ws';
import { SocksProxyAgent } from 'socks-proxy-agent';

const agent = new SocksProxyAgent(
	'socks://your-name%40gmail.com:abcdef12345124@br41.nordvpn.com'
);

var socket = new WebSocket('ws://echo.websocket.events', { agent });

socket.on('open', function () {
	console.log('"open" event!');
	socket.send('hello world');
});

socket.on('message', function (data, flags) {
	console.log('"message" event! %j %j', data, flags);
	socket.close();
});
