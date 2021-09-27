import {
  Dialog,
  DialogContent,
  DialogActions,
  responsiveFontSizes,
} from '@material-ui/core'
import { request } from 'http'
import { useState } from 'react'
import { LOGIN_ENDPOINT } from '../../API/Endpoints'
import Login from '../../hooks/Login'
import UserCredentials from '../../Models/UserCredentials'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import LoggedInUser from '../../Models/LoggedInUser'

type AuthDialogProps = {
  open: boolean
  onSignIn: (user: LoggedInUser) => void
}

enum InputType {
  signIn,
  signUp,
}

const AuthDialog = ({ open, onSignIn }: AuthDialogProps) => {
  const [inputType, setInputType] = useState(InputType.signIn)

  const handleSignIn = (userCredentials: UserCredentials) => {
    Login(userCredentials)
      .then((response: LoggedInUser) => onSignIn(response))
      .catch((e) => console.log(e))
  }

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogContent>
        {inputType === InputType.signIn ? (
          <SignInForm
            onSignIn={handleSignIn}
            onSignUpClick={() => setInputType(InputType.signUp)}
          />
        ) : (
          <SignUpForm
            onSignUp={() => undefined}
            onSignInClick={() => setInputType(InputType.signIn)}
          />
        )}
      </DialogContent>
      <DialogActions />
    </Dialog>
  )
}

export default AuthDialog
