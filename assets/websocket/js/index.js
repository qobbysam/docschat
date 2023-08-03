import WebSocketClient from "./websocketclient";
import WebSocketChatClient from "./websocketchatclient";
// Create an instance of WebSocketClient
const socket = new WebSocketClient(window.ConfigVars.companyid);


// Connect to the WebSocket server
socket.connect();


function handleReceivedMessage(data) {
  console.log('Received message:', data);
  // Handle the received data as needed
}

socket.socket.onmessage = (event) => {
  const data = event.data
  handleReceivedMessage(data)
}

export  {socket, WebSocketChatClient,WebSocketClient}
// Send a message
//socket.send('Hello, server!');

// Close the connection
//socketClient.close();
