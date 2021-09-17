import { useState } from 'react'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'

function App() {
  const [user, setUser] = useState<string>()

  return (
    <div>
      <Navbar />
      <NotePage />
      <AuthDialog open={!user} onSignIn={setUser} />
    </div>
  )
}

export default App
