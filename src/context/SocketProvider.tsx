import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8080", {
  auth: {
    token: `Bearer ${localStorage.getItem("accessToken")}`
  }
});

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
    return useContext(SocketContext);
};