import { API_BASE_URL } from "@/lib/app";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = API_BASE_URL;

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"], // Ensures faster real-time communication
      autoConnect: false, // Prevents auto connection on import
    });
  }
  return socket;
};
