import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import UserCredentials from '../../Models/UserCredentials'

type SignInFormProps = {
  onSignIn: (credentials: UserCredentials) => void
  onSignUpClick: () => void
}

const SignInForm = ({ onSignIn, onSignUpClick }: SignInFormProps) => {
  const [signInState, setSignInState] = useState<UserCredentials>({
    username: '',
    password: '',
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSignIn(signInState)
      }}
    >
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Typography variant="h3">Log In</Typography>
        </Grid>
        <Grid item>
          <Typography>
            Please enter your credentials. If you dont have an account, go to
            the create account section.
          </Typography>
        </Grid>
        <Grid item xs>
          <TextField
            label="Username"
            value={signInState.username}
            onChange={(e) =>
              setSignInState({ ...signInState, username: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Password"
            type="password"
            value={signInState.password}
            onChange={(e) =>
              setSignInState({ ...signInState, password: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <Button color="primary" type="submit" variant="contained" fullWidth>
            Log In
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onSignUpClick}>
            Create Account
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignInForm
