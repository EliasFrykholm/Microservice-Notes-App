import {
  IconButton,
  makeStyles,
  Paper,
  Theme,
  createStyles,
  Tooltip,
  Grid,
} from '@material-ui/core'
import {
  FormatListBulleted,
  InsertDriveFile,
  Subject,
} from '@material-ui/icons'
import NoteType from '../Models/NoteType'

interface NoteMenuProps {
  typeFilter: NoteType | undefined
  setTypeFilter: (type: NoteType | undefined) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'fixed',
      bottom: theme.spacing(4),
      left: '50%',
      transform: 'translate(-50%, 0)',
    },
    containerPaper: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }),
)

const NoteMenu = ({ typeFilter, setTypeFilter }: NoteMenuProps) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.containerPaper}>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item>
            <Tooltip title="All notes" placement="top">
              <IconButton
                disabled={typeFilter === undefined}
                onClick={() => setTypeFilter(undefined)}
              >
                <InsertDriveFile
                  color={typeFilter === undefined ? 'secondary' : undefined}
                />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Text notes" placement="top">
              <IconButton
                disabled={typeFilter === NoteType.Note}
                onClick={() => setTypeFilter(NoteType.Note)}
              >
                <Subject
                  color={typeFilter === NoteType.Note ? 'secondary' : undefined}
                />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="List notes" placement="top">
              <IconButton
                disabled={typeFilter === NoteType.List}
                onClick={() => setTypeFilter(NoteType.List)}
              >
                <FormatListBulleted
                  color={typeFilter === NoteType.List ? 'secondary' : undefined}
                />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default NoteMenu
