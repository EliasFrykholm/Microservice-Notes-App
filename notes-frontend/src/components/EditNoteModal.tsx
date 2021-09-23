import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Theme,
  Typography,
  makeStyles,
  createStyles,
  DialogActions,
} from '@material-ui/core'
import Note from '../Models/Note'

type EditNoteModalProps = {
  open: boolean
  onClose: () => void
  onChange: (note: Note) => void
  note: Note | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleInput: theme.typography.h4,
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
    >
      {note ? (
        <>
          <DialogTitle>
            <TextField
              value={note.Title}
              onChange={(e) => onChange({ ...note, Title: e.target.value })}
              variant="outlined"
              fullWidth
              inputProps={{
                className: classes.titleInput,
              }}
            />
          </DialogTitle>
          <DialogContent>
            <TextField
              value={note.Content}
              variant="outlined"
              onChange={(e) => onChange({ ...note, Content: e.target.value })}
              multiline
              minRows={30}
              fullWidth
            />
          </DialogContent>
          <DialogActions />
        </>
      ) : (
        <Typography>Note content not available</Typography>
      )}
    </Dialog>
  )
}

export default EditNoteModal
