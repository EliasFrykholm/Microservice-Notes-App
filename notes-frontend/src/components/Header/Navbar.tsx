import {
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Theme,
  Grid,
  InputBase,
  alpha,
  Box,
} from '@material-ui/core'
import { Clear, Search } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { LoggedInUser } from '../../Models/User'

interface NavbarProps {
  user: LoggedInUser | undefined
  onLogout: () => void
  onSearch: (text: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
      padding: '2px',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.45),
      },
      maxWidth: '600px',
      minWidth: '200px',
      margin: 'auto',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      width: '100%',
    },
  }),
)

const Navbar = ({ user, onLogout, onSearch }: NavbarProps) => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              Notes
            </Typography>
          </Grid>
          <Grid item xs>
            <Box className={classes.search} display="flex" flexDirection="row">
              <IconButton size="small" onClick={() => onSearch(searchText)}>
                <Search />
              </IconButton>
              <InputBase
                fullWidth
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'enter' && onSearch(searchText)}
                onBlur={() => onSearch(searchText)}
                inputProps={{ 'aria-label': 'search' }}
              />
              {searchText && (
                <IconButton
                  size="small"
                  onClick={() => {
                    onSearch('')
                    setSearchText('')
                  }}
                >
                  <Clear />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item>
            {user ? (
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
