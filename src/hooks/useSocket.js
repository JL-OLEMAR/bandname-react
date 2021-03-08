import { useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'

export const useSocket = (serverPath) => {
  const socket = useMemo(() => io.connect(serverPath, {
    transports: ['websocket'] // Tipo de comunicación al servidor. v3 de io
  }), [serverPath])

  const [online, setOnline] = useState(false)

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket,
    online
  }
}
