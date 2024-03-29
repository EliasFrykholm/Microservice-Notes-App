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
import { useState, useRef } from 'react'
import NoteDescription, { ListNoteContent } from '../../Models/NoteDescription'
import NoteType from '../../Models/NoteType'
import ListNoteContentInput from './ListNoteContentInput'
import TextNoteContentInput from './TextNoteContentInput'
import ColorPicker from '../ColorPicker'

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

  const [colorPickerOpen, setColorPickerOpen] = useState(false)

  const colorRef = useRef(null)

  const renderContentInput = (): JSX.Element | undefined => {
    switch (type) {
      case NoteType.Note:
        return (
          <TextNoteContentInput
            value={note.textContent as string}
            onChange={(value) => onChange({ ...note, textContent: value })}
            maxRows={maxListRows}
            minRows={minNoteRows}
          />
        )
      case NoteType.List:
        return (
          <ListNoteContentInput
            items={note.listContent as ListNoteContent[]}
            onChange={(value) => onChange({ ...note, listContent: value })}
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
          value={note.title}
          onChange={(e) => onChange({ ...note, title: e.target.value })}
        />
      </Grid>
      <Grid item>{renderContentInput()}</Grid>
      <Grid item container direction="row">
        <Grid item>
          <IconButton ref={colorRef} onClick={() => setColorPickerOpen(true)}>
            <Palette />
          </IconButton>
          <ColorPicker
            anchor={colorRef}
            onChange={(value) => onChange({ ...note, color: value })}
            onClose={() => setColorPickerOpen(false)}
            open={colorPickerOpen}
            color={note.color}
          />
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
                onSave(note)
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
