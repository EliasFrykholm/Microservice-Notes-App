import {
  IconButton,
  makeStyles,
  Paper,
  Theme,
  createStyles,
  Tooltip,
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
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    paddedButton: {
      padding: theme.spacing(1),
    },
  }),
)

const NoteMenu = ({ typeFilter, setTypeFilter }: NoteMenuProps) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Paper elevation={3}>
        <div className={classes.paddedButton}>
          <Tooltip title="All notes" placement="right">
            <IconButton
              disabled={typeFilter === undefined}
              onClick={() => setTypeFilter(undefined)}
            >
              <InsertDriveFile
                color={typeFilter === undefined ? 'secondary' : undefined}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.paddedButton}>
          <Tooltip title="Text notes" placement="right">
            <IconButton
              disabled={typeFilter === NoteType.Note}
              onClick={() => setTypeFilter(NoteType.Note)}
            >
              <Subject
                color={typeFilter === NoteType.Note ? 'secondary' : undefined}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.paddedButton}>
          <Tooltip title="List notes" placement="right">
            <IconButton
              disabled={typeFilter === NoteType.List}
              onClick={() => setTypeFilter(NoteType.List)}
            >
              <FormatListBulleted
                color={typeFilter === NoteType.List ? 'secondary' : undefined}
              />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    </div>
  )
}

export default NoteMenu
