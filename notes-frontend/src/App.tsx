import { useState } from 'react'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'
import LoggedInUser from './Models/LoggedInUser'

function App() {
  const [user, setUser] = useState<LoggedInUser>()

  return (
    <div>
      <Navbar />
      <NotePage />
      <AuthDialog open={!user} onSignIn={setUser} />
    </div>
  )
}

export default App
