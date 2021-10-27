import { Theme, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import NoteSummaryCard from './NoteSummaryCard'
import Note from '../Models/Note'
import EditNoteModal from './EditNoteModal'
import CreateNoteCard from './CreateNoteCard'
import { createNote, deleteNote, fetchNotes, updateNote } from '../API/Note'
import NoteDescription from '../Models/NoteDescription'
import NoteMenu from './NoteMenu'
import NoteType from '../Models/NoteType'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    noteContainer: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(8),
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
  token: string | undefined
  searchFilter?: string
}

type noteState = {
  open: boolean
  note: Note | undefined
  index: number
}

const NotePage = ({ token, searchFilter }: NotePageProps) => {
  const [editNoteState, setEditNoteState] = useState<noteState>({
    open: false,
    note: undefined,
    index: -1,
  })
  const [notes, setNotes] = useState<Note[]>([])
  const [typeFilter, setTypeFilter] = useState<NoteType>()
  const classes = useStyles()

  useEffect(() => {
    if (token)
      fetchNotes(token, typeFilter, searchFilter)
        .then((data) => {
          setNotes(data)
        })
        .catch((e) => console.log(e))
  }, [token, searchFilter, typeFilter])

  const onAddNote = (note: NoteDescription) => {
    if (token)
      createNote(token, note).then((data) =>
        setNotes([...notes, { ...note, ...data }]),
      )
  }

  const onDeleteNote = (id: string, index: number) => {
    if (token)
      deleteNote(token, id).then((ok) => {
        if (ok) {
          const newNotes = notes.slice()
          newNotes.splice(index, 1)
          setNotes(newNotes)
        }
      })
  }

  const onSaveEditedNote = () => {
    const note = editNoteState.note as Note
    if (token && note)
      updateNote(token, note).then((data) => {
        if (data && editNoteState.note) {
          const newNotes = notes.slice()
          newNotes[editNoteState.index] = { ...note, ...data }
          setNotes(newNotes)
          setEditNoteState({ ...editNoteState, open: false })
        }
      })
  }

  const onCheckListItem = (
    note: Note,
    noteIndex: number,
    listIndex: number,
    checked: boolean,
  ) => {
    const newNote = note
    if (newNote.listContent) {
      newNote.listContent[listIndex].checked = checked
      if (token)
        updateNote(token, newNote).then((data) => {
          if (data) {
            const newNotes = notes.slice()
            newNotes[noteIndex] = { ...newNote, ...data }
            setNotes(newNotes)
          }
        })
    }
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
    <div>
      <Grid
        className={classes.noteContainer}
        container
        spacing={3}
        direction="column"
      >
        <Grid item xs container justifyContent="center">
          <CreateNoteCard onSubmit={onAddNote} />
        </Grid>
        <Grid item xs>
          {token && (
            <Masonry
              breakpointCols={breakpoints}
              className={classes.masonryGrid}
              columnClassName={classes.masonryGridCol}
            >
              {notes.map((note, index) => (
                <div className={classes.masonryItem}>
                  <NoteSummaryCard
                    note={note}
                    onClick={() =>
                      setEditNoteState({ open: true, note, index })
                    }
                    onDelete={() => onDeleteNote(note.id, index)}
                    onListItemCheck={(listIndex, value) =>
                      onCheckListItem(note, index, listIndex, value)
                    }
                  />
                </div>
              ))}
            </Masonry>
          )}
        </Grid>
      </Grid>
      <NoteMenu typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
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
