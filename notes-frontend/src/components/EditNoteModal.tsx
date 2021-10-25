import {
  Dialog,
  Theme,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import Note from '../Models/Note'
import NoteInput from './inputs/NoteInput'

type EditNoteModalProps = {
  open: boolean
  onAbort: () => void
  onChange: (note: Note) => void
  onSave: () => void
  note: Note
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
  }),
)

const EditNoteModal = ({
  open,
  onAbort,
  onSave,
  onChange,
  note,
}: EditNoteModalProps) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onSave}
      scroll="paper"
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: classes.container,
        style: { background: note?.color },
      }}
    >
      {note ? (
        <NoteInput
          note={note}
          onChange={(value) => onChange({ ...note, ...value })}
          type={note.type}
          onAbort={onAbort}
          minNoteRows={15}
        />
      ) : (
        <Typography>Note content not available</Typography>
      )}
    </Dialog>
  )
}

export default EditNoteModal
