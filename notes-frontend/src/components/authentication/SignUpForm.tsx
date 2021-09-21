import { Button, Grid, TextField, Typography } from '@material-ui/core'

type SignInFormProps = {
  onSignUp: () => void
  onSignInClick: () => void
}

const SignUpForm = ({ onSignUp, onSignInClick }: SignInFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSignUp()
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
          <TextField label="Full name" fullWidth />
        </Grid>
        <Grid item xs>
          <TextField label="Username" fullWidth />
        </Grid>
        <Grid item xs>
          <TextField label="Password" type="password" fullWidth />
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
