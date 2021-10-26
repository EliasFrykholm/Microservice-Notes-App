import {
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Theme,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LoggedInUser } from '../../Models/User'

interface NavbarProps {
  user: LoggedInUser | undefined
  onLogout: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Notes
        </Typography>
        {user ? (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
