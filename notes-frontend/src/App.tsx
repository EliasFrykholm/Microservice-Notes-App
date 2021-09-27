import { useState } from 'react'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'
import { LoggedInUser } from './Models/User'

function App() {
  const [user, setUser] = useState<LoggedInUser>()

  return (
    <div>
      <Navbar />
      <NotePage user={user} />
      <AuthDialog open={!user} onSignIn={setUser} />
    </div>
  )
}

export default App
