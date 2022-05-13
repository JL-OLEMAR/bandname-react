import { HomePage } from './pages/HomePage.js'
import { SocketProvider } from './context/SocketContext.js'

export const BandNamesApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  )
}
