import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import { UserInfo } from '../../Models/User'

type SignInFormProps = {
  onSignUp: (user: UserInfo) => void
  onSignInClick: () => void
}

const SignUpForm = ({ onSignUp, onSignInClick }: SignInFormProps) => {
  const [formState, setFormState] = useState<UserInfo>({
    fullName: '',
    username: '',
    password: '',
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSignUp(formState)
      }}
    >
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Typography variant="h3">Create Account</Typography>
        </Grid>
        <Grid item>
          <Typography>
            Please enter your personal information. If you already have an
            account, go to the login section.
          </Typography>
        </Grid>
        <Grid item xs>
          <TextField
            value={formState.fullName}
            label="Full name"
            fullWidth
            onChange={(e) =>
              setFormState({ ...formState, fullName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={formState.username}
            onChange={(e) =>
              setFormState({ ...formState, username: e.target.value })
            }
            label="Username"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            label="Password"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <Button color="primary" type="submit" variant="contained" fullWidth>
            Create Account
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={onSignInClick}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignUpForm
