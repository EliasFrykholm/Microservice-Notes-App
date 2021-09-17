import { Theme, Fab, Paper } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: 'absolute',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  }),
)

const NotePage = () => {
  const classes = useStyles()
  return (
    <>
      <Paper />
      <Fab color="primary" aria-label="add" className={classes.addButton}>
        <Add />
      </Fab>
    </>
  )
}

export default NotePage
