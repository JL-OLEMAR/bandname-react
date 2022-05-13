import { createContext } from 'react'

import { useSocket } from '../hooks/useSocket.js'

// Context
export const SocketContext = createContext()

// Provider
export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket('http://localhost:8080')

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  )
}
