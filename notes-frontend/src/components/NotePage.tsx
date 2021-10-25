import { Theme, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import NoteSummaryCard from './NoteSummaryCard'
import Note from '../Models/Note'
import EditNoteModal from './EditNoteModal'
import CreateNoteCard from './CreateNoteCard'
import { createNote, deleteNote, fetchNotes, updateNote } from '../API/Note'
import { LoggedInUser } from '../Models/User'
import NoteDescription from '../Models/NoteDescription'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    noteContainer: {
      padding: theme.spacing(4),
    },
    masonryGridCol: {
      paddingLeft: '30px' /* gutter size */,
      backgroundClip: 'padding-box',
    },
    masonryGrid: {
      display: 'flex',
      marginLeft: '-30px' /* gutter size offset */,
      width: 'auto',
    },
    masonryItem: {
      marginBottom: '30px',
    },
  }),
)

type NotePageProps = {
  user: LoggedInUser | undefined
}

type noteState = {
  open: boolean
  note: Note | undefined
  index: number
}

const NotePage = ({ user }: NotePageProps) => {
  const [editNoteState, setEditNoteState] = useState<noteState>({
    open: false,
    note: undefined,
    index: -1,
  })
  const [notes, setNotes] = useState<Note[]>([])
  const classes = useStyles()

  useEffect(() => {
    if (user)
      fetchNotes(user.token)
        .then((data) => {
          setNotes(data)
        })
        .catch((e) => console.log(e))
  }, [user])

  const onAddNote = (note: NoteDescription) => {
    if (user)
      createNote(user.token, note).then((data) =>
        setNotes([...notes, { ...note, ...data }]),
      )
  }

  const onDeleteNote = (id: string, index: number) => {
    if (user)
      deleteNote(user.token, id).then((ok) => {
        if (ok) {
          const newNotes = notes.slice()
          newNotes.splice(index, 1)
          setNotes(newNotes)
        }
      })
  }

  const onSaveEditedNote = () => {
    const note = editNoteState.note as Note
    if (user && note)
      updateNote(user.token, note).then((data) => {
        if (data && editNoteState.note) {
          const newNotes = notes.slice()
          newNotes[editNoteState.index] = { ...note, ...data }
          setNotes(newNotes)
          setEditNoteState({ ...editNoteState, open: false })
        }
      })
  }

  const breakpoints = {
    default: 6,
    1700: 5,
    1500: 4,
    1250: 3,
    900: 2,
    780: 1,
  }
  return (
    <div className={classes.noteContainer}>
      <Grid container spacing={3} direction="column">
        <Grid item xs container justifyContent="center">
          <CreateNoteCard onSubmit={onAddNote} />
        </Grid>
        <Grid item xs>
          <Masonry
            breakpointCols={breakpoints}
            className={classes.masonryGrid}
            columnClassName={classes.masonryGridCol}
          >
            {notes.map((note, index) => (
              <div className={classes.masonryItem}>
                <NoteSummaryCard
                  note={note}
                  onClick={() => setEditNoteState({ open: true, note, index })}
                  onDelete={() => onDeleteNote(note.id, index)}
                />
              </div>
            ))}
          </Masonry>
        </Grid>
      </Grid>
      <EditNoteModal
        open={editNoteState.open}
        onAbort={() => setEditNoteState({ ...editNoteState, open: false })}
        onChange={(note) => setEditNoteState({ ...editNoteState, note })}
        onSave={onSaveEditedNote}
        note={editNoteState.note as Note}
      />
    </div>
  )
}

export default NotePage
