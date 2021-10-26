import { Dialog, DialogContent, DialogActions } from '@material-ui/core'
import { useState } from 'react'
import { Login, SignUp } from '../../API/Auth'
import { LoggedInUser, UserCredentials, UserInfo } from '../../Models/User'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

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
      .then((response: LoggedInUser) => {
        if (response.token) onSignIn(response)
      })
      .catch((e) => console.log(e))
  }

  const handleSignUp = (userInfo: UserInfo) => {
    SignUp(userInfo)
      .then(() =>
        handleSignIn({
          username: userInfo.username,
          password: userInfo.password,
        }),
      )
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
            onSignUp={handleSignUp}
            onSignInClick={() => setInputType(InputType.signIn)}
          />
        )}
      </DialogContent>
      <DialogActions />
    </Dialog>
  )
}

export default AuthDialog
