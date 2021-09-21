import { Theme, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Masonry from 'react-masonry-css'
import NoteCard from './NoteCard'
import Note from '../Models/Note'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    noteContainer: {
      margin: theme.spacing(4),
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

const notes: Note[] = []

const NotePage = () => {
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
    <>
      <div className={classes.noteContainer}>
        <Masonry
          breakpointCols={breakpoints}
          className={classes.masonryGrid}
          columnClassName={classes.masonryGridCol}
        >
          {notes.map((note) => (
            <div className={classes.masonryItem}>
              <NoteCard note={note} />
            </div>
          ))}
        </Masonry>
      </div>
      <Fab color="primary" aria-label="add" className={classes.addButton}>
        <Add />
      </Fab>
    </>
  )
}

export default NotePage
