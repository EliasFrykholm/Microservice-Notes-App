import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'
import { ValidateToken } from './API/Auth'

function App() {
  const [token, setToken] = useState<string>()
  const [searchFilter, setSearchFilter] = useState('')
  const interval = useRef<number>()

  const updateToken = useCallback(
    (newToken: string | undefined) => {
      localStorage.setItem('token', newToken || '')
      setToken(newToken)
    },
    [setToken],
  )

  useEffect(() => {
    if (token) {
      interval.current = window.setInterval(() => {
        ValidateToken(token).then((ok) => {
          if (!ok && interval.current) {
            clearInterval(interval.current)
            updateToken(undefined)
          }
        })
      }, 10000)
    }
    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [token, updateToken])

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      ValidateToken(localToken).then((ok) => {
        if (ok) {
          updateToken(localToken)
        }
      })
    }
  }, [updateToken])

  return (
    <div>
      <Navbar
        signedIn={!!token}
        onLogout={() => updateToken(undefined)}
        onSearch={setSearchFilter}
      />
      <NotePage token={token} searchFilter={searchFilter} />
      <AuthDialog open={!token} onSignIn={updateToken} />
    </div>
  )
}

export default App
