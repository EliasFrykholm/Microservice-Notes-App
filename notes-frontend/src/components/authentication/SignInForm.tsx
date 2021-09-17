import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core'

type SignInFormProps = {
  onSignIn: () => void
  onSignUpClick: () => void
}

const SignInForm = ({ onSignIn, onSignUpClick }: SignInFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        console.log(event)
        onSignIn()
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
          <TextField label="Username" fullWidth />
        </Grid>
        <Grid item xs>
          <TextField label="Password" type="password" fullWidth />
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
