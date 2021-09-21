import { Dialog, DialogContent, DialogActions } from '@material-ui/core'
import { useState } from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

type AuthDialogProps = {
  open: boolean
  onSignIn: (user: string) => void
}

enum InputType {
  signIn,
  signUp,
}

const AuthDialog = ({ open, onSignIn }: AuthDialogProps) => {
  const [inputType, setInputType] = useState(InputType.signIn)

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogContent>
        {inputType === InputType.signIn ? (
          <SignInForm
            onSignIn={() => onSignIn('test')}
            onSignUpClick={() => setInputType(InputType.signUp)}
          />
        ) : (
          <SignUpForm
            onSignUp={() => onSignIn('något')}
            onSignInClick={() => setInputType(InputType.signIn)}
          />
        )}
      </DialogContent>
      <DialogActions />
    </Dialog>
  )
}

export default AuthDialog
