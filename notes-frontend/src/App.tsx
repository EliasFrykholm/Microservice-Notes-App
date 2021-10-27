import { useState, useEffect, useCallback } from 'react'
import jwtDecode from 'jwt-decode'
import Navbar from './components/Header/Navbar'
import NotePage from './components/NotePage'
import AuthDialog from './components/authentication/AuthDialog'
import { RefreshToken, ValidateToken } from './API/Auth'
import { TokenData } from './Models/User'

function App() {
  const [token, setToken] = useState<string>()
  const [searchFilter, setSearchFilter] = useState('')

  const updateToken = useCallback((newToken: string | undefined) => {
    localStorage.setItem('token', newToken || '')
    setToken(newToken)
    if (newToken) {
      const decoded: TokenData = jwtDecode<TokenData>(newToken)
      if (decoded.exp) {
        const currentDate = new Date()
        const timeout = decoded.exp * 1000 - currentDate.getTime() - 3000
        window.setTimeout(() => {
          RefreshToken(newToken).then((response: { token: string }) => {
            updateToken(response.token)
          })
        }, timeout)
      }
    }
  }, [])

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
