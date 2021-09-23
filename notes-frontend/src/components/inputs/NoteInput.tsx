import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  TextField,
} from '@material-ui/core'
import { Palette } from '@material-ui/icons'
import NoteDescription from '../../Models/NoteDescription'
import NoteType from '../../Models/NoteType'
import ListNoteContentInput from './ListNoteContentInput'
import TextNoteContentInput from './TextNoteContentInput'

interface NoteInputProps {
  note: NoteDescription
  type: NoteType
  onChange: (note: NoteDescription) => void
  onAbort?: () => void
  onSave?: (note: NoteDescription) => void
  maxListRows?: number
  maxNoteHeight?: string
  minNoteRows?: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    InputComponent: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    TitleInput: theme.typography.h6,
    ContentInput: theme.typography.body1,
  }),
)

const NoteInput = ({
  note,
  type,
  onChange,
  onAbort,
  onSave,
  maxListRows,
  maxNoteHeight,
  minNoteRows,
}: NoteInputProps) => {
  const classes = useStyles()

  const renderContentInput = (): JSX.Element | undefined => {
    switch (type) {
      case NoteType.Note:
        return (
          <TextNoteContentInput
            value={note.Content as string}
            onChange={(value) => onChange({ ...note, Content: value })}
            maxRows={maxListRows}
            minRows={minNoteRows}
          />
        )
      case NoteType.List:
        return (
          <ListNoteContentInput
            items={note.Content as string[]}
            onChange={(value) => onChange({ ...note, Content: value })}
            maxHeight={maxNoteHeight}
          />
        )
      default:
        return undefined
    }
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      className={classes.InputComponent}
    >
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          inputProps={{
            className: classes.TitleInput,
          }}
          label="Title"
          value={note.Title}
          onChange={(e) => onChange({ ...note, Title: e.target.value })}
        />
      </Grid>
      <Grid item>{renderContentInput()}</Grid>
      <Grid item container direction="row">
        <Grid item>
          <IconButton>
            <Palette />
          </IconButton>
        </Grid>
        <Grid item xs />
        {onAbort && (
          <Grid item>
            <Button
              onClick={() => {
                onAbort()
              }}
            >
              Cancel
            </Button>
          </Grid>
        )}
        {onSave && (
          <Grid item>
            <Button
              onClick={() => {
                onSave({ Title: note.Title, Content: note.Content })
              }}
            >
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default NoteInput
