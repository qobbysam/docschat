import WebSocketChatClient from "./websocketchatclient";

const socket = new WebSocketChatClient(window.ConfigVars.companyid, window.ConfigVars.userid);

socket.connect()

export {socket}
