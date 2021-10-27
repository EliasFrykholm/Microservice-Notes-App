import { useState, useEffect, useRef, useCallback } from 'react'
import jwtDecode from 'jwt-decode'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'
import { LoggedInUser, UserData } from './Models/User'
import { ValidateToken } from './API/Auth'

function App() {
  const [user, setUser] = useState<LoggedInUser>()
  const [searchFilter, setSearchFilter] = useState('')
  const interval = useRef<number>()

  const updateUser = useCallback(
    (newUser: LoggedInUser | undefined) => {
      localStorage.setItem('token', newUser ? newUser.token : '')
      setUser(newUser)
    },
    [setUser],
  )

  useEffect(() => {
    if (user) {
      interval.current = window.setInterval(() => {
        ValidateToken(user.token).then((ok) => {
          if (!ok && interval.current) {
            clearInterval(interval.current)
            updateUser(undefined)
          }
        })
      }, 10000)
    }
    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [user, updateUser])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      ValidateToken(token).then((ok) => {
        if (ok) {
          const decoded = jwtDecode<UserData>(token)
          updateUser({ token, id: decoded.jti, username: decoded.sub })
        }
      })
    }
  }, [updateUser])

  return (
    <div>
      <Navbar
        user={user}
        onLogout={() => updateUser(undefined)}
        onSearch={setSearchFilter}
      />
      <NotePage user={user} searchFilter={searchFilter} />
      <AuthDialog open={!user} onSignIn={updateUser} />
    </div>
  )
}

export default App
