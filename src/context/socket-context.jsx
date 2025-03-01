"use client";
import { createContext, useContext } from "react";
import useSocket from "@/hooks/useSocket";
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, isConnected } = useSocket();

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
