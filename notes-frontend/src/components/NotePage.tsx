import { Theme, Fab, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Masonry from 'react-masonry-css'
import { useState } from 'react'
import NoteCard from './NoteCard'
import Note from '../Models/Note'
import EditNoteModal from './EditNoteModal'
import CreateNoteCard from './CreateNoteCard'

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

const onAddNote = (content: string | string[], title?: string) => {
  console.log(title)
  console.log(content)
}

const notes: Note[] = [
  {
    Content: 'test',
    Created: new Date(),
    Id: 'test',
    Title: 'test',
  },
]

type noteState = {
  open: boolean
  note: Note | undefined
}

const NotePage = () => {
  const [editNoteState, setEditNoteState] = useState<noteState>({
    open: false,
    note: undefined,
  })
  const classes = useStyles()

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
                <NoteCard
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
