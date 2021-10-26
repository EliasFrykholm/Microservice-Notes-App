import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'
import { LoggedInUser } from './Models/User'
import { ValidateToken } from './API/Auth'

function App() {
  const [user, setUser] = useState<LoggedInUser>()
  const [searchFilter, setSearchFilter] = useState('')
  const interval = useRef<number>()

  useEffect(() => {
    if (user) {
      interval.current = window.setInterval(() => {
        ValidateToken(user.token).then((ok) => {
          if (!ok && interval.current) {
            clearInterval(interval.current)
            setUser(undefined)
          }
        })
      }, 10000)
    }
    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [user, setUser])

  return (
    <div>
      <Navbar
        user={user}
        onLogout={() => setUser(undefined)}
        onSearch={setSearchFilter}
      />
      <NotePage user={user} searchFilter={searchFilter} />
      <AuthDialog open={!user} onSignIn={setUser} />
    </div>
  )
}

export default App
