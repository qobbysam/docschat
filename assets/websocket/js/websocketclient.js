// WebSocketClient.js

export default class WebSocketClient {
    constructor(companyId) {
      this.companyId = companyId;
      this.socket = null;
    }
  
    connect() {
      const wsscheme = window.location.protocol === "https:" ? "wss" : "ws";
      const socketurl = `${wsscheme}://${window.location.host}/ws/socket/${this.companyId}/`;
      this.socket = new WebSocket(socketurl);
  
      this.socket.onopen = () => {
        console.log('Connected to WebSocket server');
      };
  
      this.socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        // Handle the received data as needed
      };
  
      this.socket.onerror = (error) => {
        console.log('Error', error);
        console.log(socketurl);
      };
  
      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
      };
    }
  
    send(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.log('WebSocket connection is not open');
      }
    }
  
    close() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  