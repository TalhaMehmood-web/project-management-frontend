"use client";
import { useEffect, useState } from "react";
import { getSocket } from "@/utils/socket";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = getSocket();

  useEffect(() => {
    if (!socket.connected) socket.connect(); // Connect only if not connected

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("❌ Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect(); // Cleanup to prevent memory leaks
    };
  }, [socket]);

  return { socket, isConnected };
};

export default useSocket;
