import { Theme, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import NoteSummaryCard from './NoteSummaryCard'
import Note from '../Models/Note'
import EditNoteModal from './EditNoteModal'
import CreateNoteCard from './CreateNoteCard'
import { fetchNotes } from '../API/Note'
import { LoggedInUser } from '../Models/User'

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
}

const onAddNote = (content: string | string[], title?: string) => {
  console.log(title)
  console.log(content)
}

const NotePage = ({ user }: NotePageProps) => {
  const [editNoteState, setEditNoteState] = useState<noteState>({
    open: false,
    note: undefined,
  })
  const [notes, setNotes] = useState<Note[]>([])
  const classes = useStyles()

  useEffect(() => {
    if (user)
      fetchNotes()
        .then((response) => response && setNotes(response))
        .catch((e) => console.log(e))
  }, [user])

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
            {notes.map((note) => (
              <div className={classes.masonryItem}>
                <NoteSummaryCard
                  note={note}
                  onClick={() => setEditNoteState({ open: true, note })}
                />
              </div>
            ))}
          </Masonry>
        </Grid>
      </Grid>
      <EditNoteModal
        open={editNoteState.open}
        onClose={() => setEditNoteState({ ...editNoteState, open: false })}
        onChange={(note) => setEditNoteState({ ...editNoteState, note })}
        note={editNoteState.note}
      />
    </div>
  )
}

export default NotePage
