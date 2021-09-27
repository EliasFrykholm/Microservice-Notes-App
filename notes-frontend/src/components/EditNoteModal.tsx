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
  onClose: () => void
  onChange: (note: Note) => void
  note: Note | undefined
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
  onClose,
  onChange,
  note,
}: EditNoteModalProps) => {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onAbort={onClose}
          minNoteRows={15}
        />
      ) : (
        <Typography>Note content not available</Typography>
      )}
    </Dialog>
  )
}

export default EditNoteModal
